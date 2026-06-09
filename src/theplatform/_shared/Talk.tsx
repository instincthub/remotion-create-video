import { AbsoluteFill } from "remotion";
import { Background } from "./Background";
import { LogoBug } from "./LogoBug";
import { HookOverlay } from "./HookOverlay";
import { SpeakerLowerThird } from "./SpeakerLowerThird";
import { OutlineReveal } from "./OutlineReveal";
import { ChapterReveal } from "./ChapterReveal";
import { ChapterTracker } from "./ChapterTracker";
import { QuoteOverlay } from "./QuoteOverlay";
import { StatCallout } from "./StatCallout";
import { Cutaway } from "./Cutaway";
import { ClosingCard } from "./ClosingCard";
import type { TalkContent } from "./types";

export type TalkProps = {
  /** Filename of the talk inside `public/`. Empty → branded sand placeholder. */
  videoSrc?: string;
  /** Filename of the logo inside `public/` (the persistent bug). Optional —
   *  a drawn lightbulb wordmark renders when absent. */
  logoSrc?: string;
  /** All cues + content for this talk (built in the talk's timing.ts). */
  content: TalkContent;
  /**
   * Show the persistent top-right logo bug. Default true. Set false when the
   * footage already carries the brand in-frame (e.g. venue stage screens),
   * so the bug doesn't collide with a burned-in logo.
   */
  showLogo?: boolean;
};

/**
 * Generic The Platform keynote-talk composite. Layers the real footage and
 * every branded overlay, all timed from the talk's `content`. A new talk is just
 * a new `content` object — no new components.
 *
 * Layer order (bottom → top):
 *   footage → hook → speaker → outline → chapter reveals → quotes → stats →
 *   tracker → logo bug → closing → full-frame cutaways (take over when active)
 */
export const Talk: React.FC<TalkProps> = ({
  videoSrc,
  logoSrc,
  content,
  showLogo = true,
}) => {
  const c = content;
  return (
    <AbsoluteFill>
      <Background videoSrc={videoSrc} />

      <HookOverlay data={c.hook} />
      <SpeakerLowerThird data={c.speaker} />
      {c.outline ? <OutlineReveal data={c.outline} /> : null}

      {c.chapters.map((ch) => (
        <ChapterReveal key={ch.n} data={ch} total={c.chapters.length} />
      ))}

      {c.quotes.map((q, i) => (
        <QuoteOverlay key={`q${i}`} data={q} />
      ))}

      {c.stats.map((s, i) => (
        <StatCallout key={`s${i}`} data={s} />
      ))}

      <ChapterTracker
        title={c.trackerTitle}
        chapters={c.chapters}
        trackerIn={c.trackerIn}
        fadeAt={c.closing.in}
      />

      {showLogo ? <LogoBug logoSrc={logoSrc} /> : null}

      <ClosingCard data={c.closing} />

      {/* Full-frame illustrated cutaways take over on top when active. */}
      {c.cutaways.map((cut) => (
        <Cutaway key={cut.key + cut.start} data={cut} />
      ))}
    </AbsoluteFill>
  );
};
