import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene9Interaction: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Blueprint grid
  const gridOpacity = interpolate(frame, [0, fps], [0, 0.06], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 8,
    config: { damping: 12, stiffness: 80 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  // Chat UI mockup
  const chatProgress = spring({
    frame,
    fps,
    delay: fps,
    config: { damping: 12, stiffness: 70 },
  });
  const chatOpacity = interpolate(chatProgress, [0, 1], [0, 1]);
  const chatScale = interpolate(chatProgress, [0, 1], [0.95, 1]);

  // Conversation flow
  const messages = [
    { text: "Tell me about the project", isUser: true, delay: 1.8 * fps },
    { text: "Which project are you referring to?", isUser: false, delay: 3 * fps },
    { text: "The marketing campaign", isUser: true, delay: 5 * fps },
    {
      text: "The Q2 marketing campaign is on track. Budget utilization is at 72%.",
      isUser: false,
      delay: 6.5 * fps,
    },
  ];

  // Typing indicator
  const typingVisible = frame > 2.2 * fps && frame < 3 * fps;
  const typingDot1 = Math.sin(frame * 0.15) > 0 ? 1 : 0.3;
  const typingDot2 = Math.sin(frame * 0.15 + 1) > 0 ? 1 : 0.3;
  const typingDot3 = Math.sin(frame * 0.15 + 2) > 0 ? 1 : 0.3;

  // Clarification highlight
  const clarificationProgress = spring({
    frame,
    fps,
    delay: 3.5 * fps,
    config: { damping: 10, stiffness: 60 },
  });
  const clarificationOpacity = interpolate(clarificationProgress, [0, 1], [0, 1]);

  // Right side design points
  const designPoints = [
    { text: "Handle misunderstandings", delay: 8 * fps },
    { text: "Ask clarifying questions", delay: 9.5 * fps },
    { text: "Recover from failure gracefully", delay: 11 * fps },
  ];

  // Bottom text
  const bottomProgress = spring({
    frame,
    fps,
    delay: 12.5 * fps,
    config: { damping: 10, stiffness: 60 },
  });
  const bottomOpacity = interpolate(bottomProgress, [0, 1], [0, 1]);

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
          opacity: gridOpacity,
          backgroundImage: `
            linear-gradient(${colors.darkCyra}12 1px, transparent 1px),
            linear-gradient(90deg, ${colors.darkCyra}12 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: colors.policeBlue,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 700,
              color: colors.white,
            }}
          >
            H
          </div>
          <div style={{ fontSize: 50, fontWeight: 700, color: colors.darkSlateGray }}>
            Interaction
          </div>
          <div style={{ fontSize: 26, color: colors.rhythm }}>
            Design the Conversation
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div
        style={{
          position: "absolute",
          top: 260,
          left: 80,
          right: 80,
          display: "flex",
          gap: 40,
        }}
      >
        {/* Left: Chat mockup */}
        <div
          style={{
            flex: 1,
            opacity: chatOpacity,
            transform: `scale(${chatScale})`,
            background: colors.magnolia,
            borderRadius: 20,
            padding: 28,
            border: `1px solid ${colors.chineseSilver}40`,
            maxWidth: 700,
          }}
        >
          {/* Chat header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 20,
              paddingBottom: 14,
              borderBottom: `1px solid ${colors.chineseSilver}40`,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: colors.darkCyra,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="3" width="14" height="10" rx="2" stroke={colors.white} strokeWidth="1.5" />
                <path d="M5 16H13" stroke={colors.white} strokeWidth="1.5" strokeLinecap="round" />
                <path d="M9 13V16" stroke={colors.white} strokeWidth="1.5" />
              </svg>
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: colors.gunmetal }}>
              Enterprise Assistant
            </div>
            <div
              style={{
                marginLeft: "auto",
                padding: "4px 12px",
                borderRadius: 12,
                background: `${colors.caribbeanGreen}15`,
                fontSize: 13,
                fontWeight: 700,
                color: colors.caribbeanGreen,
              }}
            >
              Online
            </div>
          </div>

          {/* Messages */}
          {messages.map((msg, i) => {
            const msgProgress = spring({
              frame,
              fps,
              delay: msg.delay,
              config: { damping: 12, stiffness: 70 },
            });
            const msgOpacity = interpolate(msgProgress, [0, 1], [0, 1]);
            const msgY = interpolate(msgProgress, [0, 1], [15, 0]);

            const isHighlighted = !msg.isUser && i === 1;

            return (
              <div
                key={`msg-${i}`}
                style={{
                  opacity: msgOpacity,
                  transform: `translateY(${msgY}px)`,
                  display: "flex",
                  justifyContent: msg.isUser ? "flex-end" : "flex-start",
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    background: msg.isUser
                      ? colors.darkCyra
                      : colors.white,
                    color: msg.isUser ? colors.white : colors.gunmetal,
                    padding: "12px 20px",
                    borderRadius: msg.isUser
                      ? "16px 16px 4px 16px"
                      : "16px 16px 16px 4px",
                    fontSize: 18,
                    maxWidth: 400,
                    border: isHighlighted
                      ? `2px solid ${colors.tiffanyBlue}`
                      : msg.isUser
                        ? "none"
                        : `1px solid ${colors.chineseSilver}40`,
                    position: "relative",
                  }}
                >
                  {msg.text}
                  {/* Clarification badge */}
                  {isHighlighted && (
                    <div
                      style={{
                        opacity: clarificationOpacity,
                        position: "absolute",
                        top: -14,
                        right: -10,
                        background: colors.tiffanyBlue,
                        color: colors.white,
                        padding: "3px 10px",
                        borderRadius: 8,
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      Clarification
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Typing indicator */}
          {typingVisible && (
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <div
                style={{
                  background: colors.white,
                  padding: "12px 20px",
                  borderRadius: "16px 16px 16px 4px",
                  display: "flex",
                  gap: 6,
                  border: `1px solid ${colors.chineseSilver}40`,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    background: colors.rhythm,
                    opacity: typingDot1,
                  }}
                />
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    background: colors.rhythm,
                    opacity: typingDot2,
                  }}
                />
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    background: colors.rhythm,
                    opacity: typingDot3,
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Right: Design principles */}
        <div
          style={{
            flex: 0.6,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 20,
          }}
        >
          {designPoints.map((point, i) => {
            const pointProgress = spring({
              frame,
              fps,
              delay: point.delay,
              config: { damping: 12, stiffness: 70 },
            });
            const pointOpacity = interpolate(pointProgress, [0, 1], [0, 1]);
            const pointX = interpolate(pointProgress, [0, 1], [30, 0]);

            return (
              <div
                key={point.text}
                style={{
                  opacity: pointOpacity,
                  transform: `translateX(${pointX}px)`,
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "18px 24px",
                  background: `${colors.policeBlue}08`,
                  border: `1px solid ${colors.policeBlue}25`,
                  borderRadius: 14,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    background: colors.policeBlue,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontSize: 18,
                    fontWeight: 700,
                    color: colors.white,
                  }}
                >
                  {i + 1}
                </div>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: colors.gunmetal,
                  }}
                >
                  {point.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom text */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: bottomOpacity,
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 700, color: colors.gunmetal }}>
          Interaction design is{" "}
          <span style={{ color: colors.policeBlue }}>intelligence design.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
