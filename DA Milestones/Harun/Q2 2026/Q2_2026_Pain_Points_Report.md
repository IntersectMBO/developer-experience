# Milestone Report: Developer Experience Pain Points (Q2 2026)

- **Reporting Advocate:** Harun Waweru Mwangi
- **Milestone Period:** Q2 2026
- **Working Group:** Developer Experience (DevEx)
- **Contract Milestone:** Yes
- **Goal:** Foster Innovation & Technology Advancement

---

## Milestone Description

- **Acceptance Criteria:** Document 2–3 pain points with proposed solutions in the Developer Experience repo.
- **Due Date:** Q2 2026

---

## Overview

The following pain points were identified through the Q2 2026 Developer Experience Working Group sessions led or co-led by Harun Waweru Mwangi. They reflect recurring technical gaps demonstrated during the sessions rather than a claim that every point was explicitly raised by an attendee.

---

## Pain Point 1: Missing Bridge Between Validators and Complete Applications

**Identified in:** Session 14 (Repository Walkthrough – Offchain and SDK Building), Session 21 (Building a Production Cardano SDK: From Validators to dApp).

Cardano learning resources frequently explain how to write validators or construct individual transactions, but provide less guidance on turning those components into a complete application. Developers must connect compiled blueprints, off-chain endpoints, command-line workflows, wallets, network providers, and user interfaces while keeping their types and assumptions aligned. This leaves a difficult gap between understanding a smart contract and shipping a usable dApp.

**Proposed Solution:** Publish and maintain end-to-end reference implementations that connect validators, generated blueprints, typed SDK endpoints, CLI examples, wallet integration, and a working interface. Sessions 14 and 21 provide two stages of such a reference: off-chain foundations followed by a complete Preprod application workflow.

---

## Pain Point 2: Fragmented and Version-Sensitive Cardano Tooling

**Identified in:** Session 18 (Using AI in Your Cardano Dev Workflow), reinforced by Sessions 14 and 21.

Cardano developers work across rapidly evolving languages and SDKs including Aiken, Plutus/Plinth, Mesh, Lucid Evolution, Blaze, TX3, and Scalus. Documentation, examples, and generated code can silently target incompatible or deprecated versions. The resulting version drift wastes development time and makes it difficult to know which examples represent current recommended practice.

**Proposed Solution:** Treat explicit version information as a documentation requirement and maintain curated, versioned reference repositories. Project documentation should expose current guidance through machine-readable sources, reusable skills, and MCP servers where appropriate, while examples should pin the exact libraries and network assumptions they use.

---

## Pain Point 3: AI Tools Lack Cardano-Native Context

**Identified in:** Session 18 (Using AI in Your Cardano Dev Workflow).

Generic AI coding tools are more familiar with account-based blockchain models and often apply those assumptions to Cardano. They may attempt to mutate validator state, invent datum or redeemer fields, mix incompatible SDK versions, or generate code against obsolete APIs. Without strong grounding and developer review, plausible-looking output can be incorrect, insecure, or unnecessarily expensive on-chain.

**Proposed Solution:** Use a plan-first workflow grounded in the actual project: compiled `plutus.json`, design specifications, pinned dependencies, maintained reference repositories, and current documentation supplied through skills or MCP servers. Generate tests before validator logic, and introduce verification gates covering compilation, expected state transitions, authorization, security risks, and execution costs.

---

## Pain Point 4: Missing Production-Grade SDK Patterns

**Identified in:** Session 14 (Repository Walkthrough – Offchain and SDK Building), Session 21 (Building a Production Cardano SDK: From Validators to dApp).

Low-level transaction builders give developers flexibility but do not by themselves provide the stable interfaces required by applications. Without shared patterns for endpoint design, execution, and errors, each project must independently decide how to expose transactions, derive identifiers, report failures, and keep off-chain schemas synchronized with validator datums and redeemers. Hardcoded addresses and policy IDs further increase the risk of configuration and deployment errors.

**Proposed Solution:** Document a common production SDK pattern based on typed endpoints, structured error taxonomies, safe and unsafe execution modes, and identifiers derived from the compiled blueprint. Version validators, SDK code, examples, and specifications together so application developers receive one coherent interface.

---

## Pain Point 5: Limited End-to-End Testing and Verification Examples

**Identified in:** Session 14 (Repository Walkthrough – Offchain and SDK Building), Session 21 (Building a Production Cardano SDK: From Validators to dApp).

Validator unit tests are necessary but do not prove that an application can build, sign, submit, and confirm the intended transactions. Problems can emerge in datum encoding, authorization tokens, wallet interaction, network configuration, or UI integration even when the validator itself passes its tests. Developers need examples that demonstrate verification across the complete application boundary.

**Proposed Solution:** Combine endpoint-level emulator tests and complete transaction tests with Preprod verification, CLI examples, wallet-based flows, and an integrated demo application. Document expected transaction outputs and failure conditions so developers can validate each layer before deployment.

---

## Evidence

- [Session 14: Repository Walkthrough – Offchain and SDK Building](https://devex.intersectmbo.org/docs/working-group/q2-2026/sessions/14-sdk-repo-walkthrough/session-notes)
- [Session 18: Using AI in Your Cardano Dev Workflow](https://devex.intersectmbo.org/docs/working-group/q2-2026/sessions/18-cardano-ai-dev-workflow/session-notes)
- [Session 21: Building a Production Cardano SDK](https://devex.intersectmbo.org/docs/working-group/q2-2026/sessions/21-cardano-production-sdk/session-notes)
