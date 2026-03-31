import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { displayFont, bodyFont } from "./fonts";

const VALUE_ITEMS = [
  { text: "Weekly hands-on AI sessions", textDelay: 100, checkDelay: 160 },
  {
    text: "Short-form breakdowns you can apply in under ten minutes",
    textDelay: 340,
    checkDelay: 400,
  },
  {
    text: "Real case studies from professional contexts",
    textDelay: 580,
    checkDelay: 640,
  },
  {
    text: "A full community of practitioners",
    textDelay: 820,
    checkDelay: 880,
  },
];

const CheckmarkCircle: React.FC<{ progress: number }> = ({ progress }) => (
  <div
    style={{
      width: 40,
      height: 40,
      minWidth: 40,
      borderRadius: "50%",
      backgroundColor: colors.darkCyra,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transform: `scale(${progress})`,
      opacity: progress,
    }}
  >
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke={colors.white}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="4,10 8,14 16,6" />
    </svg>
  </div>
);

export const Scene09WhatYouGet: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Vertical accent bar drawing downward
  const barHeight = interpolate(frame, [0, 80], [0, 550], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Header spring
  const headerProgress = spring({
    frame,
    fps,
    delay: 20,
    config: { damping: 200 },
  });
  const headerY = interpolate(headerProgress, [0, 1], [20, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.white,
      }}
    >
      {/* Vertical accent bar */}
      <div
        style={{
          position: "absolute",
          left: 160,
          top: 150,
          width: 6,
          height: barHeight,
          backgroundColor: colors.tiffanyBlue,
          borderRadius: 3,
        }}
      />

      {/* Content container */}
      <div
        style={{
          paddingLeft: 200,
          paddingTop: 160,
          paddingRight: 80,
        }}
      >
        {/* Header */}
        <div
          style={{
            fontFamily: displayFont,
            fontWeight: 700,
            fontSize: 48,
            color: colors.brandCharcoal,
            transform: `translateY(${headerY}px)`,
            opacity: headerProgress,
            marginBottom: 32,
          }}
        >
          What you will get
        </div>

        {/* Value items */}
        {VALUE_ITEMS.map((item, i) => {
          const cardProgress = spring({
            frame,
            fps,
            delay: item.textDelay,
            config: { damping: 200 },
          });
          const cardX = interpolate(cardProgress, [0, 1], [-30, 0]);

          const checkProgress = spring({
            frame,
            fps,
            delay: item.checkDelay,
            config: { damping: 12, stiffness: 150 },
          });

          return (
            <div
              key={i}
              style={{
                maxWidth: 1200,
                borderRadius: 16,
                backgroundColor: colors.magnolia,
                padding: "24px 32px",
                marginTop: 24,
                display: "flex",
                alignItems: "center",
                gap: 20,
                transform: `translateX(${cardX}px)`,
                opacity: cardProgress,
              }}
            >
              <CheckmarkCircle progress={checkProgress} />
              <span
                style={{
                  fontFamily: bodyFont,
                  fontWeight: 500,
                  fontSize: 34,
                  color: colors.gunmetal,
                }}
              >
                {item.text}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
