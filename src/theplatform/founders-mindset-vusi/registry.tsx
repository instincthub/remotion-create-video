import { Talk, type TalkProps } from "../_shared/Talk";
import type { TalkContent } from "../_shared/types";

// The 11 lesson data files. Each exports `content` + `TOTAL_FRAMES`.
import * as L01 from "./01-earn-the-right/timing";
import * as L02 from "./02-what-founders-knew/timing";
import * as L03 from "./03-the-founders-mindset/timing";
import * as L04 from "./04-capital-isnt-the-problem/timing";
import * as L05 from "./05-trillion-dollar-context/timing";
import * as L06 from "./06-play-your-game/timing";
import * as L07 from "./07-four-things-to-scale/timing";
import * as L08 from "./08-aligning-incentives/timing";
import * as L09 from "./09-levels-of-entrepreneurship/timing";
import * as L10 from "./10-valley-of-scale/timing";
import * as L11 from "./11-how-to-be-a-founder/timing";

/** One course lesson: a Remotion composition + its InstinctHub course metadata. */
export type Lesson = {
  /** Remotion composition id (also the Studio label). */
  id: string;
  /** Module number (1-based) and lesson number within the course. */
  module: number;
  lesson: number;
  /** Human title for the course tree. */
  title: string;
  /** Footage clip in public/ (produced by trim-clips.sh). */
  videoSrc: string;
  /** S3 object key handed to the course-creation agent's `video` block. */
  videoKey: string;
  totalFrames: number;
  component: React.FC<Pick<TalkProps, "videoSrc" | "logoSrc">>;
};

/**
 * Build a thin Talk wrapper bound to one lesson's content. The logo bug is
 * disabled for this course — the venue stage screens already carry "the
 * platform" branding in-frame, so a top-right bug would collide with it.
 */
const make =
  (content: TalkContent): Lesson["component"] =>
  ({ videoSrc, logoSrc }) =>
    <Talk videoSrc={videoSrc} logoSrc={logoSrc} content={content} showLogo={false} />;

const KEY_PREFIX = "instincthub/uploads/founders-mindset-vusi";

type Row = {
  slug: string;
  module: number;
  lesson: number;
  title: string;
  mod: { content: TalkContent; TOTAL_FRAMES: number };
};

const ROWS: Row[] = [
  { slug: "01-earn-the-right", module: 1, lesson: 1, title: "Earn the right to be offended", mod: L01 },
  { slug: "02-what-founders-knew", module: 1, lesson: 2, title: "What successful founders knew", mod: L02 },
  { slug: "03-the-founders-mindset", module: 1, lesson: 3, title: "The Founder's Mindset", mod: L03 },
  { slug: "04-capital-isnt-the-problem", module: 2, lesson: 4, title: "Capital isn't the problem — you are", mod: L04 },
  { slug: "05-trillion-dollar-context", module: 2, lesson: 5, title: "A trillion-dollar context", mod: L05 },
  { slug: "06-play-your-game", module: 2, lesson: 6, title: "Play the game you're gifted", mod: L06 },
  { slug: "07-four-things-to-scale", module: 3, lesson: 7, title: "The four things you need to scale", mod: L07 },
  { slug: "08-aligning-incentives", module: 3, lesson: 8, title: "Aligning incentives", mod: L08 },
  { slug: "09-levels-of-entrepreneurship", module: 3, lesson: 9, title: "The levels of entrepreneurship", mod: L09 },
  { slug: "10-valley-of-scale", module: 4, lesson: 10, title: "The valley where scale goes to die", mod: L10 },
  { slug: "11-how-to-be-a-founder", module: 4, lesson: 11, title: "How to be a founder", mod: L11 },
];

export const PLATFORM_LESSONS: Lesson[] = ROWS.map((r) => ({
  id: `fm-${r.slug}`,
  module: r.module,
  lesson: r.lesson,
  title: r.title,
  videoSrc: `tp-fm-${r.slug}.mp4`,
  videoKey: `${KEY_PREFIX}/m${r.module}-l${r.lesson}-${r.slug.replace(/^\d+-/, "")}.mp4`,
  totalFrames: r.mod.TOTAL_FRAMES,
  component: make(r.mod.content),
}));
