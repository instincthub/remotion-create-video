import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Chess clock SVG
const ChessClock: React.FC<{ frame: number }> = ({ frame }) => {
  const pulse = Math.sin(frame * 0.15) * 0.2 + 0.8;
  const handAngle = (frame * 2) % 360;

  return (
    <svg width="200" height="140" viewBox="0 0 200 140" fill="none">
      {/* Left clock face */}
      <circle cx="60" cy="70" r="50" stroke={colors.white} strokeWidth="2.5" fill={`${colors.white}10`} />
      <line
        x1="60"
        y1="70"
        x2={60 + 30 * Math.cos(((handAngle - 90) * Math.PI) / 180)}
        y2={70 + 30 * Math.sin(((handAngle - 90) * Math.PI) / 180)}
        stroke={colors.caribbeanGreen}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="60" cy="70" r="3" fill={colors.caribbeanGreen} />
      {/* Right clock face */}
      <circle cx="140" cy="70" r="50" stroke={colors.white} strokeWidth="2.5" fill={`${colors.white}10`} />
      <line
        x1="140"
        y1="70"
        x2={140 + 30 * Math.cos(((-handAngle * 0.7 - 90) * Math.PI) / 180)}
        y2={70 + 30 * Math.sin(((-handAngle * 0.7 - 90) * Math.PI) / 180)}
        stroke={colors.oldRose}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity={pulse}
      />
      <circle cx="140" cy="70" r="3" fill={colors.oldRose} />
      {/* Button tops */}
      <rect x="35" y="10" width="50" height="10" rx="5" fill={colors.white} opacity={0.5} />
      <rect x="115" y="10" width="50" height="10" rx="5" fill={colors.white} opacity={0.5} />
    </svg>
  );
};

// Processor chip SVG
const ProcessorChip: React.FC<{ opacity: number; frame: number }> = ({
  opacity,
  frame,
}) => {
  const pulse = Math.sin(frame * 0.1) * 0.2 + 0.8;

  return (
    <svg
      width="180"
      height="180"
      viewBox="0 0 180 180"
      fill="none"
      style={{ opacity }}
    >
      {/* Chip body */}
      <rect x="40" y="40" width="100" height="100" rx="6" stroke={colors.tiffanyBlue} strokeWidth="2.5" fill={`${colors.tiffanyBlue}15`} />
      {/* Inner die */}
      <rect x="60" y="60" width="60" height="60" rx="3" fill={`${colors.darkCyra}30`} stroke={colors.darkCyra} strokeWidth="1.5" />
      {/* Pins - top */}
      {[55, 75, 95, 115].map((x, i) => (
        <line key={`t-${i}`} x1={x} y1={20} x2={x} y2={40} stroke={colors.tiffanyBlue} strokeWidth="2" opacity={pulse} />
      ))}
      {/* Pins - bottom */}
      {[55, 75, 95, 115].map((x, i) => (
        <line key={`b-${i}`} x1={x} y1={140} x2={x} y2={160} stroke={colors.tiffanyBlue} strokeWidth="2" opacity={pulse} />
      ))}
      {/* Pins - left */}
      {[55, 75, 95, 115].map((y, i) => (
        <line key={`l-${i}`} x1={20} y1={y} x2={40} y2={y} stroke={colors.tiffanyBlue} strokeWidth="2" opacity={pulse} />
      ))}
      {/* Pins - right */}
      {[55, 75, 95, 115].map((y, i) => (
        <line key={`r-${i}`} x1={140} y1={y} x2={160} y2={y} stroke={colors.tiffanyBlue} strokeWidth="2" opacity={pulse} />
      ))}
      {/* Center text */}
      <text x="90" y="95" textAnchor="middle" fill={colors.white} fontSize="14" fontWeight="bold">
        CPU
      </text>
    </svg>
  );
};

