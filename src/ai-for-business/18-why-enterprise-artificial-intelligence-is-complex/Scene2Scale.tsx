import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const MODEL_BOXES = [
  { label: "Model A", color: colors.darkCyra, x: 300 },
  { label: "Model B", color: colors.viridianGreen, x: 760 },
  { label: "Model C", color: colors.deepGreenCyanTurquoise, x: 1220 },
];

// Data flow particle
const FlowParticle: React.FC<{
  startX: number;
  endX: number;
  y: number;
  delay: number;
  color: string;
}> = ({ startX, endX, y, delay, color }) => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame - delay, [0, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (frame < delay) return null;

  const x = interpolate(progress, [0, 1], [startX, endX]);
  const opacity = interpolate(progress, [0, 0.1, 0.9, 1], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <circle cx={x} cy={y} r={6} fill={color} opacity={opacity}>
      <animate />
    </circle>
  );
};

export const Scene2Scale: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title entrance
  const titleProgress = spring({
    frame,
    fps,
    delay: 0,
    config: { damping: 14, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [-30, 0]);

  // Staggered box entrances
  const boxEntrances = MODEL_BOXES.map((_, i) =>
    spring({
      frame,
      fps,
      delay: fps + i * 15,
      config: { damping: 12, stiffness: 100 },
    }),
  );

  // Arrow entrances (appear after boxes)
  const arrowEntrances = [0, 1].map((i) =>
    spring({
      frame,
      fps,
      delay: 2 * fps + i * 15,
      config: { damping: 14, stiffness: 120 },
    }),
  );

  // "Data goes in" label
  const dataInProgress = spring({
    frame,
    fps,
    delay: 3 * fps,
    config: { damping: 14, stiffness: 100 },
  });
  const dataInOpacity = interpolate(dataInProgress, [0, 1], [0, 1]);

  // "Final decision" label
  const finalProgress = spring({
    frame,
    fps,
    delay: 4 * fps,
    config: { damping: 14, stiffness: 100 },
  });
  const finalOpacity = interpolate(finalProgress, [0, 1], [0, 1]);

  // Flow particles cycle
  const particleDelays = [];
  for (let cycle = 0; cycle < 6; cycle++) {
    particleDelays.push(5 * fps + cycle * 30);
  }

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
            fontSize: 52,
            fontWeight: 700,
            color: colors.darkSlateGray,
          }}
        >
          More Models.{" "}
          <span style={{ color: colors.darkCyra }}>More Complexity.</span>
        </div>
      </div>

      {/* Pipeline visualization */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 200,
          paddingTop: 60,
        }}
      >
        <svg width="1720" height="500" viewBox="0 0 1720 500">
          {/* Data input arrow */}
          <g opacity={dataInOpacity}>
            <line
              x1={80}
              y1={250}
              x2={240}
              y2={250}
              stroke={colors.rhythm}
              strokeWidth={3}
              strokeDasharray="8 4"
            />
            <polygon
              points="240,240 265,250 240,260"
              fill={colors.rhythm}
            />
            <text
              x={50}
              y={220}
              fill={colors.rhythm}
              fontSize={18}
              fontFamily={fontFamily}
              fontWeight={700}
            >
              Data In
            </text>
          </g>

          {/* Model boxes */}
          {MODEL_BOXES.map((box, i) => {
            const entrance = boxEntrances[i];
            const scale = interpolate(entrance, [0, 1], [0.6, 1]);
            const opacity = interpolate(entrance, [0, 1], [0, 1]);
            const boxWidth = 320;
            const boxHeight = 160;
            const bx = box.x - boxWidth / 2 + 60;
            const by = 250 - boxHeight / 2;

            return (
              <g
                key={box.label}
                opacity={opacity}
                transform={`translate(${box.x + 60}, 250) scale(${scale}) translate(${-(box.x + 60)}, -250)`}
              >
                <rect
                  x={bx}
                  y={by}
                  width={boxWidth}
                  height={boxHeight}
                  rx={16}
                  fill={colors.white}
                  stroke={box.color}
                  strokeWidth={3}
                />
                {/* Icon */}
                <rect
                  x={bx + boxWidth / 2 - 20}
                  y={by + 30}
                  width={40}
                  height={40}
                  rx={8}
                  fill={`${box.color}20`}
                  stroke={box.color}
                  strokeWidth={2}
                />
                <circle
                  cx={bx + boxWidth / 2}
                  cy={by + 50}
                  r={10}
                  fill={box.color}
                  opacity={0.6}
                />
                {/* Label */}
                <text
                  x={bx + boxWidth / 2}
                  y={by + 110}
                  textAnchor="middle"
                  fill={colors.darkSlateGray}
                  fontSize={26}
                  fontFamily={fontFamily}
                  fontWeight={700}
                >
                  {box.label}
                </text>
                <text
                  x={bx + boxWidth / 2}
                  y={by + 140}
                  textAnchor="middle"
                  fill={colors.rhythm}
                  fontSize={16}
                  fontFamily={fontFamily}
                >
                  Processes data
                </text>
              </g>
            );
          })}

          {/* Connecting arrows */}
          {arrowEntrances.map((entrance, i) => {
            const arrowOpacity = interpolate(entrance, [0, 1], [0, 1]);
            const startX = MODEL_BOXES[i].x + 220;
            const endX = MODEL_BOXES[i + 1].x - 100;

            return (
              <g key={`arrow-${i}`} opacity={arrowOpacity}>
                <line
                  x1={startX}
                  y1={250}
                  x2={endX}
                  y2={250}
                  stroke={colors.darkCyra}
                  strokeWidth={3}
                />
                <polygon
                  points={`${endX - 5},238 ${endX + 15},250 ${endX - 5},262`}
                  fill={colors.darkCyra}
                />
              </g>
            );
          })}

          {/* Final decision output */}
          <g opacity={finalOpacity}>
            <line
              x1={1440}
              y1={250}
              x2={1600}
              y2={250}
              stroke={colors.caribbeanGreen}
              strokeWidth={3}
            />
            <polygon
              points="1600,240 1625,250 1600,260"
              fill={colors.caribbeanGreen}
            />
            <text
              x={1580}
              y={220}
              fill={colors.caribbeanGreen}
              fontSize={18}
              fontFamily={fontFamily}
              fontWeight={700}
              textAnchor="end"
            >
              Decision
            </text>
          </g>

          {/* Flow particles */}
          {particleDelays.map((delay, i) => (
            <React.Fragment key={`particles-${i}`}>
              <FlowParticle
                startX={200}
                endX={600}
                y={250}
                delay={delay}
                color={colors.tiffanyBlue}
              />
              <FlowParticle
                startX={660}
                endX={1060}
                y={250}
                delay={delay + 20}
                color={colors.viridianGreen}
              />
              <FlowParticle
                startX={1120}
                endX={1440}
                y={250}
                delay={delay + 40}
                color={colors.caribbeanGreen}
              />
            </React.Fragment>
          ))}
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
