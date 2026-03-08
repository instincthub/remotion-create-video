import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const humanTasks = [
  { label: "Architecture Design", color: colors.turkishRose, icon: "blueprint" },
  { label: "Design Systems", color: colors.maximumRedPurple, icon: "palette" },
  { label: "Domain Logic", color: colors.corn, icon: "lightbulb" },
  { label: "Unique Selling Point", color: colors.americanPurple, icon: "star" },
];

export const Scene3HumanStrengths: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 200 },
  });

  const noteProgress = spring({
    frame,
    fps,
    delay: 100,
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
        {/* Brain icon */}
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <path
            d="M40 12 Q25 12 20 28 Q10 26 10 40 Q6 48 10 56 Q10 66 20 70 Q25 78 40 78 Q55 78 60 70 Q70 66 70 56 Q74 48 70 40 Q70 26 60 28 Q55 12 40 12Z"
            fill={`${colors.turkishRose}10`}
            stroke={colors.turkishRose}
            strokeWidth={2.5}
          />
          <path d="M40 20 L40 70" stroke={`${colors.turkishRose}30`} strokeWidth={1} strokeDasharray="3 3" />
          <path d="M22 38 Q32 42 38 35" stroke={`${colors.turkishRose}50`} strokeWidth={1.5} fill="none" />
          <path d="M42 35 Q48 42 58 38" stroke={`${colors.turkishRose}50`} strokeWidth={1.5} fill="none" />
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
          You Must <span style={{ color: colors.turkishRose }}>Own</span>
        </div>

        {/* Task cards - from left */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            width: "100%",
            maxWidth: 600,
          }}
        >
          {humanTasks.map((task, i) => {
            const cardEntrance = spring({
              frame,
              fps,
              delay: 20 + i * 15,
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
                  transform: `translateX(${interpolate(cardEntrance, [0, 1], [-60, 0])}px)`,
                }}
              >
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  {task.icon === "blueprint" && (
                    <>
                      <rect x="6" y="6" width="24" height="24" rx="2" stroke={task.color} strokeWidth={2} fill={`${task.color}10`} />
                      <line x1="6" y1="14" x2="30" y2="14" stroke={task.color} strokeWidth={1.5} />
                      <line x1="18" y1="14" x2="18" y2="30" stroke={task.color} strokeWidth={1.5} />
                    </>
                  )}
                  {task.icon === "palette" && (
                    <>
                      <circle cx="18" cy="18" r="13" stroke={task.color} strokeWidth={2} fill={`${task.color}10`} />
                      <circle cx="14" cy="13" r="3" fill={task.color} opacity={0.5} />
                      <circle cx="22" cy="13" r="3" fill={task.color} opacity={0.7} />
                      <circle cx="14" cy="23" r="3" fill={task.color} opacity={0.3} />
                    </>
                  )}
                  {task.icon === "lightbulb" && (
                    <>
                      <circle cx="18" cy="14" r="10" stroke={task.color} strokeWidth={2} fill={`${task.color}15`} />
                      <path d="M14 14 Q16 10 18 14 Q20 18 22 14" stroke={task.color} strokeWidth={1.5} fill="none" />
                      <rect x="15" y="26" width="6" height="4" rx="1" stroke={task.color} strokeWidth={1.5} />
                    </>
                  )}
                  {task.icon === "star" && (
                    <path
                      d="M18 6 L21 14 L30 14 L23 20 L26 28 L18 23 L10 28 L13 20 L6 14 L15 14 Z"
                      stroke={task.color}
                      strokeWidth={2}
                      fill={`${task.color}15`}
                      strokeLinejoin="round"
                    />
                  )}
                </svg>
                <span style={{ fontSize: 24, color: colors.chineseSilver, fontWeight: 400 }}>
                  {task.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Note */}
        <div
          style={{
            fontSize: 20,
            color: colors.rhythm,
            textAlign: "center",
            fontStyle: "italic",
            opacity: interpolate(noteProgress, [0, 1], [0, 1]),
            maxWidth: 500,
          }}
        >
          AI gives generic, you need domain-specific
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
