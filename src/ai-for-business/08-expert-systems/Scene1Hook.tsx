import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Animated neural network lines on magnolia background
const NeuralLines: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 60], [0, 0.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const nodes = [
    { x: 200, y: 200 },
    { x: 500, y: 350 },
    { x: 350, y: 600 },
    { x: 800, y: 250 },
    { x: 700, y: 550 },
    { x: 1100, y: 300 },
    { x: 1000, y: 650 },
    { x: 1400, y: 200 },
    { x: 1300, y: 500 },
    { x: 1600, y: 350 },
    { x: 1700, y: 600 },
    { x: 960, y: 450 },
  ];

  const connections = [
    [0, 1], [1, 2], [1, 3], [3, 4], [3, 5],
    [5, 6], [5, 7], [7, 8], [7, 9], [9, 10],
    [4, 6], [2, 4], [6, 8], [8, 10], [11, 3],
    [11, 5], [0, 11], [2, 11],
  ];

  return (
    <AbsoluteFill style={{ opacity }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        {connections.map(([a, b], i) => {
          const pulse =
            Math.sin((frame * 0.04 + i * 0.6) * 2) * 0.4 + 0.6;
          return (
            <line
              key={`conn-${i}`}
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
              stroke={colors.darkCyra}
              strokeWidth={1}
              opacity={pulse}
            />
          );
        })}
        {nodes.map((node, i) => {
          const pulse =
            Math.sin((frame * 0.06 + i * 0.8) * 2) * 0.3 + 0.7;
          return (
            <circle
              key={`node-${i}`}
              cx={node.x}
              cy={node.y}
              r={4}
              fill={colors.darkCyra}
              opacity={pulse}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

// Brain-to-circuit transformation
const BrainCircuit: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const morphProgress = interpolate(frame, [2 * fps, 8 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const enterOpacity = interpolate(frame, [fps, 2 * fps], [0, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Brain outline (left half)
  const brainOpacity = interpolate(morphProgress, [0, 0.5, 1], [1, 0.5, 0]);
  // Circuit board (right half)
  const circuitOpacity = interpolate(morphProgress, [0, 0.5, 1], [0, 0.5, 1]);

  return (
    <AbsoluteFill style={{ opacity: enterOpacity }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        {/* Brain outline */}
        <g opacity={brainOpacity} transform="translate(760, 500)">
          <ellipse
            cx={0}
            cy={0}
            rx={120}
            ry={140}
            fill="none"
            stroke={colors.darkCyra}
            strokeWidth={2}
          />
          <path
            d="M 0 -140 Q -60 -100 -40 -40 Q -80 0 -60 60 Q -100 80 -80 140"
            fill="none"
            stroke={colors.darkCyra}
            strokeWidth={1.5}
          />
          <path
            d="M 0 -140 Q 60 -100 40 -40 Q 80 0 60 60 Q 100 80 80 140"
            fill="none"
            stroke={colors.darkCyra}
            strokeWidth={1.5}
          />
          {/* Brain folds */}
          <path
            d="M -80 -20 Q -20 -40 40 -20"
            fill="none"
            stroke={colors.darkCyra}
            strokeWidth={1}
          />
          <path
            d="M -60 40 Q 0 20 60 40"
            fill="none"
            stroke={colors.darkCyra}
            strokeWidth={1}
          />
        </g>

        {/* Circuit board */}
        <g opacity={circuitOpacity} transform="translate(760, 500)">
          {/* Central chip */}
          <rect
            x={-40}
            y={-40}
            width={80}
            height={80}
            fill="none"
            stroke={colors.tiffanyBlue}
            strokeWidth={2}
          />
          {/* Circuit traces */}
          {[
            "M -40 -20 L -100 -20 L -100 -80",
            "M -40 20 L -100 20 L -100 80",
            "M 40 -20 L 100 -20 L 100 -80",
            "M 40 20 L 100 20 L 100 80",
            "M 0 -40 L 0 -100",
            "M 0 40 L 0 100",
            "M -20 -40 L -20 -120 L -80 -120",
            "M 20 40 L 20 120 L 80 120",
          ].map((d, i) => (
            <path
              key={`trace-${i}`}
              d={d}
              fill="none"
              stroke={colors.tiffanyBlue}
              strokeWidth={1.5}
            />
          ))}
          {/* Circuit nodes */}
          {[
            [-100, -80], [-100, 80], [100, -80], [100, 80],
            [0, -100], [0, 100], [-80, -120], [80, 120],
          ].map(([cx, cy], i) => (
            <circle
              key={`cnode-${i}`}
              cx={cx}
              cy={cy}
              r={4}
              fill={colors.tiffanyBlue}
            />
          ))}
        </g>
      </svg>
    </AbsoluteFill>
  );
};

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow zoom
  const zoom = interpolate(frame, [0, 15 * fps], [1, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Main text entrance
  const textProgress = spring({
    frame,
    fps,
    delay: 15,
    config: { damping: 12, stiffness: 100 },
  });
  const textScale = interpolate(textProgress, [0, 1], [0.6, 1]);
  const textOpacity = interpolate(textProgress, [0, 1], [0, 1]);

  // Subtext
  const subProgress = spring({
    frame,
    fps,
    delay: 4 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);
  const subY = interpolate(subProgress, [0, 1], [30, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.magnolia,
        fontFamily,
      }}
    >
      <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
        <NeuralLines />
        <BrainCircuit />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
          zIndex: 1,
          paddingBottom: 200,
        }}
      >
        <div
          style={{
            fontSize: 62,
            fontWeight: "bold",
            color: colors.gunmetal,
            transform: `scale(${textScale})`,
            opacity: textOpacity,
            textAlign: "center",
            lineHeight: 1.3,
            maxWidth: 1200,
          }}
        >
          What if we could copy the mind of a{" "}
          <span style={{ color: colors.darkCyra }}>doctor</span>…
          <br />
          into a <span style={{ color: colors.tiffanyBlue }}>machine</span>?
        </div>

        <div
          style={{
            fontSize: 28,
            color: colors.rhythm,
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.5,
          }}
        >
          That was the big dream of the 1970s and 80s.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
