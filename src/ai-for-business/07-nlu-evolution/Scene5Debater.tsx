import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Human silhouette
const HumanSilhouette: React.FC = () => (
  <svg width="200" height="300" viewBox="0 0 200 300" fill="none">
    {/* Head */}
    <circle cx="100" cy="55" r="35" fill={colors.chineseSilver} opacity={0.6} />
    {/* Body */}
    <path
      d="M100 90 L100 200 M100 120 L50 170 M100 120 L150 170 M100 200 L60 280 M100 200 L140 280"
      stroke={colors.chineseSilver}
      strokeWidth="4"
      strokeLinecap="round"
      opacity={0.6}
    />
    {/* Podium */}
    <rect x="30" y="220" width="140" height="80" rx="6" fill={`${colors.chineseSilver}20`} stroke={colors.chineseSilver} strokeWidth="1.5" opacity={0.4} />
    <text x="100" y="268" textAnchor="middle" fill={colors.chineseSilver} fontSize="14" fontWeight="bold">
      HUMAN
    </text>
  </svg>
);

// Digital brain / AI silhouette
const AIBrain: React.FC<{ frame: number }> = ({ frame }) => {
  const pulse = Math.sin(frame * 0.08) * 0.15 + 0.85;

  return (
    <svg width="200" height="300" viewBox="0 0 200 300" fill="none">
      {/* Brain outline */}
      <path
        d="M100 25 C60 25 35 50 35 80 C35 95 42 108 55 115 C48 125 45 138 50 150 C55 162 65 170 80 172 L80 200 L120 200 L120 172 C135 170 145 162 150 150 C155 138 152 125 145 115 C158 108 165 95 165 80 C165 50 140 25 100 25Z"
        stroke={colors.tiffanyBlue}
        strokeWidth="2"
        fill={`${colors.darkCyra}15`}
        opacity={pulse}
      />
      {/* Neural connections inside brain */}
      {[
        { x1: 70, y1: 60, x2: 130, y2: 80 },
        { x1: 80, y1: 90, x2: 120, y2: 60 },
        { x1: 60, y1: 100, x2: 140, y2: 110 },
        { x1: 90, y1: 130, x2: 110, y2: 70 },
        { x1: 75, y1: 140, x2: 125, y2: 130 },
      ].map((line, i) => {
        const lineOpacity = Math.sin(frame * 0.1 + i * 1.5) * 0.3 + 0.5;
        return (
          <line
            key={i}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke={colors.tiffanyBlue}
            strokeWidth="1"
            opacity={lineOpacity}
          />
        );
      })}
      {/* Nodes */}
      {[
        { cx: 70, cy: 60 }, { cx: 130, cy: 80 }, { cx: 80, cy: 90 },
        { cx: 120, cy: 60 }, { cx: 60, cy: 100 }, { cx: 140, cy: 110 },
        { cx: 90, cy: 130 }, { cx: 110, cy: 70 }, { cx: 75, cy: 140 },
        { cx: 125, cy: 130 },
      ].map((node, i) => {
        const nodeGlow = Math.sin(frame * 0.12 + i * 2) * 0.4 + 0.6;
        return (
          <circle
            key={i}
            cx={node.cx}
            cy={node.cy}
            r="4"
            fill={colors.caribbeanGreen}
            opacity={nodeGlow}
          />
        );
      })}
      {/* Body line */}
      <line x1="100" y1="200" x2="100" y2="220" stroke={colors.tiffanyBlue} strokeWidth="2" />
      {/* Podium */}
      <rect x="30" y="220" width="140" height="80" rx="6" fill={`${colors.darkCyra}20`} stroke={colors.tiffanyBlue} strokeWidth="1.5" opacity={0.5} />
      <text x="100" y="268" textAnchor="middle" fill={colors.tiffanyBlue} fontSize="14" fontWeight="bold">
        AI
      </text>
    </svg>
  );
};

