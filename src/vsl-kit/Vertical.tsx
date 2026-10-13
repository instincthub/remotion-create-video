import React from "react";
import { AbsoluteFill, Img, Loop, OffthreadVideo, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT } from "./font";
import { Backdrop, FILM_GRADE, Grain } from "./looks";
import { CountItem, Focus, OfferCard, PriceTier, PricingCard, ProofCard, Shot, StatCard, Theme, VslConfig } from "./types";
import { activeCaption, clamp, firstOfChapter, fmt, fr, rateOf, within } from "./util";

/**
 * The 9:16 cut: same timeline, captions and audio as the 16:9 master.
 *
 * Layout (1080x1920): a header band (logo badge or chapter), one 1080x1100 window
 * for the picture, captions under it, and the bottom 300 px left clear for the
 * Reels/Shorts UI. Flow scenes fill the window with a blurred copy behind. Desktop
 * recordings are punched in on the 16:9 source (zoom + focus in SOURCE pixels),
 * because a full-width 1920x1080 screen is unreadable on a phone. Phone recordings
 * and logo reveals use their own 9:16 version (`vertical.native`).
 */
const W = 1080;
const H = 1920;
const WIN = { top: 300, height: 1100 };
const DEFAULT_FOCUS: Focus = { x: 980, y: 520, zoom: 1.5 };

const Window: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ position: "absolute", left: 0, top: WIN.top, width: W, height: WIN.height, overflow: "hidden" }}>{children}</div>
);

const Film: React.FC<{ shot: Shot }> = ({ shot }) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, fr(shot.end - shot.start)], [1.0, 1.04], clamp);
  const video = (style: React.CSSProperties) => (
    <OffthreadVideo
      src={staticFile(shot.src)}
      startFrom={fr(shot.from ?? 0)}
      playbackRate={rateOf(shot)}
      muted
      style={{ width: "100%", height: "100%", objectFit: "cover", ...style }}
    />
  );
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <AbsoluteFill style={{ filter: "blur(40px) brightness(0.4)", transform: "scale(1.2)" }}>{video({})}</AbsoluteFill>
      <Window>
        <AbsoluteFill style={{ transform: `scale(${scale})` }}>{video({ filter: FILM_GRADE })}</AbsoluteFill>
        <AbsoluteFill style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.45) 100%)" }} />
      </Window>
      <Grain w={W} h={H} />
    </AbsoluteFill>
  );
};

const ChapterTag: React.FC<{ text: string; first: boolean; theme: Theme }> = ({ text, first, theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const inn = first ? spring({ frame, fps, config: { damping: 200 } }) : 1;
  const [num, ...rest] = text.split("  ");
  return (
    <div style={{ position: "absolute", top: 196, width: W, display: "flex", justifyContent: "center", opacity: inn }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontFamily: FONT, transform: `translateY(${(1 - inn) * 20}px)` }}>
        <span style={{ background: theme.accent, color: theme.white, fontWeight: 800, fontSize: 32, borderRadius: 999, padding: "6px 16px" }}>{num}</span>
        <span style={{ color: theme.white, fontWeight: 900, fontSize: 46, letterSpacing: "0.04em", textTransform: "uppercase" }}>{rest.join(" ")}</span>
      </div>
    </div>
  );
};

