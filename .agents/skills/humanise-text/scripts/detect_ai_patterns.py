#!/usr/bin/env python3
"""
detect_ai_patterns.py -- Exhaustive AI-writing pattern detector.

Scans text for every known tell of AI-generated prose and produces a
structured JSON (or Markdown) report.  Zero external dependencies beyond
the Python 3.10+ standard library.

Usage:
    echo "text" | python detect_ai_patterns.py
    python detect_ai_patterns.py input.txt
    python detect_ai_patterns.py input.txt --format markdown --verbose
    python detect_ai_patterns.py input.txt -f json | jq .ai_density_score

Sources:
    - AI-Writing-Detection-Reference.md  (Kobak, Antislop, GPTZero, etc.)
    - natural-prose-reference.md         (Strunk/White, Zinsser, Provost)
"""

from __future__ import annotations

import argparse
import json
import re
import statistics
import sys
from collections import Counter
from typing import Any

# ===================================================================
#  SECTION 1:  MASTER FLAGGED-WORD LISTS
# ===================================================================
# Severity:
#   "red"    = instant AI tell (delve, tapestry, multifaceted ...)
#   "yellow" = flagged at high frequency (crucial, significant ...)
#
# The lists below reproduce the COMPLETE catalogue from
# AI-Writing-Detection-Reference.md sections 1A-1D plus the
# natural-prose-reference.md blacklist (section 9).
# ===================================================================

_RED_VERBS: list[str] = [
    "delve", "delved", "delves", "delving",
    "underscore", "underscores", "underscored", "underscoring",
    "harness", "harnessed", "harnessing",
    "illuminate", "illuminated", "illuminating",
    "facilitate", "facilitated", "facilitating",
    "bolster", "bolstered", "bolstering",
    "foster", "fostered", "fostering",
    "resonate", "resonated", "resonating",
    "transcend", "transcended", "transcending",
    "embark", "embarked", "embarking",
    "embrace", "embraced", "embracing",
    "elevate", "elevated", "elevating",
    "enlighten", "enlightened", "enlightening",
    "grapple", "grappled", "grappling",
    "innovate", "innovated", "innovating",
    "intertwine", "intertwined", "intertwining",
    "reimagine", "reimagined", "reimagining",
    "revolutionize", "revolutionized", "revolutionizing",
    "showcase", "showcased", "showcasing",
    "unleash", "unleashed", "unleashing",
    "captivate", "captivated", "captivating",
    "endeavour", "endeavoured", "endeavor", "endeavored",
    "catalyze", "catalyzed", "catalyzing",
    "spearhead", "spearheaded", "spearheading",
    "exemplify", "exemplified", "exemplifying",
    "epitomize", "epitomized", "epitomizing",
    "encapsulate", "encapsulated", "encapsulating",
    "galvanize", "galvanized", "galvanizing",
    "propel", "propelled", "propelling",
    "empower", "empowered", "empowering",
    # Copula-avoidance verbs that replace "is/has"
    "boasts",
    "constitutes",
    "embodies",
]

_YELLOW_VERBS: list[str] = [
    "navigate", "navigated", "navigating",  # metaphorical
    "leverage", "leveraged", "leveraging",   # as verb
    "utilize", "utilized", "utilizing", "utilise", "utilised", "utilising",
    "optimize", "optimized", "optimizing", "optimise", "optimised", "optimising",
    "streamline", "streamlined", "streamlining",
    "enhance", "enhanced", "enhancing",
    "inspire", "inspired", "inspiring",
    "explore",  # "let's explore"
]

_RED_ADJECTIVES: list[str] = [
    "pivotal", "nuanced", "multifaceted", "seamless",
    "groundbreaking", "transformative", "compelling",
    "profound", "meticulous", "intricate", "invaluable",
    "exemplary", "poignant", "commendable", "noteworthy",
    "holistic", "cutting-edge",
]

_YELLOW_ADJECTIVES: list[str] = [
    "crucial", "vital", "comprehensive", "robust",
    "innovative", "dynamic", "authentic", "elusive",
    "sustainable", "remarkable", "significant", "essential",
    "fundamental", "daunting", "timeless", "elegant",
    "vibrant", "vivid", "unprecedented",
]

_RED_NOUNS: list[str] = [
    "tapestry", "beacon", "testament", "symphony",
    "mosaic", "nexus", "paradigm", "synergy",
    "interplay", "underpinning", "bedrock",
    "kaleidoscope", "labyrinth", "cacophony",
    "pantheon", "gamut", "panoply", "juxtaposition",
]

_YELLOW_NOUNS: list[str] = [
    "landscape",  # metaphorical
    "realm", "journey", "catalyst", "cornerstone",
    "fabric",  # metaphorical
]

_RED_ADVERBS: list[str] = [
    "additionally", "notably", "furthermore", "moreover",
    "crucially", "meticulously", "seamlessly", "aptly",
    "critically", "dynamically", "indelibly", "insightfully",
    "vibrantly", "vividly", "ostensibly",
]

_YELLOW_ADVERBS: list[str] = [
    "significantly", "particularly", "arguably",
    "undeniably", "inherently", "fundamentally",
    "ultimately", "essentially",
]


def _build_word_map() -> dict[str, str]:
    """Return {lowercase_word: severity} for every flagged word."""
    m: dict[str, str] = {}
    for w in _RED_VERBS + _RED_ADJECTIVES + _RED_NOUNS + _RED_ADVERBS:
        m[w.lower()] = "red"
    for w in _YELLOW_VERBS + _YELLOW_ADJECTIVES + _YELLOW_NOUNS + _YELLOW_ADVERBS:
        m.setdefault(w.lower(), "yellow")
    return m


FLAGGED_WORDS: dict[str, str] = _build_word_map()

# ===================================================================
#  SECTION 2:  MASTER PHRASE LISTS
# ===================================================================
# Every phrase from AI-Writing-Detection-Reference.md sections 2A-2J
# plus meta-commentary and formulaic headings from sections 4D-4E.
# ===================================================================

