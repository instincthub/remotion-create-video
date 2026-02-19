import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Flow diagram node
const FlowNode: React.FC<{
  x: number;
  y: number;
  label: string;
  delay: number;
  color: string;
}> = ({ x, y, label, delay, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterProgress = spring({
    frame,
    fps,
    delay,
    config: { damping: 12, stiffness: 100 },
  });
  const scale = interpolate(enterProgress, [0, 1], [0, 1]);
  const opacity = interpolate(enterProgress, [0, 1], [0, 1]);
  const floatY = Math.sin((frame - delay) * 0.03) * 2;

  return (
    <g
      transform={`translate(${x}, ${y + floatY}) scale(${scale})`}
      opacity={opacity}
    >
      <rect
        x={-100}
        y={-38}
        width={200}
        height={76}
        rx={14}
        fill={color}
        opacity={0.12}
      />
      <rect
        x={-100}
        y={-38}
        width={200}
        height={76}
        rx={14}
        fill="none"
        stroke={color}
        strokeWidth={2.5}
      />
      <text
        x={0}
        y={8}
        textAnchor="middle"
        fontSize={30}
        fontWeight="bold"
        fill={color}
        fontFamily="Inter, sans-serif"
      >
        {label}
      </text>
    </g>
  );
};

// Arrow between nodes
const FlowArrow: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
}> = ({ x1, y1, x2, y2, delay }) => {
  const frame = useCurrentFrame();

  const drawProgress = interpolate(frame, [delay, delay + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const endX = x1 + (x2 - x1) * drawProgress;

  return (
    <g opacity={drawProgress > 0 ? 1 : 0}>
      <line
        x1={x1}
        y1={y1}
        x2={endX}
        y2={y2}
        stroke={colors.chineseSilver}
        strokeWidth={2.5}
      />
      {drawProgress > 0.9 && (
        <polygon
          points={`${x2},${y2} ${x2 - 12},${y2 - 6} ${x2 - 12},${y2 + 6}`}
          fill={colors.chineseSilver}
        />
      )}
    </g>
  );
};

export const Scene7Context: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Heading
  const headProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 12, stiffness: 100 },
  });
  const headOpacity = interpolate(headProgress, [0, 1], [0, 1]);
  const headScale = interpolate(headProgress, [0, 1], [0.7, 1]);

  // Underline animation
  const underlineWidth = interpolate(
    frame,
    [fps, 2 * fps],
    [0, 380],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Centered flow: 4 nodes evenly spaced around center (960)
  // Spacing: 330px between centers, total span = 990, so first at 960-495=465, last at 960+495=1455
  const nodes = [
    { x: 465, y: 460, label: "Problem", delay: 2 * fps, color: colors.darkCyra },
    { x: 795, y: 460, label: "Data", delay: 3.5 * fps, color: colors.tiffanyBlue },
    { x: 1125, y: 460, label: "Risk", delay: 5 * fps, color: colors.oldRose },
    { x: 1455, y: 460, label: "Outcome", delay: 6.5 * fps, color: colors.caribbeanGreen },
  ];

  const arrows = [
    { x1: 565, y1: 460, x2: 695, y2: 460, delay: 3 * fps },
    { x1: 895, y1: 460, x2: 1025, y2: 460, delay: 4.5 * fps },
    { x1: 1225, y1: 460, x2: 1355, y2: 460, delay: 6 * fps },
  ];

  // Subtext
  const subProgress = spring({
    frame,
    fps,
    delay: 9 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);
  const subY = interpolate(subProgress, [0, 1], [20, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.white,
        fontFamily,
      }}
    >
      {/* Heading with underline */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: 140,
          zIndex: 2,
        }}
      >
        <div style={{ position: "relative" }}>
          <div
            style={{
              opacity: headOpacity,
              transform: `scale(${headScale})`,
              fontSize: 60,
              fontWeight: "bold",
              color: colors.darkSlateGray,
              textAlign: "center",
            }}
          >
            Context determines{" "}
            <span style={{ color: colors.darkCyra }}>success</span>
          </div>
          {/* Animated underline */}
          <div
            style={{
              position: "absolute",
              bottom: -8,
              left: "50%",
              transform: "translateX(-50%)",
              width: underlineWidth,
              height: 4,
              borderRadius: 2,
              background: colors.darkCyra,
            }}
          />
        </div>
      </AbsoluteFill>

      {/* Flow diagram */}
      <AbsoluteFill>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080">
          {arrows.map((arrow, i) => (
            <FlowArrow key={`arrow-${i}`} {...arrow} />
          ))}
          {nodes.map((node, i) => (
            <FlowNode key={`node-${i}`} {...node} />
          ))}
        </svg>
      </AbsoluteFill>

      {/* Bottom subtext */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: 260,
          zIndex: 2,
        }}
      >
        <div
          style={{
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
            fontSize: 34,
            color: colors.rhythm,
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.5,
          }}
        >
          What works on the web{" "}
          <span style={{ color: colors.oldRose }}>does not</span> automatically
          work in your enterprise.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
