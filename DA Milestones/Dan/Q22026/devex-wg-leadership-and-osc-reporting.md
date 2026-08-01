# Developer Experience Working Group: Leadership & OSC Reporting

**Milestone:** Participate / Lead Developer Experience Working Group (Q2 2026)
**Goal:** Establish and sustain DevEx WG meeting cadence, grow participation, and provide regular progress updates to the Open Source Committee (OSC)
**Author:** Dan Baruka, Developer Advocate, Developer Experience Working Group
**Status:** Completed

---

## Executive summary

This document tracks Q2 2026 progress against the DevEx WG leadership milestone. The working group runs recurring sessions for Cardano developer onboarding and advocacy; Developer Advocates hold a standing block on the OSC agenda for regular updates.

The deliverable has three pillars:

1. **Cadence & participation**: maintain a predictable session schedule and actively seek contributor participation.
2. **OSC reporting**: submit a common progress report to the OSC every four weeks, with Developer Advocates alternating monthly.
3. **Strategic inputs**: maintain a shared record of developer-experience pain points (with an improvement plan) and produce draft documentation for Core Cardano repositories for review by OSC, TSC, and relevant Technical Working Group members.

---

## Task description

Participate in and help lead the Developer Experience Working Group. This includes:

- Establishing and maintaining the group's **meeting cadence**
- **Seeking participation** from newcomers, contributors, and Technical Working Group representatives
- Using the **OSC agenda block** allocated to Developer Advocates to provide regular working-group updates

---

## Acceptance criteria

