import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Investigation board with connecting lines
const InvestigationBoard: React.FC<{ frame: number; fps: number }> = ({
  frame,
  fps,
}) => {
  const boardOpacity = interpolate(frame, [2 * fps, 4 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const nodes = [
    { x: 400, y: 60, label: "Incident", color: colors.oldRose, delay: 3 },
    { x: 180, y: 200, label: "Developer", color: colors.darkCyra, delay: 5 },
    { x: 400, y: 200, label: "Owner", color: colors.tiffanyBlue, delay: 6 },
    { x: 620, y: 200, label: "Organisation", color: colors.viridianGreen, delay: 7 },
    { x: 120, y: 360, label: "Training Data", color: colors.rhythm, delay: 9 },
    { x: 320, y: 360, label: "Design", color: colors.rhythm, delay: 10 },
    { x: 520, y: 360, label: "Standards", color: colors.rhythm, delay: 11 },
    { x: 700, y: 360, label: "Testing", color: colors.rhythm, delay: 12 },
  ];

  const connections: [number, number][] = [
    [0, 1], [0, 2], [0, 3],
    [1, 4], [1, 5],
    [2, 5], [2, 6],
    [3, 6], [3, 7],
  ];

  return (
    <div style={{ position: "relative", width: 800, height: 440, opacity: boardOpacity }}>
      <svg width="800" height="440" viewBox="0 0 800 440" style={{ position: "absolute" }}>
        {connections.map(([a, b], i) => {
          const lineDelay = Math.max(nodes[a].delay, nodes[b].delay) * fps;
          const lineOpacity = interpolate(frame, [lineDelay, lineDelay + fps], [0, 0.6], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const pulse = Math.sin((frame * 0.06 + i * 0.8) * 2) * 0.15 + 0.85;
          return (
            <line
              key={`conn-${i}`}
              x1={nodes[a].x}
              y1={nodes[a].y + 25}
              x2={nodes[b].x}
              y2={nodes[b].y - 10}
              stroke={colors.oldRose}
              strokeWidth={2}
              opacity={lineOpacity * pulse}
              strokeDasharray="6 4"
            />
          );
        })}
      </svg>

      {nodes.map((node, i) => {
        const nodeProgress = spring({
          frame,
          fps,
          delay: node.delay * fps,
          config: { damping: 12, stiffness: 120 },
        });
        const nodeOpacity = interpolate(nodeProgress, [0, 1], [0, 1]);
        const nodeScale = interpolate(nodeProgress, [0, 1], [0.5, 1]);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: node.x - 65,
              top: node.y - 20,
              width: 130,
              height: 50,
              backgroundColor: `${node.color}18`,
              border: `2px solid ${node.color}`,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              fontWeight: "bold",
              color: node.color,
              opacity: nodeOpacity,
              transform: `scale(${nodeScale})`,
            }}
          >
            {node.label}
          </div>
        );
      })}
    </div>
  );
};

export const Scene6Accountability: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Heading
  const headingProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 10, stiffness: 100 },
  });
  const headingOpacity = interpolate(headingProgress, [0, 1], [0, 1]);
  const headingScale = interpolate(headingProgress, [0, 1], [0.7, 1]);

  // Subtitle
  const subProgress = spring({
    frame,
    fps,
    delay: 1.2 * fps,
    config: { damping: 200 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);

  // Vehicle analogy
  const analogyProgress = spring({
    frame,
    fps,
    delay: 14 * fps,
    config: { damping: 200 },
  });
  const analogyOpacity = interpolate(analogyProgress, [0, 1], [0, 1]);
  const analogyY = interpolate(analogyProgress, [0, 1], [20, 0]);

  // Zoom into highlighted investigation
  const zoomProgress = interpolate(frame, [5 * fps, 15 * fps], [1, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(145deg, ${colors.gunmetal} 0%, ${colors.darkSlateGray} 100%)`,
        fontFamily,
      }}
    >
      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: 55,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 60,
            fontWeight: "bold",
            color: colors.white,
            opacity: headingOpacity,
            transform: `scale(${headingScale})`,
          }}
        >
          Who is{" "}
          <span style={{ color: colors.oldRose }}>responsible</span>?
        </div>
        <div
          style={{
            fontSize: 24,
            color: colors.chineseSilver,
            opacity: subOpacity,
            marginTop: 10,
          }}
        >
          Developers. Owners. Systems.
        </div>
      </div>

      {/* Investigation board */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          transform: `scale(${zoomProgress})`,
          transformOrigin: "center top",
        }}
      >
        <InvestigationBoard frame={frame} fps={fps} />
      </div>

      {/* Vehicle analogy callout */}
      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: analogyOpacity,
          transform: `translateY(${analogyY}px)`,
        }}
      >
        <div
          style={{
            display: "inline-block",
            fontSize: 20,
            color: colors.white,
            backgroundColor: `${colors.darkCyra}30`,
            padding: "14px 36px",
            borderRadius: 10,
            border: `1px solid ${colors.darkCyra}50`,
            lineHeight: 1.6,
          }}
        >
          Like aviation investigations — examine{" "}
          <span style={{ color: colors.caribbeanGreen, fontWeight: "bold" }}>
            training
          </span>
          ,{" "}
          <span style={{ color: colors.tiffanyBlue, fontWeight: "bold" }}>
            design
          </span>
          , and{" "}
          <span style={{ color: colors.corn, fontWeight: "bold" }}>
            industry standards
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
