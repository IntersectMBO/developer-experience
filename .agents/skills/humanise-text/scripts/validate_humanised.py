#!/usr/bin/env python3
"""
validate_humanised.py - Validate that humanised text passes quality checks.

Runs the detect_ai_patterns.py scanner on both original and humanised text,
then applies thresholds to determine pass/fail.

Usage:
    python validate_humanised.py original.txt humanised.txt
    python validate_humanised.py --original original.txt --humanised humanised.txt
    python validate_humanised.py original.txt humanised.txt --strict
    python validate_humanised.py original.txt humanised.txt --lenient

Modes:
    default:  AI density < 15, zero red words, sentence SD > 5
    --strict: AI density < 10, zero red + zero yellow words, sentence SD > 6
    --lenient: AI density < 25, max 2 red words, sentence SD > 4
"""

import argparse
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
    """
    Adapt the nested JSON from detect_ai_patterns.py into the flat
    format expected by the validation checks.
    """
    # If already in flat format, return as-is
    if "density_score" in raw:
        return raw

    report = {}
    report["density_score"] = raw.get("ai_density_score", 0)
    report["word_count"] = raw.get("word_count", 0)

    # Flatten flagged words
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

    # Rhythm
    rhythm = raw.get("rhythm_analysis", {})
    report["sentence_length_sd"] = round(rhythm.get("sentence_length_std_dev", 0), 1)
    report["paragraph_length_sd"] = round(rhythm.get("paragraph_length_std_dev", 0), 1)
    report["the_this_opener_ratio"] = rhythm.get("sentences_starting_with_the_pct", 0) / 100.0
    # Estimate sentence count from word count / avg sentence length
    avg_sl = rhythm.get("avg_sentence_length", 15)
    wc = report["word_count"]
    sc = max(1, round(wc / avg_sl)) if avg_sl > 0 else max(1, wc // 15)
    report["sentence_count"] = sc
    report["the_this_opener_count"] = round(report["the_this_opener_ratio"] * sc)

    # Structural patterns
    sp = raw.get("structural_patterns", {})
    report["tricolon_count"] = sp.get("rule_of_three", {}).get("count", 0)
    report["tricolon_examples"] = sp.get("rule_of_three", {}).get("examples", [])
    report["negative_parallelism_count"] = sp.get("negative_parallelism", {}).get("count", 0)
    report["negative_parallelism_examples"] = sp.get("negative_parallelism", {}).get("examples", [])
    report["trailing_gerund_count"] = sp.get("trailing_ing_clauses", {}).get("count", 0)

    # Formulaic patterns - extract from flagged_phrases or structural_patterns
    fp = raw.get("flagged_phrases", [])
    formulaic_openings = []
    formulaic_closings = []
    sycophancy = []
    if isinstance(fp, list):
        for item in fp:
            cat = item.get("category", "").lower()
            if "opening" in cat or "throat" in cat:
                formulaic_openings.append({"text": item.get("phrase", item.get("text", ""))})
            elif "closing" in cat or "conclusion" in cat:
                formulaic_closings.append({"text": item.get("phrase", item.get("text", ""))})
            elif "sycophancy" in cat or "chatbot" in cat:
                sycophancy.append({"text": item.get("phrase", item.get("text", ""))})
    elif isinstance(fp, dict):
        for cat, items in fp.items():
            if not isinstance(items, list):
                continue
            cat_lower = cat.lower()
            for item in items:
                text = item if isinstance(item, str) else item.get("phrase", item.get("text", ""))
                if "opening" in cat_lower:
                    formulaic_openings.append({"text": text})
                elif "closing" in cat_lower:
                    formulaic_closings.append({"text": text})
                elif "sycophancy" in cat_lower:
                    sycophancy.append({"text": text})

    # Also check structural_patterns for these
    fo_sp = sp.get("formulaic_openings", [])
    fc_sp = sp.get("formulaic_closings", [])
    sy_sp = sp.get("sycophancy_residue", [])
    if fo_sp and isinstance(fo_sp, list):
        for item in fo_sp:
            text = item if isinstance(item, str) else str(item)
            if not any(o["text"] == text for o in formulaic_openings):
                formulaic_openings.append({"text": text})
    if fc_sp and isinstance(fc_sp, list):
        for item in fc_sp:
            text = item if isinstance(item, str) else str(item)
            if not any(o["text"] == text for o in formulaic_closings):
                formulaic_closings.append({"text": text})
    if sy_sp and isinstance(sy_sp, list):
        for item in sy_sp:
            text = item if isinstance(item, str) else str(item)
            if not any(o["text"] == text for o in sycophancy):
                sycophancy.append({"text": text})

    report["formulaic_openings"] = formulaic_openings
    report["formulaic_closings"] = formulaic_closings
    report["sycophancy"] = sycophancy

    return report


def run_scanner(file_path):
    """
    Run detect_ai_patterns.py on a file and return parsed JSON report.
    Falls back to inline analysis if the scanner is unavailable.
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
                raw = json.loads(result.stdout)
                return adapt_report(raw)
            else:
                print(f"Warning: scanner returned non-zero or empty output for {file_path}",
                      file=sys.stderr)
                if result.stderr:
                    print(f"  stderr: {result.stderr.strip()}", file=sys.stderr)
        except (subprocess.TimeoutExpired, json.JSONDecodeError, OSError) as e:
            print(f"Warning: scanner failed ({e}), using inline analysis", file=sys.stderr)

    # Fallback: import and run inline
    sys.path.insert(0, str(SCRIPT_DIR))
    try:
        import detect_ai_patterns as scanner
        text = Path(file_path).read_text(encoding="utf-8")
        raw = scanner.analyze_text(text)
        return adapt_report(raw)
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


def std_dev(values):
    """Population standard deviation."""
    if len(values) < 2:
        return 0.0
    mean = sum(values) / len(values)
    variance = sum((x - mean) ** 2 for x in values) / len(values)
    return math.sqrt(variance)


# ---------------------------------------------------------------------------
# Validation checks
# ---------------------------------------------------------------------------

class CheckResult:
    """Result of a single validation check."""
    def __init__(self, name, passed, details, severity="normal"):
        self.name = name
        self.passed = passed
        self.details = details
        self.severity = severity  # "normal" or "critical"

    def __str__(self):
        status = "PASS" if self.passed else "FAIL"
        return f"  [{status}] {self.name}: {self.details}"


def check_density(orig_report, hum_report, threshold):
    """Check 1: AI density score below threshold."""
    before = orig_report["density_score"]
    after = hum_report["density_score"]
    passed = after < threshold
    details = f"before={before} -> after={after} (threshold <{threshold})"
    return CheckResult("AI Density", passed, details, severity="critical")


def check_red_words(hum_report, max_allowed):
    """Check 2: Red-severity words within limit."""
    total = hum_report["red_word_total"]
    passed = total <= max_allowed
    words_detail = ""
    if hum_report["red_words"]:
        items = sorted(hum_report["red_words"].items(), key=lambda x: -x[1])
        words_detail = " [" + ", ".join(f"{w}({c})" for w, c in items[:10]) + "]"
    details = f"{total} red words found (max allowed: {max_allowed}){words_detail}"
    return CheckResult("Red Words", passed, details, severity="critical")


def check_yellow_words(hum_report, max_allowed):
    """Check for strict mode: yellow words within limit."""
    total = hum_report["yellow_word_total"]
    passed = total <= max_allowed
    words_detail = ""
    if hum_report["yellow_words"]:
        items = sorted(hum_report["yellow_words"].items(), key=lambda x: -x[1])
        words_detail = " [" + ", ".join(f"{w}({c})" for w, c in items[:10]) + "]"
    details = f"{total} yellow words found (max allowed: {max_allowed}){words_detail}"
    return CheckResult("Yellow Words", passed, details)


def check_sentence_rhythm(orig_report, hum_report, threshold):
    """Check 3: Sentence length SD above threshold."""
    before = orig_report["sentence_length_sd"]
    after = hum_report["sentence_length_sd"]
    passed = after > threshold
    details = f"before={before} -> after={after} (threshold >{threshold})"
    return CheckResult("Rhythm SD", passed, details)


def check_paragraph_variation(orig_report, hum_report, threshold):
    """Check 4: Paragraph length SD above threshold."""
    before = orig_report["paragraph_length_sd"]
    after = hum_report["paragraph_length_sd"]
    passed = after > threshold
    details = f"before={before} -> after={after} (threshold >{threshold})"
    return CheckResult("Paragraph SD", passed, details)


def check_word_count(orig_report, hum_report, tolerance):
    """Check 5: Word count within tolerance of original."""
    before = orig_report["word_count"]
    after = hum_report["word_count"]
    if before == 0:
        passed = True
        details = "original has 0 words (skipped)"
    else:
        ratio = after / before
        diff_pct = abs(ratio - 1.0) * 100
        passed = diff_pct <= tolerance
        details = f"before={before} -> after={after} ({diff_pct:.1f}% diff, tolerance {tolerance}%)"
    return CheckResult("Word Count", passed, details)


def check_the_this_openers(hum_report, max_ratio):
    """Check 6: No more than max_ratio of sentences start with The/This."""
    ratio = hum_report["the_this_opener_ratio"]
    count = hum_report["the_this_opener_count"]
    total = hum_report["sentence_count"]
    passed = ratio <= max_ratio
    details = f"{count}/{total} sentences ({ratio:.1%}) start with The/This (max {max_ratio:.0%})"
    return CheckResult("The/This Openers", passed, details)


def check_formulaic_openings(hum_report):
    """Check 7: No formulaic openings remain."""
    matches = hum_report["formulaic_openings"]
    passed = len(matches) == 0
    details_parts = []
    if matches:
        for m in matches[:5]:
            details_parts.append(f'"{m["text"]}"')
        details = f"{len(matches)} found: {', '.join(details_parts)}"
    else:
        details = "none found"
    return CheckResult("Formulaic Openings", passed, details)


def check_formulaic_closings(hum_report):
    """Check 7b: No formulaic closings remain."""
    matches = hum_report["formulaic_closings"]
    passed = len(matches) == 0
    details_parts = []
    if matches:
        for m in matches[:5]:
            details_parts.append(f'"{m["text"]}"')
        details = f"{len(matches)} found: {', '.join(details_parts)}"
    else:
        details = "none found"
    return CheckResult("Formulaic Closings", passed, details)


def check_sycophancy(hum_report):
    """Check 8: No sycophancy residue remains."""
    matches = hum_report["sycophancy"]
    passed = len(matches) == 0
    if matches:
        examples = [f'"{m["text"]}"' for m in matches[:5]]
        details = f"{len(matches)} found: {', '.join(examples)}"
    else:
        details = "none found"
    return CheckResult("Sycophancy", passed, details)


def check_tricolons(hum_report, max_allowed):
    """Check 9: No more than max_allowed tricolons."""
    count = hum_report["tricolon_count"]
    passed = count <= max_allowed
    details = f"{count} tricolons found (max allowed: {max_allowed})"
    if hum_report.get("tricolon_examples"):
        details += " [" + "; ".join(hum_report["tricolon_examples"][:3]) + "]"
    return CheckResult("Tricolons", passed, details)


def check_negative_parallelism(hum_report, max_allowed):
    """Check 10: No more than max_allowed negative parallelism constructions."""
    count = hum_report["negative_parallelism_count"]
    passed = count <= max_allowed
    details = f"{count} found (max allowed: {max_allowed})"
    if hum_report.get("negative_parallelism_examples"):
        details += " [" + "; ".join(hum_report["negative_parallelism_examples"][:3]) + "]"
    return CheckResult("Neg. Parallelism", passed, details)


def check_trailing_gerunds(orig_report, hum_report):
    """Check 11: Fewer trailing -ing clauses than the original."""
    before = orig_report["trailing_gerund_count"]
    after = hum_report["trailing_gerund_count"]
    passed = after < before or (before == 0 and after == 0)
    details = f"before={before} -> after={after}"
    if not passed and before == after:
        details += " (must be fewer than original)"
    return CheckResult("Trailing Gerunds", passed, details)


# ---------------------------------------------------------------------------
# Main validation
# ---------------------------------------------------------------------------

def run_validation(orig_path, hum_path, mode="default"):
    """
    Run all validation checks. Returns (overall_pass, results_list).

    Modes:
        default: density < 15, zero red, SD > 5
        strict:  density < 10, zero red + zero yellow, SD > 6
        lenient: density < 25, max 2 red, SD > 4
    """
    orig_report = run_scanner(orig_path)
    hum_report = run_scanner(hum_path)

    # Set thresholds based on mode
    if mode == "strict":
        density_threshold = 10
        red_max = 0
        yellow_max = 0
        sentence_sd_threshold = 6
        para_sd_threshold = 1.5
        word_count_tolerance = 25
        the_this_max_ratio = 0.15
        tricolon_max = 1
        neg_par_max = 1
    elif mode == "lenient":
        density_threshold = 25
        red_max = 2
        yellow_max = 999  # no limit
        sentence_sd_threshold = 4
        para_sd_threshold = 0.5
        word_count_tolerance = 30
        the_this_max_ratio = 0.25
        tricolon_max = 3
        neg_par_max = 3
    else:  # default
        density_threshold = 15
        red_max = 0
        yellow_max = 999  # no limit in default mode
        sentence_sd_threshold = 5
        para_sd_threshold = 1
        word_count_tolerance = 25
        the_this_max_ratio = 0.20
        tricolon_max = 2
        neg_par_max = 2

    results = []

    # Run all checks
    results.append(check_density(orig_report, hum_report, density_threshold))
    results.append(check_red_words(hum_report, red_max))

    if mode == "strict":
        results.append(check_yellow_words(hum_report, yellow_max))

    results.append(check_sentence_rhythm(orig_report, hum_report, sentence_sd_threshold))
    results.append(check_paragraph_variation(orig_report, hum_report, para_sd_threshold))
    results.append(check_word_count(orig_report, hum_report, word_count_tolerance))
    results.append(check_the_this_openers(hum_report, the_this_max_ratio))
    results.append(check_formulaic_openings(hum_report))
    results.append(check_formulaic_closings(hum_report))
    results.append(check_sycophancy(hum_report))
    results.append(check_tricolons(hum_report, tricolon_max))
    results.append(check_negative_parallelism(hum_report, neg_par_max))
    results.append(check_trailing_gerunds(orig_report, hum_report))

    overall = all(r.passed for r in results)

    return overall, results, orig_report, hum_report


def format_report(overall, results, orig_report, hum_report, mode):
    """Format the validation report."""
    lines = []
    lines.append("VALIDATION REPORT")
    lines.append("=================")
    mode_label = mode.upper() if mode != "default" else "DEFAULT"
    lines.append(f"Mode: {mode_label}")
    lines.append(f"Overall: {'PASS' if overall else 'FAIL'}")
    lines.append("")

    # Individual checks
    for r in results:
        lines.append(str(r))

    lines.append("")
    lines.append("--- Summary Metrics ---")
    lines.append("")
    lines.append(f"AI Density:  before={orig_report['density_score']} -> after={hum_report['density_score']}"
                 f" ({'PASS' if hum_report['density_score'] < orig_report['density_score'] else 'SAME/WORSE'})")
    lines.append(f"Word Count:  before={orig_report['word_count']} -> after={hum_report['word_count']}"
                 f" ({_pct_diff(orig_report['word_count'], hum_report['word_count'])})")
    lines.append(f"Rhythm SD:   before={orig_report['sentence_length_sd']} -> after={hum_report['sentence_length_sd']}")
    lines.append(f"Para SD:     before={orig_report['paragraph_length_sd']} -> after={hum_report['paragraph_length_sd']}")
    lines.append(f"Red words:   before={orig_report['red_word_total']} -> after={hum_report['red_word_total']}")
    lines.append(f"Yellow words: before={orig_report['yellow_word_total']} -> after={hum_report['yellow_word_total']}")
    lines.append(f"Tricolons:   before={orig_report['tricolon_count']} -> after={hum_report['tricolon_count']}")
    lines.append(f"Neg. par.:   before={orig_report['negative_parallelism_count']} -> after={hum_report['negative_parallelism_count']}")
    lines.append(f"Gerunds:     before={orig_report['trailing_gerund_count']} -> after={hum_report['trailing_gerund_count']}")

    fail_count = sum(1 for r in results if not r.passed)
    pass_count = sum(1 for r in results if r.passed)
    lines.append("")
    lines.append(f"Checks: {pass_count} passed, {fail_count} failed, {len(results)} total")

    return "\n".join(lines)


def _pct_diff(before, after):
    """Format percentage difference."""
    if before == 0:
        return "N/A"
    diff = ((after - before) / before) * 100
    sign = "+" if diff >= 0 else ""
    return f"{sign}{diff:.1f}%"


def main():
    parser = argparse.ArgumentParser(
        description="Validate that humanised text passes AI-detection quality checks.",
        epilog=(
            "Runs detect_ai_patterns.py on both files and applies thresholds.\n\n"
            "Modes:\n"
            "  default:  AI density < 15, zero red words, sentence SD > 5\n"
            "  --strict: AI density < 10, zero red + yellow words, SD > 6\n"
            "  --lenient: AI density < 25, max 2 red words, SD > 4"
        ),
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )

    # Positional args (optional if flags are used)
    parser.add_argument("positional", nargs="*",
                        help="Original and humanised text files (positional)")

    # Named flags
    parser.add_argument("--original", "-o", help="Path to original text file")
    parser.add_argument("--humanised", "--humanized", "-u",
                        help="Path to humanised text file")

    # Mode flags (mutually exclusive)
    mode_group = parser.add_mutually_exclusive_group()
    mode_group.add_argument("--strict", action="store_true",
                            help="Strict mode: density < 10, zero yellow words")
    mode_group.add_argument("--lenient", action="store_true",
                            help="Lenient mode: density < 25, 2 red words allowed")

    # Output format
    parser.add_argument("--json", action="store_true",
                        help="Output results as JSON")

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
                     "  Usage: validate_humanised.py original.txt humanised.txt\n"
                     "     or: validate_humanised.py --original orig.txt --humanised hum.txt")

    # Validate files exist
    for label, path in [("original", orig_path), ("humanised", hum_path)]:
        if not Path(path).exists():
            print(f"Error: {label} file not found: {path}", file=sys.stderr)
            sys.exit(1)

    # Determine mode
    if args.strict:
        mode = "strict"
    elif args.lenient:
        mode = "lenient"
    else:
        mode = "default"

    # Run validation
    overall, results, orig_report, hum_report = run_validation(orig_path, hum_path, mode)

    if args.json:
        output = {
            "overall": "PASS" if overall else "FAIL",
            "mode": mode,
            "checks": [
                {
                    "name": r.name,
                    "passed": r.passed,
                    "details": r.details,
                    "severity": r.severity,
                }
                for r in results
            ],
            "original_density": orig_report["density_score"],
            "humanised_density": hum_report["density_score"],
            "original_word_count": orig_report["word_count"],
            "humanised_word_count": hum_report["word_count"],
            "original_sentence_sd": orig_report["sentence_length_sd"],
            "humanised_sentence_sd": hum_report["sentence_length_sd"],
        }
        print(json.dumps(output, indent=2, ensure_ascii=False))
    else:
        print(format_report(overall, results, orig_report, hum_report, mode))

    # Exit code: 0 = PASS, 1 = FAIL
    sys.exit(0 if overall else 1)


if __name__ == "__main__":
    main()
