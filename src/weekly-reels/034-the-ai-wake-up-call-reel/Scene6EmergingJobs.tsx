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
    title: "AI & ML Engineer",
    salaryTarget: 206000,
    salaryDisplay: "$206,000",
    growth: "26% growth",
    source: "U.S. Bureau of Labor Statistics",
    animateSalary: true,
  },
  {
    title: "Prompt Engineer",
    salaryTarget: 300000,
    salaryDisplay: "Up to $300,000",
    growth: "135%/yr demand increase",
    source: "LinkedIn Jobs Report 2025",
    animateSalary: true,
  },
  {
    title: "AI Ethics Officer",
    salaryTarget: 0,
    salaryDisplay: "$90K–$180K",
    growth: "60% Fortune 100 hiring now",
    source: "World Economic Forum",
    animateSalary: false,
  },
  {
    title: "Data Scientist",
    salaryTarget: 0,
    salaryDisplay: "34% growth",
    growth: "Fastest growing globally",
    source: "WEF Future of Jobs 2025",
    animateSalary: false,
  },
];

export const Scene6EmergingJobs: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Each card appears ~12s apart
  const cardProgresses = CARDS.map((_, i) =>
    spring({
      frame: frame - Math.round(fps * (1 + i * 12)),
      fps,
      config: { damping: 200 },
    })
  );

  // Salary counter for card 0 (AI & ML)
  const counter0 = spring({
    frame: frame - Math.round(fps * 1.5),
    fps,
    durationInFrames: Math.round(fps * 4),
    config: { damping: 200 },
  });
  const salary0 = Math.round(interpolate(counter0, [0, 1], [0, 206000]));

  // Salary counter for card 1 (Prompt Engineer)
  const counter1 = spring({
    frame: frame - Math.round(fps * 13.5),
    fps,
    durationInFrames: Math.round(fps * 4),
    config: { damping: 200 },
  });
  const salary1 = Math.round(interpolate(counter1, [0, 1], [0, 300000]));

  const eyebrow = spring({ frame, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ background: colors.magnolia, fontFamily }}>
      {/* Subtle top gradient */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 300,
          background: `linear-gradient(to bottom, ${colors.darkSlateGray}20, transparent)`,
          pointerEvents: "none",
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 80px 320px",
          gap: 0,
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            opacity: interpolate(eyebrow, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(eyebrow, [0, 1], [16, 0])}px)`,
            fontSize: 18,
            fontWeight: 700,
            color: colors.darkCyra,
            letterSpacing: 4,
            marginBottom: 32,
          }}
        >
          JOBS OF THE AI ERA
        </div>

        {/* Cards stacked */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {CARDS.map((card, i) => {
            const p = cardProgresses[i];
            const cardOpacity = interpolate(p, [0, 1], [0, 1]);
            const cardY = interpolate(p, [0, 1], [32, 0]);

            let salaryText = card.salaryDisplay;
            if (card.animateSalary && i === 0 && counter0 < 0.99) {
              salaryText = `$${salary0.toLocaleString()}`;
            } else if (card.animateSalary && i === 1 && counter1 < 0.99) {
              salaryText = `$${salary1.toLocaleString()}`;
            }

            return (
              <div
                key={i}
                style={{
                  opacity: cardOpacity,
                  transform: `translateY(${cardY}px)`,
                  background: colors.darkSlateGray,
                  borderRadius: 16,
                  padding: "24px 28px",
                  borderLeft: `5px solid ${colors.darkCyra}`,
                }}
              >
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 700,
                    color: colors.white,
                    marginBottom: 8,
                  }}
                >
                  {card.title}
                </div>
                <div
                  style={{
                    fontSize: 60,
                    fontWeight: 900,
                    color: colors.caribbeanGreen,
                    lineHeight: 1,
                    letterSpacing: -2,
                    marginBottom: 8,
                  }}
                >
                  {salaryText}
                </div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: colors.tiffanyBlue,
                    marginBottom: 6,
                  }}
                >
                  {card.growth}
                </div>
                <div
                  style={{
                    fontSize: 16,
                    color: colors.rhythm,
                    fontWeight: 700,
                    letterSpacing: 1,
                  }}
                >
                  {card.source}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* Watermark — dark text on light bg */}
      <div
        style={{
          position: "absolute",
          bottom: 320,
          right: 80,
          fontSize: 15,
          fontWeight: 700,
          color: `${colors.gunmetal}60`,
          letterSpacing: 1,
        }}
      >
        InstinctHub
      </div>
    </AbsoluteFill>
  );
};
