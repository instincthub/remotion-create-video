import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const LAYERS = [
  {
    label: "Code",
    icon: "{ }",
    color: colors.metallicBlue,
    description: "Application logic & pipelines",
  },
  {
    label: "Model",
    icon: "ML",
    color: colors.darkCyra,
    description: "Trained weights & parameters",
  },
  {
    label: "Data",
    icon: "DB",
    color: colors.deepGreenCyanTurquoise,
    description: "Training sets & feature stores",
  },
];

export const Scene5DevOps: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [-30, 0]);

  // "Traditional" label
  const tradProgress = spring({
    frame,
    fps,
    delay: fps,
    config: { damping: 12, stiffness: 80 },
  });
  const tradOpacity = interpolate(tradProgress, [0, 1], [0, 1]);

  // Layer entrances (staggered from bottom up)
  const layerEntrances = LAYERS.map((_, i) =>
    spring({
      frame,
      fps,
      delay: Math.round(fps * 2.5) + (LAYERS.length - 1 - i) * 20,
      config: { damping: 12, stiffness: 70 },
    }),
  );

  // Connection arrows between layers
  const arrowProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 5),
    config: { damping: 14, stiffness: 80 },
  });
  const arrowOpacity = interpolate(arrowProgress, [0, 1], [0, 0.6]);

  // Highlight cascade
  const cascadePhase = interpolate(
    frame,
    [7 * fps, 9 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Bottom insight
  const bottomProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 10),
    config: { damping: 14, stiffness: 80 },
  });
  const bottomOpacity = interpolate(bottomProgress, [0, 1], [0, 1]);

  const stackCenterX = 960;
  const stackStartY = 220;
  const layerHeight = 120;
  const layerGap = 30;

  return (
    <AbsoluteFill
      style={{
        background: colors.magnolia,
        fontFamily,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 55,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 50,
            fontWeight: 700,
            color: colors.darkSlateGray,
          }}
        >
          Version Three Things:{" "}
          <span style={{ color: colors.darkCyra }}>Code. Model. Data.</span>
        </div>
      </div>

      {/* Traditional vs AI comparison labels */}
      <div
        style={{
          position: "absolute",
          top: 170,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 400,
          opacity: tradOpacity,
        }}
      >
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: colors.rhythm,
            textAlign: "center",
          }}
        >
          Traditional Software
        </div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: colors.darkCyra,
            textAlign: "center",
          }}
        >
          AI Systems
        </div>
      </div>

      {/* Traditional: single code block */}
      <div
        style={{
          position: "absolute",
          left: 200,
          top: stackStartY + 40,
          opacity: tradOpacity,
        }}
      >
        <svg width="400" height={layerHeight * 3 + layerGap * 2}>
          <rect
            x={50}
            y={0}
            width={300}
            height={layerHeight * 3 + layerGap * 2}
            rx={16}
            fill={`${colors.rhythm}10`}
            stroke={colors.rhythm}
            strokeWidth={2}
            strokeDasharray="6 4"
          />
          <text
            x={200}
            y={(layerHeight * 3 + layerGap * 2) / 2 - 10}
            textAnchor="middle"
            fill={colors.rhythm}
            fontSize={32}
            fontWeight={700}
            fontFamily={fontFamily}
          >
            {"{ } Code"}
          </text>
          <text
            x={200}
            y={(layerHeight * 3 + layerGap * 2) / 2 + 28}
            textAnchor="middle"
            fill={colors.rhythm}
            fontSize={18}
            fontFamily={fontFamily}
            opacity={0.6}
          >
            Version code only
          </text>
        </svg>
      </div>

      {/* AI: three-layer stack */}
      <AbsoluteFill style={{ paddingBottom: 200 }}>
        <svg width="1920" height="880" viewBox="0 0 1920 880">
          {LAYERS.map((layer, i) => {
            const entrance = layerEntrances[i];
            const opacity = interpolate(entrance, [0, 1], [0, 1]);
            const slideY = interpolate(entrance, [0, 1], [60, 0]);
            const y = stackStartY + i * (layerHeight + layerGap);
            const isHighlighted = cascadePhase > i * 0.3;
            const highlightGlow = isHighlighted
              ? Math.sin(frame * 0.08 + i) * 0.2 + 0.8
              : 1;

            return (
              <g
                key={layer.label}
                opacity={opacity}
                transform={`translate(${stackCenterX + 200}, ${y + slideY})`}
              >
                {/* Layer box */}
                <rect
                  x={-250}
                  y={0}
                  width={500}
                  height={layerHeight}
                  rx={14}
                  fill={
                    isHighlighted
                      ? `${layer.color}18`
                      : `${layer.color}10`
                  }
                  stroke={layer.color}
                  strokeWidth={isHighlighted ? 3 : 2}
                  opacity={highlightGlow}
                />

                {/* Icon circle */}
                <circle
                  cx={-180}
                  cy={layerHeight / 2}
                  r={28}
                  fill={`${layer.color}25`}
                  stroke={layer.color}
                  strokeWidth={2}
                />
                <text
                  x={-180}
                  y={layerHeight / 2 + 7}
                  textAnchor="middle"
                  fill={layer.color}
                  fontSize={18}
                  fontWeight={700}
                  fontFamily={fontFamily}
                >
                  {layer.icon}
                </text>

                {/* Label */}
                <text
                  x={-80}
                  y={layerHeight / 2 - 5}
                  fill={colors.gunmetal}
                  fontSize={28}
                  fontWeight={700}
                  fontFamily={fontFamily}
                >
                  {layer.label}
                </text>
                <text
                  x={-80}
                  y={layerHeight / 2 + 24}
                  fill={colors.rhythm}
                  fontSize={18}
                  fontFamily={fontFamily}
                >
                  {layer.description}
                </text>

                {/* Version tag */}
                <rect
                  x={150}
                  y={layerHeight / 2 - 14}
                  width={70}
                  height={28}
                  rx={6}
                  fill={`${layer.color}20`}
                />
                <text
                  x={185}
                  y={layerHeight / 2 + 6}
                  textAnchor="middle"
                  fill={layer.color}
                  fontSize={16}
                  fontWeight={700}
                  fontFamily={fontFamily}
                >
                  v{i + 1}.{i * 2}
                </text>
              </g>
            );
          })}

          {/* Cascade arrows between layers */}
          {[0, 1].map((i) => {
            const y1 = stackStartY + i * (layerHeight + layerGap) + layerHeight;
            const y2 = stackStartY + (i + 1) * (layerHeight + layerGap);
            return (
              <g key={`arrow-${i}`} opacity={arrowOpacity}>
                <line
                  x1={stackCenterX + 200}
                  y1={y1}
                  x2={stackCenterX + 200}
                  y2={y2}
                  stroke={colors.gunmetal}
                  strokeWidth={2}
                  strokeDasharray="6 4"
                />
                <polygon
                  points={`${stackCenterX + 195},${y2 - 5} ${stackCenterX + 200},${y2 + 3} ${stackCenterX + 205},${y2 - 5}`}
                  fill={colors.gunmetal}
                  opacity={0.6}
                />
                <text
                  x={stackCenterX + 225}
                  y={(y1 + y2) / 2 + 5}
                  fill={colors.rhythm}
                  fontSize={15}
                  fontFamily={fontFamily}
                >
                  changes
                </text>
              </g>
            );
          })}
        </svg>
      </AbsoluteFill>

      {/* Bottom insight */}
      <div
        style={{
          position: "absolute",
          bottom: 230,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: bottomOpacity,
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: `${colors.deepGreenCyanTurquoise}12`,
            padding: "12px 28px",
            borderRadius: 10,
            border: `1px solid ${colors.deepGreenCyanTurquoise}30`,
          }}
        >
          <span
            style={{
              fontSize: 26,
              color: colors.gunmetal,
              fontWeight: 700,
            }}
          >
            Change the data. You change the model. You change system behavior.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
