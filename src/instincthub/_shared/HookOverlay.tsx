import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { colors } from "./colors";
import { montserrat, nunito, DISPLAY_TRACKING } from "./fonts";
import { panel, ENTER_SPRING, CHILD_SPRING } from "./theme";
import type { HookContent } from "./types";

/**
 * Opening hook lower-third: states the lesson's big idea over the first lines.
 * Lower-left, in a frosted gunmetal box so white type reads over bright
 * footage. The accent continuation is tiffany cyan (the bright brand accent on
 * dark). Fades out before the first section reveal.
 */
export const HookOverlay: React.FC<{ data: HookContent }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const local = frame - data.in;
  const span = data.out - data.in;
  if (local < 0 || local > span + 22) return null;

  const enter = spring({ frame: local, fps, config: ENTER_SPRING });
  const line2 = spring({ frame: local - 16, fps, config: CHILD_SPRING });
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
        maxWidth: 1180,
        opacity: appear,
        transform: `translateY(${interpolate(appear, [0, 1], [40, 0])}px)`,
      }}
    >
      <div style={{ display: "inline-block", padding: "30px 46px 36px", ...panel }}>
        <div
          style={{
            fontFamily: montserrat,
            fontSize: 19,
            fontWeight: 700,
            letterSpacing: 4,
            color: colors.tiffany,
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          {data.eyebrow}
        </div>
        <div
          style={{
            fontFamily: montserrat,
            fontWeight: 800,
            fontSize: 76,
            lineHeight: 1.06,
            color: colors.white,
            letterSpacing: DISPLAY_TRACKING,
          }}
        >
          {data.line1}
          {data.line1Accent ? (
            <span style={{ color: colors.tiffany }}> {data.line1Accent}</span>
          ) : null}
        </div>
        {data.line2 ? (
          <div
            style={{
              fontFamily: nunito,
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
