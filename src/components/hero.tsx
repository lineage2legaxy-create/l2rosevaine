import { CTA_LINKS } from "@/constants";

import { ChronicleButton } from "./chronicle-button";
import { HeroMedia } from "./hero-media";
import { LineageMark } from "./lineage-mark";

const EMBERS = Array.from({ length: 12 }, (_, index) => ({
  left: `${7 + ((index * 83) % 89)}%`,
  delay: `${(index * 1.3) % 9}s`,
  duration: `${9 + (index % 5)}s`,
  drift: `${((index % 5) - 2) * 12}px`,
}));

export const Hero = () => (
  <section
    id="hero"
    className="bg-obsidian relative isolate min-h-[100dvh] overflow-hidden"
  >
    <HeroMedia />
    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,6,12,0.96)_0%,rgba(7,6,12,0.79)_47%,rgba(7,6,12,0.25)_78%,rgba(7,6,12,0.48)_100%)]" />
    <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(7,6,12,0.92)_0%,transparent_42%,rgba(7,6,12,0.25)_100%)]" />

    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {EMBERS.map((ember, index) => (
        <span
          key={index}
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

    <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1400px] items-end px-5 pt-28 pb-16 sm:px-8 sm:pb-20 lg:items-center lg:px-10 lg:pt-32">
      <div className="max-w-3xl">
        <div className="mb-7 hidden sm:block">
          <LineageMark />
        </div>
        <p className="mb-4 font-sans text-sm font-bold tracking-[0.12em] text-[#d7c58f]">
          Interlude Custom
        </p>
        <h1 className="font-display max-w-3xl text-[clamp(2.75rem,7vw,6.6rem)] leading-[0.94] font-bold tracking-[-0.045em] text-ivory">
          Forjá tu leyenda entre clanes, castillos y guerra.
        </h1>
        <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-ivory/80 sm:text-lg">
          Volvé a la era Interlude en un mundo custom donde el honor del clan,
          el PvP y los asedios vuelven a marcar cada historia.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ChronicleButton
            href={CTA_LINKS.download}
            variant="gold"
            ariaLabel="Descargar cliente"
          >
            Descargar cliente
          </ChronicleButton>
          <ChronicleButton
            href={CTA_LINKS.account}
            variant="violet"
            ariaLabel="Crear cuenta"
          >
            Crear cuenta
          </ChronicleButton>
        </div>
      </div>
    </div>
  </section>
);
