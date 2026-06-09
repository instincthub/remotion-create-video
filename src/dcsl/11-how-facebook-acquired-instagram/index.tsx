import { Lesson, type LessonProps } from "../_shared/Lesson";
import { content, TOTAL_FRAMES } from "./timing";

export { TOTAL_FRAMES };

/**
 * Lesson 11 — "Board Effectiveness: How Facebook Acquired Instagram" (a case
 * study on board effectiveness, then the effective-board framework:
 * accountability, leadership, tone at the top, risk and continuity).
 */
export const DCSLEffectivenessComposition: React.FC<
  Pick<LessonProps, "videoSrc" | "logoSrc">
> = ({ videoSrc, logoSrc }) => (
  <Lesson videoSrc={videoSrc} logoSrc={logoSrc} content={content} />
);
