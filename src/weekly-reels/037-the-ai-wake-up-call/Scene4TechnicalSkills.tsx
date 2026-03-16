import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const TILES = [
  {
    id: "ai",
    title: "AI Literacy",
    description: "Understanding what AI can and cannot do",
    icon: "🧠",
    corner: [-1, -1], // top-left
  },
  {
    id: "ct",
    title: "Computational Thinking",
    description: "Breaking problems into solvable steps",
    icon: "⚙️",
    corner: [1, -1], // top-right
  },
  {
    id: "dl",
    title: "Data Literacy",
    description: "Reading, questioning, and challenging data",
    icon: "📊",
    corner: [-1, 1], // bottom-left
  },
  {
    id: "df",
    title: "Digital Fluency",
    description: "Navigating the internet with critical awareness",
    icon: "🛡️",
    corner: [1, 1], // bottom-right
  },
];

// Spotlight cycles: each tile spotlit for ~20s (600 frames)
// starts after all tiles visible ~8s (240 frames)
const SPOTLIGHT_START = 240;
const SPOTLIGHT_CYCLE = 600; // 20s per tile

const getTileAppearFrame = (i: number, fps: number) => fps * (1.5 + i * 1);

const SkillTile: React.FC<{
  tile: typeof TILES[0];
  index: number;
  frame: number;
  fps: number;
  isSpotlit: boolean;
  isFoundation: boolean;
}> = ({ tile, index, frame, fps, isSpotlit, isFoundation }) => {
  const appearFrame = getTileAppearFrame(index, fps);
  const enterProgress = spring({
    frame: frame - appearFrame,
    fps,
    config: { damping: 15, stiffness: 70 },
  });

  const [cx, cy] = tile.corner;
  const tx = interpolate(enterProgress, [0, 1], [cx * 120, 0]);
  const ty = interpolate(enterProgress, [0, 1], [cy * 120, 0]);
  const opacity = interpolate(enterProgress, [0, 0.2, 1], [0, 1, 1]);

  // When spotlit, glow; when other tiles are spotlit, dim
  const dimOpacity = isSpotlit ? 1 : isFoundation ? 1 : 0.5;
  const glowColor = isSpotlit ? colors.tiffanyBlue : "transparent";
  const glowSize = isSpotlit ? 24 : 0;

  // Expand description when spotlit
  const cycleFrame =
    frame >= SPOTLIGHT_START
      ? frame - (SPOTLIGHT_START + Math.floor((frame - SPOTLIGHT_START) / SPOTLIGHT_CYCLE) * SPOTLIGHT_CYCLE)
      : 0;
  const spotlitProgress = spring({
    frame: cycleFrame,
    fps,
    config: { damping: 20, stiffness: 80 },
  });

  const descOpacity = isSpotlit
    ? interpolate(spotlitProgress, [0, 0.3, 1], [0, 0, 1])
    : 0;

  return (
    <div
      style={{
        opacity: opacity * dimOpacity,
        transform: `translateX(${tx}px) translateY(${ty}px)`,
        background: colors.darkSlateGray,
        borderRadius: 12,
        borderLeft: `4px solid ${colors.tiffanyBlue}`,
        padding: "28px 32px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        boxShadow: isSpotlit ? `0 0 ${glowSize}px ${glowSize}px ${glowColor}33` : "none",
        minHeight: 220,
        justifyContent: "flex-start",
      }}
    >
      {/* Icon */}
      <div style={{ fontSize: 48, lineHeight: 1 }}>{tile.icon}</div>
      {/* Title */}
      <div
        style={{
          fontSize: 32,
          fontWeight: 700,
          color: colors.white,
          fontFamily,
          lineHeight: 1.2,
        }}
      >
        {tile.title}
      </div>
      {/* Description */}
      <div
        style={{
          fontSize: 20,
          fontWeight: 400,
          color: colors.rhythm,
          fontFamily,
          lineHeight: 1.4,
        }}
      >
        {tile.description}
      </div>
      {/* Spotlit expanded text */}
      <div
        style={{
          opacity: descOpacity,
          fontSize: 18,
          fontWeight: 400,
          color: colors.tiffanyBlue,
          fontFamily,
          fontStyle: "italic",
          lineHeight: 1.4,
          marginTop: 4,
        }}
      >
        Essential in a world of rapid technological change.
      </div>
    </div>
  );
};

export const Scene4TechnicalSkills: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Grid texture opacity
  const gridOpacity = interpolate(frame, [0, fps], [0, 0.06], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Spotlight cycling — which tile is spotlit
  const spotlitIndex =
    frame < SPOTLIGHT_START
      ? -1
      : Math.floor((frame - SPOTLIGHT_START) / SPOTLIGHT_CYCLE) % TILES.length;

  // "The Foundation" label at ~85s
  const foundationProgress = spring({
    frame: frame - fps * 85,
    fps,
    config: { damping: 18, stiffness: 70 },
  });
  const foundationOpacity = interpolate(foundationProgress, [0, 1], [0, 1]);
  const isFoundation = frame >= fps * 85;

  // Watermark
  const watermarkOpacity = interpolate(frame, [fps * 1, fps * 2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: colors.gunmetal, fontFamily }}>
      {/* Grid texture */}
      <AbsoluteFill style={{ opacity: gridOpacity, pointerEvents: "none" }}>
        {[...Array(13)].map((_, i) => (
          <div
            key={`v${i}`}
            style={{
              position: "absolute",
              left: i * 160,
              top: 0,
              width: 1,
              height: "100%",
              background: colors.tiffanyBlue,
            }}
          />
        ))}
        {[...Array(7)].map((_, i) => (
          <div
            key={`h${i}`}
            style={{
              position: "absolute",
              top: i * 155,
              left: 0,
              width: "100%",
              height: 1,
              background: colors.tiffanyBlue,
            }}
          />
        ))}
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          paddingBottom: 220,
          paddingLeft: 80,
          paddingRight: 80,
          paddingTop: 80,
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {/* "The Foundation" label */}
        <div
          style={{
            opacity: foundationOpacity,
            fontSize: 28,
            fontWeight: 700,
            color: colors.white,
            fontFamily,
            letterSpacing: 2,
            textTransform: "uppercase" as const,
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          The Foundation
        </div>

        {/* 2×2 grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: 32,
            flex: 1,
          }}
        >
          {TILES.map((tile, i) => (
            <SkillTile
              key={tile.id}
              tile={tile}
              index={i}
              frame={frame}
              fps={fps}
              isSpotlit={i === spotlitIndex}
              isFoundation={isFoundation}
            />
          ))}
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
