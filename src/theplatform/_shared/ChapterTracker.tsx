import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { colors } from "./colors";
import { overpass } from "./fonts";
import { sparkShadow } from "./theme";
import type { Chapter, ChapterState } from "./types";

/**
 * Persistent right-rail progress tracker — the spine of the talk.
 *
 * A CLEAN roadmap (no blur): every chapter is always readable.
 *   • active   → ink fill, white label, YELLOW number badge (the spark)
 *   • done     → dimmed with a checkmark
 *   • upcoming → dimmed, lower opacity (visible, not hidden)
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
  chapters: Chapter[],
  i: number,
  frame: number,
  fadeAt: number,
): ChapterState => {
  const start = chapters[i].activeAt;
  const next = chapters[i + 1]?.activeAt ?? fadeAt;
  if (frame < start) return "upcoming";
  if (frame < next) return "active";
  return "done";
};

const TrackerCard: React.FC<{
  chapter: Chapter;
  state: ChapterState;
  enter: number;
}> = ({ chapter, state, enter }) => {
  const isActive = state === "active";
  const isDone = state === "done";

  const panelBg = isActive
    ? `${colors.ink}F2`
    : isDone
      ? `${colors.ink}C7`
      : `${colors.ink}9E`;

  const borderColor = isActive
    ? colors.yellow
    : isDone
      ? `${colors.yellow}33`
      : `${colors.textMuted}40`;

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
          ? sparkShadow
          : "0 10px 24px -16px rgba(0,0,0,0.6)",
        transform: `translateX(${interpolate(enter, [0, 1], [60, 0])}px) scale(${isActive ? 1.04 : 1})`,
        opacity: enter,
      }}
    >
      {/* Number / check badge — yellow when active (text on yellow = ink) */}
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
            ? colors.yellow
            : isDone
              ? `${colors.yellow}26`
              : `${colors.textMuted}33`,
          fontFamily: overpass,
          fontSize: 20,
          fontWeight: 800,
          color: isActive ? colors.ink : labelColor,
        }}
      >
        {isDone ? <Check color={colors.yellow} /> : String(chapter.n).padStart(2, "0")}
      </div>

      <div
        style={{
          fontFamily: overpass,
          fontSize: 25,
          fontWeight: isActive ? 800 : 600,
          color: labelColor,
          lineHeight: 1.12,
          flex: 1,
        }}
      >
        {chapter.short}
      </div>
    </div>
  );
};

export const ChapterTracker: React.FC<{
  title: string;
  chapters: Chapter[];
  trackerIn: number;
  fadeAt: number;
}> = ({ title, chapters, trackerIn, fadeAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = frame - trackerIn;
  if (localFrame < 0) return null;

  const railEnter = spring({ frame: localFrame, fps, config: { damping: 20, stiffness: 80 } });

  const activeIndex = chapters.reduce(
    (acc, _c, i) => (stateAt(chapters, i, frame, fadeAt) === "active" ? i : acc),
    -1,
  );
  const doneCount = chapters.filter(
    (_c, i) => stateAt(chapters, i, frame, fadeAt) === "done",
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
            fontFamily: overpass,
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: 3,
            color: colors.goldDim,
            textTransform: "uppercase",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: overpass,
            fontSize: 18,
            fontWeight: 700,
            color: colors.textDim,
          }}
        >
          {String(counter).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
        </div>
      </div>

      {chapters.map((c, i) => {
        const cardEnter = spring({
          frame: localFrame - i * 5,
          fps,
          config: { damping: 20, stiffness: 80 },
        });
        return (
          <TrackerCard
            key={i}
            chapter={c}
            state={stateAt(chapters, i, frame, fadeAt)}
            enter={cardEnter}
          />
        );
      })}
    </div>
  );
};
