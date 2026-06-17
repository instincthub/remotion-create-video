import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import { colors } from "./colors";
import { inter } from "./fonts";

/**
 * Background layer.
 *
 * When `videoSrc` is set, the real talking-head footage is the background and
 * the animation is burned on top. When empty (e.g. while editing in Studio),
 * a branded placeholder renders so the overlays stay reviewable.
 */
export const Background: React.FC<{ videoSrc?: string }> = ({ videoSrc }) => {
  if (videoSrc) {
    return (
      <AbsoluteFill style={{ backgroundColor: colors.brandDark }}>
        <OffthreadVideo src={staticFile(videoSrc)} />
        {/* Gentle bottom scrim so a lower-third / subtitle band stays legible
            over the footage without dimming the speaker's face. */}
        <AbsoluteFill
          style={{
            background: `linear-gradient(to bottom, transparent 60%, ${colors.brandDark}66 100%)`,
            pointerEvents: "none",
          }}
        />
      </AbsoluteFill>
    );
  }

  // Placeholder when no footage is attached yet.
  return (
    <AbsoluteFill style={{ backgroundColor: colors.brandDark }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 38% 42%, ${colors.brandBlue}40 0%, transparent 60%)`,
        }}
      />
      <AbsoluteFill style={{ opacity: 0.06 }}>
        <svg width="1920" height="1080">
          <defs>
            <pattern
              id="cross-bg"
              x="0"
              y="0"
              width="58"
              height="58"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M29 16 v26 M18 27 h22"
                stroke={colors.skyLight}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </pattern>
          </defs>
          <rect width="1920" height="1080" fill="url(#cross-bg)" />
        </svg>
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 96,
          fontFamily: inter,
          fontWeight: 600,
          fontSize: 18,
          letterSpacing: 3,
          color: `${colors.white}55`,
          textTransform: "uppercase",
        }}
      >
        Footage placeholder · set videoSrc to composite
      </div>
    </AbsoluteFill>
  );
};
