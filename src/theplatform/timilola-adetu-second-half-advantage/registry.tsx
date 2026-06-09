import { Talk, type TalkProps } from "../_shared/Talk";
import type { TalkContent } from "../_shared/types";

// The 13 lesson data files. Each exports `content` + `TOTAL_FRAMES`.
import * as L01 from "./01-eighteen-month-question/timing";
import * as L02 from "./02-what-tipped-the-decision/timing";
import * as L03 from "./03-your-reflections/timing";
import * as L04 from "./04-mindset-decides-response/timing";
import * as L05 from "./05-growth-vs-fixed/timing";
import * as L06 from "./06-vi-to-onikan/timing";
import * as L07 from "./07-corporate-discipline/timing";
import * as L08 from "./08-targets-revelation/timing";
import * as L09 from "./09-let-others-in/timing";
import * as L10 from "./10-jobs-and-succession/timing";
import * as L11 from "./11-not-about-age/timing";
import * as L12 from "./12-dont-be-pigeonholed/timing";
import * as L13 from "./13-passion-pace-empower/timing";

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
 * disabled for this course: the venue stage screens already carry "the platform
 * nigeria" branding in-frame ("Transition, Impact and Legacy"), so a top-right
 * bug would collide with it.
 */
const make =
  (content: TalkContent): Lesson["component"] =>
  ({ videoSrc, logoSrc }) =>
    <Talk videoSrc={videoSrc} logoSrc={logoSrc} content={content} showLogo={false} />;

const KEY_PREFIX = "instincthub/uploads/timilola-adetu-second-half-advantage";

type Row = {
  slug: string;
  module: number;
  lesson: number;
  title: string;
  mod: { content: TalkContent; TOTAL_FRAMES: number };
};

const ROWS: Row[] = [
  { slug: "01-eighteen-month-question", module: 1, lesson: 1, title: "The 18-month question, and that young lady is me", mod: L01 },
  { slug: "02-what-tipped-the-decision", module: 1, lesson: 2, title: "Timilola at 40: what tipped the decision", mod: L02 },
  { slug: "03-your-reflections", module: 1, lesson: 3, title: "Your reflections: the signals of change", mod: L03 },
  { slug: "04-mindset-decides-response", module: 2, lesson: 4, title: "Change is constant; mindset decides your response", mod: L04 },
  { slug: "05-growth-vs-fixed", module: 2, lesson: 5, title: "Growth vs fixed mindset; respond without regret", mod: L05 },
  { slug: "06-vi-to-onikan", module: 3, lesson: 6, title: "From VI to Onikan: the leap and the reality", mod: L06 },
  { slug: "07-corporate-discipline", module: 3, lesson: 7, title: "Corporate discipline; roll up your sleeves", mod: L07 },
  { slug: "08-targets-revelation", module: 3, lesson: 8, title: "The targets revelation: bringing in a COO", mod: L08 },
  { slug: "09-let-others-in", module: 4, lesson: 9, title: "Let others into your vision", mod: L09 },
  { slug: "10-jobs-and-succession", module: 4, lesson: 10, title: "Jobs and succession: 2 to 310, COO to CEO", mod: L10 },
  { slug: "11-not-about-age", module: 4, lesson: 11, title: "It's not about age: brand, equity, never too late", mod: L11 },
  { slug: "12-dont-be-pigeonholed", module: 5, lesson: 12, title: "Don't be pigeonholed; change yourself, find mentors", mod: L12 },
  { slug: "13-passion-pace-empower", module: 5, lesson: 13, title: "Passion, pace, empower your team, and the third career", mod: L13 },
];

export const TIMILOLA_LESSONS: Lesson[] = ROWS.map((r) => ({
  id: `tl-${r.slug}`,
  module: r.module,
  lesson: r.lesson,
  title: r.title,
  videoSrc: `tp-tl-${r.slug}.mp4`,
  videoKey: `${KEY_PREFIX}/m${r.module}-l${r.lesson}-${r.slug.replace(/^\d+-/, "")}.mp4`,
  totalFrames: r.mod.TOTAL_FRAMES,
  component: make(r.mod.content),
}));
