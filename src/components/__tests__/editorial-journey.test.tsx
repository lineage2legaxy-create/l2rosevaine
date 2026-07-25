import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import App from "@/app";
import { NAV_ITEMS } from "@/constants";

vi.stubGlobal(
  "fetch",
  vi.fn(() => new Promise(() => undefined)),
);

describe("editorial page journey", () => {
  it("exposes the approved semantic journey in document order", () => {
    const { container } = render(<App />);
    const main = container.querySelector("main#main-content");
    const ids = Array.from(main?.children ?? []).map((node) => node.id);

    expect(ids).toEqual(["hero", "world", "features", "codex", "events", "start"]);
    expect(screen.getByRole("link", { name: /saltar al contenido/i })).toHaveAttribute(
      "href",
      "#main-content",
    );
    expect(container.querySelector("section#events ol")).toBeInTheDocument();
    const eventItems = container.querySelectorAll("section#events ol > li[data-status]");
    expect(eventItems.length).toBeGreaterThan(0);
    eventItems.forEach((item) => {
      expect(item.querySelector("time")).toBeInTheDocument();
    });
    expect(container.querySelector("footer#community")).toBeInTheDocument();
  });

  it("keeps every navigation target real and unavailable actions disabled", () => {
    const { container } = render(<App />);

    for (const { href } of NAV_ITEMS) {
      expect(container.querySelector(href)).toBeInTheDocument();
    }

    const disabledActions = container.querySelectorAll('[aria-disabled="true"]');
    expect(disabledActions.length).toBeGreaterThanOrEqual(5);
    disabledActions.forEach((action) => expect(action).not.toHaveAttribute("href"));
  });

  it("keeps compact navigation and footer links at least 44 pixels tall", () => {
    render(<App />);

    const desktopNavLinks = screen
      .getAllByRole("link")
      .filter((link) => NAV_ITEMS.some(({ label }) => link.textContent === label))
      .filter((link) => link.closest(".lg\\:flex"));
    const attributionLink = screen.getByRole("link", {
      name: /créditos y atribuciones/i,
    });

    expect(desktopNavLinks).toHaveLength(NAV_ITEMS.length);
    [...desktopNavLinks, attributionLink].forEach((link) => {
      expect(link).toHaveClass("min-h-11", "inline-flex", "items-center");
    });
  });

  it("slices the icon atlas as its native four-by-three grid", () => {
    const { container } = render(<App />);
    const atlasCells = Array.from(
      container.querySelectorAll<HTMLElement>(
        '[style*="rose-vaine-icon-atlas.png"]',
      ),
    );

    expect(atlasCells.length).toBeGreaterThanOrEqual(8);
    atlasCells.forEach((cell) => {
      expect(cell.style.backgroundSize).toBe("400% 300%");
      expect(cell.style.backgroundSize).not.toBe("300% 200%");
    });
    expect(atlasCells.map((cell) => cell.style.backgroundPosition)).toEqual(
      expect.arrayContaining(["0% 0%", "33.333% 0%", "0% 50%"]),
    );
  });
});
