# Connecting the studio to Claude

The toolchain renders video. Claude is what writes the compositions, cuts the
footage, and drives the pipeline. This step joins the two.

---

## 1. Which Claude do they need?

**Claude Code** — required. It runs commands, edits files and drives ffmpeg and
Remotion on their machine. Available as a terminal CLI, a desktop app (macOS and
Windows), a web app, and IDE extensions for VS Code and JetBrains.

**Claude Desktop with connectors** — optional, and not a substitute. It's useful
for research and planning, but it does not run the render pipeline.

If they're not a developer, point them at the **desktop app** — same capability,
no terminal to learn.

Install from <https://claude.com/claude-code>. They'll sign in with a Claude
account; a paid plan or API credit is needed for real use.

---

## 2. Open the repo as a project

In the desktop app: open it and point it at the cloned repo folder.

In the terminal:

```bash
cd <repo>
claude
```

The repo folder **is** the project. Claude reads the skills, commands and brand
docs inside it automatically.

---

## 3. Confirm the skills loaded

Skills live in `.claude/skills/` in the repo and load when the repo is open. Have
them check by typing `/` — the command list should include the repo's commands.

What ships with the project:

| Command | Makes |
|---|---|
| `/video` | 16:9 animated video — YouTube, presentations |
| `/reel` | 9:16 vertical reel — TikTok, Shorts, Instagram |
| `/carousel` | 1:1 or 4:5 animated carousel — LinkedIn, feed posts |

| Skill | Does |
|---|---|
| `remotion-best-practices` | Remotion patterns Claude reads before writing animation code |
| `setup-video-studio` | This skill — re-run the checklist any time |

If nothing appears, the repo isn't open as the project — check they're in the
repo directory, and restart Claude Code so it re-reads `.claude/`.

---

## 4. Verify end to end

The real test is a round trip through Claude, not a file listing. Ask them to
type something like:

> Render the shortest composition in this project and tell me how long it is.

Claude should find the composition, render it, and report back with real numbers.
If that works, the studio is connected.

---

## 5. Bring their own brand (optional)

Out of the box the project has neutral defaults. Video made with someone else's
colours looks like someone else's video, so this is where it becomes theirs.

Ask for whichever they have — none of it is required to start:

- **Colours** — hex codes for primary, accent, background, text
- **Fonts** — a Google Font name, or a `.ttf` file
- **Logo** — SVG preferred, PNG with transparency otherwise
- **Tone** — energetic and punchy, or calm and considered?

Then write it into a brand skill at
`.claude/skills/<their-brand>-brand/SKILL.md` so every future video picks it up
without being told again. Structure it as: colours, typography, logo usage,
imagery, voice.

If they have none of this, say so plainly and move on — they can add it later,
and a first video with default styling is better than no first video.

---

## 6. Optional add-ons, only if they ask

**AI voiceover (ElevenLabs).** For narration without recording. They create a
key at elevenlabs.io and put it in `.env`:

```bash
echo 'ELEVENLABS_API_KEY=your-key-here' >> .env
```

`.env` is gitignored. **Never ask them to paste a key into the chat** — have
them save it to the file and tell you it's done.

**GitHub CLI.** Only for pushing and pulling from the terminal:
`brew install gh` / `winget install --id GitHub.cli -e`, then `gh auth login`.

---

## Setting expectations honestly

Worth saying out loud at the end, because it prevents disappointment:

- **Renders take real time.** A 60-second animated video is minutes, not seconds.
- **The first render of any session is slowest** — bundling and browser startup.
- **Claude writes the video as code.** Changes are described in words and applied
  to the composition; it isn't a drag-and-drop editor, and that's the trade —
  harder to nudge one element, trivial to change all forty at once.
- **Iteration is the normal workflow.** First versions are drafts. Expect to say
  "make the text bigger, slow the intro" a few times.
