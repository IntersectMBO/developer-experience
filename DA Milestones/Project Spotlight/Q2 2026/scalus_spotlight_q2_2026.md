# Cardano Project Spotlight – Scalus (Q2 2026)

## Overview

- **Project:** Scalus
- **Format:** Cardano Project Spotlight – Recorded conversation and technical walkthrough
- **Quarter:** Q2 2026
- **Host:** Harun Waweru Mwangi (Intersect Developer Advocate)
- **Guests:** Alexander Nemish (Founder and CTO, Lantr Engineering) and Oleksii Khodakivskyi (Co-Founder, CEO, and Product Lead, Lantr Engineering)
- **Official Site:** [scalus.org](https://scalus.org/)
- **Documentation:** [scalus.org/docs](https://scalus.org/docs)
- **GitHub:** [github.com/scalus3/scalus](https://github.com/scalus3/scalus)
- **Starter Project:** [github.com/lantr-io/scalus-starter](https://github.com/lantr-io/scalus-starter)
- **X / Twitter:** [@Scalus3](https://x.com/Scalus3)

[Scalus](https://scalus.org/) is an open-source development platform for building Cardano smart contracts, off-chain transaction logic, and full decentralized applications using Scala 3. Although it began as a smart contract language, the team is developing it as a unified application platform that supports the wider software lifecycle: implementation, testing, debugging, profiling, deployment, and—on its longer-term roadmap—operating and scaling applications.

The project brings the JVM ecosystem and enterprise-grade development practices to Cardano. Its central proposition is that teams should be able to build complex, mission-critical protocols with one language and an integrated toolchain instead of assembling separate tools and duplicating logic across on-chain and off-chain codebases.

---

## The Problem: A Fragmented Development Experience

The Scalus team identified two closely related gaps in Cardano development:

- Cardano tooling is powerful but often distributed across different languages, libraries, testing environments, and deployment tools.
- The JVM ecosystem—widely used for financial services, fintech, and other enterprise applications—has historically had less complete Cardano support than some other technology stacks.

Building a Cardano application can therefore require developers to choose one language for smart contracts, another for off-chain code, and additional tools for transaction construction, testing, profiling, debugging, and deployment. For complex protocols, this fragmentation increases context switching, duplicates business logic, and creates a risk that on-chain and off-chain implementations diverge.

Scalus addresses this by bringing these capabilities together in one development environment based on Scala 3 and the JVM, while also exporting key components to JavaScript and TypeScript environments.

---

## A Unified Full-Stack Development Platform

Scalus compiles a supported subset of Scala 3 to Untyped Plutus Core (UPLC) for execution on Cardano. The same project can also contain transaction-building logic, application code, tests, and reusable domain models.

### One Language Across the Stack

Developers can use Scala for:

- On-chain validators and minting policies.
- Off-chain transaction construction.
- Shared business rules and state-transition logic.
- Unit, property-based, scenario, boundary, and integration tests.
- Backend application logic running on the JVM.
- Selected browser and TypeScript integrations through Scala.js exports.

This is especially valuable for state-machine-based protocols. Instead of implementing the same transition logic once in a smart contract language and again in a backend or frontend language, Scalus allows teams to reuse logic and test it under both on-chain and off-chain execution semantics.

### Built-In Development Capabilities

During the spotlight, the team walked through a platform that includes:

- An optimizing Scala-to-UPLC compiler.
- Cardano data structures and reusable design patterns.
- A type-safe transaction builder.
- Script evaluation and execution-budget calculation.
- Unit, property-based, scenario, boundary, and full-transaction testing.
- Line-level profiling of CPU, memory, fees, and script costs.
- IDE debugging with breakpoints, stepping, expression evaluation, and variable inspection.
- An in-memory Cardano node emulator.
- Local devnet support through Yaci DevKit.
- Tools for preparing test data and deploying applications to public networks.

The team’s longer-term vision is to extend Scalus from a development platform into an application platform that can listen and respond to blockchain events, operate against a team’s own node, and make it easier to move applications from development to production and L2 environments.

---

## Demonstrated Developer Workflow

The technical walkthrough focused on shortening the feedback loop for developers working on complex applications.

### Fast, Transaction-Level Testing

Scalus tests can construct complete Cardano transactions and execute them against an in-memory emulator. This enables developers to verify both validator behaviour and the transactions that exercise those validators, including ledger rules, script execution, execution budgets, and UTxO state changes.

The team demonstrated tests completing in milliseconds and described running thousands of tests within seconds. The same test scenarios can be directed at different environments—such as the emulator, Yaci DevKit, or a public testnet—by changing the target environment rather than maintaining separate test suites.

This workflow gives teams:

- Rapid feedback while developing locally.
- Real transaction construction instead of validator-only mocks.
- Budget and script-size assertions that can prevent regressions.
- A progression from fast emulation to a real local node and then to public testnets.

### Profiling and Cost Control

Script size and execution budgets directly affect whether Cardano applications can operate within protocol limits. Scalus provides an optimizing compiler and a profiler that attributes CPU, memory, fee, and size costs to individual areas of source code.

Developers can use this information to locate expensive logic, compare optimizations, and add automated assertions for expected script sizes and execution budgets. This makes performance work part of the normal development and testing cycle rather than a late deployment-stage activity.

### IDE Debugging

Because Scalus preserves compatible semantics between Scala execution and UPLC execution for supported code, developers can use familiar JVM debugging tools. The team demonstrated setting breakpoints, inspecting a parsed `ScriptContext`, stepping through validator logic, and evaluating expressions during a test run.

This brings a conventional professional debugging experience to smart contract development and can make complex failures easier to reproduce and diagnose.

---

## Multiplatform and Ecosystem Integration

Scalus is built on Scala’s multiplatform capabilities. Components can run on the JVM and be exported for JavaScript and TypeScript use, allowing teams outside the Scala ecosystem to benefit from the project’s transaction, emulation, script-evaluation, and cost-calculation capabilities.

Integrations and uses discussed during the spotlight included:

- **MeshJS:** Uses Scalus capabilities in its JavaScript development stack, including emulator integration.
- **Lucid Evolution:** Integration work allows Scalus components to support JavaScript and TypeScript application workflows.
- **Cardano Client Lib:** Uses the Scalus Plutus virtual machine implementation for script execution and cost evaluation in the JVM ecosystem.
- **Yaci DevKit:** Provides a real local Cardano development network for final integration testing.
- **Blockfrost:** Supported as a provider, with additional transaction-submission providers identified as a contribution opportunity.
- **CIP-57 Plutus blueprints:** Allow contracts written in other languages, including Aiken, to be loaded into Scalus workflows.

Scalus therefore does not require every team to rewrite its validators in Scala. A project can retain contracts written in Aiken or another blueprint-compatible language while using Scalus for transaction construction, emulation, testing, debugging, or application logic.

---

## Complex Protocols and Emerging Use Cases

The platform is designed primarily for experienced developers and teams building multi-contract, long-lived, or mission-critical systems. Examples discussed in the session included bridges, Layer 2 protocols, complex DeFi applications, and protocols requiring extensive scenario testing.

### Hydrozoa and Gummiworm

The Hydrozoa team selected Scalus for the development of its state-channel protocol. The work subsequently contributed to **Gummiworm**, an L2 design for Cardano. The Scalus team described supporting this work through technical guidance, code review, and platform improvements.

This use case demonstrates Scalus’s fit for protocols with multiple contracts, complex state transitions, and demanding performance and testing requirements.

### Binocular and Bifrost

The team also discussed using Scalus for components of the Bifrost Bitcoin bridge and **Binocular**, a Bitcoin oracle for Cardano. In Binocular, the same state-machine logic used to parse and verify Bitcoin consensus data can be reused when constructing and validating Cardano transactions.

### Cosmex

Lantr is also developing **Cosmex**, an off-chain, high-performance order-book design in which a centralized coordinator facilitates trading but cannot take custody of participants’ funds. The project was presented as another example of Scalus supporting advanced financial and scalability applications.

---

## Onboarding and Community Support

For a Scala developer who is new to Cardano, the recommended entry point is the [Scalus Starter](https://github.com/lantr-io/scalus-starter). It provides a small but complete dApp with:

- Smart contracts for minting and burning tokens.
- Off-chain transaction logic.
- Unit and integration tests.
- A guided path from local development to deployment on a public testnet.

The documentation also includes tutorials and a collection of examples ranging from hash time-locked contracts to automated market makers and crowdfunding applications.

The team runs **Scalus Club**, a recurring community for experienced Cardano engineers and architects to exchange knowledge. They also dedicate time to helping teams adopt the platform through setup assistance, architecture guidance, feature support, and code review.

For contributors, the project is particularly seeking help with:

- Expanding off-chain capabilities.
- Adding transaction-submission and data providers.
- Producing more application examples and learning resources.
- Implementing features requested by teams actively building with Scalus.

---

## Security and Reliability

Security is especially important because Scalus sits between developer-written Scala and the UPLC executed on-chain. The team described several safeguards:

- Compiler and virtual-machine behaviour are checked against Cardano and Plutus conformance tests.
- Integration tests replay mainnet activity and compare Scalus’s ledger-rule and Plutus execution results with expected network behaviour.
- The compiler has undergone a private security review.
- Funding was allocated for a more public independent security audit.
- The team is working to expand the number of ecosystem security firms able to audit Scalus-based applications.

The fast emulator also supports security work by making large regression and scenario test suites practical during everyday development. Before deployment, teams can run the same scenarios against Yaci DevKit or a public Cardano testnet for additional confidence.

---

## Open Source, Funding, and Sustainability

Scalus has received Cardano community support through multiple Project Catalyst initiatives, including Fund 11 work on the compiler, multiplatform support, and off-chain transaction-building capabilities. The team also received support through a Cardano treasury withdrawal, administered by Intersect, to develop the components into a more complete end-to-end platform.

The team reported completing its Catalyst commitments and nearing completion of the treasury-funded work described in the session.

Scalus is open source and has attracted more than ten external contributors. Its longer-term sustainability strategy is to reduce reliance on treasury funding as adoption grows by developing relationships with successful Scalus-based products. Potential models include:

- Project sponsorship.
- Paid or premium technical support.
- Engineering and integration engagements.
- Ongoing partnerships with teams whose products depend on the platform.

This approach aims to keep the core platform openly available while creating a commercial base for continued maintenance and developer support.

---

## Roadmap

The roadmap discussed during the spotlight centres on turning Scalus into a complete application runtime, not only a development toolkit. Priorities include:

- Persistent handling of blockchain events and transaction streams.
- Closer integration with a sovereign Cardano node.
- A framework for deploying and operating full applications.
- Seamless access to L2 infrastructure, including Gummiworm-based environments.
- Further JavaScript, TypeScript, and AI-assisted development integrations.
- Continued expansion of off-chain components, providers, examples, and adoption support.

One intended outcome is for developers building applications such as prediction markets or perpetual protocols to move from L1 development to an appropriate L2 environment with minimal additional setup.

The team also described AI-oriented resources that provide language models with Scalus API context and a Scalus skill intended to assist with tasks such as smart contract vulnerability review and performance optimization.

---

## Why This Project Matters

Scalus expands the range of professional development environments available to Cardano builders. It is particularly relevant because it:

- Opens Cardano development to Scala, Java, Kotlin, and wider JVM expertise common in enterprise and financial software.
- Reduces duplicated logic between smart contracts, transaction builders, backends, and browser applications.
- Provides fast testing, detailed cost profiling, and familiar IDE debugging for complex protocols.
- Supports contracts written in other languages instead of operating as an isolated or exclusive ecosystem.
- Contributes reusable infrastructure to JavaScript and JVM Cardano SDKs.
- Provides a foundation for bridges, advanced DeFi systems, and Layer 2 applications.

The spotlight clarified a common misconception: Scalus is not simply another smart contract language competing with Aiken or Plutus. It is an integrated, multiplatform development environment designed to improve the full lifecycle of building and operating Cardano applications.

---

## Resources

- [Scalus official website](https://scalus.org/)
- [Scalus documentation](https://scalus.org/docs)
- [Scalus GitHub repository](https://github.com/scalus3/scalus)
- [Scalus Starter project](https://github.com/lantr-io/scalus-starter)
- [Scalus API documentation](https://scalus.org/api/)
- [Scalus on X](https://x.com/Scalus3)

---

## Conclusion

Scalus brings an integrated, enterprise-oriented development experience to Cardano. By combining Scala-to-UPLC compilation, transaction construction, fast full-transaction testing, cost profiling, IDE debugging, multiplatform libraries, and deployment tooling, it gives teams a coherent environment for building sophisticated decentralized applications.

The project’s adoption by teams working on bridges, Bitcoin interoperability, DeFi, and Layer 2 protocols shows the value of this approach for complex systems. Its open-source model, Cardano community funding, external contributors, and planned commercial support relationships provide a path toward broader adoption and long-term sustainability.
