# Developer Experience — Pain Points & Proposed Solutions

**Milestone:** #105 — Pain Points with Solution (Q2 2026)
**Goal:** Foster Innovation & Technology Advancement — *document 2–3 pain points with proposed solutions in the Developer Experience repo*
**Author:** Dan Baruka, Developer Advocate — Developer Experience Working Group
**Status:** Draft for review

---

## Executive summary

The three pain points below share one root cause: **a newcomer's path into Cardano is fragmented**. It is fragmented at the *roadmap* level (no single place that says "start here and go there next"), at the *documentation* level (inconsistent, scattered, sometimes stale), and at the *tooling* level (many overlapping SDKs and contract languages with no opinionated guidance). Each compounds the others — and together they are the single biggest drag on developer onboarding.

This report documents each pain point, the evidence behind it, its impact, and a concrete, low-to-medium-effort proposed solution that the Developer Experience Working Group can act on within Q2–Q3 2026.

> **Note on scope:** the milestone calls for 2–3 pain points. Fragmented onboarding was selected as the priority; pain points 2 and 3 are treated as the documentation and tooling *facets* of that same fragmentation, so the report stays cohesive rather than covering three unrelated issues.

---

## Evidence base

This report does not introduce new claims — it consolidates findings the program has already produced:

| Source | What it provides | Location |
|--------|------------------|----------|
| Shared DevEx Report to the OSC (Q4-2025) | "Current DevEx Status" assessment with priority ratings | [`../../DevEx-WG-Overview/Q1-2025.md`](../../DevEx-WG-Overview/Q1-2025.md) |
| Intersect Developer Experience Survey — 2025 | Developer-reported challenges, tooling usage, language needs | [`../Q42025/intersect-developer-experience-survey-2025.md`](../Q42025/intersect-developer-experience-survey-2025.md) |
| DevEx getting-started guide | Current onboarding entry point | [`../../../website/docs/getting-started.md`](../../../website/docs/getting-started.md) |

---

## Pain Point 1 — Fragmented onboarding: no unified roadmap

**Priority:** High

### Description

New developers do not have a single, structured roadmap that tells them where to start and how to progress. Onboarding content exists, but it is spread across multiple repositories, the DevEx website, the Cardano Developer Portal, and community channels — with no canonical "front door" and no clear sequencing.

### Evidence

- The Q4-2025 DevEx status assessment rates **Developer Onboarding as "Needs Improvement", priority High**, and states plainly that documentation "remains fragmented and scattered across multiple repositories and platforms" and that "new developers often lack a clear, structured roadmap."
- The 2025 survey isolates **"Getting Started: the initial setup and knowing where to begin was confusing"** as one of the headline challenges (Q14), and asks developers to rate how hard it is to *find* resources at all (Q15) and to *start contributing* (Q16).

### Impact

Capable developers stall — or quit — before writing any code, not for lack of skill but for lack of a path. This directly undercuts every onboarding-related milestone in the program, because each Developer Advocate is effectively rebuilding the same map by hand for every newcomer they meet.

### Proposed solution

Establish **one canonical onboarding roadmap** with profile-based entry points:

