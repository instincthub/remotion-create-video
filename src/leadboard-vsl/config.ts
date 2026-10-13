import { VslConfig } from "../vsl-kit";
import { CARDS } from "./captions";
import { END_CARD, LOWER_THIRD, OFFER_LIST, PRICING, PROOF, SHOTS, STAT } from "./timeline";

/** Leadboard VSL (episode 0007) on the VSL kit. Production notes: Palmier Pro/leadboard-crm/0007-leadboard-vsl/PRODUCTION.md */
export const config: VslConfig = {
  theme: {
    accent: "#009ba2",
    accentDark: "#00838f",
    accentLight: "#3fd0d6",
    highlight: "#f0b429",
    bg: "#2c333a",
    bgDark: "#171e24",
    white: "#ffffff",
    muted: "#9aa6b2",
  },
  logo: "leadboard-white.svg",
  shots: SHOTS,
  captions: CARDS,
  stat: {
    ...STAT,
    value: 7,
    suffix: "×",
    kicker: "Reply within an hour",
    line: "more likely to have a real conversation",
    source: 'Harvard Business Review, "The Short Life of Online Sales Leads", 2011',
    bg: { src: "flow/a5300226.mp4", from: 3, rate: 0.6 },
  },
  proof: {
    start: PROOF.start,
    end: PROOF.end,
    kicker: "One national summit team · last 90 days",
    kickerVertical: "One summit team · last 90 days",
    items: PROOF.items,
    finale: { at: PROOF.church.at, value: PROOF.church.value, suffix: PROOF.church.suffix, label: "event registrations", sub: "one church programme" },
  },
  pricing: {
    start: PRICING.start,
    end: PRICING.end,
    kicker: "What it costs, in naira",
    bg: { h: "web/lb-16x9-brand-background-loop-dark.mp4", v: "web9/lb-9x16-brand-background-loop-dark.mp4" },
    tiers: [
      { at: PRICING.free, name: "Free", price: "₦0", unit: "forever, for one person", unitShort: "one person", blurb: "No card required. Get organised on your own.", blurbShort: "No card required" },
      { at: PRICING.starter, name: "Starter", price: "₦8,000", unit: "per user a month", unitShort: "per user / month", blurb: "For small teams running a real pipeline.", blurbShort: "Small teams" },
      {
        at: PRICING.growth,
        name: "Growth",
        price: "₦18,500",
        unit: "per user a month",
        unitShort: "per user / month",
        blurb: "For growing teams that automate.",
        blurbShort: "Growing teams",
        hi: true,
        features: ["Automations", "8× the emails", "ChatGPT and Claude connectors"],
        featuresAt: PRICING.growthFeatures,
      },
    ],
    footer: { at: PRICING.yearly, text: "Pay yearly and save 19%" },
  },
  offer: { ...OFFER_LIST, title: "Your free onboarding call" },
  lowerThird: { ...LOWER_THIRD, line1: "Start free at leadboard.ng", line2: "and book your free onboarding call" },
  endCard: {
    ...END_CARD,
    line1: "Start free at leadboard.ng",
    line1Vertical: "Start free at\nleadboard.ng",
    line2: "Book your free onboarding call",
    // the booking form URL is too long to read off a video, so the end card points to the post copy
    line3: "Booking link in the description",
    line3Vertical: "Booking link in the caption",
    tagline: "From sign-up to closed deal, without the spreadsheet.",
  },
  vertical: {
    defaultFocus: { x: 980, y: 520, zoom: 1.5 },
    focus: {
      "web/lb-16x9-web-drag-deal-between-stages-lb0002.mp4": { x: 1000, y: 540, zoom: 1.35 },
      "web/lb-16x9-web-close-it-honestly-lbc17.mp4": { x: 1000, y: 540, zoom: 1.35 },
      "web/lb-16x9-ai-chatgpt-runs-the-crm-mcpgpt.mp4": { x: 1200, y: 460 },
      "web/lb-16x9-ai-chatgpt-reads-the-pipeline-mcpgpt.mp4": { x: 1200, y: 460 },
    },
    native: {
      "web/lb-16x9-mobile-note-on-deal-sim.mp4": "web9/lb-9x16-mobile-note-on-deal-sim.mp4",
      "web/lb-16x9-brand-logo-reveal-dark.mp4": "web9/lb-9x16-brand-logo-reveal-dark.mp4",
    },
  },
};
