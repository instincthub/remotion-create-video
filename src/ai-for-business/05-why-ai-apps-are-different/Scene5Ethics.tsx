import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Animated balance scale SVG
const BalanceScale: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  // Scale tilts slightly back and forth, settling to balance
  const tiltProgress = interpolate(frame, [3 * fps, 12 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tilt = Math.sin(tiltProgress * Math.PI * 3) * (1 - tiltProgress) * 12;

  const scaleOpacity = interpolate(frame, [2 * fps, 4 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Left pan items (code icon)
  const leftItemOpacity = interpolate(frame, [5 * fps, 6.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Right pan items (human icon)
  const rightItemOpacity = interpolate(frame, [7 * fps, 8.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg
      width="600"
      height="380"
      viewBox="0 0 600 380"
      style={{ opacity: scaleOpacity }}
    >
      {/* Base */}
      <rect x={250} y={340} width={100} height={20} rx={6} fill={colors.darkSlateGray} />
      <rect x={290} y={180} width={20} height={165} rx={4} fill={colors.darkSlateGray} />

      {/* Beam */}
      <g transform={`rotate(${tilt}, 300, 180)`}>
        <rect x={80} y={175} width={440} height={10} rx={5} fill={colors.darkCyra} />

        {/* Left pan */}
        <line x1={130} y1={185} x2={130} y2={260} stroke={colors.darkCyra} strokeWidth={2} />
        <line x1={80} y1={260} x2={180} y2={260} stroke={colors.darkCyra} strokeWidth={2} />
        <path d="M80 260 Q90 290 130 300 Q170 290 180 260" fill={`${colors.darkCyra}20`} stroke={colors.darkCyra} strokeWidth={2} />

        {/* Code icon on left pan */}
        <g opacity={leftItemOpacity}>
          <text x={107} y={285} fontSize={32} fill={colors.darkCyra} fontFamily="monospace">
            {"</>"}
          </text>
          <text x={88} y={320} fontSize={14} fill={colors.rhythm} textAnchor="start" fontFamily={fontFamily}>
            Formal Tests
          </text>
        </g>

        {/* Right pan */}
        <line x1={470} y1={185} x2={470} y2={260} stroke={colors.darkCyra} strokeWidth={2} />
        <line x1={420} y1={260} x2={520} y2={260} stroke={colors.darkCyra} strokeWidth={2} />
        <path d="M420 260 Q430 290 470 300 Q510 290 520 260" fill={`${colors.darkCyra}20`} stroke={colors.darkCyra} strokeWidth={2} />

        {/* Human icon on right pan */}
        <g opacity={rightItemOpacity}>
          <circle cx={470} cy={270} r={12} fill={colors.caribbeanGreen} />
          <rect x={458} y={286} width={24} height={20} rx={6} fill={colors.caribbeanGreen} />
          <text x={435} y={320} fontSize={14} fill={colors.rhythm} fontFamily={fontFamily}>
            Competence
          </text>
        </g>
      </g>

      {/* Fulcrum triangle */}
      <polygon points="280,178 320,178 300,160" fill={colors.darkSlateGray} />
    </svg>
  );
};

export const Scene5Ethics: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "From fit for purpose..."
  const fromProgress = spring({
    frame,
    fps,
    delay: 1 * fps,
    config: { damping: 200 },
  });
  const fromOpacity = interpolate(fromProgress, [0, 1], [0, 1]);
  const fromY = interpolate(fromProgress, [0, 1], [15, 0]);

  // "...to competence"
  const toProgress = spring({
    frame,
    fps,
    delay: 2.5 * fps,
    config: { damping: 10, stiffness: 100 },
  });
  const toOpacity = interpolate(toProgress, [0, 1], [0, 1]);
  const toScale = interpolate(toProgress, [0, 1], [0.8, 1]);

  // Three pillars
  const pillars = ["Ethics", "Trust", "Responsibility"];
  const pillarElements = pillars.map((pillar, i) => {
    const p = spring({
      frame,
      fps,
      delay: 15 * fps + i * 20,
      config: { damping: 12, stiffness: 100 },
    });
    return {
      label: pillar,
      opacity: interpolate(p, [0, 1], [0, 1]),
      y: interpolate(p, [0, 1], [30, 0]),
    };
  });

  // Bottom text
  const bottomProgress = spring({
    frame,
    fps,
    delay: 20 * fps,
    config: { damping: 200 },
  });
  const bottomOpacity = interpolate(bottomProgress, [0, 1], [0, 1]);

  // Parallax background
  const bgX = interpolate(frame, [0, 27 * fps], [0, -30], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.magnolia} 0%, ${colors.white} 100%)`,
        fontFamily,
      }}
    >
      {/* Parallax grid */}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(${colors.darkCyra}08 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          transform: `translateX(${bgX}px)`,
        }}
      />

      {/* Heading section */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 30,
            color: colors.rhythm,
            opacity: fromOpacity,
            transform: `translateY(${fromY}px)`,
          }}
        >
          From{" "}
          <span
            style={{
              textDecoration: "line-through",
              color: colors.oldRose,
            }}
          >
            fit for purpose
          </span>
        </div>
        <div
          style={{
            fontSize: 62,
            fontWeight: "bold",
            color: colors.darkSlateGray,
            opacity: toOpacity,
            transform: `scale(${toScale})`,
            marginTop: 8,
          }}
        >
          to{" "}
          <span style={{ color: colors.darkCyra }}>competence</span>
        </div>
      </div>

      {/* Balance scale */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <BalanceScale frame={frame} fps={fps} />
      </div>

      {/* Three pillars */}
      <div
        style={{
          position: "absolute",
          bottom: 210,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 50,
        }}
      >
        {pillarElements.map((pillar, i) => (
          <div
            key={i}
            style={{
              opacity: pillar.opacity,
              transform: `translateY(${pillar.y}px)`,
              width: 220,
              height: 80,
              backgroundColor: colors.white,
              border: `2px solid ${colors.darkCyra}`,
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: "bold",
              color: colors.darkCyra,
              boxShadow: `0 4px 20px ${colors.darkCyra}15`,
            }}
          >
            {pillar.label}
          </div>
        ))}
      </div>

      {/* Bottom text */}
      <div
        style={{
          position: "absolute",
          bottom: 130,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: bottomOpacity,
          fontSize: 22,
          color: colors.rhythm,
        }}
      >
        We do not expect perfection. We expect{" "}
        <span style={{ color: colors.darkCyra, fontWeight: "bold" }}>
          competence
        </span>
        , judgment, and responsible practice.
      </div>
    </AbsoluteFill>
  );
};
