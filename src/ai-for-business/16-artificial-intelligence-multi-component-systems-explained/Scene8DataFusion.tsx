import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const streams = [
  {
    label: "Visual Data",
    description: "High fives, facial expressions, body language",
    color: colors.darkCyra,
    items: ["Celebrations", "Reactions", "Movement"],
  },
  {
    label: "Audio Data",
    description: "Crowd cheering, commentator excitement",
    color: colors.tiffanyBlue,
    items: ["Crowd Volume", "Commentary", "Whistles"],
  },
  {
    label: "Game Analytics",
    description: "Score changes, key plays, statistics",
    color: colors.caribbeanGreen,
    items: ["Score Events", "Key Plays", "Stats"],
  },
];

export const Scene8DataFusion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 8,
    config: { damping: 12, stiffness: 80 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  // Subtitle
  const subProgress = spring({
    frame,
    fps,
    delay: fps,
    config: { damping: 10, stiffness: 70 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);

  // Fusion result
  const fusionProgress = spring({
    frame,
    fps,
    delay: 8 * fps,
    config: { damping: 10, stiffness: 60 },
  });
  const fusionOpacity = interpolate(fusionProgress, [0, 1], [0, 1]);
  const fusionScale = interpolate(fusionProgress, [0, 1], [0.8, 1]);

  // Result stat
  const statProgress = spring({
    frame,
    fps,
    delay: 9.5 * fps,
    config: { damping: 10, stiffness: 60 },
  });
  const statOpacity = interpolate(statProgress, [0, 1], [0, 1]);

  // Stream card positions
  const streamTop = 240;
  const streamWidth = 460;
  const streamGap = 40;
  const totalWidth = streamWidth * 3 + streamGap * 2;
  const streamLeft = (1920 - totalWidth) / 2;

  // Fusion center
  const fusionCenterX = 960;
  const fusionCenterY = 720;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.darkNavy} 0%, ${colors.darkCharcoal} 50%, ${colors.deepGreenCyanTurquoise} 100%)`,
        fontFamily,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontSize: 52,
            fontWeight: 700,
            color: colors.white,
          }}
        >
          Parallel Data <span style={{ color: colors.corn }}>Fusion</span>
        </div>
        <div
          style={{
            opacity: subOpacity,
            fontSize: 26,
            color: `${colors.white}80`,
            marginTop: 12,
          }}
        >
          Automated Sports Highlights
        </div>
      </div>

      {/* Three parallel stream cards */}
      {streams.map((stream, i) => {
        const cardDelay = 2 * fps + i * 14;
        const cardProgress = spring({
          frame,
          fps,
          delay: cardDelay,
          config: { damping: 12, stiffness: 70 },
        });
        const cardOpacity = interpolate(cardProgress, [0, 1], [0, 1]);
        const cardY = interpolate(cardProgress, [0, 1], [30, 0]);

        const left = streamLeft + i * (streamWidth + streamGap);

        return (
          <div
            key={`stream-${i}`}
            style={{
              position: "absolute",
              left,
              top: streamTop,
              width: streamWidth,
              opacity: cardOpacity,
              transform: `translateY(${cardY}px)`,
              background: `${colors.white}08`,
              border: `1px solid ${stream.color}40`,
              borderRadius: 16,
              padding: "28px 24px",
            }}
          >
            {/* Stream header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  background: stream.color,
                  boxShadow: `0 0 12px ${stream.color}80`,
                }}
              />
              <div style={{ fontSize: 24, fontWeight: 700, color: colors.white }}>
                {stream.label}
              </div>
            </div>

            <div style={{ fontSize: 17, color: `${colors.white}80`, marginBottom: 16, lineHeight: 1.5 }}>
              {stream.description}
            </div>

            {/* Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {stream.items.map((item, j) => {
                const itemProgress = spring({
                  frame,
                  fps,
                  delay: cardDelay + fps + j * 8,
                  config: { damping: 12, stiffness: 90 },
                });
                const itemOpacity = interpolate(itemProgress, [0, 1], [0, 1]);

                // Animated signal bar
                const barWidth = interpolate(
                  Math.sin(frame * 0.05 + i * 2 + j * 1.5),
                  [-1, 1],
                  [40, 90]
                );

                return (
                  <div
                    key={`item-${j}`}
                    style={{
                      opacity: itemOpacity,
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "8px 12px",
                      background: `${stream.color}10`,
                      borderRadius: 8,
                    }}
                  >
                    <div style={{ fontSize: 15, fontWeight: 700, color: `${colors.white}cc`, flex: 1 }}>
                      {item}
                    </div>
                    {/* Animated bar */}
                    <div
                      style={{
                        width: 80,
                        height: 6,
                        background: `${stream.color}20`,
                        borderRadius: 3,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${barWidth}%`,
                          height: "100%",
                          background: stream.color,
                          borderRadius: 3,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Convergence arrows */}
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
      >
        {streams.map((stream, i) => {
          const arrowDelay = 6.5 * fps + i * 8;
          const arrowProgress = spring({
            frame,
            fps,
            delay: arrowDelay,
            config: { damping: 10, stiffness: 60 },
          });
          const arrowOpacity = interpolate(arrowProgress, [0, 1], [0, 0.7]);

          const startX = streamLeft + i * (streamWidth + streamGap) + streamWidth / 2;
          const startY = streamTop + 260;

          return (
            <line
              key={`arrow-${i}`}
              x1={startX}
              y1={startY}
              x2={fusionCenterX}
              y2={fusionCenterY - 40}
              stroke={stream.color}
              strokeWidth={2.5}
              opacity={arrowOpacity}
              strokeDasharray="8 4"
            />
          );
        })}
      </svg>

      {/* Fusion result badge */}
      <div
        style={{
          position: "absolute",
          left: fusionCenterX - 220,
          top: fusionCenterY - 40,
          opacity: fusionOpacity,
          transform: `scale(${fusionScale})`,
          width: 440,
          background: `linear-gradient(135deg, ${colors.darkCyra} 0%, ${colors.caribbeanGreen} 100%)`,
          borderRadius: 20,
          padding: "24px 32px",
          textAlign: "center",
          boxShadow: `0 8px 40px ${colors.caribbeanGreen}40`,
        }}
      >
        <div style={{ fontSize: 14, color: `${colors.white}90`, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 2 }}>
          Aggregated Output
        </div>
        <div style={{ fontSize: 28, fontWeight: 700, color: colors.white, marginTop: 8 }}>
          Highlight Reel Generated
        </div>
      </div>

      {/* Result stat */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: statOpacity,
        }}
      >
        <div style={{ fontSize: 24, color: `${colors.white}cc` }}>
          Over <span style={{ color: colors.corn, fontWeight: 700 }}>50% overlap</span> with
          official highlights.{" "}
          <span style={{ color: colors.caribbeanGreen, fontWeight: 700 }}>90% equal quality.</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
