---
name: html-to-image
description: Convert any HTML file to a PNG image using html2png.dev API. Supports 16:9 landscape (1200x630) and 9:16 portrait (630x1200) aspect ratios. Does NOT create or modify the HTML — it only converts the provided file to an image. Trigger phrases include "generate image", "convert to png", "html to image", "create image", or "/og-image".
---

# HTML to Image Converter

Convert any HTML file to a high-quality PNG image. This skill does **NOT** create or modify HTML designs — it takes an existing HTML file as-is and converts it to PNG.

## Aspect Ratios

| Ratio | Dimensions | Use Case |
|-------|-----------|----------|
| **16:9** (landscape) | 1200 x 630 | OG images, social previews, LinkedIn posts, thumbnails |
| **9:16** (portrait) | 630 x 1200 | Stories, reels, portrait cards, infographics |

**Always ask the user which ratio they want** if not specified.

## Workflow

### Step 1: Identify the HTML File

The user provides the path to an existing HTML file anywhere in the project.

**Do NOT modify the HTML file.** The design is final as provided.

### Step 2: Determine Output Settings

Ask the user (if not already specified):
1. **Aspect ratio**: 16:9 or 9:16
2. **Output path**: Where to save the PNG (default: same directory as source, with `.png` extension)

Derive dimensions from the chosen ratio:

```
16:9 → width=1200, height=630
9:16 → width=630, height=1200
```

### Step 3: Convert HTML to PNG

Use the html2png.dev API:

**16:9 (landscape):**
```bash
curl -X POST "https://html2png.dev/api/convert?width=1200&height=630&format=png&deviceScaleFactor=2" \
  -H "Content-Type: text/html" \
  --data-binary @<path-to-html-file>
```

**9:16 (portrait):**
```bash
curl -X POST "https://html2png.dev/api/convert?width=630&height=1200&format=png&deviceScaleFactor=2" \
  -H "Content-Type: text/html" \
  --data-binary @<path-to-html-file>
```

The API returns JSON with a `url` field containing the generated image URL.

### Step 4: Download and Save PNG

Download the image from the returned URL:

```bash
curl -o <output-path>.png "<returned-url>"
```

Ensure the output directory exists before saving.

### Step 5: Report Success

Inform the user:
- Which HTML file was converted
- Dimensions used (ratio + pixel size)
- Path to the saved PNG

## Examples

### Single file
```
User: "Convert designs/my-infographic.html to an image, 9:16"
→ Convert with width=630, height=1200
→ Save to designs/my-infographic.png
```

### Batch conversion
```
User: "Convert all HTML files in designs/ to images"
→ Find all .html files in designs/
→ Ask user for ratio
→ Convert each one without modification
→ Save PNGs alongside the HTML files
```
