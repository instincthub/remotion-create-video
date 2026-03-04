import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Animated handwritten letter being recognized
const HandwritingDemo: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, delay, config: { damping: 200 } });
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const scale = interpolate(entrance, [0, 1], [0.7, 1]);

  // Drawing progress for the handwritten "A"
  const drawProgress = interpolate(
    frame - delay,
    [0, 60],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Recognition flash
  const recognizeDelay = delay + 70;
  const recognizeEntrance = spring({
    frame,
    fps,
    delay: recognizeDelay,
    config: { damping: 14, stiffness: 80 },
  });
  const recognizeScale = interpolate(recognizeEntrance, [0, 1], [0, 1]);
  const recognizeOpacity = interpolate(recognizeEntrance, [0, 1], [0, 1]);

  // Second letter "B"
  const drawProgress2 = interpolate(
    frame - delay - 90,
    [0, 60],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const recognizeDelay2 = delay + 160;
  const recognize2 = spring({
    frame,
    fps,
    delay: recognizeDelay2,
    config: { damping: 14, stiffness: 80 },
  });
  const recognize2Scale = interpolate(recognize2, [0, 1], [0, 1]);
  const recognize2Opacity = interpolate(recognize2, [0, 1], [0, 1]);

  return (
    <div style={{ opacity, transform: `scale(${scale})` }}>
      <svg width="800" height="500" viewBox="0 0 800 500" fill="none">
        {/* Paper background */}
        <rect
          x="40"
          y="30"
          width="720"
          height="440"
          rx="16"
          fill={`${colors.darkSlateGray}`}
          stroke={`${colors.tiffanyBlue}30`}
          strokeWidth={1.5}
        />
        {/* Ruled lines */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line
            key={i}
            x1="70"
            y1={100 + i * 65}
            x2="730"
            y2={100 + i * 65}
            stroke={`${colors.tiffanyBlue}12`}
            strokeWidth={1}
          />
        ))}

        {/* Left margin */}
        <line x1="120" y1="30" x2="120" y2="470" stroke={`${colors.oldRose}15`} strokeWidth={1} />

        {/* Handwritten "A" - drawn progressively */}
        <g opacity={drawProgress > 0 ? 1 : 0}>
          <path
            d="M180 290 Q210 120 240 130 Q270 120 300 290"
            stroke={colors.white}
            strokeWidth={3}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={300}
            strokeDashoffset={300 * (1 - Math.min(drawProgress * 1.5, 1))}
          />
          <path
            d="M200 230 L280 230"
            stroke={colors.white}
            strokeWidth={3}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={80}
            strokeDashoffset={80 * (1 - Math.max((drawProgress - 0.6) * 2.5, 0))}
          />
        </g>

        {/* Recognition result for "A" */}
        <g transform={`translate(240, 340) scale(${recognizeScale})`} opacity={recognizeOpacity}>
          <rect
            x="-40"
            y="-22"
            width="80"
            height="44"
            rx="10"
            fill={`${colors.caribbeanGreen}20`}
            stroke={colors.caribbeanGreen}
            strokeWidth={2}
          />
          <text
            x="0"
            y="8"
            fontSize="26"
            fontWeight="700"
            fill={colors.caribbeanGreen}
            textAnchor="middle"
            fontFamily="monospace"
          >
            A
          </text>
        </g>

        {/* Arrow from handwritten to recognized */}
        <path
          d="M240 295 L240 315"
          stroke={colors.caribbeanGreen}
          strokeWidth={2}
          opacity={recognizeOpacity * 0.6}
          strokeDasharray="4 3"
        />

        {/* Handwritten "B" */}
        <g opacity={drawProgress2 > 0 ? 1 : 0}>
          <path
            d="M420 130 L420 290"
            stroke={colors.white}
            strokeWidth={3}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={160}
            strokeDashoffset={160 * (1 - Math.min(drawProgress2 * 2, 1))}
          />
          <path
            d="M420 130 Q490 130 490 175 Q490 210 420 210 Q500 210 500 250 Q500 290 420 290"
            stroke={colors.white}
            strokeWidth={3}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={350}
            strokeDashoffset={350 * (1 - Math.min(drawProgress2 * 1.3, 1))}
          />
        </g>

        {/* Recognition result for "B" */}
        <g transform={`translate(460, 340) scale(${recognize2Scale})`} opacity={recognize2Opacity}>
          <rect
            x="-40"
            y="-22"
            width="80"
            height="44"
            rx="10"
            fill={`${colors.caribbeanGreen}20`}
            stroke={colors.caribbeanGreen}
            strokeWidth={2}
          />
          <text
            x="0"
            y="8"
            fontSize="26"
            fontWeight="700"
            fill={colors.caribbeanGreen}
            textAnchor="middle"
            fontFamily="monospace"
          >
            B
          </text>
        </g>

        <path
          d="M460 295 L460 315"
          stroke={colors.caribbeanGreen}
          strokeWidth={2}
          opacity={recognize2Opacity * 0.6}
          strokeDasharray="4 3"
        />

        {/* Pen icon */}
        <g transform={`translate(${150 + drawProgress * 150}, ${280 - drawProgress * 80})`} opacity={drawProgress > 0 && drawProgress < 0.9 ? 0.8 : 0}>
          <path
            d="M0 0 L-5 -20 L5 -20 Z"
            fill={colors.corn}
          />
          <rect x="-4" y="-35" width="8" height="16" rx="2" fill={colors.corn} opacity={0.6} />
        </g>
      </svg>
    </div>
  );
};

export const Scene6Handwriting: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Badge entrance
  const badgeEntrance = spring({ frame, fps, delay: 5, config: { damping: 14, stiffness: 80 } });
  const badgeScale = interpolate(badgeEntrance, [0, 1], [0, 1]);

  const titleProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 200 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

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
        {/* "#2" badge */}
        <div
          style={{
            transform: `scale(${badgeScale})`,
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: `${colors.caribbeanGreen}20`,
            border: `2px solid ${colors.caribbeanGreen}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            fontWeight: 700,
            color: colors.caribbeanGreen,
          }}
        >
          #2
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            lineHeight: 1.2,
          }}
        >
          Handwriting
          <br />
          <span style={{ color: colors.caribbeanGreen }}>Recognition</span>
        </div>

        {/* Demo */}
        <HandwritingDemo delay={20} />

        {/* Subtitle */}
        <div
          style={{
            fontSize: 22,
            fontWeight: 400,
            color: colors.chineseSilver,
            textAlign: "center",
            lineHeight: 1.4,
            opacity: titleOpacity,
          }}
        >
          Pen to text, powered by ML
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
