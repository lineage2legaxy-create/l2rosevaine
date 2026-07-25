const TILES = [
  {
    image: "/img/castle-ruins.webp",
    title: "Castillos y asedios",
    body: "Ocupa castillos, cobra impuestos y defende tu territorio en los asedios semanales.",
    span: "md:col-span-3 md:row-span-2",
    height: "h-80 md:h-full",
  },
  {
    image: "/img/raid-dragon.webp",
    title: "Raid Bosses",
    body: "Jefes epicos con respawn real. Organiza tu clan y reclama las mejores recompensas.",
    span: "md:col-span-2",
    height: "h-64 md:h-full",
  },
] as const;

export const WorldSection = () => {
  return (
    <section
      id="world"
      className="relative w-full bg-obsidian-soft py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-12">
        <h2 className="brand-heading mb-12 text-4xl text-ivory sm:text-5xl">
          Guerra de clanes
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-5 md:grid-rows-2 md:gap-4">
          {TILES.map(({ image, title, body, span, height }) => (
            <div
              key={title}
              className={`group relative overflow-hidden rounded-card border border-amethyst/10 ${span} ${height}`}
            >
              <img
                src={image}
                alt=""
                loading="lazy"
                className="absolute inset-0 size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(7,9,13,0.15) 0%, rgba(7,9,13,0.85) 85%)",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <h3 className="brand-heading mb-2 text-xl text-ivory sm:text-2xl">
                  {title}
                </h3>
                <p className="font-sans max-w-sm text-sm text-ivory-muted">
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
