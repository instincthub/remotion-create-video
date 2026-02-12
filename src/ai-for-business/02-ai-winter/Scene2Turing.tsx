import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Turing portrait — minimalist line-art style
const TuringPortrait: React.FC<{ opacity: number }> = ({ opacity }) => (
  <svg
    width="260" height="320" viewBox="0 0 260 320" fill="none"
    style={{ opacity }}
  >
    {/* Head outline */}
    <ellipse cx="130" cy="120" rx="75" ry="90"
      stroke={colors.chineseSilver} strokeWidth={2} fill="none"
    />
    {/* Hair */}
    <path
      d="M60 95 C65 50, 130 25, 200 95"
      stroke={colors.chineseSilver} strokeWidth={2} fill="none"
    />
    {/* Eyes */}
    <circle cx="105" cy="110" r="6" stroke={colors.chineseSilver} strokeWidth={1.5} fill="none" />
    <circle cx="155" cy="110" r="6" stroke={colors.chineseSilver} strokeWidth={1.5} fill="none" />
    <circle cx="105" cy="110" r="2.5" fill={colors.chineseSilver} />
    <circle cx="155" cy="110" r="2.5" fill={colors.chineseSilver} />
    {/* Nose */}
    <path d="M130 118 L125 138 L135 138" stroke={colors.chineseSilver} strokeWidth={1.5} fill="none" />
    {/* Mouth */}
    <path d="M112 152 C120 160, 140 160, 148 152" stroke={colors.chineseSilver} strokeWidth={1.5} fill="none" />
    {/* Collar/suit */}
    <path
      d="M70 200 L100 180 L130 195 L160 180 L190 200"
      stroke={colors.chineseSilver} strokeWidth={2} fill="none"
    />
    <line x1="130" y1="195" x2="130" y2="230" stroke={colors.chineseSilver} strokeWidth={1.5} />
    {/* Tie */}
    <path d="M125 200 L130 230 L135 200" stroke={colors.chineseSilver} strokeWidth={1.5} fill="none" />
    {/* Name */}
    <text x="130" y="280" textAnchor="middle" fill={colors.chineseSilver} fontSize="18" fontWeight="bold">
      Alan Turing
    </text>
    <text x="130" y="302" textAnchor="middle" fill={colors.iceGray} fontSize="14">
      1912 – 1954
    </text>
  </svg>
);

// Turing Test diagram — Human vs Machine chat
const TuringTestDiagram: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: 40,
        alignItems: "center",
        opacity: progress,
        transform: `translateY(${(1 - progress) * 20}px)`,
      }}
    >
      {/* Human side */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <circle cx="30" cy="20" r="14" stroke={colors.white} strokeWidth={2} fill="none" />
          <path d="M10 55 C10 38, 50 38, 50 55" stroke={colors.white} strokeWidth={2} fill="none" />
        </svg>
        <div style={{ fontSize: 16, color: colors.white, fontWeight: "bold" }}>Human</div>
      </div>

      {/* Chat bubbles */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 200 }}>
        <div style={{
          backgroundColor: "rgba(255,255,255,0.1)",
          borderRadius: "12px 12px 12px 4px",
          padding: "10px 16px",
          fontSize: 14,
          color: colors.white,
          alignSelf: "flex-start",
          fontFamily,
        }}>
          Are you a machine?
        </div>
        <div style={{
          backgroundColor: `${colors.darkCyra}40`,
          borderRadius: "12px 12px 4px 12px",
          padding: "10px 16px",
          fontSize: 14,
          color: colors.tiffanyBlue,
          alignSelf: "flex-end",
          fontFamily,
        }}>
          What do you think?
        </div>
      </div>

      {/* Machine side */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <rect x="12" y="10" width="36" height="30" rx="4" stroke={colors.darkCyra} strokeWidth={2} fill="none" />
          <circle cx="24" cy="25" r="4" stroke={colors.darkCyra} strokeWidth={1.5} fill="none" />
          <circle cx="36" cy="25" r="4" stroke={colors.darkCyra} strokeWidth={1.5} fill="none" />
          <line x1="22" y1="45" x2="38" y2="45" stroke={colors.darkCyra} strokeWidth={2} strokeLinecap="round" />
          <line x1="30" y1="40" x2="30" y2="48" stroke={colors.darkCyra} strokeWidth={2} />
          <rect x="18" y="48" width="24" height="4" rx="2" stroke={colors.darkCyra} strokeWidth={1.5} fill="none" />
        </svg>
        <div style={{ fontSize: 16, color: colors.darkCyra, fontWeight: "bold" }}>Machine</div>
      </div>

      {/* Question mark */}
      <div style={{
        position: "absolute",
        right: -40,
        top: -10,
        fontSize: 40,
        fontWeight: "bold",
        color: colors.darkCyra,
        opacity: 0.6,
      }}>
        ?
      </div>
    </div>
  );
};

