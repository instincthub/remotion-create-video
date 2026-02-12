import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Subtle neural network glow background
const GlowBackground: React.FC = () => {
  const frame = useCurrentFrame();

  const nodes = [
    { x: 760, y: 300 }, { x: 880, y: 240 }, { x: 960, y: 340 },
    { x: 1040, y: 240 }, { x: 1160, y: 300 },
    { x: 820, y: 420 }, { x: 960, y: 460 }, { x: 1100, y: 420 },
    { x: 880, y: 540 }, { x: 1040, y: 540 },
  ];

  const connections: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4],
    [0, 5], [1, 6], [3, 7], [4, 7],
    [5, 6], [6, 7],
    [5, 8], [6, 8], [6, 9], [7, 9],
    [8, 9],
  ];

  const opacity = interpolate(frame, [0, 60], [0, 0.35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        <defs>
          <filter id="closingGlow5">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {connections.map(([a, b], i) => {
          const pulse = Math.sin((frame * 0.06 + i * 0.7) * 2) * 0.3 + 0.7;
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
              filter="url(#closingGlow5)"
            />
          );
        })}
        {nodes.map((node, i) => {
          const pulse = Math.sin((frame * 0.07 + i * 0.8) * 2) * 0.3 + 0.7;
          return (
            <g key={`n-${i}`}>
              <circle cx={node.x} cy={node.y} r={12} fill={colors.caribbeanGreen} opacity={pulse * 0.1} />
              <circle cx={node.x} cy={node.y} r={4} fill={colors.caribbeanGreen} opacity={pulse} filter="url(#closingGlow5)" />
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

export const Scene9Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Main line
  const line1Progress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 12, stiffness: 100 },
  });
  const line1Scale = interpolate(line1Progress, [0, 1], [0.5, 1]);
  const line1Opacity = interpolate(line1Progress, [0, 1], [0, 1]);

  // Second line
  const line2Progress = spring({
    frame,
    fps,
    delay: 2 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const line2Scale = interpolate(line2Progress, [0, 1], [0.5, 1]);
  const line2Opacity = interpolate(line2Progress, [0, 1], [0, 1]);

  // Glow pulse
  const glowPulse = Math.sin(frame * 0.08) * 0.1 + 0.9;

  // Fade out at end
  const fadeOut = interpolate(frame, [7.5 * fps, 10 * fps], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Bottom accent
  const lineProgress = interpolate(frame, [fps, 4 * fps], [0, 1], {
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
      {/* Glowing center gradient */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle 500px at 50% 50%, ${colors.darkCyra}20 0%, transparent 100%)`,
        }}
      />

      {/* Neural network background */}
      <GlowBackground />

      {/* Main content */}
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
            fontSize: 72,
            fontWeight: "bold",
            color: colors.white,
            transform: `scale(${line1Scale})`,
            opacity: line1Opacity * glowPulse,
            textAlign: "center",
            textShadow: `0 0 40px ${colors.darkCyra}40`,
          }}
        >
          Smarter{" "}
          <span style={{ color: colors.caribbeanGreen }}>Machines</span>.
        </div>

        <div
          style={{
            fontSize: 72,
            fontWeight: "bold",
            color: colors.white,
            transform: `scale(${line2Scale})`,
            opacity: line2Opacity * glowPulse,
            textAlign: "center",
            textShadow: `0 0 40px ${colors.darkCyra}40`,
          }}
        >
          Smarter{" "}
          <span style={{ color: colors.darkCyra }}>Responsibility</span>.
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
