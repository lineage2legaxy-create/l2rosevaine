# L2 Rose Vaine — Lineage II Identity Redesign

## Objective

Redesign the public landing page so it is immediately recognizable as a Lineage II private-server experience, while giving Rose Vaine an original chronicle identity. The result must feel cinematic and game-native rather than like a generic dark fantasy or SaaS landing page.

The live site remains a single React/Vite landing page deployed from `main` to Railway.

## Approved Direction

The approved identity is **Lineage II first, Rose Vaine second**:

- early-2000s Korean MMORPG visual language;
- dark elf, castle siege, clans, races, weapons, soulshots and raid imagery;
- obsidian, weathered silver, parchment ivory and ember tones;
- restrained violet as the Rose Vaine signature;
- engraved frames, inventory/skill icon treatments and chronicle-shaped buttons;
- Cinzel and Manrope retained unless visual QA proves a targeted replacement is necessary.

L2Venus is only a reference for cinematic pacing, immediate nostalgia and direct onboarding. No L2Venus code, wording, video, logo or media will be copied.

## Page Journey

### 1. Cinematic hero

- Original 8–12 second silent 16:9 loop.
- Castle siege environment with an original dark-elf spellblade, army silhouettes, fire, smoke and arcane particles.
- Left text-safe zone for the Rose Vaine wordmark, `Interlude Custom`, one concise promise and two real actions.
- Primary action: download launcher.
- Secondary action: explore the server or create an account, depending on which real destination exists at implementation time.
- Autoplay, muted, loop and `playsInline`.
- Poster image displayed immediately.
- Static/mobile fallback for reduced motion, Save-Data and constrained devices.

### 2. World status rail

- Server status, chronicle, confirmed rates and next confirmed event.
- Styled as a compact Lineage II HUD rail.
- No invented player counts, dates or availability.
- Existing status failure states remain explicit.

### 3. Systems codex

- Replace the long equal-card wall with one dominant editorial scene and a compact icon-led codex.
- Prioritize PvP, castle sieges, clans, Olympiad, raids and the actual server systems already present in generated content.
- Iconography follows classic skill/inventory framing without copying another server.
- Unsupported or unconfirmed systems remain labeled `En revisión` or `Próximamente`.

### 4. Event chronicle

- Timeline rather than a repeated card grid.
- Confirmed events receive dates/status.
- Unconfirmed events remain visually secondary and clearly labeled.
- Clan shields, scroll and heraldic details provide game identity.

### 5. Enter the world

Three explicit steps:

1. Create account.
2. Download launcher/client.
3. Enter the server and community.

All actions must use real URLs. Unavailable destinations render as disabled `Próximamente` states rather than inert links.

### 6. Footer

- Rose Vaine emblem and concise Lineage II fan-server positioning.
- Real community/support links only.
- Accessible labels for icon-only links.
- Visual attribution and fan-project disclaimer.

## Original Visual Assets

Initial approved exploration assets:

- original cinematic siege/dark-elf hero key art;
- original 4×3 MMORPG inventory/skill icon sheet.

Production work will:

- move selected originals into `public/media`;
- create optimized AVIF/WebP posters and responsive crops;
- produce additional original layers or stills needed for the video loop;
- create an original Rose Vaine crest/wordmark treatment;
- maintain `public/media/ATTRIBUTIONS.md`;
- avoid scraped artwork and media from L2Venus.

The video will be composed from original generated art/layers with controlled camera drift, embers, smoke, light pulses and parallax. Deliverables:

- desktop MP4/WebM loop, 1920×1080, 8–12 seconds, target 3–5 MB;
- desktop poster WebP/AVIF;
- portrait/static mobile crop;
- reduced-motion static fallback.

## Motion

- One high-impact hero sequence and restrained section reveals.
- UI transitions use `ease-out` quart/expo curves.
- No bounce or elastic motion.
- Animate transform and opacity wherever possible.
- Respect `prefers-reduced-motion`.
- No motion may delay navigation or core actions.

## Responsive Behavior

Verify at 375, 768 and 1280 pixels:

- mobile hero keeps the character visible without sacrificing headline contrast;
- navigation becomes an accessible dialog/menu with focus management, outside-click dismissal, body scroll lock and focus return;
- interactive targets are at least 44×44 pixels;
- status rail becomes a stable two-column or stacked layout;
- codex and timeline avoid tiny text and horizontal overflow;
- no `w-screen`/scrollbar jitter;
- mobile uses the static hero fallback unless performance measurements support video.

## Accessibility

- WCAG AA contrast of at least 4.5:1 for normal text.
- Visible `:focus-visible` states.
- Skip link and semantic heading order.
- Meaningful alternative text for informative imagery.
- Empty alternative text for decorative imagery.
- Status meaning never relies on color alone.
- Buttons and links use correct semantics and real destinations.
- Dark mode is the only theme but must still pass contrast checks.

## Content Rules

- Preserve the truthful generated server profile, rates, features and events.
- Correct mojibake and Spanish accents.
- Do not invent launch dates, player counts, rewards, downloads, account systems or server features.
- Marketing copy may be evocative but cannot make unsupported gameplay claims.

## Technical Boundaries

- Keep React 19, Vite 8, TypeScript, Tailwind 4 and GSAP.
- Reuse existing component boundaries where practical.
- New media behavior is isolated in a dedicated hero/media component.
- Avoid adding a heavy UI framework.
- Keep assets local and versioned; do not depend on third-party hotlinks.
- Preserve the Railway static-site deployment path.

## Verification

Before release:

- `npm ci`
- `npm run lint`
- `npm run build`
- desktop/mobile visual checks at 375, 768 and 1280
- reduced-motion and keyboard checks
- WCAG AA contrast checks
- media size and loading checks
- live Railway HTTP 200 verification
- representative CTA destination verification
- confirmation that no secrets or unlicensed third-party media were introduced

## Out of Scope

- Building account, launcher, rankings or backend systems that do not exist.
- Copying another private server’s site or assets.
- Adding databases or paid services.
- Publishing fabricated gameplay footage or claims.
