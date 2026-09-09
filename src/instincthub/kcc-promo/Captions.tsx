import React from "react";
import { useCurrentFrame } from "remotion";
import { colors, nunito, useLayout, FPS } from "./theme";
import { cues } from "./cues";

/**
 * Burned captions for the vertical and square cuts (most social viewing is
 * muted). Words and timings come from the ElevenLabs alignment via
 * work/promo/build-srt.py, so they carry the approved script with real timing
 * and never need a transcription pass.
 *
 * Burned in Remotion rather than with ffmpeg's `subtitles` filter because this
 * machine's ffmpeg is built without libass — and doing it here keeps the brand
 * font and the safe margins anyway. 16:9 ships the .srt instead.
 */
export const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const L = useLayout();
  const t = frame / FPS;
  const active = cues.find((c) => t >= c.start && t < c.end);
  if (!active) return null;
  const fs = Math.round(52 * (L.portrait ? 1 : 0.86));
  return (
    <div
      style={{
        position: "absolute",
        left: L.margin,
        right: L.margin,
        bottom: L.safeBottom + (L.portrait ? 24 : 12),
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          fontFamily: nunito,
          fontWeight: 800,
          fontSize: fs,
          lineHeight: 1.16,
          textAlign: "center",
          color: colors.white,
          WebkitTextStroke: `${Math.max(2, fs * 0.09)}px ${colors.gunmetal}`,
          paintOrder: "stroke fill",
          textShadow: "0 4px 18px rgba(0,0,0,0.6)",
          maxWidth: L.W - 2 * L.margin,
        }}
      >
        {active.text}
      </div>
    </div>
  );
};
