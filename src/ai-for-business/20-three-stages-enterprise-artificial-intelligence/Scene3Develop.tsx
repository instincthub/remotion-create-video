import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Messy data visualization (left side)
const MessyData: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();

  const dataRows = [
    { y: 0, texts: ["John", "??", "2024", "NULL"], messy: true },
    { y: 40, texts: ["", "Smith", "email@", "42"], messy: true },
    { y: 80, texts: ["Jane", "Doe", "Jane", "Doe"], messy: true },
    { y: 120, texts: ["ERR", "Bob", "2023", "NYC"], messy: true },
    { y: 160, texts: ["NULL", "??", "0000", "N/A"], messy: true },
  ];

  return (
    <div
      style={{
        position: "absolute",
        top: 370,
        left: 240,
        opacity,
      }}
    >
      <div
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: colors.oldRose,
          marginBottom: 16,
          fontFamily,
        }}
      >
        Raw Data
      </div>
      {dataRows.map((row, ri) => {
        const wobble = Math.sin(frame * 0.04 + ri * 0.8) * 2;
        return (
          <div
            key={`row-${ri}`}
            style={{
              display: "flex",
              gap: 10,
              marginBottom: 10,
              transform: `translateX(${wobble}px)`,
            }}
          >
            {row.texts.map((text, ci) => (
              <div
                key={`cell-${ri}-${ci}`}
                style={{
                  width: 100,
                  height: 38,
                  background: `${colors.oldRose}10`,
                  border: `1px solid ${colors.oldRose}40`,
                  borderRadius: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  fontWeight: 400,
                  color: colors.oldRose,
                  fontFamily,
                }}
              >
                {text}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

// Clean data visualization (right side)
const CleanData: React.FC<{ opacity: number }> = ({ opacity }) => {
  const dataRows = [
    { texts: ["John", "Smith", "2024", "NYC"] },
    { texts: ["Jane", "Doe", "2023", "LA"] },
    { texts: ["Bob", "Lee", "2024", "CHI"] },
    { texts: ["Amy", "Chen", "2023", "SF"] },
  ];

  return (
    <div
      style={{
        position: "absolute",
        top: 370,
        right: 240,
        opacity,
      }}
    >
      <div
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: colors.caribbeanGreen,
          marginBottom: 16,
          fontFamily,
        }}
      >
        Cleaned Data
      </div>
      {dataRows.map((row, ri) => (
        <div
          key={`row-${ri}`}
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 10,
          }}
        >
          {row.texts.map((text, ci) => (
            <div
              key={`cell-${ri}-${ci}`}
              style={{
                width: 100,
                height: 38,
                background: `${colors.caribbeanGreen}10`,
                border: `1px solid ${colors.caribbeanGreen}40`,
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                fontWeight: 400,
                color: colors.caribbeanGreen,
                fontFamily,
              }}
            >
              {text}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

// Transformation arrows between messy and clean
const TransformArrows: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  const flowOffset = (frame * 2) % 40;

  return (
    <div
      style={{
        position: "absolute",
        top: 430,
        left: "50%",
        transform: "translateX(-50%)",
        opacity,
      }}
    >
      <svg width="200" height="120" viewBox="0 0 200 120">
        {/* Filter icon */}
        <polygon
          points="80,20 120,20 108,55 92,55"
          fill={`${colors.darkCyra}15`}
          stroke={colors.darkCyra}
          strokeWidth={2}
        />
        <rect
          x={92}
          y={55}
          width={16}
          height={20}
          fill={`${colors.darkCyra}10`}
          stroke={colors.darkCyra}
          strokeWidth={2}
        />
        {/* Flow lines */}
        <line
          x1={20}
          y1={40}
          x2={75}
          y2={40}
          stroke={colors.oldRose}
          strokeWidth={2}
          strokeDasharray="4 4"
          strokeDashoffset={-flowOffset}
        />
        <line
          x1={125}
          y1={40}
          x2={180}
          y2={40}
          stroke={colors.caribbeanGreen}
          strokeWidth={2}
          strokeDasharray="4 4"
          strokeDashoffset={-flowOffset}
        />
        {/* Label */}
        <text
          x={100}
          y={100}
          textAnchor="middle"
          fill={colors.darkCyra}
          fontSize={14}
          fontWeight={700}
          fontFamily={fontFamily}
        >
          Filter & Clean
        </text>
      </svg>
    </div>
  );
};

export const Scene3Develop: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Stage badge
  const badgeProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 0.3),
    config: { damping: 12, stiffness: 100 },
  });
  const badgeOpacity = interpolate(badgeProgress, [0, 1], [0, 1]);
  const badgeScale = interpolate(badgeProgress, [0, 1], [0.8, 1]);

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 1),
    config: { damping: 12, stiffness: 80 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  // Subtitle keywords
  const subtitleProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 3),
    config: { damping: 12, stiffness: 80 },
  });
  const subtitleOpacity = interpolate(subtitleProgress, [0, 1], [0, 1]);

  // Data visualization
  const dataProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 5),
    config: { damping: 14, stiffness: 80 },
  });
  const dataOpacity = interpolate(dataProgress, [0, 1], [0, 1]);

  // Arrows
  const arrowProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 8),
    config: { damping: 14, stiffness: 80 },
  });
  const arrowOpacity = interpolate(arrowProgress, [0, 1], [0, 1]);

  // Clean data
  const cleanProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 10),
    config: { damping: 14, stiffness: 80 },
  });
  const cleanOpacity = interpolate(cleanProgress, [0, 1], [0, 1]);

  // Checklist items
  const keywords = ["Collect", "Clean", "Filter", "Test"];
  const keywordProgresses = keywords.map((_, i) =>
    spring({
      frame,
      fps,
      delay: Math.round(fps * (3 + i * 1.2)),
      config: { damping: 12, stiffness: 90 },
    }),
  );

  return (
    <AbsoluteFill
      style={{
        background: colors.white,
        fontFamily,
      }}
    >
      {/* Stage badge */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: "50%",
          transform: `translateX(-50%) scale(${badgeScale})`,
          opacity: badgeOpacity,
          background: colors.darkCyra,
          color: colors.white,
          padding: "10px 32px",
          borderRadius: 30,
          fontSize: 22,
          fontWeight: 700,
        }}
      >
        STAGE 1
      </div>

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 130,
          width: "100%",
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <span
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: colors.darkSlateGray,
          }}
        >
          Develop
        </span>
      </div>

      {/* Keywords row */}
      <div
        style={{
          position: "absolute",
          top: 250,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 24,
          opacity: subtitleOpacity,
        }}
      >
        {keywords.map((word, i) => {
          const prog = keywordProgresses[i];
          const kOpacity = interpolate(prog, [0, 1], [0, 1]);
          const kY = interpolate(prog, [0, 1], [20, 0]);
          return (
            <div
              key={word}
              style={{
                opacity: kOpacity,
                transform: `translateY(${kY}px)`,
                fontSize: 28,
                fontWeight: 700,
                color: colors.darkCyra,
                background: `${colors.darkCyra}10`,
                padding: "8px 24px",
                borderRadius: 8,
                border: `2px solid ${colors.darkCyra}30`,
              }}
            >
              {word}
            </div>
          );
        })}
      </div>

      {/* Data visualizations */}
      <MessyData opacity={dataOpacity} />
      <TransformArrows opacity={arrowOpacity} />
      <CleanData opacity={cleanOpacity} />
    </AbsoluteFill>
  );
};
