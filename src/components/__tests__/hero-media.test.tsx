import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ChronicleButton } from "@/components/chronicle-button";
import { HeroMedia } from "@/components/hero-media";

function setReducedMotion(matches: boolean) {
  let currentMatches = matches;
  const listeners = new Set<(event: MediaQueryListEvent) => void>();
  const mediaQuery = {
    get matches() {
      return currentMatches;
    },
    media: "(prefers-reduced-motion: reduce)",
    onchange: null,
    addEventListener: vi.fn(
      (_type: string, listener: (event: MediaQueryListEvent) => void) => {
        listeners.add(listener);
      }
    ),
    removeEventListener: vi.fn(
      (_type: string, listener: (event: MediaQueryListEvent) => void) => {
        listeners.delete(listener);
      }
    ),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  };

  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: vi.fn().mockReturnValue(mediaQuery),
  });

  return {
    mediaQuery,
    change(nextMatches: boolean) {
      currentMatches = nextMatches;
      const event = { matches: nextMatches } as MediaQueryListEvent;
      listeners.forEach((listener) => listener(event));
    },
  };
}

function setSaveData(saveData: boolean) {
  Object.defineProperty(navigator, "connection", {
    configurable: true,
    value: { saveData },
  });
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  setReducedMotion(false);
  setSaveData(false);
});

describe("HeroMedia", () => {
  it("renders the local cinematic video with poster and both source formats", () => {
    setReducedMotion(false);
    setSaveData(false);

    render(<HeroMedia />);

    const video = screen.getByLabelText<HTMLVideoElement>(
      "Escena cinematográfica de Rose Vaine"
    );
    expect(video).toHaveAttribute(
      "poster",
      "/media/rose-vaine-hero-poster.webp"
    );
    expect(video).toHaveAttribute("preload", "metadata");
    expect(video.muted).toBe(true);
    expect(video).toHaveAttribute("autoplay");
    expect(video).toHaveAttribute("loop");
    expect(video).toHaveAttribute("playsinline");

    const sources = Array.from(video.querySelectorAll("source"));
    expect(sources.map(({ src }) => new URL(src).pathname)).toEqual([
      "/media/rose-vaine-hero-loop.webm",
      "/media/rose-vaine-hero-loop.mp4",
    ]);
    expect(sources.map(({ type }) => type)).toEqual([
      "video/webm",
      "video/mp4",
    ]);
  });

  it("lets visitors pause and resume the autoplay scene", async () => {
    const pause = vi
      .spyOn(HTMLMediaElement.prototype, "pause")
      .mockImplementation(() => undefined);
    const play = vi
      .spyOn(HTMLMediaElement.prototype, "play")
      .mockResolvedValue(undefined);

    render(<HeroMedia />);

    fireEvent.click(screen.getByRole("button", { name: "Pausar escena" }));
    expect(pause).toHaveBeenCalledOnce();
    expect(
      screen.getByRole("button", { name: "Reproducir escena" })
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Reproducir escena" }));
    await waitFor(() => expect(play).toHaveBeenCalledOnce());
    expect(
      screen.getByRole("button", { name: "Pausar escena" })
    ).toBeInTheDocument();
  });

  it("switches to static media when reduced motion changes and cleans up", () => {
    const reducedMotion = setReducedMotion(false);
    const pause = vi
      .spyOn(HTMLMediaElement.prototype, "pause")
      .mockImplementation(() => undefined);
    const { unmount } = render(<HeroMedia />);

    expect(reducedMotion.mediaQuery.addEventListener).toHaveBeenCalledOnce();

    act(() => reducedMotion.change(true));

    expect(pause).toHaveBeenCalledOnce();
    expect(screen.getByTestId("hero-static-fallback")).toBeInTheDocument();
    expect(screen.queryByRole("button")).toBeNull();

    unmount();
    expect(reducedMotion.mediaQuery.removeEventListener).toHaveBeenCalledOnce();
  });

  it("uses the static mobile image when reduced motion is requested", () => {
    setReducedMotion(true);

    render(<HeroMedia />);

    expect(
      screen.queryByLabelText("Escena cinematográfica de Rose Vaine")
    ).toBeNull();
    expect(screen.getByTestId("hero-static-fallback")).toHaveAttribute(
      "src",
      "/media/rose-vaine-hero-mobile.webp"
    );
  });

  it("uses the static mobile image when Save-Data is enabled", () => {
    setSaveData(true);

    render(<HeroMedia />);

    expect(
      screen.queryByLabelText("Escena cinematográfica de Rose Vaine")
    ).toBeNull();
    expect(screen.getByTestId("hero-static-fallback")).toHaveAttribute(
      "src",
      "/media/rose-vaine-hero-mobile.webp"
    );
  });
});

describe("ChronicleButton", () => {
  it("renders a real link when a destination exists", () => {
    render(
      <ChronicleButton
        href="/download"
        variant="gold"
        ariaLabel="Descargar launcher"
      >
        Descargar launcher
      </ChronicleButton>
    );

    expect(
      screen.getByRole("link", { name: "Descargar launcher" })
    ).toHaveAttribute("href", "/download");
  });

  it("renders one noninteractive disabled state for a missing destination", () => {
    render(
      <ChronicleButton href={null} variant="violet" ariaLabel="Crear cuenta">
        Crear cuenta
      </ChronicleButton>
    );

    const disabled = screen
      .getByText(/Crear cuenta/)
      .closest("[aria-disabled]");
    expect(disabled).toHaveAttribute("aria-disabled", "true");
    expect(disabled).toHaveTextContent("Próximamente");
    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("defaults to gold and omits aria-label when optional props are absent", () => {
    const { rerender } = render(
      <ChronicleButton href="/download">Descargar</ChronicleButton>
    );

    const link = screen.getByRole("link", { name: "Descargar" });
    expect(link).toHaveClass("border-[#bba269]");
    expect(link).not.toHaveAttribute("aria-label");

    rerender(<ChronicleButton href={null}>Crear cuenta</ChronicleButton>);

    const disabled = screen
      .getByText(/Crear cuenta/)
      .closest("[aria-disabled]");
    expect(disabled).toHaveClass("border-[#bba269]");
    expect(disabled).not.toHaveAttribute("aria-label");
  });
});
