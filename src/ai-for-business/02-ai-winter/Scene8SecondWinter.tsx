import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Snow particles (reused pattern)
const SnowParticles: React.FC = () => {
  const frame = useCurrentFrame();

  const flakes = Array.from({ length: 50 }, (_, i) => ({
    x: ((i * 137 + 50) % 1920),
    startY: -20 - ((i * 83) % 200),
    speed: 0.6 + (i % 5) * 0.25,
    size: 2 + (i % 4),
    sway: (i % 3) * 0.4,
    opacity: 0.15 + (i % 5) * 0.08,
  }));

  return (
    <AbsoluteFill>
      {flakes.map((flake, i) => {
        const y = flake.startY + frame * flake.speed;
        const wrappedY = ((y % 1200) + 1200) % 1200 - 100;
        const swayX = Math.sin((frame * 0.02 + i) * flake.sway) * 15;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: flake.x + swayX,
              top: wrappedY,
              width: flake.size,
              height: flake.size,
              borderRadius: flake.size / 2,
              backgroundColor: colors.frostWhite,
              opacity: flake.opacity,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// Hardware boxes that fade and crack
const HardwareBox: React.FC<{
  x: number;
  y: number;
  label: string;
  dimProgress: number;
}> = ({ x, y, label, dimProgress }) => {
  const opacity = interpolate(dimProgress, [0, 1], [0.8, 0.1]);
  const crackOpacity = interpolate(dimProgress, [0.5, 1], [0, 0.8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Box */}
      <rect width="140" height="100" rx="6"
        stroke={colors.iceGray} strokeWidth={2} fill="none" opacity={opacity}
      />
      {/* Screen */}
      <rect x="15" y="12" width="110" height="50" rx="3"
        fill={`rgba(148,163,184,${opacity * 0.1})`}
        stroke={colors.iceGray} strokeWidth={1} opacity={opacity}
      />
      {/* Power indicator dimming */}
      <circle cx="70" cy="80" r="5"
        fill={dimProgress > 0.7 ? colors.iceGray : colors.neonGreen}
        opacity={opacity}
      />
      {/* Label */}
      <text x="70" y="96" textAnchor="middle" fill={colors.iceGray} fontSize="10" opacity={opacity}>
        {label}
      </text>
      {/* Crack lines */}
      <line x1="60" y1="20" x2="90" y2="55" stroke={colors.iceGray} strokeWidth={1.5} opacity={crackOpacity} />
      <line x1="80" y1="15" x2="50" y2="50" stroke={colors.iceGray} strokeWidth={1} opacity={crackOpacity * 0.7} />
    </g>
  );
};

export const Scene8SecondWinter: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({ frame, fps, delay: 15, config: { damping: 200 } });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

  // Hardware dimming
  const dimProgress = interpolate(
    frame,
    [4 * fps, 14 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Funding graph drops again
  const graphDelay = 6 * fps;
  const graphProgress = interpolate(
    frame,
    [graphDelay, graphDelay + 8 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // "Cycle repeats" text
  const cycleDelay = 12 * fps;
  const cycleProgress = spring({ frame, fps, delay: cycleDelay, config: { damping: 200 } });
  const cycleOpacity = interpolate(cycleProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.winterBlue,
        fontFamily,
      }}
    >
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, ${colors.winterBlue} 0%, #0c1929 100%)`,
        }}
      />

      <SnowParticles />

      {/* Hardware boxes */}
      <AbsoluteFill style={{ opacity: 0.9 }}>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080">
          <HardwareBox x={200} y={650} label="LISP Machine" dimProgress={dimProgress} />
          <HardwareBox x={500} y={680} label="Expert System" dimProgress={dimProgress * 0.85} />
          <HardwareBox x={1200} y={660} label="AI Workstation" dimProgress={dimProgress * 0.9} />
          <HardwareBox x={1500} y={690} label="Symbolics" dimProgress={dimProgress * 0.95} />
        </svg>
      </AbsoluteFill>

      {/* Content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          padding: "60px 160px",
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: "bold",
            color: colors.frostWhite,
            opacity: titleOpacity,
            textAlign: "center",
          }}
        >
          The Second AI Winter
        </div>

        <div
          style={{
            backgroundColor: colors.winterBlue,
            border: `2px solid ${colors.iceGray}`,
            padding: "8px 28px",
            borderRadius: 30,
            fontSize: 24,
            fontWeight: "bold",
            color: colors.frostWhite,
            opacity: titleOpacity,
          }}
        >
          1987 – 1993
        </div>

        {/* Mini funding graph */}
        <svg width="700" height="140" viewBox="0 0 700 140" fill="none" style={{ marginTop: 20 }}>
          {/* Declining line */}
          <path
            d={`M 50 30 ${graphProgress > 0 ? `L ${50 + graphProgress * 600} ${30 + graphProgress * 90}` : ""}`}
            stroke={colors.oldRose} strokeWidth={3} fill="none" strokeLinecap="round"
          />
          <text x="350" y="135" textAnchor="middle" fill={colors.iceGray} fontSize="13">
            Funding collapsed again
          </text>
        </svg>

        {/* Cycle repeats */}
        <div
          style={{
            fontSize: 24,
            color: colors.iceGray,
            opacity: cycleOpacity,
            textAlign: "center",
            maxWidth: 600,
            lineHeight: 1.6,
            marginTop: 10,
          }}
        >
          The cycle of{" "}
          <span style={{ color: colors.neonGreen, fontWeight: "bold" }}>hype</span>,{" "}
          <span style={{ color: colors.corn, fontWeight: "bold" }}>disappointment</span>, and{" "}
          <span style={{ color: colors.oldRose, fontWeight: "bold" }}>abandonment</span>{" "}
          repeated itself.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
