---
title: Cardano Data Pipelines
description: A technical guide to the Cardano data pipeline ecosystem — Blockfrost, Kupo, Oura, Yaci Store, DB Sync, and supporting tools — with guidance on choosing the right tool for your use case.
sidebar_position: 2
---

# Cardano Data Pipelines

The Cardano node is intentionally minimal. It stores only what is necessary to follow and validate the chain. Any application that needs to query balances, transaction history, smart contract state, or metadata must rely on an external indexing layer.

This guide covers the five most widely-used data pipeline tools in the Cardano ecosystem, how they compare, and a set of supporting tools worth knowing. It ends with a decision guide to help you choose the right combination for your project.


## Why the node does not do this itself

Cardano's infrastructure is modular by design. Rather than a monolithic node that both validates the chain and answers arbitrary queries, the ecosystem has produced a set of specialised tools — each optimised for a narrow job. This keeps the node efficient and consensus-critical, while giving developers the flexibility to pick the indexing layer that matches their performance, language, and operational constraints.


## The five core tools

### 1. Blockfrost

**Category:** Hosted API — no infrastructure required  
**Maintained by:** Blockfrost.io

Blockfrost is the most widely-used entry point into Cardano data. It provides a scalable REST API that abstracts away all node and indexer infrastructure. Developers sign up, receive an API key, and start querying within minutes. There is a free tier suitable for development and small projects.

**What you can query:**

- Address balances and UTxO sets
- Transaction details and history
- Block and epoch information
- Native asset and NFT metadata
- Stake pool and delegation data
- Smart contract datum and script information

**When to use it:**

Blockfrost is the right choice for rapid prototyping, hackathons, early-stage dApps, and workshops. It is also viable for production applications that do not require custom indexing logic and can tolerate a managed third-party dependency.

**Limitations:**

Rate limits apply on the free tier. Custom indexing logic is not possible — you query what Blockfrost exposes. Not suitable for high-throughput production systems without a paid plan.

