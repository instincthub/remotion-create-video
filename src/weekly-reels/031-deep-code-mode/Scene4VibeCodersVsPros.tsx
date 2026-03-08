import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene4VibeCodersVsPros: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 200 },
  });

  // Spotlight shifts right
  const spotlightShift = interpolate(frame, [100, 300], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const leftOpacity = interpolate(spotlightShift, [0, 1], [0.8, 0.25]);
  const rightOpacity = interpolate(spotlightShift, [0, 1], [0.4, 1]);

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
          paddingLeft: 30,
          paddingRight: 30,
          gap: 30,
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: interpolate(titleProgress, [0, 1], [0, 1]),
            lineHeight: 1.2,
          }}
        >
          Who Are <span style={{ color: colors.tiffanyBlue }}>You?</span>
        </div>

        {/* Two columns */}
        <div style={{ display: "flex", gap: 16, width: "100%", maxWidth: 650 }}>
          {/* Vibe Coder */}
          <div
            style={{
              flex: 1,
              padding: 20,
              borderRadius: 16,
              backgroundColor: `${colors.rhythm}06`,
              border: `1.5px solid ${colors.rhythm}20`,
              opacity: leftOpacity,
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <circle cx="30" cy="20" r="12" stroke={colors.rhythm} strokeWidth={2} fill={`${colors.rhythm}10`} />
                <path d="M14 52 Q14 36 30 36 Q46 36 46 52" stroke={colors.rhythm} strokeWidth={2} fill="none" />
                {/* Headphones */}
                <path d="M16 20 Q16 8 30 8 Q44 8 44 20" stroke={colors.rhythm} strokeWidth={2} fill="none" />
                <rect x="12" y="18" width="8" height="10" rx="3" fill={colors.rhythm} opacity={0.4} />
                <rect x="40" y="18" width="8" height="10" rx="3" fill={colors.rhythm} opacity={0.4} />
              </svg>
              <div style={{ fontSize: 20, fontWeight: 700, color: colors.rhythm, marginTop: 8 }}>
                Vibe Coder
              </div>
            </div>
            {["Accepts output as-is", "Ships without reviewing"].map((item) => (
              <div
                key={item}
                style={{
                  fontSize: 16,
                  color: colors.rhythm,
                  padding: "6px 0",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <line x1="4" y1="8" x2="12" y2="8" stroke={colors.rhythm} strokeWidth={2} strokeLinecap="round" />
                </svg>
                {item}
              </div>
            ))}
          </div>

          {/* Tech Professional */}
          <div
            style={{
              flex: 1,
              padding: 20,
              borderRadius: 16,
              backgroundColor: `${colors.tiffanyBlue}08`,
              border: `1.5px solid ${colors.tiffanyBlue}30`,
              opacity: rightOpacity,
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <circle cx="30" cy="20" r="12" stroke={colors.tiffanyBlue} strokeWidth={2} fill={`${colors.tiffanyBlue}10`} />
                <path d="M14 52 Q14 36 30 36 Q46 36 46 52" stroke={colors.tiffanyBlue} strokeWidth={2} fill="none" />
                {/* Magnifying glass */}
                <circle cx="42" cy="42" r="8" stroke={colors.tiffanyBlue} strokeWidth={2} fill={`${colors.tiffanyBlue}10`} />
                <line x1="48" y1="48" x2="54" y2="54" stroke={colors.tiffanyBlue} strokeWidth={2} strokeLinecap="round" />
              </svg>
              <div style={{ fontSize: 20, fontWeight: 700, color: colors.tiffanyBlue, marginTop: 8 }}>
                Tech Professional
              </div>
            </div>
            {["Owns the logic", "Verifies security", "Understands code"].map((item) => (
              <div
                key={item}
                style={{
                  fontSize: 16,
                  color: colors.tiffanyBlue,
                  padding: "6px 0",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8 L6 11 L13 4" stroke={colors.tiffanyBlue} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </div>
            ))}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
