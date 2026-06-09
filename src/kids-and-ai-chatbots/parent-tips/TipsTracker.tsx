import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { colors } from "./colors";
import { nunito, dmMono } from "./fonts";
import { BEATS, TIPS, tipStateAt, type TipState } from "./timing";

/**
 * Persistent right-rail tracker. It is the spine of the piece: five frosted
 * cards that sit over the footage from the "five simple tips" beat onward.
 *
 * - upcoming tips are blurred + locked (you cannot read what is coming) →
 *   this is the curiosity engine that pulls viewers to the end
 * - the active tip is sharp, teal, and lifted
 * - completed tips dim and gain a checkmark
 *
 * The whole rail lives inside the 80px side margin and stops above the
 * bottom-200px subtitle safe zone.
 */

const Check: React.FC<{ color: string }> = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24">
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
  <svg width="18" height="18" viewBox="0 0 24 24">
    <rect x="5" y="11" width="14" height="9" rx="2" fill={color} />
    <path
      d="M8 11 V8 a4 4 0 0 1 8 0 v3"
      fill="none"
      stroke={color}
      strokeWidth={2.5}
    />
  </svg>
);

const TrackerCard: React.FC<{
  index: number;
  state: TipState;
  enter: number;
}> = ({ index, state, enter }) => {
  const tip = TIPS[index];

  const isActive = state === "active";
  const isDone = state === "done";
  const isUpcoming = state === "upcoming";

  // Smoothly settle into the active look.
  const panelBg = isActive
    ? `${colors.brandTeal}E6`
    : isDone
      ? `${colors.brandDark}B8`
      : `${colors.brandDark}99`;

  const borderColor = isActive
    ? colors.tealLight
    : isDone
      ? `${colors.tealLight}55`
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
        gap: 18,
        padding: "20px 22px",
        borderRadius: 18,
        background: panelBg,
        border: `1.5px solid ${borderColor}`,
        boxShadow: isActive
          ? `0 18px 40px -12px ${colors.brandTeal}AA, 0 0 0 6px ${colors.brandTeal}22`
          : "0 10px 24px -16px rgba(0,0,0,0.6)",
        transform: `translateX(${interpolate(enter, [0, 1], [60, 0])}px) scale(${
          isActive ? 1.04 : 1
        })`,
        opacity: enter * (isUpcoming ? 0.92 : 1),
        transition: "none",
      }}
    >
      {/* Number / check badge */}
      <div
        style={{
          flexShrink: 0,
          width: 46,
          height: 46,
          borderRadius: 999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: isActive
            ? colors.white
            : isDone
              ? `${colors.tealLight}22`
              : `${colors.neutral400}1A`,
          border: isActive ? "none" : `1.5px solid ${borderColor}`,
          fontFamily: dmMono,
          fontSize: 20,
          fontWeight: 500,
          color: isActive ? colors.brandTeal : labelColor,
        }}
      >
        {isDone ? (
          <Check color={colors.tealLight} />
        ) : (
          String(tip.n).padStart(2, "0")
        )}
      </div>

      {/* Label — blurred + locked while upcoming */}
      <div style={{ position: "relative", flex: 1, minHeight: 26 }}>
        <div
          style={{
            fontFamily: nunito,
            fontSize: 25,
            fontWeight: 700,
            color: labelColor,
            lineHeight: 1.1,
            filter: isUpcoming ? "blur(7px)" : "none",
            opacity: isUpcoming ? 0.7 : 1,
            userSelect: "none",
          }}
        >
          {tip.short}
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

export const TipsTracker: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = frame - BEATS.trackerIn;
  if (localFrame < 0) return null;

  const railEnter = spring({
    frame: localFrame,
    fps,
    config: { damping: 20, stiffness: 80 },
  });

  const activeIndex = TIPS.reduce(
    (acc, _t, i) => (tipStateAt(i, frame) === "active" ? i : acc),
    -1,
  );
  const doneCount = TIPS.filter((_t, i) => tipStateAt(i, frame) === "done")
    .length;
  const counter = Math.max(activeIndex + 1, doneCount);

  // Recede once the close/CTA begins so the sign-off stays uncluttered.
  const fadeOut = interpolate(
    frame,
    [BEATS.ctaIn, BEATS.ctaIn + 24],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic),
    },
  );

  return (
    <div
      style={{
        position: "absolute",
        top: 96,
        bottom: 224,
        right: 80,
        width: 392,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 16,
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
            fontFamily: dmMono,
            fontSize: 18,
            fontWeight: 500,
            letterSpacing: 3,
            color: colors.tealLight,
            textTransform: "uppercase",
          }}
        >
          5 Parent Tips
        </div>
        <div
          style={{
            fontFamily: dmMono,
            fontSize: 18,
            fontWeight: 500,
            color: colors.neutral200,
          }}
        >
          {String(counter).padStart(2, "0")} / 05
        </div>
      </div>

      {TIPS.map((_t, i) => {
        // Stagger each card's entrance just slightly.
        const cardEnter = spring({
          frame: localFrame - i * 5,
          fps,
          config: { damping: 20, stiffness: 80 },
        });
        return (
          <TrackerCard
            key={i}
            index={i}
            state={tipStateAt(i, frame)}
            enter={cardEnter}
          />
        );
      })}
    </div>
  );
};
