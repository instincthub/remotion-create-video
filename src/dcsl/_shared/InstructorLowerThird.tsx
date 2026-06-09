import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { colors } from "./colors";
import { inter } from "./fonts";
import type { InstructorContent } from "./types";

/**
 * Broadcast-style instructor lower-third. A vertical orange accent bar (the
 * single accent), the speaker's name + post-nominals, and their title.
 * Frosted Deep Blue panel, bottom-left, so it reads over bright footage and
 * never collides with the right-rail tracker.
 */
export const InstructorLowerThird: React.FC<{ data: InstructorContent }> = ({
  data,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const local = frame - data.in;
  const span = data.out - data.in;
  if (local < 0 || local > span + 22) return null;

  const enter = spring({ frame: local, fps, config: { damping: 22, stiffness: 90 } });
  const titleP = spring({ frame: local - 12, fps, config: { damping: 24, stiffness: 90 } });
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
        background: `${colors.deepBlue}EB`,
        border: `1.5px solid ${colors.lightBlue}3D`,
        boxShadow: `0 26px 64px -24px rgba(0,0,0,0.7), 0 0 0 6px ${colors.blue}1F`,
      }}
    >
      {/* Orange accent bar — the one accent for this view */}
      <div style={{ width: 10, background: colors.orange, flexShrink: 0 }} />

      <div style={{ padding: "26px 40px 28px 34px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
          <div
            style={{
              fontFamily: inter,
              fontWeight: 700,
              fontSize: 54,
              lineHeight: 1,
              color: colors.white,
              letterSpacing: -0.5,
            }}
          >
            {data.name}
          </div>
          {data.credential ? (
            <div
              style={{
                fontFamily: inter,
                fontWeight: 600,
                fontSize: 30,
                color: colors.orange,
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
          <div style={{ width: 40, height: 3, borderRadius: 999, background: colors.lightBlue }} />
          <div
            style={{
              fontFamily: inter,
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
