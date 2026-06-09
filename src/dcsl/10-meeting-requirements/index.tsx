import { Lesson, type LessonProps } from "../_shared/Lesson";
import { content, TOTAL_FRAMES } from "./timing";

export { TOTAL_FRAMES };

/**
 * Lesson 10 — "Meeting Requirements" (code provisions on board operations:
 * quarterly meetings & attendance, committees, recusal, auditor rotation,
 * remuneration limits, training/induction and the company secretary).
 */
export const DCSLMeetingsComposition: React.FC<
  Pick<LessonProps, "videoSrc" | "logoSrc">
> = ({ videoSrc, logoSrc }) => (
  <Lesson videoSrc={videoSrc} logoSrc={logoSrc} content={content} />
);
