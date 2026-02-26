---
title: "Session 13: Deeper Dive: Smart Contracts & Languages"
sidebar_label: Session Notes
sidebar_position: 2
slug: /working-group/q1-2026/sessions/13-smart-contracts-languages/session-notes
---

# Session Notes: Smart Contracts & Languages

Welcome to Session 13 of the Q1 2026 Developer Experience Working Group. This session focuses on comparing various smart contract languages available in the Cardano ecosystem, providing insights into their features, learning curves, and production readiness.

---


The Cardano ecosystem has evolved significantly since the introduction of Plutus (Haskell). Today, developers can write smart contracts (validators) in languages they already know—from Rust-like syntax to Python and TypeScript. 

This session explores the primary languages available for building on Cardano, their underlying paradigms, and when to use each.

---

## The eUTXO Model & Smart Contracts

Before diving into languages, it is crucial to understand that Cardano smart contracts do not "run" applications like Ethereum's account model. Instead, they act as **validators** for the eUTXO (Extended Unspent Transaction Output) model.

A smart contract on Cardano simply answers one question: **"Is this transaction allowed to spend this UTXO or mint this token?"**
The application logic happens off-chain (building the transaction), while the on-chain script only validates the result.

---

## 1. Aiken (Rust-like)

Aiken is currently the most popular and rapidly growing smart contract language in the Cardano ecosystem. It brings a modern developer experience inspired by Rust and Gleam.

* **Syntax Paradigm:** Rust / Gleam (Functional + Immutable)
* **Primary Use Case:** High-performance DeFi, complex protocols, and teams transitioning from web/systems programming.

**Key Features:**
* **Exceptional Developer Experience:** Comes with a built-in toolchain (`aiken build`, `aiken check`, `aiken fmt`) and an incredibly fast compiler.
* **Type Safety:** Strongly typed with fantastic compiler error messages.
* **Performance:** Generates highly optimized Untyped Plutus Core (UPLC), resulting in low execution costs (CPU/Memory).
* **Testing:** First-class property-based testing and unit testing built directly into the language.

**When to choose Aiken:** If you want the most vibrant community support, excellent tooling, and the best performance-to-DX ratio.

---

## 2. OpShin (Python)

OpShin allows developers to write Cardano smart contracts in 100% valid Python. This massively lowers the barrier to entry for the world's largest developer community.

* **Syntax Paradigm:** Python
* **Primary Use Case:** Rapid prototyping, data science integrations, and onboarding Python developers.

**Key Features:**
* **Native Python:** OpShin is strictly valid Python 3. You can run and test your smart contracts using standard Python tooling (like `pytest` or `unittest`).
* **Type Hinting:** Relies heavily on Python's type hinting (`typing` module) to ensure contracts compile safely down to Plutus Core.
* **Accessibility:** Drastically reduces the learning curve for anyone already familiar with Python syntax.

**When to choose OpShin:** If your team originates from a Python/Data Science background, or if you need to rapidly prototype and test ideas using standard Python CI/CD pipelines.

---

## 3. Plu-ts & Helios (TypeScript / JavaScript-like)

For front-end and full-stack web developers, learning a completely new paradigm can be daunting. Languages like Plu-ts and Helios bridge the gap by bringing smart contracts to the TypeScript ecosystem.

### Plu-ts
* **Syntax Paradigm:** TypeScript
* **Overview:** Plu-ts is essentially equivalent to "React for Cardano Smart Contracts." It allows developers to write both off-chain transaction building code and on-chain validation code in the same language.
* **Key Benefit:** Seamless integration with existing dApp frontends.

### Helios
* **Syntax Paradigm:** JavaScript/TypeScript-like (Domain Specific)
* **Overview:** Helios is a lightweight, heavily optimized smart contract language that compiles extremely quickly. It is designed to be embedded directly into JavaScript/TypeScript applications without needing a complex external toolchain.
* **Key Benefit:** Zero-dependency compilation directly in the browser.

