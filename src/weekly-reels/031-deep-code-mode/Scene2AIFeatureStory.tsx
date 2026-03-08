import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const checks = [
  { label: "UI Working", delay: 30 },
  { label: "Backend Working", delay: 80 },
  { label: "Tests Passing", delay: 130 },
];

export const Scene2AIFeatureStory: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 200 },
  });

  // Question mark appears after all checks
  const questionEntrance = spring({
    frame,
    fps,
    delay: 250,
    config: { damping: 14, stiffness: 80 },
  });
  const questionScale = interpolate(questionEntrance, [0, 1], [0, 1]);

  // Dim checkmarks when question appears
  const checksDim = interpolate(frame, [250, 350], [1, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
        {/* Checkmark boxes */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            width: "100%",
            maxWidth: 550,
            opacity: checksDim,
          }}
        >
          {checks.map((check, i) => {
            const checkEntrance = spring({
              frame,
              fps,
              delay: check.delay,
              config: { damping: 14, stiffness: 80 },
            });

            return (
              <div
                key={check.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "16px 24px",
                  borderRadius: 14,
                  backgroundColor: `${colors.caribbeanGreen}08`,
                  border: `1.5px solid ${colors.caribbeanGreen}30`,
                  opacity: interpolate(checkEntrance, [0, 1], [0, 1]),
                  transform: `translateX(${interpolate(checkEntrance, [0, 1], [40, 0])}px)`,
                }}
              >
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <rect x="4" y="4" width="28" height="28" rx="6" stroke={colors.caribbeanGreen} strokeWidth={2} fill={`${colors.caribbeanGreen}15`} />
                  <path d="M11 18 L16 23 L25 13" stroke={colors.caribbeanGreen} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontSize: 26, color: colors.caribbeanGreen, fontWeight: 700 }}>
                  {check.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Large question mark */}
        <div
          style={{
            transform: `scale(${questionScale})`,
          }}
        >
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <circle cx="60" cy="60" r="50" fill={`${colors.corn}10`} stroke={colors.corn} strokeWidth={3} />
            <text x="60" y="72" textAnchor="middle" fill={colors.corn} fontSize="52" fontWeight="700" fontFamily={fontFamily}>
              ?
            </text>
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: interpolate(titleProgress, [0, 1], [0, 1]),
            lineHeight: 1.3,
            maxWidth: 550,
          }}
        >
          Everything Works...
          <br />
          <span style={{ color: colors.corn }}>But Do You Understand It?</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
