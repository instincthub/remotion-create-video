import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const MetricIcon: React.FC<{ type: string }> = ({ type }) => {
  const size = 36;
  const stroke = colors.white;
  const strokeWidth = 2.5;

  if (type === "errors") {
    return (
      <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
        <path d="M18 8L18 22" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
        <path d="M12 18L18 24L24 18" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === "speed") {
    return (
      <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
        <path d="M20 6L10 20H18L16 30L26 16H18L20 6Z" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === "cost") {
    return (
      <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
        <path d="M18 6V30" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
        <path d="M24 12C24 9.8 21.3 8 18 8C14.7 8 12 9.8 12 12C12 14.2 14.7 16 18 16C21.3 16 24 17.8 24 20C24 22.2 21.3 24 18 24C14.7 24 12 22.2 12 20" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      </svg>
    );
  }
  // foresight - eye icon
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <path d="M4 18C4 18 9 10 18 10C27 10 32 18 32 18C32 18 27 26 18 26C9 26 4 18 4 18Z" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="18" cy="18" r="4" stroke={stroke} strokeWidth={strokeWidth} />
    </svg>
  );
};

const metrics = [
  { label: "Fewer Errors", iconType: "errors" },
  { label: "Faster Processing", iconType: "speed" },
  { label: "Lower Cost", iconType: "cost" },
  { label: "Better Foresight", iconType: "foresight" },
];

export const Scene8Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background gradient shift
  const gradientProgress = interpolate(frame, [0, 20 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 12, stiffness: 80 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [40, 0]);

  // Subtitle
  const subProgress = spring({
    frame,
    fps,
    delay: 1.5 * fps,
    config: { damping: 10, stiffness: 60 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);
  const subY = interpolate(subProgress, [0, 1], [30, 0]);

  // Metric cards
  const metricStartDelay = 3 * fps;

  // Final message
  const finalProgress = spring({
    frame,
    fps,
    delay: 7 * fps,
    config: { damping: 10, stiffness: 50 },
  });
  const finalOpacity = interpolate(finalProgress, [0, 1], [0, 1]);
  const finalY = interpolate(finalProgress, [0, 1], [20, 0]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.darkCyra} ${gradientProgress * 10}%, ${colors.deepGreenCyanTurquoise} ${50 + gradientProgress * 10}%, ${colors.darkNavy} 100%)`,
        fontFamily,
      }}
    >
      {/* Main content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 200,
        }}
      >
        {/* Title */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontSize: 58,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          Artificial Intelligence ={" "}
          <span style={{ color: colors.corn }}>Measurable</span>
          <br />
          Business Impact
        </div>

        {/* Subtitle */}
        <div
          style={{
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
            fontSize: 32,
            color: `${colors.white}cc`,
            textAlign: "center",
            marginTop: 24,
          }}
        >
          Disciplined Engineering
        </div>

        {/* Metric cards row */}
        <div
          style={{
            display: "flex",
            gap: 28,
            marginTop: 60,
          }}
        >
          {metrics.map((metric, i) => {
            const cardProgress = spring({
              frame,
              fps,
              delay: metricStartDelay + i * 12,
              config: { damping: 12, stiffness: 80 },
            });
            const cardOpacity = interpolate(cardProgress, [0, 1], [0, 1]);
            const cardScale = interpolate(cardProgress, [0, 1], [0.7, 1]);
            const cardY = interpolate(cardProgress, [0, 1], [30, 0]);

            return (
              <div
                key={`metric-${i}`}
                style={{
                  opacity: cardOpacity,
                  transform: `translateY(${cardY}px) scale(${cardScale})`,
                  background: `${colors.white}15`,
                  border: `1px solid ${colors.white}30`,
                  borderRadius: 16,
                  padding: "24px 32px",
                  textAlign: "center",
                  minWidth: 180,
                }}
              >
                <div style={{ marginBottom: 8, display: "flex", justifyContent: "center" }}>
                  <MetricIcon type={metric.iconType} />
                </div>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: colors.white,
                  }}
                >
                  {metric.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Final message */}
        <div
          style={{
            opacity: finalOpacity,
            transform: `translateY(${finalY}px)`,
            marginTop: 60,
            fontSize: 28,
            color: colors.caribbeanGreen,
            fontWeight: 700,
            textAlign: "center",
            lineHeight: 1.6,
          }}
        >
          Think Systems. Think Workflow. Think Impact.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
