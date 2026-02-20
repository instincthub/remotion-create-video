import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Animated data flow particles between blocks
const DataFlow: React.FC<{
  x: number;
  y1: number;
  y2: number;
  color: string;
  opacity: number;
}> = ({ x, y1, y2, color, opacity }) => {
  const frame = useCurrentFrame();
  const particleCount = 4;

  return (
    <svg
      width="40"
      height={y2 - y1}
      viewBox={`0 0 40 ${y2 - y1}`}
      style={{
        position: "absolute",
        top: y1,
        left: x - 20,
        opacity,
      }}
    >
      {/* Connection line */}
      <line
        x1={20}
        y1={0}
        x2={20}
        y2={y2 - y1}
        stroke={`${color}50`}
        strokeWidth={3}
        strokeDasharray="6 4"
      />
      {/* Moving particles */}
      {Array.from({ length: particleCount }).map((_, i) => {
        const speed = 0.03;
        const offset = i / particleCount;
        const t = (frame * speed + offset) % 1;
        const py = t * (y2 - y1);
        return (
          <circle
            key={`p-${i}`}
            cx={20}
            cy={py}
            r={5}
            fill={color}
            opacity={0.8}
          />
        );
      })}
    </svg>
  );
};

export const Scene5Architecture: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 0.5),
    config: { damping: 12, stiffness: 80 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  // Three architecture blocks
  const blocks = [
    {
      label: "Frontend",
      sublabel: "User Interface & Interaction",
      color: colors.caribbeanGreen,
      delay: 2,
      y: 210,
    },
    {
      label: "Backend",
      sublabel: "Logic, API & Model Serving",
      color: colors.darkCyra,
      delay: 5,
      y: 420,
    },
    {
      label: "Database",
      sublabel: "Storage, Features & History",
      color: colors.deepGreenCyanTurquoise,
      delay: 8,
      y: 630,
    },
  ];

  const blockWidth = 600;
  const blockHeight = 150;
  const centerX = 660;

  // Right side flow: prediction → decision → business action
  const flowItems = [
    { label: "Prediction", sublabel: "Model outputs result", color: colors.darkCyra, delay: 11, y: 250 },
    { label: "Decision", sublabel: "System interprets output", color: colors.viridianGreen, delay: 13, y: 440 },
    { label: "Business Action", sublabel: "Creates measurable impact", color: colors.metallicBlue, delay: 15, y: 630 },
  ];

  // Flow connections
  const flowConnProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 12),
    config: { damping: 14, stiffness: 80 },
  });
  const flowConnOpacity = interpolate(flowConnProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: colors.white,
        fontFamily,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 60,
          width: "100%",
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <span
          style={{
            fontSize: 54,
            fontWeight: 700,
            color: colors.darkSlateGray,
          }}
        >
          <span style={{ color: colors.caribbeanGreen }}>Frontend</span>
          {" . "}
          <span style={{ color: colors.darkCyra }}>Backend</span>
          {" . "}
          <span style={{ color: colors.deepGreenCyanTurquoise }}>Database</span>
        </span>
      </div>

      {/* Architecture blocks */}
      {blocks.map((block, i) => {
        const blockProgress = spring({
          frame,
          fps,
          delay: Math.round(fps * block.delay),
          config: { damping: 12, stiffness: 80 },
        });
        const blockOpacity = interpolate(blockProgress, [0, 1], [0, 1]);
        const blockY = interpolate(blockProgress, [0, 1], [40, 0]);

        return (
          <div
            key={block.label}
            style={{
              position: "absolute",
              top: block.y,
              left: centerX - blockWidth / 2,
              width: blockWidth,
              height: blockHeight,
              opacity: blockOpacity,
              transform: `translateY(${blockY}px)`,
              background: `${block.color}15`,
              border: `3px solid ${block.color}50`,
              borderRadius: 16,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <span
              style={{
                fontSize: 40,
                fontWeight: 700,
                color: block.color,
              }}
            >
              {block.label}
            </span>
            <span
              style={{
                fontSize: 24,
                fontWeight: 400,
                color: colors.gunmetal,
              }}
            >
              {block.sublabel}
            </span>
          </div>
        );
      })}

      {/* Data flow between blocks */}
      {blocks.slice(0, -1).map((block, i) => {
        const connProgress = spring({
          frame,
          fps,
          delay: Math.round(fps * (blocks[i + 1].delay - 1)),
          config: { damping: 14, stiffness: 80 },
        });
        const connOpacity = interpolate(connProgress, [0, 1], [0, 1]);

        return (
          <DataFlow
            key={`flow-${i}`}
            x={centerX}
            y1={block.y + blockHeight}
            y2={blocks[i + 1].y}
            color={block.color}
            opacity={connOpacity}
          />
        );
      })}

      {/* Right side: Flow labels */}
      {flowItems.map((fl, i) => {
        const flProgress = spring({
          frame,
          fps,
          delay: Math.round(fps * fl.delay),
          config: { damping: 12, stiffness: 80 },
        });
        const flOpacity = interpolate(flProgress, [0, 1], [0, 1]);
        const flX = interpolate(flProgress, [0, 1], [40, 0]);

        return (
          <div
            key={fl.label}
            style={{
              position: "absolute",
              top: fl.y,
              right: 120,
              opacity: flOpacity,
              transform: `translateX(${flX}px)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 6,
            }}
          >
            <span
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: fl.color,
              }}
            >
              {fl.label}
            </span>
            <span
              style={{
                fontSize: 22,
                fontWeight: 400,
                color: colors.gunmetal,
              }}
            >
              {fl.sublabel}
            </span>
          </div>
        );
      })}

      {/* Flow arrows on right side */}
      {flowItems.slice(0, -1).map((fl, i) => (
        <svg
          key={`fa-${i}`}
          width="24"
          height="80"
          viewBox="0 0 24 80"
          style={{
            position: "absolute",
            top: fl.y + 70,
            right: 260,
            opacity: flowConnOpacity,
          }}
        >
          <line
            x1={12}
            y1={0}
            x2={12}
            y2={68}
            stroke={colors.darkCyra}
            strokeWidth={2.5}
            strokeDasharray="5 4"
          />
          <polygon
            points="4,68 12,80 20,68"
            fill={colors.darkCyra}
            opacity={0.7}
          />
        </svg>
      ))}
    </AbsoluteFill>
  );
};
