# Language-Inclusive Onboarding Guide: Cardano Developer Ecosystem

**Milestone:** #76, D&I Onboarding Guide (Q2 2026)
**Goal:** Implement diversity and inclusion programs: *draft an onboarding guide tailored for underrepresented groups*
**Underrepresented group addressed:** Non-English-first developers in the Cardano ecosystem
**Author:** Dan Baruka, Developer Advocate, Developer Experience Working Group
**Status:** Draft for review

## Executive summary

A significant share of capable developers never complete their first contribution to Cardano, not for lack of technical ability, but because the standard onboarding path is in English and silently assumes English-language fluency at every step: docs, tooling output, issue threads, community channels, and live sessions. Non-English-first developers routinely report that the *first* friction they hit is linguistic, not technical.

This guide proposes a **language-inclusive onboarding framework** that the Developer Experience Working Group (DevEx WG) can adopt across its documentation, sessions, and advocacy program. It does not replace the general getting-started guide; it removes the implicit fluency requirement, lowers the cost of asking the first question, and treats non-English contributions (translation, glossaries, localized guides) as first-class work.

The framework is language-agnostic. The Francophone outreach the program already runs (notably West/Central Africa) is used as a worked example, but the same pattern applies to Spanish, Portuguese, Arabic, Mandarin, Hindi, Swahili, and any other language where Cardano onboarding material is thin.

> **Note on scope:** the milestone calls for an onboarding guide for an "underrepresented group". Several dimensions of underrepresentation exist (gender, geography, background, career stage, accessibility). This deliverable focuses exclusively on **Non-English-first developers**, because language is a universal first-step barrier and the program already has active outreach to learn from. Other dimensions should be addressed in separate, focused guides rather than diluted into a single document.

## Evidence base

This guide consolidates findings the program has already produced and the standards the repo already enforces:

| Source | What it provides | Location |
|--------|------------------|----------|
| Intersect Developer Experience Survey 2025 | Self-reported language needs, regional distribution of respondents | [`../Q42025/intersect-developer-experience-survey-2025.md`](../Q42025/intersect-developer-experience-survey-2025.md) |
| Shared DevEx Report to the OSC (Q4-2025) | "Current DevEx Status": onboarding rated High priority / Needs Improvement | [`../../DevEx-WG-Overview/Q1-2025.md`](../../DevEx-WG-Overview/Q1-2025.md) |
| DevEx pain points report (Q2 2026) | Fragmented onboarding affects all newcomers, including Non-English-first developers | [`developer-experience-pain-points-and-solutions.md`](developer-experience-pain-points-and-solutions.md) |
| DevEx getting-started guide | Current canonical onboarding entry point | [`../../../website/docs/getting-started.md`](../../../website/docs/getting-started.md) |
| Contribution & conduct standards | Required reading for any contributor path proposed here | [`CONTRIBUTING.md`](../../../CONTRIBUTING.md) · [`CODE-OF-CONDUCT.md`](../../../CODE-OF-CONDUCT.md) |

## Where the language barrier actually bites

The "language barrier" is not a single problem. It shows up as four distinct frictions, each with a different remedy.

| Friction | What it looks like | Why it blocks contribution |
|----------|--------------------|----------------------------|
| **Reading technical English** | Newcomer can follow code samples but struggles with prose-heavy docs and long issue threads. | Slows progress; usually surmountable with translation tools. |
| **Writing public English** | Newcomer can read a doc but is reluctant to open an issue or PR description in English. | Highest-impact blocker: it stops the *first* visible contribution. |
| **Technical jargon and ecosystem-specific terms** | Generic translators mishandle terms like *epoch*, *UTxO*, *delegation*, *native asset*. | Even strong English readers misread or mistranslate Cardano-specific content. |
| **Live spoken English** | Working-group calls and recorded sessions run in English, often without transcripts or captions. | Excludes contributors who read English comfortably but cannot follow spoken English in real time. |

Each section of the framework below targets one of these frictions.

## Language-inclusive onboarding framework

### 1. Reading: make the existing docs usable in any language

**Principle:** A Non-English-first developer should be able to read every canonical onboarding page in their language with one click and have confidence the translation is correct on the technical terms.

