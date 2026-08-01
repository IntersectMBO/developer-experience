---
title: Session 12 - Cardano Developer Pathway
sidebar_position: 1
---

# Cardano Developer Pathway

The Cardano developer pathway is **not a single linear progression**. Depending on your background and goals, you enter at a different point and follow a different track. The four tracks below exist in parallel: none is a prerequisite for another.

---

## The Four Tracks

### Track 1: dApp & Smart Contracts
**Who it's for**: Web2 developers, JavaScript/TypeScript engineers, product builders coming from traditional software.

```
Web2 background
  → Cardano concepts (UTxO model, native assets, eras)
  → Choose a smart contract language:
      - Aiken (recommended for new projects, Rust-like syntax)
      - Helios (TypeScript-like)
      - Plutus/Haskell (most expressive, steepest curve)
  → First smart contract (1 week)
  → Full-stack dApp with frontend + wallet integration (4–8 weeks)
  → Mainnet deployment
  → Catalyst funding for your project
```

**Resources**: [Beginner Guides](../../../../how-to-guide/beginner/README.md), [Aiken](https://aiken-lang.org/), [Smart Contracts overview](https://developers.cardano.org/docs/build/smart-contracts/overview/), [Native Tokens](https://developers.cardano.org/docs/build/native-tokens/overview/), [Wallet & payment integration](https://developers.cardano.org/docs/build/integrate/overview/), [Client SDKs](https://developers.cardano.org/docs/get-started/client-sdks/overview/)

---

### Track 2: Infrastructure & DevOps
**Who it's for**: Backend engineers, DevOps, developers building indexers, block explorers, APIs, or running nodes.

```
Systems/backend background
  → Run a Cardano node (cardano-node)
  → Choose an indexer: DB Sync, Kupo, Scrolls, Oura
  → Expose data via API: Ogmios, cardano-graphql
  → Build block explorers, monitoring, or custom data pipelines
```

**Resources**: [cardano-db-sync guide](../../../../how-to-guide/advanced/cardano-db-sync.md), [cardano-api guide](../../../../how-to-guide/advanced/cardano-api.md), [Yaci DevKit](../../../../how-to-guide/advanced/README.md), [Installing cardano-node](https://developers.cardano.org/docs/get-started/infrastructure/node/installing-cardano-node/), [Infrastructure overview](https://developers.cardano.org/docs/get-started/infrastructure/overview/), [Operate a Stake Pool](https://developers.cardano.org/docs/operate-a-stake-pool/)

---

### Track 3: Core Protocol (Haskell)
**Who it's for**: Systems engineers, PL researchers, formal methods practitioners, experienced Haskell developers who want to contribute to `cardano-ledger`, `ouroboros-consensus`, or `cardano-node`.

```
Haskell / FP / systems background
  → Set up Nix development environment (the required first step)
  → Read the formal ledger specification (STS framework)
  → Navigate cardano-ledger module structure
  → Write tests for existing ledger rules (accessible first contribution)
  → Contribute to ledger rules, consensus, or cardano-api
  → Author or co-author a CIP for protocol-level changes
```

> Note: The Plutus Pioneer Program teaches on-chain validator development, not ledger/consensus contribution. These are different jobs.

**Resources**: [Core Protocol Contributor Guide](../../../../how-to-guide/advanced/core-protocol-contributor.md), [IOG Haskell Course](https://github.com/input-output-hk/haskell-course) (beginner-friendly, 22 lessons, no prior Haskell required)

---

### Track 4: Core Protocol (Rust)
**Who it's for**: Rust developers who want to contribute to the protocol at the implementation level via Pallas, Dolos, or conformance test infrastructure.

```
Rust background
  → Clone Pallas or Dolos
  → Set up development environment (simpler than Haskell path: no Nix required)
  → Find a good first issue
  → Contribute to CBOR codec, chain sync, ledger types, or conformance tests
  → Cross-implementation conformance testing against Haskell reference
```

> Pallas and Dolos are **core protocol infrastructure**, not Layer 2. They are Rust re-implementations of core Cardano components.

**Resources**: [Core Protocol Contributor Guide](../../../../how-to-guide/advanced/core-protocol-contributor.md), [Pallas](https://github.com/txpipe/pallas), [Dolos](https://github.com/txpipe/dolos)

---

## Governance Contribution (Cross-Track)

Governance work spans three layers: pick the one that matches your intent:

| Layer | What it involves |
|---|---|
| **Participation** | Register as a DRep, vote, join Intersect working groups |
| **Tooling** | Build on GovTool, Agora, wallet voting integrations |
| **Protocol** | Contribute to Conway era ledger rules, CIP-1694 implementation |

For participation: [Intersect Membership Guide](../../../../intersect-membership-guide.md)  
For protocol work: [Core Protocol Contributor Guide](../../../../how-to-guide/advanced/core-protocol-contributor.md)

---

## Contributing to Intersect Working Groups

Every track eventually intersects with Intersect MBO's working groups: where CIPs get prioritized, protocol changes get funded, and community voices are collected. See [Session 07: Contributing to Intersect](../07-contributing-intersect/session-notes/readme.md) for how to find and join working groups.

---

*Session 12 of the Q1 2026 Developer Experience Working Group.*
