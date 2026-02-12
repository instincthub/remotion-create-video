import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const ITEMS = [
  { text: "Wrong project", delay: 1 },
  { text: "Poor engineering", delay: 3 },
  { text: "Business misalignment", delay: 5 },
];

// Animated checklist item: starts with red cross, transforms to green tick
const ChecklistItem: React.FC<{
  text: string;
  delay: number;
}> = ({ text, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Text entrance
  const enterProgress = spring({
    frame,
    fps,
    delay: delay * fps,
    config: { damping: 200 },
  });
  const enterY = interpolate(enterProgress, [0, 1], [40, 0]);
  const enterOpacity = interpolate(enterProgress, [0, 1], [0, 1]);

  // Cross appears
  const crossDelay = (delay + 1) * fps;
  const crossProgress = spring({
    frame,
    fps,
    delay: crossDelay,
    config: { damping: 12, stiffness: 180 },
  });
  const crossScale = interpolate(crossProgress, [0, 1], [0.3, 1]);

  // Tick replaces cross later
  const tickDelay = (delay + 4) * fps;
  const tickProgress = spring({
    frame,
    fps,
    delay: tickDelay,
    config: { damping: 200 },
  });
  const showTick = frame > tickDelay;

  // Highlight bar behind text
  const barWidth = interpolate(enterProgress, [0, 1], [0, 100]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 30,
        opacity: enterOpacity,
        transform: `translateY(${enterY}px)`,
      }}
    >
      {/* Icon container */}
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 12,
          backgroundColor: showTick ? `${colors.caribbeanGreen}20` : `${colors.oldRose}20`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {showTick ? (
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            style={{
              transform: `scale(${interpolate(tickProgress, [0, 1], [0.3, 1])})`,
              opacity: interpolate(tickProgress, [0, 1], [0, 1]),
            }}
          >
            <path
              d="M 6 16 L 13 23 L 26 9"
              fill="none"
              stroke={colors.caribbeanGreen}
              strokeWidth={4}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            style={{ transform: `scale(${crossScale})` }}
          >
            <line
              x1={6}
              y1={6}
              x2={22}
              y2={22}
              stroke={colors.oldRose}
              strokeWidth={4}
              strokeLinecap="round"
            />
            <line
              x1={22}
              y1={6}
              x2={6}
              y2={22}
              stroke={colors.oldRose}
              strokeWidth={4}
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>

      {/* Text with highlight bar */}
      <div style={{ position: "relative" }}>
        {/* Dark Cyra highlight bar */}
        <div
          style={{
            position: "absolute",
            left: -8,
            top: 0,
            bottom: 0,
            width: 5,
            backgroundColor: colors.darkCyra,
            borderRadius: 3,
            transform: `scaleY(${barWidth / 100})`,
            transformOrigin: "top",
          }}
        />
        <div
          style={{
            fontSize: 52,
            fontWeight: "bold",
            color: showTick ? colors.darkSlateGray : colors.gunmetal,
            paddingLeft: 12,
            textDecoration: showTick ? "none" : "none",
          }}
        >
          {text}
        </div>
        {/* Strikethrough for the identified problem */}
        {showTick && (
          <div
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              width: `${interpolate(tickProgress, [0, 1], [0, 100])}%`,
              height: 3,
              backgroundColor: colors.caribbeanGreen,
              opacity: 0.6,
            }}
          />
        )}
      </div>
    </div>
  );
};

export const Scene3Misalignment: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Bottom insight text
  const insightDelay = 12 * fps;
  const insightProgress = spring({
    frame,
    fps,
    delay: insightDelay,
    config: { damping: 200 },
  });
  const insightOpacity = interpolate(insightProgress, [0, 1], [0, 1]);
  const insightY = interpolate(insightProgress, [0, 1], [20, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.white,
        fontFamily,
      }}
    >
      {/* Subtle grid pattern */}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(${colors.chineseSilver}30 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Checklist items */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          paddingLeft: 400,
          gap: 50,
        }}
      >
        {ITEMS.map((item, i) => (
          <ChecklistItem
            key={i}
            text={item.text}
            delay={item.delay}
          />
        ))}
      </AbsoluteFill>

      {/* Bottom insight */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 28,
          color: colors.rhythm,
          opacity: insightOpacity,
          transform: `translateY(${insightY}px)`,
        }}
      >
        Often we pick the wrong project or ignore the business reality.
      </div>

      {/* Dark Cyra accent bar top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 5,
          backgroundColor: colors.darkCyra,
        }}
      />
    </AbsoluteFill>
  );
};
