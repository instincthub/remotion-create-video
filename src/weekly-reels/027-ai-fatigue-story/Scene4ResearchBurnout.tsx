import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const stats = [
  { label: "Cognitive Overload", pct: 72, color: colors.oldRose },
  { label: "Decision Fatigue", pct: 65, color: colors.corn },
  { label: "Reduced Focus", pct: 58, color: colors.turkishRose },
];

export const Scene4ResearchBurnout: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 200 },
  });

  // Warning icon
  const iconEntrance = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 14, stiffness: 80 },
  });
  const iconPulse = Math.sin(frame * 0.06) * 0.05 + 1;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${colors.gunmetal}, ${colors.darkSlateGray})`,
        fontFamily,
      }}
    >
      <AbsoluteFill style={{ opacity: 0.03 }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`h-${i}`}
            style={{
              position: "absolute",
              top: i * 96,
              left: 0,
              width: "100%",
              height: 1,
              backgroundColor: colors.tiffanyBlue,
            }}
          />
        ))}
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 300,
          paddingLeft: 50,
          paddingRight: 50,
          gap: 30,
        }}
      >
        {/* Warning triangle */}
        <div
          style={{
            transform: `scale(${interpolate(iconEntrance, [0, 1], [0, 1]) * iconPulse})`,
          }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <path
              d="M40 8 L74 68 L6 68 Z"
              fill={`${colors.corn}12`}
              stroke={colors.corn}
              strokeWidth={2.5}
              strokeLinejoin="round"
            />
            <text
              x="40"
              y="55"
              textAnchor="middle"
              fill={colors.corn}
              fontSize="32"
              fontWeight="700"
              fontFamily={fontFamily}
            >
              !
            </text>
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: interpolate(titleProgress, [0, 1], [0, 1]),
            lineHeight: 1.3,
          }}
        >
          Developers Are
          <br />
          <span style={{ color: colors.oldRose }}>Burning Out</span>
        </div>

        {/* Bar chart */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            width: "100%",
            maxWidth: 600,
          }}
        >
          {stats.map((stat, i) => {
            const barGrow = spring({
              frame,
              fps,
              delay: 40 + i * 25,
              config: { damping: 20, stiffness: 60 },
            });
            const barWidth = interpolate(barGrow, [0, 1], [0, stat.pct]);

            return (
              <div key={stat.label}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <span style={{ fontSize: 20, color: colors.chineseSilver, fontWeight: 400 }}>
                    {stat.label}
                  </span>
                  <span style={{ fontSize: 20, color: stat.color, fontWeight: 700 }}>
                    {Math.round(barWidth)}%
                  </span>
                </div>
                <div
                  style={{
                    height: 32,
                    borderRadius: 8,
                    backgroundColor: `${stat.color}10`,
                    border: `1px solid ${stat.color}20`,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${barWidth}%`,
                      height: "100%",
                      borderRadius: 8,
                      backgroundColor: stat.color,
                      opacity: 0.7,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Citation */}
        <div
          style={{
            fontSize: 18,
            color: colors.rhythm,
            textAlign: "center",
            opacity: interpolate(
              spring({ frame, fps, delay: 120, config: { damping: 200 } }),
              [0, 1],
              [0, 1]
            ),
            fontStyle: "italic",
          }}
        >
          Studies show tech professionals are burning out
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
