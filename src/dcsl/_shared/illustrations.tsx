import { colors } from "./colors";
import { inter } from "./fonts";

/**
 * Governance line-illustration registry, keyed by `CutawayContent.key`.
 *
 * Shared visual language: 5px rounded line art in white / Light Blue on the
 * dark page, with ONE orange accent per scene (the brand rule). Each receives:
 *   p — entrance progress 0→1 (drives draw-on + pop-in)
 *   t — local frame (drives a gentle ambient float)
 * One family, eight distinct governance props.
 */

export type IlluProps = { p: number; t: number };

const clamp = (x: number, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, x));
/** Sub-range of p, remapped to 0→1 (for staggered draw-on). */
const seg = (p: number, from: number, to: number) => clamp((p - from) / (to - from));

const VIEW = "0 0 720 440";
const DASH = 1700;

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
    fontFamily={inter}
    fontSize="20"
    fontWeight={600}
    letterSpacing="2"
    textAnchor="middle"
    opacity={clamp(show)}
  >
    {text}
  </text>
);

const Person: React.FC<{
  x: number;
  y: number;
  s?: number;
  color: string;
  draw: number;
}> = ({ x, y, s = 1, color, draw }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx="0" cy="-20" r="15" {...stroke(color)} style={drawn(draw)} />
    <path d="M-23 22 a23 23 0 0 1 46 0" {...stroke(color)} style={drawn(draw)} />
  </g>
);

// 1 — INFO ASYMMETRY: an executive holds a tall data stack; an outside director
// holds a small one. The orange gap marks the imbalance.
const InfoAsymmetry: React.FC<IlluProps> = ({ p, t }) => {
  const fy = (ph: number) => Math.sin(t / 20 + ph) * 5;
  const bar = (x: number, y: number, h: number, prog: number, color: string) => (
    <rect
      x={x}
      y={y - h}
      width="46"
      height={h}
      rx="6"
      fill={color}
      opacity={clamp(prog * 3) * 0.92}
    />
  );
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      {/* table line */}
      <path d="M70 360 H650" {...stroke(colors.mediumBlue, 4)} style={drawn(seg(p, 0, 0.3))} />
      {/* executive (full info) */}
      <g transform={`translate(0 ${fy(0)})`}>
        <Person x={200} y={330} color={colors.white} draw={seg(p, 0.1, 0.45)} />
        <g transform="translate(150 150)">
          {bar(0, 150, 130, seg(p, 0.35, 0.55), colors.lightBlue)}
          {bar(56, 150, 96, seg(p, 0.45, 0.65), colors.lightBlue)}
          {bar(112, 150, 64, seg(p, 0.55, 0.75), colors.lightBlue)}
        </g>
      </g>
      <Label x={200} y={392} text="EXECUTIVE" show={seg(p, 0.5, 0.7)} />
      {/* outside director (partial info) */}
      <g transform={`translate(0 ${fy(2)})`}>
        <Person x={540} y={330} color={colors.white} draw={seg(p, 0.2, 0.55)} />
        <g transform="translate(516 270)">{bar(0, 30, 30, seg(p, 0.6, 0.8), colors.textMuted)}</g>
      </g>
      <Label x={540} y={392} text="NON-EXECUTIVE" show={seg(p, 0.6, 0.8)} />
      {/* the gap, in orange */}
      <g opacity={clamp(seg(p, 0.75, 1))}>
        <path d="M300 230 H470" {...stroke(colors.orange, 4)} strokeDasharray="2 14" />
        <path d="M300 230 l16 -10 M300 230 l16 10" {...stroke(colors.orange, 4)} />
        <Label x={385} y={210} text="INFORMATION GAP" show={seg(p, 0.82, 1)} color={colors.orange} />
      </g>
    </svg>
  );
};

// 2 — SHARE INFO: the executive node pushes the same information out to every
// seat on the board.
const ShareInfo: React.FC<IlluProps> = ({ p }) => {
  const seats = [120, 300, 480, 660];
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      {/* central exec node */}
      <circle cx="360" cy="120" r="44" {...stroke(colors.orange, 5)} style={drawn(seg(p, 0, 0.3))} />
      <path d="M360 100 v40 M340 120 h40" {...stroke(colors.orange, 5)} style={drawn(seg(p, 0.15, 0.4))} />
      {/* arrows to each seat + seats */}
      {seats.map((x, i) => (
        <g key={x}>
          <path
            d={`M360 164 L${x} 300`}
            {...stroke(colors.lightBlue, 3)}
            style={drawn(seg(p, 0.3 + i * 0.08, 0.65 + i * 0.08))}
          />
          <g opacity={clamp(seg(p, 0.55 + i * 0.06, 0.8 + i * 0.06))}>
            <Person x={x} y={330} color={colors.white} draw={1} />
          </g>
        </g>
      ))}
      <Label x={360} y={210} text="ALL THE FACTS" show={seg(p, 0.45, 0.7)} color={colors.textDim} />
    </svg>
  );
};

// 3 — HIERARCHY: Board → Managing Director → management team.
const Hierarchy: React.FC<IlluProps> = ({ p }) => {
  const node = (x: number, y: number, w: number, label: string, prog: number, accent = false) => (
    <g opacity={clamp(prog * 2)}>
      <rect
        x={x - w / 2}
        y={y - 34}
        width={w}
        height="68"
        rx="14"
        {...stroke(accent ? colors.orange : colors.white, 5)}
        style={drawn(prog)}
      />
      <text
        x={x}
        y={y + 8}
        fill={accent ? colors.orange : colors.white}
        fontFamily={inter}
        fontSize="24"
        fontWeight={700}
        textAnchor="middle"
      >
        {label}
      </text>
    </g>
  );
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      {/* connectors */}
      <path d="M360 84 V150" {...stroke(colors.mediumBlue, 4)} style={drawn(seg(p, 0.2, 0.45))} />
      <path d="M360 218 V270 M180 300 H540 M180 300 V330 M360 300 V330 M540 300 V330"
        {...stroke(colors.mediumBlue, 4)} style={drawn(seg(p, 0.45, 0.75))} />
      {node(360, 50, 230, "THE BOARD", seg(p, 0, 0.3))}
      {node(360, 184, 290, "MANAGING DIRECTOR", seg(p, 0.3, 0.55), true)}
      {node(180, 364, 150, "MGMT", seg(p, 0.6, 0.85))}
      {node(360, 364, 150, "MGMT", seg(p, 0.68, 0.92))}
      {node(540, 364, 150, "MGMT", seg(p, 0.76, 1))}
    </svg>
  );
};

// 4 — OUTSIDER: a closed circle of inside seats, with one independent figure
// stepping in across a dotted boundary, bringing an orange judgement spark.
const Outsider: React.FC<IlluProps> = ({ p, t }) => {
  const fx = Math.sin(t / 22) * 4;
  const inner = [
    [300, 150],
    [420, 150],
    [300, 280],
    [420, 280],
  ] as const;
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      {/* boundary */}
      <circle cx="360" cy="215" r="170" {...stroke(colors.mediumBlue, 4)} strokeDasharray="3 16" style={{ opacity: clamp(seg(p, 0, 0.3)) }} />
      {inner.map(([x, y], i) => (
        <g key={i} opacity={clamp(seg(p, 0.2 + i * 0.07, 0.5 + i * 0.07))}>
          <Person x={x} y={y} s={0.85} color={colors.white} draw={1} />
        </g>
      ))}
      {/* incoming independent director */}
      <g transform={`translate(${620 + fx} 215)`} opacity={clamp(seg(p, 0.55, 0.85))}>
        <Person x={0} y={0} color={colors.lightBlue} draw={seg(p, 0.55, 0.85)} />
      </g>
      <path d={`M560 215 H600`} {...stroke(colors.lightBlue, 3)} style={drawn(seg(p, 0.6, 0.85))} />
      {/* judgement spark */}
      <g opacity={clamp(seg(p, 0.78, 1))}>
        <circle cx="360" cy="215" r="13" fill={colors.orange} />
        <path d="M360 188 v-14 M360 256 v14 M333 215 h-14 M387 215 h14" {...stroke(colors.orange, 4)} />
      </g>
      <Label x={360} y={418} text="INDEPENDENT JUDGEMENT" show={seg(p, 0.85, 1)} color={colors.orange} />
    </svg>
  );
};

// 5 — LINK: the chairman node sits between the board cluster and management,
// joined to both — the link person.
const Link: React.FC<IlluProps> = ({ p, t }) => {
  const fy = Math.sin(t / 20) * 5;
  const cluster = (cx: number, cy: number, color: string, base: number) => (
    <g>
      {[
        [-50, -34],
        [50, -34],
        [-50, 40],
        [50, 40],
      ].map(([dx, dy], i) => (
        <g key={i} opacity={clamp(seg(p, base + i * 0.05, base + 0.3 + i * 0.05))}>
          <Person x={cx + dx} y={cy + dy} s={0.7} color={color} draw={1} />
        </g>
      ))}
    </g>
  );
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      {cluster(150, 215, colors.white, 0.1)}
      {cluster(570, 215, colors.lightBlue, 0.35)}
      <Label x={150} y={360} text="THE BOARD" show={seg(p, 0.3, 0.55)} />
      <Label x={570} y={360} text="MANAGEMENT" show={seg(p, 0.5, 0.75)} />
      {/* links */}
      <path d="M250 215 H320" {...stroke(colors.orange, 4)} style={drawn(seg(p, 0.55, 0.75))} />
      <path d="M400 215 H470" {...stroke(colors.orange, 4)} style={drawn(seg(p, 0.6, 0.8))} />
      {/* chairman node */}
      <g transform={`translate(360 ${215 + fy})`} opacity={clamp(seg(p, 0.5, 0.75))}>
        <circle cx="0" cy="0" r="42" fill={colors.orange} />
        <Person x={0} y={6} s={0.8} color={colors.deepBlue} draw={seg(p, 0.55, 0.8)} />
      </g>
      <Label x={360} y={325} text="CHAIRMAN" show={seg(p, 0.7, 0.95)} color={colors.orange} />
    </svg>
  );
};

// 6 — TENURE: a year timeline with a service bar that stops at a hard cap.
const Tenure: React.FC<IlluProps> = ({ p }) => {
  const x0 = 90;
  const x1 = 630;
  const capX = x0 + (x1 - x0) * 0.78;
  const barW = (capX - x0) * clamp(seg(p, 0.3, 0.85));
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      {/* axis */}
      <path d={`M${x0} 280 H${x1}`} {...stroke(colors.mediumBlue, 4)} style={drawn(seg(p, 0, 0.3))} />
      {[0, 0.25, 0.5, 0.78].map((f, i) => (
        <path
          key={i}
          d={`M${x0 + (x1 - x0) * f} 270 v20`}
          {...stroke(colors.textMuted, 3)}
          style={{ opacity: clamp(seg(p, 0.1, 0.4)) }}
        />
      ))}
      {/* service bar */}
      <rect x={x0} y="244" width={Math.max(0, barW)} height="36" rx="8" fill={colors.lightBlue} opacity={0.9} />
      {/* cap marker */}
      <g opacity={clamp(seg(p, 0.7, 1))}>
        <path d={`M${capX} 210 V320`} {...stroke(colors.orange, 5)} />
        <rect x={capX - 60} y="150" width="120" height="46" rx="10" fill={colors.orange} />
        <text x={capX} y="181" fill={colors.deepBlue} fontFamily={inter} fontSize="24" fontWeight={700} textAnchor="middle">
          MAX
        </text>
      </g>
      <Label x={360} y={360} text="TENURE IS CAPPED" show={seg(p, 0.8, 1)} color={colors.textDim} />
    </svg>
  );
};

// 7 — BALANCE: a level scale; the independent director is the fulcrum that
// keeps executives and shareholders in balance.
const Balance: React.FC<IlluProps> = ({ p, t }) => {
  const tilt = Math.sin(t / 26) * 1.5;
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      {/* stand */}
      <path d="M360 360 V150" {...stroke(colors.white, 5)} style={drawn(seg(p, 0, 0.3))} />
      <path d="M300 360 H420" {...stroke(colors.white, 5)} style={drawn(seg(p, 0.05, 0.3))} />
      {/* beam */}
      <g transform={`rotate(${tilt} 360 150)`}>
        <path d="M180 150 H540" {...stroke(colors.white, 5)} style={drawn(seg(p, 0.3, 0.55))} />
        {/* left pan */}
        <g opacity={clamp(seg(p, 0.5, 0.75))}>
          <path d="M180 150 V200" {...stroke(colors.lightBlue, 3)} />
          <path d="M140 200 a40 18 0 0 0 80 0" {...stroke(colors.lightBlue, 4)} />
          <Label x={180} y={250} text="EXECUTIVES" show={seg(p, 0.6, 0.85)} />
        </g>
        {/* right pan */}
        <g opacity={clamp(seg(p, 0.55, 0.8))}>
          <path d="M540 150 V200" {...stroke(colors.lightBlue, 3)} />
          <path d="M500 200 a40 18 0 0 0 80 0" {...stroke(colors.lightBlue, 4)} />
          <Label x={540} y={250} text="SHAREHOLDERS" show={seg(p, 0.65, 0.9)} />
        </g>
      </g>
      {/* fulcrum = independent director, orange */}
      <g opacity={clamp(seg(p, 0.75, 1))}>
        <circle cx="360" cy="150" r="20" fill={colors.orange} />
        <Label x={360} y={406} text="INDEPENDENCE" show={seg(p, 0.85, 1)} color={colors.orange} />
      </g>
    </svg>
  );
};

