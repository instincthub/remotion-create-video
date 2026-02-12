import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Labels positioned around the car with leader-line anchor points
const CAR_PARTS = [
  { label: "Engine", tagX: 180, tagY: 10, anchorX: 280, anchorY: 160, color: colors.darkCyra },
  { label: "Safety", tagX: 20, tagY: 100, anchorX: 140, anchorY: 140, color: colors.caribbeanGreen },
  { label: "Dashboard", tagX: 340, tagY: 10, anchorX: 380, anchorY: 80, color: colors.tiffanyBlue },
  { label: "Transmission", tagX: 480, tagY: 180, anchorX: 420, anchorY: 200, color: colors.viridianGreen },
  { label: "Data", tagX: 520, tagY: 90, anchorX: 470, anchorY: 140, color: colors.darkSlateGray },
];

// Fuel tank SVG
const FuelTank: React.FC<{ opacity: number; scale: number }> = ({
  opacity,
  scale,
}) => {
  const frame = useCurrentFrame();
  const bubbleY = (frame * 0.5) % 30;

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        transformOrigin: "center",
      }}
    >
      <svg width="160" height="220" viewBox="0 0 160 220" fill="none">
        {/* Tank body */}
        <rect
          x={20}
          y={20}
          width={120}
          height={160}
          rx={16}
          fill={`${colors.darkCyra}15`}
          stroke={colors.darkCyra}
          strokeWidth={3}
        />
        {/* Fuel level */}
        <rect
          x={26}
          y={80}
          width={108}
          height={94}
          rx={12}
          fill={`${colors.darkCyra}30`}
        />
        {/* Cap */}
        <rect
          x={60}
          y={6}
          width={40}
          height={18}
          rx={6}
          fill="none"
          stroke={colors.darkCyra}
          strokeWidth={2.5}
        />
        {/* Bubbles */}
        <circle cx={60} cy={130 - bubbleY} r={4} fill={colors.darkCyra} opacity={0.3} />
        <circle cx={90} cy={110 - bubbleY * 0.7} r={3} fill={colors.darkCyra} opacity={0.2} />
        <circle cx={110} cy={140 - bubbleY * 1.2} r={5} fill={colors.darkCyra} opacity={0.25} />
        {/* Label */}
        <text
          x={80}
          y={210}
          textAnchor="middle"
          fill={colors.darkCyra}
          fontSize={18}
          fontWeight="bold"
          fontFamily={fontFamily}
        >
          Algorithms
        </text>
      </svg>
    </div>
  );
};

