---
name: ai-playbook-brand
description: "AI Playbook complete brand design system — colors, typography, imagery, voice, logo, and channel application specs for Remotion video animations and all branded content."
---

# AI Playbook Brand Design System

> This is the **AI Playbook** brand system. For **InstinctHub** platform content, use the `instincthub-colors` command instead. These are separate brands with distinct palettes and typefaces.

**Brand identity:** The AI Playbook is the most practical, honest, and applied AI education resource for the global workforce — built in Africa, relevant everywhere.

---

## Quick-Reference: Colors

| Name | Hex | Role |
|------|-----|------|
| **Brand Teal** | `#1A7A6E` | Primary accent, "Playbook" wordmark, CTAs, links, data highlights |
| **Brand Charcoal** | `#2B3A35` | Primary text, "AI" wordmark, body text on light backgrounds |
| **Brand Dark** | `#0F1A17` | Dark backgrounds, hero sections, video thumbnails, slide backgrounds |
| **Brand Paper** | `#F4F2ED` | Warm off-white background alternative |
| **White** | `#FFFFFF` | Default light background, text on dark surfaces |

**Supporting teal scale:** Teal Light `#5DCAA5` (hover), Teal Dark `#15695E` (active/pressed), Teal Deeper `#0F6E56` (deep backgrounds)

**Key rules:**
- Brand Teal is the dominant accent — max 1 accent color per layout
- Teal text on white/paper is 18px+ only (WCAG AA large text)
- No color gradients involving Brand Teal
- No colors outside this palette used as primary brand colors

See `rules/colors.md` for the full palette, approved/forbidden pairings, neutral scale, semantic colors, and data visualization slots.

---

## Quick-Reference: Typography

| Typeface | Role | Weights |
|----------|------|---------|
| **Nunito** | Display, headlines, identity, wordmark | 600 (SemiBold), 700 (Bold) |
| **DM Sans** | Body text, UI, extended reading | 300 (Light), 400 (Regular), 500 (Medium) |
| **DM Mono** | Code, metadata, timestamps, tags | 400 (Regular), 500 (Medium) |

**Key rules:**
- Sentence case for all headings
- Never mix Nunito and DM Sans in the same heading
- ALL CAPS only for short DM Mono metadata labels (e.g. WK 01)
- Body text minimum 14px in any digital context
- Left-aligned body text; centered only for short display headlines

See `rules/typography.md` for the full type scale, emphasis rules, spacing, and fallback stacks.

---

## Remotion Code Templates

### colors.ts

```typescript
export const colors = {
  // Primary brand
  brandTeal: "#1A7A6E",
  brandCharcoal: "#2B3A35",
  // Backgrounds
  brandDark: "#0F1A17",
  brandPaper: "#F4F2ED",
  white: "#FFFFFF",
  // Teal scale
  tealLight: "#5DCAA5",
  tealDark: "#15695E",
  tealDeeper: "#0F6E56",
  // Neutral scale
  neutral200: "#E8E6DF",
  neutral400: "#B0ADA4",
  neutral600: "#6B6860",
  neutral800: "#3A3731",
  // Semantic
  success: "#1A7A6E",
  warning: "#D97706",
  error: "#DC2626",
  info: "#2563EB",
} as const;
```

### fonts.ts

```typescript
import { loadFont as loadNunito } from "@remotion/google-fonts/Nunito";
import { loadFont as loadDMSans } from "@remotion/google-fonts/DMSans";
import { loadFont as loadDMMono } from "@remotion/google-fonts/DMMono";

const { fontFamily: nunito } = loadNunito("normal", {
  weights: ["600", "700"],
  subsets: ["latin"],
});

const { fontFamily: dmSans } = loadDMSans("normal", {
  weights: ["300", "400", "500"],
  subsets: ["latin"],
});

const { fontFamily: dmMono } = loadDMMono("normal", {
  weights: ["400", "500"],
  subsets: ["latin"],
});

export { nunito, dmSans, dmMono };
```

---

## Animation Patterns

- **FPS:** 30
- **Transitions:** Fade via `TransitionSeries` — 15 frames (0.5s) standard
- **Spring configs:** `{ damping: 16, stiffness: 80 }` for smooth entrances
- **Safe zones:** 80px side margins; 200px bottom (16:9) or 300px bottom (9:16) for subtitles
- **Backgrounds:** Always opaque — Brand Dark for dramatic scenes, white/paper for content scenes
- **Glow effects:** Radial gradients with `Math.sin()` pulsing opacity
- **Watermark:** "AI Playbook" or mark, bottom-right, 15px, white at 25% opacity

---

## Brand Voice (Summary)

**Tone:** Clear, Direct, Practical, Grounded, Honest

- No hype words (revolutionary, game-changing, supercharge, leverage)
- No emojis in formal content
- No ALL CAPS
- Active voice; 15-20 word sentences
- Lead with the point, not the context
- Always include an actionable takeaway

See `rules/voice.md` for full vocabulary, channel registers, and the pre-publish checklist.

---

## Detailed Rule Files

| File | Contents |
|------|----------|
| `rules/colors.md` | Full palette, approved/forbidden pairings, accessibility, data viz |
| `rules/typography.md` | Type scale, emphasis rules, spacing, context hierarchies, fallbacks |
| `rules/imagery.md` | Photography, illustrations, icons, screenshots, video thumbnails |
| `rules/voice.md` | Tone attributes, vocabulary, writing mechanics, channel registers |
| `rules/applications.md` | LinkedIn, YouTube, newsletter, slides, certificates, enterprise specs |
| `rules/logo.md` | Mark anatomy, variants, clearspace, minimum sizes, misuse rules |

---

## Logo Assets

Logo files are in `docs/01 — Logo/ai-playbook-logo-full/`:
- SVG (preferred for web/animation)
- PNG transparent (presentations, social)
- PNG with solid backgrounds (platform-specific)

**Mark-only in animations:** Use white mark on dark backgrounds, charcoal on light, at 48px minimum.
