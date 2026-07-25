import { SERVER_SYSTEMS } from "@/constants";

const PRIORITY_COUNT = 6;
const atlasCell = (index: number) => ({
  backgroundImage: "url('/media/rose-vaine-icon-atlas.png')",
  backgroundSize: "300% 200%",
  backgroundPosition: `${(index % 3) * 50}% ${Math.floor(index / 3) * 100}%`,
});

export const SystemsCodex = () => {
  const priority = SERVER_SYSTEMS.slice(0, PRIORITY_COUNT);
  const remaining = SERVER_SYSTEMS.slice(PRIORITY_COUNT);
  return (
    <section id="codex" className="bg-[#0a0810] py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <p className="font-sans text-sm font-bold tracking-[0.1em] text-[#d7c58f]">Códice de sistemas</p>
          <h2 className="mt-4 font-display text-4xl font-bold text-ivory sm:text-6xl">Mecánicas escritas en el código. Verificación en curso.</h2>
        </div>
        <div className="mt-14 divide-y divide-white/10 border-y border-white/10">
          {priority.map(({ title, body, runtimeVerified }, index) => (
            <article key={title} className="grid gap-6 py-8 sm:grid-cols-[6rem_0.75fr_1.25fr_auto] sm:items-center">
              <span className="aspect-square border border-white/10" style={atlasCell(index)} aria-hidden="true" />
              <h3 className="font-display text-xl font-semibold text-ivory">{title}</h3>
              <p className="font-sans text-sm leading-relaxed text-ivory/65">{body}</p>
              {!runtimeVerified && <span className="w-fit border border-amethyst-soft/60 px-2 py-1 font-sans text-xs text-amethyst-soft">En revisión</span>}
            </article>
          ))}
        </div>
        <details className="mt-8 border-b border-white/10 pb-8">
          <summary className="cursor-pointer font-sans font-bold text-[#d7c58f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ivory">
            Consultar los {remaining.length} sistemas restantes
          </summary>
          <ul className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {remaining.map(({ title, body, runtimeVerified }) => (
              <li key={title} className="border-l border-white/15 pl-4">
                <strong className="font-display text-ivory">{title}</strong>
                <p className="mt-1 font-sans text-sm text-ivory/65">{body}</p>
                {!runtimeVerified && <span className="font-sans text-xs text-amethyst-soft">En revisión</span>}
              </li>
            ))}
          </ul>
        </details>
      </div>
    </section>
  );
};
