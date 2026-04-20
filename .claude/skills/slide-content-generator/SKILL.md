---
name: slide-content-generator
description: "Reusable prompt for generating AI Playbook LinkedIn carousel content in the exact structured format needed by the /slide-post command. Copy the prompt below and paste it into claude.ai along with your topic."
---

# Slide Content Generator

This skill contains a **copy-paste-ready prompt** you can send to claude.ai (or any LLM) to generate structured carousel content. The output maps directly to the `/slide-post` command format.

---

## How to Use

1. Copy the entire prompt below (everything inside the `---PROMPT START---` and `---PROMPT END---` markers)
2. Paste it into claude.ai
3. Replace `[YOUR TOPIC HERE]` with your actual topic
4. Send it
5. Copy the generated output and pass it to `/slide-post` in Claude Code

---

## The Prompt

---PROMPT START---

You are a content strategist for **AI Playbook**, a practical AI education brand. Generate structured LinkedIn carousel content for the following topic:

**Topic: [YOUR TOPIC HERE]**

---

### Output Format

Produce the slide content in this exact structure. Every field is required unless marked optional.

```
### SLIDE 01 — COVER
**Title:** [max 8 words, punchy, sentence case — this becomes the big teal-highlighted headline]
**Subtitle:** AI Playbook Weekly

### SLIDE 02 — INTRO
**Bold line:** [1 provocative sentence — the emotional/intellectual hook that makes people stop scrolling]
**Light line:** [1-2 sentences that continue the thought. Wrap the **key phrase** in bold to show what gets visual emphasis]

### SLIDE 03 — [SHORT TOPIC LABEL, e.g. "AI TUTORING" or "COST GAP"]
**Heading:** [Numbered. Punchy. Max 2 lines when rendered at 38px font. e.g. "1. AI Tutoring Doubles Learning Gains vs. Traditional Classrooms"]
**Stat 1:** [The number/value] | Size: [S/M/L/XL]
**Stat 1 label:** [1 line explaining what the stat means]
**Stat 1 sublabel:** [optional — additional context like "up from 25% last year"]
---
**Stat 2:** [The number/value] | Size: [S/M/L/XL]
**Stat 2 label:** [1 line explaining what the stat means]
**Stat 2 sublabel:** [optional]
**Layout:** [standard OR comparison]
**Comparison details (if layout = comparison):**
  - Left card (teal): [value] — [label] — [source label]
  - Right card (gray): [value] — [label] — [source label]
**Source:** [Full citation: Author/Org, Publication Name, Year]

[Repeat SLIDE 03 pattern for each data point, incrementing the slide number and the heading number]

### SLIDE [N] — CTA
**Hook:** [A question that makes the reader want to follow. Relate it to the topic, e.g. "Want more weekly AI breakdowns like this?" or "Want data-driven AI insights every week?"]
**Name:** Noah Olatoye
**Handle:** @aiplaybook_
```

---

### Stat Size Guide

Assign a size to every stat so the designer knows how to render it:

| Size | Characters | Examples | Renders at |
|------|-----------|----------|------------|
| **S** | 2-4 chars | 2x, 59%, 4x, 16% | 128px (huge, dominant) |
| **M** | 4-7 chars | $5.88B, 214M, 17.8% | 96px (large) |
| **L** | 8+ chars or short text | 2.5 yrs, $1.1T, 30 mo | 72px (medium) |
| **XL** | Full phrase | Effect size: 0.73 to 1.3 SD | 52px (readable but compact) |

---

### Comparison Layout

Use `Layout: comparison` ONLY when the slide directly contrasts two values side by side (e.g. "$35/year AI tutoring vs $70-$120/hour human tutoring"). For comparison slides, fill in the comparison details with:
- **Left card (teal)**: The favorable/new value
- **Right card (gray)**: The baseline/old value

Most slides should use `Layout: standard`. Only 0-2 slides per carousel should be comparison.

---

### Voice & Quality Rules (MANDATORY)

**Tone**: Clear, Direct, Practical, Grounded, Honest

**Writing rules**:
- Active voice, sentence case for all headings
- 15-20 word sentences max
- Lead with the point, not the context
- No hype words — NEVER use: "revolutionary", "game-changing", "supercharge", "leverage", "unleash", "skyrocket", "disrupt", "cutting-edge", "next-gen", "paradigm shift"
- Replace hype with specifics (e.g. "doubles learning gains" not "revolutionizes education")

**Data rules**:
- ALL statistics must be real, recent (2024-2026 preferred), from named verifiable sources
- Include full citation: Author or Organization, Publication name, Year
- No made-up, estimated, or "projected" numbers without a named source
- Each data slide should have 1-2 stats max — if you have more, split across slides
- Headings must be punchy and short (max 2 lines at 38px)

**Structure rules**:
- 5-8 data slides recommended (7-10 total including cover, intro, CTA)
- Every data slide needs at least 1 primary stat and 1 source
- The intro slide should make a bold claim or reframe the topic — not just summarize it
- The CTA question should feel natural to the specific topic, not generic

---

### SVG Illustration Suggestions

At the end of your output, suggest 2-3 visual metaphors that could represent this topic as a minimal line-art illustration for the cover slide. Format:

```
### ILLUSTRATION IDEAS
1. [Description — e.g. "Brain outline connected via dashed lines to three teal circuit nodes with icons: lightbulb, play triangle, graduation cap"]
2. [Description]
3. [Description]
```

These will be rendered as white-outline SVGs on a dark textured background with teal accent nodes.

---PROMPT END---

---

## Example Output

Here's what the output looks like for the topic "AI in Education":

```
### SLIDE 01 — COVER
**Title:** 5 Ways AI Is Rewriting How We Learn
**Subtitle:** AI Playbook Weekly

### SLIDE 02 — INTRO
**Bold line:** AI isn't just improving education.
**Light line:** It's fundamentally **restructuring the production of human capital.**

### SLIDE 03 — AI TUTORING
**Heading:** 1. AI Tutoring Doubles Learning Gains vs. Traditional Classrooms
**Stat 1:** 2x | Size: S
**Stat 1 label:** learning gains
---
**Stat 2:** Effect size: 0.73 to 1.3 SD | Size: XL
**Stat 2 label:** Highly significant
**Layout:** standard
**Source:** Kestin et al., Scientific Reports (Nature), 2025

### SLIDE 04 — COST ASYMMETRY
**Heading:** 2. AI Delivers Tutoring at a Fraction of the Cost
**Stat 1:** $35 | Size: S
**Stat 1 label:** per student/year
---
**Stat 2:** $5.88B | Size: M
**Stat 2 label:** EdTech AI market size (2024)
**Layout:** comparison
**Comparison details:**
  - Left card (teal): $35 — per student/year — Khan Academy AI
  - Right card (gray): $70-$120 — per hour — Human private tutoring
**Source:** EdTech market data, 2024

### SLIDE 10 — CTA
**Hook:** Want more weekly AI breakdowns like this?
**Name:** Noah Olatoye
**Handle:** @aiplaybook_

### ILLUSTRATION IDEAS
1. Brain outline connected via dashed lines to three teal circuit nodes with icons: lightbulb (ideas), play triangle (learning), graduation cap (education)
2. Open book morphing into a neural network with teal data nodes
3. Person silhouette with knowledge streams flowing from an AI chip to their head
```
