import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Floating data particles in the background
const DataParticles: React.FC = () => {
  const frame = useCurrentFrame();

  const particles = [
    { x: 200, y: 150, speed: 1.2, char: "0" },
    { x: 400, y: 300, speed: 0.8, char: "1" },
    { x: 600, y: 200, speed: 1.5, char: "0" },
    { x: 850, y: 400, speed: 0.9, char: "1" },
    { x: 1100, y: 150, speed: 1.1, char: "0" },
    { x: 1300, y: 350, speed: 1.4, char: "1" },
    { x: 1500, y: 250, speed: 0.7, char: "0" },
    { x: 1700, y: 450, speed: 1.3, char: "1" },
    { x: 300, y: 600, speed: 1.0, char: "NaN" },
    { x: 700, y: 700, speed: 0.6, char: "null" },
    { x: 1000, y: 550, speed: 1.1, char: "ERR" },
    { x: 1400, y: 650, speed: 0.8, char: "?" },
    { x: 500, y: 850, speed: 1.2, char: "0" },
    { x: 900, y: 900, speed: 0.9, char: "1" },
    { x: 1600, y: 800, speed: 1.0, char: "null" },
  ];

  return (
    <AbsoluteFill>
      {particles.map((p, i) => {
        const floatY = Math.sin((frame * p.speed + i * 40) * 0.04) * 25;
        const floatX = Math.cos((frame * p.speed + i * 30) * 0.03) * 12;
        const opacity = Math.sin((frame * 0.03 + i * 0.5) * 2) * 0.15 + 0.2;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x + floatX,
              top: p.y + floatY,
              fontSize: p.char.length > 1 ? 16 : 20,
              fontFamily: "monospace",
              color: colors.rhythm,
              opacity,
              fontWeight: 400,
            }}
          >
            {p.char}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// Glitching mini chart
const GlitchChart: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  const glitchCycle = frame % 40;
  const isGlitching = glitchCycle < 3 && frame > 20 && frame < 380;
  const glitchX = isGlitching ? ((frame * 7) % 9) - 4 : 0;

  const bars = [40, 70, 55, 85, 60, 90, 45, 75];

  return (
    <svg
      width="320"
      height="180"
      viewBox="0 0 320 180"
      style={{
        position: "absolute",
        bottom: 120,
        right: 200,
        opacity: opacity * 0.3,
        transform: `translateX(${glitchX}px)`,
      }}
    >
      {bars.map((h, i) => (
        <rect
          key={i}
          x={20 + i * 38}
          y={180 - h}
          width={24}
          height={h}
          rx={4}
          fill={isGlitching ? colors.oldRose : colors.darkCyra}
          opacity={0.5}
        />
      ))}
    </svg>
  );
};

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "Your AI project could fail" — zoom in with spring
  const line1Progress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 10, stiffness: 100 },
  });
  const line1Scale = interpolate(line1Progress, [0, 1], [0.5, 1]);
  const line1Opacity = interpolate(line1Progress, [0, 1], [0, 1]);

  // "because of data." — punchy, delayed
  const line2Progress = spring({
    frame,
    fps,
    delay: 2.5 * fps,
    config: { damping: 8, stiffness: 120 },
  });
  const line2Scale = interpolate(line2Progress, [0, 1], [0.4, 1]);
  const line2Opacity = interpolate(line2Progress, [0, 1], [0, 1]);

  // Prototype stamp
  const stampProgress = spring({
    frame,
    fps,
    delay: 4 * fps,
    config: { damping: 8, stiffness: 200 },
  });
  const stampScale = interpolate(stampProgress, [0, 1], [2, 1]);
  const stampOpacity = interpolate(stampProgress, [0, 1], [0, 0.7]);
  const stampRotation = interpolate(stampProgress, [0, 1], [-20, -12]);

  // Background chart fade-in
  const chartOpacity = interpolate(frame, [fps, 3 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.magnolia,
        fontFamily,
      }}
    >
      {/* Floating data particles */}
      <DataParticles />

      {/* Glitching chart */}
      <GlitchChart opacity={chartOpacity} />

      {/* Main text */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: "bold",
            color: colors.darkSlateGray,
            transform: `scale(${line1Scale})`,
            opacity: line1Opacity,
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          Your AI project could fail
        </div>

        <div
          style={{
            fontSize: 88,
            fontWeight: "bold",
            color: colors.oldRose,
            transform: `scale(${line2Scale})`,
            opacity: line2Opacity,
            textAlign: "center",
          }}
        >
          because of{" "}
          <span style={{ color: colors.darkCyra }}>data</span>.
        </div>
      </AbsoluteFill>

      {/* PROTOTYPE stamp */}
      <div
        style={{
          position: "absolute",
          bottom: 140,
          right: 160,
          fontSize: 28,
          fontWeight: "bold",
          color: colors.oldRose,
          border: `3px solid ${colors.oldRose}`,
          padding: "8px 24px",
          borderRadius: 6,
          transform: `scale(${stampScale}) rotate(${stampRotation}deg)`,
          opacity: stampOpacity,
          letterSpacing: 6,
        }}
      >
        PROTOTYPE
      </div>
    </AbsoluteFill>
  );
};
