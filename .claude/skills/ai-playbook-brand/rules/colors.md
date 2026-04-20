# AI Playbook — Color System

Source of truth: `docs/02 — Colour`

---

## Primary Brand Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Brand Teal** | `#1A7A6E` | 26, 122, 110 | "Playbook" wordmark, interactive elements, CTAs, links, data highlights |
| **Brand Charcoal** | `#2B3A35` | 43, 58, 53 | "AI" wordmark, body text on light backgrounds, mark on light backgrounds |

**Brand Teal rules:**
- Use for "Playbook" wordmark at all times
- Use for interactive elements: buttons, links, active states
- Use as a background only with white or near-white text on top
- Minimum contrast ratio against white: 4.8:1 (WCAG AA large text)

**Brand Charcoal rules:**
- Use for all body text on light backgrounds
- Use for "AI" wordmark and mark on light backgrounds
- Never use on dark backgrounds — use white instead
- Contrast against white: 9.8:1 (WCAG AAA)

---

## Background Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Brand Dark** | `#0F1A17` | Dark-mode hero sections, video thumbnails, slide backgrounds |
| **Brand Paper** | `#F4F2ED` | Warm off-white for course pages, documents, email body |
| **White** | `#FFFFFF` | Default background for platform UI, clean layouts |

**Brand Dark rules:**
- Pair with white body text and teal accents
- Never use charcoal text on this background

---

## Supporting Teal Scale

| Name | Hex | Usage |
|------|-----|-------|
| Teal Light | `#5DCAA5` | Hover states, tinted backgrounds, chart fills |
| Teal (primary) | `#1A7A6E` | See primary brand colors |
| Teal Dark | `#15695E` | Active/pressed states, dark teal backgrounds |
| Teal Deeper | `#0F6E56` | Deep teal backgrounds, certificate borders |

---

## Neutral Scale

| Name | Hex | Usage |
|------|-----|-------|
| Neutral 100 | `#F4F2ED` | Paper background |
| Neutral 200 | `#E8E6DF` | Subtle dividers, card borders |
| Neutral 400 | `#B0ADA4` | Placeholder text, disabled text |
| Neutral 600 | `#6B6860` | Secondary body text, captions |
| Neutral 800 | `#3A3731` | Secondary headings |
| Neutral 900 | `#2B3A35` | Charcoal (see primary) |

---

## Semantic Colors

For UI states, alerts, and feedback only — not decorative.

| Name | Hex | Usage |
|------|-----|-------|
| Success | `#1A7A6E` | Completion, positive states (same as Brand Teal) |
| Warning | `#D97706` | Caution, pending states |
| Error | `#DC2626` | Failure, destructive actions |
| Info | `#2563EB` | Informational notices |

---

## Approved Color Pairings

| Background | Primary Text | Accent |
|------------|-------------|--------|
| White `#FFFFFF` | Charcoal `#2B3A35` | Teal `#1A7A6E` |
| Paper `#F4F2ED` | Charcoal `#2B3A35` | Teal `#1A7A6E` |
| Dark `#0F1A17` | White `#FFFFFF` | Teal `#1A7A6E` |
| Teal `#1A7A6E` | White `#FFFFFF` | White `#FFFFFF` |
| Teal Dark `#15695E` | White `#FFFFFF` | White `#FFFFFF` |

---

## Forbidden Pairings

- Teal on charcoal (contrast ~2.6:1 — too low)
- Charcoal on dark background (near-invisible)
- Teal text on paper or white below 18px (WCAG AA fail)
- Multiple accent colors in a single layout
- Any color not in this palette as a primary brand color
- Color gradients involving Brand Teal

---

## Data Visualization Colors

| Slot | Hex | Name |
|------|-----|------|
| Series 1 | `#1A7A6E` | Teal — primary data |
| Series 2 | `#5DCAA5` | Teal Light — secondary data |
| Series 3 | `#0F1A17` | Dark — contrast bar |
| Series 4 | `#B0ADA4` | Neutral — baseline/comparison |
| Highlight | `#D97706` | Amber — callout data points only |

Never use red or green for data series unless encoding error/success semantics. Avoid rainbow palettes.

---

## WCAG Accessibility Pairs

| Foreground | Background | Ratio | Level |
|-----------|------------|-------|-------|
| Charcoal `#2B3A35` | White `#FFFFFF` | 9.8:1 | AAA |
| Charcoal `#2B3A35` | Paper `#F4F2ED` | 9.2:1 | AAA |
| White `#FFFFFF` | Dark `#0F1A17` | 17.4:1 | AAA |
| White `#FFFFFF` | Teal `#1A7A6E` | 4.8:1 | AA (large text 18px+) |
| Teal `#1A7A6E` | White `#FFFFFF` | 4.8:1 | AA (large text 18px+) |

**Minimums:**
- Normal text (under 18px): 4.5:1
- Large text (18px+ or 14px bold+): 3:1
- UI components and graphical elements: 3:1
