import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import { colors } from "./colors";
import { montserrat } from "./fonts";

/**
 * Background layer: the real talking-head footage with a gentle bottom scrim so
 * the lower-thirds stay legible without dimming the instructor's face.
 *
 * When `videoSrc` is empty (while editing overlays in Studio) a branded
 * MAGNOLIA placeholder renders — the light InstinctHub canvas — so the
 * overlays remain visible and reviewable.
 */
export const Background: React.FC<{ videoSrc?: string }> = ({ videoSrc }) => {
  if (videoSrc) {
    return (
      <AbsoluteFill style={{ backgroundColor: colors.inkDeep }}>
        <OffthreadVideo src={staticFile(videoSrc)} />
        <AbsoluteFill
          style={{
            background: `linear-gradient(to bottom, transparent 58%, ${colors.inkDeep}80 100%)`,
            pointerEvents: "none",
          }}
        />
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{ backgroundColor: colors.magnolia }}>
      {/* faint dot grid, echoing the platform's textured light panels */}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(${colors.gunmetal}14 1.5px, transparent 1.5px)`,
          backgroundSize: "42px 42px",
          opacity: 0.5,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 30%, ${colors.cyan}24 0%, transparent 58%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 96,
          fontFamily: montserrat,
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: 3,
          color: `${colors.slate}B3`,
          textTransform: "uppercase",
        }}
      >
        Footage placeholder · set videoSrc to composite
      </div>
    </AbsoluteFill>
  );
};
