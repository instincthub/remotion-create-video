import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Snow particles
const SnowParticles: React.FC = () => {
  const frame = useCurrentFrame();

  const flakes = Array.from({ length: 40 }, (_, i) => ({
    x: ((i * 137 + 50) % 1920),
    startY: -20 - ((i * 83) % 200),
    speed: 0.8 + (i % 5) * 0.3,
    size: 2 + (i % 4),
    sway: (i % 3) * 0.5,
    opacity: 0.2 + (i % 5) * 0.1,
  }));

  return (
    <AbsoluteFill>
      {flakes.map((flake, i) => {
        const y = flake.startY + frame * flake.speed;
        const wrappedY = ((y % 1200) + 1200) % 1200 - 100;
        const swayX = Math.sin((frame * 0.02 + i) * flake.sway) * 15;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: flake.x + swayX,
              top: wrappedY,
              width: flake.size,
              height: flake.size,
              borderRadius: flake.size / 2,
              backgroundColor: colors.frostWhite,
              opacity: flake.opacity,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// Funding graph that drops
const FundingGraph: React.FC<{ progress: number }> = ({ progress }) => {
  // Graph starts high then crashes down
  const crashPoint = 0.6;
  const points = Array.from({ length: 20 }, (_, i) => {
    const t = i / 19;
    let y: number;
    if (t < crashPoint) {
      y = 40 + Math.sin(t * 8) * 10;
    } else {
      const fallT = (t - crashPoint) / (1 - crashPoint);
      y = 40 + fallT * 140;
    }
    return { x: 60 + t * 880, y: Math.min(y, 190) };
  });

  const visiblePoints = points.filter((_, i) => i / 19 <= progress);
  const pathD = visiblePoints
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  return (
    <svg width="1000" height="220" viewBox="0 0 1000 220" fill="none">
      {/* Grid lines */}
      {[50, 100, 150, 200].map((y) => (
        <line key={y} x1="50" y1={y} x2="950" y2={y} stroke={colors.iceGray} strokeWidth={0.5} opacity={0.15} />
      ))}
      {/* Y-axis label */}
      <text x="25" y="40" fill={colors.iceGray} fontSize="12" textAnchor="middle">High</text>
      <text x="25" y="195" fill={colors.iceGray} fontSize="12" textAnchor="middle">Low</text>
      {/* Axis */}
      <line x1="50" y1="10" x2="50" y2="210" stroke={colors.iceGray} strokeWidth={1} opacity={0.3} />
      <line x1="50" y1="210" x2="950" y2="210" stroke={colors.iceGray} strokeWidth={1} opacity={0.3} />
      {/* Graph line */}
      {visiblePoints.length > 1 && (
        <path d={pathD} stroke={colors.oldRose} strokeWidth={3} fill="none" strokeLinecap="round" />
      )}
      {/* Label */}
      <text x="500" y="215" fill={colors.iceGray} fontSize="13" textAnchor="middle">
        AI Research Funding
      </text>
    </svg>
  );
};

export const Scene5FirstWinter: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({ frame, fps, delay: 15, config: { damping: 200 } });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  // Year range badge
  const yearProgress = spring({ frame, fps, delay: 30, config: { damping: 200 } });
  const yearOpacity = interpolate(yearProgress, [0, 1], [0, 1]);

  // Graph draws over time
  const graphProgress = interpolate(
    frame,
    [3 * fps, 15 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // "Funding Cut" stamp
  const stampDelay = 12 * fps;
  const stampProgress = spring({
    frame,
    fps,
    delay: stampDelay,
    config: { damping: 10, stiffness: 200 },
  });
  const stampScale = interpolate(stampProgress, [0, 1], [3, 1]);
  const stampOpacity = interpolate(stampProgress, [0, 1], [0, 1]);
  const stampRotate = interpolate(stampProgress, [0, 1], [-15, -8]);

  // Government buildings fade out
  const buildingFade = interpolate(
    frame,
    [8 * fps, 12 * fps],
    [0.15, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.winterBlue,
        fontFamily,
      }}
    >
      {/* Cold overlay gradient */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, ${colors.winterBlue} 0%, #0c1929 100%)`,
        }}
      />

      <SnowParticles />

      {/* Government building silhouettes */}
      <AbsoluteFill style={{ opacity: buildingFade }}>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none">
          {/* Building 1 */}
          <rect x="200" y="600" width="200" height="300" rx="4" fill={colors.iceGray} />
          <rect x="240" y="560" width="120" height="50" rx="4" fill={colors.iceGray} />
          <polygon points="300,520 360,560 240,560" fill={colors.iceGray} />
          {/* Building 2 */}
          <rect x="1500" y="620" width="180" height="280" rx="4" fill={colors.iceGray} />
          <rect x="1540" y="580" width="100" height="50" rx="4" fill={colors.iceGray} />
          <polygon points="1590,540 1640,580 1540,580" fill={colors.iceGray} />
        </svg>
      </AbsoluteFill>

      {/* Content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
          padding: "60px 160px",
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: 52,
            fontWeight: "bold",
            color: colors.frostWhite,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            textAlign: "center",
          }}
        >
          The First AI Winter
        </div>

        {/* Year range */}
        <div
          style={{
            display: "flex",
            gap: 12,
            opacity: yearOpacity,
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: colors.winterBlue,
              border: `2px solid ${colors.iceGray}`,
              padding: "8px 28px",
              borderRadius: 30,
              fontSize: 24,
              fontWeight: "bold",
              color: colors.frostWhite,
            }}
          >
            1974 – 1980
          </div>
        </div>

        {/* Lighthill report mention */}
        <div
          style={{
            fontSize: 20,
            color: colors.iceGray,
            opacity: yearOpacity,
            textAlign: "center",
            maxWidth: 600,
          }}
        >
          The Lighthill Report declared AI research had &ldquo;failed to deliver.&rdquo;
        </div>

        {/* Funding graph */}
        <div style={{ marginTop: 10 }}>
          <FundingGraph progress={graphProgress} />
        </div>

        {/* "Funding Cut" stamp */}
        {stampOpacity > 0 && (
          <div
            style={{
              position: "absolute",
              top: "35%",
              right: "15%",
              border: `5px solid ${colors.oldRose}`,
              borderRadius: 12,
              padding: "12px 36px",
              transform: `scale(${stampScale}) rotate(${stampRotate}deg)`,
              opacity: stampOpacity,
            }}
          >
            <div style={{ fontSize: 36, fontWeight: "bold", color: colors.oldRose }}>
              FUNDING CUT
            </div>
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
