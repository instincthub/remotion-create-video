import { colors } from "./colors";
import { overpass } from "./fonts";

/**
 * Entrepreneurship line-illustration registry, keyed by `CutawayContent.key`.
 *
 * Shared visual language: 5px rounded line art in white / cyan on the ink page,
 * with ONE yellow spark per scene (the brand rule — yellow is the idea). Each
 * receives:
 *   p — entrance progress 0→1 (drives draw-on + pop-in)
 *   t — local frame (drives a gentle ambient float)
 * One family, entrepreneurship props: idea, launch, growth, deal, target, network.
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
  color = colors.textDim,
}) => (
  <text
    x={x}
    y={y}
    fill={color}
    fontFamily={overpass}
    fontSize="20"
    fontWeight={700}
    letterSpacing="2"
    textAnchor="middle"
    opacity={clamp(show)}
  >
    {text}
  </text>
);

// 1 — IDEA: a big lightbulb draws on, then the filament + rays spark yellow.
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
              {...stroke(colors.yellow, 5)}
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
        <path d="M338 150 l22 -34 l22 34" {...stroke(colors.yellow)} style={drawn(seg(p, 0.55, 1))} />
      </g>
      <Label x={360} y={372} text="THE IDEA" show={seg(p, 0.8, 1)} color={colors.goldDim} />
    </svg>
  );
};

// 2 — LAUNCH: a rocket lifts off a dashed arc; the exhaust flame sparks yellow.
const Launch: React.FC<IlluProps> = ({ p, t }) => {
  const lift = -Math.sin(clamp(t / 30)) * 8 - clamp(p) * 6;
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <path d="M120 360 q240 -40 480 -240" {...stroke(colors.cyan, 4)} style={drawn(seg(p, 0, 0.5))} opacity={0.7} />
      <g transform={`translate(${430 + lift * 0.4} ${150 + lift}) rotate(38 0 0)`}>
        <path d="M0 -70 c26 14 26 70 0 110 c-26 -40 -26 -96 0 -110Z" {...stroke(colors.white)} style={drawn(seg(p, 0.3, 0.8))} />
        <circle cx="0" cy="-6" r="14" {...stroke(colors.white)} style={drawn(seg(p, 0.5, 0.9))} />
        <path d="M-18 22 l-20 26 l20 -6 M18 22 l20 26 l-20 -6" {...stroke(colors.white)} style={drawn(seg(p, 0.55, 0.95))} />
        {/* flame */}
        <path d="M-10 44 q10 30 10 46 q0 -16 10 -46" {...stroke(colors.yellow)} style={drawn(seg(p, 0.7, 1))} />
      </g>
      <Label x={360} y={398} text="MAKE IT HAPPEN" show={seg(p, 0.85, 1)} color={colors.goldDim} />
    </svg>
  );
};

// 3 — GROWTH: an axis draws, bars rise, a trend line climbs with a yellow node.
const Growth: React.FC<IlluProps> = ({ p, t }) => {
  const bob = Math.sin(t / 24) * 3;
  const bars = [
    { x: 180, h: 70 },
    { x: 280, h: 120 },
    { x: 380, h: 180 },
    { x: 480, h: 250 },
  ];
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <path d="M130 70 V360 H620" {...stroke(colors.white, 4)} style={drawn(seg(p, 0, 0.3))} />
      {bars.map((b, i) => {
        const grow = clamp((p - 0.25 - i * 0.12) / 0.3);
        return (
          <rect
            key={i}
            x={b.x}
            y={360 - b.h * grow}
            width="54"
            height={b.h * grow}
            rx="8"
            fill={colors.cyan}
            opacity={0.85 * grow}
          />
        );
      })}
      <path d="M160 320 L260 280 L360 220 L500 110" {...stroke(colors.yellow)} style={drawn(seg(p, 0.5, 1))} />
      <circle cx="500" cy={110 + bob} r="13" fill={colors.yellow} opacity={seg(p, 0.85, 1)} />
      <Label x={375} y={400} text="GROWTH" show={seg(p, 0.85, 1)} color={colors.goldDim} />
    </svg>
  );
};

// 4 — DEAL: two figures meet; a yellow handshake completes the partnership.
const Deal: React.FC<IlluProps> = ({ p, t }) => {
  const lean = Math.sin(t / 26) * 2;
  const Person = (x: number, dir: number, draw: number) => (
    <g transform={`translate(${x} 0)`}>
      <circle cx="0" cy="120" r="34" {...stroke(colors.white)} style={drawn(draw)} />
      <path d={`M${-50 * dir} 320 a52 52 0 0 1 100 0`} {...stroke(colors.white)} style={drawn(draw)} />
    </g>
  );
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <g transform={`translate(${-lean} 0)`}>{Person(220, 1, seg(p, 0, 0.5))}</g>
      <g transform={`translate(${lean} 0)`}>{Person(500, -1, seg(p, 0.15, 0.65))}</g>
      {/* handshake */}
      <path d="M320 250 l40 18 l40 -18" {...stroke(colors.yellow)} style={drawn(seg(p, 0.6, 1))} />
      <circle cx="360" cy="268" r="12" fill={colors.yellow} opacity={seg(p, 0.85, 1)} />
      <Label x={360} y={400} text="THE DEAL" show={seg(p, 0.85, 1)} color={colors.goldDim} />
    </svg>
  );
};

