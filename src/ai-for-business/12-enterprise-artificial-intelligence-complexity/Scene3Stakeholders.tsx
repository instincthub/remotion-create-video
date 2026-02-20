import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Department node data
interface DepartmentNode {
  label: string;
  angle: number; // angle around the center in degrees
  radius: number;
  delay: number; // seconds
}

const departments: DepartmentNode[] = [
  { label: "Legal", angle: -90, radius: 240, delay: 3 },
  { label: "Compliance", angle: -18, radius: 260, delay: 5 },
  { label: "Operations", angle: 54, radius: 260, delay: 7 },
  { label: "Sales", angle: 126, radius: 260, delay: 9 },
  { label: "Audit", angle: 198, radius: 260, delay: 11 },
];

// Subtle animated particles in background
const BackgroundParticles: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 30], [0, 0.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const particles = Array.from({ length: 40 }, (_, i) => ({
    x: 100 + (i * 47) % 1720,
    y: 50 + (i * 31) % 980,
    size: 1.5 + (i % 3),
  }));

  return (
    <AbsoluteFill style={{ opacity }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080">
        {particles.map((p, i) => {
          const drift = Math.sin(frame * 0.02 + i * 0.7) * 8;
          return (
            <circle
              key={`bg-p-${i}`}
              cx={p.x + drift}
              cy={p.y + Math.cos(frame * 0.015 + i) * 6}
              r={p.size}
              fill={colors.tiffanyBlue}
              opacity={0.3 + Math.sin(frame * 0.03 + i) * 0.2}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

export const Scene3Stakeholders: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const centerX = 960;
  const centerY = 460;

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 8,
    config: { damping: 12, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleScale = interpolate(titleProgress, [0, 1], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Central AI box
  const aiProgress = spring({
    frame,
    fps,
    delay: 1 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const aiScale = interpolate(aiProgress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const aiOpacity = interpolate(aiProgress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Central AI box glow pulse
  const glowPulse = Math.sin(frame * 0.06) * 0.15 + 0.35;

  // Bottom text
  const bottomDelay = 14 * fps;
  const bottomProgress = spring({
    frame,
    fps,
    delay: bottomDelay,
    config: { damping: 10, stiffness: 80 },
  });
  const bottomOpacity = interpolate(bottomProgress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bottomY = interpolate(bottomProgress, [0, 1], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${colors.darkNavy} 0%, #0d1525 50%, ${colors.darkCharcoal} 100%)`,
        fontFamily,
      }}
    >
      <BackgroundParticles />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 3,
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            fontSize: 50,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
          }}
        >
          Stakeholder{" "}
          <span style={{ color: colors.tiffanyBlue }}>Complexity</span>
        </div>
      </div>

      {/* Connecting lines and nodes SVG */}
      <AbsoluteFill style={{ zIndex: 1 }}>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080">
          {/* Connecting lines from center to each department */}
          {departments.map((dept, i) => {
            const radians = (dept.angle * Math.PI) / 180;
            const nodeX = centerX + Math.cos(radians) * dept.radius;
            const nodeY = centerY + Math.sin(radians) * dept.radius;

            const lineStartFrame = dept.delay * fps - fps;
            const lineProgress = interpolate(
              frame,
              [lineStartFrame, lineStartFrame + fps],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const lineOpacity = interpolate(
              frame,
              [lineStartFrame, lineStartFrame + 0.5 * fps],
              [0, 0.8],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            // Animated endpoint
            const endX = centerX + (nodeX - centerX) * lineProgress;
            const endY = centerY + (nodeY - centerY) * lineProgress;

            return (
              <g key={`line-${i}`}>
                {/* Glow line */}
                <line
                  x1={centerX}
                  y1={centerY}
                  x2={endX}
                  y2={endY}
                  stroke={colors.tiffanyBlue}
                  strokeWidth={4}
                  opacity={lineOpacity * 0.2}
                />
                {/* Main line */}
                <line
                  x1={centerX}
                  y1={centerY}
                  x2={endX}
                  y2={endY}
                  stroke={colors.tiffanyBlue}
                  strokeWidth={2}
                  opacity={lineOpacity}
                />
                {/* Traveling dot along the line */}
                {lineProgress > 0 && lineProgress < 1 && (
                  <circle
                    cx={endX}
                    cy={endY}
                    r={5}
                    fill={colors.caribbeanGreen}
                    opacity={0.9}
                  />
                )}
              </g>
            );
          })}

          {/* Central AI glow */}
          <circle
            cx={centerX}
            cy={centerY}
            r={70}
            fill={colors.darkCyra}
            opacity={glowPulse * aiOpacity}
          />
        </svg>
      </AbsoluteFill>

      {/* Central AI box */}
      <div
        style={{
          position: "absolute",
          left: centerX - 75,
          top: centerY - 55,
          width: 150,
          height: 110,
          opacity: aiOpacity,
          transform: `scale(${aiScale})`,
          background: colors.darkCyra,
          borderRadius: 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          border: `2px solid ${colors.tiffanyBlue}`,
          boxShadow: `0 0 30px ${colors.darkCyra}80`,
          zIndex: 2,
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32">
          <circle cx="16" cy="12" r="6" fill="none" stroke={colors.white} strokeWidth="2" />
          <path d="M8 28 C8 22 12 18 16 18 C20 18 24 22 24 28" fill="none" stroke={colors.white} strokeWidth="2" />
          <circle cx="26" cy="8" r="3" fill="none" stroke={colors.tiffanyBlue} strokeWidth="1.5" />
          <line x1="22" y1="10" x2="20" y2="12" stroke={colors.tiffanyBlue} strokeWidth="1" />
        </svg>
        <div
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: colors.white,
            fontFamily,
          }}
        >
          AI
        </div>
      </div>

      {/* Department nodes */}
      {departments.map((dept, i) => {
        const radians = (dept.angle * Math.PI) / 180;
        const nodeX = centerX + Math.cos(radians) * dept.radius;
        const nodeY = centerY + Math.sin(radians) * dept.radius;

        const nodeProgress = spring({
          frame,
          fps,
          delay: dept.delay * fps,
          config: { damping: 10, stiffness: 90 },
        });
        const nodeScale = interpolate(nodeProgress, [0, 1], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const nodeOpacity = interpolate(nodeProgress, [0, 1], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        // Icon colors cycle through palette
        const nodeColors = [
          colors.oldRose,
          colors.corn,
          colors.caribbeanGreen,
          colors.tiffanyBlue,
          colors.rhythm,
        ];
        const nodeColor = nodeColors[i];

        return (
          <div
            key={dept.label}
            style={{
              position: "absolute",
              left: nodeX - 80,
              top: nodeY - 45,
              width: 160,
              height: 90,
              opacity: nodeOpacity,
              transform: `scale(${nodeScale})`,
              background: `${colors.darkSlateGray}D0`,
              borderRadius: 14,
              border: `2px solid ${nodeColor}60`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
              }}
            >
              {/* Small indicator dot */}
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  background: nodeColor,
                }}
              />
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: colors.white,
                  fontFamily,
                }}
              >
                {dept.label}
              </div>
            </div>
          </div>
        );
      })}

      {/* Bottom text */}
      <div
        style={{
          position: "absolute",
          bottom: 240,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 3,
        }}
      >
        <div
          style={{
            opacity: bottomOpacity,
            transform: `translateY(${bottomY}px)`,
            fontSize: 32,
            color: colors.chineseSilver,
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          Before the model runs, it must be{" "}
          <span style={{ color: colors.tiffanyBlue, fontWeight: 700 }}>approved</span>.
        </div>
      </div>
    </AbsoluteFill>
  );
};
