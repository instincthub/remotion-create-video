import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { colors } from "./colors";
import { playfair, inter } from "./fonts";
import { BEATS } from "./timing";

/**
 * Opening hook lower-third. Sits lower-left, above the subtitle band, so it
 * frames the speaker (centred) rather than covering him. Fades out before the
 * message proper begins.
 */
export const HookOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const local = frame - BEATS.hookIn;
  const span = BEATS.hookOut - BEATS.hookIn;
  if (local < 0 || local > span + 22) return null;

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
  const exit = interpolate(local, [span, span + 20], [0, 1], {
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
        bottom: 150,
        maxWidth: 1120,
        opacity: appear,
        transform: `translateY(${interpolate(appear, [0, 1], [40, 0])}px)`,
      }}
    >
      <div
        style={{
          display: "inline-block",
          padding: "30px 42px 34px",
          borderRadius: 24,
          background: `${colors.brandDark}E6`,
          border: `1.5px solid ${colors.brandSky}55`,
          boxShadow: `0 28px 70px -24px rgba(0,0,0,0.7), 0 0 0 7px ${colors.brandBlue}1F`,
        }}
      >
        <div
          style={{
            fontFamily: inter,
            fontWeight: 600,
            fontSize: 20,
            letterSpacing: 5,
            color: colors.skyLight,
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          Monday Morning Missive
        </div>
        <div
          style={{
            fontFamily: playfair,
            fontWeight: 700,
            fontSize: 72,
            lineHeight: 1.08,
            color: colors.white,
          }}
        >
          Sometimes we need something{" "}
          <span style={{ color: colors.skyLight }}>greater than all.</span>
        </div>
        <div
          style={{
            fontFamily: inter,
            fontWeight: 400,
            fontSize: 32,
            color: colors.neutral200,
            marginTop: 16,
            opacity: line2,
            transform: `translateY(${interpolate(line2, [0, 1], [16, 0])}px)`,
          }}
        >
          And He healed them all.
        </div>
      </div>
    </div>
  );
};
