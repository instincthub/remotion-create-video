import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Chess piece (knight) that morphs into a circuit pattern
const ChessToCircuit: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const morphProgress = interpolate(frame, [3 * fps, 6 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const chessOpacity = interpolate(morphProgress, [0, 0.4, 0.6, 1], [1, 1, 0.3, 0]);
  const circuitOpacity = interpolate(morphProgress, [0, 0.4, 0.6, 1], [0, 0.3, 1, 1]);
  const pulse = Math.sin(frame * 0.06) * 0.15 + 0.85;

  return (
    <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
      <defs>
        <filter id="closingGlow6">
          <feGaussianBlur stdDeviation="5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Chess knight outline */}
      <g opacity={chessOpacity} filter="url(#closingGlow6)">
        {/* Base */}
        <rect x="100" y="240" width="100" height="20" rx="4" stroke={colors.caribbeanGreen} strokeWidth="2.5" fill="none" />
        {/* Body */}
        <path
          d="M120 240 L120 180 C120 160 130 140 140 130 L130 110 C125 105 125 95 135 90 L145 85 C150 100 160 105 170 100 L175 95 C180 90 185 90 185 95 L185 110 C180 115 175 125 175 140 L175 180 L175 240"
          stroke={colors.caribbeanGreen}
          strokeWidth="2.5"
          fill="none"
        />
        {/* Eye */}
        <circle cx="155" cy="110" r="5" fill={colors.caribbeanGreen} />
      </g>

      {/* Circuit pattern (appears on morph) */}
      <g opacity={circuitOpacity * pulse} filter="url(#closingGlow6)">
        {/* Central chip */}
        <rect x="120" y="120" width="60" height="60" rx="4" stroke={colors.tiffanyBlue} strokeWidth="2" fill={`${colors.darkCyra}20`} />
        {/* Inner detail */}
        <rect x="135" y="135" width="30" height="30" rx="2" stroke={colors.caribbeanGreen} strokeWidth="1.5" fill={`${colors.caribbeanGreen}15`} />

        {/* Circuit traces */}
        {/* Top */}
        <line x1="135" y1="120" x2="135" y2="80" stroke={colors.tiffanyBlue} strokeWidth="2" />
        <line x1="150" y1="120" x2="150" y2="70" stroke={colors.tiffanyBlue} strokeWidth="2" />
        <line x1="165" y1="120" x2="165" y2="80" stroke={colors.tiffanyBlue} strokeWidth="2" />
        <circle cx="135" cy="80" r="4" fill={colors.caribbeanGreen} />
        <circle cx="150" cy="70" r="4" fill={colors.caribbeanGreen} />
        <circle cx="165" cy="80" r="4" fill={colors.caribbeanGreen} />

        {/* Bottom */}
        <line x1="135" y1="180" x2="135" y2="220" stroke={colors.tiffanyBlue} strokeWidth="2" />
        <line x1="150" y1="180" x2="150" y2="230" stroke={colors.tiffanyBlue} strokeWidth="2" />
        <line x1="165" y1="180" x2="165" y2="220" stroke={colors.tiffanyBlue} strokeWidth="2" />
        <circle cx="135" cy="220" r="4" fill={colors.caribbeanGreen} />
        <circle cx="150" cy="230" r="4" fill={colors.caribbeanGreen} />
        <circle cx="165" cy="220" r="4" fill={colors.caribbeanGreen} />

        {/* Left */}
        <line x1="120" y1="140" x2="80" y2="140" stroke={colors.tiffanyBlue} strokeWidth="2" />
        <line x1="120" y1="160" x2="80" y2="160" stroke={colors.tiffanyBlue} strokeWidth="2" />
        <circle cx="80" cy="140" r="4" fill={colors.caribbeanGreen} />
        <circle cx="80" cy="160" r="4" fill={colors.caribbeanGreen} />

        {/* Right */}
        <line x1="180" y1="140" x2="220" y2="140" stroke={colors.tiffanyBlue} strokeWidth="2" />
        <line x1="180" y1="160" x2="220" y2="160" stroke={colors.tiffanyBlue} strokeWidth="2" />
        <circle cx="220" cy="140" r="4" fill={colors.caribbeanGreen} />
        <circle cx="220" cy="160" r="4" fill={colors.caribbeanGreen} />

        {/* Branching lines */}
        <line x1="135" y1="80" x2="100" y2="50" stroke={colors.tiffanyBlue} strokeWidth="1.5" />
        <line x1="165" y1="80" x2="200" y2="50" stroke={colors.tiffanyBlue} strokeWidth="1.5" />
        <circle cx="100" cy="50" r="3" fill={colors.caribbeanGreen} />
        <circle cx="200" cy="50" r="3" fill={colors.caribbeanGreen} />
      </g>
    </svg>
  );
};

export const Scene8Closing: React.FC = () => {
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

  // Slow zoom out
  const zoom = interpolate(frame, [0, 20 * fps], [1.08, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out at end
  const fadeOut = interpolate(frame, [16 * fps, 20 * fps], [1, 0], {
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
        background: `linear-gradient(160deg, ${colors.americanPurple}, ${colors.darkCyra} 80%)`,
        fontFamily,
        opacity: fadeOut,
      }}
    >
      {/* Glowing center */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle 500px at 50% 50%, ${colors.darkCyra}25 0%, transparent 100%)`,
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
          paddingBottom: 80,
        }}
      >
        {/* Chess to circuit morph */}
        <div style={{ marginBottom: 16 }}>
          <ChessToCircuit />
        </div>

        {/* Main line */}
        <div
          style={{
            fontSize: 64,
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
          The{" "}
          <span style={{ color: colors.caribbeanGreen }}>Future</span> Starts
          with a Move
        </div>

        {/* Closing thought */}
        <div
          style={{
            fontSize: 30,
            color: colors.magnolia,
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px)`,
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.5,
          }}
        >
          Sometimes, the future of technology starts
          <br />
          with a simple move on a board.
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
