/**
 * Generate the session index the landing page's carousel reads.
 *
 * The archive is the source of truth: every session is a folder under
 * docs/working-group/sessions/<quarter>/<NN-slug>/, and its notes page carries the
 * canonical title and slug in frontmatter. Hand-maintaining a copy in landing.ts
 * meant the home page drifted from the archive (three of twenty-one sessions, one
 * of them already renamed), so the list is derived at build time instead.
 *
 * Deterministic, no network: safe to run in prebuild on every build.
 */
const fs = require('fs');
const path = require('path');

const DOCS_ROOT = path.join(__dirname, '../website/docs');
const DOCS = path.join(DOCS_ROOT, 'working-group/sessions');
const OUTPUT_FILE = path.join(__dirname, '../website/src/data/sessions.json');

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---/;

const readFrontmatter = (file) => {
  const text = fs.readFileSync(file, 'utf8');
  const match = text.match(FRONTMATTER);
  const fields = {};
  if (match) {
    for (const line of match[1].split(/\r?\n/)) {
      const pair = line.match(/^(\w+):\s*(.*)$/);
      if (pair) fields[pair[1]] = pair[2].trim().replace(/^["']|["']$/g, '');
    }
  }
  const h1 = text.match(/^#\s+(.+)$/m);
  return { fields, h1: h1 ? h1[1].trim() : null };
};

/** "Session 22: AI-Ready Cardano Repositories - Notes" -> "AI-Ready Cardano Repositories" */
const cleanTitle = (raw) =>
  raw
    .replace(/^Session\s+\d+\s*[:\-–—]\s*/i, '')
    .replace(/^Session\s+\d+\s+/i, '')
    .replace(/\s*[-–—:]\s*Notes\s*$/i, '')
    .replace(/\s+Notes$/i, '')
    .trim();

/**
 * Frontmatter often says "Session 09 Overview", which cleans down to nothing
 * useful. Anything in this list means "look at the H1 instead".
 */
const WEAK_TITLES = new Set(['', 'overview', 'notes', 'readme', 'summary', 'session']);

const isWeak = (title) => WEAK_TITLES.has(title.replace(/[^a-z]/gi, '').toLowerCase());

/** Folder slug as a last resort: "22-ai-ready-cardano-repos" -> "Ai Ready Cardano Repos" */
const humanise = (slug) =>
  slug
    .replace(/^\d+-/, '')
    .split('-')
    .filter(Boolean)
    .join(' ')
    .replace(/^\w/, (c) => c.toUpperCase());

/** "q4-2026" -> { label: "Q4 2026", sort: 20264 } */
const parseQuarter = (dir) => {
  const match = dir.match(/^q(\d)-(\d{4})$/i);
  if (!match) return { label: dir.toUpperCase(), sort: 0 };
  return { label: `Q${match[1]} ${match[2]}`, sort: Number(match[2]) * 10 + Number(match[1]) };
};

const listDirs = (dir) =>
  fs.existsSync(dir)
    ? fs.readdirSync(dir, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name)
    : [];

const firstMarkdown = (dir) => {
  const files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
  return files.find((f) => /\.mdx?$/.test(f)) || null;
};

const sessions = [];

for (const quarterDir of listDirs(DOCS)) {
  const quarter = parseQuarter(quarterDir);

  for (const sessionDir of listDirs(path.join(DOCS, quarterDir))) {
    // Notes can sit directly under the session, or one level down when a session
    // ran over several parts (q1-2026/10-wallet-integration/Session-1/...).
    const candidates = [path.join(DOCS, quarterDir, sessionDir, 'session-notes')];
    for (const nested of listDirs(path.join(DOCS, quarterDir, sessionDir))) {
      candidates.push(path.join(DOCS, quarterDir, sessionDir, nested, 'session-notes'));
    }

    const notesDir = candidates.find((dir) => firstMarkdown(dir));
    if (!notesDir) continue;

    const file = path.join(notesDir, firstMarkdown(notesDir));
    const { fields, h1 } = readFrontmatter(file);

    const numberMatch = sessionDir.match(/^(\d+)/);
    const number = numberMatch ? numberMatch[1].replace(/^0+(?=\d)/, '') : '';

    const fromFrontmatter = cleanTitle(fields.title || '');
    const fromHeading = cleanTitle(h1 || '');
    const title = (!isWeak(fromFrontmatter) && fromFrontmatter) ||
      (!isWeak(fromHeading) && fromHeading) ||
      humanise(sessionDir);

    // A session's route is its frontmatter slug, and nothing else. Nothing is
    // derived from the file path any more: every session-notes page carries one,
    // and a new session that forgets it fails this build by name instead of
    // silently shipping a folder-derived URL that the next rename breaks.
    if (!fields.slug) {
      const shown = path.relative(path.join(__dirname, '..'), file);
      throw new Error(
        `[sessions] ${shown} has no frontmatter slug. Every session-notes page needs one, ` +
          'in the shape /working-group/<quarter>/sessions/<NN-slug>/session-notes. ' +
          'See "Session notes pages" in CONTRIBUTING.md.'
      );
    }
    const href = `/docs${fields.slug.startsWith('/') ? '' : '/'}${fields.slug}`;

    sessions.push({
      number,
      title,
      quarter: quarter.label,
      href,
      sort: quarter.sort,
    });
  }
}

sessions.sort((a, b) => b.sort - a.sort || Number(b.number || 0) - Number(a.number || 0));

const payload = {
  generatedAt: new Date().toISOString().slice(0, 10),
  total: sessions.length,
  sessions: sessions.map(({ number, title, quarter, href }) => ({ number, title, quarter, href })),
};

fs.writeFileSync(OUTPUT_FILE, `${JSON.stringify(payload, null, 2)}\n`);
console.log(`[sessions] wrote ${payload.total} sessions to ${path.relative(process.cwd(), OUTPUT_FILE)}`);
