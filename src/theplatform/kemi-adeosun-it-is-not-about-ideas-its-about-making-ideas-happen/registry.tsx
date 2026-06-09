import { Talk, type TalkProps } from "../_shared/Talk";
import type { TalkContent } from "../_shared/types";

// The 12 lesson data files. Each exports `content` + `TOTAL_FRAMES`.
import * as L01 from "./01-next-bounce/timing";
import * as L02 from "./02-nine-businesses/timing";
import * as L03 from "./03-not-a-market-exemption/timing";
import * as L04 from "./04-know-your-market/timing";
import * as L05 from "./05-not-forced/timing";
import * as L06 from "./06-five-numbers/timing";
import * as L07 from "./07-research-skepticism/timing";
import * as L08 from "./08-dont-compete-on-price/timing";
import * as L09 from "./09-timing-incubate/timing";
import * as L10 from "./10-build-your-team/timing";
import * as L11 from "./11-discipline-outsource/timing";
import * as L12 from "./12-no-capital-myth/timing";

/** One course lesson: a Remotion composition + its InstinctHub course metadata. */
export type Lesson = {
  id: string;
  module: number;
  lesson: number;
  title: string;
  videoSrc: string;
  videoKey: string;
  totalFrames: number;
  component: React.FC<Pick<TalkProps, "videoSrc" | "logoSrc">>;
};

/**
 * Thin Talk wrapper bound to one lesson's content. The logo bug is disabled for
 * this course: the venue stage screens already carry "the platform nigeria" in
 * frame, so a top-right bug would collide with it.
 */
const make =
  (content: TalkContent): Lesson["component"] =>
  ({ videoSrc, logoSrc }) =>
    <Talk videoSrc={videoSrc} logoSrc={logoSrc} content={content} showLogo={false} />;

const KEY_PREFIX = "instincthub/uploads/kemi-adeosun-great-idea";

type Row = {
  slug: string;
  module: number;
  lesson: number;
  title: string;
  mod: { content: TalkContent; TOTAL_FRAMES: number };
};

const ROWS: Row[] = [
  { slug: "01-next-bounce", module: 1, lesson: 1, title: "The next bounce of the ball", mod: L01 },
  { slug: "02-nine-businesses", module: 1, lesson: 2, title: "Nine businesses, six failures", mod: L02 },
  { slug: "03-not-a-market-exemption", module: 1, lesson: 3, title: "A God idea is not a market exemption", mod: L03 },
  { slug: "04-know-your-market", module: 2, lesson: 4, title: "Law 1: Know your market", mod: L04 },
  { slug: "05-not-forced", module: 2, lesson: 5, title: "Don't be forced into entrepreneurship", mod: L05 },
  { slug: "06-five-numbers", module: 2, lesson: 6, title: "Law 2: The five numbers you must know", mod: L06 },
  { slug: "07-research-skepticism", module: 3, lesson: 7, title: "Research with skepticism: the wine seller", mod: L07 },
  { slug: "08-dont-compete-on-price", module: 3, lesson: 8, title: "Don't compete on price; learn from doers", mod: L08 },
  { slug: "09-timing-incubate", module: 3, lesson: 9, title: "Law 3: Timing, incubate before you jump", mod: L09 },
  { slug: "10-build-your-team", module: 4, lesson: 10, title: "Law 4: Build your team and the talent gap", mod: L10 },
  { slug: "11-discipline-outsource", module: 4, lesson: 11, title: "Discipline and knowing when to outsource", mod: L11 },
  { slug: "12-no-capital-myth", module: 4, lesson: 12, title: "The reality check and the no-capital myth", mod: L12 },
];

export const KEMI_LESSONS: Lesson[] = ROWS.map((r) => ({
  id: `ka-${r.slug}`,
  module: r.module,
  lesson: r.lesson,
  title: r.title,
  videoSrc: `tp-ka-${r.slug}.mp4`,
  videoKey: `${KEY_PREFIX}/m${r.module}-l${r.lesson}-${r.slug.replace(/^\d+-/, "")}.mp4`,
  totalFrames: r.mod.TOTAL_FRAMES,
  component: make(r.mod.content),
}));
