import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Rule-based flowchart (Traditional Software side)
const Flowchart: React.FC<{ progress: number }> = ({ progress }) => {
  const nodes = [
    { x: 120, y: 80, w: 160, h: 50, label: "IF condition" },
    { x: 60, y: 200, w: 120, h: 50, label: "Action A" },
    { x: 200, y: 200, w: 120, h: 50, label: "Action B" },
    { x: 120, y: 320, w: 140, h: 50, label: "Output" },
  ];

  return (
    <svg width="400" height="420" viewBox="0 0 400 420" style={{ opacity: progress }}>
      {/* Nodes */}
      {nodes.map((n, i) => {
        const nodeOpacity = interpolate(progress, [i * 0.2, i * 0.2 + 0.3], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <g key={i} opacity={nodeOpacity}>
            <rect
              x={n.x}
              y={n.y}
              width={n.w}
              height={n.h}
              rx={i === 0 ? 0 : 8}
              fill="none"
              stroke={colors.darkSlateGray}
              strokeWidth={2}
              transform={i === 0 ? `rotate(45 ${n.x + n.w / 2} ${n.y + n.h / 2}) scale(0.7)` : ""}
            />
            <text
              x={n.x + n.w / 2}
              y={n.y + n.h / 2 + 5}
              textAnchor="middle"
              fontSize="20"
              fontWeight="bold"
              fill={colors.darkSlateGray}
            >
              {n.label}
            </text>
          </g>
        );
      })}

      {/* Arrows */}
      <line x1={160} y1={130} x2={100} y2={195} stroke={colors.darkSlateGray} strokeWidth={2} opacity={progress > 0.3 ? 1 : 0} />
      <line x1={230} y1={130} x2={270} y2={195} stroke={colors.darkSlateGray} strokeWidth={2} opacity={progress > 0.3 ? 1 : 0} />
      <line x1={120} y1={255} x2={160} y2={315} stroke={colors.darkSlateGray} strokeWidth={2} opacity={progress > 0.6 ? 1 : 0} />
      <line x1={260} y1={255} x2={210} y2={315} stroke={colors.darkSlateGray} strokeWidth={2} opacity={progress > 0.6 ? 1 : 0} />

      {/* Labels */}
      <text x={110} y={170} fontSize="18" fill={colors.caribbeanGreen} fontWeight="bold" opacity={progress > 0.4 ? 1 : 0}>Yes</text>
      <text x={250} y={170} fontSize="18" fill={colors.oldRose} fontWeight="bold" opacity={progress > 0.4 ? 1 : 0}>No</text>
    </svg>
  );
};

// Neural network graphic (ML side)
const NeuralNetwork: React.FC<{ progress: number }> = ({ progress }) => {
  const frame = useCurrentFrame();

  const layers = [
    [{ y: 100 }, { y: 200 }, { y: 300 }],
    [{ y: 80 }, { y: 160 }, { y: 240 }, { y: 320 }],
    [{ y: 120 }, { y: 220 }, { y: 320 }],
    [{ y: 160 }, { y: 260 }],
  ];
  const layerX = [60, 160, 260, 360];

  return (
    <svg width="420" height="420" viewBox="0 0 420 420" style={{ opacity: progress }}>
      {/* Connections */}
      {layers.map((layer, li) => {
        if (li === layers.length - 1) return null;
        return layer.map((node, ni) =>
          layers[li + 1].map((next, nj) => {
            const pulse = Math.sin((frame * 0.06 + ni + nj + li) * 2) * 0.3 + 0.7;
            return (
              <line
                key={`${li}-${ni}-${nj}`}
                x1={layerX[li]}
                y1={node.y}
                x2={layerX[li + 1]}
                y2={next.y}
                stroke={colors.tiffanyBlue}
                strokeWidth={1.5}
                opacity={pulse * progress}
              />
            );
          }),
        );
      })}

      {/* Nodes */}
      {layers.map((layer, li) =>
        layer.map((node, ni) => {
          const pulse = Math.sin((frame * 0.07 + ni * 0.9 + li) * 2) * 0.3 + 0.7;
          return (
            <g key={`n-${li}-${ni}`}>
              <circle
                cx={layerX[li]}
                cy={node.y}
                r={16}
                fill={colors.darkCyra}
                opacity={pulse * 0.15 * progress}
              />
              <circle
                cx={layerX[li]}
                cy={node.y}
                r={8}
                fill={colors.darkCyra}
                opacity={pulse * progress}
              />
            </g>
          );
        }),
      )}

      {/* Layer labels */}
      <text x={60} y={385} textAnchor="middle" fontSize="17" fill={colors.rhythm} fontWeight="bold" opacity={progress}>Input</text>
      <text x={160} y={385} textAnchor="middle" fontSize="17" fill={colors.rhythm} fontWeight="bold" opacity={progress}>Hidden</text>
      <text x={260} y={385} textAnchor="middle" fontSize="17" fill={colors.rhythm} fontWeight="bold" opacity={progress}>Hidden</text>
      <text x={360} y={385} textAnchor="middle" fontSize="17" fill={colors.rhythm} fontWeight="bold" opacity={progress}>Output</text>
    </svg>
  );
};