export const Scene2Turing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Year badge
  const yearProgress = spring({ frame, fps, config: { damping: 200 } });
  const yearOpacity = interpolate(yearProgress, [0, 1], [0, 1]);

  // Portrait entrance
  const portraitProgress = spring({ frame, fps, delay: 15, config: { damping: 200 } });
  const portraitOpacity = interpolate(portraitProgress, [0, 1], [0, 1]);

  // Typewriter: "Can machines think?"
  const typeStart = 2 * fps;
  const fullText = "Can machines think?";
  const charsPerFrame = 0.4;
  const typeFrame = Math.max(0, frame - typeStart);
  const visibleChars = Math.min(Math.floor(typeFrame * charsPerFrame), fullText.length);
  const displayText = fullText.slice(0, visibleChars);
  const isTyping = frame >= typeStart && visibleChars < fullText.length;
  const typeComplete = visibleChars >= fullText.length;

  // Underline appears after typing
  const underlineProgress = spring({
    frame,
    fps,
    delay: typeStart + Math.ceil(fullText.length / charsPerFrame) + 10,
    config: { damping: 200 },
  });
  const underlineWidth = interpolate(underlineProgress, [0, 1], [0, 100]);

  // Turing Test diagram
  const diagramDelay = 10 * fps;
  const diagramProgress = spring({
    frame,
    fps,
    delay: diagramDelay,
    config: { damping: 200 },
  });
  const diagramOpacity = interpolate(diagramProgress, [0, 1], [0, 1]);

  // Slow pan (left to right)
  const panX = interpolate(frame, [0, 600], [20, -20], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.darkCharcoal,
        fontFamily,
      }}
    >
      {/* Vintage paper texture overlay */}
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, rgba(255,255,255,0.02) 0%, transparent 70%)`,
          transform: `translateX(${panX}px)`,
        }}
      />

      <div
        style={{
          display: "flex",
          height: "100%",
          padding: "60px 120px",
          gap: 80,
          transform: `translateX(${panX}px)`,
        }}
      >
        {/* Left: Portrait */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TuringPortrait opacity={portraitOpacity} />
        </div>

        {/* Right: Content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 40,
          }}
        >
          {/* Year badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              opacity: yearOpacity,
            }}
          >
            <div
              style={{
                backgroundColor: colors.darkCyra,
                padding: "8px 24px",
                borderRadius: 30,
                fontSize: 22,
                fontWeight: "bold",
                color: colors.white,
              }}
            >
              1950
            </div>
            <div style={{ fontSize: 18, color: colors.iceGray }}>
              The question that started it all
            </div>
          </div>

          {/* Typewriter question */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                fontSize: 56,
                fontWeight: "bold",
                color: colors.white,
                lineHeight: 1.3,
              }}
            >
              &ldquo;{displayText}
              {(isTyping || (!typeComplete && frame >= typeStart)) && (
                <span
                  style={{
                    display: "inline-block",
                    width: 3,
                    height: 56,
                    backgroundColor: colors.darkCyra,
                    marginLeft: 2,
                    verticalAlign: "middle",
                    opacity: frame % 30 < 15 ? 1 : 0,
                  }}
                />
              )}
              {typeComplete && <>&rdquo;</>}
            </div>
            {/* Underline accent */}
            <div
              style={{
                height: 4,
                width: `${underlineWidth}%`,
                backgroundColor: colors.darkCyra,
                borderRadius: 2,
                marginTop: 8,
              }}
            />
          </div>

          {/* Attribution */}
          <div
            style={{
              fontSize: 20,
              color: colors.iceGray,
              opacity: typeComplete ? 1 : 0,
            }}
          >
            — Alan Turing, &ldquo;Computing Machinery and Intelligence&rdquo;
          </div>

          {/* Turing Test diagram */}
          {frame > diagramDelay - 30 && (
            <div style={{ position: "relative", marginTop: 20, opacity: diagramOpacity }}>
              <div
                style={{
                  fontSize: 18,
                  color: colors.darkCyra,
                  fontWeight: "bold",
                  marginBottom: 16,
                }}
              >
                The Turing Test
              </div>
              <TuringTestDiagram progress={diagramOpacity} />
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
