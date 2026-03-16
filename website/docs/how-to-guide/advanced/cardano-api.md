# Cardano API

## Overview

Cardano API is a Haskell library that provides the core Cardano API interface used by Cardano tools like the node, CLI, and other Haskell-based services. It exposes high-level functions to build and interact with Cardano types (transactions, addresses, queries) without dealing with low-level internals.

**Important**: `cardano-api` is not a REST API or external HTTP API — it's a library you import into Haskell code.

## Repository

[github.com/IntersectMBO/cardano-api](https://github.com/IntersectMBO/cardano-api)

## What It Does

Cardano API provides a unified interface that integrates ledger, consensus, and networking repositories into a single API. It serves as essential building blocks for Cardano node and application development with strongly-typed Haskell interfaces for reliable blockchain interactions.

## Key Components

| Component | Description |
|-----------|-------------|
| `cardano-api` | Main API library |
| `cardano-api-gen` | Code generation utilities |
| `cardano-rpc` | Remote Procedure Call interface |
| `cardano-wasm` | WebAssembly bindings |

## When to Use It

Use `cardano-api` when building Haskell applications that need to:

- Build and sign transactions programmatically
- Work with addresses, keys, and ledger types
- Query chain data via a connected Cardano node
- Serialize/deserialize Cardano data (CBOR/JSON)
- Interact with multiple Cardano eras (Byron, Shelley, etc.)
- Include smart contract (Plutus) functionality

This library provides consistent types and helpers to work with the blockchain without rewriting Cardano internals.

## Use Cases

| Use Case | Example Applications |
|----------|---------------------|
| Node Development | Full nodes, relay nodes, block producers |
| Wallet Development | Desktop wallets, mobile wallets, hardware wallet integrations |
| CLI Tools | Transaction builders, query tools, governance utilities |
| DApp Backends | DeFi platforms, NFT marketplaces, governance systems |
| Blockchain Explorers | Block explorers, analytics dashboards, monitoring tools |
| Infrastructure Services | Indexers, oracles, bridge services, staking pools |
| Smart Contract Tools | Contract compilers, testing frameworks, deployment tools |
| Governance Systems | Catalyst voting, on-chain governance, treasury management |

## Technical Details

| Aspect | Details |
|--------|---------|
| Language | Haskell (96.6%) |
| License | Apache-2.0 |
| Build System | Cabal, Nix |
| Documentation | Haddock |

## Getting Started

### Prerequisites

- GHC (Glasgow Haskell Compiler) version 9.2 or later
- Cabal or Stack as build tool
- Nix (recommended for Cardano development)

### Adding as a Dependency

**Using Cabal:**

Add to your `.cabal` file:

```cabal
build-depends:
    base >= 4.14 && < 4.22,
    cardano-api >= 10.0
```

Or add to `cabal.project`:

```cabal
source-repository-package
  type: git
  location: https://github.com/IntersectMBO/cardano-api.git
  tag: <version-tag>
```

**Using Stack:**

Add to `stack.yaml`:

```yaml
extra-deps:
  - git: https://github.com/IntersectMBO/cardano-api.git
    commit: <commit-hash>
```

**Note**: Align versions with what's published on CHaP (Cardano Haskell Package index).

### Basic Usage

Import the library:

```haskell
import Cardano.Api
import Cardano.Api.Shelley
```

Key modules provide:
- Transaction building and signing
- Address handling and validation
- Protocol parameter queries
- Serialization/CBOR helpers
- Chain querying functions

## Common Modules

| Module | Purpose |
|--------|---------|
| `Cardano.Api` | Core API types and functions |
| `Cardano.Api.Shelley` | Shelley-era specific functionality |
| `Cardano.Api.Byron` | Byron-era compatibility |
| `Cardano.Api.Address` | Address creation and validation |
| `Cardano.Api.TxBody` | Transaction body building |
| `Cardano.Api.Tx` | Transaction construction and signing |
| `Cardano.Api.Query` | Chain querying functions |

## Best Practices

1. **Error Handling**: Always handle `Maybe` and `Either` types returned by API functions
2. **Network IDs**: Use appropriate network identifiers (Mainnet, Testnet, etc.)
3. **Type Safety**: Leverage Haskell's type system for compile-time safety
4. **Resource Management**: Properly close connections and handle exceptions
5. **Testing**: Use testnet for development before mainnet deployment

## When NOT to Use It

If you don't want to write Haskell or don't want to run a node, consider these alternatives:

- **Blockfrost** - REST API for JS/Python/any language
- **Koios** - Community-driven REST API for Cardano
- **Cardano GraphQL** - GraphQL API for querying Cardano data
- **Ogmios** - WebSocket API for Cardano node interaction

`cardano-api` is specifically for Haskell development and local node interaction.

## Summary

| Feature | Supported |
|---------|-----------|
| Build transactions | Yes |
| Serialize/Deserialize | Yes |
| Chain queries | Yes (with node connection) |
| REST endpoint | No |
| JavaScript/Python use | Not directly |

## Workflow

1. Run a Cardano node (locally or via service)
2. Import `cardano-api` in your Haskell project
3. Use its types/functions to build transactions, query ledger state, and process keys/addresses
4. Submit transactions via `cardano-submit-api` or direct submission through the node

## Deeper Documentation

- [Haddock Documentation](https://cardano-api.cardano.intersectmbo.org/)


## Contributing

This repository welcomes contributions. See the [Contributing Guide](https://github.com/IntersectMBO/cardano-api/blob/master/CONTRIBUTING.md) for details on code of conduct, development workflow, pull request process, and testing requirements.

