import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene3GoingInCircles: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 200 },
  });

  // Rotation for the circular arrow
  const rotation = frame * 1.5;

  // Orbiting dots
  const dotCount = 5;

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
            fontSize: 48,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: interpolate(titleProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(titleProgress, [0, 1], [30, 0])}px)`,
            lineHeight: 1.2,
          }}
        >
          Going in
          <br />
          <span style={{ color: colors.turkishRose }}>Circles</span>
        </div>

        {/* Circular path with orbiting dots */}
        <div
          style={{
            position: "relative",
            width: 280,
            height: 280,
          }}
        >
          {/* Dashed circle */}
          <svg
            width="280"
            height="280"
            viewBox="0 0 280 280"
            fill="none"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
            }}
          >
            <circle
              cx="140"
              cy="140"
              r="110"
              stroke={`${colors.oldRose}30`}
              strokeWidth={2}
              strokeDasharray="8 6"
              fill="none"
            />
            {/* Circular arrow */}
            <g style={{ transform: `rotate(${rotation}deg)`, transformOrigin: "140px 140px" }}>
              <path
                d="M140 30 A110 110 0 0 1 248 100"
                stroke={colors.oldRose}
                strokeWidth={3}
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M242 85 L248 100 L234 98"
                stroke={colors.oldRose}
                strokeWidth={3}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>

          {/* Orbiting project dots */}
          {Array.from({ length: dotCount }).map((_, i) => {
            const angle =
              ((i / dotCount) * Math.PI * 2 + (frame * 0.02)) % (Math.PI * 2);
            const x = 140 + Math.cos(angle) * 110 - 14;
            const y = 140 + Math.sin(angle) * 110 - 14;
            const dotColors = [
              colors.tiffanyBlue,
              colors.turkishRose,
              colors.caribbeanGreen,
              colors.corn,
              colors.metallicBlue,
            ];

            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: x,
                  top: y,
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  backgroundColor: `${dotColors[i]}20`,
                  border: `2px solid ${dotColors[i]}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="2" y="2" width="10" height="10" rx="2" stroke={dotColors[i]} strokeWidth={1.5} />
                </svg>
              </div>
            );
          })}

          {/* Center - no progress indicator */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 36, fontWeight: 700, color: colors.oldRose }}>
              0%
            </div>
            <div style={{ fontSize: 16, color: colors.rhythm }}>
              progress
            </div>
          </div>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: colors.chineseSilver,
            textAlign: "center",
            opacity: interpolate(
              spring({ frame, fps, delay: 40, config: { damping: 200 } }),
              [0, 1],
              [0, 1]
            ),
          }}
        >
          Multiple projects, zero completion
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
