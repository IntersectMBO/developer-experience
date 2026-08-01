---
sidebar_position: 7
title: Go Core Contributor
---

# Go Core Contributor

This guide covers contributing to Cardano's core protocol in Go: through **Dingo** (a full Go node implementation by Blink Labs) and **gouroboros** (the underlying Go Ouroboros networking library).

> **Stage**: Dingo is in active development and currently supports testnets (preview, preprod) and devnets. It is not yet production-ready for mainnet. This is a great time to contribute: the codebase is young, issues are well-labelled, and the team is actively onboarding contributors.

Before reading further, make sure you have read the [Cardano Blueprint](https://cardano-scaling.github.io/cardano-blueprint/introduction/index.html). The Blueprint explains the Cardano protocol in implementation-independent terms: equally applicable to Go, Haskell, and Rust.

## The Projects

| Repository | What it does | Where to start |
|---|---|---|
| [blinklabs-io/node](https://github.com/blinklabs-io/node) | **Dingo**: full Go Cardano node: chain sync, UTxO tracking, Plutus V1/V2/V3, block production, multiple storage backends | [Good first issues](https://github.com/blinklabs-io/node/issues?q=is%3Aopen+label%3A%22good+first+issue%22) |
| [blinklabs-io/gouroboros](https://github.com/blinklabs-io/gouroboros) | Go implementation of the Ouroboros networking protocol: mini-protocols, connection multiplexing, CBOR codec | [Good first issues](https://github.com/blinklabs-io/gouroboros/issues?q=is%3Aopen+label%3A%22good+first+issue%22) |

**How these relate:**

```
gouroboros (Ouroboros mini-protocols in Go: the networking layer)
  └── Dingo (full node built on gouroboros)
```

Start with `gouroboros` if you want to work on the networking and protocol layer. Start with `Dingo` directly if you want to work on ledger rules, UTxO handling, block production, or the API layer.

## Environment Setup

The Go path has the simplest setup of all three language paths: standard Go toolchain, no Nix required.

```bash
# Install Go (1.21+ recommended)
# https://go.dev/dl/

# Clone and build Dingo
git clone https://github.com/blinklabs-io/node
cd node
go build ./...

# Or clone gouroboros
git clone https://github.com/blinklabs-io/gouroboros
cd gouroboros
go build ./...
```

## Progression: Starting with gouroboros

1. Clone the repo and run `go build ./...`
2. Read the `protocol/` directory: each Ouroboros mini-protocol (ChainSync, BlockFetch, TxSubmission, etc.) is implemented as a separate package
3. Read the [Cardano Blueprint networking section](https://cardano-scaling.github.io/cardano-blueprint/introduction/index.html) to understand what each mini-protocol does before reading the Go code
4. Find a [good first issue](https://github.com/blinklabs-io/gouroboros/issues?q=is%3Aopen+label%3A%22good+first+issue%22): protocol implementation gaps, test coverage, and codec improvements are common entry points
5. Open a PR

## Progression: Contributing to Dingo

1. **Read the [Cardano Blueprint](https://cardano-scaling.github.io/cardano-blueprint/introduction/index.html)**: essential context before reading the node code
2. **Get gouroboros familiarity**: Dingo uses it for all node-to-node communication; understanding the mini-protocol layer makes the rest of the codebase readable
3. **Read the relevant formal spec** for the area you want to contribute to: ledger rules: Shelley/Conway spec; consensus: Ouroboros Praos paper
4. **Explore the codebase**: Dingo is organized around:
   - `ledger/`: UTxO state, transaction validation
   - `chainsync/`: chain synchronization using gouroboros
   - `blockproducer/`: block production for stake pool operators
   - `api/`: external APIs (UTxO RPC, Blockfrost-compatible REST, Rosetta/Mesh)
5. **Find a [good first issue](https://github.com/blinklabs-io/node/issues?q=is%3Aopen+label%3A%22good+first+issue%22)**: UTxO validation, API coverage, and test infrastructure are the most accessible areas
6. **Conformance testing** between Dingo and the Haskell node is high-value work: verifying that both nodes agree on ledger state for the same inputs is a concrete, testable contribution that doesn't require deep Go expertise

## What Makes the Go Path Distinct

**APIs are a first-class concern.** Dingo exposes multiple external APIs out of the box:
- [UTxO RPC](https://utxorpc.org/): a gRPC-based standard for UTxO chain interaction
- Blockfrost-compatible REST: drop-in replacement for applications already using Blockfrost
- Rosetta/Mesh: for exchange and wallet integrations

Contributing to these API layers requires understanding the protocol (what data is available and what it means) but not the deep consensus or ledger math. This is a unique entry point not available in the Haskell or Rust paths.

**Pluggable storage.** Dingo supports multiple storage backends (Badger, SQLite, PostgreSQL, MySQL, cloud storage). Work on storage backends is largely Go-idiomatic without requiring protocol-specific knowledge: a good path for Go developers who want to contribute before diving into the ledger.

## The Formal Specifications

These apply to the Go path just as much as Haskell and Rust:

| Document | What it specifies |
|---|---|
| [Shelley Ledger Formal Spec](https://github.com/IntersectMBO/cardano-ledger/releases) | The foundational ledger rules |
| [Conway Ledger Spec](https://github.com/IntersectMBO/cardano-ledger/releases) | CIP-1694 governance, Conway era rules |
| [Ouroboros papers](https://iohk.io/en/research/library/) | The consensus protocol proofs |

Dingo and gouroboros are listed in the [Cardano Builder Tools directory](https://developers.cardano.org/tools/) alongside other node and infrastructure projects in the ecosystem.

*Back to [Core Protocol Contributor](./core-protocol-contributor.md): or see [Haskell](./haskell-core-contributor.md) or [Rust](./rust-core-contributor.md).*