_FORMULAIC_OPENINGS: list[str] = [
    r"in today'?s fast[- ]paced world",
    r"in today'?s ever[- ]evolving landscape",
    r"in today'?s rapidly changing",
    r"in the ever[- ]evolving landscape of",
    r"in a world where",
    r"as the \w+ continues to evolve",
    r"now more than ever",
    r"in the realm of",
    r"in the tapestry of",
    r"let'?s dive in",
    r"let'?s break it down",
    r"let'?s delve into",
    r"let'?s unpack this",
    r"here'?s the thing",
    r"here'?s the uncomfortable truth",
    r"imagine a world where",
    r"picture this:?",
    r"it'?s no secret that",
    r"whether you'?re a \w+ or a \w+",
]

_FORMULAIC_CLOSINGS: list[str] = [
    r"in conclusion",
    r"in summary",
    r"in essence",
    r"overall[,.\s]",
    r"the future looks bright",
    r"only time will tell",
    r"one thing is clear",
    r"the possibilities are endless",
    r"as we move forward",
    r"as we look to the future",
    r"the journey continues",
    r"this is just the beginning",
]

_SIGNIFICANCE_INFLATION: list[str] = [
    r"stands as a testament to",
    r"serves as a reminder of",
    r"marks a pivotal moment",
    r"represents a watershed moment",
    r"symbolizing its enduring legacy",
    r"reflecting broader trends in",
    r"contributing to the broader",
    r"setting the stage for",
    r"underscores the importance of",
    r"highlights the significance of",
    r"speaks volumes about",
    r"a lasting impact on",
    r"a profound heritage",
    r"steadfast dedication to",
    r"solidifies its position as",
    r"plays a (?:vital|significant|crucial|key|important) role in",
]

_PROMOTIONAL: list[str] = [
    r"rich cultural heritage",
    r"breathtaking views?",
    r"stunning natural beauty",
    r"must[- ]visit destination",
    r"enduring legacy",
    r"cultural tapestry",
    r"vibrant communit(?:y|ies)",
    r"nestled in the heart of",
    r"a hidden gem",
    r"an unforgettable experience",
    r"scenic landscapes?",
    r"clean and modern",
    r"world[- ]class",
    r"a feast for the senses",
]

_BUSINESS_HYPE: list[str] = [
    r"unlock the power of",
    r"unleash the potential of",
    r"supercharge your",
    r"a game[- ]changer for",
    r"that'?s where .{1,40} comes in",
    r"revolutionizing the way",
    r"transforming \w+ into \w+",
    r"future[- ]proof your",
    r"stay ahead of the curve",
    r"forward[- ]thinking companies",
    r"simply cannot",
    r"strategic advantage",
    r"the bottom line",
    r"thrilled to announce",
    r"seamlessly integrate",
    r"at the forefront of innovation",
]

_HEDGING: list[str] = [
    r"it'?s important to note that",
    r"it'?s worth noting that",
    r"it'?s worth mentioning that",
    r"it is important to understand that",
    r"no discussion would be complete without",
    r"generally speaking",
    r"from a broader perspective",
    r"could potentially",
    r"may possibly",
    r"it should be noted",
    r"one might argue",
]

_WEASEL_WORDS: list[str] = [
    r"experts argue",
    r"industry reports suggest",
    r"observers cite",
    r"some critics argue",
    r"studies show",
    r"research indicates",
    r"according to experts",
    r"many believe",
    r"it is widely accepted that",
    r"reportedly",
    r"seemingly",
]

_EDITORIALISING: list[str] = [
    r"important to note",
    r"worth mentioning",
    r"no discussion would be complete without",
    r"in this article,? we will",
    r"as we will see",
    r"as mentioned earlier",
    r"now that we'?ve explored",
    r"this matters because",
    r"let'?s now turn to",
    r"before we proceed",
    r"in this section,? we will",
]

_SYCOPHANCY: list[str] = [
    r"great question!?",
    r"excellent question!?",
    r"absolutely!",
    r"certainly!",
    r"i'?d be happy to help",
    r"i hope this helps",
    r"let me know if you need anything else",
    r"would you like me to elaborate",
    r"you'?re absolutely right",
    r"that'?s a great point",
    r"as of my last training update",
    r"based on available information",
    r"i hope this email finds you well",
]

_FAUX_CONVERSATIONAL: list[str] = [
    r"let'?s face it",
    r"but let'?s get real",
    r"what does this mean for you",
    r"not all \w+ are created equal",
    r"the good news\??",
    r"the real unlock",
    r"\w+\?\s*meet \w+\.",
    r"it'?s time to",
    r"why it matters",
    r"here'?s what you need to know",
    r"do \w+,? so you can \w+",
]

_META_COMMENTARY: list[str] = [
    r"in this section,? we will",
    r"as mentioned earlier",
    r"now that we'?ve explored",
    r"let'?s now turn to",
    r"before we proceed",
    r"as we will see",
    r"now let'?s",
]

_FORMULAIC_HEADINGS: list[str] = [
    r"understanding \w+",
    r"the importance of \w+",
    r"key benefits of",
    r"challenges and future prospects",
]

# Compile all phrase patterns into a lookup list.

PhraseEntry = tuple[re.Pattern[str], str]  # (compiled_regex, category)


def _compile_phrases() -> list[PhraseEntry]:
    entries: list[PhraseEntry] = []
    groups: list[tuple[list[str], str]] = [
        (_FORMULAIC_OPENINGS,      "formulaic_opening"),
        (_FORMULAIC_CLOSINGS,      "formulaic_closing"),
        (_SIGNIFICANCE_INFLATION,  "significance_inflation"),
        (_PROMOTIONAL,             "promotional"),
        (_BUSINESS_HYPE,           "business_hype"),
        (_HEDGING,                 "hedging"),
        (_WEASEL_WORDS,            "weasel_words"),
        (_EDITORIALISING,          "editorialising"),
        (_SYCOPHANCY,              "sycophancy"),
        (_FAUX_CONVERSATIONAL,     "faux_conversational"),
        (_META_COMMENTARY,         "meta_commentary"),
        (_FORMULAIC_HEADINGS,      "formulaic_heading"),
    ]
    for patterns, cat in groups:
        for p in patterns:
            entries.append((re.compile(p, re.IGNORECASE), cat))
    return entries


