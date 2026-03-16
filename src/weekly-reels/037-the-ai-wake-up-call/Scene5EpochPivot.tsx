import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const LETTERS = [
  { char: "E", color: colors.darkCyra },
  { char: "P", color: colors.tiffanyBlue },
  { char: "O", color: colors.caribbeanGreen },
  { char: "C", color: colors.turkishRose },
  { char: "H", color: colors.viridianGreen },
];

const EpochLetter: React.FC<{
  char: string;
  color: string;
  frame: number;
  fps: number;
  startFrame: number;
  allVisible: boolean;
}> = ({ char, color, frame, fps, startFrame, allVisible }) => {
  const dropProgress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 10, stiffness: 120, mass: 0.8 },
  });

  const opacity = interpolate(dropProgress, [0, 0.2, 1], [0, 1, 1]);
  const y = interpolate(dropProgress, [0, 1], [-200, 0]);
  const brightnessVal = allVisible ? 1.35 : 1;

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        fontSize: 200,
        fontWeight: 900,
        color,
        fontFamily,
        lineHeight: 1,
        filter: `brightness(${brightnessVal})`,
      }}
    >
      {char}
    </div>
  );
};

export const Scene5EpochPivot: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const LETTER_STARTS = LETTERS.map((_, i) => fps * (2 + i * 0.8));
  const allVisible = frame >= LETTER_STARTS[LETTERS.length - 1] + fps * 0.8;

  // Background overlay transition
  const bgProgress = interpolate(frame, [0, fps * 5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bgOpacityOverlay = interpolate(bgProgress, [0, 1], [0, 0.7]);

  // Pulsing warm glow
  const glowPulse = interpolate(
    frame % (fps * 2),
    [0, fps, fps * 2],
    [0.3, 0.7, 0.3],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // MIT Sloan at ~12s
  const mitProgress = spring({
    frame: frame - fps * 12,
    fps,
    config: { damping: 20, stiffness: 80 },
  });

  // "Five human capabilities" at ~16s
  const subtextProgress = spring({
    frame: frame - fps * 16,
    fps,
    config: { damping: 18, stiffness: 70 },
  });
  const subtextOpacity = interpolate(subtextProgress, [0, 1], [0, 1]);
  const subtextY = interpolate(subtextProgress, [0, 1], [24, 0]);

  // "Every single one" at ~22s
  const growthProgress = spring({
    frame: frame - fps * 22,
    fps,
    config: { damping: 16, stiffness: 65 },
  });
  const growthScale = interpolate(growthProgress, [0, 1], [0.85, 1]);
  const growthOpacity = interpolate(growthProgress, [0, 1], [0, 1]);

  // Watermark
  const watermarkOpacity = interpolate(frame, [fps * 1, fps * 2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: colors.gunmetal, fontFamily }}>
      {/* Color tint overlay */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(135deg, ${colors.darkCyra}40 0%, ${colors.turkishRose}30 100%)`,
          opacity: bgOpacityOverlay,
          pointerEvents: "none",
        }}
      />

      {/* Pulsing glow behind letters */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 42%, ${colors.darkCyra}60 0%, transparent 55%)`,
          opacity: glowPulse,
          pointerEvents: "none",
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 220,
          gap: 20,
        }}
      >
        {/* EPOCH letters */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
          }}
        >
          {LETTERS.map((letter, i) => (
            <EpochLetter
              key={letter.char}
              char={letter.char}
              color={letter.color}
              frame={frame}
              fps={fps}
              startFrame={LETTER_STARTS[i]}
              allVisible={allVisible}
            />
          ))}
        </div>

        {/* MIT Sloan label */}
        <div
          style={{
            opacity: interpolate(mitProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(mitProgress, [0, 1], [-16, 0])}px)`,
            fontSize: 24,
            fontWeight: 400,
            fontStyle: "italic",
            color: colors.rhythm,
            fontFamily,
            letterSpacing: 1,
          }}
        >
          MIT Sloan School of Management
        </div>

        {/* Subtext */}
        <div
          style={{
            opacity: subtextOpacity,
            transform: `translateY(${subtextY}px)`,
            fontSize: 30,
            fontWeight: 400,
            color: colors.white,
            fontFamily,
            textAlign: "center",
          }}
        >
          Five human capabilities AI cannot replicate.
        </div>

        {/* Growth text */}
        <div
          style={{
            opacity: growthOpacity,
            transform: `scale(${growthScale})`,
            fontSize: 26,
            fontWeight: 700,
            color: colors.caribbeanGreen,
            fontFamily,
            textAlign: "center",
            filter: `drop-shadow(0 0 12px ${colors.caribbeanGreen}80)`,
          }}
        >
          Every single one: associated with GROWTH, not decline.
        </div>
      </AbsoluteFill>

      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          bottom: 240,
          right: 80,
          opacity: watermarkOpacity,
          fontFamily,
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
