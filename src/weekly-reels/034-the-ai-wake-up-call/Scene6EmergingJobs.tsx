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
    title: "AI & Machine Learning Engineer",
    salary: "$206,000",
    salaryTarget: 206000,
    growth: "26% job growth through 2033",
    source: "BLS",
  },
  {
    title: "Prompt Engineer",
    salary: "$300,000",
    salaryTarget: 300000,
    growth: "Demand growing 135%/yr",
    source: "AI job boards",
  },
  {
    title: "AI Ethics Officer",
    salary: "$90,000–$180,000",
    salaryTarget: null,
    growth: "60% of Fortune 100 hiring by 2026",
    source: "Forrester",
  },
  {
    title: "Data Scientist",
    salary: "34% employment growth",
    salaryTarget: null,
    growth: "Fastest-growing role globally — WEF",
    source: "WEF",
  },
];

const CARD_H = 220;

const JobCard: React.FC<{
  card: typeof CARDS[0];
  frame: number;
  fps: number;
  startFrame: number;
  index: number;
}> = ({ card, frame, fps, startFrame, index }) => {
  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const x = interpolate(progress, [0, 1], [80, 0]);

  // Salary counter animation if numeric
  let salaryDisplay = card.salary;
  if (card.salaryTarget) {
    const countProgress = interpolate(
      frame,
      [startFrame, startFrame + fps * 2],
      [0, card.salaryTarget],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
    salaryDisplay = `$${Math.round(countProgress).toLocaleString()}`;
  }

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${x}px)`,
        height: CARD_H,
        background: colors.darkSlateGray,
        borderLeft: `4px solid ${colors.darkCyra}`,
        borderRadius: 10,
        padding: "24px 32px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 8,
      }}
    >
      <div
        style={{
          fontSize: 28,
          fontWeight: 900,
          color: colors.white,
          fontFamily,
          lineHeight: 1.2,
        }}
      >
        {card.title}
      </div>
      <div
        style={{
          fontSize: 34,
          fontWeight: 900,
          color: colors.caribbeanGreen,
          fontFamily,
          lineHeight: 1,
        }}
      >
        {salaryDisplay}
      </div>
      <div
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: colors.tiffanyBlue,
          fontFamily,
        }}
      >
        {card.growth}
      </div>
      <div style={{ fontSize: 13, color: colors.rhythm, fontFamily, letterSpacing: 1 }}>
        Source: {card.source}
      </div>
    </div>
  );
};

export const Scene6EmergingJobs: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cards appear every ~12s
  const cardStarts = [fps * 1, fps * 15, fps * 29, fps * 43];

  // CEO stat appears after 4th card
  const ceoStatProgress = spring({
    frame: frame - fps * 56,
    fps,
    config: { damping: 200 },
  });
  const ceoOpacity = interpolate(ceoStatProgress, [0, 1], [0, 1]);
  const ceoY = interpolate(ceoStatProgress, [0, 1], [20, 0]);

  return (
    <AbsoluteFill style={{ background: colors.magnolia, fontFamily }}>
      {/* Eyebrow */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 80,
          fontSize: 16,
          fontWeight: 700,
          color: colors.darkSlateGray,
          letterSpacing: 4,
          textTransform: "uppercase" as const,
          opacity: interpolate(frame, [0, fps * 0.5], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Jobs Emerging Now
      </div>

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "120px 80px 220px",
          gap: 20,
          justifyContent: "center",
        }}
      >
        {CARDS.map((card, i) => (
          <JobCard
            key={i}
            card={card}
            frame={frame}
            fps={fps}
            startFrame={cardStarts[i]}
            index={i}
          />
        ))}

        {/* CEO stat */}
        <div
          style={{
            opacity: ceoOpacity,
            transform: `translateY(${ceoY}px)`,
            marginTop: 12,
            padding: "16px 24px",
            background: `${colors.gunmetal}10`,
            borderRadius: 8,
            borderLeft: `3px solid ${colors.viridianGreen}`,
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: colors.darkSlateGray,
              fontFamily,
            }}
          >
            40% of CEOs entered entirely new industries because of AI
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
