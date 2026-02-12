import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const WORDS = [
  { text: "Value.", color: colors.darkCyra, delay: 1 },
  { text: "Doability.", color: colors.viridianGreen, delay: 3.5 },
  { text: "Trust.", color: colors.caribbeanGreen, delay: 6 },
];

// Supporting details that appear below each word
const DETAILS = [
  {
    items: ["Data quality matters", "Domain selection matters"],
    delay: 9,
  },
  {
    items: ["Stakeholder perception matters", "Customer trust matters"],
    delay: 11,
  },
  {
    items: [
      "If investors lose confidence, it fails",
      "If regulators push back, it fails",
    ],
    delay: 13,
  },
];

// Business meeting icon
const MeetingIcon: React.FC<{ opacity: number }> = ({ opacity }) => {
  return (
    <svg
      width="120"
      height="100"
      viewBox="0 0 120 100"
      fill="none"
      style={{ opacity }}
    >
      {/* Table */}
      <rect
        x={20}
        y={55}
        width={80}
        height={8}
        rx={4}
        fill="none"
        stroke={colors.darkCyra}
        strokeWidth={2}
      />
      {/* People around table */}
      {[30, 60, 90].map((x, i) => (
        <g key={i}>
          <circle
            cx={x}
            cy={35}
            r={10}
            fill="none"
            stroke={colors.darkCyra}
            strokeWidth={2}
          />
          <line
            x1={x}
            y1={45}
            x2={x}
            y2={55}
            stroke={colors.darkCyra}
            strokeWidth={2}
          />
        </g>
      ))}
      {/* Chart on table */}
      <polyline
        points="35,50 45,44 55,48 65,40 75,43"
        fill="none"
        stroke={colors.caribbeanGreen}
        strokeWidth={1.5}
      />
    </svg>
  );
};

// Compliance checklist icon
const ChecklistIcon: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  return (
    <svg
      width="120"
      height="100"
      viewBox="0 0 120 100"
      fill="none"
      style={{ opacity }}
    >
      {/* Clipboard */}
      <rect
        x={25}
        y={10}
        width={70}
        height={80}
        rx={6}
        fill="none"
        stroke={colors.viridianGreen}
        strokeWidth={2}
      />
      {/* Clip */}
      <rect
        x={45}
        y={4}
        width={30}
        height={14}
        rx={4}
        fill="none"
        stroke={colors.viridianGreen}
        strokeWidth={2}
      />
      {/* Checkmarks */}
      {[35, 52, 69].map((y, i) => {
        const show = frame > 60 + i * 15;
        return (
          <g key={i}>
            <rect
              x={36}
              y={y}
              width={12}
              height={12}
              rx={2}
              fill="none"
              stroke={colors.viridianGreen}
              strokeWidth={1.5}
            />
            {show && (
              <path
                d={`M ${38} ${y + 6} L ${42} ${y + 10} L ${48} ${y + 2}`}
                fill="none"
                stroke={colors.caribbeanGreen}
                strokeWidth={2}
                strokeLinecap="round"
              />
            )}
            <line
              x1={55}
              y1={y + 6}
              x2={82}
              y2={y + 6}
              stroke={colors.chineseSilver}
              strokeWidth={1.5}
            />
          </g>
        );
      })}
    </svg>
  );
};

// Customer confidence icon
const CustomerIcon: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  const pulse = Math.sin(frame * 0.08) * 0.15 + 0.85;

  return (
    <svg
      width="120"
      height="100"
      viewBox="0 0 120 100"
      fill="none"
      style={{ opacity }}
    >
      {/* Phone outline */}
      <rect
        x={35}
        y={8}
        width={50}
        height={84}
        rx={10}
        fill="none"
        stroke={colors.caribbeanGreen}
        strokeWidth={2}
      />
      {/* Screen */}
      <rect
        x={40}
        y={20}
        width={40}
        height={55}
        rx={4}
        fill={`${colors.caribbeanGreen}10`}
      />
      {/* Thumbs up / shield */}
      <circle
        cx={60}
        cy={47}
        r={14}
        fill="none"
        stroke={colors.caribbeanGreen}
        strokeWidth={2}
        opacity={pulse}
      />
      <path
        d="M 54 47 L 58 52 L 66 42"
        fill="none"
        stroke={colors.caribbeanGreen}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={pulse}
      />
    </svg>
  );
};

export const Scene7Trust: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Detail items
  const allDetails: { text: string; delay: number }[] = [];
  DETAILS.forEach((d) => {
    d.items.forEach((text, idx) => {
      allDetails.push({ text, delay: d.delay + idx * 0.8 });
    });
  });

  // Icons
  const iconsDelay = 8 * fps;
  const iconsProgress = spring({
    frame,
    fps,
    delay: iconsDelay,
    config: { damping: 200 },
  });
  const iconsOpacity = interpolate(iconsProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.magnolia,
        fontFamily,
      }}
    >
      {/* Three bold words */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: 120,
          gap: 20,
        }}
      >
        <div style={{ display: "flex", gap: 40, alignItems: "baseline" }}>
          {WORDS.map((w, i) => {
            const wordProgress = spring({
              frame,
              fps,
              delay: w.delay * fps,
              config: { damping: 10, stiffness: 120 },
            });
            const wordScale = interpolate(wordProgress, [0, 1], [0.3, 1]);
            const wordOpacity = interpolate(wordProgress, [0, 1], [0, 1]);

            return (
              <div
                key={i}
                style={{
                  fontSize: 80,
                  fontWeight: "bold",
                  color: w.color,
                  transform: `scale(${wordScale})`,
                  opacity: wordOpacity,
                }}
              >
                {w.text}
              </div>
            );
          })}
        </div>

        {/* Icons row */}
        <div
          style={{
            display: "flex",
            gap: 80,
            marginTop: 40,
            opacity: iconsOpacity,
          }}
        >
          <MeetingIcon opacity={1} />
          <ChecklistIcon opacity={1} />
          <CustomerIcon opacity={1} />
        </div>

        {/* Detail text items */}
        <div
          style={{
            marginTop: 50,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          {allDetails.map((detail, i) => {
            const detailProgress = spring({
              frame,
              fps,
              delay: detail.delay * fps,
              config: { damping: 200 },
            });
            const detailOpacity = interpolate(detailProgress, [0, 1], [0, 1]);
            const detailY = interpolate(detailProgress, [0, 1], [15, 0]);

            return (
              <div
                key={i}
                style={{
                  fontSize: 28,
                  color: colors.gunmetal,
                  opacity: detailOpacity,
                  transform: `translateY(${detailY}px)`,
                  textAlign: "center",
                }}
              >
                {detail.text}
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
