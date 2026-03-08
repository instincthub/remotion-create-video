import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

const folders = [
  { label: "Which AI?", x: 120, y: 320, color: colors.tiffanyBlue },
  { label: "Where was it?", x: 580, y: 380, color: colors.corn },
  { label: "Lost thread", x: 200, y: 600, color: colors.oldRose },
  { label: "Wrong chat", x: 620, y: 560, color: colors.turkishRose },
  { label: "Can't find it", x: 380, y: 460, color: colors.rhythm },
];

export const Scene2LostContext: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    delay: 5,
    config: { damping: 200 },
  });

  // Search magnifying glass moving between folders
  const searchIndex = Math.floor(frame / 80) % folders.length;
  const currentFolder = folders[searchIndex];
  const searchX = interpolate(
    frame % 80,
    [0, 40, 80],
    [currentFolder.x, currentFolder.x + 40, folders[(searchIndex + 1) % folders.length].x],
    { extrapolateRight: "clamp" }
  );
  const searchY = interpolate(
    frame % 80,
    [0, 40, 80],
    [currentFolder.y, currentFolder.y - 20, folders[(searchIndex + 1) % folders.length].y],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(170deg, ${colors.gunmetal}, ${colors.darkSlateGray})`,
        fontFamily,
      }}
    >
      <AbsoluteFill style={{ opacity: 0.03 }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`h-${i}`}
            style={{
              position: "absolute",
              top: i * 96,
              left: 0,
              width: "100%",
              height: 1,
              backgroundColor: colors.tiffanyBlue,
            }}
          />
        ))}
      </AbsoluteFill>

      {/* Scattered folder icons */}
      {folders.map((folder, i) => {
        const entrance = spring({
          frame,
          fps,
          delay: 20 + i * 12,
          config: { damping: 14, stiffness: 80 },
        });
        const float = Math.sin(frame * 0.03 + i * 1.5) * 5;

        return (
          <div
            key={folder.label}
            style={{
              position: "absolute",
              left: folder.x,
              top: folder.y + float,
              transform: `scale(${interpolate(entrance, [0, 1], [0, 1])})`,
            }}
          >
            <svg width="80" height="70" viewBox="0 0 80 70" fill="none">
              <path
                d="M4 16 L4 60 Q4 64 8 64 L72 64 Q76 64 76 60 L76 20 Q76 16 72 16 L36 16 L30 8 L8 8 Q4 8 4 12Z"
                fill={`${folder.color}12`}
                stroke={folder.color}
                strokeWidth={1.5}
              />
            </svg>
            <div
              style={{
                fontSize: 14,
                color: folder.color,
                textAlign: "center",
                marginTop: 4,
                fontWeight: 400,
              }}
            >
              {folder.label}
            </div>
            {/* Question mark popup */}
            {searchIndex === i && (
              <div
                style={{
                  position: "absolute",
                  top: -20,
                  right: -10,
                  fontSize: 20,
                  fontWeight: 700,
                  color: colors.corn,
                  opacity: Math.sin(frame * 0.2) * 0.3 + 0.7,
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" fill={`${colors.corn}20`} stroke={colors.corn} strokeWidth={1.5} />
                  <text x="12" y="16" textAnchor="middle" fill={colors.corn} fontSize="14" fontWeight="700" fontFamily={fontFamily}>?</text>
                </svg>
              </div>
            )}
          </div>
        );
      })}

      {/* Moving magnifying glass */}
      <svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        style={{
          position: "absolute",
          left: searchX,
          top: searchY - 60,
          pointerEvents: "none",
        }}
      >
        <circle cx="20" cy="20" r="14" stroke={colors.chineseSilver} strokeWidth={2.5} fill={`${colors.white}05`} />
        <line x1="30" y1="30" x2="42" y2="42" stroke={colors.chineseSilver} strokeWidth={3} strokeLinecap="round" />
      </svg>

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: 180,
          paddingLeft: 50,
          paddingRight: 50,
          gap: 12,
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: 44,
            fontWeight: 700,
            color: colors.white,
            textAlign: "center",
            opacity: interpolate(titleProgress, [0, 1], [0, 1]),
            lineHeight: 1.2,
          }}
        >
          Lost in the
          <br />
          <span style={{ color: colors.corn }}>Shuffle</span>
        </div>
        <div
          style={{
            fontSize: 22,
            color: colors.chineseSilver,
            textAlign: "center",
            opacity: interpolate(
              spring({ frame, fps, delay: 30, config: { damping: 200 } }),
              [0, 1],
              [0, 1]
            ),
          }}
        >
          Multiple AIs = scattered context
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