// 5 — TARGET: concentric rings draw on; an arrow lands in a yellow bullseye.
const Target: React.FC<IlluProps> = ({ p, t }) => {
  const quiver = Math.sin(t / 12) * 1.5;
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <circle cx="360" cy="210" r="140" {...stroke(colors.white)} style={drawn(seg(p, 0, 0.4))} />
      <circle cx="360" cy="210" r="92" {...stroke(colors.cyan)} style={drawn(seg(p, 0.2, 0.6))} />
      <circle cx="360" cy="210" r="44" {...stroke(colors.white)} style={drawn(seg(p, 0.4, 0.8))} />
      <circle cx="360" cy="210" r="14" fill={colors.yellow} opacity={seg(p, 0.8, 1)} />
      {/* arrow */}
      <g opacity={seg(p, 0.65, 1)} transform={`translate(${quiver} ${-quiver})`}>
        <path d="M540 30 L372 198" {...stroke(colors.yellow)} />
        <path d="M372 198 l30 -6 M372 198 l6 -30" {...stroke(colors.yellow)} />
      </g>
      <Label x={360} y={392} text="THE GOAL" show={seg(p, 0.85, 1)} color={colors.goldDim} />
    </svg>
  );
};

// 6 — NETWORK: nodes connect; the central hub lights yellow (the platform).
const Network: React.FC<IlluProps> = ({ p, t }) => {
  const hub = { x: 360, y: 210 };
  const nodes = [
    { x: 160, y: 110 },
    { x: 570, y: 130 },
    { x: 150, y: 330 },
    { x: 580, y: 320 },
    { x: 360, y: 60 },
  ];
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      {nodes.map((n, i) => (
        <line
          key={`l${i}`}
          x1={hub.x}
          y1={hub.y}
          x2={n.x}
          y2={n.y}
          {...stroke(colors.cyan, 4)}
          style={drawn(seg(p, 0.2 + i * 0.08, 0.7 + i * 0.05))}
          opacity={0.8}
        />
      ))}
      {nodes.map((n, i) => {
        const pop = clamp((p - 0.4 - i * 0.08) / 0.25);
        const r = Math.sin(t / 20 + i) * 2;
        return <circle key={`n${i}`} cx={n.x} cy={n.y} r={(18 + r) * pop} {...stroke(colors.white)} />;
      })}
      <circle cx={hub.x} cy={hub.y} r={30} fill={colors.yellow} opacity={seg(p, 0.7, 1)} />
      <Label x={360} y={406} text="THE PLATFORM" show={seg(p, 0.85, 1)} color={colors.goldDim} />
    </svg>
  );
};

// 7 — SEEDLING: soil mound + stem + two leaves; a yellow sun sparks the planting.
const Seedling: React.FC<IlluProps> = ({ p, t }) => {
  const sway = Math.sin(t / 26) * 3;
  const sun = seg(p, 0.7, 1);
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <circle cx="540" cy="120" r={28 * sun} fill={colors.yellow} opacity={sun} />
      <path d="M170 332 q190 70 380 0" {...stroke(colors.white)} style={drawn(seg(p, 0, 0.35))} />
      <path d="M210 362 h300" {...stroke(colors.cyan, 4)} style={drawn(seg(p, 0.1, 0.45))} opacity={0.7} />
      <g transform={`translate(${sway} 0)`}>
        <path d="M360 332 V190" {...stroke(colors.white)} style={drawn(seg(p, 0.35, 0.7))} />
        <path d="M360 252 q-72 -18 -98 -70 q62 -6 98 40" {...stroke(colors.cyan)} style={drawn(seg(p, 0.55, 0.85))} />
        <path d="M360 222 q72 -22 102 -76 q-60 -2 -102 44" {...stroke(colors.white)} style={drawn(seg(p, 0.65, 0.95))} />
      </g>
      <Label x={360} y={404} text="PLANT IT" show={seg(p, 0.85, 1)} color={colors.goldDim} />
    </svg>
  );
};