// 8 — APPOINTMENT: many candidates filter through criteria to one selected.
const Appointment: React.FC<IlluProps> = ({ p }) => {
  const dots = [120, 200, 280, 360, 440, 520, 600];
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      {/* candidate pool */}
      {dots.map((x, i) => (
        <circle
          key={x}
          cx={x}
          cy="80"
          r="14"
          {...stroke(colors.white, 4)}
          style={{ opacity: clamp(seg(p, i * 0.05, 0.3 + i * 0.05)) }}
        />
      ))}
      {/* funnel */}
      <path d="M150 140 H570 L420 280 V340 H300 V280 Z" {...stroke(colors.lightBlue, 5)} style={drawn(seg(p, 0.3, 0.65))} />
      <Label x={360} y={210} text="CRITERIA" show={seg(p, 0.45, 0.7)} color={colors.lightBlue} />
      {/* selected director */}
      <g opacity={clamp(seg(p, 0.75, 1))}>
        <circle cx="360" cy="392" r="26" fill={colors.orange} />
        <Person x={360} y={398} s={0.7} color={colors.deepBlue} draw={seg(p, 0.8, 1)} />
      </g>
    </svg>
  );
};

// 9 — GOOD FAITH: a director places the company's interests above their own;
// personal interest is subjugated.
const GoodFaith: React.FC<IlluProps> = ({ p, t }) => {
  const fy = Math.sin(t / 22) * 5;
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <g transform="translate(150 210)">
        <Person x={0} y={0} color={colors.white} draw={seg(p, 0.05, 0.4)} />
      </g>
      <Label x={150} y={296} text="THE DIRECTOR" show={seg(p, 0.3, 0.55)} />
      {/* priority axis between self and company */}
      <path d="M360 296 V176" {...stroke(colors.mediumBlue, 4)} style={drawn(seg(p, 0.2, 0.45))} />
      <path d="M343 246 l17 -18 l17 18" {...stroke(colors.lightBlue, 5)} style={drawn(seg(p, 0.5, 0.72))} />
      {/* company on top (orange = the single accent) */}
      <g transform={`translate(360 ${118 + fy})`} opacity={clamp(seg(p, 0.45, 0.7))}>
        <circle cx="0" cy="0" r="58" fill={colors.orange} />
        <text x="0" y="-4" fill={colors.deepBlue} fontFamily={inter} fontSize="21" fontWeight={700} textAnchor="middle">
          COMPANY
        </text>
        <text x="0" y="20" fill={colors.deepBlue} fontFamily={inter} fontSize="15" fontWeight={600} textAnchor="middle">
          &amp; STAKEHOLDERS
        </text>
      </g>
      {/* self below, dimmed */}
      <g opacity={clamp(seg(p, 0.62, 0.88))}>
        <circle cx="360" cy="330" r="34" {...stroke(colors.textMuted, 4)} />
        <text x="360" y="337" fill={colors.textMuted} fontFamily={inter} fontSize="18" fontWeight={600} textAnchor="middle">
          SELF
        </text>
      </g>
    </svg>
  );
};

// 10 — STAKEHOLDERS: the company at the centre, the duty owed to a wide and
// growing ring of stakeholders (not only shareholders).
const Stakeholders: React.FC<IlluProps> = ({ p }) => {
  const cx = 360;
  const cy = 210;
  const R = 150;
  const nodes = [
    { a: -90, label: "EMPLOYEES" },
    { a: -30, label: "REGULATORS" },
    { a: 30, label: "CUSTOMERS" },
    { a: 90, label: "SOCIETY" },
    { a: 150, label: "CREDITORS" },
    { a: 210, label: "SHAREHOLDERS" },
  ];
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      {nodes.map((n, i) => {
        const rad = (n.a * Math.PI) / 180;
        const x = cx + Math.cos(rad) * R;
        const y = cy + Math.sin(rad) * R;
        const dr = seg(p, 0.3 + i * 0.05, 0.6 + i * 0.05);
        const ly = n.a > 0 && n.a < 180 ? y + 52 : y - 44;
        return (
          <g key={i}>
            <path
              d={`M${cx} ${cy} L${x} ${y}`}
              {...stroke(colors.mediumBlue, 3)}
              style={drawn(seg(p, 0.2 + i * 0.05, 0.5 + i * 0.05))}
            />
            <g opacity={clamp(dr * 2)}>
              <circle cx={x} cy={y} r="28" {...stroke(colors.white, 4)} />
              <text
                x={x}
                y={ly}
                fill={colors.textDim}
                fontFamily={inter}
                fontSize="16"
                fontWeight={600}
                textAnchor="middle"
                letterSpacing="1"
              >
                {n.label}
              </text>
            </g>
          </g>
        );
      })}
      <g opacity={clamp(seg(p, 0, 0.3))}>
        <circle cx={cx} cy={cy} r="46" fill={colors.orange} />
        <text x={cx} y={cy + 7} fill={colors.deepBlue} fontFamily={inter} fontSize="20" fontWeight={700} textAnchor="middle">
          COMPANY
        </text>
      </g>
    </svg>
  );
};

// 11 — DELEGATION: the board delegates to management and committees but stays
// responsible — an orange loop of responsibility returns to the board.
const Delegation: React.FC<IlluProps> = ({ p }) => {
  const box = (x: number, y: number, w: number, label: string, prog: number) => (
    <g opacity={clamp(prog * 2)}>
      <rect x={x - w / 2} y={y - 32} width={w} height="64" rx="13" {...stroke(colors.white, 5)} style={drawn(prog)} />
      <text x={x} y={y + 8} fill={colors.white} fontFamily={inter} fontSize="22" fontWeight={700} textAnchor="middle">
        {label}
      </text>
    </g>
  );
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      {box(360, 80, 240, "THE BOARD", seg(p, 0, 0.3))}
      <path
        d="M360 112 V160 M210 190 H510 M210 190 V222 M510 190 V222"
        {...stroke(colors.mediumBlue, 4)}
        style={drawn(seg(p, 0.3, 0.55))}
      />
      {box(210, 254, 210, "MANAGEMENT", seg(p, 0.4, 0.65))}
      {box(510, 254, 210, "COMMITTEES", seg(p, 0.46, 0.72))}
      {/* responsibility loop back to the board (the single orange accent) */}
      <path d="M618 250 C700 180 700 96 488 84" {...stroke(colors.orange, 4)} style={drawn(seg(p, 0.62, 0.95))} />
      <path d="M488 84 l22 -7 m-22 7 l18 12" {...stroke(colors.orange, 4)} style={{ opacity: clamp(seg(p, 0.88, 1)) }} />
      <Label x={585} y={150} text="STILL RESPONSIBLE" show={seg(p, 0.8, 1)} color={colors.orange} />
    </svg>
  );
};

// 12 — CONFIDENTIALITY: board information is locked and never leaves the board.
const Confidentiality: React.FC<IlluProps> = ({ p }) => {
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      {/* folder */}
      <path
        d="M250 156 h110 l22 26 h108 v150 h-240 Z"
        {...stroke(colors.white, 5)}
        style={drawn(seg(p, 0, 0.4))}
      />
      {/* padlock (orange = the single accent) */}
      <g opacity={clamp(seg(p, 0.35, 0.65))} transform="translate(360 236)">
        <rect x="-27" y="6" width="54" height="42" rx="9" fill={colors.orange} />
        <path d="M-16 6 V-9 a16 16 0 0 1 32 0 V6" {...stroke(colors.orange, 5)} />
        <circle cx="0" cy="26" r="5" fill={colors.deepBlue} />
      </g>
      <Label x={360} y={324} text="BOARD-ONLY" show={seg(p, 0.5, 0.75)} />
      {/* outsider barred from the information */}
      <g opacity={clamp(seg(p, 0.6, 0.9))}>
        <Person x={612} y={210} s={0.8} color={colors.textMuted} draw={1} />
        <path d="M470 210 H566" {...stroke(colors.lightBlue, 3)} strokeDasharray="2 12" style={drawn(seg(p, 0.6, 0.85))} />
        <circle cx="518" cy="210" r="22" {...stroke(colors.lightBlue, 4)} />
        <path d="M503 195 l30 30" {...stroke(colors.lightBlue, 4)} />
      </g>
      <Label x={612} y={296} text="NON-MEMBER" show={seg(p, 0.78, 1)} color={colors.textMuted} />
    </svg>
  );
};

// 13 — FETTER DISCRETION: a pre-agreed vote is rejected; the director keeps a
// free choice (the orange check is the single accent — the desired outcome).
const FetterDiscretion: React.FC<IlluProps> = ({ p }) => {
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      {/* pre-agreed, struck out (muted) */}
      <g opacity={clamp(seg(p, 0.1, 0.45))}>
        <rect x="118" y="122" width="184" height="200" rx="12" {...stroke(colors.textMuted, 5)} style={drawn(seg(p, 0.1, 0.45))} />
        <path d="M150 172 h120 M150 208 h120 M150 244 h78" {...stroke(colors.textMuted, 4)} style={{ opacity: clamp(seg(p, 0.3, 0.6)) }} />
        <Label x={210} y={360} text="PRE-AGREED" show={seg(p, 0.4, 0.65)} color={colors.textMuted} />
        <g opacity={clamp(seg(p, 0.5, 0.78))}>
          <circle cx="210" cy="212" r="74" {...stroke(colors.textMuted, 6)} />
          <path d="M158 160 l104 104" {...stroke(colors.textMuted, 6)} />
        </g>
      </g>
      {/* arrow */}
      <path d="M330 222 H402" {...stroke(colors.lightBlue, 4)} style={drawn(seg(p, 0.6, 0.8))} />
      <path d="M402 222 l-17 -10 m17 10 l-17 10" {...stroke(colors.lightBlue, 4)} style={{ opacity: clamp(seg(p, 0.76, 1)) }} />
      {/* free discretion, checked (orange) */}
      <g opacity={clamp(seg(p, 0.7, 1))}>
        <rect x="430" y="122" width="184" height="200" rx="12" {...stroke(colors.white, 5)} style={drawn(seg(p, 0.7, 0.95))} />
        <path d="M470 214 l30 32 l64 -74" {...stroke(colors.orange, 8)} style={drawn(seg(p, 0.82, 1))} />
        <Label x={522} y={360} text="FREE DISCRETION" show={seg(p, 0.88, 1)} />
      </g>
    </svg>
  );
};

// 14 — PRODUCT RECALL: a contaminated product is recalled (case-study setup).
const ProductRecall: React.FC<IlluProps> = ({ p, t }) => {
  const fy = Math.sin(t / 20) * 4;
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <g transform={`translate(0 ${fy})`}>
        <rect x="250" y="120" width="180" height="220" rx="10" {...stroke(colors.white, 5)} style={drawn(seg(p, 0, 0.4))} />
        <path d="M282 178 h116 M282 208 h116 M282 238 h80" {...stroke(colors.lightBlue, 4)} style={{ opacity: clamp(seg(p, 0.3, 0.55)) }} />
        <circle cx="340" cy="296" r="22" {...stroke(colors.lightBlue, 4)} style={drawn(seg(p, 0.35, 0.6))} />
      </g>
      {/* warning (orange = the single accent) */}
      <g opacity={clamp(seg(p, 0.5, 0.78))} transform="translate(468 150)">
        <path d="M0 -38 L42 36 H-42 Z" fill={colors.orange} />
        <path d="M0 -10 V14" {...stroke(colors.deepBlue, 5)} />
        <circle cx="0" cy="26" r="3.6" fill={colors.deepBlue} />
      </g>
      <Label x={360} y={388} text="CONTAMINATED · RECALLED" show={seg(p, 0.6, 0.9)} color={colors.textDim} />
    </svg>
  );
};

