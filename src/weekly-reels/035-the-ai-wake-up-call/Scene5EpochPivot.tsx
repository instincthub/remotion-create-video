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
  const y = interpolate(dropProgress, [0, 1], [-160, 0]);

  const brightnessVal = allVisible ? 1.3 : 1;

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        fontSize: 180,
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

  const LETTER_STARTS = LETTERS.map((_, i) => fps * (0.5 + i * 0.4));
  const allVisible = frame >= LETTER_STARTS[LETTERS.length - 1] + fps * 0.8;

  // Background transition
  const bgProgress = interpolate(frame, [0, fps * 4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // MIT Sloan label
  const sourceProgress = spring({
    frame: frame - fps * 1,
    fps,
    config: { damping: 200 },
  });

  // Subtext after all letters visible
  const subtextProgress = spring({
    frame: frame - fps * 4,
    fps,
    config: { damping: 18, stiffness: 70 },
  });
  const subtextOpacity = interpolate(subtextProgress, [0, 1], [0, 1]);
  const subtextY = interpolate(subtextProgress, [0, 1], [24, 0]);

  const bgColor1 = colors.gunmetal;

  // Interpolate background as a gradient
  const bgOpacityOverlay = interpolate(bgProgress, [0, 1], [0, 0.6]);

  return (
    <AbsoluteFill style={{ background: bgColor1, fontFamily }}>
      {/* Color tint overlay */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(135deg, ${colors.darkCyra}40 0%, ${colors.turkishRose}30 100%)`,
          opacity: bgOpacityOverlay,
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
          gap: 24,
        }}
      >
        {/* MIT Sloan label */}
        <div
          style={{
            opacity: interpolate(sourceProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(sourceProgress, [0, 1], [-16, 0])}px)`,
            fontSize: 22,
            fontWeight: 400,
            fontStyle: "italic",
            color: colors.rhythm,
            fontFamily,
            letterSpacing: 1,
          }}
        >
          MIT Sloan School of Management
        </div>

        {/* EPOCH letters */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
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

        {/* Subtext */}
        <div
          style={{
            opacity: subtextOpacity,
            transform: `translateY(${subtextY}px)`,
            fontSize: 28,
            fontWeight: 400,
            color: colors.white,
            fontFamily,
            textAlign: "center",
          }}
        >
          5 human capabilities AI cannot replicate
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
