import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

export const Scene8ScaleStructure: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 0.5),
    config: { damping: 12, stiffness: 80 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  // Four pillars
  const pillars = [
    {
      label: "Education",
      sublabel: "Domain experts\nunderstand the tools",
      color: colors.darkCyra,
      delay: 3,
    },
    {
      label: "Projects",
      sublabel: "Avoid endless\nexperiments",
      color: colors.viridianGreen,
      delay: 5,
    },
    {
      label: "Measurement",
      sublabel: "Value is\nvisible",
      color: colors.tiffanyBlue,
      delay: 7,
    },
    {
      label: "Factory",
      sublabel: "Experimentation\nbecomes efficient",
      color: colors.caribbeanGreen,
      delay: 9,
    },
  ];

  const pillarWidth = 300;
  const pillarHeight = 340;
  const pillarGap = 40;
  const totalWidth =
    pillars.length * pillarWidth + (pillars.length - 1) * pillarGap;
  const startX = (1920 - totalWidth) / 2;
  const groundY = 800;
  const pillarTopY = groundY - pillarHeight;

  // Roof (appears after all pillars)
  const roofProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 12),
    config: { damping: 14, stiffness: 80 },
  });
  const roofOpacity = interpolate(roofProgress, [0, 1], [0, 1]);
  const roofY = interpolate(roofProgress, [0, 1], [-40, 0]);

  // Roof label
  const roofLabelProgress = spring({
    frame,
    fps,
    delay: Math.round(fps * 14),
    config: { damping: 12, stiffness: 80 },
  });
  const roofLabelOpacity = interpolate(roofLabelProgress, [0, 1], [0, 1]);

  const roofOverhang = 30;
  const beamLeft = startX - roofOverhang;
  const beamWidth = totalWidth + roofOverhang * 2;
  const beamY = pillarTopY - 12;

  return (
    <AbsoluteFill
      style={{
        background: colors.magnolia,
        fontFamily,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 50,
          width: "100%",
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <span
          style={{
            fontSize: 58,
            fontWeight: 700,
            color: colors.darkSlateGray,
          }}
        >
          Scale Requires{" "}
          <span style={{ color: colors.darkCyra }}>Structure</span>
        </span>
      </div>

      {/* Ground line */}
      <div
        style={{
          position: "absolute",
          top: groundY,
          left: beamLeft,
          width: beamWidth,
          height: 4,
          background: colors.darkSlateGray,
          borderRadius: 2,
          opacity: 0.3,
        }}
      />

      {/* Roof beam bar */}
      <div
        style={{
          position: "absolute",
          top: beamY,
          left: beamLeft,
          width: beamWidth,
          height: 12,
          background: colors.darkCyra,
          borderRadius: 4,
          opacity: roofOpacity,
          transform: `translateY(${roofY}px)`,
        }}
      />

      {/* Triangular roof */}
      <div
        style={{
          position: "absolute",
          top: beamY - 70,
          left: beamLeft,
          width: beamWidth,
          opacity: roofOpacity,
          transform: `translateY(${roofY}px)`,
        }}
      >
        <svg
          width={beamWidth}
          height="72"
          viewBox={`0 0 ${beamWidth} 72`}
        >
          <polygon
            points={`0,72 ${beamWidth / 2},0 ${beamWidth},72`}
            fill={`${colors.darkCyra}15`}
            stroke={colors.darkCyra}
            strokeWidth={3}
          />
        </svg>
      </div>

      {/* Roof label */}
      <div
        style={{
          position: "absolute",
          top: beamY - 48,
          width: "100%",
          textAlign: "center",
          opacity: roofLabelOpacity,
          transform: `translateY(${roofY}px)`,
        }}
      >
        <span
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: colors.darkCyra,
          }}
        >
          Enterprise AI Capability
        </span>
      </div>

      {/* Pillars */}
      {pillars.map((pillar, i) => {
        const pillarProgress = spring({
          frame,
          fps,
          delay: Math.round(fps * pillar.delay),
          config: { damping: 14, stiffness: 80 },
        });
        const scaleY = interpolate(pillarProgress, [0, 1], [0, 1]);
        const pillarOpacity = interpolate(pillarProgress, [0, 1], [0, 1]);

        const x = startX + i * (pillarWidth + pillarGap);

        return (
          <div
            key={pillar.label}
            style={{
              position: "absolute",
              top: groundY - pillarHeight * scaleY,
              left: x,
              width: pillarWidth,
              height: pillarHeight * scaleY,
              opacity: pillarOpacity,
              background: `${pillar.color}15`,
              border: `3px solid ${pillar.color}50`,
              borderRadius: "14px 14px 0 0",
              overflow: "hidden",
            }}
          >
            {/* Content inside pillar (visible once grown) */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: pillarHeight,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 14,
                opacity: scaleY > 0.8 ? interpolate(scaleY, [0.8, 1], [0, 1]) : 0,
              }}
            >
              <span
                style={{
                  fontSize: 32,
                  fontWeight: 700,
                  color: pillar.color,
                }}
              >
                {pillar.label}
              </span>

              <span
                style={{
                  fontSize: 22,
                  fontWeight: 400,
                  color: colors.gunmetal,
                  textAlign: "center",
                  lineHeight: 1.5,
                  whiteSpace: "pre-line",
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
              >
                {pillar.sublabel}
              </span>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
