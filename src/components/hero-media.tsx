import { useState } from "react";

const MOBILE_FALLBACK = "/media/rose-vaine-hero-mobile.webp";

function prefersStaticMedia() {
  if (typeof window === "undefined") return true;

  const reducedMotion = window.matchMedia?.(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection;

  return Boolean(reducedMotion || connection?.saveData);
}

export function HeroMedia() {
  const [useStaticMedia] = useState(prefersStaticMedia);

  if (useStaticMedia) {
    return (
      <img
        data-testid="hero-static-fallback"
        src={MOBILE_FALLBACK}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover object-center"
      />
    );
  }

  return (
    <video
      aria-label="Escena cinematográfica de Rose Vaine"
      poster="/media/rose-vaine-hero-poster.webp"
      muted
      autoPlay
      loop
      playsInline
      preload="metadata"
      className="absolute inset-0 size-full object-cover object-center"
    >
      <source src="/media/rose-vaine-hero.webm" type="video/webm" />
      <source src="/media/rose-vaine-hero.mp4" type="video/mp4" />
      <img
        data-testid="hero-static-fallback"
        src={MOBILE_FALLBACK}
        alt=""
        aria-hidden="true"
      />
    </video>
  );
}
