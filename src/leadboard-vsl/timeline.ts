/**
 * Leadboard VSL (episode 0007): the edit decision list.
 *
 * Every beat starts and ends on a caption boundary of the voice-over
 * (`captions.ts`, built from the ElevenLabs alignment, VO offset 0.8 s).
 * Times are absolute seconds in the master. `from` is where the clip is read.
 *
 * kinds:
 *  - film:    Google Flow cinematic scene, graded, letterboxed 2.39:1, grain
 *  - product: real Leadboard screen in a framed card, slow push-in, chapter tag
 *  - logo:    the brand logo reveal, full frame
 */
export type Shot = {
  kind: "film" | "product" | "logo";
  start: number;
  end: number;
  src: string;
  from?: number;
  /** playback rate; computed from span when `span` is given */
  span?: number;
  chapter?: string;
};

const f = (id: string) => `flow/${id}.mp4`;
const w = (name: string) => `web/${name}.mp4`;

export const SHOTS: Shot[] = [
  // 1 HOOK
  { kind: "film", start: 0, end: 5.2, src: f("b578b7d9"), from: 0 },
  { kind: "film", start: 5.2, end: 9.99, src: f("0cd9e079"), from: 2.0 },
  { kind: "film", start: 9.99, end: 16.56, src: f("d923abcd"), from: 0.3 },
  // 2 THE PROBLEM
  { kind: "film", start: 16.56, end: 20.56, src: f("e3ebc56d"), from: 0 },
  { kind: "film", start: 20.56, end: 22.76, src: f("e66f551f"), from: 1.0 },
  { kind: "film", start: 22.76, end: 25.16, src: f("f47bf813"), from: 2.0 },
  { kind: "film", start: 25.16, end: 27.4, src: f("a5300226"), from: 1.0 },
  { kind: "film", start: 27.4, end: 29.76, src: f("de99cae4"), from: 3.0 },
  { kind: "film", start: 29.76, end: 32.08, src: f("681151b4"), from: 0, span: 2.15 },
  { kind: "film", start: 32.08, end: 35.16, src: f("1adb7f0b"), from: 0, span: 2.4 },
  { kind: "film", start: 35.16, end: 38.94, src: f("ecfb0b9b"), from: 1.5 },
  // 38.94 - 48.76 is the 7x stat card (Stat in Vsl.tsx)
  { kind: "film", start: 48.76, end: 51.6, src: f("de99cae4"), from: 4.6 },
  // THE TURN
  { kind: "film", start: 51.6, end: 55.1, src: f("bb041ea0"), from: 0 },
  { kind: "film", start: 55.1, end: 58.6, src: f("18aa6ba1"), from: 2.0 },
  { kind: "logo", start: 58.6, end: 62.64, src: w("lb-16x9-brand-logo-reveal-dark"), from: 0 },
  // 3 WHAT WE DO FOR YOU
  { kind: "product", chapter: "01  Capture", start: 62.64, end: 67.66, src: w("lb-16x9-web-one-link-everywhere-1-lbc05"), from: 2.2 },
  { kind: "product", chapter: "01  Capture", start: 67.66, end: 72.12, src: w("lb-16x9-web-event-sign-ups-land-on-the-event-lbc06"), from: 0, span: 6.6 },
  { kind: "product", chapter: "02  Clean", start: 72.12, end: 76.24, src: w("lb-16x9-web-four-ways-to-be-the-same-person-1-lbd05b"), from: 0 },
  { kind: "product", chapter: "02  Clean", start: 76.24, end: 82.2, src: w("lb-16x9-web-merge-or-dismiss-1-lbc08"), from: 0 },
  { kind: "product", chapter: "03  Follow up", start: 82.2, end: 86.56, src: w("lb-16x9-web-one-owner-each-1-lbc11"), from: 0 },
  { kind: "product", chapter: "03  Follow up", start: 86.56, end: 90.64, src: w("lb-16x9-web-saved-on-the-deal-lbc14"), from: 0 },
  { kind: "product", chapter: "03  Follow up", start: 90.64, end: 93.44, src: w("lb-16x9-mobile-note-on-deal-sim"), from: 4.0 },
  { kind: "product", chapter: "04  Close", start: 93.44, end: 98.72, src: w("lb-16x9-web-drag-deal-between-stages-lb0002"), from: 0 },
  { kind: "product", chapter: "04  Close", start: 98.72, end: 101.2, src: w("lb-16x9-web-make-it-concrete-1-lbc18"), from: 3.0 },
  { kind: "product", chapter: "04  Close", start: 101.2, end: 104.08, src: w("lb-16x9-web-close-it-honestly-lbc17"), from: 2.0 },
  { kind: "product", chapter: "05  Run it from AI", start: 104.08, end: 110.0, src: w("lb-16x9-ai-chatgpt-runs-the-crm-mcpgpt"), from: 0 },
  { kind: "product", chapter: "05  Run it from AI", start: 110.0, end: 115.12, src: w("lb-16x9-ai-chatgpt-reads-the-pipeline-mcpgpt"), from: 1.0 },
  // 4 PROOF
  { kind: "film", start: 115.12, end: 118.4, src: f("7f705125"), from: 3.2 },
  // 118.40 - 128.43 proof numbers over the hall (ProofNumbers)
  { kind: "film", start: 118.4, end: 128.43, src: f("e66f551f"), from: 0, span: 7.9 },
  { kind: "film", start: 128.43, end: 132.15, src: f("4c820c62"), from: 3.4 },
  // 5 PRICE 132.15 - 156.54 on the brand background (Pricing)
  // 6 THE OFFER
  { kind: "film", start: 156.54, end: 162.93, src: f("0f1535cc"), from: 0.5 },
  { kind: "film", start: 162.93, end: 165.5, src: f("7f705125"), from: 0 },
  { kind: "film", start: 165.5, end: 168.48, src: f("4c820c62"), from: 0.2 },
  // 7 CTA
  { kind: "film", start: 168.48, end: 175.84, src: f("9d730545"), from: 0.3 },
];

export const STAT = { start: 38.94, end: 48.76, countAt: 43.3 };
export const PROOF = {
  start: 118.4,
  end: 132.15,
  items: [
    { at: 121.28, value: 11000, suffix: "+", label: "deals run" },
    { at: 123.68, value: 6000, suffix: "+", label: "follow-up emails sent" },
    { at: 126.52, value: 2000, prefix: "~", label: "duplicate pairs cleaned" },
  ],
  church: { at: 130.08, value: 1000, suffix: "+", label: "event registrations, one church programme" },
};
export const PRICING = {
  start: 132.15,
  end: 156.54,
  free: 134.0,
  starter: 138.4,
  growth: 144.48,
  growthFeatures: 148.48,
  yearly: 154.0,
};
export const OFFER_LIST = {
  start: 162.93,
  end: 168.48,
  items: [
    { at: 162.93, text: "Bring in your first list" },
    { at: 164.52, text: "Clean it" },
    { at: 165.2, text: "Set up your pipeline" },
    { at: 166.36, text: "Show your team how to follow up" },
  ],
};
export const LOWER_THIRD = { start: 168.48, end: 175.84 };
export const END_CARD = { start: 175.84, end: 182.0 };
export const TOTAL_SEC = END_CARD.end;
