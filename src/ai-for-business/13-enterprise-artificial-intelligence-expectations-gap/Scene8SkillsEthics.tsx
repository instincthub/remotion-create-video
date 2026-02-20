import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Icon card with slide-up animation
const IconCard: React.FC<{
  icon: "shield" | "team" | "checklist";
  title: string;
  items: string[];
  progress: number;
  color: string;
}> = ({ icon, title, items, progress, color }) => {
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const slideY = interpolate(progress, [0, 1], [60, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${slideY}px)`,
        width: 480,
        padding: "36px 32px",
        background: `${colors.darkSlateGray}50`,
        border: `1px solid ${color}30`,
        borderRadius: 16,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
      }}
    >
      {/* Icon */}
      <svg width="64" height="64" viewBox="0 0 64 64">
        {icon === "shield" && (
          <>
            <path
              d="M 32 6 L 52 16 L 52 34 C 52 46 42 54 32 58 C 22 54 12 46 12 34 L 12 16 Z"
              fill={`${color}15`}
              stroke={color}
              strokeWidth={2.5}
            />
            <path
              d="M 24 32 L 30 38 L 42 26"
              fill="none"
              stroke={color}
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        )}
        {icon === "team" && (
          <>
            <circle
              cx={32}
              cy={18}
              r={10}
              fill="none"
              stroke={color}
              strokeWidth={2.5}
            />
            <path
              d="M 14 52 C 14 40 22 34 32 34 C 42 34 50 40 50 52"
              fill="none"
              stroke={color}
              strokeWidth={2.5}
            />
            <circle
              cx={52}
              cy={22}
              r={6}
              fill="none"
              stroke={`${color}60`}
              strokeWidth={2}
            />
            <circle
              cx={12}
              cy={22}
              r={6}
              fill="none"
              stroke={`${color}60`}
              strokeWidth={2}
            />
          </>
        )}
        {icon === "checklist" && (
          <>
            <rect
              x={12}
              y={6}
              width={40}
              height={52}
              rx={4}
              fill="none"
              stroke={color}
              strokeWidth={2.5}
            />
            {/* Clip at top */}
            <rect
              x={24}
              y={2}
              width={16}
              height={10}
              rx={2}
              fill={`${color}30`}
              stroke={color}
              strokeWidth={1.5}
            />
            {/* Check rows */}
            {[0, 1, 2].map((row) => (
              <g key={`row-${row}`}>
                <rect
                  x={20}
                  y={24 + row * 14}
                  width={8}
                  height={8}
                  rx={1}
                  fill="none"
                  stroke={`${color}60`}
                  strokeWidth={1.5}
                />
                <rect
                  x={34}
                  y={26 + row * 14}
                  width={14}
                  height={4}
                  rx={2}
                  fill={`${color}40`}
                />
              </g>
            ))}
          </>
        )}
      </svg>

      {/* Title */}
      <div
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: colors.white,
          textAlign: "center",
          fontFamily,
        }}
      >
        {title}
      </div>

      {/* Items */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          width: "100%",
        }}
      >
        {items.map((item, i) => (
          <div
            key={`item-${i}`}
            style={{
              fontSize: 18,
              color: colors.chineseSilver,
              fontFamily,
              textAlign: "center",
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export const Scene8SkillsEthics: React.FC = () => {
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

  // Cards
  const card1Progress = spring({
    frame,
    fps,
    delay: 2 * fps,
    config: { damping: 12, stiffness: 70 },
  });
  const card2Progress = spring({
    frame,
    fps,
    delay: 4 * fps,
    config: { damping: 12, stiffness: 70 },
  });
  const card3Progress = spring({
    frame,
    fps,
    delay: 6 * fps,
    config: { damping: 12, stiffness: 70 },
  });

  // Bottom band
  const bandWidth = interpolate(
    frame,
    [8 * fps, 10 * fps],
    [0, 1920],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Bottom text
  const bottomProgress = spring({
    frame,
    fps,
    delay: 11 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const bottomOpacity = interpolate(bottomProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.darkNavy} 0%, ${colors.darkCharcoal} 100%)`,
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
          Skills. Ethics.{" "}
          <span style={{ color: colors.tiffanyBlue }}>Regulation.</span>
        </div>
      </div>

      {/* Three cards */}
      <div
        style={{
          position: "absolute",
          top: 180,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 40,
          zIndex: 2,
        }}
      >
        <IconCard
          icon="team"
          title="Skills & Resources"
          items={["Engineers to maintain it?", "Monitor and audit it?", "Launching is easy. Owning is hard."]}
          progress={card1Progress}
          color={colors.tiffanyBlue}
        />
        <IconCard
          icon="shield"
          title="Ethics & Compliance"
          items={["Are you compliant?", "Are you transparent?", "Reputational risk?"]}
          progress={card2Progress}
          color={colors.caribbeanGreen}
        />
        <IconCard
          icon="checklist"
          title="Regulation"
          items={["Governance frameworks", "Audit trails", "Accountability"]}
          progress={card3Progress}
          color={colors.viridianGreen}
        />
      </div>

      {/* Bottom accent band */}
      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: 0,
          width: bandWidth,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${colors.deepGreenCyanTurquoise}, transparent)`,
          zIndex: 2,
        }}
      />

      {/* Bottom text */}
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
            opacity: bottomOpacity,
            fontSize: 26,
            color: colors.chineseSilver,
            textAlign: "center",
          }}
        >
          Launching is{" "}
          <span style={{ color: colors.caribbeanGreen, fontWeight: 700 }}>
            easy
          </span>
          . Owning is{" "}
          <span style={{ color: colors.oldRose, fontWeight: 700 }}>
            hard
          </span>
          .
        </div>
      </div>
    </AbsoluteFill>
  );
};
