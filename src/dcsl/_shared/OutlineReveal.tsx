import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { colors } from "./colors";
import { inter } from "./fonts";
import type { OutlineContent } from "./types";

/**
 * Agenda card shown while the instructor previews the session. A numbered list
 * in a frosted Deep Blue panel on the left, each item settling in turn. Used on
 * the opening lesson; later lessons can omit it.
 */
export const OutlineReveal: React.FC<{ data: OutlineContent }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const local = frame - data.in;
  const span = data.out - data.in;
  if (local < 0 || local > span + 24) return null;

  const enter = spring({ frame: local, fps, config: { damping: 22, stiffness: 80 } });
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
        top: 232,
        width: 880,
        opacity: appear,
        transform: `translateX(${interpolate(appear, [0, 1], [-60, 0])}px)`,
      }}
    >
      <div
        style={{
          padding: "40px 48px 44px",
          borderRadius: 26,
          background: `${colors.deepBlue}E6`,
          border: `1.5px solid ${colors.lightBlue}40`,
          boxShadow: `0 30px 80px -24px rgba(0,0,0,0.7), 0 0 0 7px ${colors.blue}1A`,
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
            marginBottom: 26,
          }}
        >
          {data.title}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {data.items.map((item, i) => {
            const itemP = spring({
              frame: local - 10 - i * 7,
              fps,
              config: { damping: 24, stiffness: 90 },
            });
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 22,
                  opacity: itemP,
                  transform: `translateX(${interpolate(itemP, [0, 1], [-20, 0])}px)`,
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: `${colors.blue}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: inter,
                    fontWeight: 700,
                    fontSize: 24,
                    color: colors.white,
                  }}
                >
                  {i + 1}
                </div>
                <div
                  style={{
                    fontFamily: inter,
                    fontWeight: 500,
                    fontSize: 34,
                    color: colors.white,
                    lineHeight: 1.2,
                  }}
                >
                  {item}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
