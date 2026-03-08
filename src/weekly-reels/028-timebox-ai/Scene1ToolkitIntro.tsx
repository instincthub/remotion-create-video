import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene1ToolkitIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 200 },
  });

  const boxEntrance = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 14, stiffness: 80 },
  });

  // Toolbox lid opening
  const lidAngle = interpolate(
    spring({ frame, fps, delay: 15, config: { damping: 12, stiffness: 60 } }),
    [0, 1],
    [0, -50]
  );

  // Tools peeking out
  const tools = [
    { delay: 40, color: colors.tiffanyBlue, label: "wrench" },
    { delay: 55, color: colors.caribbeanGreen, label: "gear" },
    { delay: 70, color: colors.turkishRose, label: "clock" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${colors.gunmetal}, ${colors.darkSlateGray})`,
        fontFamily,
      }}
    >
      <AbsoluteFill style={{ opacity: 0.03 }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`h-${i}`}
            style={{
              position: "absolute",
              top: i * 96,
              left: 0,
              width: "100%",
              height: 1,
              backgroundColor: colors.tiffanyBlue,
            }}
          />
        ))}
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 300,
          paddingLeft: 50,
          paddingRight: 50,
          gap: 30,
        }}
      >
        {/* Toolbox */}
        <div
          style={{
            transform: `scale(${interpolate(boxEntrance, [0, 1], [0, 1])})`,
            position: "relative",
          }}
        >
          <svg width="260" height="220" viewBox="0 0 260 220" fill="none">
            {/* Toolbox body */}
            <rect
              x="30"
              y="100"
              width="200"
              height="110"
              rx="10"
              fill={`${colors.darkCyra}15`}
              stroke={colors.darkCyra}
              strokeWidth={2.5}
            />
            {/* Handle */}
            <path
              d="M100 100 L100 85 Q100 75 110 75 L150 75 Q160 75 160 85 L160 100"
              stroke={colors.darkCyra}
              strokeWidth={2.5}
              fill="none"
            />
            {/* Lid */}
            <g style={{ transform: `rotate(${lidAngle}deg)`, transformOrigin: "30px 100px" }}>
              <rect
                x="30"
                y="80"
                width="200"
                height="25"
                rx="6"
                fill={`${colors.darkCyra}25`}
                stroke={colors.darkCyra}
                strokeWidth={2}
              />
            </g>

            {/* Tools peeking out */}
            {tools.map((tool, i) => {
              const toolEntrance = spring({
                frame,
                fps,
                delay: tool.delay,
                config: { damping: 14, stiffness: 80 },
              });
              const toolY = interpolate(toolEntrance, [0, 1], [0, -40 - i * 5]);

              return (
                <g key={tool.label} style={{ transform: `translateY(${toolY}px)` }}>
                  {tool.label === "wrench" && (
                    <path
                      d={`M${80 + i * 50} 90 L${80 + i * 50} 60 L${72 + i * 50} 50 L${88 + i * 50} 50 L${80 + i * 50} 60`}
                      stroke={tool.color}
                      strokeWidth={2.5}
                      fill="none"
                      strokeLinecap="round"
                    />
                  )}
                  {tool.label === "gear" && (
                    <circle
                      cx={80 + i * 50}
                      cy={65}
                      r={14}
                      stroke={tool.color}
                      strokeWidth={2}
                      fill={`${tool.color}15`}
                    />
                  )}
                  {tool.label === "clock" && (
                    <>
                      <circle
                        cx={80 + i * 50}
                        cy={65}
                        r={14}
                        stroke={tool.color}
                        strokeWidth={2}
                        fill={`${tool.color}15`}
                      />
                      <line
                        x1={80 + i * 50}
                        y1={65}
                        x2={80 + i * 50}
                        y2={56}
                        stroke={tool.color}
                        strokeWidth={2}
                        strokeLinecap="round"
                      />
                      <line
                        x1={80 + i * 50}
                        y1={65}
                        x2={88 + i * 50}
                        y2={65}
                        stroke={tool.color}
                        strokeWidth={2}
                        strokeLinecap="round"
                      />
                    </>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 44,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: interpolate(titleProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(titleProgress, [0, 1], [30, 0])}px)`,
            lineHeight: 1.2,
          }}
        >
          Developer
          <br />
          <span style={{ color: colors.darkCyra }}>AI Fatigue Toolkit</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