PHRASE_PATTERNS: list[PhraseEntry] = _compile_phrases()

# ===================================================================
#  SECTION 3:  COPULA AVOIDANCE PATTERNS  (ref 1C)
# ===================================================================

COPULA_PATTERNS: list[re.Pattern[str]] = [
    re.compile(p, re.IGNORECASE)
    for p in [
        r"\bserves as a\b",
        r"\bstands as a\b",
        r"\bmarks a\b",
        r"\brepresents a\b",
        r"\bboasts\b",
        r"\bfeatures\b(?!\s+(?:of|in)\b)",
        r"\boffers\b",
        r"\bshowcases\b",
        r"\bconstitutes\b",
        r"\bembodies\b",
    ]
]

# ===================================================================
#  SECTION 4:  NOMINALIZATION DETECTION  (natural-prose-ref sec 6)
# ===================================================================

# Suffixes that frequently signal a nominalization hiding a verb.
_NOMINALIZATION_RE = re.compile(
    r"\b\w{4,}(?:tion|ment|ance|ence|ity|ness|ism)s?\b", re.IGNORECASE
)
# Passive/weak verbs that accompany nominalizations.
_WEAK_VERB_RE = re.compile(
    r"\b(?:was|were|is|are|been|be|being"
    r"|there\s+(?:is|are|was|were))\b",
    re.IGNORECASE,
)

# ===================================================================
#  SECTION 5:  STRUCTURAL PATTERN REGEXES  (ref 3A-3F, 5A-5H)
# ===================================================================

# --- Negative parallelism  (ref 3A) ---
RE_NEGATIVE_PARALLELISM = re.compile(
    r"(?:"
    r"(?:it'?s|it\s+is|this\s+is(?:n'?t)?|that'?s|that\s+is|we'?re|they'?re)"
    r"\s+not\s+(?:just|only|merely|simply)"
    r"|not\s+(?:just|only|merely)\s+\w+"
    r"|(?:isn'?t|aren'?t|wasn'?t|weren'?t|doesn'?t|don'?t)\s+(?:just|only|merely)"
    r"|more\s+than\s+(?:just|simply)"
    r"|not\s+because\b"
    r"|not\s+with\s+a\b"
    r"|no\s+\w+\.\s*no\s+\w+\.\s*just"
    r")",
    re.IGNORECASE,
)

# --- Tricolon / rule of three  (ref 3B) ---
# Matches "A, B, and C" or "A, B, or C"
RE_TRICOLON = re.compile(
    r"(?<![,\w])"
    r"(\b[\w'-]+(?:\s+[\w'-]+){0,4})"
    r",\s+"
    r"([\w'-]+(?:\s+[\w'-]+){0,4})"
    r",?\s+(?:and|or)\s+"
    r"([\w'-]+(?:\s+[\w'-]+){0,4})"
    r"(?=[.,;:!?\s]|$)",
    re.IGNORECASE,
)

# --- Trailing participial phrases  (ref 3C) ---
# Telltale gerunds that AI appends after a comma.
_TELLTALE_GERUNDS = (
    "ensuring|highlighting|emphasizing|emphasising|reflecting"
    "|symbolizing|symbolising|showcasing|underscoring|demonstrating"
    "|representing|fostering|creating|revealing|marking"
    "|transforming|paving|setting|making|providing"
    "|offering|enabling|driving|resulting|leading|bringing|generating"
    "|capturing|illustrating|signaling|signalling|suggesting|indicating"
    "|reinforcing|cementing|solidifying|laying|opening|closing|shaping"
    "|sparking|fueling|fuelling|prompting|inspiring|motivating"
    "|facilitating|enhancing|strengthening|bolstering|amplifying"
)
RE_TRAILING_ING = re.compile(
    rf",\s+({_TELLTALE_GERUNDS})\b",
    re.IGNORECASE,
)

# --- Em dashes  (ref 5A) ---
# Real em dash U+2014, double-hyphen surrogate --, en dash U+2013
RE_EM_DASH = re.compile(r"\u2014|(?<!\w)--(?!\w)|\u2013")

# --- From X to Y  (ref 3D) ---
RE_FROM_X_TO_Y = re.compile(
    r"\bfrom\s+[\w'-]+(?:\s+[\w'-]+){0,4}\s+to\s+[\w'-]+(?:\s+[\w'-]+){0,4}\b",
    re.IGNORECASE,
)

# --- Correlative conjunctions  (ref 3E) ---
RE_CORRELATIVE = re.compile(
    r"\b(?:not\s+only\b.{1,80}?\bbut\s+also"
    r"|whether\b.{1,80}?\bor\b"
    r"|both\b.{1,80}?\band\b"
    r"|either\b.{1,80}?\bor\b"
    r"|neither\b.{1,80}?\bnor\b)",
    re.IGNORECASE | re.DOTALL,
)

# --- Bold-bullet patterns  (ref 4C) ---
RE_BOLD_BULLET = re.compile(r"\*\*[^*]+\*\*\s*[:]\s*\S")

# --- Body colon overuse  (ref 5C) ---
RE_BODY_COLON = re.compile(r"(?<!\n#)[^#\n]{5,}:\s")

# --- Equivocation seesaw  (ref 3F) ---
RE_EQUIVOCATION = re.compile(
    r"(?:while\b.{5,60}?\bit is important to note\b"
    r"|on the one hand\b.{5,120}?\bon the other hand\b"
    r"|although\b.{5,80}?\bit also offers\b)",
    re.IGNORECASE | re.DOTALL,
)

# ===================================================================
#  SECTION 6:  HELPER UTILITIES
# ===================================================================


def _tokenize_words(text: str) -> list[str]:
    """Return lowercased word tokens (handles hyphens and apostrophes)."""
    return re.findall(r"[a-z]+(?:['-][a-z]+)*", text.lower())


