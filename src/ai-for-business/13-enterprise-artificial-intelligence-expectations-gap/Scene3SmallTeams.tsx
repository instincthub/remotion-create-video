import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Tiny team icon
const SmallTeamIcon: React.FC<{ progress: number }> = ({ progress }) => {
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const scale = interpolate(progress, [0, 1], [0.5, 1]);

  return (
    <div style={{ opacity, transform: `scale(${scale})` }}>
      <svg width="100" height="80" viewBox="0 0 100 80">
        {/* Two small people */}
        <circle cx={35} cy={25} r={10} fill="none" stroke={colors.rhythm} strokeWidth={2} />
        <path d="M 22 55 C 22 40 28 35 35 35 C 42 35 48 40 48 55" fill="none" stroke={colors.rhythm} strokeWidth={2} />
        <circle cx={65} cy={25} r={10} fill="none" stroke={colors.rhythm} strokeWidth={2} />
        <path d="M 52 55 C 52 40 58 35 65 35 C 72 35 78 40 78 55" fill="none" stroke={colors.rhythm} strokeWidth={2} />
      </svg>
    </div>
  );
};

// Enterprise building icon
const EnterpriseBuildingIcon: React.FC<{ progress: number }> = ({
  progress,
}) => {
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const scaleY = interpolate(progress, [0, 1], [0, 1]);

  return (
    <div
      style={{
        opacity,
        transform: `scaleY(${scaleY})`,
        transformOrigin: "bottom center",
      }}
    >
      <svg width="300" height="360" viewBox="0 0 300 360">
        {/* Main tower */}
        <rect
          x={100}
          y={20}
          width={100}
          height={340}
          fill={`${colors.darkCyra}15`}
          stroke={colors.darkCyra}
          strokeWidth={2}
          rx={2}
        />
        {/* Left wing */}
        <rect
          x={20}
          y={120}
          width={80}
          height={240}
          fill={`${colors.darkCyra}10`}
          stroke={colors.darkCyra}
          strokeWidth={1.5}
          rx={2}
        />
        {/* Right wing */}
        <rect
          x={200}
          y={120}
          width={80}
          height={240}
          fill={`${colors.darkCyra}10`}
          stroke={colors.darkCyra}
          strokeWidth={1.5}
          rx={2}
        />
        {/* Windows - main */}
        {Array.from({ length: 8 }).map((_, row) =>
          Array.from({ length: 3 }).map((_, col) => (
            <rect
              key={`win-${row}-${col}`}
              x={112 + col * 28}
              y={40 + row * 38}
              width={16}
              height={22}
              rx={1}
              fill={`${colors.tiffanyBlue}30`}
            />
          )),
        )}
        {/* Windows - left wing */}
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 2 }).map((_, col) => (
            <rect
              key={`wl-${row}-${col}`}
              x={32 + col * 28}
              y={140 + row * 42}
              width={16}
              height={22}
              rx={1}
              fill={`${colors.tiffanyBlue}20`}
            />
          )),
        )}
        {/* Windows - right wing */}
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 2 }).map((_, col) => (
            <rect
              key={`wr-${row}-${col}`}
              x={212 + col * 28}
              y={140 + row * 42}
              width={16}
              height={22}
              rx={1}
              fill={`${colors.tiffanyBlue}20`}
            />
          )),
        )}
        {/* Entrance */}
        <rect
          x={130}
          y={330}
          width={40}
          height={30}
          rx={2}
          fill={`${colors.darkCyra}25`}
          stroke={colors.darkCyra}
          strokeWidth={1}
        />
      </svg>
    </div>
  );
};

