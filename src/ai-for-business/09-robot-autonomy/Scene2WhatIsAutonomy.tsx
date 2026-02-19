import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// Eye icon for "Sense"
const EyeIcon: React.FC = () => {
  const frame = useCurrentFrame();
  const pupilX = Math.sin(frame * 0.05) * 4;

  return (
    <svg width="100" height="80" viewBox="-50 -40 100 80">
      <ellipse
        cx={0}
        cy={0}
        rx={36}
        ry={22}
        fill="none"
        stroke={colors.darkCyra}
        strokeWidth={2.5}
      />
      <circle cx={pupilX} cy={0} r={10} fill={colors.darkCyra} />
      <circle cx={pupilX + 3} cy={-3} r={3} fill={colors.white} />
    </svg>
  );
};

// Brain icon for "Decide"
const BrainIcon: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = Math.sin(frame * 0.06) * 0.15 + 0.85;

  return (
    <svg width="100" height="90" viewBox="-50 -45 100 90">
      <g transform={`scale(${pulse})`}>
        <ellipse
          cx={0}
          cy={0}
          rx={30}
          ry={34}
          fill="none"
          stroke={colors.darkCyra}
          strokeWidth={2.5}
        />
        <path
          d="M 0 -34 Q -16 -20 -10 -5 Q -22 5 -15 20 Q -25 26 -18 34"
          fill="none"
          stroke={colors.darkCyra}
          strokeWidth={1.5}
        />
        <path
          d="M 0 -34 Q 16 -20 10 -5 Q 22 5 15 20 Q 25 26 18 34"
          fill="none"
          stroke={colors.darkCyra}
          strokeWidth={1.5}
        />
        <path
          d="M -22 -4 Q 0 -12 22 -4"
          fill="none"
          stroke={colors.darkCyra}
          strokeWidth={1}
        />
        <path
          d="M -18 14 Q 0 8 18 14"
          fill="none"
          stroke={colors.darkCyra}
          strokeWidth={1}
        />
      </g>
    </svg>
  );
};

// Gear/cog icon for "Act"
const GearIcon: React.FC = () => {
  const frame = useCurrentFrame();
  const rotation = frame * 0.8;

  const teeth = 8;
  const outerR = 32;
  const innerR = 22;
  let pathD = "";

  for (let i = 0; i < teeth; i++) {
    const angle1 = (i / teeth) * Math.PI * 2;
    const angle2 = ((i + 0.3) / teeth) * Math.PI * 2;
    const angle3 = ((i + 0.5) / teeth) * Math.PI * 2;
    const angle4 = ((i + 0.8) / teeth) * Math.PI * 2;

    const cmd = i === 0 ? "M" : "L";
    pathD += `${cmd} ${Math.cos(angle1) * innerR} ${Math.sin(angle1) * innerR} `;
    pathD += `L ${Math.cos(angle2) * outerR} ${Math.sin(angle2) * outerR} `;
    pathD += `L ${Math.cos(angle3) * outerR} ${Math.sin(angle3) * outerR} `;
    pathD += `L ${Math.cos(angle4) * innerR} ${Math.sin(angle4) * innerR} `;
  }
  pathD += "Z";

  return (
    <svg width="100" height="80" viewBox="-50 -40 100 80">
      <g transform={`rotate(${rotation})`}>
        <path d={pathD} fill="none" stroke={colors.darkCyra} strokeWidth={2.5} />
        <circle cx={0} cy={0} r={10} fill="none" stroke={colors.darkCyra} strokeWidth={2} />
      </g>
    </svg>
  );
};

// Arrow component
const Arrow: React.FC<{ opacity: number }> = ({ opacity }) => (
  <svg width="80" height="24" viewBox="0 0 80 24" style={{ opacity }}>
    <path
      d="M 0 12 L 60 12"
      fill="none"
      stroke={colors.tiffanyBlue}
      strokeWidth={2}
      strokeDasharray="6 4"
    />
    <polygon points="60,6 75,12 60,18" fill={colors.tiffanyBlue} />
  </svg>
);

