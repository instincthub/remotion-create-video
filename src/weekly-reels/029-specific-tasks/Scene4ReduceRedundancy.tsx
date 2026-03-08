import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene4ReduceRedundancy: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Venn diagram (0-750 frames / 25s)
  // Phase 2: Flowchart (750+ frames)
  const phase2Start = 750;

  const phase1Opacity = interpolate(frame, [phase2Start - 30, phase2Start], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const phase2Entrance = spring({
    frame: Math.max(0, frame - phase2Start),
    fps,
    delay: 5,
    config: { damping: 200 },
  });

  const vennEntrance = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 14, stiffness: 60 },
  });

  const titleProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 200 },
  });

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

      {/* Phase 1: Venn diagram */}
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
          opacity: phase1Opacity,
        }}
      >
        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: interpolate(titleProgress, [0, 1], [0, 1]),
            lineHeight: 1.2,
          }}
        >
          Know Your <span style={{ color: colors.darkCyra }}>Roles</span>
        </div>

        <svg
          width="450"
          height="320"
          viewBox="0 0 450 320"
          fill="none"
          style={{
            transform: `scale(${interpolate(vennEntrance, [0, 1], [0.5, 1])})`,
            opacity: interpolate(vennEntrance, [0, 1], [0, 1]),
          }}
        >
          {/* AI circle */}
          <circle cx="165" cy="160" r="120" fill={`${colors.tiffanyBlue}08`} stroke={colors.tiffanyBlue} strokeWidth={2} />
          <text x="110" y="120" fill={colors.tiffanyBlue} fontSize="18" fontWeight="700" fontFamily={fontFamily}>AI Tasks</text>
          <text x="80" y="150" fill={colors.chineseSilver} fontSize="14" fontFamily={fontFamily}>Boilerplate</text>
          <text x="80" y="172" fill={colors.chineseSilver} fontSize="14" fontFamily={fontFamily}>Tests</text>
          <text x="80" y="194" fill={colors.chineseSilver} fontSize="14" fontFamily={fontFamily}>Docs</text>

          {/* Human circle */}
          <circle cx="285" cy="160" r="120" fill={`${colors.turkishRose}08`} stroke={colors.turkishRose} strokeWidth={2} />
          <text x="300" y="120" fill={colors.turkishRose} fontSize="18" fontWeight="700" fontFamily={fontFamily}>Your Tasks</text>
          <text x="310" y="150" fill={colors.chineseSilver} fontSize="14" fontFamily={fontFamily}>Architecture</text>
          <text x="310" y="172" fill={colors.chineseSilver} fontSize="14" fontFamily={fontFamily}>Design System</text>
          <text x="310" y="194" fill={colors.chineseSilver} fontSize="14" fontFamily={fontFamily}>Domain Logic</text>

          {/* Overlap label */}
          <text x="186" y="250" fill={colors.darkCyra} fontSize="16" fontWeight="700" fontFamily={fontFamily} textAnchor="middle">Collaboration</text>
          <text x="186" y="270" fill={colors.darkCyra} fontSize="16" fontWeight="700" fontFamily={fontFamily} textAnchor="middle">Zone</text>
        </svg>
      </AbsoluteFill>

      {/* Phase 2: Flowchart */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 300,
          paddingLeft: 50,
          paddingRight: 50,
          gap: 30,
          opacity: interpolate(phase2Entrance, [0, 1], [0, 1]),
        }}
      >
        <div
          style={{
            fontSize: 44,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          Reduce <span style={{ color: colors.caribbeanGreen }}>Redundancy</span>
        </div>

        {/* Flow: Your Part → Engineer AI → Powerful Results */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          {[
            { label: "Your Part", color: colors.turkishRose },
            { label: "Engineer AI", color: colors.tiffanyBlue },
            { label: "Powerful Results", color: colors.caribbeanGreen },
          ].map((step, i) => {
            const stepEntrance = spring({
              frame: Math.max(0, frame - phase2Start - 10 - i * 20),
              fps,
              config: { damping: 14, stiffness: 80 },
            });

            return (
              <div key={step.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                <div
                  style={{
                    padding: "16px 40px",
                    borderRadius: 14,
                    backgroundColor: `${step.color}12`,
                    border: `2px solid ${step.color}`,
                    fontSize: 24,
                    fontWeight: 700,
                    color: step.color,
                    opacity: interpolate(stepEntrance, [0, 1], [0, 1]),
                    transform: `scale(${interpolate(stepEntrance, [0, 1], [0.8, 1])})`,
                  }}
                >
                  {step.label}
                </div>
                {i < 2 && (
                  <svg width="24" height="30" viewBox="0 0 24 30" fill="none" style={{ opacity: interpolate(stepEntrance, [0, 1], [0, 0.5]) }}>
                    <path d="M12 4 L12 22 M6 16 L12 22 L18 16" stroke={colors.chineseSilver} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            );
          })}
        </div>

        <div
          style={{
            fontSize: 24,
            color: colors.chineseSilver,
            textAlign: "center",
            opacity: interpolate(
              spring({ frame: Math.max(0, frame - phase2Start - 80), fps, config: { damping: 200 } }),
              [0, 1],
              [0, 1]
            ),
          }}
        >
          Enjoy the collaboration
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
