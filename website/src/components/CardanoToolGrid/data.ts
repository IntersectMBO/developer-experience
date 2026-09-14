import type { CardanoTool } from './types';

export const CARDANO_TOOLS: CardanoTool[] = [
  // ── ON-CHAIN LANGUAGES ─────────────────────────────────────────────────────
  {
    id: 'AIKEN',
    name: 'Aiken',
    tagline: 'Rust-like · recommended starting point',
    category: 'on-chain-language',
    status: 'active',
    description:
      'Aiken is the most popular smart contract language on Cardano, accounting for ~62% of all on-chain smart contract activity as of 2025. Its Rust-inspired syntax and fast compile times make it the recommended entry point for new developers. The standard library is maintained by TxPipe, and the community is highly active on Discord.',
    stats: '~62% of SC activity · v1.1.11 · Cardano Foundation approved',
    links: [
      { label: 'Official site', url: 'https://aiken-lang.org' },
      { label: 'Docs', url: 'https://aiken-lang.org/installation-instructions' },
      { label: 'stdlib', url: 'https://aiken-lang.github.io/stdlib/' },
      { label: 'GitHub', url: 'https://github.com/aiken-lang/aiken' },
    ],
  },
  {
    id: 'PLUTUS',
    name: 'Plutus V3',
    tagline: 'Haskell · maximum expressiveness',
    category: 'on-chain-language',
    status: 'active',
    description:
      'Plutus V3 is the official smart contract platform for Cardano, written in Haskell and providing maximum control over on-chain logic. It saw nearly 5× adoption growth in 2025 after the Chang/Plomin hard forks unlocked new built-in functions. The Plutus Pioneer Program (10 weeks, ~10 hrs/week) is the structured learning path.',
    stats: '~5× adoption growth in 2025 · node v10.5.3 compatible',
    links: [
      { label: 'Plutus docs', url: 'https://plutus.readthedocs.io' },
      { label: 'Pioneer Program', url: 'https://iog.io/en/education/programs/plutus-pioneers-program/' },
      { label: 'GitHub', url: 'https://github.com/IntersectMBO/plutus' },
    ],
  },
  {
    id: 'OPSHIN',
    name: 'OpShin',
    tagline: 'Python-native smart contracts',
    category: 'on-chain-language',
    status: 'active',
    description:
      'OpShin lets you write Cardano validators in idiomatic Python — the same syntax you already know. It compiles Python to UPLC (Untyped Plutus Lambda Calculus) and integrates tightly with PyCardano for a full Python development experience. Active community with Plutus V3 support in progress.',
    stats: 'Python → UPLC compiler · integrates with PyCardano',
    links: [
      { label: 'OpShin site', url: 'https://opshin.dev' },
      { label: 'GitHub', url: 'https://github.com/OpShin/opshin' },
    ],
  },
  {
    id: 'HELIOS',
    name: 'Helios',
    tagline: 'JS-like syntax · browser-friendly',
    category: 'on-chain-language',
    status: 'active',
    description:
      'Helios is a purpose-built DSL for Cardano with JavaScript-like syntax, making it accessible to frontend developers. It compiles entirely in the browser — no Haskell toolchain required. A VSCode extension is available, and the companion TypeScript SDK handles off-chain transaction building.',
    stats: 'Browser-native compiler · VSCode extension',
    links: [
      { label: 'Helios book', url: 'https://www.hyperion-bt.org/helios-book/' },
      { label: 'GitHub', url: 'https://github.com/hyperion-bt/helios' },
    ],
  },
  {
    id: 'SCALUS',
    name: 'Scalus',
    tagline: 'Scala 3 · JVM + Scala.js',
    category: 'on-chain-language',
    status: 'active',
    description:
      'Scalus enables Cardano smart contract development in Scala 3, targeting both JVM and JavaScript runtimes via Scala.js. It compiles directly to UPLC and is designed for enterprise teams already working in the JVM ecosystem. Presented at community events in April 2025.',
    stats: 'Scala 3 → UPLC · JVM + Scala.js dual target',
    links: [
      { label: 'Scalus site', url: 'https://scalus.org' },
      { label: 'GitHub', url: 'https://github.com/nau/scalus' },
    ],
  },
  {
    id: 'MARLOWE',
    name: 'Marlowe DSL',
    tagline: 'Financial contracts · no Haskell needed',
    category: 'on-chain-language',
    status: 'active',
    description:
      'Marlowe is a domain-specific language for financial smart contracts — loans, escrow, bonds, options, swaps, and DCA strategies. The visual Playground editor (Blockly) requires no coding, while Haskell and JavaScript interfaces are available for developers. The Marlowe Pioneer Program runs 7 weeks with no Haskell prerequisite.',
    stats: 'Visual Playground editor · 7-week Pioneer Program',
    links: [
      { label: 'Marlowe docs', url: 'https://marlowe.iohk.io' },
      { label: 'Playground', url: 'https://play.marlowe.iohk.io' },
      { label: 'Pioneer Program', url: 'https://iog.io/en/education/programs/marlowe-pioneers/' },
    ],
  },
  {
    id: 'PLUTS',
    name: 'Plu-ts',
    tagline: 'TypeScript-native UPLC',
    category: 'on-chain-language',
    status: 'active',
    description:
      'Plu-ts is a TypeScript-embedded DSL that compiles to UPLC directly from TS, making it ideal for JS/TS developers who want to stay in one language for both on-chain and off-chain logic. The companion Pebble project simplifies full-stack dApp development. Latest release: v0.9.0.',
    stats: 'v0.9.0 · TypeScript → UPLC · Pebble project',
    links: [
      { label: 'Docs', url: 'https://www.harmoniclabs.tech/plu-ts-docs/introduction.html' },
      { label: 'GitHub', url: 'https://github.com/HarmonicLabs/plu-ts' },
    ],
  },

  // ── OFF-CHAIN SDKs ─────────────────────────────────────────────────────────
  {
    id: 'MESHJS',
    name: 'MeshJS',
    tagline: 'TS · recommended for beginners · full toolkit',
    category: 'off-chain-sdk',
    status: 'active',
    description:
      'MeshJS is the most beginner-friendly Cardano SDK, offering a complete toolkit: transaction building, wallet connection (CIP-30/CIP-95), React hooks, and pre-built UI components. With 1M+ npm downloads and active Catalyst funding (Fund 13), it is the go-to choice for JavaScript/TypeScript developers starting out.',
    stats: '1M+ npm downloads · React hooks · CIP-30/95',
    links: [
      { label: 'MeshJS site', url: 'https://meshjs.dev' },
      { label: 'Docs', url: 'https://docs.meshjs.dev' },
      { label: 'GitHub', url: 'https://github.com/MeshJS/mesh' },
    ],
  },
  {
    id: 'LUCID',
    name: 'Lucid Evolution',
    tagline: 'TS · flexible · Anastasia Labs maintained',
    category: 'off-chain-sdk',
    status: 'active',
    description:
      'Lucid Evolution (fork of the original Lucid) is maintained by Anastasia Labs and fully supports the Plomin (Chang 2) hard fork. It provides a flexible, composable transaction builder for TypeScript/JavaScript and is used in many production DeFi protocols. Fund 12 work delivered; Fund 13 maintenance ongoing.',
    stats: 'Plomin-ready · Anastasia Labs · production DeFi usage',
    links: [
      { label: 'Docs', url: 'https://lucid-evolution.netlify.app' },
      { label: 'GitHub', url: 'https://github.com/Anastasia-Labs/lucid-evolution' },
    ],
  },
  {
    id: 'BLAZE',
    name: 'Blaze',
    tagline: 'TS · modern typed API',
    category: 'off-chain-sdk',
    status: 'active',
    description:
      'Blaze is a modern TypeScript SDK for Cardano built by Butane Labs, featuring a strongly-typed API designed for developer ergonomics. It supports multiple data providers (Blockfrost, Kupo, Maestro) and has an active release cadence. Latest: @blaze-cardano/sdk v0.2.22 (Feb 2025).',
    stats: 'v0.2.22 · multi-provider · strongly typed',
    links: [
      { label: 'Blaze site', url: 'https://blaze.butane.dev' },
      { label: 'GitHub', url: 'https://github.com/butaneprotocol/blaze-cardano' },
    ],
  },
  {
    id: 'EVOLUTION_SDK',
    name: 'Evolution SDK',
    tagline: 'TS-first · Intersect incubation 2025',
    category: 'off-chain-sdk',
    status: 'incubation',
    description:
      'Evolution SDK is a modular, TypeScript-first development framework by No Witness Labs. It entered Intersect\'s Open Source and Technical Steering Committee incubation in 2025 — the first project to do so under the new review process. Features include local dev networks, offline smart contract evaluation, and multi-provider support (Maestro, Blockfrost, Koios).',
    stats: 'First Intersect-incubated project · multi-provider',
    links: [
      { label: 'GitHub', url: 'https://github.com/IntersectMBO/evolution-sdk' },
      { label: 'Announcement', url: 'https://www.essentialcardano.io/article/evolution-sdk-a-new-era-for-cardano-development' },
    ],
  },
  {
    id: 'PYCARDANO',
    name: 'PyCardano',
    tagline: 'Python · very active · v0.19.2',
    category: 'off-chain-sdk',
    status: 'active',
    description:
      'PyCardano is the primary Python SDK for Cardano, providing transaction building, wallet management, and native token handling. It integrates tightly with OpShin for full-Python smart contract development. Extremely active release cadence: v0.19.2 shipped March 2026, v0.19.1 January 2026.',
    stats: 'v0.19.2 (Mar 2026) · Python 3.8+ · integrates with OpShin',
    links: [
      { label: 'Docs', url: 'https://pycardano.readthedocs.io' },
      { label: 'GitHub', url: 'https://github.com/Python-Cardano/pycardano' },
    ],
  },
  {
    id: 'CTL',
    name: 'CTL',
    tagline: 'PureScript · browser + Node',
    category: 'off-chain-sdk',
    status: 'active',
    description:
      'The Cardano Transaction Library (CTL) is a PureScript SDK by MLabs, running in both browsers and Node.js. It is used in production by multiple DeFi, GameFi, and DAO projects. MLabs continues active maintenance and improvement as of 2025.',
    stats: 'PureScript · production DeFi/GameFi/DAO usage · MLabs',
    links: [
      { label: 'GitHub', url: 'https://github.com/Plutonomicon/cardano-transaction-lib' },
      { label: 'Docs', url: 'https://github.com/Plutonomicon/cardano-transaction-lib/blob/develop/doc/getting-started.md' },
    ],
  },
  {
    id: 'ATLAS',
    name: 'Atlas',
    tagline: 'Haskell off-chain PAB · GeniusYield',
    category: 'off-chain-sdk',
    status: 'active',
    description:
      'Atlas is a Haskell off-chain framework by GeniusYield, acting as a modern Plutus Application Backend (PAB). Atlas 2.0 was delivered in May 2025 with advanced eUTxO features and PAB improvements. Ideal for Haskell teams building on Plutus who want a principled, typed off-chain layer.',
    stats: 'Atlas 2.0 (May 2025) · Haskell · PAB replacement',
    links: [
      { label: 'GitHub', url: 'https://github.com/geniusyield/atlas' },
      { label: 'Docs', url: 'https://atlas-app.io' },
    ],
  },

  // ── APIs & INDEXERS ────────────────────────────────────────────────────────
  {
    id: 'BLOCKFROST',
    name: 'Blockfrost',
    tagline: 'REST · generous free tier · 15+ SDKs',
    category: 'api-indexer',
    status: 'active',
    description:
      'Blockfrost is the most widely used Cardano API service, offering a REST interface with a generous free tier (50M+ requests/month). It supports 15+ SDK languages and is the default data provider for MeshJS, Blaze, and other frameworks. Features include Mithril aggregator proxy and CIP-0151 (Calidus Keys) support.',
    stats: '50M req/month free · 15+ SDK languages · Mithril proxy',
    links: [
      { label: 'Blockfrost site', url: 'https://blockfrost.io' },
      { label: 'Docs', url: 'https://docs.blockfrost.io' },
      { label: 'GitHub', url: 'https://github.com/blockfrost' },
    ],
  },
  {
    id: 'KOIOS',
    name: 'Koios',
    tagline: 'REST · decentralised · no API key required',
    category: 'api-indexer',
    status: 'active',
    description:
      'Koios is a community-run, decentralised Cardano query layer with no vendor lock-in. Basic queries require no API key, making it ideal for open-source projects and prototypes. The Dandelion Lite project provides an extended fork with additional query capabilities.',
    stats: 'No API key for basic use · community-run · Dandelion Lite fork',
    links: [
      { label: 'Koios site', url: 'https://koios.rest' },
      { label: 'API docs', url: 'https://api.koios.rest' },
      { label: 'GitHub', url: 'https://github.com/cardano-community/koios-artifacts' },
    ],
  },
  {
    id: 'MAESTRO',
    name: 'Maestro',
    tagline: 'Managed · event streaming · excellent DX',
    category: 'api-indexer',
    status: 'active',
    description:
      'Maestro provides a complete managed web3 stack for UTXO-based chains, including a blockchain indexer, transaction manager, and Turbo Transactions for faster confirmation. Its event streaming API makes it especially useful for reactive dApps. Best DX for teams wanting a managed, production-grade solution.',
    stats: 'Turbo Transactions · event streaming · managed infra',
    links: [
      { label: 'Maestro site', url: 'https://www.gomaestro.org' },
      { label: 'Docs', url: 'https://docs.gomaestro.org' },
    ],
  },
  {
    id: 'OGMIOS',
    name: 'Ogmios',
    tagline: 'WebSocket JSON/RPC · local node bridge',
    category: 'api-indexer',
    status: 'active',
    description:
      'Ogmios is a lightweight bridge that exposes cardano-node internals over a WebSocket interface using JSON/RPC. It is used by many off-chain SDKs (CTL, Blaze) and indexers as their primary node communication layer. Latest: v6.14.0 (presented Q3 2025). Can be run locally or via managed providers.',
    stats: 'v6.14.0 · WebSocket JSON/RPC · self-hosted or managed',
    links: [
      { label: 'Ogmios site', url: 'https://ogmios.dev' },
      { label: 'Docs', url: 'https://ogmios.dev/getting-started/' },
      { label: 'GitHub', url: 'https://github.com/CardanoSolutions/ogmios' },
    ],
  },
  {
    id: 'KUPO',
    name: 'Kupo',
    tagline: 'UTxO indexer · pattern matching · fast',
    category: 'api-indexer',
    status: 'active',
    description:
      'Kupo is a fast, lightweight chain-index that indexes UTxOs by address pattern. It is commonly paired with Ogmios to provide a complete local query stack without running DB-Sync. A Python client (kupo-py) was released in March 2025, and it integrates natively with Blaze and other SDKs.',
    stats: 'Pattern-match indexing · pairs with Ogmios · kupo-py (Mar 2025)',
    links: [
      { label: 'Docs', url: 'https://cardanosolutions.github.io/kupo/' },
      { label: 'GitHub', url: 'https://github.com/CardanoSolutions/kupo' },
    ],
  },
  {
    id: 'OURA',
    name: 'Oura',
    tagline: 'Rust event pipeline · Kafka/Redis/webhook',
    category: 'api-indexer',
    status: 'active',
    description:
      'Oura by TxPipe is a Rust-based event pipeline that connects to a Cardano node and streams on-chain events to various sinks — Kafka, Redis, webhooks, and more. It has an extremely small memory/CPU footprint and is ideal for building reactive backend services and custom indexers.',
    stats: 'Rust · tiny footprint · Kafka, Redis, webhook sinks',
    links: [
      { label: 'GitHub', url: 'https://github.com/txpipe/oura' },
      { label: 'Docs', url: 'https://txpipe.github.io/oura/' },
    ],
  },
  {
    id: 'DBSYNC',
    name: 'DB-Sync',
    tagline: 'Full PostgreSQL mirror · official IOG',
    category: 'api-indexer',
    status: 'active',
    description:
      'DB-Sync is the official IOG project that mirrors the entire Cardano chain into a PostgreSQL database. It is the most comprehensive data source but requires significant disk space and sync time. Used by Blockfrost, Koios, and other services internally. Recent updates add off-chain data, pool statistics, and governance vote handling.',
    stats: 'Full chain in PostgreSQL · governance vote support (2025)',
    links: [
      { label: 'Docs', url: 'https://docs.cardano.org/cardano-components/cardano-db-sync/about-db-sync/' },
      { label: 'GitHub', url: 'https://github.com/IntersectMBO/cardano-db-sync' },
    ],
  },

  // ── DEV ENVIRONMENTS ──────────────────────────────────────────────────────
  {
    id: 'DEMETER',
    name: 'Demeter.run',
    tagline: 'Cloud workspaces · pre-wired Cardano stack',
    category: 'dev-environment',
    status: 'active',
    description:
      'Demeter.run provides cloud development workspaces with a full Cardano stack pre-configured — node, DB-Sync, Ogmios, and more — available in minutes. Its free tier covers testnet development and is the recommended environment for developers who cannot or do not want to run a local node.',
    stats: 'Free testnet tier · instant stack spin-up · preview + preprod',
    links: [
      { label: 'Demeter site', url: 'https://demeter.run' },
      { label: 'Docs', url: 'https://docs.demeter.run' },
    ],
  },
  {
    id: 'KUBIDE',
    name: 'KuberIDE',
    tagline: 'Browser-based Haskell/Plutus IDE',
    category: 'dev-environment',
    status: 'active',
    description:
      'KuberIDE is a browser-based IDE for writing and testing Plutus smart contracts without any local installation. It targets developers who want to experiment with Haskell/Plutus without setting up the full Haskell toolchain locally.',
    stats: 'Browser-native · no Haskell install required',
    links: [
      { label: 'KuberIDE', url: 'https://ide.kuber.run' },
    ],
  },
  {
    id: 'CLI',
    name: 'cardano-cli',
    tagline: 'Node control · raw tx · KES keys',
    category: 'dev-environment',
    status: 'active',
    description:
      'cardano-cli is the official command-line interface for interacting with a Cardano node — submitting transactions, querying state, managing keys, and operating stake pools. The current node is v10.5.3. The Cardano Course gitbook provides a comprehensive structured learning path.',
    stats: 'cardano-node v10.5.3 · CBOR tx · KES key rotation',
    links: [
      { label: 'Cardano Course', url: 'https://cardano-course.gitbook.io' },
      { label: 'Node releases', url: 'https://github.com/intersectmbo/cardano-node/releases' },
      { label: 'SPO docs', url: 'https://developers.cardano.org/docs/operate-a-stake-pool/' },
    ],
  },
  {
    id: 'NIX',
    name: 'Nix dev shells',
    tagline: 'Reproducible · iohk.nix · devenv',
    category: 'dev-environment',
    status: 'active',
    description:
      'Nix provides fully reproducible Cardano development environments via iohk.nix and devenv. Every developer on the team gets an identical toolchain regardless of OS, eliminating "works on my machine" problems. Most IOG and community tools ship with Nix flakes for instant setup.',
    stats: '100% reproducible · NixOS + macOS + WSL · flake-based',
    links: [
      { label: 'iohk.nix', url: 'https://github.com/input-output-hk/iohk-nix' },
      { label: 'devenv', url: 'https://devenv.sh' },
    ],
  },

  // ── LEARNING PLATFORMS ────────────────────────────────────────────────────
  {
    id: 'CF_ACAD',
    name: 'Cardano Academy',
    tagline: 'CBCA certification · Pearson VUE · 32k+ completions',
    category: 'learning',
    status: 'active',
    description:
      'The Cardano Foundation\'s Cardano Academy offers the Certified Blockchain Associate (CBCA) credential via Pearson VUE ($99 exam). The "Cardano Fundamentals" course on Binance Academy accumulated 32,000+ completions within 4 weeks of launch in September 2025. The platform includes Spanish-language content and a redesigned portal (May 2025).',
    stats: 'CBCA via Pearson VUE · 32k+ completions · Spanish available',
    links: [
      { label: 'Cardano Academy', url: 'https://academy.cardanofoundation.org' },
      { label: 'Certification info', url: 'https://cardanofoundation.org/en/academy' },
    ],
  },
  {
    id: 'GIMBALABS',
    name: 'Gimbalabs',
    tagline: 'Project-based learning · PPBL · open spaces',
    category: 'learning',
    status: 'active',
    description:
      'Gimbalabs offers project-based learning (PPBL — Plutus Project-Based Learning) and open community developer spaces. Fund 13 close-out completed with international expansion including Indonesia UNU bootcamp. A recommended entry point for developers who learn by building real projects in a collaborative environment.',
    stats: 'PPBL course · Fund 13 · Indonesia expansion 2025',
    links: [
      { label: 'Gimbalabs site', url: 'https://gimbalabs.com' },
      { label: 'PPBL', url: 'https://plutuspbl.io' },
    ],
  },
  {
    id: 'DEV_PORTAL',
    name: 'Developer Portal',
    tagline: 'developers.cardano.org · community maintained',
    category: 'learning',
    status: 'active',
    description:
      'The Cardano Developer Portal at developers.cardano.org is the central hub for developer documentation, tutorials, tools directory, and the State of Developer Experience annual survey. Community-maintained and regularly updated, it is the best starting point for orientation in the ecosystem.',
    stats: 'Annual DevEx survey · tools directory · open-source',
    links: [
      { label: 'Developer Portal', url: 'https://developers.cardano.org' },
      { label: 'Get started', url: 'https://developers.cardano.org/docs/get-started/' },
    ],
  },
  {
    id: 'CARDANO_COURSE',
    name: 'Cardano Course',
    tagline: 'Node · CLI · stake pool operations',
    category: 'learning',
    status: 'active',
    description:
      'The Cardano Course gitbook provides a comprehensive, structured path for learning cardano-node and cardano-cli — covering raw transactions, KES key rotation, epoch mechanics, and stake pool setup. Essential reading for infrastructure engineers and SPO operators.',
    stats: 'Free gitbook · covers node + CLI + SPO ops',
    links: [
      { label: 'Cardano Course', url: 'https://cardano-course.gitbook.io' },
    ],
  },

  // ── L2 / ZK / ADVANCED ────────────────────────────────────────────────────
  {
    id: 'HYDRA',
    name: 'Hydra',
    tagline: 'L2 state channels · production-ready since May 2023',
    category: 'layer2-zk',
    status: 'active',
    description:
      'Hydra is Cardano\'s Layer 2 protocol for high-throughput, low-latency transactions via isomorphic state channels (Hydra Heads). It has been production-ready on mainnet since May 2023, with continuous improvements throughout 2025. Because Hydra uses the same ledger rules as Cardano L1, existing smart contracts run natively without modification.',
    stats: 'Mainnet since May 2023 · isomorphic ledger · parallel Heads',
    links: [
      { label: 'Hydra site', url: 'https://hydra.family' },
      { label: 'Docs', url: 'https://hydra.family/head-protocol/' },
      { label: 'GitHub', url: 'https://github.com/cardano-scaling/hydra' },
    ],
  },
  {
    id: 'MITHRIL',
    name: 'Mithril',
    tagline: 'v1.0 mainnet 2025 · light client bootstrap',
    category: 'layer2-zk',
    status: 'active',
    description:
      'Mithril v1.0 was activated on Cardano mainnet in 2025, enabling trustless light-client bootstrapping with ~40% bandwidth reduction. It uses Stake-based Threshold Multi-signatures (STM) to allow clients to verify chain state without downloading the full blockchain. A SNARK-friendly STM library is in active development for ZK applications.',
    stats: 'v1.0 mainnet 2025 · ~40% bandwidth reduction · SNARK-friendly STM',
    links: [
      { label: 'Mithril site', url: 'https://mithril.network' },
      { label: 'Docs', url: 'https://mithril.network/doc/' },
      { label: 'GitHub', url: 'https://github.com/input-output-hk/mithril' },
    ],
  },
  {
    id: 'ZKFOLD',
    name: 'zkFold',
    tagline: 'Zero-knowledge smart contracts · beta',
    category: 'layer2-zk',
    status: 'beta',
    description:
      'zkFold enables zero-knowledge smart contracts on Cardano, allowing computation to be proven off-chain and verified on-chain with minimal cost. Currently in beta, it targets privacy-preserving applications and scalable computation that would be too expensive to run directly on L1.',
    stats: 'Beta · ZK proofs on Cardano L1 · privacy applications',
    links: [
      { label: 'zkFold site', url: 'https://zkfold.io' },
      { label: 'GitHub', url: 'https://github.com/zkfold' },
    ],
  },
  {
    id: 'PALLAS',
    name: 'Pallas / Dolos',
    tagline: 'Rust Cardano primitives · Dolos v0.33.1',
    category: 'layer2-zk',
    status: 'active',
    description:
      'Pallas is a suite of Rust libraries implementing Cardano primitives — CBOR encoding, Ouroboros mini-protocols, ledger rules — used by TxPipe tools (Oura, Scrolls) and Mithril. Dolos (v0.33.1, Dec 2025) is a lightweight, low-resource data node built on Pallas, ideal for read-heavy workloads without running a full node.',
    stats: 'Pallas 0.18.3 · Dolos v0.33.1 (Dec 2025) · Rust',
    links: [
      { label: 'Pallas GitHub', url: 'https://github.com/txpipe/pallas' },
      { label: 'Dolos GitHub', url: 'https://github.com/txpipe/dolos' },
    ],
  },

  // ── GOVERNANCE TOOLING ────────────────────────────────────────────────────
  {
    id: 'GOVTOOL',
    name: 'GovTool',
    tagline: 'gov.tools · DRep registration · live post-Plomin',
    category: 'governance',
    status: 'active',
    description:
      'GovTool at gov.tools enables ADA holders to register as DReps, delegate voting power, and vote on governance actions on Cardano mainnet — live since the Plomin (Chang 2) hard fork on January 29, 2025. The Cardano Constitution was ratified via on-chain vote on February 23, 2025. Open-source and maintained by Byron Network, DQuadrant, Bloxico, and WeDeliver.',
    stats: 'Live since Jan 29 2025 (Plomin HF) · CIP-1694 · open-source',
    links: [
      { label: 'gov.tools', url: 'https://gov.tools' },
      { label: 'GitHub', url: 'https://github.com/IntersectMBO/govtool' },
    ],
  },
  {
    id: 'INTERSECT_MBO',
    name: 'Intersect MBO',
    tagline: 'Member-based org · elected CC Sept 2025',
    category: 'governance',
    status: 'active',
    description:
      'Intersect MBO coordinates Cardano\'s constitutional governance. The first fully community-elected Constitutional Committee (7 members from 19 candidates) was seated in September 2025, replacing the interim committee. Major institutions (IOG, Cardano Foundation, Emurgo) stepped back, completing the decentralisation milestone. Working groups drive technical and ecosystem roadmap.',
    stats: 'Elected CC Sept 2025 · 7 community members · fully decentralised',
    links: [
      { label: 'Intersect MBO', url: 'https://intersectmbo.org' },
      { label: 'Working groups', url: 'https://intersectmbo.org/working-groups' },
      { label: 'CIPs', url: 'https://github.com/cardano-foundation/CIPs' },
    ],
  },
  {
    id: 'CATALYST',
    name: 'Project Catalyst',
    tagline: 'Fund15 · transitioning to Cardano Foundation',
    category: 'governance',
    status: 'active',
    description:
      'Project Catalyst is Cardano\'s on-chain innovation fund. Fund 15 closed with 761 proposals from 540 proposers (voting Jan 13–27, 2026). Catalyst is transitioning oversight to the Cardano Foundation, with Fund 16 expected to operate under the new structure. Grant sizes range from small community grants to $500k+ for major ecosystem projects.',
    stats: 'Fund15: 761 proposals · transitioning to CF · $10k–$500k+ grants',
    links: [
      { label: 'Project Catalyst', url: 'https://projectcatalyst.io' },
      { label: 'IdeaScale', url: 'https://cardano.ideascale.com' },
    ],
  },
  {
    id: 'AGORA',
    name: 'Agora',
    tagline: 'On-chain DAO governance library · Liqwid Labs',
    category: 'governance',
    status: 'active',
    description:
      'Agora is an on-chain DAO governance library by Liqwid Labs, providing reusable Plutus components for proposal creation, voting, and execution. Used by Liqwid Finance and other DeFi protocols, it offers a production-tested foundation for building decentralised governance systems on Cardano.',
    stats: 'Plutus components · proposal + vote + execution · production-tested',
    links: [
      { label: 'GitHub', url: 'https://github.com/Liqwid-Labs/agora' },
    ],
  },

  // ── WALLETS ───────────────────────────────────────────────────────────────
  {
    id: 'ETERNL',
    name: 'Eternl',
    tagline: 'CIP-30/95 · hardware wallet · multi-account',
    category: 'wallet',
    status: 'active',
    description:
      'Eternl is a feature-rich Cardano web wallet supporting CIP-30, CIP-95 (governance), and hardware wallets (Ledger, Trezor). It offers multi-account management and is one of the most popular choices for power users and DeFi participants.',
    stats: 'CIP-30/95 · Ledger + Trezor · multi-account',
    links: [
      { label: 'Eternl site', url: 'https://eternl.io' },
    ],
  },
  {
    id: 'LACE',
    name: 'Lace',
    tagline: 'IOG-built · light wallet · CIP-30/95',
    category: 'wallet',
    status: 'active',
    description:
      'Lace is the official light wallet built by IOG, designed for simplicity and DeFi accessibility. It supports CIP-30, CIP-95 (DRep delegation and governance voting), and features a built-in NFT gallery and DApp connector.',
    stats: 'IOG-built · DRep delegation · built-in NFT gallery',
    links: [
      { label: 'Lace site', url: 'https://www.lace.io' },
    ],
  },
  {
    id: 'VESPR',
    name: 'Vespr',
    tagline: 'Mobile-first · CIP-30/95 · dApp connector',
    category: 'wallet',
    status: 'active',
    description:
      'Vespr is a mobile-first Cardano wallet with CIP-30 and CIP-95 support, making it easy to interact with dApps from iOS and Android. It features a clean interface optimised for mobile DeFi and governance participation.',
    stats: 'iOS + Android · CIP-30/95 · mobile DeFi optimised',
    links: [
      { label: 'Vespr site', url: 'https://vespr.xyz' },
    ],
  },
  {
    id: 'NAMI',
    name: 'Nami',
    tagline: 'Pioneer browser wallet · CIP-30',
    category: 'wallet',
    status: 'active',
    description:
      'Nami was one of the first Cardano browser wallets to implement CIP-30, helping establish the standard. It remains widely used and is frequently referenced in tutorials and SDK documentation as the baseline wallet integration target.',
    stats: 'CIP-30 pioneer · browser extension · widely documented',
    links: [
      { label: 'Nami site', url: 'https://namiwallet.io' },
    ],
  },
];
