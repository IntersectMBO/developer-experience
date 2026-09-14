#!/usr/bin/env python3
"""
compare_texts.py - Show what changed between original and humanised text.

Produces a readable markdown report with side-by-side metrics, removed
words/phrases, structural changes, sentence alignment, and summary stats.

Usage:
    python compare_texts.py original.txt humanised.txt
    python compare_texts.py --original original.txt --humanised humanised.txt
    python compare_texts.py original.txt humanised.txt --output report.md
"""

import argparse
import difflib
import json
import math
import re
import subprocess
import sys
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
SCANNER_PATH = SCRIPT_DIR / "detect_ai_patterns.py"


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def adapt_report(raw):
    """Adapt nested detector JSON to flat format expected by compare functions."""
    if "density_score" in raw:
        return raw
    report = {}
    report["density_score"] = raw.get("ai_density_score", 0)
    report["word_count"] = raw.get("word_count", 0)
    flagged = raw.get("flagged_words", [])
    red_words = {}
    yellow_words = {}
    for w in flagged:
        name = w.get("word", "")
        count = w.get("count", 1)
        sev = w.get("severity", "yellow")
        if sev == "red":
            red_words[name] = red_words.get(name, 0) + count
        else:
            yellow_words[name] = yellow_words.get(name, 0) + count
    report["red_words"] = red_words
    report["red_word_total"] = sum(red_words.values())
    report["yellow_words"] = yellow_words
    report["yellow_word_total"] = sum(yellow_words.values())
    rhythm = raw.get("rhythm_analysis", {})
    report["sentence_length_sd"] = round(rhythm.get("sentence_length_std_dev", 0), 1)
    report["paragraph_length_sd"] = round(rhythm.get("paragraph_length_std_dev", 0), 1)
    report["avg_sentence_length"] = round(rhythm.get("avg_sentence_length", 0), 1)
    report["the_this_opener_ratio"] = rhythm.get("sentences_starting_with_the_pct", 0) / 100.0
    report["opening_word_diversity"] = rhythm.get("opening_word_diversity", 0)
    avg_sl = rhythm.get("avg_sentence_length", 15)
    wc = report["word_count"]
    sc = max(1, round(wc / avg_sl)) if avg_sl > 0 else max(1, wc // 15)
    report["sentence_count"] = sc
    report["the_this_opener_count"] = round(report["the_this_opener_ratio"] * sc)
    report["monotone_pct"] = rhythm.get("monotone_sentences_pct", 0)
    sp = raw.get("structural_patterns", {})
    report["tricolon_count"] = sp.get("rule_of_three", {}).get("count", 0)
    report["tricolon_examples"] = sp.get("rule_of_three", {}).get("examples", [])
    report["negative_parallelism_count"] = sp.get("negative_parallelism", {}).get("count", 0)
    report["negative_parallelism_examples"] = sp.get("negative_parallelism", {}).get("examples", [])
    report["trailing_gerund_count"] = sp.get("trailing_ing_clauses", {}).get("count", 0)
    report["trailing_gerund_examples"] = sp.get("trailing_ing_clauses", {}).get("examples", [])
    report["em_dash_count"] = sp.get("em_dash_overuse", {}).get("count", 0)
    report["from_x_to_y_count"] = sp.get("from_x_to_y", {}).get("count", 0)
    report["correlative_count"] = sp.get("correlative_conjunctions", {}).get("count", 0)
    fp = raw.get("flagged_phrases", [])
    formulaic_openings = []
    formulaic_closings = []
    sycophancy = []
    significance = []
    hedging = []
    if isinstance(fp, list):
        for item in fp:
            cat = item.get("category", "").lower()
            text = item.get("phrase", item.get("text", ""))
            if "opening" in cat:
                formulaic_openings.append({"text": text})
            elif "closing" in cat:
                formulaic_closings.append({"text": text})
            elif "sycophancy" in cat:
                sycophancy.append({"text": text})
            elif "significance" in cat or "inflation" in cat:
                significance.append({"text": text})
            elif "hedging" in cat:
                hedging.append({"text": text})
    report["formulaic_openings"] = formulaic_openings
    report["formulaic_closings"] = formulaic_closings
    report["sycophancy"] = sycophancy
    report["significance_phrases"] = significance
    report["hedging_phrases_list"] = hedging
    tone = raw.get("tone_analysis", {})
    report["hedging_count"] = tone.get("hedging_phrases", 0)
    report["weasel_count"] = tone.get("weasel_words", 0)
    report["copula_count"] = tone.get("copula_avoidance", 0)
    report["nominalization_count"] = tone.get("nominalizations", 0)
    report["summary"] = raw.get("summary", "")

    # Derived metrics not directly in the scanner output
    avg_para = rhythm.get("avg_paragraph_length", 0)
    report["avg_paragraph_length"] = round(avg_para, 1)
    # Estimate paragraph_count from word_count and avg_paragraph_length
    # avg_paragraph_length is in sentences; avg_sentence_length is in words
    avg_sl = report["avg_sentence_length"] if report["avg_sentence_length"] > 0 else 15
    if avg_para > 0 and avg_sl > 0:
        words_per_para = avg_para * avg_sl
        report["paragraph_count"] = max(1, round(report["word_count"] / words_per_para))
    else:
        report["paragraph_count"] = 1

    return report


def _enrich_report_from_text(report, file_path):
    """Add sentence_lengths and paragraph_sentence_counts computed from raw text."""
    try:
        text = Path(file_path).read_text(encoding="utf-8")
    except OSError:
        return report

    paragraphs = [p.strip() for p in re.split(r'\n\s*\n', text) if p.strip()]
    all_sentence_lengths = []
    paragraph_sentence_counts = []
    for para in paragraphs:
        sents = split_sentences(para)
        paragraph_sentence_counts.append(len(sents))
        for s in sents:
            wc = len(tokenize_words(s))
            if wc > 0:
                all_sentence_lengths.append(wc)

    report["sentence_lengths"] = all_sentence_lengths
    report["paragraph_sentence_counts"] = paragraph_sentence_counts

    # Also fix paragraph_count / sentence_count from actual text if available
    if paragraphs:
        report["paragraph_count"] = len(paragraphs)
    if all_sentence_lengths:
        report["sentence_count"] = len(all_sentence_lengths)

    return report


def run_scanner(file_path):
    """
    Run detect_ai_patterns.py on a file and return parsed JSON report.
    Falls back to inline import if subprocess fails.
    """
    file_path = str(file_path)

    if SCANNER_PATH.exists():
        try:
            result = subprocess.run(
                [sys.executable, str(SCANNER_PATH), file_path, "--format", "json"],
                capture_output=True,
                text=True,
                timeout=60,
            )
            if result.returncode == 0 and result.stdout.strip():
                report = adapt_report(json.loads(result.stdout))
                return _enrich_report_from_text(report, file_path)
            else:
                if result.stderr:
                    print(f"Warning: scanner stderr: {result.stderr.strip()}", file=sys.stderr)
        except (subprocess.TimeoutExpired, json.JSONDecodeError, OSError) as e:
            print(f"Warning: scanner failed ({e}), using inline analysis", file=sys.stderr)

    # Fallback: import and run inline
    sys.path.insert(0, str(SCRIPT_DIR))
    try:
        import detect_ai_patterns as scanner
        text = Path(file_path).read_text(encoding="utf-8")
        report = adapt_report(scanner.analyze(text))
        return _enrich_report_from_text(report, file_path)
    except (ImportError, AttributeError):
        print("Error: detect_ai_patterns.py not found and cannot import.", file=sys.stderr)
        sys.exit(1)


def split_sentences(text):
    """Split text into sentences."""
    cleaned = text
    for abbr in ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof.", "Sr.", "Jr.",
                  "vs.", "etc.", "i.e.", "e.g.", "U.S.", "U.K."]:
        cleaned = cleaned.replace(abbr, abbr.replace(".", "<<DOT>>"))
    parts = re.split(r'(?<=[.!?])\s+', cleaned)
    return [p.replace("<<DOT>>", ".").strip() for p in parts if p.strip()]


