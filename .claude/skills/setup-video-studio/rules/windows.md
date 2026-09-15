# Windows install path

Windows 10 (build 1809+) or Windows 11. Everything runs natively — **WSL is not
required**. Node, Remotion, ffmpeg and whisper.cpp all have native Windows builds.

Use **PowerShell**, not Command Prompt. Tell the user to open it by pressing
`Win`, typing `PowerShell`, and pressing Enter.

Run the checklist first — skip anything already passing.

```powershell
powershell -ExecutionPolicy Bypass -File .claude\skills\setup-video-studio\scripts\doctor.ps1
```

---

## 0. Before anything: the two Windows facts that cause most confusion

**PATH does not refresh in an open terminal.** After every install, the command
will still read as "not found" in the window you installed from. **Close
PowerShell and open a new one.** Do this after each install rather than
concluding the install failed.

**Script execution may be blocked.** If running the checklist produces a message
about scripts being disabled, the `-ExecutionPolicy Bypass` flag above handles it
for that one run without changing any system setting. Prefer it over telling the
user to change their execution policy permanently.

---

## 1. winget

Windows' package manager. Check it exists:

```powershell
winget --version
```

If missing: it ships as **App Installer** from the Microsoft Store. Have them
open the Store, search "App Installer", install it, then reopen PowerShell.

(Chocolatey works too if they already have it — substitute `choco install`.)

---

## 2. The toolchain

Run these one at a time, not as a batch — each may show its own licence prompt.

```powershell
winget install --id Git.Git -e --source winget
winget install --id OpenJS.NodeJS.LTS -e --source winget
winget install --id Gyan.FFmpeg -e --source winget
winget install --id Python.Python.3.12 -e --source winget
```

**Then close PowerShell and open a new one.** Verify:

```powershell
git --version; node -v; npm -v; ffmpeg -version; python --version
```

If `python` opens the Microsoft Store instead of printing a version, Windows'
App Execution Alias is intercepting it. Fix: **Settings → Apps → Advanced app
settings → App execution aliases** → turn **off** `python.exe` and
`python3.exe`. Then reopen PowerShell.

---

## 3. whisper.cpp — the one manual step

There is no winget package for whisper.cpp, so this is a download-and-unzip.

1. Open <https://github.com/ggml-org/whisper.cpp/releases> and find the latest
   release.
2. Under **Assets**, download the Windows x64 build. The asset is usually named
   `whisper-bin-x64.zip`; some releases also ship `whisper-blas-bin-x64.zip`
   (faster on CPUs with BLAS) and CUDA variants for NVIDIA GPUs. **Asset names
   change between releases — read the actual list rather than assuming a
   filename.** Plain `whisper-bin-x64.zip` is the safe default.
3. Extract it to `%USERPROFILE%\.whisper\`.
4. Add that folder to PATH:

```powershell
$whisper = Join-Path $env:USERPROFILE ".whisper"
[Environment]::SetEnvironmentVariable(
  "Path",
  [Environment]::GetEnvironmentVariable("Path", "User") + ";$whisper",
  "User")
```

5. **Open a new PowerShell** and check:

```powershell
whisper-cli --version
```

**If `whisper-cli` isn't found but `main.exe` is in that folder**, you have an
older build where the binary was called `main`. Rename it:

```powershell
Rename-Item "$env:USERPROFILE\.whisper\main.exe" "whisper-cli.exe"
```

---

## 4. The whisper model

**487 MB** — say the size and ask before downloading.

```powershell
$dir = Join-Path $env:USERPROFILE ".cache\whisper-cpp"
New-Item -ItemType Directory -Force -Path $dir | Out-Null
Invoke-WebRequest `
  -Uri "https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-small.en.bin" `
  -OutFile (Join-Path $dir "ggml-small.en.bin")
```

`Invoke-WebRequest` shows no progress bar for large files by default and looks
frozen for several minutes. Warn them, or set `$ProgressPreference = 'Continue'`
first. If it's painfully slow, `curl.exe -L -o <path> <url>` is faster —
note the `.exe`, since bare `curl` is an alias for `Invoke-WebRequest`.

---

## 5. Python imaging libraries

```powershell
python -m venv $env:USERPROFILE\.venvs\video
& "$env:USERPROFILE\.venvs\video\Scripts\pip.exe" install --quiet numpy pillow
```

Use `$env:USERPROFILE\.venvs\video\Scripts\python.exe` for caption and badge
scripts. Note **`Scripts\`** on Windows where macOS and Linux use `bin/`.

---

## 6. Fonts (optional)

Download Montserrat from
[fonts.google.com/specimen/Montserrat](https://fonts.google.com/specimen/Montserrat),
unzip, right-click `Montserrat-Bold.ttf` → **Install for all users**.

"Install for all users" matters: a per-user font install lands somewhere Python
and ffmpeg may not look.

---

## 7. The project

Clone with symlink support on — see the note below for why:

```powershell
cd $env:USERPROFILE\Documents
git clone -c core.symlinks=true https://github.com/instincthub/remotion-create-video.git
cd remotion-create-video
npm install
npx remotion browser ensure
```

Ask where they want it before cloning.

### The symlinked skill — check this after cloning

`.claude/skills/remotion-best-practices` is a **symlink** into `.agents/skills/`.
Git on Windows only creates real symlinks when `core.symlinks=true` **and** the
user has Developer Mode on or is in an elevated shell. Otherwise git writes a
small text file containing the target path, and the skill silently fails to load
— Claude then writes Remotion code without the project's patterns.

Verify it resolved:

```powershell
Test-Path .claude\skills\remotion-best-practices\SKILL.md
```

`False` means the symlink didn't resolve. Replace it with a real copy:

```powershell
Remove-Item .claude\skills\remotion-best-practices -Force
Copy-Item .agents\skills\remotion-best-practices .claude\skills\ -Recurse
```

The content is always readable at `.agents\skills\remotion-best-practices\`
regardless.

---

## 8. Re-run the checklist

```powershell
powershell -ExecutionPolicy Bypass -File .claude\skills\setup-video-studio\scripts\doctor.ps1
```

Expect `0 failed`. Then go to [`first-video.md`](first-video.md).

---

## Windows gotchas worth knowing

**`npm install` is slow, and Defender is usually why.** Real-time scanning
inspects every one of the tens of thousands of files in `node_modules`. If it
takes more than ~10 minutes, they can add the repo folder to Defender's
exclusions (Windows Security → Virus & threat protection → Manage settings →
Exclusions). Their machine, their call — suggest it, don't do it.

**Long paths.** Deep `node_modules` trees can exceed the legacy 260-character
limit and produce `ENAMETOOLONG` or `EPERM`. Two mitigations: clone to a short
path like `C:\dev\` rather than a deep Documents folder, and enable long paths:

```powershell
git config --global core.longpaths true
```

**Line endings.** Git on Windows may rewrite `\n` to `\r\n` and break shell
scripts in the repo. Set this before cloning:

```powershell
git config --global core.autocrlf input
```

**Paths in commands.** Windows uses `\`, and a path with spaces (`C:\Users\Jane
Doe\...`) must be quoted. When passing paths to ffmpeg, quote them.

**PowerShell `curl` is not curl.** `curl` is an alias for `Invoke-WebRequest`
with different flags entirely. Use `curl.exe` when you want real curl.

**ffmpeg text filters.** As on macOS, the winget ffmpeg build may lack libass /
drawtext. Not a blocker — captions render as transparent PNGs composited with
the `overlay` filter.

**GPU rendering.** Remotion renders in headless Chrome and works fine on
integrated graphics. A discrete GPU makes renders faster but nothing here
requires one.
