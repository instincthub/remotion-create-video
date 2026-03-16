# Widescreen Video Animation Command (16:9 Landscape)

You are generating a **landscape 16:9 video animation** using Remotion. Follow every rule below without exception.

---

## Mandatory Skills & Design System

- **Always invoke the `remotion-best-practices` skill** before writing any code.
- **Always apply the `instincthub-colors` design system** for all colors — no arbitrary hex values outside the brand palette.
- Use your **Figma/design skills** and the **Design plugin** to create modern, polished illustrations where needed.

---

## Canvas & Layout

| Property        | Value                          |
| --------------- | ------------------------------ |
| Ratio           | **16:9 landscape**             |
| Resolution      | **1920 × 1080 px**             |
| Safe zone       | Keep all text and key visuals **inside 80px margins** on all sides |
| Subtitle margin | Reserve **200px from the bottom edge** — no content, text, or graphics below this line (subtitles will be overlaid here later) |
| Background      | **Never transparent** — always use a solid or gradient background from the instincthub-colors palette |

---

## Project Structure

Create a **separate subdirectory** for every animation. Never place animation files in the root folder.

```
<root>/
  <animation-name>/       ← one folder per animation
    index.tsx             ← Remotion composition entry
    ...                   ← all related files here
```

---

## Animation Quality Rules

1. **No overlapping text** — every text element must have sufficient spacing and z-index separation.
2. **Readable on screen** — assume viewers watch on desktop or TV; use well-scaled, high-contrast typography.
3. **Smooth motion** — use spring/easing curves; avoid abrupt cuts unless intentional.
4. **Brand consistency** — Dark Cyra (`#00838F`) is the dominant accent; limit accent colors to 3 per scene.
5. **Subtitle-safe** — the bottom 200px must remain completely empty of animated or static content.

---

## Execution Checklist

Before delivering any code, verify:
- [ ] `remotion-best-practices` skill has been invoked
- [ ] Canvas is exactly 1920 × 1080
- [ ] Subtitle safe zone (bottom 200px) is empty
- [ ] Background is fully opaque
- [ ] No text elements overlap
- [ ] All colors come from `instincthub-colors`
- [ ] Animation lives in its own subdirectory

---

## Your Task

$ARGUMENTS