def tokenize_words(text):
    """Split text into lowercase word tokens."""
    return re.findall(r"[a-z'\-]+", text.lower())


def std_dev(values):
    """Population standard deviation."""
    if len(values) < 2:
        return 0.0
    mean = sum(values) / len(values)
    variance = sum((x - mean) ** 2 for x in values) / len(values)
    return math.sqrt(variance)


def pct_change(before, after):
    """Format percentage change as string."""
    if before == 0:
        if after == 0:
            return "0%"
        return "+inf%"
    diff = ((after - before) / before) * 100
    sign = "+" if diff >= 0 else ""
    return f"{sign}{diff:.1f}%"


def direction_arrow(before, after, lower_is_better=True):
    """Return a direction indicator for a metric change."""
    if before == after:
        return "="
    if lower_is_better:
        return "v (improved)" if after < before else "^ (worse)"
    else:
        return "^ (improved)" if after > before else "v (worse)"


# ---------------------------------------------------------------------------
# Section 1: Side-by-side metrics
# ---------------------------------------------------------------------------

def format_metrics_table(orig, hum):
    """Create a side-by-side metrics comparison table."""
    lines = []
    lines.append("## 1. Metrics Comparison")
    lines.append("")
    lines.append("| Metric | Original | Humanised | Change | Direction |")
    lines.append("|--------|----------|-----------|--------|-----------|")

    rows = [
        ("AI Density Score", orig.get("density_score", 0), hum.get("density_score", 0),
         True),
        ("Word Count", orig.get("word_count", 0), hum.get("word_count", 0),
         None),  # neutral
        ("Sentence Count", orig.get("sentence_count", 0), hum.get("sentence_count", 0),
         None),
        ("Paragraph Count", orig.get("paragraph_count", 1), hum.get("paragraph_count", 1),
         None),
        ("Avg Sentence Length", orig.get("avg_sentence_length", 0), hum.get("avg_sentence_length", 0),
         None),
        ("Sentence Length SD", orig.get("sentence_length_sd", 0), hum.get("sentence_length_sd", 0),
         False),  # higher is better
        ("Paragraph Length SD", orig.get("paragraph_length_sd", 0), hum.get("paragraph_length_sd", 0),
         False),  # higher is better
        ("Red Words", orig.get("red_word_total", 0), hum.get("red_word_total", 0),
         True),
        ("Yellow Words", orig.get("yellow_word_total", 0), hum.get("yellow_word_total", 0),
         True),
        ("The/This Openers", orig.get("the_this_opener_count", 0), hum.get("the_this_opener_count", 0),
         True),
        ("The/This Ratio", orig.get("the_this_opener_ratio", 0), hum.get("the_this_opener_ratio", 0),
         True),
        ("Tricolons", orig.get("tricolon_count", 0), hum.get("tricolon_count", 0),
         True),
        ("Neg. Parallelism", orig.get("negative_parallelism_count", 0), hum.get("negative_parallelism_count", 0),
         True),
        ("Trailing Gerunds", orig.get("trailing_gerund_count", 0), hum.get("trailing_gerund_count", 0),
         True),
        ("Formulaic Openings", len(orig.get("formulaic_openings", [])), len(hum.get("formulaic_openings", [])),
         True),
        ("Formulaic Closings", len(orig.get("formulaic_closings", [])), len(hum.get("formulaic_closings", [])),
         True),
        ("Sycophancy Phrases", len(orig.get("sycophancy", [])), len(hum.get("sycophancy", [])),
         True),
        ("Hedging Phrases", len(orig.get("hedging_phrases_list", [])), len(hum.get("hedging_phrases_list", [])),
         True),
        ("Significance Phrases", len(orig.get("significance_phrases", [])), len(hum.get("significance_phrases", [])),
         True),
    ]

    for name, before, after, lower_is_better in rows:
        change = pct_change(before, after)
        if lower_is_better is None:
            direction = "--"
        else:
            direction = direction_arrow(before, after, lower_is_better)
        # Format numbers
        if isinstance(before, float):
            before_str = f"{before:.2f}"
            after_str = f"{after:.2f}"
        else:
            before_str = str(before)
            after_str = str(after)
        lines.append(f"| {name} | {before_str} | {after_str} | {change} | {direction} |")

    return "\n".join(lines)


