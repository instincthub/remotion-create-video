import { AbsoluteFill } from "remotion";
import { colors } from "./colors";
import { nunito, dmMono } from "./fonts";

/**
 * One-second hold thumbnail held at the very start of the composition so
 * YouTube can auto-select it. Deliberately STATIC — every frame in the hold
 * is identical, so whichever frame YouTube samples is a clean, designed
 * thumbnail. Bold type + a single strong graphic, readable at small sizes.
 */
export const ThumbnailScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.brandDark }}>
      {/* Glow + grid, consistent with the cutaway scenes */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 70% 45%, ${colors.brandTeal}40 0%, transparent 60%)`,
        }}
      />
      <AbsoluteFill style={{ opacity: 0.06 }}>
        <svg width="1920" height="1080">
          <defs>
            <pattern
              id="dots-thumb"
              x="0"
              y="0"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1.6" fill={colors.tealLight} />
            </pattern>
          </defs>
          <rect width="1920" height="1080" fill="url(#dots-thumb)" />
        </svg>
      </AbsoluteFill>

      {/* Left: headline block */}
      <div
        style={{
          position: "absolute",
          left: 120,
          top: 0,
          bottom: 0,
          width: 1080,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 30,
        }}
      >
        <div
          style={{
            alignSelf: "flex-start",
            fontFamily: dmMono,
            fontSize: 28,
            fontWeight: 500,
            letterSpacing: 5,
            color: colors.tealLight,
            textTransform: "uppercase",
            padding: "12px 26px",
            border: `2px solid ${colors.tealLight}66`,
            borderRadius: 999,
            background: `${colors.brandTeal}22`,
          }}
        >
          Kids &amp; AI Chatbots
        </div>

        <div
          style={{
            fontFamily: nunito,
            fontWeight: 700,
            fontSize: 132,
            lineHeight: 1.02,
            color: colors.white,
            letterSpacing: -1,
            whiteSpace: "pre-line",
          }}
        >
          Your child is{"\n"}
          <span style={{ color: colors.tealLight }}>already using AI.</span>
        </div>

        <div
          style={{
            alignSelf: "flex-start",
            marginTop: 8,
            fontFamily: nunito,
            fontWeight: 700,
            fontSize: 46,
            color: colors.white,
            padding: "16px 34px",
            borderRadius: 16,
            background: colors.brandTeal,
            boxShadow: `0 18px 50px -16px ${colors.brandTeal}`,
          }}
        >
          5 things every parent should do
        </div>
      </div>

      {/* Right: child looking up at an AI chat bubble */}
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
        <svg width="460" height="460" viewBox="0 0 460 460">
          {/* glow */}
          <circle cx="270" cy="170" r="150" fill={`${colors.brandTeal}33`} />
          {/* chat bubble */}
          <path
            d="M120 60 H400 a34 34 0 0 1 34 34 v150 a34 34 0 0 1 -34 34 H250 l-52 54 v-54 H120 a34 34 0 0 1 -34 -34 V94 a34 34 0 0 1 34 -34 Z"
            fill="none"
            stroke={colors.white}
            strokeWidth={6}
            strokeLinejoin="round"
          />
          {/* robot face inside bubble */}
          <g
            fill="none"
            stroke={colors.tealLight}
            strokeWidth={6}
            strokeLinecap="round"
          >
            <circle cx="210" cy="160" r="22" fill={colors.tealLight} stroke="none" />
            <circle cx="310" cy="160" r="22" fill={colors.tealLight} stroke="none" />
            <path d="M200 215 q60 34 120 0" />
            <path d="M260 96 v-26" />
            <circle cx="260" cy="62" r="9" fill={colors.tealLight} stroke="none" />
          </g>
          {/* child head looking up */}
          <g
            fill="none"
            stroke={colors.white}
            strokeWidth={6}
            strokeLinecap="round"
          >
            <circle cx="260" cy="378" r="34" />
            <path d="M214 452 a46 46 0 0 1 92 0" />
          </g>
        </svg>
      </div>
    </AbsoluteFill>
  );
};
