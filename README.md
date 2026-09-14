# Intersect MBO Developer Experience

<p align="center">
  <a href="https://github.com/IntersectMBO/developer-experience/stargazers"><img src="https://img.shields.io/github/stars/IntersectMBO/developer-experience?style=flat-square&logo=github&label=Stars&color=24292f" alt="GitHub stars"></a>
  <a href="https://github.com/IntersectMBO/developer-experience/network/members"><img src="https://img.shields.io/github/forks/IntersectMBO/developer-experience?style=flat-square&logo=github&label=Forks&color=24292f" alt="GitHub forks"></a>
  <a href="https://github.com/IntersectMBO/developer-experience/issues"><img src="https://img.shields.io/github/issues/IntersectMBO/developer-experience?style=flat-square&logo=github&label=Issues&color=24292f" alt="Open issues"></a>
  <a href="https://github.com/IntersectMBO/developer-experience/graphs/contributors"><img src="https://img.shields.io/github/contributors/IntersectMBO/developer-experience?style=flat-square&logo=github&label=Contributors&color=24292f" alt="Contributors"></a>
</p>

<p align="center">
  <a href="https://devex.intersectmbo.org"><img src="https://img.shields.io/badge/Website-devex.intersectmbo.org-0033AD?style=flat-square&logo=cardano&logoColor=white" alt="Developer Experience website"></a>
  <a href="https://github.com/IntersectMBO/developer-experience/actions/workflows/deploy.yml"><img src="https://img.shields.io/github/actions/workflow/status/IntersectMBO/developer-experience/deploy.yml?branch=main&style=flat-square&label=Deploy&logo=githubactions&logoColor=white" alt="Deploy status"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-Apache%202.0-009688?style=flat-square&logo=apache&logoColor=white" alt="Apache 2.0 License"></a>
  <a href="website/package.json"><img src="https://img.shields.io/badge/Node.js-%3E%3D20-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js 20+"></a>
  <a href="website/package.json"><img src="https://img.shields.io/badge/Docusaurus-3.10-2ECC71?style=flat-square&logo=docusaurus&logoColor=white" alt="Docusaurus"></a>
</p>

