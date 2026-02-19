import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Soft particle motion in dark scene
const Particles: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const particles = Array.from({ length: 60 }, (_, i) => ({
    x: (i * 173 + 50) % 1920,
    y: (i * 127 + 30) % 1080,
    size: 1.5 + (i % 4) * 1,
    speed: 0.3 + (i % 6) * 0.15,
    phase: i * 0.7,
  }));

  return (
    <AbsoluteFill style={{ opacity }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        {particles.map((p, i) => {
          const floatX = Math.sin((frame * 0.02 + p.phase) * p.speed) * 20;
          const floatY = Math.cos((frame * 0.015 + p.phase) * p.speed) * 15;
          const pulse = Math.sin(frame * 0.04 + p.phase) * 0.4 + 0.6;

          return (
            <circle
              key={`p-${i}`}
              cx={p.x + floatX}
              cy={p.y + floatY}
              r={p.size}
              fill={i % 3 === 0 ? colors.tiffanyBlue : colors.caribbeanGreen}
              opacity={pulse * 0.4}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

// Drone delivery animation
const DroneDelivery: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterProgress = spring({
    frame,
    fps,
    delay,
    config: { damping: 14, stiffness: 80 },
  });
  const opacity = interpolate(enterProgress, [0, 1], [0, 1]);

  // Drone flies across
  const droneX = interpolate(frame, [delay, delay + 6 * fps], [-80, 400], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const droneY = 260 + Math.sin((frame - delay) * 0.06) * 10;

  // Propeller spin
  const propAngle = frame * 12;

  return (
    <g opacity={opacity}>
      <g transform={`translate(${droneX}, ${droneY})`}>
        {/* Body */}
        <rect
          x={-15}
          y={-5}
          width={30}
          height={12}
          rx={4}
          fill={colors.tiffanyBlue}
        />
        {/* Arms */}
        <line
          x1={-25}
          y1={0}
          x2={-35}
          y2={-10}
          stroke={colors.tiffanyBlue}
          strokeWidth={2}
        />
        <line
          x1={25}
          y1={0}
          x2={35}
          y2={-10}
          stroke={colors.tiffanyBlue}
          strokeWidth={2}
        />
        {/* Propellers */}
        <ellipse
          cx={-35}
          cy={-12}
          rx={12 * Math.abs(Math.cos((propAngle * Math.PI) / 180))}
          ry={2}
          fill={colors.white}
          opacity={0.7}
        />
        <ellipse
          cx={35}
          cy={-12}
          rx={12 * Math.abs(Math.cos(((propAngle + 90) * Math.PI) / 180))}
          ry={2}
          fill={colors.white}
          opacity={0.7}
        />
        {/* Package */}
        <rect
          x={-8}
          y={8}
          width={16}
          height={12}
          rx={2}
          fill={colors.caribbeanGreen}
          opacity={0.8}
        />
      </g>
    </g>
  );
};

// Smart alarm clock
const SmartAlarm: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterProgress = spring({
    frame,
    fps,
    delay,
    config: { damping: 12, stiffness: 90 },
  });
  const opacity = interpolate(enterProgress, [0, 1], [0, 1]);

  // Clock hands
  const hourAngle = ((frame - delay) * 0.5) % 360;
  const minuteAngle = ((frame - delay) * 3) % 360;

  return (
    <g opacity={opacity} transform="translate(960, 500)">
      {/* Clock face */}
      <circle
        cx={0}
        cy={0}
        r={40}
        fill="none"
        stroke={colors.tiffanyBlue}
        strokeWidth={2}
      />
      {/* Hour marks */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        return (
          <line
            key={`mark-${i}`}
            x1={Math.sin(angle) * 32}
            y1={-Math.cos(angle) * 32}
            x2={Math.sin(angle) * 36}
            y2={-Math.cos(angle) * 36}
            stroke={colors.tiffanyBlue}
            strokeWidth={1.5}
          />
        );
      })}
      {/* Hour hand */}
      <line
        x1={0}
        y1={0}
        x2={Math.sin((hourAngle * Math.PI) / 180) * 18}
        y2={-Math.cos((hourAngle * Math.PI) / 180) * 18}
        stroke={colors.white}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      {/* Minute hand */}
      <line
        x1={0}
        y1={0}
        x2={Math.sin((minuteAngle * Math.PI) / 180) * 28}
        y2={-Math.cos((minuteAngle * Math.PI) / 180) * 28}
        stroke={colors.white}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      {/* Adjusting label */}
      <text
        y={65}
        textAnchor="middle"
        fontSize={16}
        fill={colors.caribbeanGreen}
        fontFamily="Inter, sans-serif"
      >
        Auto-adjusting
      </text>
    </g>
  );
};

// Adaptive news feed
const NewsFeed: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterProgress = spring({
    frame,
    fps,
    delay,
    config: { damping: 12, stiffness: 80 },
  });
  const opacity = interpolate(enterProgress, [0, 1], [0, 1]);
  const slideX = interpolate(enterProgress, [0, 1], [40, 0]);

  const lines = [
    { width: 180, y: 0 },
    { width: 140, y: 22 },
    { width: 160, y: 44 },
    { width: 120, y: 66 },
  ];

  return (
    <g
      opacity={opacity}
      transform={`translate(${1400 + slideX}, 460)`}
    >
      {/* Feed container */}
      <rect
        x={0}
        y={-15}
        width={220}
        height={110}
        rx={8}
        fill={colors.deepGreenCyanTurquoise}
        stroke={colors.tiffanyBlue}
        strokeWidth={1}
        opacity={0.5}
      />
      {/* Feed lines (shimmer) */}
      {lines.map((line, i) => {
        const shimmer = interpolate(
          Math.sin(frame * 0.06 + i * 0.8),
          [-1, 1],
          [0.3, 0.7]
        );
        return (
          <rect
            key={`line-${i}`}
            x={15}
            y={line.y}
            width={line.width}
            height={12}
            rx={3}
            fill={colors.tiffanyBlue}
            opacity={shimmer}
          />
        );
      })}
    </g>
  );
};

export const Scene5Future2047: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow cinematic zoom
  const zoom = interpolate(frame, [0, 40 * fps], [1, 1.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 15,
    config: { damping: 10, stiffness: 80 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleScale = interpolate(titleProgress, [0, 1], [0.85, 1]);

  // Subtitle elements appear later
  const futureItems = [
    { text: "Drone delivers beer before you ask", delay: 6 * fps },
    { text: "Alarm adjusts to underground delays", delay: 12 * fps },
    { text: "News adapts to your mood", delay: 18 * fps },
    { text: "Home temperature shifts before you feel it", delay: 24 * fps },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${colors.deepGreenCyanTurquoise} 0%, ${colors.gunmetal} 100%)`,
        fontFamily,
      }}
    >
      <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
        <Particles />
      </AbsoluteFill>

      {/* Visual elements */}
      <AbsoluteFill>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080">
          <DroneDelivery delay={5 * fps} />
          <SmartAlarm delay={11 * fps} />
          <NewsFeed delay={17 * fps} />
        </svg>
      </AbsoluteFill>

      {/* Title */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: 100,
          zIndex: 2,
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            fontSize: 64,
            fontWeight: "bold",
            color: colors.white,
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          <span style={{ color: colors.tiffanyBlue }}>2047</span>: A World That
          Feels{" "}
          <span style={{ color: colors.caribbeanGreen }}>Alive</span>
        </div>
      </AbsoluteFill>

      {/* Future items list */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          paddingBottom: 240,
          paddingLeft: 160,
          zIndex: 2,
        }}
      >
        {futureItems.map((item, i) => {
          const itemProgress = spring({
            frame,
            fps,
            delay: item.delay,
            config: { damping: 12, stiffness: 80 },
          });
          const itemOpacity = interpolate(itemProgress, [0, 1], [0, 1]);
          const itemX = interpolate(itemProgress, [0, 1], [-30, 0]);

          return (
            <div
              key={`item-${i}`}
              style={{
                opacity: itemOpacity,
                transform: `translateX(${itemX}px)`,
                fontSize: 26,
                color: colors.white,
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: colors.tiffanyBlue,
                  flexShrink: 0,
                }}
              />
              {item.text}
            </div>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
