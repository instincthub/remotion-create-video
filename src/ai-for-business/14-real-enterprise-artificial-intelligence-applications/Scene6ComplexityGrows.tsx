import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

interface GraphNode {
  id: number;
  label: string;
  x: number;
  y: number;
  color: string;
  delay: number;
}

interface GraphEdge {
  from: number;
  to: number;
  delay: number;
}

const nodes: GraphNode[] = [
  { id: 0, label: "Prediction", x: 480, y: 300, color: colors.darkCyra, delay: 2 },
  { id: 1, label: "Classification", x: 960, y: 200, color: colors.viridianGreen, delay: 3.5 },
  { id: 2, label: "Optimization", x: 1440, y: 300, color: colors.tiffanyBlue, delay: 5 },
  { id: 3, label: "Recommendation", x: 720, y: 550, color: colors.chineseBlue, delay: 6.5 },
  { id: 4, label: "Business Rules", x: 1200, y: 550, color: colors.policeBlue, delay: 8 },
  { id: 5, label: "Human Review", x: 960, y: 750, color: colors.deepGreenCyanTurquoise, delay: 9.5 },
];

const edges: GraphEdge[] = [
  { from: 0, to: 1, delay: 4 },
  { from: 1, to: 2, delay: 5.5 },
  { from: 0, to: 3, delay: 7 },
  { from: 1, to: 4, delay: 8.5 },
  { from: 2, to: 4, delay: 9 },
  { from: 3, to: 5, delay: 10 },
  { from: 4, to: 5, delay: 10.5 },
  { from: 3, to: 4, delay: 11 },
];

export const Scene6ComplexityGrows: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 12, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [-20, 0]);

  // Node animations
  const nodeProgresses = nodes.map((node) =>
    spring({
      frame,
      fps,
      delay: node.delay * fps,
      config: { damping: 10, stiffness: 80 },
    })
  );

  // Edge animations
  const edgeProgresses = edges.map((edge) =>
    interpolate(
      frame,
      [edge.delay * fps, edge.delay * fps + 0.8 * fps],
      [0, 1],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    )
  );

  // Data flow pulses along edges
  const flowPulses = edges.map((edge, i) => {
    const edgeActive = frame > edge.delay * fps + fps;
    if (!edgeActive) return 0;
    return interpolate(
      ((frame - edge.delay * fps) * 0.03 + i * 0.5) % 1,
      [0, 1],
      [0, 1]
    );
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.darkNavy} 0%, #0e1828 100%)`,
        fontFamily,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 5,
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontSize: 52,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
          }}
        >
          More Components.{" "}
          <span style={{ color: colors.tiffanyBlue }}>More Connections.</span>
        </div>
      </div>

      {/* Network graph */}
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", top: 0, left: 0, zIndex: 2 }}
      >
        {/* Edges */}
        {edges.map((edge, i) => {
          const fromNode = nodes[edge.from];
          const toNode = nodes[edge.to];
          const progress = edgeProgresses[i];
          const pulse = flowPulses[i];

          // Calculate intermediate point for drawing progress
          const dx = toNode.x - fromNode.x;
          const dy = toNode.y - fromNode.y;
          const endX = fromNode.x + dx * progress;
          const endY = fromNode.y + dy * progress;

          // Pulse dot position
          const pulseX = fromNode.x + dx * pulse;
          const pulseY = fromNode.y + dy * pulse;

          return (
            <g key={`edge-${i}`}>
              <line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={endX}
                y2={endY}
                stroke={colors.tiffanyBlue}
                strokeWidth={2}
                opacity={0.4}
              />
              {/* Flow pulse */}
              {progress >= 1 && frame > edge.delay * fps + fps && (
                <circle
                  cx={pulseX}
                  cy={pulseY}
                  r={5}
                  fill={colors.tiffanyBlue}
                  opacity={0.8}
                />
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const progress = nodeProgresses[i];
          const opacity = interpolate(progress, [0, 1], [0, 1]);
          const scale = interpolate(progress, [0, 1], [0.5, 1]);
          const pulse = interpolate(
            Math.sin(frame * 0.04 + i * 1.2),
            [-1, 1],
            [0.9, 1.05]
          );

          return (
            <g
              key={`node-${i}`}
              opacity={opacity}
              transform={`translate(${node.x}, ${node.y}) scale(${scale * pulse}) translate(${-node.x}, ${-node.y})`}
            >
              {/* Glow */}
              <circle
                cx={node.x}
                cy={node.y}
                r={62}
                fill={`${node.color}15`}
              />
              {/* Main circle */}
              <circle
                cx={node.x}
                cy={node.y}
                r={50}
                fill={node.color}
                stroke={`${colors.white}30`}
                strokeWidth={2}
              />
              {/* Label below node */}
              <text
                x={node.x}
                y={node.y + 72}
                textAnchor="middle"
                fontSize={24}
                fontWeight="bold"
                fill={colors.white}
                fontFamily="Inter, sans-serif"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

    </AbsoluteFill>
  );
};
