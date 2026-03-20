# cardano-db-sync

## Overview
`cardano-db-sync` ingests data from a running Cardano node and writes it to PostgreSQL. It provides a queryable, normalized database for analytics, explorers, reporting, and downstream services.

## Repository
https://github.com/IntersectMBO/cardano-db-sync

## What It Does
- Follows the chain via the node's local state query and chain-sync protocols
- Normalizes blocks, transactions, metadata, stake data, and Plutus script info into PostgreSQL
- Exposes schemas used by explorers, reporting tools, and integrations

## When to Use It
Use `cardano-db-sync` if you need a reliable on-chain data source for:
- Explorers and dashboards
- Analytics, BI, or data science pipelines
- Integrations needing SQL access to on-chain state
- Off-chain services that track transactions, stake, or governance data

## Key Components
| Component | Purpose |
|-----------|---------|
| `cardano-db-sync` | Main service ingesting chain data into PostgreSQL |
| `cardano-smash` | Optional pool metadata aggregation service |
| PostgreSQL schema | Normalized tables for chain data and metadata |
| `cardano-node` dependency | Requires a synced node and socket to follow the chain |

## Technical Details
| Aspect | Details |
|--------|---------|
| Language | Haskell |
| Database | PostgreSQL |
| Build | Cabal / Nix |
| Network | Connects to a local `cardano-node` socket |

## Prerequisites
- Running `cardano-node` (matching network and era)
- PostgreSQL instance with sufficient disk and I/O
- Nix or Cabal toolchain for building the service

## Setup (High Level)
1. Clone the repo
   ```bash
   git clone https://github.com/IntersectMBO/cardano-db-sync.git
   cd cardano-db-sync
   ```
2. Prepare PostgreSQL
   - Create database and user; set connection URI in config
3. Configure service
   - Point to node socket, network magic, and DB connection
4. Run migrations
   ```bash
   cabal run db-tool -- migrate
   ```
5. Start sync
   ```bash
   cabal run cardano-db-sync -- \
     --config config/mainnet-config.yaml \
     --socket-path /path/to/node.socket \
     --state-dir ./state \
     --schema-dir schema
   ```

## Best Practices
- Keep node and db-sync on the same network and era
- Monitor slot lag and DB health; ensure sufficient disk/IO
- Run regular PostgreSQL maintenance (VACUUM/ANALYZE)
- Back up the database before upgrading schemas
- Use testnet for development before mainnet

## Common Uses
| Need | How db-sync helps |
|------|-------------------|
| Explorer data | Query blocks, transactions, metadata via SQL |
| Analytics | Join chain data with business data in BI tools |
| Wallet/ops monitoring | Track UTxOs, stake, delegations, rewards |
| Governance | Inspect proposals, votes, and on-chain events |

## When NOT to Use
- If you only need light queries or cannot run a node/DB: use hosted APIs (Blockfrost, Koios, Cardano GraphQL).
- For direct wallet operations without full DB: use `cardano-api` or `cardano-cli` with a node.

## Links
- Repo: https://github.com/IntersectMBO/cardano-db-sync
- Issues: https://github.com/IntersectMBO/cardano-db-sync/issues
- Releases: https://github.com/IntersectMBO/cardano-db-sync/releases
- Docs (README): see repository for network-specific configs and schema details.
