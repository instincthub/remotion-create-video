import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// ── SVG Icons (white, for dark background) ──

const SearchIcon: React.FC = () => (
  <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
    {/* Browser window frame */}
    <rect
      x="8" y="8" width="84" height="70" rx="8"
      stroke={colors.white} strokeWidth={2.5} fill="none"
    />
    <line x1="8" y1="22" x2="92" y2="22" stroke={colors.white} strokeWidth={2} />
    {/* URL dots */}
    <circle cx="18" cy="15" r="3" fill={colors.oldRose} />
    <circle cx="28" cy="15" r="3" fill={colors.corn} />
    <circle cx="38" cy="15" r="3" fill={colors.caribbeanGreen} />
    {/* Search bar */}
    <rect
      x="22" y="35" width="56" height="16" rx="8"
      stroke={colors.white} strokeWidth={2} fill="none"
    />
    {/* Magnifying glass in bar */}
    <circle cx="34" cy="43" r="4" stroke={colors.white} strokeWidth={1.5} fill="none" />
    <line x1="37" y1="46" x2="40" y2="49" stroke={colors.white} strokeWidth={1.5} strokeLinecap="round" />
    {/* Result lines */}
    <line x1="22" y1="60" x2="72" y2="60" stroke={colors.white} strokeWidth={1.5} opacity={0.4} />
    <line x1="22" y1="68" x2="60" y2="68" stroke={colors.white} strokeWidth={1.5} opacity={0.3} />
    {/* Cursor */}
    <path d="M76 70 l-3 10 l3 -2 l3 5 l3 -2 l-3 -5 l4 0 z" fill={colors.white} opacity={0.6} />
  </svg>
);

const ShoppingIcon: React.FC = () => (
  <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
    {/* Shopping bag */}
    <path
      d="M20 35 L20 82 a6 6 0 006 6 h48 a6 6 0 006-6 V35 Z"
      stroke={colors.white} strokeWidth={2.5} fill="none"
    />
    {/* Bag handles */}
    <path
      d="M35 35 V24 a15 15 0 0130 0 V35"
      stroke={colors.white} strokeWidth={2.5} fill="none" strokeLinecap="round"
    />
    {/* Package box inside bag */}
    <rect
      x="34" y="48" width="32" height="24" rx="3"
      stroke={colors.white} strokeWidth={2} fill="none"
    />
    <line x1="50" y1="48" x2="50" y2="72" stroke={colors.white} strokeWidth={1.5} />
    <line x1="34" y1="60" x2="66" y2="60" stroke={colors.white} strokeWidth={1.5} />
    {/* Star/sparkle - "knows what you want" */}
    <path d="M76 18 l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2 l6 -2 z" fill={colors.caribbeanGreen} opacity={0.7} />
    <path d="M22 14 l1 3 l3 1 l-3 1 l-1 3 l-1 -3 l-3 -1 l3 -1 z" fill={colors.tiffanyBlue} opacity={0.5} />
  </svg>
);

const TranslationGlobeIcon: React.FC = () => (
  <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
    {/* Globe */}
    <circle cx="50" cy="50" r="36" stroke={colors.white} strokeWidth={2.5} fill="none" />
    <ellipse cx="50" cy="50" rx="16" ry="36" stroke={colors.white} strokeWidth={1.5} fill="none" />
    <line x1="14" y1="50" x2="86" y2="50" stroke={colors.white} strokeWidth={1.5} />
    <line x1="18" y1="34" x2="82" y2="34" stroke={colors.white} strokeWidth={1} opacity={0.5} />
    <line x1="18" y1="66" x2="82" y2="66" stroke={colors.white} strokeWidth={1} opacity={0.5} />
    {/* "Hello" in English */}
    <rect x="2" y="4" width="36" height="18" rx="4" fill={colors.tiffanyBlue} opacity={0.8} />
    <text x="20" y="17" textAnchor="middle" fill={colors.white} fontSize="11" fontWeight="bold">
      Hello
    </text>
    {/* "こんにちは" in Japanese */}
    <rect x="60" y="78" width="38" height="18" rx="4" fill={colors.caribbeanGreen} opacity={0.8} />
    <text x="79" y="91" textAnchor="middle" fill={colors.white} fontSize="10" fontWeight="bold">
      こんにちは
    </text>
    {/* Arrow between */}
    <path d="M42 16 L58 80" stroke={colors.white} strokeWidth={1} strokeDasharray="3 3" opacity={0.4} />
  </svg>
);

