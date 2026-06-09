import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import { colors } from "./colors";
import { inter } from "./fonts";

/**
 * Background layer: the real talking-head footage with a gentle bottom scrim
 * so the lower-thirds stay legible without dimming the speaker's face.
 *
 * When `videoSrc` is empty (while editing overlays in Studio) a branded
 * placeholder renders so the overlays remain visible and reviewable.
 */
export const Background: React.FC<{ videoSrc?: string }> = ({ videoSrc }) => {
  if (videoSrc) {
    return (
      <AbsoluteFill style={{ backgroundColor: colors.pageDark }}>
        <OffthreadVideo src={staticFile(videoSrc)} />
        <AbsoluteFill
          style={{
            background: `linear-gradient(to bottom, transparent 60%, ${colors.pageDark}73 100%)`,
            pointerEvents: "none",
          }}
        />
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{ backgroundColor: colors.pageDark }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 36% 42%, ${colors.blue}55 0%, transparent 60%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 96,
          fontFamily: inter,
          fontSize: 18,
          fontWeight: 600,
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