# ---------------------------------------------------------------------------
# Section 2: Words/phrases removed
# ---------------------------------------------------------------------------

def format_removed_words(orig, hum):
    """Show which flagged words were removed or remain."""
    lines = []
    lines.append("## 2. Flagged Words Removed")
    lines.append("")

    # Red words
    orig_red = orig.get("red_words", {})
    hum_red = hum.get("red_words", {})
    all_red_keys = sorted(set(list(orig_red.keys()) + list(hum_red.keys())))

    if all_red_keys:
        lines.append("### Red-Severity Words")
        lines.append("")
        lines.append("| Word | Original Count | Humanised Count | Status |")
        lines.append("|------|---------------|-----------------|--------|")
        for word in all_red_keys:
            before = orig_red.get(word, 0)
            after = hum_red.get(word, 0)
            if after == 0 and before > 0:
                status = "REMOVED"
            elif after < before:
                status = f"REDUCED (-{before - after})"
            elif after == before and after > 0:
                status = "UNCHANGED"
            elif after > before:
                status = f"INCREASED (+{after - before})"
            else:
                status = "NEW"
            lines.append(f"| {word} | {before} | {after} | {status} |")
        lines.append("")
    else:
        lines.append("### Red-Severity Words")
        lines.append("")
        lines.append("No red-severity words in either version.")
        lines.append("")

    # Yellow words
    orig_yellow = orig.get("yellow_words", {})
    hum_yellow = hum.get("yellow_words", {})
    all_yellow_keys = sorted(set(list(orig_yellow.keys()) + list(hum_yellow.keys())))

    if all_yellow_keys:
        lines.append("### Yellow-Severity Words")
        lines.append("")
        lines.append("| Word | Original Count | Humanised Count | Status |")
        lines.append("|------|---------------|-----------------|--------|")
        for word in all_yellow_keys:
            before = orig_yellow.get(word, 0)
            after = hum_yellow.get(word, 0)
            if after == 0 and before > 0:
                status = "REMOVED"
            elif after < before:
                status = f"REDUCED (-{before - after})"
            elif after == before and after > 0:
                status = "UNCHANGED"
            elif after > before:
                status = f"INCREASED (+{after - before})"
            else:
                status = "NEW"
            lines.append(f"| {word} | {before} | {after} | {status} |")
        lines.append("")
    else:
        lines.append("### Yellow-Severity Words")
        lines.append("")
        lines.append("No yellow-severity words in either version.")
        lines.append("")

    return "\n".join(lines)


