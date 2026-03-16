import { useCurrentFrame, interpolate } from "remotion";
import { colors } from "./colors";

export const ParticleGrid: React.FC<{ opacity?: number }> = ({
  opacity = 1,
}) => {
  const frame = useCurrentFrame();

  const gridOpacity = interpolate(frame, [0, 40], [0, 0.12], {
    extrapolateRight: "clamp",
  });

  const nodes: Array<{ x: number; y: number }> = [];
  for (let x = 160; x <= 1760; x += 200) {
    for (let y = 120; y <= 860; y += 180) {
      nodes.push({ x, y });
    }
  }

  return (
    <div style={{ position: "absolute", inset: 0, opacity: gridOpacity * opacity }}>
      <svg width="1920" height="1080">
        {/* Grid lines */}
        {Array.from({ length: 17 }, (_, i) => i * 120).map((x, i) => (
          <line
            key={`v-${i}`}
            x1={x} y1={0} x2={x} y2={1080}
            stroke={colors.darkCyra}
            strokeWidth={0.5}
            opacity={0.4}
          />
        ))}
        {Array.from({ length: 10 }, (_, i) => i * 120).map((y, i) => (
          <line
            key={`h-${i}`}
            x1={0} y1={y} x2={1920} y2={y}
            stroke={colors.darkCyra}
            strokeWidth={0.5}
            opacity={0.4}
          />
        ))}
        {/* Pulsing nodes */}
        {nodes.map((node, i) => {
          const pulse = Math.sin(frame * 0.04 + i * 0.8) * 0.4 + 0.6;
          return (
            <circle
              key={`n-${i}`}
              cx={node.x} cy={node.y} r={3}
              fill={colors.tiffanyBlue}
              opacity={pulse * 0.6}
            />
          );
        })}
        {/* Connection lines */}
        {nodes.map((node, i) => {
          const next = nodes[i + 1];
          if (!next || Math.abs(node.y - next.y) > 0) return null;
          const pulse = Math.sin(frame * 0.03 + i * 0.4) * 0.3 + 0.4;
          return (
            <line
              key={`c-${i}`}
              x1={node.x} y1={node.y} x2={next.x} y2={next.y}
              stroke={colors.tiffanyBlue}
              strokeWidth={0.5}
              opacity={pulse}
            />
          );
        })}
      </svg>
    </div>
  );
};
