import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { colors } from "./colors";
import { montserrat, nunito, DISPLAY_TRACKING } from "./fonts";
import { panel, ENTER_SPRING, CHILD_SPRING } from "./theme";
import type { Section } from "./types";

const HOLD = 195; // 6.5s @ 30fps — how long a reveal panel stays before receding

/**
 * Left-side reveal panel for one lesson section. Slides in on the section's
 * cue, holds, then recedes — leaving just the right-rail highlight and the
 * instructor. A large tiffany ghost number anchors it; the caption carries a
 * DarkCyan left rule. Clean and instructional, per the brand tone.
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

  const enter = spring({ frame: local, fps, config: ENTER_SPRING });
  const exit = interpolate(local, [HOLD, HOLD + 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  const titleP = spring({ frame: local - 10, fps, config: CHILD_SPRING });
  const capP = spring({ frame: local - 20, fps, config: CHILD_SPRING });

  const appear = enter * (1 - exit);
  const slideX = interpolate(enter, [0, 1], [-70, 0]) + exit * -50;

  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        top: 250,
        width: 760,
        opacity: appear,
        transform: `translateX(${slideX}px) scale(${interpolate(appear, [0, 1], [0.96, 1])})`,
      }}
    >
      {/* Ghost number behind the card — brand cyan, kept low-opacity */}
      <div
        style={{
          position: "absolute",
          top: -96,
          left: -8,
          fontFamily: montserrat,
          fontWeight: 900,
          fontSize: 240,
          lineHeight: 1,
          color: colors.tiffany,
          opacity: 0.2 * appear,
          letterSpacing: DISPLAY_TRACKING,
          userSelect: "none",
        }}
      >
        {String(data.n).padStart(2, "0")}
      </div>

      <div
        style={{
          position: "relative",
          padding: "40px 46px 44px",
          display: "flex",
          flexDirection: "column",
          gap: 22,
          ...panel,
          borderRadius: 26,
        }}
      >
        {/* Eyebrow pill */}
        <div
          style={{
            alignSelf: "flex-start",
            fontFamily: montserrat,
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: 3,
            color: colors.tiffany,
            padding: "8px 18px",
            borderRadius: 999,
            border: `1.5px solid ${colors.cyan}66`,
            background: `${colors.cyan}26`,
            textTransform: "uppercase",
          }}
        >
          Section {data.n} of {total}
        </div>

        {/* Headline */}
        <div
          style={{
            fontFamily: montserrat,
            fontWeight: 800,
            fontSize: 58,
            lineHeight: 1.08,
            color: colors.white,
            letterSpacing: DISPLAY_TRACKING,
            whiteSpace: "pre-line",
            opacity: titleP,
            transform: `translateY(${interpolate(titleP, [0, 1], [18, 0])}px)`,
          }}
        >
          {data.title}
        </div>

        {/* Caption — the DarkCyan left rule */}
        <div
          style={{
            fontFamily: nunito,
            fontWeight: 400,
            fontSize: 29,
            lineHeight: 1.42,
            color: colors.textDim,
            opacity: capP,
            transform: `translateY(${interpolate(capP, [0, 1], [14, 0])}px)`,
            borderLeft: `3px solid ${colors.cyan}`,
            paddingLeft: 20,
          }}
        >
          {data.caption}
        </div>
      </div>
    </div>
  );
};
