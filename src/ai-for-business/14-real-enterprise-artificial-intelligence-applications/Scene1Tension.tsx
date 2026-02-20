import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene1Tension: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background data grid pulse
  const gridOpacity = interpolate(frame, [0, fps], [0, 0.06], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Slow zoom
  const zoom = interpolate(frame, [0, 14 * fps], [1, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // First line: "Enterprise AI is easy..."
  const line1Progress = spring({
    frame,
    fps,
    delay: 15,
    config: { damping: 12, stiffness: 80 },
  });
  const line1Opacity = interpolate(line1Progress, [0, 1], [0, 1]);
  const line1Y = interpolate(line1Progress, [0, 1], [40, 0]);

  // "...right?" appears with delay
  const rightProgress = spring({
    frame,
    fps,
    delay: 2 * fps,
    config: { damping: 10, stiffness: 60 },
  });
  const rightOpacity = interpolate(rightProgress, [0, 1], [0, 1]);
  const rightScale = interpolate(rightProgress, [0, 1], [1.3, 1]);

  // Neural network lines dissolve
  const networkOpacity = interpolate(frame, [0, fps], [0, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const networkDissolve = interpolate(frame, [3 * fps, 5 * fps], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "break your entire system" text
  const breakProgress = spring({
    frame,
    fps,
    delay: 4.5 * fps,
    config: { damping: 8, stiffness: 100 },
  });
  const breakOpacity = interpolate(breakProgress, [0, 1], [0, 1]);
  const breakScale = interpolate(breakProgress, [0, 1], [0.8, 1]);

  // Shake effect on "break"
  const shakeX =
    frame > 4.5 * fps && frame < 6 * fps
      ? Math.sin(frame * 1.2) * interpolate(frame, [4.5 * fps, 6 * fps], [6, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;

  // Neural network nodes
  const nodes = [
    { x: 300, y: 300 },
    { x: 500, y: 200 },
    { x: 500, y: 400 },
    { x: 700, y: 150 },
    { x: 700, y: 350 },
    { x: 700, y: 500 },
    { x: 900, y: 250 },
    { x: 900, y: 450 },
    { x: 1100, y: 300 },
    { x: 1100, y: 500 },
    { x: 1300, y: 200 },
    { x: 1300, y: 400 },
    { x: 1500, y: 300 },
    { x: 1600, y: 450 },
  ];

  const connections = [
    [0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [2, 5],
    [3, 6], [4, 6], [4, 7], [5, 7], [6, 8], [6, 9],
    [7, 9], [8, 10], [8, 11], [9, 11], [10, 12], [11, 12], [11, 13],
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.darkNavy} 0%, ${colors.darkCharcoal} 50%, #0a1a2e 100%)`,
        fontFamily,
      }}
    >
      <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
        {/* Data grid background */}
        <svg
          width="1920"
          height="1080"
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", top: 0, left: 0, opacity: gridOpacity }}
        >
          {Array.from({ length: 25 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 80}
              y1={0}
              x2={i * 80}
              y2={1080}
              stroke={colors.darkCyra}
              strokeWidth={1}
            />
          ))}
          {Array.from({ length: 15 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1={0}
              y1={i * 80}
              x2={1920}
              y2={i * 80}
              stroke={colors.darkCyra}
              strokeWidth={1}
            />
          ))}
        </svg>

        {/* Neural network lines */}
        <svg
          width="1920"
          height="1080"
          viewBox="0 0 1920 1080"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            opacity: networkOpacity * networkDissolve,
          }}
        >
          {connections.map(([from, to], i) => {
            const pulse = interpolate(
              Math.sin(frame * 0.05 + i * 0.8),
              [-1, 1],
              [0.3, 0.8]
            );
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
          {nodes.map((node, i) => {
            const pulse = interpolate(
              Math.sin(frame * 0.06 + i * 0.5),
              [-1, 1],
              [4, 8]
            );
            return (
              <circle
                key={`node-${i}`}
                cx={node.x}
                cy={node.y}
                r={pulse}
                fill={colors.tiffanyBlue}
                opacity={0.7}
              />
            );
          })}
        </svg>
      </AbsoluteFill>

      {/* Main text content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          paddingBottom: 200,
        }}
      >
        {/* "Enterprise AI is easy..." */}
        <div
          style={{
            opacity: line1Opacity,
            transform: `translateY(${line1Y}px)`,
            fontSize: 62,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          Enterprise AI is{" "}
          <span style={{ color: colors.caribbeanGreen }}>easy</span>
          <span
            style={{
              opacity: rightOpacity,
              transform: `scale(${rightScale})`,
              display: "inline-block",
              color: colors.chineseSilver,
            }}
          >
            ... right?
          </span>
        </div>

        {/* "break your entire system" */}
        <div
          style={{
            opacity: breakOpacity,
            transform: `scale(${breakScale}) translateX(${shakeX}px)`,
            fontSize: 44,
            fontWeight: 700,
            color: colors.oldRose,
            textAlign: "center",
            marginTop: 60,
          }}
        >
          ...can break your entire system.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
