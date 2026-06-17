import { colors } from "./colors";

/**
 * A single open-book / Scripture glyph used on every verse reveal, so the
 * whole set reads as one family (all are "the Word"). `progress` (0→1) draws
 * the strokes on and fades a small cross above the book.
 */
type Props = { size?: number; color?: string; progress?: number };

const DASH = 360;

export const BookIcon: React.FC<Props> = ({
  size = 120,
  color = colors.gold,
  progress = 1,
}) => {
  const draw = {
    strokeDasharray: DASH,
    strokeDashoffset: DASH * (1 - progress),
  } as const;
  const soft = Math.max(0, (progress - 0.5) / 0.5);
  const common = {
    fill: "none",
    stroke: color,
    strokeWidth: 4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      {/* spine */}
      <path d="M60 44 V104" {...common} style={draw} />
      {/* left + right pages */}
      <path
        d="M60 44 C46 34 30 34 18 40 V96 C30 90 46 90 60 100 Z"
        {...common}
        style={draw}
      />
      <path
        d="M60 44 C74 34 90 34 102 40 V96 C90 90 74 90 60 100 Z"
        {...common}
        style={draw}
      />
      {/* text lines, fading in */}
      <g opacity={soft} stroke={color} strokeWidth={2.4} strokeLinecap="round">
        <path d="M28 54 h22 M28 64 h22 M28 74 h18" />
        <path d="M70 54 h22 M70 64 h22 M70 74 h18" />
      </g>
      {/* small cross above the book */}
      <g opacity={soft} {...common} strokeWidth={4}>
        <path d="M60 30 V12 M52 19 h16" />
      </g>
    </svg>
  );
};
