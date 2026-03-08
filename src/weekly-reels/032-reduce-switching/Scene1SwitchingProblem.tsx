import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const aiTools = [
  { letter: "C", color: colors.tiffanyBlue, x: 180, y: 300 },
  { letter: "G", color: colors.corn, x: 700, y: 280 },
  { letter: "Ch", color: colors.caribbeanGreen, x: 250, y: 700 },
  { letter: "Gr", color: colors.turkishRose, x: 650, y: 680 },
];

export const Scene1SwitchingProblem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 200 },
  });

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

      {/* Chaotic AI tool circles bouncing */}
      {aiTools.map((tool, i) => {
        const bounce = Math.sin(frame * 0.05 + i * 1.8) * 30;
        const bounceX = Math.cos(frame * 0.04 + i * 2.3) * 25;
        const entrance = spring({
          frame,
          fps,
          delay: 15 + i * 10,
          config: { damping: 14, stiffness: 80 },
        });

        return (
          <div
            key={tool.letter}
            style={{
              position: "absolute",
              left: tool.x + bounceX,
              top: tool.y + bounce,
              transform: `scale(${interpolate(entrance, [0, 1], [0, 1])})`,
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundColor: `${tool.color}15`,
                border: `2.5px solid ${tool.color}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                fontWeight: 700,
                color: tool.color,
              }}
            >
              {tool.letter}
            </div>
          </div>
        );
      })}

      {/* Rapid switching arrows */}
      <svg
        width="1080"
        height="1920"
        viewBox="0 0 1080 1920"
        fill="none"
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
      >
        {[
          { x1: 260, y1: 340, x2: 700, y2: 320 },
          { x1: 740, y1: 320, x2: 290, y2: 740 },
          { x1: 330, y1: 740, x2: 650, y2: 720 },
          { x1: 690, y1: 720, x2: 220, y2: 340 },
        ].map((arrow, i) => {
          const arrowOpacity = interpolate(
            (frame + i * 15) % 60,
            [0, 30, 60],
            [0, 0.4, 0],
            { extrapolateRight: "clamp" }
          );

          return (
            <line
              key={i}
              x1={arrow.x1}
              y1={arrow.y1}
              x2={arrow.x2}
              y2={arrow.y2}
              stroke={colors.oldRose}
              strokeWidth={1.5}
              strokeDasharray="6 4"
              opacity={arrowOpacity}
            />
          );
        })}
      </svg>

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 300,
          paddingLeft: 50,
          paddingRight: 50,
          gap: 24,
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: interpolate(titleProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(titleProgress, [0, 1], [30, 0])}px)`,
            lineHeight: 1.2,
          }}
        >
          Stop the AI
          <br />
          <span style={{ color: colors.oldRose }}>Switching</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
