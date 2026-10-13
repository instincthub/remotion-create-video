/**
 * VSL kit: one config drives the 16:9 master and the 9:16 cut.
 *
 * Every time is an absolute second in the master and should start and end on a
 * caption boundary of the voice-over (captions.ts, built by the vsl-video skill's
 * build_captions.py). `src` paths are relative to the episode's public dir.
 */
export type Shot = {
  /** film: Flow scene, graded + letterboxed. product: real screen in a framed card. logo: full-frame brand clip. */
  kind: "film" | "product" | "logo";
  start: number;
  end: number;
  src: string;
  /** second of the clip to start reading from */
  from?: number;
  /** seconds of source to spread over the shot (sets the playback rate) */
  span?: number;
  /** product shots: "01  Capture" (number, two spaces, name) */
  chapter?: string;
};

export type CaptionCard = { start: number; end: number; text: string; words: { t: number; w: string }[] };

export type Theme = {
  accent: string;
  accentDark: string;
  accentLight: string;
  /** pill colour for the yearly saving and other call-outs */
  highlight: string;
  bg: string;
  bgDark: string;
  white: string;
  muted: string;
};

export type Clip = { src: string; from?: number; rate?: number };

/** One big number that counts up: "7x more likely ...". */
export type StatCard = {
  start: number;
  end: number;
  countAt: number;
  value: number;
  countFrom?: number;
  prefix?: string;
  suffix?: string;
  kicker: string;
  line: string;
  source?: string;
  /** blurred clip behind the number */
  bg: Clip;
};

export type CountItem = { at: number; value: number; prefix?: string; suffix?: string; label: string };

/** Proof numbers over a film shot; `finale` replaces the row with one big number. */
export type ProofCard = {
  start: number;
  end: number;
  kicker: string;
  kickerVertical?: string;
  items: CountItem[];
  finale?: CountItem & { sub?: string };
};

export type PriceTier = {
  at: number;
  name: string;
  price: string;
  unit: string;
  unitShort?: string;
  blurb: string;
  blurbShort?: string;
  /** the recommended tier: filled with the accent */
  hi?: boolean;
  features?: string[];
  featuresAt?: number;
};

export type PricingCard = {
  start: number;
  end: number;
  kicker: string;
  /** looping brand background, 16:9 and 9:16; omit it for the theme gradient */
  bg?: { h: string; v: string };
  tiers: PriceTier[];
  footer?: { at: number; text: string };
};

export type OfferCard = { start: number; end: number; title: string; items: { at: number; text: string }[] };

export type Focus = { x: number; y: number; zoom?: number };

export type VslConfig = {
  theme: Theme;
  /** white-on-transparent logo in the public dir */
  logo: string;
  shots: Shot[];
  captions: CaptionCard[];
  stat?: StatCard;
  proof?: ProofCard;
  pricing?: PricingCard;
  offer?: OfferCard;
  lowerThird: { start: number; end: number; line1: string; line2: string };
  endCard: {
    start: number;
    end: number;
    line1: string;
    /** 9:16 version of line1, may contain "\n" */
    line1Vertical?: string;
    line2: string;
    /** e.g. "Booking link in the description" (16:9) / "... in the caption" (9:16) */
    line3?: string;
    line3Vertical?: string;
    tagline?: string;
  };
  vertical?: {
    /** desktop recordings: the 1920x1080 source point to centre, and how many window-widths to zoom */
    focus?: Record<string, Focus>;
    defaultFocus?: Focus;
    /** 16:9 src -> its own 9:16 version (phone recordings, logo reveals) */
    native?: Record<string, string>;
  };
};
