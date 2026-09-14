# Repository Health Review — 2026-08-05

**Repo:** [IntersectMBO/developer-experience](https://github.com/IntersectMBO/developer-experience)  
**Reviewer:** Dan Baruka  
**Date:** 2026-08-05 (re-test after security fix)  
**Branch under test:** `chore/fix-security-quality-deps-259` (aligned with merged `#260` on `main`)  
**Scope:** CI/CD, dependencies, backlog

---

## Executive summary

| Area | Status | Notes |
| --- | --- | --- |
| CI/CD | Needs improvement | Deploys on `main` succeed, but **two** overlapping Pages workflows remain; still **no PR build check** |
| Dependencies | Healthy | `npm audit`: **0** vulnerabilities; Dependabot open alerts: **0** |
| Backlog | Needs triage | 15 open issues + 7 open PRs; several stale; ~30 remote branches |
| Branch protection | Unverified / likely weak | API returned 404 for `main` protection rules |
| Local build | Pass | `cd website && npm run build` succeeded |

**Since previous snapshot (2026-08-04)**

| Metric | Before | After (2026-08-05) |
| --- | --- | --- |
| `npm audit` total | 174 | **0** |
| `npm audit` high+critical | 52 | **0** |
| Open Dependabot alerts | 58 | **0** |
| Security issue/PR | #259 open / #260 open | **#259 closed / #260 merged** |

**Immediate priorities**

1. Deduplicate GitHub Pages deploy workflows (`deploy.yml` vs `static.yml`)
2. Add a `pull_request` CI job that runs `npm ci` + `npm run build` in `website/` (see also [#268](https://github.com/IntersectMBO/developer-experience/issues/268))
3. Triage stale PRs (#218, #196, #226, #236) and run branch cleanup ([#135](https://github.com/IntersectMBO/developer-experience/issues/135))
4. Merge or close remaining Dependabot action bumps (#258, #245) after workflow cleanup

---

## 1. CI/CD

### What exists

| Workflow | Trigger | Role |
| --- | --- | --- |
| `.github/workflows/deploy.yml` | `push` to `main`, `workflow_dispatch` | Build (`npm ci` + `npm run build`) then deploy Pages |
| `.github/workflows/static.yml` | `push` to `main` when `website/**` changes, `workflow_dispatch` | Second full build + deploy to the same Pages environment |
| `.github/workflows/changelog.yml` | version tags | Soft-check that `CHANGELOG.md` mentions the tag |

**No `ci.yml` / `pull_request` build workflow** — confirmed via workflow listing on the upstream repo.

### Recent runs

Latest `main` pushes (including merge of [#260](https://github.com/IntersectMBO/developer-experience/pull/260)) completed **successfully** for both Pages workflows. Dependabot update jobs also succeed.

Notable: after `#260` merge, **both** `Deploy to GitHub Pages` and `Deploy Docusaurus site to Pages` ran again in parallel — confirming the duplicate-pipeline finding is still active.

### Findings

1. **Duplicate Pages deploy pipelines (unchanged)**  
   Both `deploy.yml` and `static.yml` build and deploy to `github-pages` on pushes to `main`. That doubles CI minutes, can race on the same environment, and makes failures harder to reason about.  
   **Recommendation:** Keep one workflow (prefer `deploy.yml` with `npm ci` + artifact upload). Delete or disable `static.yml`.

2. **No pull-request CI (unchanged; now tracked)**  
   Docs/site PRs are not built until merge to `main`. Broken links (`onBrokenLinks: throw`) and build failures only surface post-merge.  
   Issue [#268](https://github.com/IntersectMBO/developer-experience/issues/268) now asks for CI that fails PRs on broken docs links/anchors.  
   **Recommendation:** Add a lightweight `ci.yml` on `pull_request` paths `website/**` that runs:

   ```bash
   cd website && npm ci && npm run build
   ```

3. **Changelog workflow likely incomplete at repo root (unchanged)**  
   `changelog.yml` runs `npm ci` at repository root, but there is no root `package.json`. The job mostly echoes a warning and does not regenerate the changelog.  
   **Recommendation:** Point install/build at `website/` if needed, or replace with a docs-only check / release script that matches how versions are actually cut.

4. **Action version drift (still open)**  
   Open Dependabot PRs [#258](https://github.com/IntersectMBO/developer-experience/pull/258) (`actions/setup-node` → v7) and [#245](https://github.com/IntersectMBO/developer-experience/pull/245) (`actions/checkout` → v7) while workflows still pin v6. Fine to batch with a single CI PR after deduplicating workflows.

5. **Branch protection (unchanged)**  
   Could not read protection rules via API (404). Confirm in GitHub settings that `main` requires PR reviews and status checks once PR CI exists.

### Suggested CI target state

```text
pull_request (website/**) → npm ci + build
push main                 → single Pages deploy workflow
tags v*                   → changelog/release check (optional, fixed paths)
```

---

## 2. Dependencies

### Audit snapshot (`website/`, 2026-08-05)

```text
npm audit: found 0 vulnerabilities

  critical: 0
  high:     0
  moderate: 0
  low:      0
  info:     0
```

### Open Dependabot alerts (org repo)

| Severity | Count |
| --- | --- |
| critical | 0 |
| high | 0 |
| medium | 0 |
| low | 0 |
| **total** | **0** |

### Mitigations landed

- Issue [#259](https://github.com/IntersectMBO/developer-experience/issues/259) **closed** and PR [#260](https://github.com/IntersectMBO/developer-experience/pull/260) **merged** (2026-08-05).
- Local re-test on the security-fix branch: `npm audit` → **0**; production `npm run build` → **success**.
- Dependabot open alerts dropped from **58 → 0**.

### Quality notes

- Both `package-lock.json` and `yarn.lock` exist under `website/` while `packageManager` declares Yarn and CI uses **npm**. Prefer one package manager in CI and docs to avoid drift.
- `website/package.json` still declares both `resolutions` and `overrides` (needed for the security baseline). Keep until upstream/Docusaurus removes the need.
- Minor non-security updates available (`npm outdated`): search-local, dotenv, mermaid, `@types/node`; React 19 / TypeScript 7 are major bumps — defer unless planned.

### Recommendations

1. Treat dependency security as **cleared for now**; keep weekly Dependabot.
2. After deduplicating workflows, merge action bumps (#258 / #245) or open one combined Actions PR.
3. Standardize on **npm** for `website/` (match CI) or migrate CI to Yarn — do not keep both as first-class without a written policy.
4. Add `npm run audit:ci` (`--audit-level=high`) as a PR check once PR CI exists (currently would pass).

---

## 3. Backlog

### Open issues (15)

| # | Opened | Labels | Title | Suggested action |
| --- | --- | --- | --- | --- |
| 268 | 2026-08-05 | bug, docs, Medium | Make broken docs links/anchors fail CI on PRs | Pair with new PR CI workflow |
| 267 | 2026-08-05 | bug, docs, GFI, Medium | Replace broken `file://` demo link in Session 15 | Good first issue |
| 265 | 2026-08-04 | docs, enhancement, GFI, Medium | CIP-30 wallet connect tutorial (Mesh) | Content sprint candidate |
| 264 | 2026-08-04 | docs, enhancement, High | Default Cardano developer environment how-to | High priority content |
| 232 | 2026-05-20 | enhancement, GFI, High | Session widget wrong link | Still open; next fix sprint |
| 217 | 2026-04-16 | — | Duplicate home CTA buttons | Overlaps PR #218; triage together |
| 201 | 2026-03-25 | — | Core contributor pathway gaps | Content; larger than a drive-by |
| 192 | 2026-03-17 | enhancement | Website Audit | Umbrella; close or turn into checklist |
| 191 | 2026-03-17 | documentation | Redundant empty pages | PR #261 in review (partially mitigated by #266) |
| 185 | 2026-03-16 | enhancement, GFI, Medium | Menu click area | Keep as GFI |
| 150 | 2026-02-09 | enhancement, GFI | IntersectMBO page updates | Confirm still relevant |
| 135 | 2026-01-06 | Medium | Branch cleanup | Still valid (~30 branches) |
| 115 | 2025-11-24 | documentation | Missing tutorials content | Partially mitigated; expand via #264/#265 |
| 100 | 2025-10-30 | enhancement | Recording descriptions | Ongoing as sessions publish |
| 55 | 2025-05-21 | — | Linux-ARM releases | Likely off-scope for this docs site; close or transfer |

**Closed since last report:** [#259](https://github.com/IntersectMBO/developer-experience/issues/259) (security deps), [#263](https://github.com/IntersectMBO/developer-experience/issues/263) (redirects/anchors).

### Open pull requests (7)

| Bucket | PRs | Notes |
| --- | --- | --- |
| Docs cleanup | #261 | Closes #191; labeled duplicate — resolve vs #266 outcome |
| Dependabot (Actions) | #258, #245 | Rebase after workflow dedupe |
| Docs / sessions | #236 | ~63 days old |
| Feature / layout | #226, #218 | #218 tied to #217; both aging |
| Docs / README | #196 | ~139 days old; refresh or close |

**Merged since last report:** [#260](https://github.com/IntersectMBO/developer-experience/pull/260) (security), [#262](https://github.com/IntersectMBO/developer-experience/pull/262) (prior health review), [#266](https://github.com/IntersectMBO/developer-experience/pull/266) (redirects), [#242](https://github.com/IntersectMBO/developer-experience/pull/242) (changelog).

Several PRs are **>60–90 days** old. Without triage they will keep conflicting with `main`.

### Branches

About **30** remote branches (down slightly from ~34), including Dependabot and one-off session branches. Aligns with open issue [#135](https://github.com/IntersectMBO/developer-experience/issues/135).

**Recommendation:** After merging current critical PRs, delete merged branches and archive abandoned ones (Dependabot recreates as needed).

---

## 4. Action checklist

### This week

- [x] Review/merge [#260](https://github.com/IntersectMBO/developer-experience/pull/260) (security deps) — **done 2026-08-05**
- [ ] Review/merge or close [#261](https://github.com/IntersectMBO/developer-experience/pull/261) (redundant pages) given #266
- [ ] Remove or disable duplicate `static.yml` Pages workflow
- [ ] Add `pull_request` build workflow for `website/` (addresses #268)

### This month

- [ ] Triage Dependabot Action PRs (#258, #245)
- [ ] Branch cleanup pass (#135)
- [ ] Decide npm vs Yarn for `website/`
- [ ] Confirm `main` branch protection + required checks
- [ ] Close or re-scope #55 if not applicable to this repo
- [ ] Fix remaining content gaps (#115, #201, #264, #265) or split into smaller issues
- [ ] Clear stale human PRs (#196, #218, #226, #236)

### Hygiene metrics to track

| Metric | Previous (2026-08-04) | Current (2026-08-05) | Target |
| --- | --- | --- | --- |
| `npm audit` high+critical | 52 | **0** | 0 |
| Open Dependabot alerts | 58 | **0** | &lt;5 |
| Duplicate deploy workflows | 2 | 2 | 1 |
| PR CI on website changes | No | No | Yes |
| Open PRs older than 60 days | Several | 4 (#236, #226, #218, #196) | 0 without owner comment |
| Remote branches | ~34 | ~30 | &lt;15 active |

---

## 5. Tests re-run (this report)

| Check | Command / source | Result |
| --- | --- | --- |
| npm audit | `cd website && npm audit` | **0 vulnerabilities** |
| Dependabot alerts | `gh api …/dependabot/alerts` (open) | **0** |
| Production build | `cd website && npm run build` | **Success** |
| Workflow inventory | `.github/workflows/*` + upstream contents API | `deploy.yml`, `static.yml`, `changelog.yml` only |
| Recent Actions | `gh run list` | Latest `main` deploys **success** (both Pages workflows) |
| Open issues / PRs | `gh issue list` / `gh pr list` | **15** issues / **7** PRs |
| Branch count | branches API | **30** |
| Branch protection | `…/branches/main/protection` | **404** (unverified) |

---

## 6. Out of scope for this document

- Implementing the CI/workflow code changes (follow-up PR recommended)
- Rewriting tutorial/pathway content
- Closing third-party Dependabot PRs without maintainer approval

---

*Maintainer health re-test for Intersect DevEx MRP. Security baseline cleared after #260; CI hygiene still the next focus.*
