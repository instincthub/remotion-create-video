import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Data stream particles flowing upward
const DataStream: React.FC<{ frame: number; x: number; speed: number }> = ({
  frame,
  x,
  speed,
}) => {
  const particles = Array.from({ length: 12 }).map((_, i) => {
    const yBase = ((frame * speed + i * 90) % 1080);
    const opacity = interpolate(yBase, [0, 200, 880, 1080], [0, 0.6, 0.6, 0]);
    const chars = "01";
    const char = chars[Math.floor((frame * 0.3 + i * 7) % chars.length)];
    return { y: 1080 - yBase, opacity, char };
  });

  return (
    <>
      {particles.map((p, i) => (
        <text
          key={i}
          x={x}
          y={p.y}
          fill={colors.tiffanyBlue}
          fontSize={14}
          fontFamily="monospace"
          opacity={p.opacity * 0.4}
        >
          {p.char}
        </text>
      ))}
    </>
  );
};

// Buzzer button animation
const BuzzerButton: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const pressFrame = 4 * fps;
  const isPressed = frame > pressFrame && frame < pressFrame + 8;
  const scale = isPressed ? 0.9 : 1;
  const glowIntensity = isPressed
    ? interpolate(frame - pressFrame, [0, 8], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  const pulse = frame > pressFrame ? Math.sin((frame - pressFrame) * 0.1) * 0.1 + 0.9 : 0.8;

  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
      <defs>
        <filter id="buzzerGlow">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Glow ring */}
      <circle
        cx="60"
        cy="60"
        r="55"
        fill="none"
        stroke={colors.caribbeanGreen}
        strokeWidth="3"
        opacity={glowIntensity * 0.8}
        filter="url(#buzzerGlow)"
      />
      {/* Base */}
      <circle cx="60" cy="65" r="45" fill={colors.deepGreenCyanTurquoise} />
      {/* Button */}
      <circle
        cx="60"
        cy={isPressed ? 62 : 58}
        r="38"
        fill={colors.darkCyra}
        stroke={colors.tiffanyBlue}
        strokeWidth="2"
        style={{ transform: `scale(${scale})`, transformOrigin: "60px 60px" }}
      />
      {/* Shine */}
      <ellipse cx="50" cy="48" rx="15" ry="8" fill={colors.white} opacity={0.15 * pulse} />
      {/* Text */}
      <text
        x="60"
        y="65"
        textAnchor="middle"
        fill={colors.white}
        fontSize="14"
        fontWeight="bold"
      >
        BUZZ
      </text>
    </svg>
  );
};

// Document stack animation
const DocumentStack: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const docs = Array.from({ length: 8 }).map((_, i) => {
    const delay = 2 * fps + i * 5;
    const progress = spring({
      frame,
      fps,
      delay,
      config: { damping: 200 },
    });
    return { offset: i * 6, opacity: interpolate(progress, [0, 1], [0, 0.8]) };
  });

  return (
    <svg width="160" height="200" viewBox="0 0 160 200" fill="none">
      {docs.map((doc, i) => (
        <g key={i} opacity={doc.opacity}>
          <rect
            x={20 + doc.offset}
            y={140 - doc.offset * 2}
            width={100}
            height={14}
            rx={2}
            fill={`${colors.tiffanyBlue}30`}
            stroke={colors.tiffanyBlue}
            strokeWidth={0.5}
          />
          {/* Text lines */}
          <line
            x1={28 + doc.offset}
            y1={147 - doc.offset * 2}
            x2={80 + doc.offset}
            y2={147 - doc.offset * 2}
            stroke={colors.white}
            strokeWidth={1}
            opacity={0.3}
          />
        </g>
      ))}
    </svg>
  );
};

