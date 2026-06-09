import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { colors } from "./colors";
import { inter } from "./fonts";
import type { Section } from "./types";

const HOLD = 195; // 6.5s @ 30fps — how long a reveal panel stays before receding

/**
 * Left-side reveal panel for one lesson section. Slides in on the section's
 * cue, holds, then recedes — leaving just the right-rail highlight and the
 * speaker. A large ghost number anchors it; the caption carries the one orange
 * accent (a left rule). Clean and uncluttered per the DCSL tone.
 *
 * Sits in the 80px left margin, clears the bottom band, and never overlaps the
 * right rail (which starts near x≈1448).
 */
export const SectionReveal: React.FC<{
  data: Section;
  total: number;
}> = ({ data, total }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (data.noReveal) return null;

  const local = frame - data.activeAt;
  if (local < -2 || local > HOLD + 26) return null;

  const enter = spring({ frame: local, fps, config: { damping: 20, stiffness: 90 } });
  const exit = interpolate(local, [HOLD, HOLD + 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  const titleP = spring({ frame: local - 10, fps, config: { damping: 22, stiffness: 90 } });
  const capP = spring({ frame: local - 20, fps, config: { damping: 22, stiffness: 90 } });

  const appear = enter * (1 - exit);
  const slideX = interpolate(enter, [0, 1], [-70, 0]) + exit * -50;

  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        top: 250,
        width: 740,
        opacity: appear,
        transform: `translateX(${slideX}px) scale(${interpolate(appear, [0, 1], [0.96, 1])})`,
      }}
    >
      {/* Ghost number behind the card */}
      <div
        style={{
          position: "absolute",
          top: -92,
          left: -8,
          fontFamily: inter,
          fontWeight: 700,
          fontSize: 230,
          lineHeight: 1,
          color: colors.blue,
          opacity: 0.16 * appear,
          userSelect: "none",
        }}
      >
        {String(data.n).padStart(2, "0")}
      </div>

      <div
        style={{
          position: "relative",
          padding: "40px 46px 44px",
          borderRadius: 26,
          background: `${colors.deepBlue}E6`,
          border: `1.5px solid ${colors.lightBlue}40`,
          boxShadow: `0 30px 80px -24px rgba(0,0,0,0.7), 0 0 0 7px ${colors.blue}1A`,
          display: "flex",
          flexDirection: "column",
          gap: 22,
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            alignSelf: "flex-start",
            fontFamily: inter,
            fontSize: 18,
            fontWeight: 600,
            letterSpacing: 3,
            color: colors.lightBlue,
            padding: "8px 18px",
            borderRadius: 999,
            border: `1.5px solid ${colors.lightBlue}45`,
            background: `${colors.blue}29`,
            textTransform: "uppercase",
          }}
        >
          Section {data.n} of {total}
        </div>

        {/* Headline */}
        <div
          style={{
            fontFamily: inter,
            fontWeight: 700,
            fontSize: 60,
            lineHeight: 1.06,
            color: colors.white,
            letterSpacing: -0.5,
            whiteSpace: "pre-line",
            opacity: titleP,
            transform: `translateY(${interpolate(titleP, [0, 1], [18, 0])}px)`,
          }}
        >
          {data.title}
        </div>

        {/* Caption — the single orange accent (left rule) */}
        <div
          style={{
            fontFamily: inter,
            fontWeight: 400,
            fontSize: 29,
            lineHeight: 1.42,
            color: colors.textDim,
            opacity: capP,
            transform: `translateY(${interpolate(capP, [0, 1], [14, 0])}px)`,
            borderLeft: `3px solid ${colors.orange}`,
            paddingLeft: 20,
          }}
        >
          {data.caption}
        </div>
      </div>
    </div>
  );
};
