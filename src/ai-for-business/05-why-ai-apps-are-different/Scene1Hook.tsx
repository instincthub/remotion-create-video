import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Animated neural network lines in background
const NeuralBackground: React.FC = () => {
  const frame = useCurrentFrame();

  const nodes = [
    { x: 160, y: 120 }, { x: 360, y: 200 }, { x: 560, y: 100 },
    { x: 760, y: 260 }, { x: 960, y: 140 }, { x: 1160, y: 240 },
    { x: 1360, y: 120 }, { x: 1560, y: 200 }, { x: 1760, y: 140 },
    { x: 260, y: 400 }, { x: 500, y: 480 }, { x: 760, y: 440 },
    { x: 960, y: 520 }, { x: 1200, y: 460 }, { x: 1460, y: 500 },
    { x: 300, y: 700 }, { x: 600, y: 750 }, { x: 900, y: 680 },
    { x: 1200, y: 740 }, { x: 1500, y: 700 },
    { x: 400, y: 900 }, { x: 800, y: 920 }, { x: 1100, y: 880 },
    { x: 1500, y: 930 },
  ];

  const connections: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8],
    [0, 9], [1, 10], [3, 11], [4, 12], [5, 13], [7, 14],
    [9, 10], [10, 11], [11, 12], [12, 13], [13, 14],
    [9, 15], [10, 16], [11, 17], [13, 18], [14, 19],
    [15, 16], [16, 17], [17, 18], [18, 19],
    [15, 20], [16, 21], [17, 22], [19, 23],
  ];

  const networkOpacity = interpolate(frame, [0, 45], [0, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: networkOpacity }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        <defs>
          <filter id="hookGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {connections.map(([a, b], i) => {
          const pulse = Math.sin((frame * 0.05 + i * 0.6) * 2) * 0.3 + 0.5;
          return (
            <line
              key={`c-${i}`}
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
              stroke={colors.tiffanyBlue}
              strokeWidth={1}
              opacity={pulse}
            />
          );
        })}
        {nodes.map((node, i) => {
          const pulse = Math.sin((frame * 0.06 + i * 0.7) * 2) * 0.3 + 0.5;
          return (
            <circle
              key={`n-${i}`}
              cx={node.x}
              cy={node.y}
              r={4}
              fill={colors.caribbeanGreen}
              opacity={pulse}
              filter="url(#hookGlow)"
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

// Flowing data particles
const DataParticles: React.FC = () => {
  const frame = useCurrentFrame();

  const particles = [
    { x: 150, y: 180, speed: 1.0, size: 3 },
    { x: 400, y: 350, speed: 1.4, size: 4 },
    { x: 680, y: 150, speed: 0.8, size: 3 },
    { x: 950, y: 500, speed: 1.2, size: 5 },
    { x: 1200, y: 250, speed: 0.9, size: 3 },
    { x: 1450, y: 600, speed: 1.1, size: 4 },
    { x: 1700, y: 300, speed: 0.7, size: 3 },
    { x: 300, y: 800, speed: 1.3, size: 4 },
    { x: 800, y: 850, speed: 0.6, size: 3 },
    { x: 1300, y: 900, speed: 1.0, size: 5 },
  ];

  const opacity = interpolate(frame, [10, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity }}>
      {particles.map((p, i) => {
        const floatY = Math.sin((frame * p.speed + i * 50) * 0.05) * 20;
        const floatX = Math.cos((frame * p.speed + i * 30) * 0.04) * 15;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x + floatX,
              top: p.y + floatY,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: colors.caribbeanGreen,
              opacity: 0.4,
              boxShadow: `0 0 8px ${colors.caribbeanGreen}60`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Line 1: "What if your software kept changing after deployment?"
  const line1Progress = spring({
    frame,
    fps,
    delay: 15,
    config: { damping: 12, stiffness: 100 },
  });
  const line1Scale = interpolate(line1Progress, [0, 1], [0.6, 1]);
  const line1Opacity = interpolate(line1Progress, [0, 1], [0, 1]);

  // Slow zoom on line 1
  const zoom = interpolate(frame, [0, 15 * fps], [1, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Line 2: "Welcome to Artificial Intelligence."
  const line2Progress = spring({
    frame,
    fps,
    delay: 3 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const line2Opacity = interpolate(line2Progress, [0, 1], [0, 1]);
  const line2Y = interpolate(line2Progress, [0, 1], [30, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.magnolia,
        fontFamily,
      }}
    >
      <NeuralBackground />
      <DataParticles />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
          transform: `scale(${zoom})`,
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: "bold",
            color: colors.darkSlateGray,
            transform: `scale(${line1Scale})`,
            opacity: line1Opacity,
            textAlign: "center",
            lineHeight: 1.25,
            maxWidth: 1200,
          }}
        >
          What if your software kept{" "}
          <span style={{ color: colors.darkCyra }}>changing</span>
          <br />
          after deployment?
        </div>

        <div
          style={{
            fontSize: 36,
            fontWeight: "bold",
            color: colors.viridianGreen,
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px)`,
            textAlign: "center",
          }}
        >
          Welcome to{" "}
          <span style={{ color: colors.darkCyra }}>
            Artificial Intelligence
          </span>
          .
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
