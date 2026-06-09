import { Lesson, type LessonProps } from "../_shared/Lesson";
import { content, TOTAL_FRAMES } from "./timing";

export { TOTAL_FRAMES };

/**
 * Lesson 3 — "Duties & Responsibilities of the Board" (the fiduciary duties of
 * directors under CAMA 2020 s.305). The real talk plus every DCSL overlay;
 * straight to footage (no title hold).
 */
export const DCSLBoardDutiesComposition: React.FC<
  Pick<LessonProps, "videoSrc" | "logoSrc">
> = ({ videoSrc, logoSrc }) => (
  <Lesson videoSrc={videoSrc} logoSrc={logoSrc} content={content} />
);