// 15 — CONFLICT TIE: the related-party conflict — the company wants to hire a
// firm whose lead partner is married to its CEO.
const ConflictTie: React.FC<IlluProps> = ({ p, t }) => {
  const beat = 1 + Math.sin(t / 12) * 0.06;
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <g opacity={clamp(seg(p, 0.05, 0.4))}>
        <Person x={200} y={168} color={colors.white} draw={seg(p, 0.05, 0.4)} />
      </g>
      <Label x={200} y={246} text="THE CEO" show={seg(p, 0.25, 0.5)} />
      <g opacity={clamp(seg(p, 0.15, 0.5))}>
        <Person x={520} y={168} color={colors.white} draw={seg(p, 0.15, 0.5)} />
      </g>
      <Label x={520} y={246} text="LAW-FIRM PARTNER" show={seg(p, 0.35, 0.6)} />
      {/* marriage tie (orange) */}
      <path d="M250 150 q110 -54 96 -2" {...stroke(colors.orange, 3)} style={drawn(seg(p, 0.5, 0.7))} />
      <path d="M470 150 q-110 -54 -96 -2" {...stroke(colors.orange, 3)} style={drawn(seg(p, 0.55, 0.75))} />
      <g opacity={clamp(seg(p, 0.45, 0.7))} transform={`translate(360 132) scale(${beat})`}>
        <path d="M0 12 C-24 -12 -42 6 -20 22 L0 38 L20 22 C42 6 24 -12 0 12 Z" fill={colors.orange} />
      </g>
      <Label x={360} y={86} text="MARRIED" show={seg(p, 0.6, 0.85)} color={colors.textDim} />
      {/* the company wants to hire the firm */}
      <g opacity={clamp(seg(p, 0.62, 0.9))}>
        <rect x="300" y="300" width="120" height="54" rx="12" {...stroke(colors.lightBlue, 4)} style={drawn(seg(p, 0.62, 0.85))} />
        <text x="360" y="333" fill={colors.lightBlue} fontFamily={inter} fontSize="18" fontWeight={700} textAnchor="middle">
          COMPANY
        </text>
        <path d="M420 318 H520 V206" {...stroke(colors.lightBlue, 3)} strokeDasharray="3 10" style={drawn(seg(p, 0.72, 0.96))} />
      </g>
      <Label x={170} y={392} text="RELATED-PARTY CONFLICT" show={seg(p, 0.82, 1)} color={colors.textDim} />
    </svg>
  );
};

// 16 — RECUSAL: the conflicted director leaves the meeting; the rest decide.
const Recusal: React.FC<IlluProps> = ({ p }) => {
  const seated = [
    [210, 120],
    [392, 120],
    [210, 322],
    [392, 322],
  ];
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <ellipse cx="300" cy="222" rx="150" ry="92" {...stroke(colors.white, 5)} style={drawn(seg(p, 0, 0.35))} />
      {seated.map(([x, y], i) => (
        <g key={i} opacity={clamp(seg(p, 0.25 + i * 0.06, 0.55 + i * 0.06))}>
          <Person x={x} y={y} s={0.7} color={colors.white} draw={1} />
        </g>
      ))}
      {/* empty seat */}
      <g opacity={clamp(seg(p, 0.5, 0.75))}>
        <circle cx="120" cy="222" r="22" {...stroke(colors.textMuted, 4)} strokeDasharray="3 9" />
      </g>
      {/* door + the conflicted director exiting (orange = the recusal action) */}
      <g opacity={clamp(seg(p, 0.58, 0.9))}>
        <rect x="604" y="156" width="68" height="132" rx="6" {...stroke(colors.white, 4)} style={drawn(seg(p, 0.58, 0.85))} />
        <path d="M150 222 H558" {...stroke(colors.orange, 4)} strokeDasharray="4 12" style={drawn(seg(p, 0.62, 0.95))} />
        <path d="M558 222 l-18 -10 m18 10 l-18 10" {...stroke(colors.orange, 4)} style={{ opacity: clamp(seg(p, 0.85, 1)) }} />
        <Person x={520} y={222} s={0.78} color={colors.orange} draw={seg(p, 0.7, 0.95)} />
      </g>
      <Label x={360} y={404} text="RECUSE — LEAVE THE ROOM" show={seg(p, 0.8, 1)} color={colors.textDim} />
    </svg>
  );
};

