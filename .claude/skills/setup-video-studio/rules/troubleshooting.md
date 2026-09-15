# Troubleshooting

Real failures and their fixes. Check the symptom, not the tool you suspect.

**Before anything else: re-run the checklist.** It names the broken item in one
line and most of what follows becomes unnecessary.

---

## "command not found" right after installing it

Nearly always PATH, not a failed install.

1. **Open a new terminal.** PATH is read at shell start; an open shell doesn't
   see a new install. This alone fixes most cases.
2. **macOS, Apple Silicon:** Homebrew is at `/opt/homebrew/bin`, and if the
   shellenv line was never added it isn't on PATH. Check `brew --prefix`, then:
   ```bash
   echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
   ```
3. **Windows:** close PowerShell entirely and reopen. If it persists, confirm
   the folder is really on PATH:
   ```powershell
   $env:Path -split ';' | Select-String -Pattern 'ffmpeg|node|whisper'
   ```

---

## Python

**`externally-managed-environment` on `pip install`.** Modern Python refuses to
install into the system interpreter. Correct fix is a venv — never
`--break-system-packages`:

```bash
python3 -m venv ~/.venvs/video
~/.venvs/video/bin/pip install numpy pillow
```

**Windows opens the Microsoft Store instead of running Python.** App Execution
Aliases are intercepting. Settings → Apps → Advanced app settings → App execution
aliases → turn **off** `python.exe` and `python3.exe`.

**`ModuleNotFoundError: No module named 'PIL'`.** Pillow installs as `pillow` but
imports as `PIL` — that's normal. You're running system Python instead of the
venv: use the full path `~/.venvs/video/bin/python`.

---

## Whisper

**`whisper-cli: command not found` after `brew install whisper-cpp`.** The
formula is `whisper-cpp`; the binary is `whisper-cli`. If neither exists,
`brew reinstall whisper-cpp`. On Windows, older release builds name it
`main.exe` — rename it to `whisper-cli.exe`.

**Model fails to load / "invalid model file".** Almost always a truncated
download that left a plausible file. The model must be ~487 MB; the checklist
fails it under 400 MB. Delete and re-download:

```bash
rm ~/.cache/whisper-cpp/ggml-small.en.bin
curl -L -o ~/.cache/whisper-cpp/ggml-small.en.bin \
  https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-small.en.bin
```

**Transcription is empty or garbage.** Whisper needs **16 kHz mono WAV**. Feed it
an mp4 or a 48 kHz stereo file and you get nonsense. Convert first:

```bash
ffmpeg -i input.mp4 -ar 16000 -ac 1 -c:a pcm_s16le voice16k.wav
```

**The first caption is timed to 0:00 when speech starts later.** A known DTW
artefact: with `-dtw`, a sentence after leading silence mis-anchors to t=0.
Verify speech onset with an RMS scan and hand-fix the opening cue.

---

## ffmpeg

**`No such filter: 'drawtext'` / `subtitles`.** Expected on most Homebrew and
winget builds — they're compiled without libass and drawtext. Not a bug. The
pipeline renders captions as transparent PNGs and composites them with `overlay`,
which is deterministic and fully styleable. Confirm with:

```bash
ffmpeg -filters | grep -iE 'subtitle|drawtext'    # no output is normal
```

If you genuinely need burned-in `.srt`: `brew reinstall ffmpeg` sometimes yields
a fuller bottle, but the PNG path is the supported one.

**`moov atom not found`.** The file is truncated or still being written. Two
causes:

1. You read it while encoding was in progress. Gate on **frame count**, not file
   existence — a file appears the moment encoding starts:
   ```bash
   until [ "$(ffprobe -v error -count_frames -select_streams v:0 \
              -show_entries stream=nb_read_frames -of csv=p=0 prev.mp4 2>/dev/null)" = "5234" ]
   do sleep 5; done
   ```
2. **Two ffmpeg processes wrote the same output file.** This produces a file that
   looks plausible by size and is unplayable, and neither process errors. If a
   concurrent write is even suspected, delete every affected output and rebuild
   the set sequentially — file size tells you nothing about which survived.

**`bad substitution` in a filter string (zsh).** `$var:` is a zsh history
modifier. `gblur=sigma=$s:steps=3` dies on the `:s`. Always brace it: `${s}`.

---

## Remotion

**First render hangs at "Downloading Chrome Headless Shell".** It genuinely is
downloading ~150 MB. Let it finish, or pre-fetch it:

```bash
npx remotion browser ensure
```

**`Error: Could not find the browser`.** The download was interrupted. Delete
`node_modules/.remotion/` and re-run `npx remotion browser ensure`.

**Render is out-of-memory or the machine locks up.** Concurrency is too high for
the machine. Cap it:

```bash
npx remotion render <id> out/x.mp4 --concurrency=2
```

**Never background multiple `npx remotion still` calls.** Each boots its own
Chrome; a handful of them has taken a machine down. Render stills sequentially in
one process.

**Composition not found.** The id must match `<Composition id="...">` in
`src/Root.tsx` exactly, and it's case-sensitive. List them:

```bash
npx remotion compositions
```

**TypeScript errors block the render.** Remotion typechecks before rendering.
Read the error — it names the file and line. `npm run lint` shows everything at
once.

---

## npm / install

**`npm install` fails with `EACCES`.** Permissions. **Do not `sudo npm install`**
— it makes the problem permanent. Install Node via Homebrew or winget rather
than a system package, or use a version manager (nvm, fnm).

**`ENAMETOOLONG` / `EPERM` on Windows.** Path length. Clone to a short path like
`C:\dev\`, and:

```powershell
git config --global core.longpaths true
```

**`npm install` takes forever on Windows.** Defender scanning `node_modules`.
Adding the folder to exclusions helps — their machine, their decision.

**Disk full mid-install.** `node_modules` is ~500 MB, the whisper model 487 MB,
the Remotion browser ~150 MB, plus renders. Under 10 GB free, expect trouble.

---

## git

**"You have not agreed to the Xcode license agreements" (macOS).** The tools are
installed but locked. The user runs this themselves — it needs their password:

```bash
sudo xcodebuild -license accept
```

**`Permission denied (publickey)` on clone.** They used the SSH URL without SSH
keys. Use HTTPS:

```bash
git clone https://github.com/instincthub/remotion-create-video.git
```

---

## Still stuck?

Collect this and it's usually obvious:

```bash
bash .claude/skills/setup-video-studio/scripts/doctor.sh
uname -a && node -v && npm -v && ffmpeg -version | head -1
```

Report the **exact error text**, not a paraphrase. "It didn't work" is
unfixable; the error string is usually the whole answer.
