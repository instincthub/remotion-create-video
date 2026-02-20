import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const defectCategories = [
  { label: "Non-Defective", color: "#00C5A2", pct: 87 },
  { label: "Crack", color: "#EA5F5E", pct: 3 },
  { label: "Misalignment", color: "#FBEB5B", pct: 2 },
  { label: "Surface Damage", color: "#0FABBC", pct: 2 },
  { label: "Thread Defect", color: "#BC658D", pct: 2 },
  { label: "Other Defects", color: "#415B90", pct: 4 },
];

export const Scene4ComputerVision: React.FC = () => {
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

  // Stats
  const statDelay = 2 * fps;
  const stat1Progress = spring({
    frame,
    fps,
    delay: statDelay,
    config: { damping: 10, stiffness: 70 },
  });
  const stat2Progress = spring({
    frame,
    fps,
    delay: statDelay + 15,
    config: { damping: 10, stiffness: 70 },
  });

  // Conveyor belt animation
  const beltOffset = interpolate(frame, [0, 25 * fps], [0, -3000]);

  // Classification scan line
  const scanPhase = (frame % (3 * fps)) / (3 * fps);
  const scanX = interpolate(scanPhase, [0, 0.3, 0.35, 1], [0, 1, 1, 1]);
  const scanOpacity = interpolate(scanPhase, [0, 0.1, 0.3, 0.4], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Classification label flash
  const classifyOpacity = interpolate(
    scanPhase,
    [0.3, 0.35, 0.9, 1],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // CNN label
  const cnnOpacity = interpolate(frame, [8 * fps, 9 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.darkNavy} 0%, #0d1f2d 100%)`,
        fontFamily,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 55,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontSize: 56,
            fontWeight: 700,
            color: colors.white,
          }}
        >
          Computer Vision in{" "}
          <span style={{ color: colors.caribbeanGreen }}>Manufacturing</span>
        </div>
      </div>

      {/* Stats badges — pushed down below title */}
      <div
        style={{
          position: "absolute",
          top: 180,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 60,
        }}
      >
        <div
          style={{
            opacity: interpolate(stat1Progress, [0, 1], [0, 1]),
            transform: `scale(${interpolate(stat1Progress, [0, 1], [0.8, 1])})`,
            background: `${colors.deepGreenCyanTurquoise}80`,
            borderRadius: 16,
            padding: "18px 44px",
            border: `2px solid ${colors.caribbeanGreen}40`,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 22, color: colors.chineseSilver }}>Speed</div>
          <div style={{ fontSize: 50, fontWeight: 700, color: colors.caribbeanGreen }}>
            0.14s
          </div>
        </div>
        <div
          style={{
            opacity: interpolate(stat2Progress, [0, 1], [0, 1]),
            transform: `scale(${interpolate(stat2Progress, [0, 1], [0.8, 1])})`,
            background: `${colors.deepGreenCyanTurquoise}80`,
            borderRadius: 16,
            padding: "18px 44px",
            border: `2px solid ${colors.caribbeanGreen}40`,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 22, color: colors.chineseSilver }}>Accuracy</div>
          <div style={{ fontSize: 50, fontWeight: 700, color: colors.caribbeanGreen }}>
            99%+
          </div>
        </div>
      </div>

      {/* Conveyor belt with weld nuts */}
      <div
        style={{
          position: "absolute",
          top: 380,
          left: 0,
          right: 0,
          height: 200,
          overflow: "hidden",
        }}
      >
        {/* Belt background */}
        <div
          style={{
            position: "absolute",
            top: 70,
            left: 0,
            right: 0,
            height: 60,
            background: `linear-gradient(90deg, ${colors.gunmetal} 0%, ${colors.darkSlateGray} 50%, ${colors.gunmetal} 100%)`,
            borderTop: `3px solid ${colors.chineseSilver}30`,
            borderBottom: `3px solid ${colors.chineseSilver}30`,
          }}
        />

        {/* Weld nut items on belt */}
        {Array.from({ length: 20 }).map((_, i) => {
          const baseX = i * 180 + beltOffset;
          const wrappedX = ((baseX % 3600) + 3600) % 3600 - 200;
          const isDefect = i % 7 === 3;

          return (
            <div
              key={`nut-${i}`}
              style={{
                position: "absolute",
                left: wrappedX,
                top: 50,
                width: 80,
                height: 80,
                borderRadius: 8,
                background: isDefect
                  ? `linear-gradient(135deg, ${colors.oldRose}40, ${colors.oldRose}20)`
                  : `linear-gradient(135deg, ${colors.chineseSilver}40, ${colors.chineseSilver}20)`,
                border: `2px solid ${isDefect ? colors.oldRose : colors.chineseSilver}60`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="50" height="50" viewBox="0 0 50 50">
                <polygon
                  points="25,2 46,14 46,36 25,48 4,36 4,14"
                  fill="none"
                  stroke={isDefect ? colors.oldRose : colors.chineseSilver}
                  strokeWidth={2}
                />
                <circle
                  cx={25}
                  cy={25}
                  r={10}
                  fill="none"
                  stroke={isDefect ? colors.oldRose : colors.chineseSilver}
                  strokeWidth={1.5}
                />
              </svg>
            </div>
          );
        })}

        {/* Scan line */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            width: 3,
            height: 200,
            background: colors.caribbeanGreen,
            opacity: scanOpacity,
            boxShadow: `0 0 20px ${colors.caribbeanGreen}, 0 0 40px ${colors.caribbeanGreen}50`,
            transform: `scaleY(${scanX})`,
            transformOrigin: "top",
          }}
        />

        {/* Classification label */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 8,
            transform: "translateX(-50%)",
            opacity: classifyOpacity,
            background: colors.caribbeanGreen,
            borderRadius: 8,
            padding: "6px 20px",
            fontSize: 16,
            fontWeight: 700,
            color: colors.white,
          }}
        >
          Non-Defective
        </div>
      </div>

      {/* Classification categories — 3x2 grid */}
      <div
        style={{
          position: "absolute",
          bottom: 260,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        {[0, 1].map((row) => (
          <div
            key={`row-${row}`}
            style={{
              display: "flex",
              gap: 20,
              justifyContent: "center",
            }}
          >
            {defectCategories.slice(row * 3, row * 3 + 3).map((cat, i) => {
              const catIndex = row * 3 + i;
              const catProgress = spring({
                frame,
                fps,
                delay: 4 * fps + catIndex * 8,
                config: { damping: 12, stiffness: 80 },
              });
              const catOpacity = interpolate(catProgress, [0, 1], [0, 1]);
              const catScale = interpolate(catProgress, [0, 1], [0.8, 1]);

              return (
                <div
                  key={`cat-${catIndex}`}
                  style={{
                    opacity: catOpacity,
                    transform: `scale(${catScale})`,
                    background: `${cat.color}20`,
                    border: `1px solid ${cat.color}50`,
                    borderRadius: 12,
                    padding: "14px 28px",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    minWidth: 220,
                  }}
                >
                  <div
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      background: cat.color,
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: 20, color: colors.white, fontWeight: 700 }}>
                    {cat.label}
                  </span>
                  <span style={{ fontSize: 18, color: colors.chineseSilver }}>
                    {cat.pct}%
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* CNN label — below the grid */}
      <div
        style={{
          position: "absolute",
          bottom: 215,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: cnnOpacity,
        }}
      >
        <span style={{ fontSize: 26, color: colors.rhythm }}>
          CNN Classification — On a Factory Floor
        </span>
      </div>
    </AbsoluteFill>
  );
};
