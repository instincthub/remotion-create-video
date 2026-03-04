import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Animated keyword particles flowing into a funnel
const KeywordFunnel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, delay: 15, config: { damping: 200 } });
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const scale = interpolate(entrance, [0, 1], [0.7, 1]);

  // Keyword particles
  const keywords = [
    { label: "word", x: -120, startY: -80, delay: 20 },
    { label: "data", x: 120, startY: -60, delay: 25 },
    { label: "text", x: -80, startY: -100, delay: 30 },
    { label: "flag", x: 80, startY: -90, delay: 35 },
    { label: "term", x: -40, startY: -70, delay: 40 },
    { label: "key", x: 40, startY: -110, delay: 45 },
  ];

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        position: "relative",
        width: 400,
        height: 350,
      }}
    >
      {/* Keyword particles */}
      {keywords.map((kw, i) => {
        const progress = interpolate(
          frame - kw.delay,
          [0, 80],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        const kwX = interpolate(progress, [0, 1], [kw.x, 0]);
        const kwY = interpolate(progress, [0, 1], [kw.startY, 80]);
        const kwOpacity = interpolate(progress, [0, 0.1, 0.8, 1], [0, 0.8, 0.8, 0]);
        const kwScale = interpolate(progress, [0, 0.5, 1], [1, 0.8, 0.3]);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: "50%",
              top: "40%",
              transform: `translate(${kwX}px, ${kwY}px) scale(${kwScale})`,
              opacity: kwOpacity,
              fontSize: 18,
              fontWeight: 700,
              color: colors.tiffanyBlue,
              backgroundColor: `${colors.tiffanyBlue}12`,
              border: `1px solid ${colors.tiffanyBlue}30`,
              borderRadius: 8,
              padding: "6px 14px",
              whiteSpace: "nowrap",
            }}
          >
            {kw.label}
          </div>
        );
      })}

      {/* Funnel / Model container */}
      <svg
        width="400"
        height="350"
        viewBox="0 0 400 350"
        fill="none"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        {/* Funnel shape */}
        <path
          d="M120 160 L80 160 Q70 160 75 170 L170 310 Q180 325 190 310 L285 170 Q290 160 280 160 L240 160"
          fill={`${colors.tiffanyBlue}08`}
          stroke={colors.tiffanyBlue}
          strokeWidth={1.5}
        />
        {/* Funnel opening */}
        <path
          d="M80 160 L280 160"
          stroke={colors.tiffanyBlue}
          strokeWidth={1.5}
          strokeDasharray="4 4"
          opacity={0.4}
        />

        {/* Model box at bottom */}
        <rect
          x="150"
          y="290"
          width="60"
          height="40"
          rx="8"
          fill={`${colors.caribbeanGreen}20`}
          stroke={colors.caribbeanGreen}
          strokeWidth={1.5}
        />
        <text
          x="180"
          y="315"
          textAnchor="middle"
          fill={colors.caribbeanGreen}
          fontSize="14"
          fontWeight={700}
          fontFamily="Inter, sans-serif"
        >
          MODEL
        </text>
      </svg>
    </div>
  );
};

export const Scene4TrainingKeywords: React.FC = () => {
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

  // Big number animation
  const numProgress = spring({
    frame,
    fps,
    delay: 50,
    config: { damping: 14, stiffness: 60 },
  });
  const numOpacity = interpolate(numProgress, [0, 1], [0, 1]);
  const numScale = interpolate(numProgress, [0, 1], [0.7, 1]);

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
          paddingLeft: 50,
          paddingRight: 50,
          gap: 16,
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
          Trained With
        </div>

        {/* Big number */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            color: colors.tiffanyBlue,
            textAlign: "center",
            opacity: numOpacity,
            transform: `scale(${numScale})`,
            lineHeight: 1.1,
            letterSpacing: 2,
          }}
        >
          500K
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 400,
            color: colors.chineseSilver,
            opacity: numOpacity,
          }}
        >
          keywords
        </div>

        <KeywordFunnel />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
