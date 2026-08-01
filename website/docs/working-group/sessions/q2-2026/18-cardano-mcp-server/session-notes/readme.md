---
title: "Session 18: Building a Production-Grade MCP Server for Cardano - Notes"
sidebar_label: Session Notes
slug: /working-group/q2-2026/sessions/18-cardano-mcp-server/session-notes
---

# Session 18: Building a Production-Grade MCP Server for Cardano

In this session we walked through **[Cardano MCP](https://github.com/lidonation/Cardano-mcp)** — a purpose-built [Model Context Protocol](https://modelcontextprotocol.io) server that gives AI assistants like Claude live, idiomatic access to the Cardano blockchain. By the end you will understand how the server is structured, how to register it in your editor, and how to query UTxOs, governance proposals, and smart contract datums without leaving your coding session.

---

## Prerequisites

| Requirement | Purpose |
|-------------|---------|
| **Node.js 20+** | Runtime for the MCP server |
| **Yarn** | Package manager used by the project |
| **Blockfrost project ID** | Free tier at [blockfrost.io](https://blockfrost.io) — needed for chain queries |
| **Anthropic API key** | Optional — enables the AI sentiment and chatbot features |

---

## Why a Cardano-specific MCP server?

Generic blockchain MCP servers map every chain onto an account-balance model. That works for EVM chains. It does not work for Cardano.

Cardano uses the **eUTxO model**:

- There are no account balances — only UTxOs (unspent transaction outputs).
- Smart contracts are **validators** that approve or deny spending. They do not run arbitrary code.
- **Datums** are data attached to UTxOs, not to a contract address.
- All amounts are in **lovelace** (1 ADA = 1,000,000 lovelace).

A generic MCP server told to "get the balance of this address" will try to query a balance endpoint that does not exist, or return a number that is missing all the UTxO context a Cardano developer actually needs. Cardano MCP bakes in these distinctions at the tool-description level so the AI reasons correctly from the start.

---

## How MCP works

The Model Context Protocol lets an AI assistant call **tools** with structured inputs and receive structured JSON back. You register the server once; after that the AI picks the right tool automatically based on your question.

```
You: "What UTxOs does addr1qx... hold?"
Claude → calls get_address_utxos({ address: "addr1qx..." })
MCP server → queries Blockfrost / Maestro
Claude ← receives JSON list of UTxOs with lovelace + native assets
Claude: "That address holds 3 UTxOs totalling 42.5 ADA and 1 NFT under policy abc123..."
```

No copy-pasting, no switching tabs. The query happens inside the editor.

---

## Server architecture

The server is written in strict TypeScript with **6 modules** and **38 tools**:

```
src/
├── index.ts            ← registers all modules with the MCP runtime
├── config.ts           ← network, env vars, lovelaceToAda helper
├── lib/
│   ├── blockfrost.ts   ← Blockfrost client
│   ├── koios.ts        ← Koios client (retry + backoff)
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

Every tool input uses Zod with `.describe()` on every field — this is what gives Claude accurate documentation about what each argument means and what values are valid.

### Which API does each query use?

No single Cardano API does everything well. The server routes queries to the right provider:

| API | Used for |
|-----|----------|
| **Blockfrost** | Protocol params, assets, tx submission, governance fallback |
| **Koios** | DRep info, governance proposals with CIP-100/108 metadata |
| **Maestro** | High-throughput UTxO lookups |
| **Kupo** | Address watching, pattern-based UTxO filtering |

For governance queries the server tries Koios first (8 s timeout) because Koios returns the full `meta_json` from CIP-100/108 metadata anchors inline. If Koios is slow, Blockfrost provides the fallback. From your perspective the query always returns a result — the routing is transparent.

---

## Setting up the MCP server

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

Open `.env` and fill in:

```bash
BLOCKFROST_PROJECT_ID=mainnetXXXXXXXXXXXXXX
CARDANO_NETWORK=mainnet
KOIOS_URL=https://api.koios.rest/api/v1
ANTHROPIC_API_KEY=sk-ant-...   # optional
```

### 3. Build

```bash
yarn build
```

### 4. Register with your AI assistant

**Claude Code (CLI)**

```bash
claude mcp add cardano -- node /absolute/path/to/Cardano-mcp/dist/index.js
```

**Claude Desktop** — edit `~/Library/Application Support/Claude/claude_desktop_config.json`:

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

After registration Claude has access to all 38 tools. Try asking: *"What UTxOs does addr1... hold?"* or *"List the active governance proposals"*.

---

## What you can do with the 38 tools

### Query module

| Tool | What it does |
|------|-------------|
| `get_address_utxos` | All UTxOs at an address, with lovelace and native assets |
| `get_transaction` | Full transaction details by hash |
| `get_asset_info` | Policy ID + asset name → metadata and supply |
| `get_block` | Block details by hash or number |

### Governance module (12 tools)

The governance module covers the full CIP-1694 surface:

| Tool | What it does |
|------|-------------|
| `list_governance_proposals` | Paginated list with titles and abstracts from IPFS |
| `get_proposal_details` | Full metadata for a single proposal |
| `get_proposal_votes` | Yes/No/Abstain tallies + per-voter breakdown by role |
| `get_drep_list` / `get_drep_info` | DRep registry and individual profiles |
| `get_committee_info` | Constitutional Committee composition |
| `get_treasury_balance` | Live treasury reserves in lovelace |
| `get_constitution` | Current constitution hash and anchor URL |
| `get_proposal_sentiment` | AI summary of up to 8 DRep rationale documents from IPFS |

**How IPFS metadata works:** governance proposals anchor their rationale on IPFS using CIP-108 JSON-LD. The server fetches those documents automatically and surfaces `title`, `abstract`, `rationale`, and `motivation` inline. You do not need to resolve IPFS URIs yourself.

### Transaction builder module

| Tool | What it does |
|------|-------------|
| `get_protocol_parameters` | Current min fee, min ADA, execution unit prices |
| `calculate_min_ada` | Minimum ADA required for a given output |
| `build_payment_tx` | Unsigned payment transaction CBOR |
| `build_script_tx` | Unsigned transaction spending a script UTxO |
| `submit_transaction` | Submit signed CBOR to mainnet / testnet |

### Contracts module

| Tool | What it does |
|------|-------------|
| `explain_eutxo_model` | Grounding document on eUTxO for the AI before reasoning about scripts |
| `decode_cbor_datum` | Hex CBOR → human-readable PlutusData |
| `encode_cbor_datum` | JSON → CBOR for attaching inline datums |
| `get_aiken_docs` | Aiken standard library reference |

---

## Running the demo app

The demo app shows a full React frontend using the same tool logic over HTTP.

```bash
cd demo-app
yarn install
yarn dev
```

This starts:
- **Express bridge** on port 3001 — wraps MCP tool handlers as `POST /tools/:toolName`
- **Vite frontend** on port 5173 — React + Tailwind UI

Open `http://localhost:5173`. The bridge is needed because MCP uses stdio — it cannot be called directly from a browser.

The app has four tabs:

- **Wallet** — enter any address to see UTxOs, ADA balance, native assets, and recent transactions
- **Tokens** — query a policy ID to list all minted assets with on-chain metadata
- **Governance** — active proposals with vote bars, per-role breakdowns, IPFS rationale links, and an AI sentiment summary button
- **Network** — epoch, block height, and a full protocol parameters table with plain-English tooltips

---

## Common gotchas

**Amounts are always lovelace, never ADA.**
All tools return lovelace. Divide by 1,000,000 to display ADA. If you ask Claude "how much ADA?" it will convert for you, but internally every value is lovelace.

**UTxOs, not balances.**
There is no "balance" endpoint. The server sums lovelace across all UTxOs at an address. If you need to check whether a specific UTxO is still unspent, query it by output reference — do not rely on a cached balance.

**Governance metadata may be on IPFS.**
Some proposals resolve instantly; others require an IPFS fetch which can take a few seconds. If a proposal shows no title, the metadata anchor may be a PDF rather than CIP-100 JSON-LD — the server returns `null` for those rather than erroring.

**Koios tail latency.**
Koios is free and usually fast, but under load response times can spike past 8 seconds. The Blockfrost fallback activates automatically — you will still get a result, but it may have less metadata (no inline rationale).

**Use absolute paths when registering.**
`claude mcp add cardano -- node dist/index.js` will break if you change directories. Always pass the full absolute path.

---

## What's next

- **Testnet support** — set `CARDANO_NETWORK=preview` or `preprod` to target Preview / PreProd; API URLs switch automatically
- **Transaction signing** — the `txbuilder` module produces unsigned CBOR; connecting a CIP-30 browser wallet (Lace, Eternl, Nami) closes the sign → submit loop
- **Streaming governance feed** — Kupo's pattern-matching API can push new governance actions to a WebSocket endpoint in real time

---

## Discussion points

- What Cardano workflows do you spend the most time on where live AI access would help most?
- Which modules would you add next — staking, DEX queries, Catalyst?
- How should governance tooling evolve as more CIP-1694 action types are used on mainnet?
- Would you use this in CI (e.g. to assert a UTxO state after a test transaction)?

---

## Related sessions

- [Session 16: UI ↔ Smart Contracts](../../16-ui-smart-contract-interaction/session-notes/readme.md)
- [Session 17: Default Developer Environment](../../17-default-developer-environment/session-notes/readme.md)

See the curated links in [Resources](../session-resources/readme.md).

---

*These notes belong to the Q2 2026 Developer Experience Working Group.*
