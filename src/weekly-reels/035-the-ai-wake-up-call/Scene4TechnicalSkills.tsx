import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const BrainCircuitIcon: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="16" stroke={colors.tiffanyBlue} strokeWidth="3" />
    <path d="M16 24 H32 M24 16 V32" stroke={colors.tiffanyBlue} strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="16" cy="24" r="3" fill={colors.tiffanyBlue} />
    <circle cx="32" cy="24" r="3" fill={colors.tiffanyBlue} />
  </svg>
);

const PuzzleIcon: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="8" y="8" width="14" height="14" rx="2" stroke={colors.tiffanyBlue} strokeWidth="2.5" />
    <rect x="26" y="8" width="14" height="14" rx="2" stroke={colors.tiffanyBlue} strokeWidth="2.5" />
    <rect x="8" y="26" width="14" height="14" rx="2" stroke={colors.tiffanyBlue} strokeWidth="2.5" />
    <rect x="26" y="26" width="14" height="14" rx="2" stroke={colors.tiffanyBlue} strokeWidth="2.5" />
    <circle cx="24" cy="24" r="4" fill={colors.tiffanyBlue} />
  </svg>
);

const ChartIcon: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="8" y="28" width="8" height="14" rx="2" fill={colors.tiffanyBlue} />
    <rect x="20" y="20" width="8" height="22" rx="2" fill={colors.tiffanyBlue} opacity={0.7} />
    <rect x="32" y="12" width="8" height="30" rx="2" fill={colors.tiffanyBlue} opacity={0.5} />
    <line x1="6" y1="42" x2="42" y2="42" stroke={colors.tiffanyBlue} strokeWidth="2" />
  </svg>
);

const ShieldIcon: React.FC = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path
      d="M24 6 L38 12 V24 C38 33 24 42 24 42 C24 42 10 33 10 24 V12 Z"
      stroke={colors.tiffanyBlue}
      strokeWidth="2.5"
      fill="none"
    />
    <path d="M17 24 L22 29 L31 20" stroke={colors.tiffanyBlue} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TILES = [
  {
    Icon: BrainCircuitIcon,
    name: "AI Literacy",
    desc: "Understanding what AI can and cannot do",
    corner: { x: -80, y: -60 },
  },
  {
    Icon: PuzzleIcon,
    name: "Computational Thinking",
    desc: "Breaking complex problems into solvable steps",
    corner: { x: 80, y: -60 },
  },
  {
    Icon: ChartIcon,
    name: "Data Literacy",
    desc: "Reading, questioning, and challenging data",
    corner: { x: -80, y: 60 },
  },
  {
    Icon: ShieldIcon,
    name: "Digital Fluency",
    desc: "Navigating information with critical awareness",
    corner: { x: 80, y: 60 },
  },
];

const SkillTile: React.FC<{
  tile: typeof TILES[0];
  frame: number;
  fps: number;
  startFrame: number;
}> = ({ tile, frame, fps, startFrame }) => {
  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 14, stiffness: 70 },
  });
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const tx = interpolate(progress, [0, 1], [tile.corner.x, 0]);
  const ty = interpolate(progress, [0, 1], [tile.corner.y, 0]);

  // Icon pulse on entry
  const pulseProgress = interpolate(frame, [startFrame, startFrame + fps * 0.6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const glowSize = interpolate(pulseProgress, [0, 0.5, 1], [0, 24, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translate(${tx}px, ${ty}px)`,
        width: 380,
        height: 240,
        background: colors.darkSlateGray,
        borderLeft: `4px solid ${colors.darkCyra}`,
        borderRadius: 12,
        padding: "28px 32px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div style={{ filter: `drop-shadow(0 0 ${glowSize}px ${colors.tiffanyBlue})` }}>
        <tile.Icon />
      </div>
      <div style={{ fontSize: 26, fontWeight: 700, color: colors.white, fontFamily }}>
        {tile.name}
      </div>
      <div style={{ fontSize: 16, fontWeight: 400, color: colors.rhythm, fontFamily, lineHeight: 1.4 }}>
        {tile.desc}
      </div>
    </div>
  );
};

export const Scene4TechnicalSkills: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({ frame, fps, config: { damping: 200 } });

  const TILE_STARTS = [fps * 1, fps * 2, fps * 3, fps * 4];

  return (
    <AbsoluteFill style={{ background: colors.gunmetal, fontFamily }}>
      {/* Subtle tiffanyBlue grid texture */}
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        <svg width="1920" height="1080">
          {Array.from({ length: 16 }, (_, i) => (
            <line
              key={`v-${i}`}
              x1={(1920 / 16) * i}
              y1={0}
              x2={(1920 / 16) * i}
              y2={1080}
              stroke={colors.tiffanyBlue}
              strokeWidth={1}
              opacity={0.05}
            />
          ))}
          {Array.from({ length: 9 }, (_, i) => (
            <line
              key={`h-${i}`}
              x1={0}
              y1={(1080 / 9) * i}
              x2={1920}
              y2={(1080 / 9) * i}
              stroke={colors.tiffanyBlue}
              strokeWidth={1}
              opacity={0.05}
            />
          ))}
        </svg>
      </AbsoluteFill>

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(titleProgress, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(titleProgress, [0, 1], [-24, 0])}px)`,
          fontSize: 48,
          fontWeight: 700,
          color: colors.white,
          fontFamily,
        }}
      >
        4 Technical Skills for the AI Age
      </div>

      {/* 2×2 grid */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 220,
          gap: 28,
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", gap: 28 }}>
          <SkillTile tile={TILES[0]} frame={frame} fps={fps} startFrame={TILE_STARTS[0]} />
          <SkillTile tile={TILES[1]} frame={frame} fps={fps} startFrame={TILE_STARTS[1]} />
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: 28 }}>
          <SkillTile tile={TILES[2]} frame={frame} fps={fps} startFrame={TILE_STARTS[2]} />
          <SkillTile tile={TILES[3]} frame={frame} fps={fps} startFrame={TILE_STARTS[3]} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
