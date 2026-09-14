# Repository Health Review — 2026-08-04

**Repo:** [IntersectMBO/developer-experience](https://github.com/IntersectMBO/developer-experience)  
**Branch:** `chore/repo-health-review`  
**Reviewer:** Dan Baruka  
**Scope:** CI/CD, dependencies, backlog

---

## Executive summary

| Area | Status | Notes |
| --- | --- | --- |
| CI/CD | Needs improvement | Deploy works on `main`, but two overlapping Pages workflows and no PR build check |
| Dependencies | Critical | `npm audit` on `main`: **174** vulns (1 critical, 51 high); 58 open Dependabot alerts |
| Backlog | Needs triage | 12 open issues + 14 open PRs; several stale; branch count high (~34) |
| Branch protection | Unverified / likely weak | API returned 404 for protection rules (may mean none configured for this token/role) |

**Immediate priorities**

1. Merge (or land equivalent of) security dependency fix — see [#259](https://github.com/IntersectMBO/developer-experience/issues/259) / [#260](https://github.com/IntersectMBO/developer-experience/pull/260)
2. Deduplicate GitHub Pages deploy workflows
3. Add a `pull_request` CI job that runs `npm ci` + `npm run build` in `website/`
4. Triage stale PRs and run branch cleanup ([#135](https://github.com/IntersectMBO/developer-experience/issues/135))

---

## 1. CI/CD

### What exists

| Workflow | Trigger | Role |
| --- | --- | --- |
| `.github/workflows/deploy.yml` | `push` to `main`, `workflow_dispatch` | Build (`npm ci` + `npm run build`) then deploy Pages |
| `.github/workflows/static.yml` | `push` to `main` when `website/**` changes, `workflow_dispatch` | Second full build + deploy to the same Pages environment |
| `.github/workflows/changelog.yml` | version tags | Soft-check that `CHANGELOG.md` mentions the tag |

Recent deploy runs on `main` (e.g. after PR #251) completed **successfully**. Dependabot update jobs also succeed.

### Findings

1. **Duplicate Pages deploy pipelines**  
   Both `deploy.yml` and `static.yml` build and deploy to `github-pages` on pushes to `main`. That doubles CI minutes, can race on the same environment, and makes failures harder to reason about.  
   **Recommendation:** Keep one workflow (prefer `deploy.yml` with `npm ci` + artifact upload). Delete or disable `static.yml`.

2. **No pull-request CI**  
   Docs/site PRs are not built until merge to `main`. Broken links (`onBrokenLinks: throw`) and build failures only surface post-merge.  
   **Recommendation:** Add a lightweight `ci.yml` on `pull_request` paths `website/**` that runs:

   ```bash
   cd website && npm ci && npm run build
   ```

3. **Changelog workflow likely incomplete at repo root**  
   `changelog.yml` runs `npm ci` at repository root, but there is no root `package.json`. The job mostly echoes a warning and does not regenerate the changelog.  
   **Recommendation:** Point install/build at `website/` if needed, or replace with a docs-only check / release script that matches how versions are actually cut.

4. **Action version drift**  
   Open Dependabot PRs bump `actions/checkout` and `actions/setup-node` to v7 while workflows still pin v6. Fine to batch with a single CI PR after deduplicating workflows.

5. **Branch protection**  
   Could not read protection rules via API (404). Confirm in GitHub settings that `main` requires PR reviews and status checks once PR CI exists.

### Suggested CI target state

```text
pull_request (website/**) → npm ci + build
push main                 → single Pages deploy workflow
tags v*                   → changelog/release check (optional, fixed paths)
```

---

## 2. Dependencies

### Audit snapshot (`website/` on `main`, 2026-08-04)

```text
npm audit: 174 vulnerabilities
  critical: 1
  high:    51
  moderate: 119
  low:      3
```

### Open Dependabot alerts (org repo)

| Severity | Count |
| --- | --- |
| critical | 2 |
| high | 28 |
| medium | 20 |
| low | 8 |
| **total** | **58** |

**Packages involved (unique):**  
`body-parser`, `brace-expansion`, `dompurify`, `fast-uri`, `http-proxy-middleware`, `js-yaml`, `postcss`, `shell-quote`, `svgo`, `undici`, `webpack-dev-server`, `websocket-driver`

### Mitigations already in flight

- Issue [#259](https://github.com/IntersectMBO/developer-experience/issues/259) and PR [#260](https://github.com/IntersectMBO/developer-experience/pull/260) refresh `overrides` / `resolutions` and report **0** audit findings when applied.
- `website/package.json` already uses overrides, but several pins on `main` remain inside vulnerable ranges until #260 lands.
- Dependabot is configured weekly for npm (`/website`) and GitHub Actions, with grouping for Docusaurus/babel/webpack.

### Quality notes

- Both `package-lock.json` and `yarn.lock` exist under `website/` while `packageManager` declares Yarn and CI uses **npm**. Prefer one package manager in CI and docs to avoid drift.
- `gray-matter` patch via `patch-package` is required for js-yaml 4 compatibility; keep until upstream/Docusaurus removes the need.
- Open Dependabot PRs (#255–#258, #253, #245, #235) should be rebased/merged after the security override PR to reduce conflict churn.

### Recommendations

1. Merge security fix PR (#260) or equivalent as soon as reviewed.
2. After merge, confirm Dependabot alerts close; close superseded Dependabot PRs.
3. Standardize on **npm** for `website/` (match CI) or migrate CI to Yarn — do not keep both as first-class without a written policy.
4. Add `npm run audit:ci` (`--audit-level=high`) as a non-blocking or blocking check in PR CI once baseline is clean.

---

## 3. Backlog

### Open issues (12)

| # | Age (opened) | Labels | Title | Suggested action |
| --- | --- | --- | --- | --- |
| 259 | 2026-08-03 | Security, High | Fix security/quality deps | Merge paired PR #260 |
| 232 | 2026-05-20 | High, good first issue | Session widget wrong link | Good candidate for next fix sprint |
| 217 | 2026-04-16 | — | Duplicate home CTA buttons | Overlaps PR #218; triage together |
| 201 | 2026-03-25 | — | Core contributor pathway gaps | Content; larger than a drive-by |
| 192 | 2026-03-17 | enhancement | Website Audit | Umbrella; close or turn into checklist after #191 |
| 191 | 2026-03-17 | documentation | Redundant empty pages | PR #261 in review |
| 185 | 2026-03-16 | Medium, good first issue | Menu click area | Keep as GFI |
| 150 | 2026-02-09 | good first issue | IntersectMBO page updates | Confirm still relevant |
| 135 | 2026-01-06 | Medium | Branch cleanup | Still valid (~34 branches) |
| 115 | 2025-11-24 | documentation | Missing tutorials content | Partially mitigated; still only one tutorial |
| 100 | 2025-10-30 | enhancement | Recording descriptions | Ongoing as sessions publish |
| 55 | 2025-05-21 | — | Linux-ARM releases | Likely off-scope for this docs site; close or transfer |

### Open pull requests (14)

| Bucket | PRs | Notes |
| --- | --- | --- |
| Security / deps (human) | #260 | Highest priority |
| Docs cleanup | #261 | Closes #191 |
| Dependabot | #258, #257, #256, #255, #253, #245, #235 | Rebase after #260 |
| Docs / changelog | #242, #236, #196 | Review or refresh |
| Feature / layout | #226, #218 | May need design review; #218 tied to #217 |

Several PRs are **>30–90 days** old. Without triage they will keep conflicting with `main`.

### Branches

About **34** remote branches including many Dependabot and one-off session branches. Aligns with open issue [#135](https://github.com/IntersectMBO/developer-experience/issues/135).

**Recommendation:** After merging current critical PRs, delete merged branches and archive abandoned ones (Dependabot recreates as needed).

---

## 4. Action checklist

### This week

- [ ] Review/merge [#260](https://github.com/IntersectMBO/developer-experience/pull/260) (security deps)
- [ ] Review/merge [#261](https://github.com/IntersectMBO/developer-experience/pull/261) (redundant pages)
- [ ] Remove or disable duplicate `static.yml` Pages workflow
- [ ] Add `pull_request` build workflow for `website/`

### This month

- [ ] Triage Dependabot PRs post-#260
- [ ] Branch cleanup pass (#135)
- [ ] Decide npm vs Yarn for `website/`
- [ ] Confirm `main` branch protection + required checks
- [ ] Close or re-scope #55 if not applicable to this repo
- [ ] Fix remaining content gaps (#115, #201) or split into smaller issues

### Hygiene metrics to track

| Metric | Baseline (2026-08-04) | Target |
| --- | --- | --- |
| `npm audit` high+critical | 52 | 0 |
| Open Dependabot alerts | 58 | &lt;5 |
| Duplicate deploy workflows | 2 | 1 |
| PR CI on website changes | No | Yes |
| Open PRs older than 60 days | Several | 0 without owner comment |
| Remote branches | ~34 | &lt;15 active |

---

## 5. Out of scope for this document

- Implementing the CI/workflow code changes (follow-up PR recommended)
- Rewriting tutorial/pathway content
- Closing third-party Dependabot PRs without maintainer approval

---

*Generated as a maintainer health snapshot for Intersect DevEx. Update after #260/#261 land.*
