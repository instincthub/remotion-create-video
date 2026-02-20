import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow zoom on background
  const zoom = interpolate(frame, [0, 10 * fps], [1, 1.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Network nodes animation
  const networkOpacity = interpolate(frame, [0, fps], [0, 0.12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title animation
  const titleProgress = spring({
    frame,
    fps,
    delay: 8,
    config: { damping: 12, stiffness: 80 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [40, 0]);
  const titleScale = interpolate(titleProgress, [0, 1], [0.9, 1]);

  // Subtitle
  const subProgress = spring({
    frame,
    fps,
    delay: 1.5 * fps,
    config: { damping: 10, stiffness: 60 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);
  const subY = interpolate(subProgress, [0, 1], [30, 0]);

  // Network node positions
  const networkNodes = [
    { cx: 200, cy: 180 },
    { cx: 480, cy: 120 },
    { cx: 760, cy: 200 },
    { cx: 1040, cy: 140 },
    { cx: 1320, cy: 220 },
    { cx: 1600, cy: 160 },
    { cx: 1800, cy: 240 },
    { cx: 340, cy: 800 },
    { cx: 620, cy: 860 },
    { cx: 900, cy: 780 },
    { cx: 1180, cy: 850 },
    { cx: 1460, cy: 790 },
    { cx: 1720, cy: 870 },
    { cx: 140, cy: 500 },
    { cx: 1780, cy: 520 },
  ];

  const networkEdges: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6],
    [7, 8], [8, 9], [9, 10], [10, 11], [11, 12],
    [0, 13], [13, 7], [6, 14], [14, 12],
    [1, 9], [3, 10], [5, 11],
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.darkCyra} 0%, ${colors.deepGreenCyanTurquoise} 60%, ${colors.darkNavy} 100%)`,
        fontFamily,
      }}
    >
      <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
        {/* Abstract network lines */}
        <svg
          width="1920"
          height="1080"
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", top: 0, left: 0, opacity: networkOpacity }}
        >
          {networkEdges.map(([from, to], i) => {
            const pulse = interpolate(
              Math.sin(frame * 0.03 + i * 1.2),
              [-1, 1],
              [0.3, 0.8]
            );
            return (
              <line
                key={`edge-${i}`}
                x1={networkNodes[from].cx}
                y1={networkNodes[from].cy}
                x2={networkNodes[to].cx}
                y2={networkNodes[to].cy}
                stroke={colors.tiffanyBlue}
                strokeWidth={1.5}
                opacity={pulse}
              />
            );
          })}
          {networkNodes.map((node, i) => {
            const pulse = interpolate(
              Math.sin(frame * 0.04 + i * 0.8),
              [-1, 1],
              [4, 8]
            );
            return (
              <circle
                key={`node-${i}`}
                cx={node.cx}
                cy={node.cy}
                r={pulse}
                fill={colors.tiffanyBlue}
                opacity={0.6}
              />
            );
          })}
        </svg>
      </AbsoluteFill>

      {/* Main text */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          paddingBottom: 200,
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px) scale(${titleScale})`,
            fontSize: 62,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            lineHeight: 1.3,
            maxWidth: 1400,
          }}
        >
          Artificial Intelligence is{" "}
          <span style={{ color: colors.corn }}>more than chatbots.</span>
        </div>

        <div
          style={{
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
            fontSize: 36,
            color: `${colors.white}cc`,
            textAlign: "center",
            marginTop: 32,
            maxWidth: 1200,
          }}
        >
          Layered systems. Complex decisions. In seconds.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