// 17 — RING-FENCE: the conflicted director is sealed off from the engagement —
// no part in fees, negotiation or feedback.
const RingFence: React.FC<IlluProps> = ({ p }) => {
  const items = [
    { x: 168, y: 120, l: "FEES" },
    { x: 552, y: 120, l: "NEGOTIATION" },
    { x: 360, y: 366, l: "FEEDBACK" },
  ];
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <circle cx="360" cy="218" r="98" {...stroke(colors.orange, 5)} strokeDasharray="10 12" style={{ opacity: clamp(seg(p, 0.2, 0.5)) }} />
      <g opacity={clamp(seg(p, 0, 0.35))}>
        <Person x={360} y={208} color={colors.white} draw={seg(p, 0.05, 0.4)} />
      </g>
      <Label x={360} y={260} text="THE CEO" show={seg(p, 0.3, 0.55)} />
      {items.map((it, i) => {
        const dr = seg(p, 0.45 + i * 0.08, 0.75 + i * 0.08);
        const mx = (360 + it.x) / 2;
        const my = (218 + it.y) / 2;
        return (
          <g key={i} opacity={clamp(dr * 2)}>
            <path d={`M360 218 L${it.x} ${it.y}`} {...stroke(colors.mediumBlue, 3)} strokeDasharray="3 9" />
            <circle cx={mx} cy={my} r="14" {...stroke(colors.lightBlue, 3)} />
            <path d={`M${mx - 9} ${my - 9} l18 18`} {...stroke(colors.lightBlue, 3)} />
            <text x={it.x} y={it.y < 218 ? it.y - 26 : it.y + 36} fill={colors.textDim} fontFamily={inter} fontSize="17" fontWeight={600} textAnchor="middle">
              {it.l}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

// 18 — FINANCIALS: the accuracy of the accounts is the board's duty and cannot
// be delegated.
const Financials: React.FC<IlluProps> = ({ p, t }) => {
  const fy = Math.sin(t / 20) * 4;
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <g transform={`translate(0 ${fy})`}>
        <rect x="238" y="108" width="244" height="244" rx="12" {...stroke(colors.white, 5)} style={drawn(seg(p, 0, 0.4))} />
        <path d="M270 148 h118" {...stroke(colors.lightBlue, 4)} style={{ opacity: clamp(seg(p, 0.25, 0.5)) }} />
        <g opacity={clamp(seg(p, 0.35, 0.6))}>
          <rect x="276" y="252" width="32" height="62" rx="4" fill={colors.lightBlue} />
          <rect x="326" y="222" width="32" height="92" rx="4" fill={colors.lightBlue} />
          <rect x="376" y="196" width="32" height="118" rx="4" fill={colors.lightBlue} />
          <path d="M292 250 L342 218 L392 192" {...stroke(colors.white, 3)} />
        </g>
      </g>
      {/* accuracy check (orange = the single accent) */}
      <g opacity={clamp(seg(p, 0.55, 0.82))} transform="translate(470 128)">
        <circle cx="0" cy="0" r="34" fill={colors.orange} />
        <path d="M-15 0 l10 11 l20 -22" {...stroke(colors.deepBlue, 6)} />
      </g>
      <Label x={360} y={392} text="ACCURACY — CANNOT BE DELEGATED" show={seg(p, 0.6, 0.9)} color={colors.textDim} />
    </svg>
  );
};

// 19 — ESG: the board's duty to the environment and wider impact.
const Esg: React.FC<IlluProps> = ({ p, t }) => {
  const sway = Math.sin(t / 18) * 3;
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      {/* globe */}
      <circle cx="360" cy="210" r="96" {...stroke(colors.white, 5)} style={drawn(seg(p, 0, 0.4))} />
      <g opacity={clamp(seg(p, 0.3, 0.55))}>
        <ellipse cx="360" cy="210" rx="40" ry="96" {...stroke(colors.lightBlue, 3)} />
        <path d="M266 188 h188 M270 232 h180" {...stroke(colors.lightBlue, 3)} />
      </g>
      {/* leaf (orange = the single accent) */}
      <g opacity={clamp(seg(p, 0.5, 0.8))} transform={`translate(360 ${150 + sway})`}>
        <path d="M0 0 C30 -26 64 -20 70 -56 C34 -52 6 -34 0 0 Z" fill={colors.orange} />
        <path d="M8 -8 C26 -24 44 -30 60 -48" {...stroke(colors.deepBlue, 3)} />
      </g>
      <Label x={360} y={344} text="ENVIRONMENT · ESG" show={seg(p, 0.6, 0.9)} color={colors.textDim} />
    </svg>
  );
};

// 20 — PERFORMANCE: the board measures performance on more than the budget.
const PerformanceKpi: React.FC<IlluProps> = ({ p }) => {
  const tags = ["FINANCIAL", "PEOPLE", "STRATEGY", "STAKEHOLDERS"];
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <path d="M250 282 A110 110 0 0 1 470 282" {...stroke(colors.white, 6)} style={drawn(seg(p, 0, 0.45))} />
      <g opacity={clamp(seg(p, 0.3, 0.55))}>
        <path d="M250 282 h-16 M470 282 h16 M360 172 v-16" {...stroke(colors.textMuted, 3)} />
      </g>
      {/* needle (orange) */}
      <g opacity={clamp(seg(p, 0.45, 0.7))}>
        <path d="M360 282 L424 214" {...stroke(colors.orange, 6)} />
        <circle cx="360" cy="282" r="11" fill={colors.orange} />
      </g>
      <Label x={360} y={250} text="MEASURE PERFORMANCE" show={seg(p, 0.4, 0.65)} />
      <g opacity={clamp(seg(p, 0.6, 0.92))}>
        {tags.map((tg, i) => {
          const x = 134 + i * 116;
          const dim = i === 0;
          return (
            <g key={tg}>
              <rect x={x} y="334" width="104" height="46" rx="10" {...stroke(dim ? colors.textMuted : colors.lightBlue, 3)} />
              <text x={x + 52} y="363" fill={dim ? colors.textMuted : colors.lightBlue} fontFamily={inter} fontSize="14" fontWeight={600} textAnchor="middle">
                {tg}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
};

// 21 — REMUNERATION: pay is linked to performance.
const Remuneration: React.FC<IlluProps> = ({ p }) => {
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <g opacity={clamp(seg(p, 0.1, 0.45))}>
        <ellipse cx="200" cy="178" rx="58" ry="19" {...stroke(colors.white, 4)} style={drawn(seg(p, 0.1, 0.4))} />
        <ellipse cx="200" cy="208" rx="58" ry="19" {...stroke(colors.white, 4)} />
        <ellipse cx="200" cy="238" rx="58" ry="19" {...stroke(colors.white, 4)} />
        <path d="M142 178 V238 M258 178 V238" {...stroke(colors.white, 4)} />
        <text x="200" y="216" fill={colors.white} fontFamily={inter} fontSize="26" fontWeight={700} textAnchor="middle">
          ₦
        </text>
      </g>
      <Label x={200} y={300} text="REMUNERATION" show={seg(p, 0.35, 0.6)} />
      {/* link (orange) */}
      <path d="M280 210 H458" {...stroke(colors.orange, 5)} style={drawn(seg(p, 0.5, 0.75))} />
      <path d="M458 210 l-18 -10 m18 10 l-18 10" {...stroke(colors.orange, 5)} style={{ opacity: clamp(seg(p, 0.7, 0.95)) }} />
      <Label x={368} y={188} text="LINKED TO" show={seg(p, 0.6, 0.85)} color={colors.textDim} />
      {/* performance target */}
      <g opacity={clamp(seg(p, 0.55, 0.85))}>
        <circle cx="540" cy="210" r="58" {...stroke(colors.lightBlue, 4)} />
        <circle cx="540" cy="210" r="34" {...stroke(colors.lightBlue, 4)} />
        <circle cx="540" cy="210" r="12" fill={colors.lightBlue} />
      </g>
      <Label x={540} y={300} text="PERFORMANCE" show={seg(p, 0.7, 0.95)} />
    </svg>
  );
};

// 22 — RISK FRAMEWORK: the board sets risk appetite within defined limits.
const RiskFramework: React.FC<IlluProps> = ({ p }) => {
  const x0 = 132;
  const x1 = 588;
  const w = x1 - x0;
  const appetite = x0 + w * 0.55;
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <g opacity={clamp(seg(p, 0.1, 0.4))}>
        <rect x={x0} y="212" width={w * 0.4} height="40" rx="6" fill={`${colors.lightBlue}55`} />
        <rect x={x0 + w * 0.4} y="212" width={w * 0.3} height="40" fill={`${colors.lightBlue}33`} />
        <rect x={x0 + w * 0.7} y="212" width={w * 0.3} height="40" rx="6" fill={`${colors.mediumBlue}80`} />
      </g>
      <path d={`M${x0} 252 H${x1}`} {...stroke(colors.white, 4)} style={drawn(seg(p, 0, 0.35))} />
      {/* limit */}
      <g opacity={clamp(seg(p, 0.4, 0.65))}>
        <path d={`M${x1} 198 V266`} {...stroke(colors.textMuted, 4)} />
        <text x={x1} y="290" fill={colors.textMuted} fontFamily={inter} fontSize="16" fontWeight={600} textAnchor="middle">
          LIMIT
        </text>
      </g>
      {/* appetite pointer (orange) */}
      <g opacity={clamp(seg(p, 0.55, 0.85))}>
        <path d={`M${appetite} 182 l15 24 h-30 Z`} fill={colors.orange} />
        <path d={`M${appetite} 206 V252`} {...stroke(colors.orange, 4)} />
        <text x={appetite} y="170" fill={colors.orange} fontFamily={inter} fontSize="17" fontWeight={700} textAnchor="middle">
          APPETITE
        </text>
      </g>
      <Label x={360} y={332} text="RISK APPETITE · CAPACITY · LIMITS" show={seg(p, 0.65, 0.95)} color={colors.textDim} />
    </svg>
  );
};

// 23 — COMPLIANCE: a regulatory checklist the board owns and monitors.
const Compliance: React.FC<IlluProps> = ({ p, t }) => {
  const fy = Math.sin(t / 20) * 4;
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <g transform={`translate(0 ${fy})`}>
        <rect x="250" y="112" width="220" height="240" rx="14" {...stroke(colors.white, 5)} style={drawn(seg(p, 0, 0.4))} />
        <rect x="320" y="96" width="80" height="34" rx="8" {...stroke(colors.white, 5)} style={drawn(seg(p, 0.1, 0.4))} />
        {[172, 217, 262].map((y, i) => (
          <g key={i} opacity={clamp(seg(p, 0.35 + i * 0.1, 0.6 + i * 0.1))}>
            <circle cx="294" cy={y} r="13" {...stroke(i === 0 ? colors.orange : colors.lightBlue, 4)} />
            <path d={`M287 ${y} l5 6 l11 -13`} {...stroke(i === 0 ? colors.orange : colors.lightBlue, 4)} />
            <path d={`M322 ${y} h108`} {...stroke(colors.lightBlue, 4)} />
          </g>
        ))}
      </g>
      <Label x={360} y={392} text="COMPLIANCE WITH REGULATIONS" show={seg(p, 0.6, 0.9)} color={colors.textDim} />
    </svg>
  );
};

// 24 — ETHICS: a code of ethics backed by a whistleblowing channel.
const Ethics: React.FC<IlluProps> = ({ p }) => {
  const ring = clamp(seg(p, 0.62, 0.88));
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <g opacity={clamp(seg(p, 0.05, 0.4))}>
        <rect x="150" y="138" width="184" height="162" rx="10" {...stroke(colors.white, 5)} style={drawn(seg(p, 0.05, 0.4))} />
        <path d="M242 138 V300" {...stroke(colors.white, 4)} />
        <path d="M172 176 h52 M172 206 h52 M262 176 h52 M262 206 h52" {...stroke(colors.lightBlue, 3)} style={{ opacity: clamp(seg(p, 0.3, 0.55)) }} />
      </g>
      <Label x={242} y={336} text="CODE OF ETHICS" show={seg(p, 0.4, 0.65)} />
      {/* whistle (orange = the single accent) */}
      <g opacity={clamp(seg(p, 0.5, 0.8))} transform="translate(498 212)">
        <rect x="-12" y="-22" width="72" height="44" rx="22" fill={colors.orange} />
        <rect x="42" y="-36" width="22" height="24" rx="5" fill={colors.orange} />
        <circle cx="6" cy="0" r="9" fill={colors.deepBlue} />
        <g opacity={ring}>
          <path d="M80 -6 a18 18 0 0 1 0 12" {...stroke(colors.orange, 3)} />
          <path d="M92 -16 a32 32 0 0 1 0 32" {...stroke(colors.orange, 3)} />
        </g>
      </g>
      <Label x={520} y={300} text="WHISTLEBLOWING" show={seg(p, 0.72, 0.96)} />
    </svg>
  );
};

// 25 — INSIDER DEALING: closed periods prevent trading on price-sensitive info.
const InsiderDealing: React.FC<IlluProps> = ({ p }) => {
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <path d="M150 300 H600 M150 300 V120" {...stroke(colors.mediumBlue, 3)} style={drawn(seg(p, 0, 0.3))} />
      {/* closed-period band (orange-tinted) */}
      <g opacity={clamp(seg(p, 0.3, 0.55))}>
        <rect x="378" y="120" width="124" height="180" fill={`${colors.orange}26`} />
        <text x="440" y="146" fill={colors.orange} fontFamily={inter} fontSize="16" fontWeight={700} textAnchor="middle">
          CLOSED
        </text>
      </g>
      <path d="M160 280 L240 250 L300 262 L360 208 L440 216 L520 168 L590 150" {...stroke(colors.white, 4)} style={drawn(seg(p, 0.3, 0.72))} />
      {/* barred dealing (orange no-entry) */}
      <g opacity={clamp(seg(p, 0.6, 0.85))} transform="translate(440 232)">
        <circle cx="0" cy="0" r="26" {...stroke(colors.orange, 5)} />
        <path d="M-18 -18 l36 36" {...stroke(colors.orange, 5)} />
      </g>
      <Label x={360} y={356} text="CLOSED PERIOD — NO DEALING" show={seg(p, 0.7, 0.95)} color={colors.textDim} />
    </svg>
  );
};

// 26 — CONSEQUENCES: statutory breach carries escalating consequences.
const Consequences: React.FC<IlluProps> = ({ p }) => {
  const tags = [
    { l: "REPUTATION", cx: 248, cy: 298 },
    { l: "PERSONAL LIABILITY", cx: 472, cy: 298 },
    { l: "IMPRISONMENT", cx: 248, cy: 362 },
    { l: "DISQUALIFICATION", cx: 472, cy: 362 },
  ];
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      {/* gavel (orange) */}
      <g opacity={clamp(seg(p, 0, 0.4))} transform="translate(360 118) rotate(-20)">
        <rect x="-52" y="-22" width="104" height="44" rx="12" fill={colors.orange} />
        <rect x="-9" y="22" width="18" height="86" rx="7" fill={colors.orange} />
      </g>
      <rect x="296" y="232" width="128" height="16" rx="6" {...stroke(colors.white, 4)} style={drawn(seg(p, 0.2, 0.5))} />
      {tags.map((tg, i) => {
        const dr = seg(p, 0.5 + i * 0.07, 0.78 + i * 0.07);
        return (
          <g key={tg.l} opacity={clamp(dr * 2)}>
            <rect x={tg.cx - 102} y={tg.cy - 22} width="204" height="44" rx="11" {...stroke(colors.lightBlue, 3)} />
            <text x={tg.cx} y={tg.cy + 6} fill={colors.lightBlue} fontFamily={inter} fontSize="17" fontWeight={600} textAnchor="middle">
              {tg.l}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

// 27 — RESIGN vs REMOVE: removal means publication and a lifetime bar, so
// boards often prefer to let the director resign.
const ResignVsRemove: React.FC<IlluProps> = ({ p }) => {
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <g opacity={clamp(seg(p, 0, 0.35))}>
        <Person x={360} y={86} color={colors.white} draw={seg(p, 0.05, 0.4)} />
      </g>
      <path d="M360 116 V150 M218 196 L360 150 L502 196" {...stroke(colors.mediumBlue, 4)} style={drawn(seg(p, 0.2, 0.5))} />
      {/* RESIGN — preferred (orange = the single accent) */}
      <g opacity={clamp(seg(p, 0.42, 0.72))}>
        <rect x="120" y="196" width="190" height="130" rx="14" {...stroke(colors.orange, 5)} style={drawn(seg(p, 0.42, 0.68))} />
        <text x="215" y="246" fill={colors.orange} fontFamily={inter} fontSize="26" fontWeight={700} textAnchor="middle">
          RESIGN
        </text>
        <path d="M180 282 l22 24 l46 -54" {...stroke(colors.orange, 7)} style={drawn(seg(p, 0.58, 0.82))} />
      </g>
      <Label x={215} y={360} text="PREFERRED" show={seg(p, 0.6, 0.85)} color={colors.textDim} />
      {/* REMOVE — heavy */}
      <g opacity={clamp(seg(p, 0.52, 0.82))}>
        <rect x="450" y="196" width="190" height="130" rx="14" {...stroke(colors.lightBlue, 4)} style={drawn(seg(p, 0.52, 0.78))} />
        <text x="545" y="246" fill={colors.lightBlue} fontFamily={inter} fontSize="26" fontWeight={700} textAnchor="middle">
          REMOVE
        </text>
        <circle cx="545" cy="290" r="22" {...stroke(colors.textMuted, 4)} />
        <path d="M530 275 l30 30" {...stroke(colors.textMuted, 4)} />
      </g>
      <Label x={545} y={360} text="PUBLISHED · BARRED FOR LIFE" show={seg(p, 0.7, 0.92)} color={colors.textDim} />
    </svg>
  );
};

// 28 — TIMELINE: the evolution of corporate governance in Nigeria.
const Timeline: React.FC<IlluProps> = ({ p }) => {
  const items = [
    { y: "1968", l: "CAMA", x: 120 },
    { y: "2011", l: "SEC CODE", x: 240 },
    { y: "2018", l: "NCCG", x: 360, hot: true },
    { y: "2020", l: "CAMA", x: 480 },
    { y: "2023", l: "BFA", x: 600 },
  ];
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <path d="M88 230 H624" {...stroke(colors.mediumBlue, 4)} style={drawn(seg(p, 0, 0.4))} />
      <path d="M624 230 l-18 -10 m18 10 l-18 10" {...stroke(colors.mediumBlue, 4)} style={{ opacity: clamp(seg(p, 0.35, 0.5)) }} />
      {items.map((it, i) => {
        const dr = seg(p, 0.18 + i * 0.13, 0.48 + i * 0.13);
        const c = it.hot ? colors.orange : colors.white;
        return (
          <g key={i} opacity={clamp(dr * 2)}>
            <circle cx={it.x} cy="230" r={it.hot ? 16 : 11} fill={c} />
            <text x={it.x} y="188" fill={c} fontFamily={inter} fontSize="27" fontWeight={700} textAnchor="middle">
              {it.y}
            </text>
            <text x={it.x} y="282" fill={colors.textDim} fontFamily={inter} fontSize="15" fontWeight={600} textAnchor="middle">
              {it.l}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

// 29 — HARMONISE: many sectoral codes converge into one Code (the NCCG).
const Harmonise: React.FC<IlluProps> = ({ p }) => {
  const src: [string, number][] = [
    ["SEC", 96],
    ["CBN", 162],
    ["NAICOM", 228],
    ["PENCOM", 294],
    ["NCC", 360],
  ];
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      {src.map(([l, y], i) => {
        const dr = seg(p, 0.1 + i * 0.07, 0.4 + i * 0.07);
        return (
          <g key={l} opacity={clamp(dr * 2)}>
            <rect x="116" y={y - 22} width="150" height="44" rx="10" {...stroke(colors.lightBlue, 3)} />
            <text x="191" y={y + 6} fill={colors.lightBlue} fontFamily={inter} fontSize="18" fontWeight={600} textAnchor="middle">
              {l}
            </text>
            <path d={`M266 ${y} C370 ${y} 380 230 470 230`} {...stroke(colors.mediumBlue, 3)} style={drawn(seg(p, 0.4 + i * 0.05, 0.7 + i * 0.05))} />
          </g>
        );
      })}
      <g opacity={clamp(seg(p, 0.62, 0.88))}>
        <rect x="478" y="196" width="162" height="70" rx="14" fill={colors.orange} />
        <text x="559" y="226" fill={colors.deepBlue} fontFamily={inter} fontSize="23" fontWeight={700} textAnchor="middle">
          NCCG
        </text>
        <text x="559" y="251" fill={colors.deepBlue} fontFamily={inter} fontSize="15" fontWeight={600} textAnchor="middle">
          2018
        </text>
      </g>
    </svg>
  );
};

// 30 — STRICTER: where a guideline and the Code conflict, the stricter applies.
const Stricter: React.FC<IlluProps> = ({ p }) => {
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <g opacity={clamp(seg(p, 0.1, 0.45))}>
        <rect x="92" y="150" width="236" height="148" rx="14" {...stroke(colors.lightBlue, 4)} style={drawn(seg(p, 0.1, 0.42))} />
        <text x="210" y="196" fill={colors.lightBlue} fontFamily={inter} fontSize="22" fontWeight={700} textAnchor="middle">
          NCCG
        </text>
        <text x="210" y="236" fill={colors.textDim} fontFamily={inter} fontSize="18" textAnchor="middle">
          Tenure: board's
        </text>
        <text x="210" y="260" fill={colors.textDim} fontFamily={inter} fontSize="18" textAnchor="middle">
          discretion
        </text>
      </g>
      <text x="360" y="232" fill={colors.textMuted} fontFamily={inter} fontSize="22" fontWeight={700} textAnchor="middle" opacity={clamp(seg(p, 0.4, 0.6))}>
        VS
      </text>
      <g opacity={clamp(seg(p, 0.4, 0.7))}>
        <rect x="432" y="150" width="236" height="148" rx="14" {...stroke(colors.orange, 5)} style={drawn(seg(p, 0.4, 0.7))} />
        <text x="550" y="194" fill={colors.orange} fontFamily={inter} fontSize="20" fontWeight={700} textAnchor="middle">
          CBN GUIDELINE
        </text>
        <text x="550" y="244" fill={colors.white} fontFamily={inter} fontSize="34" fontWeight={700} textAnchor="middle">
          12 years
        </text>
      </g>
      <g opacity={clamp(seg(p, 0.66, 0.9))}>
        <rect x="432" y="322" width="236" height="40" rx="20" fill={colors.orange} />
        <text x="550" y="348" fill={colors.deepBlue} fontFamily={inter} fontSize="17" fontWeight={700} textAnchor="middle">
          STRICTER APPLIES
        </text>
      </g>
    </svg>
  );
};

// 31 — BOARD COMPOSITION: executive, non-executive and ≥1 independent director.
const BoardComposition: React.FC<IlluProps> = ({ p }) => {
  const seats: [string, number, string][] = [
    ["ED", 150, colors.white],
    ["ED", 255, colors.white],
    ["NED", 360, colors.white],
    ["NED", 465, colors.white],
    ["INED", 575, colors.orange],
  ];
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <ellipse cx="360" cy="252" rx="285" ry="58" {...stroke(colors.mediumBlue, 4)} style={drawn(seg(p, 0, 0.35))} />
      {seats.map(([l, x, c], i) => {
        const dr = seg(p, 0.2 + i * 0.1, 0.5 + i * 0.1);
        return (
          <g key={i} opacity={clamp(dr * 2)}>
            <Person x={x} y={172} s={0.85} color={c} draw={1} />
            <text x={x} y={236} fill={c} fontFamily={inter} fontSize="17" fontWeight={700} textAnchor="middle">
              {l}
            </text>
          </g>
        );
      })}
      <Label x={575} y={336} text="≥ 1 INDEPENDENT" show={seg(p, 0.7, 0.95)} color={colors.orange} />
    </svg>
  );
};

// 32 — DIVERSITY: board diversity is more than gender.
const Diversity: React.FC<IlluProps> = ({ p }) => {
  const people: [number, number, string][] = [
    [160, 0.8, colors.white],
    [270, 1.0, colors.lightBlue],
    [380, 0.74, colors.white],
    [490, 0.95, colors.lightBlue],
    [600, 0.86, colors.white],
  ];
  const tags = ["GENDER", "AGE", "EXPERIENCE", "BACKGROUND", "ETHNICITY"];
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      {people.map(([x, s, c], i) => (
        <g key={i} opacity={clamp(seg(p, 0.1 + i * 0.08, 0.4 + i * 0.08) * 2)}>
          <Person x={x} y={172} s={s} color={c} draw={1} />
        </g>
      ))}
      <g opacity={clamp(seg(p, 0.55, 0.85))}>
        {tags.map((tg, i) => (
          <text key={tg} x={134 + i * 116} y="300" fill={colors.textDim} fontFamily={inter} fontSize="15" fontWeight={600} textAnchor="middle">
            {tg}
          </text>
        ))}
      </g>
      <Label x={360} y={362} text="DIVERSITY — BEYOND GENDER" show={seg(p, 0.7, 0.95)} color={colors.orange} />
    </svg>
  );
};

// 33 — BOARD REFRESH: fixed tenure lets the board refresh its membership.
const BoardRefresh: React.FC<IlluProps> = ({ p }) => {
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      {/* refresh ring (orange = the single accent) */}
      <path d="M360 138 A92 92 0 1 1 268 230" {...stroke(colors.orange, 6)} style={drawn(seg(p, 0.2, 0.7))} />
      <path d="M268 230 l-2 -32 l30 16 Z" fill={colors.orange} opacity={clamp(seg(p, 0.62, 0.82))} />
      <g opacity={clamp(seg(p, 0, 0.4))}>
        <Person x={360} y={222} color={colors.white} draw={seg(p, 0.05, 0.4)} />
      </g>
      <Label x={360} y={292} text="FIXED TENURE" show={seg(p, 0.4, 0.65)} />
      <g opacity={clamp(seg(p, 0.5, 0.75))}>
        <Person x={170} y={330} s={0.78} color={colors.textMuted} draw={1} />
        <text x="170" y="386" fill={colors.textMuted} fontFamily={inter} fontSize="16" fontWeight={600} textAnchor="middle">
          STEPS OFF
        </text>
      </g>
      <g opacity={clamp(seg(p, 0.62, 0.86))}>
        <Person x={560} y={330} s={0.82} color={colors.lightBlue} draw={1} />
        <text x="560" y="386" fill={colors.lightBlue} fontFamily={inter} fontSize="16" fontWeight={600} textAnchor="middle">
          JOINS
        </text>
      </g>
    </svg>
  );
};

// 34 — REMUNERATION LIMITS: directors' pay is restricted to a few components.
const RemunerationLimits: React.FC<IlluProps> = ({ p }) => {
  const ok: [string, number][] = [
    ["DIRECTORS' FEES", 152],
    ["SITTING ALLOWANCE", 222],
    ["REIMBURSABLE EXPENSES", 292],
  ];
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      {ok.map(([l, y], i) => {
        const dr = seg(p, 0.1 + i * 0.1, 0.4 + i * 0.1);
        return (
          <g key={l} opacity={clamp(dr * 2)}>
            <circle cx="200" cy={y} r="14" {...stroke(colors.lightBlue, 4)} />
            <path d={`M193 ${y} l5 6 l11 -13`} {...stroke(colors.lightBlue, 4)} />
            <rect x="234" y={y - 25} width="300" height="50" rx="11" {...stroke(colors.lightBlue, 3)} />
            <text x="384" y={y + 6} fill={colors.white} fontFamily={inter} fontSize="18" fontWeight={600} textAnchor="middle">
              {l}
            </text>
          </g>
        );
      })}
      {/* excluded "other pay" (orange = the single accent) */}
      <g opacity={clamp(seg(p, 0.6, 0.86))}>
        <circle cx="200" cy="362" r="16" {...stroke(colors.orange, 5)} />
        <path d="M189 351 l22 22" {...stroke(colors.orange, 5)} />
        <rect x="234" y="337" width="300" height="50" rx="11" {...stroke(colors.textMuted, 3)} />
        <text x="384" y="368" fill={colors.textMuted} fontFamily={inter} fontSize="18" fontWeight={600} textAnchor="middle">
          ANY OTHER PAY
        </text>
      </g>
    </svg>
  );
};

// 35 — TRAINING: periodic training for all directors, induction for new ones.
const Training: React.FC<IlluProps> = ({ p }) => {
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <g opacity={clamp(seg(p, 0, 0.4))}>
        <Person x={280} y={222} color={colors.white} draw={seg(p, 0.05, 0.4)} />
      </g>
      {/* mortarboard (orange) */}
      <g opacity={clamp(seg(p, 0.4, 0.65))} transform="translate(280 170)">
        <path d="M-48 0 L0 -22 L48 0 L0 22 Z" fill={colors.orange} />
        <path d="M48 0 V22" {...stroke(colors.orange, 4)} />
        <circle cx="48" cy="24" r="4" fill={colors.orange} />
      </g>
      <Label x={280} y={300} text="PERIODIC TRAINING" show={seg(p, 0.45, 0.7)} />
      <g opacity={clamp(seg(p, 0.6, 0.85))}>
        <path d="M360 220 H470" {...stroke(colors.lightBlue, 3)} strokeDasharray="3 9" style={drawn(seg(p, 0.6, 0.85))} />
        <rect x="470" y="194" width="180" height="58" rx="12" {...stroke(colors.lightBlue, 3)} />
        <text x="560" y="218" fill={colors.lightBlue} fontFamily={inter} fontSize="17" fontWeight={700} textAnchor="middle">
          NEW DIRECTORS
        </text>
        <text x="560" y="240" fill={colors.textDim} fontFamily={inter} fontSize="15" fontWeight={500} textAnchor="middle">
          → induction
        </text>
      </g>
    </svg>
  );
};

// 36 — COMPANY SECRETARY: reports functionally to the board, dotted line to CEO.
const CompanySecretary: React.FC<IlluProps> = ({ p }) => {
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <g opacity={clamp(seg(p, 0, 0.35))}>
        <rect x="280" y="78" width="160" height="60" rx="14" {...stroke(colors.white, 5)} style={drawn(seg(p, 0, 0.35))} />
        <text x="360" y="115" fill={colors.white} fontFamily={inter} fontSize="22" fontWeight={700} textAnchor="middle">
          BOARD
        </text>
      </g>
      {/* solid functional reporting line (orange = the single accent) */}
      <path d="M360 232 V138" {...stroke(colors.orange, 5)} style={drawn(seg(p, 0.3, 0.6))} />
      <text x="382" y="190" fill={colors.orange} fontFamily={inter} fontSize="15" fontWeight={600}>
        reports to
      </text>
      <g opacity={clamp(seg(p, 0.25, 0.55))}>
        <rect x="248" y="232" width="224" height="66" rx="14" {...stroke(colors.lightBlue, 4)} style={drawn(seg(p, 0.25, 0.55))} />
        <text x="360" y="272" fill={colors.white} fontFamily={inter} fontSize="20" fontWeight={700} textAnchor="middle">
          COMPANY SEC.
        </text>
      </g>
      {/* dotted administrative line to CEO */}
      <g opacity={clamp(seg(p, 0.55, 0.85))}>
        <path d="M472 264 H560" {...stroke(colors.textMuted, 3)} strokeDasharray="3 9" style={drawn(seg(p, 0.6, 0.85))} />
        <text x="516" y="252" fill={colors.textMuted} fontFamily={inter} fontSize="13" fontWeight={500} textAnchor="middle">
          admin
        </text>
        <rect x="560" y="234" width="120" height="60" rx="12" {...stroke(colors.lightBlue, 3)} />
        <text x="620" y="270" fill={colors.lightBlue} fontFamily={inter} fontSize="20" fontWeight={700} textAnchor="middle">
          CEO
        </text>
      </g>
    </svg>
  );
};

// 37 — DEAL SNAPSHOT: the two sides of the Facebook/Instagram acquisition.
const DealSnapshot: React.FC<IlluProps> = ({ p }) => {
  const col = (x: number, title: string, facts: string[], base: number) => (
    <g opacity={clamp(seg(p, base, base + 0.3))}>
      <rect x={x} y="78" width="280" height="288" rx="16" {...stroke(colors.lightBlue, 3)} style={drawn(seg(p, base, base + 0.3))} />
      <text x={x + 140} y="122" fill={colors.white} fontFamily={inter} fontSize="24" fontWeight={700} textAnchor="middle">
        {title}
      </text>
      <path d={`M${x + 40} 140 H${x + 240}`} {...stroke(colors.mediumBlue, 2)} />
      {facts.map((f, i) => (
        <text key={i} x={x + 140} y={184 + i * 44} fill={colors.textDim} fontFamily={inter} fontSize="18" textAnchor="middle">
          {f}
        </text>
      ))}
    </g>
  );
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      {col(36, "FACEBOOK", ["Zuckerberg — 28% stock", "57% of voting rights", "IPO weeks away"], 0.05)}
      {col(444, "INSTAGRAM", ["Kevin — 45% owner", "18 months old", "13 employees", "35M users · $0 revenue"], 0.25)}
      <g opacity={clamp(seg(p, 0.5, 0.75))}>
        <path d="M324 224 H436" {...stroke(colors.orange, 5)} style={drawn(seg(p, 0.5, 0.72))} />
        <path d="M436 224 l-18 -11 m18 11 l-18 11" {...stroke(colors.orange, 5)} />
        <text x="380" y="206" fill={colors.orange} fontFamily={inter} fontSize="14" fontWeight={700} textAnchor="middle">
          BUYS
        </text>
      </g>
    </svg>
  );
};

// 38 — DEAL TIMELINE: three days from phone call to public announcement.
const DealTimeline: React.FC<IlluProps> = ({ p }) => {
  const items = [
    { d: "THU", l: "Zuckerberg calls", x: 120 },
    { d: "WEEKEND", l: "CEOs negotiate", x: 305 },
    { d: "SUN", l: "board emailed", x: 470, hot: true },
    { d: "MON", l: "deal announced", x: 615 },
  ];
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <path d="M88 222 H648" {...stroke(colors.mediumBlue, 4)} style={drawn(seg(p, 0, 0.4))} />
      <path d="M648 222 l-18 -10 m18 10 l-18 10" {...stroke(colors.mediumBlue, 4)} style={{ opacity: clamp(seg(p, 0.35, 0.5)) }} />
      {items.map((it, i) => {
        const dr = seg(p, 0.2 + i * 0.16, 0.5 + i * 0.16);
        const c = it.hot ? colors.orange : colors.white;
        return (
          <g key={i} opacity={clamp(dr * 2)}>
            <circle cx={it.x} cy="222" r={it.hot ? 15 : 11} fill={c} />
            <text x={it.x} y="180" fill={c} fontFamily={inter} fontSize="22" fontWeight={700} textAnchor="middle">
              {it.d}
            </text>
            <text x={it.x} y="268" fill={colors.textDim} fontFamily={inter} fontSize="15" fontWeight={600} textAnchor="middle">
              {it.l}
            </text>
          </g>
        );
      })}
      <Label x={470} y={312} text="BOARD LOOPED IN LAST" show={seg(p, 0.75, 0.95)} color={colors.orange} />
    </svg>
  );
};

// 39 — BOARD BYPASSED: two CEOs decide; the board is out of the loop.
const BoardBypassed: React.FC<IlluProps> = ({ p }) => {
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <g opacity={clamp(seg(p, 0.05, 0.4))}>
        <Person x={250} y={180} color={colors.orange} draw={seg(p, 0.05, 0.4)} />
        <Person x={420} y={180} color={colors.white} draw={seg(p, 0.1, 0.45)} />
        <path d="M286 196 H384" {...stroke(colors.orange, 4)} style={drawn(seg(p, 0.3, 0.55))} />
      </g>
      <Label x={335} y={262} text="TWO CEOs DECIDE" show={seg(p, 0.4, 0.65)} />
      <g opacity={clamp(seg(p, 0.55, 0.82))}>
        <path d="M556 104 V336" {...stroke(colors.mediumBlue, 3)} strokeDasharray="4 12" />
        {([[616, 158], [676, 158], [616, 250], [676, 250]] as [number, number][]).map(([x, y], i) => (
          <Person key={i} x={x} y={y} s={0.58} color={colors.textMuted} draw={1} />
        ))}
        <text x="646" y="322" fill={colors.textMuted} fontFamily={inter} fontSize="15" fontWeight={600} textAnchor="middle">
          THE BOARD
        </text>
        <text x="646" y="118" fill={colors.textMuted} fontFamily={inter} fontSize="30" fontWeight={700} textAnchor="middle">
          ?
        </text>
      </g>
    </svg>
  );
};

