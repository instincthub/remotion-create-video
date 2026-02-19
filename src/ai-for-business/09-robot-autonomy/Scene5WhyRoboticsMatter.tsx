import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Checkmark icon
const CheckIcon: React.FC<{ delay: number; x: number; y: number }> = ({
  delay,
  x,
  y,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    delay,
    config: { damping: 10, stiffness: 120 },
  });
  const scale = interpolate(progress, [0, 1], [0, 1]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <g
      transform={`translate(${x}, ${y}) scale(${scale})`}
      opacity={opacity}
    >
      <circle cx={0} cy={0} r={20} fill={`${colors.caribbeanGreen}20`} />
      <path
        d="M -8 0 L -3 6 L 8 -6"
        fill="none"
        stroke={colors.caribbeanGreen}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
};

// Factory automation icon
const FactoryIcon: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  const gearRotation = frame * 0.6;

  return (
    <g opacity={opacity}>
      {/* Building */}
      <rect
        x={1450}
        y={200}
        width={100}
        height={80}
        rx={4}
        fill="none"
        stroke={colors.darkCyra}
        strokeWidth={2}
      />
      {/* Chimney */}
      <rect x={1520} y={175} width={20} height={25} fill="none" stroke={colors.darkCyra} strokeWidth={1.5} />
      {/* Gear */}
      <circle
        cx={1500}
        cy={240}
        r={15}
        fill="none"
        stroke={colors.darkCyra}
        strokeWidth={1.5}
        transform={`rotate(${gearRotation}, 1500, 240)`}
        strokeDasharray="6 6"
      />
    </g>
  );
};

// Surgical/precision icon
const PrecisionIcon: React.FC<{ opacity: number }> = ({ opacity }) => (
  <g opacity={opacity}>
    {/* Crosshair */}
    <circle
      cx={1500}
      cy={420}
      r={25}
      fill="none"
      stroke={colors.darkCyra}
      strokeWidth={2}
    />
    <line x1={1500} y1={390} x2={1500} y2={410} stroke={colors.darkCyra} strokeWidth={1.5} />
    <line x1={1500} y1={430} x2={1500} y2={450} stroke={colors.darkCyra} strokeWidth={1.5} />
    <line x1={1470} y1={420} x2={1490} y2={420} stroke={colors.darkCyra} strokeWidth={1.5} />
    <line x1={1510} y1={420} x2={1530} y2={420} stroke={colors.darkCyra} strokeWidth={1.5} />
    <circle cx={1500} cy={420} r={4} fill={colors.darkCyra} />
  </g>
);

// Hazard/danger icon
const HazardIcon: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  const flashOpacity = Math.sin(frame * 0.08) * 0.3 + 0.7;

  return (
    <g opacity={opacity}>
      {/* Warning triangle */}
      <path
        d="M 1500 580 L 1530 630 L 1470 630 Z"
        fill="none"
        stroke={colors.corn}
        strokeWidth={2.5}
        opacity={flashOpacity}
      />
      {/* Exclamation */}
      <line x1={1500} y1={595} x2={1500} y2={615} stroke={colors.corn} strokeWidth={2.5} opacity={flashOpacity} />
      <circle cx={1500} cy={623} r={2} fill={colors.corn} opacity={flashOpacity} />
    </g>
  );
};

