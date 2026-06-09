import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, stageColors } from "./colors";
import { dmMono, dmSans, nunito } from "./fonts";
import { SceneBackground } from "./SceneBackground";

const STAGES = [
  {
    title: "Develop",
    color: stageColors.develop,
    sub: "Train on history",
  },
  {
    title: "Deploy",
    color: stageColors.deploy,
    sub: "Serve real users",
  },
  {
    title: "Sustain",
    color: stageColors.sustain,
    sub: "Monitor & alert",
  },
] as const;

export const Scene5Loop: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const eyebrowProgress = spring({
    frame,
    fps,
    delay: 2,
    config: { damping: 18, stiffness: 90 },
  });

  const titleProgress = spring({
    frame: frame - 12,
    fps,
    config: { damping: 18, stiffness: 80 },
  });

  const closerProgress = spring({
    frame: frame - 64,
    fps,
    config: { damping: 20, stiffness: 90 },
  });

  // Subtle arrow pulse
  const pulse = (Math.sin(frame * 0.12) + 1) / 2; // 0..1

  return (
    <AbsoluteFill
      style={{ background: colors.surfaceDarker, fontFamily: nunito }}
    >
      <SceneBackground
        glow={colors.darkCyra}
        patternColor={colors.tiffanyBlue}
        glowPosition="50% 50%"
      />

      <AbsoluteFill
        style={{
          padding: "120px 80px 240px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            fontFamily: dmMono,
            fontSize: 22,
            fontWeight: 500,
            color: colors.tiffanyBlue,
            letterSpacing: 4,
            opacity: interpolate(eyebrowProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(eyebrowProgress, [0, 1], [12, 0])}px)`,
            padding: "10px 22px",
            border: `1.5px solid ${colors.tiffanyBlue}60`,
            borderRadius: 999,
            backgroundColor: `${colors.darkCyra}18`,
          }}
        >
          A CONTINUOUS LOOP
        </div>

        {/* Title */}
        <div
          style={{
            fontFamily: nunito,
            fontSize: 72,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            lineHeight: 1.1,
            maxWidth: 920,
            opacity: interpolate(titleProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(titleProgress, [0, 1], [20, 0])}px)`,
          }}
        >
          AI behaviour is bound
          <br />
          to the data flowing
          <br />
          <span style={{ color: colors.tiffanyBlue }}>through it.</span>
        </div>

        {/* Stage stack with connecting arrows */}
        <div
          style={{
            marginTop: 24,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            width: "100%",
          }}
        >
          {STAGES.map((s, i) => {
            const rowProgress = spring({
              frame: frame - (28 + i * 14),
              fps,
              config: { damping: 18, stiffness: 90 },
            });
            const isLast = i === STAGES.length - 1;

            return (
              <div
                key={s.title}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  width: "100%",
                  opacity: interpolate(rowProgress, [0, 1], [0, 1]),
                  transform: `translateY(${interpolate(rowProgress, [0, 1], [22, 0])}px)`,
                }}
              >
                <div
                  style={{
                    width: 760,
                    backgroundColor: s.color,
                    borderRadius: 22,
                    padding: "22px 28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    boxShadow: `0 18px 50px ${s.color}40`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: nunito,
                      fontSize: 50,
                      fontWeight: 700,
                      color: colors.white,
                      letterSpacing: -0.5,
                    }}
                  >
                    {s.title}
                  </div>
                  <div
                    style={{
                      fontFamily: dmSans,
                      fontSize: 24,
                      fontWeight: 500,
                      color: `${colors.white}dd`,
                      letterSpacing: 0.5,
                    }}
                  >
                    {s.sub}
                  </div>
                </div>

                {!isLast && (
                  <div
                    style={{
                      fontFamily: dmMono,
                      fontSize: 36,
                      fontWeight: 500,
                      color: colors.tiffanyBlue,
                      opacity: 0.55 + pulse * 0.4,
                      lineHeight: 1,
                    }}
                  >
                    ↓
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Closing line */}
        <div
          style={{
            fontFamily: dmSans,
            fontSize: 30,
            fontWeight: 400,
            color: colors.chineseSilver,
            textAlign: "center",
            lineHeight: 1.35,
            maxWidth: 880,
            marginTop: 16,
            opacity: interpolate(closerProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(closerProgress, [0, 1], [16, 0])}px)`,
          }}
        >
          Build the model. Ship it. Watch it.
          <br />
          <span style={{ color: colors.white, fontWeight: 600 }}>
            Then do it again.
          </span>
        </div>
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          bottom: 220,
          right: 80,
          fontFamily: dmMono,
          fontSize: 15,
          fontWeight: 500,
          color: `${colors.white}40`,
          letterSpacing: 2,
        }}
      >
        ENTERPRISE AI · CH. 2
      </div>
    </AbsoluteFill>
  );
};
