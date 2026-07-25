# L2 Rose Vaine Lineage Identity Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Rose Vaine landing page as a cinematic, immediately recognizable Lineage II experience with original media, truthful content, accessible interactions and a production-ready Railway deployment.

**Architecture:** Keep the current React/Vite single-page architecture and server-content constants. Introduce one isolated cinematic media component, one accessible navigation component and focused editorial sections that consume typed content from `src/constants/index.ts`. Store all generated media locally under `public/media`, render static fallbacks for constrained users and keep GSAP limited to decorative section reveals.

**Tech Stack:** React 19, TypeScript 6, Vite 8, Tailwind CSS 4, GSAP, Vitest, Testing Library, FFmpeg, OpenAI ImageGen.

---

## File Structure

**Create**

- `public/media/rose-vaine-hero-master.png` — approved original siege/dark-elf key art.
- `public/media/rose-vaine-icon-atlas.png` — approved original 4×3 MMORPG icon atlas.
- `public/media/rose-vaine-hero-poster.webp` — optimized desktop poster.
- `public/media/rose-vaine-hero-mobile.webp` — portrait/static mobile fallback.
- `public/media/rose-vaine-hero-loop.mp4` — muted 16:9 hero loop.
- `public/media/rose-vaine-hero-loop.webm` — WebM hero loop.
- `public/media/ATTRIBUTIONS.md` — provenance for original generated media and retained stock assets.
- `src/components/chronicle-button.tsx` — semantic link/button with chronicle geometry.
- `src/components/lineage-mark.tsx` — original Rose Vaine/Lineage II fan-server wordmark treatment.
- `src/components/hero-media.tsx` — video, poster and reduced-motion/Save-Data fallback.
- `src/components/systems-codex.tsx` — icon-led editorial systems section.
- `src/components/enter-world.tsx` — three-step onboarding section.
- `src/components/__tests__/hero-media.test.tsx` — media fallback tests.
- `src/components/__tests__/navbar.test.tsx` — mobile navigation behavior tests.
- `src/components/__tests__/content-integrity.test.tsx` — truthful CTA and status-label tests.
- `src/test/setup.ts` — Testing Library DOM setup.

**Modify**

- `package.json` and `package-lock.json` — add test dependencies and scripts.
- `vite.config.ts` — add Vitest configuration.
- `src/app.tsx` — approved six-part page journey and skip link.
- `src/components/navbar.tsx` — accessible chronicle navigation.
- `src/components/hero.tsx` — new identity, real CTA states and media integration.
- `src/components/server-status.tsx` — compact HUD rail.
- `src/components/features.tsx` — dominant editorial PvP/siege scene.
- `src/components/events.tsx` — event chronicle timeline.
- `src/components/footer.tsx` — disclaimer, accessible social labels and real-link handling.
- `src/components/button.tsx` — remove pill-default presentation where still consumed.
- `src/constants/index.ts` — valid section anchors, CTA availability and corrected Spanish.
- `src/index.css` — new tokens, frames, focus states, motion and responsive behavior.
- `public/img/ATTRIBUTIONS.md` — mark superseded stock assets and retained usage.

## Task 1: Establish the Regression-Test Harness

**Files:**

- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `vite.config.ts`
- Create: `src/test/setup.ts`

- [ ] **Step 1: Add the test command before installing dependencies**

Add:

```json
"test": "vitest run",
"test:watch": "vitest"
```

to `package.json#scripts`.

- [ ] **Step 2: Run the missing test command and verify RED**

Run:

```powershell
npm test
```

Expected: FAIL because `vitest` is not installed.

- [ ] **Step 3: Install the minimal test stack**

Run:

```powershell
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

- [ ] **Step 4: Configure Vitest**

Add to `vite.config.ts`:

```ts
/// <reference types="vitest/config" />
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": "/src" } },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
  },
});
```

Create `src/test/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 5: Verify the empty harness**

Run:

```powershell
npm test -- --passWithNoTests
```

