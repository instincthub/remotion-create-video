# LinkedIn Slide Post Command (HTML/CSS → Print to PDF)

You are generating a **static LinkedIn carousel slide deck** as a single HTML/CSS file. The user will print it to PDF from Chrome. Follow every rule below without exception.

---

## Mandatory Skills

- **Always invoke the `ai-playbook-brand` skill** before writing any code.
- **Reference implementation**: `designs/ai-rewriting-learning-carousel.html` — use this as the canonical source of truth for any edge cases.

---

## Output Format

- **Single HTML file** in `designs/` directory, named `<topic-slug>-carousel.html`
- Self-contained: all CSS in `<style>`, fonts via Google Fonts `<link>`
- Add this comment at the top of `<body>`:
  ```html
  <!-- PRINT: Open in Chrome → Cmd+P → Paper: Custom 1080x1350px → Margins: None → Save as PDF -->
  ```

---

## Complete CSS Framework

Copy this **entire CSS block** into every slide post. Do not modify, abbreviate, or improvise — use it verbatim.

```css
/* ── Reset ── */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

/* ── Brand tokens ── */
:root {
  --brand-teal: #1A7A6E;
  --brand-charcoal: #2B3A35;
  --brand-dark: #0F1A17;
  --brand-paper: #F4F2ED;
  --white: #FFFFFF;
  --neutral-400: #B0ADA4;
  --neutral-600: #6B6860;
  --teal-light: #5DCAA5;

  --nunito: 'Nunito', sans-serif;
  --dm-sans: 'DM Sans', sans-serif;
  --dm-mono: 'DM Mono', monospace;

  --slide-w: 1080px;
  --slide-h: 1350px;
  --pad: 64px;
}

body {
  background: #e0e0e0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding: 32px 0;
}

/* ── Slide base ── */
.slide {
  position: relative;
  width: var(--slide-w);
  height: var(--slide-h);
  overflow: hidden;
  page-break-after: always;
  flex-shrink: 0;
}

/* ── Print ── */
@media print {
  body { background: none; padding: 0; gap: 0; }
  .slide { page-break-after: always; }
  .slide:last-child { page-break-after: auto; }
}

@page {
  size: 1080px 1350px;
  margin: 0;
}

/* ── Cover slide ── */
.slide--cover {
  background: url('assets/bg/wall-paper-2148196630.jpg') center/cover no-repeat;
  color: var(--white);
}
.slide--cover::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(15, 26, 23, 0.55);
  z-index: 1;
}
.slide--cover .cover-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: var(--pad);
}
.cover-title {
  margin-top: 40px;
  font-family: var(--nunito);
  font-weight: 700;
  font-size: 84px;
  line-height: 1.1;
  color: var(--white);
}
.cover-title .hl {
  background: var(--brand-teal);
  padding: 2px 8px;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
}
.cover-subtitle {
  margin-top: 16px;
  font-family: var(--dm-sans);
  font-weight: 400;
  font-size: 28px;
  color: rgba(255,255,255,0.6);
}
.cover-divider {
  width: 100%;
  height: 1px;
  margin-top: 32px;
  border: none;
  border-top: 1.5px dashed rgba(255,255,255,0.2);
}
.cover-illustration {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cover-illustration svg {
  width: 700px;
  height: auto;
  opacity: 0.95;
}
.cover-bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.handle {
  font-family: var(--dm-sans);
  font-weight: 400;
  font-size: 22px;
  color: rgba(255,255,255,0.5);
}
.arrow {
  font-family: var(--dm-sans);
  font-weight: 300;
  font-size: 32px;
  color: var(--white);
}

/* ── Paper slides (2-N) ── */
.slide--paper {
  background: var(--brand-paper);
  color: var(--brand-charcoal);
  display: flex;
  flex-direction: column;
  padding: var(--pad);
}

/* ── Intro slide ── */
.intro-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 40px;
}
.intro-bold {
  font-family: var(--nunito);
  font-weight: 700;
  font-size: 52px;
  line-height: 1.2;
  color: var(--brand-charcoal);
}
.intro-light {
  margin-top: 32px;
  font-family: var(--dm-sans);
  font-weight: 400;
  font-size: 42px;
  line-height: 1.35;
  color: var(--neutral-600);
}
.intro-light strong {
  font-weight: 500;
  color: var(--brand-charcoal);
}

/* ── Data slides ── */
.slide-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 8px;
}
.slide-number {
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  background: var(--brand-teal);
  color: var(--white);
  font-family: var(--dm-mono);
  font-weight: 500;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 4px;
}
.slide-title {
  font-family: var(--nunito);
  font-weight: 700;
  font-size: 38px;
  line-height: 1.25;
  color: var(--brand-charcoal);
}

.data-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 0;
}

.data-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
}

.data-divider {
  width: 85%;
  height: 1px;
  background: var(--neutral-400);
  opacity: 0.5;
}

.hero-stat {
  font-family: var(--nunito);
  font-weight: 700;
  font-size: 128px;
  line-height: 1;
  color: var(--brand-teal);
  letter-spacing: -2px;
}
.hero-stat--md {
  font-size: 96px;
}
.hero-stat--sm {
  font-size: 72px;
}

.stat-label {
  font-family: var(--dm-sans);
  font-weight: 500;
  font-size: 24px;
  line-height: 1.4;
  color: var(--brand-charcoal);
  margin-top: 8px;
}
.stat-sublabel {
  font-family: var(--dm-sans);
  font-weight: 400;
  font-size: 20px;
  color: var(--neutral-600);
  margin-top: 4px;
}

.source {
  font-family: var(--dm-sans);
  font-weight: 400;
  font-size: 18px;
  color: var(--neutral-400);
  margin-top: 16px;
  text-align: center;
  line-height: 1.4;
}

/* ── Comparison cards ── */
.compare-row {
  display: flex;
  align-items: stretch;
  gap: 0;
  width: 100%;
  margin-bottom: 8px;
}
.compare-card {
  flex: 1;
  padding: 40px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}
.compare-card--teal {
  background: var(--brand-teal);
  color: var(--white);
}
.compare-card--gray {
  background: #d4d2cc;
  color: var(--brand-charcoal);
}
.compare-stat {
  font-family: var(--nunito);
  font-weight: 700;
  font-size: 72px;
  line-height: 1;
}
.compare-label {
  font-family: var(--dm-sans);
  font-weight: 400;
  font-size: 20px;
  margin-top: 8px;
}
.compare-card--teal .compare-label {
  color: rgba(255,255,255,0.8);
}
.compare-vs {
  font-family: var(--dm-sans);
  font-weight: 400;
  font-size: 22px;
  color: var(--neutral-600);
  padding: 0 20px;
  align-self: center;
}
.compare-source {
  font-family: var(--dm-sans);
  font-weight: 400;
  font-size: 17px;
  color: var(--neutral-400);
  margin-top: 4px;
}

/* ── Pagination dots ── */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding-top: 24px;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--neutral-400);
  opacity: 0.5;
}
.dot--active {
  background: var(--brand-teal);
  opacity: 1;
}

.slide-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: auto;
}
.slide-footer .arrow {
  color: var(--brand-charcoal);
}

/* ── CTA slide ── */
.cta-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 20px;
}
.cta-heading {
  font-family: var(--nunito);
  font-weight: 700;
  font-size: 52px;
  line-height: 1.2;
  color: var(--brand-charcoal);
}
.cta-heading .hl {
  background: var(--brand-teal);
  color: var(--white);
  padding: 2px 8px;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
}
.cta-handle {
  font-family: var(--dm-sans);
  font-weight: 400;
  font-size: 24px;
  color: var(--neutral-600);
  margin-top: 16px;
}
.cta-arrow-area {
  display: flex;
  justify-content: center;
  margin-top: 32px;
}
.cta-arrow-area svg {
  width: 80px;
  height: auto;
}
.cta-photo-area {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding-bottom: 20px;
}
.cta-photo {
  width: 400px;
  height: 480px;
  border-radius: 4px;
  object-fit: cover;
  object-position: center top;
}
.handle--dark {
  color: var(--neutral-600);
}
```

