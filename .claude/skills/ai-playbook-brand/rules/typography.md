# AI Playbook — Typography System

Source of truth: `docs/03 — Typography`

---

## Typeface System

### Nunito — Display and Identity

| Property | Value |
|----------|-------|
| Family | Nunito |
| Weights | 600 (SemiBold), 700 (Bold) |
| Google Fonts | `family=Nunito:wght@600;700` |

**Use for:** Page titles, headlines, course titles, slide headers, YouTube thumbnail text, certificate names, pull quotes, wordmark.

**Never for:** Body paragraphs, long-form text, interface labels below 14px.

### DM Sans — Body and UI

| Property | Value |
|----------|-------|
| Family | DM Sans |
| Weights | 300 (Light), 400 (Regular), 500 (Medium) |
| Google Fonts | `family=DM+Sans:wght@300;400;500` |

**Use for:** All body text, course descriptions, newsletter copy, UI buttons/labels/navigation, form fields, captions (weight 300).

**Never for:** Headlines above 32px, code snippets.

### DM Mono — Technical and Metadata

| Property | Value |
|----------|-------|
| Family | DM Mono |
| Weights | 400 (Regular), 500 (Medium) |
| Google Fonts | `family=DM+Mono:wght@400;500` |

**Use for:** Code blocks, inline code, section labels/tags, timestamps (WK 01, MONTH 1), metadata, AI prompt examples, diagram captions.

### Combined Import

```
https://fonts.googleapis.com/css2?family=Nunito:wght@600;700&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap
```

---

## Type Scale

| Level | Size | Weight | Typeface | Letter Spacing | Line Height |
|-------|------|--------|----------|---------------|-------------|
| Display | 64px | 700 | Nunito | -0.5px | 1.1 |
| H1 | 48px | 700 | Nunito | -0.3px | 1.15 |
| H2 | 36px | 700 | Nunito | -0.2px | 1.2 |
| H3 | 28px | 600 | Nunito | 0 | 1.25 |
| H4 | 22px | 600 | Nunito | 0 | 1.3 |
| H5 | 18px | 600 | Nunito | 0 | 1.35 |
| Body Large | 18px | 400 | DM Sans | 0 | 1.7 |
| Body | 16px | 400 | DM Sans | 0 | 1.7 |
| Body Small | 14px | 400 | DM Sans | 0 | 1.6 |
| Caption | 12px | 300 | DM Sans | 0.02em | 1.5 |
| Label | 11px | 500 | DM Mono | 0.12em | 1.4 |
| Code | 13px | 400 | DM Mono | 0 | 1.6 |

---

## Context-Specific Hierarchies

### Slide Deck (1920x1080)
```
Slide title:    Nunito 700, 48px
Subtitle:       Nunito 600, 28px
Body bullet:    DM Sans 400, 20px
Caption:        DM Sans 300, 14px
Label/tag:      DM Mono 500, 12px, uppercase, letter-spaced
```

### Newsletter
```
Subject line:   Nunito 700, ~18px
Issue headline: Nunito 700, 36px
Section heads:  Nunito 600, 22px
Body:           DM Sans 400, 16px, line-height 1.7
Callout box:    DM Sans 500, 15px
Footer/meta:    DM Mono 400, 11px
```

### Certificate
```
Certificate title: Nunito 700, 42px
Learner name:      Nunito 700, 36px
Course name:       Nunito 600, 24px
Issue date:        DM Mono 400, 13px
Credential ID:     DM Mono 400, 11px
```

---

## Emphasis Rules

| Style | Usage |
|-------|-------|
| **Bold** (Nunito 700 / DM Sans 500) | Key terms on first introduction, action items, critical instructions. Not decoration. |
| *Italic* (DM Sans 400 italic) | Titles of courses, publications, tools. Use sparingly. |
| `Monospace` (DM Mono) | All code, AI prompts, command-line instructions, model names. |
| ALL CAPS | Never for body or headings. Only for short DM Mono metadata labels (WK 01, MONTH 3). |
| Underline | Reserved for hyperlinks only. Never for emphasis. |

---

## Spacing and Measure

- **Optimal line length:** 60-75 characters per line
- **Paragraph spacing:** Equal to 1x the line height (e.g. 16px body at 1.7 = 27px gap)
- **Heading-to-body gap:** 12px below heading; 32px above heading after body text

---

## Do / Don't

**Do:**
- Sentence case for all headings
- Maintain consistent type scale across a layout
- DM Mono for all AI prompts and outputs
- Respect line-height values
- Left-align all body text; center only for short display headlines

**Don't:**
- Mix Nunito and DM Sans in the same heading
- Set body text below 14px in any digital context
- Use font weights not in the approved set
- Use synthetic bold (browser-applied) — always load explicit weights
- Use ALL CAPS for body or headings
- Use more than two typefaces in a single layout

---

## Fallback Stacks

| Typeface | Fallback |
|----------|----------|
| Nunito | 'Trebuchet MS', 'Segoe UI', Helvetica Neue, Arial, sans-serif |
| DM Sans | 'Segoe UI', system-ui, -apple-system, Helvetica Neue, Arial, sans-serif |
| DM Mono | 'Courier New', Courier, monospace |
