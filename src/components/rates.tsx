import { SERVER_OVERVIEW, SERVER_RATES, SERVER_SYSTEMS } from "@/constants";

export const Rates = () => {
  return (
    <section id="rates" className="relative w-full bg-obsidian py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-12">
        <h2 className="brand-heading mb-3 text-4xl text-ivory sm:text-5xl">
          Cronica y rates
        </h2>
        <p className="font-sans mb-12 max-w-xl text-ivory-muted">
          Valores reales configurados en el servidor, cronica{" "}
          <span className="text-amethyst-soft">Interlude</span>.
        </p>

        <div className="mb-16 overflow-hidden rounded-card border border-amethyst/10">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {SERVER_OVERVIEW.map(({ label, value }, i) => (
              <div
                key={label}
                className={`flex items-center justify-between gap-4 px-5 py-3 ${i % 2 === 0 ? "bg-obsidian-soft" : "bg-obsidian-soft/60"}`}
              >
                <span className="font-sans text-sm text-ivory-muted">
                  {label}
                </span>
                <span className="font-sans text-right text-sm font-medium text-ivory">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-amethyst/10 bg-amethyst/10 sm:grid-cols-3 lg:grid-cols-5">
          {SERVER_RATES.map(({ label, value }) => (
            <div key={label} className="bg-obsidian-soft px-5 py-6">
              <p className="font-display text-2xl text-amethyst sm:text-3xl">
                {value}
              </p>
              <p className="font-sans mt-1 text-xs text-ivory-muted uppercase tracking-[0.04em]">
                {label}
              </p>
            </div>
          ))}
        </div>

        <h3 className="brand-heading mt-20 mb-8 text-2xl text-ivory sm:text-3xl">
          Sistemas del servidor
        </h3>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVER_SYSTEMS.map(({ title, body, runtimeVerified }) => (
            <div
              key={title}
              className="rounded-card border border-amethyst/10 bg-obsidian-soft p-6"
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <h4 className="font-sans text-sm font-semibold text-amethyst-soft">
                  {title}
                </h4>
                {!runtimeVerified && (
                  <span className="font-sans shrink-0 text-[10px] tracking-[0.04em] text-ivory-muted/70 uppercase">
                    En revision
                  </span>
                )}
              </div>
              <p className="font-sans text-sm text-ivory-muted">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
