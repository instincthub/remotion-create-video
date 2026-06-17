import { colors } from "../colors";
import { inter } from "../fonts";

/**
 * Six full-frame cutaway illustrations, keyed by `Cutaway.key` in timing.ts.
 * Each receives:
 *   p — entrance progress 0→1 (drives draw-on + pop-in)
 *   t — local frame (drives ambient float / pulse)
 *
 * Shared visual language: 5px rounded line art in white / sky-blue with gold
 * highlights on a navy backdrop, drawing itself on as the scene opens.
 */

type IlluProps = { p: number; t: number };

const clamp = (x: number, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, x));
const seg = (p: number, from: number, to: number) => clamp((p - from) / (to - from));

const VIEW = "0 0 720 440";
const DASH = 1600;

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

// 1 — THE DAILY BATTLE: a person shielded as arrows rain down.
const Bombardment: React.FC<IlluProps> = ({ p, t }) => {
  const sky = colors.skyLight;
  const arrows = [120, 220, 320, 470, 560];
  return (
    <svg width="720" height="440" viewBox={VIEW}>
      {/* incoming arrows */}
      {arrows.map((x, i) => {
        const a = seg(p, 0.05 + i * 0.06, 0.45 + i * 0.06);
        const drop = interpolateLocal(t, i);
        return (
          <g key={x} opacity={a} transform={`translate(0 ${drop})`}>
            <path d={`M${x} 30 L${x - 26} 110`} {...stroke(sky, 3)} />
            <path d={`M${x - 26} 110 l10 -6 M${x - 26} 110 l4 -11`} {...stroke(sky, 3)} />
          </g>
        );
      })}
      {/* shield */}
      <g opacity={clamp(seg(p, 0.25, 0.7))}>
        <path
          d="M360 150 L470 188 V288 c0 70-55 108-110 132 C305 396 250 358 250 288 V188 Z"
          {...stroke(colors.white, 6)}
          style={drawn(seg(p, 0.25, 0.85))}
        />
        {/* cross on the shield */}
        <path d="M360 210 V330 M318 258 h84" {...stroke(colors.gold, 6)} style={drawn(seg(p, 0.55, 1))} />
      </g>
    </svg>
  );
};

// Small ambient bob for the arrows.
function interpolateLocal(t: number, i: number) {
  return Math.sin(t / 9 + i) * 4;
}

// 2 — THE BALM IN GILEAD: a healing vial with a cross, radiating warmth.
const Balm: React.FC<IlluProps> = ({ p, t }) => {
  const glow = 0.4 + 0.25 * (0.5 + 0.5 * Math.sin(t / 14));
  return (
    <svg width="720" height="440" viewBox={VIEW}>
      {/* radiating rays */}
      <g opacity={clamp(seg(p, 0.5, 1)) * glow}>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <line
            key={deg}
            x1={360 + 120 * Math.cos((deg * Math.PI) / 180)}
            y1={210 + 120 * Math.sin((deg * Math.PI) / 180)}
            x2={360 + 168 * Math.cos((deg * Math.PI) / 180)}
            y2={210 + 168 * Math.sin((deg * Math.PI) / 180)}
            {...stroke(colors.gold, 3)}
          />
        ))}
      </g>
      {/* vial body */}
      <path
        d="M330 110 h60 v22 l20 36 a70 70 0 1 1 -120 0 l20 -36 Z"
        {...stroke(colors.white, 6)}
        style={drawn(seg(p, 0, 0.6))}
      />
      {/* stopper */}
      <path d="M338 96 h44" {...stroke(colors.white, 6)} style={drawn(seg(p, 0, 0.3))} />
      {/* balm level */}
      <path d="M296 250 a70 64 0 0 0 128 0" {...stroke(colors.brandSky, 5)} style={drawn(seg(p, 0.4, 0.9))} />
      {/* cross inside */}
      <path d="M360 222 V300 M330 256 h60" {...stroke(colors.gold, 6)} style={drawn(seg(p, 0.55, 1))} />
    </svg>
  );
};

// 3 — THREE KINDS OF HEALING: heart, body, spirit triptych.
const ThreeKinds: React.FC<IlluProps> = ({ p, t }) => {
  const fy = (ph: number) => Math.sin(t / 16 + ph) * 5;
  const cell = (
    x: number,
    ph: number,
    label: string,
    glyph: React.ReactNode,
    d: number,
  ) => (
    <g transform={`translate(${x} ${210 + fy(ph)})`} opacity={clamp(d * 3)}>
      <circle cx="0" cy="0" r="78" {...stroke(colors.white, 5)} style={drawn(d)} />
      {glyph}
      <text
        x="0"
        y="128"
        fill={colors.neutral200}
        fontFamily={inter}
        fontSize="22"
        fontWeight={600}
        textAnchor="middle"
        letterSpacing="2"
      >
        {label}
      </text>
    </g>
  );
  const g = colors.gold;
  return (
    <svg width="760" height="440" viewBox="0 0 760 440">
      {cell(
        140,
        0,
        "EMOTIONAL",
        <path d="M0 28 C-34 -6 -52 -28 -28 -44 C-12 -54 0 -40 0 -28 C0 -40 12 -54 28 -44 C52 -28 34 -6 0 28 Z" {...stroke(g, 5)} style={drawn(seg(p, 0.3, 0.7))} />,
        seg(p, 0, 0.5),
      )}
      {cell(
        380,
        1.6,
        "PHYSICAL",
        <g>
          <path d="M-26 -26 l52 52 M26 -26 l-52 52" {...stroke(g, 6)} style={drawn(seg(p, 0.4, 0.8))} />
          <circle cx="0" cy="0" r="10" fill={g} opacity={clamp(seg(p, 0.6, 0.9))} />
        </g>,
        seg(p, 0.15, 0.65),
      )}
      {cell(
        620,
        3.2,
        "SPIRITUAL",
        <g {...stroke(g, 5)} style={drawn(seg(p, 0.5, 0.9))}>
          {/* dove */}
          <path d="M-30 6 C-10 -18 22 -18 34 0 C20 -4 6 -2 -4 10 C-12 20 -24 18 -30 6 Z" />
          <path d="M34 0 l14 -10" />
        </g>,
        seg(p, 0.3, 0.8),
      )}
    </svg>
  );
};

