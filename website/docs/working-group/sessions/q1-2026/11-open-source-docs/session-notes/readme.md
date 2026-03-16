---
title: "Open Source Documentation"
sidebar_label: Session Notes
sidebar_position: 1
---

# Open Source Documentation

This session focuses on contributing to and improving open source documentation in the Cardano ecosystem. Documentation is often the defining factor in an open source project's success or failure, acting as the bridge between the codebase and its users.

## 1. Why Documentation Matters: The Heartbeat of Open Source

Before looking at how to document, it is crucial to understand *why* documentation is the lifeblood of any open source project.

- **Frictionless Onboarding:** The biggest barrier to open source contribution is understanding the codebase. Excellent documentation dramatically lowers the barrier to entry, transforming curious developers into active contributors.
- **Breaking Down Knowledge Silos:** If only the creator understands how a system works, the project is fragile (a low "bus factor"). Documentation decentralizes knowledge, protecting the project's longevity.
- **The Ultimate Trust Signal:** Users and enterprises judge the maturity, stability, and reliability of an open source project first by its docs. A poorly documented but brilliantly coded project will almost always lose to a well-documented, average-coded one.
- **Enabling Asynchronous Collaboration:** Open source spans global time zones. Comprehensive documentation ensures developers aren't blocked waiting 12 hours for a maintainer to wake up and answer a basic question.

### The Cost of Poor Documentation
Conversely, failing to provide clear, actionable documentation carries severe penalties:
- **Developer Abandonment:** If a developer cannot set up your project locally within 15 minutes, they will likely abandon it for a competitor's framework. 
- **The Support Burden:** Unclear documentation guarantees that your issue tracker and Discord channels will be flooded with the exact same setup and configuration questions repeatedly, burning out maintainers.
- **Security by Obscurity (Fails):** "Self-documenting code" is a myth when it comes to system architecture. Without high-level design docs, contributors will unknowingly introduce critical bugs because they lack the zoomed-out context of how different modules interact.

## 2. Documentation Driven Development (DDD)

With the 'why' established, treating documentation as a secondary task is no longer viable. In a **docs-as-code** philosophy, documentation is treated with the same rigor as source code. 

- **Start with the docs:** Writing the README, a design doc, or an API specification before writing code clarifies intent, defines API surfaces early, and prevents wasted engineering effort on misunderstood requirements.
- **Maintain alongside code:** CI pipelines should fail if code changes are not accompanied by the relevant doc updates. Code reviews must include documentation reviews.

## 3. The ROI and Trade-offs of Quality Documentation

While the benefits heavily outweigh the costs, maintaining high-quality documentation is an active investment with real trade-offs.

### The Advantages
- **Security & Auditing:** This is perhaps the most critical advantage in Web3 and the Cardano ecosystem. Auditors cannot effectively verify if a smart contract securely does what it's supposed to do if there is no documentation defining *what* it is supposed to do. Good specs (like CIPs or formal proofs) drastically reduce audit times and costs.
- **Scalability of the Team:** With comprehensive documentation, a project can absorb 100 new contributors at once without overwhelming the core maintainers with basic setup questions.
- **Historical Context (The "Why"):** Code tells you *how* a system works today; documentation (specifically Architecture Decision Records) tells you *why* it was built that way, preventing future developers from repeating old mistakes.
- **Automated Validation:** When using "Executable Documentation" (tests mapped to requirements), your CI/CD pipeline continuously proves that the documentation reflects reality.

### The "Disadvantages" (Trade-offs)
- **Maintenance Burden (Documentation Drift):** The worst documentation is *wrong* documentation. Keeping fast-moving code and documentation perfectly synchronized requires significant discipline and often slows down rapid prototyping phases.
- **High Initial Overhead:** Writing great design docs or mathematical proofs in Typst/LaTeX requires a massive upfront time investment before a single line of application code is written.
- **The "Wall of Text" Problem:** Over-documenting everything can lead to unreadable, bloated repositories where contributors cannot find the information they actually need. Documentation requires aggressive, thoughtful editing.

