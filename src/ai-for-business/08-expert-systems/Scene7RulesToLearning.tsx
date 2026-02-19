import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Rigid rule boxes that dissolve into particles
const RuleBoxes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dissolveStart = 3 * fps;
  const dissolveEnd = 7 * fps;
  const dissolveProgress = interpolate(
    frame,
    [dissolveStart, dissolveEnd],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const boxes = [
    { x: 200, y: 300, w: 200, h: 50 },
    { x: 500, y: 250, w: 180, h: 50 },
    { x: 300, y: 450, w: 220, h: 50 },
    { x: 150, y: 550, w: 190, h: 50 },
    { x: 450, y: 380, w: 210, h: 50 },
    { x: 100, y: 400, w: 170, h: 50 },
  ];

  const boxOpacity = interpolate(dissolveProgress, [0, 0.5], [0.8, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Entry animation
  const entryOpacity = interpolate(frame, [0, fps], [0, 0.8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: entryOpacity }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        {boxes.map((box, i) => (
          <g key={`rbox-${i}`} opacity={boxOpacity}>
            <rect
              x={box.x}
              y={box.y}
              width={box.w}
              height={box.h}
              rx={4}
              fill={`${colors.chineseSilver}40`}
              stroke={colors.chineseSilver}
              strokeWidth={1}
            />
            <text
              x={box.x + box.w / 2}
              y={box.y + box.h / 2 + 5}
              textAnchor="middle"
              fontSize={14}
              fill={colors.rhythm}
              fontFamily="monospace"
            >
              IF ... THEN ...
            </text>
          </g>
        ))}
      </svg>
    </AbsoluteFill>
  );
};

// Particles that form into a neural network
const ParticleNetwork: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const transitionStart = 3 * fps;
  const transitionEnd = 8 * fps;
  const progress = interpolate(
    frame,
    [transitionStart, transitionEnd],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Scattered particles that converge into a neural network
  const networkNodes = [
    { x: 1200, y: 300 },
    { x: 1350, y: 250 },
    { x: 1500, y: 300 },
    { x: 1150, y: 450 },
    { x: 1300, y: 420 },
    { x: 1450, y: 450 },
    { x: 1600, y: 420 },
    { x: 1200, y: 580 },
    { x: 1350, y: 600 },
    { x: 1500, y: 580 },
  ];

  const scatteredPositions = networkNodes.map((node, i) => ({
    x: 300 + ((i * 137) % 500),
    y: 250 + ((i * 193) % 500),
  }));

  const connections = [
    [0, 3], [0, 4], [1, 4], [1, 5],
    [2, 5], [2, 6], [3, 7], [3, 8],
    [4, 7], [4, 8], [4, 9], [5, 8],
    [5, 9], [6, 9],
  ];

  const connectionOpacity = interpolate(progress, [0.5, 1], [0, 0.7], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        {/* Connections */}
        {connections.map(([a, b], i) => {
          const fromScattered = scatteredPositions[a];
          const toScattered = scatteredPositions[b];
          const fromTarget = networkNodes[a];
          const toTarget = networkNodes[b];

          const x1 =
            fromScattered.x + (fromTarget.x - fromScattered.x) * progress;
          const y1 =
            fromScattered.y + (fromTarget.y - fromScattered.y) * progress;
          const x2 =
            toScattered.x + (toTarget.x - toScattered.x) * progress;
          const y2 =
            toScattered.y + (toTarget.y - toScattered.y) * progress;

          return (
            <line
              key={`nconn-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={colors.tiffanyBlue}
              strokeWidth={1.5}
              opacity={connectionOpacity}
            />
          );
        })}

        {/* Nodes */}
        {networkNodes.map((target, i) => {
          const scattered = scatteredPositions[i];
          const x = scattered.x + (target.x - scattered.x) * progress;
          const y = scattered.y + (target.y - scattered.y) * progress;

          const nodeOpacity = interpolate(progress, [0, 0.3], [0.4, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          const pulse = Math.sin(frame * 0.06 + i * 0.8) * 0.2 + 0.8;

          return (
            <circle
              key={`nnode-${i}`}
              cx={x}
              cy={y}
              r={8}
              fill={colors.tiffanyBlue}
              opacity={nodeOpacity * pulse}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

// Data stream particles flowing right
const DataStream: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const streamOpacity = interpolate(frame, [5 * fps, 7 * fps], [0, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const particles = Array.from({ length: 40 }, (_, i) => ({
    startX: 600 + (i % 10) * 60,
    y: 250 + ((i * 43) % 500),
    speed: 1 + (i % 3) * 0.5,
    size: 2 + (i % 3),
  }));

  return (
    <AbsoluteFill style={{ opacity: streamOpacity }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        {particles.map((p, i) => {
          const x = (p.startX + frame * p.speed) % 1000 + 600;
          return (
            <circle
              key={`dp-${i}`}
              cx={x}
              cy={p.y}
              r={p.size}
              fill={colors.caribbeanGreen}
              opacity={0.6}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

export const Scene7RulesToLearning: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 12, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

  // Subtitle that changes
  const rulesTextOpacity = interpolate(frame, [0, fps, 4 * fps, 5 * fps], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const learningTextProgress = spring({
    frame,
    fps,
    delay: 5 * fps,
    config: { damping: 12, stiffness: 80 },
  });
  const learningTextOpacity = interpolate(
    learningTextProgress,
    [0, 1],
    [0, 1]
  );

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gunmetal}, ${colors.darkSlateGray})`,
        fontFamily,
      }}
    >
      <RuleBoxes />
      <ParticleNetwork />
      <DataStream />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleOpacity,
          zIndex: 5,
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: "bold",
            color: colors.white,
          }}
        >
          From{" "}
          <span style={{ color: colors.chineseSilver }}>Rules</span> to{" "}
          <span style={{ color: colors.tiffanyBlue }}>Learning</span>
        </div>
      </div>

      {/* "Telling machines the rules" fading out */}
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: rulesTextOpacity,
          zIndex: 5,
        }}
      >
        <div style={{ fontSize: 24, color: colors.chineseSilver }}>
          Instead of telling machines what the rules are...
        </div>
      </div>

      {/* "Letting machines discover patterns" fading in */}
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: learningTextOpacity,
          zIndex: 5,
        }}
      >
        <div style={{ fontSize: 24, color: colors.caribbeanGreen }}>
          ...researchers let machines discover patterns from data.
        </div>
      </div>

      {/* Arrow / transition indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: learningTextOpacity,
          zIndex: 5,
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: colors.tiffanyBlue,
          }}
        >
          That shift changed everything.
        </div>
      </div>
    </AbsoluteFill>
  );
};
