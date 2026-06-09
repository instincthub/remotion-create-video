import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import { colors } from "./colors";
import { dmMono } from "./fonts";

/**
 * Background layer for the composite.
 *
 * When `videoSrc` is set, the real talking-head footage is the background
 * and the animation is burned on top. When it is empty (e.g. while you are
 * still editing the animation in Studio), a branded placeholder renders so
 * the overlays remain visible and reviewable.
 *
 * Drop the exported talk into `public/` and pass its filename as `videoSrc`
 * (e.g. "kids-and-ai-parent-tips.mp4") in the composition default props.
 */

export const Background: React.FC<{ videoSrc?: string }> = ({ videoSrc }) => {
  if (videoSrc) {
    return (
      <AbsoluteFill style={{ backgroundColor: colors.brandDark }}>
        <OffthreadVideo src={staticFile(videoSrc)} />
        {/* Gentle bottom scrim so the subtitle band and CTA stay legible
            over busy footage without dimming the speaker's face. */}
        <AbsoluteFill
          style={{
            background: `linear-gradient(to bottom, transparent 62%, ${colors.brandDark}66 100%)`,
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
          background: `radial-gradient(ellipse at 36% 42%, ${colors.brandTeal}33 0%, transparent 60%)`,
        }}
      />
      <AbsoluteFill style={{ opacity: 0.05 }}>
        <svg width="1920" height="1080">
          <defs>
            <pattern
              id="dots-bg"
              x="0"
              y="0"
              width="46"
              height="46"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1.5" fill={colors.tealLight} />
            </pattern>
          </defs>
          <rect width="1920" height="1080" fill="url(#dots-bg)" />
        </svg>
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 96,
          fontFamily: dmMono,
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