// 40 — TONE AT THE TOP: ethical tone cascades from the board down.
const ToneAtTop: React.FC<IlluProps> = ({ p }) => {
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <g opacity={clamp(seg(p, 0, 0.4))}>
        <path d="M360 92 L298 162 H422 Z" fill={colors.orange} />
        <text x="360" y="150" fill={colors.deepBlue} fontFamily={inter} fontSize="15" fontWeight={700} textAnchor="middle">
          BOARD
        </text>
      </g>
      <g opacity={clamp(seg(p, 0.32, 0.62))}>
        <path d="M288 174 L256 242 H464 L432 174 Z" {...stroke(colors.lightBlue, 4)} style={drawn(seg(p, 0.32, 0.6))} />
        <text x="360" y="218" fill={colors.lightBlue} fontFamily={inter} fontSize="16" fontWeight={600} textAnchor="middle">
          MANAGEMENT
        </text>
      </g>
      <g opacity={clamp(seg(p, 0.52, 0.82))}>
        <path d="M246 254 L214 322 H506 L474 254 Z" {...stroke(colors.lightBlue, 4)} style={drawn(seg(p, 0.52, 0.8))} />
        <text x="360" y="298" fill={colors.lightBlue} fontFamily={inter} fontSize="16" fontWeight={600} textAnchor="middle">
          EVERYONE
        </text>
      </g>
      <Label x={360} y={368} text="TONE AT THE TOP" show={seg(p, 0.72, 0.95)} color={colors.orange} />
    </svg>
  );
};