## 4. Types of Documentation

A healthy project maintains several layers of documentation:

### The README
The front door of your project. It must answer: *What is this? How do I install it? How do I use it?* 
- **Essentials:** Badges (build status, version), concise description, quickstart guide, prerequisites, and license.

### Design Docs & Architecture
Explaining the *why* behind technical decisions, especially for protocol-level changes or major architectural shifts.
- **Examples:** Cardano Improvement Proposals (CIPs), Architecture Decision Records (ADRs).

### Executable Documentation
The best documentation is guaranteed to be correct because it is executed.
- **Unit and Integration Tests:** Show exactly how a component is expected to behave. Test files often serve as the most up-to-date documentation for developers.

### Milestones & Project Management
Transparent tracking of progress helps contributors know where the project is heading.
- **Tools:** GitHub/GitLab milestones, issue trackers, and public roadmaps.

### Contributor Guidelines
A `CONTRIBUTING.md` file explains how others can help, code style conventions, and the pull request process.

## 5. Documentation Formats & Tooling

Different types of documentation require different tools. The format you choose dictates how accessible your documentation is to contributors and how well it integrates with your CI/CD pipelines.

### Markdown (`.md`)
**Why it matters:** Markdown is the ubiquitous standard for open source. It is lightweight, readable as plain text, and easily version-controlled alongside code.
**How it's used:**
- **Primary Use Case:** READMEs, `CONTRIBUTING.md`, changelogs, and general repo documentation.
- **Tooling:** It is supported natively by GitHub, GitLab, and Bitbucket. For larger projects, Markdown files are compiled into searchable, stylized websites using Static Site Generators (SSGs) like **Docusaurus** (which powers the developer portal you are reading right now!), Sphinx, or MkDocs.

### LaTeX (`.tex`)
**Why it matters:** LaTeX is the legacy, heavyweight standard for academic publishing and rigorous mathematical documentation. It provides absolute, pixel-perfect control over complex typesetting, formulas, citations, and programmatically drawn diagrams (e.g., via TikZ).
**How it's used:**
- **Primary Use Case:** Formal research papers, cryptographic proofs, and foundational protocol whitepapers (e.g., the original Ouroboros papers).
- **Tooling:** Written in `.tex` files and compiled into PDFs. Its steep learning curve means it is generally reserved for highly specialized research teams rather than general open source contributors.

### Typst (`.typ`)
**Why it matters:** Typst is a modern, lightning-fast alternative to LaTeX. It features a much cleaner syntax and compiles almost instantly, solving the slow iteration times and complex syntax issues of LaTeX while maintaining robust support for math, multi-page data tables, and integrated diagramming.
**How it's used:**
- **Primary Use Case:** Modern whitepapers, technical architecture deep-dives, and math-heavy documentation where authors want professional PDF output without the overhead of learning LaTeX.
- **Tooling:** Increasingly popular in ecosystems like Cardano and Rust for creating polished technical PDFs straight from a fast, understandable markup language.

### AsciiDoc (`.adoc`)
*(Pronounced: "ASK-ee-dock", derived from ASCII text)*
**Why it matters:** If Markdown is a bicycle, AsciiDoc is a tank. AsciiDoc is a highly structured, standardized text format explicitly designed for complex, book-length technical documentation and enterprise publishing. It natively handles advanced elements (like complex tables, footnotes, includes, and warning blocks) that Markdown struggles with.
**How it's used:**
- **Primary Use Case:** Enterprise-grade documentation, O'Reilly books, and massive open source projects that outgrow Markdown's simplicity.
- **Tooling:** Processed using Asciidoctor and often paired with Antora for managing multi-repository documentation sites.

