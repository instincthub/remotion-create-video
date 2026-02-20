import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// SVG icons for each industry block
const BankIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width="48" height="48" viewBox="0 0 48 48">
    <polygon points="24,4 44,18 4,18" fill="none" stroke={color} strokeWidth="2.5" />
    <rect x="8" y="20" width="32" height="2" fill={color} />
    <rect x="12" y="24" width="4" height="14" rx="1" fill={color} opacity={0.8} />
    <rect x="22" y="24" width="4" height="14" rx="1" fill={color} opacity={0.8} />
    <rect x="32" y="24" width="4" height="14" rx="1" fill={color} opacity={0.8} />
    <rect x="6" y="40" width="36" height="3" rx="1" fill={color} />
  </svg>
);

const HospitalIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width="48" height="48" viewBox="0 0 48 48">
    <rect x="8" y="10" width="32" height="30" rx="3" fill="none" stroke={color} strokeWidth="2.5" />
    <rect x="20" y="16" width="8" height="18" rx="1" fill={color} opacity={0.8} />
    <rect x="15" y="21" width="18" height="8" rx="1" fill={color} opacity={0.8} />
  </svg>
);

const ShieldIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width="48" height="48" viewBox="0 0 48 48">
    <path
      d="M24 4 L40 12 L40 26 C40 36 24 44 24 44 C24 44 8 36 8 26 L8 12 Z"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
    />
    <polyline
      points="16,24 22,30 34,18"
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const GovernmentIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width="48" height="48" viewBox="0 0 48 48">
    <rect x="10" y="14" width="4" height="24" rx="1" fill={color} opacity={0.8} />
    <rect x="18" y="14" width="4" height="24" rx="1" fill={color} opacity={0.8} />
    <rect x="26" y="14" width="4" height="24" rx="1" fill={color} opacity={0.8} />
    <rect x="34" y="14" width="4" height="24" rx="1" fill={color} opacity={0.8} />
    <rect x="6" y="10" width="36" height="4" rx="1" fill={color} />
    <rect x="6" y="38" width="36" height="4" rx="1" fill={color} />
    <polygon points="24,2 44,10 4,10" fill="none" stroke={color} strokeWidth="2" />
  </svg>
);

interface BlockData {
  label: string;
  icon: React.FC<{ color: string }>;
  fromDirection: "left" | "right" | "top" | "bottom";
  x: number;
  y: number;
  delay: number;
}

const blocks: BlockData[] = [
  { label: "Bank", icon: BankIcon, fromDirection: "left", x: 400, y: 350, delay: 1 },
  { label: "Hospital", icon: HospitalIcon, fromDirection: "top", x: 960, y: 200, delay: 2.5 },
  { label: "Insurance", icon: ShieldIcon, fromDirection: "right", x: 1520, y: 350, delay: 4 },
  { label: "Government", icon: GovernmentIcon, fromDirection: "bottom", x: 960, y: 500, delay: 5.5 },
];

// Subtle background grid pattern
const BackgroundGrid: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 30], [0, 0.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        {Array.from({ length: 20 }, (_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={i * 54}
            x2="1920"
            y2={i * 54}
            stroke={colors.darkSlateGray}
            strokeWidth="1"
          />
        ))}
        {Array.from({ length: 36 }, (_, i) => (
          <line
            key={`v-${i}`}
            x1={i * 54}
            y1="0"
            x2={i * 54}
            y2="1080"
            stroke={colors.darkSlateGray}
            strokeWidth="1"
          />
        ))}
      </svg>
    </AbsoluteFill>
  );
};

