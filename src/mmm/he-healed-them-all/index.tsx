import { AbsoluteFill, Sequence } from "remotion";
import { Background } from "./Background";
import { HookOverlay } from "./HookOverlay";
import { VerseReveal } from "./VerseReveal";
import { ScriptureTracker } from "./ScriptureTracker";
import { CTAOverlay } from "./CTAOverlay";
import { ThumbnailScene } from "./ThumbnailScene";
import { Cutaway } from "./cutaways/Cutaway";
import { VERSES, CUTAWAYS, THUMBNAIL_FRAMES } from "./timing";

export { COMPOSITION_FRAMES } from "./timing";

export type HealedThemAllProps = {
  /** Filename of the talk inside `public/`. Empty → branded placeholder. */
  videoSrc: string;
};

/**
 * The talk + every overlay, timed relative to the talk's own start (frame 0 =
 * first frame of footage). Delayed by the thumbnail hold in the outer
 * composition, so cues in `timing.ts` need no per-overlay offset.
 *
 * Layer order (bottom → top):
 *   footage → hook → per-verse reveals → tracker → CTA → cutaways
 */
const Talk: React.FC<HealedThemAllProps> = ({ videoSrc }) => (
  <AbsoluteFill>
    <Background videoSrc={videoSrc} />

    <HookOverlay />

    {VERSES.map((_v, i) => (
      <VerseReveal key={i} index={i} />
    ))}

    <ScriptureTracker />

    <CTAOverlay />

    {/* Full-frame illustrated cutaways take over the frame on a navy bg. */}
    {CUTAWAYS.map((c) => (
      <Cutaway key={c.key} data={c} />
    ))}
  </AbsoluteFill>
);

/**
 * "He Healed Them All" — Monday Morning Missive composite.
 *
 * A 1-second static thumbnail is held first (so YouTube can auto-pick it),
 * then a hard cut to the talk, which is delayed by the same amount so none of
 * the footage is lost behind the thumbnail.
 */
export const HealedThemAllComposition: React.FC<HealedThemAllProps> = ({
  videoSrc,
}) => {
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={THUMBNAIL_FRAMES} name="Thumbnail">
        <ThumbnailScene />
      </Sequence>

      <Sequence from={THUMBNAIL_FRAMES} name="Talk">
        <Talk videoSrc={videoSrc} />
      </Sequence>
    </AbsoluteFill>
  );
};
