export const Footer = () => (
  <footer id="community" className="border-t border-white/10 bg-obsidian px-5 py-10 text-ivory-muted sm:px-8 lg:px-10">
    <div className="mx-auto flex max-w-[1400px] flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <strong className="font-display text-lg text-ivory">ROSE VAINE</strong>
        <p className="mt-2 max-w-xl font-sans text-xs leading-relaxed">
          Servidor de fans independiente. Lineage II y sus marcas pertenecen a sus respectivos propietarios. Este sitio no representa ni está afiliado a NCSoft.
        </p>
      </div>
      <a href="/media/ATTRIBUTIONS.md" className="inline-flex min-h-11 items-center font-sans text-sm underline decoration-[#d7c58f]/60 underline-offset-4 hover:text-ivory">
        Créditos y atribuciones
      </a>
    </div>
  </footer>
);
