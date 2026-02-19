import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Camera lens animation
const CameraLens: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  const irisRotation = frame * 0.5;

  return (
    <g opacity={opacity}>
      <circle
        cx={300}
        cy={480}
        r={60}
        fill="none"
        stroke={colors.darkCyra}
        strokeWidth={3}
      />
      <circle cx={300} cy={480} r={45} fill={`${colors.darkCyra}15`} />
      {/* Iris blades */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2 + (irisRotation * Math.PI) / 180;
        const x1 = 300 + Math.cos(angle) * 20;
        const y1 = 480 + Math.sin(angle) * 20;
        const x2 = 300 + Math.cos(angle) * 42;
        const y2 = 480 + Math.sin(angle) * 42;
        return (
          <line
            key={`iris-${i}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={colors.darkCyra}
            strokeWidth={2}
          />
        );
      })}
      <circle cx={300} cy={480} r={12} fill={colors.darkCyra} opacity={0.3} />
      {/* Label */}
      <text
        x={300}
        y={570}
        textAnchor="middle"
        fontSize={18}
        fill={colors.rhythm}
        fontFamily="Inter, sans-serif"
      >
        Camera
      </text>
    </g>
  );
};

// Infrared scan lines
const InfraredSensor: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();

  return (
    <g opacity={opacity}>
      <rect
        x={430}
        y={430}
        width={100}
        height={100}
        rx={8}
        fill="none"
        stroke={colors.oldRose}
        strokeWidth={2}
      />
      {/* Scan lines */}
      {[0, 1, 2, 3, 4].map((i) => {
        const scanOpacity = interpolate(
          Math.sin(frame * 0.08 + i * 0.8),
          [-1, 1],
          [0.2, 0.8]
        );
        return (
          <line
            key={`scan-${i}`}
            x1={440}
            y1={445 + i * 20}
            x2={520}
            y2={445 + i * 20}
            stroke={colors.oldRose}
            strokeWidth={2}
            opacity={scanOpacity}
          />
        );
      })}
      {/* Heat gradient circle */}
      <circle cx={480} cy={480} r={25} fill={`${colors.oldRose}30`} />
      <circle cx={480} cy={480} r={15} fill={`${colors.corn}30`} />
      <text
        x={480}
        y={570}
        textAnchor="middle"
        fontSize={18}
        fill={colors.rhythm}
        fontFamily="Inter, sans-serif"
      >
        Infrared
      </text>
    </g>
  );
};

// Touch sensor bumper
const TouchSensor: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  const bump = Math.sin(frame * 0.1) > 0.7 ? 3 : 0;

  return (
    <g opacity={opacity}>
      <rect
        x={600}
        y={440}
        width={90}
        height={80}
        rx={6}
        fill="none"
        stroke={colors.tiffanyBlue}
        strokeWidth={2}
      />
      {/* Bumper plate */}
      <rect
        x={605 - bump}
        y={450}
        width={80 + bump}
        height={60}
        rx={4}
        fill={`${colors.tiffanyBlue}20`}
        stroke={colors.tiffanyBlue}
        strokeWidth={1.5}
      />
      {/* Pressure lines */}
      {bump > 0 && (
        <>
          <line x1={620} y1={460} x2={620} y2={500} stroke={colors.tiffanyBlue} strokeWidth={1} opacity={0.5} />
          <line x1={645} y1={460} x2={645} y2={500} stroke={colors.tiffanyBlue} strokeWidth={1} opacity={0.5} />
          <line x1={670} y1={460} x2={670} y2={500} stroke={colors.tiffanyBlue} strokeWidth={1} opacity={0.5} />
        </>
      )}
      <text
        x={645}
        y={570}
        textAnchor="middle"
        fontSize={18}
        fill={colors.rhythm}
        fontFamily="Inter, sans-serif"
      >
        Touch
      </text>
    </g>
  );
};

// Factory robot arm (fixed)
const FactoryRobot: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  const armAngle = Math.sin(frame * 0.04) * 15;

  return (
    <g opacity={opacity}>
      {/* Base */}
      <rect
        x={1180}
        y={580}
        width={120}
        height={20}
        rx={4}
        fill={colors.metallicBlue}
      />
      {/* Pillar */}
      <rect x={1225} y={420} width={30} height={160} fill={colors.metallicBlue} />
      {/* Arm */}
      <g transform={`rotate(${armAngle}, 1240, 420)`}>
        <rect x={1240} y={410} width={100} height={20} rx={4} fill={colors.darkCyra} />
        {/* Gripper */}
        <path
          d="M 1340 410 L 1355 395 M 1340 430 L 1355 445"
          fill="none"
          stroke={colors.darkCyra}
          strokeWidth={3}
        />
      </g>
      {/* Grid floor */}
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={`grid-${i}`}
          x1={1100}
          y1={605}
          x2={1100 + (i + 1) * 50}
          y2={605 + (i + 1) * 15}
          stroke={colors.chineseSilver}
          strokeWidth={1}
          opacity={0.4}
        />
      ))}
      <text
        x={1240}
        y={660}
        textAnchor="middle"
        fontSize={18}
        fontWeight="bold"
        fill={colors.rhythm}
        fontFamily="Inter, sans-serif"
      >
        Fixed Robot
      </text>
      <text
        x={1240}
        y={685}
        textAnchor="middle"
        fontSize={15}
        fill={colors.chineseSilver}
        fontFamily="Inter, sans-serif"
      >
        Controlled environment
      </text>
    </g>
  );
};

// Mobile robot navigating
const MobileRobot: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  const moveX = Math.sin(frame * 0.03) * 30;
  const moveY = Math.cos(frame * 0.025) * 15;

  // Navigation path dots
  const pathDots = [
    { x: 1500, y: 520 },
    { x: 1540, y: 480 },
    { x: 1580, y: 500 },
    { x: 1620, y: 460 },
    { x: 1660, y: 440 },
    { x: 1700, y: 460 },
  ];

  return (
    <g opacity={opacity}>
      {/* Navigation trail */}
      {pathDots.map((dot, i) => {
        const trailOpacity = interpolate(
          Math.sin(frame * 0.05 - i * 0.5),
          [-1, 1],
          [0.1, 0.4]
        );
        return (
          <circle
            key={`trail-${i}`}
            cx={dot.x}
            cy={dot.y}
            r={3}
            fill={colors.caribbeanGreen}
            opacity={trailOpacity}
          />
        );
      })}

      {/* Robot body */}
      <g transform={`translate(${1580 + moveX}, ${500 + moveY})`}>
        <rect
          x={-25}
          y={-20}
          width={50}
          height={35}
          rx={6}
          fill={`${colors.darkCyra}30`}
          stroke={colors.darkCyra}
          strokeWidth={2}
        />
        {/* Sensor array (top) */}
        <line x1={-15} y1={-20} x2={-15} y2={-30} stroke={colors.caribbeanGreen} strokeWidth={1.5} />
        <line x1={0} y1={-20} x2={0} y2={-35} stroke={colors.caribbeanGreen} strokeWidth={1.5} />
        <line x1={15} y1={-20} x2={15} y2={-30} stroke={colors.caribbeanGreen} strokeWidth={1.5} />
        {/* Wheels */}
        <circle cx={-20} cy={20} r={8} fill="none" stroke={colors.darkCyra} strokeWidth={2} />
        <circle cx={20} cy={20} r={8} fill="none" stroke={colors.darkCyra} strokeWidth={2} />
      </g>

      {/* Obstacles */}
      <rect
        x={1510}
        y={540}
        width={20}
        height={30}
        rx={3}
        fill={colors.chineseSilver}
        opacity={0.5}
      />
      <rect
        x={1650}
        y={470}
        width={25}
        height={20}
        rx={3}
        fill={colors.chineseSilver}
        opacity={0.5}
      />

      <text
        x={1580}
        y={660}
        textAnchor="middle"
        fontSize={18}
        fontWeight="bold"
        fill={colors.rhythm}
        fontFamily="Inter, sans-serif"
      >
        Mobile Robot
      </text>
      <text
        x={1580}
        y={685}
        textAnchor="middle"
        fontSize={15}
        fill={colors.chineseSilver}
        fontFamily="Inter, sans-serif"
      >
        Open environment
      </text>
    </g>
  );
};

export const Scene3SensorsMobility: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Section 1 heading: Sensors
  const sensorsProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 12, stiffness: 100 },
  });
  const sensorsOpacity = interpolate(sensorsProgress, [0, 1], [0, 1]);
  const sensorsY = interpolate(sensorsProgress, [0, 1], [-20, 0]);

  // Sensor icons
  const sensorIconsProgress = spring({
    frame,
    fps,
    delay: fps,
    config: { damping: 14, stiffness: 80 },
  });
  const sensorIconsOpacity = interpolate(sensorIconsProgress, [0, 1], [0, 1]);

  // Divider line
  const dividerProgress = interpolate(frame, [4 * fps, 5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Section 2 heading: Mobility
  const mobilityProgress = spring({
    frame,
    fps,
    delay: 5 * fps,
    config: { damping: 12, stiffness: 100 },
  });
  const mobilityOpacity = interpolate(mobilityProgress, [0, 1], [0, 1]);

  // Robots
  const fixedProgress = spring({
    frame,
    fps,
    delay: 6 * fps,
    config: { damping: 14, stiffness: 80 },
  });
  const fixedOpacity = interpolate(fixedProgress, [0, 1], [0, 1]);

  const mobileProgress = spring({
    frame,
    fps,
    delay: 7.5 * fps,
    config: { damping: 14, stiffness: 80 },
  });
  const mobileOpacity = interpolate(mobileProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.magnolia,
        fontFamily,
      }}
    >
      {/* Section headers */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 120,
          opacity: sensorsOpacity,
          transform: `translateY(${sensorsY}px)`,
        }}
      >
        <div style={{ fontSize: 20, color: colors.darkCyra, fontWeight: "bold", letterSpacing: 3 }}>
          01
        </div>
        <div style={{ fontSize: 48, fontWeight: "bold", color: colors.darkSlateGray }}>
          Sensors
        </div>
        <div style={{ fontSize: 22, color: colors.rhythm, marginTop: 8, maxWidth: 600 }}>
          For a robot to act on its own, it needs to perceive the world.
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 60,
          right: 120,
          opacity: mobilityOpacity,
          textAlign: "right",
        }}
      >
        <div style={{ fontSize: 20, color: colors.darkCyra, fontWeight: "bold", letterSpacing: 3 }}>
          02
        </div>
        <div style={{ fontSize: 48, fontWeight: "bold", color: colors.darkSlateGray }}>
          Mobility
        </div>
        <div style={{ fontSize: 22, color: colors.rhythm, marginTop: 8, maxWidth: 600 }}>
          Fixed vs. mobile robots face very different challenges.
        </div>
      </div>

      {/* Vertical divider */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 200,
          width: 2,
          height: `${dividerProgress * 500}px`,
          backgroundColor: colors.chineseSilver,
          transform: "translateX(-50%)",
        }}
      />

      {/* Sensor visuals (left side) */}
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <CameraLens opacity={sensorIconsOpacity} />
        <InfraredSensor opacity={sensorIconsOpacity} />
        <TouchSensor opacity={sensorIconsOpacity} />
        <FactoryRobot opacity={fixedOpacity} />
        <MobileRobot opacity={mobileOpacity} />
      </svg>
    </AbsoluteFill>
  );
};
