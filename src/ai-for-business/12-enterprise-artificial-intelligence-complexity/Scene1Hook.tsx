import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Movie thumbnail grid (left side casual streaming UI)
const MovieGrid: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const gridOpacity = interpolate(frame, [0, fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const movieColors = [
    colors.tiffanyBlue,
    colors.caribbeanGreen,
    colors.viridianGreen,
    colors.chineseBlue,
    colors.metallicBlue,
    colors.rhythm,
    colors.darkCyra,
    colors.policeBlue,
    colors.deepGreenCyanTurquoise,
  ];

  return (
    <div
      style={{
        opacity: gridOpacity,
        position: "absolute",
        top: 0,
        left: 0,
        width: "50%",
        height: "100%",
        background: `linear-gradient(180deg, #1e293b 0%, #1a2332 100%)`,
        overflow: "hidden",
      }}
    >
      {/* Streaming header bar */}
      <div
        style={{
          padding: "24px 32px",
          display: "flex",
          alignItems: "center",
          gap: 24,
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32">
          <rect x="2" y="6" width="28" height="20" rx="3" fill="none" stroke={colors.tiffanyBlue} strokeWidth="2" />
          <polygon points="13,11 13,21 22,16" fill={colors.tiffanyBlue} />
        </svg>
        <div style={{ fontSize: 18, color: colors.chineseSilver, fontFamily, fontWeight: 700 }}>
          StreamFlix
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 14, color: `${colors.chineseSilver}80`, fontFamily }}>
          Trending Now
        </div>
      </div>

      {/* Movie thumbnail grid */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          padding: "0 32px",
        }}
      >
        {movieColors.map((color, i) => {
          const thumbProgress = spring({
            frame,
            fps,
            delay: 8 + i * 4,
            config: { damping: 14, stiffness: 120 },
          });
          const thumbScale = interpolate(thumbProgress, [0, 1], [0.7, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const thumbOpacity = interpolate(thumbProgress, [0, 1], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={`movie-${i}`}
              style={{
                width: 130,
                height: 180,
                borderRadius: 8,
                background: `linear-gradient(135deg, ${color}40 0%, ${color}20 100%)`,
                border: `1px solid ${color}30`,
                opacity: thumbOpacity,
                transform: `scale(${thumbScale})`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <svg width="36" height="36" viewBox="0 0 36 36">
                <polygon points="14,9 14,27 28,18" fill={`${color}90`} />
              </svg>
              <div
                style={{
                  width: "70%",
                  height: 6,
                  borderRadius: 3,
                  background: `${color}40`,
                }}
              />
              <div
                style={{
                  width: "50%",
                  height: 4,
                  borderRadius: 2,
                  background: `${color}25`,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Star ratings row */}
      <div
        style={{
          padding: "24px 32px",
          display: "flex",
          gap: 8,
          alignItems: "center",
        }}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <svg key={star} width="20" height="20" viewBox="0 0 20 20">
            <polygon
              points="10,2 12.5,7.5 18,8 14,12 15,18 10,15 5,18 6,12 2,8 7.5,7.5"
              fill={star <= 4 ? colors.corn : `${colors.corn}30`}
            />
          </svg>
        ))}
        <span style={{ fontSize: 14, color: colors.chineseSilver, fontFamily, marginLeft: 8 }}>
          "You might also like..."
        </span>
      </div>
    </div>
  );
};

// Banking dashboard (right side)
const BankingDashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideProgress = spring({
    frame,
    fps,
    delay: 2 * fps,
    config: { damping: 14, stiffness: 80 },
  });
  const slideX = interpolate(slideProgress, [0, 1], [960, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dashOpacity = interpolate(slideProgress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const rows = [
    { label: "Applicant", value: "John D.", risk: "Medium" },
    { label: "Income", value: "$72,000", risk: "Low" },
    { label: "Credit Score", value: "640", risk: "High" },
    { label: "Debt Ratio", value: "38%", risk: "High" },
  ];

  return (
    <div
      style={{
        opacity: dashOpacity,
        transform: `translateX(${slideX}px)`,
        position: "absolute",
        top: 0,
        right: 0,
        width: "50%",
        height: "100%",
        background: `linear-gradient(180deg, ${colors.darkNavy} 0%, #0a1020 100%)`,
        overflow: "hidden",
        borderLeft: `2px solid ${colors.darkCyra}40`,
      }}
    >
      {/* Dashboard header */}
      <div
        style={{
          padding: "24px 32px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          borderBottom: `1px solid ${colors.darkCyra}30`,
        }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28">
          <rect x="3" y="8" width="22" height="16" rx="2" fill="none" stroke={colors.darkCyra} strokeWidth="2" />
          <rect x="8" y="4" width="12" height="6" rx="1" fill="none" stroke={colors.darkCyra} strokeWidth="1.5" />
          <line x1="3" y1="14" x2="25" y2="14" stroke={colors.darkCyra} strokeWidth="1" />
        </svg>
        <div style={{ fontSize: 18, color: colors.white, fontFamily, fontWeight: 700 }}>
          Loan Approval System
        </div>
        <div style={{ flex: 1 }} />
        <div
          style={{
            fontSize: 12,
            color: colors.oldRose,
            fontFamily,
            background: `${colors.oldRose}20`,
            padding: "4px 12px",
            borderRadius: 12,
          }}
        >
          PENDING REVIEW
        </div>
      </div>

      {/* Data table */}
      <div style={{ padding: "20px 32px" }}>
        {rows.map((row, i) => {
          const rowProgress = spring({
            frame,
            fps,
            delay: 2.5 * fps + i * 10,
            config: { damping: 12, stiffness: 100 },
          });
          const rowOpacity = interpolate(rowProgress, [0, 1], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={row.label}
              style={{
                opacity: rowOpacity,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 0",
                borderBottom: `1px solid ${colors.darkSlateGray}40`,
              }}
            >
              <span style={{ fontSize: 16, color: colors.chineseSilver, fontFamily }}>
                {row.label}
              </span>
              <span style={{ fontSize: 16, color: colors.white, fontFamily, fontWeight: 700 }}>
                {row.value}
              </span>
              <span
                style={{
                  fontSize: 12,
                  fontFamily,
                  padding: "3px 10px",
                  borderRadius: 8,
                  color: row.risk === "High" ? colors.oldRose : row.risk === "Medium" ? colors.corn : colors.caribbeanGreen,
                  background:
                    row.risk === "High"
                      ? `${colors.oldRose}20`
                      : row.risk === "Medium"
                        ? `${colors.corn}20`
                        : `${colors.caribbeanGreen}20`,
                }}
              >
                {row.risk}
              </span>
            </div>
          );
        })}
      </div>

      {/* Decision box */}
      <div
        style={{
          margin: "20px 32px",
          padding: "16px 24px",
          background: `${colors.darkCyra}15`,
          border: `1px solid ${colors.darkCyra}40`,
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="none" stroke={colors.oldRose} strokeWidth="2" />
          <line x1="12" y1="7" x2="12" y2="13" stroke={colors.oldRose} strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="17" r="1.5" fill={colors.oldRose} />
        </svg>
        <span style={{ fontSize: 14, color: colors.chineseSilver, fontFamily }}>
          Decision requires compliance review
        </span>
      </div>
    </div>
  );
};

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow zoom
  const zoom = interpolate(frame, [0, 12 * fps], [1, 1.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Main text appears after both sides visible
  const textDelay = 4 * fps;
  const textProgress = spring({
    frame,
    fps,
    delay: textDelay,
    config: { damping: 10, stiffness: 80 },
  });
  const textOpacity = interpolate(textProgress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textScale = interpolate(textProgress, [0, 1], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textY = interpolate(textProgress, [0, 1], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Overlay darkens to make text readable
  const overlayOpacity = interpolate(frame, [3.5 * fps, 5 * fps], [0, 0.65], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: colors.darkNavy,
        fontFamily,
      }}
    >
      <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
        <MovieGrid />
        <BankingDashboard />
      </AbsoluteFill>

      {/* Dark overlay for text readability */}
      <AbsoluteFill
        style={{
          background: `${colors.darkNavy}`,
          opacity: overlayOpacity,
        }}
      />

      {/* Main text overlay */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          paddingBottom: 200,
        }}
      >
        <div
          style={{
            opacity: textOpacity,
            transform: `scale(${textScale}) translateY(${textY}px)`,
            fontSize: 58,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            lineHeight: 1.4,
            maxWidth: 1200,
            padding: "0 60px",
          }}
        >
          Recommending movies is{" "}
          <span style={{ color: colors.caribbeanGreen }}>easy</span>.
          <br />
          Approving loans is{" "}
          <span style={{ color: colors.oldRose }}>not</span>.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
