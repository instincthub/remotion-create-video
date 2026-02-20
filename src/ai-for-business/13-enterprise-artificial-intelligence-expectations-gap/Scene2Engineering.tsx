import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Blueprint-style engineering icon
const EngineeringIcon: React.FC<{
  type: "airplane" | "satellite" | "submarine";
  progress: number;
}> = ({ type, progress }) => {
  const scale = interpolate(progress, [0, 1], [0.5, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  const iconColor = colors.tiffanyBlue;

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
      }}
    >
      <svg width="200" height="200" viewBox="0 0 120 120">
        {/* Blueprint grid background */}
        {Array.from({ length: 6 }).map((_, i) => (
          <line
            key={`g-${i}`}
            x1={0}
            y1={i * 24}
            x2={120}
            y2={i * 24}
            stroke={`${iconColor}15`}
            strokeWidth={0.5}
          />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line
            key={`gv-${i}`}
            x1={i * 24}
            y1={0}
            x2={i * 24}
            y2={120}
            stroke={`${iconColor}15`}
            strokeWidth={0.5}
          />
        ))}

        {type === "airplane" && (
          <>
            {/* Fuselage */}
            <ellipse
              cx={60}
              cy={60}
              rx={45}
              ry={12}
              fill="none"
              stroke={iconColor}
              strokeWidth={2}
            />
            {/* Wings */}
            <path
              d="M 40 60 L 25 30 L 35 30 L 55 55"
              fill="none"
              stroke={iconColor}
              strokeWidth={1.5}
            />
            <path
              d="M 40 60 L 25 90 L 35 90 L 55 65"
              fill="none"
              stroke={iconColor}
              strokeWidth={1.5}
            />
            {/* Tail */}
            <path
              d="M 100 60 L 110 45 L 108 60 L 110 75 Z"
              fill="none"
              stroke={iconColor}
              strokeWidth={1.5}
            />
            {/* Cockpit */}
            <circle
              cx={18}
              cy={60}
              r={5}
              fill={`${iconColor}20`}
              stroke={iconColor}
              strokeWidth={1}
            />
          </>
        )}

        {type === "satellite" && (
          <>
            {/* Body */}
            <rect
              x={40}
              y={40}
              width={40}
              height={40}
              rx={4}
              fill="none"
              stroke={iconColor}
              strokeWidth={2}
            />
            {/* Solar panels */}
            <rect
              x={5}
              y={48}
              width={30}
              height={24}
              rx={2}
              fill={`${iconColor}15`}
              stroke={iconColor}
              strokeWidth={1.5}
            />
            <rect
              x={85}
              y={48}
              width={30}
              height={24}
              rx={2}
              fill={`${iconColor}15`}
              stroke={iconColor}
              strokeWidth={1.5}
            />
            {/* Panel lines */}
            {[15, 25].map((x) => (
              <line
                key={`sp-${x}`}
                x1={x}
                y1={48}
                x2={x}
                y2={72}
                stroke={`${iconColor}40`}
                strokeWidth={0.5}
              />
            ))}
            {[95, 105].map((x) => (
              <line
                key={`sp2-${x}`}
                x1={x}
                y1={48}
                x2={x}
                y2={72}
                stroke={`${iconColor}40`}
                strokeWidth={0.5}
              />
            ))}
            {/* Antenna */}
            <line
              x1={60}
              y1={40}
              x2={60}
              y2={20}
              stroke={iconColor}
              strokeWidth={1.5}
            />
            <circle
              cx={60}
              cy={18}
              r={4}
              fill="none"
              stroke={iconColor}
              strokeWidth={1}
            />
          </>
        )}

        {type === "submarine" && (
          <>
            {/* Hull */}
            <ellipse
              cx={60}
              cy={65}
              rx={50}
              ry={18}
              fill="none"
              stroke={iconColor}
              strokeWidth={2}
            />
            {/* Conning tower */}
            <rect
              x={48}
              y={38}
              width={24}
              height={28}
              rx={4}
              fill="none"
              stroke={iconColor}
              strokeWidth={1.5}
            />
            {/* Periscope */}
            <line
              x1={60}
              y1={38}
              x2={60}
              y2={22}
              stroke={iconColor}
              strokeWidth={1.5}
            />
            <line
              x1={60}
              y1={22}
              x2={68}
              y2={22}
              stroke={iconColor}
              strokeWidth={1.5}
            />
            {/* Propeller */}
            <circle
              cx={112}
              cy={65}
              r={6}
              fill="none"
              stroke={iconColor}
              strokeWidth={1}
            />
            <line
              x1={112}
              y1={59}
              x2={112}
              y2={71}
              stroke={iconColor}
              strokeWidth={1}
            />
            {/* Portholes */}
            {[35, 50, 65, 80].map((x) => (
              <circle
                key={`port-${x}`}
                cx={x}
                cy={65}
                r={4}
                fill={`${iconColor}10`}
                stroke={`${iconColor}60`}
                strokeWidth={1}
              />
            ))}
          </>
        )}
      </svg>
    </div>
  );
};

