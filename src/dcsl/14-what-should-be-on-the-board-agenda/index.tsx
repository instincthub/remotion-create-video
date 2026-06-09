import { Lesson, type LessonProps } from "../_shared/Lesson";
import { content, TOTAL_FRAMES } from "./timing";

export { TOTAL_FRAMES };

/**
 * Lesson 14 — "What Should Be on the Board Agenda" (constructive challenge, the
 * board agenda and its past-vs-future balance, and spotting dysfunctional
 * directors).
 */
export const DCSLAgendaComposition: React.FC<
  Pick<LessonProps, "videoSrc" | "logoSrc">
> = ({ videoSrc, logoSrc }) => (
  <Lesson videoSrc={videoSrc} logoSrc={logoSrc} content={content} />
);
