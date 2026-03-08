import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene2HumanOverload: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 200 },
  });

  // Loop speed increases
  const loopSpeed = interpolate(frame, [0, 300], [0.8, 3], {
    extrapolateRight: "clamp",
  });
  const rotation = frame * loopSpeed;

  // Progress bar stays near 0
  const fakeProgress = Math.sin(frame * 0.03) * 5 + 5;

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
        {/* Title */}
        <div
          style={{
            fontSize: 42,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: interpolate(titleProgress, [0, 1], [0, 1]),
            lineHeight: 1.2,
          }}
        >
          Circling Without
          <br />
          <span style={{ color: colors.oldRose }}>Progress</span>
        </div>

        {/* Brain with circular arrows */}
        <div style={{ position: "relative", width: 260, height: 260 }}>
          {/* Brain center */}
          <svg
            width="260"
            height="260"
            viewBox="0 0 260 260"
            fill="none"
            style={{ position: "absolute" }}
          >
            {/* Brain icon */}
            <path
              d="M130 80 Q110 80 105 95 Q95 93 94 105 Q88 110 90 120 Q88 130 95 135 Q94 142 102 148 Q105 155 120 155 Q128 158 130 156 Q132 158 140 155 Q155 155 158 148 Q166 142 165 135 Q172 130 170 120 Q172 110 166 105 Q165 93 155 95 Q150 80 130 80Z"
              fill={`${colors.oldRose}10`}
              stroke={colors.oldRose}
              strokeWidth={2}
            />

            {/* Rotating circular arrows */}
            <g style={{ transform: `rotate(${rotation}deg)`, transformOrigin: "130px 130px" }}>
              <path
                d="M130 50 A80 80 0 0 1 208 108"
                stroke={colors.corn}
                strokeWidth={2.5}
                fill="none"
                strokeLinecap="round"
                strokeDasharray="6 4"
              />
              <path d="M202 95 L208 108 L195 106" stroke={colors.corn} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <g style={{ transform: `rotate(${rotation + 120}deg)`, transformOrigin: "130px 130px" }}>
              <path
                d="M130 50 A80 80 0 0 1 208 108"
                stroke={colors.turkishRose}
                strokeWidth={2.5}
                fill="none"
                strokeLinecap="round"
                strokeDasharray="6 4"
              />
              <path d="M202 95 L208 108 L195 106" stroke={colors.turkishRose} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <g style={{ transform: `rotate(${rotation + 240}deg)`, transformOrigin: "130px 130px" }}>
              <path
                d="M130 50 A80 80 0 0 1 208 108"
                stroke={colors.oldRose}
                strokeWidth={2.5}
                fill="none"
                strokeLinecap="round"
                strokeDasharray="6 4"
              />
              <path d="M202 95 L208 108 L195 106" stroke={colors.oldRose} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
            </g>

            {/* Loop labels */}
            <text x="65" y="228" fill={colors.chineseSilver} fontSize="12" fontFamily={fontFamily}>prompt</text>
            <text x="140" y="228" fill={colors.chineseSilver} fontSize="12" fontFamily={fontFamily}>review</text>
            <text x="105" y="245" fill={colors.chineseSilver} fontSize="12" fontFamily={fontFamily}>repeat</text>
          </svg>
        </div>

        {/* Progress bar stuck near 0 */}
        <div style={{ width: "100%", maxWidth: 500 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 18, color: colors.chineseSilver }}>Actual Progress</span>
            <span style={{ fontSize: 18, color: colors.oldRose, fontWeight: 700 }}>
              {Math.round(fakeProgress)}%
            </span>
          </div>
          <div
            style={{
              height: 24,
              borderRadius: 12,
              backgroundColor: `${colors.oldRose}15`,
              border: `1px solid ${colors.oldRose}25`,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${fakeProgress}%`,
                height: "100%",
                borderRadius: 12,
                backgroundColor: colors.oldRose,
                opacity: 0.6,
              }}
            />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