Expected: PASS with no test files.

- [ ] **Step 6: Commit**

```powershell
git add package.json package-lock.json vite.config.ts src/test/setup.ts
git commit -m "Add frontend regression test harness"
```

## Task 2: Import and Optimize Original Media

**Files:**

- Create: `public/media/rose-vaine-hero-master.png`
- Create: `public/media/rose-vaine-icon-atlas.png`
- Create: `public/media/rose-vaine-hero-poster.webp`
- Create: `public/media/rose-vaine-hero-mobile.webp`
- Create: `public/media/ATTRIBUTIONS.md`

- [ ] **Step 1: Copy the two approved ImageGen outputs**

Copy:

```text
C:\Users\Mi Pc\.codex\generated_images\019f9717-5cc4-7a20-8109-e393077f69e7\call_46jpIGlhNTpvcbupK7REZBZ5.png
→ public/media/rose-vaine-hero-master.png

C:\Users\Mi Pc\.codex\generated_images\019f9717-5cc4-7a20-8109-e393077f69e7\call_aEwfhdUJ4Q3O5S042r4nLoNI.png
→ public/media/rose-vaine-icon-atlas.png
```

- [ ] **Step 2: Produce responsive posters**

Run:

```powershell
ffmpeg -y -i public/media/rose-vaine-hero-master.png -vf "scale=1920:-2" -c:v libwebp -quality 84 public/media/rose-vaine-hero-poster.webp
ffmpeg -y -i public/media/rose-vaine-hero-master.png -vf "scale=-2:1200,crop=800:1200:in_w-850:0" -c:v libwebp -quality 82 public/media/rose-vaine-hero-mobile.webp
```

Expected: both WebP files exist and decode successfully.

- [ ] **Step 3: Record provenance**

Create `public/media/ATTRIBUTIONS.md` with:

```markdown
# Rose Vaine Media

- `rose-vaine-hero-master.png`: original OpenAI ImageGen artwork generated for L2 Rose Vaine on 2026-07-25.
- `rose-vaine-icon-atlas.png`: original OpenAI ImageGen artwork generated for L2 Rose Vaine on 2026-07-25.
- `rose-vaine-hero-poster.webp` and `rose-vaine-hero-mobile.webp`: local derivatives of the original hero artwork.
- No visual or video assets from L2Venus are included.
```

- [ ] **Step 4: Verify dimensions and size**

Run:

```powershell
ffprobe -v error -show_entries stream=width,height -of csv=s=x:p=0 public/media/rose-vaine-hero-poster.webp
ffprobe -v error -show_entries stream=width,height -of csv=s=x:p=0 public/media/rose-vaine-hero-mobile.webp
Get-ChildItem public/media | Select-Object Name,Length
```

Expected: desktop is 1920 pixels wide; mobile is 800×1200; each poster is below 1 MB.

- [ ] **Step 5: Commit**

```powershell
git add public/media
git commit -m "Add original Rose Vaine visual assets"
```

## Task 3: Compose the Original Hero Video

**Files:**

- Create: `public/media/rose-vaine-hero-loop.mp4`
- Create: `public/media/rose-vaine-hero-loop.webm`
- Modify: `public/media/ATTRIBUTIONS.md`

- [ ] **Step 1: Generate two supporting original frames with ImageGen**

Use the approved hero prompt, preserving the same castle, character, armor, color grade and left text-safe zone. Generate:

1. a wider siege establishing frame with embers and distant army;
2. a closer frame with violet blade energy and drifting smoke.

No text, logos, copied characters or third-party server assets.

- [ ] **Step 2: Verify visual continuity**

Inspect all three images side by side. Reject any frame that changes the character’s race, armor silhouette, weapon count, castle architecture or left text-safe zone.

- [ ] **Step 3: Build a 10-second MP4 cinemagraph**

Run FFmpeg with slow camera drift, crossfades and transform-only overlays:

