---
name: docusaurus-linking
description: Use when writing or reviewing Markdown/MDX links, Docusaurus config links, or navigation URLs in the Developer Experience portal.
allowed-tools: Read, Write, Edit, Grep, Bash
---

# Docusaurus Linking

This skill prevents the broken-link build failures that are easy to introduce in this repo.

## Project Setup

- `website/docusaurus.config.ts` sets `trailingSlash: true`.
- Q2-2026 session pages use `readme.md` files as directory indexes and override their URLs with `slug` frontmatter.
- The site is deployed to GitHub Pages at `https://devex.intersectmbo.org`.

## Golden Rules

1. **Respect `trailingSlash: true`**
   - Prefer trailing-slash URLs in `docusaurus.config.ts`, navbar, footer, and Markdown links.
   - Good: `/docs/getting-started/`
   - Avoid: `/docs/getting-started`

2. **Never link to `readme.md` directly**
   - Docusaurus treats `readme.md` as a directory index. Link to the folder path.
   - Good: `./session-notes/`
   - Bad: `./session-notes/readme.md`

3. **Use absolute paths when URL differs from file path**
   - The Q2-2026 parent index is at `/docs/working-group/sessions/q2-2026/` (file path), but session pages are slugged under `/docs/working-group/q2-2026/sessions/...`.
   - Relative links from the parent to session subpages resolve to the wrong URL. Use absolute paths there.
   - Good in `q2-2026/index.md`: `/docs/working-group/q2-2026/sessions/18-cardano-ai-dev-workflow/session-notes/`
   - Bad: `./18-cardano-ai-dev-workflow/session-notes/`

4. **Keep slug frontmatter consistent**
   - If one file in a session folder has `slug: /working-group/q2-2026/sessions/...`, all sibling `readme.md` files in that session should have a matching slug.
   - This keeps relative links between siblings working.

5. **Prefer relative links only when URL and file structure match**
   - Good for sibling pages that share the same slug base: `../session-resources/`, `../../14-sdk-repo-walkthrough/session-notes/`.

6. **Use `pathname://` sparingly**
   - Only use it when you intentionally want Docusaurus to skip link resolution (e.g., linking to a generated asset path).
   - Do not use it to silence a broken link you should actually fix.

## Common Error Patterns

| Error | Cause | Fix |
|-------|-------|-----|
| `Markdown link with URL ... couldn't be resolved` | Linking to `readme.md` or a missing file | Link to the directory or use an absolute path |
| `Broken link ... resolved as ...` (wrong directory) | Relative link with `trailingSlash: true` mismatch | Add trailing slash or use absolute path |
| `Broken link on source page path = /docs/.../default-developer-environment/...` | Missing `slug` frontmatter on a sibling page | Add matching `slug:` to the target file |

## Verification

Before committing docs or config changes, run:

```bash
cd website && npm run build
```

Docusaurus fails the build on broken links by default. Treat a green build as required.
