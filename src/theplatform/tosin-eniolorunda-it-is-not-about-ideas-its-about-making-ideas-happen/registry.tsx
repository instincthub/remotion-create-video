import { Talk, type TalkProps } from "../_shared/Talk";
import type { TalkContent } from "../_shared/types";

// The 11 lesson data files. Each exports `content` + `TOTAL_FRAMES`.
import * as L01 from "./01-execution-at-scale/timing";
import * as L02 from "./02-ideas-are-free/timing";
import * as L03 from "./03-biggest-challenge-is-you/timing";
import * as L04 from "./04-goals-write-the-number/timing";
import * as L05 from "./05-structure-serves-goals/timing";
import * as L06 from "./06-hardest-constraint-people/timing";
import * as L07 from "./07-customer-obsession/timing";
import * as L08 from "./08-traits-craft-to-candor/timing";
import * as L09 from "./09-four-ms-motivation/timing";
import * as L10 from "./10-incentives-and-context/timing";
import * as L11 from "./11-systems-governance-diagnostic/timing";

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
 * disabled for this course: the venue stage screens already carry "the platform"
 * branding in-frame, so a top-right bug would collide with it.
 */
const make =
  (content: TalkContent): Lesson["component"] =>
  ({ videoSrc, logoSrc }) =>
    <Talk videoSrc={videoSrc} logoSrc={logoSrc} content={content} showLogo={false} />;

const KEY_PREFIX = "instincthub/uploads/tosin-eniolorunda-execution";

type Row = {
  slug: string;
  module: number;
  lesson: number;
  title: string;
  mod: { content: TalkContent; TOTAL_FRAMES: number };
};

const ROWS: Row[] = [
  { slug: "01-execution-at-scale", module: 1, lesson: 1, title: "From software to a unicorn: execution at scale", mod: L01 },
  { slug: "02-ideas-are-free", module: 1, lesson: 2, title: "Ideas are free, execution is everything", mod: L02 },
  { slug: "03-biggest-challenge-is-you", module: 1, lesson: 3, title: "Your biggest challenge is you", mod: L03 },
  { slug: "04-goals-write-the-number", module: 2, lesson: 4, title: "Goals: write the number down", mod: L04 },
  { slug: "05-structure-serves-goals", module: 2, lesson: 5, title: "Structure in service of goals", mod: L05 },
  { slug: "06-hardest-constraint-people", module: 3, lesson: 6, title: "Your hardest constraint is people", mod: L06 },
  { slug: "07-customer-obsession", module: 3, lesson: 7, title: "Customer obsession: when customers love you, money follows", mod: L07 },
  { slug: "08-traits-craft-to-candor", module: 3, lesson: 8, title: "From craft to candor: the rest of the traits", mod: L08 },
  { slug: "09-four-ms-motivation", module: 4, lesson: 9, title: "Motivation: the four Ms", mod: L09 },
  { slug: "10-incentives-and-context", module: 4, lesson: 10, title: "Incentives and context", mod: L10 },
  { slug: "11-systems-governance-diagnostic", module: 4, lesson: 11, title: "Systems, governance, and the diagnostic", mod: L11 },
];

export const TOSIN_LESSONS: Lesson[] = ROWS.map((r) => ({
  id: `te-${r.slug}`,
  module: r.module,
  lesson: r.lesson,
  title: r.title,
  videoSrc: `tp-te-${r.slug}.mp4`,
  videoKey: `${KEY_PREFIX}/m${r.module}-l${r.lesson}-${r.slug.replace(/^\d+-/, "")}.mp4`,
  totalFrames: r.mod.TOTAL_FRAMES,
  component: make(r.mod.content),
}));
