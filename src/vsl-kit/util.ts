import { CaptionCard, Shot } from "./types";

export const FPS = 30;
export const fr = (s: number) => Math.round(s * FPS);
export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const rateOf = (s: Shot) => (s.span ?? s.end - s.start) / (s.end - s.start);
export const fmt = (n: number) => Math.round(n).toLocaleString("en-US");

/** The caption card on screen at `t`, and the index of the word being said. */
export const activeCaption = (cards: CaptionCard[], t: number) => {
  const card = cards.find((c) => t >= c.start && t < c.end);
  if (!card) return null;
  let active = -1;
  card.words.forEach((w, i) => {
    if (t >= w.t - 0.04) active = i;
  });
  return { card, active };
};

/** First product shot of a chapter animates its chapter tag in. */
export const firstOfChapter = (shots: Shot[], i: number) =>
  shots[i].kind === "product" && (i === 0 || shots[i - 1].chapter !== shots[i].chapter);

export const within = (t: number, w?: { start: number; end: number }) => !!w && t >= w.start && t < w.end;
