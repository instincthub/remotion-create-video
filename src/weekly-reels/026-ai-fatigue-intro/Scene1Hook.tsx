import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const brainEntrance = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 14, stiffness: 80 },
  });
  const brainScale = interpolate(brainEntrance, [0, 1], [0, 1]);
  const pulse = Math.sin(frame * 0.08) * 0.04 + 1;

  // Lightning bolt flash
  const boltOpacity = interpolate(
    frame,
    [20, 25, 30, 35, 40, 45],
    [0, 1, 0.2, 1, 0.3, 0.8],
    { extrapolateRight: "clamp" }
  );

  // Glitch effect on title
  const glitchX =
    frame > 40 && frame < 55
      ? Math.sin(frame * 3) * 4
      : 0;

  const titleProgress = spring({
    frame,
    fps,
    delay: 15,
    config: { damping: 200 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [40, 0]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${colors.gunmetal}, ${colors.darkSlateGray})`,
        fontFamily,
      }}
    >
      {/* Subtle grid */}
      <AbsoluteFill style={{ opacity: 0.03 }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`h-${i}`}
            style={{
              position: "absolute",
              top: i * 96,
              left: 0,
              width: "100%",
              height: 1,
              backgroundColor: colors.tiffanyBlue,
            }}
          />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`v-${i}`}
            style={{
              position: "absolute",
              top: 0,
              left: i * 90,
              width: 1,
              height: "100%",
              backgroundColor: colors.tiffanyBlue,
            }}
          />
        ))}
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 300,
          paddingLeft: 50,
          paddingRight: 50,
          gap: 30,
        }}
      >
        {/* Brain with lightning bolt */}
        <div
          style={{
            transform: `scale(${brainScale * pulse})`,
          }}
        >
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
            {/* Brain outline */}
            <path
              d="M100 35 Q70 35 60 58 Q42 55 40 78 Q28 85 32 108 Q28 125 42 135 Q40 150 55 158 Q62 172 85 172 Q95 178 100 175 Q105 178 115 172 Q138 172 145 158 Q160 150 158 135 Q172 125 168 108 Q172 85 160 78 Q158 55 140 58 Q130 35 100 35Z"
              fill={`${colors.oldRose}12`}
              stroke={colors.oldRose}
              strokeWidth={2.5}
            />
            {/* Brain center line */}
            <path
              d="M100 45 L100 165"
              stroke={`${colors.oldRose}40`}
              strokeWidth={1}
              strokeDasharray="4 4"
            />
            {/* Brain folds left */}
            <path
              d="M55 80 Q75 85 95 75"
              stroke={`${colors.oldRose}50`}
              strokeWidth={1.5}
              fill="none"
            />
            <path
              d="M45 110 Q70 120 95 105"
              stroke={`${colors.oldRose}50`}
              strokeWidth={1.5}
              fill="none"
            />
            {/* Brain folds right */}
            <path
              d="M105 75 Q125 85 145 80"
              stroke={`${colors.oldRose}50`}
              strokeWidth={1.5}
              fill="none"
            />
            <path
              d="M105 105 Q130 120 155 110"
              stroke={`${colors.oldRose}50`}
              strokeWidth={1.5}
              fill="none"
            />
            {/* Lightning bolt */}
            <path
              d="M90 60 L80 100 L95 95 L85 140"
              stroke={colors.corn}
              strokeWidth={4}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity={boltOpacity}
            />
            {/* Spark particles */}
            {[0, 1, 2, 3].map((i) => {
              const sparkOpacity = Math.sin(frame * 0.15 + i * 1.5) * 0.5 + 0.3;
              const angle = (i / 4) * Math.PI * 2;
              const cx = 88 + Math.cos(angle) * 25;
              const cy = 100 + Math.sin(angle) * 25;
              return (
                <circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r={2}
                  fill={colors.corn}
                  opacity={boltOpacity * sparkOpacity}
                />
              );
            })}
          </svg>
        </div>

        {/* Title with glitch */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px) translateX(${glitchX}px)`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: colors.white,
              lineHeight: 1.2,
            }}
          >
            AI Fatigue
          </div>
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: colors.oldRose,
              lineHeight: 1.2,
            }}
          >
            Is Real
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
