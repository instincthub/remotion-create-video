import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// SVG icons for each bullet
const RulesIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
    <rect x="8" y="6" width="40" height="44" rx="4" stroke={color} strokeWidth="3" fill="none" />
    <line x1="16" y1="18" x2="40" y2="18" stroke={color} strokeWidth="2" />
    <line x1="16" y1="28" x2="36" y2="28" stroke={color} strokeWidth="2" />
    <line x1="16" y1="38" x2="32" y2="38" stroke={color} strokeWidth="2" />
  </svg>
);

const TrophyIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
    <path d="M18 12h20v16c0 6-4 10-10 10s-10-4-10-10V12z" stroke={color} strokeWidth="3" fill="none" />
    <path d="M18 16h-6c0 6 3 10 6 10" stroke={color} strokeWidth="2.5" fill="none" />
    <path d="M38 16h6c0 6-3 10-6 10" stroke={color} strokeWidth="2.5" fill="none" />
    <line x1="28" y1="38" x2="28" y2="46" stroke={color} strokeWidth="3" />
    <line x1="20" y1="46" x2="36" y2="46" stroke={color} strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const ShieldIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
    <path d="M28 6l18 8v14c0 12-8 20-18 24-10-4-18-12-18-24V14L28 6z" stroke={color} strokeWidth="3" fill="none" />
    <polyline points="20,28 26,34 36,22" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChartIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
    <line x1="10" y1="46" x2="46" y2="46" stroke={color} strokeWidth="3" />
    <line x1="10" y1="10" x2="10" y2="46" stroke={color} strokeWidth="3" />
    <rect x="18" y="30" width="8" height="16" rx="2" fill={color} opacity={0.7} />
    <rect x="30" y="20" width="8" height="26" rx="2" fill={color} opacity={0.85} />
    <rect x="42" y="14" width="8" height="32" rx="2" fill={color} />
  </svg>
);

const BULLETS = [
  { text: "Clear Rules", sub: "Structured and unambiguous", icon: RulesIcon, color: colors.darkCyra },
  { text: "Obvious Outcome", sub: "Win or lose — easy to evaluate", icon: TrophyIcon, color: colors.viridianGreen },
  { text: "Zero Risk", sub: "Safe to experiment and fail", icon: ShieldIcon, color: colors.caribbeanGreen },
  { text: "Easy to Measure", sub: "Performance is quantifiable", icon: ChartIcon, color: colors.tiffanyBlue },
];

// Floating particles
const FloatingIcons: React.FC = () => {
  const frame = useCurrentFrame();

  const items = [
    { x: 100, y: 120, size: 14 }, { x: 1750, y: 200, size: 10 },
    { x: 200, y: 800, size: 12 }, { x: 1700, y: 750, size: 14 },
    { x: 400, y: 100, size: 8 }, { x: 1500, y: 900, size: 10 },
  ];

  const opacity = interpolate(frame, [0, 40], [0, 0.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity }}>
      {items.map((item, i) => {
        const floatY = Math.sin((frame * 0.04 + i * 40) * 2) * 15;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: item.x,
              top: item.y + floatY,
              width: item.size,
              height: item.size,
              borderRadius: "50%",
              backgroundColor: colors.darkCyra,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export const Scene2WhyGames: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 200 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [40, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.magnolia,
        fontFamily,
      }}
    >
      <FloatingIcons />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 64,
          fontWeight: "bold",
          color: colors.gunmetal,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        Why{" "}
        <span style={{ color: colors.darkCyra }}>Games</span>?
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: "absolute",
          top: 170,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 28,
          color: colors.rhythm,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        The perfect laboratory for Artificial Intelligence
      </div>

      {/* Bullet points */}
      <div
        style={{
          position: "absolute",
          top: 280,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
        }}
      >
        {BULLETS.map((bullet, i) => {
          const bulletProgress = spring({
            frame,
            fps,
            delay: (1.5 + i * 1) * fps,
            config: { damping: 12, stiffness: 120 },
          });
          const bulletX = interpolate(bulletProgress, [0, 1], [-200, 0]);
          const bulletOpacity = interpolate(bulletProgress, [0, 1], [0, 1]);

          const IconComponent = bullet.icon;

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 28,
                transform: `translateX(${bulletX}px)`,
                opacity: bulletOpacity,
                width: 700,
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 16,
                  backgroundColor: `${bullet.color}15`,
                  border: `2px solid ${bullet.color}40`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <IconComponent color={bullet.color} />
              </div>

              {/* Text */}
              <div>
                <div
                  style={{
                    fontSize: 36,
                    fontWeight: "bold",
                    color: colors.gunmetal,
                    lineHeight: 1.3,
                  }}
                >
                  {bullet.text}
                </div>
                <div
                  style={{
                    fontSize: 22,
                    color: colors.rhythm,
                    lineHeight: 1.4,
                  }}
                >
                  {bullet.sub}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