**For the newcomer:**
- Use browser translation for prose; cross-check code samples against the original page (code is the source of truth).
- When a translation looks wrong, that is itself a documentation bug; open an issue.

**For the program:**
- Publish a short, maintained glossary of Cardano terms in the DevEx repo, with entries in the languages the program actively supports. This single artifact disproportionately improves the quality of every machine-translated page.
- Mark pages that are translation-safe (no ambiguous idioms, no untranslated jargon) so contributors translating them know they will not need to rewrite English first.

### 2. Writing: lower the cost of the first public message

**Principle:** Imperfect English is welcome, normal, and explicitly accommodated. The community absorbs it without issue.

**For the newcomer:**
- Draft issues and PR descriptions in your first language, then translate. State plainly that English is not your first language. This is well-received and routine.
- Keep PR descriptions short and structured (what / why / how tested); short English is easier to write correctly than long English.
- Treat translation, terminology fixes, and clarifying documentation as first-class contributions; they are explicitly welcomed in [`CONTRIBUTING.md`](../../../CONTRIBUTING.md).

**For the program:**
- Provide ready-to-use issue and PR templates with neutral, simple English phrasing.
- Maintain a public norm that reviewers will not nitpick grammar on PRs flagged as written by a Non-English-first contributor. Feedback on language goes in a separate, optional thread.

### 3. Jargon: handle Cardano-specific terms explicitly

**Principle:** Ecosystem-specific vocabulary is the part machine translation gets wrong most often. Owning it locally is cheap.

**For the newcomer:**
- When reading a translated page, treat protocol terms (epoch, slot, UTxO, native asset, delegation, governance action) as English keywords. Do not rely on a translator's guess.
- If you cannot find a glossary entry for a term, open an issue requesting one. This *is* a contribution.

**For the program:**
- Curate a single canonical glossary of ~50-100 core terms with short, plain-language explanations, then translate that glossary first (rather than translating every page).
- Link the glossary from `getting-started.md` and from every page that uses domain terms heavily.

### 4. Spoken English: make live sessions usable asynchronously

**Principle:** Sessions are an onboarding asset only if they are usable by contributors who cannot follow spoken English in real time.

