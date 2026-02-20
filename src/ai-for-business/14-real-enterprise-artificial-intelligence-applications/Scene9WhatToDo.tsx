import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

interface CheckItem {
  text: string;
  delay: number;
}

const checkItems: CheckItem[] = [
  { text: "Map the data flow", delay: 3 },
  { text: "Define where decisions happen", delay: 5.5 },
  { text: "Design for edge cases", delay: 8 },
  { text: "Build human override mechanisms", delay: 10.5 },
  { text: "Plan monitoring from day one", delay: 13 },
];

// Animated checkmark
const CheckMark: React.FC<{ progress: number; size: number }> = ({ progress, size }) => {
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

export const Scene9WhatToDo: React.FC = () => {
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

  // Decorative line
  const lineWidth = interpolate(frame, [0.5 * fps, 1.5 * fps], [0, 200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "Think System" emphasis
  const emphasisProgress = spring({
    frame,
    fps,
    delay: 1.5 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const emphasisOpacity = interpolate(emphasisProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.white,
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
            key={`bg-${i}`}
            x1={0}
            y1={i * 60}
            x2={1920}
            y2={i * 60}
            stroke={colors.darkSlateGray}
            strokeWidth={1}
          />
        ))}
      </svg>

      {/* Title section */}
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
            fontSize: 54,
            fontWeight: 700,
            color: colors.gunmetal,
            textAlign: "center",
          }}
        >
          Think{" "}
          <span style={{ color: colors.darkCyra }}>System</span>.
          Not Model.
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
        <div
          style={{
            opacity: emphasisOpacity,
            fontSize: 22,
            color: colors.rhythm,
            marginTop: 16,
          }}
        >
          Stop thinking in terms of "the model." Start thinking in terms of "the system."
        </div>
      </div>

      {/* Checklist */}
      <div
        style={{
          position: "absolute",
          top: 240,
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          display: "flex",
          flexDirection: "column",
          gap: 14,
          zIndex: 2,
        }}
      >
        {checkItems.map((item, i) => {
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
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          // Highlight current item
          const isLatest =
            frame >= item.delay * fps &&
            (i === checkItems.length - 1 || frame < checkItems[i + 1].delay * fps);
          const highlightBg = isLatest ? `${colors.darkCyra}08` : "transparent";

          return (
            <div
              key={`item-${i}`}
              style={{
                opacity: itemOpacity,
                transform: `translateX(${itemSlideX}px)`,
                display: "flex",
                alignItems: "center",
                gap: 20,
                padding: "16px 24px",
                borderRadius: 12,
                background: highlightBg,
              }}
            >
              <CheckMark progress={checkProgress} size={36} />
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: colors.gunmetal,
                  lineHeight: 1.4,
                }}
              >
                {item.text}
              </div>
              <div
                style={{
                  marginLeft: "auto",
                  fontSize: 15,
                  color: colors.chineseSilver,
                  fontWeight: 700,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
            </div>
          );
        })}
      </div>

      {/* Data flow arrows (decorative) */}
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", top: 0, left: 0, opacity: 0.06, zIndex: 1 }}
      >
        {/* Left arrows */}
        <path d="M 100 300 L 100 700" stroke={colors.darkCyra} strokeWidth={2} strokeDasharray="8 6" />
        <path d="M 94 690 L 100 710 L 106 690" fill="none" stroke={colors.darkCyra} strokeWidth={2} />
        {/* Right arrows */}
        <path d="M 1820 700 L 1820 300" stroke={colors.darkCyra} strokeWidth={2} strokeDasharray="8 6" />
        <path d="M 1814 310 L 1820 290 L 1826 310" fill="none" stroke={colors.darkCyra} strokeWidth={2} />
      </svg>
    </AbsoluteFill>
  );
};