// 41 — CONTINUITY: a continuity plan carries the business across a crisis.
const Continuity: React.FC<IlluProps> = ({ p }) => {
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <path d="M90 256 H320" {...stroke(colors.white, 5)} style={drawn(seg(p, 0, 0.35))} />
      <path d="M440 256 H660" {...stroke(colors.white, 5)} style={drawn(seg(p, 0.1, 0.4))} />
      <g opacity={clamp(seg(p, 0.3, 0.55))}>
        <text x="380" y="214" fill={colors.textMuted} fontFamily={inter} fontSize="16" fontWeight={700} textAnchor="middle">
          CRISIS
        </text>
        <path d="M338 256 l18 -18 m-18 18 l18 18 M422 256 l-18 -18 m18 18 l-18 18" {...stroke(colors.textMuted, 3)} />
      </g>
      <g opacity={clamp(seg(p, 0.5, 0.8))}>
        <path d="M320 256 C360 198 400 198 440 256" {...stroke(colors.orange, 6)} style={drawn(seg(p, 0.5, 0.78))} />
        <text x="380" y="172" fill={colors.orange} fontFamily={inter} fontSize="15" fontWeight={700} textAnchor="middle">
          CONTINUITY PLAN
        </text>
      </g>
      <g opacity={clamp(seg(p, 0.62, 0.86))}>
        <Person x={540} y={234} s={0.85} color={colors.lightBlue} draw={1} />
      </g>
      <Label x={300} y={326} text="SURVIVE & CONTINUE" show={seg(p, 0.78, 0.96)} color={colors.textDim} />
    </svg>
  );
};

// 42 — CEO SEAT: the board hires, evaluates and can remove the CEO.
const CeoSeat: React.FC<IlluProps> = ({ p }) => {
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <g opacity={clamp(seg(p, 0, 0.4))}>
        {[300, 360, 420].map((x, i) => (
          <Person key={i} x={x} y={118} s={0.7} color={colors.white} draw={seg(p, 0.05, 0.4)} />
        ))}
        <text x="360" y="182" fill={colors.white} fontFamily={inter} fontSize="18" fontWeight={700} textAnchor="middle">
          THE BOARD
        </text>
      </g>
      <path d="M360 198 V252" {...stroke(colors.mediumBlue, 4)} style={drawn(seg(p, 0.3, 0.55))} />
      <g opacity={clamp(seg(p, 0.4, 0.7))}>
        <Person x={360} y={292} color={colors.orange} draw={seg(p, 0.4, 0.65)} />
        <text x="360" y="350" fill={colors.orange} fontFamily={inter} fontSize="18" fontWeight={700} textAnchor="middle">
          CEO
        </text>
      </g>
      <g opacity={clamp(seg(p, 0.6, 0.85))}>
        <path d="M150 296 l9 11 l18 -20" {...stroke(colors.lightBlue, 5)} />
        <text x="196" y="300" fill={colors.lightBlue} fontFamily={inter} fontSize="18" fontWeight={700}>
          HIRE
        </text>
        <path d="M548 282 l28 28 m0 -28 l-28 28" {...stroke(colors.textMuted, 5)} />
        <text x="582" y="300" fill={colors.textMuted} fontFamily={inter} fontSize="18" fontWeight={700}>
          REMOVE
        </text>
      </g>
    </svg>
  );
};

// 43 — SIX ELEMENTS: the elements of board effectiveness (composition first).
const SixElements: React.FC<IlluProps> = ({ p }) => {
  const items = ["COMPOSITION", "COMMITTEES", "DYNAMICS", "AGENDA", "DYSFUNCTION", "EVALUATION"];
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      {items.map((l, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = 170 + col * 215;
        const y = 168 + row * 116;
        const hot = i === 0;
        const dr = seg(p, 0.1 + i * 0.08, 0.4 + i * 0.08);
        return (
          <g key={l} opacity={clamp(dr * 2)}>
            <rect
              x={x - 92}
              y={y - 42}
              width="184"
              height="84"
              rx="14"
              fill={hot ? colors.orange : "none"}
              stroke={hot ? "none" : colors.lightBlue}
              strokeWidth={hot ? 0 : 3}
            />
            <text x={x} y={y - 14} fill={hot ? colors.deepBlue : colors.textMuted} fontFamily={inter} fontSize="13" fontWeight={700} textAnchor="middle">
              {i + 1}
            </text>
            <text x={x} y={y + 14} fill={hot ? colors.deepBlue : colors.white} fontFamily={inter} fontSize="16" fontWeight={700} textAnchor="middle">
              {l}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

// 44 — NED MAJORITY: non-executive directors should be the majority.
const NedMajority: React.FC<IlluProps> = ({ p }) => {
  const eds: [number, number][] = [[200, 210], [288, 210]];
  const neds: [number, number][] = [[420, 178], [492, 178], [564, 178], [456, 258], [528, 258]];
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      {eds.map(([x, y], i) => (
        <g key={i} opacity={clamp(seg(p, 0.1 + i * 0.08, 0.4 + i * 0.08) * 2)}>
          <Person x={x} y={y} s={0.8} color={colors.white} draw={1} />
        </g>
      ))}
      <Label x={244} y={292} text="EXECUTIVES" show={seg(p, 0.35, 0.6)} />
      {neds.map(([x, y], i) => (
        <g key={i} opacity={clamp(seg(p, 0.3 + i * 0.06, 0.6 + i * 0.06) * 2)}>
          <Person x={x} y={y} s={0.8} color={colors.lightBlue} draw={1} />
        </g>
      ))}
      <g opacity={clamp(seg(p, 0.66, 0.9))}>
        <path d="M398 322 H582 M398 322 V308 M582 322 V308" {...stroke(colors.orange, 4)} />
        <text x="490" y="354" fill={colors.orange} fontFamily={inter} fontSize="18" fontWeight={700} textAnchor="middle">
          NON-EXECS = MAJORITY
        </text>
      </g>
    </svg>
  );
};

// 45 — SEPARATION OF POWER: board vs management, defined by a DoA document.
const SeparationOfPower: React.FC<IlluProps> = ({ p }) => {
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <g opacity={clamp(seg(p, 0.05, 0.4))}>
        <rect x="80" y="150" width="240" height="162" rx="16" {...stroke(colors.lightBlue, 4)} style={drawn(seg(p, 0.05, 0.4))} />
        <text x="200" y="202" fill={colors.white} fontFamily={inter} fontSize="22" fontWeight={700} textAnchor="middle">
          BOARD
        </text>
        <text x="200" y="236" fill={colors.textDim} fontFamily={inter} fontSize="15" textAnchor="middle">
          oversight
        </text>
        <text x="200" y="258" fill={colors.textDim} fontFamily={inter} fontSize="15" textAnchor="middle">
          &amp; strategy
        </text>
      </g>
      <g opacity={clamp(seg(p, 0.2, 0.55))}>
        <rect x="440" y="150" width="240" height="162" rx="16" {...stroke(colors.lightBlue, 4)} style={drawn(seg(p, 0.2, 0.55))} />
        <text x="560" y="202" fill={colors.white} fontFamily={inter} fontSize="21" fontWeight={700} textAnchor="middle">
          MANAGEMENT
        </text>
        <text x="560" y="236" fill={colors.textDim} fontFamily={inter} fontSize="15" textAnchor="middle">
          running the
        </text>
        <text x="560" y="258" fill={colors.textDim} fontFamily={inter} fontSize="15" textAnchor="middle">
          business
        </text>
      </g>
      <g opacity={clamp(seg(p, 0.5, 0.8))}>
        <path d="M380 118 V344" {...stroke(colors.orange, 4)} strokeDasharray="2 10" />
        <rect x="330" y="206" width="100" height="62" rx="10" fill={colors.orange} />
        <text x="380" y="232" fill={colors.deepBlue} fontFamily={inter} fontSize="14" fontWeight={700} textAnchor="middle">
          DoA
        </text>
        <text x="380" y="252" fill={colors.deepBlue} fontFamily={inter} fontSize="11" fontWeight={600} textAnchor="middle">
          document
        </text>
      </g>
      <Label x={380} y={376} text="CLEAR SEPARATION OF POWER" show={seg(p, 0.75, 0.95)} color={colors.textDim} />
    </svg>
  );
};

// 46 — CHAIR / MD SPLIT: the chairman and MD are two separate roles.
const ChairMdSplit: React.FC<IlluProps> = ({ p }) => {
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <g opacity={clamp(seg(p, 0.05, 0.4))}>
        <Person x={230} y={170} color={colors.white} draw={seg(p, 0.05, 0.4)} />
        <text x="230" y="240" fill={colors.white} fontFamily={inter} fontSize="20" fontWeight={700} textAnchor="middle">
          CHAIRMAN
        </text>
        <text x="230" y="266" fill={colors.textDim} fontFamily={inter} fontSize="15" textAnchor="middle">
          leads the board
        </text>
      </g>
      <g opacity={clamp(seg(p, 0.2, 0.55))}>
        <Person x={530} y={170} color={colors.white} draw={seg(p, 0.2, 0.55)} />
        <text x="530" y="240" fill={colors.white} fontFamily={inter} fontSize="20" fontWeight={700} textAnchor="middle">
          MD / CEO
        </text>
        <text x="530" y="266" fill={colors.textDim} fontFamily={inter} fontSize="15" textAnchor="middle">
          runs the company
        </text>
      </g>
      <path d="M380 108 V302" {...stroke(colors.orange, 4)} strokeDasharray="2 10" style={{ opacity: clamp(seg(p, 0.42, 0.66)) }} />
      <Label x={380} y={348} text="TWO ROLES — KEPT SEPARATE" show={seg(p, 0.6, 0.86)} color={colors.orange} />
    </svg>
  );
};

// 47 — OVER-BOARDED: a director stretched across too many boards (CAMA caps 5).
const OverBoarded: React.FC<IlluProps> = ({ p }) => {
  const cx = 360;
  const cy = 214;
  const boards: { x: number; y: number; ok: boolean }[] = [
    { x: 150, y: 118, ok: true },
    { x: 150, y: 312, ok: true },
    { x: 300, y: 86, ok: true },
    { x: 300, y: 344, ok: true },
    { x: 560, y: 130, ok: true },
    { x: 612, y: 296, ok: false },
    { x: 628, y: 196, ok: false },
  ];
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      {boards.map((b, i) => {
        const dr = seg(p, 0.2 + i * 0.07, 0.5 + i * 0.07);
        const c = b.ok ? colors.lightBlue : colors.textMuted;
        return (
          <g key={i} opacity={clamp(dr * 2)}>
            <path d={`M${cx} ${cy} L${b.x} ${b.y}`} {...stroke(b.ok ? colors.mediumBlue : colors.textMuted, 3)} strokeDasharray={b.ok ? undefined : "3 8"} />
            <rect x={b.x - 26} y={b.y - 18} width="52" height="36" rx="8" {...stroke(c, 3)} />
            {!b.ok && <path d={`M${b.x - 12} ${b.y - 12} l24 24`} {...stroke(colors.orange, 3)} />}
          </g>
        );
      })}
      <g opacity={clamp(seg(p, 0, 0.35))}>
        <Person x={cx} y={cy} color={colors.white} draw={seg(p, 0.05, 0.4)} />
      </g>
      <Label x={cx} y={392} text="MAX 5 PUBLIC BOARDS" show={seg(p, 0.7, 0.95)} color={colors.orange} />
    </svg>
  );
};

// 48 — COMMITTEES: the board's standing committees, each recommending upward.
const Committees: React.FC<IlluProps> = ({ p }) => {
  const coms: [string, number][] = [["AUDIT", 170], ["GOV & REM", 380], ["RISK", 590]];
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <g opacity={clamp(seg(p, 0, 0.35))}>
        <rect x="280" y="74" width="200" height="58" rx="14" {...stroke(colors.white, 5)} style={drawn(seg(p, 0, 0.35))} />
        <text x="380" y="110" fill={colors.white} fontFamily={inter} fontSize="22" fontWeight={700} textAnchor="middle">
          THE BOARD
        </text>
      </g>
      {coms.map(([l, x], i) => {
        const dr = seg(p, 0.3 + i * 0.12, 0.6 + i * 0.12);
        return (
          <g key={l} opacity={clamp(dr * 2)}>
            <path d={`M${x} 248 V134`} {...stroke(colors.mediumBlue, 3)} style={drawn(dr)} />
            <path d={`M${x} 150 l-8 14 m8 -14 l8 14`} {...stroke(colors.orange, 3)} style={{ opacity: clamp(seg(p, 0.6, 0.85)) }} />
            <rect x={x - 82} y="248" width="164" height="60" rx="12" {...stroke(colors.lightBlue, 3)} />
            <text x={x} y="284" fill={colors.lightBlue} fontFamily={inter} fontSize="18" fontWeight={700} textAnchor="middle">
              {l}
            </text>
          </g>
        );
      })}
      <Label x={380} y={356} text="EACH WITH A CHARTER" show={seg(p, 0.75, 0.95)} color={colors.textDim} />
    </svg>
  );
};

