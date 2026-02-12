import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Doctor silhouette as SVG
const DoctorSilhouette: React.FC<{ opacity: number }> = ({ opacity }) => {
  return (
    <svg
      width="180"
      height="320"
      viewBox="0 0 180 320"
      style={{ opacity }}
    >
      {/* Head */}
      <circle cx={90} cy={50} r={35} fill={colors.darkSlateGray} />
      {/* Stethoscope */}
      <path
        d="M75 80 Q60 120 70 150"
        stroke={colors.tiffanyBlue}
        strokeWidth={3}
        fill="none"
      />
      <circle cx={70} cy={155} r={8} fill={colors.tiffanyBlue} />
      {/* Body */}
      <rect x={55} y={82} width={70} height={120} rx={12} fill={colors.darkSlateGray} />
      {/* Coat */}
      <rect x={48} y={92} width={84} height={100} rx={8} fill={colors.white} opacity={0.15} />
      {/* Legs */}
      <rect x={62} y={200} width={24} height={100} rx={8} fill={colors.darkSlateGray} />
      <rect x={94} y={200} width={24} height={100} rx={8} fill={colors.darkSlateGray} />
    </svg>
  );
};

// AI interface panel
const AIPanel: React.FC<{ progress: number; frame: number }> = ({
  progress,
  frame,
}) => {
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const pulse = Math.sin(frame * 0.08) * 0.08 + 0.92;

  return (
    <div
      style={{
        opacity,
        width: 340,
        backgroundColor: `${colors.gunmetal}E0`,
        borderRadius: 16,
        padding: 28,
        border: `2px solid ${colors.tiffanyBlue}50`,
      }}
    >
      {/* AI label */}
      <div
        style={{
          fontSize: 14,
          fontWeight: "bold",
          color: colors.tiffanyBlue,
          letterSpacing: 3,
          marginBottom: 16,
        }}
      >
        AI RECOMMENDATION
      </div>

      {/* Recommendation bars */}
      {[
        { label: "Treatment A", confidence: 78, color: colors.caribbeanGreen },
        { label: "Treatment B", confidence: 65, color: colors.tiffanyBlue },
        { label: "Treatment C", confidence: 42, color: colors.rhythm },
      ].map((item, i) => {
        const barWidth = interpolate(progress, [0.3 + i * 0.15, 0.6 + i * 0.15], [0, item.confidence], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div key={i} style={{ marginBottom: 16 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 16,
                color: colors.white,
                marginBottom: 6,
              }}
            >
              <span>{item.label}</span>
              <span style={{ fontFamily: "monospace", color: item.color }}>
                {Math.round(barWidth)}%
              </span>
            </div>
            <div
              style={{
                width: "100%",
                height: 8,
                backgroundColor: `${colors.white}15`,
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${barWidth}%`,
                  height: "100%",
                  backgroundColor: item.color,
                  borderRadius: 4,
                  opacity: pulse,
                }}
              />
            </div>
          </div>
        );
      })}

      {/* Question mark overlay */}
      <div
        style={{
          marginTop: 12,
          fontSize: 18,
          color: colors.corn,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        But which is truly best?
      </div>
    </div>
  );
};

export const Scene4Uncertainty: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Heading
  const headingProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 12, stiffness: 100 },
  });
  const headingOpacity = interpolate(headingProgress, [0, 1], [0, 1]);
  const headingScale = interpolate(headingProgress, [0, 1], [0.7, 1]);

  // Sub heading
  const subProgress = spring({
    frame,
    fps,
    delay: 1.5 * fps,
    config: { damping: 200 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);

  // Doctor + AI panel
  const visualProgress = interpolate(
    frame,
    [3 * fps, 10 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Uncertainty text
  const uncertaintyProgress = spring({
    frame,
    fps,
    delay: 16 * fps,
    config: { damping: 200 },
  });
  const uncertaintyOpacity = interpolate(uncertaintyProgress, [0, 1], [0, 1]);

  // Bottom question
  const bottomProgress = spring({
    frame,
    fps,
    delay: 20 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const bottomOpacity = interpolate(bottomProgress, [0, 1], [0, 1]);

  // Spotlight gradient
  const spotlightSize = interpolate(frame, [0, 5 * fps], [400, 600], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${colors.darkSlateGray} 0%, #1a2a35 50%, ${colors.gunmetal} 100%)`,
        fontFamily,
      }}
    >
      {/* Soft spotlight effect */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle ${spotlightSize}px at 50% 40%, ${colors.tiffanyBlue}12 0%, transparent 100%)`,
        }}
      />

      {/* Heading */}
      <div
        style={{
          position: "absolute",
          top: 65,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 62,
            fontWeight: "bold",
            color: colors.white,
            opacity: headingOpacity,
            transform: `scale(${headingScale})`,
          }}
        >
          When is AI{" "}
          <span style={{ color: colors.oldRose }}>wrong</span>?
        </div>
        <div
          style={{
            fontSize: 26,
            color: colors.chineseSilver,
            opacity: subOpacity,
            marginTop: 12,
          }}
        >
          Medicine. Judgment. Uncertainty.
        </div>
      </div>

      {/* Doctor + AI visual */}
      <div
        style={{
          position: "absolute",
          top: 240,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 120,
        }}
      >
        <DoctorSilhouette opacity={interpolate(visualProgress, [0, 0.4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />

        {/* VS divider */}
        <div
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: colors.rhythm,
            opacity: interpolate(visualProgress, [0.2, 0.5], [0, 0.7], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          vs
        </div>

        <AIPanel progress={visualProgress} frame={frame} />
      </div>

      {/* Uncertainty callout */}
      <div
        style={{
          position: "absolute",
          bottom: 180,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: uncertaintyOpacity,
        }}
      >
        <div
          style={{
            display: "inline-block",
            fontSize: 24,
            color: colors.white,
            backgroundColor: `${colors.darkCyra}40`,
            padding: "14px 40px",
            borderRadius: 10,
            border: `1px solid ${colors.darkCyra}60`,
          }}
        >
          Sometimes, you simply{" "}
          <span style={{ color: colors.corn, fontWeight: "bold" }}>
            cannot know
          </span>
        </div>
      </div>

      {/* Bottom question */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: bottomOpacity,
          fontSize: 18,
          color: colors.rhythm,
        }}
      >
        If the patient recovers, was it the best possible treatment?
      </div>
    </AbsoluteFill>
  );
};