const Product: React.FC<{ shot: Shot; first: boolean; c: VslConfig }> = ({ shot, first, c }) => {
  const frame = useCurrentFrame();
  const native = c.vertical?.native?.[shot.src];
  const f = c.vertical?.focus?.[shot.src] ?? c.vertical?.defaultFocus ?? DEFAULT_FOCUS;
  const zoom = (f.zoom ?? DEFAULT_FOCUS.zoom!) * interpolate(frame, [0, fr(shot.end - shot.start)], [1.0, 1.04], clamp);
  // zoom = how many window-widths of source fit: the window shows 1920/zoom source px
  const scale = (W * zoom) / 1920;
  const left = W / 2 - f.x * scale;
  // the card is exactly as tall as the scaled recording, centred in the window
  const cardH = Math.min(WIN.height, 1080 * scale);
  const cardTop = WIN.top + (WIN.height - cardH) / 2;
  const top = Math.min(0, Math.max(cardH - 1080 * scale, cardH / 2 - f.y * scale));
  return (
    <AbsoluteFill>
      <Backdrop theme={c.theme} vertical />
      {native ? (
        <Window>
          <OffthreadVideo src={staticFile(native)} startFrom={fr(shot.from ?? 0)} playbackRate={rateOf(shot)} muted style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 40%" }} />
        </Window>
      ) : (
        <div
          style={{
            position: "absolute",
            left: 30,
            top: cardTop,
            width: W - 60,
            height: cardH,
            borderRadius: 30,
            overflow: "hidden",
            background: c.theme.bg,
            boxShadow: `0 30px 80px rgba(0,0,0,0.55), 0 0 0 2px ${c.theme.accent}66`,
          }}
        >
          <div style={{ position: "absolute", left: left - 30, top, width: 1920 * scale, height: 1080 * scale }}>
            <OffthreadVideo src={staticFile(shot.src)} startFrom={fr(shot.from ?? 0)} playbackRate={rateOf(shot)} muted style={{ width: "100%", height: "100%" }} />
          </div>
        </div>
      )}
      {shot.chapter ? <ChapterTag text={shot.chapter} first={first} theme={c.theme} /> : null}
    </AbsoluteFill>
  );
};

const Logo: React.FC<{ shot: Shot; c: VslConfig }> = ({ shot, c }) => (
  <AbsoluteFill style={{ background: "#000" }}>
    <OffthreadVideo src={staticFile(c.vertical?.native?.[shot.src] ?? shot.src)} startFrom={fr(shot.from ?? 0)} muted style={{ width: "100%", height: "100%" }} />
  </AbsoluteFill>
);

const Badge: React.FC<{ logo: string }> = ({ logo }) => (
  <div style={{ position: "absolute", top: 96, width: W, display: "flex", justifyContent: "center" }}>
    <Img src={staticFile(logo)} style={{ width: 300, opacity: 0.95 }} />
  </div>
);

const Stat: React.FC<{ s: StatCard; theme: Theme }> = ({ s, theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t0 = fr(s.countAt - s.start);
  const n = interpolate(frame, [t0 - 10, t0 + 18], [s.countFrom ?? 1, s.value], clamp);
  const pop = spring({ frame: frame - t0, fps, config: { damping: 14, mass: 0.6 } });
  return (
    <AbsoluteFill style={{ opacity: interpolate(frame, [0, 10], [0, 1], clamp) }}>
      <AbsoluteFill style={{ filter: "blur(18px) brightness(0.35)", transform: "scale(1.2)" }}>
        <OffthreadVideo src={staticFile(s.bg.src)} startFrom={fr(s.bg.from ?? 0)} playbackRate={s.bg.rate ?? 0.6} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", fontFamily: FONT, color: theme.white, paddingBottom: 260 }}>
        <div style={{ fontSize: 38, fontWeight: 800, letterSpacing: "0.2em", color: theme.accentLight, textTransform: "uppercase", textAlign: "center", maxWidth: 960 }}>{s.kicker}</div>
        <div style={{ fontSize: 380, fontWeight: 900, lineHeight: 1, marginTop: 20, transform: `scale(${0.9 + 0.1 * Math.min(1, pop)})`, textShadow: `0 0 60px ${theme.accent}88` }}>
          {s.prefix ?? ""}
          {fmt(n)}
          {s.suffix ?? ""}
        </div>
        <div style={{ fontSize: 56, fontWeight: 800, marginTop: 20, maxWidth: 900, textAlign: "center", lineHeight: 1.2 }}>{s.line}</div>
        {s.source ? <div style={{ fontSize: 26, fontWeight: 500, marginTop: 40, color: theme.muted, maxWidth: 860, textAlign: "center" }}>{s.source}</div> : null}
      </AbsoluteFill>
      <Grain w={W} h={H} opacity={0.05} />
    </AbsoluteFill>
  );
};

const Count: React.FC<CountItem & { base: number; theme: Theme; size?: number }> = ({ at, base, value, prefix = "", suffix = "", label, theme, size = 130 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t0 = fr(at - base);
  const inn = spring({ frame: frame - t0, fps, config: { damping: 200 } });
  const n = interpolate(frame, [t0, t0 + 20], [0, value], clamp);
  return (
    <div style={{ textAlign: "center", opacity: frame < t0 ? 0 : inn, transform: `translateY(${(1 - inn) * 30}px)`, marginBottom: 34 }}>
      <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: size, color: theme.white, lineHeight: 1, textShadow: "0 6px 30px rgba(0,0,0,0.7)" }}>
        {prefix}
        {fmt(n)}
        <span style={{ color: theme.accentLight }}>{suffix}</span>
      </div>
      <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 38, color: theme.white, marginTop: 6, textShadow: "0 3px 14px rgba(0,0,0,0.8)" }}>{label}</div>
    </div>
  );
};