export const Scene5WhyRoboticsMatter: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 12, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [-25, 0]);

  // Bullet points with bounce
  const bullet1Delay = 2.5 * fps;
  const bullet2Delay = 5 * fps;
  const bullet3Delay = 7.5 * fps;

  const bullet1Progress = spring({
    frame,
    fps,
    delay: bullet1Delay,
    config: { damping: 8, stiffness: 100 },
  });
  const bullet1X = interpolate(bullet1Progress, [0, 1], [-60, 0]);
  const bullet1Opacity = interpolate(bullet1Progress, [0, 1], [0, 1]);

  const bullet2Progress = spring({
    frame,
    fps,
    delay: bullet2Delay,
    config: { damping: 8, stiffness: 100 },
  });
  const bullet2X = interpolate(bullet2Progress, [0, 1], [-60, 0]);
  const bullet2Opacity = interpolate(bullet2Progress, [0, 1], [0, 1]);

  const bullet3Progress = spring({
    frame,
    fps,
    delay: bullet3Delay,
    config: { damping: 8, stiffness: 100 },
  });
  const bullet3X = interpolate(bullet3Progress, [0, 1], [-60, 0]);
  const bullet3Opacity = interpolate(bullet3Progress, [0, 1], [0, 1]);

  // Icons
  const icon1Opacity = interpolate(frame, [bullet1Delay + 15, bullet1Delay + 30], [0, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const icon2Opacity = interpolate(frame, [bullet2Delay + 15, bullet2Delay + 30], [0, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const icon3Opacity = interpolate(frame, [bullet3Delay + 15, bullet3Delay + 30], [0, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.white,
        fontFamily,
      }}
    >
      {/* Accent bar at top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 5,
          backgroundColor: colors.caribbeanGreen,
        }}
      />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 160,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: "bold",
            color: colors.darkSlateGray,
          }}
        >
          Why Robotics{" "}
          <span style={{ color: colors.caribbeanGreen }}>Matters</span>
        </div>
      </div>

      {/* Bullet points */}
      <div
        style={{
          position: "absolute",
          top: 210,
          left: 200,
          display: "flex",
          flexDirection: "column",
          gap: 60,
        }}
      >
        {/* Bullet 1 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            opacity: bullet1Opacity,
            transform: `translateX(${bullet1X}px)`,
          }}
        >
          <svg width="44" height="44" viewBox="-22 -22 44 44">
            <CheckIcon delay={bullet1Delay} x={0} y={0} />
          </svg>
          <div>
            <div
              style={{
                fontSize: 32,
                fontWeight: "bold",
                color: colors.gunmetal,
              }}
            >
              Remove repetitive work from humans
            </div>
            <div style={{ fontSize: 20, color: colors.rhythm, marginTop: 4 }}>
              Automate dangerous, tedious, and repetitive tasks
            </div>
          </div>
        </div>

        {/* Bullet 2 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            opacity: bullet2Opacity,
            transform: `translateX(${bullet2X}px)`,
          }}
        >
          <svg width="44" height="44" viewBox="-22 -22 44 44">
            <CheckIcon delay={bullet2Delay} x={0} y={0} />
          </svg>
          <div>
            <div
              style={{
                fontSize: 32,
                fontWeight: "bold",
                color: colors.gunmetal,
              }}
            >
              Improve human capabilities
            </div>
            <div style={{ fontSize: 20, color: colors.rhythm, marginTop: 4 }}>
              Precision surgery, enhanced manufacturing, superhuman accuracy
            </div>
          </div>
        </div>

        {/* Bullet 3 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            opacity: bullet3Opacity,
            transform: `translateX(${bullet3X}px)`,
          }}
        >
          <svg width="44" height="44" viewBox="-22 -22 44 44">
            <CheckIcon delay={bullet3Delay} x={0} y={0} />
          </svg>
          <div>
            <div
              style={{
                fontSize: 32,
                fontWeight: "bold",
                color: colors.gunmetal,
              }}
            >
              Operate where humans cannot
            </div>
            <div style={{ fontSize: 20, color: colors.rhythm, marginTop: 4 }}>
              Deep sea, outer space, disaster zones, toxic environments
            </div>
          </div>
        </div>
      </div>

      {/* Right-side icons */}
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <FactoryIcon opacity={icon1Opacity} />
        <PrecisionIcon opacity={icon2Opacity} />
        <HazardIcon opacity={icon3Opacity} />
      </svg>
    </AbsoluteFill>
  );
};
