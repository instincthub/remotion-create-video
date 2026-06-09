import { Talk, type TalkProps } from "../_shared/Talk";
import type { TalkContent } from "../_shared/types";

// The 13 lesson data files. Each exports `content` + `TOTAL_FRAMES`.
import * as L01 from "./01-starting-point/timing";
import * as L02 from "./02-start-with-what-you-have/timing";
import * as L03 from "./03-resilience-beats-ideas/timing";
import * as L04 from "./04-destiny-helpers/timing";
import * as L05 from "./05-ideas-are-living/timing";
import * as L06 from "./06-audacity-factory/timing";
import * as L07 from "./07-founder-not-ceo/timing";
import * as L08 from "./08-founders-instinct/timing";
import * as L09 from "./09-no-work-life-balance/timing";
import * as L10 from "./10-staff-will-humble-you/timing";
import * as L11 from "./11-protect-your-idea/timing";
import * as L12 from "./12-learn-from-asia/timing";
import * as L13 from "./13-test-and-put-god-first/timing";

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
 * disabled for this course: the venue stage feed already carries "the platform
 * nigeria" branding in-frame, so a top-right bug would collide with it.
 */
const make =
  (content: TalkContent): Lesson["component"] =>
  ({ videoSrc, logoSrc }) =>
    <Talk videoSrc={videoSrc} logoSrc={logoSrc} content={content} showLogo={false} />;

const KEY_PREFIX = "instincthub/uploads/john-alamu-making-ideas-happen";

type Row = {
  slug: string;
  module: number;
  lesson: number;
  title: string;
  mod: { content: TalkContent; TOTAL_FRAMES: number };
};

const ROWS: Row[] = [
  { slug: "01-starting-point", module: 1, lesson: 1, title: "Your starting point is not your limit", mod: L01 },
  { slug: "02-start-with-what-you-have", module: 1, lesson: 2, title: "Start with what you have", mod: L02 },
  { slug: "03-resilience-beats-ideas", module: 1, lesson: 3, title: "Resilience beats ideas", mod: L03 },
  { slug: "04-destiny-helpers", module: 2, lesson: 4, title: "Honour your destiny helpers", mod: L04 },
  { slug: "05-ideas-are-living", module: 2, lesson: 5, title: "Ideas are living entities", mod: L05 },
  { slug: "06-audacity-factory", module: 2, lesson: 6, title: "Audacity built a factory", mod: L06 },
  { slug: "07-founder-not-ceo", module: 3, lesson: 7, title: "Founder is not always CEO", mod: L07 },
  { slug: "08-founders-instinct", module: 3, lesson: 8, title: "Trust your founder's instinct", mod: L08 },
  { slug: "09-no-work-life-balance", module: 3, lesson: 9, title: "There is no work-life balance", mod: L09 },
  { slug: "10-staff-will-humble-you", module: 4, lesson: 10, title: "Your staff will humble you", mod: L10 },
  { slug: "11-protect-your-idea", module: 4, lesson: 11, title: "Protect your idea from the wolves", mod: L11 },
  { slug: "12-learn-from-asia", module: 5, lesson: 12, title: "Learn from Asia, choose quality", mod: L12 },
  { slug: "13-test-and-put-god-first", module: 5, lesson: 13, title: "Test your idea, then put God first", mod: L13 },
];

export const JOHN_ALAMU_LESSONS: Lesson[] = ROWS.map((r) => ({
  id: `ja-${r.slug}`,
  module: r.module,
  lesson: r.lesson,
  title: r.title,
  videoSrc: `tp-ja-${r.slug}.mp4`,
  videoKey: `${KEY_PREFIX}/m${r.module}-l${r.lesson}-${r.slug.replace(/^\d+-/, "")}.mp4`,
  totalFrames: r.mod.TOTAL_FRAMES,
  component: make(r.mod.content),
}));
