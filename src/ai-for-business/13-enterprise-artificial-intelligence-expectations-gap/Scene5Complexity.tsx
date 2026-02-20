import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Flow node component
const FlowNode: React.FC<{
  x: number;
  y: number;
  label: string;
  sublabel: string;
  color: string;
  progress: number;
}> = ({ x, y, label, sublabel, color, progress }) => {
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const scale = interpolate(progress, [0, 1], [0.6, 1]);

  return (
    <div
      style={{
        position: "absolute",
        left: x - 100,
        top: y - 45,
        width: 200,
        height: 90,
        opacity,
        transform: `scale(${scale})`,
        background: `${color}15`,
        border: `2px solid ${color}`,
        borderRadius: 14,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        boxShadow: `0 0 20px ${color}20`,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -12,
          left: 14,
          background: colors.magnolia,
          padding: "2px 10px",
          borderRadius: 6,
          fontSize: 12,
          fontWeight: 700,
          color,
          letterSpacing: 2,
          fontFamily: "Inter, sans-serif",
        }}
      >
        {sublabel}
      </div>
      <div
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: colors.darkSlateGray,
          textAlign: "center",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {label}
      </div>
    </div>
  );
};

// Flow arrow between nodes
const FlowArrow: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  progress: number;
}> = ({ x1, y1, x2, y2, progress }) => {
  const opacity = interpolate(progress, [0, 1], [0, 0.8]);
  const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const drawLen = interpolate(progress, [0, 1], [0, length]);

  // Calculate direction for arrow
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const dx = Math.cos(angle);
  const dy = Math.sin(angle);
  const endX = x1 + dx * drawLen;
  const endY = y1 + dy * drawLen;

  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1920,
        height: 1080,
        pointerEvents: "none",
        opacity,
      }}
    >
      <line
        x1={x1}
        y1={y1}
        x2={endX}
        y2={endY}
        stroke={colors.darkCyra}
        strokeWidth={2.5}
        strokeDasharray="8 4"
      />
      {progress > 0.8 && (
        <polygon
          points={`${endX},${endY - 5} ${endX + 8},${endY} ${endX},${endY + 5}`}
          fill={colors.darkCyra}
          transform={`rotate(${(angle * 180) / Math.PI}, ${endX}, ${endY})`}
        />
      )}
    </svg>
  );
};

// Error popup
const ErrorPopup: React.FC<{
  x: number;
  y: number;
  text: string;
  progress: number;
}> = ({ x, y, text, progress }) => {
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const popScale = interpolate(progress, [0, 1], [0.5, 1]);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity,
        transform: `scale(${popScale})`,
        background: `${colors.oldRose}15`,
        border: `1px solid ${colors.oldRose}60`,
        borderRadius: 8,
        padding: "8px 14px",
        display: "flex",
        alignItems: "center",
        gap: 8,
        zIndex: 5,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16">
        <circle
          cx={8}
          cy={8}
          r={7}
          fill="none"
          stroke={colors.oldRose}
          strokeWidth={1.5}
        />
        <line
          x1={8}
          y1={4}
          x2={8}
          y2={9}
          stroke={colors.oldRose}
          strokeWidth={1.5}
          strokeLinecap="round"
        />
        <circle cx={8} cy={12} r={1} fill={colors.oldRose} />
      </svg>
      <span
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: colors.oldRose,
          fontFamily: "Inter, sans-serif",
        }}
      >
        {text}
      </span>
    </div>
  );
};

