import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const LockIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="10" y="20" width="28" height="22" rx="4" stroke={color} strokeWidth="2.5" />
    <path
      d="M16 20V14C16 9.58 19.58 6 24 6C28.42 6 32 9.58 32 14V20"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <circle cx="24" cy="31" r="3" fill={color} />
  </svg>
);

const GlobeIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="18" stroke={color} strokeWidth="2.5" />
    <ellipse cx="24" cy="24" rx="10" ry="18" stroke={color} strokeWidth="1.5" />
    <path d="M6 24H42" stroke={color} strokeWidth="1.5" />
    <path d="M8 15H40" stroke={color} strokeWidth="1" />
    <path d="M8 33H40" stroke={color} strokeWidth="1" />
  </svg>
);

export const Scene3Source: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Blueprint grid
  const gridOpacity = interpolate(frame, [0, fps], [0, 0.06], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 8,
    config: { damping: 12, stiffness: 80 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  // Left panel (Internal)
  const leftProgress = spring({
    frame,
    fps,
    delay: fps,
    config: { damping: 12, stiffness: 70 },
  });
  const leftOpacity = interpolate(leftProgress, [0, 1], [0, 1]);
  const leftX = interpolate(leftProgress, [0, 1], [-60, 0]);

  // Right panel (Public)
  const rightProgress = spring({
    frame,
    fps,
    delay: 1.5 * fps,
    config: { damping: 12, stiffness: 70 },
  });
  const rightOpacity = interpolate(rightProgress, [0, 1], [0, 1]);
  const rightX = interpolate(rightProgress, [0, 1], [60, 0]);

  // Bottom note
  const noteProgress = spring({
    frame,
    fps,
    delay: 5 * fps,
    config: { damping: 10, stiffness: 60 },
  });
  const noteOpacity = interpolate(noteProgress, [0, 1], [0, 1]);
  const noteY = interpolate(noteProgress, [0, 1], [20, 0]);

  // Impact items stagger
  const impactItems = ["Security", "Access Control", "Compliance"];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.white,
        fontFamily,
      }}
    >
      {/* Blueprint grid */}
      <AbsoluteFill
        style={{
          opacity: gridOpacity,
          backgroundImage: `
            linear-gradient(${colors.darkCyra}12 1px, transparent 1px),
            linear-gradient(90deg, ${colors.darkCyra}12 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Section badge + title */}
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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: colors.deepGreenCyanTurquoise,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 700,
              color: colors.white,
            }}
          >
            A
          </div>
          <div style={{ fontSize: 50, fontWeight: 700, color: colors.darkSlateGray }}>
            Source
          </div>
          <div style={{ fontSize: 26, color: colors.rhythm }}>
            Internal vs Public Data
          </div>
        </div>
      </div>

      {/* Split panels */}
      <div
        style={{
          position: "absolute",
          top: 280,
          left: 80,
          right: 80,
          display: "flex",
          gap: 40,
          justifyContent: "center",
        }}
      >
        {/* Internal panel */}
        <div
          style={{
            opacity: leftOpacity,
            transform: `translateX(${leftX}px)`,
            flex: 1,
            maxWidth: 700,
            background: `${colors.darkCyra}08`,
            border: `2px solid ${colors.darkCyra}30`,
            borderRadius: 20,
            padding: 36,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <LockIcon color={colors.darkCyra} />
            <div style={{ fontSize: 30, fontWeight: 700, color: colors.darkCyra }}>
              Proprietary
            </div>
          </div>
          {["Business transactions", "Personnel records", "Internal emails", "Knowledge bases"].map(
            (item, i) => {
              const itemProgress = spring({
                frame,
                fps,
                delay: 2 * fps + i * 10,
                config: { damping: 12, stiffness: 70 },
              });
              return (
                <div
                  key={item}
                  style={{
                    opacity: interpolate(itemProgress, [0, 1], [0, 1]),
                    transform: `translateX(${interpolate(itemProgress, [0, 1], [20, 0])}px)`,
                    fontSize: 22,
                    color: colors.gunmetal,
                    padding: "10px 0",
                    borderBottom: i < 3 ? `1px solid ${colors.chineseSilver}40` : "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      background: colors.darkCyra,
                      flexShrink: 0,
                    }}
                  />
                  {item}
                </div>
              );
            }
          )}
        </div>

        {/* Public panel */}
        <div
          style={{
            opacity: rightOpacity,
            transform: `translateX(${rightX}px)`,
            flex: 1,
            maxWidth: 700,
            background: `${colors.caribbeanGreen}08`,
            border: `2px solid ${colors.caribbeanGreen}30`,
            borderRadius: 20,
            padding: 36,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <GlobeIcon color={colors.caribbeanGreen} />
            <div style={{ fontSize: 30, fontWeight: 700, color: colors.caribbeanGreen }}>
              Public
            </div>
          </div>
          {["Wikipedia, Data.gov", "News and social media", "Research papers", "Public APIs"].map(
            (item, i) => {
              const itemProgress = spring({
                frame,
                fps,
                delay: 2.5 * fps + i * 10,
                config: { damping: 12, stiffness: 70 },
              });
              return (
                <div
                  key={item}
                  style={{
                    opacity: interpolate(itemProgress, [0, 1], [0, 1]),
                    transform: `translateX(${interpolate(itemProgress, [0, 1], [20, 0])}px)`,
                    fontSize: 22,
                    color: colors.gunmetal,
                    padding: "10px 0",
                    borderBottom: i < 3 ? `1px solid ${colors.chineseSilver}40` : "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      background: colors.caribbeanGreen,
                      flexShrink: 0,
                    }}
                  />
                  {item}
                </div>
              );
            }
          )}
        </div>
      </div>

      {/* Bottom impact note */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 24,
          opacity: noteOpacity,
          transform: `translateY(${noteY}px)`,
        }}
      >
        {impactItems.map((item, i) => {
          const tagProgress = spring({
            frame,
            fps,
            delay: 6 * fps + i * 10,
            config: { damping: 12, stiffness: 70 },
          });
          const tagOpacity = interpolate(tagProgress, [0, 1], [0, 1]);

          return (
            <div
              key={item}
              style={{
                opacity: tagOpacity,
                padding: "12px 28px",
                borderRadius: 30,
                background: `${colors.oldRose}12`,
                border: `1px solid ${colors.oldRose}40`,
                fontSize: 20,
                fontWeight: 700,
                color: colors.oldRose,
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
