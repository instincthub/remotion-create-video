import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Abstract neural network background
const NeuralNetwork: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 60], [0, 0.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const nodes = [
    { x: 200, y: 150 },
    { x: 400, y: 300 },
    { x: 300, y: 550 },
    { x: 600, y: 200 },
    { x: 550, y: 450 },
    { x: 800, y: 300 },
    { x: 750, y: 600 },
    { x: 1000, y: 180 },
    { x: 1050, y: 450 },
    { x: 1200, y: 300 },
    { x: 1150, y: 600 },
    { x: 1400, y: 200 },
    { x: 1450, y: 500 },
    { x: 1650, y: 300 },
    { x: 1700, y: 550 },
    { x: 960, y: 700 },
  ];

  const connections = [
    [0, 1], [1, 2], [1, 3], [3, 4], [3, 5], [5, 6],
    [5, 7], [7, 8], [7, 9], [9, 10], [9, 11], [11, 12],
    [11, 13], [13, 14], [4, 6], [8, 10], [12, 14],
    [2, 15], [6, 15], [10, 15], [14, 15],
  ];

  return (
    <AbsoluteFill style={{ opacity }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        {connections.map(([a, b], i) => {
          const pulse =
            Math.sin((frame * 0.04 + i * 0.5) * 2) * 0.4 + 0.6;
          return (
            <line
              key={`conn-${i}`}
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
              stroke={colors.white}
              strokeWidth={1}
              opacity={pulse}
            />
          );
        })}
        {nodes.map((node, i) => {
          const pulse =
            Math.sin((frame * 0.06 + i * 0.7) * 2) * 0.3 + 0.7;
          return (
            <circle
              key={`node-${i}`}
              cx={node.x}
              cy={node.y}
              r={4}
              fill={colors.white}
              opacity={pulse}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

export const Scene6Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Formula pieces enter sequentially
  const senseProgress = spring({
    frame,
    fps,
    delay: fps,
    config: { damping: 10, stiffness: 100 },
  });
  const senseOpacity = interpolate(senseProgress, [0, 1], [0, 1]);
  const senseScale = interpolate(senseProgress, [0, 1], [0.7, 1]);

  const plus1Progress = spring({
    frame,
    fps,
    delay: 2 * fps,
    config: { damping: 12, stiffness: 100 },
  });
  const plus1Opacity = interpolate(plus1Progress, [0, 1], [0, 1]);

  const decideProgress = spring({
    frame,
    fps,
    delay: 2.5 * fps,
    config: { damping: 10, stiffness: 100 },
  });
  const decideOpacity = interpolate(decideProgress, [0, 1], [0, 1]);
  const decideScale = interpolate(decideProgress, [0, 1], [0.7, 1]);

  const plus2Progress = spring({
    frame,
    fps,
    delay: 3.5 * fps,
    config: { damping: 12, stiffness: 100 },
  });
  const plus2Opacity = interpolate(plus2Progress, [0, 1], [0, 1]);

  const actProgress = spring({
    frame,
    fps,
    delay: 4 * fps,
    config: { damping: 10, stiffness: 100 },
  });
  const actOpacity = interpolate(actProgress, [0, 1], [0, 1]);
  const actScale = interpolate(actProgress, [0, 1], [0.7, 1]);

  // "= Autonomy" reveal
  const equalsProgress = spring({
    frame,
    fps,
    delay: 5.5 * fps,
    config: { damping: 8, stiffness: 80 },
  });
  const equalsOpacity = interpolate(equalsProgress, [0, 1], [0, 1]);
  const equalsScale = interpolate(equalsProgress, [0, 1], [1.2, 1]);

  // Glow effect
  const glowIntensity = interpolate(
    Math.sin(frame * 0.06),
    [-1, 1],
    [20, 50]
  );

  // Bottom closing text
  const closingProgress = spring({
    frame,
    fps,
    delay: 8 * fps,
    config: { damping: 12, stiffness: 80 },
  });
  const closingOpacity = interpolate(closingProgress, [0, 1], [0, 1]);
  const closingY = interpolate(closingProgress, [0, 1], [20, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.darkCyra,
        fontFamily,
      }}
    >
      <NeuralNetwork />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 48,
          zIndex: 1,
          paddingBottom: 200,
        }}
      >
        {/* Formula row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <span
            style={{
              fontSize: 52,
              fontWeight: "bold",
              color: colors.white,
              opacity: senseOpacity,
              transform: `scale(${senseScale})`,
              display: "inline-block",
            }}
          >
            Sense
          </span>
          <span
            style={{
              fontSize: 48,
              color: colors.caribbeanGreen,
              opacity: plus1Opacity,
              fontWeight: "bold",
            }}
          >
            +
          </span>
          <span
            style={{
              fontSize: 52,
              fontWeight: "bold",
              color: colors.white,
              opacity: decideOpacity,
              transform: `scale(${decideScale})`,
              display: "inline-block",
            }}
          >
            Decide
          </span>
          <span
            style={{
              fontSize: 48,
              color: colors.caribbeanGreen,
              opacity: plus2Opacity,
              fontWeight: "bold",
            }}
          >
            +
          </span>
          <span
            style={{
              fontSize: 52,
              fontWeight: "bold",
              color: colors.white,
              opacity: actOpacity,
              transform: `scale(${actScale})`,
              display: "inline-block",
            }}
          >
            Act
          </span>
        </div>

        {/* = Autonomy */}
        <div
          style={{
            opacity: equalsOpacity,
            transform: `scale(${equalsScale})`,
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontSize: 48,
              color: colors.caribbeanGreen,
              fontWeight: "bold",
              marginRight: 20,
            }}
          >
            =
          </span>
          <span
            style={{
              fontSize: 72,
              fontWeight: "bold",
              color: colors.white,
              textShadow: `0 0 ${glowIntensity}px ${colors.caribbeanGreen}60`,
            }}
          >
            Autonomy
          </span>
        </div>

        {/* Closing line */}
        <div
          style={{
            opacity: closingOpacity,
            transform: `translateY(${closingY}px)`,
            textAlign: "center",
            maxWidth: 900,
            marginTop: 20,
          }}
        >
          <div
            style={{
              fontSize: 26,
              color: `${colors.white}CC`,
              lineHeight: 1.6,
            }}
          >
            The journey started with two small robots chasing light in 1949.
          </div>
          <div
            style={{
              fontSize: 30,
              fontWeight: "bold",
              color: colors.white,
              marginTop: 16,
            }}
          >
            And we are still just getting started.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
