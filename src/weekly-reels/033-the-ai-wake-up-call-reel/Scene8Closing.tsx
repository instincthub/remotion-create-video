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
  { num: 4, title: "Skills Your Child Needs" },
  { num: 5, title: "What You Can Do Tonight" },
  { num: 6, title: "What Schools Must Change" },
  { num: 7, title: "Age-by-Age Tools & Activities" },
];

export const Scene8Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headline = spring({ frame, fps, config: { damping: 200 } });
  const quote = spring({ frame: frame - Math.round(fps * 4), fps, config: { damping: 200 } });
  const listTitle = spring({ frame: frame - Math.round(fps * 8), fps, config: { damping: 200 } });

  const epProgresses = EPISODES.map((_, i) =>
    spring({
      frame: frame - Math.round(fps * (9 + i * 1.4)),
      fps,
      config: { damping: 200 },
    })
  );

  const logoProgress = spring({ frame: frame - Math.round(fps * 22), fps, config: { damping: 12, stiffness: 80 } });

  return (
    <AbsoluteFill style={{ background: colors.gunmetal, fontFamily }}>
      {/* Top line */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0, height: 4,
          background: `linear-gradient(to right, ${colors.darkCyra}, ${colors.caribbeanGreen})`,
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 80px 320px",
          gap: 32,
        }}
      >
        {/* Headline */}
        <div
          style={{
            opacity: interpolate(headline, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(headline, [0, 1], [24, 0])}px)`,
          }}
        >
          <div style={{ fontSize: 60, fontWeight: 900, color: colors.white, lineHeight: 1.15 }}>
            The AI{" "}
            <span style={{ color: colors.darkCyra }}>Wake-Up Call</span>
            {" "}is ringing.
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, color: colors.caribbeanGreen, marginTop: 12 }}>
            This series is your answer.
          </div>
        </div>

        {/* Quote */}
        <div
          style={{
            opacity: interpolate(quote, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(quote, [0, 1], [16, 0])}px)`,
            borderLeft: `4px solid ${colors.darkCyra}`,
            paddingLeft: 20,
          }}
        >
          <div style={{ fontSize: 20, color: `${colors.chineseSilver}90`, lineHeight: 1.6 }}>
            The families who understand what is coming will turn this disruption into{" "}
            <span style={{ color: colors.white, fontWeight: 700 }}>
              the greatest opportunity of their children's lives.
            </span>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: `${colors.rhythm}30` }} />

        {/* Episode list */}
        <div>
          <div
            style={{
              opacity: interpolate(listTitle, [0, 1], [0, 1]),
              fontSize: 13,
              fontWeight: 700,
              color: colors.rhythm,
              letterSpacing: 3,
              marginBottom: 16,
            }}
          >
            7-EPISODE SERIES
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {EPISODES.map((ep, i) => {
              const p = epProgresses[i];
              const opacity = interpolate(p, [0, 1], [0, 1]);
              const x = interpolate(p, [0, 1], [24, 0]);

              return (
                <div
                  key={i}
                  style={{
                    opacity,
                    transform: `translateX(${x}px)`,
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    padding: "12px 16px",
                    borderRadius: 10,
                    background: ep.current ? `${colors.darkCyra}20` : "transparent",
                    border: ep.current ? `1px solid ${colors.darkCyra}50` : "1px solid transparent",
                  }}
                >
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      background: ep.current ? colors.darkCyra : `${colors.rhythm}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
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
                      flex: 1,
                    }}
                  >
                    {ep.title}
                  </div>
                  {ep.current && (
                    <div
                      style={{
                        background: colors.darkCyra,
                        borderRadius: 4,
                        padding: "2px 8px",
                        fontSize: 10,
                        fontWeight: 700,
                        color: colors.white,
                        letterSpacing: 1,
                      }}
                    >
                      NOW
                    </div>
                  )}
                </div>
              );
            })}
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
            gap: 14,
            marginTop: 8,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: colors.darkCyra,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="26" height="26" viewBox="0 0 18 18" fill="none">
              <path d="M9 2L16 6V12L9 16L2 12V6L9 2Z" stroke={colors.white} strokeWidth="1.5" fill="none" />
              <circle cx="9" cy="9" r="2.5" fill={colors.caribbeanGreen} />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 900, color: colors.white }}>InstinctHub</div>
            <div style={{ fontSize: 13, color: colors.tiffanyBlue, letterSpacing: 1 }}>
              Preparing Families for What's Coming
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
