# Structural Tells: Patterns That Betray AI Authorship

This file covers sentence-level, paragraph-level, punctuation, and document-level patterns that AI detection tools and human editors flag. Each pattern includes detection heuristics with specific thresholds.

---

## 1. Sentence-Level Patterns

### 1A. Negative Parallelism ("Not X, But Y")

The single most distinctive AI sentence pattern. AI constantly frames ideas as negation-then-correction.

**Structures to detect:**
- "It's not just X. It's Y."
- "It's not just about the beat; it's part of the aggression."
- "Not because X. But because Y."
- "Not with a textbook. Not with a treaty."
- "No X. No Y. Just Z."
- "We're not just building a product, we're creating an experience."
- "AI doesn't eliminate labor; it redistributes it."
- "This isn't a retreat from technology; it's an evolution enabled by it."
- "X is more than just Y; it's Z."
- "Not performative updates -- but real transparency."
- "It isn't just unaccountability, it isn't just risk -- it's treason."

**Detection heuristic:** Search for "not just," "not only," "not merely," "isn't just," "more than just." If 3+ appear in a piece, strong AI signal.

**Fix:** State the positive claim directly. "We're creating an experience" is stronger than "We're not just building a product, we're creating an experience." Cut the negation setup.

### 1B. Ascending Tricolon (Rule of Three)

AI forces ideas into groups of three with increasing length or intensity. Human writers use tricolon selectively and sparingly; AI uses it compulsively.

**Examples:**
- "I honed my skills in coding, collaboration, and problem-solving."
- "My love for biology grew from fascination to passion to purpose."
- "I have learned to persevere in the face of challenges, to embrace new opportunities, and to lead with empathy and conviction."
- "authority, clarity, and inoffensiveness"
- "impersonal, authoritative, and homogenized"

**Detection heuristic:** 4+ tricolons in a single piece is a near-certain AI tell. Count comma-separated groups of three, especially those with ascending word counts.

**Fix:** Break the triad. Use two items. Use four. Use one with elaboration. Anything but the rhythmically ascending three.

### 1C. Trailing Participial Phrases ("X, -ing Y")

AI appends present participle clauses to the end of sentences at 2-5x the human rate.

**Examples:**
- "The company expanded its operations, **creating** thousands of new jobs."
- "The study analyzed the data, **revealing** key insights."
- "The reform was passed in 2019, **marking** a significant shift."
- "The building was renovated, **transforming** the local area."
- "He published the paper, **highlighting** the need for further research."

**Telltale trailing gerunds (near-exclusively AI):**
ensuring, highlighting, emphasizing, reflecting, symbolizing, showcasing, underscoring, demonstrating, representing, fostering, paving the way for, setting the stage for

**Detection heuristic:** 5+ trailing "-ing" phrases in a piece is a strong AI signal.

**Fix:** Make the trailing clause its own sentence. Or reverse the order: put the -ing clause first. Or rewrite entirely with two separate actions.

Before: "The team released the update, addressing several bugs."
After: "The team released the update. It fixed three bugs in the authentication flow."

### 1D. "From X to Y" False Ranges

AI creates artificial spans that sound impressive but add no information.

**Examples:**
- "From bustling cities to serene landscapes..."
- "From beginners to experts..."
- "From ancient traditions to modern innovations..."
- "From small startups to global enterprises..."

**Detection heuristic:** 2+ "from X to Y" constructions in a piece, especially with contrasting adjectives (bustling/serene, ancient/modern, small/global).

**Fix:** Name specific items instead. "From beginners to experts" becomes "Beginners and veteran developers both used it."

### 1E. Correlative Conjunction Overuse

- "Not only [X] but also [Y]..."
- "Whether [X] or [Y]..."
- "Both [X] and [Y]..."
- "Either [X] or [Y]..."

Human writers use these occasionally. AI uses them systematically, often multiple times per paragraph.

**Detection heuristic:** 3+ correlative pairs in a piece is an AI signal. "Not only...but also" appearing more than once is a strong signal.

**Fix:** Replace with simple coordination. "Not only did they redesign the UI but also improved performance" becomes "They redesigned the UI and improved performance."

### 1F. The Equivocation Seesaw

