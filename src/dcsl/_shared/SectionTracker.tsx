import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { colors } from "./colors";
import { inter } from "./fonts";
import type { Section, SectionState } from "./types";

/**
 * Persistent right-rail progress tracker — the spine of the lesson.
 *
 * This is a CLEAN course roadmap (no blur): every section is always readable.
 *   • active  → DCSL Blue fill, white label, orange number badge (the accent)
 *   • done    → dimmed with a checkmark
 *   • upcoming→ dimmed, lower opacity (visible, not hidden)
 *
 * Lives inside the 80px side margin and stops above the bottom band. Fades out
 * when the closing card begins so the sign-off stays uncluttered.
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

const stateAt = (
  sections: Section[],
  i: number,
  frame: number,
  fadeAt: number,
): SectionState => {
  const start = sections[i].activeAt;
  const next = sections[i + 1]?.activeAt ?? fadeAt;
  if (frame < start) return "upcoming";
  if (frame < next) return "active";
  return "done";
};

const TrackerCard: React.FC<{
  section: Section;
  state: SectionState;
  enter: number;
}> = ({ section, state, enter }) => {
  const isActive = state === "active";
  const isDone = state === "done";

  const panelBg = isActive
    ? `${colors.blue}F0`
    : isDone
      ? `${colors.deepBlue}C7`
      : `${colors.deepBlue}9E`;

  const borderColor = isActive
    ? colors.orange
    : isDone
      ? `${colors.lightBlue}4D`
      : `${colors.mediumBlue}80`;

  const labelColor = isActive
    ? colors.white
    : isDone
      ? colors.textDim
      : colors.textMuted;

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 18,
        padding: "16px 22px",
        borderRadius: 16,
        background: panelBg,
        border: `1.5px solid ${borderColor}`,
        boxShadow: isActive
          ? `0 18px 40px -12px ${colors.blue}C0, 0 0 0 5px ${colors.orange}26`
          : "0 10px 24px -16px rgba(0,0,0,0.6)",
        transform: `translateX(${interpolate(enter, [0, 1], [60, 0])}px) scale(${isActive ? 1.04 : 1})`,
        opacity: enter,
      }}
    >
      {/* Number / check badge — orange when active (text on orange = deep blue) */}
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
            ? colors.orange
            : isDone
              ? `${colors.lightBlue}26`
              : `${colors.mediumBlue}66`,
          fontFamily: inter,
          fontSize: 20,
          fontWeight: 700,
          color: isActive ? colors.deepBlue : labelColor,
        }}
      >
        {isDone ? <Check color={colors.lightBlue} /> : String(section.n).padStart(2, "0")}
      </div>

      <div
        style={{
          fontFamily: inter,
          fontSize: 25,
          fontWeight: isActive ? 700 : 600,
          color: labelColor,
          lineHeight: 1.12,
          flex: 1,
        }}
      >
        {section.short}
      </div>
    </div>
  );
};

export const SectionTracker: React.FC<{
  title: string;
  sections: Section[];
  trackerIn: number;
  fadeAt: number;
}> = ({ title, sections, trackerIn, fadeAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = frame - trackerIn;
  if (localFrame < 0) return null;

  const railEnter = spring({ frame: localFrame, fps, config: { damping: 20, stiffness: 80 } });

  const activeIndex = sections.reduce(
    (acc, _s, i) => (stateAt(sections, i, frame, fadeAt) === "active" ? i : acc),
    -1,
  );
  const doneCount = sections.filter(
    (_s, i) => stateAt(sections, i, frame, fadeAt) === "done",
  ).length;
  const counter = Math.max(activeIndex + 1, doneCount);

  const fadeOut = interpolate(frame, [fadeAt, fadeAt + 24], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 150,
        bottom: 150,
        right: 64,
        width: 408,
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
          marginBottom: 6,
          transform: `translateX(${interpolate(railEnter, [0, 1], [60, 0])}px)`,
          opacity: railEnter,
        }}
      >
        <div
          style={{
            fontFamily: inter,
            fontSize: 18,
            fontWeight: 600,
            letterSpacing: 3,
            color: colors.lightBlue,
            textTransform: "uppercase",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: inter,
            fontSize: 18,
            fontWeight: 600,
            color: colors.textDim,
          }}
        >
          {String(counter).padStart(2, "0")} / {String(sections.length).padStart(2, "0")}
        </div>
      </div>

      {sections.map((s, i) => {
        const cardEnter = spring({
          frame: localFrame - i * 5,
          fps,
          config: { damping: 20, stiffness: 80 },
        });
        return (
          <TrackerCard
            key={i}
            section={s}
            state={stateAt(sections, i, frame, fadeAt)}
            enter={cardEnter}
          />
        );
      })}
    </div>
  );
};
