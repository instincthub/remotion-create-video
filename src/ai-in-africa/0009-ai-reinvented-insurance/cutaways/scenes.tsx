import { interpolate } from "remotion";
import { colors } from "../colors";
import { display, mono } from "../fonts";

/** Each illustration gets entrance progress `p` (0→1) and a local frame `t`. */
export type IlluProps = { p: number; t: number };

const draw = (p: number, a = 0, b = 1) =>
  interpolate(p, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

/* ── "Ask ChatGPT, Naked prices it" ── a chat exchange that resolves to a quote */
const ChatGPT: React.FC<IlluProps> = ({ p, t }) => {
  const u = draw(p, 0.0, 0.4);
  const a = draw(p, 0.35, 0.7);
  const price = draw(p, 0.65, 1.0);
  const pulse = 1 + Math.sin(t / 9) * 0.015;
  return (
    <svg width="780" height="440" viewBox="0 0 780 440">
      {/* window */}
      <rect x="40" y="20" width="700" height="400" rx="26"
        fill={colors.panel} stroke={`${colors.tealLight}44`} strokeWidth="2" />
      <circle cx="76" cy="56" r="7" fill={colors.accentOrange} />
      <circle cx="100" cy="56" r="7" fill={colors.savannahGold} />
      <circle cx="124" cy="56" r="7" fill={`${colors.tealLight}`} />
      <text x="160" y="62" fontFamily={mono} fontSize="20" fill={colors.neutral400}>
        ChatGPT
      </text>
      {/* user bubble */}
      <g opacity={u} transform={`translate(${interpolate(u, [0, 1], [40, 0])},0)`}>
        <rect x="300" y="100" width="400" height="78" rx="18" fill={`${colors.brandTeal}`} />
        <text x="330" y="135" fontFamily={display} fontWeight="600" fontSize="24" fill={colors.white}>
          “What car insurance can
        </text>
        <text x="330" y="165" fontFamily={display} fontWeight="600" fontSize="24" fill={colors.white}>
          I get?”
        </text>
      </g>
      {/* AI bubble */}
      <g opacity={a} transform={`translate(${interpolate(a, [0, 1], [-40, 0])},0)`}>
        <rect x="80" y="210" width="430" height="74" rx="18" fill="#1A2A30" stroke={`${colors.tealLight}33`} strokeWidth="1.5" />
        <text x="108" y="244" fontFamily={display} fontSize="23" fill={colors.neutral200}>
          Naked can bind cover instantly —
        </text>
        <text x="108" y="272" fontFamily={display} fontSize="23" fill={colors.neutral200}>
          here's your quote:
        </text>
      </g>
      {/* price chip */}
      <g opacity={price} transform={`translate(540,300) scale(${interpolate(price, [0, 1], [0.8, 1]) * pulse})`}>
        <rect x="0" y="0" width="190" height="96" rx="18" fill={colors.amber} />
        <text x="95" y="42" fontFamily={mono} fontSize="16" fill={colors.brandDark} textAnchor="middle" letterSpacing="2">
          BOUND · 90s
        </text>
        <text x="95" y="78" fontFamily={display} fontWeight="800" fontSize="34" fill={colors.brandDark} textAnchor="middle">
          R 0 agents
        </text>
      </g>
    </svg>
  );
};

/* ── "Phone calls + paperwork → an API call" ── the conceptual peak */
const ApiCall: React.FC<IlluProps> = ({ p, t }) => {
  const oldP = draw(p, 0.0, 0.4);
  const arrow = draw(p, 0.35, 0.65);
  const api = draw(p, 0.55, 1.0);
  const blink = 0.5 + Math.sin(t / 6) * 0.5;
  return (
    <svg width="900" height="420" viewBox="0 0 900 420">
      {/* OLD: phone + paper, fading toward grayscale */}
      <g opacity={interpolate(oldP, [0, 1], [0, 0.55]) * interpolate(api, [0, 1], [1, 0.32])}>
        <rect x="60" y="120" width="150" height="220" rx="22" fill="none" stroke={colors.neutral400} strokeWidth="3" />
        <circle cx="135" cy="305" r="10" fill="none" stroke={colors.neutral400} strokeWidth="3" />
        <path d="M95 160 h60 M95 185 h60 M95 210 h40" stroke={colors.neutral400} strokeWidth="3" strokeLinecap="round" />
        <g transform="translate(230,140)">
          <rect x="0" y="0" width="150" height="190" rx="10" fill="none" stroke={colors.neutral400} strokeWidth="3" />
          <path d="M24 40 h100 M24 70 h100 M24 100 h100 M24 130 h70" stroke={colors.neutral400} strokeWidth="3" strokeLinecap="round" />
        </g>
        <text x="225" y="372" fontFamily={mono} fontSize="20" fill={colors.neutral400} textAnchor="middle" letterSpacing="2">
          CALLS · PAPERWORK
        </text>
      </g>
      {/* arrow */}
      <g opacity={arrow}>
        <path d={`M430 220 H ${interpolate(arrow, [0, 1], [430, 540])}`} stroke={colors.tealLight} strokeWidth="5" strokeLinecap="round" />
        <path d="M530 200 l24 20 l-24 20" fill="none" stroke={colors.tealLight} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" opacity={draw(arrow, 0.7, 1)} />
      </g>
      {/* NEW: API terminal */}
      <g opacity={api} transform={`translate(590,90) scale(${interpolate(api, [0, 1], [0.85, 1])})`}>
        <rect x="0" y="0" width="280" height="240" rx="20" fill={colors.panel} stroke={`${colors.tealLight}66`} strokeWidth="2.5" />
        <rect x="0" y="0" width="280" height="44" rx="20" fill={`${colors.brandTeal}`} />
        <text x="20" y="30" fontFamily={mono} fontSize="18" fill={colors.white}>POST /quote</text>
        <text x="24" y="90" fontFamily={mono} fontSize="20" fill={colors.tealLight}>{"{"}</text>
        <text x="48" y="122" fontFamily={mono} fontSize="18" fill={colors.neutral200}>"cover": "car",</text>
        <text x="48" y="150" fontFamily={mono} fontSize="18" fill={colors.neutral200}>"bind": true,</text>
        <text x="48" y="178" fontFamily={mono} fontSize="18" fill={colors.amber}>"ms": 90000</text>
        <text x="24" y="206" fontFamily={mono} fontSize="20" fill={colors.tealLight}>{"}"}</text>
        <rect x="250" y="196" width="11" height="22" fill={colors.tealLight} opacity={blink} />
      </g>
    </svg>
  );
};

/* ── "Agentic AI executes — inside guardrails" ── */
const Agentic: React.FC<IlluProps> = ({ p, t }) => {
  const core = draw(p, 0.0, 0.35);
  const rails = draw(p, 0.2, 0.5);
  const chips = [
    { label: "Loan approved", d: 0.4 },
    { label: "Account opened", d: 0.55 },
    { label: "Payment sent", d: 0.7 },
  ];
  const spin = t * 0.4;
  return (
    <svg width="820" height="440" viewBox="0 0 820 440">
      {/* guardrail frame */}
      <g opacity={rails}>
        <rect x="40" y="40" width="740" height="360" rx="30" fill="none"
          stroke={`${colors.tealLight}3A`} strokeWidth="2.5" strokeDasharray="3 14" strokeLinecap="round" />
        <text x="410" y="34" fontFamily={mono} fontSize="17" fill={colors.neutral400} textAnchor="middle" letterSpacing="4">
          DEFINED GUARDRAILS
        </text>
      </g>
      {/* core */}
      <g transform="translate(410,220)" opacity={core}>
        <circle r={interpolate(core, [0, 1], [10, 64])} fill={`${colors.brandTeal}`} />
        <circle r={interpolate(core, [0, 1], [10, 64]) + 14} fill="none" stroke={`${colors.tealLight}66`} strokeWidth="2"
          transform={`rotate(${spin})`} strokeDasharray="6 10" />
        <text y="9" fontFamily={display} fontWeight="800" fontSize="34" fill={colors.white} textAnchor="middle">AI</text>
      </g>
      {/* executed action chips */}
      {chips.map((c, i) => {
        const cp = draw(p, c.d, c.d + 0.25);
        const angle = -0.5 + i * 0.5;
        const x = 410 + Math.cos(angle) * 230;
        const y = 220 + Math.sin(angle) * 120;
        return (
          <g key={i} opacity={cp} transform={`translate(${x - 110},${y - 26}) scale(${interpolate(cp, [0, 1], [0.8, 1])})`}>
            <rect x="0" y="0" width="220" height="52" rx="14" fill={colors.panel} stroke={`${colors.amber}88`} strokeWidth="1.6" />
            <circle cx="26" cy="26" r="9" fill={colors.amber} />
            <path d="M21 26 l4 4 l8 -9" fill="none" stroke={colors.brandDark} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            <text x="48" y="33" fontFamily={display} fontWeight="600" fontSize="21" fill={colors.white}>{c.label}</text>
          </g>
        );
      })}
    </svg>
  );
};

export const ILLUSTRATIONS: Record<string, React.FC<IlluProps>> = {
  chatgpt: ChatGPT,
  apicall: ApiCall,
  agentic: Agentic,
};
