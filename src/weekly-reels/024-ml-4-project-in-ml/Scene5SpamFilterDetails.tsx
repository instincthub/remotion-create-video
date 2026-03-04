import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Message flowing through filter
const FilterFlow: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, delay, config: { damping: 200 } });
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const scale = interpolate(entrance, [0, 1], [0.7, 1]);

  // Particles flowing through
  const particles = [
    { startY: 80, label: "Scam", isBad: true, offset: 0 },
    { startY: 140, label: "Legit", isBad: false, offset: 15 },
    { startY: 200, label: "Phish", isBad: true, offset: 30 },
    { startY: 260, label: "Real", isBad: false, offset: 45 },
    { startY: 320, label: "Fake", isBad: true, offset: 60 },
  ];

  return (
    <div style={{ opacity, transform: `scale(${scale})` }}>
      <svg width="700" height="420" viewBox="0 0 700 420" fill="none">
        {/* Input side label */}
        <text x="60" y="40" fontSize="18" fill={colors.chineseSilver} fontWeight="700" textAnchor="middle">
          Incoming
        </text>

        {/* Filter box in center */}
        <rect
          x="250"
          y="60"
          width="200"
          height="300"
          rx="16"
          fill={`${colors.tiffanyBlue}10`}
          stroke={colors.tiffanyBlue}
          strokeWidth={2}
        />
        <text x="350" y="200" fontSize="22" fill={colors.tiffanyBlue} fontWeight="700" textAnchor="middle">
          ML
        </text>
        <text x="350" y="225" fontSize="16" fill={colors.tiffanyBlue} textAnchor="middle">
          Filter
        </text>

        {/* Output side labels */}
        <text x="560" y="120" fontSize="16" fill={colors.limeGreen} fontWeight="700" textAnchor="middle">
          Clean
        </text>
        <text x="560" y="340" fontSize="16" fill={colors.oldRose} fontWeight="700" textAnchor="middle">
          Spam
        </text>

        {/* Flowing particles */}
        {particles.map((p, i) => {
          const particleFrame = frame - delay - p.offset;
          const progress = interpolate(
            particleFrame,
            [0, 40, 60, 90],
            [0, 0.35, 0.65, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );

          if (progress <= 0) return null;

          let x: number;
          let y: number;

          if (progress <= 0.35) {
            // Moving towards filter
            x = interpolate(progress, [0, 0.35], [40, 240]);
            y = p.startY;
          } else if (progress <= 0.65) {
            // Inside filter
            x = interpolate(progress, [0.35, 0.65], [240, 460]);
            y = p.startY;
          } else {
            // Exiting - split based on good/bad
            x = interpolate(progress, [0.65, 1], [460, 640]);
            y = p.isBad
              ? interpolate(progress, [0.65, 1], [p.startY, 330])
              : interpolate(progress, [0.65, 1], [p.startY, 110]);
          }

          const pColor = p.isBad ? colors.oldRose : colors.limeGreen;

          return (
            <g key={i}>
              <rect
                x={x - 30}
                y={y - 14}
                width={60}
                height={28}
                rx={8}
                fill={`${pColor}20`}
                stroke={pColor}
                strokeWidth={1.5}
              />
              <text
                x={x}
                y={y + 5}
                fontSize="13"
                fill={pColor}
                fontWeight="700"
                textAnchor="middle"
              >
                {p.label}
              </text>
            </g>
          );
        })}

        {/* Arrows */}
        <path d="M180 210 L240 210" stroke={colors.rhythm} strokeWidth={1.5} strokeDasharray="4 4" />
        <path d="M460 210 L520 210" stroke={colors.rhythm} strokeWidth={1.5} strokeDasharray="4 4" />
      </svg>
    </div>
  );
};

export const Scene5SpamFilterDetails: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 200 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  // Tech badges at the bottom
  const techDelay = 8 * fps;
  const techProgress = spring({ frame, fps, delay: techDelay, config: { damping: 200 } });
  const techOpacity = interpolate(techProgress, [0, 1], [0, 1]);
  const techY = interpolate(techProgress, [0, 1], [20, 0]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${colors.gunmetal}, ${colors.darkSlateGray})`,
        fontFamily,
      }}
    >
      <AbsoluteFill style={{ opacity: 0.03 }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`h-${i}`}
            style={{
              position: "absolute",
              top: i * 96,
              left: 0,
              width: "100%",
              height: 1,
              backgroundColor: colors.tiffanyBlue,
            }}
          />
        ))}
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 300,
          paddingLeft: 30,
          paddingRight: 30,
          gap: 20,
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: 38,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            lineHeight: 1.3,
          }}
        >
          Detects What's
          <br />
          <span style={{ color: colors.oldRose }}>Fake or Fishy</span>
        </div>

        {/* Filter flow visualization */}
        <FilterFlow delay={15} />

        {/* Tech stack badges */}
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "center",
            opacity: techOpacity,
            transform: `translateY(${techY}px)`,
          }}
        >
          {["NLP", "Classification", "Pattern Matching"].map((tech, i) => {
            const pulse = Math.sin(frame * 0.06 + i * 2) * 0.04 + 1;
            return (
              <div
                key={tech}
                style={{
                  padding: "8px 18px",
                  borderRadius: 12,
                  background: `${colors.tiffanyBlue}10`,
                  border: `1px solid ${colors.tiffanyBlue}30`,
                  fontSize: 16,
                  fontWeight: 700,
                  color: colors.tiffanyBlue,
                  transform: `scale(${pulse})`,
                }}
              >
                {tech}
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
