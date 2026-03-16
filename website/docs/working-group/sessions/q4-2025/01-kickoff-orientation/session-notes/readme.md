---
title: Session 01 Kickoff & Orientation
sidebar_label: Session Notes
sidebar_position: 1
---

---

# Directive: Kickoff & Orientation

Welcome to the Cardano ecosystem! This guide provides a comprehensive map of where to find essential resources, repositories, documentation, tooling, and support channels to help you navigate and contribute effectively.

## → About Cardano

**Cardano** is a third-generation, proof-of-stake blockchain platform designed for sustainability, scalability, and transparency. Built on peer-reviewed research and evidence-based development, Cardano aims to provide a secure and scalable infrastructure for decentralized applications (dApps), smart contracts, and financial systems.

**Key Characteristics:**

- **Research-Driven**: Every protocol feature undergoes formal specification and peer review
- **Multi-Layered Architecture**: Separates settlement (ADA transactions) from computation (smart contracts)
- **Sustainable**: Energy-efficient Ouroboros proof-of-stake consensus protocol
- **Interoperable**: Designed to work with other blockchains and legacy systems

## → About Intersect

**Intersect** is a member-based organization that serves as the governance and administrative body for Cardano. It facilitates community collaboration, coordinates development efforts, and ensures the long-term sustainability of the Cardano ecosystem.

**Mission**: To empower the Cardano community through transparent governance, coordinated development, and accessible resources for all participants—from beginners to core contributors.

**Key Functions:**

- Facilitating on-chain governance processes
- Coordinating technical working groups and committees
- Managing community resources and development programs
- Supporting developer experience and contributor onboarding

**Why Join as a Developer?** As an Intersect member, you get voting rights on ecosystem decisions, can participate in technical steering committees, access exclusive development updates, and help shape the tools and protocols you build with daily. Individual membership is just $10/year for full governance participation.

---

## ▸ Core Repositories {#core-repositories}

### Cardano Node & Core Infrastructure