export const Scene2WhatIsAutonomy: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title entrance
  const titleProgress = spring({
    frame,
    fps,
    delay: 10,
    config: { damping: 12, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [-30, 0]);

  // Definition text
  const defProgress = spring({
    frame,
    fps,
    delay: 2 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const defOpacity = interpolate(defProgress, [0, 1], [0, 1]);

  // Icons appear sequentially
  const icon1Progress = spring({
    frame,
    fps,
    delay: 4 * fps,
    config: { damping: 12, stiffness: 100 },
  });
  const icon1Opacity = interpolate(icon1Progress, [0, 1], [0, 1]);
  const icon1Scale = interpolate(icon1Progress, [0, 1], [0.5, 1]);

  const icon2Progress = spring({
    frame,
    fps,
    delay: 5.5 * fps,
    config: { damping: 12, stiffness: 100 },
  });
  const icon2Opacity = interpolate(icon2Progress, [0, 1], [0, 1]);
  const icon2Scale = interpolate(icon2Progress, [0, 1], [0.5, 1]);

  const icon3Progress = spring({
    frame,
    fps,
    delay: 7 * fps,
    config: { damping: 12, stiffness: 100 },
  });
  const icon3Opacity = interpolate(icon3Progress, [0, 1], [0, 1]);
  const icon3Scale = interpolate(icon3Progress, [0, 1], [0.5, 1]);

  // Arrows
  const arrow1Progress = spring({
    frame,
    fps,
    delay: 5.5 * fps,
    config: { damping: 14, stiffness: 80 },
  });
  const arrow1Opacity = interpolate(arrow1Progress, [0, 1], [0, 1]);

  const arrow2Progress = spring({
    frame,
    fps,
    delay: 7 * fps,
    config: { damping: 14, stiffness: 80 },
  });
  const arrow2Opacity = interpolate(arrow2Progress, [0, 1], [0, 1]);

  // Bottom text
  const bottomProgress = spring({
    frame,
    fps,
    delay: 9 * fps,
    config: { damping: 12, stiffness: 80 },
  });
  const bottomOpacity = interpolate(bottomProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.white,
        fontFamily,
      }}
    >
      {/* Magnolia panel */}
      <div
        style={{
          position: "absolute",
          top: 340,
          left: 100,
          right: 100,
          bottom: 220,
          backgroundColor: colors.magnolia,
          borderRadius: 24,
        }}
      />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: "bold",
            color: colors.darkSlateGray,
          }}
        >
          What Is{" "}
          <span style={{ color: colors.darkCyra }}>Autonomy</span>?
        </div>
      </div>

      {/* Definition */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: defOpacity,
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: colors.gunmetal,
            maxWidth: 1000,
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          A machine that can{" "}
          <span style={{ color: colors.darkCyra, fontWeight: "bold" }}>
            sense
          </span>{" "}
          its environment,{" "}
          <span style={{ color: colors.darkCyra, fontWeight: "bold" }}>
            make decisions
          </span>
          , and{" "}
          <span style={{ color: colors.darkCyra, fontWeight: "bold" }}>
            act
          </span>{" "}
          without constant human control.
        </div>
      </div>

      {/* Icons row */}
      <div
        style={{
          position: "absolute",
          top: 380,
          left: 100,
          right: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
          zIndex: 2,
          height: 300,
        }}
      >
        {/* Sense */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            opacity: icon1Opacity,
            transform: `scale(${icon1Scale})`,
            flex: 1,
          }}
        >
          <EyeIcon />
          <div
            style={{
              fontSize: 28,
              fontWeight: "bold",
              color: colors.darkSlateGray,
            }}
          >
            Sense
          </div>
        </div>

        {/* Arrow 1 */}
        <Arrow opacity={arrow1Opacity} />

        {/* Decide */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            opacity: icon2Opacity,
            transform: `scale(${icon2Scale})`,
            flex: 1,
          }}
        >
          <BrainIcon />
          <div
            style={{
              fontSize: 28,
              fontWeight: "bold",
              color: colors.darkSlateGray,
            }}
          >
            Decide
          </div>
        </div>

        {/* Arrow 2 */}
        <Arrow opacity={arrow2Opacity} />

        {/* Act */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            opacity: icon3Opacity,
            transform: `scale(${icon3Scale})`,
            flex: 1,
          }}
        >
          <GearIcon />
          <div
            style={{
              fontSize: 28,
              fontWeight: "bold",
              color: colors.darkSlateGray,
            }}
          >
            Act
          </div>
        </div>
      </div>

      {/* Bottom text */}
      <div
        style={{
          position: "absolute",
          bottom: 230,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: bottomOpacity,
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontSize: 24,
            color: colors.rhythm,
            maxWidth: 800,
            margin: "0 auto",
            lineHeight: 1.5,
          }}
        >
          We do not just want tools. We want{" "}
          <span style={{ color: colors.darkCyra, fontWeight: "bold" }}>
            helpers
          </span>
          .
        </div>
      </div>
    </AbsoluteFill>
  );
};
