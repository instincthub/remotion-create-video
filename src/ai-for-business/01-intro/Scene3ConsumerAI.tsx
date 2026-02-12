import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const ATTRIBUTES = [
  { label: "Big Data", delay: 60 },
  { label: "Simple Questions", delay: 120 },
  { label: "Millions of Users", delay: 180 },
];

const Attribute: React.FC<{ label: string }> = ({ label }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideProgress = spring({ frame, fps, config: { damping: 200 } });
  const translateX = interpolate(slideProgress, [0, 1], [-400, 0]);
  const opacity = interpolate(slideProgress, [0, 1], [0, 1]);

  const checkProgress = spring({
    frame,
    fps,
    delay: 15,
    config: { damping: 12, stiffness: 150 },
  });
  const checkScale = interpolate(checkProgress, [0, 1], [0, 1]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 24,
        transform: `translateX(${translateX}px)`,
        opacity,
      }}
    >
      <div
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: colors.caribbeanGreen,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${checkScale})`,
          flexShrink: 0,
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 13l4 4L19 7"
            stroke={colors.white}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div
        style={{
          fontSize: 44,
          fontWeight: "bold",
          color: colors.viridianGreen,
          fontFamily,
        }}
      >
        {label}
      </div>
    </div>
  );
};

// Search bar with trivia question
const SearchBarIllustration: React.FC<{ progress: number }> = ({
  progress,
}) => {
  const charsToShow = Math.floor(
    progress * "Who was PM during the Suez Crisis?".length,
  );
  const query = "Who was PM during the Suez Crisis?".slice(0, charsToShow);

  return (
    <div
      style={{
        width: 440,
        backgroundColor: colors.white,
        borderRadius: 28,
        padding: "14px 24px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        border: `2px solid ${colors.chineseSilver}`,
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle
          cx="11"
          cy="11"
          r="7"
          stroke={colors.rhythm}
          strokeWidth={2}
        />
        <line
          x1="16"
          y1="16"
          x2="21"
          y2="21"
          stroke={colors.rhythm}
          strokeWidth={2}
          strokeLinecap="round"
        />
      </svg>
      <span
        style={{
          fontSize: 18,
          color: colors.gunmetal,
          fontFamily,
        }}
      >
        {query}
        <span
          style={{
            display: "inline-block",
            width: 2,
            height: 20,
            backgroundColor: colors.darkCyra,
            marginLeft: 1,
            verticalAlign: "middle",
          }}
        />
      </span>
    </div>
  );
};

// Answer card that appears after search
const AnswerCard: React.FC<{ opacity: number }> = ({ opacity }) => (
  <div
    style={{
      width: 440,
      backgroundColor: colors.white,
      borderRadius: 16,
      padding: "16px 24px",
      border: `2px solid ${colors.caribbeanGreen}`,
      opacity,
      marginTop: 8,
    }}
  >
    <div style={{ fontSize: 13, color: colors.rhythm, fontFamily }}>
      Answer
    </div>
    <div
      style={{
        fontSize: 22,
        fontWeight: "bold",
        color: colors.darkSlateGray,
        fontFamily,
        marginTop: 4,
      }}
    >
      Anthony Eden
    </div>
    <div
      style={{
        fontSize: 13,
        color: colors.caribbeanGreen,
        fontFamily,
        marginTop: 2,
      }}
    >
      Found across 2.4M+ web pages
    </div>
  </div>
);

// Stacked documents illustration
const StackedDocs: React.FC<{ opacity: number }> = ({ opacity }) => (
  <svg
    width="120"
    height="100"
    viewBox="0 0 120 100"
    fill="none"
    style={{ opacity }}
  >
    {/* Stack of pages */}
    <rect
      x="10"
      y="20"
      width="70"
      height="80"
      rx="4"
      fill="none"
      stroke={colors.darkCyra}
      strokeWidth={2}
    />
    <rect
      x="18"
      y="12"
      width="70"
      height="80"
      rx="4"
      fill="none"
      stroke={colors.darkCyra}
      strokeWidth={2}
      opacity={0.7}
    />
    <rect
      x="26"
      y="4"
      width="70"
      height="80"
      rx="4"
      fill="none"
      stroke={colors.darkCyra}
      strokeWidth={2}
      opacity={0.4}
    />
    {/* Text lines on front doc */}
    <line
      x1="20"
      y1="36"
      x2="60"
      y2="36"
      stroke={colors.darkCyra}
      strokeWidth={1.5}
      opacity={0.5}
    />
    <line
      x1="20"
      y1="46"
      x2="55"
      y2="46"
      stroke={colors.darkCyra}
      strokeWidth={1.5}
      opacity={0.4}
    />
    <line
      x1="20"
      y1="56"
      x2="50"
      y2="56"
      stroke={colors.darkCyra}
      strokeWidth={1.5}
      opacity={0.3}
    />
    {/* Count badge */}
    <circle cx="90" cy="16" r="16" fill={colors.darkCyra} />
    <text
      x="90"
      y="21"
      textAnchor="middle"
      fill={colors.white}
      fontSize="13"
      fontWeight="bold"
    >
      1M+
    </text>
  </svg>
);

// Upward trend line
const TrendLine: React.FC<{ progress: number }> = ({ progress }) => {
  const pathLength = 200;
  const visibleLength = pathLength * progress;

  return (
    <svg width="140" height="90" viewBox="0 0 140 90" fill="none">
      {/* Grid lines */}
      {[20, 40, 60, 80].map((y) => (
        <line
          key={y}
          x1="10"
          y1={y}
          x2="130"
          y2={y}
          stroke={colors.darkCyra}
          strokeWidth={0.5}
          opacity={0.2}
        />
      ))}
      {/* Trend line going up */}
      <path
        d="M10 80 L40 60 L70 50 L100 30 L130 10"
        stroke={colors.caribbeanGreen}
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={pathLength}
        strokeDashoffset={pathLength - visibleLength}
      />
      {/* Data points */}
      {[
        { x: 10, y: 80 },
        { x: 40, y: 60 },
        { x: 70, y: 50 },
        { x: 100, y: 30 },
        { x: 130, y: 10 },
      ].map((pt, i) => (
        <circle
          key={i}
          cx={pt.x}
          cy={pt.y}
          r={4}
          fill={colors.caribbeanGreen}
          opacity={progress > i * 0.2 ? 1 : 0}
        />
      ))}
      {/* Arrow at end */}
      {progress > 0.9 && (
        <polygon points="126,14 134,10 128,6" fill={colors.caribbeanGreen} />
      )}
    </svg>
  );
};

export const Scene3ConsumerAI: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header animation
  const headerProgress = spring({ frame, fps, config: { damping: 200 } });
  const headerY = interpolate(headerProgress, [0, 1], [-60, 0]);
  const headerOpacity = interpolate(headerProgress, [0, 1], [0, 1]);

  // Search bar typing starts at 4s
  const searchTypingStart = 4 * fps;
  const typingProgress = interpolate(
    frame,
    [searchTypingStart, searchTypingStart + 3 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Answer appears after typing
  const answerDelay = searchTypingStart + 3.5 * fps;
  const answerProgress = spring({
    frame,
    fps,
    delay: answerDelay,
    config: { damping: 200 },
  });
  const answerOpacity = interpolate(answerProgress, [0, 1], [0, 1]);

  // Right-side illustrations
  const illustrationProgress = spring({
    frame,
    fps,
    delay: 20,
    config: { damping: 200 },
  });
  const illustrationOpacity = interpolate(
    illustrationProgress,
    [0, 1],
    [0, 1],
  );

  // Trend line draws over time
  const trendProgress = interpolate(
    frame,
    [2 * fps, 6 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ backgroundColor: colors.magnolia, fontFamily }}>
      {/* Main two-column layout */}
      <div
        style={{
          display: "flex",
          height: "100%",
          padding: "80px 120px",
          gap: 60,
        }}
      >
        {/* Left column: Header + Attributes */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 40,
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: "bold",
              color: colors.darkSlateGray,
              transform: `translateY(${headerY}px)`,
              opacity: headerOpacity,
            }}
          >
            Consumer AI
          </div>

          <div
            style={{
              width: 100,
              height: 4,
              backgroundColor: colors.darkCyra,
              opacity: headerOpacity,
              borderRadius: 2,
            }}
          />

          <div
            style={{
              fontSize: 26,
              color: colors.rhythm,
              opacity: headerOpacity,
              marginTop: -20,
            }}
          >
            The Trivia Champion
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
            {ATTRIBUTES.map((attr) => (
              <Sequence
                key={attr.label}
                from={attr.delay}
                layout="none"
              >
                <Attribute label={attr.label} />
              </Sequence>
            ))}
          </div>
        </div>

        {/* Right column: Illustrations */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
          }}
        >
          {/* Search bar with typing */}
          <SearchBarIllustration progress={typingProgress} />
          <AnswerCard opacity={answerOpacity} />

          {/* Stacked docs + Trend line */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 30,
              marginTop: 20,
            }}
          >
            <StackedDocs opacity={illustrationOpacity} />
            <TrendLine progress={trendProgress} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