1. Designate [`website/docs/getting-started.md`](../../../website/docs/getting-started.md) as the single authoritative "start here" page, and ensure every other onboarding surface links back to it rather than duplicating it.
2. Add **profile-based tracks** — e.g. *smart-contract developer*, *dApp / front-end developer (Web2 → Web3)*, *documentation / non-code contributor*, *infrastructure* — each a short ordered checklist of "do this, then this."
3. Cross-link the existing assets (Developer Portal, working-group sessions, the #76 D&I onboarding path) *into* the roadmap instead of leaving them as parallel islands.

**Effort:** Low–Medium · **Suggested owner:** DevEx WG (Developer Advocates, rotating) · **Success measure:** survey Q15/Q16 scores improve quarter-over-quarter; advocates can answer "where do I start?" with one link.

---

## Pain Point 2 — Documentation inconsistency & staleness

**Priority:** Medium

### Description

Documentation quality across Cardano repositories is uneven. Some core repos are well-maintained; others are outdated or lack practical, step-by-step guidance. Structure differs from repo to repo, and related resources are weakly cross-linked.

### Evidence

- The Q4-2025 status assessment rates **Documentation Quality as "Mixed"** and lists two observed issues directly: *"inconsistent structure across repositories"* (reduces discoverability) and *"limited cross-linking between related resources"* (hinders navigation and learning flow).
- In the 2025 survey, **Tooling & Documentation** is an explicit answer option for "biggest challenge" (Q14), phrased as "guides were unclear/outdated," and Documentation is rated directly in Q19.

### Impact

A developer who *does* find the right page often can't trust it — an outdated guide costs more time than no guide, because it fails silently. Inconsistent structure also means the skill of "knowing how to read these docs" doesn't transfer from one repo to the next.

### Proposed solution

1. Adopt a **lightweight documentation template/standard** for DevEx-maintained docs (objective → prerequisites → steps → troubleshooting → next steps) — the structure already recommended in [`CONTRIBUTING.md`](../../../CONTRIBUTING.md) — and apply it consistently.
2. Add a **"last reviewed" date** convention to maintained pages so staleness is visible at a glance.
3. Run a **cross-linking pass** on the DevEx docs so related pages point to each other, turning isolated pages into a navigable web.
4. Use `CODEOWNERS` to assign **clear ownership** for key doc areas, so review responsibility is unambiguous.

**Effort:** Medium · **Suggested owner:** DevEx WG + repo maintainers · **Success measure:** survey Q19 "Documentation" rating improves; reduction in broken-link / outdated-content issues reported.

---

## Pain Point 3 — Tooling & SDK choice paralysis

**Priority:** Medium

### Description

A newcomer choosing how to build on Cardano immediately faces a long menu of overlapping options with no opinionated guidance on what to pick for their situation.

### Evidence

The 2025 survey's own answer lists make the scale of the choice concrete:

- **Smart-contract languages (Q9):** Aiken, Haskell/Plutus-Tx, OpShin, Helios, Marlowe, Plu-ts, Scalus, Plinth, Tx3, Plutarch — *ten* options.
- **Off-chain / SDK tooling (Q11):** cardano-cli, Mesh, Lucid / Lucid Evolution, Blaze, PyCardano, Pallas, plus several services (Blockfrost, Koios, Maestro, Ogmios, Kupo) — *six-plus* SDKs alone.

For someone still on "Getting Started," this is not freedom of choice — it is a decision they are not yet equipped to make, and getting it wrong means re-learning later.

### Impact

Choice paralysis at the very first technical step. Developers either stall, or commit to a tool semi-randomly and lose time when it turns out not to fit their use case. It also makes advocate support harder, because there's no shared default to teach against.

### Proposed solution

Publish a short, **opinionated "Which tool should I use?" decision guide** in the DevEx docs:

1. A simple decision tree keyed to developer profile and use case (e.g. *"New to blockchain + want smart contracts → start with Aiken on testnet"*; *"Coming from Web2 front-end → start with a JS/TS SDK"*).
2. One **recommended default per profile**, with a one-line "choose something else if…" note — not a comprehensive comparison, deliberately opinionated.
3. Keep it explicitly *non-exhaustive*: the goal is to get a newcomer moving, not to catalogue the ecosystem.

This pairs naturally with the profile-based tracks in Pain Point 1's roadmap.

**Effort:** Low–Medium · **Suggested owner:** DevEx WG (Developer Advocates) · **Success measure:** survey Q14 "Tooling & Documentation" and Q11 patterns; advocates report fewer "which tool do I use?" support requests.

---

## Summary

| # | Pain point | Priority | Proposed solution | Effort | Suggested owner |
|---|------------|----------|-------------------|--------|-----------------|
| 1 | Fragmented onboarding — no unified roadmap | High | Canonical roadmap with profile-based tracks; consolidate entry points | Low–Med | DevEx WG |
| 2 | Documentation inconsistency & staleness | Medium | Doc template + "last reviewed" dates + cross-linking pass + `CODEOWNERS` | Medium | DevEx WG + maintainers |
| 3 | Tooling & SDK choice paralysis | Medium | Opinionated "which tool should I use?" decision guide | Low–Med | DevEx WG |

## Next steps

1. Review this report with the DevEx Working Group and confirm priority order.
2. Open a tracking issue in `IntersectMBO/developer-experience` for each accepted pain point so solutions are actionable and assignable.
3. Fold the outcomes into the next Shared DevEx Report to the OSC, aligned with the Open Source Strategy.
4. Re-measure against the 2025 survey questions cited above to track whether the solutions move the numbers.

---

*Deliverable: Milestone #105 — Pain Points with Solution. Draft for review — Q2 2026. Evidence consolidated from the Q4-2025 Shared DevEx Report and the Intersect Developer Experience Survey 2025.*
