const ATLAS_X = ["0%", "33.333%", "66.667%", "100%"] as const;
const ATLAS_Y = ["0%", "50%", "100%"] as const;

const atlasCell = (index: number) => {
  const column = index % 4;
  const row = Math.floor(index / 4);
  return {
  backgroundImage: "url('/media/rose-vaine-icon-atlas.png')",
  backgroundSize: "400% 300%",
  backgroundPosition: `${ATLAS_X[column]} ${ATLAS_Y[row]}`,
  };
};

export const Features = () => (
  <section id="features" className="bg-obsidian py-24 sm:py-32">
    <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
      <div className="grid gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
        <h2 className="max-w-4xl font-display text-4xl leading-[1.03] font-bold tracking-[-0.035em] text-ivory sm:text-6xl">
          El castillo no es un decorado. Es la frontera entre tu clan y la historia.
        </h2>
        <p className="border-l border-[#d7c58f]/35 pl-6 font-sans leading-relaxed text-ivory/70">
          Asedios de 120 minutos, desde nivel de clan 4 y hasta 10 clanes por bando, según la configuración actual.
        </p>
      </div>
      <figure className="relative mt-12 min-h-[28rem] overflow-hidden border border-white/10 lg:min-h-[42rem]">
        <img src="/img/feature-siege.webp" alt="Fortaleza medieval preparada para un asedio" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
        <figcaption className="absolute right-5 bottom-5 max-w-sm border-r border-[#d7c58f] pr-4 text-right font-sans text-sm text-ivory/80">
          120 min · clan nivel 4 · 10 atacantes / 10 defensores
        </figcaption>
      </figure>
      <div className="mt-16 grid gap-10 border-t border-white/10 pt-10 md:grid-cols-[0.7fr_1.3fr] md:items-center">
        <div className="grid grid-cols-2 gap-px bg-white/10">
          <span className="aspect-square bg-obsidian" style={atlasCell(0)} aria-hidden="true" />
          <span className="aspect-square bg-obsidian" style={atlasCell(1)} aria-hidden="true" />
        </div>
        <div className="md:pl-10">
          <h3 className="font-display text-3xl font-bold text-ivory sm:text-5xl">PvP con consecuencias</h3>
          <p className="mt-5 max-w-2xl font-sans text-lg leading-relaxed text-ivory/72">
            El estado PvP permanece 40 segundos frente a un inocente y 20 segundos frente a otro jugador marcado. La Olympiad activa completa el pulso competitivo.
          </p>
        </div>
      </div>
    </div>
  </section>
);