# ---------------------------------------------------------------------------
# Section 3: Structural patterns removed
# ---------------------------------------------------------------------------

def format_structural_changes(orig, hum):
    """Show which structural patterns were removed."""
    lines = []
    lines.append("## 3. Structural Patterns Removed")
    lines.append("")

    pattern_groups = [
        ("Formulaic Openings", "formulaic_openings"),
        ("Formulaic Closings", "formulaic_closings"),
        ("Sycophancy Residue", "sycophancy"),
        ("Significance Phrases", "significance_phrases"),
        ("Hedging Phrases", "hedging_phrases_list"),
    ]

    for label, key in pattern_groups:
        orig_matches = orig.get(key, [])
        hum_matches = hum.get(key, [])
        orig_texts = {m["text"] for m in orig_matches}
        hum_texts = {m["text"] for m in hum_matches}
        removed = orig_texts - hum_texts
        remaining = orig_texts & hum_texts
        new = hum_texts - orig_texts

        lines.append(f"### {label}")
        lines.append("")
        if not orig_texts and not hum_texts:
            lines.append("None in either version.")
        else:
            if removed:
                lines.append(f"**Removed ({len(removed)}):**")
                for t in sorted(removed):
                    lines.append(f'- ~~"{t}"~~')
            if remaining:
                lines.append(f"**Still present ({len(remaining)}):**")
                for t in sorted(remaining):
                    lines.append(f'- "{t}"')
            if new:
                lines.append(f"**New in humanised ({len(new)}):**")
                for t in sorted(new):
                    lines.append(f'- "{t}"')
            if not removed and not remaining and not new:
                lines.append("None in either version.")
        lines.append("")

    # Tricolon / negative parallelism / trailing gerund examples
    lines.append("### Tricolons")
    lines.append("")
    orig_tri = orig.get("tricolon_count", 0)
    hum_tri = hum.get("tricolon_count", 0)
    lines.append(f"Original: {orig_tri} | Humanised: {hum_tri}")
    if orig.get("tricolon_examples"):
        lines.append("Original examples:")
        for ex in orig["tricolon_examples"][:5]:
            lines.append(f'- "{ex}"')
    if hum.get("tricolon_examples"):
        lines.append("Humanised examples:")
        for ex in hum["tricolon_examples"][:5]:
            lines.append(f'- "{ex}"')
    lines.append("")

    lines.append("### Negative Parallelism")
    lines.append("")
    orig_np = orig.get("negative_parallelism_count", 0)
    hum_np = hum.get("negative_parallelism_count", 0)
    lines.append(f"Original: {orig_np} | Humanised: {hum_np}")
    if orig.get("negative_parallelism_examples"):
        lines.append("Original examples:")
        for ex in orig["negative_parallelism_examples"][:5]:
            lines.append(f'- "{ex}"')
    if hum.get("negative_parallelism_examples"):
        lines.append("Humanised examples:")
        for ex in hum["negative_parallelism_examples"][:5]:
            lines.append(f'- "{ex}"')
    lines.append("")

    lines.append("### Trailing Gerunds (-ing clauses)")
    lines.append("")
    orig_tg = orig.get("trailing_gerund_count", 0)
    hum_tg = hum.get("trailing_gerund_count", 0)
    lines.append(f"Original: {orig_tg} | Humanised: {hum_tg}")
    if orig.get("trailing_gerund_examples"):
        lines.append("Original examples:")
        for ex in orig["trailing_gerund_examples"][:5]:
            lines.append(f'- "{ex}"')
    if hum.get("trailing_gerund_examples"):
        lines.append("Humanised examples:")
        for ex in hum["trailing_gerund_examples"][:5]:
            lines.append(f'- "{ex}"')
    lines.append("")

    return "\n".join(lines)


