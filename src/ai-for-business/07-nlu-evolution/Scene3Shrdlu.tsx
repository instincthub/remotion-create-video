import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

// 3D-like block shapes
const Block: React.FC<{
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  label: string;
  frame: number;
  delay: number;
  fps: number;
  moveX?: number;
  moveY?: number;
  moveStart?: number;
}> = ({ x, y, width, height, color, label, frame, delay, fps, moveX = 0, moveY = 0, moveStart = 999 }) => {
  const enterProgress = spring({
    frame,
    fps,
    delay,
    config: { damping: 12, stiffness: 100 },
  });
  const opacity = interpolate(enterProgress, [0, 1], [0, 1]);
  const scale = interpolate(enterProgress, [0, 1], [0.5, 1]);

  // Movement animation
  const moveProgress = interpolate(frame, [moveStart * fps, (moveStart + 1.5) * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const currentX = x + moveX * moveProgress;
  const currentY = y + moveY * moveProgress;

  // Floating effect
  const floatY = Math.sin(frame * 0.04 + delay) * 4;

  return (
    <g
      style={{
        opacity,
        transform: `translate(${currentX}px, ${currentY + floatY}px) scale(${scale})`,
      }}
    >
      {/* Shadow */}
      <ellipse
        cx={width / 2}
        cy={height + 10}
        rx={width / 2.5}
        ry={6}
        fill="black"
        opacity={0.1}
      />
      {/* Block body */}
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        rx={4}
        fill={color}
        stroke={`${colors.white}30`}
        strokeWidth={1.5}
      />
      {/* Top face (3D illusion) */}
      <polygon
        points={`0,0 ${width * 0.15},-${height * 0.2} ${width + width * 0.15},-${height * 0.2} ${width},0`}
        fill={color}
        opacity={0.7}
        stroke={`${colors.white}20`}
        strokeWidth={1}
      />
      {/* Right face */}
      <polygon
        points={`${width},0 ${width + width * 0.15},-${height * 0.2} ${width + width * 0.15},${height - height * 0.2} ${width},${height}`}
        fill={color}
        opacity={0.5}
      />
      {/* Label */}
      <text
        x={width / 2}
        y={height / 2 + 7}
        textAnchor="middle"
        fill={colors.white}
        fontSize={18}
        fontWeight="bold"
      >
        {label}
      </text>
    </g>
  );
};

// Command display with typewriter
const CommandDisplay: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const command = 'Move the red block on top of the blue cube';
  const startFrame = 3 * fps;
  const elapsed = Math.max(0, frame - startFrame);
  const charsShown = Math.min(Math.floor(elapsed / 1.2), command.length);
  const displayText = command.slice(0, charsShown);
  const cursorBlink = Math.sin(frame * 0.2) > 0;

  const progress = spring({
    frame,
    fps,
    delay: 2.5 * fps,
    config: { damping: 200 },
  });
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        top: 170,
        left: 200,
        right: 200,
        opacity,
      }}
    >
      <div
        style={{
          padding: "16px 28px",
          borderRadius: 10,
          backgroundColor: `${colors.gunmetal}`,
          border: `1px solid ${colors.darkCyra}40`,
          fontFamily: "monospace",
          fontSize: 26,
          color: colors.caribbeanGreen,
        }}
      >
        <span style={{ color: colors.rhythm }}>{">"} </span>
        {displayText}
        {charsShown < command.length && cursorBlink && (
          <span style={{ color: colors.tiffanyBlue }}>|</span>
        )}
      </div>
    </div>
  );
};