export const Scene5Debater: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Phase timing ──
  // Phase 1: 0–14s  (VS matchup)
  // Phase 2: 14–30s (sources → arguments)
  // Phase 3: 30–40s (closing statement)
  const phase1FadeOut = interpolate(frame, [12 * fps, 14 * fps], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phase2FadeIn = interpolate(frame, [14 * fps, 16 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phase2FadeOut = interpolate(frame, [28 * fps, 30 * fps], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phase3FadeIn = interpolate(frame, [30 * fps, 32 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Phase 1 animations ──
  const badgeProgress = spring({ frame, fps, delay: 5, config: { damping: 200 } });
  const badgeOpacity = interpolate(badgeProgress, [0, 1], [0, 1]);

  const titleProgress = spring({ frame, fps, delay: 10, config: { damping: 12, stiffness: 100 } });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  const humanProgress = spring({ frame, fps, delay: fps, config: { damping: 15, stiffness: 80 } });
  const humanX = interpolate(humanProgress, [0, 1], [-200, 0]);
  const humanOpacity = interpolate(humanProgress, [0, 1], [0, 1]);

  const aiProgress = spring({ frame, fps, delay: 1.5 * fps, config: { damping: 15, stiffness: 80 } });
  const aiX = interpolate(aiProgress, [0, 1], [200, 0]);
  const aiOpacity = interpolate(aiProgress, [0, 1], [0, 1]);

  const vsProgress = spring({ frame, fps, delay: 2.5 * fps, config: { damping: 12, stiffness: 120 } });
  const vsScale = interpolate(vsProgress, [0, 1], [0, 1]);

  // ── Phase 2 animations ──
  const sources = ["Newspapers", "Journals", "Academic papers", "Encyclopedias"];
  const arguments_ = [
    { text: "Economic growth benefits", isFor: true },
    { text: "Job displacement risks", isFor: false },
    { text: "Innovation acceleration", isFor: true },
    { text: "Societal inequality concerns", isFor: false },
  ];

  const arrowProgress = interpolate(frame, [22 * fps, 24 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Phase 3 animations ──
  const closingProgress = spring({
    frame: Math.max(0, frame - 31 * fps),
    fps,
    delay: 0,
    config: { damping: 12, stiffness: 80 },
  });
  const closingScale = interpolate(closingProgress, [0, 1], [0.85, 1]);
  const closingY = interpolate(closingProgress, [0, 1], [30, 0]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${colors.americanPurple}, ${colors.policeBlue})`,
        fontFamily,
      }}
    >
      {/* ═══ PHASE 1: VS Matchup ═══ */}
      <AbsoluteFill style={{ opacity: phase1FadeOut }}>
        {/* Vertical divider */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 160,
            bottom: 250,
            width: 1,
            backgroundColor: `${colors.white}10`,
          }}
        />

        {/* Era badge */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 0,
            right: 0,
            textAlign: "center",
            opacity: badgeOpacity,
          }}
        >
          <span
            style={{
              display: "inline-block",
              padding: "8px 24px",
              borderRadius: 40,
              backgroundColor: `${colors.tiffanyBlue}20`,
              border: `2px solid ${colors.tiffanyBlue}50`,
              color: colors.tiffanyBlue,
              fontSize: 22,
              fontWeight: "bold",
              letterSpacing: 3,
            }}
          >
            2019
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            position: "absolute",
            top: 110,
            left: 0,
            right: 0,
            textAlign: "center",
            fontSize: 56,
            fontWeight: "bold",
            color: colors.white,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          Project Debater:{" "}
          <span style={{ color: colors.tiffanyBlue }}>Machine vs Human</span>
        </div>

        {/* VS layout */}
        <div
          style={{
            position: "absolute",
            top: 220,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            gap: 140,
            alignItems: "flex-start",
            paddingBottom: 200,
          }}
        >
          {/* Human side */}
          <div
            style={{
              opacity: humanOpacity,
              transform: `translateX(${humanX}px)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <HumanSilhouette />
            <div
              style={{
                fontSize: 22,
                color: colors.chineseSilver,
                marginTop: 16,
                fontWeight: "bold",
              }}
            >
              World Champion Debater
            </div>
          </div>

          {/* VS */}
          <div
            style={{
              fontSize: 56,
              fontWeight: "bold",
              color: colors.oldRose,
              transform: `scale(${vsScale})`,
              marginTop: 130,
              textShadow: `0 0 30px ${colors.oldRose}40`,
            }}
          >
            VS
          </div>

          {/* AI side */}
          <div
            style={{
              opacity: aiOpacity,
              transform: `translateX(${aiX}px)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <AIBrain frame={frame} />
            <div
              style={{
                fontSize: 22,
                color: colors.tiffanyBlue,
                marginTop: 16,
                fontWeight: "bold",
              }}
            >
              Project Debater
            </div>
          </div>
        </div>
      </AbsoluteFill>

      {/* ═══ PHASE 2: Sources → Arguments ═══ */}
      <AbsoluteFill
        style={{
          opacity: phase2FadeIn * phase2FadeOut,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 200,
        }}
      >
        {/* Section title */}
        <div
          style={{
            fontSize: 44,
            fontWeight: "bold",
            color: colors.white,
            marginBottom: 60,
            textAlign: "center",
          }}
        >
          Reading <span style={{ color: colors.tiffanyBlue }}>billions</span> of sentences,
          building <span style={{ color: colors.caribbeanGreen }}>structured arguments</span>
        </div>

        {/* Sources → Arrow → Arguments */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 80,
          }}
        >
          {/* Sources */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div
              style={{
                fontSize: 18,
                color: colors.rhythm,
                fontWeight: "bold",
                letterSpacing: 2,
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Data sources
            </div>
            {sources.map((source, i) => {
              const itemDelay = 16 * fps + i * 12;
              const itemProgress = interpolate(
                frame,
                [itemDelay, itemDelay + 15],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              return (
                <div
                  key={i}
                  style={{
                    fontSize: 32,
                    color: colors.tiffanyBlue,
                    opacity: itemProgress,
                    transform: `translateX(${(1 - itemProgress) * 20}px)`,
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      backgroundColor: colors.tiffanyBlue,
                    }}
                  />
                  {source}
                </div>
              );
            })}
          </div>

          {/* Arrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              opacity: arrowProgress,
              marginTop: 100,
            }}
          >
            <svg width="100" height="36" viewBox="0 0 100 36" fill="none">
              <line x1="0" y1="18" x2="76" y2="18" stroke={colors.caribbeanGreen} strokeWidth="3" />
              <polygon points="73,9 92,18 73,27" fill={colors.caribbeanGreen} />
            </svg>
          </div>

          {/* Structured arguments */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div
              style={{
                fontSize: 18,
                color: colors.rhythm,
                fontWeight: "bold",
                letterSpacing: 2,
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Structured arguments
            </div>
            {arguments_.map((arg, i) => {
              const itemDelay = 23 * fps + i * 12;
              const itemProgress = interpolate(
                frame,
                [itemDelay, itemDelay + 15],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              return (
                <div
                  key={i}
                  style={{
                    fontSize: 32,
                    color: arg.isFor ? colors.caribbeanGreen : colors.oldRose,
                    opacity: itemProgress,
                    transform: `translateX(${(1 - itemProgress) * -20}px)`,
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 6,
                      backgroundColor: arg.isFor
                        ? `${colors.caribbeanGreen}20`
                        : `${colors.oldRose}20`,
                      border: `1.5px solid ${arg.isFor ? colors.caribbeanGreen : colors.oldRose}60`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 16,
                      fontWeight: "bold",
                      color: arg.isFor ? colors.caribbeanGreen : colors.oldRose,
                    }}
                  >
                    {arg.isFor ? "+" : "\u2212"}
                  </div>
                  {arg.text}
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>

      {/* ═══ PHASE 3: Closing statement ═══ */}
      <AbsoluteFill
        style={{
          opacity: phase3FadeIn,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 200,
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: "bold",
            color: colors.white,
            textAlign: "center",
            maxWidth: 1000,
            lineHeight: 1.4,
            opacity: phase3FadeIn,
            transform: `translateY(${closingY}px) scale(${closingScale})`,
            textShadow: `0 0 40px ${colors.americanPurple}60`,
          }}
        >
          That is not just answering a question.
          <br />
          That is{" "}
          <span style={{ color: colors.caribbeanGreen }}>
            constructing reasoning
          </span>
          .
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
