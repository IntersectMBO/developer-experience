# Security verification

How to confirm that dependency security issues are addressed.

## 1. Run audits locally

CI installs the website with npm (`npm ci` against `website/package-lock.json`). `overrides` in `package.json` are what that install applies. `resolutions` stay in sync for anyone still using Yarn.

From `website/`:

```bash
cd website
npm ci
npm audit
npm run audit:ci
```

`audit:ci` exits with code 1 when high or critical findings remain.

## 2. Check GitHub Dependabot

1. Open the repo on GitHub, then Security, then Dependabot alerts.
2. Alerts fixed by the lockfile and overrides show as resolved after this branch is merged and Dependabot re-scans `main`.
3. Do not use `npm audit fix --force`. It suggests downgrading Docusaurus, which is a breaking change.

## 3. Pins in package.json

`resolutions` and `overrides` are kept identical. Notable pins after the November 2026 pass:

| Package | Pinned version | Why |
| --- | --- | --- |
| undici | 7.30.2 | Past the 7.x advisories that include 7.30.0, without jumping to undici 8 |
| joi | 18.3.2 | Past 18.0.0-18.3.0 |
| fast-uri | 4.2.3 | Past 4.0.0-4.2.2 |
| body-parser | 1.20.9 | Past <1.20.9, staying on 1.x |
| qs | 6.16.1 | Past <=6.16.0, staying inside body-parser's 6.16 line |
| serialize-javascript | 7.1.4 | Past <7.1.3 |
| follow-redirects | 1.16.3 | Past <=1.16.1 |
| launch-editor | 2.14.2 | Past <=2.14.1 |
| node-forge | 1.4.3 | Past <=1.4.0. The npm tree does not install it. The Yarn lock did |
| minimatch | 11.0.7 | The advisory covers every 10.x release |
| dompurify | 3.4.17 | Past <=3.4.15 |
| brace-expansion | 5.0.12 | Past 4.0.0-5.0.11 |
| image-size | `file:vendor/image-size` | Vendored 2.0.3 because npm 2.0.2 and below stay in the advisory range |

`postcss`, `shell-quote`, `ajv`, `js-yaml`, `webpack-dev-server`, `websocket-driver`, `katex`, and `tinypool` stay pinned as well. Read both blocks in `package.json` for the full list.

Direct ranges moved with the open Dependabot pull requests: `mermaid` ^12.3.0, `dotenv` ^18.0.10, `@types/node` ^26.6.6.

## 4. Residual finding

`npm audit` has no high or moderate findings after this pass. The remaining low is `deepmerge` 4.3.1 (`GHSA-gcqx-w48m-w2h4`). That is the newest 4.x release, and `@svgr/plugin-svgo` requires `^4.3.1`, so there is no safe override. Revisit when a patched `deepmerge` release exists. Do not downgrade Docusaurus to chase a clean audit.

## 5. After you change pins

```bash
cd website
npm install
npm run build
```

Commit `package.json`, `package-lock.json`, and `yarn.lock` together so the two lockfiles do not drift.

## 6. Node.js runtime

GitHub Actions and `.nvmrc` pin Node.js 22.23.4. That release is the floor for the HTTP/2 fixes on the 22 line (`CVE-2026-56846`, `CVE-2026-56848`, first shipped in 22.23.2) and for the 21 October 2026 security release. A bare `22` is not enough: `actions/setup-node` can still install an older 22.x.

`engines.node` is `>=22.23.4`. That floor applies to local installs. The workflow `node-version` and `.nvmrc` choose the binary CI and `nvm use` actually run.

These scan rows stay informational. They do not select the runtime:

- `website/package-lock.json` stays lockfileVersion 3.
- `packageManager` still declares Yarn 1.22.22. CI installs with npm.
- `website/vendor/image-size` keeps `engines.node` of `>=16.x`. That range belongs to the vendored package.