```powershell
ffmpeg -y -loop 1 -t 4 -i public/media/rose-vaine-hero-wide.png -loop 1 -t 4 -i public/media/rose-vaine-hero-master.png -loop 1 -t 4 -i public/media/rose-vaine-hero-close.png -filter_complex "[0:v]scale=2200:1238,zoompan=z='min(zoom+0.0005,1.05)':d=120:s=1920x1080:fps=30[v0];[1:v]scale=2200:1238,zoompan=z='min(zoom+0.00035,1.04)':d=120:s=1920x1080:fps=30[v1];[2:v]scale=2200:1238,zoompan=z='min(zoom+0.00045,1.045)':d=120:s=1920x1080:fps=30[v2];[v0][v1]xfade=transition=fade:duration=1:offset=3[a];[a][v2]xfade=transition=fade:duration=1:offset=6[b];[b]trim=duration=10,format=yuv420p[out]" -map "[out]" -an -c:v libx264 -preset slow -crf 24 -movflags +faststart public/media/rose-vaine-hero-loop.mp4
```

- [ ] **Step 4: Encode WebM**

Run:

```powershell
ffmpeg -y -i public/media/rose-vaine-hero-loop.mp4 -an -c:v libvpx-vp9 -crf 34 -b:v 0 -row-mt 1 public/media/rose-vaine-hero-loop.webm
```

- [ ] **Step 5: Verify the deliverables**

Run:

```powershell
ffprobe -v error -show_entries format=duration,size -of json public/media/rose-vaine-hero-loop.mp4
ffprobe -v error -show_entries format=duration,size -of json public/media/rose-vaine-hero-loop.webm
```

Expected: duration 8–12 seconds, no audio stream, total preferred size 3–5 MB per file.

- [ ] **Step 6: Commit**

```powershell
git add public/media
git commit -m "Add original cinematic hero loop"
```

## Task 4: Define Truthful Navigation and CTA Content

**Files:**

- Modify: `src/constants/index.ts`
- Create: `src/components/__tests__/content-integrity.test.tsx`

- [ ] **Step 1: Write the failing integrity test**

Create:

```tsx
import { describe, expect, it } from "vitest";
import { CTA_LINKS, NAV_ITEMS, SERVER_EVENTS } from "@/constants";

describe("public content integrity", () => {
  it("uses only anchors that exist in the approved page journey", () => {
    expect(NAV_ITEMS.map((item) => item.href)).toEqual([
      "#hero",
      "#world",
      "#codex",
      "#events",
      "#start",
      "#community",
    ]);
  });

  it("does not invent unavailable CTA destinations", () => {
    expect(CTA_LINKS.download).toBeNull();
    expect(CTA_LINKS.account).toBeNull();
  });

  it("keeps all unconfirmed events visibly labelled", () => {
    expect(SERVER_EVENTS.every((event) => event.status !== undefined)).toBe(true);
  });
});
```

- [ ] **Step 2: Run the test and verify RED**

Run:

```powershell
npm test -- src/components/__tests__/content-integrity.test.tsx
```

Expected: FAIL because `CTA_LINKS` and the approved anchors do not exist.

- [ ] **Step 3: Implement the typed public navigation**

Update `src/constants/index.ts`:

```ts
export const NAV_ITEMS = [
  { label: "Inicio", href: "#hero" },
  { label: "El mundo", href: "#world" },
  { label: "Códice", href: "#codex" },
  { label: "Eventos", href: "#events" },
  { label: "Comenzar", href: "#start" },
  { label: "Comunidad", href: "#community" },
] as const;

export const CTA_LINKS = {
  download: null,
  account: null,
  discord: null,
} as const;
```

Correct visible mojibake and missing Spanish accents in the same file without changing server facts.

- [ ] **Step 4: Verify GREEN**

Run:

