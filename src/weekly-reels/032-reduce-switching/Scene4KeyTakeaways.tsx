import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene4KeyTakeaways: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: AI assists thinking (0-900 frames / 30s)
  // Phase 2: Fulfillment > Productivity (900+ frames)
  const phase2Start = 900;

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

  // Phase 1 animations
  const titleProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 200 },
  });

  const strikeProgress = interpolate(frame, [200, 280], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 2 gauge animations
  const gauge1Fill = spring({
    frame: Math.max(0, frame - phase2Start - 20),
    fps,
    config: { damping: 20, stiffness: 40 },
  });

  const gauge2Fill = spring({
    frame: Math.max(0, frame - phase2Start - 60),
    fps,
    config: { damping: 20, stiffness: 40 },
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

      {/* Phase 1: AI assists thinking */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 300,
          paddingLeft: 50,
          paddingRight: 50,
          gap: 36,
          opacity: phase1Opacity,
        }}
      >
        {/* Brain + AI chip */}
        <div style={{ display: "flex", gap: 30, alignItems: "center" }}>
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            <path
              d="M50 15 Q30 15 25 35 Q12 32 12 50 Q6 58 10 68 Q8 80 20 85 Q25 95 50 95 Q75 95 80 85 Q92 80 90 68 Q94 58 88 50 Q88 32 75 35 Q70 15 50 15Z"
              fill={`${colors.tiffanyBlue}10`}
              stroke={colors.tiffanyBlue}
              strokeWidth={2.5}
            />
          </svg>

          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M8 12 L16 12 M12 8 L16 12 L12 16" stroke={colors.chineseSilver} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            <rect x="20" y="20" width="60" height="60" rx="12" stroke={colors.darkCyra} strokeWidth={2.5} fill={`${colors.darkCyra}10`} />
            <circle cx="38" cy="45" r="5" fill={colors.darkCyra} />
            <circle cx="62" cy="45" r="5" fill={colors.darkCyra} />
            <path d="M38 62 Q50 70 62 62" stroke={colors.darkCyra} strokeWidth={2} fill="none" strokeLinecap="round" />
            {/* Circuit lines */}
            <line x1="20" y1="50" x2="10" y2="50" stroke={colors.darkCyra} strokeWidth={1.5} />
            <line x1="80" y1="50" x2="90" y2="50" stroke={colors.darkCyra} strokeWidth={1.5} />
            <line x1="50" y1="20" x2="50" y2="10" stroke={colors.darkCyra} strokeWidth={1.5} />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 42,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: interpolate(titleProgress, [0, 1], [0, 1]),
            lineHeight: 1.3,
          }}
        >
          AI Should{" "}
          <span style={{ color: colors.tiffanyBlue }}>Assist</span>
          <br />
          Thinking
        </div>

        {/* Strikethrough "Replace Thinking" */}
        <div
          style={{
            position: "relative",
            display: "inline-block",
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: colors.oldRose,
              opacity: 0.6,
            }}
          >
            Not Replace It
          </div>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              width: `${strikeProgress * 100}%`,
              height: 3,
              backgroundColor: colors.oldRose,
              transform: "translateY(-50%)",
            }}
          />
          {/* X mark */}
          {strikeProgress > 0.8 && (
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              style={{ position: "absolute", right: -44, top: -2 }}
            >
              <circle cx="18" cy="18" r="14" fill={`${colors.oldRose}20`} stroke={colors.oldRose} strokeWidth={2} />
              <path d="M12 12 L24 24 M24 12 L12 24" stroke={colors.oldRose} strokeWidth={2.5} strokeLinecap="round" />
            </svg>
          )}
        </div>
      </AbsoluteFill>

      {/* Phase 2: Fulfillment > Productivity */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 300,
          paddingLeft: 50,
          paddingRight: 50,
          gap: 36,
          opacity: interpolate(phase2Entrance, [0, 1], [0, 1]),
        }}
      >
        <div
          style={{
            fontSize: 42,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          <span style={{ color: colors.darkCyra }}>Fulfillment</span> {">"}{" "}
          <span style={{ color: colors.chineseSilver, opacity: 0.5 }}>Productivity</span>
        </div>

        {/* Two gauges */}
        <div style={{ display: "flex", gap: 40, alignItems: "flex-end" }}>
          {/* Productive gauge */}
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: 60,
                height: 200,
                borderRadius: 12,
                backgroundColor: `${colors.caribbeanGreen}10`,
                border: `1.5px solid ${colors.caribbeanGreen}25`,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: `${interpolate(gauge1Fill, [0, 1], [0, 90])}%`,
                  backgroundColor: colors.caribbeanGreen,
                  opacity: 0.4,
                  borderRadius: "0 0 10px 10px",
                }}
              />
              {/* Dim overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: colors.gunmetal,
                  opacity: 0.5,
                  borderRadius: 10,
                }}
              />
            </div>
            <div style={{ fontSize: 16, color: colors.rhythm, marginTop: 8 }}>Productive</div>
          </div>

          {/* Fulfilled gauge */}
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: 60,
                height: 200,
                borderRadius: 12,
                backgroundColor: `${colors.darkCyra}10`,
                border: `1.5px solid ${colors.darkCyra}40`,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                boxShadow: `0 0 20px ${colors.darkCyra}20`,
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: `${interpolate(gauge2Fill, [0, 1], [0, 95])}%`,
                  background: `linear-gradient(180deg, ${colors.darkCyra}, ${colors.tiffanyBlue})`,
                  opacity: 0.8,
                  borderRadius: "0 0 10px 10px",
                }}
              />
            </div>
            <div style={{ fontSize: 16, color: colors.darkCyra, fontWeight: 700, marginTop: 8 }}>Fulfilled</div>
          </div>
        </div>

        <div
          style={{
            fontSize: 24,
            color: colors.chineseSilver,
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          Build better systems without burning out
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
