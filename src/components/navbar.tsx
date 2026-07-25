import { useCallback, useEffect, useRef, useState } from "react";

import { CTA_LINKS, NAV_ITEMS } from "@/constants";
import { cn } from "@/lib/utils";

import { ChronicleButton } from "./chronicle-button";
import { LineageMark } from "./lineage-mark";

export const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const closeMenu = useCallback((restoreFocus = true) => {
    setIsMobileOpen(false);
    if (restoreFocus) requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!isMobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const desktopBreakpoint = window.matchMedia?.("(min-width: 1024px)");

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? []
      ).filter((element) => element.getAttribute("aria-disabled") !== "true");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        !dialogRef.current?.contains(target) &&
        !triggerRef.current?.contains(target)
      ) {
        closeMenu();
      }
    };
    const handleDesktopBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) closeMenu();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    desktopBreakpoint?.addEventListener("change", handleDesktopBreakpoint);
    if (desktopBreakpoint?.matches) closeMenu();
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
      desktopBreakpoint?.removeEventListener("change", handleDesktopBreakpoint);
    };
  }, [closeMenu, isMobileOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#09070d]/92 backdrop-blur-md">
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex h-18 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-10"
      >
        <a
          href="#hero"
          aria-label="Rose Vaine, ir al inicio"
          className="focus-visible:outline-ivory focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          <LineageMark />
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-ivory/78 hover:text-ivory focus-visible:outline-ivory px-3 py-3 font-sans text-xs font-semibold tracking-[0.06em] uppercase focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <ChronicleButton
            href={CTA_LINKS.account}
            variant="violet"
            ariaLabel="Crear cuenta"
          >
            Crear cuenta
          </ChronicleButton>
        </div>

        <button
          ref={triggerRef}
          type="button"
          aria-label={isMobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMobileOpen((open) => !open)}
          className="border-amethyst/45 text-ivory focus-visible:outline-ivory flex min-h-11 min-w-11 flex-col items-center justify-center gap-1.5 border bg-[#110d18]/90 focus-visible:outline-2 focus-visible:outline-offset-4 lg:hidden"
        >
          <span
            className={cn(
              "h-px w-5 bg-current transition-transform duration-200 ease-out",
              isMobileOpen && "translate-y-[3.5px] rotate-45"
            )}
          />
          <span
            className={cn(
              "h-px w-5 bg-current transition-transform duration-200 ease-out",
              isMobileOpen && "-translate-y-[3.5px] -rotate-45"
            )}
          />
        </button>
      </nav>

      {isMobileOpen && (
        <div
          ref={dialogRef}
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Navegación principal"
          className="absolute inset-x-3 top-[calc(100%+0.5rem)] border border-[#d7c58f]/25 bg-[#0c0911] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.55)] lg:hidden"
        >
          <div className="flex flex-col">
            {NAV_ITEMS.map(({ label, href }, index) => (
              <a
                ref={index === 0 ? firstLinkRef : undefined}
                key={href}
                href={href}
                onClick={() => closeMenu(false)}
                className="border-b border-white/8 px-3 py-3.5 font-sans text-sm font-semibold tracking-[0.04em] text-ivory/85 uppercase hover:bg-white/5 hover:text-ivory focus-visible:bg-white/5 focus-visible:outline-none"
              >
                {label}
              </a>
            ))}
          </div>
          <div className="mt-4">
            <ChronicleButton
              href={CTA_LINKS.account}
              variant="violet"
              ariaLabel="Crear cuenta"
            >
              Crear cuenta
            </ChronicleButton>
          </div>
        </div>
      )}
    </header>
  );
};
