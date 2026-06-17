import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { colors } from "./colors";
import { montserrat, nunito, DISPLAY_TRACKING } from "./fonts";
import { panel, ENTER_SPRING } from "./theme";
import type { StatContent } from "./types";

/**
 * Big animated figure callout for a statistic the instructor states (e.g.
 * "₦150m", "40,000 leads"). The number renders in Caribbean Green — the
 * brand's success token, and the one place a large green element is justified.
 * Frosted gunmetal panel, lower-left.
 *
 * If `count` is set the figure counts up 0→count (with optional prefix/suffix);
 * otherwise `value` pops in (for non-countable values like "0.01%").
 */
export const StatCallout: React.FC<{ data: StatContent }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const local = frame - data.in;
  const span = data.out - data.in;
  if (local < 0 || local > span + 22) return null;

  const enter = spring({ frame: local, fps, config: ENTER_SPRING });
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
  // Thousands separators so big counts read "40,000", not "40000".
  const withCommas = (n: number) => Math.round(n).toLocaleString("en-US");
  const figure =
    data.count != null
      ? `${data.prefix ?? ""}${withCommas(counted)}${data.suffix ?? ""}`
      : data.value;

  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        bottom: 220,
        width: 800,
        opacity: appear,
        transform: `translateY(${interpolate(appear, [0, 1], [40, 0])}px)`,
      }}
    >
      <div
        style={{
          padding: "34px 44px",
          display: "flex",
          alignItems: "center",
          gap: 34,
          ...panel,
          borderRadius: 26,
        }}
      >
        <div
          style={{
            fontFamily: montserrat,
            fontWeight: 900,
            fontSize: 112,
            lineHeight: 1,
            letterSpacing: DISPLAY_TRACKING,
            color: colors.green,
            flexShrink: 0,
            whiteSpace: "nowrap",
          }}
        >
          {figure}
        </div>
        <div
          style={{
            fontFamily: nunito,
            fontWeight: 500,
            fontSize: 30,
            lineHeight: 1.34,
            color: colors.textDim,
          }}
        >
          {data.label}
        </div>
      </div>
    </div>
  );
};