---

## Google Fonts Import

Always include these `<link>` tags in `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&family=Nunito:wght@600;700&display=swap" rel="stylesheet" />
```

---

## Slide Structure

### SLIDE 1 — Cover

```html
<div class="slide slide--cover">
  <div class="cover-content">
    <div class="cover-title">
      <span class="hl">Line one of title</span><br/>
      <span class="hl">Line two</span><br/>
      <span class="hl">Line three</span>
    </div>
    <div class="cover-subtitle">AI Playbook Weekly</div>
    <hr class="cover-divider"/>
    <div class="cover-illustration">
      <!-- TOPIC-RELEVANT SVG HERE (see SVG rules below) -->
    </div>
    <div class="cover-bottom">
      <span class="handle">@aiplaybook_</span>
      <span class="arrow">&rarr;</span>
    </div>
  </div>
</div>
```

**Cover has NO pagination dots.**

### SLIDE 2 — Intro

```html
<div class="slide slide--paper">
  <div class="intro-content">
    <div class="intro-bold">
      Bold provocative<br/>opener sentence.
    </div>
    <div class="intro-light">
      Lighter continuation<br/>
      <strong>with key phrase bolded</strong>
    </div>
  </div>
  <div class="slide-footer">
    <div></div>
    <div class="pagination">
      <!-- N dots, 2nd active -->
    </div>
    <span class="arrow">&rarr;</span>
  </div>
</div>
```

