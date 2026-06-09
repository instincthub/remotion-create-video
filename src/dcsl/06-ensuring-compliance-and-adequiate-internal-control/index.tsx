import { Lesson, type LessonProps } from "../_shared/Lesson";
import { content, TOTAL_FRAMES } from "./timing";

export { TOTAL_FRAMES };

/**
 * Lesson 6 — "Ensuring Compliance & Adequate Internal Control" (compliance,
 * ethical leadership, transparency & disclosure, no insider advantage, and the
 * consequences of breach). The real talk plus every DCSL overlay.
 */
export const DCSLComplianceComposition: React.FC<
  Pick<LessonProps, "videoSrc" | "logoSrc">
> = ({ videoSrc, logoSrc }) => (
  <Lesson videoSrc={videoSrc} logoSrc={logoSrc} content={content} />
);
