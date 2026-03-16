import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const JOBS = [
  { title: "Data Entry Clerk", stat: "95% automatable", source: "Anthropic Research" },
  { title: "Call Centre Agent", stat: "70% automated", source: "Industry Reports" },
  { title: "Bookkeeper", stat: "Top declining role by 2030", source: "World Economic Forum" },
  { title: "Legal Assistant", stat: "AI performs contract reviews", source: "LexisNexis" },
  { title: "Translator", stat: "#1 AI applicability risk", source: "Microsoft Research" },
  { title: "Junior Developer", stat: "75% tasks exposed", source: "Anthropic 2026" },
];

const CARD_W = 540;
const CARD_H = 200;
const STAGGER = 8; // frames between cards

const JobCard: React.FC<{
  job: typeof JOBS[0];
  frame: number;
  fps: number;
  startFrame: number;
  dimmed: boolean;
}> = ({ job, frame, fps, startFrame, dimmed }) => {
  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  const cardOpacity = interpolate(progress, [0, 1], [0, 1]) * (dimmed ? 0.5 : 1);
  const cardY = interpolate(progress, [0, 1], [30, 0]);

  // Strikethrough draws left to right ~12 frames after card appears
  const strikeProgress = interpolate(
    frame,
    [startFrame + 12, startFrame + 28],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const strikeWidth = strikeProgress * (CARD_W - 32);

  return (
    <div
      style={{
        opacity: cardOpacity,
        transform: `translateY(${cardY}px)`,
        width: CARD_W,
        height: CARD_H,
        background: `${colors.gunmetal}EE`,
        border: `1px solid ${colors.rhythm}40`,
        borderRadius: 10,
        padding: "20px 24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: colors.white,
          marginBottom: 8,
          fontFamily,
        }}
      >
        {job.title}
      </div>
      <div
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: colors.oldRose,
          marginBottom: 6,
          fontFamily,
        }}
      >
        {job.stat}
      </div>
      <div
        style={{
          fontSize: 13,
          color: colors.rhythm,
          fontFamily,
          letterSpacing: 0.5,
        }}
      >
        {job.source}
      </div>

      {/* Strikethrough line */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 16,
          width: strikeWidth,
          height: 2,
          background: colors.oldRose,
          opacity: 0.8,
        }}
      />
    </div>
  );
};

export const Scene3DisappearingJobs: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Eyebrow
  const eyebrowOpacity = interpolate(frame, [0, fps * 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Cards appear staggered; all 6 shown by ~2s
  // Dim all after all 6 shown (~3s)
  const allShownFrame = fps * 2 + STAGGER * 5;
  const dimAll = frame > allShownFrame + fps * 5;

  // Layout: 3×2 grid centered, margins 80px, bottom 200px reserved
  // Available: 1920-160=1760 wide, 1080-280=800 tall (80 top + 200 bottom)
  // 3 cols × 540 = 1620, gaps = (1760-1620)/2 = 70 each side + 70 between
  const gridLeft = (1920 - 3 * CARD_W - 2 * 60) / 2;
  const gridTop = 140;

  return (
    <AbsoluteFill style={{ background: colors.gunmetal, fontFamily }}>
      {/* Red vignette */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at center, transparent 40%, #3A1010 120%)`,
          pointerEvents: "none",
        }}
      />

      {/* Eyebrow */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 80,
          opacity: eyebrowOpacity,
          fontSize: 16,
          fontWeight: 700,
          color: colors.oldRose,
          letterSpacing: 4,
          textTransform: "uppercase" as const,
        }}
      >
        Jobs Disappearing Now
      </div>

      {/* Grid */}
      {JOBS.map((job, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = gridLeft + col * (CARD_W + 60);
        const y = gridTop + row * (CARD_H + 24);
        const startFrame = fps * 0.5 + i * STAGGER;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
            }}
          >
            <JobCard
              job={job}
              frame={frame}
              fps={fps}
              startFrame={startFrame}
              dimmed={dimAll}
            />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
