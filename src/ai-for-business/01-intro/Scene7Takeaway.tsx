import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const RULES = [
  { text: "Your data is smaller.", delay: 0 },
  { text: "Your questions are harder.", delay: 150 },
  { text: "Your margin is thinner.", delay: 300 },
];

const TypewriterRule: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Typewriter: reveal characters over time
  const charsPerFrame = 0.6;
  const visibleChars = Math.min(
    Math.floor(frame * charsPerFrame),
    text.length,
  );
  const displayText = text.slice(0, visibleChars);
  const isTyping = visibleChars < text.length;
  const typingComplete = visibleChars >= text.length;

  // Blinking cursor
  const cursorVisible = isTyping || (frame % 30 < 15 && frame < 80);

  // Checkmark pops in after typing completes
  const checkDelay = Math.ceil(text.length / charsPerFrame) + 10;
  const checkProgress = spring({
    frame,
    fps,
    delay: checkDelay,
    config: { damping: 12, stiffness: 150 },
  });
  const checkScale = interpolate(checkProgress, [0, 1], [0, 1]);

  // Card background fade in
  const cardOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 24,
        backgroundColor: colors.magnolia,
        padding: "28px 40px",
        borderRadius: 16,
        opacity: cardOpacity,
      }}
    >
      {/* Checkmark */}
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: typingComplete ? colors.darkCyra : "transparent",
          border: typingComplete ? "none" : `2px solid ${colors.chineseSilver}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${typingComplete ? checkScale : 1})`,
          flexShrink: 0,
        }}
      >
        {typingComplete && (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 13l4 4L19 7"
              stroke={colors.white}
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      {/* Text */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <span
          style={{
            fontSize: 40,
            fontWeight: "bold",
            color: colors.gunmetal,
            fontFamily,
          }}
        >
          {displayText}
        </span>
        {cursorVisible && (
          <span
            style={{
              display: "inline-block",
              width: 3,
              height: 44,
              backgroundColor: colors.darkCyra,
              marginLeft: 2,
            }}
          />
        )}
      </div>
    </div>
  );
};

export const Scene7Takeaway: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header
  const headerProgress = spring({
    frame,
    fps,
    config: { damping: 200 },
  });
  const headerOpacity = interpolate(headerProgress, [0, 1], [0, 1]);
  const headerY = interpolate(headerProgress, [0, 1], [-30, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.white,
        fontFamily,
      }}
    >
      {/* Tiffany Blue accent line on left */}
      <div
        style={{
          position: "absolute",
          left: 80,
          top: "15%",
          bottom: "15%",
          width: 6,
          backgroundColor: colors.tiffanyBlue,
          borderRadius: 3,
        }}
      />

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
          paddingLeft: 140,
          paddingRight: 140,
          gap: 40,
        }}
      >
        {/* Header */}
        <div
          style={{
            fontSize: 48,
            fontWeight: "bold",
            color: colors.darkSlateGray,
            transform: `translateY(${headerY}px)`,
            opacity: headerOpacity,
            marginBottom: 20,
          }}
        >
          Design for your reality
        </div>

        {/* Rules */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {RULES.map((rule) => (
            <Sequence
              key={rule.text}
              from={rule.delay + 30}
              layout="none"
            >
              <TypewriterRule text={rule.text} />
            </Sequence>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
