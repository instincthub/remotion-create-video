import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Animated brain + gear illustration representing AI as a tool
const BrainGearIllustration: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, delay: 1.5 * fps, config: { damping: 200 } });
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  // Gear rotation
  const gearRotation = frame * 1.2;

  // Brain pulse
  const brainPulse = Math.sin(frame * 0.08) * 0.05 + 1;

  // Connection sparks
  const sparkOpacity = Math.sin(frame * 0.15) * 0.4 + 0.6;

  return (
    <div style={{ opacity, position: "relative" }}>
      <svg width="360" height="300" viewBox="0 0 360 300" fill="none">
        {/* Left side: Brain (human thinking) */}
        <g transform={`scale(${brainPulse})`} style={{ transformOrigin: "120px 150px" }}>
          {/* Brain outline */}
          <path
            d="M90 100 C70 100, 55 115, 55 135 C55 150, 65 160, 65 170 C55 175, 50 190, 55 200 C60 215, 75 220, 85 218 C90 230, 105 240, 120 238 C135 240, 150 230, 155 218 C165 220, 180 215, 185 200 C190 190, 185 175, 175 170 C175 160, 185 150, 185 135 C185 115, 170 100, 150 100 C145 90, 130 85, 120 87 C110 85, 95 90, 90 100Z"
            stroke={colors.darkCyra}
            strokeWidth={2.5}
            fill={`${colors.darkCyra}08`}
          />
          {/* Brain fold lines */}
          <path d="M120 100 C115 120, 125 140, 120 160" stroke={colors.darkCyra} strokeWidth={1.5} opacity={0.4} />
          <path d="M95 130 C110 135, 130 130, 145 135" stroke={colors.darkCyra} strokeWidth={1.5} opacity={0.4} />
          <path d="M80 165 C100 160, 115 170, 130 165" stroke={colors.darkCyra} strokeWidth={1.5} opacity={0.3} />
          <path d="M100 195 C115 190, 130 195, 145 190" stroke={colors.darkCyra} strokeWidth={1.5} opacity={0.3} />
        </g>

        {/* "YOU" label under brain */}
        <text x="120" y="265" textAnchor="middle" fill={colors.darkSlateGray} fontSize="18" fontWeight="bold" fontFamily="Inter, sans-serif">
          YOUR THINKING
        </text>

        {/* Connection line / spark between brain and gear */}
        <g opacity={sparkOpacity}>
          <line x1="185" y1="150" x2="215" y2="150" stroke={colors.tiffanyBlue} strokeWidth={2} strokeDasharray="4 3" />
          {/* Spark dots */}
          <circle cx={195 + Math.sin(frame * 0.2) * 8} cy={150 + Math.cos(frame * 0.3) * 5} r="3" fill={colors.tiffanyBlue} />
          <circle cx={205 + Math.cos(frame * 0.2) * 6} cy={150 + Math.sin(frame * 0.25) * 4} r="2" fill={colors.caribbeanGreen} />
        </g>

        {/* Right side: Gear (AI tool) */}
        <g transform={`rotate(${gearRotation}, 280, 150)`}>
          {/* Outer gear teeth */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x = 280 + Math.cos(rad) * 52;
            const y = 150 + Math.sin(rad) * 52;
            return (
              <rect
                key={i}
                x={x - 8}
                y={y - 6}
                width={16}
                height={12}
                rx={2}
                fill={colors.tiffanyBlue}
                transform={`rotate(${angle}, ${x}, ${y})`}
              />
            );
          })}
          {/* Gear body */}
          <circle cx="280" cy="150" r="40" fill={`${colors.tiffanyBlue}15`} stroke={colors.tiffanyBlue} strokeWidth={2.5} />
          <circle cx="280" cy="150" r="15" fill={colors.white} stroke={colors.tiffanyBlue} strokeWidth={2} />
        </g>

        {/* "AI" label inside gear (non-rotating) */}
        <text x="280" y="156" textAnchor="middle" fill={colors.tiffanyBlue} fontSize="16" fontWeight="bold" fontFamily="Inter, sans-serif">
          AI
        </text>

        {/* "TOOL" label under gear */}
        <text x="280" y="265" textAnchor="middle" fill={colors.darkSlateGray} fontSize="18" fontWeight="bold" fontFamily="Inter, sans-serif">
          AI TOOL
        </text>

        {/* Plus / amplify symbol */}
        <g opacity={sparkOpacity}>
          <circle cx="200" cy="150" r="14" fill={colors.caribbeanGreen} />
          <line x1="194" y1="150" x2="206" y2="150" stroke={colors.white} strokeWidth={2.5} />
          <line x1="200" y1="144" x2="200" y2="156" stroke={colors.white} strokeWidth={2.5} />
        </g>

        {/* Output arrows going right from gear */}
        {[0, 1, 2].map((i) => {
          const arrowDelay = 3 * fps + i * 10;
          const arrowOpacity = interpolate(
            frame - arrowDelay,
            [0, 15],
            [0, 0.5],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          const arrowX = interpolate(
            (frame - arrowDelay) % 40,
            [0, 40],
            [0, 30],
          );
          return (
            <circle
              key={i}
              cx={330 + arrowX}
              cy={135 + i * 15}
              r={3}
              fill={colors.caribbeanGreen}
              opacity={arrowOpacity}
            />
          );
        })}
      </svg>
    </div>
  );
};

