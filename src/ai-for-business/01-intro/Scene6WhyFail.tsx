import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Circuit board pattern background
const CircuitPattern: React.FC = () => {
  const nodes = [
    { x: 200, y: 150 },
    { x: 450, y: 300 },
    { x: 700, y: 180 },
    { x: 1000, y: 350 },
    { x: 1300, y: 200 },
    { x: 1550, y: 400 },
    { x: 300, y: 600 },
    { x: 600, y: 750 },
    { x: 900, y: 650 },
    { x: 1200, y: 800 },
    { x: 1500, y: 700 },
    { x: 1700, y: 550 },
  ];

  return (
    <AbsoluteFill style={{ opacity: 0.08 }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        {/* Connection lines */}
        {nodes.map((node, i) => {
          if (i < nodes.length - 1) {
            return (
              <line
                key={`line-${i}`}
                x1={node.x}
                y1={node.y}
                x2={nodes[i + 1].x}
                y2={nodes[i + 1].y}
                stroke={colors.rhythm}
                strokeWidth={2}
              />
            );
          }
          return null;
        })}
        {/* Nodes */}
        {nodes.map((node, i) => (
          <circle
            key={`node-${i}`}
            cx={node.x}
            cy={node.y}
            r={5}
            fill={colors.rhythm}
          />
        ))}
      </svg>
    </AbsoluteFill>
  );
};

export const Scene6WhyFail: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header
  const headerProgress = spring({
    frame,
    fps,
    config: { damping: 200 },
  });
  const headerOpacity = interpolate(headerProgress, [0, 1], [0, 1]);

  // Progress bar animation
  const barDelay = 2 * fps;
  const barAppear = spring({
    frame,
    fps,
    delay: barDelay,
    config: { damping: 200 },
  });
  const barOpacity = interpolate(barAppear, [0, 1], [0, 1]);

  // Bar fill: smoothly fills to ~35%, then stutters
  const fillStart = barDelay + 15;
  const fillEnd = fillStart + 8 * fps;
  const baseFill = interpolate(frame, [fillStart, fillEnd], [0, 35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Stutter/glitch effect after reaching ~30%
  const stutterPhase = frame - (fillStart + 6 * fps);
  const isStuttering = stutterPhase > 0 && stutterPhase < 4 * fps;
  const stutterOffset = isStuttering
    ? Math.sin(stutterPhase * 0.8) * 3 * Math.max(0, 1 - stutterPhase / 100)
    : 0;
  const fillWidth = Math.max(0, baseFill + stutterOffset);

  // Fracture lines appear when stalling
  const fractureDelay = fillStart + 8 * fps;
  const fractureProgress = interpolate(
    frame,
    [fractureDelay, fractureDelay + 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // "20-40% success rate" text
  const statDelay = 18 * fps;
  const statProgress = spring({
    frame,
    fps,
    delay: statDelay,
    config: { damping: 200 },
  });
  const statOpacity = interpolate(statProgress, [0, 1], [0, 1]);
  const statY = interpolate(statProgress, [0, 1], [20, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.gunmetal,
        fontFamily,
      }}
    >
      <CircuitPattern />

      {/* Content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 120,
          gap: 50,
        }}
      >
        {/* Header */}
        <div
          style={{
            fontSize: 52,
            fontWeight: "bold",
            color: colors.white,
            opacity: headerOpacity,
            textAlign: "center",
          }}
        >
          Why Projects Fail
        </div>

        {/* Progress bar container */}
        <div
          style={{
            width: "100%",
            maxWidth: 1000,
            opacity: barOpacity,
          }}
        >
          {/* Labels */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 16,
              fontSize: 22,
              color: colors.chineseSilver,
            }}
          >
            <span>Proof of Concept</span>
            <span>Business Value</span>
          </div>

          {/* Bar background */}
          <div
            style={{
              width: "100%",
              height: 60,
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: 30,
              border: `2px solid ${colors.chineseSilver}`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Bar fill */}
            <div
              style={{
                width: `${fillWidth}%`,
                height: "100%",
                backgroundColor: colors.darkCyra,
                borderRadius: 30,
                position: "relative",
              }}
            />

            {/* Fracture lines */}
            {fractureProgress > 0 && (
              <svg
                width="1000"
                height="60"
                viewBox="0 0 1000 60"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  opacity: fractureProgress,
                }}
              >
                <line
                  x1="340"
                  y1="0"
                  x2="360"
                  y2="60"
                  stroke={colors.oldRose}
                  strokeWidth={2}
                />
                <line
                  x1="350"
                  y1="10"
                  x2="380"
                  y2="50"
                  stroke={colors.oldRose}
                  strokeWidth={1.5}
                />
                <line
                  x1="345"
                  y1="25"
                  x2="370"
                  y2="35"
                  stroke={colors.oldRose}
                  strokeWidth={1}
                />
              </svg>
            )}
          </div>

          {/* Percentage label */}
          <div
            style={{
              fontSize: 20,
              color: colors.chineseSilver,
              marginTop: 10,
              textAlign: "left",
              paddingLeft: `${Math.min(fillWidth, 30)}%`,
            }}
          >
            {fillWidth > 5 ? `~${Math.round(fillWidth)}%` : ""}
          </div>
        </div>

        {/* Stat callout */}
        <div
          style={{
            opacity: statOpacity,
            transform: `translateY(${statY}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 56,
              fontWeight: "bold",
              color: colors.oldRose,
            }}
          >
            20–40%
          </div>
          <div
            style={{
              fontSize: 26,
              color: colors.white,
              opacity: 0.8,
            }}
          >
            of enterprise AI initiatives deliver real results
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