# ---------------------------------------------------------------------------
# Section 4: Sentence-by-sentence alignment
# ---------------------------------------------------------------------------

def format_sentence_alignment(orig_text, hum_text, max_pairs=20):
    """
    Align sentences between original and humanised and show the biggest changes.
    Uses SequenceMatcher for fuzzy alignment.
    """
    lines = []
    lines.append("## 4. Sentence-by-Sentence Alignment (Biggest Changes)")
    lines.append("")

    orig_sents = split_sentences(orig_text)
    hum_sents = split_sentences(hum_text)

    if not orig_sents or not hum_sents:
        lines.append("Insufficient sentences for alignment.")
        return "\n".join(lines)

    # Use SequenceMatcher to align sentences
    matcher = difflib.SequenceMatcher(None, orig_sents, hum_sents)

    pairs = []  # (orig_sent, hum_sent, similarity_ratio)

    for tag, i1, i2, j1, j2 in matcher.get_opcodes():
        if tag == "equal":
            for k in range(i2 - i1):
                pairs.append((orig_sents[i1 + k], hum_sents[j1 + k], 1.0))
        elif tag == "replace":
            # Pair up replacements
            orig_slice = orig_sents[i1:i2]
            hum_slice = hum_sents[j1:j2]
            for idx in range(max(len(orig_slice), len(hum_slice))):
                o = orig_slice[idx] if idx < len(orig_slice) else "(deleted)"
                h = hum_slice[idx] if idx < len(hum_slice) else "(added)"
                if o != "(deleted)" and h != "(added)":
                    ratio = difflib.SequenceMatcher(None, o, h).ratio()
                else:
                    ratio = 0.0
                pairs.append((o, h, ratio))
        elif tag == "delete":
            for k in range(i1, i2):
                pairs.append((orig_sents[k], "(deleted)", 0.0))
        elif tag == "insert":
            for k in range(j1, j2):
                pairs.append(("(added)", hum_sents[k], 0.0))

    # Sort by most changed (lowest similarity)
    changed_pairs = [(o, h, r) for o, h, r in pairs if r < 0.95]
    changed_pairs.sort(key=lambda x: x[2])

    if not changed_pairs:
        lines.append("No significant sentence-level changes detected.")
        return "\n".join(lines)

    lines.append(f"Showing top {min(max_pairs, len(changed_pairs))} most-changed sentences "
                 f"(of {len(changed_pairs)} changed):")
    lines.append("")

    for idx, (orig_sent, hum_sent, ratio) in enumerate(changed_pairs[:max_pairs]):
        similarity = f"{ratio:.0%}"
        lines.append(f"**Change {idx + 1}** (similarity: {similarity})")
        lines.append("")

        if orig_sent == "(added)":
            lines.append(f"> **Added:** {hum_sent[:200]}")
        elif hum_sent == "(deleted)":
            lines.append(f"> ~~**Removed:** {orig_sent[:200]}~~")
        else:
            lines.append(f"> **Before:** {orig_sent[:200]}")
            lines.append(">")
            lines.append(f"> **After:** {hum_sent[:200]}")

            # Show inline word-level diff for replaced sentences
            orig_words = orig_sent.split()
            hum_words = hum_sent.split()
            word_matcher = difflib.SequenceMatcher(None, orig_words, hum_words)
            diff_parts = []
            for wtag, wi1, wi2, wj1, wj2 in word_matcher.get_opcodes():
                if wtag == "equal":
                    diff_parts.append(" ".join(orig_words[wi1:wi2]))
                elif wtag == "replace":
                    removed = " ".join(orig_words[wi1:wi2])
                    added = " ".join(hum_words[wj1:wj2])
                    diff_parts.append(f"~~{removed}~~ **{added}**")
                elif wtag == "delete":
                    removed = " ".join(orig_words[wi1:wi2])
                    diff_parts.append(f"~~{removed}~~")
                elif wtag == "insert":
                    added = " ".join(hum_words[wj1:wj2])
                    diff_parts.append(f"**{added}**")
            if diff_parts:
                diff_line = " ".join(diff_parts)
                if len(diff_line) <= 500:
                    lines.append(">")
                    lines.append(f"> **Diff:** {diff_line}")

        lines.append("")

    return "\n".join(lines)


