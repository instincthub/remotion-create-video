import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Animated turtle robot inspired by Grey Walter's tortoises
const TurtleRobot: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterOpacity = interpolate(frame, [fps, 2.5 * fps], [0, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Gentle bobbing motion
  const bobY = Math.sin(frame * 0.04) * 6;
  // Slow forward drift
  const driftX = interpolate(frame, [2 * fps, 14 * fps], [0, 80], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Light sensor glow
  const sensorGlow = interpolate(
    Math.sin(frame * 0.08),
    [-1, 1],
    [0.3, 1]
  );

  return (
    <AbsoluteFill style={{ opacity: enterOpacity }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        <g transform={`translate(${700 + driftX}, ${620 + bobY})`}>
          {/* Shell */}
          <ellipse
            cx={0}
            cy={0}
            rx={90}
            ry={55}
            fill={`${colors.tiffanyBlue}30`}
            stroke={colors.tiffanyBlue}
            strokeWidth={2}
          />
          {/* Shell ridges */}
          <ellipse
            cx={0}
            cy={-5}
            rx={65}
            ry={38}
            fill="none"
            stroke={colors.tiffanyBlue}
            strokeWidth={1}
            opacity={0.5}
          />
          <ellipse
            cx={0}
            cy={-10}
            rx={40}
            ry={22}
            fill="none"
            stroke={colors.tiffanyBlue}
            strokeWidth={1}
            opacity={0.3}
          />
          {/* Head */}
          <ellipse
            cx={95}
            cy={5}
            rx={22}
            ry={16}
            fill={`${colors.tiffanyBlue}40`}
            stroke={colors.tiffanyBlue}
            strokeWidth={1.5}
          />
          {/* Sensor (eye/light) */}
          <circle
            cx={112}
            cy={0}
            r={6}
            fill={colors.caribbeanGreen}
            opacity={sensorGlow}
          />
          <circle
            cx={112}
            cy={0}
            r={12}
            fill="none"
            stroke={colors.caribbeanGreen}
            strokeWidth={1}
            opacity={sensorGlow * 0.4}
          />
          {/* Wheels */}
          <circle cx={-50} cy={45} r={14} fill="none" stroke={colors.tiffanyBlue} strokeWidth={2} />
          <circle cx={50} cy={45} r={14} fill="none" stroke={colors.tiffanyBlue} strokeWidth={2} />
          <circle cx={0} cy={48} r={10} fill="none" stroke={colors.tiffanyBlue} strokeWidth={1.5} />
        </g>

        {/* Light rays the turtle is "chasing" */}
        {[0, 1, 2].map((i) => {
          const rayOpacity = interpolate(
            Math.sin(frame * 0.06 + i * 1.2),
            [-1, 1],
            [0.05, 0.2]
          );
          return (
            <line
              key={`ray-${i}`}
              x1={1500}
              y1={200}
              x2={800 + driftX + i * 40}
              y2={600 + bobY + i * 15}
              stroke={colors.corn}
              strokeWidth={1}
              opacity={rayOpacity}
            />
          );
        })}

        {/* Light source */}
        <circle cx={1500} cy={200} r={20} fill={colors.corn} opacity={0.15} />
        <circle cx={1500} cy={200} r={10} fill={colors.corn} opacity={0.25} />
      </svg>
    </AbsoluteFill>
  );
};

// Floating grid dots
const GridDots: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 45], [0, 0.12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const dots: { x: number; y: number }[] = [];
  for (let row = 0; row < 12; row++) {
    for (let col = 0; col < 20; col++) {
      dots.push({ x: 60 + col * 100, y: 60 + row * 100 });
    }
  }

  return (
    <AbsoluteFill style={{ opacity }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        {dots.map((dot, i) => {
          const pulse = Math.sin(frame * 0.03 + i * 0.15) * 0.5 + 0.5;
          return (
            <circle
              key={`dot-${i}`}
              cx={dot.x}
              cy={dot.y}
              r={2}
              fill={colors.white}
              opacity={pulse}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow zoom
  const zoom = interpolate(frame, [0, 15 * fps], [1, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Main text
  const textProgress = spring({
    frame,
    fps,
    delay: 15,
    config: { damping: 12, stiffness: 100 },
  });
  const textScale = interpolate(textProgress, [0, 1], [0.6, 1]);
  const textOpacity = interpolate(textProgress, [0, 1], [0, 1]);

  // "1949" emphasis - slightly delayed pop
  const yearProgress = spring({
    frame,
    fps,
    delay: fps,
    config: { damping: 8, stiffness: 120 },
  });
  const yearScale = interpolate(yearProgress, [0, 1], [1.3, 1]);

  // Subtext
  const subProgress = spring({
    frame,
    fps,
    delay: 3 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);
  const subY = interpolate(subProgress, [0, 1], [30, 0]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.americanPurple} 0%, ${colors.darkCyra} 100%)`,
        fontFamily,
      }}
    >
      <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
        <GridDots />
        <TurtleRobot />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
          zIndex: 1,
          paddingBottom: 200,
        }}
      >
        <div
          style={{
            fontSize: 60,
            fontWeight: "bold",
            color: colors.white,
            transform: `scale(${textScale})`,
            opacity: textOpacity,
            textAlign: "center",
            lineHeight: 1.3,
            maxWidth: 1200,
          }}
        >
          The First Autonomous Robot
          <br />
          Was Built in{" "}
          <span
            style={{
              color: colors.caribbeanGreen,
              transform: `scale(${yearScale})`,
              display: "inline-block",
            }}
          >
            1949
          </span>
        </div>

        <div
          style={{
            fontSize: 26,
            color: `${colors.white}CC`,
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.5,
          }}
        >
          Before computers even looked like computers.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
