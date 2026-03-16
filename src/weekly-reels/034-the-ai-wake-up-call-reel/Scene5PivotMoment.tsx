import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene5PivotMoment: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: STOP PANICKING (0–9s)
  const phase1In = spring({ frame, fps, config: { damping: 12, stiffness: 60 } });
  const phase1Out = spring({
    frame: frame - Math.round(fps * 9),
    fps,
    config: { damping: 200 },
  });
  const phase1Opacity = interpolate(phase1Out, [0, 0.5], [1, 0], {
    extrapolateRight: "clamp",
  });

  // Phase 2: START PREPARING (9–18s)
  const phase2In = spring({
    frame: frame - Math.round(fps * 9),
    fps,
    config: { damping: 12, stiffness: 60 },
  });

  // Background transitions from gunmetal to darkCyra-tinted
  const bgProgress = interpolate(frame, [Math.round(fps * 8), Math.round(fps * 12)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bgR1 = parseInt(colors.gunmetal.slice(1, 3), 16);
  const bgG1 = parseInt(colors.gunmetal.slice(3, 5), 16);
  const bgB1 = parseInt(colors.gunmetal.slice(5, 7), 16);
  const bgR2 = parseInt(colors.darkCyra.slice(1, 3), 16);
  const bgG2 = parseInt(colors.darkCyra.slice(3, 5), 16);
  const bgB2 = parseInt(colors.darkCyra.slice(5, 7), 16);
  const mixR = Math.round(bgR1 + (bgR2 - bgR1) * bgProgress * 0.3);
  const mixG = Math.round(bgG1 + (bgG2 - bgG1) * bgProgress * 0.3);
  const mixB = Math.round(bgB1 + (bgB2 - bgB1) * bgProgress * 0.3);
  const bgColor = `rgb(${mixR},${mixG},${mixB})`;

  // Pulse for text
  const pulse1 = 1 + Math.sin(frame * 0.06) * 0.03;
  const pulse2 = 1 + Math.sin(frame * 0.06 + Math.PI) * 0.03;

  return (
    <AbsoluteFill style={{ background: bgColor, fontFamily }}>
      {/* Subtle radial glow center */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.darkCyra}15 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Phase 1: STOP PANICKING */}
      <AbsoluteFill
        style={{
          opacity: phase1Opacity,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 80px 320px",
          pointerEvents: phase1Out > 0.5 ? "none" : "auto",
        }}
      >
        <div
          style={{
            opacity: interpolate(phase1In, [0, 1], [0, 1]),
            transform: `scale(${interpolate(phase1In, [0, 0.5, 1], [0.6, 1.1, 1])} ) scale(${pulse1})`,
            fontSize: 100,
            fontWeight: 900,
            color: colors.oldRose,
            textAlign: "center",
            lineHeight: 1.1,
            letterSpacing: -2,
            textShadow: `0 0 60px ${colors.oldRose}50`,
          }}
        >
          STOP
          <br />
          PANICKING.
        </div>
      </AbsoluteFill>

      {/* Phase 2: START PREPARING */}
      <AbsoluteFill
        style={{
          opacity: interpolate(phase2In, [0, 1], [0, 1]),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 80px 320px",
          pointerEvents: phase2In < 0.1 ? "none" : "auto",
        }}
      >
        <div
          style={{
            opacity: interpolate(phase2In, [0, 1], [0, 1]),
            transform: `scale(${interpolate(phase2In, [0, 0.5, 1], [0.6, 1.1, 1])} ) scale(${pulse2})`,
            fontSize: 100,
            fontWeight: 900,
            color: colors.caribbeanGreen,
            textAlign: "center",
            lineHeight: 1.1,
            letterSpacing: -2,
            textShadow: `0 0 60px ${colors.caribbeanGreen}50`,
          }}
        >
          START
          <br />
          PREPARING.
        </div>
      </AbsoluteFill>

      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          bottom: 320,
          right: 80,
          fontSize: 15,
          fontWeight: 700,
          color: `${colors.white}40`,
          letterSpacing: 1,
        }}
      >
        InstinctHub
      </div>
    </AbsoluteFill>
  );
};
