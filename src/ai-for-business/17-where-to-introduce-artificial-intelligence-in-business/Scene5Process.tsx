import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const pipelineSteps = [
  {
    label: "Acquisition",
    description: "Licensing & collection",
    color: colors.deepGreenCyanTurquoise,
  },
  {
    label: "Cleaning",
    description: "Dedup & normalization",
    color: colors.darkCyra,
  },
  {
    label: "Annotation",
    description: "Labeling & sampling",
    color: colors.viridianGreen,
  },
  {
    label: "Quality",
    description: "Bias & accuracy checks",
    color: colors.tiffanyBlue,
  },
  {
    label: "Governance",
    description: "GDPR & compliance",
    color: colors.caribbeanGreen,
  },
];

export const Scene5Process: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Blueprint grid
  const gridOpacity = interpolate(frame, [0, fps], [0, 0.06], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 8,
    config: { damping: 12, stiffness: 80 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  // Bottom warning
  const warningProgress = spring({
    frame,
    fps,
    delay: 10 * fps,
    config: { damping: 10, stiffness: 60 },
  });
  const warningOpacity = interpolate(warningProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.white,
        fontFamily,
      }}
    >
      {/* Blueprint grid */}
      <AbsoluteFill
        style={{
          opacity: gridOpacity,
          backgroundImage: `
            linear-gradient(${colors.darkCyra}12 1px, transparent 1px),
            linear-gradient(90deg, ${colors.darkCyra}12 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: colors.viridianGreen,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 700,
              color: colors.white,
            }}
          >
            C
          </div>
          <div style={{ fontSize: 50, fontWeight: 700, color: colors.darkSlateGray }}>
            Process
          </div>
          <div style={{ fontSize: 26, color: colors.rhythm }}>
            Cleaning. Governance. Quality.
          </div>
        </div>
      </div>

      {/* Horizontal pipeline */}
      <div
        style={{
          position: "absolute",
          top: 300,
          left: 60,
          right: 60,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 0,
        }}
      >
        {pipelineSteps.map((step, i) => {
          const stepDelay = 2 * fps + i * 20;
          const stepProgress = spring({
            frame,
            fps,
            delay: stepDelay,
            config: { damping: 12, stiffness: 70 },
          });
          const stepOpacity = interpolate(stepProgress, [0, 1], [0, 1]);
          const stepScale = interpolate(stepProgress, [0, 1], [0.85, 1]);
          const stepY = interpolate(stepProgress, [0, 1], [30, 0]);

          // Arrow
          const arrowProgress = spring({
            frame,
            fps,
            delay: stepDelay + 14,
            config: { damping: 10, stiffness: 80 },
          });
          const arrowOpacity = interpolate(arrowProgress, [0, 1], [0, 0.7]);

          // Step number pulse
          const stepFrame = frame - stepDelay;
          const numberScale =
            stepFrame > 0
              ? interpolate(Math.sin(stepFrame * 0.04), [-1, 1], [0.95, 1.05])
              : 1;

          return (
            <div
              key={step.label}
              style={{ display: "flex", alignItems: "center" }}
            >
              <div
                style={{
                  opacity: stepOpacity,
                  transform: `scale(${stepScale}) translateY(${stepY}px)`,
                  width: 280,
                  background: `${step.color}10`,
                  border: `2px solid ${step.color}35`,
                  borderRadius: 18,
                  padding: "28px 20px",
                  textAlign: "center",
                }}
              >
                {/* Step number */}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    background: step.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    fontWeight: 700,
                    color: colors.white,
                    margin: "0 auto 16px",
                    transform: `scale(${numberScale})`,
                  }}
                >
                  {i + 1}
                </div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: colors.gunmetal,
                    marginBottom: 8,
                  }}
                >
                  {step.label}
                </div>
                <div style={{ fontSize: 16, color: colors.rhythm }}>
                  {step.description}
                </div>
              </div>

              {/* Arrow */}
              {i < pipelineSteps.length - 1 && (
                <svg
                  width="36"
                  height="20"
                  viewBox="0 0 36 20"
                  style={{ opacity: arrowOpacity, flexShrink: 0, margin: "0 -2px" }}
                >
                  <path
                    d="M0 10H28M28 10L20 4M28 10L20 16"
                    stroke={colors.darkCyra}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom warning */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: warningOpacity,
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: `${colors.oldRose}10`,
            border: `1px solid ${colors.oldRose}30`,
            borderRadius: 14,
            padding: "16px 40px",
            fontSize: 26,
            fontWeight: 700,
            color: colors.oldRose,
          }}
        >
          Garbage in. Polished garbage out.
        </div>
      </div>
    </AbsoluteFill>
  );
};
