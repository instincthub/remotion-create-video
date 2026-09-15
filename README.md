# Create Video — an AI-driven video studio

Make real video by describing it. This repo is a [Remotion](https://remotion.dev)
project plus a set of Claude Code skills that turn a plain-English request into a
rendered `.mp4` — 16:9 explainers, 9:16 reels, animated carousels, and edited
talking-head footage with captions and overlays.

**You do not need to be a developer.** If you have never opened a terminal, the
setup below is still for you: an AI agent runs it.

---

## Quick start

### 1. Get the code

Install [Claude Code](https://claude.com/claude-code) (desktop app or CLI), then:

```bash
git clone https://github.com/instincthub/remotion-create-video.git
cd remotion-create-video
```

> **No git yet?** Download the ZIP from the green **Code** button on GitHub,
> unzip it, and skip to step 2. The agent installs git for you during setup.

### 2. Open the folder in Claude Code and say:

```
Set up video creation on my machine
```

That is the whole instruction. The agent takes it from there.

### 3. Wait ~20–40 minutes

Mostly downloads. The agent will ask you to approve a few things — anything
needing your password, and any download over ~100 MB — and will otherwise work
on its own.

**When it finishes, a test video will have rendered and played on your machine.**
That is the finish line, not a list of green ticks.

---

## What the agent does for you

Detects your operating system and follows the right path, then:

| # | Step | What it means |
|---|------|---------------|
| 1 | Runs the checklist | Sees what you already have, so nothing is downloaded twice |
| 2 | Installs the toolchain | Node, ffmpeg, Python, whisper.cpp — via Homebrew, winget, or apt |
| 3 | Downloads the speech model | ~487 MB, for captions that match what was actually said |
| 4 | Installs the project | `npm install`, plus Remotion's own headless browser |
| 5 | Re-runs the checklist | Must reach **0 failed** before continuing |
| 6 | Renders a test video | Proves the whole chain works end to end |
| 7 | Connects Claude | Confirms the skills and `/video` `/reel` `/carousel` commands load |

It asks you for things it cannot get itself — your password (you type it, never
the agent), where to put the repo, and optionally your brand colours, fonts and
logo.

---

## The checklist

The setup is driven by a script that verifies every prerequisite. Run it yourself
any time — before setup to see where you stand, or later if something breaks:

```bash
bash .claude/skills/setup-video-studio/scripts/doctor.sh                                        # macOS / Linux
```
```powershell
powershell -ExecutionPolicy Bypass -File .claude\skills\setup-video-studio\scripts\doctor.ps1   # Windows
```

It prints a PASS / WARN / FAIL table with the **exact fix command** for anything
missing, and exits non-zero while a required item is absent.

```
3. Media tools
  PASS  ffmpeg                 ffmpeg version 8.0.1
  WARN  ffmpeg text filters    no libass/drawtext in this build
  PASS  ffprobe                available

Result  13 passed  1 failed  2 warnings
```

**FAIL** blocks video creation. **WARN** is fine to leave — it tells you what is
degraded and why it does not matter.

---

## Prefer to install it yourself?

The agent path is recommended, but every step is documented for humans:

- [macOS](.claude/skills/setup-video-studio/rules/macos.md) — Homebrew
- [Windows](.claude/skills/setup-video-studio/rules/windows.md) — winget, native, no WSL needed
- [Linux](.claude/skills/setup-video-studio/rules/linux.md) — apt
- [First render](.claude/skills/setup-video-studio/rules/first-video.md) — proving it works
- [Troubleshooting](.claude/skills/setup-video-studio/rules/troubleshooting.md) — real failures and fixes

Short version, if you already have Node 18+, ffmpeg, Python 3.9+ and whisper-cli:

```bash
npm install
npx remotion browser ensure
npm run dev                              # preview at localhost:3000
npx remotion render MyComp out/test.mp4  # render a file
```

---

## Making video once you're set up

Open the repo in Claude Code and ask for what you want:

| Command | Makes | Aspect |
|---------|-------|--------|
| `/video` | Explainer / YouTube / presentation | 16:9 |
| `/reel` | TikTok, Shorts, Instagram Reels | 9:16 |
| `/carousel` | LinkedIn or feed carousel | 1:1 or 4:5 |
| `/slide-post` | Static slide deck (HTML → PDF) | 4:5 |

Or describe it in your own words — *"make me a 30-second reel explaining what a
vector database is"* — and the agent picks the right format.

### Two commands worth knowing

```bash
npm run dev                              # live preview, hot-reloads as you edit
npx remotion render <id> out/<name>.mp4  # render a finished file
```

List every video in the project with `npx remotion compositions`.

---

## Skills in this repo

Skills are instructions Claude reads automatically when the repo is open. They
live in `.claude/skills/`.

| Skill | Purpose |
|-------|---------|
| `setup-video-studio` | This setup process, and the health checklist |
| `remotion-best-practices` | Animation patterns Claude follows when writing compositions |
| `engaging-video-from-footage` | Overlays, captions and cutaways on real talking-head footage |
| `ai-playbook-brand` | A complete worked example of a brand system |
| `slide-content-generator` | Prompt for generating carousel content |
| `html-to-image` | Convert an HTML file to PNG |
| `dcsl-lesson-video` | Lesson-video format example |

### Make it your own brand

`ai-playbook-brand` is included as a **reference implementation** — copy its
shape, not its colours. Ask the agent:

> Set up a brand skill for my company

It will ask for your colours, fonts, logo and tone, then write
`.claude/skills/<your-brand>-brand/SKILL.md`. Every video after that picks it up
without being told again.

---

## Project structure

```
src/                                  # Remotion compositions — one folder per video
  Root.tsx                            # registry: every composition is listed here
.claude/
  skills/                             # what Claude reads
  commands/                           # /video, /reel, /carousel, /slide-post
.agents/skills/remotion-best-practices/   # Remotion patterns (symlinked into .claude/skills/)
designs/                              # static HTML slide decks
docs/                                 # brand documentation
public/                               # footage and assets (large files are gitignored)
out/                                  # rendered video lands here (gitignored)
```

---

## For the AI agent

If you are an agent reading this after a fresh clone, do this in order:

1. **Invoke the `setup-video-studio` skill** — it is the orchestrator and owns
   this whole flow. Do not improvise an install.
2. **Run the checklist before installing anything.** Many machines already have
   Node or ffmpeg; re-downloading wastes the user's time and bandwidth.
3. **Re-run the checklist after every install step**, not once at the end. When
   a batch fails you will not know which step broke.
4. **Never type or request the user's password.** Hand them `sudo` commands to
   run themselves. Never accept an API key pasted into chat — have them write it
   to `.env` and confirm.
5. **Ask before any download over ~100 MB**, naming the size.
6. **Finish with a real render**, not a green checklist. Confirm with the user
   that the file actually played.

Hard-won environment facts, so you do not rediscover them:

- ffmpeg from Homebrew and winget has **no libass and no drawtext**. This is
  expected. Captions render as transparent PNGs composited with the `overlay`
  filter — never reach for `subtitles=` or `drawtext=`.
- The Homebrew package is `whisper-cpp`; the binary it installs is **`whisper-cli`**.
- Whisper needs **16 kHz mono WAV**. Anything else transcribes to nonsense.
- In zsh, `$var:` inside an ffmpeg filter string is a history modifier and fails
  with `bad substitution`. Always write `${var}`.
- A file appearing on disk does not mean an encode finished. Gate on **frame
  count** via `ffprobe`, not on file existence.
- Never background multiple `npx remotion still` calls — each boots its own
  Chrome and a handful will exhaust the machine.

Full detail in
[`.claude/skills/setup-video-studio/SKILL.md`](.claude/skills/setup-video-studio/SKILL.md).

### Windows note: the symlinked skill

`.claude/skills/remotion-best-practices` is a **symlink** to
`.agents/skills/remotion-best-practices`. Git on Windows checks symlinks out as
plain text files unless symlink support is on, so the skill may not load after a
Windows clone.

Fix either by enabling symlinks before cloning (needs Developer Mode or an
elevated shell):

```powershell
git clone -c core.symlinks=true https://github.com/instincthub/remotion-create-video.git
```

Or by copying the real folder over the broken link after cloning:

```powershell
Remove-Item .claude\skills\remotion-best-practices -Force
Copy-Item .agents\skills\remotion-best-practices .claude\skills\ -Recurse
```

Either way, the content is always readable at
`.agents/skills/remotion-best-practices/`.

---

## Requirements

| | Minimum |
|---|---|
| OS | macOS 12+, Windows 10 (1809+), or Linux |
| Disk | 10 GB free |
| RAM | 8 GB (16 GB comfortable) |
| Node | 18+ |
| Claude | A Claude account with Claude Code |

A discrete GPU is not required — Remotion renders in headless Chrome and works
on integrated graphics.

---

## Docs

- [Remotion fundamentals](https://www.remotion.dev/docs/the-fundamentals)
- [Claude Code](https://docs.claude.com/en/docs/claude-code)
- Brand docs in `docs/` — colour, typography, imagery, voice, logo
