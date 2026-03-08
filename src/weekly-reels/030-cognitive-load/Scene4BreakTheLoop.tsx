import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene4BreakTheLoop: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 200 },
  });

  // Circle breaking open
  const breakProgress = interpolate(frame, [30, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const actions = [
    { label: "Take a break", color: colors.caribbeanGreen, icon: "pause" },
    { label: "Try another approach", color: colors.tiffanyBlue, icon: "compass" },
    { label: "Get results faster", color: colors.darkCyra, icon: "rocket" },
  ];

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
            lineHeight: 1.2,
          }}
        >
          Break the <span style={{ color: colors.caribbeanGreen }}>Loop</span>
        </div>

        {/* Breaking circle → arrow */}
        <svg width="250" height="180" viewBox="0 0 250 180" fill="none">
          {/* Circular loop breaking */}
          <path
            d={
              breakProgress < 0.5
                ? "M50 90 A60 60 0 1 1 50 89.9"
                : `M50 90 A60 60 0 0 1 170 90`
            }
            stroke={breakProgress < 0.5 ? colors.oldRose : colors.caribbeanGreen}
            strokeWidth={3}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={breakProgress < 0.5 ? "8 6" : "none"}
          />
          {/* Arrow head (appears when breaking) */}
          {breakProgress > 0.5 && (
            <>
              {/* Forward arrow */}
              <path
                d="M170 90 L220 90"
                stroke={colors.caribbeanGreen}
                strokeWidth={3}
                strokeLinecap="round"
                opacity={interpolate(breakProgress, [0.5, 1], [0, 1])}
              />
              <path
                d="M210 80 L220 90 L210 100"
                stroke={colors.caribbeanGreen}
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={interpolate(breakProgress, [0.5, 1], [0, 1])}
              />
              {/* Target */}
              <circle
                cx="235"
                cy="90"
                r="10"
                stroke={colors.caribbeanGreen}
                strokeWidth={2}
                fill={`${colors.caribbeanGreen}20`}
                opacity={interpolate(breakProgress, [0.7, 1], [0, 1])}
              />
              <path
                d="M231 90 L234 93 L239 87"
                stroke={colors.caribbeanGreen}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={interpolate(breakProgress, [0.8, 1], [0, 1])}
              />
            </>
          )}
        </svg>

        {/* Action items */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            width: "100%",
            maxWidth: 600,
          }}
        >
          {actions.map((action, i) => {
            const actionEntrance = spring({
              frame,
              fps,
              delay: 120 + i * 30,
              config: { damping: 14, stiffness: 80 },
            });

            return (
              <div
                key={action.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "14px 20px",
                  borderRadius: 14,
                  backgroundColor: `${action.color}08`,
                  border: `1.5px solid ${action.color}30`,
                  opacity: interpolate(actionEntrance, [0, 1], [0, 1]),
                  transform: `translateY(${interpolate(actionEntrance, [0, 1], [20, 0])}px)`,
                }}
              >
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  {action.icon === "pause" && (
                    <>
                      <circle cx="18" cy="18" r="14" stroke={action.color} strokeWidth={2} fill={`${action.color}10`} />
                      <rect x="13" y="12" width="4" height="12" rx="1" fill={action.color} opacity={0.7} />
                      <rect x="19" y="12" width="4" height="12" rx="1" fill={action.color} opacity={0.7} />
                    </>
                  )}
                  {action.icon === "compass" && (
                    <>
                      <circle cx="18" cy="18" r="14" stroke={action.color} strokeWidth={2} fill={`${action.color}10`} />
                      <path d="M18 8 L20 16 L18 18 L16 16 Z" fill={action.color} opacity={0.6} />
                      <path d="M18 28 L16 20 L18 18 L20 20 Z" fill={action.color} opacity={0.4} />
                    </>
                  )}
                  {action.icon === "rocket" && (
                    <>
                      <path d="M18 6 Q12 14 12 22 L18 28 L24 22 Q24 14 18 6Z" stroke={action.color} strokeWidth={2} fill={`${action.color}10`} />
                      <circle cx="18" cy="16" r="3" fill={action.color} opacity={0.5} />
                      <path d="M12 22 L8 28" stroke={action.color} strokeWidth={1.5} strokeLinecap="round" />
                      <path d="M24 22 L28 28" stroke={action.color} strokeWidth={1.5} strokeLinecap="round" />
                    </>
                  )}
                </svg>
                <span style={{ fontSize: 24, color: colors.chineseSilver, fontWeight: 400 }}>
                  {action.label}
                </span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