export const Scene5AIClarity: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Line 1
  const line1Progress = spring({ frame, fps, delay: 15, config: { damping: 200 } });
  const line1Opacity = interpolate(line1Progress, [0, 1], [0, 1]);
  const line1Y = interpolate(line1Progress, [0, 1], [40, 0]);

  // Line 2
  const line2Progress = spring({ frame, fps, delay: 1.5 * fps, config: { damping: 200 } });
  const line2Opacity = interpolate(line2Progress, [0, 1], [0, 1]);
  const line2Scale = interpolate(line2Progress, [0, 1], [0.8, 1]);

  // Power tool analogy card
  const analogyDelay = 6 * fps;
  const analogyProgress = spring({ frame, fps, delay: analogyDelay, config: { damping: 200 } });
  const analogyOpacity = interpolate(analogyProgress, [0, 1], [0, 1]);
  const analogyY = interpolate(analogyProgress, [0, 1], [30, 0]);

  // Sub-line
  const subDelay = 10 * fps;
  const subProgress = spring({ frame, fps, delay: subDelay, config: { damping: 200 } });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white, fontFamily }}>
      {/* Subtle radial glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.darkCyra}08, transparent 70%)`,
          transform: "translate(-50%, -50%)",
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
          gap: 10,
        }}
      >
        {/* Text */}
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: colors.darkSlateGray,
              opacity: line1Opacity,
              transform: `translateY(${line1Y}px)`,
              lineHeight: 1.3,
            }}
          >
            AI amplifies
          </div>
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              color: colors.darkCyra,
              opacity: line2Opacity,
              transform: `scale(${line2Scale})`,
              lineHeight: 1.2,
            }}
          >
            clarity
          </div>
        </div>

        {/* Brain + Gear illustration */}
        <BrainGearIllustration />

        {/* Power tool card */}
        <div
          style={{
            padding: "20px 32px",
            borderRadius: 16,
            border: `2px solid ${colors.tiffanyBlue}40`,
            backgroundColor: colors.magnolia,
            opacity: analogyOpacity,
            transform: `translateY(${analogyY}px)`,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 26, color: colors.gunmetal, lineHeight: 1.5 }}>
            A power tool makes you <span style={{ fontWeight: 700, color: colors.darkCyra }}>faster</span>.
            <br />
            But you still need to know <span style={{ fontWeight: 700, color: colors.darkCyra }}>where to drill</span>.
          </div>
        </div>

        {/* Sub-line */}
        <div
          style={{
            fontSize: 22,
            color: colors.rhythm,
            opacity: subOpacity,
            marginTop: 10,
            textAlign: "center",
          }}
        >
          It reflects the clarity of your thinking.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
