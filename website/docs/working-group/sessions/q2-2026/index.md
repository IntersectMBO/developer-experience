---
title: "Developer Experience Working Group (Q2: Apr–Jun 2026)"
---

# Developer Experience Working Group (Q2: Apr–Jun 2026)

## Purpose & Why

The Developer Experience (DevEx) Working Group continues to support and empower developers and contributors in the Cardano ecosystem. For Q2 (Apr–Jun 2026), our focus shifts towards application development, utilizing APIs and SDKs, and understanding advanced development architectures.

## Session Plan (Sessions 14+)

| Session | Title | Focus | Format |
|---------|-------|-------|--------|
| **14** | **Repository Walkthrough: Offchain and SDK building** | Deep dive into offchain architecture | Workshop |
| **15** | **dApp Architecture: From Wallet to Backend** | Modular breakdown of full-stack dApp flow | Workshop |
| **16** | **UI ↔ Smart Contracts: Wallets, Tx Building, and Submission** | End-to-end dApp interaction patterns + architecture trade-offs | Workshop |
| **17** | **Default Developer Environment for Cardano** | Working-group debate on what we recommend by default to new builders | Discussion |
| **18** | **Building a Production-Grade MCP Server for Cardano** | AI tooling for Cardano — UTxOs, governance, smart contracts via MCP | Demo + Discussion |
| **19** | **One API Call to Understand Cardano** | Blockfrost JSON: UTxOs, submit, confirm on Preview | Demo + walkthrough |

## Session Details

### Session 14: Repository Walkthrough: Offchain and SDK building
- **Objective**: Provide architectural clarity on building offchain code and using SDKs
- **Key Topics**:
  - Production smart contract offchain repository walkthrough
  - Building your first offchain application logic
  - Connecting SDKs to the blockchain for transaction building
- **Deliverable**: Smart Contract Offchain Overview

### Session 15: dApp Architecture: From Wallet to Backend
- **Objective**: Explain the 4-layer architecture for Cardano dApps
- **Key Topics**:
  - Frontend, Wallet, Backend, and Blockchain responsibilities
  - Failure handling in distributed systems
  - Polling vs. Webhooks for payment verification
- **Deliverable**: [dApp Architecture Session Notes](./15-dapp-architecture-demo/session-notes/readme.md)

### Session 16: UI ↔ Smart Contracts: Wallets, Tx Building, and Submission
- **Objective**: Teach the *practical* ways a UI app interacts with Cardano validators (Aiken/Plutus) using modern wallet + SDK flows, with clear trade-offs and diagrams.
- **Key Topics**:
  - CIP-30 wallet connector fundamentals (connect, UTxOs, sign, submit)
  - Transaction lifecycle (build → evaluate → sign → submit → confirm)
  - 2–3 recommended architectures (client-only vs hybrid vs server-custody)
  - Indexers and data providers (Kupo/Ogmios, Blockfrost/Koios/Maestro)
- **Deliverable**: Best-practice integration guide + diagrams

### Session 17: Default Developer Environment for Cardano
- **Objective**: Agree on a default developer environment to recommend to newcomers, and the graduation path from "first ten minutes" to mainnet.
- **Key Topics**:
  - Local devnets (Yaci DevKit, cardano-node devnet) vs public testnets (Preview / PreProd)
  - Hosted providers (Blockfrost / Maestro / Koios) vs self-hosted nodes (cardano-node + Ogmios + Kupo)
  - One-click / Dockerized / Codespaces-style sandboxes
  - Recommended flow debate: what is the *single* environment we point new builders at?
- **Deliverable**: [Default Developer Environment Session Notes](./17-default-developer-environment/session-notes/readme.md)

### Session 18: Building a Production-Grade MCP Server for Cardano
- **Objective**: Demonstrate how to give AI agents deep, idiomatic access to Cardano — UTxOs, native assets, smart contracts, and CIP-1694 governance — using the Model Context Protocol.
- **Key Topics**:
  - Why Cardano needed a purpose-built MCP server (eUTxO vs account model)
  - Server architecture: 6 modules, 38 tools, multi-API strategy (Blockfrost / Koios / Maestro / Kupo)
  - CIP-1694 governance module and IPFS metadata enrichment
  - Live demo: querying UTxOs, governance proposals, and CBOR datums from inside Claude Code
  - Lessons learned: Zod defaults, IPFS edge cases, Koios tail latencies
- **Deliverable**: [Session Notes](./18-cardano-mcp-server/session-notes/readme.md) | [Resources](./18-cardano-mcp-server/session-resources/readme.md)

### Session 19: One API Call to Understand Cardano
- **Objective**: Use simple Blockfrost calls and dummy JSON to explain how Cardano holds value (UTxOs) and what happens when a transaction is submitted and confirmed on chain.
- **Key Topics**:
  - `GET /addresses/{address}/utxos` and reading lovelace in JSON
  - Off-chain build, sign, and `POST /tx/submit` (CBOR)
  - Mempool to block: polling `GET /txs/{hash}` until confirmed
  - Inputs, outputs, change, and fees via `GET /txs/{hash}/utxos`
  - Preview testnet hands-on checklist
- **Deliverable**: [Session Notes](./19-one-api-call-blockfrost/session-notes/readme.md) | [Resources](./19-one-api-call-blockfrost/session-resources/readme.md)

## Working Group Information
For operational details, roles, repository structure, and participation guidelines, please see the [Working Group Overview](../../readme.md).

---
_This plan is a living document and will be updated based on participant feedback and community needs._
