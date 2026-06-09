import { Talk, type TalkProps } from "../_shared/Talk";
import type { TalkContent } from "../_shared/types";

// The 14 lesson data files. Each exports `content` + `TOTAL_FRAMES`.
import * as L01 from "./01-plant-trees/timing";
import * as L02 from "./02-mango-tree/timing";
import * as L03 from "./03-build-for-the-future/timing";
import * as L04 from "./04-deciding-to-plant/timing";
import * as L05 from "./05-fifty-year-horizon/timing";
import * as L06 from "./06-honest-odds-vision/timing";
import * as L07 from "./07-roots-go-deep/timing";
import * as L08 from "./08-waiting-not-idle/timing";
import * as L09 from "./09-the-canopy/timing";
import * as L10 from "./10-destiny-helpers/timing";
import * as L11 from "./11-engage-dont-retreat/timing";
import * as L12 from "./12-long-harvest/timing";
import * as L13 from "./13-shape-the-future/timing";
import * as L14 from "./14-the-charge/timing";

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

const KEY_PREFIX = "instincthub/uploads/affiong-williams-plant-trees";

type Row = {
  slug: string;
  module: number;
  lesson: number;
  title: string;
  mod: { content: TalkContent; TOTAL_FRAMES: number };
};

const ROWS: Row[] = [
  { slug: "01-plant-trees", module: 1, lesson: 1, title: "Plant trees you may never sit under", mod: L01 },
  { slug: "02-mango-tree", module: 1, lesson: 2, title: "The life of a mango tree", mod: L02 },
  { slug: "03-build-for-the-future", module: 1, lesson: 3, title: "Build for 2075, not this quarter", mod: L03 },
  { slug: "04-deciding-to-plant", module: 2, lesson: 4, title: "The most consequential decision", mod: L04 },
  { slug: "05-fifty-year-horizon", module: 2, lesson: 5, title: "Short-term survival vs a 50-year horizon", mod: L05 },
  { slug: "06-honest-odds-vision", module: 2, lesson: 6, title: "Honest about the odds, driven by the vision", mod: L06 },
  { slug: "07-roots-go-deep", module: 3, lesson: 7, title: "Five years of no fruit: the roots go deep", mod: L07 },
  { slug: "08-waiting-not-idle", module: 3, lesson: 8, title: "Waiting is not idle: build the market underneath", mod: L08 },
  { slug: "09-the-canopy", module: 4, lesson: 9, title: "The canopy: when your vision outgrows you", mod: L09 },
  { slug: "10-destiny-helpers", module: 4, lesson: 10, title: "Destiny helpers: people show up for the resolute", mod: L10 },
  { slug: "11-engage-dont-retreat", module: 4, lesson: 11, title: "Engage, don't retreat", mod: L11 },
  { slug: "12-long-harvest", module: 5, lesson: 12, title: "Seventy years of fruit: inherit and leave a harvest", mod: L12 },
  { slug: "13-shape-the-future", module: 5, lesson: 13, title: "Builders shape the Nigeria of the future", mod: L13 },
  { slug: "14-the-charge", module: 5, lesson: 14, title: "The charge: plant trees you may never sit under", mod: L14 },
];

export const AFFIONG_LESSONS: Lesson[] = ROWS.map((r) => ({
  id: `aw-${r.slug}`,
  module: r.module,
  lesson: r.lesson,
  title: r.title,
  videoSrc: `tp-${`aw-${r.slug}`}.mp4`,
  videoKey: `${KEY_PREFIX}/m${r.module}-l${r.lesson}-${r.slug.replace(/^\d+-/, "")}.mp4`,
  totalFrames: r.mod.TOTAL_FRAMES,
  component: make(r.mod.content),
}));
