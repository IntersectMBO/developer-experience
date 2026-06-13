---
title: Cardano Data Pipelines
description: An explainer of the Cardano data pipeline ecosystem — Blockfrost, Kupo, Oura, Yaci Store, and DB Sync — with guidance on choosing the right tool for your project.
sidebar_position: 2
---

# Cardano Data Pipelines

The Cardano node is intentionally minimal — it stores only what is needed to follow and validate the chain. Any application that needs to query balances, transaction history, smart contract state, or metadata must rely on a separate indexing layer.

This page explains the five most widely-used tools for that job, what each one is best at, and how to choose between them.

---

## Why the node doesn't do this itself

Cardano's infrastructure is modular by design. Rather than a monolithic node that validates the chain *and* answers arbitrary queries, the ecosystem has purpose-built tools for reading and indexing data — each optimised for a specific job. This keeps the node efficient and consensus-critical, while giving developers the flexibility to pick the data layer that fits their stack.

---

## The five core tools

### 1. Blockfrost

**Hosted API — no infrastructure required** · Maintained by Blockfrost.io

The fastest way to start querying Cardano. Sign up, get an API key, and you're reading blockchain data in minutes — no node, no database, no DevOps. Covers addresses, transactions, blocks, native assets, stake data, and smart contract state. SDKs available for JavaScript, TypeScript, Python, Go, Rust, and more.

**Best for:** Prototypes, hackathons, early-stage dApps, and any project that wants to move fast without managing infrastructure.

**Trade-off:** Rate limits on the free tier, no custom indexing logic, and a third-party dependency. High-throughput production use requires a paid plan.

