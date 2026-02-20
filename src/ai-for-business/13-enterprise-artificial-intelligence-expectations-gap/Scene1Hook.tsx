import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Startup demo mockup (left side)
const StartupDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 14, stiffness: 80 },
  });
  const slideX = interpolate(slideProgress, [0, 1], [-960, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(slideProgress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "50%",
        height: "100%",
        opacity,
        transform: `translateX(${slideX}px)`,
        background: `linear-gradient(180deg, #1a2332 0%, #0f172a 100%)`,
        overflow: "hidden",
        borderRight: `1px solid ${colors.darkCyra}20`,
      }}
    >
      {/* Browser chrome */}
      <div
        style={{
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          borderBottom: `1px solid ${colors.darkSlateGray}40`,
        }}
      >
        {[colors.oldRose, colors.corn, colors.caribbeanGreen].map((c, i) => (
          <div
            key={`dot-${i}`}
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              background: c,
              opacity: 0.8,
            }}
          />
        ))}
        <div
          style={{
            flex: 1,
            marginLeft: 16,
            height: 28,
            borderRadius: 6,
            background: `${colors.darkSlateGray}60`,
            display: "flex",
            alignItems: "center",
            paddingLeft: 12,
          }}
        >
          <span
            style={{
              fontSize: 13,
              color: `${colors.chineseSilver}80`,
              fontFamily,
            }}
          >
            demo.ai-startup.io
          </span>
        </div>
      </div>

      {/* Chat interface mockup */}
      <div style={{ padding: "24px 32px" }}>
        <div
          style={{
            fontSize: 20,
            color: colors.tiffanyBlue,
            fontWeight: 700,
            fontFamily,
            marginBottom: 20,
          }}
        >
          AI Chat Demo
        </div>

        {/* Chat bubbles */}
        {[
          { text: "Summarize this article", isUser: true },
          { text: "Here's a quick summary of the key points...", isUser: false },
        ].map((msg, i) => {
          const bubbleProgress = spring({
            frame,
            fps,
            delay: fps + i * 20,
            config: { damping: 12, stiffness: 100 },
          });

          return (
            <div
              key={`msg-${i}`}
              style={{
                opacity: interpolate(bubbleProgress, [0, 1], [0, 1]),
                transform: `translateY(${interpolate(bubbleProgress, [0, 1], [10, 0])}px)`,
                display: "flex",
                justifyContent: msg.isUser ? "flex-end" : "flex-start",
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  maxWidth: 320,
                  padding: "12px 18px",
                  borderRadius: 12,
                  fontSize: 16,
                  fontFamily,
                  color: msg.isUser ? colors.white : colors.chineseSilver,
                  background: msg.isUser
                    ? colors.darkCyra
                    : `${colors.darkSlateGray}80`,
                }}
              >
                {msg.text}
              </div>
            </div>
          );
        })}

        {/* Label */}
        <div
          style={{
            marginTop: 40,
            textAlign: "center",
            fontSize: 14,
            color: colors.rhythm,
            fontFamily,
            letterSpacing: 2,
          }}
        >
          WEB DEMO
        </div>
      </div>
    </div>
  );
};

