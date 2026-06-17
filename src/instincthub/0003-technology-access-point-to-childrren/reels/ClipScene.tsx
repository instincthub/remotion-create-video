import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import { colors } from "../../_shared/colors";

/**
 * One montage clip for a 9:16 reel: a trimmed segment of the real talk (with
 * its original audio), center-cropped from the 16:9 source to portrait, with
 * cinematic scrims top and bottom so the overlaid punchline stays legible.
 * `children` is the text overlay.
 *
 * trim values are in FRAMES at the composition fps (30) — i.e. seconds × 30 —
 * mapped to the talk's own timeline, so each clip lands on the exact sentence.
 * `OffthreadVideo` carries the original audio on render.
 */
export const ClipScene: React.FC<{
  videoSrc: string;
  trimBefore: number;
  trimAfter: number;
  /** Vertical bias of the center-crop. Default keeps the speaker's face high. */
  objectPosition?: string;
  /** Extra dim over the footage (0–1) for text-heavy clips. */
  dim?: number;
  children?: React.ReactNode;
}> = ({
  videoSrc,
  trimBefore,
  trimAfter,
  objectPosition = "50% 38%",
  dim = 0,
  children,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.inkDeep }}>
      <OffthreadVideo
        src={staticFile(videoSrc)}
        trimBefore={trimBefore}
        trimAfter={trimAfter}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition,
        }}
      />

      {/* Cinematic scrims: darken top (eyebrow) and bottom (caption + subtitle
          safe zone) so white type never floats on bare footage. */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(to bottom, ${colors.inkDeep}D9 0%, transparent 24%, transparent 44%, ${colors.inkDeep}F2 100%)`,
          pointerEvents: "none",
        }}
      />
      {dim > 0 ? (
        <AbsoluteFill
          style={{
            backgroundColor: colors.inkDeep,
            opacity: dim,
            pointerEvents: "none",
          }}
        />
      ) : null}

      {children}
    </AbsoluteFill>
  );
};
