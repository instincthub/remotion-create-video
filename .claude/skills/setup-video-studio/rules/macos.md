# macOS install path

Works on Apple Silicon (M1–M4) and Intel Macs, macOS 12 Monterey or newer.

Run the checklist first — skip anything already passing.

```bash
bash .claude/skills/setup-video-studio/scripts/doctor.sh
```

---

## 1. Xcode Command Line Tools (gives you `git`)

```bash
xcode-select --install
```

A GUI dialog appears — the user clicks **Install** and waits (~5 min). This is
not a terminal download; if nothing seems to happen, tell them to check for the
dialog behind other windows.

**If `git --version` says "You have not agreed to the Xcode license agreements":**
the tools are installed but unusable until the licence is accepted. They must run
this themselves — it asks for their password:

```bash
sudo xcodebuild -license accept
```

Never type a password for them, and never ask them to give you one.

---

## 2. Homebrew

The package manager everything else comes from. Check first:

```bash
brew --version
```

If missing, **the user runs this themselves** — the installer asks for their
password:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

On Apple Silicon, Homebrew installs to `/opt/homebrew` and the installer prints
two `eval` lines to add it to PATH. **They must run those lines** or `brew` won't
be found in a new terminal:

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

Confirm with `brew --version` before moving on.

---

## 3. The toolchain

```bash
brew install node ffmpeg python whisper-cpp
```

Several minutes, a few hundred MB. Run it in the background and stay in
conversation.

What each one is for, in case they ask:

| Package | Purpose |
|---|---|
| `node` | Runs Remotion, which turns React code into video frames |
| `ffmpeg` | Cuts, joins, encodes and muxes video and audio |
| `python` | Generates caption and badge PNGs (via Pillow) |
| `whisper-cpp` | Transcribes speech to text, on-device, so captions match what was said |

**Note the binary name:** `whisper-cpp` installs a command called **`whisper-cli`**,
not `whisper`. If `whisper-cli` isn't found after install, `brew reinstall whisper-cpp`.

---

## 4. The whisper model

The transcription engine needs a model file. It is **487 MB** — say so and ask
before downloading.

```bash
mkdir -p ~/.cache/whisper-cpp
curl -L -o ~/.cache/whisper-cpp/ggml-small.en.bin \
  https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-small.en.bin
```

`small.en` is the right default: English-only, accurate enough for captions, and
fast on Apple Silicon. Alternatives, only if asked:

- `ggml-base.en.bin` (~148 MB) — faster, noticeably worse on names and accents
- `ggml-medium.en.bin` (~1.5 GB) — better, much slower
- `ggml-small.bin` (no `.en`) — multilingual, for non-English footage

The checklist fails the model if the file is under 400 MB, which catches a
download that was interrupted and left a plausible-looking stub.

---

## 5. Python imaging libraries

Captions and badges are drawn as transparent PNGs with Pillow. Use a virtual
environment — never `pip install` into system Python on macOS, it will refuse
with an `externally-managed-environment` error.

```bash
python3 -m venv ~/.venvs/video
~/.venvs/video/bin/pip install --quiet numpy pillow
```

Use `~/.venvs/video/bin/python` for any caption or badge script. A venv under
`~/.venvs/` survives reboots; one in `/tmp` does not.

---

## 6. Fonts (optional)

Montserrat Bold is the default caption and badge font. Download the family from
[fonts.google.com/specimen/Montserrat](https://fonts.google.com/specimen/Montserrat),
unzip, and double-click `Montserrat-Bold.ttf` → **Install Font**. It lands in
`~/Library/Fonts/`.

Skip this if they have their own brand font — just note which font to use instead.

---

## 7. Re-run the checklist

```bash
bash .claude/skills/setup-video-studio/scripts/doctor.sh
```

Expect `0 failed`. Then go to [`first-video.md`](first-video.md).

---

## macOS gotchas worth knowing

**ffmpeg from Homebrew has no libass or drawtext.** `subtitles=`, `ass=` and
`drawtext=` filters all fail to parse. This is expected, not broken — the pipeline
renders captions as transparent PNGs and composites them with the `overlay`
filter, which is deterministic and fully styleable. Check with:

```bash
ffmpeg -filters | grep -iE 'subtitle|drawtext'    # prints nothing — that's normal
```

**zsh eats `$var:` inside filter strings.** `gblur=sigma=$s:steps=3` dies with
`bad substitution` because zsh reads `:s` as a history modifier. Always write
`${s}` inside ffmpeg filter strings.

**Globs that match nothing are a hard error in zsh** (`no matches found`), which
aborts a `&&` chain. Guard cleanup globs with `2>/dev/null`.

**Apple Silicon vs Intel PATH.** Homebrew is `/opt/homebrew/bin` on Apple Silicon
and `/usr/local/bin` on Intel. If a just-installed command isn't found, this is
usually why — check `brew --prefix` and open a new terminal.
