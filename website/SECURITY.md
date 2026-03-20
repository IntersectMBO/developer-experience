# Security verification

How to confirm that dependency security issues are addressed.

## 1. Run audits locally

From the **`website/`** directory (where `package-lock.json` and `yarn.lock` live):

```bash
cd website
npm audit
# or
yarn audit
```

If you run `npm audit` from the repo root you’ll get `ENOLOCK` because there is no lockfile there.

- **npm audit**: Uses `package-lock.json`; respects `overrides`. Run after `npm install`.
- **yarn audit**: Uses `yarn.lock`; respects `resolutions`. Can sometimes return 500 from the registry; use npm audit as fallback.

**Scripts in package.json:**

- `yarn audit` or `npm run audit` — full report
- `npm run audit:ci` — exits with code 1 only if there are **high** or **critical** issues (useful for CI)

## 2. Check GitHub Dependabot

1. Open the repo on GitHub → **Security** → **Dependabot alerts**.
2. Alerts that are fixed by your lockfile/overrides should show as **resolved** after the fix is merged (or after Dependabot re-runs).
3. You can **reopen** a PR or **merge** the security update branch so the default branch has the fixed lockfiles.

## 3. What’s already fixed (overrides)

These are pinned in `package.json` via `resolutions` (Yarn) and `overrides` (npm):

| Package      | Pinned version | Alerts addressed |
|-------------|----------------|-------------------|
| node-forge  | 1.3.2          | ASN.1 recursion, OID truncation, etc. |
| qs          | 6.14.2         | arrayLimit bypass DoS |
| minimatch   | 3.1.2          | ReDoS (3.x line; 10.x has separate fix) |
| lodash      | 4.17.21        | Prototype pollution (_.unset / _.omit) |
| ajv         | ^8.17.0        | ReDoS with `$data` |
| js-yaml     | ^4.1.0         | Prototype pollution in merge |

After changing `package.json` or lockfiles, run **`yarn install`** and/or **`npm install`** in `website/` so the lockfiles reflect these versions.

## 4. Vulnerability checklist (fix one by one)

A full list of all current vulnerabilities with checkboxes, advisory links, and fix steps is in **[VULNERABILITIES.md](./VULNERABILITIES.md)**. Use it to track and fix issues one by one.

## 5. Remaining issues (npm audit)

Many remaining findings come from **transitive dependencies of Docusaurus 3.7.0**, for example:

- **@babel/helpers**, **@babel/runtime** — RegExp complexity (moderate)
- **minimatch** (high) — ReDoS; advisory may require minimatch 10.x (major upgrade)
- **lodash** — Prototype pollution; 4.17.21 is latest 4.x (advisory may want a different fix)
- **mdast-util-to-hast** — Unsanitized class (moderate)
- **webpack** — SSRF-related (fix available via `npm audit fix`)
- **brace-expansion**, **diff**, **webpack-dev-server**, etc.

**Ways to reduce remaining issues:**

1. **Upgrade Docusaurus** to 3.9.x (or latest 3.x) so many transitive deps get updated at once.  
   - Note: 3.9+ may require Node 20+.
2. **Apply safe fixes:**  
   `npm audit fix` (no `--force`) in `website/` to apply non-breaking fixes.
3. **Overrides:** Add more `resolutions` / `overrides` only when you know the new version is compatible (e.g. from Docusaurus or advisory “fixed in” version).
4. **Accept or dismiss:** For dev-only or low-impact advisories, you can document the decision and (if needed) use Dependabot “Dismiss” with a reason.

## 6. CI (optional)

To fail the build when new high/critical issues appear:

```yaml
# Example (GitHub Actions)
- run: cd website && npm ci && npm run audit:ci
```

This uses `audit:ci`, which exits with code 1 only for high/critical severity.

## 7. Single lockfile (recommended)

The repo has both `yarn.lock` and `package-lock.json`. Using **one** package manager and **one** lockfile avoids drift and duplicate Dependabot alerts:

- Prefer **Yarn** (as in `packageManager`): delete `package-lock.json`, use only `yarn install` and `yarn.lock`.
- Or prefer **npm**: remove `packageManager`, delete `yarn.lock`, use only `npm install` and `package-lock.json`.

Then configure Dependabot for that single ecosystem so alerts match what you actually install.
