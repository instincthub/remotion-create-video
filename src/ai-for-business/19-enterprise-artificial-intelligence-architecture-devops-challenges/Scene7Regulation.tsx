import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene7Regulation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [-30, 0]);

  // Training dataset entrance
  const datasetProgress = spring({
    frame,
    fps,
    delay: fps,
    config: { damping: 12, stiffness: 80 },
  });
  const datasetOpacity = interpolate(datasetProgress, [0, 1], [0, 1]);

  // Model entrance
  const modelProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 3),
    config: { damping: 12, stiffness: 80 },
  });
  const modelOpacity = interpolate(modelProgress, [0, 1], [0, 1]);

  // Data deletion phase (blocks start disappearing)
  const deleteProgress = interpolate(
    frame,
    [8 * fps, 14 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const deletedBlocks = Math.floor(deleteProgress * 5);

  // "Except" text
  const exceptProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 6),
    config: { damping: 14, stiffness: 80 },
  });
  const exceptOpacity = interpolate(exceptProgress, [0, 1], [0, 1]);

  // Model fading
  const modelFade = interpolate(
    frame,
    [16 * fps, 19 * fps],
    [1, 0.3],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Traceability gap appears
  const traceProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 18),
    config: { damping: 14, stiffness: 70 },
  });
  const traceOpacity = interpolate(traceProgress, [0, 1], [0, 1]);

  // Bottom insight
  const bottomProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 22),
    config: { damping: 14, stiffness: 80 },
  });
  const bottomOpacity = interpolate(bottomProgress, [0, 1], [0, 1]);

  const dataBlockCount = 12;

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
          top: 55,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 50,
            fontWeight: 700,
            color: colors.darkSlateGray,
          }}
        >
          Regulation Changes{" "}
          <span style={{ color: colors.oldRose }}>Everything</span>
        </div>
      </div>

      {/* "Except..." dramatic label */}
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: exceptOpacity,
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: colors.oldRose,
          }}
        >
          Customer data deleted under data protection regulation...
        </div>
      </div>

      {/* Central visualization: Dataset → Model → Traceability */}
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 0,
          right: 0,
          bottom: 310,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 50,
        }}
      >
        {/* Training dataset */}
        <div style={{ textAlign: "center", opacity: datasetOpacity }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: colors.gunmetal,
              marginBottom: 20,
            }}
          >
            Training Dataset
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 10,
            }}
          >
            {Array.from({ length: dataBlockCount }).map((_, i) => {
              const isDeleted = i < deletedBlocks;
              return (
                <div
                  key={`block-${i}`}
                  style={{
                    width: 56,
                    height: 44,
                    borderRadius: 8,
                    background: isDeleted
                      ? `${colors.oldRose}10`
                      : `${colors.darkCyra}10`,
                    border: `2px solid ${isDeleted ? colors.oldRose : colors.darkCyra}`,
                    opacity: isDeleted ? 0.25 : 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    color: isDeleted ? colors.oldRose : colors.darkCyra,
                    fontWeight: 700,
                  }}
                >
                  {isDeleted ? "\u2717" : "\u2713"}
                </div>
              );
            })}
          </div>
          {deletedBlocks > 0 && (
            <div
              style={{
                marginTop: 12,
                fontSize: 16,
                fontWeight: 700,
                color: colors.oldRose,
                opacity: deleteProgress,
              }}
            >
              {deletedBlocks} record{deletedBlocks > 1 ? "s" : ""} deleted
            </div>
          )}
        </div>

        {/* Arrow */}
        <div style={{ opacity: modelOpacity }}>
          <svg width="80" height="40" viewBox="0 0 80 40">
            <line
              x1={5}
              y1={20}
              x2={60}
              y2={20}
              stroke={colors.rhythm}
              strokeWidth={2.5}
            />
            <polygon points="60,13 75,20 60,27" fill={colors.rhythm} />
          </svg>
        </div>

        {/* Trained Model */}
        <div style={{ textAlign: "center", opacity: modelOpacity * modelFade }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: colors.gunmetal,
              marginBottom: 20,
            }}
          >
            Trained Model
          </div>
          <div
            style={{
              width: 160,
              height: 120,
              borderRadius: 16,
              background: `${colors.darkCyra}08`,
              border: `2px solid ${colors.darkCyra}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 700,
              color: colors.darkCyra,
            }}
          >
            ML
          </div>
          {modelFade < 0.8 && (
            <div
              style={{
                marginTop: 12,
                fontSize: 17,
                fontWeight: 700,
                color: colors.oldRose,
                opacity: 1 - modelFade,
              }}
            >
              Delete model too?
            </div>
          )}
        </div>

        {/* Arrow to traceability */}
        <div style={{ opacity: traceOpacity }}>
          <svg width="80" height="40" viewBox="0 0 80 40">
            <line
              x1={5}
              y1={20}
              x2={60}
              y2={20}
              stroke={colors.oldRose}
              strokeWidth={2.5}
              strokeDasharray="8 5"
            />
            <polygon points="60,13 75,20 60,27" fill={colors.oldRose} />
          </svg>
        </div>

        {/* Traceability gap */}
        <div style={{ textAlign: "center", opacity: traceOpacity }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: colors.oldRose,
              marginBottom: 20,
            }}
          >
            Traceability
          </div>
          <div
            style={{
              width: 160,
              height: 120,
              borderRadius: 16,
              background: `${colors.oldRose}06`,
              border: `2px dashed ${colors.oldRose}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 48,
              fontWeight: 700,
              color: colors.oldRose,
            }}
          >
            ?
          </div>
          <div
            style={{
              marginTop: 12,
              fontSize: 17,
              fontWeight: 700,
              color: colors.oldRose,
            }}
          >
            Cannot reproduce decisions
          </div>
        </div>
      </div>

      {/* Bottom insight */}
      <div
        style={{
          position: "absolute",
          bottom: 230,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: bottomOpacity,
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: `${colors.oldRose}10`,
            padding: "12px 28px",
            borderRadius: 10,
            border: `1px solid ${colors.oldRose}30`,
          }}
        >
          <span
            style={{
              fontSize: 26,
              color: colors.gunmetal,
              fontWeight: 700,
            }}
          >
            This is not theoretical. This is regulatory reality.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
