import { describe, expect, it } from "vitest";

import { CTA_LINKS, NAV_ITEMS, SERVER_EVENTS } from "@/constants";

describe("public content integrity", () => {
  it("uses the approved public section anchors", () => {
    expect(NAV_ITEMS.map(({ href }) => href)).toEqual([
      "#hero",
      "#world",
      "#codex",
      "#events",
      "#start",
      "#community",
    ]);
  });

  it("does not invent download or account destinations", () => {
    expect(CTA_LINKS.download).toBeNull();
    expect(CTA_LINKS.account).toBeNull();
  });

  it("defines a status for every server event", () => {
    expect(SERVER_EVENTS.every(({ status }) => status !== undefined)).toBe(true);
  });
});
