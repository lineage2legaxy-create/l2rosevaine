import { describe, expect, it } from "vitest";
import { cacheControlFor, resolveRequestPath, securityHeaders, statFile } from "./server.mjs";

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

  it("maps missing files to 404 and other filesystem errors to 500", async () => {
    const missing = Object.assign(new Error("gone"), { code: "ENOENT" });
    const denied = Object.assign(new Error("denied"), { code: "EACCES" });
    await expect(statFile("missing", async () => { throw missing; })).resolves.toEqual({ status: 404 });
    await expect(statFile("denied", async () => { throw denied; })).resolves.toEqual({ status: 500 });
  });
});
