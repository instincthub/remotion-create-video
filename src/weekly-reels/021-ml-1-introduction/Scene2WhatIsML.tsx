import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Magnifying glass examining text
const MagnifyingGlass: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({ frame, fps, delay: 10, config: { damping: 200 } });
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  // Glass moves slightly
  const moveX = Math.sin(frame * 0.05) * 10;
  const moveY = Math.cos(frame * 0.04) * 6;

  return (
    <svg
      width="160"
      height="160"
      viewBox="0 0 160 160"
      fill="none"
      style={{
        opacity,
        transform: `translate(${moveX}px, ${moveY}px)`,
      }}
    >
      {/* Lens circle */}
      <circle
        cx="70"
        cy="70"
        r="50"
        fill={`${colors.tiffanyBlue}10`}
        stroke={colors.tiffanyBlue}
        strokeWidth={4}
      />
      {/* Lens shine */}
      <ellipse
        cx="55"
        cy="55"
        rx="15"
        ry="10"
        fill={colors.tiffanyBlue}
        opacity={0.15}
        transform="rotate(-30, 55, 55)"
      />
      {/* Handle */}
      <line
        x1="108"
        y1="108"
        x2="145"
        y2="145"
        stroke={colors.darkSlateGray}
        strokeWidth={8}
        strokeLinecap="round"
      />
    </svg>
  );
};

export const Scene2WhatIsML: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "MACHINE LEARNING" text
  const textProgress = spring({
    frame,
    fps,
    delay: 8,
    config: { damping: 200 },
  });
  const textOpacity = interpolate(textProgress, [0, 1], [0, 1]);
  const textScale = interpolate(textProgress, [0, 1], [0.85, 1]);

  // Subtitle
  const subProgress = spring({
    frame,
    fps,
    delay: 2 * fps,
    config: { damping: 200 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);
  const subY = interpolate(subProgress, [0, 1], [25, 0]);

  // Floating question marks
  const questionMarks = [
    { x: 120, y: 350, size: 48, delay: 15 },
    { x: 850, y: 400, size: 40, delay: 25 },
    { x: 200, y: 750, size: 36, delay: 35 },
    { x: 780, y: 700, size: 44, delay: 20 },
    { x: 500, y: 300, size: 32, delay: 40 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${colors.magnolia}, ${colors.white})`,
        fontFamily,
      }}
    >
      {/* Floating question marks */}
      {questionMarks.map((q, i) => {
        const floatY = Math.sin(frame * 0.06 + i * 1.5) * 20;
        const qOpacity = interpolate(frame - q.delay, [0, 15], [0, 0.15], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: q.x,
              top: q.y + floatY,
              fontSize: q.size,
              fontWeight: 700,
              color: colors.tiffanyBlue,
              opacity: qOpacity,
            }}
          >
            ?
          </div>
        );
      })}

      {/* Content */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 300,
          paddingLeft: 50,
          paddingRight: 50,
          gap: 30,
        }}
      >
        {/* Magnifying glass */}
        <MagnifyingGlass />

        {/* Main text */}
        <div
          style={{
            fontSize: 60,
            fontWeight: 700,
            color: colors.darkSlateGray,
            textAlign: "center",
            opacity: textOpacity,
            transform: `scale(${textScale})`,
            lineHeight: 1.3,
          }}
        >
          <span style={{ color: colors.darkCyra }}>MACHINE</span>
          <br />
          <span style={{ color: colors.darkCyra }}>LEARNING</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 30,
            fontWeight: 400,
            color: colors.rhythm,
            textAlign: "center",
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
            lineHeight: 1.5,
          }}
        >
          Let's understand how
          <br />
          it really works
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
