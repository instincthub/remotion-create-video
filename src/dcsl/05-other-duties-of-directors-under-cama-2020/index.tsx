import { Lesson, type LessonProps } from "../_shared/Lesson";
import { content, TOTAL_FRAMES } from "./timing";

export { TOTAL_FRAMES };

/**
 * Lesson 5 — "Other Duties of Directors under CAMA 2020" (trustees, accurate
 * financials, ESG, measuring performance, remuneration and risk). The real talk
 * plus every DCSL overlay; straight to footage (no title hold).
 */
export const DCSLOtherDutiesComposition: React.FC<
  Pick<LessonProps, "videoSrc" | "logoSrc">
> = ({ videoSrc, logoSrc }) => (
  <Lesson videoSrc={videoSrc} logoSrc={logoSrc} content={content} />
);
