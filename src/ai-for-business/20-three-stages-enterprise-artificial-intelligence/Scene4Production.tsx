import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Pipeline flow animation from Dev to Prod
const PipelineFlow: React.FC<{ progress: number }> = ({ progress }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const flowOffset = (frame * 3) % 50;

  // Centered: 4 boxes evenly across 1920px
  // Total span ~1200px, centered: start at 360, spacing 400
  const stages = [
    { x: 360, label: "DEV", color: colors.tiffanyBlue },
    { x: 680, label: "MANUAL\nCLEAN", color: colors.oldRose },
    { x: 1060, label: "AUTOMATE", color: colors.caribbeanGreen },
    { x: 1440, label: "PROD", color: colors.darkCyra },
  ];

  const BOX_W = 200;
  const BOX_H = 110;
  const HALF_W = BOX_W / 2;
  const CY = 120; // vertical center of boxes

  return (
    <div
      style={{
        position: "absolute",
        top: 320,
        left: 0,
        width: "100%",
        opacity,
      }}
    >
      <svg width="1920" height="360" viewBox="0 0 1920 360">
        {/* Connection lines */}
        {stages.slice(0, -1).map((stage, i) => {
          const next = stages[i + 1];
          const isWarning = i === 1;
          return (
            <g key={`line-${i}`}>
              <line
                x1={stage.x + HALF_W + 8}
                y1={CY}
                x2={next.x - HALF_W - 20}
                y2={CY}
                stroke={isWarning ? colors.caribbeanGreen : colors.chineseSilver}
                strokeWidth={3}
                strokeDasharray={isWarning ? "8 5" : "none"}
                strokeDashoffset={isWarning ? -flowOffset : 0}
              />
              <polygon
                points={`${next.x - HALF_W - 22},${CY - 7} ${next.x - HALF_W - 8},${CY} ${next.x - HALF_W - 22},${CY + 7}`}
                fill={isWarning ? colors.caribbeanGreen : colors.chineseSilver}
              />
            </g>
          );
        })}

        {/* Stage boxes */}
        {stages.map((stage, i) => {
          const pulse =
            i === 2
              ? Math.sin(frame * 0.06) * 0.15 + 0.85
              : 1;
          return (
            <g key={`stage-${i}`}>
              <rect
                x={stage.x - HALF_W}
                y={CY - BOX_H / 2}
                width={BOX_W}
                height={BOX_H}
                rx={14}
                fill={`${stage.color}12`}
                stroke={stage.color}
                strokeWidth={2.5}
                opacity={pulse}
              />
              {stage.label.split("\n").map((line, li) => (
                <text
                  key={`text-${i}-${li}`}
                  x={stage.x}
                  y={stage.label.includes("\n") ? CY - 6 + li * 28 : CY + 8}
                  textAnchor="middle"
                  fill={stage.color}
                  fontSize={24}
                  fontWeight={700}
                  fontFamily={fontFamily}
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}

        {/* Warning X on manual */}
        <g>
          <circle
            cx={680}
            cy={CY - BOX_H / 2 - 18}
            r={16}
            fill={colors.oldRose}
            opacity={0.9}
          />
          <line
            x1={672}
            y1={CY - BOX_H / 2 - 26}
            x2={688}
            y2={CY - BOX_H / 2 - 10}
            stroke={colors.white}
            strokeWidth={3}
            strokeLinecap="round"
          />
          <line
            x1={688}
            y1={CY - BOX_H / 2 - 26}
            x2={672}
            y2={CY - BOX_H / 2 - 10}
            stroke={colors.white}
            strokeWidth={3}
            strokeLinecap="round"
          />
        </g>

        {/* Checkmark on automate */}
        <g>
          <circle
            cx={1060}
            cy={CY - BOX_H / 2 - 18}
            r={16}
            fill={colors.caribbeanGreen}
            opacity={0.9}
          />
          <polyline
            points={`${1060 - 8},${CY - BOX_H / 2 - 18} ${1060 - 2},${CY - BOX_H / 2 - 12} ${1060 + 10},${CY - BOX_H / 2 - 24}`}
            fill="none"
            stroke={colors.white}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
};

export const Scene4Production: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Main text
  const line1Progress = spring({
    frame,
    fps,
    delay: Math.round(fps * 1),
    config: { damping: 12, stiffness: 80 },
  });
  const line1Opacity = interpolate(line1Progress, [0, 1], [0, 1]);
  const line1Y = interpolate(line1Progress, [0, 1], [30, 0]);

  const line2Progress = spring({
    frame,
    fps,
    delay: Math.round(fps * 4),
    config: { damping: 12, stiffness: 80 },
  });
  const line2Opacity = interpolate(line2Progress, [0, 1], [0, 1]);
  const line2Y = interpolate(line2Progress, [0, 1], [30, 0]);

  // Pipeline
  const pipelineProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 7),
    config: { damping: 14, stiffness: 80 },
  });

  // Warning text
  const warningProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 12),
    config: { damping: 10, stiffness: 70 },
  });
  const warningOpacity = interpolate(warningProgress, [0, 1], [0, 1]);
  const warningScale = interpolate(warningProgress, [0, 1], [0.9, 1]);

  return (
    <AbsoluteFill
      style={{
        background: colors.darkNavy,
        fontFamily,
      }}
    >
      {/* Main text */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 100,
          zIndex: 10,
        }}
      >
        <div
          style={{
            opacity: line1Opacity,
            transform: `translateY(${line1Y}px)`,
            fontSize: 48,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          What you{" "}
          <span style={{ color: colors.tiffanyBlue }}>clean</span> in
          development
        </div>

        <div
          style={{
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px)`,
            fontSize: 48,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            lineHeight: 1.4,
            marginTop: 12,
          }}
        >
          must{" "}
          <span style={{ color: colors.caribbeanGreen }}>run</span> in
          production.
        </div>
      </AbsoluteFill>

      {/* Pipeline diagram */}
      <PipelineFlow progress={pipelineProgress} />

      {/* Warning */}
      <div
        style={{
          position: "absolute",
          bottom: 240,
          width: "100%",
          textAlign: "center",
          opacity: warningOpacity,
          transform: `scale(${warningScale})`,
        }}
      >
        <div
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: colors.oldRose,
          }}
        >
          If you do not automate it, your model will fail.
        </div>
      </div>
    </AbsoluteFill>
  );
};
