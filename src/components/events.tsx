import { SERVER_EVENTS } from "@/constants";

const STATUS_LABEL: Record<string, string> = {
  activo: "Activo",
  en_revision: "En revision",
  proximamente: "Proximamente",
};

const STATUS_DOT: Record<string, string> = {
  activo: "bg-online-green",
  en_revision: "bg-amethyst-soft",
  proximamente: "bg-ivory-muted",
};

export const Events = () => {
  return (
    <section
      id="events"
      className="relative w-full bg-obsidian-soft py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-12">
        <h2 className="brand-heading mb-3 text-4xl text-ivory sm:text-5xl">
          Eventos
        </h2>
        <p className="font-sans mb-12 max-w-xl text-ivory-muted">
          Estado real segun la configuracion actual del servidor.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVER_EVENTS.map(({ name, status, note }) => (
            <div
              key={name}
              className="rounded-card border border-amethyst/10 bg-obsidian p-6"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="brand-heading text-lg text-ivory">{name}</h3>
                <span className="font-sans flex shrink-0 items-center gap-1.5 text-[11px] tracking-[0.04em] text-ivory-muted uppercase">
                  <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[status]}`} />
                  {STATUS_LABEL[status]}
                </span>
              </div>
              <p className="font-sans text-sm text-ivory-muted">{note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
