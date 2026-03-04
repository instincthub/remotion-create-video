import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Growing intelligence visualization
const IntelligenceGrowth: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Static code side
  const staticEntrance = spring({
    frame,
    fps,
    delay: fps,
    config: { damping: 200 },
  });
  const staticOpacity = interpolate(staticEntrance, [0, 1], [0, 1]);

  // ML growing side
  const mlEntrance = spring({
    frame,
    fps,
    delay: 2 * fps,
    config: { damping: 200 },
  });
  const mlOpacity = interpolate(mlEntrance, [0, 1], [0, 1]);

  // ML growth over time
  const growthProgress = interpolate(frame, [3 * fps, 10 * fps], [0.4, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Data points flowing in
  const dataCount = Math.floor(
    interpolate(frame, [3 * fps, 10 * fps], [0, 12], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  return (
    <div
      style={{
        display: "flex",
        gap: 30,
        alignItems: "flex-end",
      }}
    >
      {/* Static code side */}
      <div style={{ opacity: staticOpacity, textAlign: "center" }}>
        <svg width="180" height="200" viewBox="0 0 180 200" fill="none">
          {/* Static bar - stays the same */}
          <rect
            x="40"
            y="60"
            width="100"
            height="120"
            rx="8"
            fill={`${colors.rhythm}15`}
            stroke={colors.rhythm}
            strokeWidth={2}
          />
          {/* Code lines (static) */}
          {[0, 1, 2, 3, 4].map((i) => (
            <rect
              key={i}
              x="55"
              y={80 + i * 18}
              width={50 + (i % 3) * 15}
              height={3}
              rx={1.5}
              fill={colors.rhythm}
              opacity={0.4}
            />
          ))}
          {/* Static label */}
          <text
            x="90"
            y="195"
            textAnchor="middle"
            fill={colors.rhythm}
            fontSize="11"
            fontWeight="bold"
            fontFamily="Inter, sans-serif"
          >
            STAYS THE SAME
          </text>
        </svg>
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: colors.rhythm,
            marginTop: 4,
          }}
        >
          Normal Code
        </div>
      </div>

      {/* ML growing side */}
      <div style={{ opacity: mlOpacity, textAlign: "center" }}>
        <svg width="180" height="200" viewBox="0 0 180 200" fill="none">
          {/* Growing bar */}
          <rect
            x="40"
            y={180 - growthProgress * 160}
            width="100"
            height={growthProgress * 160}
            rx="8"
            fill={`${colors.caribbeanGreen}20`}
            stroke={colors.caribbeanGreen}
            strokeWidth={2}
          />

          {/* Data points inside */}
          {Array.from({ length: dataCount }).map((_, i) => {
            const row = Math.floor(i / 3);
            const col = i % 3;
            return (
              <circle
                key={i}
                cx={65 + col * 25}
                cy={170 - row * 22}
                r={4}
                fill={colors.caribbeanGreen}
                opacity={Math.sin(frame * 0.1 + i) * 0.3 + 0.6}
              />
            );
          })}

          {/* Growth arrow */}
          <path
            d="M145 170 L145 40 L135 55 M145 40 L155 55"
            stroke={colors.caribbeanGreen}
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            opacity={interpolate(frame, [4 * fps, 5 * fps], [0, 0.6], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
          />

          {/* Growing label */}
          <text
            x="90"
            y="195"
            textAnchor="middle"
            fill={colors.caribbeanGreen}
            fontSize="11"
            fontWeight="bold"
            fontFamily="Inter, sans-serif"
          >
            GETS SMARTER
          </text>
        </svg>
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: colors.caribbeanGreen,
            marginTop: 4,
          }}
        >
          ML System
        </div>
      </div>
    </div>
  );
};

export const Scene7IntelligenceFromData: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header
  const headerProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 200 },
  });
  const headerOpacity = interpolate(headerProgress, [0, 1], [0, 1]);
  const headerY = interpolate(headerProgress, [0, 1], [30, 0]);

  // Definition box
  const defProgress = spring({
    frame,
    fps,
    delay: 12 * fps,
    config: { damping: 200 },
  });
  const defOpacity = interpolate(defProgress, [0, 1], [0, 1]);
  const defScale = interpolate(defProgress, [0, 1], [0.9, 1]);

  // Definition glow
  const defGlow = Math.sin(frame * 0.06) * 0.2 + 0.8;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${colors.magnolia}, ${colors.white}, ${colors.magnolia})`,
        fontFamily,
      }}
    >
      {/* Content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 300,
          paddingLeft: 40,
          paddingRight: 40,
          gap: 25,
        }}
      >
        {/* Header */}
        <div
          style={{
            fontSize: 34,
            fontWeight: 700,
            color: colors.darkSlateGray,
            textAlign: "center",
            opacity: headerOpacity,
            transform: `translateY(${headerY}px)`,
            lineHeight: 1.4,
          }}
        >
          Build something that gets
          <br />
          <span style={{ color: colors.caribbeanGreen }}>more intelligent</span>
        </div>

        {/* Growth comparison */}
        <IntelligenceGrowth />

        {/* Definition box */}
        <div
          style={{
            opacity: defOpacity,
            transform: `scale(${defScale})`,
            backgroundColor: `${colors.darkCyra}10`,
            border: `3px solid ${colors.darkCyra}`,
            borderRadius: 16,
            padding: "28px 36px",
            maxWidth: 700,
            textAlign: "center",
            boxShadow: `0 0 ${defGlow * 30}px ${colors.darkCyra}20`,
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: colors.darkCyra,
              letterSpacing: 3,
              marginBottom: 12,
            }}
          >
            DEFINITION
          </div>
          <div
            style={{
              fontSize: 30,
              fontWeight: 700,
              color: colors.darkSlateGray,
              lineHeight: 1.4,
            }}
          >
            Machine Learning is the
            <br />
            science of programming
            <br />
            applications{" "}
            <span style={{ color: colors.darkCyra }}>through data</span>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
