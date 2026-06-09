import { AbsoluteFill, Sequence } from "remotion";
import { Background } from "./Background";
import { HookOverlay } from "./HookOverlay";
import { TipReveal } from "./TipReveal";
import { StatOverlay } from "./StatOverlay";
import { CTAOverlay } from "./CTAOverlay";
import { TipsTracker } from "./TipsTracker";
import { ThumbnailScene } from "./ThumbnailScene";
import { Cutaway } from "./cutaways/Cutaway";
import { TIPS, CUTAWAYS, THUMBNAIL_FRAMES } from "./timing";

export type ParentTipsProps = {
  /**
   * Filename of the talk inside `public/` (e.g. "kids-and-ai-parent-tips.mp4").
   * Leave empty to preview the animation over a branded placeholder.
   */
  videoSrc: string;
};

/**
 * The talk + every overlay, all timed relative to the talk's own start
 * (frame 0 = first frame of the footage). This block is delayed by the
 * thumbnail hold in the outer composition, so the cues in `timing.ts` stay
 * correct without per-overlay offsets.
 *
 * Layer order (bottom → top):
 *   footage → hook → per-tip reveals → 40% stat → tracker → CTA → cutaways
 */
const Talk: React.FC<ParentTipsProps> = ({ videoSrc }) => (
  <AbsoluteFill>
    <Background videoSrc={videoSrc} />

    <HookOverlay />

    {TIPS.map((_t, i) => (
      <TipReveal key={i} tipIndex={i} />
    ))}

    <StatOverlay />

    <TipsTracker />

    <CTAOverlay />

    {/* Full-frame illustrated cutaways take over the frame on top of
        everything when active, on a plain branded background. */}
    {CUTAWAYS.map((c) => (
      <Cutaway key={c.key} data={c} />
    ))}
  </AbsoluteFill>
);

/**
 * "Kids and AI Chatbots: Parent Tips" composite.
 *
 * A 1-second static thumbnail is held first (so YouTube can auto-pick it),
 * then a hard cut to the talk, which is delayed by the same amount so none
 * of the footage is lost behind the thumbnail.
 */
export const KidsAndAIParentTipsComposition: React.FC<ParentTipsProps> = ({
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
