import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { colors } from "./colors";
import { display, body } from "./fonts";
import { BEATS, CTA } from "./timing";

/**
 * Closing CTA lower-third. The cut ends on the spoken sign-off, so this holds
 * to the very last frame (no end card of its own to collide with).
 */
export const CTAOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < BEATS.ctaIn - 6) return null;

  const enter = spring({
    frame: frame - BEATS.ctaIn,
    fps,
    config: { damping: 22, stiffness: 90 },
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 96,
        bottom: 132,
        width: 1180,
        opacity: enter,
        transform: `translateY(${interpolate(enter, [0, 1], [44, 0])}px)`,
      }}
    >
      <div
        style={{
          padding: "30px 40px",
          borderRadius: 26,
          background: `${colors.brandDark}EC`,
          border: `1.5px solid ${colors.tealLight}44`,
          boxShadow: `0 36px 90px -28px rgba(0,0,0,0.8)`,
          backdropFilter: "blur(6px)",
          display: "flex",
          alignItems: "center",
          gap: 30,
        }}
      >
        <div
          style={{
            flexShrink: 0,
            padding: "16px 30px",
            borderRadius: 16,
            background: colors.accentOrange,
            color: colors.white,
            fontFamily: display,
            fontWeight: 800,
            fontSize: 38,
            letterSpacing: 0.3,
            boxShadow: `0 10px 30px -8px ${colors.accentOrange}AA`,
          }}
        >
          ► Subscribe
        </div>
        <div>
          <div
            style={{
              fontFamily: display,
              fontWeight: 800,
              fontSize: 46,
              lineHeight: 1.05,
              color: colors.white,
              letterSpacing: -0.5,
            }}
          >
            {CTA.line}
          </div>
          <div
            style={{
              fontFamily: body,
              fontWeight: 400,
              fontSize: 26,
              color: colors.neutral200,
              marginTop: 8,
            }}
          >
            {CTA.sub}
          </div>
        </div>
      </div>
    </div>
  );
};
