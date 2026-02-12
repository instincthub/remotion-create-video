import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Glowing network that assembles into an intelligent system
const GlowingNetwork: React.FC = () => {
  const frame = useCurrentFrame();

  const nodes = [
    { x: 760, y: 340 },
    { x: 860, y: 260 },
    { x: 960, y: 220 },
    { x: 1060, y: 260 },
    { x: 1160, y: 340 },
    { x: 800, y: 440 },
    { x: 900, y: 400 },
    { x: 960, y: 360 },
    { x: 1020, y: 400 },
    { x: 1120, y: 440 },
    { x: 860, y: 520 },
    { x: 960, y: 500 },
    { x: 1060, y: 520 },
  ];

  const connections: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4],
    [0, 5], [1, 6], [2, 7], [3, 8], [4, 9],
    [5, 6], [6, 7], [7, 8], [8, 9],
    [5, 10], [6, 11], [7, 11], [8, 12],
    [10, 11], [11, 12],
  ];

  // Network fades in and zooms
  const networkOpacity = interpolate(frame, [0, 30], [0, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const zoom = interpolate(frame, [0, 10 * 30], [0.9, 1.15], {
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
        {/* Glow filter */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connections */}
        {connections.map(([a, b], i) => {
          const pulse = Math.sin((frame * 0.08 + i * 0.6) * 2) * 0.3 + 0.7;
          return (
            <line
              key={`c-${i}`}
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
              stroke={colors.caribbeanGreen}
              strokeWidth={2}
              opacity={pulse}
              filter="url(#glow)"
            />
          );
        })}

        {/* Nodes with glow */}
        {nodes.map((node, i) => {
          const pulse = Math.sin((frame * 0.07 + i * 0.9) * 2) * 0.3 + 0.7;
          return (
            <g key={`n-${i}`}>
              <circle
                cx={node.x}
                cy={node.y}
                r={16}
                fill={colors.caribbeanGreen}
                opacity={pulse * 0.15}
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={6}
                fill={colors.caribbeanGreen}
                opacity={pulse}
                filter="url(#glow)"
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

  // Main text zoom in
  const textProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 10, stiffness: 80 },
  });
  const textScale = interpolate(textProgress, [0, 1], [0.5, 1]);
  const textOpacity = interpolate(textProgress, [0, 1], [0, 1]);

  // Subtitle
  const subProgress = spring({
    frame,
    fps,
    delay: 2.5 * fps,
    config: { damping: 200 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);
  const subY = interpolate(subProgress, [0, 1], [20, 0]);

  // Caribbean Green accent line at bottom
  const lineProgress = interpolate(
    frame,
    [1 * fps, 4 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Final glow pulse
  const glowPulse = Math.sin(frame * 0.08) * 0.15 + 0.85;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.darkCyra,
        fontFamily,
      }}
    >
      {/* Network background */}
      <GlowingNetwork />

      {/* Main content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontSize: 88,
            fontWeight: "bold",
            color: colors.white,
            transform: `scale(${textScale})`,
            opacity: textOpacity * glowPulse,
            textAlign: "center",
            textShadow: `0 0 40px ${colors.caribbeanGreen}40`,
          }}
        >
          Make AI{" "}
          <span style={{ color: colors.caribbeanGreen }}>Real</span>.
        </div>

        <div
          style={{
            fontSize: 30,
            color: colors.white,
            opacity: subOpacity * 0.85,
            transform: `translateY(${subY}px)`,
            textAlign: "center",
            maxWidth: 800,
            lineHeight: 1.5,
          }}
        >
          Let&apos;s stop blaming algorithms.
          <br />
          Let&apos;s start building better systems.
        </div>
      </AbsoluteFill>

      {/* Caribbean Green accent line at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 6,
          backgroundColor: colors.caribbeanGreen,
          transform: `scaleX(${lineProgress})`,
          transformOrigin: "left",
        }}
      />
    </AbsoluteFill>
  );
};