// Engineering process item
const ProcessItem: React.FC<{
  text: string;
  progress: number;
  icon: string;
}> = ({ text, progress, icon }) => {
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const slideX = interpolate(progress, [0, 1], [20, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${slideX}px)`,
        display: "flex",
        alignItems: "center",
        gap: 14,
        fontSize: 30,
        color: colors.darkSlateGray,
        fontFamily,
      }}
    >
      <span style={{ fontSize: 20, color: colors.darkCyra, fontWeight: 700 }}>{icon}</span>
      <span>{text}</span>
    </div>
  );
};

export const Scene2Engineering: React.FC = () => {
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
  const titleY = interpolate(titleProgress, [0, 1], [-30, 0]);

  // Engineering icons stagger
  const types: Array<"airplane" | "satellite" | "submarine"> = [
    "airplane",
    "satellite",
    "submarine",
  ];

  const processes = [
    { text: "Advanced Design Tools", delay: 6 },
    { text: "Strict Processes", delay: 7.5 },
    { text: "Component Tracking", delay: 9 },
    { text: "Risk Controls", delay: 10.5 },
  ];

  // Background blueprint grid
  const gridOffset = (frame * 0.2) % 40;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.magnolia, fontFamily }}>
      {/* Blueprint grid background */}
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", top: 0, left: 0, opacity: 0.06 }}
      >
        {Array.from({ length: 50 }).map((_, i) => (
          <line
            key={`vg-${i}`}
            x1={i * 40 + gridOffset}
            y1={0}
            x2={i * 40 + gridOffset}
            y2={1080}
            stroke={colors.darkCyra}
            strokeWidth={0.5}
          />
        ))}
        {Array.from({ length: 28 }).map((_, i) => (
          <line
            key={`hg-${i}`}
            x1={0}
            y1={i * 40 + gridOffset}
            x2={1920}
            y2={i * 40 + gridOffset}
            stroke={colors.darkCyra}
            strokeWidth={0.5}
          />
        ))}
      </svg>

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 60,
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
            transform: `translateY(${titleY}px)`,
            fontSize: 56,
            fontWeight: 700,
            color: colors.darkSlateGray,
            textAlign: "center",
          }}
        >
          Engineering vs{" "}
          <span style={{ color: colors.darkCyra }}>Expectation</span>
        </div>
      </div>

      {/* Engineering icons row */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 120,
          zIndex: 2,
        }}
      >
        {types.map((type, i) => {
          const iconProgress = spring({
            frame,
            fps,
            delay: 1.5 * fps + i * 15,
            config: { damping: 12, stiffness: 80 },
          });

          return (
            <div
              key={type}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <EngineeringIcon type={type} progress={iconProgress} />
              <div
                style={{
                  opacity: interpolate(iconProgress, [0, 1], [0, 1]),
                  fontSize: 20,
                  color: colors.darkSlateGray,
                  fontFamily,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                }}
              >
                {type}
              </div>
            </div>
          );
        })}
      </div>

      {/* Divider */}
      <div
        style={{
          position: "absolute",
          top: 530,
          left: "50%",
          transform: "translateX(-50%)",
          width: interpolate(frame, [4 * fps, 5.5 * fps], [0, 600], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          height: 2,
          background: `${colors.darkCyra}30`,
          zIndex: 2,
        }}
      />

      {/* Processes list */}
      <div
        style={{
          position: "absolute",
          top: 570,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 18,
          zIndex: 2,
        }}
      >
        {processes.map((proc, i) => {
          const procProgress = spring({
            frame,
            fps,
            delay: proc.delay * fps,
            config: { damping: 12, stiffness: 90 },
          });
          return (
            <ProcessItem
              key={`proc-${i}`}
              text={proc.text}
              progress={procProgress}
              icon=">"
            />
          );
        })}
      </div>

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
            opacity: interpolate(
              frame,
              [13 * fps, 15 * fps],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            ),
            fontSize: 28,
            color: colors.darkSlateGray,
            textAlign: "center",
          }}
        >
          We build{" "}
          <span style={{ color: colors.darkCyra, fontWeight: 700 }}>
            critical systems
          </span>{" "}
          with massive engineering teams.
        </div>
      </div>
    </AbsoluteFill>
  );
};
