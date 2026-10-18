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

`resolutions` and `overrides` are kept identical. Notable pins after the October 2026 pass:

| Package | Pinned version | Why |
| --- | --- | --- |
| undici | 7.30.0 | Past the 7.0.0-7.29.0 advisory range, without jumping to undici 8 |
| fast-uri | 4.2.2 | Past 4.0.0-4.1.4 |
| brace-expansion | 5.0.12 | Past 4.0.0-5.0.11 |
| joi | 18.2.9 | Past 18.0.0-18.2.8 |
| shell-quote | 1.12.0 | Past 1.8.4-1.10.0 |
| dompurify | 3.4.17 | Past <=3.4.15 |
| tinypool | 2.2.0 | Past <=2.1.1; production `npm run build` still succeeds |
| katex | 0.19.0 | Past 0.11.0-0.18.1 |
| postcss-selector-parser | 7.1.6 | Past <7.1.6 |
| image-size | `file:vendor/image-size` | Vendored 2.0.3 because npm 2.0.2 and below stay in the advisory range |

`node-forge`, `postcss`, `qs`, `minimatch`, `ajv`, `js-yaml`, `webpack-dev-server`, `websocket-driver`, and `body-parser` stay pinned as well. Read both blocks in `package.json` for the full list.

## 4. Residual finding

`braces` is still reported by `npm audit` at high severity, including the latest release (`3.0.3`). The advisory range is every published version, so there is no override that clears it. It is pulled in by `micromatch` and `chokidar` under Docusaurus. Revisit when a patched `braces` release exists. Do not downgrade Docusaurus to chase a clean audit.

## 5. After you change pins

```bash
cd website
npm install
npm run build
```

Commit `package.json` and `package-lock.json` together — `website/package-lock.json` is the only tracked lockfile, so the two cannot drift apart.
