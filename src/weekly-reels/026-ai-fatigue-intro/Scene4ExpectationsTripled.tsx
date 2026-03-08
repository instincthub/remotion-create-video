import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene4ExpectationsTripled: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 200 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  // Bar animations
  const bar1Width = spring({
    frame,
    fps,
    delay: 30,
    config: { damping: 20, stiffness: 60 },
  });

  const bar2Width = spring({
    frame,
    fps,
    delay: 90,
    config: { damping: 20, stiffness: 60 },
  });

  const bar3Width = spring({
    frame,
    fps,
    delay: 150,
    config: { damping: 20, stiffness: 60 },
  });

  // Timeline text strikethrough
  const strikeItems = [
    { label: "Weeks", delay: 300, color: colors.chineseSilver },
    { label: "Days", delay: 400, color: colors.corn },
    { label: "Hours", delay: 500, color: colors.oldRose },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${colors.gunmetal}, ${colors.darkSlateGray})`,
        fontFamily,
      }}
    >
      <AbsoluteFill style={{ opacity: 0.03 }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`h-${i}`}
            style={{
              position: "absolute",
              top: i * 96,
              left: 0,
              width: "100%",
              height: 1,
              backgroundColor: colors.tiffanyBlue,
            }}
          />
        ))}
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 300,
          paddingLeft: 50,
          paddingRight: 50,
          gap: 40,
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            lineHeight: 1.2,
          }}
        >
          Expectations
          <br />
          <span style={{ color: colors.corn }}>Tripled</span>
        </div>

        {/* Bars */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
            width: "100%",
            maxWidth: 700,
          }}
        >
          {/* Before AI */}
          <div>
            <div
              style={{
                fontSize: 18,
                color: colors.chineseSilver,
                marginBottom: 8,
                fontWeight: 400,
              }}
            >
              Before AI
            </div>
            <div
              style={{
                height: 40,
                borderRadius: 8,
                backgroundColor: `${colors.caribbeanGreen}15`,
                border: `1px solid ${colors.caribbeanGreen}30`,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${interpolate(bar1Width, [0, 1], [0, 35])}%`,
                  height: "100%",
                  borderRadius: 8,
                  background: `linear-gradient(90deg, ${colors.caribbeanGreen}, ${colors.viridianGreen})`,
                }}
              />
            </div>
          </div>

          {/* With AI - Expectations */}
          <div>
            <div
              style={{
                fontSize: 18,
                color: colors.chineseSilver,
                marginBottom: 8,
                fontWeight: 400,
              }}
            >
              With AI — Expectations
            </div>
            <div
              style={{
                height: 40,
                borderRadius: 8,
                backgroundColor: `${colors.corn}15`,
                border: `1px solid ${colors.corn}30`,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${interpolate(bar2Width, [0, 1], [0, 85])}%`,
                  height: "100%",
                  borderRadius: 8,
                  background: `linear-gradient(90deg, ${colors.corn}, ${colors.oldRose})`,
                }}
              />
            </div>
          </div>

          {/* Reality */}
          <div>
            <div
              style={{
                fontSize: 18,
                color: colors.chineseSilver,
                marginBottom: 8,
                fontWeight: 400,
              }}
            >
              Reality — Overwhelmed
            </div>
            <div
              style={{
                height: 40,
                borderRadius: 8,
                backgroundColor: `${colors.oldRose}15`,
                border: `1px solid ${colors.oldRose}30`,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${interpolate(bar3Width, [0, 1], [0, 100])}%`,
                  height: "100%",
                  borderRadius: 8,
                  background: `linear-gradient(90deg, ${colors.oldRose}, ${colors.maximumRedPurple})`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Timeline: Weeks → Days → Hours */}
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {strikeItems.map((item, i) => {
            const itemEntrance = spring({
              frame: Math.max(0, frame - item.delay),
              fps,
              config: { damping: 200 },
            });
            const isStruck = i < strikeItems.length - 1 && frame > item.delay + 30;

            return (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: item.color,
                    opacity: interpolate(itemEntrance, [0, 1], [0, 1]),
                    textDecoration: isStruck ? "line-through" : "none",
                    textDecorationColor: colors.oldRose,
                    textDecorationThickness: 3,
                  }}
                >
                  {item.label}
                </div>
                {i < strikeItems.length - 1 && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ opacity: interpolate(itemEntrance, [0, 1], [0, 0.5]) }}>
                    <path d="M9 6 L15 12 L9 18" stroke={colors.chineseSilver} strokeWidth={2} strokeLinecap="round" />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
