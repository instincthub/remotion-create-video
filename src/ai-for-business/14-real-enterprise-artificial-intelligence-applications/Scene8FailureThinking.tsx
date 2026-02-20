import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene8FailureThinking: React.FC = () => {
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
  const titleScale = interpolate(titleProgress, [0, 1], [0.9, 1]);

  // Error shake effect on title
  const shakeActive = frame > 0.5 * fps && frame < 2 * fps;
  const shakeX = shakeActive
    ? Math.sin(frame * 1.5) * interpolate(frame, [0.5 * fps, 2 * fps], [4, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  // Dashboard elements
  const dashProgress = spring({
    frame,
    fps,
    delay: 1.5 * fps,
    config: { damping: 12, stiffness: 80 },
  });
  const dashOpacity = interpolate(dashProgress, [0, 1], [0, 1]);

  // Error state appears
  const errorAppear = interpolate(
    frame,
    [2.5 * fps, 3.5 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const errorPulse = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.7, 1]);

  // Monitoring overlay stabilizes
  const monitorAppear = interpolate(
    frame,
    [14 * fps, 15.5 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.darkNavy} 0%, #0a0f1c 100%)`,
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
          display: "flex",
          justifyContent: "center",
          zIndex: 5,
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `scale(${titleScale}) translateX(${shakeX}px)`,
            fontSize: 50,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
          }}
        >
          What happens when the model is{" "}
          <span style={{ color: colors.oldRose }}>wrong</span>?
        </div>
      </div>

      {/* Alert dashboard interface */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: "50%",
          transform: "translateX(-50%)",
          width: 1200,
          background: colors.darkCharcoal,
          borderRadius: 20,
          border: `1px solid ${colors.white}12`,
          overflow: "hidden",
          zIndex: 3,
          opacity: dashOpacity,
        }}
      >
        {/* Dashboard header */}
        <div
          style={{
            padding: "16px 28px",
            borderBottom: `1px solid ${colors.white}10`,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <rect x="2" y="3" width="20" height="18" rx="3" fill="none" stroke={colors.tiffanyBlue} strokeWidth="2" />
            <line x1="2" y1="9" x2="22" y2="9" stroke={colors.tiffanyBlue} strokeWidth="1.5" />
            <circle cx="6" cy="6" r="1.5" fill={colors.oldRose} />
            <circle cx="10" cy="6" r="1.5" fill={colors.corn} />
            <circle cx="14" cy="6" r="1.5" fill={colors.caribbeanGreen} />
          </svg>
          <span style={{ fontSize: 22, fontWeight: 700, color: colors.white }}>
            System Monitor
          </span>
          <div style={{ flex: 1 }} />
          {/* Error badge */}
          <div
            style={{
              opacity: errorAppear * errorPulse,
              fontSize: 13,
              fontWeight: 700,
              color: colors.oldRose,
              background: `${colors.oldRose}20`,
              padding: "4px 14px",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                background: colors.oldRose,
              }}
            />
            ERROR DETECTED
          </div>
        </div>

        {/* Error log area */}
        <div style={{ padding: "20px 28px" }}>
          {/* Status bar */}
          <div
            style={{
              display: "flex",
              gap: 20,
              marginBottom: 20,
            }}
          >
            {[
              { label: "Accuracy", value: "94.2%", color: colors.caribbeanGreen },
              { label: "Uptime", value: "99.8%", color: colors.tiffanyBlue },
              { label: "Errors", value: "23", color: colors.oldRose },
              { label: "Queue", value: "142", color: colors.corn },
            ].map((stat, i) => {
              const statProgress = spring({
                frame,
                fps,
                delay: (2 + i * 0.4) * fps,
                config: { damping: 12, stiffness: 100 },
              });
              return (
                <div
                  key={`stat-${i}`}
                  style={{
                    opacity: interpolate(statProgress, [0, 1], [0, 1]),
                    flex: 1,
                    padding: "12px 16px",
                    background: `${stat.color}10`,
                    borderRadius: 10,
                    border: `1px solid ${stat.color}25`,
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 16, color: colors.chineseSilver, marginBottom: 6 }}>
                    {stat.label}
                  </div>
                  <div style={{ fontSize: 32, fontWeight: 700, color: stat.color }}>
                    {stat.value}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Error log entries */}
          <div
            style={{
              background: `${colors.darkNavy}`,
              borderRadius: 10,
              padding: "20px 24px",
              fontFamily: "monospace",
              fontSize: 18,
              lineHeight: 2.2,
              color: colors.chineseSilver,
              opacity: errorAppear,
            }}
          >
            <div>
              <span style={{ color: colors.rhythm }}>[09:14:22]</span>{" "}
              <span style={{ color: colors.oldRose }}>ERR</span>{" "}
              Model prediction confidence below threshold (0.32)
            </div>
            <div>
              <span style={{ color: colors.rhythm }}>[09:14:23]</span>{" "}
              <span style={{ color: colors.corn }}>WARN</span>{" "}
              Fallback triggered — routing to human review
            </div>
            <div>
              <span style={{ color: colors.rhythm }}>[09:14:25]</span>{" "}
              <span style={{ color: colors.tiffanyBlue }}>INFO</span>{" "}
              Human reviewer assigned: Agent #47
            </div>
          </div>
        </div>
      </div>

      {/* Monitoring overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 230,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 5,
        }}
      >
        <div
          style={{
            opacity: monitorAppear,
            fontSize: 30,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
          }}
        >
          Test not just accuracy.{" "}
          <span style={{ color: colors.oldRose }}>Test failure.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
