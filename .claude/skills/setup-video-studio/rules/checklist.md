# The checklist — what each item means

The checklist is the contract: **0 failed means ready, anything else means not
ready.** This file explains what each line is actually testing, so you can
explain a failure instead of just reading it out.

```bash
bash  .claude/skills/setup-video-studio/scripts/doctor.sh                       # macOS / Linux
powershell -ExecutionPolicy Bypass -File .claude\skills\setup-video-studio\scripts\doctor.ps1   # Windows
```

Both take an optional repo path: `bash doctor.sh /path/to/repo`. With no
argument they check the repo the script lives in.

**Exit code 0** = every required check passed. **Exit 1** = something is missing.

---

## Statuses

| | Meaning |
|---|---|
| **PASS** | Verified working. |
| **WARN** | Not blocking. Something optional or degraded — say what's lost and move on. |
| **FAIL** | Blocking. Video creation will not work. The fix command is printed with it. |

Never talk someone past a FAIL. Warnings are fine to leave alone.

---

## 1. Package manager

**Homebrew** (macOS) / **winget** (Windows) / **apt** (Linux) — where everything
else comes from. Fails first because nothing after it can be installed without it.

## 2. Core tools

**git** — clones the project and tracks changes. On macOS it ships with the Xcode
Command Line Tools, and the checklist distinguishes three states: missing,
present, and *present but blocked by an unaccepted Xcode licence* — the last is
common and has a different fix (`sudo xcodebuild -license accept`).

**Node.js 18+** — runs Remotion. The version matters: Remotion 4 uses modern APIs
and an older Node fails in confusing ways rather than refusing outright.

**npm** — installs the project's dependencies. Ships with Node.

**Python 3.9+** — draws caption and badge PNGs via Pillow, and runs the alignment
and timing scripts.

## 3. Media tools

**ffmpeg** — cuts, joins, encodes, muxes. The workhorse under every operation
that isn't a Remotion render.

**ffprobe** — inspects media: duration, fps, dimensions, codecs, frame counts.
Ships with ffmpeg, and it's how you verify a render is real rather than
plausible-looking.

**ffmpeg text filters** — *warning only.* Most Homebrew and winget builds omit
libass and drawtext, so `subtitles=`, `ass=` and `drawtext=` fail to parse. The
pipeline never uses them: captions are rendered as transparent PNGs with Pillow
and composited with `overlay`, which is deterministic and fully styleable. A
WARN here is the expected state, not a problem to fix.

## 4. Transcription

**whisper-cli** — on-device speech-to-text. Captions come from what was actually
said, and cuts can be made on word boundaries. Note the name: the package is
`whisper-cpp`, the binary is `whisper-cli`.

**whisper model** — `ggml-small.en.bin`, ~487 MB, at
`~/.cache/whisper-cpp/`. The checklist fails it below 400 MB, which catches an
interrupted download that left a file of the right name and the wrong size —
a failure that otherwise surfaces much later as "invalid model file".

Deliberately `~/.cache/`, not `/tmp/`: a `/tmp` model vanishes on reboot and the
487 MB has to come down again.

## 5. Project

**repo** — a `package.json` with `remotion` in it. Confirms the checklist is
pointed at a real video project, not an arbitrary folder.

**dependencies** — `node_modules/remotion` exists; reports the installed version.

**Remotion browser** — *warning only.* Remotion renders in its own headless
Chrome at `node_modules/.remotion/chrome-headless-shell`. It downloads on first
render; `npx remotion browser ensure` fetches it ahead of time so the first
render isn't a mysterious two-minute pause.

## 6. Optional

**Montserrat Bold** — default caption and badge font. A different brand font is
fine; the warning just means the default isn't there.

**GitHub CLI** — only for pushing and pulling from the terminal.

**disk space** — 10 GB minimum. `node_modules` (~500 MB) + whisper model
(487 MB) + Remotion browser (~150 MB) + footage + renders adds up faster than
people expect.

---

## Reading a result out loud

Don't recite the table. Say what it means:

> You're most of the way there — Node, Python and ffmpeg are all good. Two
> things missing: the transcription tool and its model, about 500 MB of
> download. Want me to grab them now?

And when it's clean:

> Checklist is green, 0 failures. Let's prove it by rendering something.

---

## Extending the checklist

Add a check when a new dependency becomes required. Keep the shape:

```bash
if have newtool; then
  pass "newtool" "$(newtool --version)"
else
  fail "newtool" "not installed" "brew install newtool"
fi
```

Rules for a good check:

- **`fail` only for genuinely blocking things.** Everything else is `warn`.
- **The fix must be a runnable command**, not advice. It gets printed verbatim
  in the summary for the user to copy.
- **Verify capability, not presence.** `git` being on PATH didn't mean it worked
  — that's why the check reads its output rather than just testing the path.
- **Mirror it in `doctor.ps1`**, or Windows users get a checklist that passes
  while missing something.
