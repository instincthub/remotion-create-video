import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import { colors } from "../parent-tips/colors";

/**
 * One montage clip: a trimmed segment of the real talk (with its original
 * audio), center-cropped from 16:9 to 9:16, with scrims top and bottom so the
 * overlaid punchline stays legible. `children` is the text overlay.
 *
 * trim values are in FRAMES at the composition fps (30) — i.e. seconds × 30 —
 * mapped to the talk's own timeline, so each clip lands on the exact sentence.
 */
export const ClipScene: React.FC<{
  videoSrc: string;
  trimBefore: number;
  trimAfter: number;
  /** Extra dim over the footage (0–1) for text-heavy clips like the tease. */
  dim?: number;
  children?: React.ReactNode;
}> = ({ videoSrc, trimBefore, trimAfter, dim = 0, children }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.brandDark }}>
      <OffthreadVideo
        src={staticFile(videoSrc)}
        trimBefore={trimBefore}
        trimAfter={trimAfter}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "50% 42%",
        }}
      />

      {/* Cinematic scrims: darken top (eyebrow/number) and bottom (caption). */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(to bottom, ${colors.brandDark}CC 0%, transparent 26%, transparent 46%, ${colors.brandDark}F2 100%)`,
          pointerEvents: "none",
        }}
      />
      {dim > 0 ? (
        <AbsoluteFill
          style={{
            backgroundColor: colors.brandDark,
            opacity: dim,
            pointerEvents: "none",
          }}
        />
      ) : null}

      {children}
    </AbsoluteFill>
  );
};
