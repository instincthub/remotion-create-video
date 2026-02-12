import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Data particles floating between users and AI system
const DataParticles: React.FC = () => {
  const frame = useCurrentFrame();

  const particles = Array.from({ length: 24 }, (_, i) => {
    const seed = i * 137.5;
    const startX = (seed * 3.7) % 1920;
    const startY = 800 + (seed % 200);
    const speed = 0.4 + (i % 5) * 0.15;
    const sway = Math.sin(frame * 0.03 + seed) * 40;

    const y = startY - frame * speed;
    const wrappedY = ((y % 1000) + 1000) % 1000 + 40;
    const x = startX + sway;

    const size = 2 + (i % 4);
    const isData = i % 3 === 0;

    return { x, y: wrappedY, size, isData, seed };
  });

  return (
    <AbsoluteFill style={{ opacity: 0.4 }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        {particles.map((p, i) => (
          <g key={i}>
            {p.isData ? (
              // Binary-style rectangle
              <rect
                x={p.x - p.size / 2}
                y={p.y - p.size / 2}
                width={p.size * 2}
                height={p.size}
                rx={1}
                fill={colors.caribbeanGreen}
                opacity={0.5 + Math.sin(frame * 0.05 + p.seed) * 0.3}
              />
            ) : (
              <circle
                cx={p.x}
                cy={p.y}
                r={p.size}
                fill={colors.tiffanyBlue}
                opacity={0.3 + Math.sin(frame * 0.04 + p.seed) * 0.2}
              />
            )}
          </g>
        ))}
      </svg>
    </AbsoluteFill>
  );
};

// User silhouettes at the bottom
const UserRow: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  const users = Array.from({ length: 7 }, (_, i) => ({
    x: 400 + i * 160,
    delay: i * 0.5,
  }));

  return (
    <svg
      width="1920"
      height="200"
      viewBox="0 0 1920 200"
      style={{ position: "absolute", bottom: 100, left: 0, opacity }}
    >
      {users.map((u, i) => {
        const bob = Math.sin(frame * 0.04 + i * 1.2) * 3;
        return (
          <g key={i} transform={`translate(${u.x}, ${80 + bob})`}>
            {/* Head */}
            <circle cx={0} cy={0} r={18} fill="none" stroke={colors.white} strokeWidth={2} opacity={0.7} />
            {/* Body */}
            <line x1={0} y1={18} x2={0} y2={55} stroke={colors.white} strokeWidth={2} opacity={0.7} />
            {/* Arms */}
            <line x1={0} y1={30} x2={-18} y2={45} stroke={colors.white} strokeWidth={2} opacity={0.7} />
            <line x1={0} y1={30} x2={18} y2={45} stroke={colors.white} strokeWidth={2} opacity={0.7} />
            {/* Data flowing up from head */}
            <circle
              cx={0}
              cy={-30 - (frame * 0.5 + i * 10) % 30}
              r={3}
              fill={colors.caribbeanGreen}
              opacity={0.6}
            />
          </g>
        );
      })}
    </svg>
  );
};

// Stakeholder text items
const STAKEHOLDERS = [
  { role: "Managers", verb: "need to understand it." },
  { role: "Engineers", verb: "need to understand business value." },
  { role: "Investors", verb: "need to understand risk." },
  { role: "Regulators", verb: "need to understand impact." },
];

export const Scene6Impact: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow zoom
  const zoom = interpolate(frame, [0, 25 * fps], [1, 1.06], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 15,
    config: { damping: 200 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

  // Users
  const usersProgress = spring({
    frame,
    fps,
    delay: 2 * fps,
    config: { damping: 200 },
  });
  const usersOpacity = interpolate(usersProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.darkCyra,
        fontFamily,
        transform: `scale(${zoom})`,
        transformOrigin: "center center",
      }}
    >
      {/* Data particle background */}
      <DataParticles />

      {/* Main content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: 100,
          zIndex: 1,
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: 68,
            fontWeight: "bold",
            color: colors.white,
            opacity: titleOpacity,
            textAlign: "center",
          }}
        >
          AI Impacts{" "}
          <span style={{ color: colors.corn }}>Everyone</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 26,
            color: colors.white,
            opacity: titleOpacity * 0.7,
            marginTop: 16,
            textAlign: "center",
          }}
        >
          AI learns from us. Society must understand how it works.
        </div>

        {/* Stakeholder list */}
        <div
          style={{
            marginTop: 60,
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          {STAKEHOLDERS.map((s, i) => {
            const itemProgress = spring({
              frame,
              fps,
              delay: (4 + i * 1.5) * fps,
              config: { damping: 200 },
            });
            const itemOpacity = interpolate(itemProgress, [0, 1], [0, 1]);
            const itemX = interpolate(itemProgress, [0, 1], [-40, 0]);

            return (
              <div
                key={i}
                style={{
                  fontSize: 36,
                  color: colors.white,
                  opacity: itemOpacity,
                  transform: `translateX(${itemX}px)`,
                  display: "flex",
                  gap: 12,
                }}
              >
                <span
                  style={{
                    color: colors.corn,
                    fontWeight: "bold",
                  }}
                >
                  {s.role}
                </span>
                <span style={{ opacity: 0.8 }}>{s.verb}</span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* User row at the bottom */}
      <UserRow opacity={usersOpacity} />
    </AbsoluteFill>
  );
};