**Getting started:** [blockfrost.io](https://blockfrost.io) — create a free account, then:

```bash
npm install @blockfrost/blockfrost-js
```


### 2. Kupo

**Category:** Lightweight self-hosted UTxO indexer  
**Maintained by:** CardanoSolutions

Kupo is a fast, configurable chain index focused specifically on UTxO data. It synchronises with a running Cardano node using the node-to-client protocol, matches addresses against developer-defined patterns, and builds a lookup table of matching UTxOs with their associated values, datums, and scripts. It exposes a clean HTTP API.

**What makes it distinctive:**

- Pattern-based filtering — you index only the addresses or scripts you care about, keeping the database small
- Very low resource footprint compared to DB Sync
- Node-to-client protocol means faster sync than node-to-node approaches
- Pairs naturally with Ogmios for a complete read/write stack

**When to use it:**

Kupo is ideal for dApp backends that need reliable, self-hosted UTxO queries without the overhead of a full DB Sync instance. It is widely used in wallet infrastructure and smart contract backends. Available via Demeter.run as a managed service.

**Limitations:**

UTxO-focused only. It does not provide staking data, reward balances, governance information, or anything that does not appear as a UTxO on-chain. Requires a running Cardano node.

**Getting started:** [cardanosolutions.github.io/kupo](https://cardanosolutions.github.io/kupo)

:::tip Local development with Kupo
Yaci DevKit bundles Kupo as an optional component alongside Ogmios and Yaci Store, making it easy to test UTxO-query patterns without a full mainnet node. See the [Yaci DevKit setup guide](../how-to-guide/advanced/yaci-devkit) for instructions.
:::


### 3. Oura

**Category:** Real-time event pipeline  
**Maintained by:** TxPipe

Oura is a Rust-native pipeline that connects to the tip of a Cardano node, filters events matching defined patterns, and pushes self-contained event payloads to pluggable sinks. Think of it as the `tail` command for Cardano — it observes the blockchain rather than storing it. The name is a nod to Ouroboros, Cardano's consensus protocol.

**Supported sinks:**

| Sink | Use case |
|------|----------|
| Kafka | Feed downstream data pipelines |
| Elasticsearch | Search and analytics |
| Webhook | Trigger application logic on-chain events |
| stdout | Development and debugging |
| Redis | Used by Scrolls under the hood |

**When to use it:**

Oura is the right tool when you want to react to on-chain events in real time rather than query historical state. It is well suited to notification systems, analytics pipelines, and architectures where Cardano data needs to flow into existing data infrastructure. It is also used as the underlying engine for Carp and Scrolls.

**Limitations:**

Oura is a pipeline, not a store. It does not provide a query API — it streams events to sinks. You need a separate storage layer for historical queries. Requires a running Cardano node or a connection to one.

**Getting started:** [github.com/txpipe/oura](https://github.com/txpipe/oura)


### 4. Yaci Store

**Category:** Modular Java indexer with built-in REST API  
**Maintained by:** Cardano Foundation (Bloxbean)

Yaci Store is an open-source, modular, high-performance Cardano blockchain indexer built in Java. It exposes a Blockfrost-compatible REST API, which means any SDK or tool already built against Blockfrost can point at a self-hosted Yaci Store instance with minimal reconfiguration.

**Key strengths:**

- Out-of-the-box REST APIs — no custom query code needed for standard use cases
- Plugin framework for extending indexing behaviour without modifying core code
- Full governance support — DRep data, voting power, proposal outcomes
- Can be embedded into an existing Java Spring Boot application
- Backed by the Cardano Foundation for long-term maintenance

**When to use it:**

Yaci Store is the natural choice for Java and JVM-based teams. It is also a strong option for any project that needs governance data, wants a well-maintained foundation, or wants to embed Cardano indexing directly into an existing backend service without running a separate process.

**Limitations:**

The Java/JVM stack is a prerequisite. For teams working in TypeScript, Python, or Rust, there are lighter-weight alternatives. Heavier than Kupo or Oura for simple single-purpose use cases.

**Getting started:** [github.com/bloxbean/yaci-store](https://github.com/bloxbean/yaci-store)

:::tip Yaci DevKit — local development with Yaci Store
Yaci DevKit bundles Yaci Store, a Cardano node, and Yaci Viewer into a single local devnet you can spin up in seconds. For a step-by-step walkthrough, see:

- **[Setup a Local Cardano Devnet with Yaci DevKit](../how-to-guide/advanced/yaci-devkit)** — complete Docker-based devnet setup
- **[Blaze SDK + Yaci DevKit](./blaze-yaci-store-integration)** — using Yaci Store's Blockfrost-compatible API from the Blaze TypeScript SDK
:::


### 5. Cardano DB Sync

**Category:** Full ledger SQL database  
**Maintained by:** IOG (Input Output Global)

DB Sync is the gold standard for complete Cardano data access. It synchronises the entire Cardano ledger into a PostgreSQL database, making every piece of on-chain data queryable via SQL. Block explorers, analytics platforms, and applications requiring flexible ad-hoc queries across the full chain history typically rely on DB Sync.

**What it provides:**

- Complete transaction history for every address on the chain
- Full staking, delegation, and reward data
- Governance actions and voting records
- Native asset mint/burn history
- Smart contract script executions and redeemers
- All metadata labels and attached JSON

**When to use it:**

DB Sync is the right choice when your application needs flexible, complex queries across the full ledger and you cannot predict in advance what data you will need. It is the foundation for block explorers like Cardanoscan and for analytics and reporting use cases.

**Limitations:**

DB Sync is resource-intensive. A full sync requires significant disk space and time. It is overkill for applications that only need a specific slice of chain data. For local development, access a hosted instance rather than running it locally.

**Getting started:** [github.com/intersectmbo/cardano-db-sync](https://github.com/intersectmbo/cardano-db-sync) — or see the [DB Sync how-to guide](../how-to-guide/advanced/cardano-db-sync) for configuration and schema reference. A hosted instance is also available via Demeter.run.


## Additional tools

These tools are part of the broader Cardano data ecosystem. They are worth knowing even if a full deep-dive is outside the scope of your immediate project.

### Ogmios

A Haskell-based WebSocket bridge that exposes the Cardano node's current state via a JSON/RPC API. It gives you real-time access to the current UTxO set, reward balances, and protocol parameters, and supports transaction submission. Ogmios does not index history — it is a window into the node's live state.

Ogmios is frequently paired with Kupo to form a complete read/write stack: Kupo for historical UTxO queries, Ogmios for current state and transaction submission. It is also bundled inside Yaci DevKit.

### Scrolls

A custom indexing framework from TxPipe that lets developers define filtering and aggregation logic in a TypeScript configuration file using a map/reduce approach, then exposes the result as a GraphQL API. Scrolls uses Redis for in-memory storage, making it fast for specific, handpicked data slices. Not suited to indexing the full chain history, but excellent for targeted high-speed queries on a defined subset of data.

### Dolos

A lightweight Cardano data node written in Rust, designed as a minimal alternative to running a full `cardano-node`. Dolos has a significantly smaller resource footprint and exposes data via gRPC using the UTxO RPC specification. Currently in beta and not yet a full node replacement, but an important project for improving dApp infrastructure efficiency and promoting node client diversity.

### Carp

A modular indexer built on top of Oura, developed by dcSpark. Carp is particularly strong for NFT metadata indexing (CIP-25 label 721) and powers wallet backends that require efficient historical data storage. It stores data in PostgreSQL and is production-proven at scale.

### Demeter.run

A managed cloud platform from TxPipe that hosts the entire Cardano infrastructure stack — including Ogmios, Kupo, DB Sync, Scrolls, and Oura — as preconfigured services. Demeter removes all DevOps overhead and is a good option for teams that want self-hosted tooling semantics without managing servers. It has a free tier and is used in production by projects including JPG.store.

### Cardano Ledger Sync

A Java-native crawler and data consolidation layer from the Cardano Foundation. It uses a scale-out architecture with Apache Kafka to decouple crawling from downstream processing, allowing different parts of the pipeline to run on separate instances. It now runs on Yaci under the hood. Best suited for enterprise Java teams needing high-availability, horizontally-scalable data pipelines.


## Choosing the right tool

There is no universal answer. The right choice depends on your project's needs:

| Need | Recommended tool |
|------|-----------------|
| Running today, no infrastructure | Blockfrost |
| Self-hosted UTxO queries for a dApp backend | Kupo (or Kupo via Demeter.run) |
| React to on-chain events in real time | Oura |
| Java/JVM stack or governance data required | Yaci Store |
| Complete ledger with flexible SQL queries | DB Sync |
| Custom index over a data slice with GraphQL | Scrolls |
| Lightweight node alternative (beta) | Dolos |

### Common production patterns

In practice, most production dApps combine two or more tools. A typical progression:

1. **Early development:** Blockfrost — instant, no setup
2. **Production backend:** Kupo + Ogmios — self-hosted, UTxO-focused, low overhead
3. **Analytics / event layer:** Oura feeding Kafka or Elasticsearch in parallel

For Java teams, Yaci Store covers both the indexing and the REST API layer in one deployment, and its Blockfrost-compatible API surface means you can reuse SDK integrations written against Blockfrost. See the [Blaze SDK + Yaci DevKit guide](./blaze-yaci-store-integration) for a worked example of this pattern.


## Related resources

- [Setup a Local Cardano Devnet with Yaci DevKit](../how-to-guide/advanced/yaci-devkit) — run a full local devnet with Yaci Store and Yaci Viewer in seconds using Docker
- [Blaze SDK + Yaci DevKit](./blaze-yaci-store-integration) — using Yaci Store's Blockfrost-compatible API from the Blaze TypeScript SDK
- [Cardano DB Sync how-to](../how-to-guide/advanced/cardano-db-sync) — configuration, schema reference, and common queries
- [Build a Local Cardano Payment Detector](../tutorials/local-cardano-payment-detector) — tutorial using the Cardano Node Emulator to detect on-chain events


*This guide is part of the [Developer Experience](https://devex.intersectmbo.org/) initiative.*