| Criterion | How it is met | Evidence / location |
|-----------|---------------|---------------------|
| DevEx WG progress reported to OSC **every four weeks** | Developer Advocates alternate monthly; consolidated report submitted on the OSC cadence | [OSC reporting schedule](#osc-reporting-schedule) · [`../../DevEx-WG-Overview/Q1-2025.md`](../../DevEx-WG-Overview/Q1-2025.md) |
| **Alternating Developer Advocate** monthly | Advocates contribute sections to each monthly report | [Reporting rotation](#reporting-rotation) |
| **Pain points record** with improvement plan for OSC Open Source Strategy | Single common document maintained in this repo, updated as pain points are validated or resolved | [`developer-experience-pain-points-and-solutions.md`](developer-experience-pain-points-and-solutions.md) |
| **One common document** shared with OSC | Shared DevEx report consolidates WG status, pain points, and next actions, not per-advocate silos | [`../../DevEx-WG-Overview/Q1-2025.md`](../../DevEx-WG-Overview/Q1-2025.md) (template) · this document |
| Each Developer Advocate produces **draft documentation for Core Cardano repositories** | Per-advocate drafts tracked below; submitted for OSC / TSC / TWG review before inclusion on the DevEx site or upstream | [Core Cardano repo documentation](#core-cardano-repository-documentation) |

---

## Meeting cadence

The DevEx WG follows the cadence established in the [Shared DevEx Report to the OSC](../../DevEx-WG-Overview/Q1-2025.md):

| Element | Detail |
|---------|--------|
| **Frequency** | Weekly sessions, alternating morning and evening UTC slots to accommodate global time zones |
| **Format** | Online; recorded when possible; notes and recordings published on the DevEx site |
| **Planning** | Session plan maintained in the [Developer Experience WG Session Plan spreadsheet](https://docs.google.com/spreadsheets/d/1zJqCgjwqDzZ_4pPb9pODPuFDGt1HujOeQEpmy-OIWEw/edit?gid=0#gid=0) |
| **Calendar** | [Intersect events calendar](https://calendar.google.com/calendar/u/1?cid=Y19iMGMyODE3NWE2NTBkOGUwNzIwNTM2ZGU4OWE0NDMxMjFiYTcxYTVkMDgxYmRiOWU1NGRiZTU2NjI1NGY5ZGUwQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20) |
| **Participation** | Developer Advocates lead; Core Cardano contributors and TWG representatives join as needed |

---

## Q2 2026 session documentation (@danbaruka)

Session documentation authored by [@danbaruka](https://github.com/danbaruka) in Q2 2026, traced from git history on `website/docs/working-group/sessions/q2-2026/`.

| Session | Title | Documented | Commit(s) | Deliverables |
|---------|-------|------------|-----------|--------------|
| **16** | UI ↔ Smart Contracts: Wallets, Tx Building, and Submission | 2026-04-30 | [`8c88b3d`](https://github.com/IntersectMBO/developer-experience/commit/8c88b3d), [`bd7b0dd`](https://github.com/IntersectMBO/developer-experience/commit/bd7b0dd) | [Session notes](../../../website/docs/working-group/sessions/q2-2026/16-ui-smart-contract-interaction/session-notes/readme.md) · [Resources](../../../website/docs/working-group/sessions/q2-2026/16-ui-smart-contract-interaction/session-resources/readme.md) · [Recordings](../../../website/docs/working-group/sessions/q2-2026/16-ui-smart-contract-interaction/recordings/readme.md) |
| **17** | Default Developer Environment for Cardano | 2026-05-28 | [`7c2bf13`](https://github.com/IntersectMBO/developer-experience/commit/7c2bf13) | [Session notes](../../../website/docs/working-group/sessions/q2-2026/17-default-developer-environment/session-notes/readme.md) · [Resources](../../../website/docs/working-group/sessions/q2-2026/17-default-developer-environment/session-resources/readme.md) · [Recordings](../../../website/docs/working-group/sessions/q2-2026/17-default-developer-environment/recordings/readme.md) · [Q2 index update](../../../website/docs/working-group/sessions/q2-2026/index.md) |

### Session 16: UI ↔ Smart Contracts

- **Commit `8c88b3d`**: initial session structure, notes (~210 lines), resources, recordings placeholder, and Q2 session index entry (originally session 15, renumbered when dApp architecture took session 15).
- **Commit `bd7b0dd`**: renumbered to session 16; updated category, notes, resources, and recordings paths.

**Focus:** CIP-30 wallet flows, transaction lifecycle (build → evaluate → sign → submit → confirm), client-only vs hybrid vs server-custody architectures, and indexer/data-provider trade-offs (Kupo/Ogmios, Blockfrost/Koios/Maestro).

### Session 17: Default Developer Environment for Cardano

- **Commit `7c2bf13`**: full session documentation (notes, resources, recordings placeholder), Q2 session index entry for session 17, and advanced README cross-link for Yaci DevKit.

**Focus:** Working-group debate on the recommended default environment for new Cardano builders: local devnets vs public testnets, hosted providers vs self-hosted nodes, and a graduation path from first setup to mainnet.

---

## OSC reporting schedule

Reports are submitted to the Open Source Committee on a **four-week cycle**. Developer Advocates alternate monthly; each contributes session summaries, onboarding metrics, and documentation progress for inclusion in the common report.

### Reporting rotation

| Month (Q2 2026) | Contributors |
|-----------------|--------------|
| April 2026 | All Developer Advocates |
| May 2026 | All Developer Advocates |
| June 2026 | All Developer Advocates |

### Common report structure

Each OSC submission should follow the structure in [`../../DevEx-WG-Overview/Q1-2025.md`](../../DevEx-WG-Overview/Q1-2025.md):

1. **Working group overview**: mission, cadence, participants
2. **Current DevEx status**: high-level assessment (onboarding, documentation, sessions, site)
3. **Pain points & improvement plan**: link to or excerpt from the common pain-points document
4. **Sessions & community engagement**: sessions held, recordings, notable onboarding outcomes
5. **Documentation progress**: Core Cardano repo drafts and site updates
6. **Next actions**: owners and target dates for the following four-week period

---

## Developer Experience pain points

Pain points affecting the Open Source Strategy are maintained in a **single common document** so OSC receives one coherent view rather than fragmented updates.

**Canonical document:** [`developer-experience-pain-points-and-solutions.md`](developer-experience-pain-points-and-solutions.md)

| Pain point | Priority | Improvement plan (summary) |
|------------|----------|----------------------------|
| Fragmented onboarding: no unified roadmap | High | Canonical `getting-started.md` with profile-based tracks |
| Documentation inconsistency & staleness | Medium | Lightweight doc template; quarterly stale-page audit |
| Tooling overlap: no opinionated guidance | Medium | Decision guide for SDK / contract-language choice |

The pain-points document consolidates evidence from the [2025 DevEx survey](../Q42025/intersect-developer-experience-survey-2025.md) and the [Q4-2025 Shared DevEx Report](../../DevEx-WG-Overview/Q1-2025.md). Update it when new friction is validated in sessions or survey feedback.

---

## Core Cardano repository documentation

Each Developer Advocate produces **draft documentation** for assigned Core Cardano repositories. Drafts are reviewed by OSC, TSC, and relevant Technical Working Group members before publication on the DevEx site or upstream contribution to the target repo.

Reference list of Core Cardano repositories: [`../../../website/docs/resources/repositories.md`](../../../website/docs/resources/repositories.md)

Existing advanced guides on the DevEx site (e.g. [Haskell Core Contributor](../../../website/docs/how-to-guide/advanced/haskell-core-contributor.md), [Cardano API](../../../website/docs/how-to-guide/advanced/cardano-api.md)) satisfy or partially satisfy Core Cardano documentation needs; additional per-repo drafts are produced by Developer Advocates as assigned.

### Draft documentation standard

Drafts should follow the structure already used in DevEx advanced guides:

- **Objective**: who the doc is for and what they can do after reading it
- **Prerequisites**: language skills, tooling, prior reading (link to [Cardano Blueprint](https://cardano-scaling.github.io/cardano-blueprint/introduction/index.html) where relevant)
- **Repository overview**: what the repo governs, how it fits in the stack
- **First contribution path**: concrete first issue or doc fix, with time estimate
- **Troubleshooting**: common setup failures
- **Next steps**: links to formal specs, issues, and related repos

---

## Coordination & resources

| Resource | Purpose | Link |
|----------|---------|------|
| DevEx website | Canonical docs and session hub | [devex.intersectmbo.org](https://devex.intersectmbo.org/) |
| Session plan spreadsheet | Q2 schedule and topic ownership | [Session Plan](https://docs.google.com/spreadsheets/d/1zJqCgjwqDzZ_4pPb9pODPuFDGt1HujOeQEpmy-OIWEw/edit?gid=0#gid=0) |
| Shared DevEx OSC report (template) | Structure for four-week submissions | [`../../DevEx-WG-Overview/Q1-2025.md`](../../DevEx-WG-Overview/Q1-2025.md) |
| Pain points & solutions | Common OSC strategy input | [`developer-experience-pain-points-and-solutions.md`](developer-experience-pain-points-and-solutions.md) |
| Contribution standards | Required for all advocate-produced docs | [`../../../CONTRIBUTING.md`](../../../CONTRIBUTING.md) |

---

## Related Q2 2026 deliverables

| Deliverable | Milestone | Document |
|-------------|-----------|----------|
| Pain points with proposed solutions | #105 | [`developer-experience-pain-points-and-solutions.md`](developer-experience-pain-points-and-solutions.md) |
| D&I onboarding guide (Non-English-first developers) | #76 | [`language-inclusive-onboarding-guide.md`](language-inclusive-onboarding-guide.md) |

These feed directly into OSC reporting and the Open Source Strategy pain-points record.

---

*Deliverable: Participate / Lead Developer Experience Working Group: leadership, OSC reporting, and Core Cardano documentation. Completed, Q2 2026.*