// 49 — BOARD DYNAMICS: how directors interact and behave.
const BoardDynamics: React.FC<IlluProps> = ({ p }) => {
  const seats: [number, number][] = [[300, 178], [420, 178], [300, 278], [420, 278]];
  const tags: [string, number, number][] = [
    ["PREPARED", 158, 150],
    ["KNOWLEDGEABLE", 600, 150],
    ["COLLABORATIVE", 158, 332],
    ["CANDID", 600, 332],
  ];
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <g opacity={clamp(seg(p, 0.32, 0.6))}>
        <path d="M300 178 L420 278 M420 178 L300 278 M300 178 L420 178 M300 278 L420 278" {...stroke(colors.orange, 2)} strokeDasharray="2 8" />
      </g>
      {seats.map(([x, y], i) => (
        <g key={i} opacity={clamp(seg(p, 0.1 + i * 0.07, 0.4 + i * 0.07) * 2)}>
          <Person x={x} y={y} s={0.7} color={colors.white} draw={1} />
        </g>
      ))}
      {tags.map(([l, x, y], i) => (
        <text key={l} x={x} y={y} fill={colors.textDim} fontFamily={inter} fontSize="15" fontWeight={600} textAnchor="middle" opacity={clamp(seg(p, 0.5 + i * 0.08, 0.8 + i * 0.08))}>
          {l}
        </text>
      ))}
      <Label x={360} y={392} text="GOOD BOARD DYNAMICS" show={seg(p, 0.8, 0.96)} color={colors.orange} />
    </svg>
  );
};

// 50 — CONSTRUCTIVE CHALLENGE: challenge management without making it defensive.
const ConstructiveChallenge: React.FC<IlluProps> = ({ p }) => {
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <g opacity={clamp(seg(p, 0.05, 0.4))}>
        {[200, 270].map((x, i) => (
          <Person key={i} x={x} y={206} s={0.75} color={colors.white} draw={1} />
        ))}
        <text x="235" y="268" fill={colors.textDim} fontFamily={inter} fontSize="15" fontWeight={600} textAnchor="middle">
          BOARD
        </text>
      </g>
      <g opacity={clamp(seg(p, 0.2, 0.55))}>
        {[450, 520].map((x, i) => (
          <Person key={i} x={x} y={206} s={0.75} color={colors.white} draw={1} />
        ))}
        <text x="485" y="268" fill={colors.textDim} fontFamily={inter} fontSize="15" fontWeight={600} textAnchor="middle">
          MANAGEMENT
        </text>
      </g>
      <path d="M150 322 H612" {...stroke(colors.mediumBlue, 3)} style={drawn(seg(p, 0.35, 0.6))} />
      <path d="M612 322 l-18 -10 m18 10 l-18 10" {...stroke(colors.mediumBlue, 3)} />
      <text x="360" y="354" fill={colors.textDim} fontFamily={inter} fontSize="15" fontWeight={600} textAnchor="middle">
        SAME DIRECTION
      </text>
      <g opacity={clamp(seg(p, 0.55, 0.82))}>
        <circle cx="360" cy="142" r="26" {...stroke(colors.orange, 4)} />
        <text x="360" y="152" fill={colors.orange} fontFamily={inter} fontSize="28" fontWeight={700} textAnchor="middle">
          ?
        </text>
        <text x="360" y="98" fill={colors.orange} fontFamily={inter} fontSize="14" fontWeight={700} textAnchor="middle">
          CHALLENGE, NOT ATTACK
        </text>
      </g>
    </svg>
  );
};

// 51 — AGENDA FILTER: a DoA sorts matters into what reaches the board.
const AgendaFilter: React.FC<IlluProps> = ({ p }) => {
  const outs: [string, number, boolean][] = [
    ["ON THE AGENDA", 170, true],
    ["REPORTED ONLY", 380, false],
    ["MANAGEMENT ONLY", 590, false],
  ];
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <g opacity={clamp(seg(p, 0, 0.35))}>
        <rect x="300" y="80" width="160" height="56" rx="12" {...stroke(colors.lightBlue, 4)} style={drawn(seg(p, 0, 0.35))} />
        <text x="380" y="114" fill={colors.lightBlue} fontFamily={inter} fontSize="18" fontWeight={700} textAnchor="middle">
          DoA
        </text>
      </g>
      {outs.map(([l, x, hot], i) => {
        const dr = seg(p, 0.3 + i * 0.12, 0.6 + i * 0.12);
        return (
          <g key={l} opacity={clamp(dr * 2)}>
            <path d={`M380 136 L${x} 244`} {...stroke(colors.mediumBlue, 2)} style={drawn(dr)} />
            <rect x={x - 92} y="248" width="184" height="64" rx="12" fill={hot ? colors.orange : "none"} stroke={hot ? "none" : colors.textMuted} strokeWidth={hot ? 0 : 3} />
            <text x={x} y="286" fill={hot ? colors.deepBlue : colors.textMuted} fontFamily={inter} fontSize="16" fontWeight={700} textAnchor="middle">
              {l}
            </text>
          </g>
        );
      })}
      <Label x={380} y={362} text="WHAT REACHES THE BOARD" show={seg(p, 0.75, 0.95)} color={colors.textDim} />
    </svg>
  );
};

// 52 — PAST vs FUTURE: shift agenda time from the past to the future.
const PastVsFuture: React.FC<IlluProps> = ({ p }) => {
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <g opacity={clamp(seg(p, 0.05, 0.4))}>
        <rect x="78" y="150" width="248" height="164" rx="16" {...stroke(colors.textMuted, 3)} style={drawn(seg(p, 0.05, 0.4))} />
        <text x="202" y="192" fill={colors.textDim} fontFamily={inter} fontSize="20" fontWeight={700} textAnchor="middle">
          THE PAST
        </text>
        {["accountability", "reporting", "risk & control"].map((t, i) => (
          <text key={t} x="202" y={226 + i * 26} fill={colors.textMuted} fontFamily={inter} fontSize="15" textAnchor="middle">
            {t}
          </text>
        ))}
      </g>
      <g opacity={clamp(seg(p, 0.32, 0.66))}>
        <rect x="434" y="150" width="248" height="164" rx="16" {...stroke(colors.orange, 4)} style={drawn(seg(p, 0.32, 0.62))} />
        <text x="558" y="192" fill={colors.orange} fontFamily={inter} fontSize="20" fontWeight={700} textAnchor="middle">
          THE FUTURE
        </text>
        {["strategy", "culture", "foresight"].map((t, i) => (
          <text key={t} x="558" y={226 + i * 26} fill={colors.white} fontFamily={inter} fontSize="15" textAnchor="middle">
            {t}
          </text>
        ))}
      </g>
      <g opacity={clamp(seg(p, 0.5, 0.78))}>
        <path d="M338 232 H422" {...stroke(colors.orange, 4)} style={drawn(seg(p, 0.5, 0.75))} />
        <path d="M422 232 l-16 -9 m16 9 l-16 9" {...stroke(colors.orange, 4)} />
      </g>
      <Label x={380} y={358} text="SPEND MORE TIME AHEAD" show={seg(p, 0.78, 0.95)} color={colors.textDim} />
    </svg>
  );
};

