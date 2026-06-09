import { colors } from "../colors";
import { nunito, dmMono } from "../fonts";

/**
 * Eight full-frame cutaway illustrations, keyed by `Cutaway.key` in
 * timing.ts. Each receives:
 *   p — entrance progress 0→1 (drives draw-on + pop-in)
 *   t — local frame (drives ambient float / pulse)
 *
 * Shared visual language: 5px rounded line art in white/teal on Brand Dark,
 * elements drawing themselves on as the scene opens. One illustration family,
 * eight distinct props.
 */

type IlluProps = { p: number; t: number };

const clamp = (x: number, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, x));
/** Sub-range of p, remapped to 0→1 (for staggered draw-on). */
const seg = (p: number, from: number, to: number) =>
  clamp((p - from) / (to - from));

const VIEW = "0 0 720 440";
const DASH = 1400;

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

// 1 — THE SHIFT: an AI core connected to three facets of life.
const Changing: React.FC<IlluProps> = ({ p, t }) => {
  const fy = (ph: number) => Math.sin(t / 18 + ph) * 6;
  const teal = colors.tealLight;
  const sat = (
    x: number,
    y: number,
    ph: number,
    label: string,
    draw: number,
  ) => (
    <g transform={`translate(${x} ${y + fy(ph)})`} opacity={clamp(draw * 4)}>
      <circle cx="0" cy="0" r="52" {...stroke(colors.white)} />
      <text
        x="0"
        y="84"
        fill={colors.neutral200}
        fontFamily={dmMono}
        fontSize="20"
        textAnchor="middle"
        letterSpacing="1"
      >
        {label}
      </text>
    </g>
  );
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      {/* links */}
      <path d="M360 220 L170 120" {...stroke(`${teal}`, 3)} style={drawn(seg(p, 0, 0.5))} />
      <path d="M360 220 L550 120" {...stroke(`${teal}`, 3)} style={drawn(seg(p, 0.1, 0.6))} />
      <path d="M360 220 L360 360" {...stroke(`${teal}`, 3)} style={drawn(seg(p, 0.2, 0.7))} />
      {/* facets */}
      {sat(170, 120, 0, "LEARN", seg(p, 0.3, 0.6))}
      {sat(550, 120, 2, "WORK", seg(p, 0.4, 0.7))}
      {sat(360, 360, 4, "PARENT", seg(p, 0.5, 0.8))}
      {/* glyphs inside facets */}
      <g opacity={clamp(seg(p, 0.5, 0.8))}>
        <path d="M150 110 h40 M170 96 v40" {...stroke(teal, 4)} transform={`translate(0 ${fy(0)})`} />
        <circle cx="540" cy={120 + fy(2)} r="8" {...stroke(teal, 4)} />
        <circle cx="560" cy={120 + fy(2)} r="8" {...stroke(teal, 4)} />
        <path d="M345 355 l10 10 l20 -22" {...stroke(teal, 4)} transform={`translate(0 ${fy(4)})`} />
      </g>
      {/* core */}
      <g transform="translate(360 220)">
        <rect x="-58" y="-58" width="116" height="116" rx="26" {...stroke(teal, 6)} style={drawn(seg(p, 0, 0.45))} />
        <text x="0" y="14" fill={colors.white} fontFamily={nunito} fontWeight={700} fontSize="46" textAnchor="middle">
          AI
        </text>
      </g>
    </svg>
  );
};

// 2 — THE NEED: a child guided toward a north star.
const Guide: React.FC<IlluProps> = ({ p, t }) => {
  const twinkle = 0.55 + 0.45 * Math.abs(Math.sin(t / 14));
  const teal = colors.tealLight;
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      {/* north star */}
      <g transform="translate(560 80)" opacity={clamp(seg(p, 0, 0.4))}>
        <path
          d="M0 -34 L9 -9 L34 0 L9 9 L0 34 L-9 9 L-34 0 L-9 -9 Z"
          fill={teal}
          opacity={twinkle}
        />
      </g>
      {/* winding path */}
      <path
        d="M150 380 C 260 330, 230 230, 360 210 S 500 170, 540 110"
        {...stroke(`${colors.neutral400}`, 4)}
        strokeDasharray="2 16"
        style={drawn(seg(p, 0.1, 0.8))}
      />
      {/* guiding parent */}
      <g opacity={clamp(seg(p, 0.3, 0.6))}>
        <circle cx="200" cy="300" r="26" {...stroke(colors.white)} />
        <path d="M168 384 a32 32 0 0 1 64 0" {...stroke(colors.white)} />
      </g>
      {/* child */}
      <g opacity={clamp(seg(p, 0.45, 0.75))}>
        <circle cx="262" cy="330" r="18" {...stroke(teal)} />
        <path d="M240 392 a22 22 0 0 1 44 0" {...stroke(teal)} />
      </g>
    </svg>
  );
};