export const Scene3Shrdlu: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 12, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  // Subtitle
  const subProgress = spring({
    frame,
    fps,
    delay: 15,
    config: { damping: 200 },
  });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);

  // "But outside that world? Helpless." text
  const helplessOpacity = interpolate(frame, [18 * fps, 20 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: colors.white,
        fontFamily,
      }}
    >
      {/* Background geometric shapes */}
      <AbsoluteFill style={{ opacity: 0.04 }}>
        <svg width="1920" height="1080" viewBox="0 0 1920 1080">
          {Array.from({ length: 15 }).map((_, i) => {
            const x = ((i * 137) % 1920);
            const y = ((i * 97 + 200) % 1080);
            const size = 40 + (i * 23) % 60;
            const rotation = (i * 37) % 360;
            return (
              <rect
                key={i}
                x={x}
                y={y}
                width={size}
                height={size}
                rx={4}
                fill={i % 2 === 0 ? colors.darkCyra : colors.tiffanyBlue}
                transform={`rotate(${rotation} ${x + size / 2} ${y + size / 2})`}
              />
            );
          })}
        </svg>
      </AbsoluteFill>

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 100,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: "bold",
            color: colors.darkSlateGray,
          }}
        >
          <span style={{ color: colors.darkCyra }}>SHRDLU</span>: Understanding a Mini World
        </div>
        <div
          style={{
            fontSize: 22,
            color: colors.rhythm,
            marginTop: 8,
            opacity: subOpacity,
          }}
        >
          Late 1960s &mdash; A system that could reason within a tiny virtual world
        </div>
      </div>

      {/* Command */}
      <CommandDisplay frame={frame} fps={fps} />

      {/* Block world */}
      <div
        style={{
          position: "absolute",
          top: 250,
          left: 0,
          right: 0,
          bottom: 260,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <svg width="1200" height="550" viewBox="0 0 1000 450">
          {/* Ground plane */}
          <rect
            x={50}
            y={350}
            width={900}
            height={4}
            rx={2}
            fill={colors.chineseSilver}
            opacity={0.5}
          />

          {/* Red block - moves on top of blue */}
          <Block
            x={120}
            y={250}
            width={130}
            height={90}
            color={colors.oldRose}
            label="RED"
            frame={frame}
            delay={fps}
            fps={fps}
            moveX={310}
            moveY={-100}
            moveStart={8}
          />

          {/* Blue cube */}
          <Block
            x={430}
            y={250}
            width={130}
            height={90}
            color={colors.metallicBlue}
            label="BLUE"
            frame={frame}
            delay={1.5 * fps}
            fps={fps}
          />

          {/* Green pyramid */}
          <g>
            {(() => {
              const enterProgress = spring({
                frame,
                fps,
                delay: 2 * fps,
                config: { damping: 12, stiffness: 100 },
              });
              const pyramidOpacity = interpolate(enterProgress, [0, 1], [0, 1]);
              const floatY = Math.sin(frame * 0.04 + 3) * 4;
              return (
                <g style={{ opacity: pyramidOpacity }} transform={`translate(680, ${255 + floatY})`}>
                  <ellipse cx={55} cy={92} rx={38} ry={7} fill="black" opacity={0.1} />
                  <polygon
                    points="55,0 110,85 0,85"
                    fill={colors.caribbeanGreen}
                    stroke={`${colors.white}30`}
                    strokeWidth={1.5}
                  />
                  <text x={55} y={65} textAnchor="middle" fill={colors.white} fontSize={16} fontWeight="bold">
                    GREEN
                  </text>
                </g>
              );
            })()}
          </g>

          {/* Small yellow block */}
          <Block
            x={280}
            y={290}
            width={90}
            height={55}
            color={colors.corn}
            label="YLW"
            frame={frame}
            delay={2.5 * fps}
            fps={fps}
          />
        </svg>
      </div>

      {/* Bottom text */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: 200,
          right: 200,
          textAlign: "center",
          fontSize: 32,
          color: colors.darkSlateGray,
          fontWeight: 700,
          lineHeight: 1.5,
          opacity: helplessOpacity,
        }}
      >
        Inside that tiny world, it was{" "}
        <span style={{ color: colors.caribbeanGreen }}>powerful</span>.
        But outside?{" "}
        <span style={{ color: colors.oldRose }}>Helpless.</span>
      </div>
    </AbsoluteFill>
  );
};
