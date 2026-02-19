import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Sequential storytelling steps
const StoryStep: React.FC<{
  delay: number;
  x: number;
  y: number;
  icon: React.ReactNode;
  label: string;
  index: number;
}> = ({ delay, x, y, icon, label, index }) => {
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

  const floatY = Math.sin((frame - delay) * 0.03) * 3;

  return (
    <g
      transform={`translate(${x}, ${y + floatY}) scale(${scale})`}
      opacity={opacity}
    >
      {/* Circle background */}
      <circle cx={0} cy={0} r={60} fill={colors.darkCyra} opacity={0.1} />
      <circle
        cx={0}
        cy={0}
        r={60}
        fill="none"
        stroke={colors.darkCyra}
        strokeWidth={2}
      />
      {/* Step number */}
      <text
        x={-45}
        y={-45}
        fontSize={18}
        fontWeight="bold"
        fill={colors.darkCyra}
        fontFamily="Inter, sans-serif"
      >
        {index + 1}
      </text>
      {/* Icon */}
      {icon}
      {/* Label */}
      <text
        y={90}
        textAnchor="middle"
        fontSize={20}
        fontWeight="bold"
        fill={colors.gunmetal}
        fontFamily="Inter, sans-serif"
      >
        {label}
      </text>
    </g>
  );
};

// Connection arrow between steps
const ConnectionArrow: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
}> = ({ x1, y1, x2, y2, delay }) => {
  const frame = useCurrentFrame();

  const drawProgress = interpolate(frame, [delay, delay + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const dx = x2 - x1;
  const endX = x1 + dx * drawProgress;

  return (
    <g opacity={drawProgress > 0 ? 1 : 0}>
      <line
        x1={x1}
        y1={y1}
        x2={endX}
        y2={y2}
        stroke={colors.tiffanyBlue}
        strokeWidth={2}
        strokeDasharray="8 4"
      />
      {drawProgress > 0.9 && (
        <polygon
          points={`${x2},${y2} ${x2 - 10},${y2 - 6} ${x2 - 10},${y2 + 6}`}
          fill={colors.tiffanyBlue}
        />
      )}
    </g>
  );
};

export const Scene4MilkReminder: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Heading
  const headProgress = spring({
    frame,
    fps,
    delay: 15,
    config: { damping: 12, stiffness: 100 },
  });
  const headOpacity = interpolate(headProgress, [0, 1], [0, 1]);
  const headScale = interpolate(headProgress, [0, 1], [0.8, 1]);

  // Subtext
  const subProgress = spring({
    frame,
    fps,
    delay: 18 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);
  const subY = interpolate(subProgress, [0, 1], [20, 0]);

  // Icon components
  const shoppingBag = (
    <g transform="translate(-20, -20)">
      <rect
        x={5}
        y={10}
        width={30}
        height={30}
        rx={3}
        fill="none"
        stroke={colors.darkCyra}
        strokeWidth={2}
      />
      <path
        d="M 12 10 L 12 5 C 12 0, 28 0, 28 5 L 28 10"
        fill="none"
        stroke={colors.darkCyra}
        strokeWidth={2}
      />
      {/* Milk carton inside */}
      <rect
        x={15}
        y={18}
        width={10}
        height={16}
        rx={1}
        fill={colors.tiffanyBlue}
        opacity={0.5}
      />
    </g>
  );

  const binSensor = (
    <g transform="translate(-20, -20)">
      <rect
        x={5}
        y={5}
        width={30}
        height={35}
        rx={3}
        fill="none"
        stroke={colors.darkCyra}
        strokeWidth={2}
      />
      <line
        x1={5}
        y1={12}
        x2={35}
        y2={12}
        stroke={colors.darkCyra}
        strokeWidth={1.5}
      />
      {/* Sensor glow */}
      <circle cx={20} cy={0} r={5} fill={colors.caribbeanGreen} opacity={0.8} />
      <circle cx={20} cy={0} r={10} fill={colors.caribbeanGreen} opacity={0.2} />
    </g>
  );

  const carIcon = (
    <g transform="translate(-25, -15)">
      <rect
        x={5}
        y={10}
        width={40}
        height={18}
        rx={4}
        fill="none"
        stroke={colors.darkCyra}
        strokeWidth={2}
      />
      <path
        d="M 10 10 L 15 0 L 35 0 L 40 10"
        fill="none"
        stroke={colors.darkCyra}
        strokeWidth={2}
      />
      <circle cx={14} cy={30} r={5} fill={colors.darkCyra} />
      <circle cx={36} cy={30} r={5} fill={colors.darkCyra} />
    </g>
  );

  const notifIcon = (
    <g transform="translate(-18, -20)">
      <rect
        x={3}
        y={3}
        width={30}
        height={38}
        rx={5}
        fill="none"
        stroke={colors.darkCyra}
        strokeWidth={2}
      />
      {/* Notification badge */}
      <circle cx={28} cy={8} r={8} fill={colors.oldRose} />
      <text
        x={28}
        y={12}
        textAnchor="middle"
        fontSize={10}
        fontWeight="bold"
        fill={colors.white}
        fontFamily="Inter, sans-serif"
      >
        !
      </text>
      {/* Text lines */}
      <line
        x1={10}
        y1={22}
        x2={28}
        y2={22}
        stroke={colors.chineseSilver}
        strokeWidth={2}
      />
      <line
        x1={10}
        y1={30}
        x2={22}
        y2={30}
        stroke={colors.chineseSilver}
        strokeWidth={2}
      />
    </g>
  );

  const steps = [
    { icon: shoppingBag, label: "Bought milk", x: 260, y: 500 },
    { icon: binSensor, label: "Bin detects empty", x: 620, y: 500 },
    { icon: carIcon, label: "Driving past station", x: 980, y: 500 },
    { icon: notifIcon, label: "Reminder sent", x: 1340, y: 500 },
  ];

  const stepDelay = (i: number) => 2 * fps + i * 2.5 * fps;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.magnolia,
        fontFamily,
      }}
    >
      {/* Story steps and connections */}
      <AbsoluteFill>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080">
          {/* Connection arrows */}
          {steps.slice(0, -1).map((step, i) => (
            <ConnectionArrow
              key={`arrow-${i}`}
              x1={step.x + 65}
              y1={step.y}
              x2={steps[i + 1].x - 65}
              y2={steps[i + 1].y}
              delay={stepDelay(i) + fps}
            />
          ))}

          {/* Steps */}
          {steps.map((step, i) => (
            <StoryStep
              key={`step-${i}`}
              delay={stepDelay(i)}
              x={step.x}
              y={step.y}
              icon={step.icon}
              label={step.label}
              index={i}
            />
          ))}
        </svg>
      </AbsoluteFill>

      {/* Heading */}
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
        <div
          style={{
            opacity: headOpacity,
            transform: `scale(${headScale})`,
            fontSize: 56,
            fontWeight: "bold",
            color: colors.darkSlateGray,
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          <span style={{ color: colors.darkCyra }}>Milk</span>. Petrol.{" "}
          <span style={{ color: colors.tiffanyBlue }}>One reminder</span>.
        </div>
      </AbsoluteFill>

      {/* Bottom text */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: 240,
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
          }}
        >
          Still not real intelligence.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
