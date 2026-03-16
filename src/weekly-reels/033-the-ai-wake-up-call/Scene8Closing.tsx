import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const EPISODES = [
  { num: 1, title: "The Wake-Up Call", current: true },
  { num: 2, title: "Which Jobs Are Disappearing" },
  { num: 3, title: "Which Jobs Are Being Created" },
  { num: 4, title: "Skills Your Child Actually Needs" },
  { num: 5, title: "What You Can Do Tonight" },
  { num: 6, title: "What Schools Must Change" },
  { num: 7, title: "Age-by-Age Tools & Activities" },
];

export const Scene8Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headlineProgress = spring({ frame, fps, config: { damping: 200 } });

  const quoteProgress = spring({
    frame: frame - Math.round(fps * 4),
    fps,
    config: { damping: 200 },
  });

  const listTitleProgress = spring({
    frame: frame - Math.round(fps * 8),
    fps,
    config: { damping: 200 },
  });

  const episodeProgresses = EPISODES.map((_, i) =>
    spring({
      frame: frame - Math.round(fps * (9.5 + i * 1.4)),
      fps,
      config: { damping: 200 },
    })
  );

  const logoProgress = spring({
    frame: frame - Math.round(fps * 22),
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  return (
    <AbsoluteFill style={{ background: colors.gunmetal, fontFamily }}>
      {/* Subtle top line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(to right, ${colors.darkCyra}, ${colors.caribbeanGreen})`,
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "80px 80px 220px",
          gap: 100,
          alignItems: "center",
        }}
      >
        {/* Left column: headline + quote + logo */}
        <div
          style={{
            flex: "0 0 580px",
            display: "flex",
            flexDirection: "column",
            gap: 36,
          }}
        >
          {/* Headline */}
          <div
            style={{
              opacity: interpolate(headlineProgress, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(headlineProgress, [0, 1], [24, 0])}px)`,
            }}
          >
            <div
              style={{
                fontSize: 56,
                fontWeight: 900,
                color: colors.white,
                lineHeight: 1.2,
              }}
            >
              The AI{" "}
              <span style={{ color: colors.darkCyra }}>Wake-Up Call</span>
              <br />
              is ringing.
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: colors.caribbeanGreen,
                marginTop: 16,
              }}
            >
              This series is your answer.
            </div>
          </div>

          {/* Quote */}
          <div
            style={{
              opacity: interpolate(quoteProgress, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(quoteProgress, [0, 1], [16, 0])}px)`,
              borderLeft: `4px solid ${colors.darkCyra}`,
              paddingLeft: 20,
            }}
          >
            <div
              style={{
                fontSize: 20,
                color: `${colors.chineseSilver}90`,
                lineHeight: 1.7,
              }}
            >
              The families who understand what is coming —{" "}
              <span style={{ color: colors.white, fontWeight: 700 }}>
                those are the families who will turn this disruption into the greatest opportunity of their children's lives.
              </span>
            </div>
          </div>

          {/* Logo */}
          <div
            style={{
              opacity: interpolate(logoProgress, [0, 1], [0, 1]),
              transform: `scale(${interpolate(logoProgress, [0, 0.6, 1], [0.8, 1.05, 1])})`,
              transformOrigin: "left center",
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginTop: 8,
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 12,
                background: colors.darkCyra,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="30" height="30" viewBox="0 0 18 18" fill="none">
                <path d="M9 2L16 6V12L9 16L2 12V6L9 2Z" stroke={colors.white} strokeWidth="1.5" fill="none" />
                <circle cx="9" cy="9" r="2.5" fill={colors.caribbeanGreen} />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 900, color: colors.white }}>
                InstinctHub
              </div>
              <div style={{ fontSize: 14, color: colors.tiffanyBlue, letterSpacing: 1, marginTop: 2 }}>
                Preparing Families for What's Coming
              </div>
            </div>
          </div>
        </div>

        {/* Right column: episode list */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              opacity: interpolate(listTitleProgress, [0, 1], [0, 1]),
              fontSize: 13,
              fontWeight: 700,
              color: colors.rhythm,
              letterSpacing: 3,
              marginBottom: 24,
            }}
          >
            7-EPISODE SERIES
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {EPISODES.map((ep, i) => {
              const opacity = interpolate(episodeProgresses[i], [0, 1], [0, 1]);
              const x = interpolate(episodeProgresses[i], [0, 1], [24, 0]);

              return (
                <div
                  key={i}
                  style={{
                    opacity,
                    transform: `translateX(${x}px)`,
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    padding: "14px 16px",
                    borderRadius: 8,
                    background: ep.current ? `${colors.darkCyra}20` : "transparent",
                    border: ep.current ? `1px solid ${colors.darkCyra}50` : "1px solid transparent",
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: ep.current ? colors.darkCyra : `${colors.rhythm}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      fontWeight: 700,
                      color: colors.white,
                      flexShrink: 0,
                    }}
                  >
                    {ep.num}
                  </div>
                  <div
                    style={{
                      fontSize: ep.current ? 20 : 17,
                      fontWeight: ep.current ? 700 : 400,
                      color: ep.current ? colors.white : `${colors.chineseSilver}70`,
                    }}
                  >
                    {ep.title}
                  </div>
                  {ep.current && (
                    <div
                      style={{
                        marginLeft: "auto",
                        background: colors.darkCyra,
                        borderRadius: 4,
                        padding: "3px 10px",
                        fontSize: 11,
                        fontWeight: 700,
                        color: colors.white,
                        letterSpacing: 1,
                      }}
                    >
                      THIS EPISODE
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
