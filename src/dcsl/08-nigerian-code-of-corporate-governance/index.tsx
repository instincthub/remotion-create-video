import { Lesson, type LessonProps } from "../_shared/Lesson";
import { content, TOTAL_FRAMES } from "./timing";

export { TOTAL_FRAMES };

/**
 * Lesson 8 — "The Nigerian Code of Corporate Governance" (the evolution of
 * corporate governance in Nigeria: CAMA 1968 → SEC Code → sectoral codes →
 * NCCG 2018 → CAMA 2020 → the Business Facilitation Act 2023).
 */
export const DCSLNCCGComposition: React.FC<
  Pick<LessonProps, "videoSrc" | "logoSrc">
> = ({ videoSrc, logoSrc }) => (
  <Lesson videoSrc={videoSrc} logoSrc={logoSrc} content={content} />
);
