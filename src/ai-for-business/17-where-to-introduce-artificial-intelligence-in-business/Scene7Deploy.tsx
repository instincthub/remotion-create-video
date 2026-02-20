import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const MetricBar: React.FC<{
  label: string;
  value: number;
  maxValue: number;
  color: string;
  progress: number;
}> = ({ label, value, maxValue, color, progress }) => {
  const barWidth = interpolate(progress, [0, 1], [0, (value / maxValue) * 100]);

  return (
    <div style={{ marginBottom: 18 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
          fontSize: 18,
          fontWeight: 700,
        }}
      >
        <span style={{ color: colors.gunmetal }}>{label}</span>
        <span style={{ color, opacity: progress }}>
          {Math.round(value * progress)}%
        </span>
      </div>
      <div
        style={{
          width: "100%",
          height: 12,
          borderRadius: 6,
          background: `${color}15`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${barWidth}%`,
            height: "100%",
            borderRadius: 6,
            background: `linear-gradient(90deg, ${color}, ${color}cc)`,
          }}
        />
      </div>
    </div>
  );
};

export const Scene7Deploy: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Blueprint grid
  const gridOpacity = interpolate(frame, [0, fps], [0, 0.06], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 8,
    config: { damping: 12, stiffness: 80 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  // Dashboard panel
  const dashProgress = spring({
    frame,
    fps,
    delay: fps,
    config: { damping: 12, stiffness: 70 },
  });
  const dashOpacity = interpolate(dashProgress, [0, 1], [0, 1]);
  const dashScale = interpolate(dashProgress, [0, 1], [0.95, 1]);

  // Metrics
  const metricsProgress = interpolate(frame, [2 * fps, 5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Status cards
  const statusCards = [
    { label: "IT Testing", icon: "check", status: "Passed", color: colors.caribbeanGreen },
    { label: "Failover", icon: "shield", status: "Active", color: colors.darkCyra },
    { label: "Monitoring", icon: "chart", status: "Live", color: colors.tiffanyBlue },
  ];

  // Questions
  const questions = [
    { text: "What if the API goes down?", delay: 6 * fps },
    { text: "What if response time spikes?", delay: 7.5 * fps },
    { text: "What if usage scales 10x?", delay: 9 * fps },
  ];

  // Bottom text
  const bottomProgress = spring({
    frame,
    fps,
    delay: 11 * fps,
    config: { damping: 10, stiffness: 60 },
  });
  const bottomOpacity = interpolate(bottomProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.white,
        fontFamily,
      }}
    >
      {/* Blueprint grid */}
      <AbsoluteFill
        style={{
          opacity: gridOpacity,
          backgroundImage: `
            linear-gradient(${colors.darkCyra}12 1px, transparent 1px),
            linear-gradient(90deg, ${colors.darkCyra}12 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: colors.caribbeanGreen,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 700,
              color: colors.white,
            }}
          >
            E
          </div>
          <div style={{ fontSize: 50, fontWeight: 700, color: colors.darkSlateGray }}>
            Deploy
          </div>
          <div style={{ fontSize: 26, color: colors.rhythm }}>
            Resilience Matters
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div
        style={{
          position: "absolute",
          top: 270,
          left: 80,
          right: 80,
          display: "flex",
          gap: 40,
        }}
      >
        {/* Left: Dashboard */}
        <div
          style={{
            flex: 1,
            opacity: dashOpacity,
            transform: `scale(${dashScale})`,
            background: colors.magnolia,
            borderRadius: 20,
            padding: 32,
            border: `1px solid ${colors.chineseSilver}40`,
          }}
        >
          {/* Dashboard header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 28,
              paddingBottom: 16,
              borderBottom: `1px solid ${colors.chineseSilver}40`,
            }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="2" y="2" width="24" height="24" rx="4" stroke={colors.darkCyra} strokeWidth="2" />
              <path d="M7 18L11 12L15 15L21 8" stroke={colors.caribbeanGreen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div style={{ fontSize: 22, fontWeight: 700, color: colors.gunmetal }}>
              System Dashboard
            </div>
            <div
              style={{
                marginLeft: "auto",
                width: 10,
                height: 10,
                borderRadius: 5,
                background: colors.caribbeanGreen,
              }}
            />
          </div>

          <MetricBar
            label="Uptime"
            value={99.7}
            maxValue={100}
            color={colors.caribbeanGreen}
            progress={metricsProgress}
          />
          <MetricBar
            label="Response Time"
            value={85}
            maxValue={100}
            color={colors.darkCyra}
            progress={metricsProgress}
          />
          <MetricBar
            label="Error Rate"
            value={2.1}
            maxValue={100}
            color={colors.oldRose}
            progress={metricsProgress}
          />

          {/* Status cards */}
          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
            {statusCards.map((card, i) => {
              const cardProgress = spring({
                frame,
                fps,
                delay: 3.5 * fps + i * 12,
                config: { damping: 12, stiffness: 70 },
              });
              return (
                <div
                  key={card.label}
                  style={{
                    flex: 1,
                    opacity: interpolate(cardProgress, [0, 1], [0, 1]),
                    transform: `translateY(${interpolate(cardProgress, [0, 1], [15, 0])}px)`,
                    background: colors.white,
                    borderRadius: 12,
                    padding: "14px 12px",
                    textAlign: "center",
                    border: `1px solid ${card.color}30`,
                  }}
                >
                  <div style={{ fontSize: 14, color: colors.rhythm, marginBottom: 6 }}>
                    {card.label}
                  </div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: card.color }}>
                    {card.status}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Questions */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 20,
          }}
        >
          {questions.map((q, i) => {
            const qProgress = spring({
              frame,
              fps,
              delay: q.delay,
              config: { damping: 12, stiffness: 70 },
            });
            const qOpacity = interpolate(qProgress, [0, 1], [0, 1]);
            const qX = interpolate(qProgress, [0, 1], [40, 0]);

            return (
              <div
                key={q.text}
                style={{
                  opacity: qOpacity,
                  transform: `translateX(${qX}px)`,
                  background: `${colors.darkCyra}08`,
                  border: `1px solid ${colors.darkCyra}25`,
                  borderRadius: 14,
                  padding: "20px 28px",
                  fontSize: 24,
                  color: colors.gunmetal,
                  fontWeight: 400,
                }}
              >
                <span style={{ color: colors.darkCyra, fontWeight: 700 }}>?</span>{" "}
                {q.text}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom text */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: bottomOpacity,
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 700, color: colors.gunmetal }}>
          Enterprise means{" "}
          <span style={{ color: colors.caribbeanGreen }}>resilience.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
