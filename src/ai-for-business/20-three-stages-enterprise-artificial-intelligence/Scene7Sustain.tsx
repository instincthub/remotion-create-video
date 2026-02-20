import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Centered drift chart
const DriftChart: React.FC<{ progress: number }> = ({ progress }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  const chartWidth = 1100;
  const chartHeight = 320;
  const xOffset = (1920 - chartWidth) / 2;
  const yOffset = 320;

  // Baseline (expected)
  const baselinePoints: string[] = [];
  for (let i = 0; i <= 50; i++) {
    const x = xOffset + (i / 50) * chartWidth;
    const y =
      yOffset +
      chartHeight / 2 +
      Math.sin(i * 0.25) * 18;
    baselinePoints.push(`${x},${y}`);
  }

  // Drifting line (actual) — deviates more over time
  const driftPoints: string[] = [];
  const driftProgress = interpolate(
    frame,
    [0, 20 * 30],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  for (let i = 0; i <= 50; i++) {
    const x = xOffset + (i / 50) * chartWidth;
    const drift = (i / 50) * driftProgress * 90;
    const noise = Math.sin(i * 0.5 + frame * 0.03) * (12 + drift * 0.3);
    const y =
      yOffset +
      chartHeight / 2 +
      Math.sin(i * 0.25) * 18 -
      drift +
      noise;
    driftPoints.push(`${x},${y}`);
  }

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity,
      }}
    >
      <svg width="1920" height="1080">
        {/* Chart background */}
        <rect
          x={xOffset}
          y={yOffset}
          width={chartWidth}
          height={chartHeight}
          fill={`${colors.magnolia}`}
          stroke={`${colors.chineseSilver}50`}
          strokeWidth={1}
          rx={10}
        />

        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map((pct, i) => (
          <line
            key={`grid-${i}`}
            x1={xOffset + 10}
            y1={yOffset + chartHeight * pct}
            x2={xOffset + chartWidth - 10}
            y2={yOffset + chartHeight * pct}
            stroke={`${colors.chineseSilver}30`}
            strokeWidth={1}
            strokeDasharray="6 4"
          />
        ))}

        {/* Baseline */}
        <polyline
          points={baselinePoints.join(" ")}
          fill="none"
          stroke={colors.caribbeanGreen}
          strokeWidth={3.5}
          opacity={0.7}
        />

        {/* Drift line */}
        <polyline
          points={driftPoints.join(" ")}
          fill="none"
          stroke={colors.oldRose}
          strokeWidth={3.5}
        />

        {/* Legend */}
        <rect
          x={xOffset + chartWidth - 240}
          y={yOffset + 16}
          width={220}
          height={70}
          rx={8}
          fill={`${colors.white}cc`}
          stroke={`${colors.chineseSilver}30`}
          strokeWidth={1}
        />
        {/* Expected legend */}
        <line
          x1={xOffset + chartWidth - 220}
          y1={yOffset + 40}
          x2={xOffset + chartWidth - 180}
          y2={yOffset + 40}
          stroke={colors.caribbeanGreen}
          strokeWidth={3}
        />
        <text
          x={xOffset + chartWidth - 170}
          y={yOffset + 46}
          fill={colors.caribbeanGreen}
          fontSize={20}
          fontWeight={700}
          fontFamily={fontFamily}
        >
          Expected
        </text>
        {/* Actual legend */}
        <line
          x1={xOffset + chartWidth - 220}
          y1={yOffset + 68}
          x2={xOffset + chartWidth - 180}
          y2={yOffset + 68}
          stroke={colors.oldRose}
          strokeWidth={3}
        />
        <text
          x={xOffset + chartWidth - 170}
          y={yOffset + 74}
          fill={colors.oldRose}
          fontSize={20}
          fontWeight={700}
          fontFamily={fontFamily}
        >
          Actual
        </text>

        {/* Axis labels */}
        <text
          x={xOffset + chartWidth / 2}
          y={yOffset + chartHeight + 40}
          textAnchor="middle"
          fill={colors.rhythm}
          fontSize={20}
          fontWeight={700}
          fontFamily={fontFamily}
        >
          Time
        </text>
      </svg>
    </div>
  );
};

export const Scene7Sustain: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Stage badge
  const badgeProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 0.3),
    config: { damping: 12, stiffness: 100 },
  });
  const badgeOpacity = interpolate(badgeProgress, [0, 1], [0, 1]);
  const badgeScale = interpolate(badgeProgress, [0, 1], [0.8, 1]);

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 1),
    config: { damping: 12, stiffness: 80 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  // Subtitle
  const subProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 3),
    config: { damping: 12, stiffness: 80 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);

  // Chart
  const chartProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 5),
    config: { damping: 14, stiffness: 80 },
  });

  // Drift label
  const driftProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 16),
    config: { damping: 10, stiffness: 70 },
  });
  const driftOpacity = interpolate(driftProgress, [0, 1], [0, 1]);
  const driftScale = interpolate(driftProgress, [0, 1], [0.85, 1]);

  return (
    <AbsoluteFill
      style={{
        background: colors.white,
        fontFamily,
      }}
    >
      {/* Stage badge */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: "50%",
          transform: `translateX(-50%) scale(${badgeScale})`,
          opacity: badgeOpacity,
          background: colors.deepGreenCyanTurquoise,
          color: colors.white,
          padding: "10px 32px",
          borderRadius: 30,
          fontSize: 22,
          fontWeight: 700,
        }}
      >
        STAGE 3
      </div>

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 120,
          width: "100%",
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <span
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: colors.darkSlateGray,
          }}
        >
          Sustain
        </span>
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: "absolute",
          top: 210,
          width: "100%",
          textAlign: "center",
          opacity: subOpacity,
        }}
      >
        <span
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: colors.darkCyra,
          }}
        >
          Monitor for drift.
        </span>
      </div>

      {/* Drift chart — centered */}
      <DriftChart progress={chartProgress} />

      {/* Drift label */}
      <div
        style={{
          position: "absolute",
          bottom: 240,
          width: "100%",
          textAlign: "center",
          opacity: driftOpacity,
          transform: `scale(${driftScale})`,
        }}
      >
        <span
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: colors.oldRose,
          }}
        >
          That is data drift.
        </span>
      </div>
    </AbsoluteFill>
  );
};
