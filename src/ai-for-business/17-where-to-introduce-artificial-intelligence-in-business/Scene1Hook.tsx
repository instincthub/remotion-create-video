import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const ChatBubble: React.FC<{
  text: string;
  isUser: boolean;
  opacity: number;
  translateY: number;
}> = ({ text, isUser, opacity, translateY }) => (
  <div
    style={{
      opacity,
      transform: `translateY(${translateY}px)`,
      display: "flex",
      justifyContent: isUser ? "flex-end" : "flex-start",
      marginBottom: 12,
    }}
  >
    <div
      style={{
        background: isUser ? colors.darkCyra : `${colors.darkCyra}15`,
        color: isUser ? colors.white : colors.gunmetal,
        padding: "14px 22px",
        borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
        fontSize: 20,
        maxWidth: 320,
        fontWeight: 400,
      }}
    >
      {text}
    </div>
  </div>
);

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Blueprint grid fade in
  const gridOpacity = interpolate(frame, [0, fps], [0, 0.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Slow zoom
  const zoom = interpolate(frame, [0, 15 * fps], [1, 1.03], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Chat interface appears
  const chatProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 14, stiffness: 80 },
  });
  const chatOpacity = interpolate(chatProgress, [0, 1], [0, 1]);
  const chatScale = interpolate(chatProgress, [0, 1], [0.85, 1]);

  // Chat bubbles stagger
  const bubble1 = spring({ frame, fps, delay: 0.8 * fps, config: { damping: 12, stiffness: 70 } });
  const bubble2 = spring({ frame, fps, delay: 1.4 * fps, config: { damping: 12, stiffness: 70 } });
  const bubble3 = spring({ frame, fps, delay: 2 * fps, config: { damping: 12, stiffness: 70 } });

  // Zoom out to reveal layers
  const revealProgress = interpolate(frame, [3 * fps, 5.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const chatShrink = interpolate(revealProgress, [0, 1], [1, 0.45]);
  const chatMoveUp = interpolate(revealProgress, [0, 1], [0, -120]);

  // System layers appearing below chat
  const layerLabels = ["Security", "Data Pipeline", "Model Tuning", "Monitoring", "Governance"];
  const layerColors = [
    colors.darkCyra,
    colors.viridianGreen,
    colors.tiffanyBlue,
    colors.caribbeanGreen,
    colors.deepGreenCyanTurquoise,
  ];

  // Title text
  const titleProgress = spring({
    frame,
    fps,
    delay: 7 * fps,
    config: { damping: 12, stiffness: 80 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.white,
        fontFamily,
      }}
    >
      {/* Blueprint grid */}
      <AbsoluteFill
        style={{
          transform: `scale(${zoom})`,
          opacity: gridOpacity,
          backgroundImage: `
            linear-gradient(${colors.darkCyra}15 1px, transparent 1px),
            linear-gradient(90deg, ${colors.darkCyra}15 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Chat interface + layers container */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 200,
        }}
      >
        {/* Chat window */}
        <div
          style={{
            opacity: chatOpacity,
            transform: `scale(${chatScale * chatShrink}) translateY(${chatMoveUp}px)`,
            width: 440,
            background: colors.white,
            borderRadius: 20,
            padding: 28,
            boxShadow: `0 8px 40px ${colors.darkCyra}20`,
            border: `1px solid ${colors.chineseSilver}60`,
          }}
        >
          {/* Chat header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 20,
              paddingBottom: 16,
              borderBottom: `1px solid ${colors.chineseSilver}40`,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: colors.darkCyra,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 2C5.58 2 2 5.58 2 10C2 14.42 5.58 18 10 18C14.42 18 18 14.42 18 10C18 5.58 14.42 2 10 2Z"
                  stroke={colors.white}
                  strokeWidth="1.5"
                />
                <path d="M7 9H13" stroke={colors.white} strokeWidth="1.5" strokeLinecap="round" />
                <path d="M7 12H11" stroke={colors.white} strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: colors.gunmetal }}>
              AI Assistant
            </div>
          </div>

          <ChatBubble
            text="What is our refund policy?"
            isUser
            opacity={interpolate(bubble1, [0, 1], [0, 1])}
            translateY={interpolate(bubble1, [0, 1], [20, 0])}
          />
          <ChatBubble
            text="Our refund policy allows returns within 30 days of purchase..."
            isUser={false}
            opacity={interpolate(bubble2, [0, 1], [0, 1])}
            translateY={interpolate(bubble2, [0, 1], [20, 0])}
          />
          <ChatBubble
            text="Can I get a refund after 30 days?"
            isUser
            opacity={interpolate(bubble3, [0, 1], [0, 1])}
            translateY={interpolate(bubble3, [0, 1], [20, 0])}
          />
        </div>

        {/* System layers revealed below — landscape grid */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 14,
            marginTop: 20,
            maxWidth: 1200,
          }}
        >
          {layerLabels.map((label, i) => {
            const layerDelay = 4 * fps + i * 12;
            const layerProgress = spring({
              frame,
              fps,
              delay: layerDelay,
              config: { damping: 14, stiffness: 80 },
            });
            const layerOpacity = interpolate(layerProgress, [0, 1], [0, 1]);
            const layerScale = interpolate(layerProgress, [0, 1], [0.9, 1]);

            return (
              <div
                key={label}
                style={{
                  opacity: layerOpacity * revealProgress,
                  transform: `scale(${layerScale})`,
                  width: 340,
                  padding: "16px 32px",
                  borderRadius: 14,
                  background: `${layerColors[i]}15`,
                  border: `2px solid ${layerColors[i]}40`,
                  textAlign: "center",
                  fontSize: 24,
                  fontWeight: 700,
                  color: layerColors[i],
                }}
              >
                {label}
              </div>
            );
          })}
        </div>

        {/* Title text */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontSize: 52,
            fontWeight: 700,
            color: colors.darkSlateGray,
            textAlign: "center",
            marginTop: 40,
          }}
        >
          Building a text assistant is{" "}
          <span style={{ color: colors.darkCyra }}>not simple.</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