def _split_sentences(text: str) -> list[str]:
    """
    Split text into sentences.
    Handles abbreviations, ellipses, and smart punctuation.
    """
    # Protect common abbreviations from false splits
    protected = text
    for abbr in [
        "Mr.", "Mrs.", "Ms.", "Dr.", "Prof.", "Sr.", "Jr.",
        "vs.", "etc.", "i.e.", "e.g.", "U.S.", "U.K.", "Inc.",
        "Ltd.", "Corp.", "St.", "Ave.", "Fig.", "al.", "approx.",
    ]:
        protected = protected.replace(abbr, abbr.replace(".", "\x00"))

    # Normalise line breaks within paragraphs (single newline -> space)
    protected = re.sub(r"(?<!\n)\n(?!\n)", " ", protected)

    # Split on sentence-ending punctuation followed by whitespace + uppercase
    # or end of string.
    raw = re.split(r'(?<=[.!?])\s+(?=[A-Z\u201c"\(\[])', protected)

    # Further split on double-newline boundaries
    sentences: list[str] = []
    for chunk in raw:
        parts = re.split(r"\n{2,}", chunk)
        for p in parts:
            s = p.replace("\x00", ".").strip()
            if s:
                sentences.append(s)
    return sentences


def _split_paragraphs(text: str) -> list[str]:
    """Split text into paragraphs on blank lines."""
    raw = re.split(r"\n\s*\n", text)
    return [p.strip() for p in raw if p.strip()]


def _word_count_of(text: str) -> int:
    return len(text.split())


def _safe_stdev(values: list[float | int]) -> float:
    """Return sample standard deviation, or 0.0 if <2 values."""
    if len(values) < 2:
        return 0.0
    return statistics.stdev(values)


def _safe_mean(values: list[float | int]) -> float:
    if not values:
        return 0.0
    return statistics.mean(values)

# ===================================================================
#  SECTION 7:  ANALYSIS ENGINE
# ===================================================================


def _analyze_words(tokens: list[str]) -> list[dict[str, Any]]:
    """Scan tokens against the flagged-word map."""
    hits: dict[str, dict[str, Any]] = {}
    for idx, tok in enumerate(tokens):
        sev = FLAGGED_WORDS.get(tok)
        if sev is None:
            # Try stripping leading/trailing hyphens/apostrophes
            clean = tok.strip("'-")
            sev = FLAGGED_WORDS.get(clean)
            if sev is None:
                continue
            tok = clean
        if tok not in hits:
            hits[tok] = {"word": tok, "count": 0, "positions": [], "severity": sev}
        hits[tok]["count"] += 1
        hits[tok]["positions"].append(idx)
    return sorted(hits.values(), key=lambda h: (-h["count"], h["word"]))


def _analyze_phrases(text: str) -> list[dict[str, Any]]:
    """Scan text against all phrase patterns. De-duplicate overlaps."""
    hits: dict[str, dict[str, Any]] = {}
    for regex, cat in PHRASE_PATTERNS:
        for m in regex.finditer(text):
            phrase = m.group(0).strip()
            key = (phrase.lower()[:80], cat)
            if key not in hits:
                hits[key] = {"phrase": phrase, "count": 0, "category": cat}
            hits[key]["count"] += 1
    return sorted(hits.values(), key=lambda h: (-h["count"], h["phrase"]))


def _analyze_structural(text: str, paragraphs: list[str]) -> dict[str, Any]:
    """Detect structural AI patterns."""
    r: dict[str, Any] = {}

    # Negative parallelism  (ref 3A)
    r["negative_parallelism"] = [
        m.group(0) for m in RE_NEGATIVE_PARALLELISM.finditer(text)
    ]

    # Tricolon / rule of three  (ref 3B)
    r["tricolons"] = [m.group(0) for m in RE_TRICOLON.finditer(text)]

    # Trailing -ing clauses  (ref 3C)
    r["trailing_ing"] = [
        m.group(0).strip() for m in RE_TRAILING_ING.finditer(text)
    ]

    # Em dashes  (ref 5A)
    em_total = len(RE_EM_DASH.findall(text))
    em_per_para = (
        [len(RE_EM_DASH.findall(p)) for p in paragraphs] if paragraphs else [0]
    )
    r["em_dash_count"] = em_total
    r["em_dash_per_para_max"] = max(em_per_para) if em_per_para else 0

    # From X to Y  (ref 3D)
    r["from_x_to_y"] = [m.group(0) for m in RE_FROM_X_TO_Y.finditer(text)]

    # Correlative conjunctions  (ref 3E)
    r["correlative_count"] = len(RE_CORRELATIVE.findall(text))

    # Equivocation seesaw  (ref 3F)
    r["equivocation_count"] = len(RE_EQUIVOCATION.findall(text))

    # Formulaic openings -- first sentence of each paragraph
    f_open: list[str] = []
    for p in paragraphs:
        sents = _split_sentences(p)
        first_sent = sents[0] if sents else p
        for regex, cat in PHRASE_PATTERNS:
            if cat == "formulaic_opening" and regex.search(first_sent):
                f_open.append(first_sent[:120])
                break
    r["formulaic_openings"] = f_open

    # Formulaic closings -- last paragraph
    f_close: list[str] = []
    if paragraphs:
        last_sents = _split_sentences(paragraphs[-1])
        for sent in last_sents:
            for regex, cat in PHRASE_PATTERNS:
                if cat == "formulaic_closing" and regex.search(sent):
                    f_close.append(sent[:120])
                    break
    r["formulaic_closings"] = f_close

    # Bold-bullet patterns  (ref 4C)
    r["bold_bullet_count"] = len(RE_BOLD_BULLET.findall(text))

    # Sycophancy residue  (ref 2I)
    syco: list[str] = []
    for regex, cat in PHRASE_PATTERNS:
        if cat == "sycophancy":
            for m in regex.finditer(text):
                syco.append(m.group(0).strip())
    r["sycophancy_residue"] = syco

    # Body colon count  (ref 5C)
    r["body_colon_count"] = len(RE_BODY_COLON.findall(text))

    return r


