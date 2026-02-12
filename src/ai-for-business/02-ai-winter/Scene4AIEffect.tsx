import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Items that get "dismissed" as not AI
const DISMISSED_ITEMS = [
  { icon: "🧮", label: "Calculator", dismissAt: 6 },
  { icon: "🔍", label: "Search Engine", dismissAt: 10 },
  { icon: "♟️", label: "Chess Computer", dismissAt: 14 },
];

// Moving goalpost illustration
const Goalpost: React.FC<{ progress: number }> = ({ progress }) => {
  const postX = interpolate(progress, [0, 1], [600, 1100]);

  return (
    <svg width="1400" height="120" viewBox="0 0 1400 120" fill="none">
      {/* Ground line */}
      <line x1="0" y1="100" x2="1400" y2="100" stroke={colors.iceGray} strokeWidth={1} opacity={0.3} />
      {/* Runner (AI) */}
      <circle cx="400" cy="70" r="20" stroke={colors.darkCyra} strokeWidth={2.5} fill="none" />
      <text x="400" y="76" textAnchor="middle" fill={colors.darkCyra} fontSize="18">AI</text>
      {/* Dotted path */}
      <line x1="430" y1="70" x2={postX - 30} y2="70" stroke={colors.iceGray} strokeWidth={1.5} strokeDasharray="6 4" opacity={0.4} />
      {/* Goalpost */}
      <rect x={postX - 5} y="30" width="10" height="70" rx="2" fill={colors.corn} />
      <rect x={postX - 25} y="26" width="50" height="8" rx="3" fill={colors.corn} />
      {/* Arrow showing movement */}
      {progress > 0.3 && (
        <path
          d={`M${postX + 30} 60 L${postX + 55} 60 L${postX + 50} 52 M${postX + 55} 60 L${postX + 50} 68`}
          stroke={colors.corn} strokeWidth={2} fill="none" strokeLinecap="round"
        />
      )}
    </svg>
  );
};