Balanced hedging that says nothing definitive. The writer takes both sides without committing.

**Examples:**
- "While X has many benefits, it is important to note that Y..."
- "On the one hand, [X]. On the other hand, [Y]."
- "Although [X] presents challenges, it also offers opportunities."

**Detection heuristic:** Look for paired concession-and-counter structures. If every paragraph contains "while/although [positive], [negative]" or vice versa, it reads as AI fence-sitting.

**Fix:** Commit to a position. State what you actually think. "The interface is better. The onboarding is still confusing." Not "While the interface has been improved, challenges remain in the onboarding experience."

### 1G. Uniform Sentence Length

AI averages 15-25 words per sentence with remarkably low variance (SD of 2-3 words). Human writing has "burstiness" -- short punchy fragments mixed with long complex sentences.

**Detection heuristic:**
- Calculate standard deviation of sentence lengths in a paragraph.
- AI text: SD < 4 words (metronome rhythm)
- Human text: SD > 6 words (varied rhythm)
- If every sentence in a paragraph falls between 14 and 22 words, it reads as AI.

**Fix:** See the rewrite_principles.md file for the 1-1-3 rhythm and distribution targets.

### 1H. Synonym Cycling / "Elegant Variation"

AI's repetition-penalty causes it to cycle through synonyms unnaturally.

**Example pattern:**
- First mention: "the protagonist"
- Second mention: "the main character"
- Third mention: "the central figure"
- Fourth mention: "the hero"
- Fifth mention: "the key player"
- Sixth mention: "the eponymous character"

