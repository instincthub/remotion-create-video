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
 * Closing CTA lower-third. Appears when the author pivots to the call
 * ("Call on him today …", cue 105) and holds to the very end — there is no
 * built-in end card on the footage. Lower-left, above the subtitle band.
 */
export const CTAOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const local = frame - BEATS.ctaIn;
  if (local < 0 || frame > BEATS.ctaOut + 26) return null;

  const enter = spring({
    frame: local,
    fps,
    config: { damping: 20, stiffness: 80 },
  });
  const exit = interpolate(frame, [BEATS.ctaOut, BEATS.ctaOut + 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  const sub = spring({
    frame: local - 14,
    fps,
    config: { damping: 22, stiffness: 90 },
  });
  const chips = spring({
    frame: local - 26,
    fps,
    config: { damping: 22, stiffness: 90 },
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        bottom: 150,
        display: "inline-block",
        maxWidth: 1150,
        padding: "32px 46px 36px",
        borderRadius: 26,
        background: `${colors.brandDark}E6`,
        border: `1.5px solid ${colors.brandSky}55`,
        boxShadow: `0 28px 70px -24px rgba(0,0,0,0.72), 0 0 0 7px ${colors.brandBlue}1F`,
        opacity: enter * (1 - exit),
        transform: `translateY(${interpolate(enter, [0, 1], [44, 0]) + exit * 40}px)`,
      }}
    >
      <div
        style={{
          fontFamily: inter,
          fontSize: 18,
          fontWeight: 600,
          letterSpacing: 5,
          color: colors.skyLight,
          textTransform: "uppercase",
          marginBottom: 14,
        }}
      >
        Call on Him today
      </div>
      <div
        style={{
          fontFamily: playfair,
          fontWeight: 700,
          fontSize: 76,
          lineHeight: 1.06,
          color: colors.white,
          textShadow: "0 6px 30px rgba(0,0,0,0.55)",
        }}
      >
        He can <span style={{ color: colors.skyLight }}>heal you</span> too.
      </div>
      <div
        style={{
          fontFamily: inter,
          fontWeight: 400,
          fontSize: 32,
          color: colors.neutral200,
          marginTop: 16,
          opacity: sub,
          transform: `translateY(${interpolate(sub, [0, 1], [16, 0])}px)`,
          textShadow: "0 4px 20px rgba(0,0,0,0.6)",
        }}
      >
        You have a story to tell, and a testimony to give.
      </div>
      <div
        style={{
          display: "flex",
          gap: 16,
          marginTop: 24,
          opacity: chips,
          transform: `translateY(${interpolate(chips, [0, 1], [14, 0])}px)`,
        }}
      >
        {["Monday Morning Missive", "Subscribe & share"].map((c) => (
          <div
            key={c}
            style={{
              fontFamily: inter,
              fontSize: 23,
              fontWeight: 600,
              color: colors.white,
              padding: "12px 24px",
              borderRadius: 999,
              background: `${colors.brandBlue}E6`,
              border: `1.5px solid ${colors.brandSky}66`,
            }}
          >
            {c}
          </div>
        ))}
      </div>
    </div>
  );
};
