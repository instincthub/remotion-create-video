import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Animated map grid lines in background
const MapGrid: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 45], [0, 0.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Horizontal grid lines
  const hLines = Array.from({ length: 12 }, (_, i) => 90 * i + 50);
  // Vertical grid lines
  const vLines = Array.from({ length: 22 }, (_, i) => 90 * i + 50);

  return (
    <AbsoluteFill style={{ opacity }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        {hLines.map((y, i) => {
          const drawProgress = interpolate(
            frame,
            [10 + i * 3, 40 + i * 3],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          return (
            <line
              key={`h-${i}`}
              x1={0}
              y1={y}
              x2={1920 * drawProgress}
              y2={y}
              stroke={colors.chineseSilver}
              strokeWidth={0.5}
            />
          );
        })}
        {vLines.map((x, i) => {
          const drawProgress = interpolate(
            frame,
            [15 + i * 2, 45 + i * 2],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          return (
            <line
              key={`v-${i}`}
              x1={x}
              y1={0}
              x2={x}
              y2={1080 * drawProgress}
              stroke={colors.chineseSilver}
              strokeWidth={0.5}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

// Animated route line drawing itself
const RouteLine: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const routeOpacity = interpolate(frame, [fps, 2 * fps], [0, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pathLength = 800;
  const drawProgress = interpolate(frame, [fps, 5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulsing dot at the end of the route
  const dotPulse = Math.sin(frame * 0.1) * 3 + 8;

  return (
    <AbsoluteFill style={{ opacity: routeOpacity }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        {/* Route path */}
        <path
          d="M 1400 250 C 1350 300, 1300 350, 1250 400 C 1200 450, 1150 480, 1100 500 C 1050 520, 1000 540, 960 560 C 900 590, 850 620, 800 650"
          fill="none"
          stroke={colors.darkCyra}
          strokeWidth={4}
          strokeDasharray={pathLength}
          strokeDashoffset={pathLength * (1 - drawProgress)}
          strokeLinecap="round"
        />
        {/* Start pin */}
        <g opacity={drawProgress > 0.05 ? 1 : 0}>
          <circle cx={1400} cy={250} r={10} fill={colors.darkCyra} />
          <circle cx={1400} cy={250} r={4} fill={colors.white} />
        </g>
        {/* End pin (pulsing) */}
        {drawProgress > 0.9 && (
          <g>
            <circle
              cx={800}
              cy={650}
              r={dotPulse}
              fill={colors.tiffanyBlue}
              opacity={0.4}
            />
            <circle cx={800} cy={650} r={6} fill={colors.tiffanyBlue} />
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};

// Bell notification icon + popup
const PhoneNotification: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Bell icon appears first
  const bellProgress = spring({
    frame,
    fps,
    delay: 2 * fps,
    config: { damping: 12, stiffness: 100 },
  });
  const bellOpacity = interpolate(bellProgress, [0, 1], [0, 1]);
  const bellScale = interpolate(bellProgress, [0, 1], [0.5, 1]);

  // Bell wiggle
  const bellWiggle =
    frame > 2 * fps && frame < 3.5 * fps
      ? Math.sin((frame - 2 * fps) * 0.6) * 8
      : 0;

  // Notification card drops in below the bell
  const notifProgress = spring({
    frame,
    fps,
    delay: 3 * fps,
    config: { damping: 12, stiffness: 100 },
  });
  const notifY = interpolate(notifProgress, [0, 1], [-20, 0]);
  const notifOpacity = interpolate(notifProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        padding: "60px 120px 0 0",
      }}
    >
      {/* Bell icon */}
      <div
        style={{
          opacity: bellOpacity,
          transform: `scale(${bellScale}) rotate(${bellWiggle}deg)`,
          transformOrigin: "top center",
          marginRight: 40,
          marginBottom: 12,
        }}
      >
        <svg width="40" height="44" viewBox="0 0 40 44">
          {/* Bell body */}
          <path
            d="M20 4 C12 4, 6 10, 6 18 L6 26 C6 28, 4 30, 2 32 L38 32 C36 30, 34 28, 34 26 L34 18 C34 10, 28 4, 20 4 Z"
            fill={colors.darkCyra}
          />
          {/* Clapper */}
          <circle cx={20} cy={36} r={4} fill={colors.darkCyra} />
          {/* Top knob */}
          <circle cx={20} cy={4} r={2.5} fill={colors.darkCyra} />
          {/* Red badge */}
          <circle cx={32} cy={8} r={7} fill={colors.oldRose} />
          <text
            x={32}
            y={12}
            textAnchor="middle"
            fontSize={10}
            fontWeight="bold"
            fill={colors.white}
            fontFamily="Inter, sans-serif"
          >
            1
          </text>
        </svg>
      </div>

      {/* Notification card */}
      <div
        style={{
          opacity: notifOpacity,
          transform: `translateY(${notifY}px)`,
          background: colors.white,
          borderRadius: 16,
          padding: "18px 28px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          display: "flex",
          flexDirection: "column",
          gap: 6,
          fontFamily,
          border: `1px solid ${colors.chineseSilver}20`,
        }}
      >
        <div
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: colors.darkCyra,
            letterSpacing: 0.5,
          }}
        >
          Maps
        </div>
        <div style={{ fontSize: 22, fontWeight: "bold", color: colors.gunmetal }}>
          7 min to Home
        </div>
        <div style={{ fontSize: 16, color: colors.rhythm }}>
          Light traffic on High Street
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow zoom
  const zoom = interpolate(frame, [0, 15 * fps], [1, 1.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Main text entrance
  const textProgress = spring({
    frame,
    fps,
    delay: 15,
    config: { damping: 12, stiffness: 100 },
  });
  const textOpacity = interpolate(textProgress, [0, 1], [0, 1]);
  const textScale = interpolate(textProgress, [0, 1], [0.6, 1]);

  // Subtext
  const subProgress = spring({
    frame,
    fps,
    delay: 6 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);
  const subY = interpolate(subProgress, [0, 1], [30, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.white,
        fontFamily,
      }}
    >
      <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
        <MapGrid />
        <RouteLine />
      </AbsoluteFill>

      <PhoneNotification />

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
            color: colors.gunmetal,
            transform: `scale(${textScale})`,
            opacity: textOpacity,
            textAlign: "center",
            lineHeight: 1.3,
            maxWidth: 1200,
          }}
        >
          Your phone knows you&apos;re{" "}
          <span style={{ color: colors.darkCyra }}>going home</span>.
        </div>

        <div
          style={{
            fontSize: 34,
            color: colors.rhythm,
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.5,
          }}
        >
          Artificial Intelligence?{" "}
          <span style={{ color: colors.tiffanyBlue }}>Or something else?</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
