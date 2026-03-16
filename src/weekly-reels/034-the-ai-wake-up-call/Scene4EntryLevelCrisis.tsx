import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const RUNG_COUNT = 6;
const LADDER_H = 600;
const RUNG_SPACING = LADDER_H / (RUNG_COUNT + 1);

const LadderSVG: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  // Bottom 3 rungs dissolve one by one, starting at 3s
  const rungOpacities = Array.from({ length: RUNG_COUNT }, (_, i) => {
    if (i < 3) {
      // Bottom 3 (indices 0,1,2 = visual bottom)
      const dissolveStart = fps * 3 + i * fps * 3;
      return interpolate(frame, [dissolveStart, dissolveStart + fps * 2], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
    }
    return 1;
  });

  const LADDER_W = 160;
  const POST_X_LEFT = 40;
  const POST_X_RIGHT = POST_X_LEFT + LADDER_W;

  return (
    <svg width="240" height={LADDER_H + 40} viewBox={`0 0 240 ${LADDER_H + 40}`} fill="none">
      {/* Rails */}
      <line
        x1={POST_X_LEFT} y1={20}
        x2={POST_X_LEFT} y2={LADDER_H + 20}
        stroke={colors.chineseSilver}
        strokeWidth={6}
        opacity={0.6}
      />
      <line
        x1={POST_X_RIGHT} y1={20}
        x2={POST_X_RIGHT} y2={LADDER_H + 20}
        stroke={colors.chineseSilver}
        strokeWidth={6}
        opacity={0.6}
      />
      {/* Rungs — index 0 is bottom-most visually */}
      {Array.from({ length: RUNG_COUNT }, (_, i) => {
        const rungIndex = RUNG_COUNT - 1 - i; // flip so i=0 is top
        const y = 20 + (i + 1) * RUNG_SPACING;
        const isFading = rungIndex < 3;
        const opacity = isFading ? rungOpacities[rungIndex] : 1;
        return (
          <rect
            key={i}
            x={POST_X_LEFT}
            y={y - 5}
            width={LADDER_W}
            height={10}
            rx={3}
            fill={isFading ? colors.oldRose : colors.chineseSilver}
            opacity={opacity * 0.8}
          />
        );
      })}
    </svg>
  );
};

const StatBlock: React.FC<{
  pct: string;
  pctColor: string;
  label: string;
  source: string;
  progress: number;
}> = ({ pct, pctColor, label, source, progress }) => {
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const y = interpolate(progress, [0, 1], [30, 0]);

  return (
    <div style={{ opacity, transform: `translateY(${y}px)`, marginBottom: 36 }}>
      <div
        style={{
          fontSize: 88,
          fontWeight: 900,
          color: pctColor,
          lineHeight: 1,
          fontFamily,
        }}
      >
        {pct}
      </div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: colors.white,
          lineHeight: 1.4,
          maxWidth: 600,
          marginTop: 8,
          fontFamily,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 13, color: colors.rhythm, marginTop: 6, fontFamily, letterSpacing: 1 }}>
        {source}
      </div>
    </div>
  );
};

export const Scene4EntryLevelCrisis: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ladderProgress = spring({ frame, fps, config: { damping: 14, stiffness: 70 } });
  const ladderOpacity = interpolate(ladderProgress, [0, 1], [0, 1]);
  const ladderX = interpolate(ladderProgress, [0, 1], [-40, 0]);

  const stat1Progress = spring({
    frame: frame - fps * 1,
    fps,
    config: { damping: 200 },
  });

  const stat2Progress = spring({
    frame: frame - fps * 6,
    fps,
    config: { damping: 200 },
  });

  const quoteProgress = spring({
    frame: frame - fps * 14,
    fps,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill style={{ background: colors.gunmetal, fontFamily }}>
      {/* Fire glow at bottom center */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 110%, #5A2010 0%, transparent 55%)`,
          pointerEvents: "none",
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "100px 80px 240px",
          gap: 80,
          alignItems: "flex-start",
        }}
      >
        {/* Left: ladder */}
        <div
          style={{
            opacity: ladderOpacity,
            transform: `translateX(${ladderX}px)`,
            flexShrink: 0,
            paddingTop: 40,
          }}
        >
          <LadderSVG frame={frame} fps={fps} />
          <div
            style={{
              fontSize: 13,
              color: colors.rhythm,
              textAlign: "center",
              marginTop: 12,
              letterSpacing: 2,
              fontFamily,
            }}
          >
            CAREER LADDER
          </div>
        </div>

        {/* Right: stats + quote */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
          <StatBlock
            pct="66%"
            pctColor={colors.caribbeanGreen}
            label="of enterprises reducing entry-level hiring"
            source="IDC 2026"
            progress={stat1Progress}
          />
          <StatBlock
            pct="20%"
            pctColor={colors.oldRose}
            label="of orgs will eliminate half of middle management"
            source="Gartner 2026"
            progress={stat2Progress}
          />

          {/* Quote */}
          <div
            style={{
              opacity: interpolate(quoteProgress, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(quoteProgress, [0, 1], [20, 0])}px)`,
              borderLeft: `4px solid ${colors.tiffanyBlue}`,
              paddingLeft: 20,
              marginTop: 8,
            }}
          >
            <div
              style={{
                fontSize: 19,
                fontStyle: "italic",
                color: colors.tiffanyBlue,
                lineHeight: 1.6,
                fontFamily,
              }}
            >
              "Companies are burning the bottom rungs of the career ladder to heat the house."
            </div>
            <div
              style={{
                fontSize: 14,
                color: colors.rhythm,
                marginTop: 8,
                fontFamily,
              }}
            >
              — Former Fortune 500 CEO
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
