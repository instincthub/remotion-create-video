import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const aiTasks = [
  { label: "Boilerplate Code", color: colors.tiffanyBlue, icon: "brackets" },
  { label: "Documentation", color: colors.caribbeanGreen, icon: "doc" },
  { label: "Test Generation", color: colors.limeGreen, icon: "check" },
  { label: "Refactoring", color: colors.viridianGreen, icon: "refresh" },
];

export const Scene2AIStrengths: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 200 },
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
        {/* Robot icon */}
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <rect x="16" y="20" width="48" height="44" rx="10" stroke={colors.tiffanyBlue} strokeWidth={2.5} fill={`${colors.tiffanyBlue}10`} />
          <circle cx="32" cy="38" r="5" fill={colors.tiffanyBlue} />
          <circle cx="48" cy="38" r="5" fill={colors.tiffanyBlue} />
          <path d="M30 52 Q40 60 50 52" stroke={colors.tiffanyBlue} strokeWidth={2} fill="none" strokeLinecap="round" />
          <line x1="40" y1="8" x2="40" y2="20" stroke={colors.tiffanyBlue} strokeWidth={2} />
          <circle cx="40" cy="6" r="4" stroke={colors.tiffanyBlue} strokeWidth={2} fill={`${colors.tiffanyBlue}20`} />
        </svg>

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
          Let AI <span style={{ color: colors.tiffanyBlue }}>Handle</span>
        </div>

        {/* Task cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            width: "100%",
            maxWidth: 600,
          }}
        >
          {aiTasks.map((task, i) => {
            const cardEntrance = spring({
              frame,
              fps,
              delay: 20 + i * 12,
              config: { damping: 14, stiffness: 80 },
            });

            return (
              <div
                key={task.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "14px 20px",
                  borderRadius: 14,
                  backgroundColor: `${task.color}08`,
                  border: `1.5px solid ${task.color}30`,
                  opacity: interpolate(cardEntrance, [0, 1], [0, 1]),
                  transform: `translateX(${interpolate(cardEntrance, [0, 1], [60, 0])}px)`,
                }}
              >
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  {task.icon === "brackets" && (
                    <>
                      <path d="M12 8 L6 18 L12 28" stroke={task.color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M24 8 L30 18 L24 28" stroke={task.color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                    </>
                  )}
                  {task.icon === "doc" && (
                    <>
                      <rect x="8" y="4" width="20" height="28" rx="3" stroke={task.color} strokeWidth={2} fill={`${task.color}10`} />
                      <line x1="13" y1="12" x2="23" y2="12" stroke={task.color} strokeWidth={1.5} strokeLinecap="round" />
                      <line x1="13" y1="18" x2="23" y2="18" stroke={task.color} strokeWidth={1.5} strokeLinecap="round" />
                      <line x1="13" y1="24" x2="19" y2="24" stroke={task.color} strokeWidth={1.5} strokeLinecap="round" />
                    </>
                  )}
                  {task.icon === "check" && (
                    <>
                      <circle cx="18" cy="18" r="12" stroke={task.color} strokeWidth={2} fill={`${task.color}10`} />
                      <path d="M12 18 L16 22 L24 14" stroke={task.color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                    </>
                  )}
                  {task.icon === "refresh" && (
                    <>
                      <path d="M8 18 A10 10 0 0 1 28 18" stroke={task.color} strokeWidth={2} fill="none" strokeLinecap="round" />
                      <path d="M28 18 A10 10 0 0 1 8 18" stroke={task.color} strokeWidth={2} fill="none" strokeLinecap="round" />
                      <path d="M26 12 L28 18 L22 18" stroke={task.color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </>
                  )}
                </svg>
                <span style={{ fontSize: 24, color: colors.chineseSilver, fontWeight: 400 }}>
                  {task.label}
                </span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
