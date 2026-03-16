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

export const Scene5EpochPivot: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background color transition: gunmetal → darkCyra/turkishRose tint
  const bgProgress = interpolate(frame, [Math.round(fps * 1), Math.round(fps * 5)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bgR1 = parseInt(colors.gunmetal.slice(1, 3), 16);
  const bgG1 = parseInt(colors.gunmetal.slice(3, 5), 16);
  const bgB1 = parseInt(colors.gunmetal.slice(5, 7), 16);
  // Target: dark warm teal-rose blend
  const bgR2 = 40;
  const bgG2 = 58;
  const bgB2 = 62;
  const mixR = Math.round(bgR1 + (bgR2 - bgR1) * bgProgress * 0.6);
  const mixG = Math.round(bgG1 + (bgG2 - bgG1) * bgProgress * 0.6);
  const mixB = Math.round(bgB1 + (bgB2 - bgB1) * bgProgress * 0.6);
  const bgColor = `rgb(${mixR},${mixG},${mixB})`;

  // Each letter drops with bounce, staggered 0.3s apart
  const letterSprings = LETTERS.map((_, i) =>
    spring({
      frame: frame - Math.round(fps * (0.5 + i * 0.3)),
      fps,
      config: { damping: 8, stiffness: 100, mass: 0.6 },
    })
  );

  const attributionIn = spring({
    frame: frame - Math.round(fps * 3.5),
    fps,
    config: { damping: 200 },
  });

  const subtextIn = spring({
    frame: frame - Math.round(fps * 5),
    fps,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill style={{ background: bgColor, fontFamily }}>
      {/* Subtle radial glow center */}
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.darkCyra}20 0%, transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 80px 340px",
          gap: 0,
        }}
      >
        {/* EPOCH letters */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: 4,
            marginBottom: 48,
          }}
        >
          {LETTERS.map((letter, i) => {
            const p = letterSprings[i];
            const yOffset = interpolate(p, [0, 1], [-180, 0]);
            const opacity = interpolate(p, [0, 0.1, 1], [0, 1, 1]);

            return (
              <div
                key={i}
                style={{
                  opacity,
                  transform: `translateY(${yOffset}px)`,
                  fontSize: 160,
                  fontWeight: 900,
                  color: letter.color,
                  lineHeight: 1,
                  letterSpacing: -2,
                  textShadow: `0 4px 32px ${letter.color}60`,
                }}
              >
                {letter.char}
              </div>
            );
          })}
        </div>

        {/* Attribution */}
        <div
          style={{
            opacity: interpolate(attributionIn, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(attributionIn, [0, 1], [16, 0])}px)`,
            fontSize: 22,
            fontWeight: 700,
            color: colors.chineseSilver,
            letterSpacing: 3,
            textAlign: "center",
            marginBottom: 28,
          }}
        >
          WORLD ECONOMIC FORUM · 2025
        </div>

        {/* Subtext */}
        <div
          style={{
            opacity: interpolate(subtextIn, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(subtextIn, [0, 1], [20, 0])}px)`,
            fontSize: 30,
            fontWeight: 700,
            color: colors.caribbeanGreen,
            textAlign: "center",
            lineHeight: 1.45,
            maxWidth: 780,
          }}
        >
          The 5 human skills AI can't replace — in the jobs that survive.
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
