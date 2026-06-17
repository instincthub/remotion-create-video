import { colors } from "./colors";
import { montserrat } from "./fonts";

/**
 * Course line-illustration registry, keyed by `CutawayContent.key`.
 *
 * Shared visual language: 5px rounded line art in white / tiffany on the deep
 * ink page, with ONE Caribbean-green spark per scene (the brand success token —
 * green marks the payoff). Each receives:
 *   p — entrance progress 0→1 (drives draw-on + pop-in)
 *   t — local frame (drives a gentle ambient float)
 * One family, business-course props: idea, funnel, growth, target, network, deal.
 */

export type IlluProps = { p: number; t: number };

const clamp = (x: number, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, x));
/** Sub-range of p, remapped to 0→1 (for staggered draw-on). */
const seg = (p: number, from: number, to: number) => clamp((p - from) / (to - from));

const VIEW = "0 0 720 440";
const DASH = 1900;

const stroke = (color: string, w = 5) =>
  ({
    fill: "none",
    stroke: color,
    strokeWidth: w,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  }) as const;

const drawn = (prog: number) => ({
  strokeDasharray: DASH,
  strokeDashoffset: DASH * (1 - prog),
});

const Label: React.FC<{ x: number; y: number; text: string; show: number; color?: string }> = ({
  x,
  y,
  text,
  show,
  color = colors.tiffany,
}) => (
  <text
    x={x}
    y={y}
    fill={color}
    fontFamily={montserrat}
    fontSize="20"
    fontWeight={700}
    letterSpacing="2"
    textAnchor="middle"
    opacity={clamp(show)}
  >
    {text}
  </text>
);

// 1 — IDEA: a big lightbulb draws on, then the filament + rays spark green.
const Idea: React.FC<IlluProps> = ({ p, t }) => {
  const float = Math.sin(t / 22) * 6;
  const ray = (a: number) => {
    const r1 = 150;
    const r2 = 184;
    const rad = (a * Math.PI) / 180;
    return {
      x1: 360 + Math.cos(rad) * r1,
      y1: 150 + Math.sin(rad) * r1,
      x2: 360 + Math.cos(rad) * r2,
      y2: 150 + Math.sin(rad) * r2,
    };
  };
  const raysShow = seg(p, 0.6, 1);
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <g transform={`translate(0 ${float})`}>
        {[-60, -35, -10, 190, 215, 240].map((a, i) => {
          const r = ray(a);
          return (
            <line
              key={i}
              x1={r.x1}
              y1={r.y1}
              x2={r.x2}
              y2={r.y2}
              {...stroke(colors.green, 5)}
              opacity={raysShow}
            />
          );
        })}
        {/* glass */}
        <path
          d="M360 40 a86 86 0 0 1 52 154 c-9 7 -14 16 -14 28 h-76 c0 -12 -5 -21 -14 -28 A86 86 0 0 1 360 40Z"
          {...stroke(colors.white)}
          style={drawn(seg(p, 0, 0.6))}
        />
        {/* base */}
        <path d="M328 232 h64 M336 258 h48 M344 282 h32" {...stroke(colors.white)} style={drawn(seg(p, 0.4, 0.8))} />
        {/* filament */}
        <path d="M338 150 l22 -34 l22 34" {...stroke(colors.green)} style={drawn(seg(p, 0.55, 1))} />
      </g>
      <Label x={360} y={372} text="THE IDEA" show={seg(p, 0.8, 1)} />
    </svg>
  );
};

