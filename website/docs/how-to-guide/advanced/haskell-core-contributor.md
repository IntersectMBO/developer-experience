---
sidebar_position: 5
title: Haskell Core Contributor
---

# Haskell Core Contributor

This guide covers contributing to the reference Cardano node implementation: `cardano-ledger`, `ouroboros-consensus`, `cardano-node`, and their companion libraries. This is the Haskell path.

Before reading further, make sure you have read the [Cardano Blueprint](https://cardano-scaling.github.io/cardano-blueprint/introduction/index.html): the implementation-independent guide to how the protocol works. It is the best orientation before navigating any of these repositories.

**New to Haskell?** Work through the [IOG Haskell Course](https://github.com/input-output-hk/haskell-course) first. It is a beginner-friendly, 22-lesson curriculum built by IOG that takes you from zero Haskell knowledge to practical productivity, with video lessons and hands-on exercises. It assumes no prior Haskell experience and is specifically designed with Cardano development in mind.

## The Repositories

The core of Cardano is implemented in Haskell across several tightly coupled repositories. Start with `cardano-ledger` for ledger rules or `ouroboros-consensus` for chain selection and block validation: these are the two deepest entry points.

| Repository | What it governs | Issues |
|---|---|---|
| [`cardano-ledger`](https://github.com/IntersectMBO/cardano-ledger) | All ledger rules: how transactions are validated, how state transitions work using the STS framework | [Issues](https://github.com/IntersectMBO/cardano-ledger/issues) |
| [`ouroboros-consensus`](https://github.com/IntersectMBO/ouroboros-consensus) | The Ouroboros consensus algorithm, chain selection, and block validation | [Issues](https://github.com/IntersectMBO/ouroboros-consensus/issues) |
| [`ouroboros-network`](https://github.com/IntersectMBO/ouroboros-network) | The peer-to-peer networking layer: mini-protocols, connection management | [Issues](https://github.com/IntersectMBO/ouroboros-network/issues) |
| [`cardano-node`](https://github.com/IntersectMBO/cardano-node) | The node executable that ties ledger, consensus, and networking together | [Issues](https://github.com/IntersectMBO/cardano-node/issues) |
| [`cardano-api`](https://github.com/IntersectMBO/cardano-api) | High-level Haskell library over ledger/consensus; the interface used by CLI and tooling | [Issues](https://github.com/IntersectMBO/cardano-api/issues) |
| [`cardano-cli`](https://github.com/IntersectMBO/cardano-cli) | The official command-line interface: good for contributor-friendly Haskell issues | [Issues](https://github.com/IntersectMBO/cardano-cli/issues) |
| [`cardano-base`](https://github.com/IntersectMBO/cardano-base) | Shared cryptography, slotting, and binary serialization libraries used across the stack | [Issues](https://github.com/IntersectMBO/cardano-base/issues) |
| [`plutus`](https://github.com/IntersectMBO/plutus) | The Plutus Core language and execution engine: compiler, evaluator, cost models | [Issues](https://github.com/IntersectMBO/plutus/issues) |

When browsing issues, filter by the `good first issue` label to find tasks suitable for new contributors, or by `help wanted` for issues where the team is actively looking for outside input. You can also filter by area (e.g. `ledger`, `consensus`, `testing`) to narrow down to your domain of interest.

> **Important distinction**: The [Plutus Pioneer Program](https://developers.cardano.org/docs/smart-contracts/plutus/) teaches you to write on-chain validators. It does not prepare you to contribute to `cardano-ledger` or `ouroboros-consensus`. These are different jobs. Completing the Plutus Pioneer Program is not a prerequisite here.

## Step 0: The Dependency Wall

Every core Cardano Haskell repository has a complex dependency graph involving GHC version constraints, C library dependencies, cryptographic primitives, and cross-platform linker flags.

**Attempting to resolve this manually will fail.** Depending on your OS and distribution, it ranges from painful to impossible. On NixOS specifically, non-Nix builds do not work by design.

**[Nix](https://nixos.org/download) is the standard working environment.** A `nix develop` invocation drops you into an environment where all dependencies are pinned, present, and working.

Getting started with Nix:
- [`nix-installer` by Determinate Systems](https://github.com/DeterminateSystems/nix-installer): the recommended installer
- [`devenv`](https://devenv.sh/): a developer-friendly layer on top of Nix
- Each repo's `flake.nix` or `shell.nix` defines the development shell: run `nix develop` from the repo root

## The Formal Specifications

The Haskell implementation must match the formal specifications. These are the ground truth.

| Document | What it specifies |
|---|---|
| [Shelley Ledger Formal Spec](https://github.com/IntersectMBO/cardano-ledger/releases) | The foundational ledger rules using small-step semantics (STS) |
| [Conway Ledger Spec](https://github.com/IntersectMBO/cardano-ledger/releases) | CIP-1694 governance, DRep ratification, committee logic |
| [Ouroboros papers](https://iohk.io/en/research/library/) | The family of consensus protocol proofs (Classic, BFT, Praos, Genesis) |

The STS (small-step semantics) framework that governs all ledger rules is the conceptual backbone of `cardano-ledger`. Understanding it is the difference between reading the code and understanding it.

## Your Most Accessible Entry Point: Testing

You do not need to implement a new ledger rule to make a valuable core contribution. **Writing tests is often where new contributors start**, and it is high-value work.

`cardano-ledger` has substantial test infrastructure built on property-based testing:

- **[Hedgehog](https://github.com/hedgehogqa/haskell-hedgehog)** and **[QuickCheck](https://github.com/nick8325/quickcheck)** are used throughout
- **Conformance testing**: verifying that alternative implementations (Rust, Go, etc.) match the Haskell ledger rules: is an ongoing effort and a legitimate core contribution
- The test suite documents expected behavior; writing a test for an existing rule is a concrete, reviewable contribution

**Good first issues in the testing area:**
- Search for `good first issue` or `testing` labels in [`cardano-ledger` issues](https://github.com/IntersectMBO/cardano-ledger/issues)
- Look at existing `Spec` modules in `cardano-ledger` to understand the testing patterns

## How to Contribute a CIP

A Cardano Improvement Proposal (CIP) is how many core contributions happen: especially changes to ledger rules, protocol parameters, or cryptographic primitives.

**What becomes a CIP vs. a PR:**
- Changes that affect the protocol specification → CIP
- Bug fixes, test additions, or implementation details that don't change the spec → normal PR/issue

**The CIP stages:**
1. **Proposed**: draft submitted to the [CIPs repository](https://github.com/cardano-foundation/CIPs) as a PR
2. **Candidate**: reviewed and accepted by CIP editors, open for community comment
3. **Active**: ratified and incorporated into a hard fork or ecosystem tooling

**Key contacts and venues:**
- CIP editors review submissions in the CIPs repo PRs
- Intersect's TSC working groups often discuss CIPs in progress: see [Intersect Working Groups](../../working-group/sessions/q1-2026/07-contributing-intersect/session-notes/readme.md)
- The `#cip-discussion` channel in the Intersect Discord is the informal venue for early feedback. Join Intersect first to get access: see the [Intersect Membership Guide](../../intersect-membership-guide.md)

The [CIPs repository README](https://github.com/cardano-foundation/CIPs/blob/master/README.md) has the authoritative process document. Reading a few merged CIPs (CIP-1694, CIP-0381) before writing your own will calibrate your expectations. You can browse all ratified and draft CIPs at [cips.cardano.org](https://cips.cardano.org/).

## Governance Protocol Work

Governance in Cardano operates at three distinct layers: don't conflate them:

| Layer | What it is | Example work |
|---|---|---|
| **Governance participation** | Being a DRep, voting, joining Intersect | Register as a DRep, join a working group |
| **Governance tooling** | Application development on governance infrastructure | GovTool, Agora, wallet integrations for voting |
| **Governance protocol** | Core ledger rules governing governance itself | CIP-1694 implementation in `cardano-ledger`, Conway era rules, DRep pulsing, ratification logic |

The Conway era modules in `cardano-ledger` are a good starting point for governance protocol work:
- [`Cardano.Ledger.Conway.Rules`](https://github.com/IntersectMBO/cardano-ledger/tree/master/eras/conway/impl/src/Cardano/Ledger/Conway/Rules): the STS rules for governance
- The Conway formal spec (linked above)
- [Governance model](https://developers.cardano.org/docs/governance/cardano-governance/governance-model/) — how on-chain governance works end to end
- [Governance actions](https://developers.cardano.org/docs/governance/cardano-governance/governance-actions/) — the types of actions the ledger can ratify

For governance participation and tooling, see the [Intersect Membership Guide](../../intersect-membership-guide.md).

*Back to [Core Protocol Contributor](./core-protocol-contributor.md): or continue to [Rust](./rust-core-contributor.md) or [Go](./go-core-contributor.md).*
