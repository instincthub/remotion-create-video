import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Accuracy meter component
const AccuracyMeter: React.FC<{
  fillProgress: number;
  centerX: number;
  centerY: number;
}> = ({ fillProgress, centerX, centerY }) => {
  const radius = 120;
  const startAngle = -210;
  const endAngle = 30;
  const totalArc = endAngle - startAngle;
  const currentAngle = startAngle + totalArc * fillProgress;

  // Arc path
  const describeArc = (
    cx: number,
    cy: number,
    r: number,
    startDeg: number,
    endDeg: number,
  ) => {
    const startRad = (startDeg * Math.PI) / 180;
    const endRad = (endDeg * Math.PI) / 180;
    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);
    const largeArc = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
  };

  const percentage = Math.round(fillProgress * 100);

  // Color transitions based on accuracy
  const meterColor =
    fillProgress < 0.5
      ? colors.oldRose
      : fillProgress < 0.8
        ? colors.corn
        : colors.caribbeanGreen;

  return (
    <svg width="300" height="280" viewBox={`${centerX - 150} ${centerY - 150} 300 280`}>
      {/* Background arc */}
      <path
        d={describeArc(centerX, centerY, radius, startAngle, endAngle)}
        fill="none"
        stroke={`${colors.chineseSilver}20`}
        strokeWidth={16}
        strokeLinecap="round"
      />
      {/* Filled arc */}
      {fillProgress > 0 && (
        <path
          d={describeArc(centerX, centerY, radius, startAngle, currentAngle)}
          fill="none"
          stroke={meterColor}
          strokeWidth={16}
          strokeLinecap="round"
        />
      )}
      {/* Percentage text */}
      <text
        x={centerX}
        y={centerY - 10}
        textAnchor="middle"
        fontSize={64}
        fontWeight="bold"
        fill={colors.white}
        fontFamily="Inter, sans-serif"
      >
        {percentage}%
      </text>
      <text
        x={centerX}
        y={centerY + 30}
        textAnchor="middle"
        fontSize={18}
        fill={colors.chineseSilver}
        fontFamily="Inter, sans-serif"
      >
        ACCURACY
      </text>
    </svg>
  );
};

// Warning flash icon
const WarningFlash: React.FC<{
  progress: number;
  frame: number;
}> = ({ progress, frame }) => {
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const flash = Math.sin(frame * 0.15) > 0 ? 1 : 0.4;

  return (
    <div style={{ opacity: opacity * flash }}>
      <svg width="48" height="48" viewBox="0 0 48 48">
        <polygon
          points="24,4 44,40 4,40"
          fill="none"
          stroke={colors.oldRose}
          strokeWidth={2.5}
          strokeLinejoin="round"
        />
        <line
          x1={24}
          y1={18}
          x2={24}
          y2={28}
          stroke={colors.oldRose}
          strokeWidth={2.5}
          strokeLinecap="round"
        />
        <circle cx={24} cy={34} r={2} fill={colors.oldRose} />
      </svg>
    </div>
  );
};

export const Scene6Accuracy: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 12, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [-30, 0]);

  // Meter fills up to 90%
  const meterFill = interpolate(
    frame,
    [2 * fps, 8 * fps],
    [0, 0.9],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Question text
  const questionProgress = spring({
    frame,
    fps,
    delay: 9 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const questionOpacity = interpolate(questionProgress, [0, 1], [0, 1]);

  // Consequence cards
  const consequences = [
    {
      title: "Product Recommendations",
      verdict: "Tolerable",
      color: colors.caribbeanGreen,
      icon: "OK",
      delay: 11,
    },
    {
      title: "Medical Diagnosis",
      verdict: "Not Acceptable",
      color: colors.oldRose,
      icon: "!",
      delay: 13,
    },
    {
      title: "Fraud Detection",
      verdict: "Not Acceptable",
      color: colors.oldRose,
      icon: "!",
      delay: 15,
    },
    {
      title: "Compliance Decisions",
      verdict: "Not Acceptable",
      color: colors.oldRose,
      icon: "!",
      delay: 17,
    },
  ];

  // Warning icons
  const warningProgress = spring({
    frame,
    fps,
    delay: 19 * fps,
    config: { damping: 10, stiffness: 80 },
  });

  // Bottom text
  const bottomProgress = spring({
    frame,
    fps,
    delay: 20 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const bottomOpacity = interpolate(bottomProgress, [0, 1], [0, 1]);
  const bottomY = interpolate(bottomProgress, [0, 1], [20, 0]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.darkSlateGray} 0%, ${colors.darkNavy} 100%)`,
        fontFamily,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 3,
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontSize: 54,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
          }}
        >
          Accuracy vs{" "}
          <span style={{ color: colors.oldRose }}>Consequence</span>
        </div>
      </div>

      {/* Accuracy meter */}
      <div
        style={{
          position: "absolute",
          left: 120,
          top: 200,
          zIndex: 2,
        }}
      >
        <AccuracyMeter
          fillProgress={meterFill}
          centerX={200}
          centerY={160}
        />

        {/* Question below meter */}
        <div
          style={{
            opacity: questionOpacity,
            textAlign: "center",
            marginTop: 30,
            fontSize: 26,
            color: colors.corn,
            fontWeight: 700,
            width: 400,
          }}
        >
          Is 90% accuracy enough?
        </div>
      </div>

      {/* Warning icons */}
      <div
        style={{
          position: "absolute",
          left: 240,
          top: 600,
          display: "flex",
          gap: 20,
          zIndex: 3,
        }}
      >
        {[0, 1, 2].map((i) => (
          <WarningFlash key={`warn-${i}`} progress={warningProgress} frame={frame} />
        ))}
      </div>

      {/* Consequence cards */}
      <div
        style={{
          position: "absolute",
          right: 120,
          top: 180,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          width: 500,
          zIndex: 3,
        }}
      >
        {consequences.map((c, i) => {
          const cardProgress = spring({
            frame,
            fps,
            delay: c.delay * fps,
            config: { damping: 12, stiffness: 90 },
          });
          const cardOpacity = interpolate(cardProgress, [0, 1], [0, 1]);
          const cardSlideX = interpolate(cardProgress, [0, 1], [30, 0]);

          return (
            <div
              key={`cons-${i}`}
              style={{
                opacity: cardOpacity,
                transform: `translateX(${cardSlideX}px)`,
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "18px 24px",
                background: `${c.color}10`,
                border: `1px solid ${c.color}40`,
                borderRadius: 12,
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  background: `${c.color}20`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  fontWeight: 700,
                  color: c.color,
                  flexShrink: 0,
                }}
              >
                {c.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: colors.white,
                    marginBottom: 4,
                  }}
                >
                  {c.title}
                </div>
                <div style={{ fontSize: 15, color: c.color, fontWeight: 700 }}>
                  {c.verdict}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom text */}
      <div
        style={{
          position: "absolute",
          bottom: 230,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 3,
        }}
      >
        <div
          style={{
            opacity: bottomOpacity,
            transform: `translateY(${bottomY}px)`,
            fontSize: 28,
            color: colors.chineseSilver,
            textAlign: "center",
          }}
        >
          You must{" "}
          <span style={{ color: colors.oldRose, fontWeight: 700 }}>
            design for failure
          </span>
          . Because failure is guaranteed.
        </div>
      </div>
    </AbsoluteFill>
  );
};