// 53 — DYSFUNCTIONAL DIRECTOR: the traits a board must spot and address.
const DysfunctionalDirector: React.FC<IlluProps> = ({ p }) => {
  const traits = ["OFTEN ABSENT", "UNPREPARED", "NEVER DISSENTS", "HIDDEN CONFLICTS", "DOMINEERING"];
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <g opacity={clamp(seg(p, 0, 0.4))}>
        <Person x={360} y={150} color={colors.textMuted} draw={seg(p, 0.05, 0.4)} />
      </g>
      <g opacity={clamp(seg(p, 0.4, 0.65))} transform="translate(408 116)">
        <path d="M0 -22 L22 18 H-22 Z" fill={colors.orange} />
        <path d="M0 -6 V8" {...stroke(colors.deepBlue, 4)} />
        <circle cx="0" cy="14" r="2.5" fill={colors.deepBlue} />
      </g>
      <Label x={360} y={236} text="DYSFUNCTIONAL" show={seg(p, 0.45, 0.7)} color={colors.orange} />
      {traits.map((t, i) => {
        const x = 130 + (i % 3) * 186;
        const y = 286 + Math.floor(i / 3) * 56;
        return (
          <g key={t} opacity={clamp(seg(p, 0.5 + i * 0.06, 0.8 + i * 0.06))}>
            <rect x={x - 86} y={y - 22} width="172" height="40" rx="20" {...stroke(colors.textMuted, 2)} />
            <text x={x} y={y + 4} fill={colors.textDim} fontFamily={inter} fontSize="14" fontWeight={600} textAnchor="middle">
              {t}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

// 54 — DOMINEERING CHAIR: one director suppresses everyone else's voice.
const DomineeringChair: React.FC<IlluProps> = ({ p }) => {
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <g opacity={clamp(seg(p, 0, 0.4))}>
        <Person x={360} y={196} s={1.4} color={colors.orange} draw={seg(p, 0.05, 0.45)} />
      </g>
      {[160, 244, 476, 560].map((x, i) => (
        <g key={i} opacity={clamp(seg(p, 0.32 + i * 0.07, 0.6 + i * 0.07) * 2)}>
          <Person x={x} y={262} s={0.62} color={colors.textMuted} draw={1} />
          <circle cx={x} cy="196" r="13" {...stroke(colors.textMuted, 2)} />
          <path d={`M${x - 8} 188 l16 16`} {...stroke(colors.textMuted, 2)} />
        </g>
      ))}
      <Label x={360} y={356} text="SUPPRESSES DISSENT" show={seg(p, 0.7, 0.95)} color={colors.orange} />
    </svg>
  );
};

// 55 — PEER REVIEW: directors assess each other objectively.
const PeerReview: React.FC<IlluProps> = ({ p }) => {
  const pts: [number, number][] = [[360, 110], [560, 240], [360, 360], [160, 240]];
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <g opacity={clamp(seg(p, 0.3, 0.6))}>
        <path d="M360 130 L560 230 M560 260 L360 350 M360 350 L160 260 M160 230 L360 130" {...stroke(colors.orange, 2)} strokeDasharray="2 8" />
      </g>
      {pts.map(([x, y], i) => (
        <g key={i} opacity={clamp(seg(p, 0.1 + i * 0.08, 0.4 + i * 0.08) * 2)}>
          <Person x={x} y={y} s={0.78} color={colors.white} draw={1} />
        </g>
      ))}
      <g opacity={clamp(seg(p, 0.6, 0.85))}>
        <circle cx="360" cy="238" r="32" fill={colors.orange} />
        <text x="360" y="248" fill={colors.deepBlue} fontFamily={inter} fontSize="24" fontWeight={700} textAnchor="middle">
          ★
        </text>
      </g>
      <Label x={360} y={414} text="PEER REVIEW — OBJECTIVE" show={seg(p, 0.75, 0.95)} color={colors.textDim} />
    </svg>
  );
};

// 56 — ESCALATION LADDER: conversation → coaching → resignation.
const EscalationLadder: React.FC<IlluProps> = ({ p }) => {
  const steps: [string, number, number, boolean][] = [
    ["CONVERSATION", 150, 304, false],
    ["COACHING", 360, 244, false],
    ["RESIGN", 570, 184, true],
  ];
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <path d="M150 304 L360 244 L570 184" {...stroke(colors.mediumBlue, 3)} style={drawn(seg(p, 0.2, 0.6))} />
      {steps.map(([l, x, y, hot], i) => {
        const dr = seg(p, 0.2 + i * 0.18, 0.5 + i * 0.18);
        return (
          <g key={l} opacity={clamp(dr * 2)}>
            <text x={x} y={y - 30} fill={colors.textMuted} fontFamily={inter} fontSize="13" fontWeight={600} textAnchor="middle">
              {`STEP ${i + 1}`}
            </text>
            <circle cx={x} cy={y} r="16" fill={hot ? colors.orange : colors.lightBlue} />
            <text x={x} y={y + 50} fill={hot ? colors.orange : colors.textDim} fontFamily={inter} fontSize="17" fontWeight={700} textAnchor="middle">
              {l}
            </text>
          </g>
        );
      })}
      <Label x={360} y={406} text="ESCALATE IF NEEDED" show={seg(p, 0.78, 0.96)} color={colors.textDim} />
    </svg>
  );
};

// 57 — REPLACE REP: a shareholder keeps the seat but changes the person.
const ReplaceRep: React.FC<IlluProps> = ({ p }) => {
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <g opacity={clamp(seg(p, 0, 0.4))}>
        <rect x="78" y="192" width="184" height="70" rx="14" {...stroke(colors.lightBlue, 4)} style={drawn(seg(p, 0, 0.4))} />
        <text x="170" y="234" fill={colors.lightBlue} fontFamily={inter} fontSize="18" fontWeight={700} textAnchor="middle">
          SHAREHOLDER
        </text>
      </g>
      <path d="M262 227 H360" {...stroke(colors.lightBlue, 4)} style={drawn(seg(p, 0.3, 0.55))} />
      <text x="312" y="210" fill={colors.textDim} fontFamily={inter} fontSize="13" textAnchor="middle">
        keeps the seat
      </text>
      <g opacity={clamp(seg(p, 0.45, 0.7))}>
        <Person x={452} y={306} s={0.78} color={colors.textMuted} draw={1} />
        <path d="M430 286 l44 44 m0 -44 l-44 44" {...stroke(colors.textMuted, 3)} />
        <text x="452" y="360" fill={colors.textMuted} fontFamily={inter} fontSize="14" textAnchor="middle">
          no value
        </text>
      </g>
      <g opacity={clamp(seg(p, 0.6, 0.85))}>
        <Person x={452} y={168} color={colors.orange} draw={seg(p, 0.6, 0.85)} />
        <text x="452" y="226" fill={colors.orange} fontFamily={inter} fontSize="14" fontWeight={700} textAnchor="middle">
          ADDS VALUE
        </text>
        <path d="M452 252 V214" {...stroke(colors.orange, 3)} style={drawn(seg(p, 0.66, 0.86))} />
      </g>
      <Label x={380} y={400} text="REPLACE — KEEP THE RIGHT" show={seg(p, 0.78, 0.96)} color={colors.textDim} />
    </svg>
  );
};

// 58 — BOARD EVALUATION: an external consultant reviews the board → a plan.
const BoardEvaluation: React.FC<IlluProps> = ({ p }) => {
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      <g opacity={clamp(seg(p, 0, 0.4))}>
        <rect x="70" y="178" width="150" height="92" rx="14" {...stroke(colors.lightBlue, 4)} style={drawn(seg(p, 0, 0.4))} />
        <text x="145" y="230" fill={colors.lightBlue} fontFamily={inter} fontSize="18" fontWeight={700} textAnchor="middle">
          BOARD
        </text>
      </g>
      <path d="M222 224 H300" {...stroke(colors.mediumBlue, 3)} style={drawn(seg(p, 0.3, 0.5))} />
      <g opacity={clamp(seg(p, 0.35, 0.62))} transform="translate(362 206)">
        <circle cx="0" cy="0" r="42" {...stroke(colors.orange, 6)} />
        <path d="M30 30 L58 58" {...stroke(colors.orange, 6)} />
      </g>
      <Label x={362} y={300} text="EXTERNAL REVIEW" show={seg(p, 0.5, 0.7)} color={colors.orange} />
      <g opacity={clamp(seg(p, 0.58, 0.85))}>
        <rect x="540" y="148" width="164" height="164" rx="12" {...stroke(colors.lightBlue, 4)} style={drawn(seg(p, 0.58, 0.82))} />
        <g transform="translate(562 186)">
          <path d="M0 0 l8 8 l14 -16" {...stroke(colors.lightBlue, 4)} />
          <text x="34" y="6" fill={colors.textDim} fontFamily={inter} fontSize="15">
            strengths
          </text>
        </g>
        <g transform="translate(562 234)">
          <text x="2" y="6" fill={colors.lightBlue} fontFamily={inter} fontSize="18" fontWeight={700}>
            !
          </text>
          <text x="34" y="6" fill={colors.textDim} fontFamily={inter} fontSize="15">
            gaps
          </text>
        </g>
        <g transform="translate(562 282)">
          <path d="M0 -4 h22 M0 2 h22 M0 8 h14" {...stroke(colors.lightBlue, 3)} />
          <text x="34" y="6" fill={colors.textDim} fontFamily={inter} fontSize="15">
            plan
          </text>
        </g>
      </g>
    </svg>
  );
};

// 59 — RED FLAGS: a montage of the signs of an ineffective board.
const RedFlags: React.FC<IlluProps> = ({ p }) => {
  const flags = ["OPAQUE SELECTION", "WEAK CHAIR", "UNFOCUSED MEETINGS", "INFO ASYMMETRY", "WEAK COMMITTEES", "GROUPTHINK", "NO SUCCESSION", "SELF-INTEREST"];
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      {flags.map((l, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const x = 124 + col * 164;
        const y = 158 + row * 122;
        const dr = seg(p, 0.1 + i * 0.07, 0.4 + i * 0.07);
        return (
          <g key={l} opacity={clamp(dr * 2)}>
            <rect x={x - 74} y={y - 46} width="148" height="92" rx="12" {...stroke(colors.mediumBlue, 2)} />
            <g transform={`translate(${x} ${y - 16})`}>
              <path d="M0 -15 L15 9 H-15 Z" fill={colors.orange} />
              <path d="M0 -4 V3" {...stroke(colors.deepBlue, 2)} />
              <circle cx="0" cy="7" r="1.8" fill={colors.deepBlue} />
            </g>
            <text x={x} y={y + 32} fill={colors.textDim} fontFamily={inter} fontSize="12" fontWeight={600} textAnchor="middle">
              {l}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

// 60 — GROUPTHINK: an undiversified board that all thinks alike.
const Groupthink: React.FC<IlluProps> = ({ p }) => {
  const xs = [180, 270, 360, 450, 540];
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      {xs.map((x, i) => (
        <g key={i} opacity={clamp(seg(p, 0.1 + i * 0.07, 0.4 + i * 0.07) * 2)}>
          <text x={x} y={142} fill={colors.textMuted} fontFamily={inter} fontSize="22" fontWeight={700} textAnchor="middle">
            =
          </text>
          <Person x={x} y={216} s={0.85} color={colors.textMuted} draw={1} />
        </g>
      ))}
      <Label x={360} y={320} text="ALL THE SAME — GROUPTHINK" show={seg(p, 0.65, 0.9)} color={colors.orange} />
    </svg>
  );
};

// 61 — DUE-DILIGENCE CHECKLIST: the questions to ask before accepting a seat.
const DueDiligenceChecklist: React.FC<IlluProps> = ({ p }) => {
  const qs = ["Done my due diligence?", "Understand the duties?", "Worth my reputation?", "Ready to do the work?"];
  return (
    <svg width="760" height="440" viewBox={VIEW}>
      {qs.map((q, i) => {
        const y = 128 + i * 66;
        const dr = seg(p, 0.1 + i * 0.1, 0.4 + i * 0.1);
        const hot = i === 2;
        return (
          <g key={q} opacity={clamp(dr * 2)}>
            <circle cx="186" cy={y} r="14" {...stroke(hot ? colors.orange : colors.lightBlue, 4)} />
            <path d={`M179 ${y} l5 6 l11 -13`} {...stroke(hot ? colors.orange : colors.lightBlue, 4)} />
            <text x="222" y={y + 7} fill={hot ? colors.orange : colors.white} fontFamily={inter} fontSize="23" fontWeight={hot ? 700 : 600}>
              {q}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export const ILLUSTRATIONS: Record<string, React.FC<IlluProps>> = {
  infoAsymmetry: InfoAsymmetry,
  shareInfo: ShareInfo,
  hierarchy: Hierarchy,
  outsider: Outsider,
  link: Link,
  tenure: Tenure,
  balance: Balance,
  appointment: Appointment,
  // Lesson 3 — fiduciary duties of the board
  goodFaith: GoodFaith,
  stakeholders: Stakeholders,
  delegation: Delegation,
  confidentiality: Confidentiality,
  fetterDiscretion: FetterDiscretion,
  // Lesson 4 — conflict-of-interest case study
  productRecall: ProductRecall,
  conflictTie: ConflictTie,
  recusal: Recusal,
  ringFence: RingFence,
  // Lesson 5 — other duties under CAMA 2020
  financials: Financials,
  esg: Esg,
  performanceKpi: PerformanceKpi,
  remuneration: Remuneration,
  riskFramework: RiskFramework,
  // Lesson 6 — compliance & internal control
  compliance: Compliance,
  ethics: Ethics,
  insiderDealing: InsiderDealing,
  consequences: Consequences,
  // Lesson 7 — removal from office
  resignVsRemove: ResignVsRemove,
  // Lesson 8 — evolution of corporate governance in Nigeria
  timeline: Timeline,
  harmonise: Harmonise,
  stricter: Stricter,
  // Lesson 9 — provisions of the Code
  boardComposition: BoardComposition,
  diversity: Diversity,
  boardRefresh: BoardRefresh,
  // Lesson 10 — meeting requirements
  remunerationLimits: RemunerationLimits,
  training: Training,
  companySecretary: CompanySecretary,
  // Lesson 11 — board effectiveness (Facebook/Instagram)
  dealSnapshot: DealSnapshot,
  dealTimeline: DealTimeline,
  boardBypassed: BoardBypassed,
  toneAtTop: ToneAtTop,
  continuity: Continuity,
  // Lesson 12 — hire & remove the CEO / building an effective board
  ceoSeat: CeoSeat,
  sixElements: SixElements,
  nedMajority: NedMajority,
  separationOfPower: SeparationOfPower,
  // Lesson 13 — availability, committees & dynamics
  chairMdSplit: ChairMdSplit,
  overBoarded: OverBoarded,
  committees: Committees,
  boardDynamics: BoardDynamics,
  // Lesson 14 — the board agenda
  constructiveChallenge: ConstructiveChallenge,
  agendaFilter: AgendaFilter,
  pastVsFuture: PastVsFuture,
  dysfunctionalDirector: DysfunctionalDirector,
  // Lesson 15 — a domineering board member
  domineeringChair: DomineeringChair,
  peerReview: PeerReview,
  escalationLadder: EscalationLadder,
  replaceRep: ReplaceRep,
  // Lesson 16 — red flags in a corporate board
  boardEvaluation: BoardEvaluation,
  redFlags: RedFlags,
  groupthink: Groupthink,
  // Lesson 17 — before you accept your next board seat
  dueDiligenceChecklist: DueDiligenceChecklist,
};
