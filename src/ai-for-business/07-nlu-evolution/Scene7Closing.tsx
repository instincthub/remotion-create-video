import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Human-digital blending visual
const HumanDigitalBlend: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const morphProgress = interpolate(frame, [2 * fps, 6 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pulse = Math.sin(frame * 0.06) * 0.12 + 0.88;

  return (
    <svg width="300" height="280" viewBox="0 0 300 280" fill="none">
      <defs>
        <filter id="blendGlow">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="humanToDigital" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colors.chineseSilver} />
          <stop offset={`${50 + morphProgress * 30}%`} stopColor={colors.tiffanyBlue} />
          <stop offset="100%" stopColor={colors.caribbeanGreen} />
        </linearGradient>
      </defs>

      {/* Human side (left) - organic lines */}
      <g opacity={1 - morphProgress * 0.3}>
        {/* Head */}
        <circle cx="100" cy="60" r="30" stroke={colors.chineseSilver} strokeWidth="2" fill="none" />
        {/* Body */}
        <line x1="100" y1="90" x2="100" y2="170" stroke={colors.chineseSilver} strokeWidth="2" />
        <line x1="100" y1="110" x2="65" y2="150" stroke={colors.chineseSilver} strokeWidth="2" strokeLinecap="round" />
        <line x1="100" y1="110" x2="135" y2="150" stroke={colors.chineseSilver} strokeWidth="2" strokeLinecap="round" />
        <line x1="100" y1="170" x2="70" y2="230" stroke={colors.chineseSilver} strokeWidth="2" strokeLinecap="round" />
        <line x1="100" y1="170" x2="130" y2="230" stroke={colors.chineseSilver} strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Digital side (right) - circuit lines */}
      <g opacity={morphProgress * pulse} filter="url(#blendGlow)">
        {/* Head - circuit */}
        <circle cx="200" cy="60" r="30" stroke={colors.tiffanyBlue} strokeWidth="2" fill={`${colors.darkCyra}15`} />
        {/* Internal nodes */}
        {[
          { cx: 190, cy: 50 }, { cx: 210, cy: 55 },
          { cx: 195, cy: 70 }, { cx: 205, cy: 65 },
        ].map((n, i) => (
          <circle
            key={i}
            cx={n.cx}
            cy={n.cy}
            r="3"
            fill={colors.caribbeanGreen}
            opacity={Math.sin(frame * 0.12 + i * 2) * 0.4 + 0.6}
          />
        ))}
        {/* Body - circuit traces */}
        <line x1="200" y1="90" x2="200" y2="170" stroke={colors.tiffanyBlue} strokeWidth="2" />
        <line x1="200" y1="110" x2="165" y2="150" stroke={colors.tiffanyBlue} strokeWidth="2" />
        <line x1="200" y1="110" x2="235" y2="150" stroke={colors.tiffanyBlue} strokeWidth="2" />
        <line x1="200" y1="170" x2="170" y2="230" stroke={colors.tiffanyBlue} strokeWidth="2" />
        <line x1="200" y1="170" x2="230" y2="230" stroke={colors.tiffanyBlue} strokeWidth="2" />
        {/* Connection nodes */}
        {[
          { cx: 165, cy: 150 }, { cx: 235, cy: 150 },
          { cx: 170, cy: 230 }, { cx: 230, cy: 230 },
        ].map((n, i) => (
          <circle
            key={`cn-${i}`}
            cx={n.cx}
            cy={n.cy}
            r="4"
            fill={colors.caribbeanGreen}
            opacity={Math.sin(frame * 0.1 + i * 1.8) * 0.3 + 0.7}
          />
        ))}
      </g>

      {/* Connecting bridge between human and digital */}
      <g opacity={morphProgress}>
        {[0, 1, 2, 3].map((i) => {
          const y = 80 + i * 40;
          const signal = Math.sin(frame * 0.1 + i * 1.5) * 0.3 + 0.5;
          return (
            <line
              key={`bridge-${i}`}
              x1={130}
              y1={y}
              x2={170}
              y2={y}
              stroke="url(#humanToDigital)"
              strokeWidth="1"
              opacity={signal}
              strokeDasharray="4 3"
            />
          );
        })}
      </g>
    </svg>
  );
};

export const Scene7Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Main line
  const line1Progress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 12, stiffness: 100 },
  });
  const line1Scale = interpolate(line1Progress, [0, 1], [0.5, 1]);
  const line1Opacity = interpolate(line1Progress, [0, 1], [0, 1]);

  // Second line
  const line2Progress = spring({
    frame,
    fps,
    delay: 2.5 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const line2Opacity = interpolate(line2Progress, [0, 1], [0, 1]);
  const line2Y = interpolate(line2Progress, [0, 1], [30, 0]);

  // Glow pulse
  const glowPulse = Math.sin(frame * 0.08) * 0.1 + 0.9;

  // Slow zoom
  const zoom = interpolate(frame, [0, 15 * fps], [1.06, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out at end
  const fadeOut = interpolate(frame, [11 * fps, 15 * fps], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Bottom accent line
  const lineProgress = interpolate(frame, [fps, 4 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${colors.darkCyra}, ${colors.deepGreenCyanTurquoise} 80%)`,
        fontFamily,
        opacity: fadeOut,
      }}
    >
      {/* Glowing center */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle 500px at 50% 45%, ${colors.tiffanyBlue}15 0%, transparent 100%)`,
        }}
      />

      {/* Main content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          transform: `scale(${zoom})`,
          zIndex: 1,
          paddingBottom: 120,
        }}
      >
        {/* Human-digital blend */}
        <div style={{ marginBottom: 16 }}>
          <HumanDigitalBlend frame={frame} fps={fps} />
        </div>

        {/* Main line */}
        <div
          style={{
            fontSize: 60,
            fontWeight: "bold",
            color: colors.white,
            transform: `scale(${line1Scale})`,
            opacity: line1Opacity * glowPulse,
            textAlign: "center",
            textShadow: `0 0 40px ${colors.darkCyra}40`,
            maxWidth: 1100,
            lineHeight: 1.3,
          }}
        >
          <span style={{ color: colors.caribbeanGreen }}>Augmenting</span> Human Intelligence
        </div>

        {/* Closing thought */}
        <div
          style={{
            fontSize: 28,
            color: colors.magnolia,
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px)`,
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.5,
          }}
        >
          From imitation to{" "}
          <span style={{ color: colors.tiffanyBlue, fontWeight: "bold" }}>
            intelligent assistance
          </span>
          . And the journey is just getting started.
        </div>
      </AbsoluteFill>

      {/* Bottom accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 5,
          backgroundColor: colors.caribbeanGreen,
          transform: `scaleX(${lineProgress})`,
          transformOrigin: "left",
        }}
      />
    </AbsoluteFill>
  );
};
