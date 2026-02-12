import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const ICON_R = 34; // icon circle radius

// Role positions = center of the icon circle (in 1920x1080 coords)
const ROLES = [
  { label: "Data Scientist", icon: "D", x: 960, y: 310, color: colors.darkCyra },
  { label: "Business Analyst", icon: "B", x: 600, y: 460, color: colors.viridianGreen },
  { label: "Ethicist", icon: "E", x: 1320, y: 460, color: colors.turkishRose },
  { label: "Engineer", icon: "G", x: 650, y: 700, color: colors.tiffanyBlue },
  { label: "UX Designer", icon: "U", x: 1270, y: 700, color: colors.caribbeanGreen },
  { label: "Test Specialist", icon: "T", x: 960, y: 800, color: colors.darkSlateGray },
];

// Central hub center
const HUB = { x: 960, y: 550 };
const HUB_W = 200;
const HUB_H = 96;

export const Scene5Team: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 200 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  // Hub appears
  const hubProgress = spring({
    frame,
    fps,
    delay: 2 * fps,
    config: { damping: 200 },
  });
  const hubScale = interpolate(hubProgress, [0, 1], [0.3, 1]);
  const hubOpacity = interpolate(hubProgress, [0, 1], [0, 1]);

  // Pulse for connections
  const pulse = Math.sin(frame * 0.06) * 0.2 + 0.8;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.white,
        fontFamily,
      }}
    >
      {/* Subtle grid */}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(${colors.chineseSilver}25 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
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
          fontSize: 56,
          fontWeight: "bold",
          color: colors.gunmetal,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        Building Real Solutions{" "}
        <span style={{ color: colors.darkCyra }}>Requires a Team</span>
      </div>

      {/* Full-screen SVG for connections, dots, icons, and labels */}
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        {/* Connection lines from each role to hub center */}
        {ROLES.map((role, i) => {
          const connectionDelay = (4 + i * 1.5) * fps;
          const connectionProgress = interpolate(
            frame,
            [connectionDelay, connectionDelay + fps],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );

          const endX = role.x + (HUB.x - role.x) * connectionProgress;
          const endY = role.y + (HUB.y - role.y) * connectionProgress;

          return (
            <line
              key={`connection-${i}`}
              x1={role.x}
              y1={role.y}
              x2={endX}
              y2={endY}
              stroke={role.color}
              strokeWidth={2}
              opacity={connectionProgress * pulse}
              strokeDasharray="8 5"
            />
          );
        })}

        {/* Animated data flow dots */}
        {ROLES.map((role, i) => {
          const dotActive = frame > (6 + i * 1.5) * fps;
          if (!dotActive) return null;

          const t = (frame * 0.02 + i * 0.3) % 1;
          const dotX = role.x + (HUB.x - role.x) * t;
          const dotY = role.y + (HUB.y - role.y) * t;

          return (
            <circle
              key={`dot-${i}`}
              cx={dotX}
              cy={dotY}
              r={5}
              fill={role.color}
              opacity={0.7}
            />
          );
        })}

        {/* Role icon circles + letters + labels — all in SVG for alignment */}
        {ROLES.map((role, i) => {
          const nodeDelay = (3 + i * 1.2) * fps;
          const nodeProgress = spring({
            frame,
            fps,
            delay: nodeDelay,
            config: { damping: 12, stiffness: 150 },
          });
          const nodeScale = interpolate(nodeProgress, [0, 1], [0.2, 1]);
          const nodeOpacity = interpolate(nodeProgress, [0, 1], [0, 1]);

          return (
            <g
              key={`node-${i}`}
              opacity={nodeOpacity}
              transform={`translate(${role.x}, ${role.y}) scale(${nodeScale})`}
            >
              {/* Background circle */}
              <circle
                cx={0}
                cy={0}
                r={ICON_R}
                fill={`${role.color}18`}
                stroke={role.color}
                strokeWidth={3}
              />
              {/* Letter */}
              <text
                x={0}
                y={2}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={role.color}
                fontSize={28}
                fontWeight="bold"
                fontFamily={fontFamily}
              >
                {role.icon}
              </text>
              {/* Label below circle */}
              <text
                x={0}
                y={ICON_R + 26}
                textAnchor="middle"
                fill={colors.gunmetal}
                fontSize={20}
                fontWeight="bold"
                fontFamily={fontFamily}
              >
                {role.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Central hub — HTML div for background + shadow */}
      <div
        style={{
          position: "absolute",
          left: HUB.x - HUB_W / 2,
          top: HUB.y - HUB_H / 2,
          width: HUB_W,
          height: HUB_H,
          borderRadius: 18,
          backgroundColor: colors.darkCyra,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${hubScale})`,
          opacity: hubOpacity,
          boxShadow: `0 0 30px ${colors.darkCyra}40`,
          zIndex: 1,
        }}
      >
        <div
          style={{
            color: colors.white,
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          Engineering
          <br />
          Framework
        </div>
      </div>
    </AbsoluteFill>
  );
};
