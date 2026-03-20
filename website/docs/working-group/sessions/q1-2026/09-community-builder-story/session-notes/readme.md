---
title: Session 09 Overview
sidebar_label: Session Notes
sidebar_position: 1
---

# Community Builder Story - Konma & HaskLedger

## Introduction

This session bridges the gap between **education** and **infrastructure**. We explore how community builders in India and Africa are solving the "retention problem" by creating real-world projects that employ the very talent they train.

**What you'll learn:**
- How **Konma Lab** pivoted from pure education to building deep-tech infrastructure
- The architecture of **HaskLedger** (RISC-V + Cardano Edge Computing)
- **Bernard Sibanda's** strategy for scaling developer adoption in Africa
- The "Transfer of Skills" proposal for maintaining core ecosystem repositories

---

## 1. The Konma Model: Education to Employment

### The Retention Challenge
**Vinay Devabhakthuni** (Founder, Konma Lab) shared data from 3 years of training:
- **Metrics**: 150+ students trained across 4 cohorts.
- **The Drop-off**: Most students left for Python/Web2 jobs due to the "perceived volume" of opportunities, despite the high value of Haskell skills.
- **The Lesson**: Training alone is not enough. You must build the "factory" (projects) where the "workers" (students) can be employed.

### The Solution: Applied Development
Konma shifted strategy to build their own products—**HaskLedger** and **Carbon Ledger**—specifically to create high-quality jobs for their graduates.

**Why this matters:**
This model evolves "Community Building" into "Venture Building," ensuring that the talent pool has a direct destination within the ecosystem.

---

## 2. Technical Deep Dive: HaskLedger

### What It Is
**HaskLedger** is an infrastructure project that brings **Edge Computing** to Cardano using **RISC-V** hardware.

**Key Features:**
- **Hardware**: Custom RISC-V System-on-Chip (SoC)
- **Computation**: Data is processed locally on the device (Edge)
- **Verification**: Only critical events ("Goal Reached" or "Anomaly Detected") are anchored to Cardano using ZK-proofs
- **Polyglot Support**: Built on **M-Labs' Covenant**, allowing developers to write in **Rust, Haskell, or TypeScript**, which compiles to UPLC.
- **HaskLedger eDSL**: A type-safe Haskell eDSL for writing validators using do-notation, infix operators, and composable combinators.
- **Compilation Pipeline**: Full end-to-end pipeline: HaskLedger eDSL → Covenant ASG → c2uplc → UPLC → .plutus envelope.
- **RISC-V Readiness**: Validated on GHC 9.12.2 for RISC-V NCG readiness.

### Real-World Use Case: Carbon Ledger
A partnership with **UNDP** to monitor industrial water quality:
1.  **Sensors** measure methane and toxins in textile effluents.
2.  **HaskLedger Node** processes this data locally.
3.  **Cardano** receives the verified proof of compliance or violation.

---

## 3. Scaling in Emerging Markets

### Coxygen's Approach (Africa)
**Bernard Sibanda** (Coxygen / Cardano Foundation Ambassador) manages a talent pool of **600+ students** with a focus on **Entrepreneurship**.

**Challenges & Solutions:**
- **Hardware Constraint**: Many students lack laptops capable of running a full node.
  - *Solution*: Cloud-based environments and lightweight tooling.
- **Employment Gap**: Local job markets for blockchain are nascent.
  - *Solution*: Teaching students to build solutions for local problems (AgriTech, Identity) rather than just seeking remote jobs.

---

## 4. The "Transfer of Skills" Proposal

### The Proposal
A collaborative initiative proposed by Bernard and supported by Konma to formalize the handover of mature infrastructure.

**How it works:**
1.  **Identify** mature repositories (e.g., Cardano Node, Ouroboros) that core teams (IOG/Intersect) are moving on from to build new feature sets.
2.  **Hire** junior developers from these talent pools to maintain them.
3.  **Mentor** them via senior developers during a transition period.

**Why this is essential:**
- **Sustainability**: Ensures core infrastructure is maintained long-term.
- **Career Pathway**: Provides the critical "first job" for new graduates, bridging the gap between learning syntax and contributing to the protocol.

---

## Key Takeaways

### For Community Builders
- **Build the Destination**: Don't just train; create the projects that will employ your students.
- **Focus on Entrepreneurship**: In emerging markets, teach students to build businesses, not just write code.

### For Developers
- **Look for the Middle Layer**: Opportunities exist in the "maintenance" of core protocols, not just in building new DApps.
- **Edge Computing is Growing**: Projects like HaskLedger open up new domains (IoT + Blockchain) that require diverse skills (Rust, C++, Haskell).

---

## Resources

### Projects
- **[HaskLedger GitHub](https://github.com/KonmaORG/HaskLedger)** - The full eDSL implementation and examples.
- **[HaskLedger Documentation](https://konmaorg.github.io/HaskLedger/haddock/index.html)** - API reference and user guide.

### Join the Community
- **Intersect Discord**: Join the Developer Experience Working Group to discuss the "Transfer of Skills" proposal.
