import { Lesson, type LessonProps } from "../_shared/Lesson";
import { content, TOTAL_FRAMES } from "./timing";

export { TOTAL_FRAMES };

/**
 * Lesson 7 — "Removal from Office" (the strict CAMA 2020 procedure: notice,
 * right to respond, publication, the lifetime bar, and the resignation route).
 * The real talk plus every DCSL overlay.
 */
export const DCSLRemovalComposition: React.FC<
  Pick<LessonProps, "videoSrc" | "logoSrc">
> = ({ videoSrc, logoSrc }) => (
  <Lesson videoSrc={videoSrc} logoSrc={logoSrc} content={content} />
);
