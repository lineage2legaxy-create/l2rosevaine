import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";

import { NAV_ITEMS } from "@/constants";
import { cn } from "@/lib/utils";

import { Button } from "./button";

export const Navbar = () => {
  const navContainerRef = useRef<HTMLDivElement>(null);

  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current?.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
      ease: "power1.out",
    });
  }, [isNavVisible]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <div className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between px-4">
          <a
            href="#hero"
            className="brand-heading text-lg text-ivory transition hover:text-amethyst sm:text-xl"
          >
            ROSE <span className="text-amethyst">VAINE</span>
          </a>

          <div className="hidden h-full items-center lg:flex">
            {NAV_ITEMS.map(({ label, href }) => (
              <a key={href} href={href} className="nav-link">
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#login"
              className="font-sans hidden text-[13px] font-semibold tracking-[0.04em] text-ivory/80 uppercase transition hover:text-ivory sm:inline-block"
            >
              Mi cuenta
            </a>

            <Button
              id="register-button"
              containerClass="hidden sm:flex"
            >
              Crear cuenta
            </Button>

            <button
              type="button"
              aria-label="Abrir menu"
              aria-expanded={isMobileOpen}
              onClick={() => setIsMobileOpen((v) => !v)}
              className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-input border border-amethyst/20 lg:hidden"
            >
              <span
                className={cn(
                  "h-px w-4 bg-ivory transition-transform duration-200",
                  isMobileOpen && "translate-y-[3.5px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "h-px w-4 bg-ivory transition-transform duration-200",
                  isMobileOpen && "-translate-y-[3.5px] -rotate-45"
                )}
              />
            </button>
          </div>
        </nav>
      </div>

      {isMobileOpen && (
        <div className="absolute top-[calc(100%+0.5rem)] right-0 left-0 rounded-card border border-amethyst/15 bg-obsidian-soft/97 p-4 backdrop-blur-md lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={() => setIsMobileOpen(false)}
                className="font-sans rounded-input px-3 py-2.5 text-sm tracking-[0.02em] text-ivory/85 uppercase transition hover:bg-amethyst/10 hover:text-ivory"
              >
                {label}
              </a>
            ))}
            <a
              href="#login"
              onClick={() => setIsMobileOpen(false)}
              className="font-sans rounded-input px-3 py-2.5 text-sm tracking-[0.02em] text-ivory/85 uppercase transition hover:bg-amethyst/10 hover:text-ivory"
            >
              Mi cuenta
            </a>
          </div>

          <Button id="register-button-mobile" containerClass="mt-3 w-full">
            Crear cuenta
          </Button>
        </div>
      )}
    </header>
  );
};
