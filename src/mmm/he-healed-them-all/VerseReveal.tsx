import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { colors } from "./colors";
import { playfair, inter } from "./fonts";
import { VERSES, BEATS } from "./timing";
import { BookIcon } from "./BookIcon";

/**
 * The core requested feature: whenever the author names a Scripture, the
 * verse appears on screen. A left-side frosted navy card slides in on that
 * verse's cue — the gold reference and the open-book glyph settle first, then
 * the verse text writes in — holds for `revealHold`, then recedes (leaving the
 * speaker and the right-rail tracker). Lives in the left third (bookshelf),
 * never over the centred speaker, and clears the bottom subtitle band.
 */
export const VerseReveal: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const verse = VERSES[index];

  const local = frame - verse.activeAt;
  const hold = BEATS.revealHold;
  if (local < -2 || local > hold + 28) return null;

  const enter = spring({
    frame: local,
    fps,
    config: { damping: 20, stiffness: 90 },
  });
  const draw = spring({
    frame: local - 6,
    fps,
    config: { damping: 26, stiffness: 70 },
  });
  const refP = spring({
    frame: local - 10,
    fps,
    config: { damping: 22, stiffness: 90 },
  });
  const textP = spring({
    frame: local - 20,
    fps,
    config: { damping: 24, stiffness: 80 },
  });
  const exit = interpolate(local, [hold, hold + 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });

  const appear = enter * (1 - exit);
  const slideX = interpolate(enter, [0, 1], [-70, 0]) + exit * -50;

  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        top: 250,
        width: 740,
        opacity: appear,
        transform: `translateX(${slideX}px) scale(${interpolate(
          appear,
          [0, 1],
          [0.96, 1],
        )})`,
      }}
    >
      {/* Frosted card */}
      <div
        style={{
          position: "relative",
          padding: "38px 44px 42px",
          borderRadius: 28,
          background: `${colors.brandDark}E6`,
          border: `1.5px solid ${colors.gold}55`,
          boxShadow: `0 30px 80px -24px rgba(0,0,0,0.72), 0 0 0 8px ${colors.brandBlue}1A`,
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {/* Eyebrow + translation tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontFamily: inter,
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: 4,
              color: colors.skyLight,
              textTransform: "uppercase",
            }}
          >
            Scripture
          </div>
          <div
            style={{
              fontFamily: inter,
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: 2,
              color: colors.neutral400,
              padding: "5px 12px",
              borderRadius: 999,
              border: `1.5px solid ${colors.neutral400}44`,
            }}
          >
            {verse.translation}
          </div>
        </div>

        {/* Book glyph + reference */}
        <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
          <div
            style={{
              flexShrink: 0,
              width: 110,
              height: 110,
              borderRadius: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: `${colors.gold}14`,
              border: `1.5px solid ${colors.gold}44`,
            }}
          >
            <BookIcon size={82} color={colors.gold} progress={draw} />
          </div>
          <div
            style={{
              fontFamily: playfair,
              fontWeight: 700,
              fontSize: 64,
              lineHeight: 1.04,
              color: colors.gold,
              opacity: refP,
              transform: `translateY(${interpolate(refP, [0, 1], [18, 0])}px)`,
            }}
          >
            {verse.ref}
          </div>
        </div>

        {/* Verse text */}
        <div
          style={{
            fontFamily: playfair,
            fontWeight: 600,
            fontStyle: "italic",
            fontSize: 36,
            lineHeight: 1.36,
            color: colors.white,
            opacity: textP,
            transform: `translateY(${interpolate(textP, [0, 1], [14, 0])}px)`,
            borderLeft: `3px solid ${colors.brandSky}`,
            paddingLeft: 22,
          }}
        >
          “{verse.text}”
        </div>
      </div>
    </div>
  );
};
