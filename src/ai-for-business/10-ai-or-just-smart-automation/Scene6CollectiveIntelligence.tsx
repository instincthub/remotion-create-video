import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Expanding neural network with connecting nodes
const ExpandingNetwork: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const networkOpacity = interpolate(frame, [fps, 2 * fps], [0, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Central cluster
  const centerX = 960;
  const centerY = 540;

  // Nodes expand outward from center
  const expansionProgress = interpolate(frame, [fps, 12 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const nodes = Array.from({ length: 30 }, (_, i) => {
    const angle = (i / 30) * Math.PI * 2 + (i % 3) * 0.3;
    const ring = Math.floor(i / 10);
    const baseRadius = 80 + ring * 160;
    const radius = baseRadius * expansionProgress;
    return {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
      ring,
    };
  });

  // Connections between adjacent nodes
  const connections: [number, number][] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 250 * expansionProgress + 50) {
        connections.push([i, j]);
      }
    }
  }

  return (
    <AbsoluteFill style={{ opacity: networkOpacity }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        {/* Connections */}
        {connections.map(([a, b], i) => {
          const pulse =
            Math.sin((frame * 0.03 + i * 0.2) * 2) * 0.3 + 0.5;
          return (
            <line
              key={`conn-${i}`}
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
              stroke={colors.darkCyra}
              strokeWidth={0.8}
              opacity={pulse}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const pulse =
            Math.sin((frame * 0.05 + i * 0.4) * 2) * 0.3 + 0.7;
          const nodeSize = node.ring === 0 ? 6 : node.ring === 1 ? 4 : 3;
          return (
            <circle
              key={`node-${i}`}
              cx={node.x}
              cy={node.y}
              r={nodeSize}
              fill={
                node.ring === 0
                  ? colors.darkCyra
                  : node.ring === 1
                    ? colors.tiffanyBlue
                    : colors.viridianGreen
              }
              opacity={pulse}
            />
          );
        })}

        {/* Central glow */}
        <circle
          cx={centerX}
          cy={centerY}
          r={30 + Math.sin(frame * 0.04) * 5}
          fill={colors.darkCyra}
          opacity={0.1}
        />
      </svg>
    </AbsoluteFill>
  );
};

export const Scene6CollectiveIntelligence: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // First line
  const line1Progress = spring({
    frame,
    fps,
    delay: fps,
    config: { damping: 10, stiffness: 80 },
  });
  const line1Opacity = interpolate(line1Progress, [0, 1], [0, 1]);
  const line1Scale = interpolate(line1Progress, [0, 1], [0.9, 1]);

  // Second line
  const line2Progress = spring({
    frame,
    fps,
    delay: 8 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const line2Opacity = interpolate(line2Progress, [0, 1], [0, 1]);
  const line2Scale = interpolate(line2Progress, [0, 1], [0.9, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.white,
        fontFamily,
      }}
    >
      <ExpandingNetwork />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
          zIndex: 2,
          paddingBottom: 200,
        }}
      >
        <div
          style={{
            opacity: line1Opacity,
            transform: `scale(${line1Scale})`,
            fontSize: 58,
            fontWeight: "bold",
            color: colors.darkSlateGray,
            textAlign: "center",
            lineHeight: 1.3,
            maxWidth: 1200,
          }}
        >
          <span style={{ color: colors.darkCyra }}>Collectively</span>{" "}
          intelligent?
        </div>

        <div
          style={{
            opacity: line2Opacity,
            transform: `scale(${line2Scale})`,
            fontSize: 42,
            color: colors.rhythm,
            textAlign: "center",
            lineHeight: 1.4,
            maxWidth: 1000,
          }}
        >
          Or just{" "}
          <span style={{ color: colors.tiffanyBlue }}>complexity</span> at
          scale?
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