// 8 — ROOTS: a tiny two-leaf sprout above a bold ground line, with a deep,
// asymmetric branching root mass below (no canopy circle, so it never reads as
// a figure). The central taproot finds water — the single yellow droplet.
const Roots: React.FC<IlluProps> = ({ p, t }) => {
  const drop = 374 + Math.sin(t / 16) * 5;
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      {/* bold ground line + soil ticks */}
      <path d="M110 110 H610" {...stroke(colors.cyan, 5)} style={drawn(seg(p, 0, 0.2))} opacity={0.75} />
      {[170, 250, 470, 552].map((x, i) => (
        <path key={i} d={`M${x} 110 V124`} {...stroke(colors.cyan, 3)} style={drawn(seg(p, 0.08, 0.26))} opacity={0.5} />
      ))}
      {/* tiny sprout above ground — pointed leaves, not a head */}
      <path d="M360 110 V84" {...stroke(colors.white)} style={drawn(seg(p, 0.1, 0.28))} />
      <path d="M360 96 q-34 -10 -46 -36 q30 -2 46 22" {...stroke(colors.cyan)} style={drawn(seg(p, 0.16, 0.4))} />
      <path d="M360 88 q34 -12 48 -38 q-30 0 -48 24" {...stroke(colors.white)} style={drawn(seg(p, 0.2, 0.44))} />
      {/* deep, branching root mass below ground */}
      <path d="M360 110 C355 150 366 185 360 220 C356 255 363 290 360 326" {...stroke(colors.white)} style={drawn(seg(p, 0.28, 0.62))} />
      <path d="M360 150 C332 168 305 188 282 226" {...stroke(colors.white)} style={drawn(seg(p, 0.4, 0.7))} />
      <path d="M305 188 C298 208 292 224 280 252" {...stroke(colors.white, 4)} style={drawn(seg(p, 0.5, 0.78))} />
      <path d="M360 166 C388 184 414 202 438 244" {...stroke(colors.white)} style={drawn(seg(p, 0.44, 0.74))} />
      <path d="M414 202 C422 222 428 238 442 268" {...stroke(colors.white, 4)} style={drawn(seg(p, 0.54, 0.82))} />
      <path d="M360 214 C340 240 326 262 318 300" {...stroke(colors.cyan)} style={drawn(seg(p, 0.58, 0.86))} />
      <path d="M360 230 C378 252 394 272 404 308" {...stroke(colors.cyan)} style={drawn(seg(p, 0.62, 0.9))} />
      {/* central taproot tip + water droplet — the single yellow spark */}
      <path d="M360 326 C358 344 362 356 360 366" {...stroke(colors.yellow)} style={drawn(seg(p, 0.74, 1))} />
      <circle cx="360" cy={drop} r={10 * seg(p, 0.85, 1)} fill={colors.yellow} opacity={seg(p, 0.85, 1)} />
      <Label x={360} y={414} text="ROOTS GO DEEP" show={seg(p, 0.85, 1)} color={colors.goldDim} />
    </svg>
  );
};

// 9 — TREE: a mature wide canopy giving shade, trunk, one ripe yellow fruit.
const Tree: React.FC<IlluProps> = ({ p, t }) => {
  const sway = Math.sin(t / 30) * 4;
  const fruit = seg(p, 0.75, 1);
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <g transform={`translate(${sway} 0)`}>
        <path
          d="M360 66 C248 66 150 146 182 226 C150 248 152 290 212 296 C242 320 320 320 360 300 C400 320 478 320 508 296 C568 290 570 248 538 226 C570 146 472 66 360 66 Z"
          {...stroke(colors.white)}
          style={drawn(seg(p, 0, 0.6))}
        />
        <path d="M360 300 V372" {...stroke(colors.white)} style={drawn(seg(p, 0.5, 0.8))} />
        <circle cx="426" cy="178" r={16 * fruit} fill={colors.yellow} opacity={fruit} />
      </g>
      <path d="M250 388 h220" {...stroke(colors.cyan, 4)} style={drawn(seg(p, 0.7, 1))} opacity={0.55} />
      <Label x={360} y={420} text="THE CANOPY" show={seg(p, 0.85, 1)} color={colors.goldDim} />
    </svg>
  );
};