// Car assembly with labeled parts positioned around it
const CarAssembly: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div style={{ position: "relative", width: 680, height: 320 }}>
      <svg width="680" height="320" viewBox="0 0 680 320" fill="none">
        {/* Car body outline — centered in the SVG */}
        <path
          d="M 120 210 L 120 160 Q 120 130 150 130 L 240 130 L 280 80 L 420 80 L 460 130 L 520 130 Q 550 130 550 160 L 550 210"
          fill={`${colors.darkCyra}08`}
          stroke={colors.darkCyra}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={progress}
        />
        {/* Bottom lines */}
        <line x1={140} y1={210} x2={230} y2={210} stroke={colors.darkCyra} strokeWidth={3} opacity={progress} />
        <line x1={410} y1={210} x2={530} y2={210} stroke={colors.darkCyra} strokeWidth={3} opacity={progress} />
        {/* Left wheel */}
        <circle cx={200} cy={220} r={32} fill="none" stroke={colors.gunmetal} strokeWidth={3} opacity={progress} />
        <circle cx={200} cy={220} r={13} fill="none" stroke={colors.gunmetal} strokeWidth={2} opacity={progress} />
        {/* Right wheel */}
        <circle cx={460} cy={220} r={32} fill="none" stroke={colors.gunmetal} strokeWidth={3} opacity={progress} />
        <circle cx={460} cy={220} r={13} fill="none" stroke={colors.gunmetal} strokeWidth={2} opacity={progress} />
        {/* Windshield */}
        <path
          d="M 285 85 L 270 125 L 415 125 L 415 85"
          fill={`${colors.tiffanyBlue}15`}
          stroke={colors.tiffanyBlue}
          strokeWidth={2}
          opacity={progress}
        />

        {/* Leader lines from labels to car parts */}
        {CAR_PARTS.map((part, i) => {
          const lineProgress = interpolate(
            progress,
            [0.3 + i * 0.1, 0.5 + i * 0.1],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          // Tag center estimate
          const tagCenterX = part.tagX + 50;
          const tagCenterY = part.tagY + 16;
          const dx = part.anchorX - tagCenterX;
          const dy = part.anchorY - tagCenterY;
          const endX = tagCenterX + dx * lineProgress;
          const endY = tagCenterY + dy * lineProgress;

          return (
            <line
              key={`line-${i}`}
              x1={tagCenterX}
              y1={tagCenterY}
              x2={endX}
              y2={endY}
              stroke={part.color}
              strokeWidth={1.5}
              opacity={lineProgress * 0.5}
              strokeDasharray="4 3"
            />
          );
        })}
      </svg>

      {/* Label tags positioned around the car */}
      {CAR_PARTS.map((part, i) => {
        const partProgress = interpolate(
          progress,
          [0.2 + i * 0.1, 0.4 + i * 0.1],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        const partY = interpolate(partProgress, [0, 1], [20, 0]);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: part.tagX,
              top: part.tagY,
              opacity: partProgress,
              transform: `translateY(${partY}px)`,
            }}
          >
            <div
              style={{
                backgroundColor: `${part.color}15`,
                border: `2px solid ${part.color}`,
                borderRadius: 8,
                padding: "6px 16px",
                fontSize: 15,
                fontWeight: "bold",
                color: part.color,
                fontFamily,
                whiteSpace: "nowrap",
              }}
            >
              {part.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const Scene4MoreThanAlgorithms: React.FC = () => {
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

  // Phase 1: Fuel tank visible (0-8s)
  const fuelOpacity = interpolate(frame, [1 * fps, 2 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Transition: fuel shrinks, car appears (8-12s)
  const transitionProgress = interpolate(
    frame,
    [8 * fps, 12 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const fuelScale = interpolate(transitionProgress, [0, 1], [1, 0.5]);
  const fuelFade = interpolate(transitionProgress, [0, 0.6], [1, 0], {
    extrapolateRight: "clamp",
  });

  // Car assembly progress
  const carProgress = interpolate(
    frame,
    [10 * fps, 20 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Arrow between fuel and car
  const arrowOpacity = interpolate(
    frame,
    [8 * fps, 9 * fps, 18 * fps, 20 * fps],
    [0, 1, 1, 0.5],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Bottom text
  const bottomProgress = spring({
    frame,
    fps,
    delay: 16 * fps,
    config: { damping: 200 },
  });
  const bottomOpacity = interpolate(bottomProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.magnolia,
        fontFamily,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 60,
          fontWeight: "bold",
          color: colors.gunmetal,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        AI is{" "}
        <span style={{ color: colors.darkCyra }}>more</span> than algorithms.
      </div>

      {/* Fuel → Car transformation area — vertically centered */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 50,
          paddingTop: 80,
        }}
      >
        {/* Fuel tank */}
        <FuelTank opacity={fuelOpacity * (1 - fuelFade * 0.7)} scale={fuelScale} />

        {/* Arrow */}
        <svg
          width="80"
          height="40"
          viewBox="0 0 80 40"
          style={{ opacity: arrowOpacity, flexShrink: 0 }}
        >
          <line
            x1={0}
            y1={20}
            x2={55}
            y2={20}
            stroke={colors.darkCyra}
            strokeWidth={3}
          />
          <polygon
            points="55,10 75,20 55,30"
            fill={colors.darkCyra}
          />
        </svg>

        {/* Car assembly */}
        <CarAssembly progress={carProgress} />
      </AbsoluteFill>

      {/* Bottom message */}
      <div
        style={{
          position: "absolute",
          bottom: 70,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 28,
          color: colors.rhythm,
          opacity: bottomOpacity,
        }}
      >
        Fuel alone is not enough. You need the full system.
      </div>
    </AbsoluteFill>
  );
};
