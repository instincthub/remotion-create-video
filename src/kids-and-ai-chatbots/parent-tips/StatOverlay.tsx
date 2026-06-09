import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { colors } from "./colors";
import { nunito, dmSans } from "./fonts";
import { BEATS } from "./timing";

/**
 * The one hard statistic the host actually speaks (SRT cue 193): "40% of
 * children don't have any issue following the advice from AI." Animated as
 * a counting number inside a frosted card on the lower-left during Tip 5.
 */
export const StatOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const local = frame - BEATS.statIn;
  const span = BEATS.statOut - BEATS.statIn;
  if (local < 0 || local > span + 20) return null;

  const enter = spring({
    frame: local,
    fps,
    config: { damping: 20, stiffness: 80 },
  });
  const count = interpolate(local, [6, 40], [0, 40], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const exit = interpolate(local, [span, span + 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  const appear = enter * (1 - exit);

  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        bottom: 250,
        width: 660,
        opacity: appear,
        transform: `translateY(${interpolate(appear, [0, 1], [40, 0])}px)`,
      }}
    >
      <div
        style={{
          padding: "34px 40px",
          borderRadius: 26,
          background: `${colors.brandDark}E0`,
          border: `1.5px solid ${colors.tealLight}55`,
          boxShadow: `0 30px 80px -24px rgba(0,0,0,0.7), 0 0 0 8px ${colors.brandTeal}14`,
          display: "flex",
          alignItems: "center",
          gap: 30,
        }}
      >
        <div
          style={{
            fontFamily: nunito,
            fontWeight: 700,
            fontSize: 116,
            lineHeight: 1,
            color: colors.tealLight,
          }}
        >
          {Math.round(count)}%
        </div>
        <div
          style={{
            fontFamily: dmSans,
            fontWeight: 400,
            fontSize: 30,
            lineHeight: 1.35,
            color: colors.neutral200,
          }}
        >
          of kids have{" "}
          <span style={{ color: colors.white, fontWeight: 500 }}>
            zero concerns
          </span>{" "}
          about following a chatbot's advice.
        </div>
      </div>
    </div>
  );
};
