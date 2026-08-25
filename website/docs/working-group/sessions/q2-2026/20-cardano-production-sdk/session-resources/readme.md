---
title: "Session 20: Building a Production Cardano SDK: From Validators to dApp - Resources"
sidebar_label: Session Resources
slug: /working-group/q2-2026/sessions/20-cardano-production-sdk/session-resources
---

# Session 20: Building a Production Cardano SDK: From Validators to dApp - Resources

Resources for building production-grade offchain SDKs on Cardano, with the DCU Toolkit as the case study.

## Case Study

- **DCU Toolkit source repository (onchain + SDK, MVP under active development)**: [tx-meta/dcu-kit](https://github.com/tx-meta/dcu-kit)
- **DCU SDK on npm**: [@tx-meta/dcu-kit](https://www.npmjs.com/package/@tx-meta/dcu-kit)
- **Live demo dApp**: [kyama.vercel.app](https://kyama.vercel.app/)
- **Example scripts**: one CLI script per endpoint under `sdk/examples/` in the repository, covering the full ROSCA lifecycle on Preprod
- **License**: the repository currently uses the [Business Source License 1.1](https://github.com/tx-meta/dcu-kit/blob/main/LICENSE); review its terms before production or commercial use

## Session Materials

- **[Session notes](../session-notes/readme.md)**: curated explanation of the architecture, SDK patterns, live walkthrough, and open design problems
- **[Recording page](../recordings/readme.md)**: recording status and session highlights

## Core Tooling

- **Lucid Evolution SDK**: [Anastasia-Labs/lucid-evolution](https://github.com/Anastasia-Labs/lucid-evolution)
- **Effect TypeScript Library**: [Effect Documentation](https://effect.website/)
- **Aiken**: [aiken-lang.org](https://aiken-lang.org)

## Standards Referenced

- **CIP-68 Datum Metadata Standard**: [cips.cardano.org/cip/CIP-0068](https://cips.cardano.org/cip/CIP-0068)
- **CIP-30 Wallet Connector**: [cips.cardano.org/cip/CIP-0030](https://cips.cardano.org/cip/CIP-0030)

## Background Reading

- **ROSCAs (Rotating Savings and Credit Associations)**: the cooperative finance model (Chamas, SACCOs, Tontines) the toolkit digitizes
- **Cardano Testnets Faucet** (for following along on Preprod): [docs.cardano.org/cardano-testnets/tools/faucet](https://docs.cardano.org/cardano-testnets/tools/faucet)
- **Related sessions**: [Session 14: Repository Walkthrough: Offchain and SDK building](../../14-sdk-repo-walkthrough/session-notes/readme.md), [Session 15: dApp Architecture](../../15-dapp-architecture-demo/session-notes/readme.md)

---

*These resources belong to the Q2 2026 Developer Experience Working Group.*
