import { Lesson, type LessonProps } from "../_shared/Lesson";
import { content, TOTAL_FRAMES } from "./timing";

export { TOTAL_FRAMES };

/**
 * Lesson 12 — "The Board Can Hire and Remove a CEO" (the CEO mandate, then the
 * elements of board effectiveness and a deep dive on structure & composition).
 */
export const DCSLHireRemoveCEOComposition: React.FC<
  Pick<LessonProps, "videoSrc" | "logoSrc">
> = ({ videoSrc, logoSrc }) => (
  <Lesson videoSrc={videoSrc} logoSrc={logoSrc} content={content} />
);
