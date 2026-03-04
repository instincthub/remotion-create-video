import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Step in the self-learning pipeline
const PipelineStep: React.FC<{
  icon: "report" | "update" | "flag";
  label: string;
  description: string;
  delay: number;
  index: number;
}> = ({ icon, label, description, delay, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, delay, config: { damping: 14, stiffness: 80 } });
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const xOffset = interpolate(entrance, [0, 1], [40, 0]);

  const iconPaths: Record<string, string> = {
    report: "M20 5 L20 30 M12 30 L28 30 M15 15 Q20 10 25 15 M20 22 L20 22.5",
    update: "M20 5 L20 35 M20 5 L28 13 M20 5 L12 13 M8 20 Q8 35 20 35 Q32 35 32 20",
    flag: "M10 5 L10 35 M10 5 L30 5 L25 15 L30 25 L10 25",
  };

  const iconColors: Record<string, string> = {
    report: colors.corn,
    update: colors.caribbeanGreen,
    flag: colors.limeGreen,
  };

  const pulse = Math.sin(frame * 0.06 + index * 2) * 0.08 + 1;

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${xOffset}px)`,
        display: "flex",
        alignItems: "center",
        gap: 20,
        width: "100%",
        maxWidth: 700,
      }}
    >
      {/* Step number + icon */}
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: 20,
          background: `${iconColors[icon]}10`,
          border: `1.5px solid ${iconColors[icon]}40`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transform: `scale(${pulse})`,
        }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path
            d={iconPaths[icon]}
            stroke={iconColors[icon]}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>

      {/* Label & description */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: colors.white,
            lineHeight: 1.2,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: 20,
            fontWeight: 400,
            color: colors.rhythm,
            lineHeight: 1.4,
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
};

// Connecting line between steps
const Connector: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();

  const progress = interpolate(
    frame - delay,
    [0, 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        width: 2,
        height: 30,
        marginLeft: 35,
        backgroundColor: colors.tiffanyBlue,
        opacity: progress * 0.3,
      }}
    />
  );
};

export const Scene8SelfLearning: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 200 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  // Closing text
  const closingDelay = 25 * fps;
  const closingProgress = spring({
    frame,
    fps,
    delay: closingDelay,
    config: { damping: 200 },
  });
  const closingOpacity = interpolate(closingProgress, [0, 1], [0, 1]);
  const closingScale = interpolate(closingProgress, [0, 1], [0.8, 1]);

  // Shield at the end
  const shieldDelay = 28 * fps;
  const shieldEntrance = spring({
    frame,
    fps,
    delay: shieldDelay,
    config: { damping: 14, stiffness: 80 },
  });
  const shieldOpacity = interpolate(shieldEntrance, [0, 1], [0, 1]);
  const shieldScale = interpolate(shieldEntrance, [0, 1], [0, 1]);
  const shieldPulse = Math.sin(frame * 0.06) * 0.05 + 1;

  // Show pipeline first, then fade to closing
  const pipelineOpacity = interpolate(
    frame,
    [closingDelay - 30, closingDelay],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${colors.gunmetal}, ${colors.darkSlateGray})`,
        fontFamily,
      }}
    >
      <AbsoluteFill style={{ opacity: 0.03 }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`h-${i}`}
            style={{
              position: "absolute",
              top: i * 96,
              left: 0,
              width: "100%",
              height: 1,
              backgroundColor: colors.tiffanyBlue,
            }}
          />
        ))}
      </AbsoluteFill>

      {/* Pipeline section */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 300,
          paddingLeft: 60,
          paddingRight: 60,
          gap: 0,
          opacity: pipelineOpacity,
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            lineHeight: 1.3,
            marginBottom: 40,
          }}
        >
          The Model
          <br />
          <span style={{ color: colors.caribbeanGreen }}>Updates Itself</span>
        </div>

        <PipelineStep
          icon="report"
          label="Users Report"
          description="New spam words flagged"
          delay={20}
          index={0}
        />
        <Connector delay={35} />
        <PipelineStep
          icon="update"
          label="Model Updates"
          description="Learns new patterns"
          delay={50}
          index={1}
        />
        <Connector delay={65} />
        <PipelineStep
          icon="flag"
          label="Auto-Flagged"
          description="Spam blocked instantly"
          delay={80}
          index={2}
        />
      </AbsoluteFill>

      {/* Closing section */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 300,
          paddingLeft: 50,
          paddingRight: 50,
          gap: 24,
          opacity: closingOpacity,
        }}
      >
        {/* Shield icon */}
        <div
          style={{
            opacity: shieldOpacity,
            transform: `scale(${shieldScale * shieldPulse})`,
          }}
        >
          <svg width="180" height="200" viewBox="0 0 180 200" fill="none">
            <path
              d="M90 10 L20 50 L20 100 Q20 160 90 190 Q160 160 160 100 L160 50 Z"
              fill={`${colors.caribbeanGreen}12`}
              stroke={colors.caribbeanGreen}
              strokeWidth={2.5}
            />
            {/* Checkmark */}
            <path
              d="M60 105 L80 125 L120 80"
              stroke={colors.caribbeanGreen}
              strokeWidth={4}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Glow ring */}
            <path
              d="M90 0 L10 45 L10 105 Q10 170 90 200 Q170 170 170 105 L170 45 Z"
              fill="none"
              stroke={colors.caribbeanGreen}
              strokeWidth={1}
              opacity={Math.sin(frame * 0.06) * 0.2 + 0.15}
              strokeDasharray="8 6"
            />
          </svg>
        </div>

        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            transform: `scale(${closingScale})`,
            lineHeight: 1.2,
          }}
        >
          That's How
          <br />
          <span style={{ color: colors.tiffanyBlue }}>ML Works</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
