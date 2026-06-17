import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { colors } from "./colors";
import { montserrat, nunito } from "./fonts";
import { panel, ENTER_SPRING, CHILD_SPRING } from "./theme";
import type { QuoteContent } from "./types";

/**
 * Pull-quote / key-point card. A large opening quote mark in tiffany cyan,
 * the verbatim line in white, and the attribution beneath a DarkCyan rule.
 * Frosted gunmetal panel on the lower-left; timed into gaps between section
 * reveals so it never stacks on another left-side panel.
 */
export const QuoteOverlay: React.FC<{ data: QuoteContent }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const local = frame - data.in;
  const span = data.out - data.in;
  if (local < 0 || local > span + 24) return null;

  const enter = spring({ frame: local, fps, config: ENTER_SPRING });
  const attrP = spring({ frame: local - 16, fps, config: CHILD_SPRING });
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
        width: 1040,
        opacity: appear,
        transform: `translateY(${interpolate(appear, [0, 1], [40, 0])}px)`,
      }}
    >
      <div style={{ position: "relative", padding: "40px 48px 40px 52px", ...panel, borderRadius: 26 }}>
        {/* Big quote mark */}
        <div
          style={{
            position: "absolute",
            top: 2,
            left: 28,
            fontFamily: montserrat,
            fontWeight: 900,
            fontSize: 128,
            lineHeight: 1,
            color: colors.tiffany,
            userSelect: "none",
          }}
        >
          &ldquo;
        </div>

        <div
          style={{
            fontFamily: nunito,
            fontWeight: 600,
            fontSize: 40,
            lineHeight: 1.3,
            color: colors.white,
            paddingLeft: 72,
            paddingTop: 20,
            letterSpacing: -0.5,
          }}
        >
          {data.text}
        </div>

        <div
          style={{
            marginTop: 22,
            paddingLeft: 72,
            display: "flex",
            alignItems: "center",
            gap: 16,
            opacity: attrP,
            transform: `translateY(${interpolate(attrP, [0, 1], [12, 0])}px)`,
          }}
        >
          <div style={{ width: 44, height: 3, borderRadius: 999, background: colors.cyan }} />
          <div
            style={{
              fontFamily: montserrat,
              fontWeight: 700,
              fontSize: 25,
              letterSpacing: 1,
              color: colors.tiffany,
              textTransform: "uppercase",
            }}
          >
            {data.attribution}
          </div>
        </div>
      </div>
    </div>
  );
};
