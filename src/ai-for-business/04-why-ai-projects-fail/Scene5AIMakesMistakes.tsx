import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Accuracy meter
const AccuracyMeter: React.FC<{
  value: number;
  label: string;
  progress: number;
}> = ({ value, label, progress }) => {
  const frame = useCurrentFrame();
  const pulse = Math.sin(frame * 0.06) * 0.05 + 0.95;

  const barWidth = interpolate(progress, [0, 1], [0, value], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const isHigh = value >= 90;

  return (
    <div style={{ opacity: progress, width: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 10,
          fontSize: 24,
        }}
      >
        <span style={{ color: colors.white }}>{label}</span>
        <span
          style={{
            color: isHigh ? colors.caribbeanGreen : colors.corn,
            fontWeight: "bold",
            fontFamily: "monospace",
            fontSize: 26,
          }}
        >
          {Math.round(barWidth)}%
        </span>
      </div>
      <div
        style={{
          width: "100%",
          height: 16,
          backgroundColor: `${colors.white}15`,
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${barWidth}%`,
            height: "100%",
            backgroundColor: isHigh ? colors.caribbeanGreen : colors.corn,
            borderRadius: 8,
            opacity: pulse,
          }}
        />
      </div>
    </div>
  );
};

export const Scene5AIMakesMistakes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 12, stiffness: 120 },
  });
  const titleScale = interpolate(titleProgress, [0, 1], [0.6, 1]);
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

  // Subtitle
  const subProgress = spring({
    frame,
    fps,
    delay: 2 * fps,
    config: { damping: 200 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);

  // Accuracy meters staggered
  const meter1 = interpolate(frame, [4 * fps, 9 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const meter2 = interpolate(frame, [6 * fps, 11 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const meter3 = interpolate(frame, [8 * fps, 13 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Key insight at bottom
  const insightProgress = spring({
    frame,
    fps,
    delay: 18 * fps,
    config: { damping: 200 },
  });
  const insightOpacity = interpolate(insightProgress, [0, 1], [0, 1]);
  const insightY = interpolate(insightProgress, [0, 1], [20, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.darkSlateGray,
        fontFamily,
      }}
    >
      {/* Subtle diagonal pattern */}
      <AbsoluteFill
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, ${colors.white}03 0px, ${colors.white}03 1px, transparent 1px, transparent 40px)`,
        }}
      />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 80,
          fontWeight: "bold",
          color: colors.white,
          transform: `scale(${titleScale})`,
          opacity: titleOpacity,
        }}
      >
        AI{" "}
        <span style={{ color: colors.oldRose }}>makes mistakes</span>.
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 30,
          color: colors.chineseSilver,
          opacity: subOpacity,
        }}
      >
        ML systems operate on probabilities, not certainties.
      </div>

      {/* Accuracy meters — centered single column */}
      <div
        style={{
          position: "absolute",
          top: 340,
          left: "50%",
          transform: "translateX(-50%)",
          width: 700,
          display: "flex",
          flexDirection: "column",
          gap: 36,
        }}
      >
        <AccuracyMeter value={95} label="Image Classification" progress={meter1} />
        <AccuracyMeter value={87} label="Sentiment Analysis" progress={meter2} />
        <AccuracyMeter value={78} label="Medical Diagnosis" progress={meter3} />
      </div>

      {/* Insight */}
      <div
        style={{
          position: "absolute",
          bottom: 90,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 30,
          color: colors.caribbeanGreen,
          fontWeight: "bold",
          opacity: insightOpacity,
          transform: `translateY(${insightY}px)`,
        }}
      >
        100% accuracy on training data is a{" "}
        <span style={{ color: colors.oldRose }}>red flag</span>, not a
        goal.
      </div>
    </AbsoluteFill>
  );
};
