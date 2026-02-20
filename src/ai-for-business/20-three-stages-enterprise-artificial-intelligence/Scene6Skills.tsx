import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Team icon with role label
const TeamMember: React.FC<{
  x: number;
  y: number;
  label: string;
  color: string;
  opacity: number;
  scale: number;
}> = ({ x, y, label, color, opacity, scale }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      transform: `translate(-50%, -50%) scale(${scale})`,
      opacity,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 12,
    }}
  >
    <div
      style={{
        width: 90,
        height: 90,
        borderRadius: "50%",
        background: `${color}12`,
        border: `3px solid ${color}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width="44" height="44" viewBox="0 0 60 60">
        <circle
          cx={30}
          cy={20}
          r={10}
          fill={`${color}40`}
          stroke={color}
          strokeWidth={2}
        />
        <path
          d="M14 52 Q14 38 30 38 Q46 38 46 52"
          fill={`${color}30`}
          stroke={color}
          strokeWidth={2}
        />
      </svg>
    </div>
    <span
      style={{
        fontSize: 24,
        fontWeight: 700,
        color,
        textAlign: "center",
        whiteSpace: "nowrap",
        fontFamily,
      }}
    >
      {label}
    </span>
  </div>
);

export const Scene6Skills: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 0.5),
    config: { damping: 12, stiffness: 80 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  // Subtitle
  const subtitleProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 3),
    config: { damping: 12, stiffness: 80 },
  });
  const subtitleOpacity = interpolate(subtitleProgress, [0, 1], [0, 1]);

  // Team members expanding from center
  const teamMembers = [
    { x: 320, y: 520, label: "Data Scientist", color: colors.darkCyra },
    { x: 640, y: 400, label: "DevOps", color: colors.viridianGreen },
    { x: 960, y: 340, label: "Security", color: colors.oldRose },
    { x: 1280, y: 400, label: "Ethics", color: colors.turkishRose },
    { x: 1600, y: 520, label: "IT Ops", color: colors.metallicBlue },
  ];

  const memberProgresses = teamMembers.map((_, i) =>
    spring({
      frame,
      fps,
      delay: Math.round(fps * (5 + i * 1.2)),
      config: { damping: 12, stiffness: 80 },
    }),
  );

  // Connection lines between members
  const connectionProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 11),
    config: { damping: 14, stiffness: 60 },
  });
  const connectionOpacity = interpolate(
    connectionProgress,
    [0, 1],
    [0, 0.3],
  );

  // Bottom message
  const msgProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 13),
    config: { damping: 10, stiffness: 70 },
  });
  const msgOpacity = interpolate(msgProgress, [0, 1], [0, 1]);
  const msgScale = interpolate(msgProgress, [0, 1], [0.9, 1]);

  return (
    <AbsoluteFill
      style={{
        background: colors.magnolia,
        fontFamily,
      }}
    >
      {/* Subtle grid overlay */}
      <AbsoluteFill style={{ opacity: 0.04 }}>
        <svg width="1920" height="1080">
          {Array.from({ length: 20 }, (_, i) => (
            <line
              key={`g-${i}`}
              x1={0}
              y1={i * 60}
              x2={1920}
              y2={i * 60}
              stroke={colors.darkCyra}
              strokeWidth={1}
            />
          ))}
          {Array.from({ length: 34 }, (_, i) => (
            <line
              key={`gv-${i}`}
              x1={i * 60}
              y1={0}
              x2={i * 60}
              y2={1080}
              stroke={colors.darkCyra}
              strokeWidth={1}
            />
          ))}
        </svg>
      </AbsoluteFill>

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 100,
          width: "100%",
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <span
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: colors.darkSlateGray,
          }}
        >
          Different{" "}
          <span style={{ color: colors.darkCyra }}>skills</span> required.
        </span>
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: "absolute",
          top: 190,
          width: "100%",
          textAlign: "center",
          opacity: subtitleOpacity,
        }}
      >
        <span
          style={{
            fontSize: 30,
            fontWeight: 400,
            color: colors.rhythm,
          }}
        >
          Your data scientists alone cannot carry this.
        </span>
      </div>

      {/* Connection lines */}
      <svg
        width="1920"
        height="1080"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          opacity: connectionOpacity,
        }}
      >
        {teamMembers.map((m1, i) =>
          teamMembers.slice(i + 1).map((m2, j) => (
            <line
              key={`c-${i}-${j}`}
              x1={m1.x}
              y1={m1.y}
              x2={m2.x}
              y2={m2.y}
              stroke={colors.darkCyra}
              strokeWidth={1.5}
              strokeDasharray="6 4"
            />
          )),
        )}
      </svg>

      {/* Team members */}
      {teamMembers.map((member, i) => {
        const prog = memberProgresses[i];
        const mOpacity = interpolate(prog, [0, 1], [0, 1]);
        const mScale = interpolate(prog, [0, 1], [0.6, 1]);
        return (
          <TeamMember
            key={member.label}
            x={member.x}
            y={member.y}
            label={member.label}
            color={member.color}
            opacity={mOpacity}
            scale={mScale}
          />
        );
      })}

      {/* Bottom message */}
      <div
        style={{
          position: "absolute",
          bottom: 250,
          width: "100%",
          textAlign: "center",
          opacity: msgOpacity,
          transform: `scale(${msgScale})`,
        }}
      >
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: colors.darkSlateGray,
          }}
        >
          Deployment needs a{" "}
          <span style={{ color: colors.darkCyra }}>cross-functional</span>{" "}
          team.
        </div>
      </div>
    </AbsoluteFill>
  );
};
