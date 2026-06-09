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
 * Opening hook lower-third: "Your child is already using AI." Sits in the
 * lower-left, above the subtitle band, so it frames the speaker rather than
 * covering them. Fades out before the tips begin.
 */
export const HookOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const local = frame - BEATS.hookIn;
  const span = BEATS.hookOut - BEATS.hookIn;
  if (local < 0 || local > span + 20) return null;

  const enter = spring({
    frame: local,
    fps,
    config: { damping: 20, stiffness: 80 },
  });
  const line2 = spring({
    frame: local - 16,
    fps,
    config: { damping: 22, stiffness: 90 },
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
        bottom: 244,
        maxWidth: 1080,
        opacity: appear,
        transform: `translateY(${interpolate(appear, [0, 1], [40, 0])}px)`,
      }}
    >
      <div
        style={{
          display: "inline-block",
          padding: "30px 40px 34px",
          borderRadius: 24,
          background: `${colors.brandDark}E6`,
          border: `1.5px solid ${colors.tealLight}44`,
          boxShadow: `0 28px 70px -24px rgba(0,0,0,0.7), 0 0 0 7px ${colors.brandTeal}14`,
        }}
      >
        <div
          style={{
            width: 64,
            height: 5,
            borderRadius: 999,
            background: colors.tealLight,
            marginBottom: 20,
          }}
        />
        <div
          style={{
            fontFamily: nunito,
            fontWeight: 700,
            fontSize: 76,
            lineHeight: 1.06,
            color: colors.white,
          }}
        >
          Your child is{" "}
          <span style={{ color: colors.tealLight }}>already using AI.</span>
        </div>
        <div
          style={{
            fontFamily: dmSans,
            fontWeight: 400,
            fontSize: 34,
            color: colors.neutral200,
            marginTop: 16,
            opacity: line2,
            transform: `translateY(${interpolate(line2, [0, 1], [16, 0])}px)`,
          }}
        >
          You just might not know it yet.
        </div>
      </div>
    </div>
  );
};
