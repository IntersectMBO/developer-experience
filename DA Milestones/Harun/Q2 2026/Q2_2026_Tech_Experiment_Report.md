# Milestone Report: Foster Innovation & Technology Advancement (Q2 2026)

- **Reporting Advocate:** Harun Waweru Mwangi
- **Milestone Period:** Q2 2026
- **Working Group:** Developer Experience (DevEx)
- **Contract Milestone:** Yes
- **Goal:** Foster Innovation & Technology Advancement

---

## Description

This milestone was fulfilled through Session 21 of the Q2 2026 Developer Experience Working Group series. The session presented a live technical experiment using the DCU Toolkit to demonstrate the path from Cardano validators to a production SDK and an integrated web application.

---

## Session Details

- **Session:** Session 21 – Building a Production Cardano SDK: From Validators to dApp
- **Date:** 11 June 2026
- **Format:** Live technical walkthrough, CLI demonstration, and Preprod web application demo
- **Presenter and Project Owner:** Harun Waweru Mwangi
- **Case Study:** DCU Toolkit
- **Demo Application:** A demo web app ([Kyama](https://kyama.vercel.app/))

---

## Technical Experiment

The DCU Toolkit experiments with using Cardano smart contracts to enforce the rules of rotating savings and credit associations, commonly known as Chamas, Tontines, Susu, Chit funds, or Tandas.

The session demonstrated three connected layers:

- **On-chain:** Aiken validators for accounts, groups, treasury operations, and protocol settings, using CIP-68 token pairs for membership and authorization.
- **SDK:** Seventeen TypeScript transaction-building endpoints built with Lucid Evolution and Effect, with typed errors and multiple execution modes for scripts and production applications.
- **Application:** A demo web app (Kyama) that integrates the SDK into a user-facing savings-circle workflow.

The walkthrough also covered production SDK practices such as deriving addresses and policy IDs from the compiled blueprint, aligning off-chain schemas with validator datums and redeemers, testing endpoints in an emulator, and versioning the validators, SDK, examples, and specifications together.

---

## Live Demonstration

The CLI demonstration showed how to build and locally package the SDK, create an account on Cardano Preprod, inspect the confirmed transaction, and identify its CIP-68 reference and user authorization NFTs.

The live UI demonstration showed:

- Connecting a Lace test wallet.
- Creating an on-chain account.
- Creating a new savings circle with its financial and cycle rules.
- Joining an existing circle from a second wallet.
- Observing the pooled funds increase from **50 ADA to 100 ADA** after the second member joined.

The rotation and payout stage was not executed during the session because of time.

---

## Evidence

**Session Recording:** [Building a Production Cardano SDK: From Validators to dApp](https://www.youtube.com/watch?v=LgtSZ8vPGPU)

**Session Notes:** [devex.intersectmbo.org – Session 21](https://devex.intersectmbo.org/docs/working-group/q2-2026/sessions/21-cardano-production-sdk/session-notes)

---

## Outcomes

- Completed a live technical experiment and repository walkthrough during a DevEx Working Group meeting.
- Demonstrated account and savings-circle transactions on Cardano Preprod through both CLI and web interfaces.
- Showcased a reusable approach for wrapping Aiken validators in a typed TypeScript SDK.
- Connected the validator, SDK, and application layers in an end-to-end developer workflow.
- Published the recording and supporting resources for the wider Cardano developer community.

Bringing the project owner into the DevEx Working Group to present and run the live Preprod demonstration fulfilled the acceptance criteria for this milestone.
