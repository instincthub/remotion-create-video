import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Scrolling article snippet cards
const ArticleSnippet: React.FC<{
  text: string;
  delay: number;
  y: number;
  xOffset: number;
  highlightDate?: boolean;
}> = ({ text, delay, y, xOffset, highlightDate = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterProgress = spring({
    frame,
    fps,
    delay,
    config: { damping: 12, stiffness: 100 },
  });
  const opacity = interpolate(enterProgress, [0, 1], [0, 1]);
  const slideX = interpolate(enterProgress, [0, 1], [xOffset > 0 ? 60 : -60, 0]);

  // Highlight animation for the date
  const highlightDelay = delay + 1.5 * fps;
  const highlightProgress = interpolate(
    frame,
    [highlightDelay, highlightDelay + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const parts = highlightDate ? text.split("August 5th, 1930") : [text];

  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: "50%",
        transform: `translateX(calc(-50% + ${xOffset + slideX}px))`,
        opacity,
        background: colors.white,
        borderRadius: 12,
        padding: "16px 28px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        border: `1px solid ${colors.chineseSilver}30`,
        maxWidth: 700,
        fontFamily,
        fontSize: 22,
        color: colors.gunmetal,
        lineHeight: 1.5,
      }}
    >
      {parts.length > 1 ? (
        <>
          {parts[0]}
          <span
            style={{
              color: colors.darkCyra,
              fontWeight: "bold",
              background: highlightProgress > 0
                ? `${colors.tiffanyBlue}${Math.round(highlightProgress * 25) < 16 ? "0" : ""}${Math.round(highlightProgress * 25).toString(16)}`
                : "transparent",
              padding: "2px 4px",
              borderRadius: 4,
            }}
          >
            August 5th, 1930
          </span>
          {parts[1]}
        </>
      ) : (
        text
      )}
    </div>
  );
};

export const Scene4Redundancy: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Heading
  const headProgress = spring({
    frame,
    fps,
    delay: 15,
    config: { damping: 12, stiffness: 100 },
  });
  const headOpacity = interpolate(headProgress, [0, 1], [0, 1]);
  const headScale = interpolate(headProgress, [0, 1], [0.8, 1]);

  // Equation text
  const eqProgress = spring({
    frame,
    fps,
    delay: 22 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const eqOpacity = interpolate(eqProgress, [0, 1], [0, 1]);
  const eqY = interpolate(eqProgress, [0, 1], [20, 0]);

  // Connecting lines that draw between snippets
  const connectProgress = interpolate(
    frame,
    [12 * fps, 18 * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const snippets = [
    { text: '"Neil Armstrong was born on August 5th, 1930 in Wapakoneta, Ohio."', delay: 2 * fps, y: 260, xOffset: -120 },
    { text: '"Born August 5th, 1930, Armstrong became the first man on the moon."', delay: 4 * fps, y: 360, xOffset: 100 },
    { text: '"Armstrong (August 5th, 1930 – August 25, 2012) was an American astronaut."', delay: 6 * fps, y: 460, xOffset: -80 },
    { text: '"On August 5th, 1930, Neil Alden Armstrong was born."', delay: 8 * fps, y: 560, xOffset: 140 },
    { text: '"The legendary astronaut was born August 5th, 1930."', delay: 10 * fps, y: 660, xOffset: -60 },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.white,
        fontFamily,
      }}
    >
      {/* Connecting highlight lines between dates */}
      <AbsoluteFill style={{ zIndex: 1 }}>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080">
          {snippets.slice(0, -1).map((_, i) => {
            const lineOpacity = interpolate(
              connectProgress,
              [i * 0.2, (i + 1) * 0.2],
              [0, 0.3],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const s1 = snippets[i];
            const s2 = snippets[i + 1];
            return (
              <line
                key={`connect-${i}`}
                x1={960 + s1.xOffset}
                y1={s1.y + 25}
                x2={960 + s2.xOffset}
                y2={s2.y + 25}
                stroke={colors.tiffanyBlue}
                strokeWidth={2}
                strokeDasharray="6 4"
                opacity={lineOpacity}
              />
            );
          })}
        </svg>
      </AbsoluteFill>

      {/* Article snippets */}
      <AbsoluteFill style={{ zIndex: 2 }}>
        {snippets.map((snippet, i) => (
          <ArticleSnippet
            key={`snippet-${i}`}
            text={snippet.text}
            delay={snippet.delay}
            y={snippet.y}
            xOffset={snippet.xOffset}
          />
        ))}
      </AbsoluteFill>

      {/* Heading */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: 80,
          zIndex: 3,
        }}
      >
        <div
          style={{
            opacity: headOpacity,
            transform: `scale(${headScale})`,
            fontSize: 48,
            fontWeight: "bold",
            color: colors.darkSlateGray,
            textAlign: "center",
            lineHeight: 1.3,
            background: colors.white,
            padding: "8px 32px",
            borderRadius: 12,
          }}
        >
          Simple problem +{" "}
          <span style={{ color: colors.darkCyra }}>Massive redundancy</span>
        </div>
        {/* Equation result directly under heading */}
        <div
          style={{
            opacity: eqOpacity,
            transform: `translateY(${eqY}px)`,
            fontSize: 38,
            fontWeight: "bold",
            color: colors.caribbeanGreen,
            textAlign: "center",
            background: colors.white,
            padding: "4px 24px",
            borderRadius: 8,
            marginTop: 8,
          }}
        >
          = Powerful results
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
