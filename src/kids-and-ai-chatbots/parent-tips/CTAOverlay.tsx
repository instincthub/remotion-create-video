import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { colors } from "./colors";
import { nunito, dmSans, dmMono } from "./fonts";
import { BEATS } from "./timing";

/**
 * Closing CTA lower-third: Kids Can Code. Appears when the host pivots to
 * the programme (SRT cue 243) and holds to the end. Lower-left, above the
 * subtitle band, so it never collides with the burned-in captions.
 */
export const CTAOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const local = frame - BEATS.ctaIn;
  if (local < 0 || frame > BEATS.ctaOut + 24) return null;

  const enter = spring({
    frame: local,
    fps,
    config: { damping: 20, stiffness: 80 },
  });
  // Recede before the talk's own outro card fades in.
  const exit = interpolate(frame, [BEATS.ctaOut, BEATS.ctaOut + 22], [0, 1], {
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
        bottom: 244,
        display: "inline-block",
        maxWidth: 1100,
        padding: "32px 44px 36px",
        borderRadius: 26,
        background: `${colors.brandDark}E6`,
        border: `1.5px solid ${colors.tealLight}44`,
        boxShadow: `0 28px 70px -24px rgba(0,0,0,0.7), 0 0 0 7px ${colors.brandTeal}14`,
        opacity: enter * (1 - exit),
        transform: `translateY(${
          interpolate(enter, [0, 1], [44, 0]) + exit * 40
        }px)`,
      }}
    >
      <div
        style={{
          fontFamily: dmMono,
          fontSize: 18,
          fontWeight: 500,
          letterSpacing: 4,
          color: colors.tealLight,
          textTransform: "uppercase",
          marginBottom: 14,
        }}
      >
        From AI Playbook · InstinctHub
      </div>
      <div
        style={{
          fontFamily: nunito,
          fontWeight: 700,
          fontSize: 84,
          lineHeight: 1.04,
          color: colors.white,
          textShadow: "0 6px 30px rgba(0,0,0,0.55)",
        }}
      >
        Kids Can <span style={{ color: colors.tealLight }}>Code</span>
      </div>
      <div
        style={{
          fontFamily: dmSans,
          fontWeight: 400,
          fontSize: 34,
          color: colors.neutral200,
          marginTop: 16,
          opacity: sub,
          transform: `translateY(${interpolate(sub, [0, 1], [16, 0])}px)`,
          textShadow: "0 4px 20px rgba(0,0,0,0.6)",
        }}
      >
        Real Python and AI from the inside — for ages 7 to 13.
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
        {["Link in description", "Message us on WhatsApp"].map((c) => (
          <div
            key={c}
            style={{
              fontFamily: dmSans,
              fontSize: 24,
              fontWeight: 500,
              color: colors.white,
              padding: "12px 24px",
              borderRadius: 999,
              background: `${colors.brandTeal}E6`,
              border: `1.5px solid ${colors.tealLight}66`,
            }}
          >
            {c}
          </div>
        ))}
      </div>
    </div>
  );
};
