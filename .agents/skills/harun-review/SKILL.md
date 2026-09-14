---
name: harun-review
description: Use when reviewing dependency manager choices, lockfiles, or build-tooling changes for the Developer Experience project.
allowed-tools: Read, Write, Edit, Grep, Bash
---

# Harun Review

## Project Tooling Constraint

This project strictly uses **Yarn** as its package manager. The `website/package.json` declares:

```json
"packageManager": "yarn@1.22.22+sha512..."
```

## Lockfile Rule

- Do **not** commit a `bun.lock` file.
- Do **not** introduce Bun-specific lockfiles, configuration, or scripts.
- Committing `bun.lock` could cause confusion for other contributors and break our CI, which expects `yarn.lock`.

## What to Flag

During review, block or request removal of:

- `bun.lock` or `bun.lockb`
- `bunfig.toml`
- Scripts or documentation that assume Bun is the package manager
- Changes that switch `packageManager` away from Yarn without explicit team approval

## Preferred Alternatives

- Use `yarn install` to update dependencies.
- Use `yarn add <pkg>` to add packages.
- Keep `yarn.lock` as the single source of truth for locked dependency versions.
