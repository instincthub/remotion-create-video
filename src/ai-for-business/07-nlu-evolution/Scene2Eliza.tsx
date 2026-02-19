import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Retro terminal with typewriter effect
const Terminal: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const lines = [
    { type: "user", text: "> I feel sad", startFrame: 2 * fps },
    { type: "eliza", text: "Why do you feel sad?", startFrame: 4 * fps },
    { type: "user", text: "> I'm worried about my future", startFrame: 7 * fps },
    { type: "eliza", text: "Why are you worried about your future?", startFrame: 9 * fps },
    { type: "user", text: "> Can you help me?", startFrame: 13 * fps },
    { type: "eliza", text: "What kind of help do you need?", startFrame: 15 * fps },
  ];

  const cursorBlink = Math.sin(frame * 0.2) > 0;

  return (
    <div
      style={{
        width: 900,
        backgroundColor: "#0a0a0a",
        borderRadius: 12,
        border: `1px solid ${colors.darkCyra}40`,
        overflow: "hidden",
        boxShadow: `0 0 40px ${colors.darkCyra}15, inset 0 0 60px ${colors.darkCyra}05`,
      }}
    >
      {/* Title bar */}
      <div
        style={{
          padding: "10px 16px",
          backgroundColor: colors.darkCyra,
          display: "flex",
          gap: 8,
          alignItems: "center",
        }}
      >
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: colors.oldRose }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: colors.corn }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: colors.caribbeanGreen }} />
        <span
          style={{
            marginLeft: 12,
            color: colors.white,
            fontSize: 14,
            fontWeight: "bold",
            letterSpacing: 1,
          }}
        >
          ELIZA.exe
        </span>
      </div>

      {/* Terminal body */}
      <div
        style={{
          padding: 30,
          fontFamily: "monospace",
          fontSize: 22,
          lineHeight: 2,
          minHeight: 350,
        }}
      >
        {/* Greeting */}
        <div style={{ color: colors.caribbeanGreen, marginBottom: 8 }}>
          ELIZA: Hello. How are you feeling today?
        </div>

        {lines.map((line, i) => {
          if (frame < line.startFrame) return null;
          const elapsed = frame - line.startFrame;
          const typingSpeed = 1.5; // frames per character
          const charsShown = Math.min(
            Math.floor(elapsed / typingSpeed),
            line.text.length
          );
          const isComplete = charsShown >= line.text.length;
          const displayText = line.text.slice(0, charsShown);

          return (
            <div
              key={i}
              style={{
                color: line.type === "user" ? colors.chineseSilver : colors.caribbeanGreen,
                marginBottom: 4,
              }}
            >
              {line.type === "eliza" && "ELIZA: "}
              {displayText}
              {!isComplete && cursorBlink && (
                <span style={{ color: colors.tiffanyBlue }}>|</span>
              )}
            </div>
          );
        })}

        {/* Active cursor at end */}
        {frame > 18 * fps && cursorBlink && (
          <span style={{ color: colors.tiffanyBlue }}>{">"} |</span>
        )}
      </div>
    </div>
  );
};

// Keyword matching diagram
const KeywordDiagram: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const progress = spring({
    frame,
    fps,
    delay: 11 * fps,
    config: { damping: 200 },
  });
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  const arrowProgress = interpolate(frame, [12 * fps, 14 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        right: 100,
        top: 400,
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div
        style={{
          fontSize: 16,
          color: colors.rhythm,
          fontWeight: "bold",
          letterSpacing: 2,
          textTransform: "uppercase",
        }}
      >
        How it works
      </div>
      <svg width="280" height="160" viewBox="0 0 280 160" fill="none">
        {/* Input box */}
        <rect x="10" y="10" width="260" height="40" rx="6" stroke={colors.tiffanyBlue} strokeWidth="1.5" fill={`${colors.tiffanyBlue}10`} />
        <text x="140" y="35" textAnchor="middle" fill={colors.white} fontSize="16" fontFamily="monospace">
          &quot;I feel <tspan fill={colors.corn} fontWeight="bold">sad</tspan>&quot;
        </text>

        {/* Arrow */}
        <line
          x1="140"
          y1="50"
          x2="140"
          y2={50 + 30 * arrowProgress}
          stroke={colors.tiffanyBlue}
          strokeWidth="2"
          strokeDasharray="4 3"
        />
        {arrowProgress > 0.9 && (
          <polygon points="133,78 140,88 147,78" fill={colors.tiffanyBlue} />
        )}

        {/* Pattern match box */}
        <rect x="30" y="90" width="220" height="40" rx="6" stroke={colors.caribbeanGreen} strokeWidth="1.5" fill={`${colors.caribbeanGreen}10`} opacity={arrowProgress} />
        <text x="140" y="115" textAnchor="middle" fill={colors.caribbeanGreen} fontSize="16" fontFamily="monospace" opacity={arrowProgress}>
          &quot;Why do you feel sad?&quot;
        </text>
      </svg>
      <div
        style={{
          fontSize: 14,
          color: colors.rhythm,
          textAlign: "center",
          opacity: arrowProgress,
        }}
      >
        Keyword rearrangement
        <br />
        No real understanding
      </div>
    </div>
  );
};

export const Scene2Eliza: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Era badge
  const badgeProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 200 },
  });
  const badgeOpacity = interpolate(badgeProgress, [0, 1], [0, 1]);

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 12, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  // Terminal entrance
  const termProgress = spring({
    frame,
    fps,
    delay: 20,
    config: { damping: 200 },
  });
  const termOpacity = interpolate(termProgress, [0, 1], [0, 1]);
  const termY = interpolate(termProgress, [0, 1], [40, 0]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${colors.magnolia}, ${colors.white})`,
        fontFamily,
      }}
    >
      {/* Dark Cyra title bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          backgroundColor: colors.darkCyra,
        }}
      />

      {/* Era badge */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 100,
          opacity: badgeOpacity,
        }}
      >
        <span
          style={{
            display: "inline-block",
            padding: "8px 24px",
            borderRadius: 40,
            backgroundColor: `${colors.darkCyra}15`,
            border: `2px solid ${colors.darkCyra}40`,
            color: colors.darkCyra,
            fontSize: 22,
            fontWeight: "bold",
            letterSpacing: 3,
          }}
        >
          1966
        </span>
      </div>

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 100,
          fontSize: 56,
          fontWeight: "bold",
          color: colors.darkSlateGray,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <span style={{ color: colors.darkCyra }}>ELIZA</span>
        <span style={{ fontSize: 28, color: colors.rhythm, marginLeft: 20 }}>
          The first chatbot
        </span>
      </div>

      {/* Terminal */}
      <div
        style={{
          position: "absolute",
          top: 210,
          left: 100,
          opacity: termOpacity,
          transform: `translateY(${termY}px)`,
        }}
      >
        <Terminal frame={frame} fps={fps} />
      </div>

      <KeywordDiagram frame={frame} fps={fps} />

      {/* Bottom text */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: 100,
          right: 100,
          fontSize: 26,
          color: colors.gunmetal,
          lineHeight: 1.5,
          opacity: interpolate(frame, [18 * fps, 20 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Clever, but it had{" "}
        <span style={{ color: colors.oldRose, fontWeight: "bold" }}>zero understanding</span>.
        It simply <span style={{ color: colors.darkCyra, fontWeight: "bold" }}>mirrored</span> you.
      </div>
    </AbsoluteFill>
  );
};