export const Scene5Complexity: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 12, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [-30, 0]);

  // Flow nodes
  const nodes = [
    { x: 240, y: 400, label: "Data Source", sublabel: "INPUT", color: colors.darkCyra, delay: 2 },
    { x: 580, y: 300, label: "Processing", sublabel: "CLEAN", color: colors.viridianGreen, delay: 5 },
    { x: 580, y: 500, label: "Validation", sublabel: "CHECK", color: colors.tiffanyBlue, delay: 6 },
    { x: 960, y: 400, label: "AI Model", sublabel: "PREDICT", color: colors.caribbeanGreen, delay: 9 },
    { x: 1340, y: 300, label: "API Layer", sublabel: "SERVE", color: colors.metallicBlue, delay: 13 },
    { x: 1340, y: 500, label: "Monitoring", sublabel: "WATCH", color: colors.chineseBlue, delay: 14 },
    { x: 1680, y: 400, label: "End User", sublabel: "OUTPUT", color: colors.darkCyra, delay: 17 },
  ];

  // Arrows between nodes
  const arrows = [
    { x1: 340, y1: 400, x2: 480, y2: 310, delay: 4 },
    { x1: 340, y1: 400, x2: 480, y2: 490, delay: 4.5 },
    { x1: 680, y1: 310, x2: 860, y2: 390, delay: 8 },
    { x1: 680, y1: 490, x2: 860, y2: 410, delay: 8.5 },
    { x1: 1060, y1: 400, x2: 1240, y2: 310, delay: 12 },
    { x1: 1060, y1: 400, x2: 1240, y2: 490, delay: 12.5 },
    { x1: 1440, y1: 310, x2: 1580, y2: 390, delay: 16 },
    { x1: 1440, y1: 490, x2: 1580, y2: 410, delay: 16 },
  ];

  // Error popups appear
  const errors = [
    { x: 500, y: 210, text: "Data quality issue", delay: 20 },
    { x: 880, y: 310, text: "Edge case failure", delay: 22 },
    { x: 1260, y: 210, text: "Integration error", delay: 24 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: colors.magnolia, fontFamily }}>
      {/* Subtle grid */}
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", top: 0, left: 0, opacity: 0.03 }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <line
            key={`bg-h-${i}`}
            x1={0}
            y1={i * 60}
            x2={1920}
            y2={i * 60}
            stroke={colors.darkSlateGray}
            strokeWidth={1}
          />
        ))}
        {Array.from({ length: 34 }).map((_, i) => (
          <line
            key={`bg-v-${i}`}
            x1={i * 60}
            y1={0}
            x2={i * 60}
            y2={1080}
            stroke={colors.darkSlateGray}
            strokeWidth={1}
          />
        ))}
      </svg>

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 3,
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontSize: 54,
            fontWeight: 700,
            color: colors.darkSlateGray,
            textAlign: "center",
          }}
        >
          Complexity Is{" "}
          <span style={{ color: colors.oldRose }}>Hidden</span>
        </div>
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: "absolute",
          top: 130,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 3,
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            fontSize: 22,
            color: colors.rhythm,
            letterSpacing: 1,
          }}
        >
          Simple Requirement. Complex Reality.
        </div>
      </div>

      {/* Flow arrows */}
      {arrows.map((arrow, i) => {
        const arrowProgress = spring({
          frame,
          fps,
          delay: arrow.delay * fps,
          config: { damping: 14, stiffness: 80 },
        });
        return (
          <FlowArrow
            key={`arrow-${i}`}
            x1={arrow.x1}
            y1={arrow.y1}
            x2={arrow.x2}
            y2={arrow.y2}
            progress={arrowProgress}
          />
        );
      })}

      {/* Flow nodes */}
      {nodes.map((node, i) => {
        const nodeProgress = spring({
          frame,
          fps,
          delay: node.delay * fps,
          config: { damping: 12, stiffness: 80 },
        });
        return (
          <FlowNode
            key={`node-${i}`}
            x={node.x}
            y={node.y}
            label={node.label}
            sublabel={node.sublabel}
            color={node.color}
            progress={nodeProgress}
          />
        );
      })}

      {/* Error popups */}
      {errors.map((err, i) => {
        const errProgress = spring({
          frame,
          fps,
          delay: err.delay * fps,
          config: { damping: 10, stiffness: 120 },
        });
        return (
          <ErrorPopup
            key={`err-${i}`}
            x={err.x}
            y={err.y}
            text={err.text}
            progress={errProgress}
          />
        );
      })}

      {/* Bottom text */}
      <div
        style={{
          position: "absolute",
          bottom: 230,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 3,
        }}
      >
        <div
          style={{
            opacity: interpolate(
              frame,
              [26 * fps, 28 * fps],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            ),
            fontSize: 28,
            color: colors.darkSlateGray,
            textAlign: "center",
          }}
        >
          AI is easy to try.{" "}
          <span style={{ color: colors.oldRose, fontWeight: 700 }}>
            Not easy to productionize.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