**When to choose TS/JS clones:** If you are building a dApp single-handedly and want a unified stack (Full TypeScript) for both frontend and on-chain logic.

---

## 4. PlutusTx & Plutarch (Haskell)

Haskell is the native language of Cardano. While it has a famously steep learning curve, it remains the standard for mathematical provability and high-assurance code.

### PlutusTx
* **Overview:** The original framework by IOG. It compiles Haskell down to Plutus Core. It requires a robust understanding of functional programming concepts.
* **Use Case:** "Gold standard" security for protocols that manage hundreds of millions of dollars.

### Plutarch
* **Overview:** A typed eDSL (Embedded Domain Specific Language) in Haskell meant to replace PlutusTx. It produces significantly more optimized bytecode than PlutusTx.
* **Use Case:** High-TVL DeFi protocols where every lovelace of execution fee matters, and the team already consists of expert Haskell engineers.

**When to choose Haskell:** If you are building foundational infrastructure, require formal verification, or have an existing team of Haskell veterans.

---

## 5. Marlowe (Domain Specific for Finance)

Marlowe is unique; it is not a general-purpose programming language. Instead, it is a Domain Specific Language (DSL) specifically designed for constructing financial contracts.

* **Syntax:** Block-based (like Scratch), TypeScript, or Haskell.
* **Primary Use Case:** Escrows, loans, swaps, and traditional financial instruments.

**Key Features:**
* **Safety by Design:** Marlowe contracts are guaranteed to eventually terminate and can be exhaustively analyzed before they are deployed. It is impossible to write an infinite loop.
* **Visual Builder:** Non-programmers (lawyers, financial analysts) can build contracts using the Marlowe Playground visual editor.

**When to choose Marlowe:** If you are creating standard financial agreements (escrows, token swaps, vesting) and do not need the complexity of a Turing-complete language.

---

## Summary Matrix: Making a Decision

| Language / Tool | Base Syntax | Steepness of Learning Curve | Best For |
|-----------------|-------------|-----------------------------|----------|
| **PlutusTx** | Haskell | Very High | Foundational infrastructure, IOG standards |
| **Plutarch** | Haskell | Extreme | Hyper-optimized DeFi protocols |
| **Aiken** | Rust / Gleam| Medium | Overall Best DX, general dApp development |
| **OpShin** | Python | Low | Python devs, rapid prototyping |
| **Plu-ts** | TypeScript | Low | Full-stack JS devs, unified codebase |
| **Helios** | Custom JS | Low | Integrated web apps, fast compilation |
| **Marlowe** | Visual / TS | Very Low | Financial contracts, escrows, simple logic |

---

# Compiling Smart Contracts to Plutus (UPLC)

This guide covers how to compile smart contracts written in various Cardano languages to **Untyped Plutus Core (UPLC)**, the low-level execution format used by the Cardano blockchain.

## 🎯 Overview

All Cardano smart contract languages compile to the same target: **UPLC** (Untyped Plutus Core). This ensures:
- **Consistent execution** across all languages
- **Interoperability** between contracts written in different languages
- **Unified fee structure** and resource limits
- **Same security guarantees** from the Plutus Virtual Machine

## 📋 Compilation Documentation

For detailed instructions on how to compile smart contracts in each language, please refer to their official documentation:

