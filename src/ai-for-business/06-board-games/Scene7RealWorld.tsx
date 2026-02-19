import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Application card component
const AppCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  color: string;
  delay: number;
  x: number;
  y: number;
}> = ({ title, icon, color, delay, x, y }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    delay,
    config: { damping: 12, stiffness: 120 },
  });
  const scale = interpolate(progress, [0, 1], [0.5, 1]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 240,
        padding: "20px 16px",
        borderRadius: 16,
        backgroundColor: colors.white,
        border: `2px solid ${color}30`,
        boxShadow: `0 4px 20px ${color}15`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: 14,
          backgroundColor: `${color}15`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: colors.gunmetal,
          textAlign: "center",
        }}
      >
        {title}
      </div>
    </div>
  );
};

// SVG icons
const RecommendationIcon = (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect x="4" y="4" width="12" height="12" rx="2" stroke={colors.darkCyra} strokeWidth="2.5" />
    <rect x="20" y="4" width="12" height="12" rx="2" stroke={colors.darkCyra} strokeWidth="2.5" />
    <rect x="4" y="20" width="12" height="12" rx="2" stroke={colors.darkCyra} strokeWidth="2.5" />
    <rect x="20" y="20" width="12" height="12" rx="2" stroke={colors.darkCyra} strokeWidth="2.5" fill={`${colors.darkCyra}30`} />
    <path d="M23 26l2 2 4-4" stroke={colors.darkCyra} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FraudIcon = (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <path d="M18 4l14 6v8c0 8-6 14-14 18C10 32 4 26 4 18v-8l14-6z" stroke={colors.oldRose} strokeWidth="2.5" fill="none" />
    <path d="M13 18l3 3 7-7" stroke={colors.oldRose} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const RoboticsIcon = (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect x="8" y="14" width="20" height="16" rx="3" stroke={colors.viridianGreen} strokeWidth="2.5" fill="none" />
    <circle cx="14" cy="22" r="2.5" fill={colors.viridianGreen} />
    <circle cx="22" cy="22" r="2.5" fill={colors.viridianGreen} />
    <line x1="18" y1="8" x2="18" y2="14" stroke={colors.viridianGreen} strokeWidth="2.5" />
    <circle cx="18" cy="6" r="2.5" fill={colors.viridianGreen} />
    <line x1="4" y1="20" x2="8" y2="20" stroke={colors.viridianGreen} strokeWidth="2.5" />
    <line x1="28" y1="20" x2="32" y2="20" stroke={colors.viridianGreen} strokeWidth="2.5" />
  </svg>
);

const HealthIcon = (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect x="6" y="6" width="24" height="24" rx="4" stroke={colors.caribbeanGreen} strokeWidth="2.5" fill="none" />
    <line x1="14" y1="18" x2="22" y2="18" stroke={colors.caribbeanGreen} strokeWidth="3" strokeLinecap="round" />
    <line x1="18" y1="14" x2="18" y2="22" stroke={colors.caribbeanGreen} strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const AutoIcon = (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <circle cx="18" cy="18" r="13" stroke={colors.tiffanyBlue} strokeWidth="2.5" fill="none" />
    <path d="M12 18c0-4 3-6 6-6s6 2 6 6" stroke={colors.tiffanyBlue} strokeWidth="2" fill="none" />
    <circle cx="18" cy="18" r="3" fill={colors.tiffanyBlue} />
    <line x1="18" y1="4" x2="18" y2="8" stroke={colors.tiffanyBlue} strokeWidth="2" />
    <line x1="18" y1="28" x2="18" y2="32" stroke={colors.tiffanyBlue} strokeWidth="2" />
    <line x1="4" y1="18" x2="8" y2="18" stroke={colors.tiffanyBlue} strokeWidth="2" />
    <line x1="28" y1="18" x2="32" y2="18" stroke={colors.tiffanyBlue} strokeWidth="2" />
  </svg>
);

// Technique labels
const TECHNIQUES = [
  { label: "Machine Learning", color: colors.darkCyra },
  { label: "Reinforcement Learning", color: colors.viridianGreen },
  { label: "Deep Neural Networks", color: colors.tiffanyBlue },
];

export const Scene7RealWorld: React.FC = () => {
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
  const titleY = interpolate(titleProgress, [0, 1], [40, 0]);

  // Subtitle
  const subProgress = spring({
    frame,
    fps,
    delay: fps,
    config: { damping: 10, stiffness: 80 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);

  // Arrow animation (connecting techniques to applications)
  const arrowProgress = interpolate(frame, [4 * fps, 6 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
          top: 50,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 56,
          fontWeight: "bold",
          color: colors.gunmetal,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        From Games to the{" "}
        <span style={{ color: colors.darkCyra }}>Real World</span>
      </div>

      {/* Technique badges */}
      <div
        style={{
          position: "absolute",
          top: 150,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 24,
        }}
      >
        {TECHNIQUES.map((tech, i) => {
          const techProgress = spring({
            frame,
            fps,
            delay: (1.5 + i * 0.5) * fps,
            config: { damping: 12, stiffness: 120 },
          });
          const techOpacity = interpolate(techProgress, [0, 1], [0, 1]);
          const techScale = interpolate(techProgress, [0, 1], [0.8, 1]);

          return (
            <div
              key={i}
              style={{
                padding: "12px 28px",
                borderRadius: 40,
                backgroundColor: `${tech.color}15`,
                border: `2px solid ${tech.color}50`,
                color: tech.color,
                fontSize: 22,
                fontWeight: "bold",
                opacity: techOpacity,
                transform: `scale(${techScale})`,
              }}
            >
              {tech.label}
            </div>
          );
        })}
      </div>

      {/* Arrow down */}
      <div
        style={{
          position: "absolute",
          top: 225,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: subOpacity,
        }}
      >
        <svg width="40" height="60" viewBox="0 0 40 60" fill="none">
          <line
            x1="20"
            y1="0"
            x2="20"
            y2={arrowProgress * 45}
            stroke={colors.darkCyra}
            strokeWidth="3"
          />
          <polygon
            points="12,40 20,55 28,40"
            fill={colors.darkCyra}
            opacity={arrowProgress}
          />
        </svg>
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: "absolute",
          top: 290,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 24,
          color: colors.rhythm,
          opacity: subOpacity,
        }}
      >
        These techniques now power real industries
      </div>

      {/* Application cards in a grid */}
      <AppCard
        title="Recommendations"
        icon={RecommendationIcon}
        color={colors.darkCyra}
        delay={3 * fps}
        x={180}
        y={360}
      />
      <AppCard
        title="Fraud Detection"
        icon={FraudIcon}
        color={colors.oldRose}
        delay={3.5 * fps}
        x={480}
        y={360}
      />
      <AppCard
        title="Robotics"
        icon={RoboticsIcon}
        color={colors.viridianGreen}
        delay={4 * fps}
        x={780}
        y={360}
      />
      <AppCard
        title="Healthcare"
        icon={HealthIcon}
        color={colors.caribbeanGreen}
        delay={4.5 * fps}
        x={1080}
        y={360}
      />
      <AppCard
        title="Autonomous Systems"
        icon={AutoIcon}
        color={colors.tiffanyBlue}
        delay={5 * fps}
        x={1380}
        y={360}
      />

      {/* Flight simulator analogy */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: 200,
          right: 200,
          padding: "24px 36px",
          borderRadius: 16,
          backgroundColor: `${colors.gunmetal}08`,
          border: `2px solid ${colors.darkCyra}20`,
          textAlign: "center",
          opacity: interpolate(frame, [5.5 * fps, 6.5 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <span style={{ fontSize: 24, color: colors.gunmetal, lineHeight: 1.6 }}>
          Board games are the{" "}
          <span style={{ fontWeight: "bold", color: colors.darkCyra }}>
            flight simulator
          </span>{" "}
          for Artificial Intelligence — training in simulation before stepping
          into the real world.
        </span>
      </div>
    </AbsoluteFill>
  );
};