// 3 — TIP 1: a laptop the parent and child explore together.
const Together: React.FC<IlluProps> = ({ p, t }) => {
  const teal = colors.tealLight;
  const blink = 0.5 + 0.5 * Math.sin(t / 8);
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      {/* screen */}
      <rect x="232" y="70" width="256" height="170" rx="14" {...stroke(colors.white)} style={drawn(seg(p, 0, 0.4))} />
      {/* base */}
      <path d="M196 250 H524 L548 286 H172 Z" {...stroke(colors.white)} style={drawn(seg(p, 0.15, 0.55))} />
      {/* chat lines on screen */}
      <g opacity={clamp(seg(p, 0.4, 0.7))}>
        <rect x="256" y="100" width="120" height="22" rx="11" fill={`${teal}cc`} />
        <rect x="344" y="138" width="120" height="22" rx="11" {...stroke(`${colors.neutral400}`, 3)} />
        {/* lightbulb = brainstorm */}
        <circle cx="430" cy="118" r="14" {...stroke(colors.white, 4)} opacity={blink} />
        <path d="M424 134 h12" {...stroke(colors.white, 4)} />
      </g>
      {/* two heads peeking (parent + child) */}
      <g opacity={clamp(seg(p, 0.55, 0.85))}>
        <circle cx="300" cy="320" r="34" {...stroke(colors.white)} />
        <circle cx="392" cy="332" r="24" {...stroke(teal)} />
      </g>
    </svg>
  );
};

// 4 — TIP 2: questions routed to a person vs a bot.
const Route: React.FC<IlluProps> = ({ p }) => {
  const teal = colors.tealLight;
  const box = (
    x: number,
    label: string,
    accent: string,
    draw: number,
    glyph: React.ReactNode,
  ) => (
    <g opacity={clamp(draw * 3)}>
      <rect x={x} y="270" width="180" height="110" rx="18" {...stroke(accent)} />
      <g transform={`translate(${x + 90} 312)`}>{glyph}</g>
      <text
        x={x + 90}
        y="420"
        fill={colors.neutral200}
        fontFamily={dmMono}
        fontSize="22"
        textAnchor="middle"
        letterSpacing="2"
      >
        {label}
      </text>
    </g>
  );
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      {/* question node */}
      <circle cx="360" cy="80" r="46" {...stroke(colors.white)} style={drawn(seg(p, 0, 0.4))} />
      <text x="360" y="96" fill={colors.white} fontFamily={nunito} fontWeight={700} fontSize="48" textAnchor="middle">
        ?
      </text>
      {/* branches */}
      <path d="M335 116 L200 262" {...stroke(`${teal}`, 4)} style={drawn(seg(p, 0.2, 0.6))} />
      <path d="M385 116 L520 262" {...stroke(`${teal}`, 4)} style={drawn(seg(p, 0.3, 0.7))} />
      {/* person box (heart) */}
      {box(
        110,
        "A PERSON",
        colors.tealLight,
        seg(p, 0.5, 0.8),
        <path
          d="M0 14 C-20 -6 -34 -2 -34 -14 a14 14 0 0 1 34 -6 a14 14 0 0 1 34 6 c0 12 -14 8 -34 28 Z"
          fill={colors.tealLight}
          transform="scale(0.7)"
        />,
      )}
      {/* bot box (chip) */}
      {box(
        430,
        "A BOT",
        colors.neutral400,
        seg(p, 0.6, 0.9),
        <g {...stroke(colors.neutral200, 4)}>
          <rect x="-26" y="-22" width="52" height="44" rx="8" />
          <path d="M-12 -22 v-10 M12 -22 v-10 M-12 22 v10 M12 22 v10 M-26 -8 h-10 M-26 8 h-10 M26 -8 h10 M26 8 h10" />
        </g>,
      )}
    </svg>
  );
};

// 5 — TIP 3: a confident chatbot answer that is wrong.
const Wrong: React.FC<IlluProps> = ({ p, t }) => {
  const flip = clamp(seg(p, 0.55, 0.9));
  const wobble = Math.sin(t / 9) * 1.5;
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      {/* chat bubble */}
      <path
        d="M210 110 H510 a26 26 0 0 1 26 26 v120 a26 26 0 0 1 -26 26 H320 l-44 46 v-46 H210 a26 26 0 0 1 -26 -26 V136 a26 26 0 0 1 26 -26 Z"
        {...stroke(colors.white)}
        style={drawn(seg(p, 0, 0.5))}
      />
      <text
        x="360"
        y="212"
        fill={colors.white}
        fontFamily={nunito}
        fontWeight={700}
        fontSize="64"
        textAnchor="middle"
        opacity={clamp(seg(p, 0.4, 0.7))}
      >
        2 + 2 = 5
      </text>
      {/* confidence badge: check → cross */}
      <g transform={`translate(508 122) rotate(${wobble})`}>
        <circle cx="0" cy="0" r="34" fill={flip > 0.5 ? colors.error : colors.brandTeal} opacity={clamp(seg(p, 0.45, 0.7))} />
        {/* check (fades out) */}
        <path d="M-14 0 l8 9 l18 -19" {...stroke(colors.white, 5)} opacity={(1 - flip) * clamp(seg(p, 0.45, 0.7))} />
        {/* cross (fades in) */}
        <path d="M-12 -12 l24 24 M12 -12 l-24 24" {...stroke(colors.white, 5)} opacity={flip} />
      </g>
    </svg>
  );
};

