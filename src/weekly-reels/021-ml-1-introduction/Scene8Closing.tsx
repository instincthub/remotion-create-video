import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Tangled variables that ML untangles
const TangledToSolved: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, delay: fps, config: { damping: 200 } });
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  // Untangle progress
  const untangleProgress = interpolate(frame, [4 * fps, 10 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Variable nodes
  const nodes = [
    { x: 60, y: 40 },
    { x: 140, y: 30 },
    { x: 220, y: 50 },
    { x: 300, y: 35 },
    { x: 100, y: 110 },
    { x: 180, y: 100 },
    { x: 260, y: 115 },
    { x: 80, y: 180 },
    { x: 160, y: 175 },
    { x: 240, y: 185 },
    { x: 320, y: 170 },
  ];

  // Solved positions (organized grid)
  const solvedNodes = [
    { x: 60, y: 40 },
    { x: 140, y: 40 },
    { x: 220, y: 40 },
    { x: 300, y: 40 },
    { x: 80, y: 110 },
    { x: 180, y: 110 },
    { x: 280, y: 110 },
    { x: 60, y: 180 },
    { x: 150, y: 180 },
    { x: 240, y: 180 },
    { x: 330, y: 180 },
  ];

  // Tangled connections (chaotic)
  const tangledPaths = [
    "M60 40 Q200 80 140 30",
    "M140 30 Q100 150 220 50",
    "M220 50 Q150 20 300 35",
    "M100 110 Q300 60 180 100",
    "M180 100 Q50 170 260 115",
    "M80 180 Q280 100 160 175",
    "M160 175 Q60 120 240 185",
    "M240 185 Q180 50 320 170",
  ];

  // Clean connections (organized)
  const cleanPaths = [
    "M60 40 L140 40",
    "M140 40 L220 40",
    "M220 40 L300 40",
    "M80 110 L180 110",
    "M180 110 L280 110",
    "M60 180 L150 180",
    "M150 180 L240 180",
    "M240 180 L330 180",
  ];

  return (
    <div style={{ opacity }}>
      <svg width="380" height="220" viewBox="0 0 380 220" fill="none">
        {/* Connections */}
        {tangledPaths.map((path, i) => {
          const cleanPath = cleanPaths[i] || cleanPaths[0];
          // Fade out tangled, fade in clean
          const tangledOpacity = interpolate(untangleProgress, [0, 0.5], [0.3, 0], {
            extrapolateRight: "clamp",
          });
          const cleanOpacity = interpolate(untangleProgress, [0.4, 0.8], [0, 0.4], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <g key={i}>
              <path
                d={path}
                stroke={colors.oldRose}
                strokeWidth={1.5}
                fill="none"
                opacity={tangledOpacity}
              />
              <path
                d={cleanPath}
                stroke={colors.caribbeanGreen}
                strokeWidth={1.5}
                fill="none"
                opacity={cleanOpacity}
              />
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const solved = solvedNodes[i];
          const nx = interpolate(untangleProgress, [0.2, 0.7], [node.x, solved.x], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const ny = interpolate(untangleProgress, [0.2, 0.7], [node.y, solved.y], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const nodeColor = untangleProgress > 0.5 ? colors.caribbeanGreen : colors.rhythm;
          const pulse = Math.sin(frame * 0.1 + i * 0.8) * 0.2 + 0.8;

          return (
            <circle
              key={i}
              cx={nx}
              cy={ny}
              r={7}
              fill={nodeColor}
              opacity={pulse}
            />
          );
        })}
      </svg>
    </div>
  );
};

// Upward particles
const Particles: React.FC = () => {
  const frame = useCurrentFrame();

  const particles = [
    { x: 100, startY: 1600, speed: 1.8, size: 4, opacity: 0.3 },
    { x: 250, startY: 1700, speed: 2.2, size: 3, opacity: 0.2 },
    { x: 400, startY: 1550, speed: 1.5, size: 5, opacity: 0.35 },
    { x: 550, startY: 1650, speed: 2.0, size: 3, opacity: 0.25 },
    { x: 700, startY: 1750, speed: 1.7, size: 4, opacity: 0.3 },
    { x: 850, startY: 1580, speed: 2.3, size: 3, opacity: 0.2 },
    { x: 950, startY: 1670, speed: 1.6, size: 5, opacity: 0.25 },
    { x: 180, startY: 1800, speed: 1.9, size: 4, opacity: 0.15 },
  ];

  return (
    <AbsoluteFill>
      {particles.map((p, i) => {
        const y = p.startY - frame * p.speed;
        const fadeIn = interpolate(frame, [0, 30], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const sway = Math.sin((frame * 0.03 + i * 2) * 1.5) * 12;

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

  // Header
  const headerProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 200 },
  });
  const headerOpacity = interpolate(headerProgress, [0, 1], [0, 1]);
  const headerY = interpolate(headerProgress, [0, 1], [30, 0]);

  // "Variables are complex"
  const complexProgress = spring({
    frame,
    fps,
    delay: 2 * fps,
    config: { damping: 200 },
  });
  const complexOpacity = interpolate(complexProgress, [0, 1], [0, 1]);

  // Main statement
  const mainProgress = spring({
    frame,
    fps,
    delay: 12 * fps,
    config: { damping: 200 },
  });
  const mainOpacity = interpolate(mainProgress, [0, 1], [0, 1]);
  const mainY = interpolate(mainProgress, [0, 1], [30, 0]);

  // Logo
  const logoDelay = 16 * fps;
  const logoProgress = spring({
    frame,
    fps,
    delay: logoDelay,
    config: { damping: 200 },
  });
  const logoOpacity = interpolate(logoProgress, [0, 1], [0, 1]);
  const logoScale = interpolate(logoProgress, [0, 1], [0.8, 1]);

  // Ring
  const ringProgress = spring({
    frame,
    fps,
    delay: logoDelay + 10,
    config: { damping: 12, stiffness: 100 },
  });
  const ringScale = interpolate(ringProgress, [0, 1], [0.5, 1]);
  const ringOpacity = interpolate(ringProgress, [0, 1], [0, 0.6]);

  // Light sweep
  const sweepY = interpolate(frame, [0, fps * 20], [-400, 2400], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${colors.gunmetal}, ${colors.darkSlateGray})`,
        fontFamily,
      }}
    >
      {/* Particles */}
      <Particles />

      {/* Sweep */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: sweepY,
          width: "100%",
          height: 250,
          background: `linear-gradient(180deg, transparent, ${colors.tiffanyBlue}10, transparent)`,
          transform: "skewY(-5deg)",
        }}
      />

      {/* Content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 300,
          paddingLeft: 50,
          paddingRight: 50,
          gap: 15,
        }}
      >
        {/* Header */}
        <div
          style={{
            fontSize: 30,
            fontWeight: 400,
            color: colors.chineseSilver,
            textAlign: "center",
            opacity: headerOpacity,
            transform: `translateY(${headerY}px)`,
            lineHeight: 1.5,
          }}
        >
          The variables are complex
        </div>

        {/* Conditions text */}
        <div
          style={{
            fontSize: 26,
            fontWeight: 400,
            color: colors.rhythm,
            textAlign: "center",
            opacity: complexOpacity,
            lineHeight: 1.5,
          }}
        >
          You're not sure of every condition
        </div>

        {/* Tangled → Solved illustration */}
        <TangledToSolved />

        {/* Main message */}
        <div
          style={{
            fontSize: 46,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: mainOpacity,
            transform: `translateY(${mainY}px)`,
            lineHeight: 1.3,
            marginTop: 10,
          }}
        >
          <span style={{ color: colors.caribbeanGreen }}>Machine Learning</span>
          <br />
          Can Help You
        </div>

        {/* Logo */}
        <div
          style={{
            marginTop: 30,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 120,
              height: 120,
              borderRadius: 60,
              border: `3px solid ${colors.tiffanyBlue}`,
              transform: `scale(${ringScale})`,
              opacity: ringOpacity,
            }}
          />
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: colors.deepGreenCyanTurquoise,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 15,
              fontWeight: 700,
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
