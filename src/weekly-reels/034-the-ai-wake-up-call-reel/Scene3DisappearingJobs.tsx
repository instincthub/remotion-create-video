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
  { title: "Paralegal", stat: "72% tasks automatable" },
  { title: "Data Entry Clerk", stat: "89% at risk" },
  { title: "Junior Accountant", stat: "80% replaced by 2027" },
  { title: "Radiologist (screen)", stat: "AI outperforms humans" },
  { title: "Customer Support Agent", stat: "60% jobs eliminated" },
  { title: "Copywriter / Translator", stat: "55% market shrinkage" },
];

export const Scene3DisappearingJobs: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const eyebrow = spring({ frame, fps, config: { damping: 200 } });

  const cardProgresses = JOBS.map((_, i) =>
    spring({
      frame: frame - Math.round(fps * (1 + i * 0.5)),
      fps,
      config: { damping: 200 },
    })
  );

  // After all cards appear (~4.5s), dim them
  const dimProgress = spring({
    frame: frame - Math.round(fps * 6),
    fps,
    config: { damping: 200 },
  });
  const cardsDim = interpolate(dimProgress, [0, 1], [1, 0.5]);

  // Red vignette
  const vignetteOpacity = 0.12 + Math.sin(frame * 0.02) * 0.04;

  return (
    <AbsoluteFill style={{ background: colors.gunmetal, fontFamily }}>
      {/* Faint red vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 50%, transparent 50%, ${colors.oldRose}40 100%)`,
          opacity: vignetteOpacity,
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
            color: colors.oldRose,
            letterSpacing: 4,
            marginBottom: 32,
          }}
        >
          JOBS AT HIGHEST RISK
        </div>

        {/* Job cards — stacked list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, opacity: cardsDim }}>
          {JOBS.map((job, i) => {
            const p = cardProgresses[i];
            const xIn = interpolate(p, [0, 1], [-80, 0]);
            const opacity = interpolate(p, [0, 1], [0, 1]);

            return (
              <div
                key={i}
                style={{
                  opacity,
                  transform: `translateX(${xIn}px)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  height: 80,
                  background: `${colors.darkSlateGray}CC`,
                  borderRadius: 12,
                  padding: "0 28px",
                  borderLeft: `4px solid ${colors.oldRose}`,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Strikethrough line */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: 28,
                    right: 28,
                    height: 2,
                    background: `${colors.oldRose}80`,
                    transform: "translateY(-50%)",
                    width: interpolate(p, [0.7, 1], [0, 1], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }) * (920 - 56),
                  }}
                />
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: colors.white,
                  }}
                >
                  {job.title}
                </div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: colors.oldRose,
                    textAlign: "right",
                    maxWidth: 320,
                  }}
                >
                  {job.stat}
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
