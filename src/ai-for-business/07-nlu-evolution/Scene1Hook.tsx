import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Animated chat bubble
const ChatBubble: React.FC<{
  text: string;
  isUser: boolean;
  delay: number;
  frame: number;
  fps: number;
}> = ({ text, isUser, delay, frame, fps }) => {
  const progress = spring({
    frame,
    fps,
    delay,
    config: { damping: 12, stiffness: 100 },
  });
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateY = interpolate(progress, [0, 1], [30, 0]);
  const scale = interpolate(progress, [0, 1], [0.8, 1]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
      }}
    >
      <div
        style={{
          padding: "16px 28px",
          borderRadius: isUser ? "24px 24px 6px 24px" : "24px 24px 24px 6px",
          backgroundColor: isUser ? colors.darkCyra : `${colors.white}15`,
          border: isUser ? "none" : `1px solid ${colors.white}20`,
          color: colors.white,
          fontSize: 24,
          maxWidth: 500,
          lineHeight: 1.4,
        }}
      >
        {text}
      </div>
    </div>
  );
};

// Typing indicator dots
const TypingIndicator: React.FC<{ frame: number; delay: number; fps: number }> = ({
  frame,
  delay,
  fps,
}) => {
  const progress = spring({
    frame,
    fps,
    delay,
    config: { damping: 200 },
  });
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        opacity,
      }}
    >
      <div
        style={{
          padding: "16px 28px",
          borderRadius: "24px 24px 24px 6px",
          backgroundColor: `${colors.white}15`,
          border: `1px solid ${colors.white}20`,
          display: "flex",
          gap: 8,
        }}
      >
        {[0, 1, 2].map((i) => {
          const bounce = Math.sin((frame - delay) * 0.15 + i * 1.2) * 0.5 + 0.5;
          return (
            <div
              key={i}
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: colors.tiffanyBlue,
                opacity: 0.4 + bounce * 0.6,
                transform: `translateY(${-bounce * 6}px)`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title text
  const titleProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 12, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleScale = interpolate(titleProgress, [0, 1], [0.7, 1]);

  // "understand" emphasis
  const understandPulse = frame > 30 ? Math.sin((frame - 30) * 0.06) * 0.08 + 1 : 1;

  // Slow zoom
  const zoom = interpolate(frame, [0, 15 * fps], [1, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Chat section timing (relative frames)
  const showTyping = frame > 2 * fps;
  const showChat = frame > 1.5 * fps;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.gunmetal}, ${colors.darkSlateGray})`,
        fontFamily,
        transform: `scale(${zoom})`,
      }}
    >
      {/* Subtle grid overlay */}
      <AbsoluteFill style={{ opacity: 0.06 }}>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080">
          {Array.from({ length: 20 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 100}
              y1={0}
              x2={i * 100}
              y2={1080}
              stroke={colors.tiffanyBlue}
              strokeWidth={0.5}
            />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1={0}
              y1={i * 100}
              x2={1920}
              y2={i * 100}
              stroke={colors.tiffanyBlue}
              strokeWidth={0.5}
            />
          ))}
        </svg>
      </AbsoluteFill>

      {/* Main title */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 64,
          fontWeight: "bold",
          color: colors.white,
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          textShadow: `0 0 40px ${colors.darkCyra}60`,
          paddingBottom: 200,
        }}
      >
        Do machines really{" "}
        <span
          style={{
            color: colors.tiffanyBlue,
            transform: `scale(${understandPulse})`,
            display: "inline-block",
          }}
        >
          understand
        </span>{" "}
        us?
      </div>

      {/* Chat conversation */}
      {showChat && (
        <div
          style={{
            position: "absolute",
            top: 300,
            left: 460,
            right: 460,
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <ChatBubble
            text="I feel really overwhelmed today..."
            isUser={true}
            delay={1.5 * fps}
            frame={frame}
            fps={fps}
          />
          {showTyping && frame < 3.5 * fps && (
            <TypingIndicator frame={frame} delay={2 * fps} fps={fps} />
          )}
          <ChatBubble
            text="Why do you feel overwhelmed?"
            isUser={false}
            delay={3.5 * fps}
            frame={frame}
            fps={fps}
          />
          <ChatBubble
            text="Wait... do you actually understand me?"
            isUser={true}
            delay={5.5 * fps}
            frame={frame}
            fps={fps}
          />
        </div>
      )}
    </AbsoluteFill>
  );
};
