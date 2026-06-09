import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { colors } from "./colors";
import { inter } from "./fonts";
import type { QuoteContent } from "./types";

/**
 * Pull-quote / key-point card. A large opening quote mark in orange (the
 * accent), the verbatim line in white, and the source attribution beneath.
 * Frosted Deep Blue panel on the lower-left; timed into gaps between section
 * reveals so it never stacks on another left-side panel.
 */
export const QuoteOverlay: React.FC<{ data: QuoteContent }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const local = frame - data.in;
  const span = data.out - data.in;
  if (local < 0 || local > span + 24) return null;

  const enter = spring({ frame: local, fps, config: { damping: 22, stiffness: 80 } });
  const attrP = spring({ frame: local - 16, fps, config: { damping: 24, stiffness: 90 } });
  const exit = interpolate(local, [span, span + 22], [0, 1], {
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
        bottom: 200,
        width: 1000,
        opacity: appear,
        transform: `translateY(${interpolate(appear, [0, 1], [40, 0])}px)`,
      }}
    >
      <div
        style={{
          position: "relative",
          padding: "40px 48px 40px 52px",
          borderRadius: 26,
          background: `${colors.deepBlue}EB`,
          border: `1.5px solid ${colors.lightBlue}40`,
          boxShadow: `0 30px 80px -24px rgba(0,0,0,0.7), 0 0 0 7px ${colors.blue}1A`,
        }}
      >
        {/* Big quote mark */}
        <div
          style={{
            position: "absolute",
            top: 6,
            left: 28,
            fontFamily: inter,
            fontWeight: 700,
            fontSize: 120,
            lineHeight: 1,
            color: colors.orange,
            opacity: 0.9,
            userSelect: "none",
          }}
        >
          &ldquo;
        </div>

        <div
          style={{
            fontFamily: inter,
            fontWeight: 500,
            fontSize: 38,
            lineHeight: 1.34,
            color: colors.white,
            paddingLeft: 70,
            paddingTop: 18,
          }}
        >
          {data.text}
        </div>

        <div
          style={{
            marginTop: 22,
            paddingLeft: 70,
            display: "flex",
            alignItems: "center",
            gap: 16,
            opacity: attrP,
            transform: `translateY(${interpolate(attrP, [0, 1], [12, 0])}px)`,
          }}
        >
          <div style={{ width: 44, height: 3, borderRadius: 999, background: colors.orange }} />
          <div
            style={{
              fontFamily: inter,
              fontWeight: 600,
              fontSize: 25,
              letterSpacing: 1,
              color: colors.lightBlue,
            }}
          >
            {data.attribution}
          </div>
        </div>
      </div>
    </div>
  );
};