// Enterprise dashboard (right side)
const EnterpriseDashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideProgress = spring({
    frame,
    fps,
    delay: 1.5 * fps,
    config: { damping: 14, stiffness: 80 },
  });
  const slideX = interpolate(slideProgress, [0, 1], [960, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(slideProgress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const rows = [
    { label: "Revenue Impact", value: "$2.4M", status: "CRITICAL" },
    { label: "Compliance Status", value: "PENDING", status: "WARNING" },
    { label: "Stakeholder Approval", value: "3 / 7", status: "BLOCKED" },
    { label: "Model Accuracy", value: "91.2%", status: "REVIEW" },
  ];

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "50%",
        height: "100%",
        opacity,
        transform: `translateX(${slideX}px)`,
        background: `linear-gradient(180deg, ${colors.darkNavy} 0%, #0a1020 100%)`,
        overflow: "hidden",
        borderLeft: `2px solid ${colors.darkCyra}40`,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          borderBottom: `1px solid ${colors.darkCyra}30`,
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24">
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="3"
            fill="none"
            stroke={colors.darkCyra}
            strokeWidth="2"
          />
          <line
            x1="3"
            y1="9"
            x2="21"
            y2="9"
            stroke={colors.darkCyra}
            strokeWidth="1.5"
          />
          <line
            x1="9"
            y1="9"
            x2="9"
            y2="21"
            stroke={colors.darkCyra}
            strokeWidth="1.5"
          />
        </svg>
        <span
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: colors.white,
            fontFamily,
          }}
        >
          Enterprise AI Platform
        </span>
      </div>

      {/* Data rows */}
      <div style={{ padding: "16px 24px" }}>
        {rows.map((row, i) => {
          const rowProgress = spring({
            frame,
            fps,
            delay: 2 * fps + i * 12,
            config: { damping: 12, stiffness: 100 },
          });

          const statusColor =
            row.status === "CRITICAL"
              ? colors.oldRose
              : row.status === "WARNING"
                ? colors.corn
                : row.status === "BLOCKED"
                  ? colors.oldRose
                  : colors.tiffanyBlue;

          return (
            <div
              key={row.label}
              style={{
                opacity: interpolate(rowProgress, [0, 1], [0, 1]),
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 0",
                borderBottom: `1px solid ${colors.darkSlateGray}30`,
              }}
            >
              <span
                style={{
                  fontSize: 15,
                  color: colors.chineseSilver,
                  fontFamily,
                }}
              >
                {row.label}
              </span>
              <span
                style={{
                  fontSize: 15,
                  color: colors.white,
                  fontFamily,
                  fontWeight: 700,
                }}
              >
                {row.value}
              </span>
              <span
                style={{
                  fontSize: 11,
                  fontFamily,
                  padding: "3px 10px",
                  borderRadius: 8,
                  color: statusColor,
                  background: `${statusColor}20`,
                  fontWeight: 700,
                  letterSpacing: 1,
                }}
              >
                {row.status}
              </span>
            </div>
          );
        })}
      </div>

      {/* Label */}
      <div
        style={{
          padding: "24px",
          textAlign: "center",
          fontSize: 14,
          color: colors.rhythm,
          fontFamily,
          letterSpacing: 2,
        }}
      >
        ENTERPRISE SYSTEM
      </div>
    </div>
  );
};

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow zoom
  const zoom = interpolate(frame, [0, 12 * fps], [1, 1.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Overlay for text readability
  const overlayOpacity = interpolate(frame, [3 * fps, 4.5 * fps], [0, 0.7], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Main text
  const textProgress = spring({
    frame,
    fps,
    delay: 4 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const textOpacity = interpolate(textProgress, [0, 1], [0, 1]);
  const textScale = interpolate(textProgress, [0, 1], [0.85, 1]);
  const textY = interpolate(textProgress, [0, 1], [30, 0]);

  return (
    <AbsoluteFill style={{ background: colors.darkNavy, fontFamily }}>
      <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
        <StartupDemo />
        <EnterpriseDashboard />
      </AbsoluteFill>

      {/* Dark overlay */}
      <AbsoluteFill
        style={{ background: colors.darkNavy, opacity: overlayOpacity }}
      />

      {/* Main text */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          paddingBottom: 200,
        }}
      >
        <div
          style={{
            opacity: textOpacity,
            transform: `scale(${textScale}) translateY(${textY}px)`,
            fontSize: 58,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            lineHeight: 1.4,
            maxWidth: 1200,
            padding: "0 60px",
          }}
        >
          Demo or{" "}
          <span style={{ color: colors.tiffanyBlue }}>Enterprise System</span>?
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
