import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const MODEL_VERSIONS = [
  { version: "v1.0", date: "Jan", accuracy: 91 },
  { version: "v1.1", date: "Feb", accuracy: 89 },
  { version: "v1.2", date: "Mar", accuracy: 93 },
  { version: "v2.0", date: "Apr", accuracy: 87 },
  { version: "v2.1", date: "May", accuracy: 94 },
  { version: "v2.2", date: "Jun", accuracy: 90 },
  { version: "v3.0", date: "Jul", accuracy: 96 },
  { version: "v3.1", date: "Aug", accuracy: 88 },
];

export const Scene6ModelUpdates: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

  // Timeline base
  const timelineProgress = spring({
    frame,
    fps,
    delay: fps,
    config: { damping: 14, stiffness: 60 },
  });
  const timelineWidth = interpolate(timelineProgress, [0, 1], [0, 1400]);

  // Version markers appear progressively
  const versionEntrances = MODEL_VERSIONS.map((_, i) =>
    spring({
      frame,
      fps,
      delay: Math.round(fps * 1.5) + i * 12,
      config: { damping: 12, stiffness: 100 },
    }),
  );

  // Question callout
  const questionProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 8),
    config: { damping: 14, stiffness: 80 },
  });
  const questionOpacity = interpolate(questionProgress, [0, 1], [0, 1]);

  // Highlight a specific version (complaint scenario)
  const highlightVersion = 3; // v2.0
  const highlightProgress = interpolate(
    frame,
    [10 * fps, 11 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Bottom text
  const bottomProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 12),
    config: { damping: 14, stiffness: 80 },
  });
  const bottomOpacity = interpolate(bottomProgress, [0, 1], [0, 1]);

  const timelineY = 450;
  const timelineStartX = 260;
  const spacing = 175;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${colors.deepGreenCyanTurquoise} 0%, #143d38 100%)`,
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
        }}
      >
        <div
          style={{
            fontSize: 50,
            fontWeight: 700,
            color: colors.white,
          }}
        >
          Model Updates Change{" "}
          <span style={{ color: colors.corn }}>Behavior</span>
        </div>
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: "absolute",
          top: 130,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleOpacity * 0.7,
        }}
      >
        <div
          style={{
            fontSize: 24,
            color: `${colors.white}90`,
          }}
        >
          Models can update daily. Even hourly. Some learn continuously.
        </div>
      </div>

      {/* Timeline visualization */}
      <AbsoluteFill style={{ paddingBottom: 200 }}>
        <svg width="1920" height="880" viewBox="0 0 1920 880">
          {/* Timeline line */}
          <line
            x1={timelineStartX}
            y1={timelineY}
            x2={timelineStartX + timelineWidth}
            y2={timelineY}
            stroke={`${colors.white}40`}
            strokeWidth={3}
          />

          {/* Version markers */}
          {MODEL_VERSIONS.map((mv, i) => {
            const entrance = versionEntrances[i];
            const opacity = interpolate(entrance, [0, 1], [0, 1]);
            const scale = interpolate(entrance, [0, 1], [0.3, 1]);
            const x = timelineStartX + i * spacing;
            const isHighlighted = i === highlightVersion && highlightProgress > 0;
            const barHeight = interpolate(
              entrance,
              [0, 1],
              [0, (mv.accuracy - 80) * 12],
            );

            // Color based on accuracy
            const barColor =
              mv.accuracy >= 93
                ? colors.limeGreen
                : mv.accuracy >= 90
                  ? colors.caribbeanGreen
                  : mv.accuracy >= 88
                    ? colors.corn
                    : colors.oldRose;

            return (
              <g
                key={mv.version}
                opacity={opacity}
                transform={`translate(${x}, ${timelineY}) scale(${scale})`}
                style={{ transformOrigin: `${x}px ${timelineY}px` }}
              >
                {/* Accuracy bar going up */}
                <rect
                  x={-20}
                  y={-barHeight - 10}
                  width={40}
                  height={barHeight}
                  rx={6}
                  fill={isHighlighted ? `${colors.oldRose}40` : `${barColor}30`}
                  stroke={isHighlighted ? colors.oldRose : barColor}
                  strokeWidth={isHighlighted ? 3 : 1.5}
                />

                {/* Accuracy label above bar */}
                <text
                  x={0}
                  y={-barHeight - 22}
                  textAnchor="middle"
                  fill={isHighlighted ? colors.oldRose : colors.white}
                  fontSize={18}
                  fontWeight={700}
                  fontFamily={fontFamily}
                >
                  {mv.accuracy}%
                </text>

                {/* Dot on timeline */}
                <circle
                  cx={0}
                  cy={0}
                  r={8}
                  fill={isHighlighted ? colors.oldRose : colors.white}
                />

                {/* Version below */}
                <text
                  x={0}
                  y={30}
                  textAnchor="middle"
                  fill={isHighlighted ? colors.oldRose : colors.white}
                  fontSize={18}
                  fontWeight={700}
                  fontFamily={fontFamily}
                >
                  {mv.version}
                </text>

                {/* Date */}
                <text
                  x={0}
                  y={52}
                  textAnchor="middle"
                  fill={`${colors.white}60`}
                  fontSize={15}
                  fontFamily={fontFamily}
                >
                  {mv.date}
                </text>

                {/* Highlight ring + question */}
                {isHighlighted && (
                  <g opacity={highlightProgress}>
                    <circle
                      cx={0}
                      cy={0}
                      r={18}
                      fill="none"
                      stroke={colors.oldRose}
                      strokeWidth={2}
                      opacity={0.5 + Math.sin(frame * 0.1) * 0.3}
                    />
                    <text
                      x={0}
                      y={80}
                      textAnchor="middle"
                      fill={colors.oldRose}
                      fontSize={16}
                      fontWeight={700}
                      fontFamily={fontFamily}
                    >
                      Which version?
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </AbsoluteFill>

      {/* Question callout */}
      <div
        style={{
          position: "absolute",
          top: 600,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: questionOpacity,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            background: `${colors.oldRose}20`,
            padding: "14px 32px",
            borderRadius: 12,
            border: `1px solid ${colors.oldRose}40`,
          }}
        >
          <svg width={24} height={24} viewBox="0 0 24 24">
            <circle
              cx={12}
              cy={12}
              r={10}
              fill="none"
              stroke={colors.oldRose}
              strokeWidth={2}
            />
            <text
              x={12}
              y={17}
              textAnchor="middle"
              fill={colors.oldRose}
              fontSize={16}
              fontWeight={700}
            >
              ?
            </text>
          </svg>
          <span
            style={{
              fontSize: 24,
              color: colors.white,
              fontWeight: 700,
            }}
          >
            Customer complaint: which model version was active?
          </span>
        </div>
      </div>

      {/* Bottom text */}
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
            background: `${colors.white}12`,
            padding: "12px 28px",
            borderRadius: 10,
            border: `1px solid ${colors.white}25`,
          }}
        >
          <span
            style={{
              fontSize: 26,
              color: colors.white,
              fontWeight: 700,
            }}
          >
            Without model versioning and data lineage, you cannot answer.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
