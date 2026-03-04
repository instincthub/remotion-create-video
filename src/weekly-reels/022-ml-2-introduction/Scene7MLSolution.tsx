import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Circular feedback loop
const FeedbackLoop: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, delay: 15, config: { damping: 200 } });
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const scale = interpolate(entrance, [0, 1], [0.7, 1]);

  // Rotating dash offset for the circular arrow
  const dashOffset = -frame * 1.5;

  // Node labels and positions around a circle
  const nodes = [
    { label: "Define\nRules", angle: -90, delay: 25 },
    { label: "Train\nModel", angle: 0, delay: 40 },
    { label: "Learn from\nUsers", angle: 90, delay: 55 },
    { label: "Improve", angle: 180, delay: 70 },
  ];

  const cx = 200;
  const cy = 200;
  const radius = 130;

  return (
    <div style={{ opacity, transform: `scale(${scale})`, position: "relative" }}>
      <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
        {/* Circular path (dashed, rotating) */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke={`${colors.tiffanyBlue}30`}
          strokeWidth={2}
          strokeDasharray="12 8"
          strokeDashoffset={dashOffset}
        />

        {/* Direction arrows on the circle */}
        {[0, 90, 180, 270].map((angleDeg, i) => {
          const angleRad = ((angleDeg + 45) * Math.PI) / 180;
          const ax = cx + Math.cos(angleRad) * radius;
          const ay = cy + Math.sin(angleRad) * radius;
          const arrowAngle = angleDeg + 45 + 90;
          const arrowOpacity = Math.sin(frame * 0.08 + i * 1.5) * 0.3 + 0.6;
          return (
            <g
              key={i}
              transform={`translate(${ax}, ${ay}) rotate(${arrowAngle})`}
              opacity={arrowOpacity}
            >
              <path
                d="M-6 -4 L0 4 L6 -4"
                stroke={colors.tiffanyBlue}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const angleRad = (node.angle * Math.PI) / 180;
          const nx = cx + Math.cos(angleRad) * radius;
          const ny = cy + Math.sin(angleRad) * radius;

          const nodeEntrance = spring({
            frame,
            fps,
            delay: node.delay,
            config: { damping: 14, stiffness: 80 },
          });
          const nodeScale = interpolate(nodeEntrance, [0, 1], [0, 1]);
          const nodeOpacity = interpolate(nodeEntrance, [0, 1], [0, 1]);

          const pulse = Math.sin(frame * 0.06 + i * 1.5) * 0.08 + 1;

          return (
            <g key={i} opacity={nodeOpacity} transform={`translate(${nx}, ${ny}) scale(${nodeScale * pulse})`}>
              {/* Node circle */}
              <circle
                cx={0}
                cy={0}
                r={40}
                fill={`${colors.tiffanyBlue}12`}
                stroke={colors.tiffanyBlue}
                strokeWidth={1.5}
              />
              {/* Node label */}
              {node.label.split("\n").map((line, j) => (
                <text
                  key={j}
                  x={0}
                  y={j * 16 - (node.label.split("\n").length - 1) * 8}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={colors.white}
                  fontSize="13"
                  fontWeight={700}
                  fontFamily="Inter, sans-serif"
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}

        {/* Center label */}
        <text
          x={cx}
          y={cy - 8}
          textAnchor="middle"
          dominantBaseline="central"
          fill={colors.caribbeanGreen}
          fontSize="16"
          fontWeight={700}
          fontFamily="Inter, sans-serif"
          opacity={interpolate(frame, [80, 100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        >
          ML
        </text>
        <text
          x={cx}
          y={cy + 12}
          textAnchor="middle"
          dominantBaseline="central"
          fill={colors.caribbeanGreen}
          fontSize="12"
          fontWeight={400}
          fontFamily="Inter, sans-serif"
          opacity={interpolate(frame, [80, 100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        >
          CYCLE
        </text>
      </svg>
    </div>
  );
};

export const Scene7MLSolution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 200 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  const subProgress = spring({
    frame,
    fps,
    delay: 90,
    config: { damping: 200 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${colors.gunmetal}, ${colors.darkSlateGray})`,
        fontFamily,
      }}
    >
      <AbsoluteFill style={{ opacity: 0.03 }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`h-${i}`}
            style={{
              position: "absolute",
              top: i * 96,
              left: 0,
              width: "100%",
              height: 1,
              backgroundColor: colors.tiffanyBlue,
            }}
          />
        ))}
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 300,
          paddingLeft: 50,
          paddingRight: 50,
          gap: 20,
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: 42,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            lineHeight: 1.3,
          }}
        >
          Through
          <br />
          <span style={{ color: colors.tiffanyBlue }}>Machine Learning</span>
        </div>

        <FeedbackLoop />

        {/* Subtitle */}
        <div
          style={{
            fontSize: 26,
            fontWeight: 400,
            color: colors.chineseSilver,
            textAlign: "center",
            opacity: subOpacity,
            lineHeight: 1.5,
          }}
        >
          It learns from people's interaction
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
