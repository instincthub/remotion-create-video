import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { colors } from "./colors";
import { inter } from "./fonts";
import type { HookContent } from "./types";

/**
 * Opening hook lower-third: states the lesson topic over the first sentences.
 * Lower-left, in a frosted Deep Blue box so white type reads over bright
 * footage. Fades out before the first section reveal.
 */
export const HookOverlay: React.FC<{ data: HookContent }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const local = frame - data.in;
  const span = data.out - data.in;
  if (local < 0 || local > span + 22) return null;

  const enter = spring({ frame: local, fps, config: { damping: 20, stiffness: 80 } });
  const line2 = spring({ frame: local - 16, fps, config: { damping: 22, stiffness: 90 } });
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
        bottom: 230,
        maxWidth: 1120,
        opacity: appear,
        transform: `translateY(${interpolate(appear, [0, 1], [40, 0])}px)`,
      }}
    >
      <div
        style={{
          display: "inline-block",
          padding: "30px 44px 36px",
          borderRadius: 22,
          background: `${colors.deepBlue}EB`,
          border: `1.5px solid ${colors.lightBlue}3D`,
          boxShadow: `0 28px 70px -24px rgba(0,0,0,0.7), 0 0 0 6px ${colors.blue}1F`,
        }}
      >
        <div
          style={{
            fontFamily: inter,
            fontSize: 19,
            fontWeight: 600,
            letterSpacing: 4,
            color: colors.lightBlue,
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          {data.eyebrow}
        </div>
        <div
          style={{
            fontFamily: inter,
            fontWeight: 700,
            fontSize: 78,
            lineHeight: 1.05,
            color: colors.white,
            letterSpacing: -0.5,
          }}
        >
          {data.line1}
          {data.line1Accent ? (
            <span style={{ color: colors.orange }}> {data.line1Accent}</span>
          ) : null}
        </div>
        {data.line2 ? (
          <div
            style={{
              fontFamily: inter,
              fontWeight: 400,
              fontSize: 32,
              color: colors.textDim,
              marginTop: 16,
              opacity: line2,
              transform: `translateY(${interpolate(line2, [0, 1], [16, 0])}px)`,
            }}
          >
            {data.line2}
          </div>
        ) : null}
      </div>
    </div>
  );
};