def _analyze_rhythm(
    sentences: list[str], paragraphs: list[str]
) -> dict[str, Any]:
    """Compute rhythm / variance metrics (ref 3G, 4B, natural-prose sec 1)."""
    r: dict[str, Any] = {}

    # --- Sentence lengths ---
    sent_lens = [_word_count_of(s) for s in sentences if _word_count_of(s) > 0]
    r["avg_sentence_length"] = round(_safe_mean(sent_lens), 1)
    r["sentence_length_std_dev"] = round(_safe_stdev(sent_lens), 2)

    # --- Paragraph lengths (in sentences) ---
    para_lens = [len(_split_sentences(p)) for p in paragraphs]
    r["avg_paragraph_length"] = round(_safe_mean(para_lens), 1)
    r["paragraph_length_std_dev"] = round(_safe_stdev(para_lens), 2)

    # --- Monotone sentences: % within +/- 3 words of mean ---
    if sent_lens and r["avg_sentence_length"] > 0:
        mean_sl = r["avg_sentence_length"]
        mono = sum(1 for sl in sent_lens if abs(sl - mean_sl) <= 3)
        r["monotone_sentences_pct"] = round(100.0 * mono / len(sent_lens), 1)
    else:
        r["monotone_sentences_pct"] = 0.0

    # --- Sentences starting with "The" ---
    if sentences:
        the_starts = sum(
            1 for s in sentences if re.match(r"^\s*the\b", s, re.IGNORECASE)
        )
        r["sentences_starting_with_the_pct"] = round(
            100.0 * the_starts / len(sentences), 1
        )
    else:
        r["sentences_starting_with_the_pct"] = 0.0

    # --- Opening word diversity ---
    if sentences:
        openers = []
        for s in sentences:
            m = re.match(r"\s*(\w+)", s)
            if m:
                openers.append(m.group(1).lower())
        if openers:
            r["opening_word_diversity"] = round(
                len(set(openers)) / len(openers), 3
            )
            # Track the/this/it percentage  (natural-prose sec 7)
            tti = sum(1 for o in openers if o in ("the", "this", "it"))
            r["_the_this_it_pct"] = round(100.0 * tti / len(openers), 1)
        else:
            r["opening_word_diversity"] = 0.0
            r["_the_this_it_pct"] = 0.0
    else:
        r["opening_word_diversity"] = 0.0
        r["_the_this_it_pct"] = 0.0

    return r


def _analyze_tone(
    text: str, flagged_phrases: list[dict[str, Any]]
) -> dict[str, Any]:
    """Aggregate tone signals."""
    r: dict[str, Any] = {}

    # Count phrase categories
    cats: Counter[str] = Counter()
    for fp in flagged_phrases:
        cats[fp["category"]] += fp["count"]

    r["hedging_count"] = cats.get("hedging", 0)
    r["weasel_count"] = cats.get("weasel_words", 0)
    r["editorialising_count"] = (
        cats.get("editorialising", 0) + cats.get("meta_commentary", 0)
    )
    r["promotional_count"] = (
        cats.get("promotional", 0) + cats.get("business_hype", 0)
    )

    # Copula avoidance  (ref 1C)
    copula = sum(len(p.findall(text)) for p in COPULA_PATTERNS)
    r["copula_avoidance_count"] = copula

    # Nominalizations  (natural-prose sec 6)
    sentences = _split_sentences(text)
    nom_count = 0
    for sent in sentences:
        noms = _NOMINALIZATION_RE.findall(sent)
        if noms and _WEAK_VERB_RE.search(sent):
            nom_count += len(noms)
    r["nominalization_count"] = nom_count

    return r

# ===================================================================
#  SECTION 8:  SCORING ENGINE
# ===================================================================


