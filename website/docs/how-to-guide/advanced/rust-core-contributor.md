---
sidebar_position: 6
title: Rust Core Contributor
---

# Rust Core Contributor

This guide covers contributing to Cardano's core protocol in Rust: through Amaru (a full node implementation), Pallas (protocol primitives), Dolos (data node), and related projects.

Before reading further, make sure you have read the [Cardano Blueprint](https://cardano-scaling.github.io/cardano-blueprint/introduction/index.html). The same protocol the Haskell node implements is what you are implementing in Rust: the Blueprint explains it without assuming any particular language or codebase.

## Choose Your Focus

The key decision is which layer of the stack you want to work on:

| Goal | Start here |
|---|---|
| Protocol primitives: CBOR encoding, mini-protocols, ledger types | [Pallas](https://github.com/txpipe/pallas) |
| Full Rust Cardano node: consensus, ledger, networking | [Amaru](https://github.com/pragma-org/amaru) |
| Chain data access and indexing at the node level | [Dolos](https://github.com/txpipe/dolos) |
| Event streaming pipelines from the chain | [Oura](https://github.com/txpipe/oura) |
| Off-chain transaction building in Rust | [Whisky](https://github.com/sidan-lab/whisky) |

**How these projects relate:**

```
Pallas (protocol primitives: CBOR, mini-protocols, ledger types)
  ├── Dolos  (data node built on Pallas)
  ├── Amaru  (full node: uses Pallas primitives)
  └── Oura   (event pipeline built on Pallas)
```

Start with Pallas if you are new to the Cardano protocol. Its primitives are the shared foundation: once you understand CBOR encoding, the UTxO model in Rust types, and the mini-protocol framing, contributing to Amaru or Dolos becomes significantly easier.

## Environment Setup

The Rust path has a much simpler setup than the Haskell path: no Nix required for most projects.

```bash
# Install the Rust toolchain
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Clone and build Pallas (the starting point)
git clone https://github.com/txpipe/pallas
cd pallas
cargo build
```

Amaru may require additional system dependencies for its storage backends: check the repo's `README` for current setup instructions.

## Progression: Starting with Pallas

Pallas is the most accessible entry point. Its crates are well-documented and independently useful:

1. Clone the repo and run `cargo build`: it just works
2. Read the [`pallas-primitives`](https://github.com/txpipe/pallas/tree/main/pallas-primitives) crate: this is the Cardano data model in Rust (blocks, transactions, UTxOs)
3. Read the [`pallas-network`](https://github.com/txpipe/pallas/tree/main/pallas-network) crate: the mini-protocol implementation
4. Find a [good first issue](https://github.com/txpipe/pallas/issues?q=is%3Aopen+label%3A%22good+first+issue%22) in the codec, network, or traverse modules
5. Open a PR: review cycles are typically days, not weeks

## Progression: Contributing to Amaru

Amaru is a full, from-scratch Rust implementation of a Cardano node: consensus, ledger rules, and networking. It implements the same formal specifications as the Haskell node, making it both a conformance testing target and a core protocol contribution.

1. **Read the [Cardano Blueprint](https://cardano-scaling.github.io/cardano-blueprint/introduction/index.html)**: essential before reading Amaru's code
2. **Read the [Amaru repository](https://github.com/pragma-org/amaru)**: understand how it decomposes the node into ledger, consensus, and network stages
3. **Read the relevant formal spec** for the area you want to contribute to: ledger rules: Shelley/Conway spec; consensus: Ouroboros Praos paper (same ground truth as the Haskell path)
4. **Get Pallas familiarity first**: Amaru builds on Pallas types extensively
5. **Find a [good first issue](https://github.com/pragma-org/amaru/issues?q=is%3Aopen+label%3A%22good+first+issue%22)**: ledger rule implementations and test coverage are the most accessible areas
6. **Conformance testing** between Amaru and the Haskell node is high-value work that requires understanding the specs but not Haskell fluency: this is a strong first contribution area

> Amaru implements the same formal specifications as the Haskell node. Any work on Amaru's ledger or consensus logic requires reading the same specs as the Haskell path: the Rust path does not skip that step.

## The Formal Specifications

These apply to the Rust path just as much as Haskell:

| Document | What it specifies |
|---|---|
| [Shelley Ledger Formal Spec](https://github.com/IntersectMBO/cardano-ledger/releases) | The foundational ledger rules using small-step semantics (STS) |
| [Conway Ledger Spec](https://github.com/IntersectMBO/cardano-ledger/releases) | CIP-1694 governance, DRep ratification, committee logic |
| [Ouroboros papers](https://iohk.io/en/research/library/) | The family of consensus protocol proofs (Classic, BFT, Praos, Genesis) |

## Intersect-Funded Rust Projects

Several Rust projects are officially funded under Intersect's [POSM Maintainer Retainer programme](https://committees.docs.intersectmbo.org/intersect-open-source-committee/about/paid-open-source-model-posm/maintainer-retainer/project-list):

| Repository | Maintained by | What it does | Issues |
|---|---|---|---|
| [Amaru](https://github.com/pragma-org/amaru) | Pragma | Full Rust Cardano node: consensus, ledger, networking | [Good first issues](https://github.com/pragma-org/amaru/issues?q=is%3Aopen+label%3A%22good+first+issue%22) |
| [Pallas](https://github.com/txpipe/pallas) | TxPipe | Protocol primitives: CBOR, mini-protocols, ledger types | [Good first issues](https://github.com/txpipe/pallas/issues?q=is%3Aopen+label%3A%22good+first+issue%22) |
| [Dolos](https://github.com/txpipe/dolos) | TxPipe | Lightweight data node built on Pallas | [Issues](https://github.com/txpipe/dolos/issues) |
| [Oura](https://github.com/txpipe/oura) **[MR]** | TxPipe | Event streaming pipeline from the chain | [Issues](https://github.com/txpipe/oura/issues) |
| [Whisky](https://github.com/sidan-lab/whisky) **[MR]** | Sidan Lab | Off-chain transaction building in Rust | [Issues](https://github.com/sidan-lab/whisky/issues) |

For a searchable directory of Rust tools in the Cardano ecosystem (Dolos, Oura, Pallas, Whisky and others), see the [Cardano Builder Tools directory](https://developers.cardano.org/tools/).

*Back to [Core Protocol Contributor](./core-protocol-contributor.md): or see [Haskell](./haskell-core-contributor.md) or [Go](./go-core-contributor.md).*
