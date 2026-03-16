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

// Each letter drops with 0.8s stagger
const LETTER_STAGGER_S = 0.8;

export const Scene5EpochPivot: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Letters drop from above with bounce
  const letterProgresses = LETTERS.map((_, i) =>
    spring({
      frame: frame - Math.round(fps * (0.5 + i * LETTER_STAGGER_S)),
      fps,
      config: { damping: 10, stiffness: 120, mass: 0.8 },
    })
  );

  // All letters brighten at 8s
  const brightenAt = Math.round(fps * 8);
  const brightFactor = interpolate(frame, [brightenAt, brightenAt + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // MIT Sloan credit at 12s
  const mitIn = spring({
    frame: frame - Math.round(fps * 12),
    fps,
    config: { damping: 200 },
  });

  // Five capabilities line at 16s
  const fiveIn = spring({
    frame: frame - Math.round(fps * 16),
    fps,
    config: { damping: 200 },
  });

  // Growth line at 22s
  const growthIn = spring({
    frame: frame - Math.round(fps * 22),
    fps,
    config: { damping: 12, stiffness: 60 },
  });

  // Warm overlay deepens over time
  const warmOverlay = interpolate(frame, [0, Math.round(fps * 20)], [0, 0.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: colors.gunmetal, fontFamily }}>
      {/* Warm overlay that deepens over time */}
      <AbsoluteFill
        style={{
          background: `rgba(0, 131, 143, ${warmOverlay})`,
          pointerEvents: "none",
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 60px 340px",
          gap: 0,
        }}
      >
        {/* EPOCH letters row */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginBottom: 60,
            width: "100%",
            maxWidth: 960,
          }}
        >
          {LETTERS.map((letter, i) => {
            const p = letterProgresses[i];
            const yDrop = interpolate(p, [0, 1], [-200, 0]);
            const opacity = interpolate(p, [0, 0.2, 1], [0, 1, 1]);
            // Brightness boost after 8s
            const brightness = 1 + brightFactor * 0.3;

            return (
              <div
                key={i}
                style={{
                  opacity,
                  transform: `translateY(${yDrop}px)`,
                  fontSize: 130,
                  fontWeight: 900,
                  color: letter.color,
                  lineHeight: 1,
                  filter: `brightness(${brightness})`,
                  textShadow: brightFactor > 0.5 ? `0 0 30px ${letter.color}80` : "none",
                }}
              >
                {letter.char}
              </div>
            );
          })}
        </div>

        {/* MIT Sloan credit */}
        {mitIn > 0.05 && (
          <div
            style={{
              opacity: interpolate(mitIn, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(mitIn, [0, 1], [16, 0])}px)`,
              fontSize: 22,
              fontStyle: "italic",
              color: colors.rhythm,
              textAlign: "center",
              marginBottom: 36,
              letterSpacing: 1,
            }}
          >
            MIT Sloan School of Management
          </div>
        )}

        {/* Five capabilities line */}
        {fiveIn > 0.05 && (
          <div
            style={{
              opacity: interpolate(fiveIn, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(fiveIn, [0, 1], [20, 0])}px)`,
              fontSize: 34,
              fontWeight: 400,
              color: colors.white,
              textAlign: "center",
              lineHeight: 1.45,
              maxWidth: 880,
              marginBottom: 40,
            }}
          >
            Five human capabilities AI cannot replicate.
          </div>
        )}

        {/* Growth closing line */}
        {growthIn > 0.05 && (
          <div
            style={{
              opacity: interpolate(growthIn, [0, 1], [0, 1]),
              transform: `scale(${interpolate(growthIn, [0, 0.5, 1], [0.85, 1.06, 1])})`,
              fontSize: 34,
              fontWeight: 900,
              color: colors.caribbeanGreen,
              textAlign: "center",
              lineHeight: 1.4,
              textShadow: `0 0 40px ${colors.caribbeanGreen}60`,
              maxWidth: 880,
            }}
          >
            Every single one: associated with GROWTH.
          </div>
        )}
      </AbsoluteFill>

      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          bottom: 320,
          right: 60,
          fontSize: 15,
          fontWeight: 700,
          color: `${colors.white}40`,
          letterSpacing: 1,
          fontFamily,
        }}
      >
        InstinctHub
      </div>
    </AbsoluteFill>
  );
};
