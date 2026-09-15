# The proving render

A green checklist means the tools are installed. It does **not** mean video comes
out. This step is what turns "installed" into "working", and you do not skip it.

---

## 1. See the compositions the project knows about

```bash
cd <repo>
npx remotion compositions
```

This prints every composition with its id, dimensions, fps and duration. It is
also the first real exercise of the whole chain — Node, the bundler, TypeScript
and Remotion all have to work for it to print anything.

**If this fails, stop and fix it** ([`troubleshooting.md`](troubleshooting.md)).
Everything downstream depends on it.

---

## 2. Render a short one

Pick the shortest composition in the list. On a fresh clone of the starter that
is **`MyComp`** — 2 seconds, 1280×720, which renders in a few seconds even on a
slow machine.

```bash
npx remotion render MyComp out/test.mp4
```

The first render is slower than later ones: Remotion downloads and launches its
headless Chrome, and bundles the project. Two to three minutes on a first run is
normal. Say so, so it doesn't look hung.

If `MyComp` isn't in the list, use the shortest id that is — deliberately pick a
short one, since a five-minute composition is a poor smoke test.

---

## 3. Verify the file is real

A file appearing on disk is not proof. An interrupted encode leaves a
plausible-looking file that will not play.

```bash
ffprobe -v error -show_entries format=duration,size \
        -show_entries stream=codec_name,width,height -of default=nw=1 out/test.mp4
```

You want a duration close to the composition's, a sane size, and `codec_name=h264`.
A `moov atom not found` error means the file is truncated — re-render.

Then open it so the person sees their own machine producing video:

```bash
open out/test.mp4          # macOS
start out\test.mp4         # Windows
xdg-open out/test.mp4      # Linux
```

**Ask them to confirm it actually played.** That confirmation is the real pass
condition for this whole setup — not any command's exit code.

---

## 4. Open the studio

The studio is where they'll actually work — a live preview with a timeline,
hot-reloading as code changes.

```bash
npm run dev
```

It opens <http://localhost:3000> in their browser. Show them:

- the **composition list** on the left — every video in the project
- the **timeline** at the bottom — scrub to any frame
- **live reload** — edit a file, the preview updates without restarting

Leave it running while you work with them. `Ctrl+C` in the terminal stops it.

---

## 5. Hand over the two commands that matter

Before finishing, make sure they can do this without you:

```bash
npm run dev                              # preview and edit
npx remotion render <id> out/<name>.mp4  # render a finished file
```

Ask them to run one of the two themselves, now, while you're still there. A
command they've run once is a command they own; one they've only read is not.

---

## Renders that "work" but are wrong

Worth checking on a real video later — not on the smoke test:

- **Frame 0 is blank.** Frame 0 is the thumbnail on every platform. If a
  composition fades in from black, the poster frame is black.
- **No audio stream.** `ffprobe` shows video only. Usually a missing `<Audio>`
  tag or an asset that didn't load.
- **Wrong dimensions for the target.** 1920×1080 for YouTube, 1080×1920 for
  reels, 1080×1080 or 1080×1350 for feed posts. Set on the `<Composition>`.
