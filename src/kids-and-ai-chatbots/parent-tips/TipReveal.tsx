import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { colors } from "./colors";
import { nunito, dmSans, dmMono } from "./fonts";
import { TIPS, BEATS } from "./timing";
import { TipIcon } from "./TipIcon";

const ACCENT: Record<string, string> = {
  teal: colors.brandTeal,
  tealLight: colors.tealLight,
  charcoal: colors.brandCharcoal,
};

/**
 * Left-side reveal panel for a single tip. Renders only inside that tip's
 * window (activeAt → activeAt + revealHold): it slides in, the illustration
 * draws itself, the headline and caption settle, then the whole panel
 * recedes — leaving just the right-rail highlight and the speaker on screen.
 *
 * Sits inside the 80px left margin and clears the bottom-200px subtitle band.
 * Never overlaps the right-rail tracker (which starts near x≈1450).
 */

export const TipReveal: React.FC<{ tipIndex: number }> = ({ tipIndex }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tip = TIPS[tipIndex];
  const accent = ACCENT[tip.accent];

  const local = frame - tip.activeAt;
  const hold = BEATS.revealHold;
  if (local < -2 || local > hold + 26) return null;

  // Entrance
  const enter = spring({
    frame: local,
    fps,
    config: { damping: 20, stiffness: 90 },
  });
  // Illustration draw-on
  const draw = spring({
    frame: local - 8,
    fps,
    config: { damping: 26, stiffness: 70 },
  });
  // Exit at the tail of the window
  const exit = interpolate(local, [hold, hold + 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });

  const titleP = spring({
    frame: local - 12,
    fps,
    config: { damping: 22, stiffness: 90 },
  });
  const capP = spring({
    frame: local - 22,
    fps,
    config: { damping: 22, stiffness: 90 },
  });

  const appear = enter * (1 - exit);
  const slideX = interpolate(enter, [0, 1], [-70, 0]) + exit * -50;

  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        top: 252,
        width: 720,
        opacity: appear,
        transform: `translateX(${slideX}px) scale(${interpolate(
          appear,
          [0, 1],
          [0.96, 1],
        )})`,
      }}
    >
      {/* Giant ghost number behind the card */}
      <div
        style={{
          position: "absolute",
          top: -86,
          left: -10,
          fontFamily: nunito,
          fontWeight: 700,
          fontSize: 220,
          lineHeight: 1,
          color: accent,
          opacity: 0.12 * appear,
          userSelect: "none",
        }}
      >
        {String(tip.n).padStart(2, "0")}
      </div>

      {/* Frosted card */}
      <div
        style={{
          position: "relative",
          padding: "40px 44px",
          borderRadius: 28,
          background: `${colors.brandDark}E0`,
          border: `1.5px solid ${accent}55`,
          boxShadow: `0 30px 80px -24px rgba(0,0,0,0.7), 0 0 0 8px ${accent}14`,
          display: "flex",
          flexDirection: "column",
          gap: 22,
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              fontFamily: dmMono,
              fontSize: 18,
              fontWeight: 500,
              letterSpacing: 3,
              color: colors.tealLight,
              padding: "8px 16px",
              borderRadius: 999,
              border: `1.5px solid ${colors.tealLight}55`,
              background: `${colors.brandTeal}1F`,
              textTransform: "uppercase",
            }}
          >
            Tip {tip.n} of 5
          </div>
        </div>

        {/* Icon + headline row */}
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div
            style={{
              flexShrink: 0,
              width: 132,
              height: 132,
              borderRadius: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: `${accent}1A`,
              border: `1.5px solid ${accent}44`,
            }}
          >
            <TipIcon tip={tip.n} size={96} color={accent} progress={draw} />
          </div>

          <div
            style={{
              fontFamily: nunito,
              fontWeight: 700,
              fontSize: 52,
              lineHeight: 1.08,
              color: colors.white,
              whiteSpace: "pre-line",
              opacity: titleP,
              transform: `translateY(${interpolate(titleP, [0, 1], [18, 0])}px)`,
            }}
          >
            {tip.title}
          </div>
        </div>

        {/* Caption */}
        <div
          style={{
            fontFamily: dmSans,
            fontWeight: 400,
            fontSize: 28,
            lineHeight: 1.4,
            color: colors.neutral200,
            opacity: capP,
            transform: `translateY(${interpolate(capP, [0, 1], [14, 0])}px)`,
            borderLeft: `3px solid ${accent}`,
            paddingLeft: 18,
          }}
        >
          {tip.caption}
        </div>
      </div>
    </div>
  );
};
