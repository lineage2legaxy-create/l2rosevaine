import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import { Navbar } from "@/components/navbar";
import { NAV_ITEMS } from "@/constants";

function mockDesktopBreakpoint() {
  const listeners = new Set<(event: MediaQueryListEvent) => void>();
  const mediaQuery = {
    matches: false,
    media: "(min-width: 1024px)",
    onchange: null,
    addEventListener: (
      _type: string,
      listener: (event: MediaQueryListEvent) => void
    ) => listeners.add(listener),
    removeEventListener: (
      _type: string,
      listener: (event: MediaQueryListEvent) => void
    ) => listeners.delete(listener),
    addListener: () => undefined,
    removeListener: () => undefined,
    dispatchEvent: () => true,
  };
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: () => mediaQuery,
  });
  return {
    change(matches: boolean) {
      mediaQuery.matches = matches;
      listeners.forEach((listener) =>
        listener({ matches } as MediaQueryListEvent)
      );
    },
  };
}

afterEach(() => {
  cleanup();
  document.body.style.overflow = "";
});

describe("Navbar mobile menu", () => {
  it("opens as a modal dialog, focuses the first link, and restores trigger focus on Escape", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const trigger = screen.getByRole("button", { name: "Abrir menú" });
    await user.click(trigger);

    const dialog = screen.getByRole("dialog", { name: "Navegación principal" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(
      within(dialog).getByRole("link", { name: NAV_ITEMS[0].label })
    ).toHaveFocus();
    expect(document.body.style.overflow).toBe("hidden");

    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await waitFor(() => expect(trigger).toHaveFocus());
    expect(document.body.style.overflow).toBe("");
  });

  it("closes on outside click and restores focus", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const trigger = screen.getByRole("button", { name: "Abrir menú" });
    await user.click(trigger);
    fireEvent.pointerDown(document.body);

    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    );
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it("closes when a navigation destination is selected", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    await user.click(screen.getByRole("button", { name: "Abrir menú" }));
    const dialog = screen.getByRole("dialog");
    await user.click(
      within(dialog).getByRole("link", { name: NAV_ITEMS[1].label })
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shows the truthful disabled account action", async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    await user.click(screen.getByRole("button", { name: "Abrir menú" }));

    const dialog = screen.getByRole("dialog");
    const account = within(dialog)
      .getByText(/Crear cuenta/)
      .closest("[aria-disabled]");
    expect(account).toHaveAttribute("aria-disabled", "true");
    expect(account).toHaveTextContent("Próximamente");
  });

  it("traps Tab and Shift+Tab focus inside the open dialog", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(screen.getByRole("button", { name: "Abrir menú" }));

    const dialog = screen.getByRole("dialog");
    const links = within(dialog).getAllByRole("link");
    expect(links[0]).toHaveFocus();

    await user.keyboard("{Shift>}{Tab}{/Shift}");
    expect(links[links.length - 1]).toHaveFocus();

    await user.keyboard("{Tab}");
    expect(links[0]).toHaveFocus();
  });

  it("closes and releases body scroll when the desktop breakpoint activates", async () => {
    const breakpoint = mockDesktopBreakpoint();
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(screen.getByRole("button", { name: "Abrir menú" }));
    expect(document.body.style.overflow).toBe("hidden");

    breakpoint.change(true);

    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    );
    expect(document.body.style.overflow).toBe("");
  });
});
