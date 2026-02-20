import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const metrics = [
  { label: "Claims Dropped", value: 6, suffix: "%", sublabel: "in healthiest pool", color: colors.caribbeanGreen, barHeight: 0.4 },
  { label: "Faster Issuance", value: 25, suffix: "%", sublabel: "policy processing time", color: colors.tiffanyBlue, barHeight: 0.7 },
  { label: "More Acceptance", value: 30, suffix: "%", sublabel: "customer acceptance rate", color: colors.darkCyra, barHeight: 0.85 },
];

export const Scene4Results: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 8,
    config: { damping: 12, stiffness: 80 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  // Bottom message
  const bottomProgress = spring({
    frame,
    fps,
    delay: 6 * fps,
    config: { damping: 10, stiffness: 60 },
  });
  const bottomOpacity = interpolate(bottomProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.white} 0%, ${colors.magnolia} 100%)`,
        fontFamily,
      }}
    >
      {/* Subtle dashboard grid */}
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", top: 0, left: 0, opacity: 0.03 }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <line key={`g-${i}`} x1={0} y1={i * 60} x2={1920} y2={i * 60} stroke={colors.darkCyra} strokeWidth={1} />
        ))}
      </svg>

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div style={{ fontSize: 50, fontWeight: 700, color: colors.darkSlateGray }}>
          The <span style={{ color: colors.caribbeanGreen }}>Results</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div
        style={{
          position: "absolute",
          top: 240,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 48,
        }}
      >
        {metrics.map((metric, i) => {
          const cardDelay = 1.5 * fps + i * 18;
          const cardProgress = spring({
            frame,
            fps,
            delay: cardDelay,
            config: { damping: 12, stiffness: 70 },
          });
          const cardOpacity = interpolate(cardProgress, [0, 1], [0, 1]);
          const cardY = interpolate(cardProgress, [0, 1], [40, 0]);

          // Counter animation
          const countValue = interpolate(
            frame,
            [cardDelay / fps * fps, cardDelay / fps * fps + 2 * fps],
            [0, metric.value],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          // Bar grow
          const barProgress = spring({
            frame,
            fps,
            delay: cardDelay + fps,
            config: { damping: 14, stiffness: 60 },
          });

          return (
            <div
              key={`card-${i}`}
              style={{
                opacity: cardOpacity,
                transform: `translateY(${cardY}px)`,
                width: 420,
                background: colors.white,
                borderRadius: 20,
                padding: "40px 36px",
                boxShadow: `0 8px 40px ${colors.gunmetal}10`,
                border: `2px solid ${metric.color}20`,
              }}
            >
              {/* Value */}
              <div
                style={{
                  fontSize: 72,
                  fontWeight: 700,
                  color: metric.color,
                  fontVariantNumeric: "tabular-nums",
                  lineHeight: 1,
                }}
              >
                {Math.floor(countValue)}{metric.suffix}
              </div>

              {/* Label */}
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  color: colors.gunmetal,
                  marginTop: 12,
                }}
              >
                {metric.label}
              </div>

              {/* Sublabel */}
              <div
                style={{
                  fontSize: 18,
                  color: colors.rhythm,
                  marginTop: 6,
                }}
              >
                {metric.sublabel}
              </div>

              {/* Progress bar */}
              <div
                style={{
                  marginTop: 24,
                  height: 8,
                  background: `${metric.color}15`,
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${metric.barHeight * 100 * barProgress}%`,
                    height: "100%",
                    background: metric.color,
                    borderRadius: 4,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom message */}
      <div
        style={{
          position: "absolute",
          bottom: 240,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: bottomOpacity,
        }}
      >
        <div style={{ fontSize: 32, fontWeight: 700, color: colors.darkSlateGray }}>
          That is not hype. That is{" "}
          <span style={{ color: colors.darkCyra }}>architecture.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