const VoiceAssistantLargeIcon: React.FC = () => {
  const frame = useCurrentFrame();
  const wave1 = Math.sin(frame * 0.12) * 0.3 + 0.7;
  const wave2 = Math.sin(frame * 0.12 + 1) * 0.3 + 0.5;

  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
      {/* Speaker cylinder */}
      <rect
        x="30" y="20" width="40" height="60" rx="10"
        stroke={colors.white} strokeWidth={2.5} fill="none"
      />
      <ellipse cx="50" cy="20" rx="20" ry="7" stroke={colors.white} strokeWidth={2} fill="none" />
      {/* Mesh lines */}
      {[35, 45, 55, 65].map((y) => (
        <line
          key={y} x1="34" y1={y} x2="66" y2={y}
          stroke={colors.white} strokeWidth={0.8} opacity={0.25}
        />
      ))}
      {/* Glow ring */}
      <ellipse cx="50" cy="20" rx="16" ry="5" fill="none" stroke={colors.caribbeanGreen} strokeWidth={2.5} opacity={wave1} />
      {/* Sound waves right */}
      <path d="M74 35 C80 42, 80 52, 74 58" stroke={colors.white} strokeWidth={2} fill="none" strokeLinecap="round" opacity={wave1} />
      <path d="M80 28 C90 40, 90 55, 80 65" stroke={colors.white} strokeWidth={1.5} fill="none" strokeLinecap="round" opacity={wave2} />
      {/* Sound waves left */}
      <path d="M26 35 C20 42, 20 52, 26 58" stroke={colors.white} strokeWidth={2} fill="none" strokeLinecap="round" opacity={wave1} />
      {/* Music note */}
      <text x="82" y="22" fill={colors.caribbeanGreen} fontSize="16" opacity={0.7}>♪</text>
      {/* Base */}
      <ellipse cx="50" cy="82" rx="22" ry="5" stroke={colors.white} strokeWidth={2} fill="none" opacity={0.5} />
      <line x1="50" y1="80" x2="50" y2="86" stroke={colors.white} strokeWidth={2} opacity={0.5} />
    </svg>
  );
};

// ── Floating background icons (subtle, white, large spread) ──

