import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { nunito, dmMono } from "./fonts";

const CATEGORIES = [
  { num: "01", name: "Consumer", revealed: true },
  { num: "02", name: "Explorer", revealed: true },
  { num: "03", name: "———", revealed: false },
  { num: "04", name: "———", revealed: false },
  { num: "05", name: "———", revealed: false },
];

export const Scene3Categories: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    delay: 3,
    config: { damping: 18, stiffness: 90 },
  });

  return (
    <AbsoluteFill
      style={{
        background: colors.brandDark,
        fontFamily: nunito,
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 60%, ${colors.tealDeeper}30 0%, transparent 60%)`,
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 80px 340px",
          gap: 28,
        }}
      >
        {/* Kicker */}
        <div
          style={{
            fontFamily: dmMono,
            fontSize: 22,
            fontWeight: 500,
            color: colors.tealLight,
            letterSpacing: 3,
            opacity: interpolate(titleProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(titleProgress, [0, 1], [15, 0])}px)`,
          }}
        >
          THE 5 PATHS
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 60,
            fontWeight: 700,
            color: colors.white,
            lineHeight: 1.12,
            maxWidth: 900,
            opacity: interpolate(titleProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(titleProgress, [0, 1], [20, 0])}px)`,
            marginBottom: 24,
          }}
        >
          Today we cover the{" "}
          <span style={{ color: colors.tealLight }}>first two.</span>
        </div>

        {/* Category rows */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            width: "100%",
          }}
        >
          {CATEGORIES.map((cat, i) => {
            const rowProgress = spring({
              frame: frame - (25 + i * 14),
              fps,
              config: { damping: 18, stiffness: 90 },
            });

            return (
              <div
                key={cat.num}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 26,
                  padding: "22px 28px",
                  backgroundColor: cat.revealed
                    ? `${colors.tealDeeper}30`
                    : `${colors.neutral800}50`,
                  border: `1.5px solid ${cat.revealed ? colors.tealLight : colors.neutral600}80`,
                  borderRadius: 16,
                  opacity: interpolate(rowProgress, [0, 1], [0, 1]),
                  transform: `translateX(${interpolate(rowProgress, [0, 1], [-40, 0])}px)`,
                }}
              >
                <div
                  style={{
                    fontFamily: dmMono,
                    fontSize: 32,
                    fontWeight: 500,
                    color: cat.revealed ? colors.tealLight : colors.neutral600,
                    minWidth: 70,
                  }}
                >
                  {cat.num}
                </div>
                <div
                  style={{
                    fontFamily: nunito,
                    fontSize: 46,
                    fontWeight: 700,
                    color: cat.revealed ? colors.white : colors.neutral600,
                    letterSpacing: cat.revealed ? 0 : 4,
                  }}
                >
                  {cat.name}
                </div>
                {cat.revealed && (
                  <div
                    style={{
                      marginLeft: "auto",
                      fontFamily: dmMono,
                      fontSize: 18,
                      fontWeight: 500,
                      color: colors.tealLight,
                      letterSpacing: 2,
                    }}
                  >
                    TODAY
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          bottom: 320,
          right: 80,
          fontFamily: dmMono,
          fontSize: 15,
          fontWeight: 500,
          color: `${colors.white}40`,
          letterSpacing: 2,
        }}
      >
        AI PLAYBOOK
      </div>
    </AbsoluteFill>
  );
};
