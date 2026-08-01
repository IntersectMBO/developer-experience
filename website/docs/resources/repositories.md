---
sidebar_position: 1
---

# Essential Cardano Repositories

A curated reference of the repositories every Cardano developer should know. Projects marked with **[MR]** are officially funded under Intersect's [Paid Open Source Model (POSM) Maintainer Retainer programme](https://committees.docs.intersectmbo.org/intersect-open-source-committee/about/paid-open-source-model-posm/maintainer-retainer/project-list).

For guidance on which repos to start with, see the [Cardano Developer Pathway](../working-group/sessions/q1-2026/12-cardano-developer-pathway/readme.md).


## Core Protocol: Intersect Maintained

These repositories implement the Cardano protocol itself. They are maintained under the [IntersectMBO GitHub org](https://github.com/IntersectMBO) and funded through the POSM Maintainer Retainer programme.

| Repository | Language | What it does |
|---|---|---|
| [cardano-node](https://github.com/IntersectMBO/cardano-node) **[MR]** | Haskell | The Cardano node: ties ledger, consensus, and networking together |
| [cardano-ledger](https://github.com/IntersectMBO/cardano-ledger) **[MR]** | Haskell | All ledger rules using the STS framework; the ground truth for transaction validation |
| [ouroboros-network](https://github.com/IntersectMBO/ouroboros-network) **[MR]** | Haskell | The Ouroboros consensus algorithm, chain selection, and the p2p networking layer |
| [cardano-api](https://github.com/IntersectMBO/cardano-api) **[MR]** | Haskell | High-level Haskell library over ledger and consensus; used by the node, CLI, and tooling |
| [cardano-cli](https://github.com/IntersectMBO/cardano-cli) **[MR]** | Haskell | Official command-line interface for interacting with a Cardano node |
| [cardano-db-sync](https://github.com/IntersectMBO/cardano-db-sync) **[MR]** | Haskell | Follows the chain and mirrors it into PostgreSQL for querying |
| [plutus](https://github.com/IntersectMBO/plutus) **[MR]** | Haskell | The Plutus smart contract platform: Plutus Core language and execution engine |
| [cardano-base](https://github.com/IntersectMBO/cardano-base) **[MR]** | Haskell | Shared base libraries used across the core Cardano codebase (crypto, slotting, binary) |
| [lsm-tree](https://github.com/IntersectMBO/lsm-tree) **[MR]** | Haskell | Log-structured merge-tree implementation; the storage backend for the UTxO set in future node versions |
| [cardano-node-emulator](https://github.com/IntersectMBO/cardano-node-emulator) **[MR]** | Haskell | In-process Cardano node emulator for testing smart contracts without a real node |
| [cardano-prelude](https://github.com/IntersectMBO/cardano-prelude) **[MR]** | Haskell | Custom Prelude shared across core Haskell repos |
| [antaeus](https://github.com/IntersectMBO/antaeus) **[MR]** | Haskell | End-to-end integration tests for Plutus scripts against a live node |

> **Contributing to core repos**: See the [Core Protocol Contributor Guide](../how-to-guide/advanced/core-protocol-contributor.md) for environment setup (Nix is required), formal specifications, and accessible first contributions.


## Community Projects: Intersect Maintained

Community-built projects also funded under the POSM Maintainer Retainer programme.

| Repository | Language | What it does |
|---|---|---|
| [cardano-scaling/hydra](https://github.com/cardano-scaling/hydra) **[MR]** | Haskell | Hydra Head: Layer 2 isomorphic state channel protocol for fast, cheap transactions |
| [IntersectMBO/evolution-sdk](https://github.com/IntersectMBO/evolution-sdk) **[MR]** | Haskell | SDK for building on-chain governance and protocol evolution tooling |
| [MeshJS/mesh](https://github.com/MeshJS/mesh) **[MR]** | TypeScript | Full-featured TypeScript SDK: transactions, wallet connections, React components |
| [MeshJS/multisig](https://github.com/MeshJS/multisig) **[MR]** | TypeScript | Multi-signature transaction coordination built on Mesh |
| [txpipe/oura](https://github.com/txpipe/oura) **[MR]** | Rust | Pipeline tool for streaming and filtering Cardano chain events |
| [cardano-foundation/cardano-wallet](https://github.com/cardano-foundation/cardano-wallet) **[MR]** | Haskell | Reference wallet backend with REST API; used by hardware wallets and exchanges |
| [Plutonomicon/plutarch-plutus](https://github.com/Plutonomicon/plutarch-plutus) **[MR]** | Haskell | Embedded DSL in Haskell for writing Plutus validators; maximally expressive |
| [sidan-lab/whisky](https://github.com/sidan-lab/whisky) **[MR]** | Rust | Rust SDK for building and signing Cardano transactions |
| [sidan-lab/vodka](https://github.com/sidan-lab/vodka) **[MR]** | Haskell | Aiken test utilities and off-chain helpers for smart contract development |
| [GameChangerFinance/dandelion-lite](https://github.com/GameChangerFinance/dandelion-lite) **[MR]** | TypeScript | Lightweight Cardano API gateway and wallet connectivity layer |
| [Andamio-Platform/andamio-app-template](https://github.com/Andamio-Platform/andamio-app-template) **[MR]** | TypeScript | Template for building on the Andamio learning and contribution management platform |


## Smart Contract Languages

On-chain validator languages that compile to Plutus Core. Not all require Haskell knowledge.

| Repository | Language | Notes |
|---|---|---|
| [aiken-lang/aiken](https://github.com/aiken-lang/aiken) | Aiken | Recommended for new projects: Rust-like syntax, strong toolchain, active community |
| [Hyperion-BT/Helios](https://github.com/Hyperion-BT/Helios) | Helios | TypeScript-like syntax; good for frontend-first developers |
| [OpShin/opshin](https://github.com/OpShin/opshin) | Python | Write validators in a subset of Python |
| [nau/scalus](https://github.com/nau/scalus) | Scala | JVM-based smart contract language targeting Plutus Core |
| [Python-Cardano/pycardano](https://github.com/Python-Cardano/pycardano) | Python | Python library covering off-chain transaction building and simple script support |
| [input-output-hk/marlowe-cardano](https://github.com/input-output-hk/marlowe-cardano) | Marlowe | Domain-specific language for financial contracts; no Haskell required |
| [input-output-hk/plutus-pioneer-program](https://github.com/input-output-hk/plutus-pioneer-program) | Haskell | Course materials for learning Plutus directly |


## Off-Chain SDKs & Libraries

Libraries for building transaction logic, wallet integrations, and dApp frontends.

| Repository | Language | What it does |
|---|---|---|
| [Anastasia-Labs/lucid-evolution](https://github.com/Anastasia-Labs/lucid-evolution) | TypeScript | Actively maintained fork of Lucid; clean API for building and signing transactions |
| [butaneprotocol/blaze-cardano](https://github.com/butaneprotocol/blaze-cardano) | TypeScript | Transaction builder with a provider-agnostic design |
| [Emurgo/cardano-serialization-lib](https://github.com/Emurgo/cardano-serialization-lib) | Rust/WASM | Low-level serialization library; used internally by many SDKs |
| [Plutonomicon/cardano-transaction-lib](https://github.com/Plutonomicon/cardano-transaction-lib) | PureScript | PureScript SDK for building Plutus dApp frontends |
| [cardano-foundation/cardano-connect-with-wallet](https://github.com/cardano-foundation/cardano-connect-with-wallet) | TypeScript | React component library for CIP-30 wallet connections |


## Infrastructure & Indexers

Data access tools, indexers, and Rust protocol implementations.

| Repository | Language | What it does |
|---|---|---|
| [pragma-org/amaru](https://github.com/pragma-org/amaru) | Rust | Full Rust Cardano node: implements consensus, ledger rules, and networking from scratch against the same formal specs as the Haskell node |
| [blinklabs-io/node](https://github.com/blinklabs-io/node) | Go | **Dingo**: full Go Cardano node by Blink Labs: chain sync, UTxO tracking, Plutus V1/V2/V3, block production, pluggable storage (testnet/devnet, not yet mainnet) |
| [blinklabs-io/gouroboros](https://github.com/blinklabs-io/gouroboros) | Go | Go implementation of the Ouroboros networking protocol: mini-protocols, connection multiplexing, CBOR codec; used as the networking layer in Dingo |
| [txpipe/pallas](https://github.com/txpipe/pallas) | Rust | Rust protocol primitives: CBOR codec, chain sync, ledger types, mini-protocols. Most accessible Rust entry point for core contribution |
| [txpipe/dolos](https://github.com/txpipe/dolos) | Rust | Lightweight Cardano data node built on Pallas; designed for read-heavy workloads |
| [CardanoSolutions/ogmios](https://github.com/CardanoSolutions/ogmios) | Haskell | WebSocket bridge to cardano-node; exposes mini-protocols as a JSON/WebSocket API |
| [CardanoSolutions/kupo](https://github.com/CardanoSolutions/kupo) | Haskell | Fast, lightweight chain indexer: indexes UTxOs by address or script |
| [bloxbean/yaci-devkit](https://github.com/bloxbean/yaci-devkit) | Java | Local Cardano devnet toolkit; spins up a private network for testing in seconds |
| [bloxbean/yaci-store](https://github.com/bloxbean/yaci-store) | Java | Modular chain indexer built on the Yaci CBOR parser |

> Amaru (Rust), Dingo (Go), Pallas, and Dolos are **core protocol infrastructure**, not Layer 2: they implement the Cardano protocol in alternative languages. See the [Core Protocol Contributor](../how-to-guide/advanced/core-protocol-contributor.md) overview for language-specific guides.


## Governance & Standards

| Repository | What it does |
|---|---|
| [cardano-foundation/CIPs](https://github.com/cardano-foundation/CIPs) | Cardano Improvement Proposals: the formal process for protocol changes and standards |
| [Liqwid-Labs/agora](https://github.com/Liqwid-Labs/agora) | On-chain governance framework for DAOs built on Cardano |

> For the CIP contribution process: stages, editors, what qualifies: see the [Core Protocol Contributor Guide](../how-to-guide/advanced/core-protocol-contributor.md#how-to-contribute-a-cip).


## Developer Tools & Testing

| Repository | Language | What it does |
|---|---|---|
| [IntersectMBO/cardano-node-tests](https://github.com/IntersectMBO/cardano-node-tests) | Python | System-level integration and regression tests for cardano-node |
| [MeshJS/examples](https://github.com/MeshJS/examples) | TypeScript | Working examples for common Mesh patterns |
| [lidonation/Cardano-mcp](https://github.com/lidonation/Cardano-mcp) | TypeScript | MCP server exposing Cardano chain data to AI assistants |


## This Repository

| Repository | What it does |
|---|---|
| [IntersectMBO/developer-experience](https://github.com/IntersectMBO/developer-experience) | This documentation site: developer guides, working group sessions, and onboarding resources |

Contributions welcome: see the [Contributing Guidelines](https://github.com/IntersectMBO/developer-experience/blob/main/CONTRIBUTING.md).

*Missing a repository? Open an issue or PR on [IntersectMBO/developer-experience](https://github.com/IntersectMBO/developer-experience).*