const Proof: React.FC<{ p: ProofCard; theme: Theme }> = ({ p, theme }) => {
  const frame = useCurrentFrame();
  const rowEnd = p.finale ? fr(p.finale.at - p.start) - 4 : Number.MAX_SAFE_INTEGER;
  const out = interpolate(frame, [rowEnd - 6, rowEnd], [1, 0], clamp);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ opacity: out }}>
        <Window>
          <AbsoluteFill style={{ background: "rgba(0,0,0,0.45)" }} />
        </Window>
        <div style={{ position: "absolute", top: 200, width: W, textAlign: "center", fontFamily: FONT }}>
          <span style={{ fontSize: 30, fontWeight: 800, letterSpacing: "0.14em", color: theme.accentLight, textTransform: "uppercase" }}>{p.kickerVertical ?? p.kicker}</span>
        </div>
        <div style={{ position: "absolute", top: WIN.top + 120, width: W }}>
          {p.items.map((it) => (
            <Count key={it.label} base={p.start} theme={theme} {...it} />
          ))}
        </div>
      </AbsoluteFill>
      {p.finale ? (
        <div style={{ position: "absolute", top: WIN.top + 360, width: W }}>
          <Count base={p.start} theme={theme} {...p.finale} size={170} />
          {p.finale.sub ? (
            <div
              style={{
                textAlign: "center",
                fontFamily: FONT,
                fontWeight: 700,
                fontSize: 34,
                color: theme.white,
                opacity: frame >= fr(p.finale.at - p.start) ? 1 : 0,
                textShadow: "0 3px 14px rgba(0,0,0,0.8)",
              }}
            >
              {p.finale.sub}
            </div>
          ) : null}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

const PriceRow: React.FC<{ tier: PriceTier; base: number; theme: Theme }> = ({ tier, base, theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t0 = fr(tier.at - base);
  const inn = spring({ frame: frame - t0, fps, config: { damping: 200 } });
  const feat = spring({ frame: frame - fr((tier.featuresAt ?? tier.at) - base), fps, config: { damping: 200 } });
  return (
    <div
      style={{
        width: 960,
        margin: "0 auto 28px",
        borderRadius: 30,
        padding: "30px 38px",
        background: tier.hi ? `linear-gradient(170deg, ${theme.accent} 0%, ${theme.accentDark} 100%)` : "rgba(255,255,255,0.07)",
        border: tier.hi ? "none" : "2px solid rgba(255,255,255,0.14)",
        boxShadow: tier.hi ? `0 30px 80px ${theme.accent}55` : "0 20px 50px rgba(0,0,0,0.35)",
        opacity: frame < t0 ? 0.12 : inn,
        transform: `translateY(${(1 - Math.min(1, inn)) * 30}px)`,
        fontFamily: FONT,
        color: theme.white,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: tier.hi ? theme.white : theme.accentLight }}>{tier.name}</div>
        <span style={{ fontSize: 84, fontWeight: 900 }}>{tier.price}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, fontWeight: 600, marginTop: 4 }}>
        <span>{tier.blurbShort ?? tier.blurb}</span>
        <span style={{ opacity: 0.85 }}>{tier.unitShort ?? tier.unit}</span>
      </div>
      {tier.features ? (
        <div style={{ opacity: Math.min(1, feat), fontSize: 30, fontWeight: 700, lineHeight: 1.5, marginTop: 16, display: "flex", flexWrap: "wrap", columnGap: 22 }}>
          {tier.features.map((f) => (
            <span key={f}>✓ {f}</span>
          ))}
        </div>
      ) : null}
    </div>
  );
};

const Pricing: React.FC<{ p: PricingCard; theme: Theme }> = ({ p, theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ft = p.footer ? spring({ frame: frame - fr(p.footer.at - p.start), fps, config: { damping: 200 } }) : 0;
  return (
    <AbsoluteFill style={{ opacity: interpolate(frame, [0, 10], [0, 1], clamp) }}>
      {p.bg ? (
        <Loop durationInFrames={fr(10)}>
          <OffthreadVideo src={staticFile(p.bg.v)} muted style={{ width: "100%", height: "100%" }} />
        </Loop>
      ) : (
        <Backdrop theme={theme} vertical />
      )}
      <div style={{ position: "absolute", top: 200, width: W, textAlign: "center", fontFamily: FONT }}>
        <span style={{ fontSize: 36, fontWeight: 800, letterSpacing: "0.16em", color: theme.accentLight, textTransform: "uppercase" }}>{p.kicker}</span>
      </div>
      <div style={{ position: "absolute", top: 320, width: W }}>
        {p.tiers.map((t) => (
          <PriceRow key={t.name} tier={t} base={p.start} theme={theme} />
        ))}
        {p.footer ? (
          <div style={{ display: "flex", justifyContent: "center", opacity: Math.min(1, ft), marginTop: 10 }}>
            <span style={{ fontFamily: FONT, fontSize: 38, fontWeight: 800, color: theme.bgDark, background: theme.highlight, padding: "14px 36px", borderRadius: 999 }}>{p.footer.text}</span>
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};

const Offer: React.FC<{ o: OfferCard; theme: Theme }> = ({ o, theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const box = spring({ frame, fps, config: { damping: 200 } });
  return (
    <div
      style={{
        position: "absolute",
        left: 50,
        right: 50,
        top: WIN.top + 560,
        padding: "34px 40px",
        borderRadius: 30,
        background: "rgba(12,18,22,0.86)",
        border: `2px solid ${theme.accent}88`,
        fontFamily: FONT,
        color: theme.white,
        opacity: box,
        transform: `translateY(${(1 - box) * 40}px)`,
      }}
    >
      <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: "0.14em", color: theme.accentLight, textTransform: "uppercase" }}>{o.title}</div>
      {o.items.map((it) => {
        const t0 = fr(it.at - o.start);
        const p = spring({ frame: frame - t0, fps, config: { damping: 200 } });
        return (
          <div key={it.text} style={{ display: "flex", gap: 18, alignItems: "center", marginTop: 18, opacity: frame < t0 ? 0.15 : p }}>
            <span style={{ width: 44, height: 44, borderRadius: 999, background: theme.accent, display: "grid", placeItems: "center", fontSize: 26, fontWeight: 900 }}>✓</span>
            <span style={{ fontSize: 40, fontWeight: 700 }}>{it.text}</span>
          </div>
        );
      })}
    </div>
  );
};

const LowerThird: React.FC<{ c: VslConfig }> = ({ c }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - 12, fps, config: { damping: 200 } });
  return (
    <div style={{ position: "absolute", top: 176, width: W, textAlign: "center", fontFamily: FONT, color: c.theme.white, opacity: p }}>
      <div style={{ fontSize: 62, fontWeight: 900 }}>{c.lowerThird.line1}</div>
      <div style={{ fontSize: 36, fontWeight: 700, color: c.theme.accentLight, marginTop: 4 }}>{c.lowerThird.line2}</div>
    </div>
  );
};

const EndCard: React.FC<{ c: VslConfig }> = ({ c }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame, fps, config: { damping: 200 } });
  const len = fr(c.endCard.end - c.endCard.start);
  const e = c.endCard;
  const line1 = (e.line1Vertical ?? e.line1).split("\n");
  const line3 = e.line3Vertical ?? e.line3;
  return (
    <AbsoluteFill style={{ opacity: interpolate(frame, [len - 18, len], [1, 0], clamp) }}>
      <Backdrop theme={c.theme} vertical />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", fontFamily: FONT, color: c.theme.white, opacity: p, paddingBottom: 200 }}>
        <Img src={staticFile(c.logo)} style={{ width: 680 }} />
        <div style={{ fontSize: 64, fontWeight: 900, marginTop: 70, textAlign: "center" }}>
          {line1.map((l, i) => (
            <div key={i}>{l}</div>
          ))}
        </div>
        <div style={{ fontSize: 40, fontWeight: 700, marginTop: 26, color: c.theme.accentLight, textAlign: "center" }}>{e.line2}</div>
        {line3 ? <div style={{ fontSize: 32, fontWeight: 700, marginTop: 16 }}>{line3}</div> : null}
        {e.tagline ? <div style={{ fontSize: 30, fontWeight: 600, marginTop: 56, color: c.theme.muted, textAlign: "center", maxWidth: 800 }}>{e.tagline}</div> : null}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Captions: React.FC<{ c: VslConfig }> = ({ c }) => {
  const frame = useCurrentFrame();
  const t = frame / fr(1);
  const a = activeCaption(c.captions, t);
  if (!a || t >= c.endCard.start) return null;
  return (
    <div style={{ position: "absolute", left: 40, right: 40, top: WIN.top + WIN.height + 50, display: "flex", justifyContent: "center" }}>
      <div style={{ background: "rgba(8,12,15,0.78)", borderRadius: 24, padding: "16px 28px 20px", textAlign: "center", maxWidth: 1000 }}>
        {a.card.words.map((w, i) => (
          <span
            key={i}
            style={{ fontFamily: FONT, fontWeight: 800, fontSize: 54, lineHeight: 1.2, color: i === a.active ? c.theme.accentLight : c.theme.white, marginRight: 14, display: "inline-block" }}
          >
            {w.w}
          </span>
        ))}
      </div>
    </div>
  );
};

/** The logo badge sits on film scenes only: product scenes carry the chapter there, cards have their own header. */
const showBadge = (c: VslConfig, t: number) => {
  const s = c.shots.find((x) => t >= x.start && t < x.end);
  const inCard = within(t, c.stat) || within(t, c.proof) || within(t, c.pricing);
  return s?.kind === "film" && !inCard && t < c.lowerThird.start;
};

const Span: React.FC<{ w: { start: number; end: number }; children: React.ReactNode }> = ({ w, children }) => (
  <Sequence from={fr(w.start)} durationInFrames={fr(w.end) - fr(w.start)}>
    {children}
  </Sequence>
);

export const Vertical: React.FC<{ c: VslConfig }> = ({ c }) => {
  const frame = useCurrentFrame();
  const t = frame / fr(1);
  const fadeIn = interpolate(frame, [0, 14], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {c.shots.map((s, i) => (
        <Span key={i} w={s}>
          {s.kind === "film" ? <Film shot={s} /> : s.kind === "product" ? <Product shot={s} first={firstOfChapter(c.shots, i)} c={c} /> : <Logo shot={s} c={c} />}
        </Span>
      ))}
      {showBadge(c, t) ? <Badge logo={c.logo} /> : null}
      {c.stat ? <Span w={c.stat}><Stat s={c.stat} theme={c.theme} /></Span> : null}
      {c.proof ? <Span w={c.proof}><Proof p={c.proof} theme={c.theme} /></Span> : null}
      {c.pricing ? <Span w={c.pricing}><Pricing p={c.pricing} theme={c.theme} /></Span> : null}
      {c.offer ? <Span w={c.offer}><Offer o={c.offer} theme={c.theme} /></Span> : null}
      <Span w={c.lowerThird}><LowerThird c={c} /></Span>
      <Span w={c.endCard}><EndCard c={c} /></Span>
      <Captions c={c} />
      <AbsoluteFill style={{ background: "#000", opacity: 1 - fadeIn, pointerEvents: "none" }} />
    </AbsoluteFill>
  );
};
