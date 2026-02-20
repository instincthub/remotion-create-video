import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// SVG icons for each consequence
const MoneyIcon: React.FC = () => (
  <svg width="44" height="44" viewBox="0 0 44 44">
    <circle cx="22" cy="22" r="18" fill="none" stroke={colors.oldRose} strokeWidth="2.5" />
    <text
      x="22"
      y="28"
      textAnchor="middle"
      fill={colors.oldRose}
      fontSize="22"
      fontWeight="bold"
      fontFamily="sans-serif"
    >
      $
    </text>
  </svg>
);

const JusticeIcon: React.FC = () => (
  <svg width="44" height="44" viewBox="0 0 44 44">
    <line x1="22" y1="6" x2="22" y2="38" stroke={colors.oldRose} strokeWidth="2.5" strokeLinecap="round" />
    <line x1="8" y1="14" x2="36" y2="14" stroke={colors.oldRose} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M8,14 L4,26 C4,30 12,30 12,26 Z" fill="none" stroke={colors.oldRose} strokeWidth="2" />
    <path d="M36,14 L32,26 C32,30 40,30 40,26 Z" fill="none" stroke={colors.oldRose} strokeWidth="2" />
    <rect x="16" y="36" width="12" height="3" rx="1.5" fill={colors.oldRose} />
  </svg>
);

const MedicalIcon: React.FC = () => (
  <svg width="44" height="44" viewBox="0 0 44 44">
    <rect x="6" y="6" width="32" height="32" rx="6" fill="none" stroke={colors.oldRose} strokeWidth="2.5" />
    <rect x="18" y="12" width="8" height="20" rx="1" fill={colors.oldRose} opacity={0.9} />
    <rect x="12" y="18" width="20" height="8" rx="1" fill={colors.oldRose} opacity={0.9} />
  </svg>
);

interface ConsequenceItem {
  icon: React.FC;
  text: string;
  delay: number; // seconds
}

const consequences: ConsequenceItem[] = [
  { icon: MoneyIcon, text: "Wrong loan approved", delay: 3 },
  { icon: JusticeIcon, text: "Wrong suspect identified", delay: 6 },
  { icon: MedicalIcon, text: "Wrong medical treatment", delay: 9 },
];

// Background wave lines
const WaveBackground: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 30], [0, 0.12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        {Array.from({ length: 8 }, (_, i) => {
          const yBase = 120 + i * 120;
          const phase = frame * 0.015 + i * 0.5;
          const points = Array.from({ length: 20 }, (_, j) => {
            const x = j * 101;
            const y = yBase + Math.sin(phase + j * 0.3) * 20;
            return `${x},${y}`;
          }).join(" ");
          return (
            <polyline
              key={`wave-${i}`}
              points={points}
              fill="none"
              stroke={colors.tiffanyBlue}
              strokeWidth="1"
              opacity={0.3}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

export const Scene4Consequences: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title with glitch-shake effect
  const titleProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 12, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleScale = interpolate(titleProgress, [0, 1], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtle shake for title emphasis (only in the first 2 seconds)
  const shakeIntensity = interpolate(frame, [8, 20, 40], [0, 6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shakeX = Math.sin(frame * 1.8) * shakeIntensity;
  const shakeY = Math.cos(frame * 2.3) * shakeIntensity * 0.5;

  // Final text words appearing with emphasis
  const finalWords = [
    { word: "Correct.", delay: 13, color: colors.caribbeanGreen },
    { word: "Consistent.", delay: 14.5, color: colors.tiffanyBlue },
    { word: "Explainable.", delay: 16, color: colors.corn },
  ];

  const finalPrefixDelay = 12 * fps;
  const finalPrefixProgress = spring({
    frame,
    fps,
    delay: finalPrefixDelay,
    config: { damping: 10, stiffness: 80 },
  });
  const finalPrefixOpacity = interpolate(finalPrefixProgress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${colors.deepGreenCyanTurquoise} 0%, #1a3d38 40%, ${colors.darkNavy} 100%)`,
        fontFamily,
      }}
    >
      <WaveBackground />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 2,
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `scale(${titleScale}) translate(${shakeX}px, ${shakeY}px)`,
            fontSize: 54,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
          }}
        >
          Consequences{" "}
          <span style={{ color: colors.oldRose }}>Matter</span>
        </div>
      </div>

      {/* Consequence items */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 36,
          paddingTop: 40,
          paddingBottom: 280,
          zIndex: 2,
        }}
      >
        {consequences.map((item, i) => {
          const itemProgress = spring({
            frame,
            fps,
            delay: item.delay * fps,
            config: { damping: 12, stiffness: 90 },
          });
          const itemOpacity = interpolate(itemProgress, [0, 1], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const itemX = interpolate(itemProgress, [0, 1], [-60, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const itemScale = interpolate(itemProgress, [0, 1], [0.9, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          // Red highlight glow animation
          const glowStrength = interpolate(
            itemProgress,
            [0.5, 0.8, 1],
            [0, 0.25, 0.15],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          const IconComponent = item.icon;

          return (
            <div
              key={item.text}
              style={{
                opacity: itemOpacity,
                transform: `translateX(${itemX}px) scale(${itemScale})`,
                display: "flex",
                alignItems: "center",
                gap: 24,
                background: `${colors.darkNavy}90`,
                padding: "20px 40px",
                borderRadius: 16,
                border: `1px solid ${colors.oldRose}40`,
                boxShadow: `0 0 ${glowStrength > 0 ? 30 : 0}px ${colors.oldRose}${Math.round(glowStrength * 255).toString(16).padStart(2, "0")}, inset 0 0 ${glowStrength > 0 ? 20 : 0}px ${colors.oldRose}${Math.round(glowStrength * 100).toString(16).padStart(2, "0")}`,
                minWidth: 500,
              }}
            >
              {/* Number badge */}
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  background: `${colors.oldRose}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  fontWeight: 700,
                  color: colors.oldRose,
                  fontFamily,
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </div>

              <IconComponent />

              <div
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: colors.white,
                }}
              >
                {item.text}
              </div>
            </div>
          );
        })}
      </AbsoluteFill>

      {/* Final emphatic text */}
      <div
        style={{
          position: "absolute",
          bottom: 240,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          zIndex: 3,
        }}
      >
        <div
          style={{
            opacity: finalPrefixOpacity,
            fontSize: 26,
            color: colors.chineseSilver,
            textAlign: "center",
          }}
        >
          Enterprise systems must be
        </div>
        <div
          style={{
            display: "flex",
            gap: 32,
            alignItems: "center",
          }}
        >
          {finalWords.map((item) => {
            const wordProgress = spring({
              frame,
              fps,
              delay: item.delay * fps,
              config: { damping: 8, stiffness: 100 },
            });
            const wordOpacity = interpolate(wordProgress, [0, 1], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const wordScale = interpolate(wordProgress, [0, 1], [0.6, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const wordY = interpolate(wordProgress, [0, 1], [15, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <div
                key={item.word}
                style={{
                  opacity: wordOpacity,
                  transform: `scale(${wordScale}) translateY(${wordY}px)`,
                  fontSize: 38,
                  fontWeight: 700,
                  color: item.color,
                  fontFamily,
                }}
              >
                {item.word}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
