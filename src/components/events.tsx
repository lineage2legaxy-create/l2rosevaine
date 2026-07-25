import { SERVER_EVENTS, type EventStatus } from "@/constants";

const STATUS_LABEL: Record<EventStatus, string> = { activo: "Activo", en_revision: "En revisión", proximamente: "Próximamente" };
const STATUS_TONE: Record<EventStatus, string> = {
  activo: "border-online-green text-online-green",
  en_revision: "border-amethyst-soft text-amethyst-soft",
  proximamente: "border-ivory-muted/50 text-ivory-muted",
};

export const Events = () => (
  <section id="events" className="bg-obsidian-soft py-24 sm:py-32">
    <div className="mx-auto grid max-w-[1400px] gap-14 px-5 sm:px-8 lg:grid-cols-[0.55fr_1fr] lg:px-10">
      <div>
        <h2 className="font-display text-4xl font-bold text-ivory sm:text-6xl">El pulso del mundo</h2>
        <p className="mt-5 max-w-md font-sans leading-relaxed text-ivory/70">
          Estado tomado de la configuración actual. “En revisión” aún requiere confirmación dentro del juego.
        </p>
      </div>
      <ol className="border-l border-[#d7c58f]/30">
        {SERVER_EVENTS.map(({ name, status, note }, index) => (
          <li data-status={status} key={name} className="relative grid gap-3 border-b border-white/10 py-7 pl-8 sm:grid-cols-[3rem_1fr_auto]">
            <span className="absolute top-9 -left-1 h-2 w-2 rotate-45 bg-[#d7c58f]" aria-hidden="true" />
            <span className="font-display text-sm text-ivory-muted">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="font-display text-xl font-semibold text-ivory">{name}</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ivory/65">{note}</p>
            </div>
            <time className={`h-fit border px-2 py-1 font-sans text-xs ${STATUS_TONE[status]}`}>{STATUS_LABEL[status]}</time>
          </li>
        ))}
      </ol>
    </div>
  </section>
);
