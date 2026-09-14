<div align="center">

# Humanise Text — AI Writing De-Slopper

**Strip every detectable sign of AI from your writing.**

<br />

[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
&nbsp;
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=for-the-badge)](https://github.com/199-biotechnologies/humanise-text-skill/pulls)

---

AI-generated text has tells. "Leverage", "delve", "it's important to note", ascending tricolons, uniform sentence length, synonym cycling. Readers spot it. Editors reject it. Detection tools flag it. This skill finds every AI pattern in your text and rewrites it so it reads like a person wrote it — with the same meaning, in a fraction of the time manual editing takes.

[How It Works](#how-it-works) | [Before vs After](#before-vs-after) | [Features](#features) | [What's Inside](#whats-inside) | [Contributing](#contributing)

</div>

## The Problem

AI writing has a fingerprint. Not one tell — dozens. "Delve" appears 28x more in AI text than human text. "Showcase" is 10.7x over-represented. Negative parallelism ("It's not just X, it's Y") barely exists in human prose but saturates AI output. The sentence length barely varies — every sentence lands at 15-20 words like a metronome.

Manual de-slopping is slow and inconsistent. You catch "leverage" but miss the tricolon. You vary sentence length but leave "Furthermore" at the start of every third paragraph. The patterns are too numerous and too subtle for spot-checking.

## Before vs After

From the included blog example (Oaxaca travel piece):

| | Before (AI) | After (Human) |
|---|---|---|
| **Opening** | "In the tapestry of Mexican culture, few regions boast the breathtaking diversity..." | "I spent eleven days in Oaxaca City last March and I've been annoyed at restaurants ever since." |
| **Detail level** | "a rich array of traditional flavours" | "32 ingredients. She roasts the chillies over charcoal until they blacken but don't burn." |
| **Voice** | "This remarkable state serves as a vibrant testament to centuries of indigenous tradition" | "I bought a piece of black pottery for 300 pesos — about 15 dollars — and I'm still not sure she charged me enough." |
| **Sentence rhythm** | SD ~2-3 words (monotone) | SD >6 words (varied) |
| **Banned words** | 14 red-flag words | 0 |
| **Conclusion** | "Whether you're drawn to its culinary traditions, its artistic heritage, or its natural wonders..." | "Go in March." |

## How It Works

The skill runs a direct rewrite workflow:

1. **Read** the three reference files: banned patterns, structural tells, and rewrite principles.
2. **Flag** every AI tell in the input: red-flag words, formulaic phrases, structural patterns, rhythm issues, and tone problems.
3. **Rewrite** the text, addressing every flag while preserving meaning exactly.
4. **Self-critique** the output cold, looking for any remaining machine residue.
5. **Polish** by reading aloud and fixing any monotone rhythm.
6. **Output** the humanised text with a brief change summary.

For texts over 2,000 words, split into logical sections, rewrite each section with continuity in mind, then check the seams.

## Features

| Feature | What It Does |
|---|---|
| **AI pattern detection** | Flags every red/yellow word, phrase, structural pattern, and rhythm issue |
| **507-entry banned word list** | Every AI-overused word catalogued with human alternatives and statistical excess ratios (e.g., "delve" = 28x, "showcase" = 10.7x) |
| **Structural pattern matching** | Catches negative parallelism, ascending tricolons, trailing -ing clauses, synonym cycling, uniform paragraph openings |
| **Rhythm guidance** | Targets sentence-length SD >6 (human range) vs SD ~2-3 (AI monotone) |
| **Blind self-critique** | After rewriting, read the output cold and flag remaining tells |
| **3 reference guides** | Banned patterns (507 entries), structural tells (with detection heuristics), and rewrite principles (with before/after examples) |
| **3 worked examples** | Academic, business, and blog/travel — full before/after with annotated changes |

## What's Inside

```
humanise-text/
├── SKILL.md                              # Skill definition (agents read this)
├── reference/
│   ├── banned_patterns.md                # 507 banned words/phrases with alternatives
│   ├── structural_tells.md               # Structural AI patterns with detection heuristics
│   └── rewrite_principles.md             # Positive writing guidance with examples
├── examples/
│   ├── academic_before_after.md          # Scientific writing transformation
│   ├── business_before_after.md          # Marketing copy transformation
│   └── blog_before_after.md             # Travel/cultural writing transformation
├── scripts/                              # Optional standalone Python detectors (pure stdlib)
├── README.md
├── LICENSE
└── CONTRIBUTING.md
```

## The Banned Patterns Catalogue

The reference directory contains 507 flagged words and phrases across these categories:

| Category | Examples | Severity |
|---|---|---|
| **Red-flag verbs** | delve, harness, leverage, showcase, underscore, illuminate | Zero tolerance |
| **Red-flag adjectives** | robust, comprehensive, cutting-edge, myriad, multifaceted | Zero tolerance |
| **Red-flag adverbs** | seamlessly, meticulously, notably, furthermore, moreover | Zero tolerance |
| **Red-flag phrases** | "it's important to note", "no discussion would be complete without", "in today's ever-evolving" | Zero tolerance |
| **Yellow-flag words** | optimize, framework, paradigm, nuance | Max 1 per document |
| **Structural tells** | Negative parallelism, ascending tricolons, trailing -ing clauses, synonym cycling | Must break pattern |

## Standalone Script Usage

The Python scripts in `scripts/` work independently of any agent:

```bash
# Detect AI patterns (outputs JSON)
python3 scripts/detect_ai_patterns.py your_text.txt --format json

# Validate humanised output against original
python3 scripts/validate_humanised.py original.txt rewritten.txt

# Compare before/after with metrics
python3 scripts/compare_texts.py original.txt rewritten.txt
```

No pip install needed. Pure Python 3 stdlib.

## Contributing

If you've spotted an AI pattern the detector misses, or found a banned word that should be on the list, PRs are welcome.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the process.

## License

[MIT](LICENSE)

---

<div align="center">

Built by [Boris Djordjevic](https://github.com/longevityboris) at [199 Biotechnologies](https://github.com/199-biotechnologies) | [Paperfoot AI](https://paperfoot.ai)

</div>
