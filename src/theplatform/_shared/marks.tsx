import { colors } from "./colors";

/**
 * The Platform's signature mark: a lightbulb (the "ideas happen" spark).
 * Reused by the logo bug, cutaways, and the closing card so the motif stays
 * consistent. Pure SVG — no asset needed.
 */
export const Bulb: React.FC<{
  size?: number;
  /** Glass/outline colour. */
  stroke?: string;
  /** Filament + glow colour (the spark). */
  spark?: string;
  /** 0→1 "lit" amount, drives the glow + filament opacity. */
  lit?: number;
  strokeWidth?: number;
}> = ({
  size = 64,
  stroke = colors.ink,
  spark = colors.yellow,
  lit = 1,
  strokeWidth = 5,
}) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    {/* glow */}
    <circle cx="32" cy="26" r="20" fill={spark} opacity={0.22 * lit} />
    {/* glass */}
    <path
      d="M32 7 a18 18 0 0 1 11 32 c-2 1.6 -3 3.4 -3 6 H24 c0 -2.6 -1 -4.4 -3 -6 A18 18 0 0 1 32 7Z"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
    {/* base */}
    <path
      d="M25 49 h14 M27 55 h10"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
    {/* filament */}
    <path
      d="M27 28 l5 -7 l5 7"
      stroke={spark}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={lit}
    />
  </svg>
);
