import { Lesson, type LessonProps } from "../_shared/Lesson";
import { content, TOTAL_FRAMES } from "./timing";

export { TOTAL_FRAMES };

/**
 * Lesson 9 — "Provisions of the Code" (the NCCG's 28 principles and apply-and-
 * explain philosophy, FRC sanctions, and specific provisions on board size,
 * composition, diversity and tenure).
 */
export const DCSLProvisionsComposition: React.FC<
  Pick<LessonProps, "videoSrc" | "logoSrc">
> = ({ videoSrc, logoSrc }) => (
  <Lesson videoSrc={videoSrc} logoSrc={logoSrc} content={content} />
);
