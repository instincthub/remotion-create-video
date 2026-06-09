import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { colors } from "./colors";
import { display, mono } from "./fonts";
import { CHAPTERS, RAIL_IN, CLOSEOUT_IN, chapterStateAt } from "./timing";

/**
 * Persistent chapter rail (top-right, over open wall). The curiosity engine:
 * the UPCOMING chapters stay blurred + locked, the ACTIVE one is sharp and
 * accented, DONE ones dim with a check. Hiding what's next is what pulls
 * viewers to the end.
 */
export const ChapterRail: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < RAIL_IN - 6 || frame > CLOSEOUT_IN + 6) return null;

  const enter = spring({
    frame: frame - RAIL_IN,
    fps,
    config: { damping: 24, stiffness: 80 },
  });
  const exit = interpolate(frame, [CLOSEOUT_IN - 16, CLOSEOUT_IN + 4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  const appear = enter * (1 - exit);

  return (
    <div
      style={{
        position: "absolute",
        top: 64,
        right: 64,
        width: 384,
        opacity: appear,
        transform: `translateX(${interpolate(appear, [0, 1], [40, 0])}px)`,
      }}
    >
      <div
        style={{
          padding: "22px 22px 20px",
          borderRadius: 22,
          background: `${colors.brandDark}D8`,
          border: `1.5px solid ${colors.tealLight}33`,
          boxShadow: `0 26px 70px -30px rgba(0,0,0,0.7)`,
          backdropFilter: "blur(6px)",
        }}
      >
        <div
          style={{
            fontFamily: mono,
            fontSize: 16,
            letterSpacing: 4,
            color: `${colors.neutral400}`,
            textTransform: "uppercase",
            marginBottom: 16,
            paddingLeft: 4,
          }}
        >
          This episode
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {CHAPTERS.map((c, i) => {
            const state = chapterStateAt(i, frame);
            const accent = c.accent === "amber" ? colors.amber : colors.tealLight;
            const isActive = state === "active";
            const isDone = state === "done";
            const isUpcoming = state === "upcoming";
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "11px 14px",
                  borderRadius: 13,
                  background: isActive ? `${accent}1F` : "transparent",
                  border: isActive
                    ? `1.5px solid ${accent}66`
                    : "1.5px solid transparent",
                  filter: isUpcoming ? "blur(2.4px)" : "none",
                  opacity: isUpcoming ? 0.5 : isDone ? 0.6 : 1,
                  transition: "all 0.3s",
                }}
              >
                {/* node */}
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 9,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: isActive
                      ? accent
                      : isDone
                      ? `${colors.tealLight}33`
                      : `${colors.neutral600}33`,
                    color: isActive ? colors.brandDark : colors.neutral200,
                    fontFamily: mono,
                    fontWeight: 500,
                    fontSize: 15,
                  }}
                >
                  {isDone ? "✓" : isUpcoming ? "🔒" : i + 1}
                </div>
                <div
                  style={{
                    fontFamily: display,
                    fontWeight: 700,
                    fontSize: 23,
                    color: isActive ? colors.white : colors.neutral200,
                    letterSpacing: -0.2,
                  }}
                >
                  {c.short}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
