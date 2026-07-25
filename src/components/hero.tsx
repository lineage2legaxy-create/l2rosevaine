import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";

import { Button } from "./button";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const EMBER_COUNT = 14;
const embers = Array.from({ length: EMBER_COUNT }, (_, i) => ({
  left: `${(i * 137.5) % 100}%`,
  delay: `${(i * 1.7) % 12}s`,
  duration: `${10 + ((i * 3) % 8)}s`,
  drift: `${((i % 5) - 2) * 14}px`,
}));

export const Hero = () => {
  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
      borderRadius: "0 0 40% 10%",
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <section id="hero" className="relative h-dvh w-screen overflow-x-hidden">
      <div
        id="video-frame"
        className="bg-obsidian relative z-10 h-dvh w-screen overflow-hidden rounded-lg"
      >
        {/* Hero background: CC-licensed photography until real server footage exists, see public/img/ATTRIBUTIONS.md */}
        <img
          src="/img/hero-bg.webp"
          alt=""
          fetchPriority="high"
          className="absolute inset-0 z-0 size-full object-cover"
        />

        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 30% 20%, rgba(166,68,255,0.18), transparent 60%), linear-gradient(180deg, rgba(7,6,12,0.55) 0%, rgba(7,6,12,0.78) 55%, #07060c 100%)",
          }}
        />

        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(1px 1px at 20px 30px, rgba(242,235,221,0.25) 1px, transparent 0), radial-gradient(1px 1px at 90px 70px, rgba(242,235,221,0.18) 1px, transparent 0), radial-gradient(1px 1px at 160px 120px, rgba(242,235,221,0.22) 1px, transparent 0)",
            backgroundSize: "200px 200px",
          }}
        />

        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {embers.map((ember, i) => (
            <span
              key={i}
              className="ember"
              style={
                {
                  left: ember.left,
                  animationDelay: ember.delay,
                  animationDuration: ember.duration,
                  "--drift": ember.drift,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        <div className="relative z-40 flex size-full flex-col justify-center px-6 sm:px-12">
          <p className="font-sans mb-4 text-xs font-semibold tracking-[0.2em] text-amethyst-soft uppercase">
            Rose Vaine · Interlude Custom
          </p>

          <h1 className="brand-heading max-w-4xl text-[10vw] leading-[0.95] text-ivory sm:text-6xl md:text-7xl">
            El poder no se hereda.
            <br />
            Se conquista.
          </h1>

          <p className="font-sans mt-6 max-w-md text-base text-ivory-muted sm:text-lg">
            Forja tu legado entre sombras, clanes y guerra.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button id="enter-world" rightIcon={TiLocationArrow}>
              Entrar al mundo
            </Button>

            <Button
              id="create-account"
              containerClass="bg-transparent text-ivory border border-amethyst/40 hover:bg-amethyst/10"
            >
              Crear cuenta
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