def _compute_ai_density_score(
    word_count: int,
    flagged_words: list[dict[str, Any]],
    flagged_phrases: list[dict[str, Any]],
    structural: dict[str, Any],
    rhythm: dict[str, Any],
    tone: dict[str, Any],
) -> int:
    """
    Produce 0-100 AI density score.

    Weights:
        Word flags      30 %
        Phrase flags     25 %
        Structural       25 %
        Rhythm           20 %
    """
    if word_count < 10:
        return 0

    # ---- Word component (0-100 raw) ----
    total_flags = sum(fw["count"] for fw in flagged_words)
    red_flags   = sum(fw["count"] for fw in flagged_words if fw["severity"] == "red")
    flag_density = 100.0 * total_flags / word_count
    red_density  = 100.0 * red_flags / word_count
    word_raw = min(100, flag_density * 25 + red_density * 15)

    # ---- Phrase component (0-100 raw) ----
    total_phrases = sum(fp["count"] for fp in flagged_phrases)
    phrase_per_100 = 100.0 * total_phrases / word_count
    phrase_raw = min(100, phrase_per_100 * 80 + total_phrases * 4)

    # ---- Structural component (0-100 raw) ----
    neg_par   = len(structural.get("negative_parallelism", []))
    tricolon  = len(structural.get("tricolons", []))
    trailing  = len(structural.get("trailing_ing", []))
    em_dash   = structural.get("em_dash_count", 0)
    em_max    = structural.get("em_dash_per_para_max", 0)
    fxy       = len(structural.get("from_x_to_y", []))
    corr      = structural.get("correlative_count", 0)
    equivoc   = structural.get("equivocation_count", 0)
    bold      = structural.get("bold_bullet_count", 0)
    syco      = len(structural.get("sycophancy_residue", []))
    f_open    = len(structural.get("formulaic_openings", []))
    f_close   = len(structural.get("formulaic_closings", []))
    colon_ct  = structural.get("body_colon_count", 0)

    struct_signals = (
        min(neg_par * 12, 30)
        + min(tricolon * 6, 25)
        + min(trailing * 8, 25)
        + (15 if em_max >= 3 else min(em_dash * 2, 10))
        + min(fxy * 8, 20)
        + min(corr * 5, 15)
        + min(equivoc * 8, 15)
        + min(bold * 4, 20)
        + min(syco * 15, 30)
        + min(f_open * 12, 25)
        + min(f_close * 10, 20)
        + (10 if colon_ct >= 10 else 0)
    )
    struct_raw = min(100, struct_signals)

    # ---- Rhythm component (0-100 raw) ----
    sd        = rhythm.get("sentence_length_std_dev", 0.0)
    mono_pct  = rhythm.get("monotone_sentences_pct", 0.0)
    the_pct   = rhythm.get("sentences_starting_with_the_pct", 0.0)
    diversity = rhythm.get("opening_word_diversity", 1.0)
    para_sd   = rhythm.get("paragraph_length_std_dev", 0.0)
    tti_pct   = rhythm.get("_the_this_it_pct", 0.0)

    rhythm_signals = 0.0

    # Low sentence SD is AI-like  (human ~6-11, AI ~2-3)
    if sd < 3:
        rhythm_signals += 35
    elif sd < 5:
        rhythm_signals += 20
    elif sd < 6:
        rhythm_signals += 8

    # High monotone percentage
    if mono_pct > 70:
        rhythm_signals += 25
    elif mono_pct > 50:
        rhythm_signals += 12

    # Excessive "The" starts
    if the_pct > 30:
        rhythm_signals += 15
    elif the_pct > 20:
        rhythm_signals += 8

    # Low opening diversity
    if diversity < 0.4:
        rhythm_signals += 15
    elif diversity < 0.6:
        rhythm_signals += 8

    # Low paragraph SD (uniform paragraphs)
    avg_para = rhythm.get("avg_paragraph_length", 0)
    if avg_para > 0:
        if para_sd < 0.8:
            rhythm_signals += 15
        elif para_sd < 1.5:
            rhythm_signals += 5

    # High "the/this/it" opener percentage
    if tti_pct > 50:
        rhythm_signals += 10
    elif tti_pct > 35:
        rhythm_signals += 5

    rhythm_raw = min(100, rhythm_signals)

    # ---- Weighted combination ----
    score = (
        word_raw   * 0.30
        + phrase_raw * 0.25
        + struct_raw * 0.25
        + rhythm_raw * 0.20
    )

    return max(0, min(100, round(score)))

# ===================================================================
#  SECTION 9:  SUMMARY GENERATOR
# ===================================================================


def _generate_summary(
    score: int,
    word_count: int,
    flagged_words: list[dict[str, Any]],
    flagged_phrases: list[dict[str, Any]],
    structural: dict[str, Any],
    rhythm: dict[str, Any],
    tone: dict[str, Any],
) -> str:
    """Produce a human-readable summary of findings."""
    parts: list[str] = []

    # Overall assessment
    if score >= 75:
        parts.append(f"AI density score: {score}/100 -- STRONG AI signal detected.")
    elif score >= 50:
        parts.append(f"AI density score: {score}/100 -- MODERATE AI signal detected.")
    elif score >= 25:
        parts.append(
            f"AI density score: {score}/100 -- MILD AI signal; some patterns present."
        )
    else:
        parts.append(
            f"AI density score: {score}/100 -- LOW AI signal; text appears mostly human-written."
        )

    parts.append(f"Analyzed {word_count} words.")

    # Top flagged words
    red_words = [fw for fw in flagged_words if fw["severity"] == "red"]
    if red_words:
        top = ", ".join(
            f'"{w["word"]}" ({w["count"]}x)' for w in red_words[:8]
        )
        parts.append(f"Red-flag words: {top}.")

    # Key structural findings
    findings: list[str] = []
    neg_count = len(structural.get("negative_parallelism", []))
    if neg_count >= 3:
        findings.append(
            f"{neg_count} negative-parallelism constructions (strong AI tell)"
        )
    elif neg_count >= 1:
        findings.append(f"{neg_count} negative-parallelism construction(s)")

    tri_count = len(structural.get("tricolons", []))
    if tri_count >= 4:
        findings.append(f"{tri_count} tricolons/rule-of-three (AI compulsion)")
    elif tri_count >= 2:
        findings.append(f"{tri_count} tricolons")

    trail_count = len(structural.get("trailing_ing", []))
    if trail_count >= 3:
        findings.append(f"{trail_count} trailing -ing clauses")

    em_max = structural.get("em_dash_per_para_max", 0)
    if em_max >= 3:
        findings.append(f"em dash overuse (max {em_max} per paragraph)")

    syco = structural.get("sycophancy_residue", [])
    if syco:
        findings.append(
            f"sycophancy/chatbot residue detected ({len(syco)} instance(s))"
        )

    if findings:
        parts.append("Structural: " + "; ".join(findings) + ".")

    # Rhythm
    sd = rhythm.get("sentence_length_std_dev", 0.0)
    if sd < 5:
        parts.append(
            f"Rhythm: sentence length SD = {sd:.1f} (below 5.0 threshold -- "
            f"metronomic). Human nonfiction SD is typically 6+, fiction 9-11."
        )

    diversity = rhythm.get("opening_word_diversity", 1.0)
    if diversity < 0.5:
        parts.append(
            f"Opening word diversity is low ({diversity:.2f}); "
            f"paragraphs/sentences start too similarly."
        )

    # Tone
    tone_issues: list[str] = []
    if tone.get("hedging_count", 0) >= 3:
        tone_issues.append(f"hedging ({tone['hedging_count']})")
    if tone.get("weasel_count", 0) >= 2:
        tone_issues.append(f"weasel words ({tone['weasel_count']})")
    if tone.get("copula_avoidance_count", 0) >= 3:
        tone_issues.append(f"copula avoidance ({tone['copula_avoidance_count']})")
    if tone.get("nominalization_count", 0) >= 5:
        tone_issues.append(f"nominalizations ({tone['nominalization_count']})")
    if tone.get("promotional_count", 0) >= 2:
        tone_issues.append(f"promotional language ({tone['promotional_count']})")
    if tone.get("editorialising_count", 0) >= 2:
        tone_issues.append(f"editorialising ({tone['editorialising_count']})")
    if tone_issues:
        parts.append("Tone issues: " + ", ".join(tone_issues) + ".")

    return " ".join(parts)

