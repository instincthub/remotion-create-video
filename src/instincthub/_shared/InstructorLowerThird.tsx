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
import type { InstructorContent } from "./types";

/**
 * Broadcast-style instructor lower-third. A vertical DarkCyan accent bar (the
 * dominant brand color), the instructor's name + optional tag, and their
 * role/org. Frosted gunmetal panel, bottom-left, so it reads over bright
 * footage and never collides with the right-rail tracker.
 */
export const InstructorLowerThird: React.FC<{ data: InstructorContent }> = ({
  data,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const local = frame - data.in;
  const span = data.out - data.in;
  if (local < 0 || local > span + 22) return null;

  const enter = spring({ frame: local, fps, config: ENTER_SPRING });
  const titleP = spring({ frame: local - 12, fps, config: CHILD_SPRING });
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
        opacity: appear,
        transform: `translateX(${interpolate(appear, [0, 1], [-50, 0])}px)`,
        display: "flex",
        alignItems: "stretch",
        borderRadius: 18,
        overflow: "hidden",
        background: panel.background,
        border: panel.border,
        boxShadow: panel.boxShadow,
      }}
    >
      {/* DarkCyan accent bar — the dominant brand stroke for this view */}
      <div style={{ width: 10, background: colors.cyan, flexShrink: 0 }} />

      <div style={{ padding: "26px 40px 28px 34px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
          <div
            style={{
              fontFamily: montserrat,
              fontWeight: 800,
              fontSize: 54,
              lineHeight: 1,
              color: colors.white,
              letterSpacing: -1,
            }}
          >
            {data.name}
          </div>
          {data.credential ? (
            <div
              style={{
                fontFamily: montserrat,
                fontWeight: 700,
                fontSize: 28,
                color: colors.tiffany,
                letterSpacing: 0.5,
              }}
            >
              {data.credential}
            </div>
          ) : null}
        </div>

        <div
          style={{
            marginTop: 12,
            display: "flex",
            alignItems: "center",
            gap: 16,
            opacity: titleP,
            transform: `translateY(${interpolate(titleP, [0, 1], [12, 0])}px)`,
          }}
        >
          <div style={{ width: 40, height: 3, borderRadius: 999, background: colors.cyan }} />
          <div
            style={{
              fontFamily: nunito,
              fontWeight: 500,
              fontSize: 30,
              color: colors.textDim,
            }}
          >
            {data.title}
          </div>
        </div>
      </div>
    </div>
  );
};
