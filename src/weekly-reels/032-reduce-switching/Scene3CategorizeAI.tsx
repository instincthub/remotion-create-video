import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const categories = [
  { purpose: "Coding", tool: "Claude", color: colors.tiffanyBlue, icon: "code" },
  { purpose: "Writing", tool: "ChatGPT", color: colors.caribbeanGreen, icon: "pen" },
  { purpose: "Research", tool: "Gemini", color: colors.turkishRose, icon: "compass" },
];

export const Scene3CategorizeAI: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 200 },
  });

  const subProgress = spring({
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
          paddingLeft: 40,
          paddingRight: 40,
          gap: 36,
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
          Categorize
          <br />
          <span style={{ color: colors.darkCyra }}>Your AI</span>
        </div>

        {/* "You" node at top */}
        <div
          style={{
            transform: `scale(${interpolate(
              spring({ frame, fps, delay: 20, config: { damping: 14, stiffness: 80 } }),
              [0, 1],
              [0, 1]
            )})`,
          }}
        >
          <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
            <circle cx="35" cy="35" r="30" fill={`${colors.darkCyra}15`} stroke={colors.darkCyra} strokeWidth={2.5} />
            <circle cx="35" cy="28" r="8" stroke={colors.darkCyra} strokeWidth={2} fill="none" />
            <path d="M20 52 Q20 40 35 40 Q50 40 50 52" stroke={colors.darkCyra} strokeWidth={2} fill="none" />
          </svg>
          <div style={{ textAlign: "center", fontSize: 16, color: colors.darkCyra, fontWeight: 700, marginTop: 4 }}>You</div>
        </div>

        {/* Category columns */}
        <div style={{ display: "flex", gap: 16, width: "100%", maxWidth: 700 }}>
          {categories.map((cat, i) => {
            const colEntrance = spring({
              frame,
              fps,
              delay: 40 + i * 25,
              config: { damping: 14, stiffness: 80 },
            });

            return (
              <div
                key={cat.purpose}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 12,
                  padding: 20,
                  borderRadius: 16,
                  backgroundColor: `${cat.color}08`,
                  border: `1.5px solid ${cat.color}30`,
                  opacity: interpolate(colEntrance, [0, 1], [0, 1]),
                  transform: `translateY(${interpolate(colEntrance, [0, 1], [30, 0])}px)`,
                }}
              >
                {/* Connecting line from You */}
                <svg width="2" height="20" viewBox="0 0 2 20" fill="none" style={{ marginTop: -32 }}>
                  <line x1="1" y1="0" x2="1" y2="20" stroke={cat.color} strokeWidth={1.5} strokeDasharray="3 3" opacity={0.5} />
                </svg>

                {/* Icon */}
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  {cat.icon === "code" && (
                    <>
                      <rect x="6" y="6" width="36" height="36" rx="8" stroke={cat.color} strokeWidth={2} fill={`${cat.color}10`} />
                      <path d="M16 18 L10 24 L16 30" stroke={cat.color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M32 18 L38 24 L32 30" stroke={cat.color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                    </>
                  )}
                  {cat.icon === "pen" && (
                    <>
                      <rect x="6" y="6" width="36" height="36" rx="8" stroke={cat.color} strokeWidth={2} fill={`${cat.color}10`} />
                      <path d="M16 34 L14 34 L14 32 L30 16 L32 18 Z" stroke={cat.color} strokeWidth={2} fill="none" strokeLinejoin="round" />
                    </>
                  )}
                  {cat.icon === "compass" && (
                    <>
                      <circle cx="24" cy="24" r="18" stroke={cat.color} strokeWidth={2} fill={`${cat.color}10`} />
                      <path d="M24 10 L26 20 L24 24 L22 20 Z" fill={cat.color} opacity={0.6} />
                      <path d="M24 38 L22 28 L24 24 L26 28 Z" fill={cat.color} opacity={0.3} />
                    </>
                  )}
                </svg>

                {/* Purpose */}
                <div style={{ fontSize: 22, fontWeight: 700, color: cat.color }}>
                  {cat.purpose}
                </div>

                {/* Tool name */}
                <div
                  style={{
                    padding: "6px 16px",
                    borderRadius: 10,
                    backgroundColor: `${cat.color}15`,
                    fontSize: 18,
                    color: cat.color,
                    fontWeight: 400,
                  }}
                >
                  {cat.tool}
                </div>
              </div>
            );
          })}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: colors.chineseSilver,
            textAlign: "center",
            opacity: interpolate(subProgress, [0, 1], [0, 1]),
          }}
        >
          One tool per purpose
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
