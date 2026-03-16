# Community Engagement Report

**Q1 2026** · Developer Experience Working Group

---

## Executive Summary

Q1 2026 showed **strong progress** on global community building: increased contributions to the developer-experience repository (new PRs and issues), **new contributions from Developer Advocates and community to core Cardano repos** (e.g. [evolution-sdk](https://github.com/IntersectMBO/evolution-sdk)), higher engagement through 1:1 meetings, and **new participants** in DevEx sessions. A recurring challenge is the **limited involvement of senior developers** in core Cardano projects; most contributions remain in the “good first issue” range, with few deep or sustained contributions to core repositories.

---

## 1. Outreach Efforts

### 1.1 Repository and Documentation Outreach

| Channel | Activity | Outcome |
|--------|----------|---------|
| **developer-experience repo** | Regular updates, new guides, session docs, integration content | 8+ new contributors in Q1 2026; multiple new PRs and issues |
| **DevEx docs site** | Session calendar, search, MRP and FAQ updates | Clear entry point for new and returning participants |
| **Integration guides** | Blaze SDK + Yaci Store guide (PR #186), collaboration with Blaze and Yaci teams | Documented path for local/indexer workflows; draft doc open for OSC/TSC/TWG review |
| **Session documentation** | Wallet Integration, Smart Contracts & Languages, Session 1 & 2 structure | Recordings and notes published; reusable learning material |

### 1.2 Direct Engagement

- **1:1 meetings:** Ongoing 1:1 conversations with developers to understand needs, blockers, and interests; used to tailor content and session topics.
- **DevEx sessions:** Weekly alternating (morning/evening UTC) sessions to support global attendance; sessions recorded and documented where possible.
- **Cross-team collaboration:** Coordination with technical teams (e.g. Blaze, Yaci) on documentation and integration guides.

### 1.3 Core Repository Contributions (evolution-sdk)

Developer Advocates and community contributors (including DevEx-onboarded developers) delivered new contributions to the core [evolution-sdk](https://github.com/IntersectMBO/evolution-sdk) repository in Q1 2026:

| PR | Description | Author | Status |
|----|-------------|--------|--------|
| [#185](https://github.com/IntersectMBO/evolution-sdk/pull/185) | fix: use Conway maxRefScriptSizePerTx limit 204,800 bytes (200 KiB) — align TxBuilderImpl with Conway ledger constant; closes #178 | @danbaruka (DA) | Open |
| [#184](https://github.com/IntersectMBO/evolution-sdk/pull/184) | fix: upgrade Vitest to 4.x to fix CI onTaskUpdate timeout — resolves intermittent CI failures; closes #176 | @danbaruka (DA) | Open |
| [#165](https://github.com/IntersectMBO/evolution-sdk/pull/165) | feat(koios): replace Schema.Object with typed Schema.Struct for voting_procedures and proposal_procedures — improves runtime safety for Koios /tx_info parsing | @Mechack08 (community) | Open |
| [#152](https://github.com/IntersectMBO/evolution-sdk/pull/152) | fix: remove residual dockerode dependencies from main package — completes Devnet separation; main SDK client-safe for browser (e.g. Next.js); closes #60 | @mbagalwa (community) | Merged |

These contributions show DA-led fixes and features in evolution-sdk, plus community and DevEx-onboarded contributors (e.g. Mechack08, mbagalwa) contributing to a core Cardano SDK.

---

## 2. Attendance & Participation

### 2.1 Session Attendance

- **Recurring DevEx sessions** continued with alternating time slots to support different regions.
- **New participants** joined sessions in Q1 2026; session docs and calendar in the docs site improved discoverability (session discoverability pain point addressed in Q1).
- **Format:** Online; sessions recorded and linked from the DevEx documentation site with full calendar information.

### 2.2 Contribution Metrics (developer-experience repo)

| Metric | Q1 2026 |
|--------|---------|
| **New contributors** | 8+ |
| **New pull requests** | Multiple (documentation, fixes, new content) |
| **New issues** | Community-reported and triaged |
| **Engagement type** | PRs, issues, discussions, session attendance |

These metrics indicate **growing engagement** with the shared DevEx resource and willingness to contribute to documentation and tooling.

---

## 3. Sentiment & Qualitative Assessment

### 3.1 Positive Indicators (Progress)

- **Good progression:** Steady improvement in documentation quality, session accessibility, and discoverability (e.g. DevEx sessions in docs with full calendar; changelog and release cadence in place).
- **New contributions:** Meaningful flow of PRs and issues in the developer-experience repo; contributors are addressing docs, fixes, and good-first-issue style work.
- **1:1 engagement:** Direct conversations are helping to align content with developer needs and to identify recurring pain points.
- **New session participants:** Broader attendance and new faces in DevEx sessions, including from regions that benefit from the alternating schedule.
- **Collaboration:** Productive work with Blaze, Yaci, and other teams on integration guides and core Cardano documentation.
- **Core repo contributions from DA:** New pull requests from Developer Advocates to [evolution-sdk](https://github.com/IntersectMBO/evolution-sdk) (e.g. [#185](https://github.com/IntersectMBO/evolution-sdk/pull/185) Conway maxRefScriptSizePerTx fix, [#184](https://github.com/IntersectMBO/evolution-sdk/pull/184) Vitest 4.x CI fix), alongside community contributions ([#165](https://github.com/IntersectMBO/evolution-sdk/pull/165) Koios schema by Mechack08, [#152](https://github.com/IntersectMBO/evolution-sdk/pull/152) dockerode removal by mbagalwa — merged).

### 3.2 Challenge: Senior Developer Contributions to Core Projects

- **Observation:** It remains **difficult to attract sustained contributions from senior developers** to core Cardano projects. Most contributions are in the “good first issue” category (docs, small fixes, clear-scope tasks).
- **Impact:** Core repositories would benefit from more experienced contributors for design, review, and deeper technical work; current engagement is skewed toward onboarding-friendly contributions.
- **Context:** This is a known ecosystem dynamic: senior contributors are often time-constrained and may need clearer incentives, recognition, or structured pathways (e.g. maintainer retainer program, clear “next step” issues) to engage with core projects.
- **Next steps:** Continue to document and promote contribution paths; work with OSC and technical working groups to highlight opportunities and reduce friction for experienced developers (e.g. MRP visibility, issue labelling, onboarding for core repos).

---

## 4. Summary Table

| Area | Status | Notes |
|------|--------|-------|
| **Outreach efforts** | ✅ Strong | Repo activity, new guides, 1:1s, cross-team collaboration; core repo (evolution-sdk) PRs from DA and community |
| **Attendance** | ✅ Good | New participants; sessions documented with full calendar |
| **Sentiment** | ✅ Positive overall | Good progression; engagement and contributions growing |
| **Senior contributions to core** | ⚠️ Limited | Most activity remains good-first-issue level; opportunity for improvement |

---

## 5. Conclusion

Outreach, attendance, and sentiment all improved in Q1 2026. Evidence includes new contributors and PRs (developer-experience and evolution-sdk), 1:1 engagement, and new session participants. The main focus for the next period is **increasing senior developer contributions to core Cardano projects** while keeping current momentum in onboarding and community engagement.

---

*Community Engagement Report · Q1 2026 · Developer Experience Working Group*
