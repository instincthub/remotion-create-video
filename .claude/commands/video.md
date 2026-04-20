# Widescreen Video Animation Command (16:9 Landscape)

You are generating a **landscape 16:9 video animation** using Remotion. Follow every rule below without exception.

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
| Ratio           | **16:9 landscape**             |
| Resolution      | **1920 × 1080 px**             |
| Safe zone       | Keep all text and key visuals **inside 80px margins** on all sides |
| Subtitle margin | Reserve **200px from the bottom edge** — no content, text, or graphics below this line (subtitles will be overlaid here later) |
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
2. **Readable on screen** — assume viewers watch on desktop or TV; use well-scaled, high-contrast typography.
3. **Smooth motion** — use spring/easing curves; avoid abrupt cuts unless intentional.
4. **Brand consistency** — the chosen brand's primary accent is dominant; limit accent colors to 3 per scene.
5. **Subtitle-safe** — the bottom 200px must remain completely empty of animated or static content.

---

## Execution Checklist

Before delivering any code, verify:
- [ ] `remotion-best-practices` skill has been invoked
- [ ] Canvas is exactly 1920 × 1080
- [ ] Subtitle safe zone (bottom 200px) is empty
- [ ] Background is fully opaque
- [ ] No text elements overlap
- [ ] All colors come from the chosen brand system (`ai-playbook-brand` or `instincthub-colors`)
- [ ] Animation lives in its own subdirectory

---

## Your Task

$ARGUMENTS
