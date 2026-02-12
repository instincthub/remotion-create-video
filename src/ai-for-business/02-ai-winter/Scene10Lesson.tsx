import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Glowing neural network (brighter version)
const NeuralGlow: React.FC = () => {
  const frame = useCurrentFrame();

  const nodes = [
    { x: 660, y: 250 }, { x: 800, y: 180 }, { x: 960, y: 160 },
    { x: 1120, y: 180 }, { x: 1260, y: 250 },
    { x: 720, y: 380 }, { x: 880, y: 340 }, { x: 960, y: 310 },
    { x: 1040, y: 340 }, { x: 1200, y: 380 },
    { x: 780, y: 490 }, { x: 920, y: 460 }, { x: 1000, y: 440 },
    { x: 1080, y: 460 }, { x: 1140, y: 500 },
  ];

  const connections: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4],
    [0, 5], [1, 6], [2, 7], [3, 8], [4, 9],
    [5, 6], [6, 7], [7, 8], [8, 9],
    [5, 10], [6, 11], [7, 12], [8, 13],
    [10, 11], [11, 12], [12, 13], [13, 14], [10, 14],
  ];

  // Brightness increases over time
  const brightness = interpolate(
    frame,
    [0, 15 * 30],
    [0.1, 0.5],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ opacity: brightness }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        {connections.map(([a, b], i) => {
          const pulse = Math.sin((frame * 0.05 + i * 0.5) * 2) * 0.3 + 0.7;
          return (
            <line
              key={i}
              x1={nodes[a].x} y1={nodes[a].y}
              x2={nodes[b].x} y2={nodes[b].y}
              stroke={colors.darkCyra} strokeWidth={2} opacity={pulse}
            />
          );
        })}
        {nodes.map((node, i) => {
          const pulse = Math.sin((frame * 0.06 + i * 0.8) * 2) * 0.3 + 0.7;
          return (
            <g key={i}>
              {/* Glow */}
              <circle cx={node.x} cy={node.y} r={12} fill={colors.darkCyra} opacity={pulse * 0.15} />
              <circle cx={node.x} cy={node.y} r={6} fill={colors.darkCyra} opacity={pulse} />
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

const LINES = [
  { text: "Don't believe the hype.", color: colors.neonGreen, delay: 2 },
  { text: "Don't believe the doom.", color: colors.oldRose, delay: 5 },
  { text: "Believe the work.", color: colors.darkCyra, delay: 8 },
];

export const Scene10Lesson: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Final line
  const finalDelay = 12 * fps;
  const finalProgress = spring({ frame, fps, delay: finalDelay, config: { damping: 200 } });
  const finalOpacity = interpolate(finalProgress, [0, 1], [0, 1]);
  const finalY = interpolate(finalProgress, [0, 1], [20, 0]);

  // Accent bar at bottom
  const barProgress = interpolate(
    frame,
    [16 * fps, 18 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.darkNavy,
        fontFamily,
      }}
    >
      <NeuralGlow />

      {/* Main kinetic text */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
        }}
      >
        {LINES.map((line, i) => {
          const lineProgress = spring({
            frame,
            fps,
            delay: line.delay * fps,
            config: { damping: 200 },
          });
          const lineOpacity = interpolate(lineProgress, [0, 1], [0, 1]);
          const lineY = interpolate(lineProgress, [0, 1], [30, 0]);

          return (
            <div
              key={i}
              style={{
                fontSize: 56,
                fontWeight: "bold",
                color: line.color,
                opacity: lineOpacity,
                transform: `translateY(${lineY}px)`,
                textAlign: "center",
              }}
            >
              {line.text}
            </div>
          );
        })}

        {/* Final line */}
        <div
          style={{
            fontSize: 30,
            color: colors.white,
            opacity: finalOpacity,
            transform: `translateY(${finalY}px)`,
            textAlign: "center",
            maxWidth: 800,
            marginTop: 30,
            lineHeight: 1.6,
          }}
        >
          The best technology doesn&apos;t win by being loud.
          <br />
          It wins by being{" "}
          <span style={{ color: colors.darkCyra, fontWeight: "bold" }}>persistent</span>.
        </div>
      </AbsoluteFill>

      {/* InstinctHub accent bar at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 6,
          backgroundColor: colors.darkCyra,
          transform: `scaleX(${barProgress})`,
          transformOrigin: "left",
        }}
      />
    </AbsoluteFill>
  );
};
