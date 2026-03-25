<div align="center">

# Developer Experience Working Group

**Making Cardano development more accessible, efficient, and rewarding**

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Cardano](https://img.shields.io/badge/Cardano-Ecosystem-0033AD?logo=cardano)](https://cardano.org)
[![Intersect MBO](https://img.shields.io/badge/Intersect-MBO-00B4D8)](https://www.intersectmbo.org/)
[![Documentation](https://img.shields.io/badge/docs-Docusaurus-2E7D32)](https://devex.intersectmbo.org/)

**[Website](https://devex.intersectmbo.org/)** · **[Report an issue](https://github.com/IntersectMBO/developer-experience/issues)** · **[Discussions](https://github.com/IntersectMBO/developer-experience/discussions)**

</div>

---

## Project overview

The **Developer Experience (DevEx) Working Group** is a community of Developer Advocates from **Intersect MBO** focused on improving how developers build on Cardano. We identify pain points, improve tooling and documentation, and foster collaboration across the ecosystem so that onboarding and day-to-day development are clearer and faster.

| Aspect | Description |
|--------|-------------|
| **Mission** | Enhance developer experience in the Cardano ecosystem so more people can build successfully. |
| **Scope** | Documentation, tooling, workflows, onboarding, and the human side of developer experience. |
| **Output** | This repo: docs, guides, working group materials, and a [Docusaurus documentation site](https://devex.intersectmbo.org/). |

> **Who is this for?** Developers (new or experienced), project maintainers, and anyone who wants to contribute to or improve Cardano’s developer experience.

---

## What we do

- **Identify and prioritize** developer experience issues in the Cardano ecosystem.
- **Propose and implement** improvements to tooling, documentation, and workflows.
- **Foster collaboration** between developers, projects, and stakeholders.
- **Support multi-language** integration and learning paths.
- **Develop a Developer Thriving Framework** to address social barriers and engagement.
- **Focus on the human side** of developer experience, not only docs and tech.
- **Run collaborative workshops** to gather perspectives and build shared understanding.
- **Address pain points** that block newcomers and growth.
- **Build trust and reduce silos** across the developer community.

---

## Focus areas

| Area | Description |
|------|-------------|
| **Onboarding & documentation** | Clear getting-started guides and up-to-date references. |
| **Tooling & workflows** | Better dev tools and day-to-day workflows. |
| **Collaboration** | Working with other developers and projects in the ecosystem. |
| **Feedback** | Collecting and acting on developer feedback. |
| **Community & knowledge sharing** | Support channels and shared learning. |

---

## Get involved

| Channel | Link |
|---------|------|
| **Calendar** | [Intersect Event calendar](https://calendar.google.com/calendar/u/1?cid=Y19iMGMyODE3NWE2NTBkOGUwNzIwNTM2ZGU4OWE0NDMxMjFiYTcxYTVkMDgxYmRiOWU1NGRiZTU2NjI1NGY5ZGUwQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20) — weekly DevEx sessions. |
| **GitHub** | [Issues](https://github.com/IntersectMBO/developer-experience/issues) · [Pull requests](https://github.com/IntersectMBO/developer-experience/pulls) · [Discussions](https://github.com/IntersectMBO/developer-experience/discussions). |
| **Membership** | [Become an Intersect member](https://members.intersectmbo.org/registration). |
| **Discord** | [DevEx WG channel](https://discord.com/channels/1136727663583698984/1250047836339306526). |
| **Feedback** | Share ideas and pain points in Discord or via GitHub issues. |

---

## Developer advocates

Connect with current and past advocates for help, calls, or questions.

### Current cohort

| Advocate | LinkedIn | Schedule a call | X | Discord |
|----------|----------|-----------------|---|--------|
| **Uche** | [Profile](https://www.linkedin.com/in/thisisobate) | [Book](https://calendar.app.google/6HC9yHfTHrQ1dfcB9) | - | @obate. |
| **Emmanuel** | [Profile](https://www.linkedin.com/in/emmanuel-shikuku-devops/) | [Book](https://calendar.app.google/3LGaFshgi7q9fsQD8) | [@Emmanuel_tyty](https://x.com/Emmanuel_tyty) | @emmanueltyty |
| **Dan** | [Profile](https://www.linkedin.com/in/danbaruka/) | [Book](https://calendar.app.google/T1BuH5EnRDyMTsyV8) | [@danamphred](https://x.com/danamphred) | @danamphred |
| **Harun** | [Profile](https://www.linkedin.com/in/harunslinked/) | [Book](https://calendly.com/harunm28/30min) | - | @wesh09 |

### Past cohort

| Advocate | Interview | LinkedIn | Discord |
|----------|-----------|----------|---------|
| **Alex** | [Watch](https://www.youtube.com/watch?v=U-cGNG3rzPg) | [Profile](https://www.linkedin.com/in/alex-seregin/) | alexeusgr |
| **Bernand** | [Watch](https://www.youtube.com/watch?v=grbX5DAaW5Q) | [Profile](https://www.linkedin.com/in/bernard-sibanda-954563243/) | wims5274 |
| **Suganya** | [Watch](https://www.youtube.com/watch?v=o8a6gTcE50w) | [Profile](https://www.linkedin.com/in/suganya-raju/) | suganya1607 |
| **Udai** | [Watch](https://www.youtube.com/watch?v=UDXshRpVA6M) | [Profile](https://www.linkedin.com/in/solanki/) | thecoder0001 |

---

## Quick start

Get the documentation site running locally in a few minutes.

**Prerequisites:** [Node.js](https://nodejs.org/) (v18+ recommended), npm or yarn, Git.

```bash
# Clone the repository
git clone https://github.com/IntersectMBO/developer-experience.git
cd developer-experience/website

# Install dependencies
npm install

# Start the dev server (hot reload)
npm run start:dev
```

Then open **http://localhost:3000** in your browser. You should see the DevEx site; edits under `website/docs` will reload automatically.

| Goal | Command |
|------|--------|
| **Develop with live reload** | `npm run start:dev` |
| **Production build** | `npm run build` |
| **Serve production build** | `npm run serve` |

---

## Installation & setup

### Step 1: Clone and enter the website

```bash
git clone https://github.com/IntersectMBO/developer-experience.git
cd developer-experience/website
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Run the site

- **Development (recommended):** `npm run start:dev` - starts Docusaurus with hot reload.
- **Production-style:** `npm run build && npm run serve` - build and serve the static site.

### Step 4: Edit content

- **Docs:** `website/docs/` - add or edit Markdown/MDX files; structure follows the sidebar.
- **Config:** `website/docusaurus.config.ts` - site title, theme, nav, footer.
- **Homepage:** `website/src/pages/index.tsx` (and related components).

### Requirements

| Requirement | Notes |
|-------------|--------|
| **Node.js** | v18 or higher (LTS recommended). |
| **npm or yarn** | For installing dependencies. |
| **Git** | For cloning and contributing. |

---

## Project structure

```
developer-experience/
├── README.md                 # This file
├── CONTRIBUTING.md            # How to contribute (issues, PRs, style)
├── LICENSE                    # Apache-2.0
│
├── website/                   # Docusaurus documentation site
│   ├── docs/                  # All documentation (Markdown/MDX)
│   │   ├── resources/         # Repos, tools, community, pathway
│   │   ├── working-group/     # Working group sessions & materials
│   │   └── ...                # Guides, how-tos, getting started
│   ├── src/                   # Custom React components, CSS, pages
│   ├── static/                # Static assets
│   ├── docusaurus.config.ts   # Site configuration
│   └── package.json           # Scripts: start:dev, build, serve
│
└── .github/                   # PR/issue templates, workflows
```

---

## Contributing

We welcome contributions from all skill levels and backgrounds.

1. **Read** [CONTRIBUTING.md](./CONTRIBUTING.md) for full guidelines (setup, style, PR process).
2. **Check** [existing issues](https://github.com/IntersectMBO/developer-experience/issues) before opening new ones.
3. **Use** the issue and PR templates; provide clear descriptions.
4. **Be respectful and constructive** in discussions and reviews.

Quick contribution flow: fork → branch → edit (e.g. under `website/docs/`) → test locally (`npm run start:dev`) → open a PR.

---

## Contact

| Channel | Link |
|---------|------|
| **GitHub Discussions** | [Developer Experience WG](https://github.com/IntersectMBO/developer-experience/discussions) |
| **Discord** | [OSC Working Groups](https://discord.com/channels/1136727663583698984/1239886460266479696) |
| **Email** | [Open Source Office](mailto:oso@intersectmbo.org) |

---

<div align="center">

**This working group is community-driven and supported by Intersect MBO.**

*We welcome contributions from all skill levels and backgrounds.*

</div>
