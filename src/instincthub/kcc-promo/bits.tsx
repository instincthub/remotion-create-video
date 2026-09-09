// Shared visual parts for KCC-PROMO-01.
import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, montserrat, nunito, useLayout, FPS } from "./theme";

/** Eased 0->1 that rises once at `atFrame` and stays. */
export const useRise = (atFrame: number, damping = 20, stiffness = 80) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - atFrame, fps, config: { damping, stiffness } });
};

/** 0->1->0 window with soft edges, in FRAMES relative to the sequence. */
export const useWindow = (inF: number, outF: number, fade = 8) =>
  interpolate(useCurrentFrame(), [inF, inF + fade, outF - fade, outF], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

/** The dark ground for the 1968 act — near-black, never a flat blank frame. */
export const Ground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const gy = 46 + Math.sin(frame / 70) * 4;
  return (
    <AbsoluteFill style={{ backgroundColor: colors.inkDeep }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% ${gy}%, ${colors.cyan}33 0%, transparent 62%)`,
        }}
      />
      {/* faint punched-tape grid: reads as machine-room without being literal */}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(${colors.tiffany}1C 1.4px, transparent 1.4px)`,
          backgroundSize: "54px 54px",
          opacity: 0.55,
        }}
      />
      {children}
    </AbsoluteFill>
  );
};

/**
 * Type-on text with a blinking block cursor — the film's 1968 voice.
 * `p` is 0->1 progress through the string.
 */
export const Typed: React.FC<{
  text: string;
  p: number;
  size: number;
  color?: string;
  weight?: number;
  cursor?: boolean;
}> = ({ text, p, size, color = colors.white, weight = 700, cursor = true }) => {
  const frame = useCurrentFrame();
  const n = Math.round(interpolate(p, [0, 1], [0, text.length], { extrapolateRight: "clamp" }));
  const on = Math.floor(frame / 12) % 2 === 0;
  return (
    <span style={{ fontFamily: nunito, fontWeight: weight, fontSize: size, color, lineHeight: 1.35 }}>
      {text.slice(0, n)}
      {cursor && p < 1 && (
        <span style={{ opacity: on ? 1 : 0, color: colors.tiffany }}>▌</span>
      )}
    </span>
  );
};

/** A big display line, Montserrat, for the thesis and the reveal. */
export const Display: React.FC<{
  children: React.ReactNode;
  size: number;
  p?: number;
  color?: string;
  align?: "left" | "center";
}> = ({ children, size, p = 1, color = colors.white, align = "left" }) => (
  <div
    style={{
      fontFamily: montserrat,
      fontWeight: 800,
      fontSize: size,
      lineHeight: 1.06,
      letterSpacing: -size * 0.022,
      color,
      textAlign: align,
      opacity: p,
      transform: `translateY(${(1 - p) * 26}px)`,
    }}
  >
    {children}
  </div>
);

/** Frosted panel so white type never sits bare on bright footage. */
export const Panel: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div
    style={{
      padding: "20px 30px",
      borderRadius: 20,
      background: `${colors.gunmetal}F0`,
      border: `1.5px solid ${colors.tiffany}44`,
      boxShadow: "0 24px 64px -22px rgba(0,0,0,0.75)",
      ...style,
    }}
  >
    {children}
  </div>
);

/**
 * Ken Burns over a still. `dir` "out" pulls back, which is the only direction
 * allowed on the certificate group photo: pushing in makes children's names
 * legible (PROMO-SCRIPT §2).
 */
export const KenBurns: React.FC<{
  src: string;
  durationF: number;
  dir?: "in" | "out";
  from?: number;
  to?: number;
  originY?: string;
}> = ({ src, durationF, dir = "out", from = 1.14, to = 1.0, originY = "50%" }) => {
  const frame = useCurrentFrame();
  const [a, b] = dir === "out" ? [from, to] : [to, from];
  const s = interpolate(frame, [0, durationF], [a, b], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${s})`,
          transformOrigin: `50% ${originY}`,
        }}
      />
    </AbsoluteFill>
  );
};

/** Legibility scrim under bottom-anchored type over footage. */
export const Scrim: React.FC<{ opacity?: number }> = ({ opacity = 0.62 }) => (
  <AbsoluteFill
    style={{
      background: `linear-gradient(to top, rgba(23,28,33,${opacity}) 0%, rgba(23,28,33,${opacity * 0.5}) 26%, transparent 52%)`,
    }}
  />
);

/**
 * The "Dramatisation" disclosure label (PROMO-SCRIPT §2). Top-left, because the
 * bottom band carries the burned captions on the 9:16 and 1:1 cuts and the two
 * collided there.
 */
export const DramatisationLabel: React.FC<{ p: number }> = ({ p }) => {
  const L = useLayout();
  return (
    <div
      style={{
        position: "absolute",
        left: L.margin,
        top: L.safeTop + 20,
        opacity: p * 0.85,
        fontFamily: nunito,
        fontWeight: 600,
        fontSize: 22 * L.k,
        letterSpacing: 1.6,
        textTransform: "uppercase",
        color: colors.textDim,
        padding: "8px 14px",
        borderRadius: 8,
        background: "rgba(23,28,33,0.55)",
        border: `1px solid ${colors.textMuted}55`,
      }}
    >
      Dramatisation
    </div>
  );
};

/** Year marker for the arc beats: "3 YEARS", "6 YEARS", "13 YEARS". */
export const YearTag: React.FC<{ label: string; p: number }> = ({ label, p }) => {
  const L = useLayout();
  return (
    <div
      style={{
        position: "absolute",
        left: L.margin,
        bottom: L.safeBottom + L.captionBand + (L.portrait ? 40 : 84),
        opacity: p,
        transform: `translateY(${(1 - p) * 24}px)`,
      }}
    >
      <div
        style={{
          fontFamily: montserrat,
          fontWeight: 900,
          fontSize: 96 * L.k,
          lineHeight: 1,
          color: colors.white,
          textShadow: "0 8px 34px rgba(0,0,0,0.7)",
        }}
      >
        {label}
      </div>
      <div style={{ height: 6, width: 120 * L.k, marginTop: 14, background: colors.tiffany, borderRadius: 3 }} />
    </div>
  );
};

/**
 * Naira sign. Nunito and Montserrat have no U+20A6, so the browser falls back
 * to another face and the glyph sits visibly foreign beside the digits (Noah
 * caught this on the jingle). Draw it as the current font's own "N" with two
 * bars instead, so it inherits weight, colour and size.
 */
export const Naira: React.FC = () => (
  <span style={{ position: "relative", display: "inline-block", lineHeight: 1 }}>
    N
    {[0.4, 0.56].map((y) => (
      <span
        key={y}
        style={{
          position: "absolute",
          left: "-6%",
          right: "-6%",
          top: `${y * 100}%`,
          height: "0.075em",
          background: "currentColor",
          borderRadius: 2,
        }}
      />
    ))}
  </span>
);

/** The InstinctHub logo lockup for the end card. */
export const Logo: React.FC<{ height: number; style?: React.CSSProperties }> = ({ height, style }) => (
  <Img
    src={staticFile("kcc-promo/instincthub-logo-white.png")}
    style={{ height, objectFit: "contain", ...style }}
  />
);
