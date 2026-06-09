import { colors } from "./colors";

/**
 * Five distinct, elegant line illustrations — one per tip.
 *
 * `progress` (0→1) drives a draw-on of the primary strokes plus a fill
 * fade-in, so the icon "writes itself" when its tip becomes active.
 * Each icon shares a 120×120 viewBox and a consistent 4px stroke so the
 * set reads as one family.
 */

type Props = {
  tip: number;
  size?: number;
  color?: string;
  /** 0 → undrawn, 1 → fully drawn. */
  progress?: number;
};

const DASH = 320;

export const TipIcon: React.FC<Props> = ({
  tip,
  size = 120,
  color = colors.brandTeal,
  progress = 1,
}) => {
  const draw = {
    strokeDasharray: DASH,
    strokeDashoffset: DASH * (1 - progress),
  } as const;
  const soft = Math.max(0, (progress - 0.45) / 0.55); // fills come in later
  const stroke = color;

  const common = {
    fill: "none",
    stroke,
    strokeWidth: 4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      {tip === 1 && (
        <>
          {/* Two people side by side */}
          <circle cx="40" cy="44" r="13" {...common} style={draw} />
          <path d="M22 92 a18 18 0 0 1 36 0" {...common} style={draw} />
          <circle cx="80" cy="44" r="13" {...common} style={draw} />
          <path d="M62 92 a18 18 0 0 1 36 0" {...common} style={draw} />
          {/* Shared chat spark between them */}
          <circle cx="60" cy="30" r="6" fill={stroke} opacity={soft} />
        </>
      )}

      {tip === 2 && (
        <>
          {/* A question routes two ways: to a person, or to a bot */}
          <circle cx="60" cy="26" r="9" {...common} style={draw} />
          <path d="M60 35 V52 M60 52 L30 74 M60 52 L90 74" {...common} style={draw} />
          {/* Human path (emphasised, filled) */}
          <path
            d="M30 96 c0-9 18-9 18-18 a9 9 0 1 0-18 0"
            fill={stroke}
            opacity={soft}
          />
          {/* Bot path (outline) */}
          <rect x="78" y="78" width="24" height="20" rx="4" {...common} style={draw} />
          <path d="M84 78 v-6 M96 78 v-6" {...common} style={draw} />
        </>
      )}

      {tip === 3 && (
        <>
          {/* Speech bubble that is confident — but cracked */}
          <path
            d="M24 30 h72 a8 8 0 0 1 8 8 v34 a8 8 0 0 1-8 8 H56 l-14 14 v-14 H24 a8 8 0 0 1-8-8 V38 a8 8 0 0 1 8-8 Z"
            {...common}
            style={draw}
          />
          {/* A bold '!' inside */}
          <path d="M60 42 v20" {...common} style={draw} />
          <circle cx="60" cy="70" r="3.5" fill={stroke} opacity={soft} />
        </>
      )}

      {tip === 4 && (
        <>
          {/* Shield with a control toggle inside */}
          <path
            d="M60 16 L96 28 V60 c0 24-18 38-36 46 C42 98 24 84 24 60 V28 Z"
            {...common}
            style={draw}
          />
          {/* Toggle track + knob */}
          <rect x="40" y="54" width="40" height="18" rx="9" {...common} style={draw} />
          <circle cx="70" cy="63" r="6" fill={stroke} opacity={soft} />
        </>
      )}

      {tip === 5 && (
        <>
          {/* An open door with light spilling through */}
          <path d="M34 22 H86 V100 H34 Z" {...common} style={draw} />
          <path d="M34 22 L58 32 V92 L34 100" {...common} style={draw} />
          {/* Light beam */}
          <path d="M86 40 L104 52 L86 64" {...common} style={draw} opacity={0.8} />
          <circle cx="50" cy="62" r="3" fill={stroke} opacity={soft} />
        </>
      )}
    </svg>
  );
};
