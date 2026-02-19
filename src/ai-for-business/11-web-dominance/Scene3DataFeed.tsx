import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Particles that cluster into graph nodes
const ClusteringParticles: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, fps], [0, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Cluster centers (form a graph shape)
  const clusters = [
    { cx: 960, cy: 400, r: 40 },
    { cx: 700, cy: 300, r: 30 },
    { cx: 1220, cy: 300, r: 30 },
    { cx: 600, cy: 500, r: 25 },
    { cx: 1320, cy: 500, r: 25 },
    { cx: 800, cy: 600, r: 28 },
    { cx: 1120, cy: 600, r: 28 },
  ];

  const clusterConnections = [
    [0, 1], [0, 2], [0, 5], [0, 6],
    [1, 3], [2, 4], [3, 5], [4, 6], [5, 6],
  ];

  const clusterProgress = interpolate(frame, [2 * fps, 12 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scattered particles that converge to cluster centers
  const particles = Array.from({ length: 80 }, (_, i) => {
    const clusterIdx = i % clusters.length;
    const cluster = clusters[clusterIdx];
    const angle = (i / 80) * Math.PI * 2 + i * 0.7;
    const startRadius = 400 + (i % 6) * 80;
    return {
      startX: 960 + Math.cos(angle) * startRadius,
      startY: 540 + Math.sin(angle) * startRadius,
      endX: cluster.cx + Math.cos(i * 1.2) * cluster.r * 0.6,
      endY: cluster.cy + Math.sin(i * 1.2) * cluster.r * 0.6,
      size: 2 + (i % 3),
      clusterIdx,
    };
  });

  return (
    <AbsoluteFill style={{ opacity }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        {/* Connection lines appear after clustering */}
        {clusterConnections.map(([a, b], i) => {
          const lineOpacity = interpolate(
            clusterProgress,
            [0.5 + i * 0.04, 0.7 + i * 0.04],
            [0, 0.4],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          return (
            <line
              key={`cl-${i}`}
              x1={clusters[a].cx}
              y1={clusters[a].cy}
              x2={clusters[b].cx}
              y2={clusters[b].cy}
              stroke={colors.tiffanyBlue}
              strokeWidth={1.5}
              opacity={lineOpacity}
            />
          );
        })}

        {/* Cluster glows */}
        {clusters.map((c, i) => {
          const glowOpacity = interpolate(
            clusterProgress,
            [0.4, 0.8],
            [0, 0.15],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          return (
            <circle
              key={`glow-${i}`}
              cx={c.cx}
              cy={c.cy}
              r={c.r}
              fill={colors.tiffanyBlue}
              opacity={glowOpacity}
            />
          );
        })}

        {/* Particles moving toward clusters */}
        {particles.map((p, i) => {
          const x = interpolate(clusterProgress, [0, 1], [p.startX, p.endX]);
          const y = interpolate(clusterProgress, [0, 1], [p.startY, p.endY]);
          const pulse = Math.sin(frame * 0.05 + i) * 0.3 + 0.7;
          return (
            <circle
              key={`p-${i}`}
              cx={x}
              cy={y}
              r={p.size * (1 - clusterProgress * 0.3)}
              fill={
                i % 3 === 0
                  ? colors.darkCyra
                  : i % 3 === 1
                    ? colors.tiffanyBlue
                    : colors.caribbeanGreen
              }
              opacity={pulse}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

export const Scene3DataFeed: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Heading
  const headProgress = spring({
    frame,
    fps,
    delay: 15,
    config: { damping: 12, stiffness: 100 },
  });
  const headOpacity = interpolate(headProgress, [0, 1], [0, 1]);
  const headScale = interpolate(headProgress, [0, 1], [0.8, 1]);

  // Stats that appear
  const stats = [
    { label: "Searches/day", value: "8.5 billion", delay: 6 * fps },
    { label: "Social posts/min", value: "510,000", delay: 9 * fps },
    { label: "Purchases/sec", value: "4,000+", delay: 12 * fps },
  ];

  // Bottom text
  const subProgress = spring({
    frame,
    fps,
    delay: 20 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);
  const subY = interpolate(subProgress, [0, 1], [20, 0]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.darkSlateGray} 0%, ${colors.gunmetal} 100%)`,
        fontFamily,
      }}
    >
      <ClusteringParticles />

      {/* Heading */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: 80,
          zIndex: 2,
        }}
      >
        <div
          style={{
            opacity: headOpacity,
            transform: `scale(${headScale})`,
            fontSize: 58,
            fontWeight: "bold",
            color: colors.white,
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          AI{" "}
          <span style={{ color: colors.tiffanyBlue }}>feeds</span> on data
        </div>
      </AbsoluteFill>

      {/* Stats row */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 80,
          paddingBottom: 360,
          zIndex: 2,
        }}
      >
        {stats.map((stat, i) => {
          const statProgress = spring({
            frame,
            fps,
            delay: stat.delay,
            config: { damping: 10, stiffness: 80 },
          });
          const statOpacity = interpolate(statProgress, [0, 1], [0, 1]);
          const statY = interpolate(statProgress, [0, 1], [30, 0]);

          return (
            <div
              key={stat.label}
              style={{
                opacity: statOpacity,
                transform: `translateY(${statY}px)`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  fontSize: 42,
                  fontWeight: "bold",
                  color: colors.caribbeanGreen,
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: 20, color: colors.chineseSilver }}>
                {stat.label}
              </div>
            </div>
          );
        })}
      </AbsoluteFill>

      {/* Bottom text */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: 240,
          zIndex: 2,
        }}
      >
        <div
          style={{
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
            fontSize: 30,
            color: colors.chineseSilver,
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          The more data you have, the{" "}
          <span style={{ color: colors.tiffanyBlue }}>better it performs</span>.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