export const Scene5DeepBlue: React.FC = () => {
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
    delay: 15,
    config: { damping: 12, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [40, 0]);

  // Counter animation - rapidly counts to 200,000,000
  const counterStart = 2 * fps;
  const counterEnd = 5 * fps;
  const counterProgress = interpolate(frame, [counterStart, counterEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const counterValue = Math.floor(counterProgress * 200000000);
  const counterOpacity = interpolate(frame, [counterStart, counterStart + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // VS text
  const vsProgress = spring({
    frame,
    fps,
    delay: 3 * fps,
    config: { damping: 200 },
  });
  const vsScale = interpolate(vsProgress, [0, 1], [0, 1]);

  // Chip + Clock appear
  const visualProgress = spring({
    frame,
    fps,
    delay: 1.5 * fps,
    config: { damping: 200 },
  });
  const visualOpacity = interpolate(visualProgress, [0, 1], [0, 1]);

  // Description
  const descProgress = spring({
    frame,
    fps,
    delay: 5.5 * fps,
    config: { damping: 12, stiffness: 80 },
  });
  const descOpacity = interpolate(descProgress, [0, 1], [0, 1]);
  const descY = interpolate(descProgress, [0, 1], [20, 0]);

  // Flash effect on positions per second
  const flash = frame > counterEnd && frame < counterEnd + 10
    ? interpolate(frame, [counterEnd, counterEnd + 10], [0.3, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

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
          backgroundColor: colors.white,
          opacity: flash,
          zIndex: 0,
        }}
      />

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
          1997
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
          fontSize: 60,
          fontWeight: "bold",
          color: colors.white,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        Deep Blue{" "}
        <span
          style={{
            color: colors.oldRose,
            transform: `scale(${vsScale})`,
            display: "inline-block",
          }}
        >
          vs
        </span>{" "}
        Kasparov
      </div>

      {/* Counter + Visuals */}
      <div
        style={{
          position: "absolute",
          top: 230,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        {/* Position counter */}
        <div
          style={{
            fontSize: 80,
            fontWeight: "bold",
            color: colors.caribbeanGreen,
            opacity: counterOpacity,
            textShadow: `0 0 30px ${colors.caribbeanGreen}40`,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {counterValue.toLocaleString()}
        </div>
        <div
          style={{
            fontSize: 24,
            color: colors.chineseSilver,
            opacity: counterOpacity,
            fontWeight: "bold",
          }}
        >
          chess positions evaluated per second
        </div>

        {/* Visuals row */}
        <div
          style={{
            display: "flex",
            gap: 80,
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <ProcessorChip opacity={visualOpacity} frame={frame} />
            <span style={{ color: colors.chineseSilver, fontSize: 18, opacity: visualOpacity }}>
              Specialised Hardware
            </span>
          </div>

          <ChessClock frame={frame} />

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            {/* Chess board mini */}
            <svg width="180" height="180" viewBox="0 0 180 180" fill="none" style={{ opacity: visualOpacity }}>
              {Array.from({ length: 64 }).map((_, i) => {
                const row = Math.floor(i / 8);
                const col = i % 8;
                const isDark = (row + col) % 2 === 1;
                const size = 180 / 8;
                return (
                  <rect
                    key={i}
                    x={col * size}
                    y={row * size}
                    width={size}
                    height={size}
                    fill={isDark ? `${colors.deepGreenCyanTurquoise}60` : `${colors.white}10`}
                    stroke={`${colors.white}10`}
                    strokeWidth={0.3}
                  />
                );
              })}
              {/* Flashing positions */}
              {Array.from({ length: 5 }).map((_, i) => {
                const col = ((frame * 3 + i * 13) % 8);
                const row = ((frame * 2 + i * 7) % 8);
                const size = 180 / 8;
                return (
                  <rect
                    key={`flash-${i}`}
                    x={col * size + 2}
                    y={row * size + 2}
                    width={size - 4}
                    height={size - 4}
                    fill={colors.caribbeanGreen}
                    opacity={0.4}
                    rx={2}
                  />
                );
              })}
            </svg>
            <span style={{ color: colors.chineseSilver, fontSize: 18, opacity: visualOpacity }}>
              Search Algorithms
            </span>
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
        Not just computing power — it combined{" "}
        <span style={{ color: colors.tiffanyBlue, fontWeight: "bold" }}>
          search algorithms
        </span>
        ,{" "}
        <span style={{ color: colors.caribbeanGreen, fontWeight: "bold" }}>
          historical game data
        </span>
        , and{" "}
        <span style={{ color: colors.corn, fontWeight: "bold" }}>
          specialised hardware
        </span>
        .
      </div>
    </AbsoluteFill>
  );
};
