import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { colors } from "./colors";
import { inter } from "./fonts";
import { BEATS, VERSES, verseStateAt, type VerseState } from "./timing";

/**
 * Persistent right-rail tracker — the spine of the piece. Eight frosted cards,
 * one per Scripture, sitting over the right-side bookshelf from the topic beat
 * onward.
 *
 * - upcoming verses are blurred + locked (you cannot read what is coming) →
 *   the curiosity engine that pulls viewers to the end
 * - the active verse is sharp, gold, and lifted
 * - completed verses dim and gain a checkmark
 *
 * The rail lives inside the right margin and stops above the subtitle band.
 */

const Check: React.FC<{ color: string }> = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path
      d="M5 13 l4 4 L19 7"
      fill="none"
      stroke={color}
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Lock: React.FC<{ color: string }> = ({ color }) => (
  <svg width="16" height="16" viewBox="0 0 24 24">
    <rect x="5" y="11" width="14" height="9" rx="2" fill={color} />
    <path d="M8 11 V8 a4 4 0 0 1 8 0 v3" fill="none" stroke={color} strokeWidth={2.5} />
  </svg>
);

const TrackerCard: React.FC<{
  index: number;
  state: VerseState;
  enter: number;
}> = ({ index, state, enter }) => {
  const verse = VERSES[index];
  const isActive = state === "active";
  const isDone = state === "done";
  const isUpcoming = state === "upcoming";

  const panelBg = isActive
    ? `${colors.brandBlue}E6`
    : isDone
      ? `${colors.brandDark}B8`
      : `${colors.brandDark}99`;
  const borderColor = isActive
    ? colors.gold
    : isDone
      ? `${colors.skyLight}55`
      : `${colors.neutral400}33`;
  const labelColor = isActive
    ? colors.white
    : isDone
      ? colors.neutral200
      : colors.neutral400;

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "15px 18px",
        borderRadius: 16,
        background: panelBg,
        border: `1.5px solid ${borderColor}`,
        boxShadow: isActive
          ? `0 18px 40px -12px ${colors.brandBlue}AA, 0 0 0 5px ${colors.gold}26`
          : "0 10px 24px -16px rgba(0,0,0,0.6)",
        transform: `translateX(${interpolate(enter, [0, 1], [60, 0])}px) scale(${
          isActive ? 1.04 : 1
        })`,
        opacity: enter * (isUpcoming ? 0.92 : 1),
      }}
    >
      {/* Number / check badge */}
      <div
        style={{
          flexShrink: 0,
          width: 40,
          height: 40,
          borderRadius: 999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: isActive
            ? colors.gold
            : isDone
              ? `${colors.skyLight}22`
              : `${colors.neutral400}1A`,
          border: isActive ? "none" : `1.5px solid ${borderColor}`,
          fontFamily: inter,
          fontSize: 17,
          fontWeight: 700,
          color: isActive ? colors.brandDark : labelColor,
        }}
      >
        {isDone ? <Check color={colors.skyLight} /> : String(verse.n).padStart(2, "0")}
      </div>

      {/* Reference — blurred while upcoming */}
      <div style={{ position: "relative", flex: 1, minHeight: 24 }}>
        <div
          style={{
            fontFamily: inter,
            fontSize: 22,
            fontWeight: 700,
            color: labelColor,
            lineHeight: 1.1,
            filter: isUpcoming ? "blur(7px)" : "none",
            opacity: isUpcoming ? 0.7 : 1,
            userSelect: "none",
          }}
        >
          {verse.short}
        </div>
      </div>

      {isUpcoming && (
        <div style={{ flexShrink: 0, opacity: 0.6 }}>
          <Lock color={colors.neutral400} />
        </div>
      )}
    </div>
  );
};

export const ScriptureTracker: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = frame - BEATS.trackerIn;
  if (localFrame < 0) return null;

  const railEnter = spring({
    frame: localFrame,
    fps,
    config: { damping: 20, stiffness: 80 },
  });

  const activeIndex = VERSES.reduce(
    (acc, _v, i) => (verseStateAt(i, frame) === "active" ? i : acc),
    -1,
  );
  const doneCount = VERSES.filter((_v, i) => verseStateAt(i, frame) === "done").length;
  const counter = Math.max(activeIndex + 1, doneCount);

  // Recede once the closing call begins so the sign-off stays uncluttered.
  const fadeOut = interpolate(frame, [BEATS.ctaIn, BEATS.ctaIn + 24], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 84,
        bottom: 150,
        right: 72,
        width: 372,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 12,
        opacity: fadeOut,
        transform: `translateX(${interpolate(fadeOut, [0, 1], [40, 0])}px)`,
      }}
    >
      {/* Rail header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 4,
          transform: `translateX(${interpolate(railEnter, [0, 1], [60, 0])}px)`,
          opacity: railEnter,
        }}
      >
        <div
          style={{
            fontFamily: inter,
            fontSize: 17,
            fontWeight: 600,
            letterSpacing: 3,
            color: colors.skyLight,
            textTransform: "uppercase",
          }}
        >
          Scriptures of Healing
        </div>
        <div
          style={{
            fontFamily: inter,
            fontSize: 17,
            fontWeight: 700,
            color: colors.neutral200,
          }}
        >
          {String(counter).padStart(2, "0")} / 08
        </div>
      </div>

      {VERSES.map((_v, i) => {
        const cardEnter = spring({
          frame: localFrame - i * 4,
          fps,
          config: { damping: 20, stiffness: 80 },
        });
        return (
          <TrackerCard
            key={i}
            index={i}
            state={verseStateAt(i, frame)}
            enter={cardEnter}
          />
        );
      })}
    </div>
  );
};
