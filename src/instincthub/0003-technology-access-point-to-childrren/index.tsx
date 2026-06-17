import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Lesson } from "../_shared/Lesson";
import { Thumbnail } from "./Thumbnail";
import {
  content,
  THUMBNAIL_FRAMES,
  TOTAL_FRAMES,
  MUSIC_SRC,
  MUSIC_VOLUME,
} from "./timing";

export type TechAccessPointsProps = {
  /** Talk footage filename in public/. Empty → branded placeholder. */
  videoSrc: string;
  /** InstinctHub logo filename in public/ (the persistent top-right bug). */
  logoSrc?: string;
};

export { COMPOSITION_FRAMES } from "./timing";

/**
 * "Technology: The #1 Access Point to Your Children" — an InstinctHub talk made
 * engaging with branded overlays + real-footage cutaways, composited over the
 * speaker's footage in the shared <Lesson> shell.
 *
 * A 1-second static thumbnail card is held first (so YouTube can auto-pick it),
 * then a cut to the talk — delayed by the same amount so none of the footage is
 * lost behind it. A low-volume music bed (the supplied mp3) sits under the talk.
 */
export const TechAccessPointsComposition: React.FC<TechAccessPointsProps> = ({
  videoSrc,
  logoSrc = "instincthub-logo-color.png",
}) => {
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={THUMBNAIL_FRAMES} name="Thumbnail">
        <Thumbnail />
      </Sequence>

      <Sequence from={THUMBNAIL_FRAMES} durationInFrames={TOTAL_FRAMES} name="Talk">
        <Lesson videoSrc={videoSrc} logoSrc={logoSrc} content={content} />
        {/* Music bed — quiet, so it lifts production value without burying the
            speaker. Tune MUSIC_VOLUME in timing.ts (or remove this Audio). */}
        <Audio src={staticFile(MUSIC_SRC)} volume={MUSIC_VOLUME} />
      </Sequence>
    </AbsoluteFill>
  );
};