Documentation, guides, and working-group resources for developers building on [Cardano](https://cardano.org/). This repository powers the [Developer Experience portal](https://devex.intersectmbo.org) and hosts session materials for the Intersect MBO Developer Experience Working Group.

## Overview

The **Developer Experience (DevEx) Working Group** is a community of Developer Advocates from [Intersect MBO](https://www.intersectmbo.org/) focused on making Cardano more accessible, efficient, and rewarding to build on.

We identify pain points in the ecosystem, improve tooling and documentation, and run collaborative workshops for developers at every level.

**Key focus areas:**

| Area | What we work on |
| --- | --- |
| Onboarding & documentation | Guides, tutorials, and structured learning paths |
| Tooling & workflows | Dev environments, SDKs, and developer tooling |
| Community & collaboration | Working-group sessions, feedback loops, knowledge sharing |
| Inclusive onboarding | Multi-language support and the Developer Thriving Framework |

**Live site:** [devex.intersectmbo.org](https://devex.intersectmbo.org)

## Developer Advocates

Connect with the current cohort for mentorship, session planning, or contribution guidance.

### Current Cohort

| Advocate | Links | Schedule a call |
| --- | --- | --- |
| **Uche** | [LinkedIn](https://www.linkedin.com/in/thisisobate) · Discord: `@obate` | [Book a call](https://calendar.app.google/6HC9yHfTHrQ1dfcB9) |
| **Emmanuel** | [LinkedIn](https://www.linkedin.com/in/emmanuel-shikuku-devops/) · [X](https://x.com/Emmanuel_tyty) · Discord: `@emmanueltyty` | [Book a call](https://calendar.app.google/3LGaFshgi7q9fsQD8) |
| **Dan** | [LinkedIn](https://www.linkedin.com/in/danbaruka/) · [X](https://x.com/danamphred) · Discord: `@danamphred` | [Book a call](https://calendar.app.google/T1BuH5EnRDyMTsyV8) |
| **Harun** | [LinkedIn](https://www.linkedin.com/in/harunslinked/) · Discord: `@wesh09` | [Book a call](https://calendly.com/harunm28/30min) |

### Past Cohort

| Advocate | Interview | LinkedIn | Discord |
| --- | --- | --- | --- |
| Alex | [Watch](https://www.youtube.com/watch?v=U-cGNG3rzPg) | [Profile](https://www.linkedin.com/in/alex-seregin/) | `alexeusgr` |
| Bernand | [Watch](https://www.youtube.com/watch?v=grbX5DAaW5Q) | [Profile](https://www.linkedin.com/in/bernard-sibanda-954563243/) | `wims5274` |
| Suganya | [Watch](https://www.youtube.com/watch?v=o8a6gTcE50w) | [Profile](https://www.linkedin.com/in/suganya-raju/) | `suganya1607` |
| Udai | [Watch](https://www.youtube.com/watch?v=UDXshRpVA6M) | [Profile](https://www.linkedin.com/in/solanki/) | `thecoder0001` |

## Quick Start

Get the documentation site running locally in under 5 minutes:

```bash
# 1. Clone the repository
git clone https://github.com/IntersectMBO/developer-experience.git
cd developer-experience/website

# 2. Install dependencies (Node.js 20+ required)
npm install

# 3. Start the development server with hot reload
npm run start:dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Edits to files under `website/docs/` reload automatically.

## Installation and Setup

### Prerequisites

| Requirement | Version |
| --- | --- |
| [Node.js](https://nodejs.org/) | 20 or higher |
| npm | Bundled with Node.js |
| Git | Any recent version |

### Step-by-step setup

See the [Contributing Guide](./CONTRIBUTING.md) for full setup, development, and submission instructions.

## Usage

### Edit documentation

Documentation lives in `website/docs/`. Create or edit Markdown (`.md`) or MDX (`.mdx`) files:

```markdown
---
sidebar_position: 2
---

# My New Guide

Brief introduction for developers.

## Prerequisites

- A Cardano wallet
- Node.js 20+

## Steps

1. Install the CLI tool.
2. Run your first command.
```

### Add a working-group session

Session materials follow a quarter-based layout under `website/docs/working-group/sessions/`:

```
website/docs/working-group/sessions/
└── q2-2026/
    └── 18-my-session/
        ├── _category_.json
        ├── session-notes/
        │   └── readme.md
        └── session-resources/
            └── readme.md
```

See existing sessions (for example `q4-2025/01-kickoff-orientation/`) for the established pattern.

## Project Structure

```
developer-experience/
├── website/                    # Docusaurus documentation site
│   ├── docs/                   # Documentation content (Markdown / MDX)
│   │   ├── getting-started.md  # Main onboarding guide
│   │   ├── how-to-guide/       # Beginner, intermediate, and advanced guides
│   │   ├── tutorials/          # Hands-on tutorials
│   │   ├── resources/          # Tools, repos, and community links
│   │   └── working-group/      # DevEx WG session materials
│   ├── src/                    # React components and custom theme
│   ├── static/                 # Static assets (images, CNAME)
│   └── docusaurus.config.ts    # Site configuration
├── DA Milestones/              # Developer Advocate milestone reports
├── scripts/                    # Utility scripts (e.g. changelog)
├── CONTRIBUTING.md             # Contribution guidelines
├── CODE-OF-CONDUCT.md          # Community standards
└── LICENSE                     # Apache 2.0
```

## Documentation

| Resource | Description |
| --- | --- |
| [Getting Started](website/docs/getting-started.md) | Onboarding paths for new Cardano developers |
| [How-To Guides](website/docs/how-to-guide/) | Step-by-step guides by skill level |
| [Working Group](website/docs/working-group/readme.md) | Session plans, notes, and recordings |
| [FAQ](website/docs/faq.md) | Answers to common questions |
| [Intersect Membership Guide](website/docs/intersect-membership-guide.md) | How to join Intersect and access Discord |

## Get Involved

- **Meetings** — Join weekly DevEx working-group sessions via the [Intersect Event calendar](https://calendar.google.com/calendar/u/1?cid=Y19iMGMyODE3NWE2NTBkOGUwNzIwNTM2ZGU4OWE0NDMxMjFiYTcxYTVkMDgxYmRiOWU1NGRiZTU2NjI1NGY5ZGUwQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20).
- **GitHub** — Report problems in [Issues](https://github.com/IntersectMBO/developer-experience/issues), propose fixes in [Pull Requests](https://github.com/IntersectMBO/developer-experience/pulls), and join [Discussions](https://github.com/IntersectMBO/developer-experience/discussions).
- **Intersect membership** — [Become a member](https://members.intersectmbo.org/registration) to participate in governance and access the Discord community.
- **Discord** — DevEx WG channel: [#developer-experience](https://discord.com/channels/1136727663583698984/1250047836339306526).

## Contributing

We welcome contributions from all skill levels. Before you start:

1. Read [CONTRIBUTING.md](./CONTRIBUTING.md) for the full workflow.
2. Review the [Code of Conduct](./CODE-OF-CONDUCT.md).
3. Check [existing issues](https://github.com/IntersectMBO/developer-experience/issues) before opening a new one.
4. Open an issue to discuss significant changes, then submit a pull request linked to that issue.

Typical contributions include documentation fixes, new guides, code examples, and working-group session materials.

## Contact

| Channel | Link |
| --- | --- |
| GitHub Discussions | [developer-experience/discussions](https://github.com/IntersectMBO/developer-experience/discussions) |
| Discord (OSC Working Groups) | [Join channel](https://discord.com/channels/1136727663583698984/1239886460266479696) |
| Email | [oso@intersectmbo.org](mailto:oso@intersectmbo.org) |

---

This working group is community-driven and supported by Intersect MBO. We welcome contributions from all skill levels and backgrounds.

**Disclaimer:** Content reflects community efforts and may evolve as the Cardano ecosystem grows. Report outdated information via [GitHub Issues](https://github.com/IntersectMBO/developer-experience/issues).

## License

This project is licensed under the [Apache License 2.0](LICENSE).
