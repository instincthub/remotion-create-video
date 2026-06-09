import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { colors } from "./colors";
import { inter } from "./fonts";
import type { StatContent } from "./types";

/**
 * Big animated figure callout for a statistic the instructor states
 * (e.g. "12 years", "0.01%"). The number is rendered in orange (the single
 * accent, and the one place a large orange element is justified). Frosted Deep
 * Blue panel, lower-left.
 *
 * If `count` is set the figure counts up 0→count; otherwise `value` pops in
 * (used for non-countable values like "9 / 8" or "0.01%").
 */
export const StatCallout: React.FC<{ data: StatContent }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const local = frame - data.in;
  const span = data.out - data.in;
  if (local < 0 || local > span + 22) return null;

  const enter = spring({ frame: local, fps, config: { damping: 20, stiffness: 80 } });
  const exit = interpolate(local, [span, span + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  const appear = enter * (1 - exit);

  const counted = interpolate(local, [6, 40], [0, data.count ?? 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const figure =
    data.count != null ? `${Math.round(counted)}${data.suffix ?? ""}` : data.value;

  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        bottom: 220,
        width: 760,
        opacity: appear,
        transform: `translateY(${interpolate(appear, [0, 1], [40, 0])}px)`,
      }}
    >
      <div
        style={{
          padding: "34px 44px",
          borderRadius: 26,
          background: `${colors.deepBlue}EB`,
          border: `1.5px solid ${colors.lightBlue}40`,
          boxShadow: `0 30px 80px -24px rgba(0,0,0,0.7), 0 0 0 7px ${colors.blue}1A`,
          display: "flex",
          alignItems: "center",
          gap: 34,
        }}
      >
        <div
          style={{
            fontFamily: inter,
            fontWeight: 700,
            fontSize: 108,
            lineHeight: 1,
            letterSpacing: -2,
            color: colors.orange,
            flexShrink: 0,
            whiteSpace: "nowrap",
          }}
        >
          {figure}
        </div>
        <div
          style={{
            fontFamily: inter,
            fontWeight: 400,
            fontSize: 30,
            lineHeight: 1.36,
            color: colors.textDim,
          }}
        >
          {data.label}
        </div>
      </div>
    </div>
  );
};
