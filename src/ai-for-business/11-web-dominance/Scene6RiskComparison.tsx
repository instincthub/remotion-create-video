import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// List item that slides in
const ListItem: React.FC<{
  text: string;
  delay: number;
  color: string;
  dotColor: string;
  fromLeft: boolean;
}> = ({ text, delay, color, dotColor, fromLeft }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    delay,
    config: { damping: 12, stiffness: 100 },
  });
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const slideX = interpolate(progress, [0, 1], [fromLeft ? -30 : 30, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${slideX}px)`,
        fontSize: 28,
        fontWeight: "bold",
        color,
        display: "flex",
        alignItems: "center",
        gap: 14,
        lineHeight: 1.5,
      }}
    >
      <div
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: dotColor,
          flexShrink: 0,
        }}
      />
      {text}
    </div>
  );
};

export const Scene6RiskComparison: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Divider slide animation
  const dividerProgress = spring({
    frame,
    fps,
    delay: fps,
    config: { damping: 14, stiffness: 80 },
  });
  const dividerHeight = interpolate(dividerProgress, [0, 1], [0, 1080]);

  // Heading
  const headProgress = spring({
    frame,
    fps,
    delay: 15,
    config: { damping: 12, stiffness: 100 },
  });
  const headOpacity = interpolate(headProgress, [0, 1], [0, 1]);
  const headScale = interpolate(headProgress, [0, 1], [0.8, 1]);

  // Side labels
  const leftLabelProgress = spring({
    frame,
    fps,
    delay: 2 * fps,
    config: { damping: 12, stiffness: 100 },
  });
  const rightLabelProgress = spring({
    frame,
    fps,
    delay: 2.5 * fps,
    config: { damping: 12, stiffness: 100 },
  });

  const webItems = [
    { text: "Millions of users", delay: 4 * fps },
    { text: "Simple, narrow tasks", delay: 5 * fps },
    { text: "Low cost of errors", delay: 6 * fps },
    { text: "Ad-driven revenue", delay: 7 * fps },
    { text: "Massive shared data", delay: 8 * fps },
  ];

  const enterpriseItems = [
    { text: "Fewer users", delay: 4.5 * fps },
    { text: "Complex decisions", delay: 5.5 * fps },
    { text: "High cost of mistakes", delay: 6.5 * fps },
    { text: "Direct business impact", delay: 7.5 * fps },
    { text: "Limited, sensitive data", delay: 8.5 * fps },
  ];

  // Bottom insight
  const insightProgress = spring({
    frame,
    fps,
    delay: 16 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const insightOpacity = interpolate(insightProgress, [0, 1], [0, 1]);
  const insightY = interpolate(insightProgress, [0, 1], [20, 0]);

  return (
    <AbsoluteFill style={{ fontFamily }}>
      {/* Left side - Magnolia */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "50%",
          height: "100%",
          backgroundColor: colors.magnolia,
        }}
      />
      {/* Right side - Deep Green */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "50%",
          height: "100%",
          backgroundColor: colors.deepGreenCyanTurquoise,
        }}
      />

      {/* Divider line */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          width: 3,
          height: dividerHeight,
          background: `linear-gradient(180deg, ${colors.tiffanyBlue}, ${colors.darkCyra})`,
          transform: "translateX(-50%)",
          zIndex: 3,
        }}
      />

      {/* Heading spanning both sides */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 4,
        }}
      >
        <div
          style={{
            opacity: headOpacity,
            transform: `scale(${headScale})`,
            fontSize: 48,
            fontWeight: "bold",
            textAlign: "center",
            padding: "8px 40px",
            borderRadius: 12,
          }}
        >
          <span style={{ color: colors.darkCyra }}>Low risk</span>
          <span style={{ color: colors.rhythm }}> vs </span>
          <span style={{ color: colors.white }}>High risk</span>
          <span style={{ color: colors.rhythm }}> AI</span>
        </div>
      </div>

      {/* Left side content */}
      <div
        style={{
          position: "absolute",
          top: 180,
          left: 80,
          width: "calc(50% - 130px)",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          zIndex: 2,
        }}
      >
        <div
          style={{
            opacity: interpolate(leftLabelProgress, [0, 1], [0, 1]),
            fontSize: 34,
            fontWeight: "bold",
            color: colors.darkCyra,
            marginBottom: 12,
          }}
        >
          Web AI
        </div>

        {/* Movie recommendation mockup */}
        <div
          style={{
            opacity: interpolate(leftLabelProgress, [0, 1], [0, 1]),
            background: colors.white,
            borderRadius: 14,
            padding: "18px 24px",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 16,
            border: `1px solid ${colors.chineseSilver}30`,
          }}
        >
          <div style={{ width: 44, height: 44, borderRadius: 8, background: colors.tiffanyBlue, opacity: 0.2, flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 20, fontWeight: "bold", color: colors.gunmetal }}>
              Recommended for you
            </div>
            <div style={{ fontSize: 17, color: colors.rhythm }}>
              Wrong genre? Just scroll past.
            </div>
          </div>
        </div>

        {webItems.map((item, i) => (
          <ListItem
            key={`web-${i}`}
            text={item.text}
            delay={item.delay}
            color={colors.gunmetal}
            dotColor={colors.darkCyra}
            fromLeft
          />
        ))}
      </div>

      {/* Right side content */}
      <div
        style={{
          position: "absolute",
          top: 180,
          left: "calc(50% + 50px)",
          width: "calc(50% - 130px)",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          zIndex: 2,
        }}
      >
        <div
          style={{
            opacity: interpolate(rightLabelProgress, [0, 1], [0, 1]),
            fontSize: 34,
            fontWeight: "bold",
            color: colors.white,
            marginBottom: 12,
          }}
        >
          Enterprise AI
        </div>

        {/* Hospital alert mockup */}
        <div
          style={{
            opacity: interpolate(rightLabelProgress, [0, 1], [0, 1]),
            background: `${colors.white}15`,
            borderRadius: 14,
            padding: "18px 24px",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 16,
            border: `1px solid ${colors.oldRose}50`,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 8,
              background: colors.oldRose,
              opacity: 0.4,
              flexShrink: 0,
            }}
          />
          <div>
            <div style={{ fontSize: 20, fontWeight: "bold", color: colors.white }}>
              Patient Alert
            </div>
            <div style={{ fontSize: 17, color: colors.chineseSilver }}>
              Wrong diagnosis? Life-changing.
            </div>
          </div>
        </div>

        {enterpriseItems.map((item, i) => (
          <ListItem
            key={`ent-${i}`}
            text={item.text}
            delay={item.delay}
            color={colors.white}
            dotColor={colors.tiffanyBlue}
            fromLeft={false}
          />
        ))}
      </div>

      {/* Bottom insight */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: 240,
          zIndex: 4,
        }}
      >
        <div
          style={{
            opacity: insightOpacity,
            transform: `translateY(${insightY}px)`,
            fontSize: 28,
            color: colors.tiffanyBlue,
            fontWeight: "bold",
            textAlign: "center",
            background: `${colors.gunmetal}E0`,
            padding: "14px 40px",
            borderRadius: 10,
            maxWidth: 800,
          }}
        >
          Copying web AI into business is not straightforward.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
