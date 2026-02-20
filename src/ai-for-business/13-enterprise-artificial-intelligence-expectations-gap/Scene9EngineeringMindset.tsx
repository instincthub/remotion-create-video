import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

interface ChecklistItemData {
  text: string;
  delay: number;
}

const checklistItems: ChecklistItemData[] = [
  { text: "Define measurable business value", delay: 1.5 },
  { text: "Map stakeholders", delay: 3 },
  { text: "Assess risk tolerance", delay: 4.5 },
  { text: "Plan for monitoring", delay: 6 },
  { text: "Budget for maintenance", delay: 7.5 },
];

// Animated checkmark
const AnimatedCheckmark: React.FC<{
  progress: number;
  size: number;
}> = ({ progress, size }) => {
  const checkLength = size * 1.6;
  const drawLength = interpolate(progress, [0, 1], [0, checkLength], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={{ flexShrink: 0 }}>
      <circle
        cx={16}
        cy={16}
        r={14}
        fill={`${colors.darkCyra}15`}
        stroke={colors.darkCyra}
        strokeWidth={2}
        opacity={interpolate(progress, [0, 0.1], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })}
      />
      <path
        d="M 9 16 L 14 21 L 23 11"
        fill="none"
        stroke={colors.darkCyra}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={checkLength}
        strokeDashoffset={checkLength - drawLength}
      />
    </svg>
  );
};

// Single checklist row
const ChecklistItem: React.FC<{
  item: ChecklistItemData;
  index: number;
}> = ({ item, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const itemProgress = spring({
    frame,
    fps,
    delay: item.delay * fps,
    config: { damping: 12, stiffness: 80 },
  });
  const itemOpacity = interpolate(itemProgress, [0, 1], [0, 1]);
  const itemSlideX = interpolate(itemProgress, [0, 1], [30, 0]);

  const checkProgress = interpolate(
    frame,
    [item.delay * fps + 0.3 * fps, item.delay * fps + 1.2 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        opacity: itemOpacity,
        transform: `translateX(${itemSlideX}px)`,
        display: "flex",
        alignItems: "center",
        gap: 20,
        padding: "14px 24px",
        borderRadius: 10,
      }}
    >
      <AnimatedCheckmark progress={checkProgress} size={34} />
      <div
        style={{
          fontSize: 28,
          color: colors.white,
          fontWeight: 700,
          lineHeight: 1.4,
          fontFamily,
        }}
      >
        {item.text}
      </div>
      <div
        style={{
          marginLeft: "auto",
          fontSize: 14,
          color: colors.rhythm,
          fontWeight: 700,
        }}
      >
        {index + 1 < 10 ? "0" : ""}
        {index + 1}
      </div>
    </div>
  );
};

export const Scene9EngineeringMindset: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 8,
    config: { damping: 12, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleScale = interpolate(titleProgress, [0, 1], [0.9, 1]);

  // Underline
  const lineWidth = interpolate(
    frame,
    [0.5 * fps, 1.5 * fps],
    [0, 260],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.darkNavy} 0%, ${colors.darkCharcoal} 100%)`,
        fontFamily,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 3,
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            fontSize: 52,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
          }}
        >
          Adopt an{" "}
          <span style={{ color: colors.darkCyra }}>Engineering Mindset</span>
        </div>
        <div
          style={{
            width: lineWidth,
            height: 4,
            background: colors.darkCyra,
            borderRadius: 2,
            marginTop: 12,
          }}
        />
      </div>

      {/* Checklist */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: "50%",
          transform: "translateX(-50%)",
          width: 700,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          zIndex: 2,
        }}
      >
        {checklistItems.map((item, i) => (
          <ChecklistItem key={`check-${i}`} item={item} index={i} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
