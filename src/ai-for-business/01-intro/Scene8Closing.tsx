import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Upward-moving particles
const Particles: React.FC = () => {
  const frame = useCurrentFrame();

  // Pre-defined particle positions for deterministic rendering
  const particles = [
    { x: 200, startY: 900, speed: 1.8, size: 4, opacity: 0.4 },
    { x: 400, startY: 1000, speed: 2.2, size: 3, opacity: 0.3 },
    { x: 600, startY: 850, speed: 1.5, size: 5, opacity: 0.5 },
    { x: 800, startY: 950, speed: 2.0, size: 3, opacity: 0.35 },
    { x: 1000, startY: 1050, speed: 1.7, size: 4, opacity: 0.45 },
    { x: 1200, startY: 880, speed: 2.3, size: 3, opacity: 0.3 },
    { x: 1400, startY: 970, speed: 1.6, size: 5, opacity: 0.4 },
    { x: 1600, startY: 920, speed: 2.1, size: 3, opacity: 0.35 },
    { x: 300, startY: 1100, speed: 1.9, size: 4, opacity: 0.25 },
    { x: 900, startY: 1020, speed: 1.4, size: 6, opacity: 0.3 },
    { x: 1100, startY: 1080, speed: 2.4, size: 3, opacity: 0.2 },
    { x: 1500, startY: 950, speed: 1.3, size: 5, opacity: 0.35 },
    { x: 500, startY: 1060, speed: 2.5, size: 3, opacity: 0.25 },
    { x: 1300, startY: 890, speed: 1.8, size: 4, opacity: 0.4 },
    { x: 700, startY: 1000, speed: 2.0, size: 4, opacity: 0.3 },
  ];

  return (
    <AbsoluteFill>
      {particles.map((p, i) => {
        const y = p.startY - frame * p.speed;
        const fadeIn = interpolate(frame, [0, 30], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        // Gentle horizontal sway
        const sway = Math.sin((frame * 0.03 + i * 2) * 1.5) * 15;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x + sway,
              top: y,
              width: p.size,
              height: p.size,
              borderRadius: p.size / 2,
              backgroundColor: colors.caribbeanGreen,
              opacity: p.opacity * fadeIn,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export const Scene8Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Text fade in with glow
  const textDelay = 2 * fps;
  const textProgress = spring({
    frame,
    fps,
    delay: textDelay,
    config: { damping: 200 },
  });
  const textOpacity = interpolate(textProgress, [0, 1], [0, 1]);
  const textY = interpolate(textProgress, [0, 1], [30, 0]);

  // Subtitle fade
  const subDelay = 3.5 * fps;
  const subProgress = spring({
    frame,
    fps,
    delay: subDelay,
    config: { damping: 200 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);

  // Logo/brand fade in
  const logoDelay = 7 * fps;
  const logoProgress = spring({
    frame,
    fps,
    delay: logoDelay,
    config: { damping: 200 },
  });
  const logoOpacity = interpolate(logoProgress, [0, 1], [0, 1]);
  const logoScale = interpolate(logoProgress, [0, 1], [0.8, 1]);

  // Accent ring around logo
  const ringProgress = spring({
    frame,
    fps,
    delay: logoDelay + 10,
    config: { damping: 12, stiffness: 100 },
  });
  const ringScale = interpolate(ringProgress, [0, 1], [0.5, 1]);
  const ringOpacity = interpolate(ringProgress, [0, 1], [0, 0.6]);

  // Light sweep
  const sweepX = interpolate(frame, [0, fps * 12], [-400, 2400], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.deepGreenCyanTurquoise,
        fontFamily,
      }}
    >
      {/* Particles */}
      <Particles />

      {/* Light sweep */}
      <div
        style={{
          position: "absolute",
          left: sweepX,
          top: 0,
          width: 300,
          height: "100%",
          background: `linear-gradient(90deg, transparent, ${colors.tiffanyBlue}20, transparent)`,
          transform: "skewX(-15deg)",
        }}
      />

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
        {/* Main text */}
        <div
          style={{
            fontSize: 64,
            fontWeight: "bold",
            color: colors.white,
            textAlign: "center",
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
            lineHeight: 1.3,
          }}
        >
          Build smarter.
          <br />
          Know the limits.
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: colors.caribbeanGreen,
            opacity: subOpacity,
            marginTop: 10,
            textAlign: "center",
          }}
        >
          The AI revolution is about knowing where machines work — and where
          they don&apos;t yet.
        </div>

        {/* Logo placeholder with accent ring */}
        <div
          style={{
            marginTop: 50,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
          }}
        >
          {/* Accent ring */}
          <div
            style={{
              position: "absolute",
              width: 140,
              height: 140,
              borderRadius: 70,
              border: `3px solid ${colors.darkCyra}`,
              transform: `scale(${ringScale})`,
              opacity: ringOpacity,
            }}
          />
          {/* Logo text */}
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: colors.darkCyra,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              fontWeight: "bold",
              color: colors.white,
              letterSpacing: 1,
            }}
          >
            InstinctHub
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
