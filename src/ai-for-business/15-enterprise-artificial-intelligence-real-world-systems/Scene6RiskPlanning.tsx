import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

interface CausalNode {
  x: number;
  y: number;
  label: string;
}

const causalNodes: CausalNode[] = [
  { x: 250, y: 520, label: "Policy Change" },
  { x: 500, y: 420, label: "Budget Cut" },
  { x: 500, y: 620, label: "Supply Shock" },
  { x: 780, y: 370, label: "Vendor Exit" },
  { x: 780, y: 520, label: "Delay" },
  { x: 780, y: 670, label: "Cost Spike" },
  { x: 1060, y: 420, label: "Project Risk" },
  { x: 1060, y: 620, label: "Revenue Loss" },
];

const causalEdges: [number, number][] = [
  [0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [2, 5], [3, 6], [4, 6], [4, 7], [5, 7],
];

export const Scene6RiskPlanning: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 8,
    config: { damping: 12, stiffness: 80 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  // Hours comparison
  const hoursProgress = spring({
    frame,
    fps,
    delay: 1.5 * fps,
    config: { damping: 10, stiffness: 70 },
  });
  const hoursOpacity = interpolate(hoursProgress, [0, 1], [0, 1]);

  // Document morphing phase
  const docPhase = interpolate(frame, [3 * fps, 6 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scenario branching
  const branchProgress = spring({
    frame,
    fps,
    delay: 8 * fps,
    config: { damping: 10, stiffness: 50 },
  });
  const branchOpacity = interpolate(branchProgress, [0, 1], [0, 1]);

  // Document pages fading out
  const docOpacity = interpolate(docPhase, [0, 0.5, 1], [1, 0.5, 0]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.darkNavy} 0%, ${colors.darkCharcoal} 60%, #0a1a2e 100%)`,
        fontFamily,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontSize: 50,
            fontWeight: 700,
            color: colors.white,
          }}
        >
          Enterprise{" "}
          <span style={{ color: colors.caribbeanGreen }}>Risk Planning</span>
        </div>
      </div>

      {/* Hours comparison badges */}
      <div
        style={{
          position: "absolute",
          top: 150,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 50,
          opacity: hoursOpacity,
        }}
      >
        <div
          style={{
            background: `${colors.oldRose}20`,
            border: `2px solid ${colors.oldRose}50`,
            borderRadius: 14,
            padding: "14px 32px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 16, color: colors.chineseSilver }}>Traditional</div>
          <div style={{ fontSize: 38, fontWeight: 700, color: colors.oldRose }}>
            3,800 Hours
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 36,
            color: colors.chineseSilver,
          }}
        >
          →
        </div>

        <div
          style={{
            background: `${colors.caribbeanGreen}20`,
            border: `2px solid ${colors.caribbeanGreen}50`,
            borderRadius: 14,
            padding: "14px 32px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 16, color: colors.chineseSilver }}>AI-Powered</div>
          <div style={{ fontSize: 38, fontWeight: 700, color: colors.caribbeanGreen }}>
            11 Hours
          </div>
        </div>
      </div>

      {/* Document pages morphing into causal graph */}
      {/* Document pages (fade out) */}
      {Array.from({ length: 5 }).map((_, i) => {
        const docDelay = 2.5 * fps + i * 8;
        const pageProgress = spring({
          frame,
          fps,
          delay: docDelay,
          config: { damping: 12, stiffness: 80 },
        });
        const pageOpacity = interpolate(pageProgress, [0, 1], [0, docOpacity]);
        const pageX = 200 + i * 60;
        const pageY = 420 + i * 15;
        const pageRotation = -5 + i * 2.5;

        return (
          <div
            key={`doc-${i}`}
            style={{
              position: "absolute",
              left: pageX,
              top: pageY,
              width: 140,
              height: 180,
              background: `${colors.white}10`,
              border: `1px solid ${colors.chineseSilver}30`,
              borderRadius: 6,
              opacity: pageOpacity,
              transform: `rotate(${pageRotation}deg)`,
            }}
          >
            {/* Document lines */}
            {Array.from({ length: 6 }).map((_, j) => (
              <div
                key={`line-${j}`}
                style={{
                  margin: "12px 14px 0",
                  height: 6,
                  borderRadius: 3,
                  background: `${colors.chineseSilver}30`,
                  width: `${60 + Math.sin(j * 2) * 20}%`,
                }}
              />
            ))}
          </div>
        );
      })}

      {/* Causal graph (fade in) */}
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          opacity: docPhase,
        }}
      >
        {/* Causal edges with animated arrows */}
        {causalEdges.map(([from, to], i) => {
          const edgeProgress = spring({
            frame,
            fps,
            delay: 4 * fps + i * 6,
            config: { damping: 14, stiffness: 60 },
          });
          const edgeOpacity = interpolate(edgeProgress, [0, 1], [0, 0.7]);
          const pulse = interpolate(
            Math.sin(frame * 0.04 + i * 1.2),
            [-1, 1],
            [0.5, 1]
          );

          return (
            <g key={`cedge-${i}`} opacity={edgeOpacity * pulse}>
              <defs>
                <marker
                  id={`arrow-${i}`}
                  markerWidth="8"
                  markerHeight="6"
                  refX="8"
                  refY="3"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 8 3, 0 6"
                    fill={colors.tiffanyBlue}
                  />
                </marker>
              </defs>
              <line
                x1={causalNodes[from].x}
                y1={causalNodes[from].y}
                x2={causalNodes[to].x}
                y2={causalNodes[to].y}
                stroke={colors.tiffanyBlue}
                strokeWidth={2}
                markerEnd={`url(#arrow-${i})`}
              />
            </g>
          );
        })}

        {/* Causal nodes */}
        {causalNodes.map((node, i) => {
          const nodeProgress = spring({
            frame,
            fps,
            delay: 3.5 * fps + i * 8,
            config: { damping: 12, stiffness: 80 },
          });
          const nodeOpacity = interpolate(nodeProgress, [0, 1], [0, 1]);
          const nodeScale = interpolate(nodeProgress, [0, 1], [0, 1]);

          return (
            <g key={`cnode-${i}`} opacity={nodeOpacity}>
              <rect
                x={node.x - 80 * nodeScale}
                y={node.y - 26 * nodeScale}
                width={160 * nodeScale}
                height={52 * nodeScale}
                rx={12}
                fill={i < 3 ? colors.darkCyra : colors.deepGreenCyanTurquoise}
                opacity={0.9}
              />
              <text
                x={node.x}
                y={node.y + 7}
                textAnchor="middle"
                fill={colors.white}
                fontSize={18}
                fontWeight={700}
                fontFamily="Inter, sans-serif"
                opacity={nodeScale}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Scenario branches */}
      <div
        style={{
          position: "absolute",
          right: 120,
          top: 420,
          opacity: branchOpacity,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {["Scenario A", "Scenario B", "Scenario C", "Scenario D"].map((label, i) => {
          const scenarioProgress = spring({
            frame,
            fps,
            delay: 9 * fps + i * 10,
            config: { damping: 12, stiffness: 70 },
          });
          const scenarioOpacity = interpolate(scenarioProgress, [0, 1], [0, 1]);
          const scenarioX = interpolate(scenarioProgress, [0, 1], [100, 0]);
          const branchColors = [colors.caribbeanGreen, colors.tiffanyBlue, colors.corn, colors.oldRose];

          return (
            <div
              key={`scenario-${i}`}
              style={{
                opacity: scenarioOpacity,
                transform: `translateX(${scenarioX}px)`,
                background: `${branchColors[i]}15`,
                border: `1px solid ${branchColors[i]}40`,
                borderRadius: 10,
                padding: "12px 24px",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: branchColors[i],
                }}
              />
              <span style={{ fontSize: 18, color: colors.white, fontWeight: 700 }}>
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Bottom note */}
      <div
        style={{
          position: "absolute",
          bottom: 230,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 24,
            color: colors.rhythm,
            opacity: interpolate(frame, [10 * fps, 11 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          NLP + AI Planning Engine — Augmenting, Not Replacing Experts
        </div>
      </div>
    </AbsoluteFill>
  );
};
