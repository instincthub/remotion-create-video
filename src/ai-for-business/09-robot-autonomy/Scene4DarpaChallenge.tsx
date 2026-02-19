import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Desert terrain with path line
const DesertTerrain: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Path drawing progress
  const pathProgress = interpolate(frame, [2 * fps, 12 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Terrain shimmer
  const shimmer = Math.sin(frame * 0.03) * 0.05 + 0.95;

  // Route waypoints
  const waypoints = [
    { x: 150, y: 650 },
    { x: 350, y: 580 },
    { x: 550, y: 620 },
    { x: 750, y: 540 },
    { x: 950, y: 580 },
    { x: 1150, y: 520 },
    { x: 1350, y: 560 },
    { x: 1550, y: 500 },
    { x: 1770, y: 530 },
  ];

  // Build SVG path string
  let routePath = `M ${waypoints[0].x} ${waypoints[0].y}`;
  for (let i = 1; i < waypoints.length; i++) {
    const prev = waypoints[i - 1];
    const curr = waypoints[i];
    const cpx = (prev.x + curr.x) / 2;
    routePath += ` Q ${cpx} ${prev.y} ${curr.x} ${curr.y}`;
  }

  // Total approximate path length
  const totalLen = 1800;
  const dashOffset = totalLen * (1 - pathProgress);

  return (
    <AbsoluteFill style={{ opacity: shimmer }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        {/* Desert ground */}
        <rect x={0} y={480} width={1920} height={600} fill={`${colors.metallicBlue}15`} />

        {/* Terrain lines */}
        {[500, 550, 600, 650, 700].map((y, i) => (
          <line
            key={`terrain-${i}`}
            x1={0}
            y1={y + Math.sin(i * 0.5) * 20}
            x2={1920}
            y2={y + Math.sin(i * 0.5 + 1) * 30}
            stroke={`${colors.metallicBlue}20`}
            strokeWidth={1}
          />
        ))}

        {/* Mountain silhouettes */}
        <path
          d="M 0 480 L 200 380 L 350 430 L 500 350 L 650 400 L 800 320 L 1000 390 L 1200 340 L 1400 380 L 1600 330 L 1800 370 L 1920 400 L 1920 480 Z"
          fill={`${colors.metallicBlue}10`}
        />

        {/* Route path */}
        <path
          d={routePath}
          fill="none"
          stroke={colors.white}
          strokeWidth={3}
          strokeDasharray={totalLen}
          strokeDashoffset={dashOffset}
          opacity={0.8}
        />

        {/* Waypoint markers */}
        {waypoints.map((wp, i) => {
          const wpVisible =
            i / waypoints.length <= pathProgress ? 1 : 0;
          return (
            <g key={`wp-${i}`} opacity={wpVisible}>
              <circle
                cx={wp.x}
                cy={wp.y}
                r={6}
                fill={i === 0 ? colors.caribbeanGreen : i === waypoints.length - 1 ? colors.oldRose : colors.white}
                stroke={colors.metallicBlue}
                strokeWidth={1}
              />
            </g>
          );
        })}

        {/* Vehicle indicator on path */}
        {(() => {
          const wpIndex = Math.min(
            Math.floor(pathProgress * (waypoints.length - 1)),
            waypoints.length - 2
          );
          const localT =
            (pathProgress * (waypoints.length - 1)) - wpIndex;
          const vx =
            waypoints[wpIndex].x +
            (waypoints[wpIndex + 1].x - waypoints[wpIndex].x) * localT;
          const vy =
            waypoints[wpIndex].y +
            (waypoints[wpIndex + 1].y - waypoints[wpIndex].y) * localT;

          return (
            <g opacity={pathProgress > 0.02 ? 1 : 0}>
              {/* Glow */}
              <circle cx={vx} cy={vy} r={16} fill={colors.caribbeanGreen} opacity={0.2} />
              {/* Vehicle dot */}
              <circle cx={vx} cy={vy} r={8} fill={colors.caribbeanGreen} />
              <circle cx={vx} cy={vy} r={4} fill={colors.white} />
            </g>
          );
        })()}
      </svg>
    </AbsoluteFill>
  );
};

// HUD-style data readout
const HUDOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const hudOpacity = interpolate(frame, [3 * fps, 4 * fps], [0, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const distance = interpolate(frame, [3 * fps, 12 * fps], [0, 150], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ opacity: hudOpacity }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        {/* Corner brackets (HUD style) */}
        {/* Top-left */}
        <path d="M 80 60 L 80 40 L 100 40" fill="none" stroke={colors.white} strokeWidth={1.5} opacity={0.4} />
        {/* Top-right */}
        <path d="M 1840 60 L 1840 40 L 1820 40" fill="none" stroke={colors.white} strokeWidth={1.5} opacity={0.4} />
        {/* Bottom-left */}
        <path d="M 80 830 L 80 850 L 100 850" fill="none" stroke={colors.white} strokeWidth={1.5} opacity={0.4} />
        {/* Bottom-right */}
        <path d="M 1840 830 L 1840 850 L 1820 850" fill="none" stroke={colors.white} strokeWidth={1.5} opacity={0.4} />

        {/* Distance readout */}
        <text
          x={1800}
          y={80}
          textAnchor="end"
          fontSize={18}
          fill={colors.white}
          fontFamily="Inter, sans-serif"
          opacity={0.6}
        >
          {`${distance.toFixed(0)} / 150 miles`}
        </text>

        {/* Status */}
        <text
          x={120}
          y={80}
          fontSize={14}
          fill={colors.caribbeanGreen}
          fontFamily="Inter, sans-serif"
          opacity={0.6}
        >
          AUTONOMOUS MODE
        </text>
      </svg>
    </AbsoluteFill>
  );
};

export const Scene4DarpaChallenge: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title entrance
  const titleProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 10, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleScale = interpolate(titleProgress, [0, 1], [0.85, 1]);

  // Subtitle
  const subProgress = spring({
    frame,
    fps,
    delay: 2 * fps,
    config: { damping: 12, stiffness: 80 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);

  // "None finished" reveal
  const noneProgress = spring({
    frame,
    fps,
    delay: 7 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const noneOpacity = interpolate(noneProgress, [0, 1], [0, 1]);
  const noneScale = interpolate(noneProgress, [0, 1], [0.8, 1]);

  // "But that failure was a spark" text
  const sparkProgress = spring({
    frame,
    fps,
    delay: 9 * fps,
    config: { damping: 12, stiffness: 80 },
  });
  const sparkOpacity = interpolate(sparkProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.metallicBlue} 0%, ${colors.policeBlue} 100%)`,
        fontFamily,
      }}
    >
      <DesertTerrain />
      <HUDOverlay />

      {/* Title block */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
        }}
      >
        <div
          style={{
            fontSize: 22,
            color: colors.caribbeanGreen,
            fontWeight: "bold",
            letterSpacing: 4,
            marginBottom: 12,
          }}
        >
          2004
        </div>
        <div
          style={{
            fontSize: 58,
            fontWeight: "bold",
            color: colors.white,
            lineHeight: 1.2,
          }}
        >
          The DARPA Grand Challenge
        </div>
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: "absolute",
          top: 260,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: subOpacity,
        }}
      >
        <div
          style={{
            fontSize: 26,
            color: `${colors.white}BB`,
            maxWidth: 800,
            margin: "0 auto",
            lineHeight: 1.5,
          }}
        >
          $1 million prize. 150 miles of rough desert terrain.
          <br />
          15 teams qualified.
        </div>
      </div>

      {/* "None finished" */}
      <div
        style={{
          position: "absolute",
          top: 380,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: noneOpacity,
          transform: `scale(${noneScale})`,
        }}
      >
        <div
          style={{
            fontSize: 44,
            fontWeight: "bold",
            color: colors.oldRose,
          }}
        >
          None finished.
        </div>
      </div>

      {/* "But that failure was a spark" */}
      <div
        style={{
          position: "absolute",
          bottom: 240,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: sparkOpacity,
        }}
      >
        <div
          style={{
            fontSize: 30,
            color: colors.white,
            maxWidth: 700,
            margin: "0 auto",
            lineHeight: 1.5,
          }}
        >
          But that failure was not a setback.
          <br />
          It was a{" "}
          <span style={{ color: colors.caribbeanGreen, fontWeight: "bold" }}>
            spark
          </span>
          .
        </div>
      </div>
    </AbsoluteFill>
  );
};
