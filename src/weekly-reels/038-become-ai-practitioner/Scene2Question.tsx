import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { nunito, dmMono } from "./fonts";

const QUESTIONS = [
  "Are you using AI the way you wish you could?",
  "Do you have a real path?",
  "Or are you just clicking around?",
];
const Q_START = [5, 55, 110];

export const Scene2Question: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tagProgress = spring({
    frame: frame - 170,
    fps,
    config: { damping: 18, stiffness: 90 },
  });

  return (
    <AbsoluteFill
      style={{
        background: colors.brandDark,
        fontFamily: nunito,
      }}
    >
      {/* Backdrop glow */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 35%, ${colors.tealDeeper}3A 0%, transparent 62%)`,
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 80px 340px",
          gap: 44,
        }}
      >
        {QUESTIONS.map((q, i) => {
          const progress = spring({
            frame: frame - Q_START[i],
            fps,
            config: { damping: 18, stiffness: 80 },
          });
          const isHighlight = i === 0;

          return (
            <div
              key={q}
              style={{
                fontFamily: nunito,
                fontSize: isHighlight ? 64 : 46,
                fontWeight: 700,
                color: isHighlight ? colors.white : colors.neutral400,
                lineHeight: 1.18,
                opacity: interpolate(progress, [0, 1], [0, 1]),
                transform: `translateX(${interpolate(progress, [0, 1], [-30, 0])}px)`,
                maxWidth: 920,
              }}
            >
              {q}
            </div>
          );
        })}

        {/* Pull-quote tag */}
        <div
          style={{
            marginTop: 28,
            display: "flex",
            alignItems: "center",
            gap: 18,
            opacity: interpolate(tagProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(tagProgress, [0, 1], [20, 0])}px)`,
          }}
        >
          <div
            style={{
              width: 64,
              height: 4,
              backgroundColor: colors.tealLight,
              borderRadius: 4,
            }}
          />
          <div
            style={{
              fontFamily: dmMono,
              fontSize: 22,
              fontWeight: 500,
              color: colors.tealLight,
              letterSpacing: 3,
            }}
          >
            CLARITY + STRATEGY
          </div>
        </div>
      </AbsoluteFill>

      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          bottom: 320,
          right: 80,
          fontFamily: dmMono,
          fontSize: 15,
          fontWeight: 500,
          color: `${colors.white}40`,
          letterSpacing: 2,
        }}
      >
        AI PLAYBOOK
      </div>
    </AbsoluteFill>
  );
};
