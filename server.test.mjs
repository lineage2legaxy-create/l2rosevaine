import { describe, expect, it } from "vitest";
import { cacheControlFor, resolveRequestPath, securityHeaders } from "./server.mjs";

describe("production server helpers", () => {
  it("rejects path traversal", () => {
    expect(resolveRequestPath("/../package.json")).toBeNull();
    expect(resolveRequestPath("/%2e%2e/package.json")).toBeNull();
  });

  it("uses SPA fallback only for extensionless routes", () => {
    expect(resolveRequestPath("/codex")).toMatch(/dist[\\/]index\.html$/);
    expect(resolveRequestPath("/missing.js")).toMatch(/dist[\\/]missing\.js$/);
  });

  it("sets restrictive security and cache headers", () => {
    expect(securityHeaders["Content-Security-Policy"]).toContain("frame-ancestors 'none'");
    expect(securityHeaders["X-Content-Type-Options"]).toBe("nosniff");
    expect(cacheControlFor("index.html")).toBe("no-store");
    expect(cacheControlFor("assets/app-a1b2c3d4.js")).toContain("immutable");
  });
});
