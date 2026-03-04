import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Step in the research pipeline
const ResearchStep: React.FC<{
  icon: "watch" | "research" | "understand" | "apply";
  label: string;
  description: string;
  delay: number;
  index: number;
}> = ({ icon, label, description, delay, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, delay, config: { damping: 200 } });
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const xOffset = interpolate(entrance, [0, 1], [40, 0]);

  const iconPaths: Record<string, string> = {
    watch: "M20 8 L20 20 L28 24 M20 4 A16 16 0 1 0 36 20 A16 16 0 1 0 20 4",
    research: "M17 17 A9 9 0 1 0 17 17.01 M24 24 L33 33",
    understand: "M20 6 L20 4 M20 36 L20 38 M6 20 L4 20 M36 20 L38 20 M12 8 Q20 20 28 8 M20 14 Q20 28 20 28 M14 22 L20 28 L26 22",
    apply: "M10 8 L30 8 L30 32 L10 32 Z M14 14 L26 14 M14 20 L26 20 M14 26 L22 26",
  };

  const iconColors: Record<string, string> = {
    watch: colors.tiffanyBlue,
    research: colors.corn,
    understand: colors.caribbeanGreen,
    apply: colors.limeGreen,
  };

  const pulse = Math.sin(frame * 0.06 + index * 2) * 0.06 + 1;

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${xOffset}px)`,
        display: "flex",
        alignItems: "center",
        gap: 18,
        width: "100%",
        maxWidth: 700,
      }}
    >
      {/* Step number + icon */}
      <div
        style={{
          width: 68,
          height: 68,
          borderRadius: 18,
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

      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: colors.white,
            lineHeight: 1.2,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: 18,
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

// Connector line between steps
const StepConnector: React.FC<{ delay: number }> = ({ delay }) => {
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
        height: 24,
        marginLeft: 33,
        backgroundColor: colors.tiffanyBlue,
        opacity: progress * 0.3,
      }}
    />
  );
};

export const Scene6Research: React.FC = () => {
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

  // "What will YOU build?" text at end
  const buildDelay = 14 * fps;
  const buildProgress = spring({
    frame,
    fps,
    delay: buildDelay,
    config: { damping: 14, stiffness: 80 },
  });
  const buildOpacity = interpolate(buildProgress, [0, 1], [0, 1]);
  const buildScale = interpolate(buildProgress, [0, 1], [0.7, 1]);

  // Fade pipeline to make room for build question
  const pipelineOpacity = interpolate(
    frame,
    [buildDelay - 20, buildDelay],
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
        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            lineHeight: 1.3,
            marginBottom: 36,
          }}
        >
          Do Your
          <br />
          <span style={{ color: colors.corn }}>Research</span>
        </div>

        <ResearchStep
          icon="watch"
          label="Learn the Tips"
          description="Absorb key concepts first"
          delay={15}
          index={0}
        />
        <StepConnector delay={30} />
        <ResearchStep
          icon="research"
          label="Research Further"
          description="Go deeper on each topic"
          delay={40}
          index={1}
        />
        <StepConnector delay={55} />
        <ResearchStep
          icon="understand"
          label="Gain Understanding"
          description="Build clear mental models"
          delay={65}
          index={2}
        />
        <StepConnector delay={80} />
        <ResearchStep
          icon="apply"
          label="Apply Knowledge"
          description="Put it into practice"
          delay={90}
          index={3}
        />
      </AbsoluteFill>

      {/* "What will YOU build?" section */}
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
          opacity: buildOpacity,
        }}
      >
        {/* Lightbulb icon */}
        <div style={{ transform: `scale(${buildScale})` }}>
          <svg width="160" height="200" viewBox="0 0 160 200" fill="none">
            {/* Bulb */}
            <circle
              cx="80"
              cy="75"
              r="45"
              fill={`${colors.corn}15`}
              stroke={colors.corn}
              strokeWidth={2.5}
            />
            {/* Filament */}
            <path
              d="M65 75 Q72 60 80 75 Q88 90 95 75"
              stroke={colors.corn}
              strokeWidth={2}
              fill="none"
            />
            {/* Base */}
            <rect x="65" y="120" width="30" height="20" rx="4" fill={`${colors.corn}30`} stroke={colors.corn} strokeWidth={1.5} />
            <line x1="68" y1="127" x2="92" y2="127" stroke={colors.corn} strokeWidth={1} opacity={0.5} />
            <line x1="68" y1="133" x2="92" y2="133" stroke={colors.corn} strokeWidth={1} opacity={0.5} />

            {/* Rays */}
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
              const x1 = 80 + Math.cos(angle) * 55;
              const y1 = 75 + Math.sin(angle) * 55;
              const x2 = 80 + Math.cos(angle) * 70;
              const y2 = 75 + Math.sin(angle) * 70;
              const rayOpacity = Math.sin(frame * 0.1 + i) * 0.2 + 0.4;
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={colors.corn}
                  strokeWidth={2}
                  strokeLinecap="round"
                  opacity={rayOpacity}
                />
              );
            })}
          </svg>
        </div>

        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            transform: `scale(${buildScale})`,
            lineHeight: 1.2,
          }}
        >
          What Will
          <br />
          <span style={{ color: colors.tiffanyBlue }}>YOU</span> Build?
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
