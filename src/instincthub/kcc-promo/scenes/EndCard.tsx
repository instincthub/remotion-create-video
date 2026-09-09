// Act 4 — the end card. The URL holds for the whole shot (SEO playbook: one CTA).
import React from "react";
import { AbsoluteFill } from "remotion";
import { colors, montserrat, nunito, useLayout, FACTS, sec } from "../theme";
import { Ground, Logo, useRise } from "../bits";

export const EndCard: React.FC<{ durF: number }> = ({ durF }) => {
  const L = useLayout();
  const a = useRise(4);
  const b = useRise(14);
  const c = useRise(26);
  const wordmark = (L.portrait ? 108 : 132) * L.k;

  return (
    <Ground>
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: `${L.safeTop}px ${L.margin}px ${L.safeBottom}px`,
          textAlign: "center",
        }}
      >
        <div style={{ opacity: a, transform: `translateY(${(1 - a) * 24}px)` }}>
          <div
            style={{
              fontFamily: montserrat,
              fontWeight: 900,
              fontSize: wordmark,
              lineHeight: 0.98,
              letterSpacing: -wordmark * 0.03,
              color: colors.white,
              textTransform: "uppercase",
            }}
          >
            Kids Can{L.portrait ? <br /> : " "}
            <span style={{ color: colors.tiffany }}>Code</span>
          </div>
        </div>

        <div
          style={{
            opacity: b,
            transform: `translateY(${(1 - b) * 20}px)`,
            marginTop: 26,
            fontFamily: nunito,
            fontWeight: 700,
            fontSize: 40 * L.k,
            color: colors.textDim,
          }}
        >
          {FACTS.cohort}
        </div>

        <div style={{ opacity: c, transform: `translateY(${(1 - c) * 18}px)`, marginTop: 46 }}>
          <div
            style={{
              display: "inline-block",
              padding: "18px 38px",
              borderRadius: 14,
              background: colors.cyan,
              fontFamily: montserrat,
              fontWeight: 800,
              fontSize: 40 * L.k,
              color: colors.white,
            }}
          >
            {FACTS.url}
          </div>
          <div
            style={{
              marginTop: 22,
              fontFamily: nunito,
              fontWeight: 600,
              fontSize: 30 * L.k,
              color: colors.textMuted,
            }}
          >
            WhatsApp {FACTS.whatsapp}
          </div>
        </div>

        <Logo height={54 * L.k} style={{ marginTop: 54, opacity: c * 0.9 }} />
      </AbsoluteFill>
    </Ground>
  );
};
