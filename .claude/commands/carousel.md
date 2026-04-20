# LinkedIn Carousel Animation Command

You are generating a **LinkedIn carousel animation** using Remotion. Follow every rule below without exception.

---

## Mandatory Skills & Design System

- **Always invoke the `remotion-best-practices` skill** before writing any code.
- **Always apply the `ai-playbook-brand` design system** for all colors and typography — no arbitrary hex values outside the brand palette.
- Use **Nunito** for headlines, **DM Sans** for body text, **DM Mono** for slide numbers and metadata.
- Use your **Figma/design skills** and the **Design plugin** to create modern, polished illustrations where needed.

---

## Canvas & Layout

| Property   | Value |
|------------|-------|
| Ratio      | **1:1 square** (default) or **4:5 portrait** |
| Resolution | **1080 x 1080 px** (square) or **1080 x 1350 px** (portrait) |
| Margins    | **48px** on all sides minimum |
| Background | **Never transparent** — always solid from the ai-playbook-brand palette |

---

## Slide Structure

### Cover Slide (Slide 1)
- Background: Brand Dark (`#0F1A17`) or Brand Teal (`#1A7A6E`)
- Headline: Nunito 700, white, 56-64px, maximum 8 words
- Subtext (optional): DM Sans 400, white 60% opacity, 20px
- AI Playbook mark: white, bottom-right, 48px
- No more than two text elements

### Body Slides (Slides 2-7)
- Background: White (`#FFFFFF`) or Paper (`#F4F2ED`)
- Slide number: DM Mono 500, 11px, uppercase, Brand Teal, top-right
- Heading: Nunito 700, Brand Charcoal (`#2B3A35`), 28-32px
- Body: DM Sans 400, Brand Charcoal, 16-18px, line-height 1.6
- One teal accent per slide (left border, underline, icon, or pill)
- Maximum 3-4 lines of body text — split across slides if more needed

### Summary Slide
- Background: Brand Dark or white
- Key takeaway: Nunito 700, 28px
- CTA line: DM Sans 400, 16px (e.g. "Follow for weekly AI Playbook sessions")
- AI Playbook mark: always present

---

## Project Structure

Create a **separate subdirectory** for every animation. Never place animation files in the root folder.

```
<root>/
  <animation-name>/       <- one folder per animation
    index.tsx             <- Remotion composition entry
    ...                   <- all related files here
```

---

## Animation Quality Rules

1. **No overlapping text** — every text element must have sufficient spacing and z-index separation.
2. **Readable at a glance** — assume viewers scroll LinkedIn on mobile; use high-contrast, well-scaled type.
3. **Smooth motion** — use spring/easing curves; avoid abrupt cuts unless intentional.
4. **Brand consistency** — Brand Teal (`#1A7A6E`) is the dominant accent; limit to 1 accent per slide.
5. **Mark on every slide** — AI Playbook mark in the same corner (bottom-right preferred), consistent across all slides.
6. **Consistent margins** — 48px on all sides, never change within a carousel series.

---

## Execution Checklist

Before delivering any code, verify:
- [ ] `remotion-best-practices` skill has been invoked
- [ ] Canvas is exactly 1080 x 1080 (or 1080 x 1350 if portrait specified)
- [ ] Background is fully opaque on every slide
- [ ] No text elements overlap
- [ ] All colors come from `ai-playbook-brand`
- [ ] Nunito for headlines, DM Sans for body, DM Mono for metadata
- [ ] AI Playbook mark present on every slide
- [ ] 48px margins maintained
- [ ] Animation lives in its own subdirectory

---

## Your Task

$ARGUMENTS