*   **Aiken**: [Aiken Language Guide - Modules](https://aiken-lang.org/language-guide/modules)
*   **OpShin**: [OpShin Compilation Documentation](https://opshin.opshin.dev/docs/compilation)
*   **Plinth (Plutus Tx)**: [Plutus Tx Explanations](https://plutus.readthedocs.io/en/latest/explanations/plutus-tx.html)
*   **Helios**: [Helios Language Guide](https://www.hyperion-bt.org/helios-book/)
*   **Plutarch**: [Plutarch Guide](https://github.com/Plutonomicon/plutarch-plutus)
*   **Plu-ts**: [Plu-ts Documentation](https://pluts.harmoniclabs.tech/docs/intro)
*   **Scalus**: [Scalus Documentation](https://github.com/nau/scalus)
*   **Marlowe**: [Marlowe Documentation](https://docs.marlowe.iohk.io/docs/introduction)

All languages output to similar formats, typically `contract.uplc` (raw UPLC text), or `contract.json` (Plutus script JSON format).

## 🧪 Testing Compiled Contracts

You can test compiled contracts using the Cardano CLI to calculate script hashes and build transactions. Refer to the [Cardano Developer Portal](https://developers.cardano.org/) for detailed tutorials on how to interact with smart contracts on-chain.

## � Comparison Table

| Feature | Plinth | Aiken | OpShin | Helios | Plutarch | Plu-ts | Scalus | Marlowe |
|---------|--------|--------|--------|--------|----------|---------|---------|---------|
| **Type Safety** | ★★★★★ | ★★★★☆ | ★★★☆☆ | ★★★☆☆ | ★★★★★ | ★★★★☆ | ★★★★★ | ★★★★★ |
| **Developer Experience** | ★★☆☆☆ | ★★★★★ | ★★★★☆ | ★★★★☆ | ★★☆☆☆ | ★★★★☆ | ★★★☆☆ | ★★★★★ |
| **Performance** | ★★★★☆ | ★★★★☆ | ★★★☆☆ | ★★★☆☆ | ★★★★★ | ★★★☆☆ | ★★★★☆ | ★★★★☆ |
| **Learning Curve** | ★☆☆☆☆ | ★★★☆☆ | ★★★★☆ | ★★★☆☆ | ★☆☆☆☆ | ★★★☆☆ | ★★☆☆☆ | ★★★★★ |
| **Ecosystem Support** | ★★★★★ | ★★★★☆ | ★★★☆☆ | ★★★☆☆ | ★★★☆☆ | ★★☆☆☆ | ★★☆☆☆ | ★★★★☆ |
| **Documentation** | ★★★☆☆ | ★★★★★ | ★★★★☆ | ★★★☆☆ | ★★☆☆☆ | ★★☆☆☆ | ★★☆☆☆ | ★★★★☆ |
| **Production Readiness** | ★★★★★ | ★★★★★ | ★★★★☆ | ★★★★☆ | ★★★★☆ | ★★★☆☆ | ★★☆☆☆ | ★★★★★ |

## �📚 Additional Resources

### General Resources
- [Cardano Developer Portal](https://developers.cardano.org/)
- [Plutus Pioneer Program](https://github.com/input-output-hk/plutus-pioneer-program)
- [Essential Cardano](https://www.essentialcardano.io/)

### Language-Specific Resources
- **Plinth**: [Official IOG Documentation](https://plutus.readthedocs.io/)
- **Aiken**: [Official Aiken Guide](https://aiken-lang.org/)
- **OpShin**: [OpShin Documentation](https://opshin.opshin.dev/)
- **Helios**: [Helios Language Guide](https://www.hyperion-bt.org/helios-book/)
- **Plutarch**: [Plutarch Guide](https://github.com/Plutonomicon/plutarch-plutus)
- **Aiken Compilation**: [aiken-lang.org/language-guide/modules](https://aiken-lang.org/language-guide/modules)
- **OpShin Compilation**: [opshin.opshin.dev/docs/compilation](https://opshin.opshin.dev/docs/)
- **Plutus Compilation**: [plutus.readthedocs.io/en/latest/explanations/plutus-tx.html](https://plutus.readthedocs.io/en/latest/)
- **UPLC Specification**: [plutus.readthedocs.io/en/latest/reference/plutus-core-spec.html](https://plutus.readthedocs.io/en/latest/)

---

*This document is part of the Q1 2026 Developer Experience Working Group session "Deeper Dive: Smart Contracts & Languages".*
