import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene8KnowledgeTrust: React.FC = () => {
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

  // AI response card
  const responseProgress = spring({
    frame,
    fps,
    delay: 1.5 * fps,
    config: { damping: 12, stiffness: 70 },
  });
  const responseOpacity = interpolate(responseProgress, [0, 1], [0, 1]);
  const responseScale = interpolate(responseProgress, [0, 1], [0.95, 1]);

  // Guardrails
  const guardrails = [
    { text: "Allowed topics", icon: "check", color: colors.caribbeanGreen },
    { text: "Refused queries", icon: "block", color: colors.oldRose },
    { text: "Source citations", icon: "link", color: colors.darkCyra },
    { text: "Uncertainty flagging", icon: "warn", color: colors.corn },
  ];

  // Expert reviewer
  const expertProgress = spring({
    frame,
    fps,
    delay: 5 * fps,
    config: { damping: 10, stiffness: 60 },
  });
  const expertOpacity = interpolate(expertProgress, [0, 1], [0, 1]);
  const expertX = interpolate(expertProgress, [0, 1], [-40, 0]);

  // Trust questions
  const trustQuestions = [
    { text: "Can it explain its reasoning?", delay: 7 * fps },
    { text: "Can it cite sources?", delay: 8.5 * fps },
    { text: "Can it admit uncertainty?", delay: 10 * fps },
  ];

  // Bottom text
  const bottomProgress = spring({
    frame,
    fps,
    delay: 12 * fps,
    config: { damping: 10, stiffness: 60 },
  });
  const bottomOpacity = interpolate(bottomProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.magnolia,
        fontFamily,
      }}
    >
      {/* Blueprint grid */}
      <AbsoluteFill
        style={{
          opacity: gridOpacity,
          backgroundImage: `
            linear-gradient(${colors.darkCyra}10 1px, transparent 1px),
            linear-gradient(90deg, ${colors.darkCyra}10 1px, transparent 1px)
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
          <div style={{ display: "flex", gap: 10 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: colors.metallicBlue,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                fontWeight: 700,
                color: colors.white,
              }}
            >
              F
            </div>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: colors.chineseBlue,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                fontWeight: 700,
                color: colors.white,
              }}
            >
              G
            </div>
          </div>
          <div style={{ fontSize: 50, fontWeight: 700, color: colors.darkSlateGray }}>
            Knowledge and Trust
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div
        style={{
          position: "absolute",
          top: 250,
          left: 80,
          right: 80,
          display: "flex",
          gap: 40,
        }}
      >
        {/* Left: Expert review */}
        <div
          style={{
            flex: 1,
            opacity: expertOpacity,
            transform: `translateX(${expertX}px)`,
          }}
        >
          {/* Expert person icon */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                background: `${colors.metallicBlue}20`,
                border: `2px solid ${colors.metallicBlue}40`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="9" r="5" stroke={colors.metallicBlue} strokeWidth="2" />
                <path
                  d="M4 25C4 20 8 17 14 17C20 17 24 20 24 25"
                  stroke={colors.metallicBlue}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, color: colors.gunmetal }}>
                Subject Matter Expert
              </div>
              <div style={{ fontSize: 16, color: colors.rhythm }}>
                Human validation required
              </div>
            </div>
          </div>

          {/* Guardrail rules */}
          {guardrails.map((rule, i) => {
            const ruleProgress = spring({
              frame,
              fps,
              delay: 3 * fps + i * 14,
              config: { damping: 12, stiffness: 70 },
            });
            const ruleOpacity = interpolate(ruleProgress, [0, 1], [0, 1]);
            const ruleX = interpolate(ruleProgress, [0, 1], [20, 0]);

            return (
              <div
                key={rule.text}
                style={{
                  opacity: ruleOpacity,
                  transform: `translateX(${ruleX}px)`,
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "14px 20px",
                  background: colors.white,
                  border: `1px solid ${rule.color}30`,
                  borderRadius: 12,
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: `${rule.color}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      background: rule.color,
                    }}
                  />
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, color: colors.gunmetal }}>
                  {rule.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: AI Response with citations */}
        <div
          style={{
            flex: 1,
            opacity: responseOpacity,
            transform: `scale(${responseScale})`,
          }}
        >
          {/* AI response card */}
          <div
            style={{
              background: colors.white,
              borderRadius: 20,
              padding: 32,
              border: `1px solid ${colors.chineseSilver}40`,
              boxShadow: `0 4px 24px ${colors.darkCyra}10`,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 16,
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
                  <path
                    d="M9 2C5 2 2 5 2 9C2 13 5 16 9 16C13 16 16 13 16 9C16 5 13 2 9 2Z"
                    stroke={colors.white}
                    strokeWidth="1.5"
                  />
                  <path d="M6 8H12" stroke={colors.white} strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M6 11H10" stroke={colors.white} strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: colors.gunmetal }}>
                AI Response
              </div>
            </div>
            <div style={{ fontSize: 18, color: colors.gunmetal, lineHeight: 1.6 }}>
              Based on our refund policy (Section 3.2), returns are accepted within 30 days
              of purchase with original receipt.
            </div>

            {/* Citation popup */}
            {(() => {
              const citationProgress = spring({
                frame,
                fps,
                delay: 4 * fps,
                config: { damping: 12, stiffness: 70 },
              });
              return (
                <div
                  style={{
                    opacity: interpolate(citationProgress, [0, 1], [0, 1]),
                    transform: `translateY(${interpolate(citationProgress, [0, 1], [10, 0])}px)`,
                    marginTop: 16,
                    padding: "10px 16px",
                    background: `${colors.darkCyra}08`,
                    border: `1px solid ${colors.darkCyra}25`,
                    borderRadius: 10,
                    fontSize: 15,
                    color: colors.darkCyra,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M6 12L2 8L6 4"
                      stroke={colors.darkCyra}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M2 8H14"
                      stroke={colors.darkCyra}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  Source: Company Policy Manual v4.2
                </div>
              );
            })()}
          </div>

          {/* Trust questions */}
          {trustQuestions.map((q) => {
            const qProgress = spring({
              frame,
              fps,
              delay: q.delay,
              config: { damping: 10, stiffness: 60 },
            });
            return (
              <div
                key={q.text}
                style={{
                  opacity: interpolate(qProgress, [0, 1], [0, 1]),
                  transform: `translateY(${interpolate(qProgress, [0, 1], [15, 0])}px)`,
                  fontSize: 21,
                  color: colors.gunmetal,
                  padding: "8px 0",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    background: colors.chineseBlue,
                    flexShrink: 0,
                  }}
                />
                {q.text}
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
          AI does not understand consequences.{" "}
          <span style={{ color: colors.metallicBlue }}>Humans do.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
