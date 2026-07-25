import { SOCIAL_LINKS } from "@/constants";

export const Footer = () => {
  return (
    <footer className="w-screen border-t border-amethyst/10 bg-obsidian-soft py-6 text-ivory-muted">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:px-12 md:flex-row">
        <p className="font-sans text-center text-sm md:text-left">
          <strong className="font-display font-semibold text-ivory">
            ROSE VAINE
          </strong>{" "}
          &copy; {new Date().getFullYear()}. Todos los derechos reservados.
        </p>

        <div className="flex justify-center gap-4 md:justify-start">
          {SOCIAL_LINKS.map(({ href, icon: Icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              className="text-ivory-muted transition-colors duration-300 ease-out hover:text-amethyst"
            >
              <Icon />
            </a>
          ))}
        </div>

        <div className="font-sans flex items-center gap-3 text-sm">
          <a href="/privacy" className="transition hover:text-amethyst">
            Privacidad
          </a>
          <span className="text-amethyst/30">|</span>
          <a href="/terms" className="transition hover:text-amethyst">
            Terminos
          </a>
          <span className="text-amethyst/30">|</span>
          <a href="/rules" className="transition hover:text-amethyst">
            Reglas
          </a>
        </div>
      </div>
    </footer>
  );
};