# ---------------------------------------------------------------------------
# Section 5: Summary statistics
# ---------------------------------------------------------------------------

def format_summary(orig, hum, orig_text, hum_text):
    """Summary statistics and overall assessment."""
    lines = []
    lines.append("## 5. Summary Statistics")
    lines.append("")

    # Calculate overall improvements
    density_before = orig.get("density_score", 0)
    density_after = hum.get("density_score", 0)
    density_reduction = density_before - density_after

    red_before = orig.get("red_word_total", 0)
    red_after = hum.get("red_word_total", 0)
    red_removed = red_before - red_after

    yellow_before = orig.get("yellow_word_total", 0)
    yellow_after = hum.get("yellow_word_total", 0)
    yellow_removed = yellow_before - yellow_after

    # Count unique words in each
    orig_words = set(tokenize_words(orig_text))
    hum_words = set(tokenize_words(hum_text))
    words_removed = orig_words - hum_words
    words_added = hum_words - orig_words

    lines.append("### Overall Change")
    lines.append("")
    lines.append(f"- **AI Density reduction:** {density_reduction:+.1f} points "
                 f"({density_before} -> {density_after})")
    lines.append(f"- **Red words removed:** {red_removed} "
                 f"({red_before} -> {red_after})")
    lines.append(f"- **Yellow words removed:** {yellow_removed} "
                 f"({yellow_before} -> {yellow_after})")
    lines.append(f"- **Unique words removed:** {len(words_removed)}")
    lines.append(f"- **Unique words added:** {len(words_added)}")
    lines.append(f"- **Sentence rhythm improvement:** "
                 f"SD {orig.get('sentence_length_sd', 0)} -> {hum.get('sentence_length_sd', 0)}")
    lines.append(f"- **Paragraph variation:** "
                 f"SD {orig.get('paragraph_length_sd', 0)} -> {hum.get('paragraph_length_sd', 0)}")
    lines.append("")

    # Sentence length distribution comparison
    lines.append("### Sentence Length Distribution")
    lines.append("")
    orig_lens = orig.get("sentence_lengths", [])
    hum_lens = hum.get("sentence_lengths", [])

    def bucket_distribution(lengths):
        if not lengths:
            return {}
        total = len(lengths)
        buckets = {
            "1-5 words": 0, "6-14 words": 0,
            "15-22 words": 0, "23+ words": 0,
        }
        for l in lengths:
            if l <= 5:
                buckets["1-5 words"] += 1
            elif l <= 14:
                buckets["6-14 words"] += 1
            elif l <= 22:
                buckets["15-22 words"] += 1
            else:
                buckets["23+ words"] += 1
        return {k: f"{v}/{total} ({v/total:.0%})" for k, v in buckets.items()}

    orig_dist = bucket_distribution(orig_lens)
    hum_dist = bucket_distribution(hum_lens)

    if orig_dist and hum_dist:
        lines.append("| Bucket | Original | Humanised |")
        lines.append("|--------|----------|-----------|")
        for bucket in ["1-5 words", "6-14 words", "15-22 words", "23+ words"]:
            lines.append(f"| {bucket} | {orig_dist.get(bucket, 'N/A')} | {hum_dist.get(bucket, 'N/A')} |")
        lines.append("")

    # Word count by paragraph
    orig_paras = orig.get("paragraph_sentence_counts", [])
    hum_paras = hum.get("paragraph_sentence_counts", [])

    if orig_paras and hum_paras:
        lines.append("### Paragraph Size Distribution (sentences per paragraph)")
        lines.append("")
        lines.append(f"- **Original:** {orig_paras}")
        lines.append(f"- **Humanised:** {hum_paras}")
        lines.append("")

    # Net vocabulary change (show interesting removals / additions)
    if words_removed or words_added:
        lines.append("### Notable Vocabulary Changes")
        lines.append("")
        if words_removed:
            # Show flagged words that were removed
            from_blacklist = sorted(w for w in words_removed
                                    if w in _get_all_flagged_words())
            if from_blacklist:
                lines.append(f"**Flagged words successfully removed:** "
                             f"{', '.join(from_blacklist[:30])}")
                lines.append("")
        if words_added:
            # Show any accidentally introduced flagged words
            new_flagged = sorted(w for w in words_added
                                 if w in _get_all_flagged_words())
            if new_flagged:
                lines.append(f"**Warning -- newly introduced flagged words:** "
                             f"{', '.join(new_flagged[:30])}")
                lines.append("")

    # Grade
    lines.append("### Assessment")
    lines.append("")
    if density_after == 0:
        grade = "A+"
        comment = "Clean. No detectable AI patterns."
    elif density_after < 5:
        grade = "A"
        comment = "Excellent. Minimal AI traces."
    elif density_after < 10:
        grade = "B+"
        comment = "Good. A few minor tells remain."
    elif density_after < 15:
        grade = "B"
        comment = "Acceptable. Some patterns persist but below detection threshold."
    elif density_after < 25:
        grade = "C"
        comment = "Needs work. Multiple patterns still detectable."
    elif density_after < 40:
        grade = "D"
        comment = "Poor. Substantial AI patterns remain."
    else:
        grade = "F"
        comment = "Fail. Text still reads as AI-generated."

    lines.append(f"**Grade: {grade}** -- {comment}")
    lines.append("")
    if density_reduction > 0:
        pct = (density_reduction / max(density_before, 1)) * 100
        lines.append(f"The humanisation pass reduced AI density by {pct:.0f}% "
                     f"({density_before} -> {density_after}).")
    elif density_reduction == 0:
        lines.append("No change in AI density. The humanisation pass had no measurable effect.")
    else:
        lines.append(f"Warning: AI density actually increased by "
                     f"{abs(density_reduction):.1f} points. Review the changes.")

    return "\n".join(lines)


