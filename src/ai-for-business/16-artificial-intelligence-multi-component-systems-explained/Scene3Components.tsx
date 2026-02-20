import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene3Components: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 8,
    config: { damping: 12, stiffness: 80 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  // Component 1: Simulator
  const comp1Progress = spring({
    frame,
    fps,
    delay: 1.5 * fps,
    config: { damping: 12, stiffness: 70 },
  });
  const comp1Opacity = interpolate(comp1Progress, [0, 1], [0, 1]);
  const comp1X = interpolate(comp1Progress, [0, 1], [-80, 0]);

  // Component 2: Random Survival Forest
  const comp2Progress = spring({
    frame,
    fps,
    delay: 3 * fps,
    config: { damping: 12, stiffness: 70 },
  });
  const comp2Opacity = interpolate(comp2Progress, [0, 1], [0, 1]);
  const comp2X = interpolate(comp2Progress, [0, 1], [80, 0]);

  // Merge arrows
  const arrowProgress = spring({
    frame,
    fps,
    delay: 5 * fps,
    config: { damping: 10, stiffness: 60 },
  });
  const arrowOpacity = interpolate(arrowProgress, [0, 1], [0, 1]);

  // Life score result
  const scoreProgress = spring({
    frame,
    fps,
    delay: 6.5 * fps,
    config: { damping: 10, stiffness: 60 },
  });
  const scoreOpacity = interpolate(scoreProgress, [0, 1], [0, 1]);
  const scoreScale = interpolate(scoreProgress, [0, 1], [0.6, 1]);

  // Score number count up
  const scoreValue = interpolate(
    frame,
    [6.5 * fps, 9 * fps],
    [0, 87],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: colors.magnolia,
        fontFamily,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 50,
            fontWeight: 700,
            color: colors.darkSlateGray,
          }}
        >
          <span style={{ color: colors.darkCyra }}>Simulator</span> +{" "}
          <span style={{ color: colors.viridianGreen }}>Random Survival Forest</span>
        </div>
      </div>

      {/* Component 1: Simulator */}
      <div
        style={{
          position: "absolute",
          left: 120,
          top: 240,
          width: 700,
          opacity: comp1Opacity,
          transform: `translateX(${comp1X}px)`,
          background: `linear-gradient(135deg, ${colors.darkCyra} 0%, ${colors.darkCyra}dd 100%)`,
          borderRadius: 20,
          padding: "36px 40px",
          boxShadow: `0 8px 32px ${colors.darkCyra}30`,
        }}
      >
        <div
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: `${colors.white}90`,
            textTransform: "uppercase" as const,
            letterSpacing: 2,
            marginBottom: 12,
          }}
        >
          Component One
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: colors.white,
            marginBottom: 16,
          }}
        >
          Risk Pattern Simulator
        </div>
        <div
          style={{
            fontSize: 20,
            color: `${colors.white}cc`,
            lineHeight: 1.6,
          }}
        >
          Models historical risk patterns across age and gender groups
        </div>

        {/* Mini bar chart */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 12,
            marginTop: 24,
            height: 80,
          }}
        >
          {[0.4, 0.7, 0.55, 0.85, 0.6, 0.9, 0.5].map((h, i) => {
            const barProgress = spring({
              frame,
              fps,
              delay: 2.5 * fps + i * 5,
              config: { damping: 14, stiffness: 80 },
            });
            return (
              <div
                key={`bar-${i}`}
                style={{
                  width: 32,
                  height: h * 80 * barProgress,
                  background: `${colors.white}30`,
                  borderRadius: 4,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Component 2: Random Survival Forest */}
      <div
        style={{
          position: "absolute",
          right: 120,
          top: 240,
          width: 700,
          opacity: comp2Opacity,
          transform: `translateX(${comp2X}px)`,
          background: `linear-gradient(135deg, ${colors.viridianGreen} 0%, ${colors.viridianGreen}dd 100%)`,
          borderRadius: 20,
          padding: "36px 40px",
          boxShadow: `0 8px 32px ${colors.viridianGreen}30`,
        }}
      >
        <div
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: `${colors.white}90`,
            textTransform: "uppercase" as const,
            letterSpacing: 2,
            marginBottom: 12,
          }}
        >
          Component Two
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: colors.white,
            marginBottom: 16,
          }}
        >
          Random Survival Forest
        </div>
        <div
          style={{
            fontSize: 20,
            color: `${colors.white}cc`,
            lineHeight: 1.6,
          }}
        >
          Health, behavioural, and financial data combined
        </div>

        {/* Input badges */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginTop: 24,
            flexWrap: "wrap" as const,
          }}
        >
          {["Health", "Behaviour", "Financial"].map((label, i) => {
            const badgeProgress = spring({
              frame,
              fps,
              delay: 4 * fps + i * 8,
              config: { damping: 12, stiffness: 90 },
            });
            return (
              <div
                key={`badge-${i}`}
                style={{
                  opacity: interpolate(badgeProgress, [0, 1], [0, 1]),
                  padding: "8px 20px",
                  background: `${colors.white}20`,
                  borderRadius: 20,
                  fontSize: 18,
                  fontWeight: 700,
                  color: colors.white,
                }}
              >
                {label}
              </div>
            );
          })}
        </div>
      </div>

      {/* Merge arrows */}
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
      >
        <defs>
          <marker id="merge-arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill={colors.caribbeanGreen} />
          </marker>
        </defs>
        {/* Left arrow down */}
        <line
          x1={470}
          y1={620}
          x2={860}
          y2={730}
          stroke={colors.caribbeanGreen}
          strokeWidth={3}
          opacity={arrowOpacity}
          markerEnd="url(#merge-arrow)"
          strokeDasharray="8 4"
        />
        {/* Right arrow down */}
        <line
          x1={1450}
          y1={620}
          x2={1060}
          y2={730}
          stroke={colors.caribbeanGreen}
          strokeWidth={3}
          opacity={arrowOpacity}
          markerEnd="url(#merge-arrow)"
          strokeDasharray="8 4"
        />
      </svg>

      {/* Life Score Result */}
      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: scoreOpacity,
          transform: `scale(${scoreScale})`,
        }}
      >
        <div
          style={{
            background: colors.caribbeanGreen,
            borderRadius: 20,
            padding: "28px 60px",
            display: "flex",
            alignItems: "center",
            gap: 32,
            boxShadow: `0 8px 40px ${colors.caribbeanGreen}40`,
          }}
        >
          <div>
            <div style={{ fontSize: 16, color: `${colors.white}90`, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 2 }}>
              Standardised Life Score
            </div>
            <div style={{ fontSize: 56, fontWeight: 700, color: colors.white, fontVariantNumeric: "tabular-nums" }}>
              {Math.floor(scoreValue)}
            </div>
          </div>
          <div
            style={{
              width: 2,
              height: 60,
              background: `${colors.white}40`,
            }}
          />
          <div>
            <div style={{ fontSize: 16, color: `${colors.white}90`, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 2 }}>
              Risk Class
            </div>
            <div style={{ fontSize: 36, fontWeight: 700, color: colors.white }}>
              Preferred
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