# ===================================================================
#  SECTION 10:  MAIN ANALYSIS PIPELINE
# ===================================================================


def analyze(text: str) -> dict[str, Any]:
    """Run full analysis and return structured report dict."""
    tokens     = _tokenize_words(text)
    word_count = len(tokens)
    sentences  = _split_sentences(text)
    paragraphs = _split_paragraphs(text)

    flagged_words   = _analyze_words(tokens)
    flagged_phrases = _analyze_phrases(text)
    struct          = _analyze_structural(text, paragraphs)
    rhythm          = _analyze_rhythm(sentences, paragraphs)
    tone            = _analyze_tone(text, flagged_phrases)

    score = _compute_ai_density_score(
        word_count, flagged_words, flagged_phrases, struct, rhythm, tone
    )

    summary = _generate_summary(
        score, word_count, flagged_words, flagged_phrases, struct, rhythm, tone
    )

    # Assemble the report in the canonical JSON structure.
    report: dict[str, Any] = {
        "ai_density_score": score,
        "word_count": word_count,
        "flagged_words": flagged_words,
        "flagged_phrases": flagged_phrases,
        "structural_patterns": {
            "negative_parallelism": {
                "count": len(struct["negative_parallelism"]),
                "examples": struct["negative_parallelism"][:10],
            },
            "rule_of_three": {
                "count": len(struct["tricolons"]),
                "examples": struct["tricolons"][:10],
            },
            "trailing_ing_clauses": {
                "count": len(struct["trailing_ing"]),
                "examples": struct["trailing_ing"][:10],
            },
            "em_dash_overuse": {
                "count": struct["em_dash_count"],
                "per_paragraph_max": struct["em_dash_per_para_max"],
            },
            "from_x_to_y": {
                "count": len(struct["from_x_to_y"]),
                "examples": struct["from_x_to_y"][:10],
            },
            "correlative_conjunctions": {
                "count": struct["correlative_count"],
            },
            "equivocation_seesaw": {
                "count": struct["equivocation_count"],
            },
            "formulaic_openings": struct["formulaic_openings"],
            "formulaic_closings": struct["formulaic_closings"],
            "bold_bullet_patterns": struct["bold_bullet_count"],
            "sycophancy_residue": struct["sycophancy_residue"],
            "body_colon_count": struct["body_colon_count"],
        },
        "rhythm_analysis": {
            "avg_sentence_length": rhythm["avg_sentence_length"],
            "sentence_length_std_dev": rhythm["sentence_length_std_dev"],
            "avg_paragraph_length": rhythm["avg_paragraph_length"],
            "paragraph_length_std_dev": rhythm["paragraph_length_std_dev"],
            "monotone_sentences_pct": rhythm["monotone_sentences_pct"],
            "sentences_starting_with_the_pct": rhythm[
                "sentences_starting_with_the_pct"
            ],
            "opening_word_diversity": rhythm["opening_word_diversity"],
        },
        "tone_analysis": {
            "hedging_phrases": tone["hedging_count"],
            "weasel_words": tone["weasel_count"],
            "editorialising": tone["editorialising_count"],
            "promotional_language": tone["promotional_count"],
            "copula_avoidance": tone["copula_avoidance_count"],
            "nominalizations": tone["nominalization_count"],
        },
        "summary": summary,
    }

    return report

# ===================================================================
#  SECTION 11:  MARKDOWN OUTPUT FORMATTER
# ===================================================================


