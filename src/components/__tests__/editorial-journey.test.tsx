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
});
