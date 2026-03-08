import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const segments = [
  { label: "Coding with AI", minutes: 25, pct: 62.5, color: colors.darkCyra },
  { label: "Thinking", minutes: 10, pct: 25, color: colors.turkishRose },
  { label: "Break", minutes: 5, pct: 12.5, color: colors.caribbeanGreen },
];

export const Scene3TimeBreakdown: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 200 },
  });

  // Donut chart animation
  const radius = 90;
  const circumference = 2 * Math.PI * radius;

  let cumulativeOffset = 0;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${colors.gunmetal}, ${colors.darkSlateGray})`,
        fontFamily,
      }}
    >
      <AbsoluteFill style={{ opacity: 0.03 }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`h-${i}`}
            style={{
              position: "absolute",
              top: i * 96,
              left: 0,
              width: "100%",
              height: 1,
              backgroundColor: colors.tiffanyBlue,
            }}
          />
        ))}
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 300,
          paddingLeft: 50,
          paddingRight: 50,
          gap: 30,
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: 44,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: interpolate(titleProgress, [0, 1], [0, 1]),
            lineHeight: 1.2,
          }}
        >
          The <span style={{ color: colors.darkCyra }}>40-Minute</span> Cycle
        </div>

        {/* Donut chart */}
        <div style={{ position: "relative", width: 240, height: 240 }}>
          <svg width="240" height="240" viewBox="0 0 240 240" fill="none">
            {segments.map((seg, i) => {
              const segEntrance = spring({
                frame,
                fps,
                delay: 30 + i * 25,
                config: { damping: 20, stiffness: 60 },
              });

              const dashLength = (seg.pct / 100) * circumference;
              const offset = cumulativeOffset;
              cumulativeOffset += dashLength;

              return (
                <circle
                  key={seg.label}
                  cx="120"
                  cy="120"
                  r={radius}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth={24}
                  strokeDasharray={`${dashLength * interpolate(segEntrance, [0, 1], [0, 1])} ${circumference}`}
                  strokeDashoffset={-offset}
                  strokeLinecap="round"
                  opacity={0.8}
                  style={{
                    transform: "rotate(-90deg)",
                    transformOrigin: "120px 120px",
                  }}
                />
              );
            })}
          </svg>
          {/* Center text */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 36, fontWeight: 700, color: colors.white }}>
              40
            </div>
            <div style={{ fontSize: 16, color: colors.rhythm }}>
              minutes
            </div>
          </div>
        </div>

        {/* Legend */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            width: "100%",
            maxWidth: 500,
          }}
        >
          {segments.map((seg, i) => {
            const labelEntrance = spring({
              frame,
              fps,
              delay: 60 + i * 20,
              config: { damping: 14, stiffness: 80 },
            });

            return (
              <div
                key={seg.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  opacity: interpolate(labelEntrance, [0, 1], [0, 1]),
                  transform: `translateX(${interpolate(labelEntrance, [0, 1], [30, 0])}px)`,
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 6,
                    backgroundColor: seg.color,
                    opacity: 0.8,
                  }}
                />
                <span style={{ fontSize: 22, color: colors.chineseSilver, fontWeight: 400, flex: 1 }}>
                  {seg.label}
                </span>
                <span style={{ fontSize: 22, color: seg.color, fontWeight: 700 }}>
                  {seg.minutes} min
                </span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
