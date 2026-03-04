import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Mood face SVG
const MoodFace: React.FC<{
  mood: "happy" | "neutral" | "angry";
  delay: number;
  index: number;
}> = ({ mood, delay, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    delay,
    config: { damping: 14, stiffness: 80 },
  });
  const scale = interpolate(entrance, [0, 1], [0, 1]);
  const float = Math.sin(frame * 0.05 + index * 2.2) * 6;

  const moodColor: Record<string, string> = {
    happy: colors.limeGreen,
    neutral: colors.corn,
    angry: colors.oldRose,
  };

  const color = moodColor[mood];

  return (
    <div style={{ transform: `scale(${scale}) translateY(${float}px)` }}>
      <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
        <circle
          cx="50"
          cy="50"
          r="42"
          fill={`${color}12`}
          stroke={color}
          strokeWidth={2.5}
        />
        {/* Eyes */}
        <circle cx="36" cy="40" r={4} fill={color} />
        <circle cx="64" cy="40" r={4} fill={color} />
        {/* Mouth */}
        {mood === "happy" && (
          <path d="M32 60 Q50 78 68 60" stroke={color} strokeWidth={3} fill="none" strokeLinecap="round" />
        )}
        {mood === "neutral" && (
          <line x1="34" y1="64" x2="66" y2="64" stroke={color} strokeWidth={3} strokeLinecap="round" />
        )}
        {mood === "angry" && (
          <path d="M32 72 Q50 56 68 72" stroke={color} strokeWidth={3} fill="none" strokeLinecap="round" />
        )}
      </svg>
    </div>
  );
};

export const Scene1SentimentIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Badge
  const badgeEntrance = spring({ frame, fps, delay: 5, config: { damping: 14, stiffness: 80 } });
  const badgeScale = interpolate(badgeEntrance, [0, 1], [0, 1]);

  const titleProgress = spring({
    frame,
    fps,
    delay: 12,
    config: { damping: 200 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [40, 0]);

  const subProgress = spring({
    frame,
    fps,
    delay: 30,
    config: { damping: 200 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);

  const bgPulse = Math.sin(frame * 0.03) * 0.02 + 1;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${colors.gunmetal}, ${colors.darkSlateGray})`,
        fontFamily,
        transform: `scale(${bgPulse})`,
      }}
    >
      {/* Subtle grid */}
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
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`v-${i}`}
            style={{
              position: "absolute",
              top: 0,
              left: i * 90,
              width: 1,
              height: "100%",
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
          gap: 24,
        }}
      >
        {/* "#4" badge */}
        <div
          style={{
            transform: `scale(${badgeScale})`,
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: `${colors.turkishRose}20`,
            border: `2px solid ${colors.turkishRose}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            fontWeight: 700,
            color: colors.turkishRose,
          }}
        >
          #4
        </div>

        {/* Mood faces */}
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <MoodFace mood="happy" delay={15} index={0} />
          <MoodFace mood="neutral" delay={22} index={1} />
          <MoodFace mood="angry" delay={29} index={2} />
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            lineHeight: 1.2,
          }}
        >
          Sentiment
          <br />
          <span style={{ color: colors.turkishRose }}>Analysis</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            fontWeight: 400,
            color: colors.chineseSilver,
            textAlign: "center",
            opacity: subOpacity,
            lineHeight: 1.5,
          }}
        >
          Review customer feedback automatically
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
