import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const FEARS = [
  { stat: "65%", label: "fear AI will destroy critical thinking", icon: "🧠" },
  { stat: "50%+", label: "fear it will make jobs harder to find", icon: "💼" },
  { stat: "44%", label: "don't know how to guide their child's AI use", icon: "🌍" },
];

export const Scene5ParentFears: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const title = spring({ frame, fps, config: { damping: 200 } });

  const fearProgresses = FEARS.map((_, i) =>
    spring({
      frame: frame - Math.round(fps * (2 + i * 8)),
      fps,
      config: { damping: 15, stiffness: 80 },
    })
  );

  const closing = spring({ frame: frame - Math.round(fps * 26), fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ background: colors.gunmetal, fontFamily }}>
      {/* Subtle grid */}
      <AbsoluteFill
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, ${colors.darkSlateGray}15 0px, ${colors.darkSlateGray}15 1px, transparent 1px, transparent 96px), repeating-linear-gradient(90deg, ${colors.darkSlateGray}15 0px, ${colors.darkSlateGray}15 1px, transparent 1px, transparent 96px)`,
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 80px 320px",
          gap: 36,
        }}
      >
        {/* Title */}
        <div
          style={{
            opacity: interpolate(title, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(title, [0, 1], [20, 0])}px)`,
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 700, color: colors.tiffanyBlue, letterSpacing: 4, marginBottom: 10 }}>
            PARENT FEARS REVEALED
          </div>
          <div style={{ fontSize: 50, fontWeight: 900, color: colors.white, lineHeight: 1.2 }}>
            Worried. And they should be.
          </div>
          <div style={{ fontSize: 22, color: colors.rhythm, marginTop: 8 }}>
            But not for the reasons they think.
          </div>
        </div>

        {/* Fear cards */}
        {FEARS.map((fear, i) => {
          const p = fearProgresses[i];
          const opacity = interpolate(p, [0, 1], [0, 1]);
          const x = interpolate(p, [0, 1], [-48, 0]);

          return (
            <div
              key={i}
              style={{
                opacity,
                transform: `translateX(${x}px)`,
                display: "flex",
                alignItems: "center",
                gap: 28,
                background: `${colors.darkSlateGray}CC`,
                borderRadius: 16,
                padding: "28px 32px",
                borderLeft: `5px solid ${colors.oldRose}`,
              }}
            >
              <div style={{ fontSize: 48 }}>{fear.icon}</div>
              <div>
                <div style={{ fontSize: 72, fontWeight: 900, color: colors.oldRose, lineHeight: 1 }}>
                  {fear.stat}
                </div>
                <div style={{ fontSize: 22, fontWeight: 600, color: colors.white, lineHeight: 1.4, marginTop: 4 }}>
                  {fear.label}
                </div>
              </div>
            </div>
          );
        })}

        {/* Closing */}
        <div
          style={{
            opacity: interpolate(closing, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(closing, [0, 1], [16, 0])}px)`,
            borderLeft: `4px solid ${colors.caribbeanGreen}`,
            paddingLeft: 20,
          }}
        >
          <div style={{ fontSize: 26, fontWeight: 700, color: colors.caribbeanGreen, lineHeight: 1.5 }}>
            Fear without direction is just paralysis.
          </div>
        </div>
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          bottom: 320,
          right: 80,
          fontSize: 15,
          fontWeight: 700,
          color: `${colors.white}40`,
        }}
      >
        InstinctHub
      </div>
    </AbsoluteFill>
  );
};
