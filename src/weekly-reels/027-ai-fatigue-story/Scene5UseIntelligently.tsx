import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene5UseIntelligently: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Split screen (0-600 frames / 20s)
  // Phase 2: Lightbulb message (600+ frames)
  const phase2Start = 600;

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

  const titleProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 200 },
  });

  // Lightbulb glow
  const glowRadius = Math.sin(frame * 0.05) * 5 + 35;

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

      {/* Phase 1: Split screen */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 300,
          paddingLeft: 40,
          paddingRight: 40,
          gap: 30,
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
          Use AI
          <br />
          <span style={{ color: colors.tiffanyBlue }}>Intelligently</span>
        </div>

        <div
          style={{
            display: "flex",
            gap: 20,
            width: "100%",
            maxWidth: 600,
          }}
        >
          {/* Carried Away side */}
          <div
            style={{
              flex: 1,
              padding: 20,
              borderRadius: 16,
              backgroundColor: `${colors.oldRose}08`,
              border: `1px solid ${colors.oldRose}20`,
              opacity: interpolate(frame, [200, 400], [1, 0.3], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: colors.oldRose,
                marginBottom: 16,
                textAlign: "center",
              }}
            >
              Carried Away
            </div>
            {/* Chaotic icons */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
              {[0, 1, 2, 3, 4, 5].map((i) => {
                const wobble = Math.sin(frame * 0.1 + i) * 5;
                return (
                  <svg key={i} width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ transform: `rotate(${wobble}deg)` }}>
                    <rect x="4" y="4" width="24" height="24" rx="4" stroke={colors.oldRose} strokeWidth={1.5} opacity={0.4} />
                  </svg>
                );
              })}
            </div>
          </div>

          {/* Intelligent Use side */}
          <div
            style={{
              flex: 1,
              padding: 20,
              borderRadius: 16,
              backgroundColor: `${colors.tiffanyBlue}08`,
              border: `1px solid ${colors.tiffanyBlue}30`,
              opacity: interpolate(frame, [200, 400], [0.5, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: colors.tiffanyBlue,
                marginBottom: 16,
                textAlign: "center",
              }}
            >
              Intelligent Use
            </div>
            {/* Organized icons */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
              {[0, 1, 2].map((i) => (
                <svg key={i} width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect x="4" y="4" width="24" height="24" rx="4" stroke={colors.tiffanyBlue} strokeWidth={1.5} opacity={0.6} />
                  <path d="M10 16 L14 20 L22 12" stroke={colors.tiffanyBlue} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" opacity={0.6} />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* Phase 2: Lightbulb message */}
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
          opacity: interpolate(phase2Entrance, [0, 1], [0, 1]),
        }}
      >
        {/* Lightbulb */}
        <svg width="160" height="200" viewBox="0 0 160 200" fill="none">
          <circle cx="80" cy="80" r={glowRadius} fill={`${colors.corn}06`} />
          <circle cx="80" cy="80" r="30" fill={`${colors.corn}15`} stroke={colors.corn} strokeWidth={2} />
          <path d="M70 80 Q75 72 80 80 Q85 88 90 80" stroke={colors.corn} strokeWidth={2} fill="none" />
          {/* Bulb base */}
          <rect x="72" y="110" width="16" height="8" rx="2" fill={colors.chineseSilver} opacity={0.4} />
          <rect x="74" y="118" width="12" height="6" rx="2" fill={colors.chineseSilver} opacity={0.3} />
          {/* Rays */}
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
            const x1 = 80 + Math.cos(angle) * 38;
            const y1 = 80 + Math.sin(angle) * 38;
            const x2 = 80 + Math.cos(angle) * 52;
            const y2 = 80 + Math.sin(angle) * 52;
            const rayOpacity = Math.sin(frame * 0.08 + i) * 0.3 + 0.4;
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

        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          Don't Lose the
          <br />
          <span style={{ color: colors.tiffanyBlue }}>Essence of Productivity</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