### SLIDES 3 to N-1 — Data (Standard)

```html
<div class="slide slide--paper">
  <div class="slide-header">
    <div class="slide-number">1</div>
    <div class="slide-title">Short Punchy<br/>Heading Here</div>
  </div>
  <div class="data-content">
    <div class="data-section">
      <div class="hero-stat">2x</div>
      <div class="stat-label">what the stat means</div>
      <div class="stat-sublabel">optional context</div>
    </div>
    <div class="data-divider"></div>
    <div class="data-section">
      <div class="hero-stat hero-stat--md">59%</div>
      <div class="stat-label">second stat meaning</div>
    </div>
    <div class="source">Author, Publication, Year</div>
  </div>
  <div class="slide-footer">
    <div></div>
    <div class="pagination"><!-- N dots, Nth active --></div>
    <span class="arrow">&rarr;</span>
  </div>
</div>
```

### DATA SLIDE — Comparison Variant

Use when content directly contrasts two values (e.g. cost A vs cost B):

```html
<div class="data-section" style="padding-bottom: 12px;">
  <div class="compare-row">
    <div class="compare-card compare-card--teal">
      <div class="compare-stat">$35</div>
      <div class="compare-label">per student/year</div>
    </div>
    <div class="compare-vs">vs</div>
    <div class="compare-card compare-card--gray">
      <div class="compare-stat">$70-$120</div>
      <div class="compare-label">per hour</div>
    </div>
  </div>
  <div style="display:flex; width:100%; justify-content:space-between; padding:0 12px;">
    <div class="compare-source">Source A</div>
    <div class="compare-source">Source B</div>
  </div>
</div>
```

### LAST SLIDE — CTA