**Getting started:** [blockfrost.io](https://blockfrost.io)

```bash
npm install @blockfrost/blockfrost-js
```

:::info Watch
[Blockfrost explained — Cardano Data Pipelines series](#) *(~3 min)*
:::

---

### 2. Kupo

**Lightweight self-hosted transaction output indexer** · Maintained by CardanoSolutions

Kupo indexes **transaction outputs** — both spent and unspent — matched against address or policy ID patterns you define. For each match it records the output reference, ADA and native asset values, datum, and script. It connects to the Cardano node through **Ogmios**, which is a required dependency, and exposes the results via a clean HTTP API.

**Best for:** dApp backends and wallet infrastructure that need self-hosted, low-latency output queries without the overhead of a full DB Sync instance.

**Trade-off:** Scoped to transaction outputs only. Does not cover staking, rewards, delegation, governance, or metadata. Requires both a running Cardano node and a running Ogmios instance.

**Getting started:** [cardanosolutions.github.io/kupo](https://cardanosolutions.github.io/kupo)

:::tip Local development
Yaci DevKit bundles Kupo and Ogmios together — see the [Yaci DevKit setup guide](../how-to-guide/advanced/yaci-devkit).
:::

:::info Watch
[Kupo explained — Cardano Data Pipelines series](#) *(~3 min)*
:::

---

### 3. Oura

**Real-time event pipeline** · Maintained by TxPipe

Oura connects to a Cardano node and streams on-chain events — transactions, outputs, datums, metadata, script executions — to pluggable sinks as they happen. Think of it as `tail` for the blockchain. Instead of querying data, you receive it. Supported sinks include Kafka, Elasticsearch, webhooks, stdout, and Redis.

**Best for:** Notification systems, analytics pipelines, and event-driven architectures where Cardano data needs to flow into existing infrastructure in real time.

**Trade-off:** A pipeline, not a store. No query API — it streams events to sinks. You need a separate storage layer if you want to query historical data.

**Getting started:** [github.com/txpipe/oura](https://github.com/txpipe/oura)

:::info Watch
[Oura explained — Cardano Data Pipelines series](#) *(~3 min)*
:::

---

### 4. Yaci Store

**Modular Java indexer with built-in REST API** · Maintained by Cardano Foundation (Bloxbean)

Yaci Store is a self-hosted Cardano indexer built in Java that ships with a **Blockfrost-compatible REST API** out of the box — meaning any SDK already wired to Blockfrost can point at Yaci Store with minimal config changes. It has full support for Cardano governance data (DRep delegations, voting power, proposal outcomes) and can be embedded directly into a Java Spring Boot application.

**Best for:** Java/JVM teams, projects that need governance data, and backends that want to embed Cardano indexing without running a separate process.

**Trade-off:** JVM is a prerequisite. Heavier than Kupo or Oura for simpler use cases.

**Getting started:** [github.com/bloxbean/yaci-store](https://github.com/bloxbean/yaci-store)

:::tip Local development with Yaci DevKit
Yaci DevKit bundles Yaci Store, a local Cardano node, and Yaci Viewer into a devnet you can spin up in seconds:
- [Setup a Local Cardano Devnet with Yaci DevKit](../how-to-guide/advanced/yaci-devkit) — Docker-based setup
- [Blaze SDK + Yaci DevKit](./blaze-yaci-store-integration) — using Yaci Store's Blockfrost-compatible API from TypeScript
:::

:::info Watch
[Yaci Store explained — Cardano Data Pipelines series](#) *(~3 min)*
:::

---

### 5. Cardano DB Sync

**Full ledger SQL database** · Maintained by IOG

DB Sync synchronises the entire Cardano ledger into PostgreSQL. Every transaction, every address, every stake delegation, every governance action, every native asset mint and burn — all of it, queryable via SQL. Block explorers like Cardanoscan run on DB Sync, as do most analytics and reporting platforms across the ecosystem.

**Best for:** Applications that need flexible, complex queries across the full ledger — explorers, analytics dashboards, compliance tools, and anything where you can't predict your data requirements in advance.

**Trade-off:** Resource-intensive. A full mainnet sync takes significant time and hundreds of gigabytes of disk. Not suitable for local development — use a hosted instance instead.

**Getting started:** [github.com/intersectmbo/cardano-db-sync](https://github.com/intersectmbo/cardano-db-sync) · [DB Sync how-to guide](../how-to-guide/advanced/cardano-db-sync) · Hosted instances via [Demeter.run](https://demeter.run)

:::info Watch
[DB Sync explained — Cardano Data Pipelines series](#) *(~3 min)*
:::

---

## Additional tools worth knowing

| Tool | What it does |
|------|-------------|
| **Ogmios** | WebSocket bridge to the Cardano node's live state — required by Kupo, also used for tx submission |
| **Scrolls** | Map/reduce indexing framework with a GraphQL API; fast for targeted queries on a defined data slice |
| **Dolos** | Lightweight Rust-based Cardano data node (beta); smaller footprint than `cardano-node`, exposes data via gRPC |
| **Carp** | Modular indexer built on Oura, strong for NFT metadata (CIP-25); stores data in PostgreSQL |
| **Demeter.run** | Managed platform hosting Ogmios, Kupo, DB Sync, Scrolls, and Oura as preconfigured services |
| **Cardano Ledger Sync** | Java-native Kafka-backed crawler from the Cardano Foundation for horizontally-scalable enterprise pipelines |

---

## Choosing the right tool

| Need | Reach for |
|------|-----------|
| Start querying today, no infrastructure | Blockfrost |
| Self-hosted transaction output queries | Kupo + Ogmios |
| React to on-chain events in real time | Oura |
| Java/JVM stack or governance data | Yaci Store |
| Full ledger with ad-hoc SQL queries | DB Sync |
| Custom GraphQL index over a data slice | Scrolls |
| Lightweight node alternative (beta) | Dolos |

Most production dApps combine tools. A common progression: **Blockfrost** for early development → **Kupo + Ogmios** for a self-hosted production backend → **Oura** feeding an analytics pipeline in parallel.

---

## Related guides

- [Setup a Local Cardano Devnet with Yaci DevKit](../how-to-guide/advanced/yaci-devkit)
- [Blaze SDK + Yaci DevKit](./blaze-yaci-store-integration)
- [Cardano DB Sync how-to](../how-to-guide/advanced/cardano-db-sync)
- [Build a Local Cardano Payment Detector](../tutorials/local-cardano-payment-detector)

---

*This guide is part of the [Developer Experience](https://devex.intersectmbo.org/) initiative.*
