import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const POC_DATA = [
  { label: "POC 1", months: 3, cost: "$120K", color: colors.darkCyra },
  { label: "POC 2", months: 3, cost: "$95K", color: colors.viridianGreen },
  { label: "POC 3", months: 3, cost: "$140K", color: colors.tiffanyBlue },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];

export const Scene9TimeToValue: React.FC = () => {
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

  // Timeline
  const timelineProgress = spring({
    frame,
    fps,
    delay: fps,
    config: { damping: 14, stiffness: 60 },
  });

  // POC bars
  const pocEntrances = POC_DATA.map((_, i) =>
    spring({
      frame,
      fps,
      delay: Math.round(fps * 1.5) + i * 20,
      config: { damping: 12, stiffness: 70 },
    }),
  );

  // "25 projects" callout
  const calloutProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 6),
    config: { damping: 10, stiffness: 80 },
  });
  const calloutOpacity = interpolate(calloutProgress, [0, 1], [0, 1]);
  const calloutScale = interpolate(calloutProgress, [0, 1], [0.8, 1]);

  // Math callout
  const mathProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 9),
    config: { damping: 14, stiffness: 80 },
  });
  const mathOpacity = interpolate(mathProgress, [0, 1], [0, 1]);

  // Bottom text
  const bottomProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 12),
    config: { damping: 14, stiffness: 80 },
  });
  const bottomOpacity = interpolate(bottomProgress, [0, 1], [0, 1]);

  const timelineY = 320;
  const barHeight = 50;
  const barGap = 20;
  const monthWidth = 150;
  const startX = 220;

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
          Time To Value{" "}
          <span style={{ color: colors.darkCyra }}>Matters</span>
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
            color: colors.rhythm,
          }}
        >
          3 proofs of concept over 9 months. Just three.
        </div>
      </div>

      {/* Timeline Gantt chart */}
      <AbsoluteFill style={{ paddingBottom: 200 }}>
        <svg width="1920" height="880" viewBox="0 0 1920 880">
          {/* Month headers */}
          {MONTHS.map((month, i) => {
            const timelineOpacity = interpolate(
              timelineProgress,
              [0, 1],
              [0, 1],
            );
            return (
              <g key={month} opacity={timelineOpacity}>
                <text
                  x={startX + i * monthWidth + monthWidth / 2}
                  y={timelineY - 15}
                  textAnchor="middle"
                  fill={colors.rhythm}
                  fontSize={18}
                  fontFamily={fontFamily}
                >
                  {month}
                </text>
                <line
                  x1={startX + i * monthWidth}
                  y1={timelineY}
                  x2={startX + i * monthWidth}
                  y2={timelineY + (barHeight + barGap) * 3 + 20}
                  stroke={`${colors.chineseSilver}40`}
                  strokeWidth={1}
                  strokeDasharray="4 3"
                />
              </g>
            );
          })}

          {/* POC bars */}
          {POC_DATA.map((poc, i) => {
            const entrance = pocEntrances[i];
            const opacity = interpolate(entrance, [0, 1], [0, 1]);
            const barWidth = interpolate(
              entrance,
              [0, 1],
              [0, poc.months * monthWidth],
            );
            const y = timelineY + 10 + i * (barHeight + barGap);
            const x = startX + i * poc.months * monthWidth;

            return (
              <g key={poc.label} opacity={opacity}>
                {/* Bar */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  rx={8}
                  fill={`${poc.color}20`}
                  stroke={poc.color}
                  strokeWidth={2}
                />
                {/* Label */}
                <text
                  x={x + barWidth / 2}
                  y={y + barHeight / 2 + 6}
                  textAnchor="middle"
                  fill={poc.color}
                  fontSize={20}
                  fontWeight={700}
                  fontFamily={fontFamily}
                >
                  {poc.label}
                </text>
                {/* Cost tag */}
                <rect
                  x={x + barWidth + 12}
                  y={y + 10}
                  width={80}
                  height={30}
                  rx={6}
                  fill={`${poc.color}15`}
                />
                <text
                  x={x + barWidth + 52}
                  y={y + 30}
                  textAnchor="middle"
                  fill={poc.color}
                  fontSize={16}
                  fontWeight={700}
                  fontFamily={fontFamily}
                >
                  {poc.cost}
                </text>
              </g>
            );
          })}

          {/* 9 months span bracket */}
          {timelineProgress > 0.8 && (
            <g opacity={timelineProgress}>
              <line
                x1={startX}
                y1={timelineY + (barHeight + barGap) * 3 + 30}
                x2={startX + 9 * monthWidth}
                y2={timelineY + (barHeight + barGap) * 3 + 30}
                stroke={colors.oldRose}
                strokeWidth={2}
              />
              <text
                x={startX + 4.5 * monthWidth}
                y={timelineY + (barHeight + barGap) * 3 + 55}
                textAnchor="middle"
                fill={colors.oldRose}
                fontSize={20}
                fontWeight={700}
                fontFamily={fontFamily}
              >
                9 months for just 3 POCs
              </text>
            </g>
          )}
        </svg>
      </AbsoluteFill>

      {/* 25 projects callout */}
      <div
        style={{
          position: "absolute",
          top: 590,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 40,
          opacity: calloutOpacity,
          transform: `scale(${calloutScale})`,
        }}
      >
        <div
          style={{
            background: colors.white,
            borderRadius: 16,
            padding: "20px 36px",
            boxShadow: `0 4px 20px ${colors.darkCyra}10`,
            border: `2px solid ${colors.corn}40`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: colors.darkCyra,
            }}
          >
            25
          </div>
          <div
            style={{
              fontSize: 18,
              color: colors.rhythm,
              fontWeight: 700,
            }}
          >
            identified projects
          </div>
        </div>

        {/* Math */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            opacity: mathOpacity,
          }}
        >
          <div
            style={{
              background: `${colors.oldRose}10`,
              borderRadius: 16,
              padding: "20px 36px",
              border: `2px solid ${colors.oldRose}30`,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: colors.oldRose,
              }}
            >
              75 months
            </div>
            <div
              style={{
                fontSize: 18,
                color: colors.rhythm,
                fontWeight: 700,
              }}
            >
              at current pace
            </div>
          </div>
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
            background: `${colors.darkCyra}10`,
            padding: "12px 28px",
            borderRadius: 10,
            border: `1px solid ${colors.darkCyra}30`,
          }}
        >
          <span
            style={{
              fontSize: 26,
              color: colors.gunmetal,
              fontWeight: 700,
            }}
          >
            Speed matters. But discipline matters more.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
