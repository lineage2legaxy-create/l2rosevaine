import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ServerStatus } from "@/components/server-status";
import { validateApiUrl } from "@/lib/api-url";

describe("ServerStatus", () => {
  afterEach(() => vi.restoreAllMocks());

  it("does not fetch and shows unavailable when the API URL is absent", () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    render(<ServerStatus apiUrl={null} />);
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(screen.getByText("No disponible")).toBeInTheDocument();
  });

  it("only accepts HTTPS publicly and localhost HTTP during development", () => {
    expect(validateApiUrl("https://api.example.com", false)).toBe("https://api.example.com");
    expect(validateApiUrl("http://localhost:8000", false)).toBeNull();
    expect(validateApiUrl("http://localhost:8000/", true)).toBe("http://localhost:8000");
    expect(validateApiUrl("javascript:alert(1)", true)).toBeNull();
  });

  it("shows unavailable when the configured request times out", async () => {
    vi.useFakeTimers();
    vi.spyOn(globalThis, "fetch").mockImplementation((_input, init) => new Promise((_resolve, reject) => {
      init?.signal?.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")));
    }));
    render(<ServerStatus apiUrl="https://api.example.com" />);
    await act(() => vi.advanceTimersByTimeAsync(5000));
    expect(screen.getByText("No disponible")).toBeInTheDocument();
    vi.useRealTimers();
  });
});