```html
<div class="slide slide--paper">
  <div class="cta-content">
    <div class="cta-heading">
      Want more weekly<br/>AI breakdowns<br/>like this?
    </div>
    <div style="margin-top: 20px;">
      <span class="cta-heading"><span class="hl">Follow</span></span><br/>
      <span class="cta-heading"><span class="hl">Noah Olatoye</span></span>
    </div>
    <div class="cta-handle">@aiplaybook_</div>
    <div class="cta-arrow-area">
      <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 10 C30 10, 50 60, 70 100" stroke="#2B3A35" stroke-width="2.5" fill="none"/>
        <polyline points="62,92 70,100 72,88" stroke="#2B3A35" stroke-width="2.5" fill="none"/>
      </svg>
    </div>
    <div class="cta-photo-area">
      <img class="cta-photo" src="assets/images/noaholatoye-speaking-2-min.jpg" alt="Noah Olatoye" />
    </div>
  </div>
  <div class="slide-footer">
    <span class="handle handle--dark">@aiplaybook_</span>
    <div class="pagination"><!-- N dots, last active --></div>
    <span class="arrow">&rarr;</span>
  </div>
</div>
```

---

## Hero Stat Sizing

| Class | Size | Use when |
|-------|------|----------|
| _(default)_ | 128px | Short: 2x, 59%, $1.1T, 4x, 16% |
| `.hero-stat--md` | 96px | Medium: 214M, 17.8%, $5.88B |
| `.hero-stat--sm` | 72px | Long: 6 yrs to 30 mo, 2.5 yrs |
| `style="font-size: 52px"` | 52px | Very long phrase: Effect size: 0.73 to 1.3 SD |

---

## SVG Illustration Rules (Cover)

Create a **topic-relevant** SVG illustration for each carousel. Never use generic clip art or stick figures.

- **ViewBox**: `0 0 600 320`
- **Main shapes**: White outlines, stroke-width 2-2.5px, fill none
- **Accent nodes**: Brand Teal circles (`stroke="#1A7A6E"`, `fill="rgba(26,122,110,0.25)"`) with white icon inside (stroke 2px)
- **Connections**: Dashed lines (`stroke-dasharray="8 5"`, white, opacity 0.65)
- **Data particles**: Small white circles (r=2.5-4px, opacity 0.2-0.35) scattered around nodes
- **Optional**: Teal feedback loop arc with arrowhead (`stroke="rgba(26,122,110,0.55)"`, `stroke-dasharray="6 4"`)

**Examples by topic**:
- Learning/Education → brain + AI circuit nodes (lightbulb, play, graduation cap)
- Security/Privacy → shield outline + lock + data stream nodes
- Global/Trade → globe outline + directional arrows + market nodes
- Automation/Work → gear outline + robotic arm + efficiency nodes
- Healthcare → heart/stethoscope outline + diagnostic nodes

---

## Pagination Rules

1. **Dot count = total number of slides** (not always 10)
2. **Active dot** (`.dot--active`) = current slide's 1-based position
3. **Cover slide has NO pagination dots** — only handle + arrow at bottom
4. **All other slides** have `.slide-footer` with empty `<div>` left, pagination center, arrow right

---

## Content Adaptation

- Adjust total slide count to match provided content
- Update pagination dot count on **every** slide footer
- Number data slides sequentially starting at 1
- If no comparison data exists in the content, use only standard data slides
- CTA question hook should relate to the specific topic (not always "AI breakdowns")

---

## Execution Checklist

Before delivering any code, verify:
- [ ] `ai-playbook-brand` skill has been invoked
- [ ] HTML file is self-contained with full CSS framework
- [ ] All slides are exactly 1080 × 1350
- [ ] Cover has topic-relevant SVG illustration (not generic)
- [ ] Cover has NO pagination dots
- [ ] All other slides have correct pagination dot count and active position
- [ ] Data slide numbers are sequential (1, 2, 3...)
- [ ] Hero stat sizes match the sizing table
- [ ] Comparison cards used only where content directly contrasts two values
- [ ] CTA slide has Noah's photo and @aiplaybook_ handle
- [ ] All colors from AI Playbook brand palette
- [ ] Print comment included at top of body
- [ ] File saved as `designs/<topic-slug>-carousel.html`

---

## Your Task

$ARGUMENTS
