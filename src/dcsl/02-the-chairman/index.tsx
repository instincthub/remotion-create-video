import { Lesson, type LessonProps } from "../_shared/Lesson";
import { content, TOTAL_FRAMES } from "./timing";

export { TOTAL_FRAMES };

/**
 * Lesson 2 — "The Chairman & Independent Directors".
 * The real talk plus every DCSL overlay; straight to footage (no title hold).
 */
export const DCSLChairmanComposition: React.FC<
  Pick<LessonProps, "videoSrc" | "logoSrc">
> = ({ videoSrc, logoSrc }) => (
  <Lesson videoSrc={videoSrc} logoSrc={logoSrc} content={content} />
);