### Mermaid (`.mmd` / Inline)
**Why it matters:** System architecture and protocol flows are often impossible to explain with text alone, but saving diagrams as static `.png` files means they become instantly outdated when code changes. Mermaid allows you to write diagrams as text.
**How it's used:**
- **Primary Use Case:** Rendering sequence diagrams, state charts, and system architecture mapping directly inside Markdown files.
- **Tooling:** Supported natively by GitHub and Docusaurus. You write text blocks, and the browser dynamically renders them into visual diagrams.

## 6. Modern Tooling: AI & API Specs

Documentation has evolved rapidly. Today, treating docs as code means utilizing modern integrations:

### API Documentation (OpenAPI / Swagger)
For developers building backend services, indexers, or dApp infrastructure, **OpenAPI schemas** are the absolute gold standard.
- Rather than manually typing out REST definitions in a README, developers write an OpenAPI YAML/JSON schema.
- Tools like Swagger UI or Redoc then automatically generate interactive, verifiable documentation sites where users can test endpoints directly from their browser.

### AI Assistants in Documentation
In 2026, writing the *initial draft* of documentation is increasingly automated.
- **Generation:** CI/CD pipelines can run LLM-driven reviewers that automatically flag missing docstrings or generate draft PR descriptions based on code diffs.
- **Translation to Markdown:** Tools like GitHub Copilot can instantly translate complex inline comment blocks into formatted Markdown ready for Docusaurus. The developer's role is shifting from *author* to *editor*.

## 7. Global Open Source: Localization (i18n)

The Cardano community is fiercely global, with massive developer adoption occurring across Africa, India, and Latin America. English-only documentation inherently limits adoption.

- **Internationalization (i18n):** *(Pronounced "eye-eighteen-enn")* This is a standard software numeronym where "18" represents the number of letters between the first 'i' and the last 'n' in the word "internationalization". Documentation must be built with translation in mind from Day 1.
- **Tooling Support:** Modern Static Site Generators like Docusaurus have built-in i18n support. They allow maintainers to host the exact same documentation structure across multiple language sub-domains (e.g., `es.docs.cardano.org`), enabling global community members to submit PRs translating individual Markdown files.

## 8. Community Insights & Takeaways

During the **Q1 2026 Developer Experience Working Group** session, participants shared several critical real-world insights that go beyond standard tooling guides:

### Human-in-the-loop AI
- **Bernard Sibanda's Perspective:** AI documentation can often be generic and "abstract." To avoid unhelpful output, maintainers should write 90% of the core documentation manually to ensure the context is correct, then use AI primarily for formatting, grammar correction, and English translation.
- **Dan Baruka's Tip:** Modern documentation should be built to be "AI-readable" (using tools like API Dog or proper RSS/Markdown structures) to ensure that when developers use LLMs for support, the AI can actually find and interpret the correct, up-to-date data.

### The "Version Drift" Challenge
- **Israel Chizungu's Experience:** A major blocker for new developers is "outdated documentation" where the version in the docs doesn't match the required library versions. documentation must include clear, high-visibility version indicators to prevent developers from going down rabbit holes with deprecated code.

### The "Middle Layer" Gap
- **Robertino Martinez's Insight:** There is a significant gap between high-level user guides and low-level generated API docs (like Haddock for Plutus/Haskell). While low-level docs are great for existing contributors, they are "unfriendly" to newcomers. We need a "middle layer" of conceptual documentation that explains *why* and *how* different modules (like addresses or credentials) interact before dumping developers into the raw API.

### The Case for Centralization
- **The Scrappy vs. Scale Problem:** Documentation is currently scattered across various organizations (CF, IOG, Intersect). The community consensus is a strong desire for a **centralized entry point** (like `cardano.org` or `developers.cardano.org`) that acts as the "front door" to the entire ecosystem's documentation.

---

For a curated list of best-in-class repositories and deep-dive learning resources for Markdown, AsciiDoc, LaTeX, and Typst, see our [Full Resources List](../session-resources/readme.md).

---

*This session is part of the Q1 2026 Developer Experience Working Group: "Laying the Foundations"*