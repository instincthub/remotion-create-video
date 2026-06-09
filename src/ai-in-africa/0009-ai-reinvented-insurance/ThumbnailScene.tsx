import { AbsoluteFill } from "remotion";
import { colors } from "./colors";
import { display, mono } from "./fonts";

/**
 * Static 1-second thumbnail card held at the very start so YouTube can
 * auto-pick it. Nothing animates — every sampled frame is identical.
 */
export const ThumbnailScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.brandDark }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 72% 30%, ${colors.brandTeal}3A 0%, transparent 58%), radial-gradient(ellipse at 20% 88%, ${colors.savannahGold}28 0%, transparent 55%)`,
        }}
      />
      {/* dotted texture */}
      <AbsoluteFill style={{ opacity: 0.06 }}>
        <svg width="1920" height="1080">
          <defs>
            <pattern
              id="thumb-dots"
              x="0"
              y="0"
              width="46"
              height="46"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1.6" fill={colors.tealLight} />
            </pattern>
          </defs>
          <rect width="1920" height="1080" fill="url(#thumb-dots)" />
        </svg>
      </AbsoluteFill>

      <AbsoluteFill style={{ padding: "120px 130px", justifyContent: "space-between" }}>
        {/* top: series badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontFamily: mono,
            fontSize: 30,
            letterSpacing: 6,
            color: colors.amber,
            textTransform: "uppercase",
          }}
        >
          <span style={{ width: 46, height: 4, background: colors.amber, borderRadius: 2 }} />
          AI in Africa · Episode 09
        </div>

        {/* middle: headline */}
        <div style={{ marginTop: -40 }}>
          <div
            style={{
              fontFamily: display,
              fontWeight: 800,
              fontSize: 150,
              lineHeight: 0.98,
              color: colors.white,
              letterSpacing: -4,
            }}
          >
            How AI{" "}
            <span style={{ color: colors.tealLight }}>Reinvented</span>
            <br />
            Insurance
          </div>
          <div
            style={{
              fontFamily: display,
              fontWeight: 600,
              fontSize: 44,
              color: colors.neutral200,
              marginTop: 28,
              maxWidth: 1180,
              lineHeight: 1.2,
            }}
          >
            Binding cover in 90 seconds. Fraud caught by a neural net. Africa's
            fintech, rebuilt.
          </div>
        </div>

        {/* bottom: stat chips */}
        <div style={{ display: "flex", gap: 22 }}>
          {[
            { v: "$38M", l: "record raise" },
            { v: "506K", l: "txns / second" },
            { v: "35M", l: "users served" },
          ].map((s) => (
            <div
              key={s.v}
              style={{
                padding: "20px 34px",
                borderRadius: 20,
                background: `${colors.panel}E0`,
                border: `1.5px solid ${colors.tealLight}44`,
              }}
            >
              <div
                style={{
                  fontFamily: display,
                  fontWeight: 800,
                  fontSize: 60,
                  color: colors.tealLight,
                  lineHeight: 1,
                }}
              >
                {s.v}
              </div>
              <div
                style={{
                  fontFamily: mono,
                  fontSize: 22,
                  letterSpacing: 2,
                  color: colors.neutral400,
                  textTransform: "uppercase",
                  marginTop: 8,
                }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