// 4 — EVERY KNEE SHALL BOW: a kneeling figure before an exalted cross.
const KneeBow: React.FC<IlluProps> = ({ p, t }) => {
  const glow = 0.5 + 0.3 * (0.5 + 0.5 * Math.sin(t / 13));
  return (
    <svg width="720" height="440" viewBox={VIEW}>
      {/* rays behind the name */}
      <g opacity={clamp(seg(p, 0.45, 1)) * glow}>
        {[-50, -25, 0, 25, 50].map((dx) => (
          <line key={dx} x1={420} y1={120} x2={420 + dx * 2.4} y2={36} {...stroke(colors.gold, 3)} />
        ))}
      </g>
      {/* exalted cross */}
      <path d="M420 70 V210 M372 120 h96" {...stroke(colors.gold, 7)} style={drawn(seg(p, 0, 0.5))} />
      {/* kneeling figure */}
      <g {...stroke(colors.white, 6)} style={drawn(seg(p, 0.4, 1))}>
        <circle cx="250" cy="226" r="24" />
        {/* torso bowed */}
        <path d="M250 250 C236 286 250 312 286 320" />
        {/* kneeling legs */}
        <path d="M286 320 H336 M250 300 L226 360 H320" />
      </g>
      <path d="M210 372 h170" {...stroke(`${colors.skyLight}`, 4)} style={drawn(seg(p, 0.6, 1))} />
    </svg>
  );
};

// 5 — RISE UP AND WALK: a man leaping, a crutch cast aside at the gate.
const RiseUp: React.FC<IlluProps> = ({ p, t }) => {
  const lift = Math.sin(t / 10) * 6;
  return (
    <svg width="720" height="440" viewBox={VIEW}>
      {/* the Beautiful Gate (arch) */}
      <path
        d="M150 380 V210 a120 120 0 0 1 240 0 V380"
        {...stroke(`${colors.skyLight}`, 5)}
        style={drawn(seg(p, 0, 0.5))}
      />
      <path d="M120 380 h300" {...stroke(colors.skyLight, 5)} style={drawn(seg(p, 0, 0.4))} />
      {/* discarded crutch */}
      <g opacity={clamp(seg(p, 0.3, 0.7))}>
        <path d="M470 380 L520 250 M500 268 l34 6" {...stroke(colors.neutral400, 5)} />
      </g>
      {/* leaping man */}
      <g transform={`translate(0 ${-lift})`} {...stroke(colors.white, 6)} style={drawn(seg(p, 0.4, 1))}>
        <circle cx="300" cy="150" r="26" />
        <path d="M300 176 L296 250" />
        {/* arms raised */}
        <path d="M296 196 L250 150 M296 196 L350 152" />
        {/* leaping legs */}
        <path d="M296 250 L262 312 M296 250 L344 300" />
      </g>
      {/* joy sparks */}
      <g opacity={clamp(seg(p, 0.7, 1))} fill={colors.gold}>
        <circle cx="240" cy="120" r="5" />
        <circle cx="372" cy="128" r="5" />
        <circle cx="334" cy="92" r="4" />
      </g>
    </svg>
  );
};

// 6 — LAZARUS, COME FORTH: an open tomb, the stone rolled away, light spilling.
const Lazarus: React.FC<IlluProps> = ({ p, t }) => {
  const beam = 0.45 + 0.3 * (0.5 + 0.5 * Math.sin(t / 12));
  return (
    <svg width="720" height="440" viewBox={VIEW}>
      {/* tomb arch */}
      <path
        d="M250 380 V210 a110 110 0 0 1 220 0 V380"
        {...stroke(colors.neutral400, 6)}
        style={drawn(seg(p, 0, 0.5))}
      />
      {/* dark opening */}
      <path d="M300 380 V232 a60 60 0 0 1 120 0 V380 Z" fill={colors.brandDark} opacity={clamp(seg(p, 0.2, 0.5))} />
      {/* light spilling out */}
      <g opacity={clamp(seg(p, 0.5, 1)) * beam}>
        <path d="M360 250 L300 380 H420 Z" fill={colors.gold} opacity={0.18} />
      </g>
      {/* standing figure (Lazarus) */}
      <g {...stroke(colors.white, 6)} style={drawn(seg(p, 0.5, 1))}>
        <circle cx="360" cy="252" r="22" />
        <path d="M360 274 V348 M338 300 h44 M338 330 h44" />
      </g>
      {/* rolled stone */}
      <circle cx="540" cy="356" r="34" {...stroke(colors.neutral400, 6)} style={drawn(seg(p, 0.3, 0.8))} />
      <path d="M150 384 h420" {...stroke(colors.skyLight, 4)} style={drawn(seg(p, 0.1, 0.6))} />
    </svg>
  );
};

export const ILLUSTRATIONS: Record<string, React.FC<IlluProps>> = {
  bombardment: Bombardment,
  balm: Balm,
  threekinds: ThreeKinds,
  kneebow: KneeBow,
  riseup: RiseUp,
  lazarus: Lazarus,
};
