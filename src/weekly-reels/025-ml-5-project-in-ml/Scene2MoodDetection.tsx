import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Message with detected mood
const MoodMessage: React.FC<{
  text: string;
  mood: "Positive" | "Neutral" | "Urgent";
  moodColor: string;
  moodIcon: string;
  delay: number;
  index: number;
}> = ({ text, mood, moodColor, moodIcon, delay, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, delay, config: { damping: 200 } });
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const xOffset = interpolate(entrance, [0, 1], [50, 0]);

  // Mood badge appears after message
  const badgeEntrance = spring({
    frame,
    fps,
    delay: delay + 18,
    config: { damping: 14, stiffness: 80 },
  });
  const badgeScale = interpolate(badgeEntrance, [0, 1], [0, 1]);

  const pulse = Math.sin(frame * 0.06 + index * 2) * 0.04 + 1;

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${xOffset}px)`,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
        maxWidth: 700,
        padding: "18px 22px",
        borderRadius: 16,
        background: `${colors.darkSlateGray}`,
        border: `1px solid ${moodColor}20`,
      }}
    >
      {/* Message text */}
      <div style={{ fontSize: 20, color: colors.chineseSilver, lineHeight: 1.4 }}>
        "{text}"
      </div>

      {/* Mood badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          transform: `scale(${badgeScale * pulse})`,
          alignSelf: "flex-end",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d={moodIcon}
            stroke={moodColor}
            strokeWidth={2}
            strokeLinecap="round"
            fill="none"
          />
        </svg>
        <div
          style={{
            padding: "4px 12px",
            borderRadius: 8,
            background: `${moodColor}15`,
            border: `1px solid ${moodColor}40`,
            fontSize: 14,
            fontWeight: 700,
            color: moodColor,
          }}
        >
          {mood}
        </div>
      </div>
    </div>
  );
};

export const Scene2MoodDetection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 200 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

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
          gap: 20,
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            lineHeight: 1.3,
            marginBottom: 12,
          }}
        >
          Read the
          <br />
          <span style={{ color: colors.turkishRose }}>Mood & Tone</span>
        </div>

        <MoodMessage
          text="Love this product! Works great"
          mood="Positive"
          moodColor={colors.limeGreen}
          moodIcon="M12 2 A10 10 0 1 0 12 2.01 M8 10 L8 10.01 M16 10 L16 10.01 M8 15 Q12 19 16 15"
          delay={15}
          index={0}
        />

        <MoodMessage
          text="Need info about my order status"
          mood="Neutral"
          moodColor={colors.corn}
          moodIcon="M12 2 A10 10 0 1 0 12 2.01 M8 10 L8 10.01 M16 10 L16 10.01 M8 15 L16 15"
          delay={4 * 30}
          index={1}
        />

        <MoodMessage
          text="This is broken AGAIN. Unacceptable!"
          mood="Urgent"
          moodColor={colors.oldRose}
          moodIcon="M12 2 A10 10 0 1 0 12 2.01 M8 10 L8 10.01 M16 10 L16 10.01 M8 17 Q12 13 16 17"
          delay={8 * 30}
          index={2}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