// Contrast item label
const ContrastItem: React.FC<{
  text: string;
  progress: number;
  side: "left" | "right";
}> = ({ text, progress, side }) => {
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const slideX = interpolate(
    progress,
    [0, 1],
    [side === "left" ? -30 : 30, 0],
  );

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${slideX}px)`,
        fontSize: 24,
        color: colors.white,
        fontFamily,
        padding: "8px 20px",
        borderRadius: 8,
        background: `${colors.darkSlateGray}60`,
        border: `1px solid ${colors.rhythm}30`,
      }}
    >
      {text}
    </div>
  );
};

export const Scene3SmallTeams: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 12, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleScale = interpolate(titleProgress, [0, 1], [0.85, 1]);

  // Left side (small team)
  const leftProgress = spring({
    frame,
    fps,
    delay: 1.5 * fps,
    config: { damping: 12, stiffness: 80 },
  });

  // Right side (enterprise building)
  const rightProgress = spring({
    frame,
    fps,
    delay: 3 * fps,
    config: { damping: 12, stiffness: 60 },
  });

  // VS divider
  const vsProgress = spring({
    frame,
    fps,
    delay: 5 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const vsOpacity = interpolate(vsProgress, [0, 1], [0, 1]);
  const vsScale = interpolate(vsProgress, [0, 1], [0, 1]);

  const leftItems = [
    { text: "Small Teams", delay: 7 },
    { text: "Spreadsheets", delay: 8.5 },
    { text: "Simple Scripts", delay: 10 },
    { text: "Limited Governance", delay: 11.5 },
  ];

  const rightItems = [
    { text: "High-Stakes Decisions", delay: 13 },
    { text: "Compliance Requirements", delay: 14.5 },
    { text: "Financial Exposure", delay: 16 },
  ];

  // Mismatch text
  const mismatchProgress = spring({
    frame,
    fps,
    delay: 17.5 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const mismatchOpacity = interpolate(mismatchProgress, [0, 1], [0, 1]);
  const mismatchY = interpolate(mismatchProgress, [0, 1], [20, 0]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${colors.darkNavy} 0%, ${colors.darkCharcoal} 100%)`,
        fontFamily,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 3,
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            fontSize: 54,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
          }}
        >
          Small Teams.{" "}
          <span style={{ color: colors.oldRose }}>Big Expectations.</span>
        </div>
      </div>

      {/* Left side: Small team */}
      <div
        style={{
          position: "absolute",
          left: 120,
          top: 180,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          zIndex: 2,
        }}
      >
        <SmallTeamIcon progress={leftProgress} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {leftItems.map((item, i) => {
            const itemProgress = spring({
              frame,
              fps,
              delay: item.delay * fps,
              config: { damping: 12, stiffness: 90 },
            });
            return (
              <ContrastItem
                key={`left-${i}`}
                text={item.text}
                progress={itemProgress}
                side="left"
              />
            );
          })}
        </div>
      </div>

      {/* VS divider */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 300,
          transform: "translate(-50%, -50%)",
          zIndex: 3,
        }}
      >
        <div
          style={{
            opacity: vsOpacity,
            transform: `scale(${vsScale})`,
            width: 80,
            height: 80,
            borderRadius: 40,
            background: `${colors.oldRose}20`,
            border: `2px solid ${colors.oldRose}60`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            fontWeight: 700,
            color: colors.oldRose,
            fontFamily,
          }}
        >
          VS
        </div>
      </div>

      {/* Right side: Enterprise building */}
      <div
        style={{
          position: "absolute",
          right: 120,
          top: 160,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          zIndex: 2,
        }}
      >
        <div style={{ transform: "scale(0.65)", transformOrigin: "top center" }}>
          <EnterpriseBuildingIcon progress={rightProgress} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: -40 }}>
          {rightItems.map((item, i) => {
            const itemProgress = spring({
              frame,
              fps,
              delay: item.delay * fps,
              config: { damping: 12, stiffness: 90 },
            });
            return (
              <ContrastItem
                key={`right-${i}`}
                text={item.text}
                progress={itemProgress}
                side="right"
              />
            );
          })}
        </div>
      </div>

      {/* Bottom mismatch text */}
      <div
        style={{
          position: "absolute",
          bottom: 230,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 3,
        }}
      >
        <div
          style={{
            opacity: mismatchOpacity,
            transform: `translateY(${mismatchY}px)`,
            fontSize: 32,
            color: colors.chineseSilver,
            textAlign: "center",
          }}
        >
          That is a{" "}
          <span style={{ color: colors.oldRose, fontWeight: 700 }}>
            mismatch
          </span>{" "}
          of expectations.
        </div>
      </div>
    </AbsoluteFill>
  );
};
