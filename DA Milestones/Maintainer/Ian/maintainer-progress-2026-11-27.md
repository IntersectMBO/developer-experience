# Maintainer Progress Report, 8 November to 27 November 2026

**Programme:** Intersect Maintainer Retainer Program, Developer Experience  
**Author:** Ian Njuguna ([@IanoNjuguna](https://github.com/IanoNjuguna))  
**Period:** 2026-11-08 → 2026-11-27 (20 days)  
**Repository:** [IntersectMBO/developer-experience](https://github.com/IntersectMBO/developer-experience), `main` at `973801b`  
**Date:** 27 November 2026  
**Continues:** [maintainer-progress-2026-11-07.md](./maintainer-progress-2026-11-07.md) (figures to 7 November)

---

## This month's summary

Three commitments this period: keep managing issues and pull requests, build an onboarding tutorial or example project, and keep the documentation accurate. All three have work landed or in review.

The number that needs saying out loud is fifteen. Fourteen pull requests merged in the repository this period, and all fourteen merged in the first three days of it. The eighteen I opened on 22 November, and the tutorial that followed, are still open and waiting on review.

| What I was asked to do | Where it stands | Evidence from this period |
| --- | --- | --- |
| Continue issue and pull request management | On track | 14 PRs merged, 6 of them other contributors' (4 from Dan Baruka, 2 from Kshot3000) on 10 and 11 November. 6 reviews submitted, 40 threads commented on, 7 issues opened, 4 closed, 3 of Dan's triage issues closed. Queue today: 38 open issues, 15 open PRs. |
| Build an onboarding tutorial or example project | Delivered, in review | A 326-line wallet tutorial, `cip-30-wallet-connect-mesh.md`, open as [#418](https://github.com/IntersectMBO/developer-experience/pull/418) and closing [#265](https://github.com/IntersectMBO/developer-experience/issues/265). Plus a working SocialFi example, built end to end in 80 minutes during the 26 November working group call. |
| Maintain documentation accuracy | In review | The brand colour roles are documented and rendered ([#407](https://github.com/IntersectMBO/developer-experience/pull/407), [#408](https://github.com/IntersectMBO/developer-experience/pull/408), [#409](https://github.com/IntersectMBO/developer-experience/pull/409)), the session archive has one URL shape and no duplicate session ([#414](https://github.com/IntersectMBO/developer-experience/pull/414), [#417](https://github.com/IntersectMBO/developer-experience/pull/417)), and five defects found while reading the docs are filed and fixed ([#422](https://github.com/IntersectMBO/developer-experience/issues/422) to [#427](https://github.com/IntersectMBO/developer-experience/pull/427)). |

---

## 1. Activity, 8 November to 27 November

| What I did | Count |
| --- | --- |
| Pull requests opened | 20 |
| Pull requests merged, repository, all authors | 14 |
| Pull requests merged, mine | 8 |
| Pull requests reviewed | 6 |
| Issues opened | 7 |
| Issues closed | 4 |
| Threads commented on | 40 |
| Commits, all branches, excluding merges | 36 |

Queue today: **38 open issues, 15 open pull requests.**

The month has two halves. The first three days cleared the backlog: my own landing-page stack, the report from last period, Dan's four, and Kshot3000's two. The rest of the month was build work, in one long pass on 22 November and a second on the tutorial over the following three days. Nothing merged in the repository after 11 November, and that is the honest headline of this report rather than a footnote.

---

## 2. Issue and pull request management

**Merged 10 and 11 November, mine.** The last four layers of the landing-page stack ([#383](https://github.com/IntersectMBO/developer-experience/pull/383), [#385](https://github.com/IntersectMBO/developer-experience/pull/385), [#386](https://github.com/IntersectMBO/developer-experience/pull/386), [#387](https://github.com/IntersectMBO/developer-experience/pull/387)), which closed out the "land the remaining layers" item from last period's report. The report itself ([#388](https://github.com/IntersectMBO/developer-experience/pull/388)), the Discord server invites removed from the site ([#390](https://github.com/IntersectMBO/developer-experience/pull/390)), the notable contributors page ([#391](https://github.com/IntersectMBO/developer-experience/pull/391)), and the local devnet link from Getting Started ([#382](https://github.com/IntersectMBO/developer-experience/pull/382)).

**Merged 10 and 11 November, other people's.** Six pull requests that were not mine, reviewed and merged:

| PR | Author | What it did |
| --- | --- | --- |
| [#392](https://github.com/IntersectMBO/developer-experience/pull/392) | danbaruka | Cleared the November Dependabot advisories across the website |
| [#398](https://github.com/IntersectMBO/developer-experience/pull/398) | danbaruka | Kept a card in section 04 when the session series is paused or over, closing [#378](https://github.com/IntersectMBO/developer-experience/issues/378) |
| [#399](https://github.com/IntersectMBO/developer-experience/pull/399) | danbaruka | Recreated the Dependabot labels when they are missing |
| [#400](https://github.com/IntersectMBO/developer-experience/pull/400) | danbaruka | Let the stale job see the whole open backlog |
| [#365](https://github.com/IntersectMBO/developer-experience/pull/365) | Kshot3000 | Standardised `website/` on npm and deleted the duplicate lockfiles, closing [#337](https://github.com/IntersectMBO/developer-experience/issues/337) |
| [#366](https://github.com/IntersectMBO/developer-experience/pull/366) | Kshot3000 | Extended CodeQL to the actions language and settled the suite on `security-extended` |

**Closed.** My own [#377](https://github.com/IntersectMBO/developer-experience/issues/377) (theme toggle order) and [#378](https://github.com/IntersectMBO/developer-experience/issues/378) (section 04), [#339](https://github.com/IntersectMBO/developer-experience/issues/339) (the braces advisory, with the dismissal bar written down), and [#337](https://github.com/IntersectMBO/developer-experience/issues/337). Dan's [#394](https://github.com/IntersectMBO/developer-experience/issues/394), [#396](https://github.com/IntersectMBO/developer-experience/issues/396) and [#397](https://github.com/IntersectMBO/developer-experience/issues/397) closed on 22 November as the tutorial and token work landed.

**Open, and the whole risk of this period.** Fifteen pull requests, all mine, all opened on 22 November except the tutorial. Nine carry an all-green check rollup; six show no checks recorded. Until they move, the work in sections 3 and 4 is visible to nobody but the two of us, and the queue number above reads as a stall rather than a pipeline.

---

## 3. Onboarding tutorial, and an example project

### 3.1 The tutorial

[#418](https://github.com/IntersectMBO/developer-experience/pull/418), `website/docs/tutorials/cip-30-wallet-connect-mesh.md`, 326 lines, plus one line in Getting Started that links to it. Closes [#265](https://github.com/IntersectMBO/developer-experience/issues/265).

The page is built around the observation that most Cardano front-end work now starts with a coding agent, and the agent's failure mode is not syntax, it is generation: it reaches for `BrowserWallet` and the `Transaction` class with full confidence, and neither is what Mesh's docs teach today. So the tutorial hands the agent Mesh's own documentation as a local file first, then builds a wallet connection and a first payment on preview testnet, then checks the four facts an agent reliably gets wrong:

- `BrowserWallet` is the previous class; the current one is `MeshCardanoBrowserWallet` from `@meshsdk/wallet`, and the old name still resolves from `@meshsdk/core`, which is what makes the mistake hard to see
- transactions are built with `MeshTxBuilder`, not the `Transaction` class
- raw wallet calls return CBOR; `getUtxosMesh()` and `getBalanceMesh()` return what the builder wants
- `BlockfrostProvider(key)` is the one call an agent gets right while getting the rest wrong

Seven steps follow: give the agent the docs, scaffold, wire the provider, connect and guard the network, read the address and UTxOs and amounts, build the payment, sign and submit and confirm. Then the whole page in one block, a troubleshooting section, and where to go next.

It went through three rewrites on 24 and 25 November. The MCP server was the method in the first cut, then the alternative to the local docs file, and the final commit cut the subsection entirely, so the page no longer mentions it.

### 3.2 The example project

Built during the Developer Experience working group call on 26 November, as a live demonstration of the workflow the tutorial teaches: the Cardano docs loaded in front of the agent, brand tokens taken from the Intersect brand kit, then a whole app.

Fifteen commits between 22:01 and 23:21 that evening. 64 files, roughly 2,300 lines of application code, and `tsc --noEmit` clean.

| Surface | What it does |
| --- | --- |
| First run | Creates a wallet in the browser: 24 words shown once, sealed with PBKDF2-SHA256 (210k) plus AES-GCM, stored in IndexedDB. No extension, no import step. Restore is the secondary path |
| Home | Pinned composer with a character counter, posts with a tip button and a tip count, follows |
| Tip sheet | Recipient, presets or a typed amount, one button, a receipt after signing. The payment builds, signs and submits on testnet and waits for confirmation |
| Messages | Peer list, thread, composer pinned at the bottom |
| Wallet | Balance, address with copy, faucet, receipts, lock, remove |

The stack is the current Mesh generation: `@meshsdk/wallet` 2.0.0-beta.11 for the headless wallet, `@meshsdk/provider` 1.9.0-beta.101 for Koios, `@meshsdk/core` for `MeshTxBuilder`. `@meshsdk/react` is deliberately absent, because it pins its own build of the wallet package. Every value comes from `.env.local`, 20 keys, all validated at boot, and nothing in app code reads `process.env` directly. Dark mode is a remap of the brand's semantic tokens, not a second palette, and the token file is generated from `docs/brand/tokens.css` so there is no second copy to drift.

State of the repository today: **local only, no remote.** It was a demonstration, not a deliverable, and whether it becomes a published example is your call, not mine.

---

## 4. Documentation accuracy

**Brand baseline.** [#376](https://github.com/IntersectMBO/developer-experience/issues/376) said the colour roles were undocumented and the gradient and alpha restrictions contradicted them. [#407](https://github.com/IntersectMBO/developer-experience/pull/407) writes the roles and the track hues down and corrects the two restrictions that had drifted, [#408](https://github.com/IntersectMBO/developer-experience/pull/408) renders them on the brand assets page so the page and the stylesheet cannot disagree in silence, and [#409](https://github.com/IntersectMBO/developer-experience/pull/409) finishes the Infima aliases so that page reads the brand tokens rather than a copy.

**Session archive.** The archive had two URL shapes, four folders that broke the lower-case convention, a misspelled folder, and two session 14s. [#410](https://github.com/IntersectMBO/developer-experience/pull/410) renames `sesion-notes` and keeps its URL working, closing [#406](https://github.com/IntersectMBO/developer-experience/issues/406). [#414](https://github.com/IntersectMBO/developer-experience/pull/414) gives every session notes page a slug and carries the three route fixes that follow. [#417](https://github.com/IntersectMBO/developer-experience/pull/417) renumbers the series from `q2-2026` so session 14 is used once, and closes both [#375](https://github.com/IntersectMBO/developer-experience/issues/375) and its last open decision, [#416](https://github.com/IntersectMBO/developer-experience/issues/416). [#411](https://github.com/IntersectMBO/developer-experience/pull/411), [#412](https://github.com/IntersectMBO/developer-experience/pull/412) and [#413](https://github.com/IntersectMBO/developer-experience/pull/413) were earlier cuts of the same work, closed as superseded rather than left to rot.

**Guides.** [#419](https://github.com/IntersectMBO/developer-experience/issues/419) asked for amounts, units and addresses taught with runnable examples. [#421](https://github.com/IntersectMBO/developer-experience/pull/421) adds the beginner page, [#420](https://github.com/IntersectMBO/developer-experience/pull/420) makes the preflight arithmetic a live block instead of a table.

**Things the site claimed and did not do.** Every link preview pointed at a social card that does not exist ([#422](https://github.com/IntersectMBO/developer-experience/issues/422), fixed in [#423](https://github.com/IntersectMBO/developer-experience/pull/423)). The footer logo resolved against the wrong base and 404'd on every page except the home page ([#424](https://github.com/IntersectMBO/developer-experience/issues/424), fixed in [#425](https://github.com/IntersectMBO/developer-experience/pull/425)). The sidebar was flat rows in the design and nested chevrons in the build ([#426](https://github.com/IntersectMBO/developer-experience/issues/426), fixed in [#427](https://github.com/IntersectMBO/developer-experience/pull/427)).

**Build and security.** [#405](https://github.com/IntersectMBO/developer-experience/pull/405) fails the build on high-severity dependency advisories, closing [#338](https://github.com/IntersectMBO/developer-experience/issues/338). [#404](https://github.com/IntersectMBO/developer-experience/pull/404) takes React 19 in one change, which is what [#403](https://github.com/IntersectMBO/developer-experience/issues/403) concluded the two Dependabot halves could not do alone; the two halves are closed. [#415](https://github.com/IntersectMBO/developer-experience/pull/415) calls git without a shell, so CodeQL alert 4 goes with it.

---

## 5. Next

- **Review and merge the fifteen.** Suggested order: brand and archive first ([#407](https://github.com/IntersectMBO/developer-experience/pull/407), [#409](https://github.com/IntersectMBO/developer-experience/pull/409), [#408](https://github.com/IntersectMBO/developer-experience/pull/408), [#410](https://github.com/IntersectMBO/developer-experience/pull/410), [#414](https://github.com/IntersectMBO/developer-experience/pull/414), [#417](https://github.com/IntersectMBO/developer-experience/pull/417)), because they are what the rest of the docs build on; then the guides ([#421](https://github.com/IntersectMBO/developer-experience/pull/421), [#420](https://github.com/IntersectMBO/developer-experience/pull/420), [#418](https://github.com/IntersectMBO/developer-experience/pull/418)); then the site fixes ([#423](https://github.com/IntersectMBO/developer-experience/pull/423), [#425](https://github.com/IntersectMBO/developer-experience/pull/425), [#427](https://github.com/IntersectMBO/developer-experience/pull/427), [#404](https://github.com/IntersectMBO/developer-experience/pull/404), [#405](https://github.com/IntersectMBO/developer-experience/pull/405), [#415](https://github.com/IntersectMBO/developer-experience/pull/415)).
- Decide whether the SocialFi example ships as a public repository, and under which org.
- Record the 26 November working group call. The Q4 archive stops at session 22.
- Decide whether the tutorial carries the MCP server as a second route, or the local docs file stays the only one. The final commit removed it, and the page no longer mentions it.

---

*Figures from the repository and the GitHub API on 27 November 2026. Commits are counted across all branches and exclude merges. Queue counts are `is:open` on the repository that day. The example app's figures are from the local checkout, which has no remote, and from a clean `tsc --noEmit`.*
