import React from "react";
import { AbsoluteFill, Img, Loop, OffthreadVideo, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT } from "./font";
import { Backdrop, FILM_GRADE, Grain, Vignette } from "./looks";
import { CountItem, OfferCard, PriceTier, PricingCard, ProofCard, Shot, StatCard, Theme, VslConfig } from "./types";
import { activeCaption, clamp, firstOfChapter, fmt, fr, rateOf } from "./util";

/** 16:9 master, 1920x1080. 2.39:1 inside 1080 leaves 138 px bars top and bottom. */
const W = 1920;
const H = 1080;
const BAR = 138;

const Letterbox: React.FC = () => (
  <>
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: BAR, background: "#000" }} />
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: BAR, background: "#000" }} />
  </>
);

const Film: React.FC<{ shot: Shot }> = ({ shot }) => {
  const frame = useCurrentFrame();
  // a slow, almost invisible push on top of the camera move, for continuity
  const scale = interpolate(frame, [0, fr(shot.end - shot.start)], [1.0, 1.035], clamp);
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <AbsoluteFill style={{ transform: `scale(${scale})` }}>
        <OffthreadVideo
          src={staticFile(shot.src)}
          startFrom={fr(shot.from ?? 0)}
          playbackRate={rateOf(shot)}
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: FILM_GRADE }}
        />
      </AbsoluteFill>
      <Vignette />
      <Grain w={W} h={H} />
      <Letterbox />
    </AbsoluteFill>
  );
};

const ChapterTag: React.FC<{ text: string; first: boolean; theme: Theme }> = ({ text, first, theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const inn = first ? spring({ frame, fps, config: { damping: 200 } }) : 1;
  const [num, ...rest] = text.split("  ");
  return (
    <div
      style={{
        position: "absolute",
        left: 214,
        top: 18,
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "8px 24px 8px 10px",
        borderRadius: 999,
        background: "rgba(12,18,22,0.86)",
        border: `2px solid ${theme.accent}88`,
        transform: `translateX(${(1 - inn) * -40}px)`,
        opacity: inn,
        fontFamily: FONT,
      }}
    >
      <span style={{ background: theme.accent, color: theme.white, fontWeight: 800, fontSize: 24, borderRadius: 999, padding: "4px 12px" }}>{num}</span>
      <span style={{ color: theme.white, fontWeight: 800, fontSize: 30, letterSpacing: "0.04em", textTransform: "uppercase" }}>{rest.join(" ")}</span>
    </div>
  );
};

const Product: React.FC<{ shot: Shot; first: boolean; theme: Theme }> = ({ shot, first, theme }) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, fr(shot.end - shot.start)], [1.0, 1.05], clamp);
  return (
    <AbsoluteFill>
      <Backdrop theme={theme} />
      <div
        style={{
          position: "absolute",
          left: 214,
          top: 92,
          width: 1492,
          height: 839,
          borderRadius: 26,
          overflow: "hidden",
          background: theme.bg,
          boxShadow: `0 30px 80px rgba(0,0,0,0.55), 0 0 0 2px ${theme.accent}55`,
        }}
      >
        <AbsoluteFill style={{ transform: `scale(${scale})` }}>
          <OffthreadVideo
            src={staticFile(shot.src)}
            startFrom={fr(shot.from ?? 0)}
            playbackRate={rateOf(shot)}
            muted
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
      </div>
      {shot.chapter ? <ChapterTag text={shot.chapter} first={first} theme={theme} /> : null}
    </AbsoluteFill>
  );
};

const Logo: React.FC<{ shot: Shot }> = ({ shot }) => (
  <AbsoluteFill style={{ background: "#000" }}>
    <OffthreadVideo src={staticFile(shot.src)} startFrom={fr(shot.from ?? 0)} muted style={{ width: "100%", height: "100%" }} />
  </AbsoluteFill>
);

const Stat: React.FC<{ s: StatCard; theme: Theme }> = ({ s, theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t0 = fr(s.countAt - s.start);
  const n = interpolate(frame, [t0 - 10, t0 + 18], [s.countFrom ?? 1, s.value], clamp);
  const pop = spring({ frame: frame - t0, fps, config: { damping: 14, mass: 0.6 } });
  return (
    <AbsoluteFill style={{ opacity: interpolate(frame, [0, 10], [0, 1], clamp) }}>
      <AbsoluteFill style={{ filter: "blur(14px) brightness(0.35)" }}>
        <OffthreadVideo src={staticFile(s.bg.src)} startFrom={fr(s.bg.from ?? 0)} playbackRate={s.bg.rate ?? 0.6} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", fontFamily: FONT, color: theme.white }}>
        <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: "0.22em", color: theme.accentLight, textTransform: "uppercase" }}>{s.kicker}</div>
        <div style={{ fontSize: 300, fontWeight: 900, lineHeight: 1, marginTop: 10, transform: `scale(${0.9 + 0.1 * Math.min(1, pop)})`, textShadow: `0 0 60px ${theme.accent}88` }}>
          {s.prefix ?? ""}
          {fmt(n)}
          {s.suffix ?? ""}
        </div>
        <div style={{ fontSize: 46, fontWeight: 700, marginTop: 6, maxWidth: 1300, textAlign: "center" }}>{s.line}</div>
        {s.source ? <div style={{ fontSize: 22, fontWeight: 500, marginTop: 40, color: theme.muted }}>{s.source}</div> : null}
      </AbsoluteFill>
      <Grain w={W} h={H} opacity={0.05} />
    </AbsoluteFill>
  );
};

