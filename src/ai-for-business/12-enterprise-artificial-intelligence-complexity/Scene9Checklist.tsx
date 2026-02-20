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
  { text: "Understand the business process first", delay: 2 },
  { text: "Map the full data flow", delay: 4.5 },
  { text: "Identify regulatory constraints", delay: 7 },
  { text: "Design for auditability", delay: 9.5 },
  { text: "Keep humans in the loop", delay: 12 },
];

// Animated checkmark that draws itself
const AnimatedCheckmark: React.FC<{
  progress: number;
  size: number;
}> = ({ progress, size }) => {
  // Total path length for the checkmark
  const checkLength = size * 1.6;
  const drawLength = interpolate(progress, [0, 1], [0, checkLength], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      style={{ flexShrink: 0 }}
    >
      {/* Circle background */}
      <circle
        cx={16}
        cy={16}
        r={14}
        fill={`${colors.caribbeanGreen}15`}
        stroke={colors.caribbeanGreen}
        strokeWidth={2}
        opacity={interpolate(progress, [0, 0.1], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })}
      />
      {/* Checkmark path */}
      <path
        d="M 9 16 L 14 21 L 23 11"
        fill="none"
        stroke={colors.caribbeanGreen}
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

  // Item fade in
  const itemProgress = spring({
    frame,
    fps,
    delay: item.delay * fps,
    config: { damping: 12, stiffness: 80 },
  });
  const itemOpacity = interpolate(itemProgress, [0, 1], [0, 1]);
  const itemSlideX = interpolate(itemProgress, [0, 1], [30, 0]);

  // Checkmark draws after item appears
  const checkProgress = interpolate(
    frame,
    [item.delay * fps + 0.3 * fps, item.delay * fps + 1.2 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Subtle highlight on current item
  const isLatest = frame >= item.delay * fps && (
    index === checklistItems.length - 1 ||
    frame < checklistItems[index + 1].delay * fps
  );
  const highlightOpacity = isLatest
    ? interpolate(Math.sin(frame * 0.06), [-1, 1], [0.02, 0.06])
    : 0;

  return (
    <div
      style={{
        opacity: itemOpacity,
        transform: `translateX(${itemSlideX}px)`,
        display: "flex",
        alignItems: "center",
        gap: 20,
        padding: "16px 28px",
        borderRadius: 12,
        background: `${colors.caribbeanGreen}${Math.round(highlightOpacity * 255) < 16 ? "0" : ""}${Math.round(highlightOpacity * 255).toString(16)}`,
      }}
    >
      <AnimatedCheckmark progress={checkProgress} size={36} />
      <div
        style={{
          fontSize: 30,
          color: colors.gunmetal,
          fontWeight: itemOpacity > 0.5 ? "bold" : "normal",
          lineHeight: 1.5,
        }}
      >
        {item.text}
      </div>
      {/* Item number */}
      <div
        style={{
          marginLeft: "auto",
          fontSize: 16,
          color: colors.chineseSilver,
          fontWeight: "bold",
        }}
      >
        {index + 1 < 10 ? "0" : ""}{index + 1}
      </div>
    </div>
  );
};

export const Scene9Checklist: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleProgress = spring({
    frame,
    fps,
    delay: 8,
    config: { damping: 12, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleScale = interpolate(titleProgress, [0, 1], [0.9, 1]);

  // Decorative line under title
  const lineWidth = interpolate(
    frame,
    [0.5 * fps, 1.5 * fps],
    [0, 200],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Progress bar at bottom (how many items checked)
  const completedItems = checklistItems.filter(
    (item) => frame >= item.delay * fps + 1.2 * fps
  ).length;
  const progressWidth = interpolate(
    completedItems,
    [0, checklistItems.length],
    [0, 600],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const progressBarOpacity = interpolate(
    frame,
    [2 * fps, 3 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.magnolia,
        fontFamily,
      }}
    >
      {/* Subtle background pattern */}
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", top: 0, left: 0, opacity: 0.03 }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <line
            key={`bg-line-${i}`}
            x1={0}
            y1={i * 60}
            x2={1920}
            y2={i * 60}
            stroke={colors.darkSlateGray}
            strokeWidth={1}
          />
        ))}
      </svg>

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 70,
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
            fontSize: 56,
            fontWeight: "bold",
            color: colors.darkSlateGray,
            textAlign: "center",
          }}
        >
          What You Must Do
        </div>
        {/* Decorative underline */}
        <div
          style={{
            width: lineWidth,
            height: 4,
            background: colors.caribbeanGreen,
            borderRadius: 2,
            marginTop: 12,
          }}
        />
      </div>

      {/* Checklist container */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          zIndex: 2,
        }}
      >
        {checklistItems.map((item, i) => (
          <ChecklistItem key={`check-${i}`} item={item} index={i} />
        ))}
      </div>

      {/* Progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: 260,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          opacity: progressBarOpacity,
          zIndex: 3,
        }}
      >
        <div
          style={{
            fontSize: 14,
            color: colors.rhythm,
            letterSpacing: 2,
            fontWeight: "bold",
          }}
        >
          PROGRESS
        </div>
        <div
          style={{
            width: 600,
            height: 8,
            borderRadius: 4,
            background: `${colors.chineseSilver}30`,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: progressWidth,
              height: "100%",
              borderRadius: 4,
              background: `linear-gradient(90deg, ${colors.caribbeanGreen}, ${colors.tiffanyBlue})`,
            }}
          />
        </div>
        <div
          style={{
            fontSize: 14,
            color: colors.rhythm,
          }}
        >
          {completedItems} / {checklistItems.length}
        </div>
      </div>
    </AbsoluteFill>
  );
};
