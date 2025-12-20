---
title: Session 03 Overview
sidebar_label: Session Notes
sidebar_position: 1
slug: /working-group/q1-2025/sessions/03-dev-environment-setup/session-notes
---


# Cardano Dev Environment

A well-structured environment is essential for building, testing, and contributing to Cardano projects. This guide outlines the core components and links you to canonical setup instructions. For background on core repos and ecosystem resources, see the Kickoff session: [Core Repositories](../../01-kickoff-orientation/session-notes/readme.md#core-repositories) and [Documentation Resources](../../01-kickoff-orientation/session-notes/readme.md#documentation-resources).

## Version Control

Use Git and GitHub for collaboration and traceability.

- **Requirements**:
  - GitHub account (SSH or HTTPS access configured)
  - Git installed locally (`git --version`)
  - Suggested branch model: `main` (stable), `dev` (active), `feature/*` (scoped work)

Refer to governance, repos, and contribution links in [Documentation Resources](../../01-kickoff-orientation/session-notes/readme.md#documentation-resources) instead of duplicating here.

## Development Tools

Recommended setup for editing, shell, and formatting:

- **Editor**: [Visual Studio Code](https://code.visualstudio.com/)
- **Shell**: Bash, Zsh, or Fish
- **VS Code extensions**:
  - [Haskell](https://marketplace.visualstudio.com/items?itemName=haskell.haskell)
  - [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) or [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- **Optional (protocol work/Haskell toolchain)**: [ghcup](https://www.haskell.org/ghcup/) to manage GHC, Cabal, HLS

For broader tooling and SDKs, see [Essential Tooling](../../01-kickoff-orientation/session-notes/readme.md#essential-tooling).

## Wallets

You use wallets to hold keys, sign transactions, and interact with dApps.

- **CLI/Programmatic wallets** (e.g., `cardano-cli`, `cardano-wallet` API):
  - When you use CLI/API wallets, you have full control and scriptability. It helps you automate key/tx flows, run offline signing, and integrate with backends.
  - Use for backend services, CI pipelines, cold/offline workflows, or advanced tx features.
- **Browser extension wallets** (e.g., Lace, Eternl):
  - When you use extension wallets, you have an easy way to connect dApps in the browser. It helps you test user flows quickly with a familiar UI.
  - Use for dApp development, frontend integration, and user testing on testnets.

See options and integration links in [Kickoff › Wallet Integration](../../01-kickoff-orientation/session-notes/readme.md#wallet-integration).

## Cardano CLI and Node

`cardano-cli` lets you create keys and addresses, build and sign transactions, and query the chain. Running `cardano-node` gives you direct access to the blockchain from your own machine.

- **Install**: Use the official guide: [Installing cardano-node](https://developers.cardano.org/docs/operate-a-stake-pool/node-operations/installing-cardano-node)
  - Via Nix: see [Building via Nix](https://developers.cardano.org/docs/operate-a-stake-pool/node-operations/installing-cardano-node#building-via-nix)
- **Node types**: relay/block-producing (network roles) or local dev nodes (testing/offline tx)
- **Configs**: `config.json`, `topology.json`, and `db/` are required for synchronization and operation

Keep your `cardano-cli` and `cardano-node` versions aligned with the official release cycle.

### Why these tools?

- When you run `cardano-node`, you have a full, up‑to‑date view of the chain on your machine. It helps you do low‑latency queries, participate directly in the network, and use features not always available via hosted APIs.
- With `cardano-node`, you can run preview/preprod locally, power explorers/indexers, connect tools like Ogmios, and test end‑to‑end.
- When you use `cardano-cli`, you have the standard tool for keys, addresses, transactions, and queries. It helps you follow the protocol exactly and keep sensitive signing offline if needed.
- With `cardano-cli`, you can generate keys/addresses, build/balance/sign transactions, mint assets, register certificates, submit governance actions, and query UTXOs/parameters.

## External APIs (No Local Node)

Prefer an API if you don’t need to run a full node.

### Why external APIs?

- When you use external APIs, you have chain data without running your own node. It helps you start fast, avoid syncing/storage, and rely on managed uptime.

### What are they for?

- You can query accounts, UTXOs, blocks, and transactions from your app or server.
- You can submit transactions built with `cardano-cli` or SDKs.
- You can read derived data (like metadata or staking stats) without running your own indexers.

For service options and links, see:

- [Kickoff Orientation › Block Explorers & APIs](../../01-kickoff-orientation/session-notes/readme.md#block-explorers--apis)

API keys and endpoints vary by network (mainnet, preprod, preview).

## How to Work on Open-Source (Quick Flow)

- Read the project `README`/docs to understand scope and setup
- Review open issues; ask clarifying questions; confirm acceptance criteria
- Comment to request assignment or alignment before starting
- Fork the repository; clone your fork locally
- Create a feature branch (`feature/<short-topic>`)
- Implement changes with small, focused commits
- Run tests/linting; update docs as needed
- Push and open a Pull Request to the upstream repo
- Address review feedback; keep your fork in sync with upstream `dev/main`
- After merge, clean up branches and reference the issue

## Environment Composition Summary

- **Version Control**: Git & GitHub — collaboration and change tracking
- **Editor**: VS Code — syntax, tasks, extensions
- **Terminal**: Bash/Zsh/Fish — commands and scripts
- **CLI**: `cardano-cli` — transactions, keys, queries
- **Node**: `cardano-node` — local chain sync and direct access
- **APIs**: Koios, Blockfrost, Ogmios, Cardano GraphQL — remote interaction
- **Configs**: `config.json`, `topology.json`, `db/` — network parameters and state

## Recommendations

- Use environment variables for API keys and secrets
- Maintain separate configs for `mainnet`, `preprod`, and `preview`
- Align node/CLI versions with official releases
- Document project-specific steps in your repo `README` for team consistency
- For deeper ecosystem links (wallets, SDKs, explorers), see [Essential Tooling](../../01-kickoff-orientation/session-notes/readme.md#essential-tooling) and [Block Explorers & APIs](../../01-kickoff-orientation/session-notes/readme.md#block-explorers--apis)

## Session Resources

- Explore companion materials in the [Cardano Dev Environment resources](../session-resources/readme.md), including the Cardano Demo Wallet Dashboard repository.

This document is part of the Q1 2025 Developer Experience Working Group sessions.

