import { Lesson, type LessonProps } from "../_shared/Lesson";
import { content, TOTAL_FRAMES } from "./timing";

export { TOTAL_FRAMES };

/**
 * Lesson 4 — "Case Study: Conflict of Interest" (the Grenda PLC scenario,
 * applying the conflict-of-interest duty from Lesson 3). The real talk plus
 * every DCSL overlay; straight to footage (no title hold).
 */
export const DCSLCaseStudyComposition: React.FC<
  Pick<LessonProps, "videoSrc" | "logoSrc">
> = ({ videoSrc, logoSrc }) => (
  <Lesson videoSrc={videoSrc} logoSrc={logoSrc} content={content} />
);
