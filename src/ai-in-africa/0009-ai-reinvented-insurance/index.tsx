import { AbsoluteFill, Sequence } from "remotion";
import { Background } from "./Background";
import { Closeout } from "./Closeout";
import { HookOverlay } from "./HookOverlay";
import { StatCallout } from "./StatCallout";
import { LessonBadges } from "./LessonBadge";
import { NameStrap } from "./NameStrap";
import { ChapterRail } from "./ChapterRail";
import { CTAOverlay } from "./CTAOverlay";
import { SectionCards } from "./SectionCard";
import { Cutaway } from "./cutaways/Cutaway";
import { ThumbnailScene } from "./ThumbnailScene";
import { CUTAWAYS, THUMBNAIL_FRAMES } from "./timing";

export { COMPOSITION_FRAMES } from "./timing";

export type AIReinventedInsuranceProps = {
  /** Filename of the baked radio-edit cut inside public/. */
  videoSrc: string;
};

/**
 * The cut + every engagement layer, all timed to the cut's own start
 * (frame 0 = first frame of the radio edit). Delayed by the thumbnail hold
 * in the outer composition so the cues in timing.ts need no offsets.
 *
 * Layer order (bottom → top):
 *   footage → hook → stats → lessons → chapter rail → CTA
 *   → full-frame section cards → full-frame b-roll cutaways
 */
const Talk: React.FC<AIReinventedInsuranceProps> = ({ videoSrc }) => (
  <AbsoluteFill>
    <Background videoSrc={videoSrc} />

    {/* Branded backdrop over the black voiceover tail (cut ≥401.3s). */}
    <Closeout />

    <HookOverlay />
    <StatCallout />
    <LessonBadges />
    <NameStrap />
    <ChapterRail />
    <CTAOverlay />

    {/* Opaque chapter dividers hide the three big section seams. */}
    <SectionCards />

    {/* Full-frame b-roll (stock + branded animation) in the gaps. */}
    {CUTAWAYS.map((c) => (
      <Cutaway key={c.key} data={c} />
    ))}
  </AbsoluteFill>
);

export const AIReinventedInsuranceComposition: React.FC<
  AIReinventedInsuranceProps
> = ({ videoSrc }) => {
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
