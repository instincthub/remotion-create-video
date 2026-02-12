import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const ATTRIBUTES = [
  { label: "Small Data", delay: 60 },
  { label: "Complex Questions", delay: 120 },
  { label: "Few Experts", delay: 180 },
];

// Gavel icon
const GavelIcon: React.FC<{ opacity: number }> = ({ opacity }) => (
  <svg
    width="120"
    height="110"
    viewBox="0 0 120 110"
    fill="none"
    style={{ opacity }}
  >
    {/* Gavel head */}
    <rect
      x="35"
      y="8"
      width="50"
      height="22"
      rx="4"
      fill="none"
      stroke={colors.chineseBlue}
      strokeWidth={2.5}
    />
    {/* Handle */}
    <line
      x1="60"
      y1="30"
      x2="60"
      y2="75"
      stroke={colors.chineseBlue}
      strokeWidth={3}
      strokeLinecap="round"
    />
    {/* Strike plate */}
    <ellipse
      cx="60"
      cy="95"
      rx="35"
      ry="8"
      fill="none"
      stroke={colors.chineseBlue}
      strokeWidth={2}
    />
    <rect
      x="30"
      y="87"
      width="60"
      height="8"
      rx="2"
      fill="none"
      stroke={colors.chineseBlue}
      strokeWidth={2}
    />
    {/* Impact lines */}
    <line
      x1="30"
      y1="82"
      x2="20"
      y2="72"
      stroke={colors.corn}
      strokeWidth={1.5}
      opacity={0.6}
    />
    <line
      x1="90"
      y1="82"
      x2="100"
      y2="72"
      stroke={colors.corn}
      strokeWidth={1.5}
      opacity={0.6}
    />
  </svg>
);

// Magnifying glass with question mark
const MagnifyingGlass: React.FC<{ opacity: number }> = ({ opacity }) => (
  <svg
    width="110"
    height="110"
    viewBox="0 0 110 110"
    fill="none"
    style={{ opacity }}
  >
    <circle
      cx="45"
      cy="45"
      r="30"
      stroke={colors.chineseBlue}
      strokeWidth={3}
      fill="none"
    />
    <line
      x1="67"
      y1="67"
      x2="95"
      y2="95"
      stroke={colors.chineseBlue}
      strokeWidth={4}
      strokeLinecap="round"
    />
    {/* Question mark inside lens */}
    <text
      x="45"
      y="55"
      textAnchor="middle"
      fill={colors.corn}
      fontSize="34"
      fontWeight="bold"
    >
      ?
    </text>
  </svg>
);

