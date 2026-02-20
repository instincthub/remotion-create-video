import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene10Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow zoom
  const zoom = interpolate(frame, [0, 20 * fps], [1, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Network background
  const networkOpacity = interpolate(frame, [0, 2 * fps], [0, 0.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title: "Users see answers."
  const title1Progress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 12, stiffness: 80 },
  });
  const title1Opacity = interpolate(title1Progress, [0, 1], [0, 1]);
  const title1Y = interpolate(title1Progress, [0, 1], [40, 0]);

  // "Builders see architecture."
  const title2Progress = spring({
    frame,
    fps,
    delay: 2 * fps,
    config: { damping: 10, stiffness: 60 },
  });
  const title2Opacity = interpolate(title2Progress, [0, 1], [0, 1]);
  const title2Y = interpolate(title2Progress, [0, 1], [30, 0]);

  // Question
  const questionProgress = spring({
    frame,
    fps,
    delay: 5 * fps,
    config: { damping: 10, stiffness: 50 },
  });
  const questionOpacity = interpolate(questionProgress, [0, 1], [0, 1]);
  const questionY = interpolate(questionProgress, [0, 1], [20, 0]);

  // Network nodes for background
  const bgNodes = [
    { cx: 300, cy: 200 }, { cx: 560, cy: 140 }, { cx: 820, cy: 220 },
    { cx: 1080, cy: 160 }, { cx: 1340, cy: 240 }, { cx: 1600, cy: 180 },
    { cx: 200, cy: 400 }, { cx: 500, cy: 480 }, { cx: 800, cy: 420 },
    { cx: 1100, cy: 500 }, { cx: 1400, cy: 440 }, { cx: 1700, cy: 480 },
    { cx: 350, cy: 700 }, { cx: 650, cy: 760 }, { cx: 950, cy: 700 },
    { cx: 1250, cy: 780 }, { cx: 1550, cy: 720 },
    { cx: 240, cy: 900 }, { cx: 700, cy: 920 }, { cx: 1200, cy: 880 }, { cx: 1650, cy: 940 },
  ];

  const bgEdges: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
    [6, 7], [7, 8], [8, 9], [9, 10], [10, 11],
    [12, 13], [13, 14], [14, 15], [15, 16],
    [0, 6], [1, 7], [2, 8], [3, 9], [4, 10], [5, 11],
    [6, 12], [7, 13], [8, 14], [9, 15], [10, 16],
    [17, 18], [18, 19], [19, 20], [12, 17], [14, 18], [16, 20],
  ];

  // Morphing: nodes converge toward center over time
  const morphProgress = interpolate(frame, [8 * fps, 16 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const centerX = 960;
  const centerY = 540;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.darkCyra} 0%, ${colors.deepGreenCyanTurquoise} 50%, ${colors.darkNavy} 100%)`,
        fontFamily,
      }}
    >
      <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
        {/* Network diagram that morphs toward a single node */}
        <svg
          width="1920"
          height="1080"
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", top: 0, left: 0, opacity: networkOpacity }}
        >
          {bgEdges.map(([from, to], i) => {
            const fromNode = bgNodes[from];
            const toNode = bgNodes[to];
            const fromX = fromNode.cx + (centerX - fromNode.cx) * morphProgress;
            const fromY = fromNode.cy + (centerY - fromNode.cy) * morphProgress;
            const toX = toNode.cx + (centerX - toNode.cx) * morphProgress;
            const toY = toNode.cy + (centerY - toNode.cy) * morphProgress;

            const pulse = interpolate(
              Math.sin(frame * 0.03 + i * 0.8),
              [-1, 1],
              [0.3, 0.8]
            );

            return (
              <line
                key={`edge-${i}`}
                x1={fromX}
                y1={fromY}
                x2={toX}
                y2={toY}
                stroke={colors.tiffanyBlue}
                strokeWidth={1.5}
                opacity={pulse}
              />
            );
          })}
          {bgNodes.map((node, i) => {
            const nx = node.cx + (centerX - node.cx) * morphProgress;
            const ny = node.cy + (centerY - node.cy) * morphProgress;
            const pulse = interpolate(
              Math.sin(frame * 0.04 + i * 0.6),
              [-1, 1],
              [4, 7]
            );
            return (
              <circle
                key={`node-${i}`}
                cx={nx}
                cy={ny}
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
            opacity: title1Opacity,
            transform: `translateY(${title1Y}px)`,
            fontSize: 58,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
          }}
        >
          Users see <span style={{ color: colors.corn }}>answers.</span>
        </div>

        <div
          style={{
            opacity: title2Opacity,
            transform: `translateY(${title2Y}px)`,
            fontSize: 58,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            marginTop: 20,
          }}
        >
          Builders see{" "}
          <span style={{ color: colors.caribbeanGreen }}>architecture.</span>
        </div>

        <div
          style={{
            opacity: questionOpacity,
            transform: `translateY(${questionY}px)`,
            fontSize: 36,
            fontWeight: 700,
            color: `${colors.white}cc`,
            textAlign: "center",
            marginTop: 60,
          }}
        >
          Which one are you becoming?
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
