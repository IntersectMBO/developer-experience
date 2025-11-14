# Essential Links in Cardano

## Introduction

Welcome to today's session on essential Cardano resources! Whether you're building your first dApp, contributing to core development, or supporting others in the ecosystem, knowing where to find reliable information is crucial.

**Today we'll cover:**
- Where the actual code lives
- Where to find answers when you're stuck
- How to check what's happening on-chain
- Where to connect with other developers

We'll talk about what each resource is actually useful for and when you'd reach for it.

---

## Core Repositories

These are the official GitHub repos where Cardano's core development happens. If you're contributing to Cardano itself or need to understand how things work under the hood, these are your starting points.

### IntersectMBO Organization
**Primary Hub:** https://github.com/IntersectMBO

This is where most active Cardano development happens now. Key repos include:

**Cardano Node**  
https://github.com/IntersectMBO/cardano-node  
*What it is:* The core node implementation that runs the Cardano blockchain  
*When you need it:* Running your own node, understanding consensus, contributing to core protocol  
*Key sections:* Releases, documentation folder, issues for known bugs

**Cardano CLI**  
https://github.com/IntersectMBO/cardano-cli  
*What it is:* Command-line interface for interacting with Cardano  
*When you need it:* Building transactions, querying the chain, key management  
*Pro tip:* Check the "doc" folder for command examples

**Plutus**  
https://github.com/IntersectMBO/plutus  
*What it is:* Smart contract platform for Cardano  
*When you need it:* Writing on-chain validators, understanding Plutus Core  
*Note:* Also includes Plutus Tx (Haskell DSL for writing contracts)