// 6 — TIP 4: phone with parental controls and an age gate.
const Controls: React.FC<IlluProps> = ({ p }) => {
  const teal = colors.tealLight;
  const knob = (y: number, on: number) => (
    <g>
      <rect x="300" y={y} width="74" height="36" rx="18" {...stroke(colors.neutral400, 4)} />
      <circle cx={300 + 18 + on * 38} cy={y + 18} r="13" fill={on > 0.5 ? teal : colors.neutral400} />
    </g>
  );
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      {/* phone */}
      <rect x="262" y="50" width="196" height="350" rx="30" {...stroke(colors.white)} style={drawn(seg(p, 0, 0.5))} />
      <rect x="330" y="66" width="60" height="10" rx="5" fill={colors.neutral600} opacity={clamp(seg(p, 0.2, 0.4))} />
      {/* header */}
      <text x="360" y="130" fill={colors.tealLight} fontFamily={dmMono} fontSize="18" textAnchor="middle" letterSpacing="2" opacity={clamp(seg(p, 0.3, 0.6))}>
        CONTROLS
      </text>
      {/* toggle rows */}
      <g opacity={clamp(seg(p, 0.45, 0.75))}>
        {knob(168, clamp(seg(p, 0.6, 0.85)))}
        {knob(224, clamp(seg(p, 0.7, 0.95)))}
        <rect x="286" y="172" width="2" height="2" />
      </g>
      {/* age badge */}
      <g opacity={clamp(seg(p, 0.6, 0.9))} transform="translate(360 320)">
        <rect x="-52" y="-26" width="104" height="52" rx="26" fill={`${colors.brandTeal}`} />
        <text x="0" y="10" fill={colors.white} fontFamily={nunito} fontWeight={700} fontSize="30" textAnchor="middle">
          13+
        </text>
      </g>
    </svg>
  );
};

// 7 — TIP 5: a weekly conversation between parent and child.
const Checkin: React.FC<IlluProps> = ({ p, t }) => {
  const teal = colors.tealLight;
  const pop = (d: number) => 0.6 + 0.4 * clamp(seg(p, d, d + 0.25));
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      {/* parent bubble (left) */}
      <g opacity={clamp(seg(p, 0.1, 0.4) * 3)} transform={`scale(${pop(0.1)})`} style={{ transformOrigin: "250px 150px" }}>
        <path d="M150 90 H360 a22 22 0 0 1 22 22 v70 a22 22 0 0 1 -22 22 H230 l-34 34 v-34 H150 a22 22 0 0 1 -22 -22 v-70 a22 22 0 0 1 22 -22 Z" fill={`${colors.brandTeal}e6`} />
      </g>
      {/* child bubble (right) */}
      <g opacity={clamp(seg(p, 0.35, 0.65) * 3)}>
        <path d="M380 200 H560 a22 22 0 0 1 22 22 v60 a22 22 0 0 1 -22 22 H470 l-34 34 v-34 h-56 a22 22 0 0 1 -22 -22 v-60 a22 22 0 0 1 22 -22 Z" {...stroke(teal)} />
      </g>
      {/* weekly calendar */}
      <g opacity={clamp(seg(p, 0.55, 0.85))} transform="translate(600 110)">
        <rect x="-40" y="-30" width="80" height="76" rx="10" {...stroke(colors.white, 4)} />
        <path d="M-40 -10 h80" {...stroke(colors.white, 4)} />
        <rect x="-30" y="2" width="22" height="18" rx="4" fill={teal} />
      </g>
    </svg>
  );
};

// 8 — THE BIGGER POINT: a shield protecting home + family.
const Shield: React.FC<IlluProps> = ({ p, t }) => {
  const glow = 0.5 + 0.5 * Math.abs(Math.sin(t / 16));
  const teal = colors.tealLight;
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <g opacity={glow}>
        <path
          d="M360 70 L470 110 V230 c0 80 -58 122 -110 150 C300 352 250 310 250 230 V110 Z"
          fill={`${colors.brandTeal}22`}
        />
      </g>
      <path
        d="M360 70 L470 110 V230 c0 80 -58 122 -110 150 C300 352 250 310 250 230 V110 Z"
        {...stroke(teal, 6)}
        style={drawn(seg(p, 0, 0.6))}
      />
      {/* home */}
      <g opacity={clamp(seg(p, 0.5, 0.8))}>
        <path d="M310 240 L360 200 L410 240" {...stroke(colors.white)} />
        <rect x="322" y="240" width="76" height="64" rx="6" {...stroke(colors.white)} />
        {/* family heart */}
        <path d="M360 286 c-12 -12 -22 -8 -22 -18 a10 10 0 0 1 22 -4 a10 10 0 0 1 22 4 c0 10 -10 6 -22 18 Z" fill={teal} />
      </g>
    </svg>
  );
};

export const ILLUSTRATIONS: Record<string, React.FC<IlluProps>> = {
  changing: Changing,
  guide: Guide,
  together: Together,
  route: Route,
  wrong: Wrong,
  controls: Controls,
  checkin: Checkin,
  shield: Shield,
};