// 10 — HARVEST: a fruit-laden branch; several fruits hang, one ripe yellow.
const Harvest: React.FC<IlluProps> = ({ p, t }) => {
  const bob = Math.sin(t / 20) * 2;
  const fruit = [
    { x: 250, y: 252 },
    { x: 332, y: 286 },
    { x: 410, y: 244 },
    { x: 470, y: 272 },
  ];
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <path d="M150 150 q210 92 430 38" {...stroke(colors.white)} style={drawn(seg(p, 0, 0.5))} />
      {fruit.map((f, i) => (
        <line key={`s${i}`} x1={f.x} y1={f.y - 46} x2={f.x} y2={f.y - 20} {...stroke(colors.white, 4)} style={drawn(seg(p, 0.3 + i * 0.06, 0.72))} />
      ))}
      {fruit.map((f, i) => {
        const g = clamp((p - 0.4 - i * 0.08) / 0.25);
        return <circle key={`f${i}`} cx={f.x} cy={f.y + bob} r={22 * g} {...stroke(i % 2 ? colors.white : colors.cyan)} />;
      })}
      <line x1="540" y1="150" x2="540" y2="184" {...stroke(colors.white, 4)} style={drawn(seg(p, 0.55, 0.8))} />
      <circle cx="540" cy={210 + bob} r={26 * seg(p, 0.7, 1)} fill={colors.yellow} opacity={seg(p, 0.7, 1)} />
      <Label x={360} y={400} text="THE HARVEST" show={seg(p, 0.85, 1)} color={colors.goldDim} />
    </svg>
  );
};

// 11 — CHART: five rising bars on an axis (the five numbers); the last sparks
// yellow, and a trend line draws across the tops.
const Chart: React.FC<IlluProps> = ({ p, t }) => {
  const float = Math.sin(t / 26) * 4;
  const baseY = 350;
  const bars = [
    { x: 150, h: 80, c: colors.cyan, from: 0.0 },
    { x: 246, h: 134, c: colors.cyan, from: 0.12 },
    { x: 342, h: 104, c: colors.cyan, from: 0.24 },
    { x: 438, h: 176, c: colors.cyan, from: 0.36 },
    { x: 534, h: 224, c: colors.yellow, from: 0.48 },
  ];
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <g transform={`translate(0 ${float})`}>
        <path d={`M118 80 V${baseY} H612`} {...stroke(colors.white)} style={drawn(seg(p, 0, 0.4))} />
        {bars.map((b, i) => {
          const grow = seg(p, b.from, b.from + 0.4);
          const h = b.h * grow;
          return (
            <rect
              key={i}
              x={b.x}
              y={baseY - h}
              width="50"
              height={h}
              rx="6"
              fill="none"
              stroke={b.c}
              strokeWidth={5}
              opacity={grow}
            />
          );
        })}
        <path
          d="M175 282 L271 226 L367 254 L463 196 L559 138"
          {...stroke(colors.yellow, 4)}
          style={drawn(seg(p, 0.6, 1))}
          opacity={0.85}
        />
      </g>
      <Label x={360} y={404} text="THE NUMBERS" show={seg(p, 0.8, 1)} color={colors.goldDim} />
    </svg>
  );
};

// 12 — CLOCK: a clock face draws on; the hour hand settles while the minute
// hand sweeps and sparks yellow (the right idea at the right time).
const Clock: React.FC<IlluProps> = ({ p, t }) => {
  const cx = 360;
  const cy = 206;
  const r = 132;
  const sweep = clamp(p) * 300 + t * 1.1;
  const tick = (a: number, i: number) => {
    const rad = (a * Math.PI) / 180;
    const r1 = r - 20;
    const r2 = r - 4;
    return (
      <line
        key={i}
        x1={cx + Math.cos(rad) * r1}
        y1={cy + Math.sin(rad) * r1}
        x2={cx + Math.cos(rad) * r2}
        y2={cy + Math.sin(rad) * r2}
        {...stroke(colors.white, 4)}
        opacity={seg(p, 0.4, 0.85)}
      />
    );
  };
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <circle cx={cx} cy={cy} r={r} {...stroke(colors.white)} style={drawn(seg(p, 0, 0.6))} />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a, i) => tick(a - 90, i))}
      <line
        x1={cx}
        y1={cy}
        x2={cx}
        y2={cy - 66}
        {...stroke(colors.cyan, 6)}
        style={drawn(seg(p, 0.5, 0.85))}
        transform={`rotate(${36 + clamp(p) * 44} ${cx} ${cy})`}
      />
      <line
        x1={cx}
        y1={cy}
        x2={cx}
        y2={cy - 98}
        {...stroke(colors.yellow, 5)}
        transform={`rotate(${sweep} ${cx} ${cy})`}
        opacity={seg(p, 0.55, 1)}
      />
      <circle cx={cx} cy={cy} r="8" fill={colors.yellow} opacity={seg(p, 0.55, 1)} />
      <Label x={360} y={392} text="THE RIGHT TIME" show={seg(p, 0.8, 1)} color={colors.goldDim} />
    </svg>
  );
};

export const ILLUSTRATIONS: Record<string, React.FC<IlluProps>> = {
  idea: Idea,
  launch: Launch,
  growth: Growth,
  deal: Deal,
  target: Target,
  network: Network,
  seedling: Seedling,
  roots: Roots,
  tree: Tree,
  harvest: Harvest,
  chart: Chart,
  clock: Clock,
};
