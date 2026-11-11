---
name: harun-review
description: Use when reviewing dependency manager choices, lockfiles, or build-tooling changes for the Developer Experience project.
allowed-tools: Read, Write, Edit, Grep, Bash
---

# Harun Review

## Project Tooling Constraint

`website/` standardises on **npm**. Both workflows install with `npm ci` against `website/package-lock.json`, and `website/package.json` intentionally declares no `packageManager`, so no other tool auto-selects itself.

## Lockfile Rule

- `website/package-lock.json` is the single source of truth for locked versions.
- Do **not** commit `website/yarn.lock`, `website/pnpm-lock.yaml`, `bun.lock`, `bun.lockb`, or a `package-lock.json` at the repository root.
- The guard in `.github/workflows/pr-build-website.yml` fails any PR that tracks a second lockfile, so a reintroduced one blocks the build rather than drifting quietly.

## What to Flag

During review, block or request removal of:

- `yarn.lock`, `pnpm-lock.yaml`, `bun.lock`, `bun.lockb`, or a root-level `package-lock.json`
- `bunfig.toml`, `.yarnrc*`, `pnpm-workspace.yaml`, or any Bun/PNPM-specific config
- A `packageManager` field added back to `website/package.json`
- A `resolutions` block: it is Yarn-only. Pins belong in `overrides`, which is what `npm ci` applies
- Scripts or documentation that tell contributors to use yarn, pnpm or bun, or push to `gh-pages` by hand

## Preferred Alternatives

- Use `npm install` to update dependencies.
- Use `npm install <pkg>` to add packages.
- Commit `website/package.json` and `website/package-lock.json` together.
- Add or change pins in the `overrides` block, then record them in `website/SECURITY.md`.
