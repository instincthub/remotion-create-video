import { AbsoluteFill } from "remotion";
import { Background } from "./Background";
import { LogoBug } from "./LogoBug";
import { HookOverlay } from "./HookOverlay";
import { InstructorLowerThird } from "./InstructorLowerThird";
import { OutlineReveal } from "./OutlineReveal";
import { SectionReveal } from "./SectionReveal";
import { SectionTracker } from "./SectionTracker";
import { QuoteOverlay } from "./QuoteOverlay";
import { StatCallout } from "./StatCallout";
import { Cutaway } from "./Cutaway";
import { ClosingCard } from "./ClosingCard";
import type { LessonContent } from "./types";

export type LessonProps = {
  /** Filename of the talk inside `public/`. Empty → branded placeholder. */
  videoSrc?: string;
  /** Filename of the DCSL logo inside `public/` (the persistent bug). */
  logoSrc?: string;
  /** All cues + content for this lesson (built in the lesson's timing.ts). */
  content: LessonContent;
};

/**
 * Generic DCSL course-lesson composite. Layers the real footage and every
 * branded overlay, all timed from the lesson's `content`. A new lesson is just
 * a new `content` object — no new components.
 *
 * Layer order (bottom → top):
 *   footage → hook → instructor → outline → section reveals → quotes → stats →
 *   tracker → logo bug → closing → full-frame cutaways (take over when active)
 */
export const Lesson: React.FC<LessonProps> = ({ videoSrc, logoSrc, content }) => {
  const c = content;
  return (
    <AbsoluteFill>
      <Background videoSrc={videoSrc} />

      <HookOverlay data={c.hook} />
      <InstructorLowerThird data={c.instructor} />
      {c.outline ? <OutlineReveal data={c.outline} /> : null}

      {c.sections.map((s) => (
        <SectionReveal key={s.n} data={s} total={c.sections.length} />
      ))}

      {c.quotes.map((q, i) => (
        <QuoteOverlay key={`q${i}`} data={q} />
      ))}

      {c.stats.map((s, i) => (
        <StatCallout key={`s${i}`} data={s} />
      ))}

      <SectionTracker
        title={c.trackerTitle}
        sections={c.sections}
        trackerIn={c.trackerIn}
        fadeAt={c.closing.in}
      />

      <LogoBug logoSrc={logoSrc} />

      <ClosingCard data={c.closing} />

      {/* Full-frame illustrated cutaways take over on top when active. */}
      {c.cutaways.map((cut) => (
        <Cutaway key={cut.key + cut.start} data={cut} />
      ))}
    </AbsoluteFill>
  );
};