export const Scene2Mission: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
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
  const titleScale = interpolate(titleProgress, [0, 1], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Connecting highlight animation
  const connectDelay = 9 * fps;
  const connectProgress = interpolate(frame, [connectDelay, connectDelay + 2 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Bottom text
  const bottomTextProgress = spring({
    frame,
    fps,
    delay: 11 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const bottomTextOpacity = interpolate(bottomTextProgress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bottomTextY = interpolate(bottomTextProgress, [0, 1], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: colors.magnolia,
        fontFamily,
      }}
    >
      <BackgroundGrid />

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
            transform: `scale(${titleScale})`,
            fontSize: 52,
            fontWeight: 700,
            color: colors.darkSlateGray,
            textAlign: "center",
          }}
        >
          Technology vs{" "}
          <span style={{ color: colors.darkCyra }}>Business Mission</span>
        </div>
      </div>

      {/* Industry blocks */}
      {blocks.map((block, i) => {
        const blockProgress = spring({
          frame,
          fps,
          delay: block.delay * fps,
          config: { damping: 12, stiffness: 90 },
        });

        const offsetMap = {
          left: { x: [-200, 0], y: [0, 0] },
          right: { x: [200, 0], y: [0, 0] },
          top: { x: [0, 0], y: [-200, 0] },
          bottom: { x: [0, 0], y: [200, 0] },
        };
        const offsets = offsetMap[block.fromDirection];

        const blockX = interpolate(blockProgress, [0, 1], offsets.x, {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const blockY = interpolate(blockProgress, [0, 1], offsets.y, {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const blockOpacity = interpolate(blockProgress, [0, 1], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        // Highlight glow after connecting
        const glowOpacity = interpolate(connectProgress, [0, 0.5, 1], [0, 0.15, 0.25], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        const IconComponent = block.icon;

        return (
          <div
            key={block.label}
            style={{
              position: "absolute",
              left: block.x - 90,
              top: block.y - 60,
              opacity: blockOpacity,
              transform: `translate(${blockX}px, ${blockY}px)`,
              width: 180,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 160,
                height: 120,
                borderRadius: 16,
                background: colors.white,
                border: `2px solid ${colors.darkCyra}30`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                boxShadow: `0 4px 24px ${colors.darkSlateGray}15, 0 0 ${glowOpacity > 0 ? 40 : 0}px ${colors.tiffanyBlue}${Math.round(glowOpacity * 255).toString(16).padStart(2, "0")}`,
              }}
            >
              <IconComponent color={colors.darkCyra} />
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: colors.darkSlateGray,
                  fontFamily,
                }}
              >
                {block.label}
              </div>
            </div>
          </div>
        );
      })}

      {/* Connecting lines SVG layer */}
      <AbsoluteFill style={{ zIndex: 1 }}>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080">
          {/* Lines from each block to center point */}
          {blocks.map((block, i) => {
            const centerX = 960;
            const centerY = 370;
            const lineLength = interpolate(connectProgress, [0, 1], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const lineOpacity = interpolate(connectProgress, [0, 0.3], [0, 0.6], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <line
                key={`line-${i}`}
                x1={block.x}
                y1={block.y}
                x2={block.x + (centerX - block.x) * lineLength}
                y2={block.y + (centerY - block.y) * lineLength}
                stroke={colors.tiffanyBlue}
                strokeWidth={2}
                opacity={lineOpacity}
                strokeDasharray="8,4"
              />
            );
          })}

          {/* Center connecting circle */}
          <circle
            cx={960}
            cy={370}
            r={interpolate(connectProgress, [0.3, 0.8], [0, 20], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
            fill={colors.tiffanyBlue}
            opacity={interpolate(connectProgress, [0.3, 0.8], [0, 0.4], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
          />
        </svg>
      </AbsoluteFill>

      {/* Bottom text */}
      <div
        style={{
          position: "absolute",
          bottom: 240,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 3,
        }}
      >
        <div
          style={{
            opacity: bottomTextOpacity,
            transform: `translateY(${bottomTextY}px)`,
            fontSize: 36,
            fontWeight: 700,
            color: colors.darkSlateGray,
            textAlign: "center",
            background: `${colors.magnolia}E0`,
            padding: "16px 40px",
            borderRadius: 16,
            border: `2px solid ${colors.tiffanyBlue}30`,
          }}
        >
          Their goal is to{" "}
          <span style={{ color: colors.darkCyra }}>serve customers</span>.
        </div>
      </div>
    </AbsoluteFill>
  );
};