const Count: React.FC<CountItem & { base: number; theme: Theme; size?: number; width?: number }> = ({
  at,
  base,
  value,
  prefix = "",
  suffix = "",
  label,
  theme,
  size = 120,
  width = 460,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t0 = fr(at - base);
  const inn = spring({ frame: frame - t0, fps, config: { damping: 200 } });
  const n = interpolate(frame, [t0, t0 + 20], [0, value], clamp);
  if (frame < t0) return <div style={{ width }} />;
  return (
    <div style={{ width, textAlign: "center", opacity: inn, transform: `translateY(${(1 - inn) * 30}px)` }}>
      <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: size, color: theme.white, lineHeight: 1, textShadow: "0 6px 30px rgba(0,0,0,0.6)" }}>
        {prefix}
        {fmt(n)}
        <span style={{ color: theme.accentLight }}>{suffix}</span>
      </div>
      <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 30, color: theme.white, marginTop: 10, textShadow: "0 3px 14px rgba(0,0,0,0.7)" }}>{label}</div>
    </div>
  );
};

const Proof: React.FC<{ p: ProofCard; theme: Theme }> = ({ p, theme }) => {
  const frame = useCurrentFrame();
  const rowEnd = p.finale ? fr(p.finale.at - p.start) - 4 : Number.MAX_SAFE_INTEGER;
  const head = interpolate(frame, [0, 12], [0, 1], clamp);
  const out = interpolate(frame, [rowEnd - 6, rowEnd], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ fontFamily: FONT }}>
      <AbsoluteFill style={{ opacity: out }}>
        <AbsoluteFill style={{ background: "rgba(0,0,0,0.38)" }} />
        <div style={{ position: "absolute", top: 230, width: "100%", textAlign: "center", opacity: head }}>
          <span style={{ fontSize: 28, fontWeight: 800, letterSpacing: "0.2em", color: theme.accentLight, textTransform: "uppercase" }}>{p.kicker}</span>
        </div>
        <div style={{ position: "absolute", top: 380, width: "100%", display: "flex", justifyContent: "center", gap: 40 }}>
          {p.items.map((it) => (
            <Count key={it.label} base={p.start} theme={theme} {...it} />
          ))}
        </div>
      </AbsoluteFill>
      {p.finale ? (
        <div style={{ position: "absolute", top: 330, width: "100%", display: "flex", justifyContent: "center" }}>
          <Count
            base={p.start}
            theme={theme}
            {...p.finale}
            label={p.finale.sub ? `${p.finale.label}, ${p.finale.sub}` : p.finale.label}
            size={150}
            width={1200}
          />
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

const PriceCard: React.FC<{ tier: PriceTier; base: number; theme: Theme }> = ({ tier, base, theme }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t0 = fr(tier.at - base);
  const inn = spring({ frame: frame - t0, fps, config: { damping: 200 } });
  const feat = spring({ frame: frame - fr((tier.featuresAt ?? tier.at) - base), fps, config: { damping: 200 } });
  return (
    <div
      style={{
        width: 470,
        height: 560,
        borderRadius: 28,
        padding: "40px 38px",
        background: tier.hi ? `linear-gradient(170deg, ${theme.accent} 0%, ${theme.accentDark} 100%)` : "rgba(255,255,255,0.06)",
        border: tier.hi ? "none" : "2px solid rgba(255,255,255,0.12)",
        boxShadow: tier.hi ? `0 30px 80px ${theme.accent}55` : "0 20px 50px rgba(0,0,0,0.35)",
        opacity: frame < t0 ? 0.12 : inn,
        transform: `translateY(${(1 - Math.min(1, inn)) * 40}px)`,
        fontFamily: FONT,
        color: theme.white,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: tier.hi ? theme.white : theme.accentLight }}>{tier.name}</div>
      <div style={{ fontSize: 92, fontWeight: 900, marginTop: 26, lineHeight: 1 }}>{tier.price}</div>
      <div style={{ fontSize: 26, fontWeight: 600, marginTop: 10, opacity: 0.85 }}>{tier.unit}</div>
      <div style={{ fontSize: 28, fontWeight: 600, marginTop: 30, lineHeight: 1.35 }}>{tier.blurb}</div>
      {tier.features ? (
        <div style={{ marginTop: "auto", opacity: Math.min(1, feat), fontSize: 24, fontWeight: 700, lineHeight: 1.5 }}>
          {tier.features.map((f) => (
            <div key={f}>✓ {f}</div>
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
          <OffthreadVideo src={staticFile(p.bg.h)} muted style={{ width: "100%", height: "100%" }} />
        </Loop>
      ) : (
        <Backdrop theme={theme} />
      )}
      <div style={{ position: "absolute", top: 70, width: "100%", textAlign: "center", fontFamily: FONT }}>
        <span style={{ fontSize: 30, fontWeight: 800, letterSpacing: "0.2em", color: theme.accentLight, textTransform: "uppercase" }}>{p.kicker}</span>
      </div>
      <div style={{ position: "absolute", top: 150, width: "100%", display: "flex", justifyContent: "center", gap: 44 }}>
        {p.tiers.map((t) => (
          <PriceCard key={t.name} tier={t} base={p.start} theme={theme} />
        ))}
      </div>
      {p.footer ? (
        <div style={{ position: "absolute", top: 752, width: "100%", display: "flex", justifyContent: "center", opacity: Math.min(1, ft), transform: `translateY(${(1 - Math.min(1, ft)) * 20}px)` }}>
          <span style={{ fontFamily: FONT, fontSize: 32, fontWeight: 800, color: theme.bgDark, background: theme.highlight, padding: "12px 32px", borderRadius: 999 }}>{p.footer.text}</span>
        </div>
      ) : null}
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
        right: 90,
        top: 220,
        width: 820,
        padding: "36px 40px",
        borderRadius: 26,
        background: "rgba(12,18,22,0.84)",
        border: `2px solid ${theme.accent}88`,
        fontFamily: FONT,
        color: theme.white,
        opacity: box,
        transform: `translateX(${(1 - box) * 60}px)`,
      }}
    >
      <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: "0.16em", color: theme.accentLight, textTransform: "uppercase" }}>{o.title}</div>
      {o.items.map((it) => {
        const t0 = fr(it.at - o.start);
        const p = spring({ frame: frame - t0, fps, config: { damping: 200 } });
        return (
          <div key={it.text} style={{ display: "flex", gap: 18, alignItems: "center", marginTop: 22, opacity: frame < t0 ? 0.15 : p }}>
            <span style={{ width: 40, height: 40, borderRadius: 999, background: theme.accent, display: "grid", placeItems: "center", fontSize: 24, fontWeight: 900 }}>✓</span>
            <span style={{ fontSize: 36, fontWeight: 700 }}>{it.text}</span>
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
    <div
      style={{
        position: "absolute",
        left: 120,
        bottom: BAR + 50,
        fontFamily: FONT,
        color: c.theme.white,
        opacity: p,
        transform: `translateY(${(1 - p) * 30}px)`,
        borderLeft: `8px solid ${c.theme.accent}`,
        paddingLeft: 26,
        textShadow: "0 4px 18px rgba(0,0,0,0.7)",
      }}
    >
      <div style={{ fontSize: 64, fontWeight: 900 }}>{c.lowerThird.line1}</div>
      <div style={{ fontSize: 34, fontWeight: 700, color: c.theme.accentLight, marginTop: 6 }}>{c.lowerThird.line2}</div>
    </div>
  );
};

const EndCard: React.FC<{ c: VslConfig }> = ({ c }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame, fps, config: { damping: 200 } });
  const len = fr(c.endCard.end - c.endCard.start);
  const e = c.endCard;
  return (
    <AbsoluteFill style={{ opacity: interpolate(frame, [len - 18, len], [1, 0], clamp) }}>
      <Backdrop theme={c.theme} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", fontFamily: FONT, color: c.theme.white, opacity: p }}>
        <Img src={staticFile(c.logo)} style={{ width: 620 }} />
        <div style={{ fontSize: 60, fontWeight: 900, marginTop: 60 }}>{e.line1}</div>
        <div style={{ fontSize: 36, fontWeight: 700, marginTop: 18, color: c.theme.accentLight }}>{e.line2}</div>
        {e.line3 ? <div style={{ fontSize: 30, fontWeight: 700, marginTop: 14 }}>{e.line3}</div> : null}
        {e.tagline ? <div style={{ fontSize: 26, fontWeight: 600, marginTop: 50, color: c.theme.muted }}>{e.tagline}</div> : null}
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
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 34, display: "flex", justifyContent: "center" }}>
      <div style={{ background: "rgba(8,12,15,0.72)", borderRadius: 16, padding: "10px 26px 12px" }}>
        {a.card.words.map((w, i) => (
          <span key={i} style={{ fontFamily: FONT, fontWeight: 700, fontSize: 42, color: i === a.active ? c.theme.accentLight : c.theme.white, marginRight: 12 }}>
            {w.w}
          </span>
        ))}
      </div>
    </div>
  );
};

const Span: React.FC<{ w: { start: number; end: number }; children: React.ReactNode }> = ({ w, children }) => (
  <Sequence from={fr(w.start)} durationInFrames={fr(w.end) - fr(w.start)}>
    {children}
  </Sequence>
);

export const Horizontal: React.FC<{ c: VslConfig }> = ({ c }) => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, 14], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {c.shots.map((s, i) => (
        <Span key={i} w={s}>
          {s.kind === "film" ? <Film shot={s} /> : s.kind === "product" ? <Product shot={s} first={firstOfChapter(c.shots, i)} theme={c.theme} /> : <Logo shot={s} />}
        </Span>
      ))}
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