// 2 — FUNNEL: a marketing funnel draws on; leads drop through and the
// converted drop at the bottom sparks green.
const Funnel: React.FC<IlluProps> = ({ p, t }) => {
  const drip = (t / 2) % 60;
  const dropY = 270 + drip * 1.6;
  const dropShow = seg(p, 0.85, 1) * (dropY < 352 ? 1 : 0);
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      {/* incoming leads (dots above the funnel) */}
      {[
        [250, 36],
        [330, 22],
        [410, 30],
        [470, 44],
      ].map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y + Math.sin((t + i * 14) / 18) * 5}
          r="9"
          {...stroke(colors.tiffany, 4)}
          opacity={seg(p, 0.5, 0.85)}
        />
      ))}
      {/* funnel body */}
      <path
        d="M200 80 H520 L420 230 V300 H300 V230 Z"
        {...stroke(colors.white)}
        style={drawn(seg(p, 0, 0.55))}
      />
      {/* stage lines */}
      <path d="M236 134 H484 M268 182 H452" {...stroke(colors.tiffany, 4)} style={drawn(seg(p, 0.35, 0.7))} />
      {/* the converted drop — the green payoff */}
      <circle cx="360" cy={dropY} r="11" fill={colors.green} opacity={dropShow} />
      <path d="M330 352 h60" {...stroke(colors.green, 5)} style={drawn(seg(p, 0.7, 1))} />
      <Label x={360} y={398} text="THE FUNNEL" show={seg(p, 0.8, 1)} />
    </svg>
  );
};

// 3 — GROWTH: axes + a rising revenue line; the final surge tip sparks green.
const Growth: React.FC<IlluProps> = ({ p, t }) => {
  const pulse = 1 + Math.sin(t / 14) * 0.12;
  const tipShow = seg(p, 0.85, 1);
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      {/* axes */}
      <path d="M120 60 V340 H620" {...stroke(colors.white)} style={drawn(seg(p, 0, 0.35))} />
      {/* gridline ticks */}
      <path d="M112 130 h8 M112 200 h8 M112 270 h8 M210 340 v8 M330 340 v8 M450 340 v8 M570 340 v8" {...stroke(colors.textMuted, 3)} style={drawn(seg(p, 0.2, 0.5))} />
      {/* baseline performance */}
      <path
        d="M120 312 C 220 300, 290 296, 360 268"
        {...stroke(colors.tiffany, 4)}
        style={drawn(seg(p, 0.3, 0.6))}
        opacity={0.8}
      />
      {/* growth line */}
      <path
        d="M120 312 C 230 296, 330 270, 400 220 C 460 178, 520 130, 586 92"
        {...stroke(colors.white)}
        style={drawn(seg(p, 0.35, 0.9))}
      />
      {/* arrowhead + green tip */}
      <path d="M560 86 l26 6 -12 24" {...stroke(colors.white)} style={drawn(seg(p, 0.85, 1))} />
      <circle cx="586" cy="92" r={10 * pulse} fill={colors.green} opacity={tipShow} />
      <Label x={370} y={398} text="GROWTH" show={seg(p, 0.8, 1)} />
    </svg>
  );
};

// 4 — TARGET: concentric rings draw on; the arrow lands and the bullseye
// sparks green.
const Target: React.FC<IlluProps> = ({ p, t }) => {
  const float = Math.sin(t / 24) * 5;
  const arrowP = seg(p, 0.55, 0.85);
  const ax = 360 + (1 - arrowP) * 260;
  const ay = 190 - (1 - arrowP) * 150;
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <g transform={`translate(0 ${float})`}>
        <circle cx="360" cy="190" r="140" {...stroke(colors.white)} style={drawn(seg(p, 0, 0.4))} />
        <circle cx="360" cy="190" r="95" {...stroke(colors.tiffany, 4)} style={drawn(seg(p, 0.15, 0.55))} />
        <circle cx="360" cy="190" r="50" {...stroke(colors.white)} style={drawn(seg(p, 0.3, 0.7))} />
        {/* bullseye — green once the arrow lands */}
        <circle cx="360" cy="190" r="16" fill={colors.green} opacity={seg(p, 0.82, 1)} />
        {/* arrow */}
        <g opacity={seg(p, 0.55, 0.7)}>
          <path d={`M${ax} ${ay} l-34 22`} {...stroke(colors.white)} />
          <path
            d={`M${ax - 34} ${ay + 22} l12 -2 M${ax - 34} ${ay + 22} l4 -12`}
            {...stroke(colors.white, 4)}
          />
          {/* fletching */}
          <path
            d={`M${ax} ${ay} l14 -9 m-14 9 l4 -16`}
            {...stroke(colors.tiffany, 4)}
          />
        </g>
      </g>
      <Label x={360} y={398} text="THE RIGHT CUSTOMER" show={seg(p, 0.8, 1)} />
    </svg>
  );
};

