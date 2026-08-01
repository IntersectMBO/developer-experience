---
title: "Building a Production-Grade MCP Server for the Cardano Blockchain"
description: "How we gave AI agents deep, idiomatic access to Cardano — UTxOs, native assets, smart contracts, indexers, and full CIP-1694 governance — without leaving the editor."
authors: [emmanuel]
tags: [cardano, mcp, ai, governance, developer-tools]
date: 2026-06-08
---

*How we gave AI agents deep, idiomatic access to Cardano — UTxOs, native assets, smart contracts, indexers, and full CIP-1694 governance — without leaving the editor.*

<!-- truncate -->

## Background

Solana has 40+ Model Context Protocol servers. EVM chains have 30+. Cardano had nothing purpose-built.

That gap matters more than it sounds. Cardano's eUTxO model is fundamentally different from every other major blockchain. There are no account balances — only UTxOs. Smart contracts are validators that approve or deny spending, not programs that run arbitrary code. Datums carry state attached to UTxOs, not to a contract address. Amounts are always in lovelace, not ADA. Generic blockchain MCPs get this wrong. They map Cardano onto an Ethereum mental model and produce incorrect, dangerous advice.

So we built one specifically for Cardano: **[cardano/mcp](https://github.com/lidonation/Cardano-mcp)**.

---

## What is MCP?

The [Model Context Protocol](https://modelcontextprotocol.io) is an open standard from Anthropic that lets AI assistants like Claude call tools with structured inputs and outputs. Instead of copying-and-pasting data into a chat window, you register an MCP server and Claude can query live blockchain state, construct transactions, read governance proposals, and decode smart contract datums directly inside your coding session.

An MCP server is a process that communicates over stdin/stdout (or SSE). It exposes a list of **tools** — each with a name, a Zod schema describing inputs, and a handler function. The AI picks the right tool, provides validated arguments, and gets back structured JSON.

---

## Architecture

The server is written in strict TypeScript and organised into **6 modules**, each mapping to a distinct domain of Cardano development:

```
src/
├── index.ts            ← MCP entry point, registers all modules
├── config.ts           ← network config, env vars, lovelaceToAda helper
├── lib/
│   ├── koios.ts        ← Koios client with retry + exponential backoff
│   ├── blockfrost.ts   ← Blockfrost client with project-ID injection
│   ├── maestro.ts      ← Maestro client (fast UTxO queries)
│   ├── kupo.ts         ← Kupo sidecar client
│   └── cbor.ts         ← PlutusData encode/decode via CSL
└── modules/
    ├── query/          ← UTxOs, transactions, assets, blocks
    ├── tokens/         ← NFT metadata, wallet assets, minting, policies
    ├── txbuilder/      ← protocol params, minADA, payment tx, script tx, submit
    ├── contracts/      ← eUTxO explainer, Aiken docs, CBOR decode/encode
    ├── indexer/        ← address watching, Kupo/Yaci passthrough
    └── governance/     ← CIP-1694 proposals, DReps, committee, treasury, votes
```

**38 tools across 6 modules.** Every tool input is validated by Zod with `.describe()` on every field so Claude gets accurate documentation. Every tool returns structured JSON in the MCP text envelope.

### Multi-API strategy

No single Cardano API does everything well, so we use three:

| API | Strength | Used for |
|-----|----------|----------|
| **Blockfrost** | Reliable, fast, well-documented | Protocol params, assets, tx submission, governance |
| **Koios** | Free, no auth, rich governance metadata (CIP-100) | DRep info, proposal metadata, vote rationales |
| **Maestro** | Fastest UTxO queries | High-throughput address lookups |
| **Kupo** | Local sidecar, event-based | Address watching, pattern matching |

For governance specifically, we try Koios first (8 s timeout) to get rich on-chain metadata, and fall back to Blockfrost for basic data if Koios is slow. This is important because Koios returns the `meta_json` field from CIP-100/108 metadata anchors directly in the proposal listing, while Blockfrost requires additional round-trips.

### The eUTxO mental model baked in

Every tool in the `query` module works in lovelace internally. The `lovelaceToAda()` helper is the only place division by 1,000,000 happens. Tool descriptions explain why UTxOs, not balances, are the right abstraction. The `contracts` module includes an `explain_eutxo_model` tool that gives Claude a grounding document before it tries to reason about script spending conditions.

---

## CIP-1694 Governance — the hardest part

CIP-1694, Cardano's on-chain governance system, went live on mainnet in January 2025 with the Plomin Hard Fork. It introduces three voting bodies (DReps, SPOs, Constitutional Committee), seven action types, and a rich metadata standard (CIP-100/108) for attaching rationale to votes.

The `governance` module exposes 12 tools:

- `list_governance_proposals` — paginated list with titles and abstracts
- `get_proposal_details` — full metadata for a single proposal
- `get_proposal_votes` — aggregated vote tallies + per-voter breakdown by role
- `get_drep_list`, `get_drep_info` — DRep registry and profiles
- `get_committee_info` — Constitutional Committee composition
- `get_treasury_balance` — live treasury reserves
- `get_constitution` — current constitution hash and anchor
- `get_proposal_sentiment` — AI-powered summary of DRep rationales

### IPFS metadata enrichment

Governance proposals anchor their metadata on IPFS using CIP-108 JSON-LD. When Koios returns a proposal without inline `meta_json`, we fetch the anchor URL ourselves through the IPFS gateway and extract `body.title`, `body.abstract`, `body.rationale`, and `body.motivation`.

```typescript
async function fetchIpfs<T>(ipfsUrl: string): Promise<T | null> {
  const cid = ipfsUrl.replace("ipfs://", "");
  const res = await fetch(`${IPFS_GATEWAY}/${cid}`, {
    signal: AbortSignal.timeout(8000),
    headers: { Accept: "application/json" },
  });
  if (!res.ok) return null;
  return res.json();
}
```

This turns a raw proposal hash into a readable proposal with a title and abstract — something no other Cardano API surface does automatically.

---

## The Demo App

To show what you can build on top of the MCP server, we built a React demo application that queries live mainnet data through the same Blockfrost and Koios calls. The demo runs as two processes:

- **Express bridge** (`server.ts`) — exposes MCP tool logic as REST `POST /tools/:toolName` endpoints
- **Vite frontend** (`src/`) — React + Tailwind UI that proxies `/tools`, `/health`, and `/chat` to the bridge

The bridge exists because MCP is a stdio protocol — you can't call it from a browser. Wrapping the same tool logic in an Express server gives us HTTP endpoints the frontend can hit directly.

### Four tabs

**Wallet** — Enter any Cardano address. The app fetches all UTxOs, sums lovelace, lists native assets with policy IDs and hex asset names, and shows the 20 most recent transactions. Addresses persist to `localStorage` so you don't have to re-enter on refresh.

**Tokens** — Query any policy ID to see all assets minted under it, with on-chain NFT metadata fetched via the `get_nft_metadata` tool.

**Governance** — The richest tab. Loads all active governance proposals with:
- Title and abstract from CIP-100/108 IPFS metadata
- Vote bar showing yes/no/abstain percentages
- Per-role breakdown (DRep, SPO, Constitutional Committee)
- Sample votes with IPFS rationale links
- **AI sentiment button** — one click fetches up to 8 DRep rationale documents from IPFS, aggregates the vote tallies, and asks Claude Haiku to write a neutral 400-token summary of what the community has said

**Network** — Epoch, slot height, block count, transaction count, and a full protocol parameters table with plain-English tooltips explaining what each parameter controls.

### AI chatbot

A floating **₳** button in the bottom-right corner opens a chat panel backed by Claude Haiku. On each message the server fetches live network stats and protocol parameters, prepends them as context, and passes the user's question (plus the last 8 turns of history) to the model. The result: a Cardano-aware assistant that can answer "what is the current min fee?" or "explain how DReps work" with up-to-date, grounded answers.

```typescript
// system prompt built at request time
const systemPrompt = `You are a Cardano blockchain assistant with access to live mainnet data.

Current network state:
- Epoch: ${networkInfo.epoch_no}
- Block height: ${networkInfo.block_height}
- Treasury balance: ${networkInfo.reserve} lovelace

Current protocol parameters:
${JSON.stringify(protocolParams, null, 2)}

Answer concisely. Use lovelace for amounts and convert to ADA where helpful.`;
```

---

## Running it yourself

### Prerequisites

- Node.js 20+
- Yarn
- A [Blockfrost](https://blockfrost.io) project ID (free tier works)
- An [Anthropic API key](https://console.anthropic.com) for AI features (optional)

### 1. Clone and install

```bash
git clone https://github.com/lidonation/Cardano-mcp
cd Cardano-mcp
yarn install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env`:

```bash
BLOCKFROST_PROJECT_ID=mainnetXXXXXXXXXXXXXX
CARDANO_NETWORK=mainnet
KOIOS_URL=https://api.koios.rest/api/v1
ANTHROPIC_API_KEY=sk-ant-...   # optional — enables AI sentiment + chatbot
```

### 3. Build and register the MCP server

```bash
yarn build
```

**Claude Code** (CLI):

```bash
claude mcp add cardano -- node /absolute/path/to/Cardano-mcp/dist/index.js
```

**Claude Desktop** — add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "cardano": {
      "command": "node",
      "args": ["/absolute/path/to/Cardano-mcp/dist/index.js"],
      "env": {
        "BLOCKFROST_PROJECT_ID": "mainnetXXXXXXXXXXXXXX",
        "CARDANO_NETWORK": "mainnet"
      }
    }
  }
}
```

After registration Claude gets 38 new tools: `get_address_utxos`, `list_governance_proposals`, `decode_cbor_datum`, `build_payment_tx`, and 34 more. Ask it "what UTxOs does addr1... hold?" and it calls the tool directly.

### 4. Run the demo app

```bash
cd demo-app
yarn install
yarn dev
```

This starts the Express bridge on port 3001 and the Vite frontend on port 5173 concurrently. Open `http://localhost:5173`.

---

## Lessons learned

**1. Zod defaults don't apply when you bypass the SDK.**
When calling MCP tool handlers directly (as we do in the Express bridge), the SDK's schema parse layer never runs, so `z.number().default(1)` silently delivers `undefined`. Fix: defensive nullish coalescing everywhere — `page ?? 1`, `count ?? 100`.

**2. SVG in `<img>` is a walled garden.**
Our animated brand mark uses `<img src="/brand/mark.svg">`. CSS from `globals.css` cannot reach inside it, and `currentColor` resolves to black on a dark background instead of inheriting from the surrounding document. The fix: embed a `<style>` block with `@keyframes` directly inside the SVG file, and replace every `currentColor` with explicit hex values.

**3. Koios is free but occasionally slow.**
The 8-second timeout on Koios calls was chosen after testing: most responses arrive in under 2 seconds, but tail latencies can spike to 10+ seconds during high load. The Blockfrost fallback covers those gaps without the user ever seeing an error.

**4. IPFS is not always JSON.**
Some governance metadata anchor URLs point to PDF documents, not CIP-100 JSON-LD. The `fetchIpfs` helper checks `Content-Type` and returns `null` for anything that doesn't parse as JSON, rather than crashing the whole proposal listing.

---

## What's next

- **Preprod / Preview testnet support** — switch `CARDANO_NETWORK` and all API URLs update automatically; the demo app needs a network selector
- **Transaction signing** — the `txbuilder` module builds unsigned transactions; a browser wallet integration (Lace, Eternl, Nami via CIP-30) would close the loop
- **Streaming governance feed** — Kupo's pattern-matching API can watch for new governance actions in real time; wire it to a WebSocket endpoint in the bridge server

---

## Links

- **Repository**: [github.com/lidonation/Cardano-mcp](https://github.com/lidonation/Cardano-mcp)
- **Docs**: [cardano-mcp.dev](https://cardano-mcp.dev)
- **Blockfrost**: [blockfrost.io](https://blockfrost.io)
- **Koios API**: [api.koios.rest](https://api.koios.rest)
- **CIP-1694 spec**: [github.com/cardano-foundation/CIPs/tree/master/CIP-1694](https://github.com/cardano-foundation/CIPs/tree/master/CIP-1694)
- **Model Context Protocol**: [modelcontextprotocol.io](https://modelcontextprotocol.io)
- **Session Notes**: [Session 18 — Working Group](../docs/working-group/sessions/q2-2026/18-cardano-mcp-server/session-notes/readme.md)
