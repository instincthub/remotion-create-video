import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const CARDS = [
  {
    skill: "AI Literacy",
    description: "Understand how AI models work, their limits, and when to trust their output.",
  },
  {
    skill: "Computational Thinking",
    description: "Break problems into logical steps — algorithm design, pattern recognition, abstraction.",
  },
  {
    skill: "Data Literacy",
    description: "Read, interpret, and question data. Spot bias. Make evidence-based decisions.",
  },
  {
    skill: "Digital Fluency",
    description: "Navigate tools, platforms, and workflows — not just use them, but adapt them.",
  },
];

export const Scene4TechnicalSkills: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerIn = spring({ frame, fps, config: { damping: 200 } });

  const cardProgresses = CARDS.map((_, i) =>
    spring({
      frame: frame - Math.round(fps * (1.2 + i * 1.8)),
      fps,
      config: { damping: 200 },
    })
  );

  // Subtle tiffanyBlue grid pulse
  const gridOpacity = 0.05 + Math.sin(frame * 0.025) * 0.02;

  return (
    <AbsoluteFill style={{ background: colors.gunmetal, fontFamily }}>
      {/* Tiffany grid overlay */}
      <svg
        width="1080"
        height="1920"
        style={{ position: "absolute", top: 0, left: 0, opacity: gridOpacity }}
      >
        {Array.from({ length: 14 }, (_, i) => (
          <line
            key={`h${i}`}
            x1={0}
            y1={140 * i}
            x2={1080}
            y2={140 * i}
            stroke={colors.tiffanyBlue}
            strokeWidth={1}
          />
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <line
            key={`v${i}`}
            x1={108 * i}
            y1={0}
            x2={108 * i}
            y2={1920}
            stroke={colors.tiffanyBlue}
            strokeWidth={1}
          />
        ))}
      </svg>

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 80px 340px",
          gap: 0,
        }}
      >
        {/* Header */}
        <div
          style={{
            opacity: interpolate(headerIn, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(headerIn, [0, 1], [20, 0])}px)`,
            fontSize: 20,
            fontWeight: 700,
            color: colors.tiffanyBlue,
            letterSpacing: 4,
            marginBottom: 48,
          }}
        >
          TECHNICAL SKILLS FOR THE AI ERA
        </div>

        {/* Cards stacked */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {CARDS.map((card, i) => {
            const p = cardProgresses[i];
            const xIn = interpolate(p, [0, 1], [-120, 0]);
            const opacity = interpolate(p, [0, 1], [0, 1]);

            return (
              <div
                key={i}
                style={{
                  opacity,
                  transform: `translateX(${xIn}px)`,
                  background: colors.darkSlateGray,
                  borderRadius: 16,
                  padding: "28px 32px",
                  borderLeft: `5px solid ${colors.darkCyra}`,
                }}
              >
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: colors.tiffanyBlue,
                    marginBottom: 12,
                  }}
                >
                  {card.skill}
                </div>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 400,
                    color: colors.rhythm,
                    lineHeight: 1.5,
                  }}
                >
                  {card.description}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          bottom: 320,
          right: 80,
          fontSize: 15,
          fontWeight: 700,
          color: `${colors.white}40`,
          letterSpacing: 1,
        }}
      >
        InstinctHub
      </div>
    </AbsoluteFill>
  );
};
