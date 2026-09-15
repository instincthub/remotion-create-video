# Linux install path

Debian / Ubuntu shown. On Fedora swap `apt install` for `dnf install`, on Arch
for `pacman -S`; package names are close enough to guess.

Run the checklist first — skip anything already passing.

```bash
bash .claude/skills/setup-video-studio/scripts/doctor.sh
```

---

## 1. Core tools

```bash
sudo apt update
sudo apt install -y git ffmpeg python3 python3-venv python3-pip build-essential cmake
```

`sudo` needs their password — **they run it, not you**.

`build-essential` and `cmake` are only needed to compile whisper.cpp in step 3.

---

## 2. Node.js 18+

Distro Node is often too old. Check first:

```bash
node -v
```

If it's missing or under v18, use NodeSource:

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
```

(`nvm` or `fnm` work equally well if they already use one.)

---

## 3. whisper.cpp

No apt package — build it, which takes 2–3 minutes:

```bash
git clone https://github.com/ggml-org/whisper.cpp.git ~/.local/src/whisper.cpp
cd ~/.local/src/whisper.cpp
cmake -B build && cmake --build build --config Release -j
```

The binary lands at `build/bin/whisper-cli`. Put it on PATH:

```bash
mkdir -p ~/.local/bin
ln -sf ~/.local/src/whisper.cpp/build/bin/whisper-cli ~/.local/bin/whisper-cli
```

If `~/.local/bin` isn't on PATH:

```bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

Verify with `whisper-cli --version` in a new shell.

---

## 4. The whisper model

**487 MB** — say the size and ask first.

```bash
mkdir -p ~/.cache/whisper-cpp
curl -L -o ~/.cache/whisper-cpp/ggml-small.en.bin \
  https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-small.en.bin
```

---

## 5. Python imaging libraries

```bash
python3 -m venv ~/.venvs/video
~/.venvs/video/bin/pip install --quiet numpy pillow
```

Use `~/.venvs/video/bin/python` for caption and badge scripts. Never
`pip install` into system Python — Debian-based distros refuse with
`externally-managed-environment`, and overriding it breaks apt-managed packages.

---

## 6. Fonts (optional)

```bash
mkdir -p ~/.local/share/fonts
# copy Montserrat-Bold.ttf there, then:
fc-cache -f
fc-list | grep -i montserrat    # confirm
```

---

## 7. The project

```bash
git clone https://github.com/instincthub/remotion-create-video.git
cd remotion-create-video
npm install
npx remotion browser ensure
```

---

## 8. Re-run the checklist

```bash
bash .claude/skills/setup-video-studio/scripts/doctor.sh
```

Expect `0 failed`. Then go to [`first-video.md`](first-video.md).

---

## Linux gotchas

**Headless servers need Chrome's system libraries.** Remotion's headless Chrome
won't start on a minimal install. If a render fails with a missing `.so`:

```bash
sudo apt install -y libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 \
  libdrm2 libxkbcommon0 libxcomposite1 libxdamage1 libxfixes3 \
  libxrandr2 libgbm1 libasound2
```

**No display?** Remotion renders headless and needs no X server. If something
insists on a display, `xvfb-run` wraps it.

**ffmpeg text filters.** `apt`'s ffmpeg usually *does* include libass and
drawtext — so the checklist may pass that line where macOS warns. Either way the
PNG-overlay caption path works, and it's the one the pipeline uses.
