import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene3RiskMatrix: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 0.5),
    config: { damping: 12, stiffness: 80 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  // Matrix axes
  const axesProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 2),
    config: { damping: 14, stiffness: 80 },
  });
  const axesOpacity = interpolate(axesProgress, [0, 1], [0, 1]);

  // Matrix quadrants (staggered)
  const quadrants = [
    {
      label: "Safe Start",
      sublabel: "High Confidence\nLow Consequence",
      row: 1,
      col: 0,
      color: colors.caribbeanGreen,
      labelColor: colors.caribbeanGreen,
      delay: 4,
    },
    {
      label: "Monitor Closely",
      sublabel: "High Confidence\nHigh Consequence",
      row: 0,
      col: 0,
      color: colors.corn,
      labelColor: colors.policeBlue,
      delay: 6,
    },
    {
      label: "Low Priority",
      sublabel: "Low Confidence\nLow Consequence",
      row: 1,
      col: 1,
      color: colors.darkCyra,
      labelColor: colors.darkCyra,
      delay: 8,
    },
    {
      label: "Danger Zone",
      sublabel: "Low Confidence\nHigh Consequence",
      row: 0,
      col: 1,
      color: colors.oldRose,
      labelColor: colors.oldRose,
      delay: 10,
    },
  ];

  const cellW = 340;
  const cellH = 210;
  const matrixWidth = cellW * 2;
  const matrixHeight = cellH * 2;
  // Center horizontally (offset slightly right to account for Y-axis labels)
  const matrixLeft = (1920 - matrixWidth) / 2 + 40;
  const matrixTop = 260;

  return (
    <AbsoluteFill
      style={{
        background: colors.white,
        fontFamily,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 60,
          width: "100%",
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <span
          style={{
            fontSize: 58,
            fontWeight: 700,
            color: colors.darkSlateGray,
          }}
        >
          Risk Changes{" "}
          <span style={{ color: colors.oldRose }}>Everything</span>
        </span>
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: "absolute",
          top: 148,
          width: "100%",
          textAlign: "center",
          opacity: titleOpacity,
        }}
      >
        <span
          style={{
            fontSize: 30,
            fontWeight: 400,
            color: colors.gunmetal,
          }}
        >
          Select based on confidence and consequence
        </span>
      </div>

      {/* Matrix container */}
      <div
        style={{
          position: "absolute",
          top: matrixTop,
          left: matrixLeft,
          opacity: axesOpacity,
        }}
      >
        {/* Y-axis label (Consequence) */}
        <div
          style={{
            position: "absolute",
            top: cellH - 30,
            left: -130,
            transform: "rotate(-90deg)",
            fontSize: 26,
            fontWeight: 700,
            color: colors.darkSlateGray,
            whiteSpace: "nowrap",
          }}
        >
          Consequence
        </div>
        {/* Y-axis indicators */}
        <div
          style={{
            position: "absolute",
            top: cellH * 0.5 - 14,
            left: -55,
            fontSize: 22,
            fontWeight: 700,
            color: colors.gunmetal,
          }}
        >
          High
        </div>
        <div
          style={{
            position: "absolute",
            top: cellH * 1.5 - 14,
            left: -55,
            fontSize: 22,
            fontWeight: 700,
            color: colors.gunmetal,
          }}
        >
          Low
        </div>

        {/* X-axis label (Confidence) */}
        <div
          style={{
            position: "absolute",
            top: matrixHeight + 50,
            left: 0,
            width: matrixWidth,
            textAlign: "center",
            fontSize: 26,
            fontWeight: 700,
            color: colors.darkSlateGray,
          }}
        >
          Confidence
        </div>
        {/* X-axis indicators */}
        <div
          style={{
            position: "absolute",
            top: matrixHeight + 14,
            left: 0,
            width: cellW,
            textAlign: "center",
            fontSize: 22,
            fontWeight: 700,
            color: colors.gunmetal,
          }}
        >
          High
        </div>
        <div
          style={{
            position: "absolute",
            top: matrixHeight + 14,
            left: cellW,
            width: cellW,
            textAlign: "center",
            fontSize: 22,
            fontWeight: 700,
            color: colors.gunmetal,
          }}
        >
          Low
        </div>

        {/* Axis lines */}
        <svg
          width={matrixWidth + 4}
          height={matrixHeight + 4}
          style={{ position: "absolute", top: -2, left: -2 }}
        >
          {/* Vertical axis */}
          <line
            x1={2}
            y1={0}
            x2={2}
            y2={matrixHeight}
            stroke={colors.darkSlateGray}
            strokeWidth={3}
          />
          {/* Horizontal axis */}
          <line
            x1={0}
            y1={matrixHeight}
            x2={matrixWidth}
            y2={matrixHeight}
            stroke={colors.darkSlateGray}
            strokeWidth={3}
          />
        </svg>

        {/* Quadrants */}
        {quadrants.map((q, i) => {
          const qProgress = spring({
            frame,
            fps,
            delay: Math.round(fps * q.delay),
            config: { damping: 12, stiffness: 80 },
          });
          const qOpacity = interpolate(qProgress, [0, 1], [0, 1]);
          const qScale = interpolate(qProgress, [0, 1], [0.8, 1]);
          const pulse =
            q.color === colors.oldRose
              ? Math.sin(frame * 0.06 + i) * 0.08 + 0.92
              : 1;

          return (
            <div
              key={q.label}
              style={{
                position: "absolute",
                top: q.row * cellH + 8,
                left: q.col * cellW + 8,
                width: cellW - 16,
                height: cellH - 16,
                background: `${q.color}20`,
                border: `3px solid ${q.color}60`,
                borderRadius: 14,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                opacity: qOpacity * pulse,
                transform: `scale(${qScale})`,
              }}
            >
              <div
                style={{
                  fontSize: 34,
                  fontWeight: 700,
                  color: q.labelColor,
                  marginBottom: 10,
                }}
              >
                {q.label}
              </div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 400,
                  color: colors.gunmetal,
                  textAlign: "center",
                  lineHeight: 1.4,
                  whiteSpace: "pre-line",
                }}
              >
                {q.sublabel}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
