export function LineageMark() {
  return (
    <div
      className="inline-flex items-center gap-3 text-[#d7c58f]"
      aria-label="Rose Vaine"
    >
      <span
        aria-hidden="true"
        className="relative block h-10 w-7 [filter:drop-shadow(0_0_8px_rgb(166_68_255/0.2))]"
      >
        <span className="absolute top-0 left-1/2 h-8 w-px -translate-x-1/2 rotate-[28deg] bg-current" />
        <span className="absolute top-0 left-1/2 h-8 w-px -translate-x-1/2 -rotate-[28deg] bg-current" />
        <span className="bg-amethyst-soft absolute top-4 left-1/2 h-5 w-px -translate-x-1/2" />
        <span className="bg-obsidian absolute bottom-0 left-1/2 size-2 -translate-x-1/2 rotate-45 border border-current" />
      </span>
      <span className="font-display text-lg font-bold tracking-[0.12em] uppercase sm:text-xl">
        Rose <span className="text-amethyst-soft">Vaine</span>
      </span>
    </div>
  );
}