**Detection heuristic:** If a text refers to the same entity using 4+ different terms across a passage, and none of those terms adds information (they're pure synonyms), it signals AI synonym cycling.

**Fix:** Human writers pick one or two terms and stick with them. Repeat the same word. Repetition is natural. Forced variation is not.

---

## 2. Paragraph-Level Patterns

### 2A. Formulaic Paragraph Structure

Every AI paragraph follows the same template:
1. Topic sentence (states the point)
2. Supporting evidence or elaboration (1-3 sentences)
3. Summary/transition sentence (restates the point and links to next paragraph)

**Detection heuristic:** Read the first and last sentence of every paragraph. If the last sentence is a restatement or summary of the first, it follows the AI template. If 3+ consecutive paragraphs exhibit this, strong AI signal.

**Fix:** Human paragraphs vary wildly: some are one sentence, some are ten. Some start with evidence and end abruptly. Some build to a conclusion. Some are pure description. No two should have the same internal architecture.

### 2B. Uniform Paragraph Length

AI generates paragraphs of remarkably similar length (typically 3-5 sentences each). The visual rhythm on the page is symmetrical.

**Detection heuristic:** Count sentences per paragraph across the document. If the range is narrow (e.g., all paragraphs have 3-5 sentences), it reads as AI. Human writing has one-sentence paragraphs mixed with dense eight-sentence paragraphs.

**Fix:** Vary deliberately. Let content dictate length. A sharp point deserves one sentence alone. A complex argument might need eight.

### 2C. List-Heavy Defaults

AI defaults to:
- Bullet points for everything
- Numbered lists for sequences
- **Bold-header:** description pattern for categories
- Inline-header lists ("**Category Name:** Description text")

**Detection heuristic:** The "**Bold term:** Explanation" format appearing in running prose (not in reference material or documentation) is "almost exclusively AI-generated." Count bullet points: if a prose piece has more than 2 bulleted lists, it likely started as AI output.

**Fix:** Convert lists back to flowing paragraphs. Use sentence-embedded enumeration: "Three things mattered: the cost, the timing, and the public backlash."

### 2D. Excessive Subheadings

AI applies formulaic headings like:
- "Understanding [X]"
- "The Importance of [Y]"
- "Key Benefits of [Z]"
- "Challenges and Future Prospects"
- "Conclusion"

**Detection heuristic:** If subheadings follow a predictable pattern (Understanding/Importance/Benefits/Challenges/Conclusion), they are AI-generated. Also check if every 2-3 paragraphs gets a subheading -- human writers use fewer and less regular subheadings.

**Fix:** Cut half the subheadings. Rename the rest to be specific: "Understanding Machine Learning" becomes "How the Model Classifies Tumors." Make headings do work.

### 2E. Meta-Commentary

AI narrates its own structure, telling the reader what is about to happen.

**Examples:**
- "In this section, we will..."
- "As mentioned earlier..."
- "Now that we've explored X..."
- "Let's now turn to..."
- "Before we proceed..."

**Detection heuristic:** 3+ meta-commentary phrases in a piece is an AI signal. Any phrase that describes the document's structure rather than advancing the content is meta-commentary.

**Fix:** Delete all meta-commentary. Just proceed to the next point. The reader does not need a table of contents for each paragraph.

### 2F. The Treadmill Effect

Text hovers over the same ideas without advancing. The reader feels motion but makes no progress. Autoregressive models know the next word but not the destination.

**Detection heuristic:** Read three consecutive paragraphs. If you can summarize all three with the same one-sentence summary, the text is on a treadmill. Each paragraph should contain at least one idea not present in the others.

**Fix:** After drafting, write a one-line summary of each paragraph. If two summaries are the same, merge or cut one.

### 2G. Length Over Substance

AI pads text with restatements and unnecessary context. 2,500 words conveying what should take 500. It optimizes for "thoroughness" rather than communication.

**Detection heuristic:** Ask: "What would a reader learn from this that they couldn't get from the first Google result?" If nothing, the piece needs a specific angle, detail, or experience. Also: count how many times the main point is restated.

**Fix:** Cut 30-50% on revision. Every sentence must earn its place.

---

## 3. Punctuation & Formatting

### 3A. Em Dash Overuse

AI uses em dashes (--) where humans would use commas, parentheses, or colons. AI training data included 19th/early 20th century books that used ~30% more em dashes than contemporary prose.

**AI em dash patterns:**
- Dramatic reveals: "The answer -- surprisingly -- was no."
- Parenthetical asides (where humans use parentheses)
- List introductions (where humans use colons)
- Emphasis (where humans use commas)

**Detection heuristic:** 3+ em dashes per paragraph is a strong AI signal. Count across the whole piece: more than 1 em dash per 100 words is elevated.

**Fix:** Replace most em dashes with commas, parentheses, or periods. Keep at most 1-2 per page for genuine dramatic effect.

### 3B. Excessive Boldface

AI bolds key terms, product names, and section markers mechanically throughout running prose.

**Detection heuristic:** Bold text appearing in the middle of paragraphs to highlight "key concepts" (not headings, not UI labels) is an AI formatting pattern. More than 3 bold phrases per page of prose is a signal.

**Fix:** Remove all bold from running prose. Bold is for headings and UI elements, not for emphasis in paragraphs. Use sentence structure for emphasis instead.

### 3C. Excessive Colons

AI often begins paragraphs with a statement followed by a colon, then leaps into a list or explanation.

**Detection heuristic:** 10+ colons in a normal prose piece (not counting headings) is a strong AI signal. Count them.

**Fix:** Replace most colons with periods or dashes. Use colons only for true list introductions or punchlines: "The result was clear: failure."

### 3D. Title Case Headings

AI capitalizes "All Main Words In Section Headings" (title case). Human writers in most contemporary contexts use sentence case ("All main words in section headings").

**Detection heuristic:** If all headings in a piece use title case, check for other AI signals. Title case alone is not conclusive but correlates.

**Fix:** Use sentence case for all headings unless house style specifically requires title case.

### 3E. Oxford Comma Consistency

AI uses the Oxford comma with perfect consistency throughout a document. Human writers are inconsistent -- sometimes using it, sometimes not.

**Detection heuristic:** Check for Oxford comma usage in every list of three or more items. If it is present in 100% of cases across a long document, note as a potential signal (not conclusive alone).

**Fix:** Don't force inconsistency, but don't worry about it either. This is a minor signal.

### 3F. Perfect Grammar (Paradoxically a Tell)

AI avoids fragments, run-ons, sentence-initial conjunctions ("And," "But"), and all forms of deliberate rule-breaking. Every sentence is grammatically complete.

**Detection heuristic:** Zero fragments, zero sentence-initial conjunctions, zero interrupted thoughts across a long piece is an AI signal. Human professional writing includes deliberate fragments, interrupted thoughts, and conjunctions at the start of sentences.

**Fix:** Break rules on purpose. One deliberate fragment per page. Start some sentences with "And" or "But." Human writing is intentionally imperfect.

### 3G. Emoji Patterns

AI adds decorative emoji in professional contexts where humans would not. Symmetrical emoji placement (one per bullet point, framing headers) signals AI.

**Detection heuristic:** Emoji appearing at the start of every bullet point or flanking every heading is AI-generated formatting. One emoji per section, perfectly placed, is AI. Humans use emoji irregularly or not at all in professional contexts.

**Fix:** Remove all emoji from professional prose. If emoji are appropriate (casual context), use them irregularly and sparingly.

### 3H. Curly Quotation Marks

AI uses smart/curly quotes and apostrophes rather than straight quotes. Most human writers in plain text use straight quotes.

**Detection heuristic:** Minor signal. Curly quotes in a plain text environment suggest AI or rich-text processing.

### 3I. American English Consistency

AI defaults to American English spelling (analyze, optimize, color) even when the context calls for British English.

**Detection heuristic:** Check for spelling consistency against the expected locale. American spelling in a British context is an AI signal.

**Fix:** Match the locale of the intended audience.

---

## 4. Document-Level Patterns

### 4A. Five-Paragraph Essay

AI defaults to: Introduction, Body 1, Body 2, Body 3, Conclusion. Each section is approximately equal length.

**Detection heuristic:** Count sections. If a piece has exactly 5 sections with roughly equal word counts, it follows the AI template. Human pieces have uneven section lengths -- some topics need more space than others.

**Fix:** Let the content dictate structure. Some topics need one paragraph. Others need fifteen. The five-paragraph essay is a school assignment format, not professional writing.

### 4B. Introduction-List-Conclusion Template

A paragraph of context, a bulleted or numbered list, then a paragraph of summary. Repeated throughout the document.

**Detection heuristic:** If 3+ sections follow the intro-list-summary pattern, it is AI-generated structure.

**Fix:** Integrate list content into flowing paragraphs. Vary section structures. Some sections should be pure prose. Some should be a single extended example.

### 4C. Recap Conclusions

AI conclusions restate everything said earlier rather than advancing the argument. The final paragraph adds zero new information.

**Detection heuristic:** Compare the conclusion to the introduction. If 60%+ of the ideas in the conclusion already appear in the introduction, it is an AI recap.

**Fix:** The final paragraph should either advance the argument to its conclusion (say something new), end with a provocative question, point to what comes next, or simply stop. Never restate the introduction.

### 4D. Symmetrical Sections

Each section has the same number of paragraphs, the same structure, the same approximate word count. No section is notably longer or shorter than others.

**Detection heuristic:** Calculate word counts per section. If the coefficient of variation is below 0.15 (sections are all within ~15% of each other), the symmetry is AI-generated.

**Fix:** Let important topics be longer. Let minor topics be shorter. Asymmetry is natural.

### 4E. Generic Names in Examples

AI uses "Emily" and "Sarah" in 60-70% of generated examples. Names are predictably common.

**Detection heuristic:** Check example names. If all are common Western female names (Emily, Sarah, Jessica, Rachel), flag as potential AI.

**Fix:** Use specific, unusual, or clearly fictional names. Or use real names from the actual domain.

### 4F. Avoidance of Specific Proper Nouns

AI generates vague references instead of specific names, dates, places, and figures.

**Detection heuristic:** Look for "a major study" instead of naming it, "experts say" instead of naming them, "a leading company" instead of naming it. Vague attribution where specifics would be easy to provide is an AI signal.

**Fix:** Name the study, the expert, the company, the city, the date. Specificity is human.

### 4G. Absence of Metacognitive Reflection

AI text never says "I changed my mind about this," "I used to think X but now," or "I'm not sure about this but..."

**Detection heuristic:** If a piece takes a firm position without any self-correction, uncertainty, or intellectual journey, it may be AI-generated. Human experts routinely note where they changed their view or remain uncertain.

**Fix:** Include moments of genuine uncertainty, changed positions, or intellectual honesty about what you don't know.

---

*This file covers every structural, formatting, and document-level pattern from the research corpus. Use the detection heuristics to scan text systematically.*
