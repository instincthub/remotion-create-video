import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Classified file lines appearing one by one
const ClassifiedFile: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fileProgress = spring({
    frame,
    fps,
    delay: 2 * fps,
    config: { damping: 12, stiffness: 100 },
  });
  const fileOpacity = interpolate(fileProgress, [0, 1], [0, 1]);
  const fileScale = interpolate(fileProgress, [0, 1], [0.95, 1]);

  // The sentence reveals word by word
  const words = [
    "John", "Edgar", "cannot", "be", "the", "brother", "of",
    "Steve", "Edgar", "because", "he", "was", "born", "two",
    "years", "before", "their", "parents", "first", "met.",
  ];

  const wordStart = 4 * fps;
  const wordInterval = 6; // frames between each word

  // Warning indicator
  const warningProgress = spring({
    frame,
    fps,
    delay: wordStart + words.length * wordInterval + fps,
    config: { damping: 10, stiffness: 80 },
  });
  const warningOpacity = interpolate(warningProgress, [0, 1], [0, 1]);
  const warningScale = interpolate(warningProgress, [0, 1], [0.8, 1]);

  // Bottom text
  const bottomProgress = spring({
    frame,
    fps,
    delay: 16 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const bottomOpacity = interpolate(bottomProgress, [0, 1], [0, 1]);
  const bottomY = interpolate(bottomProgress, [0, 1], [20, 0]);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
        paddingBottom: 200,
      }}
    >
      {/* File container */}
      <div
        style={{
          opacity: fileOpacity,
          transform: `scale(${fileScale})`,
          background: `${colors.white}08`,
          borderRadius: 12,
          border: `1px solid ${colors.chineseSilver}30`,
          padding: "36px 48px",
          maxWidth: 900,
          position: "relative",
        }}
      >
        {/* File header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 24,
            paddingBottom: 16,
            borderBottom: `1px solid ${colors.chineseSilver}20`,
          }}
        >
          {/* File icon */}
          <svg width="24" height="28" viewBox="0 0 24 28">
            <path
              d="M 0 3 C 0 1, 1 0, 3 0 L 15 0 L 24 9 L 24 25 C 24 27, 23 28, 21 28 L 3 28 C 1 28, 0 27, 0 25 Z"
              fill="none"
              stroke={colors.chineseSilver}
              strokeWidth={1.5}
            />
            <path
              d="M 15 0 L 15 9 L 24 9"
              fill="none"
              stroke={colors.chineseSilver}
              strokeWidth={1.5}
            />
          </svg>
          <div style={{ fontSize: 16, color: colors.chineseSilver, letterSpacing: 1 }}>
            POLICE DATABASE — RECORD #4471
          </div>
          <div
            style={{
              marginLeft: "auto",
              fontSize: 12,
              color: colors.corn,
              fontWeight: "bold",
              letterSpacing: 2,
              border: `1px solid ${colors.corn}`,
              padding: "3px 10px",
              borderRadius: 4,
            }}
          >
            CONFIDENTIAL
          </div>
        </div>

        {/* Sentence - word by word */}
        <div
          style={{
            fontSize: 28,
            lineHeight: 1.7,
            color: colors.white,
            fontFamily,
            wordWrap: "break-word",
            overflowWrap: "break-word",
            whiteSpace: "normal",
          }}
        >
          {words.map((word, i) => {
            const wordOpacity = interpolate(
              frame,
              [wordStart + i * wordInterval, wordStart + i * wordInterval + 8],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            return (
              <span
                key={`word-${i}`}
                style={{
                  opacity: wordOpacity,
                  marginRight: 8,
                  display: "inline",
                }}
              >
                {word}
              </span>
            );
          })}
        </div>
      </div>

      {/* Warning indicator */}
      <div
        style={{
          opacity: warningOpacity,
          transform: `scale(${warningScale})`,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28">
          <path
            d="M 14 2 L 26 24 L 2 24 Z"
            fill="none"
            stroke={colors.corn}
            strokeWidth={2}
          />
          <text
            x={14}
            y={20}
            textAnchor="middle"
            fontSize={14}
            fontWeight="bold"
            fill={colors.corn}
            fontFamily="Inter, sans-serif"
          >
            !
          </text>
        </svg>
        <div style={{ fontSize: 22, color: colors.corn, fontWeight: "bold" }}>
          No redundancy. No patterns. Algorithm fails.
        </div>
      </div>

      {/* Bottom text */}
      <div
        style={{
          opacity: bottomOpacity,
          transform: `translateY(${bottomY}px)`,
          fontSize: 30,
          color: colors.chineseSilver,
          textAlign: "center",
        }}
      >
        This is the difference between{" "}
        <span style={{ color: colors.tiffanyBlue }}>web AI</span> and{" "}
        <span style={{ color: colors.corn }}>enterprise AI</span>.
      </div>
    </AbsoluteFill>
  );
};

export const Scene5ComplexEnv: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Heading
  const headProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 12, stiffness: 100 },
  });
  const headOpacity = interpolate(headProgress, [0, 1], [0, 1]);
  const headY = interpolate(headProgress, [0, 1], [20, 0]);

  // Scan line effect
  const scanY = interpolate(
    frame % (4 * fps),
    [0, 4 * fps],
    [0, 1080]
  );

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.metallicBlue} 0%, ${colors.policeBlue} 100%)`,
        fontFamily,
      }}
    >
      {/* Scan line */}
      <div
        style={{
          position: "absolute",
          top: scanY,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${colors.tiffanyBlue}20, transparent)`,
          zIndex: 1,
        }}
      />

      {/* Heading */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 3,
        }}
      >
        <div
          style={{
            opacity: headOpacity,
            transform: `translateY(${headY}px)`,
            fontSize: 52,
            fontWeight: "bold",
            color: colors.white,
            textAlign: "center",
          }}
        >
          But it{" "}
          <span style={{ color: colors.corn }}>breaks</span> in complex
          environments
        </div>
      </div>

      <ClassifiedFile />
    </AbsoluteFill>
  );
};
