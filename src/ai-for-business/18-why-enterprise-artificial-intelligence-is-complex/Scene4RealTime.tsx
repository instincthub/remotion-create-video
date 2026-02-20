import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const EVENT_NODES = [
  { label: "Fraud Detection", x: 360, y: 360, color: colors.oldRose },
  { label: "Dynamic Pricing", x: 960, y: 280, color: colors.tiffanyBlue },
  { label: "Autonomous Systems", x: 1500, y: 380, color: colors.caribbeanGreen },
  { label: "Event Router", x: 660, y: 560, color: colors.viridianGreen },
  { label: "Data Stream", x: 1200, y: 580, color: colors.darkCyra },
];

const CONNECTIONS: [number, number][] = [
  [0, 3],
  [1, 3],
  [1, 4],
  [3, 4],
  [2, 4],
  [0, 1],
];

export const Scene4RealTime: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [-30, 0]);

  // Nodes appear staggered
  const nodeEntrances = EVENT_NODES.map((_, i) =>
    spring({
      frame,
      fps,
      delay: fps * 0.8 + i * 12,
      config: { damping: 12, stiffness: 100 },
    }),
  );

  // Pulse effect - events firing
  const pulsePhase = (frame * 0.08) % (Math.PI * 2);

  // Connection lines fade in
  const connOpacity = interpolate(frame, [2 * fps, 3 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Event flash particles
  const flashInterval = 25;
  const currentFlashNode = Math.floor(frame / flashInterval) % EVENT_NODES.length;
  const flashProgress = (frame % flashInterval) / flashInterval;

  return (
    <AbsoluteFill
      style={{
        background: colors.darkNavy,
        fontFamily,
      }}
    >
      {/* Ambient glow background */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "40%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.darkCyra}15 0%, transparent 70%)`,
          transform: `scale(${1 + Math.sin(pulsePhase) * 0.1})`,
        }}
      />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontSize: 50,
            fontWeight: 700,
            color: colors.white,
          }}
        >
          Real Time Systems{" "}
          <span style={{ color: colors.tiffanyBlue }}>React Instantly</span>
        </div>
      </div>

      {/* Network visualization */}
      <AbsoluteFill style={{ paddingBottom: 200 }}>
        <svg width="1920" height="880">
          <defs>
            <filter id="eventGlow">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Connection lines */}
          {CONNECTIONS.map(([from, to], i) => {
            const n1 = EVENT_NODES[from];
            const n2 = EVENT_NODES[to];
            const pulse =
              Math.sin(frame * 0.06 + i * 1.2) * 0.4 + 0.6;

            return (
              <line
                key={`conn-${i}`}
                x1={n1.x}
                y1={n1.y}
                x2={n2.x}
                y2={n2.y}
                stroke={`${colors.darkCyra}60`}
                strokeWidth={2}
                opacity={connOpacity * pulse}
                strokeDasharray="6 4"
              />
            );
          })}

          {/* Signal pulses along connections */}
          {CONNECTIONS.map(([from, to], i) => {
            const n1 = EVENT_NODES[from];
            const n2 = EVENT_NODES[to];
            const t = ((frame * 0.02 + i * 0.3) % 1);
            const px = n1.x + (n2.x - n1.x) * t;
            const py = n1.y + (n2.y - n1.y) * t;

            if (connOpacity < 0.5) return null;

            return (
              <circle
                key={`pulse-${i}`}
                cx={px}
                cy={py}
                r={4}
                fill={colors.tiffanyBlue}
                opacity={0.8}
                filter="url(#eventGlow)"
              />
            );
          })}

          {/* Event nodes */}
          {EVENT_NODES.map((node, i) => {
            const entrance = nodeEntrances[i];
            const opacity = interpolate(entrance, [0, 1], [0, 1]);
            const scale = interpolate(entrance, [0, 1], [0.5, 1]);

            // Flash effect when this node is "firing"
            const isFlashing = currentFlashNode === i && frame > 3 * fps;
            const flashScale = isFlashing
              ? 1 + (1 - flashProgress) * 0.3
              : 1;
            const flashGlow = isFlashing ? (1 - flashProgress) * 0.6 : 0;

            return (
              <g
                key={`node-${i}`}
                opacity={opacity}
                transform={`translate(${node.x}, ${node.y}) scale(${scale * flashScale}) translate(${-node.x}, ${-node.y})`}
              >
                {/* Glow ring on flash */}
                {isFlashing && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={55}
                    fill="none"
                    stroke={node.color}
                    strokeWidth={2}
                    opacity={flashGlow}
                    filter="url(#eventGlow)"
                  />
                )}
                {/* Main circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={42}
                  fill={`${node.color}25`}
                  stroke={node.color}
                  strokeWidth={2.5}
                />
                {/* Inner dot */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={8}
                  fill={node.color}
                  opacity={0.8 + Math.sin(frame * 0.1 + i) * 0.2}
                />
                {/* Label */}
                <text
                  x={node.x}
                  y={node.y + 70}
                  textAnchor="middle"
                  fill={colors.white}
                  fontSize={24}
                  fontFamily={fontFamily}
                  fontWeight={700}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
