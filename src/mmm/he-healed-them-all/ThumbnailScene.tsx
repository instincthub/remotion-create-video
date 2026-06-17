import { AbsoluteFill } from "remotion";
import { colors } from "./colors";
import { playfair, inter } from "./fonts";

/**
 * Branded thumbnail. Held as a static 1-second card at the very start of the
 * composition (so YouTube can auto-pick it) and ALSO registered as a 1-frame
 * still for download. Deliberately STATIC — every frame is identical. Bold
 * type + a single strong graphic (open Bible under a cross with healing rays),
 * readable at small sizes.
 */
export const ThumbnailScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.brandDark }}>
      {/* deep blue glow */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 72% 46%, ${colors.brandBlue}55 0%, transparent 60%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `linear-gradient(135deg, ${colors.brandDark} 0%, ${colors.blueDeep}AA 100%)`,
          opacity: 0.5,
        }}
      />
      {/* faint cross grid */}
      <AbsoluteFill style={{ opacity: 0.07 }}>
        <svg width="1920" height="1080">
          <defs>
            <pattern id="cross-thumb" x="0" y="0" width="62" height="62" patternUnits="userSpaceOnUse">
              <path d="M31 17 v28 M19 29 h24" stroke={colors.skyLight} strokeWidth="2.2" strokeLinecap="round" />
            </pattern>
          </defs>
          <rect width="1920" height="1080" fill="url(#cross-thumb)" />
        </svg>
      </AbsoluteFill>

      {/* Left: headline block */}
      <div
        style={{
          position: "absolute",
          left: 120,
          top: 0,
          bottom: 0,
          width: 1090,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 30,
        }}
      >
        <div
          style={{
            alignSelf: "flex-start",
            fontFamily: inter,
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: 5,
            color: colors.skyLight,
            textTransform: "uppercase",
            padding: "12px 28px",
            border: `2px solid ${colors.skyLight}66`,
            borderRadius: 999,
            background: `${colors.brandBlue}26`,
          }}
        >
          Monday Morning Missive
        </div>

        <div
          style={{
            fontFamily: playfair,
            fontWeight: 700,
            fontSize: 150,
            lineHeight: 0.98,
            color: colors.white,
            letterSpacing: -1,
            whiteSpace: "pre-line",
            textShadow: "0 10px 50px rgba(0,0,0,0.5)",
          }}
        >
          He Healed{"\n"}
          <span style={{ color: colors.gold }}>Them All</span>
        </div>

        <div
          style={{
            alignSelf: "flex-start",
            marginTop: 6,
            fontFamily: inter,
            fontWeight: 600,
            fontSize: 38,
            color: colors.neutral200,
          }}
        >
          Hon. Justice Oluyinka Gbaja-Biamila
        </div>
      </div>

      {/* Right: open Bible under a cross with healing rays */}
      <div
        style={{
          position: "absolute",
          right: 120,
          top: 0,
          bottom: 0,
          width: 480,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="470" height="470" viewBox="0 0 470 470">
          {/* glow */}
          <circle cx="235" cy="210" r="180" fill={`${colors.brandBlue}40`} />
          {/* rays */}
          <g stroke={colors.gold} strokeWidth={4} strokeLinecap="round" opacity={0.75}>
            {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg) => (
              <line
                key={deg}
                x1={235 + 150 * Math.cos((deg * Math.PI) / 180)}
                y1={150 + 150 * Math.sin((deg * Math.PI) / 180)}
                x2={235 + 196 * Math.cos((deg * Math.PI) / 180)}
                y2={150 + 196 * Math.sin((deg * Math.PI) / 180)}
              />
            ))}
          </g>
          {/* cross */}
          <path
            d="M235 70 V230 M180 120 h110"
            fill="none"
            stroke={colors.gold}
            strokeWidth={12}
            strokeLinecap="round"
          />
          {/* open Bible */}
          <g fill="none" stroke={colors.white} strokeWidth={7} strokeLinejoin="round" strokeLinecap="round">
            <path d="M235 300 V410" />
            <path d="M235 300 C200 276 150 276 110 290 V392 C150 378 200 378 235 402 Z" />
            <path d="M235 300 C270 276 320 276 360 290 V392 C320 378 270 378 235 402 Z" />
          </g>
        </svg>
      </div>
    </AbsoluteFill>
  );
};
