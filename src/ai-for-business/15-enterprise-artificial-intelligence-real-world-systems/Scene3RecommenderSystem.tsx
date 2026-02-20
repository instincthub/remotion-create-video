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
  x: number;
  y: number;
  label: string;
  type: "user" | "transaction";
}

const nodes: GraphNode[] = [
  // Users (left cluster)
  { x: 250, y: 380, label: "User A", type: "user" },
  { x: 250, y: 540, label: "User B", type: "user" },
  { x: 250, y: 700, label: "User C", type: "user" },
  // Transactions (middle)
  { x: 700, y: 320, label: "Supplies", type: "transaction" },
  { x: 700, y: 460, label: "Software", type: "transaction" },
  { x: 700, y: 600, label: "Catering", type: "transaction" },
  { x: 700, y: 740, label: "Travel", type: "transaction" },
  // Predicted categories (right)
  { x: 1150, y: 380, label: "OpEx", type: "transaction" },
  { x: 1150, y: 540, label: "Tech", type: "transaction" },
  { x: 1150, y: 700, label: "Travel", type: "transaction" },
];

const edges: [number, number][] = [
  [0, 3], [0, 4], [1, 4], [1, 5], [1, 6], [2, 3], [2, 6],
  [3, 7], [4, 8], [5, 7], [6, 9],
];

export const Scene3RecommenderSystem: React.FC = () => {
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

  // Probability score
  const scoreProgress = spring({
    frame,
    fps,
    delay: 5.5 * fps,
    config: { damping: 10, stiffness: 60 },
  });
  const scoreOpacity = interpolate(scoreProgress, [0, 1], [0, 1]);
  const scoreScale = interpolate(scoreProgress, [0, 1], [0.7, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.white} 0%, ${colors.magnolia} 100%)`,
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
          <span style={{ color: colors.darkCyra }}>Recommender</span> System
        </div>
        <div
          style={{
            opacity: subOpacity,
            fontSize: 30,
            color: colors.rhythm,
            marginTop: 12,
          }}
        >
          Predict. Assign. Reduce Errors.
        </div>
      </div>

      {/* Network graph */}
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        {/* Labels for columns */}
        {[
          { x: 250, label: "Users" },
          { x: 700, label: "Transactions" },
          { x: 1150, label: "Categories" },
        ].map((col, ci) => {
          const labelProgress = spring({
            frame,
            fps,
            delay: 0.8 * fps + ci * 10,
            config: { damping: 12, stiffness: 80 },
          });
          const labelOpacity = interpolate(labelProgress, [0, 1], [0, 0.5]);
          return (
            <text
              key={`col-${ci}`}
              x={col.x}
              y={270}
              textAnchor="middle"
              fill={colors.rhythm}
              fontSize={24}
              fontWeight={700}
              fontFamily="Inter, sans-serif"
              opacity={labelOpacity}
            >
              {col.label}
            </text>
          );
        })}

        {/* Edges */}
        {edges.map(([from, to], i) => {
          const edgeProgress = spring({
            frame,
            fps,
            delay: 2 * fps + i * 5,
            config: { damping: 14, stiffness: 60 },
          });
          const edgeOpacity = interpolate(edgeProgress, [0, 1], [0, 0.5]);
          const pulse = interpolate(
            Math.sin(frame * 0.04 + i * 1.5),
            [-1, 1],
            [0.3, 0.7]
          );

          return (
            <line
              key={`edge-${i}`}
              x1={nodes[from].x}
              y1={nodes[from].y}
              x2={nodes[to].x}
              y2={nodes[to].y}
              stroke={colors.caribbeanGreen}
              strokeWidth={2}
              opacity={edgeOpacity * pulse}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const nodeProgress = spring({
            frame,
            fps,
            delay: 1.5 * fps + i * 6,
            config: { damping: 12, stiffness: 80 },
          });
          const nodeOpacity = interpolate(nodeProgress, [0, 1], [0, 1]);
          const nodeScale = interpolate(nodeProgress, [0, 1], [0, 1]);
          const isUser = node.type === "user";
          const nodeColor = isUser ? colors.darkCyra : colors.viridianGreen;
          const radius = isUser ? 42 : 36;

          return (
            <g key={`node-${i}`} opacity={nodeOpacity}>
              <circle
                cx={node.x}
                cy={node.y}
                r={radius * nodeScale}
                fill={nodeColor}
                opacity={0.9}
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={(radius + 8) * nodeScale}
                fill="none"
                stroke={nodeColor}
                strokeWidth={1.5}
                opacity={0.3}
              />
              <text
                x={node.x}
                y={node.y + 6}
                textAnchor="middle"
                fill={colors.white}
                fontSize={18}
                fontWeight={700}
                fontFamily="Inter, sans-serif"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Probability score badge */}
      <div
        style={{
          position: "absolute",
          right: 180,
          top: 380,
          opacity: scoreOpacity,
          transform: `scale(${scoreScale})`,
          background: colors.caribbeanGreen,
          borderRadius: 16,
          padding: "20px 36px",
          boxShadow: `0 8px 32px ${colors.caribbeanGreen}40`,
        }}
      >
        <div style={{ fontSize: 18, color: colors.white, opacity: 0.9 }}>
          Confidence
        </div>
        <div style={{ fontSize: 48, fontWeight: 700, color: colors.white }}>
          94.7%
        </div>
      </div>
    </AbsoluteFill>
  );
};
