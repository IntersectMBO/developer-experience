# Developer Experience Working Group Sessions Report

- **Reporting Advocate:** Harun Waweru Mwangi
- **Reporting Period:** Q2 2026 (April–June)
- **Role:** Developer Advocate – Developer Experience Working Group Lead (Intersect)

---

## Summary

During Q2 2026, I led or co-led three Developer Experience Working Group sessions covering off-chain SDK development, AI-assisted Cardano workflows, and production application integration. I produced the documentation for all three sessions and co-facilitated the AI session with Dan Baruka.

---

## Sessions Led

### Session 14: Repository Walkthrough – Offchain and SDK Building (2026/04/16)

This session continued the Q4 2025 Payment Subscription smart contract walkthrough by moving from the Aiken validators to the off-chain SDK. It covered repository organization, extracting validators and policy IDs from `plutus.json`, building CIP-68 transactions with Lucid Evolution, aligning schemas with the on-chain specification, and testing transaction-building endpoints. The session showed how SDKs let application developers interact with contracts without implementing validator logic themselves.

**Recording:** https://devex.intersectmbo.org/docs/working-group/q2-2026/sessions/14-sdk-repo-walkthrough/recordings

**Session Notes:** https://devex.intersectmbo.org/docs/working-group/q2-2026/sessions/14-sdk-repo-walkthrough/session-notes

**Resources:** https://devex.intersectmbo.org/docs/working-group/q2-2026/sessions/14-sdk-repo-walkthrough/session-resources

---

### Session 18: Using AI in Your Cardano Dev Workflow (2026/05/14)

Co-facilitated with **Dan Baruka**, this session presented a repeatable workflow for using AI in Cardano development while keeping developers responsible for correctness and security. It covered plan-first orchestration, grounding models in `plutus.json`, pinned libraries and reference repositories, test-driven validator generation, reusable skills and rules, MCP servers for current documentation, AI verification gates for maintainers, and local models for reducing token costs.

**Recording:** https://www.youtube.com/watch?v=ckAx9WRlw_c

**Session Notes:** https://devex.intersectmbo.org/docs/working-group/q2-2026/sessions/18-cardano-ai-dev-workflow/session-notes

**Resources:** https://devex.intersectmbo.org/docs/working-group/q2-2026/sessions/18-cardano-ai-dev-workflow/session-resources

---

### Session 21: Building a Production Cardano SDK – From Validators to dApp (2026/06/11)

This session used the DCU Toolkit as an end-to-end case study connecting Aiken validators, a typed TypeScript SDK, CLI examples, and a demo web application. The live walkthrough created an account on Cardano Preprod, inspected its CIP-68 token pair, connected a Lace wallet, created a savings circle, and joined from a second wallet, increasing the pooled funds from 50 ADA to 100 ADA.

**Recording:** https://www.youtube.com/watch?v=LgtSZ8vPGPU

**Session Notes:** https://devex.intersectmbo.org/docs/working-group/q2-2026/sessions/21-cardano-production-sdk/session-notes

**Resources:** https://devex.intersectmbo.org/docs/working-group/q2-2026/sessions/21-cardano-production-sdk/session-resources

---

## Working Group Progress and OSC Reporting

The Developer Advocates maintained a weekly Q2 session cadence using alternating time slots. Progress, survey findings, consolidated pain points, and a phased improvement plan were recorded in the shared [Q2 2026 DevEx report to the Open Source Committee](https://github.com/IntersectMBO/developer-experience/blob/DA-milestones/DA%20Milestones/DevEx-WG-Overview/Q2-2026.md).

---

## Developer Experience Pain Points

### 1. Gap Between Validators and Application Development

**Solution:** Sessions 14 and 21 documented the path from compiled blueprint to SDK endpoints, CLI examples, and an integrated web interface, providing reusable patterns for projects moving beyond validator-only examples.

### 2. AI Tools Lack Cardano-Native Context

**Solution:** Session 18 documented how to ground AI in eUTxO concepts, current project files, pinned tool versions, design specifications, reference repositories, skills, and MCP servers instead of relying on stale account-model training data.

### 3. Inconsistent SDK Error Handling and Testing

**Solution:** Sessions 14 and 21 demonstrated typed error models, endpoint-level emulator tests, complete transaction tests, and Preprod verification, while deriving addresses and policy IDs from compiled blueprints instead of hardcoding them.

---

## Key Outcomes

- Session 14 notes, recording, and curated SDK resources published for the DevEx community.
- Session 18 AI development workflow, recording, safety guidance, and supporting resources produced.
- Session 21 recording published, with the complete session documentation submitted through Developer Experience PR #279.
- Two connected SDK learning resources produced: off-chain foundations followed by an end-to-end production integration case study.
- A practical reference for planning, grounding, testing, and auditing AI-assisted Cardano development made available to developers.
- Live Cardano Preprod transactions demonstrated through CLI and web application workflows.
- Shared Q2 DevEx pain-points record and phased improvement plan available for OSC review.
