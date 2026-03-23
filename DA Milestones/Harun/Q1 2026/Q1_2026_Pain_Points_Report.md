# Milestone Report: Developer Experience Pain Points (Q1 2026)

**Reporting Advocate:** Harun Waweru Mwangi  
**Milestone Period:** Q1 2026  
**Working Group:** Developer Experience (DevEx)  
**Contract Milestone:** Yes

**Goal:** Foster Innovation & Technology Advancement

---

## Milestone Description

- **Acceptance Criteria:** Document 2–3 pain points with proposed solutions in the Developer Experience repo.
- **Due Date:** Q1 2026

---

## Overview

The following pain points were identified through Q1 2026 Working Group sessions, one-on-one developer meetings, and direct feedback from community builders and students.

---

## Pain Point 1: Fragmented Documentation

**Identified in:** Session 10 (Wallet Integration), Session 11 (Open Source & Documentation), developer onboarding meetings.

Cardano's documentation is spread across the Cardano Foundation, IOG, Intersect, and individual project repositories with no single authoritative entry point. Session 10 attendees described the challenge of "connecting the dots," noting that progressing from a "Hello World" tutorial to running a node requires navigating several disconnected sources. Session 11 surfaced a clear community consensus: developers want a centralised front door, such as `developers.cardano.org`, that aggregates and curates resources across the ecosystem.

**Proposed Solution:** Advocate for a centralised documentation hub as the canonical entry point for Cardano developers. In the interim, the Developer Experience repository maintains a curated index of essential links organised by developer journey stage, which the DevEx Working Group surfaces in onboarding sessions.

---

## Pain Point 2: No Interactive Playgrounds for Smart Contract Languages

**Identified in:** Session 09 (Community Builder Story), feedback from Bernard Sibanda's students at Coxygen, Session 13 (Smart Contracts & Languages).

Bernard Sibanda, who manages a talent pool of over 600 students in Africa, noted that many lack the hardware to run full Cardano development environments locally. The Cardano ecosystem currently has a playground only for Marlowe. Languages such as **Aiken**, **Plutarch**, **Plu-ts**, and **Plinth** have no browser-based equivalent where developers can write, test, and explore code without local setup. Getting a working environment running remains the hardest part of starting with Cardano, a barrier that falls disproportionately on students and developers in hardware-constrained regions.

**Proposed Solution:** Raise the gap with the Open Source Committee and relevant Technical Working Groups as a funded development priority. Encourage ecosystem teams (Aiken, MLabs, TxPipe) to explore browser-based REPL or playground tooling. In the near term, document and promote cloud-based alternatives such as GitHub Codespaces and Gitpod as a viable workaround.

---

## Pain Point 3: Missing Conceptual "Middle Layer" in Technical Documentation

**Identified in:** Session 11 (Open Source & Documentation), developer onboarding meetings.

Robertino Martinez raised a gap that resonated widely in Session 11: Cardano's documentation tends to exist at two extremes, high-level user guides for beginners and low-level generated API references such as Haddock for Plutus. What is missing is a conceptual middle layer that explains _why_ modules exist, _how_ they interact, and what mental models developers need before diving into the raw API. This is particularly acute for developers from other ecosystems who understand programming but need context for Cardano-specific concepts like the eUTxO model or the relationship between on-chain and off-chain code. A related issue raised by Israel Chizungu is version drift: documentation referencing deprecated library versions sends developers down dead-end paths and erodes trust.

**Proposed Solution:** Work with the Open Source Committee to identify high-priority Core Cardano repositories lacking conceptual documentation and propose a structured contribution effort. Developer Advocates can draft conceptual overview documents as part of ongoing working group deliverables, and version indicators should be treated as a mandatory standard modelled in the DevEx repo.

---

## Pain Point 4: No Clear Developer Pathway into Cardano

**Identified in:** CATS 2026 masterclass feedback, developer onboarding meetings, Session 12 (Cardano Developer Pathway).

Across onboarding sessions with Jayson, Kadiri, Tony, and others, and reinforced at the CATS 2026 masterclass led by Dan Baruka, the most consistent finding was that developers want to build on Cardano but do not know where to start. The ecosystem offers multiple languages, learning programs, and contribution paths, but no single resource makes clear how they fit together or which path suits a given developer's background. At CATS, the room was full of motivated developers whose most common question was not "is this worth learning?" but "where do I begin?"

This directly motivated redesigning Session 12 from an ecosystem wrap-up into a full "Cardano Developer Pathway" session, mapping routes from complete beginner to Core Contributor or dApp Builder across every available track.

**Proposed Solution:** Maintain the Cardano Developer Pathway as a living document in the DevEx repo, updated each quarter as tooling and programs evolve. Developer Advocates reference it in every onboarding session and surface it prominently in the DevEx portal.

---

## Evidence

- [Session 09: Community Builder Story](https://devex.intersectmbo.org/docs/working-group/sessions/q1-2026/community-builder-story/session-notes)
- [Session 10: Wallet Integration](https://devex.intersectmbo.org/docs/working-group/sessions/q1-2026/wallet-integration/Session-1/session-notes)
- [Session 11: Open Source & Documentation](https://devex.intersectmbo.org/docs/working-group/sessions/q1-2026/open-source-docs/session-notes)
- [Session 12: Cardano Developer Pathway](https://devex.intersectmbo.org/docs/working-group/sessions/q1-2026/cardano-developer-pathway/session-notes)
