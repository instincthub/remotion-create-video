import { colors } from "./colors";

/**
 * InstinctHub's signature mark for the overlay system: a graduation cap (the
 * "learning" motif). Reused by the logo bug, cutaways, and the closing card so
 * the motif stays consistent. Pure SVG — no asset needed.
 */
export const Cap: React.FC<{
  size?: number;
  /** Cap/outline colour. */
  stroke?: string;
  /** Tassel + glow colour (the brand cyan). */
  accent?: string;
  /** 0→1 amount, drives the glow + tassel opacity. */
  lit?: number;
  strokeWidth?: number;
}> = ({
  size = 64,
  stroke = colors.white,
  accent = colors.tiffany,
  lit = 1,
  strokeWidth = 4,
}) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    {/* glow */}
    <circle cx="32" cy="28" r="22" fill={accent} opacity={0.18 * lit} />
    {/* mortarboard */}
    <path
      d="M32 12 L58 24 L32 36 L6 24 Z"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
    {/* headband */}
    <path
      d="M18 30 v10 c0 5 28 5 28 0 v-10"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* tassel — the brand-cyan spark */}
    <path
      d="M58 24 v14"
      stroke={accent}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      opacity={lit}
    />
    <circle cx="58" cy="42" r="3.5" fill={accent} opacity={lit} />
  </svg>
);