def _format_markdown(report: dict[str, Any], verbose: bool = False) -> str:
    """Format report as readable Markdown."""
    lines: list[str] = []

    score = report["ai_density_score"]
    if score >= 75:
        grade = "HIGH"
    elif score >= 50:
        grade = "MODERATE"
    elif score >= 25:
        grade = "MILD"
    else:
        grade = "LOW"

    lines.append("# AI Pattern Detection Report")
    lines.append("")
    lines.append(f"**AI Density Score: {score}/100 ({grade})**")
    lines.append(f"**Word Count: {report['word_count']}**")
    lines.append("")

    # Summary
    lines.append("## Summary")
    lines.append("")
    lines.append(report["summary"])
    lines.append("")

    # Flagged words
    if report["flagged_words"]:
        lines.append("## Flagged Words")
        lines.append("")
        lines.append("| Word | Count | Severity |")
        lines.append("|------|-------|----------|")
        for fw in report["flagged_words"]:
            sev_marker = "RED" if fw["severity"] == "red" else "YELLOW"
            lines.append(f"| {fw['word']} | {fw['count']} | {sev_marker} |")
        lines.append("")

    # Flagged phrases
    if report["flagged_phrases"]:
        lines.append("## Flagged Phrases")
        lines.append("")
        lines.append("| Phrase | Count | Category |")
        lines.append("|--------|-------|----------|")
        for fp in report["flagged_phrases"]:
            phrase_escaped = fp["phrase"].replace("|", "\\|")
            lines.append(
                f"| {phrase_escaped} | {fp['count']} | {fp['category']} |"
            )
        lines.append("")

    # Structural patterns
    sp = report["structural_patterns"]
    lines.append("## Structural Patterns")
    lines.append("")

    if sp["negative_parallelism"]["count"]:
        lines.append(
            f"- **Negative parallelism:** "
            f"{sp['negative_parallelism']['count']} instances"
        )
        if verbose:
            for ex in sp["negative_parallelism"]["examples"]:
                lines.append(f"  - `{ex}`")

    if sp["rule_of_three"]["count"]:
        lines.append(
            f"- **Rule of three (tricolon):** "
            f"{sp['rule_of_three']['count']} instances"
        )
        if verbose:
            for ex in sp["rule_of_three"]["examples"][:5]:
                lines.append(f"  - `{ex}`")

    if sp["trailing_ing_clauses"]["count"]:
        lines.append(
            f"- **Trailing -ing clauses:** "
            f"{sp['trailing_ing_clauses']['count']} instances"
        )
        if verbose:
            for ex in sp["trailing_ing_clauses"]["examples"]:
                lines.append(f"  - `{ex}`")

    ed = sp["em_dash_overuse"]
    lines.append(
        f"- **Em dashes:** {ed['count']} total, "
        f"max {ed['per_paragraph_max']} per paragraph"
        + (" (AI signal: 3+ per paragraph)" if ed["per_paragraph_max"] >= 3 else "")
    )

    if sp["from_x_to_y"]["count"]:
        lines.append(f"- **From X to Y:** {sp['from_x_to_y']['count']} instances")
        if verbose:
            for ex in sp["from_x_to_y"]["examples"][:5]:
                lines.append(f"  - `{ex}`")

    lines.append(
        f"- **Correlative conjunctions:** "
        f"{sp['correlative_conjunctions']['count']}"
    )
    if sp.get("equivocation_seesaw", {}).get("count", 0):
        lines.append(
            f"- **Equivocation seesaw:** "
            f"{sp['equivocation_seesaw']['count']}"
        )
    lines.append(f"- **Bold-bullet patterns:** {sp['bold_bullet_patterns']}")
    lines.append(f"- **Body colons:** {sp['body_colon_count']}")

    if sp["formulaic_openings"]:
        lines.append(
            f"- **Formulaic openings:** {len(sp['formulaic_openings'])}"
        )
        if verbose:
            for fo in sp["formulaic_openings"]:
                lines.append(f"  - `{fo}`")

    if sp["formulaic_closings"]:
        lines.append(
            f"- **Formulaic closings:** {len(sp['formulaic_closings'])}"
        )
        if verbose:
            for fc in sp["formulaic_closings"]:
                lines.append(f"  - `{fc}`")

    if sp["sycophancy_residue"]:
        lines.append(
            f"- **Sycophancy residue:** "
            f"{len(sp['sycophancy_residue'])} instance(s)"
        )
        for sr in sp["sycophancy_residue"]:
            lines.append(f"  - `{sr}`")

    lines.append("")

    # Rhythm analysis
    ra = report["rhythm_analysis"]
    lines.append("## Rhythm Analysis")
    lines.append("")
    lines.append(f"- Avg sentence length: **{ra['avg_sentence_length']}** words")
    sd = ra["sentence_length_std_dev"]
    sd_flag = " (LOW -- metronomic, AI signal)" if sd < 5.0 else ""
    lines.append(f"- Sentence length SD: **{sd}**{sd_flag}")
    lines.append(
        f"- Avg paragraph length: **{ra['avg_paragraph_length']}** sentences"
    )
    psd = ra["paragraph_length_std_dev"]
    psd_flag = " (LOW -- uniform paragraphs, AI signal)" if psd < 1.0 else ""
    lines.append(f"- Paragraph length SD: **{psd}**{psd_flag}")
    lines.append(f"- Monotone sentences: **{ra['monotone_sentences_pct']}%**")
    lines.append(
        f"- Sentences starting with 'The': "
        f"**{ra['sentences_starting_with_the_pct']}%**"
    )
    lines.append(f"- Opening word diversity: **{ra['opening_word_diversity']}**")
    lines.append("")

    # Tone analysis
    ta = report["tone_analysis"]
    lines.append("## Tone Analysis")
    lines.append("")
    lines.append(f"- Hedging phrases: {ta['hedging_phrases']}")
    lines.append(f"- Weasel words: {ta['weasel_words']}")
    lines.append(f"- Editorialising: {ta['editorialising']}")
    lines.append(f"- Promotional language: {ta['promotional_language']}")
    lines.append(f"- Copula avoidance: {ta['copula_avoidance']}")
    lines.append(f"- Nominalizations: {ta['nominalizations']}")
    lines.append("")

    return "\n".join(lines)

# ===================================================================
#  SECTION 12:  CLI
# ===================================================================


def _build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="detect_ai_patterns",
        description=(
            "Scan text for signs of AI-generated writing and produce a "
            "structured report.  Reads from a file argument or stdin."
        ),
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=(
            "Examples:\n"
            "  echo 'This pivotal journey delves into...' "
            "| python detect_ai_patterns.py\n"
            "  python detect_ai_patterns.py essay.txt --format markdown -v\n"
            "  python detect_ai_patterns.py essay.txt -f json "
            "| jq .ai_density_score\n"
        ),
    )
    parser.add_argument(
        "file",
        nargs="?",
        default=None,
        help="Input text file.  If omitted, reads from stdin.",
    )
    parser.add_argument(
        "--format",
        "-f",
        choices=["json", "markdown"],
        default="json",
        dest="output_format",
        help="Output format (default: json).",
    )
    parser.add_argument(
        "--verbose",
        "-v",
        action="store_true",
        default=False,
        help="Include extra detail (examples in markdown mode).",
    )
    return parser


def main() -> None:
    parser = _build_parser()
    args = parser.parse_args()

    # Read input
    if args.file:
        try:
            with open(args.file, "r", encoding="utf-8") as fh:
                text = fh.read()
        except FileNotFoundError:
            print(f"Error: file not found: {args.file}", file=sys.stderr)
            sys.exit(1)
        except OSError as exc:
            print(f"Error reading file: {exc}", file=sys.stderr)
            sys.exit(1)
    else:
        if sys.stdin.isatty():
            print(
                "Reading from stdin (Ctrl-D / Ctrl-Z to finish)...",
                file=sys.stderr,
            )
        text = sys.stdin.read()

    if not text.strip():
        print("Error: empty input.", file=sys.stderr)
        sys.exit(1)

    # Run analysis
    report = analyze(text)

    # Output
    if args.output_format == "json":
        json.dump(report, sys.stdout, indent=2, ensure_ascii=False)
        sys.stdout.write("\n")
    else:
        print(_format_markdown(report, verbose=args.verbose))


if __name__ == "__main__":
    main()