```powershell
npm test -- src/components/__tests__/content-integrity.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit**

```powershell
git add src/constants/index.ts src/components/__tests__/content-integrity.test.tsx
git commit -m "Define truthful public navigation"
```

## Task 5: Build the Chronicle Primitives and Hero Media

**Files:**

- Create: `src/components/chronicle-button.tsx`
- Create: `src/components/lineage-mark.tsx`
- Create: `src/components/hero-media.tsx`
- Create: `src/components/__tests__/hero-media.test.tsx`

- [ ] **Step 1: Write the failing fallback test**

Create:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HeroMedia } from "@/components/hero-media";

describe("HeroMedia", () => {
  it("renders a local poster and both video formats", () => {
    render(<HeroMedia />);
    const video = screen.getByLabelText("Escena cinematográfica de Rose Vaine");
    expect(video).toHaveAttribute("poster", "/media/rose-vaine-hero-poster.webp");
    expect(video.querySelectorAll("source")).toHaveLength(2);
  });

  it("falls back to the static composition when reduced motion is active", () => {
    vi.stubGlobal("matchMedia", vi.fn().mockReturnValue({ matches: true }));
    render(<HeroMedia />);
    expect(screen.getByTestId("hero-static-fallback")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run and verify RED**

Run:

```powershell
npm test -- src/components/__tests__/hero-media.test.tsx
```

Expected: FAIL because `HeroMedia` does not exist.

- [ ] **Step 3: Implement `HeroMedia`**

Implement a component that:

- reads `matchMedia("(prefers-reduced-motion: reduce)")`;
- checks `(navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData`;
- renders `/media/rose-vaine-hero-mobile.webp` as the static mobile source;
- otherwise renders muted, auto-playing, looping, `playsInline` video with WebM then MP4 sources;
- includes a decorative static `<img alt="" data-testid="hero-static-fallback">` fallback;
- never blocks headline rendering.

- [ ] **Step 4: Implement `ChronicleButton` and `LineageMark`**

`ChronicleButton` accepts:

```ts
interface ChronicleButtonProps {
  href: string | null;
  children: React.ReactNode;
  variant?: "gold" | "violet";
  ariaLabel?: string;
}
```

When `href` is `null`, render a disabled `<span aria-disabled="true">` with `Próximamente`; otherwise render an `<a>`.

`LineageMark` renders text, CSS geometry and an original rune; it does not embed the official Lineage II logo.

- [ ] **Step 5: Verify GREEN**

Run:

```powershell
npm test -- src/components/__tests__/hero-media.test.tsx
npm run lint
```

Expected: PASS with no lint errors.

- [ ] **Step 6: Commit**

```powershell
git add src/components/chronicle-button.tsx src/components/lineage-mark.tsx src/components/hero-media.tsx src/components/__tests__/hero-media.test.tsx
git commit -m "Add cinematic hero primitives"
```

## Task 6: Rebuild Hero and Accessible Navigation

**Files:**

- Modify: `src/components/hero.tsx`
- Modify: `src/components/navbar.tsx`
- Create: `src/components/__tests__/navbar.test.tsx`

- [ ] **Step 1: Write the failing mobile-menu test**

Create:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Navbar } from "@/components/navbar";

describe("Navbar", () => {
  it("opens, closes with Escape and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const trigger = screen.getByRole("button", { name: "Abrir menú" });
    await user.click(trigger);
    expect(screen.getByRole("dialog", { name: "Navegación principal" })).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
```

- [ ] **Step 2: Run and verify RED**

Run:

```powershell
npm test -- src/components/__tests__/navbar.test.tsx
```

Expected: FAIL because the current menu has no dialog/focus-return behavior.

- [ ] **Step 3: Rebuild `Navbar`**

Implement:

- original `LineageMark`;
- approved six navigation anchors;
- 44×44 menu trigger;
- `role="dialog"` and `aria-modal="true"` mobile panel;
- initial focus on the first menu link;
- Escape and outside-click dismissal;
- body scroll lock while open;
- focus return to trigger;
- chronicle-shaped account CTA with truthful disabled state.

- [ ] **Step 4: Rebuild `Hero`**

Replace the stock image and scroll clip-path with:

- `HeroMedia`;
- `LineageMark`;
- `Interlude Custom`;
- headline `Forjá tu leyenda entre clanes, castillos y guerra.`;
- concise nostalgia copy;
- download/account `ChronicleButton` instances;
- a local-only decorative ember layer;
- no `w-screen`, `h-dvh` cropping animation or generic radial purple gradient.

- [ ] **Step 5: Verify GREEN**

Run:

```powershell
npm test -- src/components/__tests__/navbar.test.tsx
npm run lint
```

Expected: PASS.

- [ ] **Step 6: Commit**

```powershell
git add src/components/navbar.tsx src/components/hero.tsx src/components/__tests__/navbar.test.tsx
git commit -m "Rebuild hero and accessible navigation"
```

## Task 7: Build the Approved Editorial Page Journey

**Files:**

- Modify: `src/app.tsx`
- Modify: `src/components/server-status.tsx`
- Modify: `src/components/features.tsx`
- Create: `src/components/systems-codex.tsx`
- Modify: `src/components/events.tsx`
- Create: `src/components/enter-world.tsx`
- Modify: `src/components/footer.tsx`

- [ ] **Step 1: Update the application composition**

Use this semantic order in `src/app.tsx`:

```tsx
<>
  <a className="skip-link" href="#main-content">Saltar al contenido</a>
  <Navbar />
  <main id="main-content">
    <Hero />
    <ServerStatus />
    <Features />
    <SystemsCodex />
    <Events />
    <EnterWorld />
  </main>
  <Footer />
</>
```

Remove `WorldSection` and `Rates` from the rendered journey; their confirmed content is consolidated into the status rail and codex.

- [ ] **Step 2: Rebuild the status rail**

Set `id="world"` and render:

- online/offline state;
- `SERVER_INFO.chronicle`;
- `XP x15 · SP x15`;
- next confirmed event derived from `SERVER_EVENTS.find(event => event.status === "activo")`.

Keep text labels alongside every status color.

- [ ] **Step 3: Rebuild `Features`**

Use one dominant siege scene and one PvP narrative split. Replace generic React icons with cropped cells from the local icon atlas. Keep claims limited to confirmed server content.

- [ ] **Step 4: Implement `SystemsCodex`**

Set `id="codex"`. Render six priority systems from `SERVER_SYSTEMS` with:

- atlas icon cell;
- system title;
- concise body;
- `En revisión` badge when `runtimeVerified` is false.

Expose the remaining systems through a semantic disclosure element rather than another equal-card wall.

- [ ] **Step 5: Rebuild `Events`**

Render `SERVER_EVENTS` as an ordered timeline:

```tsx
<ol className="event-chronicle">
  {SERVER_EVENTS.map((event) => (
    <li key={event.name} data-status={event.status}>
      <time>{STATUS_LABEL[event.status]}</time>
      <h3>{event.name}</h3>
      <p>{event.note}</p>
    </li>
  ))}
</ol>
```

- [ ] **Step 6: Implement `EnterWorld`**

Set `id="start"` and render three steps: account, launcher and community. Use `ChronicleButton`; null URLs remain visibly disabled.

- [ ] **Step 7: Rebuild `Footer`**

Set `id="community"`. Add:

- accessible `aria-label` to social links;
- fan-server disclaimer;
- link to `/media/ATTRIBUTIONS.md`;
- no generic Discord/YouTube destinations when real destinations are unavailable.

- [ ] **Step 8: Run component and content tests**

Run:

```powershell
npm test
npm run lint
```

Expected: all tests pass and lint is clean.

- [ ] **Step 9: Commit**

```powershell
git add src/app.tsx src/components src/constants/index.ts
git commit -m "Build Lineage II editorial page journey"
```

## Task 8: Apply the Production Visual System

**Files:**

- Modify: `src/index.css`
- Modify: `src/components/button.tsx`

- [ ] **Step 1: Replace the generic tokens**

Set:

```css
:root {
  --color-obsidian: #070707;
  --color-obsidian-soft: #0d0b0a;
  --color-surface: #171310;
  --color-steel: #8c867d;
  --color-ivory: #f0e9dc;
  --color-ivory-muted: #b7ada0;
  --color-parchment: #c6a76f;
  --color-violet: #9e62bf;
  --color-online-green: #85bd79;
  --color-alert-red: #d56b63;
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-quart: cubic-bezier(0.23, 1, 0.32, 1);
}
```

- [ ] **Step 2: Add game-native primitives**

Add focused classes for:

- `.chronicle-frame`;
- `.chronicle-button`;
- `.lineage-rune`;
- `.hud-rail`;
- `.inventory-icon`;
- `.event-chronicle`;
- `.skip-link`;
- visible `:focus-visible`.

Use clipped corners, engraved borders and solid dark surfaces. Do not add glassmorphism or blue-to-purple gradients.

- [ ] **Step 3: Add motion safeguards**

Use transform/opacity only, 150–300 ms UI transitions and the existing reduced-motion media query. Gate hover effects:

```css
@media (hover: hover) and (pointer: fine) {
  .inventory-icon:hover {
    transform: translateY(-3px);
  }
}
```

- [ ] **Step 4: Add responsive rules**

Explicitly cover:

- 375: static hero, stacked copy, 44-pixel targets, two-column HUD;
- 768: split editorial sections without overflow;
- 1280: full cinematic composition and constrained reading width.

Replace `body { width: 100dvw; }` with:

```css
html, body, #root {
  min-width: 320px;
  min-height: 100%;
}

body {
  overflow-x: clip;
}
```

- [ ] **Step 5: Verify**

Run:

```powershell
npm run lint
npm run build
```

Expected: PASS.

- [ ] **Step 6: Commit**

```powershell
git add src/index.css src/components/button.tsx
git commit -m "Apply Lineage II visual system"
```

## Task 9: Visual, Accessibility and Live Verification

**Files:**

- Modify only files implicated by verified defects.

- [ ] **Step 1: Run clean local checks**

Run:

```powershell
npm ci
npm test
npm run lint
npm run build
```

Expected: every command exits 0.

- [ ] **Step 2: Run responsive browser checks**

Check 375×812, 768×1024 and 1280×800:

- no horizontal overflow;
- hero copy remains readable;
- character and castle remain visible;
- mobile navigation traps/returns focus;
- all targets are at least 44×44;
- status rail and timeline do not clip;
- reduced-motion uses a static image.

- [ ] **Step 3: Run contrast checks**

Verify normal text at ≥4.5:1 and large text at ≥3:1. Fix failing alpha colors at token level, not per component.

- [ ] **Step 4: Check media delivery**

Verify:

- MP4/WebM return HTTP 200 locally;
- poster appears before video;
- no audio stream;
- no third-party media request;
- no asset exceeds the approved size budget.

- [ ] **Step 5: Run a security/content scan**

Run:

```powershell
rg -n --hidden -g '!node_modules/**' -g '!dist/**' -g '!.git/**' "(?i)(api[_-]?key|secret[_-]?key|access[_-]?token|private[_-]?key|password\\s*[:=])" .
rg -n "l2venus\\.com|discord\\.com\"|youtube\\.com\"" src public
```

Expected: no secrets, no L2Venus assets and no generic social destinations.

- [ ] **Step 6: Push and verify Railway**

Run:

```powershell
git push origin main
```

Wait for Railway deployment `SUCCESS`, then verify:

```powershell
Invoke-WebRequest https://l2rosevaine-web-production.up.railway.app -UseBasicParsing
```

Expected: HTTP 200 and HTML title `Rose Vaine - Interlude Custom en Español`.

- [ ] **Step 7: Commit any verification-only fixes and push**

```powershell
git status --short
git add -u
git commit -m "Polish responsive and accessibility details"
git push origin main
```

Do not create an empty commit when no fixes were needed.
