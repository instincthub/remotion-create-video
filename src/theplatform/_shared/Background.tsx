import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import { colors } from "./colors";
import { overpass } from "./fonts";

/**
 * Background layer: the real talking-head footage with a gentle bottom scrim so
 * the lower-thirds stay legible without dimming the speaker's face.
 *
 * When `videoSrc` is empty (while editing overlays in Studio) a branded SAND
 * placeholder renders — the lightbulb "ideas happen" canvas — so the overlays
 * remain visible and reviewable.
 */
export const Background: React.FC<{ videoSrc?: string }> = ({ videoSrc }) => {
  if (videoSrc) {
    return (
      <AbsoluteFill style={{ backgroundColor: colors.ink }}>
        <OffthreadVideo src={staticFile(videoSrc)} />
        <AbsoluteFill
          style={{
            background: `linear-gradient(to bottom, transparent 58%, ${colors.ink}80 100%)`,
            pointerEvents: "none",
          }}
        />
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{ backgroundColor: colors.sand }}>
      {/* faint dot grid, echoing the site's textured sand panels */}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(${colors.ink}14 1.5px, transparent 1.5px)`,
          backgroundSize: "42px 42px",
          opacity: 0.5,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 30%, ${colors.yellow}3D 0%, transparent 58%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 96,
          fontFamily: overpass,
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: 3,
          color: `${colors.ink}80`,
          textTransform: "uppercase",
        }}
      >
        Footage placeholder · set videoSrc to composite
      </div>
    </AbsoluteFill>
  );
};
