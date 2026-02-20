import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const ACCURACY_STAGES = [
  { label: "Model A", accuracy: 90, color: colors.caribbeanGreen },
  { label: "A + B", accuracy: 81, color: colors.corn },
  { label: "A + B + C", accuracy: 73, color: colors.oldRose },
];

export const Scene3Errors: React.FC = () => {
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

  // Each accuracy stage appears sequentially
  const stageEntrances = ACCURACY_STAGES.map((_, i) =>
    spring({
      frame,
      fps,
      delay: fps + i * fps * 1.5,
      config: { damping: 12, stiffness: 80 },
    }),
  );

  // Animated percentage counters
  const getAnimatedPercentage = (targetValue: number, entrance: number) => {
    return Math.round(interpolate(entrance, [0, 1], [100, targetValue]));
  };

  // Warning text at the bottom
  const warningProgress = spring({
    frame,
    fps,
    delay: 7 * fps,
    config: { damping: 14, stiffness: 100 },
  });
  const warningOpacity = interpolate(warningProgress, [0, 1], [0, 1]);

  // Downward arrows between stages
  const arrowEntrances = [0, 1].map((i) =>
    spring({
      frame,
      fps,
      delay: 2 * fps + i * fps * 1.5,
      config: { damping: 14, stiffness: 120 },
    }),
  );

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, #004a52 0%, #122e2a 100%)`,
        fontFamily,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: colors.white,
          }}
        >
          Errors{" "}
          <span style={{ color: colors.corn }}>Compound</span>
        </div>
      </div>

      {/* Accuracy visualization */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 200,
          paddingTop: 40,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 40,
          }}
        >
          {ACCURACY_STAGES.map((stage, i) => {
            const entrance = stageEntrances[i];
            const opacity = interpolate(entrance, [0, 1], [0, 1]);
            const scale = interpolate(entrance, [0, 1], [0.7, 1]);
            const animatedPct = getAnimatedPercentage(stage.accuracy, entrance);

            // Circle progress
            const radius = 90;
            const circumference = 2 * Math.PI * radius;
            const strokeDashoffset =
              circumference - (animatedPct / 100) * circumference;

            return (
              <React.Fragment key={stage.label}>
                <div
                  style={{
                    opacity,
                    transform: `scale(${scale})`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  {/* Circular progress */}
                  <svg width={220} height={220} viewBox="0 0 220 220">
                    {/* Background circle */}
                    <circle
                      cx={110}
                      cy={110}
                      r={radius}
                      fill="none"
                      stroke={`${colors.white}15`}
                      strokeWidth={12}
                    />
                    {/* Progress arc */}
                    <circle
                      cx={110}
                      cy={110}
                      r={radius}
                      fill="none"
                      stroke={stage.color}
                      strokeWidth={12}
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      transform="rotate(-90 110 110)"
                    />
                    {/* Percentage text */}
                    <text
                      x={110}
                      y={105}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={colors.white}
                      fontSize={58}
                      fontWeight={700}
                      fontFamily={fontFamily}
                    >
                      {animatedPct}%
                    </text>
                    <text
                      x={110}
                      y={148}
                      textAnchor="middle"
                      fill={`${colors.white}90`}
                      fontSize={22}
                      fontFamily={fontFamily}
                    >
                      accuracy
                    </text>
                  </svg>
                  {/* Label */}
                  <div
                    style={{
                      fontSize: 28,
                      fontWeight: 700,
                      color: colors.white,
                    }}
                  >
                    {stage.label}
                  </div>
                </div>

                {/* Downward arrow between stages */}
                {i < ACCURACY_STAGES.length - 1 && (
                  <div
                    style={{
                      opacity: interpolate(
                        arrowEntrances[i],
                        [0, 1],
                        [0, 1],
                      ),
                    }}
                  >
                    <svg width={60} height={40} viewBox="0 0 60 40">
                      <line
                        x1={5}
                        y1={20}
                        x2={45}
                        y2={20}
                        stroke={colors.oldRose}
                        strokeWidth={3}
                      />
                      <polygon
                        points="45,12 58,20 45,28"
                        fill={colors.oldRose}
                      />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* Warning message */}
      <div
        style={{
          position: "absolute",
          bottom: 240,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: warningOpacity,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            background: `${colors.oldRose}25`,
            padding: "14px 32px",
            borderRadius: 12,
            border: `1px solid ${colors.oldRose}50`,
          }}
        >
          <svg width={24} height={24} viewBox="0 0 24 24">
            <polygon
              points="12,3 22,21 2,21"
              fill="none"
              stroke={colors.oldRose}
              strokeWidth={2}
              strokeLinejoin="round"
            />
            <line
              x1={12}
              y1={10}
              x2={12}
              y2={15}
              stroke={colors.oldRose}
              strokeWidth={2}
              strokeLinecap="round"
            />
            <circle cx={12} cy={18} r={1.2} fill={colors.oldRose} />
          </svg>
          <span
            style={{
              fontSize: 26,
              color: colors.white,
              fontWeight: 700,
            }}
          >
            Small mistakes amplify downstream
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
