import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Abstract neural network lines forming a subtle background
const NeuralLines: React.FC = () => {
  const frame = useCurrentFrame();

  const nodes = [
    { x: 660, y: 340 },
    { x: 780, y: 260 },
    { x: 900, y: 200 },
    { x: 960, y: 300 },
    { x: 1020, y: 200 },
    { x: 1140, y: 260 },
    { x: 1260, y: 340 },
    { x: 720, y: 440 },
    { x: 840, y: 400 },
    { x: 960, y: 440 },
    { x: 1080, y: 400 },
    { x: 1200, y: 440 },
    { x: 840, y: 540 },
    { x: 960, y: 560 },
    { x: 1080, y: 540 },
  ];

  const connections: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6],
    [0, 7], [1, 8], [2, 9], [4, 10], [5, 11],
    [7, 8], [8, 9], [9, 10], [10, 11],
    [7, 12], [8, 13], [9, 13], [10, 14],
    [12, 13], [13, 14],
  ];

  const networkOpacity = interpolate(frame, [0, 60], [0, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const zoom = interpolate(frame, [0, 15 * 30], [0.95, 1.1], {
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
        <defs>
          <filter id="closingGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connections */}
        {connections.map(([a, b], i) => {
          const pulse =
            Math.sin((frame * 0.06 + i * 0.7) * 2) * 0.3 + 0.7;
          return (
            <line
              key={`c-${i}`}
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
              stroke={colors.caribbeanGreen}
              strokeWidth={1.5}
              opacity={pulse}
              filter="url(#closingGlow)"
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const pulse =
            Math.sin((frame * 0.07 + i * 0.8) * 2) * 0.3 + 0.7;
          return (
            <g key={`n-${i}`}>
              <circle
                cx={node.x}
                cy={node.y}
                r={14}
                fill={colors.caribbeanGreen}
                opacity={pulse * 0.12}
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={5}
                fill={colors.caribbeanGreen}
                opacity={pulse}
                filter="url(#closingGlow)"
              />
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

export const Scene8Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Main line 1: "AI is powerful."
  const line1Progress = spring({
    frame,
    fps,
    delay: 15,
    config: { damping: 12, stiffness: 100 },
  });
  const line1Scale = interpolate(line1Progress, [0, 1], [0.5, 1]);
  const line1Opacity = interpolate(line1Progress, [0, 1], [0, 1]);

  // Main line 2: "But it is not magic."
  const line2Progress = spring({
    frame,
    fps,
    delay: 2.5 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const line2Scale = interpolate(line2Progress, [0, 1], [0.5, 1]);
  const line2Opacity = interpolate(line2Progress, [0, 1], [0, 1]);

  // Tagline
  const tagProgress = spring({
    frame,
    fps,
    delay: 6 * fps,
    config: { damping: 200 },
  });
  const tagOpacity = interpolate(tagProgress, [0, 1], [0, 1]);
  const tagY = interpolate(tagProgress, [0, 1], [20, 0]);

  // Glow pulse
  const glowPulse = Math.sin(frame * 0.08) * 0.12 + 0.88;

  // Fade out towards the very end
  const fadeOut = interpolate(frame, [17 * fps, 20 * fps], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Bottom accent line
  const lineProgress = interpolate(frame, [fps, 5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.gunmetal,
        fontFamily,
        opacity: fadeOut,
      }}
    >
      {/* Neural network background */}
      <NeuralLines />

      {/* Main content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: "bold",
            color: colors.white,
            transform: `scale(${line1Scale})`,
            opacity: line1Opacity * glowPulse,
            textAlign: "center",
            textShadow: `0 0 40px ${colors.darkCyra}40`,
          }}
        >
          AI is{" "}
          <span style={{ color: colors.caribbeanGreen }}>powerful</span>.
        </div>

        <div
          style={{
            fontSize: 80,
            fontWeight: "bold",
            color: colors.white,
            transform: `scale(${line2Scale})`,
            opacity: line2Opacity * glowPulse,
            textAlign: "center",
            textShadow: `0 0 40px ${colors.darkCyra}40`,
          }}
        >
          But it is{" "}
          <span style={{ color: colors.oldRose }}>not magic</span>.
        </div>

        <div
          style={{
            fontSize: 26,
            color: colors.chineseSilver,
            opacity: tagOpacity * 0.9,
            transform: `translateY(${tagY}px)`,
            textAlign: "center",
            maxWidth: 700,
            lineHeight: 1.6,
            marginTop: 24,
          }}
        >
          It is data-driven, probabilistic, and imperfect by design.
          <br />
          Build for that reality.
        </div>
      </AbsoluteFill>

      {/* Bottom accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 5,
          backgroundColor: colors.caribbeanGreen,
          transform: `scaleX(${lineProgress})`,
          transformOrigin: "left",
        }}
      />
    </AbsoluteFill>
  );
};
