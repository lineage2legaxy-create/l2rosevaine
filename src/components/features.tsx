import { GiBroadsword, GiCastle, GiTrophyCup, GiCoins } from "react-icons/gi";

const SECONDARY_FEATURES = [
  {
    icon: GiTrophyCup,
    title: "Rankings en tiempo real",
    body: "Seguí tu progreso frente al resto del servidor: nivel, PvP, PK y clanes.",
  },
  {
    icon: GiCoins,
    title: "Economia viva",
    body: "Comercia, fabrica y progresa dentro de rates pensados para recompensar la constancia.",
  },
] as const;

export const Features = () => {
  return (
    <section id="features" className="relative w-full bg-obsidian py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-12">
        <h2 className="brand-heading mb-16 max-w-2xl text-4xl text-ivory sm:text-5xl">
          Un mundo. Sin limites.
          <br />
          Tu historia.
        </h2>

        {/* Split 1: PvP */}
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-14">
          <div className="order-2 md:order-1">
            <span className="mb-3 inline-flex items-center gap-2 text-amethyst">
              <GiBroadsword className="size-5" />
            </span>
            <h3 className="brand-heading mb-4 text-2xl text-ivory sm:text-3xl">
              Guerra sin limites
            </h3>
            <p className="font-sans max-w-md text-ivory-muted">
              Competi en PvP, domina la Olympiad y defende el honor de tu clan
              en batallas que definiran el futuro del mundo.
            </p>
          </div>

          <div className="order-1 overflow-hidden rounded-card border border-amethyst/10 md:order-2">
            <img
              src="/img/feature-pvp.webp"
              alt="Armas y armaduras medievales"
              loading="lazy"
              className="h-64 w-full object-cover sm:h-80"
            />
          </div>
        </div>

        {/* Split 2: Sieges (reversed) */}
        <div className="mt-20 grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-14">
          <div className="overflow-hidden rounded-card border border-amethyst/10">
            <img
              src="/img/feature-siege.webp"
              alt="Castillo medieval de noche"
              loading="lazy"
              className="h-64 w-full object-cover sm:h-96"
            />
          </div>

          <div>
            <span className="mb-3 inline-flex items-center gap-2 text-amethyst">
              <GiCastle className="size-5" />
            </span>
            <h3 className="brand-heading mb-4 text-2xl text-ivory sm:text-3xl">
              Conquista el reino
            </h3>
            <p className="font-sans max-w-md text-ivory-muted">
              Participa en asedios, ocupa castillos y converti a tu alianza en
              la fuerza dominante del servidor.
            </p>
          </div>
        </div>

        {/* Secondary features: two, not three-equal-cards */}
        <div className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-card border border-amethyst/10 bg-amethyst/10 sm:grid-cols-2">
          {SECONDARY_FEATURES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-obsidian-soft p-8 sm:p-10">
              <Icon className="mb-4 size-6 text-amethyst" />
              <h4 className="brand-heading mb-2 text-xl text-ivory">
                {title}
              </h4>
              <p className="font-sans text-sm text-ivory-muted">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
