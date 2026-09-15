---
name: setup-video-studio
description: >
  Set up a complete AI video creation studio on a brand-new machine, step by
  step, with Claude Code or Claude Desktop. Detects the operating system
  (macOS / Windows / Linux) and installs the right toolchain for it — Node +
  Remotion for animated video, ffmpeg for cutting and encoding, whisper.cpp for
  transcription and captions, Python for caption/badge image generation — then
  clones the video project, installs dependencies, and runs a verification
  checklist until every item passes. Use this whenever someone says they want to
  "set up video creation", "get this working on my machine", "install the video
  system", "I want to make videos like you do", is onboarding onto the
  remotion-create-video repo, or hits a missing-tool error (ffmpeg not found,
  whisper-cli not found, remotion won't render) and needs the environment
  repaired. Also use it to re-run the health checklist on an existing setup.
---

# Set Up a Video Studio

Your job is to take someone from a bare machine to **a working video studio that
has actually rendered a video** — not to a list of instructions they have to
follow alone.

You are the one running the commands. They approve; you do the work. Assume the
person is **not a developer**: they may never have opened a terminal. Never
answer "install ffmpeg" and stop — install it, verify it, and show them the
checklist going green.

## The one rule

**The checklist is the source of truth.** Never claim the setup works because a
command printed no error. Run the checklist, read what it says, and only call
the setup done when it reports `0 failed`.

```bash
bash .claude/skills/setup-video-studio/scripts/doctor.sh
```

Run it at the start (to see where they stand), after every install step (to
confirm the step landed), and at the end (to sign off). It is cheap. Re-run it
more often than feels necessary.

---

## Step 1 — Find out what machine you're on

Never assume. Detect it, then say what you found.

```bash
uname -s && uname -m          # Darwin = macOS, Linux = Linux
```

On Windows, the Bash tool may not exist. If `uname` is unavailable, or the paths
look like `C:\Users\...`, you are on Windows — use PowerShell:

```powershell
$env:OS; $env:PROCESSOR_ARCHITECTURE
```

Then read the matching guide and follow it:

| Detected | Read | Checklist to run |
|---|---|---|
| `Darwin` | [`rules/macos.md`](rules/macos.md) | `bash scripts/doctor.sh` |
| Windows | [`rules/windows.md`](rules/windows.md) | `powershell -ExecutionPolicy Bypass -File scripts\doctor.ps1` |
| `Linux` | [`rules/linux.md`](rules/linux.md) | `bash scripts/doctor.sh` |

Tell the person which path you're taking and roughly how long it takes
(**20–40 minutes**, most of it downloads) so they can decide whether to start now.

---

## Step 2 — Run the checklist first, before installing anything

Run it before you install a single thing. Some machines already have Node or
ffmpeg, and reinstalling wastes their time and bandwidth.

Read the output and tell them in plain language: *"You already have Node and
Python. You're missing ffmpeg and the transcription model — about 600 MB of
downloads."*

If the skill hasn't been cloned to their machine yet, they have no checklist to
run — go to Step 3 first, then come back.

---

## Step 3 — Install what's missing, one item at a time

Work top-down through the checklist's **Blocking** section. The checklist prints
the exact fix command for every failure — use it.

After each install, **re-run the checklist**. Do not batch five installs and
check at the end; when something fails you won't know which one.

Rules while installing:

- **Ask before anything that needs their password.** `sudo`, the Xcode license
  prompt, and the Homebrew installer all need a password *you must never type or
  ask them for*. Hand them the command and let them run it in their own terminal,
  then continue once they confirm.
- **Ask before a download over ~100 MB.** The whisper model is 487 MB and the
  Remotion browser is ~150 MB. On a metered or slow connection that matters.
  Say the size, then ask.
- **Long installs go in the background.** Homebrew and `npm install` can take
  several minutes. Start them in the background and keep talking to the person
  rather than leaving a dead terminal.
- **PATH changes need a new shell.** After installing Node, ffmpeg, or Python,
  a command may still read as "not found" in the current session. Open a fresh
  shell before you conclude an install failed.

---

## Step 4 — Get the project

If they don't have the repo yet:

```bash
git clone https://github.com/instincthub/remotion-create-video.git
cd remotion-create-video
npm install
```

Ask where they want it before cloning — don't drop a repo in a surprising place.
`~/Documents/code_projects/` is a reasonable default to offer; their Desktop is
fine too. Confirm the choice, then clone.

`npm install` takes 2–5 minutes. Then:

```bash
npx remotion browser ensure    # ~150 MB headless Chrome, one time
```

Remotion renders in its own headless Chrome. They do not need to install Chrome
themselves.

---

## Step 5 — Prove it works by rendering something

A checklist of green ticks is not proof. **Render a real video before you call
this done.** Follow [`rules/first-video.md`](rules/first-video.md): it opens
Remotion Studio, renders a short composition, and confirms a playable file
landed on disk.

If the render fails, the setup is not finished — go to
[`rules/troubleshooting.md`](rules/troubleshooting.md).

---

## Step 6 — Connect it to Claude

The toolchain is only half the system; the other half is Claude knowing how to
drive it. Walk them through
[`rules/claude-setup.md`](rules/claude-setup.md) — installing Claude Code,
opening the repo as a project, and confirming the bundled skills
(`/video`, `/reel`, `/carousel`, `remotion-best-practices`) are visible.

Finish by asking them what they actually want to make, and then make the first
one *with* them. The setup is only real once they've shipped something.

---

## When something is missing, ask — don't guess

Some things cannot be installed for them. When the checklist or a render needs
one, **stop and ask for it in plain language**, explaining what it's for and
whether it's optional:

| What | Why it's needed | Required? |
|---|---|---|
| Admin password | `sudo`, Homebrew install, Xcode license | Yes — they run it themselves, never you |
| Where to put the repo | So they can find their own files later | Yes |
| A brand: colours, fonts, logo | Otherwise video comes out generic | No — a neutral default ships with the repo |
| Footage / audio / a script | The raw material for the first real video | Only when making a real video |
| ElevenLabs API key | AI voiceover, if they want narration without recording | No — optional feature |
| A font file | If their brand uses a non-Google font | No |

Ask for **one thing at a time, when you actually need it**. Do not open with a
form of eight questions.

**Never ask them to paste an API key into the chat.** Have them put it in a
`.env` file in the repo (already gitignored) and tell you once it's saved:

```bash
echo 'ELEVENLABS_API_KEY=your-key-here' >> .env
```

---

## What "done" means

Every one of these, verified — not assumed:

- [ ] Checklist reports **0 failed**
- [ ] `npm run dev` opens Remotion Studio in a browser
- [ ] A test video rendered and plays
- [ ] They know the command to render again on their own
- [ ] Claude Code is installed and can see the repo's skills
- [ ] They've picked a first real video to make

Warnings in the checklist are fine to leave. Failures are not.

---

## Reference

- [`rules/macos.md`](rules/macos.md) — macOS install path (Homebrew)
- [`rules/windows.md`](rules/windows.md) — Windows install path (winget)
- [`rules/linux.md`](rules/linux.md) — Linux install path (apt)
- [`rules/checklist.md`](rules/checklist.md) — what each check means and why it's there
- [`rules/first-video.md`](rules/first-video.md) — the proving render
- [`rules/claude-setup.md`](rules/claude-setup.md) — Claude Code / Desktop + the skills
- [`rules/troubleshooting.md`](rules/troubleshooting.md) — failures seen in the wild and their fixes
- `scripts/doctor.sh` — the checklist (macOS / Linux)
- `scripts/doctor.ps1` — the checklist (Windows)
