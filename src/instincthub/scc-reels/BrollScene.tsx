import {
  AbsoluteFill,
  Img,
  OffthreadVideo,
  staticFile,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { colors } from "../_shared/colors";

/**
 * One montage scene for a SILENT 9:16 SCC reel: a center-cropped b-roll
 * background (either a previous-training photo with a slow Ken Burns move, or a
 * muted clip of a past camp) with cinematic top/bottom scrims so the overlaid
 * caption stays legible. `children` is the caption/overlay.
 *
 * The reel has no audio, so clips are always muted.
 */

type KenBurns = {
  /** Start/end zoom (scale). Default a gentle 1.06 → 1.14 push-in. */
  fromScale?: number;
  toScale?: number;
  /** Pan in px across the scene (applied to both axes). */
  panX?: number;
  panY?: number;
};

const PhotoBg: React.FC<{
  src: string;
  durationInFrames: number;
  objectPosition: string;
  kb: KenBurns;
}> = ({ src, durationInFrames, objectPosition, kb }) => {
  const frame = useCurrentFrame();
  const { fromScale = 1.06, toScale = 1.14, panX = 0, panY = 0 } = kb;
  const t = interpolate(frame, [0, Math.max(1, durationInFrames)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(t, [0, 1], [fromScale, toScale]);
  const tx = interpolate(t, [0, 1], [0, panX]);
  const ty = interpolate(t, [0, 1], [0, panY]);
  return (
    <Img
      src={staticFile(src)}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition,
        transform: `scale(${scale}) translate(${tx}px, ${ty}px)`,
        willChange: "transform",
      }}
    />
  );
};

export const BrollScene: React.FC<{
  kind: "photo" | "clip";
  src: string;
  /** Scene length in frames — drives the Ken Burns move for photos. */
  durationInFrames: number;
  /** Center-crop bias. */
  objectPosition?: string;
  /** Clip-only: trim window in frames on the clip's own timeline. */
  trimBefore?: number;
  trimAfter?: number;
  /** Ken Burns config for photos. */
  kenBurns?: KenBurns;
  /** Extra dim over the footage (0–1) for text-heavy scenes. */
  dim?: number;
  children?: React.ReactNode;
}> = ({
  kind,
  src,
  durationInFrames,
  objectPosition = "50% 42%",
  trimBefore,
  trimAfter,
  kenBurns = {},
  dim = 0,
  children,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.inkDeep }}>
      {kind === "photo" ? (
        <PhotoBg
          src={src}
          durationInFrames={durationInFrames}
          objectPosition={objectPosition}
          kb={kenBurns}
        />
      ) : (
        <OffthreadVideo
          src={staticFile(src)}
          muted
          trimBefore={trimBefore}
          trimAfter={trimAfter}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition,
          }}
        />
      )}

      {/* Cinematic scrims: darken top (eyebrow) and bottom (caption + subtitle
          safe zone) so white type never floats on bare footage. */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(to bottom, ${colors.inkDeep}D9 0%, transparent 22%, transparent 40%, ${colors.inkDeep}F2 100%)`,
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