**Developer Experience Repo**  
https://github.com/IntersectMBO/developer-experience  
*What it is:* Community-driven documentation and onboarding resources (that's us!)  
*When you need it:* Contributing to developer docs, finding getting-started guides  
*This is your repo!* Issues and PRs welcome

### Input Output Global (IOG) Repos
**Organization:** https://github.com/input-output-hk

Still hosts important tooling and libraries:

**Cardano Wallet**  
https://github.com/cardano-foundation/cardano-wallet  
*What it is:* HTTP API for wallet management  
*When you need it:* Building wallet functionality into applications

**Marlowe**  
https://github.com/input-output-hk/marlowe-cardano  
*What it is:* Domain-specific language for financial contracts  
*When you need it:* Building financial dApps without general-purpose smart contracts

**Lace Wallet**  
https://www.lace.io | https://github.com/input-output-hk/lace  
*What it is:* IOG's flagship light wallet with built-in dApp connector  
*When you need it:* Testing CIP-30 dApp connectors, seeing reference wallet implementation  
*Pro tip:* Great for developers building dApps, install it to test your dApp's wallet integration

### Cardano Foundation
**Organization:** https://github.com/cardano-foundation

Focus areas include standards, governance tools, and ecosystem support.

---

## Official Documentation 

### Cardano Docs
**Main Site:** https://docs.cardano.org

The official documentation hub. It's organized into several sections:

**Getting Started**  
*Good for:* Newcomers, understanding basic concepts  
*Covers:* Wallets, transactions, staking basics

**Development**  
*Good for:* Builders, technical implementation  
*Covers:* Smart contracts, tokens, integration guides

**Operation**  
*Good for:* SPOs, node operators  
*Covers:* Running nodes, stake pool setup

**Governance**  
*Good for:* Understanding Cardano's governance model and participating in the Voltaire era  
*Covers:* CIPs, on-chain voting, DReps, Constitutional Committee, parameter changes

**Key governance resources:**
- **GovTool:** https://gov.tools - Platform for DRep registration and voting on governance actions
- **Cardano Forum - Governance Section:** https://forum.cardano.org/c/governance - Active discussions on proposals and governance matters
- **CIP-1694:** The governance specification (see CIPs section below)

**Why this matters in 2025:** With the Voltaire era active, understanding governance is now essential for anyone building on or contributing to Cardano. Whether you're proposing protocol changes, voting on funding decisions, or just staying informed about network direction, these resources are part of your ongoing work.

### Cardano Developer Portal
**Site:** https://developers.cardano.org

Developer-focused documentation with practical guides:
- Builder tools overview
- Integration guides for common use cases
- Showcase of projects building on Cardano
- Technical concepts explained

**Pro tip:** The "Get Started" section has curated learning paths based on what you want to build.

### CIP (Cardano Improvement Proposals)
**Repository:** https://github.com/cardano-foundation/CIPs  
**Portal:** https://cips.cardano.org

Standards and specifications for Cardano. Think of these as RFCs for the ecosystem.

**When to check CIPs:**
- Implementing token standards (CIP-25 for NFTs, CIP-68 for token metadata)
- Understanding wallet interfaces (CIP-30 for dApp connector)
- Following governance processes (CIP-1694)

**How they work:** Anyone can propose a CIP. They go through review stages before becoming standards.

---

## APIs & Data Services

These are the services you'll actually call when building applications.

### Blockfrost
**Website:** https://blockfrost.io  
**Docs:** https://docs.blockfrost.io

*What it is:* Hosted API service for Cardano data  
*Why use it:* Don't want to run your own infrastructure  
*What you can do:*
- Query blockchain data (blocks, transactions, addresses)
- Submit transactions
- Access IPFS for metadata
- Websocket support for real-time updates

**Pricing:** Free tier available, paid plans for production use  
**Getting started:** Sign up → Get API key → Start querying

**Example use case:** You're building a portfolio tracker. Use Blockfrost to query all transactions for a given address without running a node.

### Koios
**Website:** https://koios.rest  
**Docs:** https://api.koios.rest

*What it is:* Decentralized API service (Cardano community infrastructure)  
*Why use it:* Open-source, community-run alternative  
*Key difference from Blockfrost:* No registration required for many endpoints

**Pro tip:** Great for prototyping since you can start querying immediately.

### Maestro
**Website:** https://www.gomaestro.org  
**Docs:** https://docs.gomaestro.org

*What it is:* Web3 infrastructure platform with Cardano support  
*Why use it:* Advanced features like transaction building helpers  
*Unique features:*
- Turbo TX submission
- Built-in indexing tools
- GraphQL support

### Ogmios
**GitHub:** https://github.com/CardanoSolutions/ogmios  
**Docs:** https://ogmios.dev

*What it is:* WebSocket bridge to cardano-node  
*Why use it:* Direct access to node's local state queries  
*When you need it:* Building applications that need real-time chain data, custom indexing

**Use case:** You need to watch the chain for specific events in real time—Ogmios gives you a WebSocket connection to do that.

### Cardano DB Sync
**GitHub:** https://github.com/IntersectMBO/cardano-db-sync  
**What it is:* PostgreSQL database syncing chain data  
*Why use it:* Complex queries across historical data  
*Trade-off:* You run your own infrastructure but get maximum flexibility

**When to consider:** You're building an explorer, analytics platform, or need custom indexing that APIs don't support.

### Pallas
**GitHub:** https://github.com/txpipe/pallas  
**What it is:** Modern Rust library for building Cardano applications  
*Why use it:* Building ultra-performant, custom indexers or services in Rust  
*When you need it:* You want self-hosted infrastructure without Haskell dependencies, or need to process chain data at scale

**Key features:** Collection of utilities for reading and processing blockchain data, parsing blocks, working with transactions, and building custom data pipelines.

**Use case:** You're building a high-performance indexing service that needs to process blocks faster than DB Sync allows, or you want to integrate Cardano data into Rust-based infrastructure.

---

## Block Explorers

Essential for checking what's actually happening on-chain.

### CardanoScan
**URL:** https://cardanoscan.io

*Best for:* Clean UI, easy address and transaction lookups  
*Features:* Token info, pool data, epoch stats  
*Pro tip:* Good for quick checks during development

### Cardano Explorer
**URL:** https://explorer.cardano.org

*Best for:* Official Foundation explorer  
*Features:* Comprehensive epoch and block data  
*When to use:* Verifying protocol parameters, checking epoch boundaries

### AdaStat
**URL:** https://adastat.net

*Best for:* Pool operators and delegators  
*Features:* Detailed stake pool analytics, saturation tracking

### Cexplorer
**URL:** https://cexplorer.io

*Best for:* Advanced users, detailed transaction breakdowns  
*Features:* Smart contract interactions, rich metadata display

### Pool.pm
**URL:** https://pool.pm

*Best for:* NFT collectors and traders  
*Features:* NFT metadata, policy information, rarity tools

**Pro tip for developers:** When debugging transaction failures, paste your tx hash into multiple explorers, sometimes one will show error details the others miss.

---

## Community Forums & Support

Where to go when you need help or want to connect with other builders.

### Cardano Stack Exchange
**URL:** https://cardano.stackexchange.com

*What it is:* Q&A platform specifically for Cardano  
*Best for:* Technical questions with long-term value  
*Why it's great:* Searchable, voted answers, attracts experts  
*Etiquette:* Search before asking, provide code examples, accept answers

**Example questions that work well here:**
- "How do I construct a multi-signature transaction?"
- "What's the difference between address types?"
- "Why is my Plutus validator failing?"

### Cardano Forum
**URL:** https://forum.cardano.org

*What it is:* Official long-form discussion forum  
*Best for:* Governance discussions, CIP feedback, ecosystem updates  
*Sections:*
- Developers (technical discussions)
- Stake pool operators
- Cardano Improvement Proposals
- Governance and feedback

### Discord Servers

**Cardano Developers** - https://discord.gg/kfATXEENPD  
*Focus:* General Cardano development  
*Channels:* plutus-help, development, tools

**IOG Technical Community** - Check cardano.org for invite  
*Focus:* Direct connection to IOG developers  
*Good for:* Core protocol questions

**Intersect MBO** - https://discord.gg/intersectmbo  
*Focus:* Contributing to Cardano's open-source development  
*Channels:* developer-experience, technical-steering-committee, open-source-committee

**Individual Project Discords** - Most major projects (Lace, Eternl, Mesh, etc.) have their own servers

**Pro tip:** Don't cross-post the same question to every Discord. Pick the most relevant one and be patient.

### Reddit
**r/CardanoDevelopers** - https://reddit.com/r/CardanoDevelopers  
*Best for:* Less formal discussions, sharing projects, getting community feedback

### Telegram
Various Cardano developer groups exist. Ask in Discord or Forum for current active groups—these shift over time.

### GitHub Discussions
Most major repos have Discussions enabled—great for questions specific to that project:
- https://github.com/IntersectMBO/cardano-node/discussions
- https://github.com/IntersectMBO/plutus/discussions

---

## Development Tools

Beyond APIs—these are the tools you'll use to actually build.

### Lucid (Lucid Evolution)
**GitHub:** https://github.com/Anastasia-Labs/lucid-evolution  
**What it is:** Off-chain transaction library for JavaScript/TypeScript  
**Why use it:** Building dApps without Haskell knowledge

### Evolution SDK
**GitHub:** https://github.com/IntersectMBO/evolution-sdk  
**What it is:** Off-chain transaction library for JavaScript/TypeScript  
**Why use it:** Building strongly typed off-chain transactions.

### Mesh
**Website:** https://meshjs.dev  
**What it is:** Complete web3 development framework for Cardano  
**Why use it:** React components, hooks, and utilities for rapid development

### PyCardano
**GitHub:** https://github.com/Python-Cardano/pycardano  
**What it is:** Python library for Cardano  
**Why use it:** Backend services, automation scripts, data analysis

### Aiken
**Website:** https://aiken-lang.org  
**What it is:** Modern smart contract language for Cardano  
**Why use it:** Alternative to Plutus with friendlier syntax and better developer experience

### Demeter.run
**Website:** https://demeter.run  
**What it is:** Cloud development platform for Cardano  
**Why use it:** Pre-configured environments, no local setup needed

### Transaction Building Tools
**Tx Pipe:** https://github.com/txpipe  
Rust-based tools for working with Cardano

**Cardano Serialization Lib:** https://github.com/Emurgo/cardano-serialization-lib  
Low-level transaction building (used by many higher-level tools)

---

## Additional Resources

### Essential Cardano
**GitHub:** https://github.com/input-output-hk/essential-cardano  
Curated list of resources, categorized by role and interest

### Cardano Updates
**Site:** https://cardanoupdates.com  
Development activity tracker across multiple repos

### Gimbalabs
**Website:** https://gimbalabs.com  
Educational platform with courses, playgrounds, and community learning

### Project Catalyst
**Website:** https://projectcatalyst.io  
Funding mechanism for Cardano projects—check here if you're building something new

### Intersect Knowledge Base
**Portal:** https://docs.intersectmbo.org  
Governance, committee information, working groups

---

## Quick Reference: When to Use What

**I need to...**

- **Check if a transaction succeeded** → Use any Block Explorer (CardanoScan is fastest)
- **Query address balance in my app** → Use Blockfrost or Koios API
- **Understand how something works** → Check docs.cardano.org or developers.cardano.org
- **Get help with a coding problem** → Cardano Stack Exchange or Discord
- **See what standard exists for X** → Search CIPs repository
- **Find the source code for Y** → Check IntersectMBO GitHub org
- **Build a dApp quickly** → Use Mesh or Lucid + Blockfrost
- **Test my dApp's wallet connector** → Install Lace Wallet and test CIP-30 integration
- **Participate in governance or vote on proposals** → Use GovTool (gov.tools)
- **Build high-performance custom indexer** → Use Pallas (Rust) or DB Sync (PostgreSQL)
- **Run local development environment** → Try Demeter.run or set up locally with Ogmios
- **Contribute to Cardano core** → Start in IntersectMBO/developer-experience, then branch to specific repos
- **Stay updated on development** → Follow cardanoupdates.com and relevant Discord channels

---

## Closing Thoughts

The Cardano ecosystem has a lot of resources—which is both a blessing and can feel overwhelming. Here's my advice:

**Start small:** Bookmark 3-5 resources you'll use most often (probably docs.cardano.org, an API service, an explorer, and Stack Exchange).

**Contribute back:** When you figure something out that wasn't well-documented, open a PR to the developer-experience repo or answer a question on Stack Exchange.

**Stay connected:** Join at least one community space (Discord, Forum, or Stack Exchange) where you can ask questions and help others.

**Keep this guide handy:** This document itself is in the developer-experience repo and will be updated as the ecosystem evolves.

---

**Navigation Quick Links:**
- [Core Repositories](#core-repositories)
- [Official Documentation](#official-documentation)
- [APIs & Data Services](#apis--data-services)
- [Block Explorers](#block-explorers)
- [Community Forums & Support](#community-forums--support)
- [Development Tools](#development-tools)
- [Additional Resources](#additional-resources)
---

*This session is part of the Q1 2025 Developer Experience Working Group: "Laying the Foundations"*