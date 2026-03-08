import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene1TaskMatching: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 200 },
  });

  // Puzzle pieces sliding together
  const leftPiece = spring({
    frame,
    fps,
    delay: 20,
    config: { damping: 14, stiffness: 60 },
  });
  const rightPiece = spring({
    frame,
    fps,
    delay: 30,
    config: { damping: 14, stiffness: 60 },
  });

  const leftX = interpolate(leftPiece, [0, 1], [-80, 0]);
  const rightX = interpolate(rightPiece, [0, 1], [80, 0]);

  const subProgress = spring({
    frame,
    fps,
    delay: 60,
    config: { damping: 200 },
  });

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
          gap: 36,
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: interpolate(titleProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(titleProgress, [0, 1], [30, 0])}px)`,
            lineHeight: 1.2,
          }}
        >
          Right Task
          <br />
          <span style={{ color: colors.darkCyra }}>Right Tool</span>
        </div>

        {/* Puzzle pieces */}
        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          {/* Left piece - AI */}
          <svg
            width="160"
            height="140"
            viewBox="0 0 160 140"
            fill="none"
            style={{ transform: `translateX(${leftX}px)` }}
          >
            <path
              d="M10 20 L100 20 L100 50 Q120 50 120 70 Q120 90 100 90 L100 120 L10 120 Z"
              fill={`${colors.tiffanyBlue}15`}
              stroke={colors.tiffanyBlue}
              strokeWidth={2.5}
              strokeLinejoin="round"
            />
            {/* AI icon */}
            <rect x="30" y="50" width="40" height="40" rx="8" stroke={colors.tiffanyBlue} strokeWidth={2} fill={`${colors.tiffanyBlue}10`} />
            <circle cx="42" cy="65" r="3" fill={colors.tiffanyBlue} />
            <circle cx="58" cy="65" r="3" fill={colors.tiffanyBlue} />
            <path d="M42 78 Q50 84 58 78" stroke={colors.tiffanyBlue} strokeWidth={1.5} fill="none" strokeLinecap="round" />
            <text x="50" y="108" textAnchor="middle" fill={colors.tiffanyBlue} fontSize="14" fontWeight="700" fontFamily={fontFamily}>AI</text>
          </svg>

          {/* Right piece - Human */}
          <svg
            width="160"
            height="140"
            viewBox="0 0 160 140"
            fill="none"
            style={{ transform: `translateX(${rightX}px)`, marginLeft: -20 }}
          >
            <path
              d="M60 20 L150 20 L150 120 L60 120 L60 90 Q40 90 40 70 Q40 50 60 50 Z"
              fill={`${colors.turkishRose}15`}
              stroke={colors.turkishRose}
              strokeWidth={2.5}
              strokeLinejoin="round"
            />
            {/* Human icon */}
            <circle cx="105" cy="58" r="12" stroke={colors.turkishRose} strokeWidth={2} fill={`${colors.turkishRose}10`} />
            <path d="M85 95 Q85 78 105 78 Q125 78 125 95" stroke={colors.turkishRose} strokeWidth={2} fill="none" strokeLinecap="round" />
            <text x="105" y="108" textAnchor="middle" fill={colors.turkishRose} fontSize="14" fontWeight="700" fontFamily={fontFamily}>You</text>
          </svg>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: colors.chineseSilver,
            textAlign: "center",
            opacity: interpolate(subProgress, [0, 1], [0, 1]),
            lineHeight: 1.5,
          }}
        >
          AI has its strengths, so do you
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
