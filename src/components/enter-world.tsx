import { CTA_LINKS } from "@/constants";
import { ChronicleButton } from "./chronicle-button";

const STEPS = [
  { number: "I", title: "Creá tu cuenta", body: "El registro público todavía no fue habilitado.", href: CTA_LINKS.account, action: "Crear cuenta" },
  { number: "II", title: "Prepará el launcher", body: "La descarga pública todavía no fue habilitada.", href: CTA_LINKS.download, action: "Descargar cliente" },
  { number: "III", title: "Entrá a la comunidad", body: "El enlace oficial de comunidad todavía no fue confirmado.", href: CTA_LINKS.discord, action: "Abrir comunidad" },
] as const;

export const EnterWorld = () => (
  <section id="start" className="relative overflow-hidden bg-obsidian py-24 sm:py-32">
    <div className="absolute inset-y-0 right-0 w-1/2 bg-[url('/media/rose-vaine-hero-close.png')] bg-cover bg-center opacity-20" aria-hidden="true" />
    <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
      <h2 className="max-w-4xl font-display text-4xl font-bold text-ivory sm:text-7xl">Cuando las puertas abran, tu nombre deberá estar listo.</h2>
      <ol className="mt-14 max-w-4xl divide-y divide-white/10 border-y border-white/10">
        {STEPS.map(({ number, title, body, href, action }) => (
          <li key={number} className="grid gap-5 py-8 sm:grid-cols-[4rem_1fr_auto] sm:items-center">
            <span className="font-display text-2xl text-[#d7c58f]">{number}</span>
            <div>
              <h3 className="font-display text-xl font-semibold text-ivory">{title}</h3>
              <p className="mt-1 font-sans text-sm text-ivory/65">{body}</p>
            </div>
            <ChronicleButton href={href} variant="violet" ariaLabel={action}>{action}</ChronicleButton>
          </li>
        ))}
      </ol>
    </div>
  </section>
);
