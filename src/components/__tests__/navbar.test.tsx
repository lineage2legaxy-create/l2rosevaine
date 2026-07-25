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
});
