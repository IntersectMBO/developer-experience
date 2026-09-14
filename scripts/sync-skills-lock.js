#!/usr/bin/env node
/**
 * Sync skills-lock.json with the actual contents of .agents/skills/.
 *
 * Reads each SKILL.md frontmatter to extract name and description.
 * Preserves existing status and order where possible.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SKILLS_DIR = path.join(ROOT, ".agents", "skills");
const LOCK_FILE = path.join(ROOT, "skills-lock.json");

function readFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  const lines = match[1].split("\n");
  const meta = {};
  for (const line of lines) {
    const [key, ...rest] = line.split(":");
    if (key && rest.length > 0) {
      meta[key.trim()] = rest.join(":").trim();
    }
  }
  return meta;
}

function scanSkills() {
  if (!fs.existsSync(SKILLS_DIR)) return [];

  return fs
    .readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const skillPath = path.join(".agents", "skills", entry.name);
      const skillFile = path.join(SKILLS_DIR, entry.name, "SKILL.md");
      const meta = fs.existsSync(skillFile) ? readFrontmatter(skillFile) : {};
      return {
        name: meta.name || entry.name,
        path: skillPath,
        description: meta.description || "",
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

function main() {
  let lock = { version: "1.0.0", skillsDirectory: ".agents/skills", skills: [] };
  if (fs.existsSync(LOCK_FILE)) {
    lock = JSON.parse(fs.readFileSync(LOCK_FILE, "utf8"));
  }

  const scanned = scanSkills();
  const existingByName = new Map(lock.skills.map((s) => [s.name, s]));

  lock.skills = scanned.map((skill) => {
    const existing = existingByName.get(skill.name);
    return {
      ...skill,
      status: existing?.status || "untracked",
    };
  });

  lock.lastSyncedAt = new Date().toISOString();

  fs.writeFileSync(LOCK_FILE, JSON.stringify(lock, null, 2) + "\n");
  console.log(`Synced ${lock.skills.length} skills to ${path.relative(ROOT, LOCK_FILE)}`);
}

main();