export const Scene2NotSmarterSoftware: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title entrance
  const titleProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 200 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [-40, 0]);

  // Left panel slides in
  const leftSlide = interpolate(frame, [1 * fps, 3 * fps], [-500, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const leftOpacity = interpolate(frame, [1 * fps, 3 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Right panel slides in
  const rightSlide = interpolate(frame, [2 * fps, 4 * fps], [500, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rightOpacity = interpolate(frame, [2 * fps, 4 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Diagrams progress
  const flowchartProgress = interpolate(frame, [3 * fps, 8 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const networkProgress = interpolate(frame, [4 * fps, 9 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // VS badge
  const vsProgress = spring({
    frame,
    fps,
    delay: 3 * fps,
    config: { damping: 10, stiffness: 150 },
  });
  const vsScale = interpolate(vsProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.white,
        fontFamily,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 56,
          fontWeight: "bold",
          color: colors.darkSlateGray,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        AI is <span style={{ color: colors.oldRose }}>not</span> just smarter software.
      </div>

      {/* Split screen container */}
      <div
        style={{
          position: "absolute",
          top: 180,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
        }}
      >
        {/* Left: Traditional Software */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 40,
            opacity: leftOpacity,
            transform: `translateX(${leftSlide}px)`,
            borderRight: `2px solid ${colors.chineseSilver}40`,
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: "bold",
              color: colors.darkSlateGray,
              marginBottom: 12,
            }}
          >
            Traditional Software
          </div>
          <div
            style={{
              fontSize: 18,
              color: colors.rhythm,
              marginBottom: 30,
            }}
          >
            Rules define behaviour
          </div>
          <Flowchart progress={flowchartProgress} />
        </div>

        {/* Right: Machine Learning */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 40,
            opacity: rightOpacity,
            transform: `translateX(${rightSlide}px)`,
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: "bold",
              color: colors.darkCyra,
              marginBottom: 12,
            }}
          >
            Machine Learning
          </div>
          <div
            style={{
              fontSize: 18,
              color: colors.rhythm,
              marginBottom: 30,
            }}
          >
            Data defines behaviour
          </div>
          <NeuralNetwork progress={networkProgress} />
        </div>
      </div>

      {/* VS badge */}
      <div
        style={{
          position: "absolute",
          top: 460,
          left: "50%",
          transform: `translateX(-50%) scale(${vsScale})`,
          backgroundColor: colors.gunmetal,
          color: colors.white,
          fontSize: 22,
          fontWeight: "bold",
          width: 64,
          height: 64,
          borderRadius: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        VS
      </div>
    </AbsoluteFill>
  );
};
