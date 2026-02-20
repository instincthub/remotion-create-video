import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Retraining loop animation
const RetrainingLoop: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  const rotation = (frame * 1.2) % 360;

  return (
    <div
      style={{
        position: "absolute",
        top: 420,
        left: "50%",
        transform: "translateX(-50%)",
        opacity,
      }}
    >
      <svg width="300" height="200" viewBox="0 0 300 200">
        {/* Circular arrow */}
        <g transform={`rotate(${rotation}, 150, 100)`}>
          <path
            d="M150 30 A70 70 0 1 1 80 100"
            fill="none"
            stroke={colors.caribbeanGreen}
            strokeWidth={3}
            strokeLinecap="round"
          />
          <polygon
            points="72,90 80,105 90,92"
            fill={colors.caribbeanGreen}
          />
        </g>

        {/* Center label */}
        <text
          x={150}
          y={105}
          textAnchor="middle"
          fill={colors.darkCyra}
          fontSize={16}
          fontWeight={700}
          fontFamily={fontFamily}
        >
          Retrain
        </text>
      </svg>
    </div>
  );
};

export const Scene9BestPractices: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Items
  const items = [
    { text: "Document", icon: "doc", color: colors.darkCyra },
    { text: "Automate", icon: "gear", color: colors.viridianGreen },
    { text: "Retrain", icon: "loop", color: colors.caribbeanGreen },
  ];

  const itemProgresses = items.map((_, i) =>
    spring({
      frame,
      fps,
      delay: Math.round(fps * (0.5 + i * 1.5)),
      config: { damping: 12, stiffness: 90 },
    }),
  );

  // Check marks
  const checkProgresses = items.map((_, i) =>
    spring({
      frame,
      fps,
      delay: Math.round(fps * (1.5 + i * 1.5)),
      config: { damping: 10, stiffness: 100 },
    }),
  );

  // Loop animation
  const loopProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 5),
    config: { damping: 14, stiffness: 80 },
  });
  const loopOpacity = interpolate(loopProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: colors.white,
        fontFamily,
      }}
    >
      {/* Green accent strip */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background: colors.caribbeanGreen,
        }}
      />

      {/* Items with checkmarks */}
      <div
        style={{
          position: "absolute",
          top: 120,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 80,
        }}
      >
        {items.map((item, i) => {
          const prog = itemProgresses[i];
          const iOpacity = interpolate(prog, [0, 1], [0, 1]);
          const iX = interpolate(prog, [0, 1], [-40, 0]);

          const checkProg = checkProgresses[i];
          const checkOpacity = interpolate(
            checkProg,
            [0, 1],
            [0, 1],
          );
          const checkScale = interpolate(
            checkProg,
            [0, 1],
            [0.5, 1],
          );

          return (
            <div
              key={item.text}
              style={{
                opacity: iOpacity,
                transform: `translateX(${iX}px)`,
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              {/* Checkmark circle */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: `${item.color}15`,
                  border: `2.5px solid ${item.color}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: checkOpacity,
                  transform: `scale(${checkScale})`,
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <polyline
                    points="6,12 10,16 18,8"
                    fill="none"
                    stroke={item.color}
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Text */}
              <span
                style={{
                  fontSize: 44,
                  fontWeight: 700,
                  color: item.color,
                }}
              >
                {item.text}
              </span>
            </div>
          );
        })}
      </div>

      {/* Retraining loop */}
      <RetrainingLoop opacity={loopOpacity} />
    </AbsoluteFill>
  );
};
