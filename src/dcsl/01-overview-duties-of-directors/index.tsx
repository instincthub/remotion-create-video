import { Lesson, type LessonProps } from "../_shared/Lesson";
import { content, TOTAL_FRAMES } from "./timing";

export { TOTAL_FRAMES };

/**
 * Lesson 1 — "Duties & Responsibilities of Directors: Overview".
 * The real talk plus every DCSL overlay; no thumbnail/title hold (straight to
 * footage). Drop the footage into public/ and pass its filename as videoSrc.
 */
export const DCSLDutiesOverviewComposition: React.FC<
  Pick<LessonProps, "videoSrc" | "logoSrc">
> = ({ videoSrc, logoSrc }) => (
  <Lesson videoSrc={videoSrc} logoSrc={logoSrc} content={content} />
);
