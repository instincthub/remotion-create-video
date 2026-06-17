import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
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
  /** Filename of the lesson footage inside `public/`. Empty → branded placeholder. */
  videoSrc?: string;
  /** Filename of the InstinctHub logo inside `public/` (the persistent bug).
   *  Optional — a drawn cap + wordmark fallback renders when absent. */
  logoSrc?: string;
  /** All cues + content for this lesson (built in the lesson's timing.ts). */
  content: LessonContent;
  /**
   * Show the persistent top-right logo bug. Default true. Set false when the
   * footage already carries the brand in-frame (e.g. slide decks with the
   * logo), so the bug doesn't collide with a burned-in logo.
   */
  showLogo?: boolean;
};

/**
 * Generic InstinctHub course-lesson composite. Layers the real footage and
 * every branded overlay, all timed from the lesson's `content`. A new lesson
 * is just a new `content` object — no new components.
 *
 * Layer order (bottom → top):
 *   footage → hook → instructor → outline → section reveals → quotes → stats →
 *   tracker → logo bug → closing → full-frame cutaways (take over when active)
 */
/**
 * Opacity gate that hides every overlay while the footage shows a full-screen
 * slide, so animations never block slide content. Each window hides fully
 * from `start - 30` to `end + 30` frames (the luma detection is 1s-coarse)
 * with a 12-frame fade on either side.
 */
const slideGate = (
  frame: number,
  windows: LessonContent["slideWindows"],
): number => {
  let gate = 1;
  for (const [a, b] of windows ?? []) {
    gate = Math.min(
      gate,
      interpolate(frame, [a - 42, a - 30, b + 30, b + 42], [1, 0, 0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    );
  }
  return gate;
};

export const Lesson: React.FC<LessonProps> = ({
  videoSrc,
  logoSrc,
  content,
  showLogo = true,
}) => {
  const c = content;
  const frame = useCurrentFrame();
  const gate = slideGate(frame, c.slideWindows);
  return (
    <AbsoluteFill>
      <Background videoSrc={videoSrc} />

      {/* Everything above the footage hides while a slide is on screen. */}
      <AbsoluteFill style={{ opacity: gate }}>
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

      {showLogo ? <LogoBug logoSrc={logoSrc} /> : null}

      <ClosingCard data={c.closing} />

      {/* Full-frame illustrated cutaways take over on top when active. */}
      {c.cutaways.map((cut) => (
        <Cutaway key={cut.key + cut.start} data={cut} />
      ))}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
