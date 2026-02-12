import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Neural network brain lines
const NeuralNetwork: React.FC = () => {
  const frame = useCurrentFrame();

  // Nodes in a brain-like shape
  const nodes = [
    { x: 760, y: 300 }, { x: 860, y: 220 }, { x: 960, y: 180 },
    { x: 1060, y: 200 }, { x: 1160, y: 280 },
    { x: 800, y: 420 }, { x: 900, y: 380 }, { x: 1000, y: 350 },
    { x: 1100, y: 370 }, { x: 1150, y: 440 },
    { x: 840, y: 530 }, { x: 940, y: 500 }, { x: 1040, y: 490 },
    { x: 1120, y: 540 }, { x: 960, y: 600 },
  ];

  // Connections between nearby nodes
  const connections: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4],
    [0, 5], [1, 6], [2, 7], [3, 8], [4, 9],
    [5, 6], [6, 7], [7, 8], [8, 9],
    [5, 10], [6, 11], [7, 12], [8, 13],
    [10, 11], [11, 12], [12, 13], [12, 14], [11, 14],
  ];

  // Slow zoom
  const zoom = interpolate(frame, [0, 450], [0.85, 1.1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade in network
  const networkOpacity = interpolate(frame, [0, 60], [0, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        opacity: networkOpacity,
        transform: `scale(${zoom})`,
        transformOrigin: "center center",
      }}
    >
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        {/* Connections */}
        {connections.map(([a, b], i) => {
          const pulse = Math.sin((frame * 0.05 + i * 0.5) * 2) * 0.3 + 0.5;
          return (
            <line
              key={`c-${i}`}
              x1={nodes[a].x} y1={nodes[a].y}
              x2={nodes[b].x} y2={nodes[b].y}
              stroke={colors.darkCyra}
              strokeWidth={1.5}
              opacity={pulse}
            />
          );
        })}
        {/* Nodes */}
        {nodes.map((node, i) => {
          const pulse = Math.sin((frame * 0.06 + i * 0.8) * 2) * 0.3 + 0.7;
          return (
            <circle
              key={`n-${i}`}
              cx={node.x} cy={node.y} r={5}
              fill={colors.darkCyra}
              opacity={pulse}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Line 1: "The most powerful technology on Earth…"
  const line1Progress = spring({
    frame,
    fps,
    delay: 30,
    config: { damping: 200 },
  });
  const line1Opacity = interpolate(line1Progress, [0, 1], [0, 1]);
  const line1Y = interpolate(line1Progress, [0, 1], [30, 0]);

  // Line 2: "was rejected. Twice."
  const line2Delay = 3 * fps;
  const line2Progress = spring({
    frame,
    fps,
    delay: line2Delay,
    config: { damping: 200 },
  });
  const line2Opacity = interpolate(line2Progress, [0, 1], [0, 1]);
  const line2Y = interpolate(line2Progress, [0, 1], [30, 0]);

  // Glitch on "rejected"
  const glitchFrame = frame - line2Delay;
  const isGlitching = glitchFrame >= 8 && glitchFrame < 14;
  const glitchX = isGlitching ? ((glitchFrame * 7) % 9) - 4 : 0;

  // Fade to black at end
  const fadeOut = interpolate(frame, [12 * fps, 14 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.darkNavy,
        fontFamily,
      }}
    >
      <NeuralNetwork />

      {/* Text content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: "bold",
            color: colors.white,
            opacity: line1Opacity,
            transform: `translateY(${line1Y}px)`,
            textAlign: "center",
            maxWidth: 1000,
          }}
        >
          The most powerful technology on Earth...
        </div>

        <div
          style={{
            fontSize: 64,
            fontWeight: "bold",
            color: colors.white,
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px) translateX(${glitchX}px)`,
            textAlign: "center",
          }}
        >
          was{" "}
          <span style={{ color: colors.darkCyra }}>rejected</span>.{" "}
          <span style={{ color: colors.oldRose }}>Twice</span>.
        </div>
      </AbsoluteFill>

      {/* Fade to black */}
      <AbsoluteFill
        style={{
          backgroundColor: "#000",
          opacity: fadeOut,
        }}
      />
    </AbsoluteFill>
  );
};
