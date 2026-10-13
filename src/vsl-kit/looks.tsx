import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Theme } from "./types";

/** Animated film grain; a new seed every frame. */
export const Grain: React.FC<{ w: number; h: number; opacity?: number }> = ({ w, h, opacity = 0.07 }) => {
  const frame = useCurrentFrame();
  const id = `grain${w}-${frame % 12}`;
  return (
    <svg width={w} height={h} style={{ position: "absolute", inset: 0, opacity, mixBlendMode: "overlay" }}>
      <filter id={id}>
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={frame % 12} />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width={w} height={h} filter={`url(#${id})`} />
    </svg>
  );
};

export const Vignette: React.FC = () => (
  <AbsoluteFill style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.45) 100%)" }} />
);

/** The cinematic grade on Flow scenes: a touch of contrast and warmth, slightly less saturation. */
export const FILM_GRADE = "contrast(1.07) saturate(0.9) brightness(0.97) sepia(0.06)";

export const Backdrop: React.FC<{ theme: Theme; vertical?: boolean }> = ({ theme, vertical }) => (
  <AbsoluteFill
    style={{
      background: vertical
        ? `radial-gradient(900px 900px at 50% 40%, ${theme.accent}2e 0%, transparent 60%), linear-gradient(170deg, ${theme.bg} 0%, ${theme.bgDark} 100%)`
        : `radial-gradient(1200px 700px at 50% 40%, ${theme.accent}26 0%, transparent 60%), linear-gradient(160deg, ${theme.bg} 0%, ${theme.bgDark} 100%)`,
    }}
  />
);