**For the newcomer:**
- Prefer the recording over the live call: pause, rewind, run through a translator. Live attendance is optional.
- Ask questions on [GitHub Discussions](https://github.com/IntersectMBO/developer-experience/discussions) or in the DevEx Discord channel afterward, in writing.

**For the program:**
- Continue publishing session recordings; add at least auto-generated captions and, where possible, a short written summary of each session in the DevEx site.
- Encourage Developer Advocates fluent in additional languages to host periodic sessions in those languages and publish recordings with transcripts.

## Standard contribution path (unchanged by language)

Once the language friction is removed, the technical path is the same as for any contributor. Newcomers should pick **one** and ship a small contribution before sampling the others.

| Path | Best for | Starting point |
|------|----------|----------------|
| **A: Smart contracts** | Developers comfortable with typed/functional languages | Aiken on testnet: [aiken-lang.org](https://aiken-lang.org) |
| **B: dApp / front-end** | JavaScript/TypeScript developers | Mesh, Lucid/Evolution, or Blaze SDKs |
| **C: Documentation / translation** | Anyone: the most direct on-ramp for Non-English-first contributors | Issues labeled `documentation`, `translation`, or `good first issue` |
| **D: Infrastructure / tooling** | Experienced systems engineers | Ecosystem repos under [github.com/IntersectMBO](https://github.com/IntersectMBO) |

Canonical reference for all four: the [Cardano Developer Portal](https://developers.cardano.org). Standard flow: fork → clone → branch → commit → push → pull request, with scope discussed in an issue first. See [`CONTRIBUTING.md`](../../../CONTRIBUTING.md) and the [Code of Conduct](../../../CODE-OF-CONDUCT.md).

## Onboarding checklist

- [ ] Read the DevEx [getting-started guide](../../../website/docs/getting-started.md) using your preferred translation tool; bookmark the original page.
- [ ] Install Git, a recent Node.js (LTS), and an editor; confirm you can run a fork → PR cycle on a throwaway repo.
- [ ] Pick **one** technical path (A / B / C / D) and one first step inside it.
- [ ] Join the DevEx WG Discord channel and introduce yourself in your preferred language. Note that English is not your first language if helpful.
- [ ] Find or open an issue, agree on scope in the issue thread, then submit a small first PR.
- [ ] Book a 1:1 with a Developer Advocate, ideally one who speaks your language, if you are blocked for more than a day.

## Community and mentorship

| Channel | Purpose | Link |
|---------|---------|------|
| DevEx WG Discord | Day-to-day help, async questions | [Dev-Ex WG channel](https://discord.com/channels/1136727663583698984/1250047836339306526) |
| GitHub Discussions | Long-form questions, decisions | [developer-experience discussions](https://github.com/IntersectMBO/developer-experience/discussions) |
| Sessions calendar | Live working-group sessions (recorded) | [Intersect events calendar](https://calendar.google.com/calendar/u/1?cid=Y19iMGMyODE3NWE2NTBkOGUwNzIwNTM2ZGU4OWE0NDMxMjFiYTcxYTVkMDgxYmRiOWU1NGRiZTU2NjI1NGY5ZGUwQGdyb3VwLmNhbGVuZGFyLmdvb2dnZS5jb20) |
| Cardano Forum | Ecosystem-wide discussion | [forum.cardano.org](https://forum.cardano.org) |
| Cardano Stack Exchange | Technical Q&A | [cardano.stackexchange.com](https://cardano.stackexchange.com) |

Developer Advocates are the program's primary mentorship channel. The advocates roster, working languages, and booking links are published on the DevEx site so this document remains independent of personnel changes. Intersect membership (~USD 10 / year) unlocks Discord and governance participation but is **not** required to contribute code or documentation: [members.intersectmbo.org/registration](https://members.intersectmbo.org/registration) · [membership guide](../../../website/docs/intersect-membership-guide.md).

## Implementation roadmap

| Date | Deliverable | Owner |
|------|-------------|-------|
| TBD | Publish this guide on the DevEx site; cross-link from `getting-started.md` and `CONTRIBUTING.md`. | DevEx WG |
| TBD | Ship a first-pass Cardano glossary (~50 terms) in English; structure it for translation. | DevEx WG + advocates |
| TBD | Translate the glossary into the first non-English language with active outreach (French as the pilot). | Volunteer translators |
| TBD | Establish a public advocates list showing working languages and time zones. | Developer Advocate team |
| TBD | Pilot a localized session in at least one non-English language; publish recording, captions, and short written summary. | Volunteer advocates |
| TBD | Add captions or written summaries to all DevEx WG session recordings. | Session hosts |

## Success indicators

The guide should be evaluated, not assumed effective. Suggested indicators, all measurable from existing signals:

- Time from first contact to merged first PR for Non-English-first contributors.
- Share of first-time contributors who report (in the annual survey) that language friction was a blocker.
- Number of translation, glossary, or documentation-clarification contributions merged per quarter.
- Retention: share of first-time Non-English-first contributors who submit a second PR within 90 days.

A baseline should be captured before the guide is promoted, so changes are attributable.

## Relationship to other D&I work

This guide complements, not replaces, other inclusion efforts in the ecosystem:

- **Women-in-tech onboarding** addresses gender-specific barriers in a separate focused guide.
- **Regional D&I outreach** (e.g. Cardano Africa Tech Summit fireside sessions) addresses geography and emerging-market context.
- **Localized educational resources** (e.g. French-language workshops and translated articles) put this framework into practice.

## Localization of this guide

This document is published in English as the working language of the DevEx WG and OSC review. Localized versions should be produced as separate pages in the same repo under `website/docs/i18n/`, kept in sync via a lightweight diff process rather than maintained as forks. French is the natural pilot translation given existing Francophone outreach; Spanish and Portuguese are reasonable next candidates. Translation contributions are explicitly welcomed.

*Deliverable: Milestone #76, D&I onboarding guide for Non-English-first developers in the Cardano ecosystem. Draft, Q2 2026.*