// 5 — NETWORK: nodes connect into a referral web; the centre node sparks green.
const Network: React.FC<IlluProps> = ({ p, t }) => {
  const nodes: Array<[number, number]> = [
    [360, 190], // centre
    [200, 90],
    [520, 100],
    [580, 250],
    [430, 330],
    [230, 310],
    [140, 200],
  ];
  const pulse = 1 + Math.sin(t / 14) * 0.12;
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      {/* edges from centre */}
      {nodes.slice(1).map(([x, y], i) => (
        <line
          key={i}
          x1={360}
          y1={190}
          x2={x}
          y2={y}
          {...stroke(colors.tiffany, 4)}
          style={drawn(seg(p, 0.1 + i * 0.08, 0.5 + i * 0.08))}
          opacity={0.8}
        />
      ))}
      {/* outer ring edges */}
      <path
        d="M200 90 L520 100 M580 250 L430 330 M230 310 L140 200"
        {...stroke(colors.textMuted, 3)}
        style={drawn(seg(p, 0.5, 0.85))}
        opacity={0.6}
      />
      {/* outer nodes */}
      {nodes.slice(1).map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y + Math.sin((t + i * 16) / 20) * 4}
          r="17"
          {...stroke(colors.white)}
          style={drawn(seg(p, 0.2 + i * 0.06, 0.6 + i * 0.06))}
        />
      ))}
      {/* centre node — the green spark */}
      <circle cx="360" cy="190" r={22 * pulse} fill={colors.green} opacity={seg(p, 0.75, 1)} />
      <circle cx="360" cy="190" r="30" {...stroke(colors.white)} style={drawn(seg(p, 0, 0.35))} />
      <Label x={360} y={398} text="WORD OF MOUTH" show={seg(p, 0.8, 1)} />
    </svg>
  );
};

// 6 — DEAL: two hands shake under a rising value arc; the agreement point
// sparks green.
const Deal: React.FC<IlluProps> = ({ p, t }) => {
  const float = Math.sin(t / 22) * 5;
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <g transform={`translate(0 ${float})`}>
        {/* value arc above the handshake */}
        <path
          d="M170 170 Q 360 40 550 170"
          {...stroke(colors.tiffany, 4)}
          style={drawn(seg(p, 0.5, 0.85))}
          opacity={0.8}
        />
        {/* left cuff + hand */}
        <path
          d="M120 250 h70 l60 -18 l70 36 l24 -10"
          {...stroke(colors.white)}
          style={drawn(seg(p, 0, 0.45))}
        />
        <path d="M120 222 v56" {...stroke(colors.white)} style={drawn(seg(p, 0.1, 0.4))} />
        {/* right cuff + hand */}
        <path
          d="M600 250 h-70 l-60 -18 l-70 36 l-24 -10"
          {...stroke(colors.white)}
          style={drawn(seg(p, 0.15, 0.6))}
        />
        <path d="M600 222 v56" {...stroke(colors.white)} style={drawn(seg(p, 0.25, 0.55))} />
        {/* clasp — the green agreement point */}
        <circle cx="360" cy="252" r="15" fill={colors.green} opacity={seg(p, 0.8, 1)} />
      </g>
      <Label x={360} y={372} text="CLOSE THE DEAL" show={seg(p, 0.8, 1)} />
    </svg>
  );
};

/** Registry consumed by `Cutaway` via `CutawayContent.key`. */
export const ILLUSTRATIONS: Record<string, React.FC<IlluProps>> = {
  idea: Idea,
  funnel: Funnel,
  growth: Growth,
  target: Target,
  network: Network,
  deal: Deal,
};
