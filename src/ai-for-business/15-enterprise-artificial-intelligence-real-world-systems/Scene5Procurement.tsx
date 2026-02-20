import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

interface ClusterNode {
  x: number;
  y: number;
  cluster: number;
  label?: string;
}

const scatteredNodes: ClusterNode[] = [
  // Cluster 0 - top left
  { x: 280, y: 340, cluster: 0, label: "Pens" },
  { x: 350, y: 380, cluster: 0 },
  { x: 310, y: 420, cluster: 0, label: "Paper" },
  { x: 380, y: 350, cluster: 0 },
  { x: 260, y: 390, cluster: 0 },
  // Cluster 1 - center
  { x: 750, y: 360, cluster: 1, label: "Servers" },
  { x: 820, y: 400, cluster: 1 },
  { x: 780, y: 440, cluster: 1, label: "Cables" },
  { x: 850, y: 370, cluster: 1 },
  { x: 710, y: 410, cluster: 1 },
  { x: 790, y: 350, cluster: 1 },
  // Cluster 2 - right
  { x: 1200, y: 380, cluster: 2, label: "Safety Gear" },
  { x: 1270, y: 420, cluster: 2 },
  { x: 1230, y: 460, cluster: 2, label: "Gloves" },
  { x: 1300, y: 390, cluster: 2 },
  // Cluster 3 - bottom
  { x: 550, y: 600, cluster: 3, label: "Chemicals" },
  { x: 620, y: 640, cluster: 3 },
  { x: 580, y: 670, cluster: 3 },
  { x: 650, y: 610, cluster: 3, label: "Solvents" },
  { x: 510, y: 650, cluster: 3 },
];

const clusterColors = [colors.darkCyra, colors.caribbeanGreen, colors.tiffanyBlue, colors.viridianGreen];
const clusterCenters = [
  { x: 316, y: 380 },
  { x: 783, y: 388 },
  { x: 1250, y: 413 },
  { x: 582, y: 634 },
];

export const Scene5Procurement: React.FC = () => {
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

  // Subtitle
  const subProgress = spring({
    frame,
    fps,
    delay: fps,
    config: { damping: 10, stiffness: 70 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);

  // Clustering animation - nodes move from scattered to clustered
  const clusterPhase = interpolate(frame, [3 * fps, 6 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Cost reduction number
  const costProgress = spring({
    frame,
    fps,
    delay: 8 * fps,
    config: { damping: 10, stiffness: 60 },
  });
  const costOpacity = interpolate(costProgress, [0, 1], [0, 1]);
  const costScale = interpolate(costProgress, [0, 1], [0.8, 1]);

  // Cost value counting down
  const costValue = interpolate(
    frame,
    [8 * fps, 10 * fps],
    [12500000, 8200000],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: colors.white,
        fontFamily,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontSize: 52,
            fontWeight: 700,
            color: colors.darkSlateGray,
          }}
        >
          Procurement{" "}
          <span style={{ color: colors.darkCyra }}>Optimization</span>
        </div>
        <div
          style={{
            opacity: subOpacity,
            fontSize: 30,
            color: colors.rhythm,
            marginTop: 12,
          }}
        >
          Graph + Clustering
        </div>
      </div>

      {/* Network graph overlay */}
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        {/* Cluster boundary circles */}
        {clusterCenters.map((center, ci) => {
          const circleOpacity = interpolate(
            frame,
            [5 * fps, 7 * fps],
            [0, 0.15],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          return (
            <circle
              key={`cluster-bg-${ci}`}
              cx={center.x}
              cy={center.y}
              r={120}
              fill={clusterColors[ci]}
              opacity={circleOpacity}
            />
          );
        })}

        {/* Edges between nodes in same cluster */}
        {scatteredNodes.map((node, i) =>
          scatteredNodes
            .filter((other, j) => j > i && other.cluster === node.cluster)
            .map((other, j) => {
              const edgeOpacity = interpolate(
                frame,
                [4 * fps, 6 * fps],
                [0, 0.25],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              return (
                <line
                  key={`edge-${i}-${j}`}
                  x1={node.x}
                  y1={node.y}
                  x2={other.x}
                  y2={other.y}
                  stroke={clusterColors[node.cluster]}
                  strokeWidth={1.5}
                  opacity={edgeOpacity}
                />
              );
            })
        )}

        {/* Nodes */}
        {scatteredNodes.map((node, i) => {
          const nodeProgress = spring({
            frame,
            fps,
            delay: 1.5 * fps + i * 4,
            config: { damping: 12, stiffness: 80 },
          });
          const nodeOpacity = interpolate(nodeProgress, [0, 1], [0, 1]);

          // Scattered start positions (random-looking offsets)
          const scatterX = node.x + Math.sin(i * 2.5) * 300;
          const scatterY = node.y + Math.cos(i * 3.1) * 200;
          const currentX = interpolate(clusterPhase, [0, 1], [scatterX, node.x]);
          const currentY = interpolate(clusterPhase, [0, 1], [scatterY, node.y]);

          const pulse = interpolate(
            Math.sin(frame * 0.05 + i),
            [-1, 1],
            [0.9, 1.1]
          );

          return (
            <g key={`node-${i}`} opacity={nodeOpacity}>
              <circle
                cx={currentX}
                cy={currentY}
                r={16 * pulse}
                fill={clusterColors[node.cluster]}
                opacity={0.9}
              />
              {node.label && (
                <text
                  x={currentX}
                  y={currentY - 24}
                  textAnchor="middle"
                  fill={colors.gunmetal}
                  fontSize={14}
                  fontWeight={700}
                  fontFamily="Inter, sans-serif"
                  opacity={clusterPhase}
                >
                  {node.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Cost reduction display */}
      <div
        style={{
          position: "absolute",
          bottom: 240,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 60,
          opacity: costOpacity,
          transform: `scale(${costScale})`,
        }}
      >
        <div
          style={{
            background: colors.darkCyra,
            borderRadius: 16,
            padding: "20px 40px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 18, color: `${colors.white}99` }}>Annual Spend</div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 700,
              color: colors.white,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            ${Math.floor(costValue).toLocaleString()}
          </div>
        </div>
        <div
          style={{
            background: colors.caribbeanGreen,
            borderRadius: 16,
            padding: "20px 40px",
            textAlign: "center",
            boxShadow: `0 8px 32px ${colors.caribbeanGreen}40`,
          }}
        >
          <div style={{ fontSize: 18, color: `${colors.white}99` }}>Savings</div>
          <div style={{ fontSize: 40, fontWeight: 700, color: colors.white }}>
            Millions
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