// Tangled documents web
const TangledDocuments: React.FC<{ opacity: number }> = ({ opacity }) => {
  return (
    <svg
      width="260"
      height="200"
      viewBox="0 0 260 200"
      fill="none"
      style={{ opacity }}
    >
      {/* Document 1 - tilted left */}
      <g transform="rotate(-12, 50, 80)">
        <rect
          x="10"
          y="30"
          width="80"
          height="100"
          rx="4"
          fill="rgba(65, 91, 144, 0.15)"
          stroke={colors.chineseBlue}
          strokeWidth={2}
        />
        <line
          x1="22"
          y1="50"
          x2="70"
          y2="50"
          stroke={colors.chineseBlue}
          strokeWidth={1}
          opacity={0.5}
        />
        <line
          x1="22"
          y1="62"
          x2="65"
          y2="62"
          stroke={colors.chineseBlue}
          strokeWidth={1}
          opacity={0.4}
        />
        <line
          x1="22"
          y1="74"
          x2="60"
          y2="74"
          stroke={colors.chineseBlue}
          strokeWidth={1}
          opacity={0.3}
        />
        {/* Red X for contradiction */}
        <line
          x1="60"
          y1="85"
          x2="78"
          y2="103"
          stroke={colors.oldRose}
          strokeWidth={2}
          opacity={0.7}
        />
        <line
          x1="78"
          y1="85"
          x2="60"
          y2="103"
          stroke={colors.oldRose}
          strokeWidth={2}
          opacity={0.7}
        />
      </g>

      {/* Document 2 - center, slightly tilted right */}
      <g transform="rotate(5, 130, 90)">
        <rect
          x="90"
          y="40"
          width="80"
          height="100"
          rx="4"
          fill="rgba(65, 91, 144, 0.15)"
          stroke={colors.chineseBlue}
          strokeWidth={2}
        />
        <line
          x1="102"
          y1="60"
          x2="150"
          y2="60"
          stroke={colors.chineseBlue}
          strokeWidth={1}
          opacity={0.5}
        />
        <line
          x1="102"
          y1="72"
          x2="145"
          y2="72"
          stroke={colors.chineseBlue}
          strokeWidth={1}
          opacity={0.4}
        />
        <line
          x1="102"
          y1="84"
          x2="140"
          y2="84"
          stroke={colors.chineseBlue}
          strokeWidth={1}
          opacity={0.3}
        />
        {/* Check for agreement */}
        <path
          d="M140 95 l4 4 l8 -8"
          stroke={colors.corn}
          strokeWidth={2}
          fill="none"
          opacity={0.7}
        />
      </g>

      {/* Document 3 - tilted right */}
      <g transform="rotate(15, 200, 80)">
        <rect
          x="170"
          y="20"
          width="80"
          height="100"
          rx="4"
          fill="rgba(65, 91, 144, 0.15)"
          stroke={colors.chineseBlue}
          strokeWidth={2}
        />
        <line
          x1="182"
          y1="40"
          x2="230"
          y2="40"
          stroke={colors.chineseBlue}
          strokeWidth={1}
          opacity={0.5}
        />
        <line
          x1="182"
          y1="52"
          x2="225"
          y2="52"
          stroke={colors.chineseBlue}
          strokeWidth={1}
          opacity={0.4}
        />
        {/* Question mark for ambiguity */}
        <text
          x="215"
          y="90"
          fill={colors.corn}
          fontSize="24"
          fontWeight="bold"
          opacity={0.7}
        >
          ?
        </text>
      </g>

      {/* Connecting tangle lines */}
      <path
        d="M80 80 C100 60, 110 100, 130 80"
        stroke={colors.oldRose}
        strokeWidth={1.5}
        fill="none"
        strokeDasharray="4 3"
        opacity={0.5}
      />
      <path
        d="M160 90 C180 70, 190 110, 210 80"
        stroke={colors.oldRose}
        strokeWidth={1.5}
        fill="none"
        strokeDasharray="4 3"
        opacity={0.5}
      />
      <path
        d="M70 110 C120 130, 160 100, 200 120"
        stroke={colors.oldRose}
        strokeWidth={1.5}
        fill="none"
        strokeDasharray="4 3"
        opacity={0.4}
      />

      {/* "47 docs" badge */}
      <rect x="95" y="155" width="70" height="30" rx="15" fill={colors.corn} />
      <text
        x="130"
        y="175"
        textAnchor="middle"
        fill={colors.gunmetal}
        fontSize="14"
        fontWeight="bold"
      >
        47 docs
      </text>
    </svg>
  );
};

