import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Enterprise network map
const NetworkMap: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();

  const nodes = [
    { x: 300, y: 300 },
    { x: 600, y: 200 },
    { x: 960, y: 350 },
    { x: 1320, y: 200 },
    { x: 1620, y: 300 },
    { x: 400, y: 550 },
    { x: 750, y: 600 },
    { x: 1170, y: 600 },
    { x: 1520, y: 550 },
    { x: 960, y: 750 },
    { x: 500, y: 400 },
    { x: 1400, y: 400 },
  ];

  const connections = [
    [0, 1], [1, 2], [2, 3], [3, 4],
    [0, 5], [5, 6], [6, 7], [7, 8], [8, 4],
    [6, 9], [7, 9],
    [1, 10], [10, 5], [10, 6],
    [3, 11], [11, 8], [11, 7],
    [2, 10], [2, 11],
  ];

  return (
    <AbsoluteFill style={{ opacity }}>
      <svg width="1920" height="1080">
        {/* Connection lines */}
        {connections.map(([from, to], i) => {
          const pulse =
            Math.sin(frame * 0.03 + i * 0.4) * 0.3 + 0.5;
          return (
            <line
              key={`conn-${i}`}
              x1={nodes[from].x}
              y1={nodes[from].y}
              x2={nodes[to].x}
              y2={nodes[to].y}
              stroke={colors.tiffanyBlue}
              strokeWidth={1.5}
              opacity={pulse}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const pulse =
            Math.sin(frame * 0.05 + i * 0.8) * 0.3 + 0.7;
          const glowRadius =
            8 + Math.sin(frame * 0.04 + i * 0.6) * 3;
          return (
            <g key={`node-${i}`}>
              {/* Glow */}
              <circle
                cx={node.x}
                cy={node.y}
                r={glowRadius + 6}
                fill={`${colors.caribbeanGreen}10`}
                opacity={pulse * 0.5}
              />
              {/* Node */}
              <circle
                cx={node.x}
                cy={node.y}
                r={glowRadius}
                fill={`${colors.caribbeanGreen}30`}
                stroke={colors.caribbeanGreen}
                strokeWidth={1.5}
                opacity={pulse}
              />
            </g>
          );
        })}

        {/* Traveling data packet */}
        {connections.slice(0, 6).map(([from, to], i) => {
          const t = ((frame * 0.02 + i * 0.15) % 1);
          const px =
            nodes[from].x + (nodes[to].x - nodes[from].x) * t;
          const py =
            nodes[from].y + (nodes[to].y - nodes[from].y) * t;
          return (
            <circle
              key={`packet-${i}`}
              cx={px}
              cy={py}
              r={4}
              fill={colors.tiffanyBlue}
              opacity={0.8}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

export const Scene9Systems: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Network background
  const networkProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 0.3),
    config: { damping: 14, stiffness: 80 },
  });
  const networkOpacity = interpolate(
    networkProgress,
    [0, 1],
    [0, 0.4],
  );

  // Line 1: "Not Just Experiments."
  const line1Progress = spring({
    frame,
    fps,
    delay: Math.round(fps * 1),
    config: { damping: 12, stiffness: 80 },
  });
  const line1Opacity = interpolate(line1Progress, [0, 1], [0, 1]);
  const line1Y = interpolate(line1Progress, [0, 1], [40, 0]);

  // Line 2: "Systems."
  const line2Progress = spring({
    frame,
    fps,
    delay: Math.round(fps * 4),
    config: { damping: 10, stiffness: 70 },
  });
  const line2Opacity = interpolate(line2Progress, [0, 1], [0, 1]);
  const line2Scale = interpolate(line2Progress, [0, 1], [0.8, 1]);

  return (
    <AbsoluteFill
      style={{
        background: colors.darkCyra,
        fontFamily,
      }}
    >
      <NetworkMap opacity={networkOpacity} />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 200,
          zIndex: 10,
        }}
      >
        <div
          style={{
            opacity: line1Opacity,
            transform: `translateY(${line1Y}px)`,
            fontSize: 58,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          Not Just Experiments.
        </div>

        <div
          style={{
            opacity: line2Opacity,
            transform: `scale(${line2Scale})`,
            fontSize: 72,
            fontWeight: 700,
            color: colors.caribbeanGreen,
            textAlign: "center",
            lineHeight: 1.4,
            marginTop: 24,
          }}
        >
          Systems.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