const FloatingIcons: React.FC = () => {
  const frame = useCurrentFrame();

  const icons = [
    { x: 100, y: 140, speed: 0.3, char: "🔍", size: 36 },
    { x: 340, y: 700, speed: 0.5, char: "🛒", size: 32 },
    { x: 1500, y: 200, speed: 0.4, char: "💬", size: 34 },
    { x: 1200, y: 780, speed: 0.35, char: "🌐", size: 38 },
    { x: 750, y: 80, speed: 0.45, char: "📱", size: 30 },
    { x: 1700, y: 520, speed: 0.25, char: "🎵", size: 32 },
    { x: 500, y: 850, speed: 0.38, char: "🤖", size: 34 },
    { x: 1600, y: 850, speed: 0.42, char: "⚡", size: 28 },
  ];

  return (
    <AbsoluteFill style={{ opacity: 0.15 }}>
      {icons.map((icon, i) => {
        const floatY = Math.sin((frame * icon.speed + i * 50) * 0.05) * 20;
        const floatX = Math.cos((frame * icon.speed + i * 30) * 0.03) * 10;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: icon.x + floatX,
              top: icon.y + floatY,
              fontSize: icon.size,
            }}
          >
            {icon.char}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ── Showcase Card: appears per-topic with icon + label + context ──

type ShowcaseItem = {
  Icon: React.FC;
  label: string;
  context: string;
  accentColor: string;
};

const SHOWCASES: ShowcaseItem[] = [
  {
    Icon: SearchIcon,
    label: "Search",
    context: "Google answers our questions instantly",
    accentColor: colors.tiffanyBlue,
  },
  {
    Icon: ShoppingIcon,
    label: "Shopping",
    context: "Amazon knows what we want before we do",
    accentColor: colors.caribbeanGreen,
  },
  {
    Icon: TranslationGlobeIcon,
    label: "Translation",
    context: "Order coffee in Tokyo — no Japanese needed",
    accentColor: colors.tiffanyBlue,
  },
  {
    Icon: VoiceAssistantLargeIcon,
    label: "Voice Assistants",
    context: "Nailing your music requests like a champ",
    accentColor: colors.caribbeanGreen,
  },
];

// Timing: which showcase is active at which frame
// Voiceover pacing:
//   0-2.5s  (0-75f):    Title "AI Is Everywhere"
//   2.5-7s  (75-210f):  Google / Search
//   7-11.5s (210-345f): Amazon / Shopping
//   11.5-17s(345-510f): Translation / Tokyo
//   17-21s  (510-630f): Voice Assistants
//   21-24s  (630-720f): All 4 mini-badges collect in a row
//   24-30s  (720-915f): "BUT..." card
const SHOWCASE_TIMINGS = [
  { start: 75, end: 210 },
  { start: 210, end: 345 },
  { start: 345, end: 510 },
  { start: 510, end: 630 },
];
const COLLECT_START = 630;
const BUT_START = 720;

export const Scene2Context: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Title: "AI Is Everywhere" ──
  const titleProgress = spring({ frame, fps, config: { damping: 200 } });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [-30, 0]);
  // Title fades down after first showcase starts
  const titleFade = interpolate(frame, [75, 110], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Showcase cards (one at a time) ──
  const activeShowcase = SHOWCASE_TIMINGS.findIndex(
    (t) => frame >= t.start && frame < t.end,
  );

  // ── Collected mini-badges ──
  const collectProgress = spring({
    frame,
    fps,
    delay: COLLECT_START,
    config: { damping: 200 },
  });
  const collectOpacity = interpolate(collectProgress, [0, 1], [0, 1]);
  const isCollectPhase = frame >= COLLECT_START;

  // Badge fade out before BUT
  const badgesFadeOut = interpolate(
    frame,
    [BUT_START - 20, BUT_START + 10],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // ── "BUT..." card ──
  const butProgress = spring({
    frame,
    fps,
    delay: BUT_START,
    config: { damping: 200 },
  });
  const butOpacity = interpolate(butProgress, [0, 1], [0, 1]);
  const butScale = interpolate(butProgress, [0, 1], [0.8, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.deepGreenCyanTurquoise,
        fontFamily,
      }}
    >
      <FloatingIcons />

      {/* ── Title Phase ── */}
      {titleFade > 0 && (
        <AbsoluteFill
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: titleOpacity * titleFade,
          }}
        >
          <div
            style={{
              fontSize: 56,
              fontWeight: "bold",
              color: colors.white,
              transform: `translateY(${titleY}px)`,
              textAlign: "center",
            }}
          >
            AI Is Everywhere
          </div>
        </AbsoluteFill>
      )}

      {/* ── Showcase Cards (one at a time) ── */}
      {SHOWCASE_TIMINGS.map((timing, index) => {
        const item = SHOWCASES[index];
        const isActive = index === activeShowcase;
        const localFrame = frame - timing.start;

        // Entrance animation
        const entrance = spring({
          frame: Math.max(0, localFrame),
          fps,
          config: { damping: 15, stiffness: 100 },
        });
        const cardScale = interpolate(entrance, [0, 1], [0.7, 1]);
        const cardOpacity = interpolate(entrance, [0, 1], [0, 1]);

        // Exit animation (fade out when next showcase starts)
        const exitStart = timing.end - 20;
        const exitOpacity = interpolate(
          frame,
          [exitStart, timing.end],
          [1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

        // Don't render if not in range or in collect phase
        if (frame < timing.start - 10 || (isCollectPhase && !isActive)) return null;
        if (isCollectPhase) return null;

        return (
          <AbsoluteFill
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: cardOpacity * exitOpacity,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 24,
                transform: `scale(${cardScale})`,
              }}
            >
              {/* Icon circle */}
              <div
                style={{
                  width: 180,
                  height: 180,
                  borderRadius: 90,
                  border: `3px solid rgba(255,255,255,0.2)`,
                  backgroundColor: "rgba(255,255,255,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <item.Icon />
              </div>

              {/* Badge pill */}
              <div
                style={{
                  padding: "14px 44px",
                  borderRadius: 50,
                  backgroundColor: "rgba(255,255,255,0.95)",
                  color: colors.darkCyra,
                  fontSize: 34,
                  fontWeight: "bold",
                }}
              >
                {item.label}
              </div>

              {/* Context line */}
              <div
                style={{
                  fontSize: 24,
                  color: item.accentColor,
                  opacity: 0.9,
                  textAlign: "center",
                  maxWidth: 500,
                }}
              >
                {item.context}
              </div>
            </div>
          </AbsoluteFill>
        );
      })}

      {/* ── Collected mini-badges row ── */}
      {isCollectPhase && (
        <AbsoluteFill
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: collectOpacity * badgesFadeOut,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 30,
            }}
          >
            <div
              style={{
                fontSize: 40,
                fontWeight: "bold",
                color: colors.white,
              }}
            >
              AI is everywhere.
            </div>
            <div
              style={{
                display: "flex",
                gap: 18,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {SHOWCASES.map((item, i) => {
                const badgeEntrance = spring({
                  frame,
                  fps,
                  delay: COLLECT_START + i * 6,
                  config: { damping: 200 },
                });
                const badgeScale = interpolate(
                  badgeEntrance,
                  [0, 1],
                  [0.6, 1],
                );

                return (
                  <div
                    key={i}
                    style={{
                      padding: "12px 28px",
                      borderRadius: 40,
                      backgroundColor: "rgba(255,255,255,0.95)",
                      color: colors.darkCyra,
                      fontSize: 24,
                      fontWeight: "bold",
                      transform: `scale(${badgeScale})`,
                    }}
                  >
                    {item.label}
                  </div>
                );
              })}
            </div>
            <div
              style={{
                fontSize: 22,
                color: colors.white,
                opacity: 0.6,
                marginTop: 10,
              }}
            >
              But the AI that runs your apps and the AI that runs businesses?
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* ── "BUT..." interstitial ── */}
      {frame > BUT_START - 10 && (
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: butOpacity,
            gap: 20,
          }}
        >
          <div
            style={{
              backgroundColor: colors.darkCyra,
              padding: "40px 100px",
              borderRadius: 20,
              transform: `scale(${butScale})`,
            }}
          >
            <div
              style={{
                fontSize: 72,
                fontWeight: "bold",
                color: colors.white,
                letterSpacing: 8,
              }}
            >
              BUT...
            </div>
          </div>
          <div
            style={{
              fontSize: 26,
              color: colors.white,
              opacity: butOpacity * 0.7,
              marginTop: 10,
            }}
          >
            Totally different methodology.
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