| Repository                                                             | Description                                        | Why It Matters                                                                               |
| ---------------------------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| [cardano-node](https://github.com/IntersectMBO/cardano-node)           | Core node implementation of Cardano blockchain     | The heart of Cardano—handles block production, validation, and network consensus             |
| [cardano-cli](https://github.com/IntersectMBO/cardano-node)            | Command-line interface for node operations         | Essential tool for interacting with the blockchain, creating transactions, and managing keys |
| [cardano-db-sync](https://github.com/IntersectMBO/cardano-db-sync)     | Synchronizes Cardano blockchain data to PostgreSQL | Powers explorers and analytics by making blockchain data queryable                           |
| [ouroboros-network](https://github.com/IntersectMBO/ouroboros-network) | Networking layer for Cardano nodes                 | Implements the peer-to-peer communication protocol between nodes                             |

### Smart Contract Development

| Repository                                                                         | Description                                   | Why It Matters                                                                           |
| ---------------------------------------------------------------------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------- |
| [plutus](https://github.com/IntersectMBO/plutus)                                   | Plutus smart contract platform and language   | The foundation for writing smart contracts on Cardano using Haskell-based languages      |
| [plutus-apps](https://github.com/IntersectMBO/plutus-apps)                         | Off-chain infrastructure and tools for Plutus | Provides tools for building complete dApps, including PAB (Plutus Application Backend)   |
| [aiken](https://github.com/aiken-lang/aiken)                                       | Modern smart contract language for Cardano    | Alternative to Plutus—focuses on developer experience with simpler syntax                |
| [cardano-transaction-lib](https://github.com/Plutonomicon/cardano-transaction-lib) | PureScript library for building transactions  | Enables frontend developers to build Cardano dApps in TypeScript/JavaScript environments |

### Developer Tools & SDKs

| Repository                                                                       | Description                                 | Why It Matters                                                                      |
| -------------------------------------------------------------------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------- |
| [cardano-serialization-lib](https://github.com/Emurgo/cardano-serialization-lib) | Library for serialization & deserialization | Essential for building wallets and dApps—handles low-level transaction construction |
| [cardano-wallet](https://github.com/cardano-foundation/cardano-wallet)           | HTTP REST API for wallet operations         | Simplifies wallet backend development with a high-level API                         |
| [pycardano](https://github.com/Python-Cardano/pycardano)                         | Python library for Cardano                  | Enables Python developers to interact with Cardano blockchain                       |
| [cardanocli-js](https://github.com/Berry-Pool/cardanocli-js)                     | JavaScript wrapper for cardano-cli          | Makes CLI operations accessible from Node.js applications                           |

### Testing & Quality Assurance

| Repository                                                                       | Description                       | Why It Matters                                              |
| -------------------------------------------------------------------------------- | --------------------------------- | ----------------------------------------------------------- |
| [cardano-node-tests](https://github.com/IntersectMBO/cardano-node-tests)         | End-to-end tests for cardano-node | Ensures node reliability and catches regressions            |
| [plutus-pioneer-program](https://github.com/IntersectMBO/plutus-pioneer-program) | Educational materials for Plutus  | Learn smart contract development through structured lessons |

---

## ▸ Documentation Resources {#documentation-resources}

### Official Documentation

| Resource                                 | Content                                                      | Access                                                                           |
| ---------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| **Cardano Developer Portal**             | Comprehensive guides, tutorials, and API references          | [developers.cardano.org](https://developers.cardano.org)                         |
| **Cardano Docs**                         | Protocol specifications, architecture, and technical details | [docs.cardano.org](https://docs.cardano.org)                                     |
| **Plutus Documentation**                 | Smart contract language reference and examples               | [plutus.readthedocs.io](https://plutus.readthedocs.io)                           |
| **CIPs (Cardano Improvement Proposals)** | Standards and protocol improvements                          | [github.com/cardano-foundation/CIPs](https://github.com/cardano-foundation/CIPs) |
| **Intersect Knowledge Base**             | Governance processes and organizational structure            | [docs.intersectmbo.org](https://docs.intersectmbo.org)                           |

### Learning Paths

- **Beginner**: Start with [Cardano Developer Portal](https://developers.cardano.org) → Complete basic tutorials → Explore testnet
- **Smart Contract Developer**: Learn [Plutus Fundamentals](https://plutus.readthedocs.io) → Try [Aiken](https://aiken-lang.org/getting-started) → Build sample dApps
- **Infrastructure/Node Operator**: Study [Node Setup Guide](https://developers.cardano.org/docs/operate-a-stake-pool/) → Understand consensus → Run testnet node
- **Frontend Developer**: Explore [Cardano Transaction Lib](https://github.com/Plutonomicon/cardano-transaction-lib) → Integrate with wallets → Build user interfaces

---

## ▸ Essential Tooling {#essential-tooling}

### Development Environments

| Tool              | Purpose                                  | Installation                                                                                  |
| ----------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------- |
| **Docker Images** | Pre-configured Cardano environments      | `docker pull inputoutput/cardano-node`                                                        |
| **Daedalus**      | Full node wallet for testing             | [daedaluswallet.io](https://daedaluswallet.io)                                                |
| **cardano-node**  | Run local node for development           | [Installation Guide](https://developers.cardano.org/docs/get-started/installing-cardano-node) |
| **cardano-cli**   | Command-line interaction with blockchain | Included with cardano-node                                                                    |

### Smart Contract Tooling

| Tool                  | Purpose                                  | Get Started                                                            |
| --------------------- | ---------------------------------------- | ---------------------------------------------------------------------- |
| **Aiken**             | Modern smart contract development        | `cargo install aiken` → [aiken-lang.org](https://aiken-lang.org)       |
| **Plutus Playground** | Browser-based Plutus IDE                 | [playground.plutus.iohkdev.io](https://playground.plutus.iohkdev.io)   |
| **Opshin**            | Python-based smart contracts             | [github.com/OpShin/opshin](https://github.com/OpShin/opshin)           |
| **Helios**            | JavaScript-based smart contract language | [github.com/Hyperion-BT/Helios](https://github.com/Hyperion-BT/Helios) |

### Wallet Integration

| Wallet               | Type                     | Integration                                                                                                                    |
| -------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| **Lace**             | Light wallet by IOG      | [lace.io](https://lace.io)                                                                                                     |
| **Eternl**           | Multi-platform wallet    | [eternl.io](https://eternl.io)                                                                                                 |
| **Wallet Connector** | dApp integration library | [github.com/cardano-foundation/cardano-connect-with-wallet](https://github.com/cardano-foundation/cardano-connect-with-wallet) |

### Block Explorers & APIs {#block-explorers--apis}

| Service              | Purpose                          | URL                                                  |
| -------------------- | -------------------------------- | ---------------------------------------------------- |
| **Cardano Explorer** | Blockchain explorer              | [explorer.cardano.org](https://explorer.cardano.org) |
| **CardanoScan**      | Advanced explorer with analytics | [cardanoscan.io](https://cardanoscan.io)             |
| **Blockfrost**       | RESTful API service              | [blockfrost.io](https://blockfrost.io)               |
| **Koios**            | Decentralized API                | [koios.rest](https://koios.rest)                     |

---

## ▸ Community & Support

### Communication Channels

| Platform                   | Purpose                                     | Link                                                           |
| -------------------------- | ------------------------------------------- | -------------------------------------------------------------- |
| **Cardano Forum**          | Long-form discussions and proposals         | [forum.cardano.org](https://forum.cardano.org)                 |
| **Intersect Discord**      | Real-time community chat and working groups | First become a member at [Intersect](https://www.intersectmbo.org/) and register at [members.intersectmbo.org](https://members.intersectmbo.org/registration) to get Discord access |
| **IOG Technical Discord**  | Developer-focused technical support         | [discord.gg/inputoutput](https://discord.gg/inputoutput)       |
| **Cardano Stack Exchange** | Q&A for developers                          | [cardano.stackexchange.com](https://cardano.stackexchange.com) |
| **Reddit**                 | Community discussions                       | [r/cardano](https://reddit.com/r/cardano)                      |

### Working Groups & Committees

Intersect facilitates various working groups focused on specific areas:

- **Technical Steering Committee**: Oversees technical direction and standards
- **Developer Experience Working Group**: Improves tools and documentation
- **Smart Contract Working Group**: Advances smart contract capabilities
- **Security Working Group**: Ensures ecosystem security practices

_Join working groups through the [Intersect portal](https://intersectmbo.org)_

### Getting Help

1. **Technical Issues**: Search [Cardano Stack Exchange](https://cardano.stackexchange.com) → Ask in Discord (after becoming an Intersect member) → File GitHub issues
2. **General Questions**: Check documentation first → Ask in community forums → Join Discord channels (after becoming an Intersect member)
3. **Bug Reports**: File detailed issues in relevant GitHub repositories with reproduction steps
4. **Feature Requests**: Submit CIPs (Cardano Improvement Proposals) for protocol changes

---

## ▸ Getting Started Checklist

### For New Contributors

- [ ] Join [Intersect](https://intersectmbo.org) as a member to get voting rights and participate in governance ($10/year for individual membership, or free Associate tier)
- [ ] Set up local development environment (Node + CLI)
- [ ] Complete a tutorial from [developers.cardano.org](https://developers.cardano.org)
- [ ] After becoming an Intersect member, join relevant Discord channels and introduce yourself
- [ ] Explore testnet with test ADA from [faucet](https://docs.cardano.org/cardano-testnet/tools/faucet)
- [ ] Read [CONTRIBUTING.md](https://github.com/IntersectMBO/developer-experience/blob/main/CONTRIBUTING.md) guidelines
- [ ] Make your first contribution (documentation, code, or testing)

### For dApp Developers

- [ ] Choose your tech stack (Plutus/Aiken/Helios for on-chain, CTL/JavaScript for off-chain)
- [ ] Set up wallet for testnet testing
- [ ] Explore sample projects and templates
- [ ] Integrate Blockfrost or Koios API for blockchain queries
- [ ] Build and deploy to testnet
- [ ] Get community feedback before mainnet deployment

### For Node Operators

- [ ] Review [stake pool operator documentation](https://developers.cardano.org/docs/operate-a-stake-pool/)
- [ ] Understand hardware and network requirements
- [ ] Set up monitoring and alerting
- [ ] Join [SPO Discord channels](https://discord.gg/cardano-community) for peer support
- [ ] Test setup on testnet before mainnet

---

## ▸ Quick Reference Links

### Essential GitHub Organizations

- [IntersectMBO](https://github.com/IntersectMBO) - Core protocol development
- [cardano-foundation](https://github.com/cardano-foundation) - Foundation projects
- [Emurgo](https://github.com/Emurgo) - Commercial ecosystem tools

### Standards & Specifications

- [CIPs Repository](https://github.com/cardano-foundation/CIPs) - Improvement proposals
- [Plutus Core Specification](https://github.com/IntersectMBO/plutus#specifications) - Smart contract VM specs
- [Formal Ledger Specifications](https://github.com/IntersectMBO/cardano-ledger#formal-specifications) - Protocol rules

### Research Papers

- [IOHK Research Library](https://iohk.io/en/research/library/) - Peer-reviewed papers
- [Ouroboros Protocol](https://iohk.io/en/research/library/papers/ouroboros-a-provably-secure-proof-of-stake-blockchain-protocol/) - Consensus mechanism

---

## ▸ Next Steps

Now that you have your bearings, choose your path:

1. **Learn More**: Deep dive into documentation relevant to your interests
2. **Build Something**: Start with a simple project on testnet
3. **Get Involved**: Join working groups or contribute to existing projects
4. **Connect**: Introduce yourself in community channels

**Remember**: The Cardano community values quality, research, and collaboration. Don't hesitate to ask questions—everyone started as a beginner!

---

_Last Updated: October 2025 | Maintained by Intersect Developer Advocate_

_Last updated: October 2025_
