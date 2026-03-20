---
sidebar_position: 999
title: FAQs
description: Common questions and answers for Cardano contributors and developers.
---

# Frequently Asked Questions (FAQs)

Welcome to the Frequently Asked Questions! This section addresses common questions from contributors and developers to help you navigate the ecosystem, understand roles, and get started effectively.

## General Ecosystem

<details>
<summary>Who is who? (Intersect, IOG, CF, Emurgo)</summary>

The ecosystem is decentralized, but there are key entities:
- **Intersect**: The member-based organization responsible for the continuity, governance, and development of the core codebase.
- **IOG (Input Output Global)**: A software research and engineering company that built much of the original core infrastructure.
- **Cardano Foundation (CF)**: A Swiss non-profit focused on brand, adoption, and governance oversight.
- **Emurgo**: The commercial arm driving enterprise adoption and education.
- **Cardano**: The decentralized blockchain protocol itself, owned by no single entity.

</details>

<details>
<summary>How do I join Intersect?</summary>

Joining Intersect is the best way to get involved in governance and decision-making. You can join as an **Associate** (free) or an **Individual Member** ($10/year) to get voting rights.

- **[Read the Complete Membership Guide](./intersect-membership-guide.md)** for a detailed comparison of tiers and benefits.
- **[Register here](https://members.intersectmbo.org/registration)** to sign up immediately.

</details>

<details>
<summary>When are meetings?</summary>

The **Developer Experience Working Group** holds weekly sessions. 
- The schedule alternates between morning and evening slots to accommodate global time zones.
- Use the **[Working Group Calendar](./working-group/readme.md)** or check the `#developer-experience` channel in Discord for the specific time and link for this week's meeting.

</details>

<details>
<summary>Where can I ask questions and get help?</summary>

- **Discord**: Join the `#developer-experience` channel in the [Intersect Discord](https://discord.gg/intersect).
- **Stack Exchange**: For technical Q&A: [cardano.stackexchange.com](https://cardano.stackexchange.com).
- **Cardano Forum**: For discussions: [forum.cardano.org](https://forum.cardano.org).

</details>

---

## Roles, Skills & Funding

<details>
<summary>Do I need to know Haskell to contribute?</summary>

**No!** While the core Cardano node is written in Haskell, the ecosystem is vast:
- **TypeScript/JavaScript**: Build with MeshJS, Lucid, or contrib to web tools.
- **Rust**: Used heavily in key libraries (Pallas, Aiken).
- **Go, Python, Java**: Have their own SDKs and wrapper libraries.
- **Non-Code**: We need help with **Documentation**, **Design**, **Governance**, and **Translation**.

</details>

<details>
<summary>Is there funding or payment for contributors?</summary>

Yes, there are several avenues:
- **Paid Open Source Model (POSM)**: A specific framework where Intersect pays maintenance teams to ensure core repositories are maintained and improved. [Read more about POSM](https://www.intersectmbo.org/news/the-paid-open-source-model).
- **Grants**: Intersect and the Cardano Foundation offer grants for specific work.
- **Project Catalyst**: A community voting mechanism where you can propose projects for funding.
- **Bounties**: Occasionally posted for resolving specific issues.
- **Membership**: Being an Intersect member helps you network with teams effectively hiring or looking for partners.

</details>

<details>
<summary>What is a Contributor vs Maintainer?</summary>

- **Contributor**: Anyone who submits code, documentation, or feedback. Open a PR and you are a contributor!
- **Maintainer**: Members with responsibility for the direction/quality of a repo. They review PRs and manage releases.

</details>

---

## Technical Essentials

<details>
<summary>Which Testnet should I use? (Preview vs Preprod)</summary>

- **Preview**: "Fast" testing. Resets occasionally. Good for testing new features quickly.
- **Preprod**: "Slower" testing. Resembles Mainnet parameters. Good for long-term integration testing.
- **SanchoNet**: specifically for testing **Governance** features (CIP-1694).
- **Mainnet**: Production. Real money.

</details>

<details>
<summary>What is a CIP?</summary>

**Cardano Improvement Proposal**. It is a design document providing information to the community, or describing a new feature or process. It is how standards are agreed upon.

</details>

<details>
<summary>How do I set up my development environment?</summary>

- **New Developers**: Check our **[Beginner Guides](./how-to-guide/beginner/)**.
- **Specific Tools**: See the **[Tools section](./resources/tools.md)**.

</details>

---

## Governance & Organization

<details>
<summary>How are decisions made?</summary>

Decisions are made through **Working Groups**, **Committees** (like the Technical Steering Committee), and **Member Voting** on-chain or off-chain depending on the topic.

</details>

<details>
<summary>How do funding, proposals, and repositories relate?</summary>

- **Intersect**: Coordinates governance and development.
- **Funding**: Distributed via grants or Catalyst.
- **Repositories**: Codebases often managed by Intersect or Community, serving as shared infrastructure.

</details>

---

## Still have questions?
If you didn't find your answer here, please ask in the **[Discord Community](https://discord.com/invite/intersect)** or open an issue in this repository.