// Scattered question marks in background
const QuestionMarks: React.FC = () => {
  const frame = useCurrentFrame();

  const marks = [
    { x: 1400, y: 180, size: 60, rotation: 15, delay: 80 },
    { x: 1550, y: 450, size: 45, rotation: -20, delay: 100 },
    { x: 1300, y: 650, size: 55, rotation: 30, delay: 120 },
    { x: 200, y: 100, size: 40, rotation: -10, delay: 140 },
    { x: 100, y: 700, size: 50, rotation: 25, delay: 160 },
    { x: 1650, y: 750, size: 38, rotation: -35, delay: 110 },
    { x: 800, y: 80, size: 42, rotation: 12, delay: 130 },
    { x: 950, y: 850, size: 48, rotation: -18, delay: 150 },
  ];

  return (
    <AbsoluteFill>
      {marks.map((mark, i) => {
        const progress = interpolate(
          frame,
          [mark.delay, mark.delay + 20],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        const float = Math.sin((frame + i * 40) * 0.04) * 8;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: mark.x,
              top: mark.y + float,
              fontSize: mark.size,
              color: colors.rhythm,
              opacity: progress * 0.3,
              transform: `rotate(${mark.rotation}deg)`,
              fontWeight: "bold",
              fontFamily,
            }}
          >
            ?
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

const Attribute: React.FC<{ label: string }> = ({ label }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dropProgress = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80, mass: 2 },
  });
  const translateY = interpolate(dropProgress, [0, 1], [-200, 0]);
  const opacity = interpolate(dropProgress, [0, 1], [0, 1]);

  const shakeAmount = interpolate(
    dropProgress,
    [0.85, 0.9, 0.95, 1],
    [0, 3, -2, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        transform: `translateY(${translateY}px) translateX(${shakeAmount}px)`,
        opacity,
      }}
    >
      <div
        style={{
          width: 50,
          height: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg width="40" height="36" viewBox="0 0 40 36" fill="none">
          <path d="M20 2L38 34H2L20 2Z" fill={colors.corn} />
          <text
            x="20"
            y="28"
            textAnchor="middle"
            fill={colors.gunmetal}
            fontSize="20"
            fontWeight="bold"
          >
            !
          </text>
        </svg>
      </div>
      <div
        style={{
          fontSize: 44,
          fontWeight: "bold",
          color: colors.corn,
          fontFamily,
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const Scene4EnterpriseAI: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerProgress = spring({ frame, fps, config: { damping: 200 } });
  const headerY = interpolate(headerProgress, [0, 1], [-60, 0]);
  const headerOpacity = interpolate(headerProgress, [0, 1], [0, 1]);

  // Right-side illustrations entrance
  const illustrationProgress = spring({
    frame,
    fps,
    delay: 30,
    config: { damping: 200 },
  });
  const illustrationOpacity = interpolate(
    illustrationProgress,
    [0, 1],
    [0, 1],
  );

  const gavelDelay = 3 * fps;
  const gavelProgress = spring({
    frame,
    fps,
    delay: gavelDelay,
    config: { damping: 200 },
  });
  const gavelOpacity = interpolate(gavelProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.policeBlue, fontFamily }}>
      <QuestionMarks />

      {/* Two-column layout */}
      <div
        style={{
          display: "flex",
          height: "100%",
          padding: "80px 120px",
          gap: 40,
        }}
      >
        {/* Left: Header + Attributes */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 50,
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: "bold",
              color: colors.white,
              transform: `translateY(${headerY}px)`,
              opacity: headerOpacity,
            }}
          >
            Enterprise AI
          </div>

          <div
            style={{
              width: 100,
              height: 4,
              backgroundColor: colors.corn,
              opacity: headerOpacity,
              borderRadius: 2,
            }}
          />

          <div
            style={{
              fontSize: 26,
              color: colors.rhythm,
              opacity: headerOpacity,
              marginTop: -30,
            }}
          >
            The Courtroom Drama
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
            {ATTRIBUTES.map((attr) => (
              <Sequence
                key={attr.label}
                from={attr.delay}
                layout="none"
              >
                <Attribute label={attr.label} />
              </Sequence>
            ))}
          </div>
        </div>

        {/* Right: Illustrations */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
          }}
        >
          {/* Tangled documents */}
          <TangledDocuments opacity={illustrationOpacity} />

          {/* Gavel + Magnifying glass row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 30,
            }}
          >
            <GavelIcon opacity={gavelOpacity} />
            <MagnifyingGlass opacity={gavelOpacity} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
