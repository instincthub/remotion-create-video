import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Consumer app interface (left side)
const ConsumerSide: React.FC<{ progress: number }> = ({ progress }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const x = interpolate(progress, [0, 1], [-120, 0]);

  const apps = [
    { label: "Search", icon: "magnifier", color: colors.darkCyra },
    { label: "Feed", icon: "grid", color: colors.viridianGreen },
    { label: "Voice", icon: "mic", color: colors.deepGreenCyanTurquoise },
  ];

  return (
    <div
      style={{
        position: "absolute",
        top: 280,
        left: 140,
        width: 700,
        opacity,
        transform: `translateX(${x}px)`,
      }}
    >
      <div
        style={{
          fontSize: 38,
          fontWeight: 700,
          color: colors.darkSlateGray,
          marginBottom: 28,
          textAlign: "center",
          fontFamily,
        }}
      >
        Consumer AI
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 40,
        }}
      >
        {apps.map((app, i) => {
          const pulse = Math.sin(frame * 0.04 + i * 1.5) * 0.08 + 0.92;
          return (
            <div
              key={app.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}
            >
              <svg width="120" height="120" viewBox="0 0 100 100">
                <rect
                  x={10}
                  y={10}
                  width={80}
                  height={80}
                  rx={16}
                  fill={`${app.color}20`}
                  stroke={app.color}
                  strokeWidth={2.5}
                  opacity={pulse}
                />
                {app.icon === "magnifier" && (
                  <>
                    <circle
                      cx={45}
                      cy={45}
                      r={16}
                      fill="none"
                      stroke={app.color}
                      strokeWidth={3}
                    />
                    <line
                      x1={57}
                      y1={57}
                      x2={70}
                      y2={70}
                      stroke={app.color}
                      strokeWidth={3}
                      strokeLinecap="round"
                    />
                  </>
                )}
                {app.icon === "grid" && (
                  <>
                    {[0, 1, 2].map((r) =>
                      [0, 1, 2].map((c) => (
                        <rect
                          key={`g-${r}-${c}`}
                          x={28 + c * 18}
                          y={28 + r * 18}
                          width={12}
                          height={12}
                          rx={2}
                          fill={`${app.color}70`}
                        />
                      )),
                    )}
                  </>
                )}
                {app.icon === "mic" && (
                  <>
                    <rect
                      x={40}
                      y={28}
                      width={20}
                      height={30}
                      rx={10}
                      fill={`${app.color}45`}
                      stroke={app.color}
                      strokeWidth={2.5}
                    />
                    <path
                      d="M32 55 Q50 72 68 55"
                      fill="none"
                      stroke={app.color}
                      strokeWidth={2}
                    />
                    <line
                      x1={50}
                      y1={65}
                      x2={50}
                      y2={75}
                      stroke={app.color}
                      strokeWidth={2}
                    />
                  </>
                )}
              </svg>
              <span
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  color: app.color,
                  fontFamily,
                }}
              >
                {app.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Labels */}
      <div
        style={{
          marginTop: 32,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 12,
        }}
      >
        {["Massive Data", "Public Scale", "Fast Iteration"].map((label) => (
          <div
            key={label}
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: colors.darkCyra,
              background: `${colors.darkCyra}12`,
              padding: "8px 22px",
              borderRadius: 20,
              border: `2px solid ${colors.darkCyra}35`,
              fontFamily,
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

// Enterprise side (right side)
const EnterpriseSide: React.FC<{ progress: number }> = ({ progress }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const x = interpolate(progress, [0, 1], [120, 0]);

  const challenges = [
    { label: "Messy Data", color: colors.oldRose },
    { label: "Restricted Access", color: colors.metallicBlue },
    { label: "Cautious Stakeholders", color: colors.policeBlue },
    { label: "Real Risk", color: colors.oldRose },
  ];

  return (
    <div
      style={{
        position: "absolute",
        top: 280,
        right: 140,
        width: 700,
        opacity,
        transform: `translateX(${x}px)`,
      }}
    >
      <div
        style={{
          fontSize: 38,
          fontWeight: 700,
          color: colors.darkSlateGray,
          marginBottom: 28,
          textAlign: "center",
          fontFamily,
        }}
      >
        Enterprise AI
      </div>

      {/* Enterprise dashboard */}
      <div
        style={{
          margin: "0 auto",
          width: 460,
          height: 200,
          position: "relative",
        }}
      >
        <svg width="460" height="200" viewBox="0 0 460 200">
          {/* Dashboard frame */}
          <rect
            x={10}
            y={10}
            width={440}
            height={180}
            rx={8}
            fill={`${colors.deepGreenCyanTurquoise}10`}
            stroke={colors.deepGreenCyanTurquoise}
            strokeWidth={2.5}
          />
          {/* Header bar */}
          <rect
            x={10}
            y={10}
            width={440}
            height={30}
            rx={8}
            fill={`${colors.deepGreenCyanTurquoise}22`}
          />
          <rect
            x={10}
            y={32}
            width={440}
            height={8}
            fill={`${colors.deepGreenCyanTurquoise}22`}
          />
          {/* Lock icons */}
          {[100, 230, 360].map((cx, i) => {
            const pulse =
              Math.sin(frame * 0.05 + i * 1.2) * 0.15 + 0.85;
            return (
              <g key={`lock-${i}`} opacity={pulse}>
                <rect
                  x={cx - 14}
                  y={75}
                  width={28}
                  height={22}
                  rx={4}
                  fill={`${colors.oldRose}35`}
                  stroke={colors.oldRose}
                  strokeWidth={2}
                />
                <path
                  d={`M${cx - 8} 75 L${cx - 8} 68 Q${cx} 58 ${cx + 8} 68 L${cx + 8} 75`}
                  fill="none"
                  stroke={colors.oldRose}
                  strokeWidth={2}
                />
              </g>
            );
          })}
          {/* Data bars (restricted) */}
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={`bar-${i}`}
              x={30}
              y={120 + i * 16}
              width={120 + i * 30}
              height={8}
              rx={4}
              fill={`${colors.deepGreenCyanTurquoise}30`}
              stroke={`${colors.deepGreenCyanTurquoise}40`}
              strokeWidth={1}
            />
          ))}
        </svg>
      </div>

      {/* Challenge labels */}
      <div
        style={{
          marginTop: 16,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 12,
        }}
      >
        {challenges.map((ch) => (
          <div
            key={ch.label}
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: ch.color,
              background: `${ch.color}12`,
              padding: "8px 22px",
              borderRadius: 20,
              border: `2px solid ${ch.color}40`,
              fontFamily,
            }}
          >
            {ch.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export const Scene2ConsumerVsEnterprise: React.FC = () => {
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

  // Consumer side
  const consumerProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 2),
    config: { damping: 14, stiffness: 80 },
  });

  // Enterprise side
  const enterpriseProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 4),
    config: { damping: 14, stiffness: 80 },
  });

  // VS badge
  const vsProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 6),
    config: { damping: 10, stiffness: 90 },
  });
  const vsOpacity = interpolate(vsProgress, [0, 1], [0, 1]);
  const vsScale = interpolate(vsProgress, [0, 1], [0.5, 1]);

  return (
    <AbsoluteFill
      style={{
        fontFamily,
      }}
    >
      {/* Split background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "50%",
          height: "100%",
          background: colors.magnolia,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "50%",
          height: "100%",
          background: colors.white,
        }}
      />

      {/* Divider line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          width: 2,
          height: "100%",
          background: `${colors.chineseSilver}60`,
        }}
      />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 80,
          width: "100%",
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: colors.darkSlateGray,
          }}
        >
          Consumer AI{" "}
          <span style={{ color: colors.rhythm }}>vs</span>{" "}
          Enterprise AI
        </span>
      </div>

      <ConsumerSide progress={consumerProgress} />
      <EnterpriseSide progress={enterpriseProgress} />

      {/* VS badge in center */}
      <div
        style={{
          position: "absolute",
          top: 440,
          left: "50%",
          transform: `translateX(-50%) scale(${vsScale})`,
          opacity: vsOpacity,
          background: colors.darkCyra,
          color: colors.white,
          width: 64,
          height: 64,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
          fontWeight: 700,
          zIndex: 20,
          boxShadow: `0 4px 20px ${colors.darkCyra}40`,
        }}
      >
        VS
      </div>
    </AbsoluteFill>
  );
};
