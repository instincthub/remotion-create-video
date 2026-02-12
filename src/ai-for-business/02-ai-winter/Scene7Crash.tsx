import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Crashing stock graph
const CrashGraph: React.FC<{ progress: number }> = ({ progress }) => {
  const points = Array.from({ length: 25 }, (_, i) => {
    const t = i / 24;
    let y: number;
    if (t < 0.3) {
      y = 40 + Math.sin(t * 15) * 8;
    } else {
      const fallT = (t - 0.3) / 0.7;
      y = 40 + fallT * fallT * 160;
    }
    return { x: 60 + t * 880, y: Math.min(y, 200) };
  });

  const visibleCount = Math.floor(progress * points.length);
  const visiblePoints = points.slice(0, visibleCount);
  const pathD = visiblePoints
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  return (
    <svg width="1000" height="240" viewBox="0 0 1000 240" fill="none">
      {[60, 120, 180].map((y) => (
        <line key={y} x1="50" y1={y} x2="960" y2={y} stroke={colors.crashRed} strokeWidth={0.5} opacity={0.1} />
      ))}
      <line x1="50" y1="220" x2="960" y2="220" stroke={colors.iceGray} strokeWidth={1} opacity={0.2} />
      {visiblePoints.length > 1 && (
        <path d={pathD} stroke={colors.crashRed} strokeWidth={4} fill="none" strokeLinecap="round" />
      )}
    </svg>
  );
};

// Red down arrows flooding screen
const RedArrows: React.FC<{ intensity: number }> = ({ intensity }) => {
  const frame = useCurrentFrame();

  const arrows = Array.from({ length: 20 }, (_, i) => ({
    x: ((i * 97 + 30) % 1850) + 30,
    startY: -50 - ((i * 63) % 300),
    speed: 1.5 + (i % 4) * 0.5,
    size: 20 + (i % 3) * 8,
  }));

  return (
    <AbsoluteFill style={{ opacity: intensity }}>
      {arrows.map((a, i) => {
        const y = a.startY + frame * a.speed;
        const wrappedY = ((y % 1300) + 1300) % 1300 - 200;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: a.x,
              top: wrappedY,
              fontSize: a.size,
              color: colors.crashRed,
              opacity: 0.6,
              fontWeight: "bold",
            }}
          >
            ▼
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

export const Scene7Crash: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "SELL!" flash
  const sellDelay = 2 * fps;
  const sellProgress = spring({
    frame,
    fps,
    delay: sellDelay,
    config: { damping: 8, stiffness: 300 },
  });
  const sellScale = interpolate(sellProgress, [0, 1], [4, 1]);
  const sellOpacity = interpolate(sellProgress, [0, 1], [0, 1]);

  // Screen shake
  const shakeStart = sellDelay;
  const shakeFrame = frame - shakeStart;
  const isShaking = shakeFrame >= 0 && shakeFrame < 25;
  const shakeX = isShaking ? Math.sin(shakeFrame * 2.5) * (25 - shakeFrame) * 0.6 : 0;
  const shakeY = isShaking ? Math.cos(shakeFrame * 3) * (25 - shakeFrame) * 0.4 : 0;

  // Graph crash draws
  const graphProgress = interpolate(
    frame,
    [4 * fps, 12 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Red arrows intensity
  const arrowIntensity = interpolate(
    frame,
    [sellDelay, sellDelay + 2 * fps],
    [0, 0.5],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // "Black Monday" title
  const titleDelay = 8 * fps;
  const titleProgress = spring({ frame, fps, delay: titleDelay, config: { damping: 200 } });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [20, 0]);

  // Glitch effect
  const glitchFrame = frame - sellDelay;
  const isGlitching = glitchFrame >= 0 && glitchFrame < 6;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.darkNavy,
        fontFamily,
        transform: `translate(${shakeX}px, ${shakeY}px)`,
      }}
    >
      {/* Red tint flash */}
      {isGlitching && (
        <AbsoluteFill
          style={{ backgroundColor: colors.crashRed, opacity: 0.15 }}
        />
      )}

      <RedArrows intensity={arrowIntensity} />

      {/* Content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
        }}
      >
        {/* SELL! flash */}
        <div
          style={{
            fontSize: 120,
            fontWeight: "bold",
            color: colors.crashRed,
            transform: `scale(${sellScale})`,
            opacity: sellOpacity,
            letterSpacing: 12,
          }}
        >
          SELL!
        </div>

        {/* Crash graph */}
        <CrashGraph progress={graphProgress} />

        {/* Black Monday title */}
        <div
          style={{
            fontSize: 48,
            fontWeight: "bold",
            color: colors.white,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            textAlign: "center",
          }}
        >
          Black Monday —{" "}
          <span style={{ color: colors.crashRed }}>1987</span>
        </div>

        <div
          style={{
            fontSize: 20,
            color: colors.iceGray,
            opacity: titleOpacity * 0.8,
            textAlign: "center",
            maxWidth: 600,
          }}
        >
          AI didn&apos;t cause it alone — but it poured gasoline on the fire.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
