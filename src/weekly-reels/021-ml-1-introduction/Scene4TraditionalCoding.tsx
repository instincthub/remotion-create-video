import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Stacking if/else blocks
const CodeBlocks: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const blocks = [
    { label: "if (condition_A)", color: colors.tiffanyBlue, delay: 10 },
    { label: "  else if (B)", color: colors.viridianGreen, delay: 20 },
    { label: "    else if (C)", color: colors.caribbeanGreen, delay: 30 },
    { label: "      else if (D)", color: colors.darkCyra, delay: 40 },
    { label: "        else if (E)", color: colors.rhythm, delay: 50 },
    { label: "          else if (F)", color: colors.metallicBlue, delay: 60 },
    { label: "            else { ... }", color: colors.oldRose, delay: 70 },
  ];

  // Wobble increases with more blocks
  const wobbleIntensity = interpolate(frame, [0, 3 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ position: "relative" }}>
      {blocks.map((block, i) => {
        const blockProgress = spring({
          frame,
          fps,
          delay: block.delay,
          config: { damping: 200 },
        });
        const blockOpacity = interpolate(blockProgress, [0, 1], [0, 1]);
        const blockY = interpolate(blockProgress, [0, 1], [30, 0]);

        // Each block wobbles more than the last
        const wobble =
          Math.sin(frame * 0.08 + i * 0.5) * (i * 1.5) * wobbleIntensity;

        return (
          <div
            key={i}
            style={{
              opacity: blockOpacity,
              transform: `translateY(${blockY}px) translateX(${wobble}px)`,
              backgroundColor: `${block.color}15`,
              border: `2px solid ${block.color}`,
              borderRadius: 8,
              padding: "10px 20px",
              marginBottom: 6,
              fontSize: 18,
              fontWeight: 700,
              color: block.color,
              fontFamily: "monospace",
              letterSpacing: 0.5,
            }}
          >
            {block.label}
          </div>
        );
      })}

      {/* Tangled arrows between blocks */}
      <svg
        width="300"
        height="20"
        viewBox="0 0 300 20"
        style={{
          position: "absolute",
          top: "50%",
          left: -20,
          opacity: wobbleIntensity * 0.3,
        }}
      >
        <path
          d="M0 10 Q75 -10 150 10 Q225 30 300 10"
          stroke={colors.oldRose}
          strokeWidth={1.5}
          fill="none"
          strokeDasharray="4 3"
        />
      </svg>
    </div>
  );
};

export const Scene4TraditionalCoding: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header
  const headerProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 200 },
  });
  const headerOpacity = interpolate(headerProgress, [0, 1], [0, 1]);
  const headerY = interpolate(headerProgress, [0, 1], [30, 0]);

  // "Gets messy" text
  const messyProgress = spring({
    frame,
    fps,
    delay: 4 * fps,
    config: { damping: 200 },
  });
  const messyOpacity = interpolate(messyProgress, [0, 1], [0, 1]);
  const messyScale = interpolate(messyProgress, [0, 1], [0.8, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${colors.white}, ${colors.magnolia})`,
        fontFamily,
      }}
    >
      {/* Content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 300,
          paddingLeft: 50,
          paddingRight: 50,
          gap: 25,
        }}
      >
        {/* Header */}
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: colors.darkSlateGray,
            textAlign: "center",
            opacity: headerOpacity,
            transform: `translateY(${headerY}px)`,
            lineHeight: 1.4,
          }}
        >
          How We <span style={{ color: colors.darkCyra }}>Used</span> to Code
        </div>

        {/* Code blocks */}
        <CodeBlocks />

        {/* "Gets messy" */}
        <div
          style={{
            fontSize: 42,
            fontWeight: 700,
            color: colors.oldRose,
            textAlign: "center",
            opacity: messyOpacity,
            transform: `scale(${messyScale})`,
            lineHeight: 1.3,
            marginTop: 15,
          }}
        >
          Gets messy.
          <br />
          <span style={{ fontSize: 28, fontWeight: 400, color: colors.rhythm }}>
            Very easily.
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
