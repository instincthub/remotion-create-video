import { Talk, type TalkProps } from "../_shared/Talk";
import type { TalkContent } from "../_shared/types";

// The 13 lesson data files. Each exports `content` + `TOTAL_FRAMES`.
import * as L01 from "./01-the-question/timing";
import * as L02 from "./02-calling-born-early/timing";
import * as L03 from "./03-work-hard-be-bold/timing";
import * as L04 from "./04-success-as-destination/timing";
import * as L05 from "./05-success-by-comparison/timing";
import * as L06 from "./06-turning-point-at-fifty/timing";
import * as L07 from "./07-leaving-security/timing";
import * as L08 from "./08-god-orders-your-steps/timing";
import * as L09 from "./09-going-home/timing";
import * as L10 from "./10-one-building-one-team/timing";
import * as L11 from "./11-the-human-cost/timing";
import * as L12 from "./12-stepping-stones-legacy/timing";
import * as L13 from "./13-lifting-others-the-charge/timing";

/** One course lesson: a Remotion composition + its InstinctHub course metadata. */
export type Lesson = {
  /** Remotion composition id (also the Studio label). */
  id: string;
  module: number;
  lesson: number;
  /** Human title for the course tree. */
  title: string;
  /** Footage clip in public/ (produced by trim-clips.sh). */
  videoSrc: string;
  /** S3 object key handed to the course-creation agent's uploader mapping. */
  videoKey: string;
  totalFrames: number;
  component: React.FC<Pick<TalkProps, "videoSrc" | "logoSrc">>;
};

/**
 * Build a thin Talk wrapper bound to one lesson's content. The logo bug is
 * disabled for this course: the venue stage screens already carry "the
 * platform" branding in-frame, so a top-right bug would collide with it.
 */
const make =
  (content: TalkContent): Lesson["component"] =>
  ({ videoSrc, logoSrc }) =>
    <Talk videoSrc={videoSrc} logoSrc={logoSrc} content={content} showLogo={false} />;

const KEY_PREFIX = "instincthub/uploads/prof-modupe-second-half-advantage";

type Row = {
  slug: string;
  module: number;
  lesson: number;
  title: string;
  mod: { content: TalkContent; TOTAL_FRAMES: number };
};

const ROWS: Row[] = [
  { slug: "01-the-question", module: 1, lesson: 1, title: "The question that will not go away", mod: L01 },
  { slug: "02-calling-born-early", module: 1, lesson: 2, title: "A calling born early", mod: L02 },
  { slug: "03-work-hard-be-bold", module: 1, lesson: 3, title: "Work hard, be bold: the early years", mod: L03 },
  { slug: "04-success-as-destination", module: 2, lesson: 4, title: "Success as a destination, and the first crack", mod: L04 },
  { slug: "05-success-by-comparison", module: 2, lesson: 5, title: "Measuring success by comparison", mod: L05 },
  { slug: "06-turning-point-at-fifty", module: 2, lesson: 6, title: "The turning point at fifty", mod: L06 },
  { slug: "07-leaving-security", module: 3, lesson: 7, title: "Acting on clarity, leaving security", mod: L07 },
  { slug: "08-god-orders-your-steps", module: 3, lesson: 8, title: "God orders your steps, and the four-year bridge", mod: L08 },
  { slug: "09-going-home", module: 4, lesson: 9, title: "Going home when everyone was leaving", mod: L09 },
  { slug: "10-one-building-one-team", module: 4, lesson: 10, title: "One building, one team, one standard", mod: L10 },
  { slug: "11-the-human-cost", module: 5, lesson: 11, title: "Why it matters: the human cost", mod: L11 },
  { slug: "12-stepping-stones-legacy", module: 5, lesson: 12, title: "Stepping stones and the training legacy", mod: L12 },
  { slug: "13-lifting-others-the-charge", module: 5, lesson: 13, title: "Lifting others, and the charge", mod: L13 },
];

export const MODUPE_LESSONS: Lesson[] = ROWS.map((r) => ({
  id: `me-${r.slug}`,
  module: r.module,
  lesson: r.lesson,
  title: r.title,
  videoSrc: `tp-me-${r.slug}.mp4`,
  videoKey: `${KEY_PREFIX}/m${r.module}-l${r.lesson}-${r.slug.replace(/^\d+-/, "")}.mp4`,
  totalFrames: r.mod.TOTAL_FRAMES,
  component: make(r.mod.content),
}));
