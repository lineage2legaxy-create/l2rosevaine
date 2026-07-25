import { useEffect, useRef, useState } from "react";

const MOBILE_FALLBACK = "/media/rose-vaine-hero-mobile.webp";

function prefersStaticMedia() {
  if (typeof window === "undefined") return true;

  const reducedMotion = window.matchMedia?.(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const mobileViewport = window.matchMedia?.("(max-width: 480px)").matches;
  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection;

  return Boolean(mobileViewport || reducedMotion || connection?.saveData);
}

export function HeroMedia() {
  const [showStaticMedia, setShowStaticMedia] = useState(prefersStaticMedia);
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const saveData = useRef(
    typeof navigator !== "undefined" &&
      Boolean(
        (navigator as Navigator & { connection?: { saveData?: boolean } })
          .connection?.saveData
      )
  );

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileViewport = window.matchMedia("(max-width: 480px)");
    const updateStaticMedia = () => {
      const shouldShowStatic =
        mobileViewport.matches || reducedMotion.matches || saveData.current;

      if (shouldShowStatic) {
        videoRef.current?.pause();
        setIsPaused(false);
        setShowStaticMedia(true);
        return;
      }

      setShowStaticMedia(false);
    };

    reducedMotion.addEventListener("change", updateStaticMedia);
    mobileViewport.addEventListener("change", updateStaticMedia);
    return () => {
      reducedMotion.removeEventListener("change", updateStaticMedia);
      mobileViewport.removeEventListener("change", updateStaticMedia);
    };
  }, []);

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPaused) {
      try {
        await video.play();
        setIsPaused(false);
      } catch {
        setIsPaused(true);
      }
      return;
    }

    video.pause();
    setIsPaused(true);
  };

  if (showStaticMedia) {
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
    <>
      <video
        ref={videoRef}
        aria-label="Escena cinematográfica de Rose Vaine"
        poster="/media/rose-vaine-hero-poster.webp"
        muted
        autoPlay
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 size-full object-cover object-center"
      >
        <source src="/media/rose-vaine-hero-loop.webm" type="video/webm" />
        <source src="/media/rose-vaine-hero-loop.mp4" type="video/mp4" />
        <img
          data-testid="hero-static-fallback"
          src={MOBILE_FALLBACK}
          alt=""
          aria-hidden="true"
        />
      </video>
      <button
        type="button"
        aria-label={isPaused ? "Reproducir escena" : "Pausar escena"}
        onClick={() => {
          void togglePlayback();
        }}
        className="hero-media-control bg-obsidian/85 text-ivory absolute right-4 bottom-4 z-20 min-h-11 border border-[#d7c58f]/60 px-4 font-sans text-xs font-bold tracking-[0.04em] uppercase [clip-path:polygon(7px_0,100%_0,100%_calc(100%-7px),calc(100%-7px)_100%,0_100%,0_7px)] motion-safe:transition-[transform,background-color,border-color] motion-safe:duration-200 motion-safe:ease-[var(--ease-out-quart)] motion-safe:active:scale-[0.97]"
      >
        {isPaused ? "Reproducir" : "Pausar"}
      </button>
    </>
  );
}
