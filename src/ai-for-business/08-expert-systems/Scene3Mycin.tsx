import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Doctor silhouette
const DoctorSilhouette: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [fps, 2 * fps], [0, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        <g transform="translate(200, 200)">
          {/* Head */}
          <circle cx={100} cy={60} r={50} fill={colors.darkCyra} />
          {/* Body */}
          <path
            d="M 50 110 Q 50 160 30 250 L 170 250 Q 150 160 150 110 Z"
            fill={colors.darkCyra}
          />
          {/* Stethoscope hint */}
          <path
            d="M 80 130 Q 60 180 100 200"
            fill="none"
            stroke={colors.tiffanyBlue}
            strokeWidth={3}
          />
          <circle cx={100} cy={205} r={8} fill={colors.tiffanyBlue} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};

// Decision tree branching
const DecisionTree: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const treeNodes = [
    { x: 960, y: 200, label: "Patient", level: 0 },
    { x: 720, y: 350, label: "Fever?", level: 1 },
    { x: 1200, y: 350, label: "Culture?", level: 1 },
    { x: 580, y: 500, label: "Bacteria\nType A", level: 2 },
    { x: 860, y: 500, label: "Bacteria\nType B", level: 2 },
    { x: 1060, y: 500, label: "Gram+", level: 2 },
    { x: 1340, y: 500, label: "Gram\u2212", level: 2 },
    { x: 580, y: 650, label: "Drug X", level: 3 },
    { x: 860, y: 650, label: "Drug Y", level: 3 },
    { x: 1060, y: 650, label: "Drug Z", level: 3 },
    { x: 1340, y: 650, label: "Drug W", level: 3 },
  ];

  const treeEdges = [
    [0, 1], [0, 2],
    [1, 3], [1, 4],
    [2, 5], [2, 6],
    [3, 7], [4, 8], [5, 9], [6, 10],
  ];

  return (
    <AbsoluteFill>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        {treeEdges.map(([a, b], i) => {
          const from = treeNodes[a];
          const to = treeNodes[b];
          const edgeDelay = 3 * fps + from.level * fps;
          const drawProgress = interpolate(
            frame,
            [edgeDelay, edgeDelay + 20],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <line
              key={`edge-${i}`}
              x1={from.x}
              y1={from.y + 25}
              x2={from.x + (to.x - from.x) * drawProgress}
              y2={from.y + 25 + (to.y - 25 - from.y - 25) * drawProgress}
              stroke={colors.tiffanyBlue}
              strokeWidth={2}
              opacity={0.7}
            />
          );
        })}

        {treeNodes.map((node, i) => {
          const nodeDelay = 2.5 * fps + node.level * fps;
          const nodeProgress = spring({
            frame,
            fps,
            delay: nodeDelay,
            config: { damping: 200 },
          });
          const nodeOpacity = interpolate(nodeProgress, [0, 1], [0, 1]);
          const nodeScale = interpolate(nodeProgress, [0, 1], [0.5, 1]);

          const isLeaf = node.level === 3;
          const boxColor = isLeaf ? colors.caribbeanGreen : colors.darkCyra;

          return (
            <g
              key={`node-${i}`}
              opacity={nodeOpacity}
              transform={`translate(${node.x}, ${node.y}) scale(${nodeScale})`}
            >
              <rect
                x={-55}
                y={-20}
                width={110}
                height={40}
                rx={isLeaf ? 20 : 6}
                fill={`${boxColor}20`}
                stroke={boxColor}
                strokeWidth={1.5}
              />
              {node.label.split("\n").map((line, li) => (
                <text
                  key={li}
                  x={0}
                  y={li * 16 - (node.label.includes("\n") ? 4 : 0) + 5}
                  textAnchor="middle"
                  fontSize={13}
                  fontWeight="bold"
                  fill={colors.darkSlateGray}
                  fontFamily="Inter, sans-serif"
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

// Explanation pop-ups
const ExplanationPopup: React.FC<{
  text: string;
  delay: number;
  x: number;
  y: number;
}> = ({ text, delay, x, y }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    delay,
    config: { damping: 14, stiffness: 100 },
  });
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const scale = interpolate(progress, [0, 1], [0.8, 1]);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        padding: "10px 18px",
        backgroundColor: `${colors.darkCyra}E0`,
        borderRadius: 8,
        opacity,
        transform: `scale(${scale})`,
        fontSize: 18,
        color: colors.white,
        maxWidth: 260,
        textAlign: "center",
      }}
    >
      {text}
    </div>
  );
};

export const Scene3Mycin: React.FC = () => {
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
  const titleY = interpolate(titleProgress, [0, 1], [-30, 0]);

  // "350 rules" highlight
  const statProgress = spring({
    frame,
    fps,
    delay: 6 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const statOpacity = interpolate(statProgress, [0, 1], [0, 1]);
  const statScale = interpolate(statProgress, [0, 1], [0.8, 1]);

  // "Never used" text
  const neverProgress = spring({
    frame,
    fps,
    delay: 8 * fps,
    config: { damping: 12, stiffness: 80 },
  });
  const neverOpacity = interpolate(neverProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.white,
        fontFamily,
      }}
    >
      <DoctorSilhouette />
      <DecisionTree />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: "bold",
            color: colors.darkSlateGray,
          }}
        >
          MYCIN:{" "}
          <span style={{ color: colors.darkCyra }}>The Digital Doctor</span>
        </div>
        <div
          style={{
            fontSize: 22,
            color: colors.rhythm,
            marginTop: 8,
          }}
        >
          Stanford, 1970s
        </div>
      </div>

      {/* 350 rules stat */}
      <div
        style={{
          position: "absolute",
          top: 700,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: statOpacity,
          transform: `scale(${statScale})`,
        }}
      >
        <span
          style={{
            fontSize: 48,
            fontWeight: "bold",
            color: colors.darkCyra,
          }}
        >
          ~350 Rules
        </span>
        <span
          style={{
            fontSize: 24,
            color: colors.rhythm,
            marginLeft: 16,
          }}
        >
          from infectious disease specialists
        </span>
      </div>

      {/* "Never used in real hospitals" */}
      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: neverOpacity,
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: colors.oldRose,
          }}
        >
          But it was never used in real hospitals.
        </div>
      </div>

      {/* Explanation pop-ups */}
      <ExplanationPopup
        text="Could explain its reasoning"
        delay={4.5 * fps}
        x={1450}
        y={250}
      />
      <ExplanationPopup
        text="Competed with human experts"
        delay={5.5 * fps}
        x={1420}
        y={400}
      />
    </AbsoluteFill>
  );
};
