---
title: "Session 18: Building a Production-Grade MCP Server for Cardano - Resources"
sidebar_label: Session Resources
slug: /working-group/q2-2026/sessions/18-cardano-mcp-server/session-resources
---

# Session 18: Building a Production-Grade MCP Server for Cardano - Resources

Curated references for building and extending the Cardano MCP server: tool registration, multi-API strategy, CIP-1694 governance integration, and IPFS metadata enrichment.

## The Project

- **Cardano MCP Repository**: [github.com/lidonation/Cardano-mcp](https://github.com/lidonation/Cardano-mcp)
- **Cardano MCP Docs**: [cardano-mcp.dev](https://cardano-mcp.dev)

## Model Context Protocol

- **MCP Overview**: [modelcontextprotocol.io](https://modelcontextprotocol.io)
- **MCP TypeScript SDK**: [github.com/modelcontextprotocol/typescript-sdk](https://github.com/modelcontextprotocol/typescript-sdk)
- **Claude MCP integration (Claude Code CLI)**: `claude mcp add <name> -- <command>`

## Cardano Chain APIs

- **Blockfrost** (REST API, free tier): [blockfrost.io](https://blockfrost.io) / [docs.blockfrost.io](https://docs.blockfrost.io)
- **Koios** (community-run public API, free, no auth): [koios.rest](https://koios.rest) / [api.koios.rest](https://api.koios.rest)
- **Maestro** (fast UTxO queries): [gomaestro.org](https://www.gomaestro.org)
- **Kupo** (lightweight UTxO indexer, local sidecar): [cardanosolutions.github.io/kupo](https://cardanosolutions.github.io/kupo/)

## CIP-1694 Governance

- **CIP-1694 spec**: [github.com/cardano-foundation/CIPs/tree/master/CIP-1694](https://github.com/cardano-foundation/CIPs/tree/master/CIP-1694)
- **CIP-100 — Governance Metadata**: [github.com/cardano-foundation/CIPs/tree/master/CIP-0100](https://github.com/cardano-foundation/CIPs/tree/master/CIP-0100)
- **CIP-108 — Governance Actions Metadata**: [github.com/cardano-foundation/CIPs/tree/master/CIP-0108](https://github.com/cardano-foundation/CIPs/tree/master/CIP-0108)
- **GovTool** (on-chain governance UI): [gov.tools](https://gov.tools)

## eUTxO and Smart Contracts

- **Aiken** (recommended smart contract language): [aiken-lang.org](https://aiken-lang.org)
- **Cardano Serialization Library (CSL)** — used for CBOR encode/decode: [github.com/Emurgo/cardano-serialization-lib](https://github.com/Emurgo/cardano-serialization-lib)
- **Plutus docs**: [plutus.readthedocs.io](https://plutus.readthedocs.io/en/latest/)

## TypeScript Tooling

- **Zod** (runtime schema validation): [zod.dev](https://zod.dev)
- **MeshJS** (tx building SDK): [meshjs.dev](https://meshjs.dev)
- **Lucid Evolution** (tx building SDK): [github.com/Anastasia-Labs/lucid-evolution](https://github.com/Anastasia-Labs/lucid-evolution)
- **Blaze**: [github.com/butaneprotocol/blaze-cardano](https://github.com/butaneprotocol/blaze-cardano)

## Anthropic / Claude

- **Anthropic Console** (API keys): [console.anthropic.com](https://console.anthropic.com)
- **Claude API docs**: [docs.anthropic.com](https://docs.anthropic.com)

## Prior Sessions

- [Session 16: UI ↔ Smart Contracts](../../16-ui-smart-contract-interaction/session-notes/readme.md)
- [Session 17: Default Developer Environment](../../17-default-developer-environment/session-notes/readme.md)

---

*These resources belong to the Q2 2026 Developer Experience Working Group.*
