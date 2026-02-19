import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Animated data points flowing across the screen
const DataFlow: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 30], [0, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const particles = Array.from({ length: 40 }, (_, i) => ({
    startX: (i * 137) % 1920,
    y: (i * 89) % 1080,
    speed: 0.8 + (i % 5) * 0.4,
    size: 2 + (i % 3) * 2,
  }));

  return (
    <AbsoluteFill style={{ opacity }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        {particles.map((p, i) => {
          const x = (p.startX + frame * p.speed) % 1980 - 30;
          const pulse = Math.sin(frame * 0.05 + i) * 0.4 + 0.6;
          return (
            <circle
              key={`particle-${i}`}
              cx={x}
              cy={p.y}
              r={p.size}
              fill={i % 3 === 0 ? colors.darkCyra : colors.tiffanyBlue}
              opacity={pulse}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

// Location pin with pulse
const LocationPin: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterProgress = spring({
    frame,
    fps,
    delay,
    config: { damping: 12, stiffness: 100 },
  });
  const scale = interpolate(enterProgress, [0, 1], [0, 1]);

  const pulseRadius = interpolate(
    Math.sin(frame * 0.08),
    [-1, 1],
    [20, 35]
  );

  return (
    <g transform={`scale(${scale})`} style={{ transformOrigin: "center" }}>
      <circle
        cx={0}
        cy={0}
        r={pulseRadius}
        fill={colors.darkCyra}
        opacity={0.15}
      />
      <path
        d="M 0 -20 C -12 -20, -20 -12, -20 -4 C -20 8, 0 24, 0 24 C 0 24, 20 8, 20 -4 C 20 -12, 12 -20, 0 -20 Z"
        fill={colors.darkCyra}
      />
      <circle cx={0} cy={-6} r={6} fill={colors.white} />
    </g>
  );
};

// Traffic density heat indicator
const TrafficHeat: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterProgress = spring({
    frame,
    fps,
    delay,
    config: { damping: 14, stiffness: 80 },
  });
  const opacity = interpolate(enterProgress, [0, 1], [0, 1]);

  const bars = [0.3, 0.6, 0.9, 0.7, 0.4, 0.8, 0.5, 0.95, 0.6, 0.35];

  return (
    <g opacity={opacity}>
      {bars.map((height, i) => {
        const barPulse =
          Math.sin((frame * 0.06 + i * 0.4) * 2) * 0.15 + height;
        const barHeight = barPulse * 60;
        return (
          <rect
            key={`bar-${i}`}
            x={i * 18}
            y={60 - barHeight}
            width={12}
            height={barHeight}
            rx={3}
            fill={
              barPulse > 0.7
                ? colors.oldRose
                : barPulse > 0.4
                  ? colors.corn
                  : colors.caribbeanGreen
            }
            opacity={0.8}
          />
        );
      })}
    </g>
  );
};

// Route recalculation animation
const RouteCalc: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterProgress = spring({
    frame,
    fps,
    delay,
    config: { damping: 12, stiffness: 90 },
  });
  const opacity = interpolate(enterProgress, [0, 1], [0, 1]);

  const pathLength = 300;
  const drawProgress = interpolate(
    frame,
    [delay, delay + 3 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <g opacity={opacity}>
      <path
        d="M 0 0 C 30 -30, 70 -20, 100 -40 C 130 -60, 160 -30, 200 -50 C 240 -70, 260 -40, 300 -60"
        fill="none"
        stroke={colors.tiffanyBlue}
        strokeWidth={3}
        strokeDasharray={pathLength}
        strokeDashoffset={pathLength * (1 - drawProgress)}
        strokeLinecap="round"
      />
      {drawProgress > 0.9 && (
        <circle cx={300} cy={-60} r={5} fill={colors.tiffanyBlue} />
      )}
    </g>
  );
};

export const Scene3AlgorithmsAndData: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Equation elements
  const parts = [
    { text: "Simple algorithms", delay: fps },
    { text: "+", delay: fps + 20 },
    { text: "Data", delay: fps + 40 },
    { text: "+", delay: fps + 60 },
    { text: "Sensors", delay: fps + 80 },
    { text: "=", delay: 2 * fps + 10 },
    { text: "Smart outcomes", delay: 2 * fps + 30 },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.white,
        fontFamily,
      }}
    >
      <DataFlow />

      {/* Visual elements - left side */}
      <AbsoluteFill>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080">
          <g transform="translate(300, 650)">
            <LocationPin delay={4 * fps} />
          </g>
          <g transform="translate(780, 640)">
            <TrafficHeat delay={6 * fps} />
          </g>
          <g transform="translate(1200, 700)">
            <RouteCalc delay={8 * fps} />
          </g>
        </svg>
      </AbsoluteFill>

      {/* Labels under visuals */}
      {[
        { label: "Location Tracking", x: 300, delay: 4 * fps + 15 },
        { label: "Traffic Sensors", x: 850, delay: 6 * fps + 15 },
        { label: "Route Planning", x: 1350, delay: 8 * fps + 15 },
      ].map((item, i) => {
        const labelProgress = spring({
          frame,
          fps,
          delay: item.delay,
          config: { damping: 12, stiffness: 80 },
        });
        const labelOpacity = interpolate(labelProgress, [0, 1], [0, 1]);

        return (
          <div
            key={`label-${i}`}
            style={{
              position: "absolute",
              left: item.x - 100,
              top: 750,
              width: 200,
              opacity: labelOpacity,
              fontSize: 20,
              color: colors.rhythm,
              textAlign: "center",
              fontFamily,
            }}
          >
            {item.label}
          </div>
        );
      })}

      {/* Kinetic typography equation */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          paddingBottom: 350,
          zIndex: 2,
        }}
      >
        {parts.map((part, i) => {
          const partProgress = spring({
            frame,
            fps,
            delay: part.delay,
            config: { damping: 12, stiffness: 100 },
          });
          const partOpacity = interpolate(partProgress, [0, 1], [0, 1]);
          const partY = interpolate(partProgress, [0, 1], [30, 0]);

          const isOperator = part.text === "+" || part.text === "=";
          const isResult = part.text === "Smart outcomes";

          return (
            <div
              key={`eq-${i}`}
              style={{
                opacity: partOpacity,
                transform: `translateY(${partY}px)`,
                fontSize: isOperator ? 40 : isResult ? 46 : 38,
                fontWeight: "bold",
                color: isResult
                  ? colors.darkCyra
                  : isOperator
                    ? colors.rhythm
                    : colors.darkSlateGray,
              }}
            >
              {part.text}
            </div>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
