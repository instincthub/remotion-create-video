import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene5ContextProblem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 12, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [-20, 0]);

  // Left panel (keyword detection) appears
  const leftProgress = spring({
    frame,
    fps,
    delay: fps,
    config: { damping: 12, stiffness: 80 },
  });
  const leftOpacity = interpolate(leftProgress, [0, 1], [0, 1]);
  const leftX = interpolate(leftProgress, [0, 1], [-60, 0]);

  // Right panel (human interpretation) appears
  const rightProgress = spring({
    frame,
    fps,
    delay: 2.5 * fps,
    config: { damping: 12, stiffness: 80 },
  });
  const rightOpacity = interpolate(rightProgress, [0, 1], [0, 1]);
  const rightX = interpolate(rightProgress, [0, 1], [60, 0]);

  // Warning flash on left panel
  const warningAppear = interpolate(
    frame,
    [3.5 * fps, 4.5 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const warningPulse = interpolate(Math.sin(frame * 0.08), [-1, 1], [0.6, 1]);

  // Warning disappear when context shown
  const warningDismiss = interpolate(
    frame,
    [8 * fps, 9.5 * fps],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Context labels appear
  const contextLabels = [
    { text: "Irony", delay: 9 },
    { text: "Humor", delay: 10 },
    { text: "Exaggeration", delay: 11 },
    { text: "Slang", delay: 12 },
  ];

  // Bottom text
  const bottomProgress = spring({
    frame,
    fps,
    delay: 13 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const bottomOpacity = interpolate(bottomProgress, [0, 1], [0, 1]);

  const messageText = "She's going to kill me tonight.";
  const keywords = ["kill"];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.darkNavy} 0%, #0d1a2a 100%)`,
        fontFamily,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 5,
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontSize: 52,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
          }}
        >
          Context{" "}
          <span style={{ color: colors.oldRose }}>Breaks</span>{" "}
          Simple Systems
        </div>
      </div>

      {/* Split screen container */}
      <div
        style={{
          position: "absolute",
          top: 160,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 40,
          zIndex: 3,
          paddingBottom: 200,
        }}
      >
        {/* Left: Keyword Detection */}
        <div
          style={{
            opacity: leftOpacity,
            transform: `translateX(${leftX}px)`,
            width: 520,
            background: `${colors.darkCharcoal}`,
            borderRadius: 20,
            border: `1px solid ${colors.white}15`,
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "16px 24px",
              borderBottom: `1px solid ${colors.white}10`,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20">
              <rect x="2" y="2" width="16" height="16" rx="3" fill="none" stroke={colors.oldRose} strokeWidth="2" />
              <line x1="6" y1="10" x2="14" y2="10" stroke={colors.oldRose} strokeWidth="2" />
            </svg>
            <span style={{ fontSize: 16, fontWeight: 700, color: colors.oldRose }}>
              KEYWORD DETECTION
            </span>
          </div>

          {/* Message display */}
          <div style={{ padding: "24px" }}>
            <div
              style={{
                fontSize: 22,
                color: colors.white,
                lineHeight: 1.8,
                padding: "16px 20px",
                background: `${colors.white}05`,
                borderRadius: 12,
              }}
            >
              {messageText.split(" ").map((word, i) => {
                const cleanWord = word.replace(/[.,!?]/g, "");
                const isKeyword = keywords.includes(cleanWord.toLowerCase());
                return (
                  <span
                    key={i}
                    style={{
                      color: isKeyword ? colors.oldRose : colors.white,
                      fontWeight: isKeyword ? 700 : 400,
                      background: isKeyword ? `${colors.oldRose}25` : "transparent",
                      padding: isKeyword ? "2px 6px" : 0,
                      borderRadius: isKeyword ? 4 : 0,
                    }}
                  >
                    {word}{" "}
                  </span>
                );
              })}
            </div>

            {/* Warning alert */}
            <div
              style={{
                opacity: warningAppear * warningDismiss * warningPulse,
                marginTop: 20,
                padding: "14px 20px",
                background: `${colors.oldRose}15`,
                border: `1px solid ${colors.oldRose}40`,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28">
                <path d="M14 2 L26 24 L2 24 Z" fill={colors.oldRose} />
                <text x="14" y="20" textAnchor="middle" fontSize="14" fontWeight="bold" fill={colors.white}>!</text>
              </svg>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: colors.oldRose }}>
                  THREAT DETECTED
                </div>
                <div style={{ fontSize: 13, color: colors.chineseSilver }}>
                  Keyword match: "kill"
                </div>
              </div>
            </div>
          </div>

          {/* Result */}
          <div
            style={{
              padding: "12px 24px",
              borderTop: `1px solid ${colors.white}10`,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                background: colors.oldRose,
              }}
            />
            <span style={{ fontSize: 14, color: colors.oldRose, fontWeight: 700 }}>
              FLAGGED AS DANGEROUS
            </span>
          </div>
        </div>

        {/* Right: Human Interpretation */}
        <div
          style={{
            opacity: rightOpacity,
            transform: `translateX(${rightX}px)`,
            width: 520,
            background: `${colors.darkCharcoal}`,
            borderRadius: 20,
            border: `1px solid ${colors.white}15`,
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "16px 24px",
              borderBottom: `1px solid ${colors.white}10`,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20">
              <circle cx="10" cy="7" r="4" fill="none" stroke={colors.caribbeanGreen} strokeWidth="2" />
              <path d="M3 18 C3 13 17 13 17 18" fill="none" stroke={colors.caribbeanGreen} strokeWidth="2" />
            </svg>
            <span style={{ fontSize: 16, fontWeight: 700, color: colors.caribbeanGreen }}>
              HUMAN INTERPRETATION
            </span>
          </div>

          {/* Message with context */}
          <div style={{ padding: "24px" }}>
            <div
              style={{
                fontSize: 22,
                color: colors.white,
                lineHeight: 1.8,
                padding: "16px 20px",
                background: `${colors.white}05`,
                borderRadius: 12,
              }}
            >
              {messageText}
            </div>

            {/* Context explanation */}
            <div
              style={{
                marginTop: 20,
                padding: "14px 20px",
                background: `${colors.caribbeanGreen}10`,
                border: `1px solid ${colors.caribbeanGreen}30`,
                borderRadius: 10,
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 700, color: colors.caribbeanGreen, marginBottom: 6 }}>
                Context: Common expression
              </div>
              <div style={{ fontSize: 14, color: colors.chineseSilver, lineHeight: 1.6 }}>
                A person expressing fear of their partner's reaction to a car accident. Not a real threat.
              </div>
            </div>

            {/* Context labels */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                marginTop: 16,
              }}
            >
              {contextLabels.map((label, i) => {
                const labelProgress = spring({
                  frame,
                  fps,
                  delay: label.delay * fps,
                  config: { damping: 12, stiffness: 100 },
                });
                const labelOpacity = interpolate(labelProgress, [0, 1], [0, 1]);

                return (
                  <div
                    key={`label-${i}`}
                    style={{
                      opacity: labelOpacity,
                      fontSize: 14,
                      fontWeight: 700,
                      color: colors.tiffanyBlue,
                      background: `${colors.tiffanyBlue}15`,
                      padding: "6px 14px",
                      borderRadius: 20,
                      border: `1px solid ${colors.tiffanyBlue}30`,
                    }}
                  >
                    {label.text}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Result */}
          <div
            style={{
              padding: "12px 24px",
              borderTop: `1px solid ${colors.white}10`,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                background: colors.caribbeanGreen,
              }}
            />
            <span style={{ fontSize: 14, color: colors.caribbeanGreen, fontWeight: 700 }}>
              SAFE — NO THREAT
            </span>
          </div>
        </div>
      </div>

      {/* Bottom text */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 5,
        }}
      >
        <div
          style={{
            opacity: bottomOpacity,
            fontSize: 30,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
          }}
        >
          Language is{" "}
          <span style={{ color: colors.corn }}>messy</span>.{" "}
          Context is{" "}
          <span style={{ color: colors.tiffanyBlue }}>everything</span>.
        </div>
      </div>
    </AbsoluteFill>
  );
};
