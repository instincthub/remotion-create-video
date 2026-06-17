import { Lesson as LessonShell, type LessonProps } from "../_shared/Lesson";
import type { LessonContent } from "../_shared/types";

// The 15 lesson data files. Each exports `content` + `TOTAL_FRAMES`.
import * as L01 from "./01-the-only-non-negotiable/timing";
import * as L02 from "./02-unique-and-important/timing";
import * as L03 from "./03-regain-the-perfect-plan/timing";
import * as L04 from "./04-a-complete-disaster/timing";
import * as L05 from "./05-no-money-wrong-channel/timing";
import * as L06 from "./06-paying-for-the-mistake/timing";
import * as L07 from "./07-find-the-emotional-problem/timing";
import * as L08 from "./08-customers-shape-the-product/timing";
import * as L09 from "./09-advertise-to-the-fear/timing";
import * as L10 from "./10-phone-orders-to-shelves/timing";
import * as L11 from "./11-educators-and-wholesalers/timing";
import * as L12 from "./12-the-planogram-meeting/timing";
import * as L13 from "./13-selling-is-detective-work/timing";
import * as L14 from "./14-segment-and-sell-benefits/timing";
import * as L15 from "./15-start-small-iterate-win/timing";

/** One course lesson: a Remotion composition + its InstinctHub course metadata. */
export type CourseLesson = {
  /** Remotion composition id (also the Studio label). */
  id: string;
  module: number;
  lesson: number;
  /** Human title for the course tree. */
  title: string;
  /** Footage clip in public/ (produced by trim-clips.sh). */
  videoSrc: string;
  /** Stable upload key/filename for the uploader mapping. */
  videoKey: string;
  totalFrames: number;
  component: React.FC<Pick<LessonProps, "videoSrc" | "logoSrc">>;
};

/**
 * Thin Lesson-shell wrapper bound to one lesson's content. The lecture-hall
 * footage carries no brand in-frame, so the InstinctHub logo bug stays on
 * (drawn cap + wordmark fallback; no logo file needed).
 */
const make =
  (content: LessonContent): CourseLesson["component"] =>
  ({ videoSrc, logoSrc }) => (
    <LessonShell videoSrc={videoSrc} logoSrc={logoSrc} content={content} />
  );

const KEY_PREFIX = "instincthub/uploads/marketing-and-sales-find-your-customer";

type Row = {
  slug: string;
  module: number;
  lesson: number;
  title: string;
  mod: { content: LessonContent; TOTAL_FRAMES: number };
};

const ROWS: Row[] = [
  { slug: "01-the-only-non-negotiable", module: 1, lesson: 1, title: "The only non-negotiable: customers", mod: L01 },
  { slug: "02-unique-and-important", module: 1, lesson: 2, title: "Unique and important", mod: L02 },
  { slug: "03-regain-the-perfect-plan", module: 1, lesson: 3, title: "Case study: Regain, the perfect plan", mod: L03 },
  { slug: "04-a-complete-disaster", module: 2, lesson: 4, title: "A complete disaster", mod: L04 },
  { slug: "05-no-money-wrong-channel", module: 2, lesson: 5, title: "No money and the wrong channel", mod: L05 },
  { slug: "06-paying-for-the-mistake", module: 2, lesson: 6, title: "Paying for the mistake", mod: L06 },
  { slug: "07-find-the-emotional-problem", module: 3, lesson: 7, title: "Find the emotional problem", mod: L07 },
  { slug: "08-customers-shape-the-product", module: 3, lesson: 8, title: "Let customers shape the product", mod: L08 },
  { slug: "09-advertise-to-the-fear", module: 3, lesson: 9, title: "Advertise to the fear, grow the funnel", mod: L09 },
  { slug: "10-phone-orders-to-shelves", module: 4, lesson: 10, title: "From phone orders to pharmacy shelves", mod: L10 },
  { slug: "11-educators-and-wholesalers", module: 4, lesson: 11, title: "Educators and wholesalers", mod: L11 },
  { slug: "12-the-planogram-meeting", module: 4, lesson: 12, title: "The planogram meeting", mod: L12 },
  { slug: "13-selling-is-detective-work", module: 5, lesson: 13, title: "Selling is detective work", mod: L13 },
  { slug: "14-segment-and-sell-benefits", module: 5, lesson: 14, title: "Segment by motivation, sell benefits", mod: L14 },
  { slug: "15-start-small-iterate-win", module: 5, lesson: 15, title: "Start small, iterate, win", mod: L15 },
];

export const MARKETING_SALES_LESSONS: CourseLesson[] = ROWS.map((r) => ({
  id: `ih-ms-${r.slug}`,
  module: r.module,
  lesson: r.lesson,
  title: r.title,
  videoSrc: `ih-ms-${r.slug}.mp4`,
  videoKey: `${KEY_PREFIX}/m${r.module}-l${r.lesson}-${r.slug.replace(/^\d+-/, "")}.mp4`,
  totalFrames: r.mod.TOTAL_FRAMES,
  component: make(r.mod.content),
}));
