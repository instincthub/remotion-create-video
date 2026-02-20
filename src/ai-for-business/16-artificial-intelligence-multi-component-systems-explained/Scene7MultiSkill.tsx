import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const skillBots = [
  { label: "Travel", color: colors.darkCyra, emoji: "T" },
  { label: "Weather", color: colors.viridianGreen, emoji: "W" },
  { label: "Food", color: colors.caribbeanGreen, emoji: "F" },
];

export const Scene7MultiSkill: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 8,
    config: { damping: 12, stiffness: 80 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  // Subtitle
  const subProgress = spring({
    frame,
    fps,
    delay: fps,
    config: { damping: 10, stiffness: 70 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);

  // User input
  const inputProgress = spring({
    frame,
    fps,
    delay: 2 * fps,
    config: { damping: 12, stiffness: 70 },
  });
  const inputOpacity = interpolate(inputProgress, [0, 1], [0, 1]);
  const inputY = interpolate(inputProgress, [0, 1], [20, 0]);

  // Router node
  const routerProgress = spring({
    frame,
    fps,
    delay: 3.5 * fps,
    config: { damping: 12, stiffness: 70 },
  });
  const routerOpacity = interpolate(routerProgress, [0, 1], [0, 1]);
  const routerScale = interpolate(routerProgress, [0, 1], [0.7, 1]);

  // Bottom label
  const bottomProgress = spring({
    frame,
    fps,
    delay: 7.5 * fps,
    config: { damping: 10, stiffness: 60 },
  });
  const bottomOpacity = interpolate(bottomProgress, [0, 1], [0, 1]);

  // Node positions
  const routerX = 960;
  const routerY = 480;
  const inputX = 960;
  const inputY2 = 280;
  const skillPositions = [
    { x: 460, y: 620 },
    { x: 960, y: 620 },
    { x: 1460, y: 620 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: colors.magnolia,
        fontFamily,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontSize: 50,
            fontWeight: 700,
            color: colors.darkSlateGray,
          }}
        >
          Multi-Skill <span style={{ color: colors.darkCyra }}>Agents</span>
        </div>
        <div
          style={{
            opacity: subOpacity,
            fontSize: 26,
            color: colors.rhythm,
            marginTop: 12,
          }}
        >
          Modular design. Flexible expansion.
        </div>
      </div>

      {/* User Input Box */}
      <div
        style={{
          position: "absolute",
          left: inputX - 160,
          top: inputY2 - 30,
          opacity: inputOpacity,
          transform: `translateY(${inputY}px)`,
          width: 320,
          background: colors.white,
          borderRadius: 14,
          padding: "16px 24px",
          textAlign: "center",
          boxShadow: `0 4px 20px ${colors.gunmetal}10`,
          border: `2px solid ${colors.tiffanyBlue}30`,
        }}
      >
        <div style={{ fontSize: 14, color: colors.rhythm, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 2 }}>
          User Query
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, color: colors.gunmetal, marginTop: 4 }}>
          "Book a flight to Paris"
        </div>
      </div>

      {/* Router Node */}
      <div
        style={{
          position: "absolute",
          left: routerX - 100,
          top: routerY - 50,
          opacity: routerOpacity,
          transform: `scale(${routerScale})`,
          width: 200,
          height: 100,
          background: `linear-gradient(135deg, ${colors.darkCyra} 0%, ${colors.viridianGreen} 100%)`,
          borderRadius: 50,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 8px 32px ${colors.darkCyra}30`,
        }}
      >
        <div style={{ fontSize: 14, color: `${colors.white}90`, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 2 }}>
          Router
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, color: colors.white }}>
          Intent Layer
        </div>
      </div>

      {/* Skill Bot Nodes */}
      {skillBots.map((bot, i) => {
        const botDelay = 5 * fps + i * 14;
        const botProgress = spring({
          frame,
          fps,
          delay: botDelay,
          config: { damping: 12, stiffness: 70 },
        });
        const botOpacity = interpolate(botProgress, [0, 1], [0, 1]);
        const botScale = interpolate(botProgress, [0, 1], [0.7, 1]);

        return (
          <div
            key={`bot-${i}`}
            style={{
              position: "absolute",
              left: skillPositions[i].x - 130,
              top: skillPositions[i].y - 50,
              opacity: botOpacity,
              transform: `scale(${botScale})`,
              width: 260,
              background: colors.white,
              borderRadius: 16,
              padding: "24px 20px",
              textAlign: "center",
              boxShadow: `0 4px 20px ${colors.gunmetal}10`,
              border: `2px solid ${bot.color}30`,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: bot.color,
                margin: "0 auto 12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                fontWeight: 700,
                color: colors.white,
              }}
            >
              {bot.emoji}
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: colors.gunmetal }}>
              {bot.label}
            </div>
            <div style={{ fontSize: 14, color: colors.rhythm, marginTop: 4 }}>
              Expert Bot
            </div>
          </div>
        );
      })}

      {/* Connection lines */}
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
      >
        <defs>
          <marker id="skill-arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill={colors.darkCyra} />
          </marker>
        </defs>

        {/* Input to Router */}
        <line
          x1={inputX}
          y1={inputY2 + 40}
          x2={routerX}
          y2={routerY - 55}
          stroke={colors.tiffanyBlue}
          strokeWidth={2.5}
          opacity={interpolate(routerProgress, [0, 1], [0, 0.6])}
          markerEnd="url(#skill-arrow)"
          strokeDasharray="6 4"
        />

        {/* Router to each skill bot */}
        {skillPositions.map((pos, i) => {
          const lineProgress = spring({
            frame,
            fps,
            delay: 5 * fps + i * 14,
            config: { damping: 12, stiffness: 70 },
          });
          const lineOpacity = interpolate(lineProgress, [0, 1], [0, 0.6]);

          return (
            <line
              key={`line-${i}`}
              x1={routerX}
              y1={routerY + 55}
              x2={pos.x}
              y2={pos.y - 55}
              stroke={skillBots[i].color}
              strokeWidth={2.5}
              opacity={lineOpacity}
              markerEnd="url(#skill-arrow)"
              strokeDasharray="6 4"
            />
          );
        })}
      </svg>

      {/* Bottom label */}
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
        <div style={{ fontSize: 28, fontWeight: 700, color: colors.darkSlateGray }}>
          Each bot is{" "}
          <span style={{ color: colors.darkCyra }}>specialised.</span>{" "}
          The router directs.
        </div>
      </div>
    </AbsoluteFill>
  );
};
