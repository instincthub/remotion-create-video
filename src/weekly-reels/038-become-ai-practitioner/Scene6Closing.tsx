import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { nunito, dmMono } from "./fonts";

export const Scene6Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const questionProgress = spring({
    frame,
    fps,
    delay: 3,
    config: { damping: 18, stiffness: 90 },
  });

  const answersProgress = spring({
    frame: frame - 30,
    fps,
    config: { damping: 18, stiffness: 80 },
  });

  const ctaProgress = spring({
    frame: frame - 90,
    fps,
    config: { damping: 16, stiffness: 80 },
  });

  const tagProgress = spring({
    frame: frame - 130,
    fps,
    config: { damping: 18, stiffness: 90 },
  });

  return (
    <AbsoluteFill
      style={{
        background: colors.brandDark,
        fontFamily: nunito,
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${colors.tealDeeper}55 0%, transparent 60%)`,
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 80px 340px",
          gap: 28,
          textAlign: "center",
        }}
      >
        {/* Question */}
        <div
          style={{
            fontFamily: nunito,
            fontSize: 60,
            fontWeight: 700,
            color: colors.white,
            lineHeight: 1.15,
            opacity: interpolate(questionProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(questionProgress, [0, 1], [24, 0])}px)`,
          }}
        >
          Which one are
          <br />
          you right now?
        </div>

        {/* Two answer pills */}
        <div
          style={{
            display: "flex",
            gap: 16,
            opacity: interpolate(answersProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(answersProgress, [0, 1], [16, 0])}px)`,
            marginTop: 12,
          }}
        >
          <div
            style={{
              padding: "18px 32px",
              backgroundColor: `${colors.tealDeeper}40`,
              border: `1.5px solid ${colors.tealLight}`,
              borderRadius: 999,
              fontFamily: nunito,
              fontSize: 32,
              fontWeight: 700,
              color: colors.tealLight,
            }}
          >
            Consumer
          </div>
          <div
            style={{
              padding: "18px 32px",
              backgroundColor: `${colors.tealDeeper}40`,
              border: `1.5px solid ${colors.tealLight}`,
              borderRadius: 999,
              fontFamily: nunito,
              fontSize: 32,
              fontWeight: 700,
              color: colors.tealLight,
            }}
          >
            Explorer
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            fontFamily: nunito,
            fontSize: 42,
            fontWeight: 700,
            color: colors.white,
            lineHeight: 1.2,
            marginTop: 34,
            opacity: interpolate(ctaProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(ctaProgress, [0, 1], [20, 0])}px)`,
          }}
        >
          Follow for the{" "}
          <span style={{ color: colors.tealLight }}>next 3 paths.</span>
        </div>

        {/* Coming up tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginTop: 18,
            padding: "14px 24px",
            border: `1.5px dashed ${colors.tealLight}80`,
            borderRadius: 14,
            opacity: interpolate(tagProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(tagProgress, [0, 1], [16, 0])}px)`,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: colors.tealLight,
              boxShadow: `0 0 12px ${colors.tealLight}`,
            }}
          />
          <div
            style={{
              fontFamily: dmMono,
              fontSize: 22,
              fontWeight: 500,
              color: colors.tealLight,
              letterSpacing: 3,
            }}
          >
            03 · 04 · 05 COMING
          </div>
        </div>
      </AbsoluteFill>

      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          bottom: 320,
          right: 80,
          fontFamily: dmMono,
          fontSize: 15,
          fontWeight: 500,
          color: `${colors.white}40`,
          letterSpacing: 2,
        }}
      >
        AI PLAYBOOK
      </div>
    </AbsoluteFill>
  );
};
