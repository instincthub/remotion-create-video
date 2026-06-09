import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { colors } from "./colors";
import { overpass } from "./fonts";
import { panel, ENTER_SPRING, CHILD_SPRING } from "./theme";
import type { OutlineContent } from "./types";

/**
 * "What you'll hear" agenda card, shown while the speaker frames the talk. A
 * numbered list in a frosted ink panel on the left, each item settling in turn.
 * Used at the open; later sections can omit it.
 */
export const OutlineReveal: React.FC<{ data: OutlineContent }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const local = frame - data.in;
  const span = data.out - data.in;
  if (local < 0 || local > span + 24) return null;

  const enter = spring({ frame: local, fps, config: ENTER_SPRING });
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
        width: 900,
        opacity: appear,
        transform: `translateX(${interpolate(appear, [0, 1], [-60, 0])}px)`,
      }}
    >
      <div style={{ padding: "40px 48px 44px", ...panel }}>
        <div
          style={{
            fontFamily: overpass,
            fontSize: 19,
            fontWeight: 700,
            letterSpacing: 4,
            color: colors.goldDim,
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
              config: CHILD_SPRING,
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
                    background: colors.yellow,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: overpass,
                    fontWeight: 800,
                    fontSize: 24,
                    color: colors.ink,
                  }}
                >
                  {i + 1}
                </div>
                <div
                  style={{
                    fontFamily: overpass,
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