export const Scene4AIEffect: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Phase 1: Definitions (0-7s) ──
  const def1Progress = spring({ frame, fps, delay: 20, config: { damping: 200 } });
  const def1Opacity = interpolate(def1Progress, [0, 1], [0, 1]);

  const def2Progress = spring({ frame, fps, delay: 3 * fps, config: { damping: 200 } });
  const def2Opacity = interpolate(def2Progress, [0, 1], [0, 1]);

  // Fade definitions out
  const defsFade = interpolate(frame, [5 * fps, 6 * fps], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Phase 2: "That's not AI" dismissals (6-16s) ──
  const dismissPhaseOpacity = interpolate(
    frame,
    [5.5 * fps, 6 * fps, 16 * fps, 17 * fps],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // ── Phase 3: AI Effect stamp + goalpost (14-20s) ──
  const stampDelay = 16 * fps;
  const stampProgress = spring({
    frame,
    fps,
    delay: stampDelay,
    config: { damping: 10, stiffness: 200 },
  });
  const stampScale = interpolate(stampProgress, [0, 1], [3, 1]);
  const stampOpacity = interpolate(stampProgress, [0, 1], [0, 1]);

  // Goalpost moves from 17-22s
  const goalpostProgress = interpolate(
    frame,
    [17 * fps, 22 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // ── Phase 4: Quote (20-25s) ──
  const quoteDelay = 20 * fps;
  const quoteProgress = spring({ frame, fps, delay: quoteDelay, config: { damping: 200 } });
  const quoteOpacity = interpolate(quoteProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.darkNavy,
        fontFamily,
      }}
    >
      {/* ── Phase 1: Definitions ── */}
      {defsFade > 0 && (
        <AbsoluteFill
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 60,
            padding: "80px 160px",
            opacity: defsFade,
          }}
        >
          {/* McCarthy definition */}
          <div style={{ flex: 1, opacity: def1Opacity }}>
            <div style={{
              backgroundColor: "rgba(0,131,143,0.1)",
              border: `2px solid ${colors.darkCyra}`,
              borderRadius: 16,
              padding: 32,
            }}>
              <div style={{ fontSize: 16, color: colors.darkCyra, fontWeight: "bold", marginBottom: 12 }}>
                John McCarthy
              </div>
              <div style={{ fontSize: 26, color: colors.white, lineHeight: 1.5 }}>
                &ldquo;The science of making <span style={{ color: colors.darkCyra }}>intelligent machines</span>.&rdquo;
              </div>
            </div>
          </div>

          {/* Minsky definition */}
          <div style={{ flex: 1, opacity: def2Opacity }}>
            <div style={{
              backgroundColor: "rgba(0,131,143,0.1)",
              border: `2px solid ${colors.darkCyra}`,
              borderRadius: 16,
              padding: 32,
            }}>
              <div style={{ fontSize: 16, color: colors.darkCyra, fontWeight: "bold", marginBottom: 12 }}>
                Marvin Minsky
              </div>
              <div style={{ fontSize: 26, color: colors.white, lineHeight: 1.5 }}>
                &ldquo;Making machines do things that would require <span style={{ color: colors.darkCyra }}>intelligence</span> if done by humans.&rdquo;
              </div>
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* ── Phase 2: "That's not AI" fast cuts ── */}
      {dismissPhaseOpacity > 0 && (
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 30,
            opacity: dismissPhaseOpacity,
          }}
        >
          <div style={{ display: "flex", gap: 40 }}>
            {DISMISSED_ITEMS.map((item, i) => {
              const itemFrame = frame - item.dismissAt * fps;
              const isVisible = frame >= item.dismissAt * fps;
              const entrance = isVisible
                ? spring({
                    frame: Math.max(0, itemFrame),
                    fps,
                    config: { damping: 12, stiffness: 150 },
                  })
                : 0;
              const itemScale = interpolate(entrance, [0, 1], [0.5, 1]);

              // Strike-through appears shortly after
              const strikeProgress = isVisible
                ? interpolate(itemFrame, [15, 30], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  })
                : 0;

              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 12,
                    transform: `scale(${itemScale})`,
                    opacity: isVisible ? 1 : 0,
                  }}
                >
                  <div style={{ fontSize: 64 }}>{item.icon}</div>
                  <div style={{ fontSize: 22, color: colors.white, fontWeight: "bold", position: "relative" }}>
                    {item.label}
                    {/* Strike-through */}
                    <div style={{
                      position: "absolute",
                      top: "50%",
                      left: -5,
                      right: -5,
                      height: 3,
                      backgroundColor: colors.oldRose,
                      transform: `scaleX(${strikeProgress})`,
                      transformOrigin: "left",
                    }} />
                  </div>
                  {strikeProgress > 0.8 && (
                    <div style={{ fontSize: 16, color: colors.oldRose, opacity: strikeProgress }}>
                      &ldquo;That&apos;s not AI...&rdquo;
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </AbsoluteFill>
      )}

      {/* ── Phase 3: AI Effect stamp + goalpost ── */}
      {stampOpacity > 0 && (
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 40,
          }}
        >
          {/* Stamp */}
          <div
            style={{
              border: `4px solid ${colors.oldRose}`,
              borderRadius: 12,
              padding: "16px 48px",
              transform: `scale(${stampScale}) rotate(-8deg)`,
              opacity: stampOpacity,
            }}
          >
            <div style={{ fontSize: 48, fontWeight: "bold", color: colors.oldRose }}>
              THE AI EFFECT
            </div>
          </div>

          {/* Goalpost animation */}
          {goalpostProgress > 0 && (
            <div style={{ marginTop: 20 }}>
              <Goalpost progress={goalpostProgress} />
            </div>
          )}
        </AbsoluteFill>
      )}

      {/* ── Phase 4: Quote ── */}
      {quoteOpacity > 0 && (
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingBottom: 120,
            opacity: quoteOpacity,
          }}
        >
          <div style={{
            fontSize: 28,
            color: colors.white,
            textAlign: "center",
            maxWidth: 800,
            fontStyle: "italic",
            lineHeight: 1.6,
          }}>
            &ldquo;Intelligence is whatever machines <span style={{ color: colors.darkCyra, fontWeight: "bold" }}>haven&apos;t done yet</span>.&rdquo;
          </div>
          <div style={{ fontSize: 18, color: colors.iceGray, marginTop: 12 }}>
            — Larry Tesler
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