export const Scene4Watson: React.FC = () => {
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
  const titleScale = interpolate(titleProgress, [0, 1], [0.8, 1]);

  // Counter animation - documents processed
  const counterStart = 3 * fps;
  const counterEnd = 7 * fps;
  const counterProgress = interpolate(frame, [counterStart, counterEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const counterValue = Math.floor(counterProgress * 6800000);
  const counterOpacity = interpolate(frame, [counterStart, counterStart + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "3 seconds" highlight
  const threeSecProgress = spring({
    frame,
    fps,
    delay: 8 * fps,
    config: { damping: 12, stiffness: 120 },
  });
  const threeSecScale = interpolate(threeSecProgress, [0, 1], [0.5, 1]);
  const threeSecOpacity = interpolate(threeSecProgress, [0, 1], [0, 1]);

  // Flash on counter complete
  const flash = frame > counterEnd && frame < counterEnd + 10
    ? interpolate(frame, [counterEnd, counterEnd + 10], [0.25, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  // Description text
  const descProgress = spring({
    frame,
    fps,
    delay: 10 * fps,
    config: { damping: 12, stiffness: 80 },
  });
  const descOpacity = interpolate(descProgress, [0, 1], [0, 1]);
  const descY = interpolate(descProgress, [0, 1], [20, 0]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${colors.deepGreenCyanTurquoise}, ${colors.gunmetal})`,
        fontFamily,
      }}
    >
      {/* Flash overlay */}
      <AbsoluteFill
        style={{
          backgroundColor: colors.tiffanyBlue,
          opacity: flash,
          zIndex: 10,
        }}
      />

      {/* Data streams background */}
      <AbsoluteFill style={{ opacity: 0.3 }}>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080">
          {Array.from({ length: 20 }).map((_, i) => (
            <DataStream
              key={i}
              frame={frame}
              x={80 + i * 95}
              speed={1.5 + (i % 3) * 0.5}
            />
          ))}
        </svg>
      </AbsoluteFill>

      {/* Era badge */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: badgeOpacity,
        }}
      >
        <span
          style={{
            display: "inline-block",
            padding: "8px 24px",
            borderRadius: 40,
            backgroundColor: `${colors.caribbeanGreen}20`,
            border: `2px solid ${colors.caribbeanGreen}50`,
            color: colors.caribbeanGreen,
            fontSize: 22,
            fontWeight: "bold",
            letterSpacing: 3,
          }}
        >
          2011
        </span>
      </div>

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 64,
          fontWeight: "bold",
          color: colors.white,
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          textShadow: `0 0 40px ${colors.darkCyra}40`,
        }}
      >
        Watson Wins{" "}
        <span style={{ color: colors.corn }}>Jeopardy!</span>
      </div>

      {/* Stats row */}
      <div
        style={{
          position: "absolute",
          top: 240,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 120,
          alignItems: "flex-start",
        }}
      >
        {/* Documents counter */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: "bold",
              color: colors.tiffanyBlue,
              opacity: counterOpacity,
              fontVariantNumeric: "tabular-nums",
              textShadow: `0 0 20px ${colors.tiffanyBlue}30`,
            }}
          >
            {counterValue.toLocaleString()}
          </div>
          <div
            style={{
              fontSize: 22,
              color: colors.chineseSilver,
              opacity: counterOpacity,
              fontWeight: "bold",
            }}
          >
            documents processed
          </div>
          <Sequence from={Math.floor(1.5 * fps)} layout="none">
            <DocumentStack frame={frame} fps={fps} />
          </Sequence>
        </div>

        {/* Buzzer */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <BuzzerButton frame={frame} fps={fps} />
          <div
            style={{
              fontSize: 18,
              color: colors.chineseSilver,
              opacity: badgeOpacity,
            }}
          >
            Game show buzzer
          </div>
        </div>

        {/* 3 seconds stat */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: "bold",
              color: colors.caribbeanGreen,
              opacity: threeSecOpacity,
              transform: `scale(${threeSecScale})`,
              textShadow: `0 0 20px ${colors.caribbeanGreen}30`,
            }}
          >
            ~3s
          </div>
          <div
            style={{
              fontSize: 22,
              color: colors.chineseSilver,
              opacity: threeSecOpacity,
              fontWeight: "bold",
            }}
          >
            response time
          </div>
          <div
            style={{
              fontSize: 16,
              color: colors.rhythm,
              opacity: threeSecOpacity,
              marginTop: 4,
            }}
          >
            No internet access
          </div>
        </div>
      </div>

      {/* Description */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: 200,
          right: 200,
          textAlign: "center",
          fontSize: 26,
          color: colors.magnolia,
          lineHeight: 1.5,
          opacity: descOpacity,
          transform: `translateY(${descY}px)`,
        }}
      >
        One of the first major demonstrations that machines could handle{" "}
        <span style={{ color: colors.tiffanyBlue, fontWeight: "bold" }}>
          open-domain question answering
        </span>{" "}
        at scale.
      </div>
    </AbsoluteFill>
  );
};
