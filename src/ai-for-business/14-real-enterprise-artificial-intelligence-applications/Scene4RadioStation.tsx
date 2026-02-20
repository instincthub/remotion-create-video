import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

interface Message {
  text: string;
  sender: string;
  time: string;
  isFlagged: boolean;
  appearsAt: number; // seconds
}

const messages: Message[] = [
  { text: "Love the show tonight!", sender: "Sarah", time: "9:02 PM", isFlagged: false, appearsAt: 2 },
  { text: "Can you play that new track again?", sender: "Mike", time: "9:03 PM", isFlagged: false, appearsAt: 3.5 },
  { text: "Best station in the city!", sender: "Ava", time: "9:04 PM", isFlagged: false, appearsAt: 5 },
  { text: "This DJ is on fire!", sender: "James", time: "9:05 PM", isFlagged: false, appearsAt: 6.5 },
  { text: "I just bumped my girlfriend's car. She's going to kill me tonight.", sender: "Unknown", time: "9:06 PM", isFlagged: true, appearsAt: 9 },
];

const MessageBubble: React.FC<{
  message: Message;
  index: number;
}> = ({ message, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideProgress = spring({
    frame,
    fps,
    delay: message.appearsAt * fps,
    config: { damping: 12, stiffness: 80 },
  });
  const slideY = interpolate(slideProgress, [0, 1], [40, 0]);
  const msgOpacity = interpolate(slideProgress, [0, 1], [0, 1]);

  // Red highlight for flagged message
  const flagPulse = message.isFlagged
    ? interpolate(Math.sin(frame * 0.08), [-1, 1], [0.7, 1])
    : 0;

  const flagGlow = message.isFlagged
    ? interpolate(frame, [message.appearsAt * fps + fps, message.appearsAt * fps + 2 * fps], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  return (
    <div
      style={{
        opacity: msgOpacity,
        transform: `translateY(${slideY}px)`,
        display: "flex",
        flexDirection: "column",
        gap: 4,
        padding: "12px 20px",
        borderRadius: 12,
        background: message.isFlagged
          ? `${colors.oldRose}15`
          : `${colors.white}08`,
        border: message.isFlagged
          ? `2px solid ${colors.oldRose}${Math.round(flagGlow * 80 + 20).toString(16).padStart(2, "0")}`
          : `1px solid ${colors.white}10`,
        boxShadow: message.isFlagged && flagGlow > 0
          ? `0 0 ${15 + flagPulse * 10}px ${colors.oldRose}30`
          : "none",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: message.isFlagged ? colors.oldRose : colors.tiffanyBlue }}>
          {message.sender}
        </span>
        <span style={{ fontSize: 12, color: `${colors.chineseSilver}80` }}>
          {message.time}
        </span>
      </div>
      <div style={{ fontSize: 20, color: colors.white, lineHeight: 1.5 }}>
        {message.isFlagged ? (
          <>
            {message.text.split(" ").map((word, wi) => {
              const isKeyword = ["kill", "bumped"].includes(word.toLowerCase().replace(/[.,!?]/g, ""));
              return (
                <span
                  key={wi}
                  style={{
                    color: isKeyword ? colors.oldRose : colors.white,
                    fontWeight: isKeyword ? 700 : 400,
                    textDecoration: isKeyword ? "underline" : "none",
                    textDecorationColor: isKeyword ? `${colors.oldRose}60` : "transparent",
                  }}
                >
                  {word}{" "}
                </span>
              );
            })}
          </>
        ) : (
          message.text
        )}
      </div>
      {/* Alert badge for flagged */}
      {message.isFlagged && flagGlow > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 4,
            opacity: flagGlow,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path
              d="M9 1 L17 16 L1 16 Z"
              fill={colors.oldRose}
              opacity={0.9}
            />
            <text x="9" y="14" textAnchor="middle" fontSize="11" fontWeight="bold" fill={colors.white}>
              !
            </text>
          </svg>
          <span style={{ fontSize: 13, color: colors.oldRose, fontWeight: 700, letterSpacing: 1 }}>
            FLAGGED — POTENTIAL THREAT
          </span>
        </div>
      )}
    </div>
  );
};

export const Scene4RadioStation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame,
    fps,
    delay: 8,
    config: { damping: 12, stiffness: 100 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [-20, 0]);

  // "Sounds easy, right?" text
  const easyProgress = spring({
    frame,
    fps,
    delay: 14 * fps,
    config: { damping: 10, stiffness: 80 },
  });
  const easyOpacity = interpolate(easyProgress, [0, 1], [0, 1]);

  // Phone frame scroll
  const scrollY = interpolate(
    frame,
    [8 * fps, 16 * fps],
    [0, -60],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.darkNavy} 0%, #0d1522 100%)`,
        fontFamily,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 80,
          zIndex: 5,
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontSize: 46,
            fontWeight: 700,
            color: colors.white,
          }}
        >
          Scan for{" "}
          <span style={{ color: colors.oldRose }}>Criminal Content</span>
        </div>
        <div
          style={{
            opacity: titleOpacity * 0.7,
            fontSize: 20,
            color: colors.chineseSilver,
            marginTop: 8,
          }}
        >
          A radio station receives thousands of text messages during live shows.
        </div>
      </div>

      {/* Phone/SMS interface */}
      <div
        style={{
          position: "absolute",
          top: 180,
          left: "50%",
          transform: "translateX(-50%)",
          width: 700,
          height: 680,
          background: `${colors.darkCharcoal}`,
          borderRadius: 24,
          border: `1px solid ${colors.white}15`,
          overflow: "hidden",
          zIndex: 3,
        }}
      >
        {/* Header bar */}
        <div
          style={{
            padding: "16px 24px",
            borderBottom: `1px solid ${colors.white}10`,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="none" stroke={colors.tiffanyBlue} strokeWidth="2" />
            <path d="M8 12 L11 15 L16 10" fill="none" stroke={colors.tiffanyBlue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: 18, color: colors.white, fontWeight: 700 }}>
            Live Message Scanner
          </span>
          <div style={{ flex: 1 }} />
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              background: colors.caribbeanGreen,
              boxShadow: `0 0 6px ${colors.caribbeanGreen}`,
            }}
          />
          <span style={{ fontSize: 13, color: colors.caribbeanGreen }}>LIVE</span>
        </div>

        {/* Messages */}
        <div
          style={{
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            transform: `translateY(${scrollY}px)`,
          }}
        >
          {messages.map((msg, i) => (
            <MessageBubble key={`msg-${i}`} message={msg} index={i} />
          ))}
        </div>
      </div>

      {/* "Sounds easy, right?" */}
      <div
        style={{
          position: "absolute",
          bottom: 230,
          right: 100,
          zIndex: 5,
        }}
      >
        <div
          style={{
            opacity: easyOpacity,
            fontSize: 32,
            fontWeight: 700,
            color: colors.chineseSilver,
          }}
        >
          Sounds <span style={{ color: colors.caribbeanGreen }}>easy</span>, right?
        </div>
      </div>
    </AbsoluteFill>
  );
};
