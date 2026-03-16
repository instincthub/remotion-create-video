import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const GradCapIcon: React.FC<{ opacity: number }> = ({ opacity }) => (
  <div
    style={{
      position: "absolute",
      top: 80,
      left: "50%",
      transform: "translateX(-50%)",
      opacity,
    }}
  >
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
      {/* Cap board */}
      <polygon
        points="60,18 110,42 60,66 10,42"
        fill={colors.chineseSilver}
        opacity={0.6}
      />
      {/* Cap crown */}
      <rect x="48" y="42" width="24" height="36" rx="4" fill={colors.chineseSilver} opacity={0.5} />
      {/* Tassel */}
      <line x1="110" y1="42" x2="110" y2="72" stroke={colors.chineseSilver} strokeWidth="3" opacity={0.5} />
      <circle cx="110" cy="76" r="5" fill={colors.chineseSilver} opacity={0.5} />
    </svg>
  </div>
);

const TextLine: React.FC<{
  text: string;
  color: string;
  fontSize: number;
  fontWeight: number;
  frame: number;
  fps: number;
  startFrame: number;
  glow?: boolean;
}> = ({ text, color, fontSize, fontWeight, frame, fps, startFrame, glow = false }) => {
  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 18, stiffness: 90 },
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const y = interpolate(progress, [0, 1], [40, 0]);

  const pulseGlow = glow
    ? `0 0 ${20 + Math.sin(frame * 0.08) * 14}px ${colors.oldRose}80`
    : "none";

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        fontSize,
        fontWeight,
        color,
        fontFamily,
        lineHeight: 1.2,
        textShadow: pulseGlow,
      }}
    >
      {text}
    </div>
  );
};

export const Scene1OpeningChallenge: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cap icon: fades in at 0s, fades out around 8s
  const capOpacity = interpolate(frame, [0, fps * 1, fps * 7, fps * 9], [0, 0.7, 0.7, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Screen flash on line 3 appearance (around 4s mark)
  const flashOpacity = interpolate(
    frame,
    [fps * 4, fps * 4 + 3, fps * 4 + 8, fps * 4 + 15],
    [0, 0.35, 0.15, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Watermark
  const watermarkOpacity = interpolate(frame, [fps * 1, fps * 2], [0, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: colors.gunmetal, fontFamily }}>
      {/* Warm glow from below */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 110%, #3A2820 0%, transparent 60%)`,
          pointerEvents: "none",
        }}
      />

      {/* Graduation cap icon */}
      <GradCapIcon opacity={capOpacity} />

      {/* Three text lines */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 220,
          paddingLeft: 80,
          paddingRight: 80,
          gap: 28,
        }}
      >
        <TextLine
          text="4 years of study."
          color={colors.white}
          fontSize={72}
          fontWeight={700}
          frame={frame}
          fps={fps}
          startFrame={fps * 1}
        />
        <TextLine
          text="Mountains of debt."
          color={colors.white}
          fontSize={72}
          fontWeight={700}
          frame={frame}
          fps={fps}
          startFrame={fps * 3}
        />
        <TextLine
          text="AI just took the job."
          color={colors.oldRose}
          fontSize={80}
          fontWeight={900}
          frame={frame}
          fps={fps}
          startFrame={fps * 5}
          glow
        />
      </AbsoluteFill>

      {/* Screen flash overlay */}
      <AbsoluteFill
        style={{
          background: colors.white,
          opacity: flashOpacity,
          pointerEvents: "none",
        }}
      />

      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          right: 80,
          opacity: watermarkOpacity,
          fontFamily,
          fontSize: 14,
          fontWeight: 700,
          color: colors.white,
          letterSpacing: 1,
        }}
      >
        InstinctHub
      </div>
    </AbsoluteFill>
  );
};
