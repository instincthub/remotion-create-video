# Reel Video Animation Command (9:16 Portrait)

You are generating a **portrait Reels/Shorts animation** using Remotion. Follow every rule below without exception.

---

## Mandatory Skills & Design System

- **Always invoke the `remotion-best-practices` skill** before writing any code.
- **Choose the correct brand system** based on the task:
  - **AI Playbook content** → invoke the `ai-playbook-brand` skill (Brand Teal `#1A7A6E`, Nunito/DM Sans/DM Mono)
  - **InstinctHub content** → invoke the `instincthub-colors` command (Dark Cyra `#00838F`, Inter)
- If the task does not specify a brand, **ask which brand system to use**.
- No arbitrary hex values outside the chosen brand palette.
- Use your **Figma/design skills** and the **Design plugin** to create modern, polished illustrations where needed.

---

## Canvas & Layout

| Property        | Value                          |
| --------------- | ------------------------------ |
| Ratio           | **9:16 portrait**              |
| Resolution      | **1080 × 1920 px**             |
| Safe zone       | Keep all text and key visuals **inside 80px margins** on left/right |
| Subtitle margin | Reserve **300px from the bottom edge** — no content, text, or graphics below this line (subtitles will be overlaid here later) |
| Background      | **Never transparent** — always use a solid or gradient background from the chosen brand palette |

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
2. **Readable at a glance** — assume viewers watch on mobile; use large, high-contrast type. Minimum text size 24px for reel format readability.
3. **Smooth motion** — use spring/easing curves; avoid abrupt cuts unless intentional.
4. **Brand consistency** — the chosen brand's primary accent is dominant; limit accent colors to 3 per scene.
5. **Subtitle-safe** — the bottom 300px must remain completely empty of animated or static content.

---

## Execution Checklist

Before delivering any code, verify:
- [ ] `remotion-best-practices` skill has been invoked
- [ ] Canvas is exactly 1080 × 1920
- [ ] Subtitle safe zone (bottom 300px) is empty
- [ ] Background is fully opaque
- [ ] No text elements overlap
- [ ] All colors come from the chosen brand system (`ai-playbook-brand` or `instincthub-colors`)
- [ ] Animation lives in its own subdirectory

---

## Your Task

$ARGUMENTS
