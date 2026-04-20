# AI Playbook — Video & Slide Content

Content creation toolkit for the **AI Playbook** brand. Produces Remotion video animations and LinkedIn carousel slide decks.

## Project Structure

```
src/
  ai-for-business/       # 21-episode explainer series (Remotion)
  weekly-reels/           # Weekly short-form reels (Remotion, 9:16)
designs/                  # Static slide decks (HTML/CSS → print to PDF)
docs/                     # Brand documentation (color, typography, imagery, voice, logo)
```

## Getting Started

```console
npm i
npm run dev          # Start Remotion preview
npx remotion render  # Render video
```

## Claude Code Commands

| Command | Purpose | Output |
|---------|---------|--------|
| `/video` | Generate a Remotion video animation (16:9) | `src/` subdirectory |
| `/reel` | Generate a Remotion reel animation (9:16) | `src/` subdirectory |
| `/carousel` | Generate a Remotion animated carousel (1:1 or 4:5) | `src/` subdirectory |
| `/slide-post` | Generate a static LinkedIn slide deck (HTML/CSS) | `designs/<topic>-carousel.html` |

### Slide Post Workflow

1. Copy the prompt from `.claude/skills/slide-content-generator/SKILL.md`
2. Paste into claude.ai with your topic to generate structured content
3. Run `/slide-post <content>` in Claude Code to produce the HTML
4. Open in Chrome, print to PDF (Custom size: 1080x1350px, no margins)

## Brand Skills

| Skill | Location | Purpose |
|-------|----------|---------|
| `ai-playbook-brand` | `.claude/skills/ai-playbook-brand/` | Full AI Playbook design system (colors, typography, imagery, voice, logo) |
| `slide-content-generator` | `.claude/skills/slide-content-generator/` | Reusable prompt for generating carousel content |
| `remotion-best-practices` | `.claude/skills/remotion-best-practices/` | Remotion animation patterns and conventions |

Both **AI Playbook** and **InstinctHub** brand systems are supported. Commands ask which brand to use if not specified.

## Key Assets

```
designs/assets/bg/                          # Background textures
designs/assets/images/                      # Author photos
docs/01 — Logo/ai-playbook-logo-full/       # Logo SVG/PNG files
```

## Docs

- [Remotion fundamentals](https://www.remotion.dev/docs/the-fundamentals)
- Brand docs in `docs/` (color, typography, imagery, voice, applications, logo)