def _get_all_flagged_words():
    """Return set of all flagged words (red and yellow). Lazy import."""
    sys.path.insert(0, str(SCRIPT_DIR))
    try:
        import detect_ai_patterns as scanner
        # FLAGGED_WORDS is a dict {word: severity}
        return set(scanner.FLAGGED_WORDS.keys())
    except (ImportError, AttributeError):
        return set()


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(
        description="Compare original and humanised text with a detailed diff report.",
        epilog=(
            "Produces a readable markdown report showing metrics, removed words,\n"
            "structural changes, sentence alignment, and summary statistics."
        ),
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )

    # Positional args
    parser.add_argument("positional", nargs="*",
                        help="Original and humanised text files (positional)")

    # Named flags
    parser.add_argument("--original", "-o", help="Path to original text file")
    parser.add_argument("--humanised", "--humanized", "-u",
                        help="Path to humanised text file")
    parser.add_argument("--output", "-O", help="Write report to file instead of stdout")
    parser.add_argument("--max-pairs", type=int, default=20,
                        help="Max sentence pairs to show in alignment (default: 20)")

    args = parser.parse_args()

    # Resolve file paths
    orig_path = None
    hum_path = None

    if args.original and args.humanised:
        orig_path = args.original
        hum_path = args.humanised
    elif len(args.positional) == 2:
        orig_path = args.positional[0]
        hum_path = args.positional[1]
    elif len(args.positional) == 1 and args.original:
        orig_path = args.original
        hum_path = args.positional[0]
    elif len(args.positional) == 1 and args.humanised:
        orig_path = args.positional[0]
        hum_path = args.humanised
    else:
        parser.error("Provide two files: original and humanised text.\n"
                     "  Usage: compare_texts.py original.txt humanised.txt\n"
                     "     or: compare_texts.py --original orig.txt --humanised hum.txt")

    # Validate files exist
    for label, path in [("original", orig_path), ("humanised", hum_path)]:
        if not Path(path).exists():
            print(f"Error: {label} file not found: {path}", file=sys.stderr)
            sys.exit(1)

    # Read raw text
    orig_text = Path(orig_path).read_text(encoding="utf-8")
    hum_text = Path(hum_path).read_text(encoding="utf-8")

    if not orig_text.strip():
        print("Error: original text is empty", file=sys.stderr)
        sys.exit(1)
    if not hum_text.strip():
        print("Error: humanised text is empty", file=sys.stderr)
        sys.exit(1)

    # Run scanner on both
    orig_report = run_scanner(orig_path)
    hum_report = run_scanner(hum_path)

    # Build report
    sections = []

    # Header
    sections.append("# Text Comparison Report")
    sections.append("")
    sections.append(f"**Original:** `{orig_path}`")
    sections.append(f"**Humanised:** `{hum_path}`")
    sections.append("")
    sections.append("---")
    sections.append("")

    # Section 1: Metrics
    sections.append(format_metrics_table(orig_report, hum_report))
    sections.append("")
    sections.append("---")
    sections.append("")

    # Section 2: Removed words
    sections.append(format_removed_words(orig_report, hum_report))
    sections.append("---")
    sections.append("")

    # Section 3: Structural patterns
    sections.append(format_structural_changes(orig_report, hum_report))
    sections.append("---")
    sections.append("")

    # Section 4: Sentence alignment
    sections.append(format_sentence_alignment(orig_text, hum_text, max_pairs=args.max_pairs))
    sections.append("---")
    sections.append("")

    # Section 5: Summary
    sections.append(format_summary(orig_report, hum_report, orig_text, hum_text))

    report = "\n".join(sections)

    # Output
    if args.output:
        Path(args.output).write_text(report, encoding="utf-8")
        print(f"Report written to {args.output}", file=sys.stderr)
    else:
        print(report)


if __name__ == "__main__":
    main()
