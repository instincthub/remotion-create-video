import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Bright error color that pops on dark teal backgrounds
const errorPink = "#FF8A8A";

// Messy spreadsheet transforming into model predictions
const DataTransformation: React.FC<{ progress: number }> = ({ progress }) => {
  const frame = useCurrentFrame();

  // Spreadsheet rows
  const rows = [
    { cells: ["Name", "Age", "City", "Score"], status: "header" },
    { cells: ["A. Khan", "34", "Lagos", "0.82"], status: "clean" },
    { cells: ["B. Ola", "ERR", "Abuja", "NaN"], status: "dirty" },
    { cells: ["C. Ada", "28", "PH", "0.91"], status: "clean" },
    { cells: ["D. Eze", "N/A", "???", "0.00"], status: "dirty" },
  ];

  // Arrow opacity
  const arrowOpacity = interpolate(progress, [0.4, 0.6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Prediction cards
  const predOpacity = interpolate(progress, [0.6, 0.85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 60,
        width: "100%",
      }}
    >
      {/* Spreadsheet */}
      <div
        style={{
          opacity: interpolate(progress, [0, 0.3], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          backgroundColor: `${colors.gunmetal}90`,
          borderRadius: 12,
          padding: 16,
          border: `1px solid ${colors.white}20`,
        }}
      >
        {rows.map((row, ri) => (
          <div
            key={ri}
            style={{
              display: "flex",
              gap: 3,
              marginBottom: 4,
            }}
          >
            {row.cells.map((cell, ci) => {
              const isDirty =
                row.status === "dirty" && ci > 0;
              const isHeader = row.status === "header";
              const cellPulse =
                isDirty && frame % 60 < 5 ? 1 : 0;
              return (
                <div
                  key={ci}
                  style={{
                    width: 120,
                    height: 48,
                    backgroundColor: isHeader
                      ? `${colors.white}20`
                      : isDirty
                        ? `${errorPink}${cellPulse ? "35" : "18"}`
                        : `${colors.white}10`,
                    border: `1px solid ${isDirty ? errorPink + "90" : colors.white + "25"}`,
                    borderRadius: 5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    fontFamily: "monospace",
                    color: isDirty ? errorPink : colors.white,
                    fontWeight: isHeader ? "bold" : "normal",
                  }}
                >
                  {cell}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Arrow */}
      <svg width="100" height="50" viewBox="0 0 100 50" style={{ opacity: arrowOpacity }}>
        <line x1={0} y1={25} x2={72} y2={25} stroke={colors.caribbeanGreen} strokeWidth={4} />
        <polygon points="72,12 100,25 72,38" fill={colors.caribbeanGreen} />
      </svg>

      {/* Predictions */}
      <div style={{ opacity: predOpacity, display: "flex", flexDirection: "column", gap: 14 }}>
        {[
          { label: "Prediction A", value: "82%", good: true },
          { label: "Prediction B", value: "??%", good: false },
          { label: "Prediction C", value: "91%", good: true },
          { label: "Prediction D", value: "ERR", good: false },
        ].map((pred, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "14px 24px",
              borderRadius: 10,
              backgroundColor: pred.good ? `${colors.caribbeanGreen}25` : `${errorPink}20`,
              border: `2px solid ${pred.good ? colors.caribbeanGreen + "80" : errorPink + "80"}`,
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 7,
                backgroundColor: pred.good ? colors.caribbeanGreen : errorPink,
              }}
            />
            <span style={{ fontSize: 20, color: colors.white, fontWeight: "bold" }}>
              {pred.label}
            </span>
            <span
              style={{
                fontSize: 22,
                fontWeight: "bold",
                fontFamily: "monospace",
                color: pred.good ? colors.caribbeanGreen : errorPink,
                marginLeft: 12,
              }}
            >
              {pred.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Scene3DataDecides: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Heading with typewriter effect
  const headingText = "Data decides behaviour.";
  const typeStart = 1 * fps;
  const charsPerFrame = 0.4;
  const typeFrame = Math.max(0, frame - typeStart);
  const visibleChars = Math.min(
    Math.floor(typeFrame * charsPerFrame),
    headingText.length,
  );
  const displayText = headingText.slice(0, visibleChars);
  const showCursor = frame > typeStart && frame % 20 < 12;

  // Subtext
  const subProgress = spring({
    frame,
    fps,
    delay: 4 * fps,
    config: { damping: 200 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);
  const subY = interpolate(subProgress, [0, 1], [20, 0]);

  // Data transformation progress
  const transformProgress = interpolate(
    frame,
    [6 * fps, 18 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Warning text at bottom
  const warningProgress = spring({
    frame,
    fps,
    delay: 22 * fps,
    config: { damping: 200 },
  });
  const warningOpacity = interpolate(warningProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.darkCyra} 0%, ${colors.deepGreenCyanTurquoise} 100%)`,
        fontFamily,
      }}
    >
      {/* Subtle grid overlay */}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(${colors.white}10 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Heading with typewriter */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: "bold",
            color: colors.white,
          }}
        >
          {displayText}
          {showCursor && (
            <span style={{ color: colors.caribbeanGreen }}>|</span>
          )}
        </div>

        <div
          style={{
            fontSize: 26,
            color: colors.white,
            opacity: subOpacity * 0.85,
            transform: `translateY(${subY}px)`,
            marginTop: 16,
          }}
        >
          In ML systems, the data does not just test the system. It{" "}
          <span style={{ color: colors.caribbeanGreen, fontWeight: "bold" }}>
            defines
          </span>{" "}
          the system.
        </div>
      </div>

      {/* Data transformation visual */}
      <div
        style={{
          position: "absolute",
          top: 280,
          left: 60,
          right: 60,
          bottom: 140,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <DataTransformation progress={transformProgress} />
      </div>

      {/* Warning at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 70,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 22,
          color: colors.corn,
          opacity: warningOpacity,
          fontWeight: "bold",
        }}
      >
        Biased data in → Biased model out
      </div>
    </AbsoluteFill>
  );
};
