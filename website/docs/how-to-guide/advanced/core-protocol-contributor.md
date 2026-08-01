---
sidebar_position: 4
title: Core Protocol Contributor
---

# Becoming a Core Protocol Contributor

This section is for systems engineers, compiler writers, protocol researchers, formal methods practitioners, and developers who want to contribute to the **core of Cardano**: not build applications on top of it.

This is a **parallel track**, not a destination you reach after shipping a dApp. If your background is in programming languages, distributed systems, cryptography, or formal verification, this is your entry point.

## Start Here: The Cardano Blueprint

Before choosing a language path, read the **[Cardano Blueprint](https://cardano-scaling.github.io/cardano-blueprint/introduction/index.html)**.

The Blueprint is implementation-independent documentation explaining how the Cardano protocol works: node architecture, ledger state machine, consensus mechanics, and networking: written in accessible Markdown with diagrams and test data, not dense academic LaTeX. It applies equally to every language path below. Reading it first will make every codebase significantly easier to navigate.

## Choose Your Path

| Language | Node / Project | Stage | Guide |
|---|---|---|---|
| **Haskell** | `cardano-node`: the reference implementation | Production | [Haskell Core Contributor](./haskell-core-contributor.md) |
| **Rust** | Amaru (Pragma), Pallas / Dolos (TxPipe) | Active development | [Rust Core Contributor](./rust-core-contributor.md) |
| **Go** | Dingo (Blink Labs) | Testnet / active development | [Go Core Contributor](./go-core-contributor.md) |

None of these paths requires the others as a prerequisite. Choose based on your background and the kind of work you want to do.

## Shared Resources

These apply to all three paths:

- **[Cardano Blueprint](https://cardano-scaling.github.io/cardano-blueprint/introduction/index.html)**: start here
- **[Shelley Ledger Formal Spec](https://github.com/IntersectMBO/cardano-ledger/releases)**: the foundational ledger rules
- **[Conway Ledger Spec](https://github.com/IntersectMBO/cardano-ledger/releases)**: CIP-1694 governance, Conway era rules
- **[Ouroboros papers](https://iohk.io/en/research/library/)**: the consensus protocol proofs
- **[CIPs repository](https://github.com/cardano-foundation/CIPs)**: where protocol-level changes are proposed
- **[Essential Repositories](../../resources/repositories.md)**: full list of core and community repos

## Contributing to Protocol Direction

Core protocol work doesn't require writing code to participate. Intersect's Technical Steering Committee (TSC) working groups shape which CIPs get prioritized and which protocol changes get funded: across all node implementations.

See [Contributing to Intersect](../../working-group/sessions/q1-2026/07-contributing-intersect/session-notes/readme.md) for how to find and join working groups. See the [Intersect Membership Guide](../../intersect-membership-guide.md) for membership access.

*For contributing to this documentation site, see the [Contributing Guidelines](https://github.com/IntersectMBO/developer-experience/blob/main/CONTRIBUTING.md).*
