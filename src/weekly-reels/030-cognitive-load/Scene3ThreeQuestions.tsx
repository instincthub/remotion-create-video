import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const questions = [
  {
    text: "Am I thinking or just reviewing?",
    color: colors.tiffanyBlue,
    icon: "question",
  },
  {
    text: "Am I prompting without progress?",
    color: colors.corn,
    icon: "refresh",
  },
  {
    text: "Am I tired after short sessions?",
    color: colors.oldRose,
    icon: "tired",
  },
];

export const Scene3ThreeQuestions: React.FC = () => {
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
          gap: 36,
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
          Ask <span style={{ color: colors.turkishRose }}>Yourself</span>
        </div>

        {/* Question cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            width: "100%",
            maxWidth: 650,
          }}
        >
          {questions.map((q, i) => {
            const cardEntrance = spring({
              frame,
              fps,
              delay: 30 + i * 40,
              config: { damping: 14, stiffness: 80 },
            });

            const rotateZ = interpolate(cardEntrance, [0, 0.5], [3, 0], {
              extrapolateRight: "clamp",
            });

            return (
              <div
                key={q.text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  padding: "20px 24px",
                  borderRadius: 16,
                  backgroundColor: `${q.color}08`,
                  border: `2px solid ${q.color}30`,
                  opacity: interpolate(cardEntrance, [0, 1], [0, 1]),
                  transform: `translateY(${interpolate(cardEntrance, [0, 1], [40, 0])}px) rotate(${rotateZ}deg)`,
                }}
              >
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" style={{ flexShrink: 0 }}>
                  {q.icon === "question" && (
                    <>
                      <circle cx="22" cy="22" r="18" stroke={q.color} strokeWidth={2} fill={`${q.color}10`} />
                      <text x="22" y="28" textAnchor="middle" fill={q.color} fontSize="22" fontWeight="700" fontFamily={fontFamily}>?</text>
                    </>
                  )}
                  {q.icon === "refresh" && (
                    <>
                      <circle cx="22" cy="22" r="18" stroke={q.color} strokeWidth={2} fill={`${q.color}10`} />
                      <path d="M14 22 A8 8 0 0 1 30 22" stroke={q.color} strokeWidth={2} fill="none" strokeLinecap="round" />
                      <path d="M30 22 A8 8 0 0 1 14 22" stroke={q.color} strokeWidth={2} fill="none" strokeLinecap="round" />
                      <path d="M28 17 L30 22 L25 22" stroke={q.color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </>
                  )}
                  {q.icon === "tired" && (
                    <>
                      <circle cx="22" cy="22" r="18" stroke={q.color} strokeWidth={2} fill={`${q.color}10`} />
                      <line x1="16" y1="18" x2="19" y2="20" stroke={q.color} strokeWidth={2} strokeLinecap="round" />
                      <line x1="28" y1="18" x2="25" y2="20" stroke={q.color} strokeWidth={2} strokeLinecap="round" />
                      <path d="M16 30 Q22 26 28 30" stroke={q.color} strokeWidth={2} fill="none" strokeLinecap="round" />
                    </>
                  )}
                </svg>
                <span style={{ fontSize: 22, color: colors.chineseSilver, fontWeight: 400, lineHeight: 1.4 }}>
                  {q.text}
                </span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
