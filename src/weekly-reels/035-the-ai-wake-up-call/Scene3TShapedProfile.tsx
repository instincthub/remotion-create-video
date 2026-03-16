import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const GRID_LINES = 8;

const GridOverlay: React.FC = () => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    <svg width="1920" height="1080">
      {Array.from({ length: GRID_LINES }, (_, i) => {
        const y = (1080 / GRID_LINES) * (i + 1);
        return (
          <line
            key={`h-${i}`}
            x1={0}
            y1={y}
            x2={1920}
            y2={y}
            stroke={colors.tiffanyBlue}
            strokeWidth={1}
            opacity={0.08}
          />
        );
      })}
      {Array.from({ length: 12 }, (_, i) => {
        const x = (1920 / 12) * (i + 1);
        return (
          <line
            key={`v-${i}`}
            x1={x}
            y1={0}
            x2={x}
            y2={1080}
            stroke={colors.tiffanyBlue}
            strokeWidth={1}
            opacity={0.08}
          />
        );
      })}
    </svg>
  </AbsoluteFill>
);

export const Scene3TShapedProfile: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title entrance
  const titleProgress = spring({ frame, fps, config: { damping: 18, stiffness: 80 } });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [-30, 0]);

  // Vertical bar draws at 1s (top to bottom)
  const vertStart = fps * 1;
  const vertProgress = interpolate(frame, [vertStart, vertStart + fps * 1.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Horizontal bar extends at 2.5s
  const horizStart = fps * 2.5;
  const horizProgress = interpolate(frame, [horizStart, horizStart + fps * 1.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Labels appear after their bars
  const vertLabelProgress = spring({ frame: frame - fps * 2.8, fps, config: { damping: 200 } });
  const horizLabelProgress = spring({ frame: frame - fps * 4.2, fps, config: { damping: 200 } });
  const intersectProgress = spring({ frame: frame - fps * 5, fps, config: { damping: 14, stiffness: 60 } });

  // T shape geometry (centered at 960, 460)
  const cx = 960;
  const vertTop = 230;
  const vertBottom = 690;
  const vertHeight = vertBottom - vertTop;
  const horizLeft = 280;
  const horizRight = 1640;
  const horizY = 300;
  const barW = 60;

  return (
    <AbsoluteFill style={{ background: colors.gunmetal, fontFamily }}>
      <GridOverlay />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          fontSize: 52,
          fontWeight: 700,
          color: colors.white,
          fontFamily,
        }}
      >
        The T-Shaped Profile
      </div>

      {/* T-shape SVG */}
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        <svg width="1920" height="1080">
          {/* Vertical bar */}
          <rect
            x={cx - barW / 2}
            y={vertTop}
            width={barW}
            height={vertHeight * vertProgress}
            fill={colors.darkCyra}
            rx={6}
          />

          {/* Horizontal bar (extends symmetrically from center) */}
          {horizProgress > 0 && (
            <>
              <rect
                x={cx - (cx - horizLeft) * horizProgress}
                y={horizY}
                width={(cx - horizLeft) * horizProgress}
                height={barW}
                fill={colors.caribbeanGreen}
                rx={4}
              />
              <rect
                x={cx}
                y={horizY}
                width={(horizRight - cx) * horizProgress}
                height={barW}
                fill={colors.caribbeanGreen}
                rx={4}
              />
            </>
          )}
        </svg>
      </AbsoluteFill>

      {/* Label: Deep Expertise (right of vertical bar) */}
      <div
        style={{
          position: "absolute",
          left: cx + barW / 2 + 20,
          top: 420,
          opacity: interpolate(vertLabelProgress, [0, 1], [0, 1]),
          transform: `translateX(${interpolate(vertLabelProgress, [0, 1], [20, 0])}px)`,
          fontSize: 22,
          fontWeight: 700,
          color: colors.darkCyra,
          fontFamily,
        }}
      >
        Deep Expertise
      </div>

      {/* Label: Broad Human Skills (below horizontal bar) */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: horizY + barW + 16,
          textAlign: "center",
          opacity: interpolate(horizLabelProgress, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(horizLabelProgress, [0, 1], [16, 0])}px)`,
          fontSize: 22,
          fontWeight: 700,
          color: colors.caribbeanGreen,
          fontFamily,
        }}
      >
        Broad Human Skills
      </div>

      {/* Intersection label */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 570,
          textAlign: "center",
          opacity: interpolate(intersectProgress, [0, 1], [0, 1]),
          transform: `scale(${interpolate(intersectProgress, [0, 1], [0.8, 1])})`,
          fontSize: 36,
          fontWeight: 900,
          color: colors.white,
          fontFamily,
        }}
      >
        Your Child's Advantage
      </div>
    </AbsoluteFill>
  );
};
