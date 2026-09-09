// KCC-PROMO-01 "The Rummage Sale" — brand tokens and the shot list.
//
// Colours, fonts, belts and facts are shared with the jingle so the two pieces
// look like one library. Nothing here is invented: facts come from
// instincthub_nextjs/src/app/products/kidscancode/config.ts.
import React from "react";
import { colors } from "../_shared/colors";
import { montserrat, nunito } from "../_shared/fonts";
import { VO, TOTAL, TURN } from "./timeline";

export { colors, montserrat, nunito, VO, TOTAL, TURN };

export const FPS = 30;
export const sec = (s: number) => Math.round(s * FPS);

/** Facts from config.ts (read 2026-09-07). Nothing on screen may exceed this. */
export const FACTS = {
  students: 115,
  assessments: 1015,
  projects: 359,
  ages: "Ages 7–18",
  price: "35,000",  // rendered as "From <Naira/>35,000/month"
  url: "instincthub.com/products/kidscancode",
  whatsapp: "+234 816 288 0409",
  cohort: "Saturdays from 12 September 2026",
} as const;

/**
 * The 1968 sum in naira. $3,000 (1968) -> ~$28,786 (2026 CPI) at the CBN rate
 * of NGN1,320.25/$ on 2026-09-08. PROMO-SCRIPT.md §8 holds the sourcing and the
 * rebuild trigger; the narration says "close to forty million" because the
 * naira moves and the film does not.
 */
// `naira` is the DIGITS only: the sign itself is drawn by <Naira/> in bits.tsx.
export const SUM_1968 = { usd: "$3,000", usdYear: "1968", naira: "38,000,000" } as const;

export type Layout = "16x9" | "9x16" | "1x1";

export type LayoutSpec = {
  layout: Layout;
  W: number;
  H: number;
  portrait: boolean;
  /** Bands reserved for platform UI and burned captions. */
  safeTop: number;
  safeBottom: number;
  margin: number;
  /** Type scale relative to 16:9. */
  k: number;
  /**
   * Height reserved above safeBottom for BURNED captions. Zero on 16:9, which
   * ships the .srt instead. Cards and year tags add this to their offset so
   * they never sit under a caption line.
   */
  captionBand: number;
};

export const layoutSpec = (layout: Layout): LayoutSpec => {
  if (layout === "9x16") {
    return { layout, W: 1080, H: 1920, portrait: true, safeTop: 250, safeBottom: 320, margin: 80, k: 0.92, captionBand: 175 };
  }
  if (layout === "1x1") {
    return { layout, W: 1080, H: 1080, portrait: false, safeTop: 80, safeBottom: 200, margin: 80, k: 0.78, captionBand: 150 };
  }
  return { layout, W: 1920, H: 1080, portrait: false, safeTop: 60, safeBottom: 90, margin: 120, k: 1, captionBand: 0 };
};

export const LayoutContext = React.createContext<LayoutSpec>(layoutSpec("16x9"));
export const useLayout = () => React.useContext(LayoutContext);

/**
 * The shot list, in seconds. Cut against the MEASURED narration in timeline.ts
 * — the comments name the line each shot carries, so a re-recorded read shows
 * up here as an obvious mismatch rather than as silent drift.
 */
export const SHOTS = {
  // Act 1 — 1968. Designed typography only; no footage, and deliberately not
  // fake archive film of a real, living person (PROMO-SCRIPT §2).
  act1968: { from: 0, to: 31.0 },

  // Act 2 — the generated arc.
  age10a: { from: 31.0, to: 39.5 },   // line 09, "a ten-year-old ... makes no sense to him yet"
  age10b: { from: 39.5, to: 44.2 },   // line 10, "he isn't behind"
  age13: { from: 44.2, to: 48.3 },    // line 11, "three years"
  age16: { from: 48.3, to: 53.0 },    // line 12, "six years"
  adult: { from: 53.0, to: 61.41 },   // line 13 then line 14 over a fade to black

  // Act 3 — the real Lagos classroom. The hard cut lands on "But this has".
  realRoom: { from: 61.41, to: 65.5 },   // line 15
  stillGroup: { from: 65.5, to: 69.5 },  // line 16 + proof numbers
  realPython: { from: 69.5, to: 73.5 },  // line 16 tail
  stillPresent: { from: 73.5, to: 77.3 },// line 17 + ages/price
  realParents: { from: 77.3, to: 81.4 }, // line 18, the callback
  realAudience: { from: 81.4, to: 84.6 },// line 19

  // Act 4 — end card.
  endCard: { from: 84.6, to: TOTAL },
} as const;

/** The Dramatisation label: once, briefly, as the generated arc opens (§2). */
export const DRAMATISATION = { from: 31.4, to: 34.4 } as const;
