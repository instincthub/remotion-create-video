import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors } from "./colors";
import { fontFamily } from "./fonts";

interface Transaction {
  label: string;
  amount: string;
  category: string;
}

const transactions: Transaction[] = [
  { label: "Office Supplies", amount: "$142.50", category: "Operating Expenses" },
  { label: "Software License", amount: "$899.00", category: "Technology" },
  { label: "Client Dinner", amount: "$267.30", category: "Entertainment" },
  { label: "Server Hosting", amount: "$1,240.00", category: "Infrastructure" },
  { label: "Travel Booking", amount: "$534.80", category: "Travel" },
];

const categories = [
  "Operating Expenses",
  "Technology",
  "Entertainment",
  "Infrastructure",
  "Travel",
];

export const Scene2FinancialAccounting: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleProgress = spring({
    frame,
    fps,
    delay: 8,
    config: { damping: 12, stiffness: 80 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);

  // Subtitle
  const subtitleProgress = spring({
    frame,
    fps,
    delay: fps,
    config: { damping: 10, stiffness: 70 },
  });
  const subtitleOpacity = interpolate(subtitleProgress, [0, 1], [0, 1]);

  // Transaction cards sliding in
  const cardStartDelay = 1.5 * fps;

  // Category folders appear
  const folderStartDelay = 2 * fps;

  // Counter: "1000+ person-years"
  const counterProgress = spring({
    frame,
    fps,
    delay: 6 * fps,
    config: { damping: 10, stiffness: 60 },
  });
  const counterOpacity = interpolate(counterProgress, [0, 1], [0, 1]);
  const counterScale = interpolate(counterProgress, [0, 1], [0.8, 1]);

  return (
    <AbsoluteFill
      style={{
        background: colors.magnolia,
        fontFamily,
      }}
    >
      {/* Title area */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontSize: 52,
            fontWeight: 700,
            color: colors.darkSlateGray,
          }}
        >
          Financial Transaction{" "}
          <span style={{ color: colors.darkCyra }}>Categorization</span>
        </div>
        <div
          style={{
            opacity: subtitleOpacity,
            fontSize: 32,
            color: colors.rhythm,
            marginTop: 16,
          }}
        >
          Billions of Transactions
        </div>
      </div>

      {/* Transaction cards on left */}
      <div
        style={{
          position: "absolute",
          left: 120,
          top: 260,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {transactions.map((tx, i) => {
          const cardProgress = spring({
            frame,
            fps,
            delay: cardStartDelay + i * 8,
            config: { damping: 12, stiffness: 90 },
          });
          const cardOpacity = interpolate(cardProgress, [0, 1], [0, 1]);
          const cardX = interpolate(cardProgress, [0, 1], [-200, 0]);

          return (
            <div
              key={`tx-${i}`}
              style={{
                opacity: cardOpacity,
                transform: `translateX(${cardX}px)`,
                background: colors.white,
                borderRadius: 12,
                padding: "16px 24px",
                boxShadow: `0 2px 12px ${colors.darkCyra}15`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: 500,
                borderLeft: `4px solid ${colors.darkCyra}`,
              }}
            >
              <div>
                <div style={{ fontSize: 22, fontWeight: 700, color: colors.gunmetal }}>
                  {tx.label}
                </div>
                <div style={{ fontSize: 16, color: colors.rhythm, marginTop: 2 }}>
                  {tx.amount}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Category folders on right */}
      <div
        style={{
          position: "absolute",
          right: 120,
          top: 260,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {categories.map((cat, i) => {
          const folderProgress = spring({
            frame,
            fps,
            delay: folderStartDelay + i * 10,
            config: { damping: 12, stiffness: 80 },
          });
          const folderOpacity = interpolate(folderProgress, [0, 1], [0, 1]);
          const folderX = interpolate(folderProgress, [0, 1], [200, 0]);

          return (
            <div
              key={`cat-${i}`}
              style={{
                opacity: folderOpacity,
                transform: `translateX(${folderX}px)`,
                background: colors.darkCyra,
                borderRadius: 12,
                padding: "16px 28px",
                width: 500,
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: `${colors.white}20`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  color: colors.white,
                  fontWeight: 700,
                }}
              >
                {i + 1}
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: colors.white }}>
                {cat}
              </div>
            </div>
          );
        })}
      </div>

      {/* Animated connection lines */}
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", top: 0, left: 0, zIndex: 5 }}
      >
        {transactions.map((_, i) => {
          const lineProgress = spring({
            frame,
            fps,
            delay: 3.5 * fps + i * 10,
            config: { damping: 14, stiffness: 60 },
          });
          const lineOpacity = interpolate(lineProgress, [0, 1], [0, 0.6]);
          const yLeft = 300 + i * 80;
          const yRight = 300 + i * 80;

          return (
            <line
              key={`connect-${i}`}
              x1={650}
              y1={yLeft}
              x2={1270}
              y2={yRight}
              stroke={colors.caribbeanGreen}
              strokeWidth={2}
              strokeDasharray="8 6"
              opacity={lineOpacity}
            />
          );
        })}
      </svg>

      {/* Bottom stat */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: counterOpacity,
          transform: `scale(${counterScale})`,
        }}
      >
        <span
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: colors.oldRose,
          }}
        >
          1,000+ person-years
        </span>
        <span
          style={{
            fontSize: 28,
            color: colors.rhythm,
            marginLeft: 16,
          }}
        >
          of manual work every year
        </span>
      </div>
    </AbsoluteFill>
  );
};
