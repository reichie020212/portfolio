# Portfolio — Claude Code Handoff Prompt

Copy everything below this line and paste it into Claude Code.

---

## Task

Take the attached single-file design prototype `Portfolio.html` and turn it into a **production-ready, deployable personal portfolio site** for **Redick "Red" Butay** (Software Developer). Keep the design identical — this is a fidelity-preserving port, not a redesign.

## Source of truth

- `Portfolio.html` — the approved design prototype. Every visual decision in this file (colors, type, spacing, section structure, the interactive terminal, theme toggle, tweaks panel) is intentional. **Do not change the look.**
- Read it top-to-bottom before writing any code. The CSS is split into clearly-labelled `<style>` blocks per section; the JS at the bottom implements the terminal, theme toggle, and tweaks protocol.

## Stack I want

- **Next.js 15 (App Router) + TypeScript**
- **Tailwind CSS v4** with a design-token layer mirroring the CSS custom properties from the prototype (`--bg`, `--fg`, `--accent`, etc.) — wire them via `@theme` so Tailwind classes can reference them.
- **next/font** for the two Google Fonts (`JetBrains Mono` 300–700, `Inter` 400–600). No CDN links in production.
- **Zero runtime dependencies** beyond React/Next. No UI libraries, no animation libs — the prototype uses plain CSS + vanilla JS and that's enough.
- **Static export target** (`output: "export"`) so it can be dropped on any static host or on my homelab behind Caddy.

## Project structure

```
src/
  app/
    layout.tsx            # fonts, <html data-theme>, metadata, theme-bootstrap inline script
    page.tsx              # composes the sections in order
    globals.css           # @theme tokens + base styles ported from prototype
  components/
    TopBar.tsx
    Hero.tsx
    Terminal.tsx          # client component — full terminal logic
    About.tsx
    Timeline.tsx
    Stack.tsx
    Projects.tsx
    OpenSource.tsx
    Homelab.tsx
    Now.tsx
    Blog.tsx
    Contact.tsx
    Footer.tsx
    ThemeToggle.tsx       # client — reads/writes localStorage, updates data-theme
    TweaksPanel.tsx       # client — listens for __activate_edit_mode / __deactivate_edit_mode
  lib/
    content.ts            # typed content objects: projects[], timeline[], stack[], services[], posts[], nowItems[]
    commands.ts           # terminal command map, pure functions returning string[] (HTML allowed)
    theme.ts              # applyTheme(), readTheme(), THEME_STORAGE_KEY
  types/
    content.ts
public/
  (empty for now — I'll drop real project screenshots here later)
```

## Porting rules

1. **Pixel parity.** Ported pages must look identical to the prototype in both dark and light mode at widths 1440, 1024, 768, 375. If Tailwind can't express something cleanly, use a `globals.css` rule — don't change the design to fit the tool.
2. **All content goes in `lib/content.ts`** as typed arrays/objects. The JSX files should read like layout only — no hard-coded project names, no inline service lists. Use the data in the prototype verbatim for now (Hospital MS, School MS, TypingSpeed, StoryTelling, etc.).
3. **Terminal behaviour is sacred.** Keep: boot sequence, `help` / `about` / `projects` / `oss` / `stack` / `homelab` / `now` / `blog` / `contact` / `theme` / `clear` / `ls` / `whoami` / `pwd` / `date` / `sudo` / `exit` commands, ↑/↓ history, Tab completion, the `/` global shortcut to focus the input, and the "scroll to section" side-effect of content commands. Commands that emit HTML (like the OSS list) must keep their formatting.
4. **Theme toggle** must:
   - Read from `localStorage["rb.theme"]` on mount, falling back to `"dark"`.
   - Write back on every change.
   - Set `document.documentElement.dataset.theme`.
   - Be triggered by the top-bar button, the `T` keyboard shortcut, the `theme` terminal command, and the Tweaks panel buttons.
   - Include a tiny **inline script in `<head>`** (via `next/script strategy="beforeInteractive"` or raw `<script dangerouslySetInnerHTML>`) that sets `data-theme` **before first paint** to prevent a flash.
5. **Tweaks panel protocol** — keep it intact. The component listens for `__activate_edit_mode` / `__deactivate_edit_mode` messages and posts `__edit_mode_available` on mount and `__edit_mode_set_keys` on change. Wrap it in `"use client"` and a `typeof window !== "undefined"` guard.
6. **Accessibility pass while you're in there** (these are upgrades, not redesigns):
   - Real semantic landmarks (`<header>`, `<main>`, `<nav>`, `<footer>`, `<section aria-labelledby>`).
   - `prefers-reduced-motion` — disable the caret blink and the "building" pulse.
   - Focus styles on every interactive element (use `--accent` outline).
   - `aria-live="polite"` on the terminal output region.
   - Alt text / aria-labels on the avatar placeholder and project thumbnails.
7. **Metadata + SEO**:
   - `<title>` = `Redick Butay — Software Developer`
   - Meta description pulled from the hero sub-copy.
   - Open Graph + Twitter card image — generate with `opengraph-image.tsx` using the same terminal look (big `red@homelab:~$ whoami` headline on `--bg`).
   - `robots.txt`, `sitemap.xml` via Next's built-in file conventions.
   - JSON-LD `Person` schema with name, url, sameAs (github, linkedin), jobTitle.
8. **Performance**:
   - Lighthouse mobile ≥ 95 on Performance, Accessibility, Best Practices, SEO.
   - No layout shift on font load (next/font handles this — verify).
   - Terminal component should be a client boundary; everything else server-rendered.

## Contact info (hard-coded, don't invent more)

- Email: `redickbutay02@gmail.com`
- GitHub: `https://github.com/reichie020212`
- LinkedIn: `https://www.linkedin.com/in/redick-butay-705616139/`

## Open-source links (already in prototype — keep as external links)

- `https://github.com/OpenSPP`
- `https://github.com/OpenG2P/openg2p-program`

## What to leave as placeholders

- Avatar image (keep the striped placeholder component; I'll wire a real photo later).
- Project thumbnails (keep the glyph + diagonal-stripe placeholders).
- Blog post routes — the post cards should link to `#` for now; don't scaffold a CMS.
- Homelab gauges / uptime numbers — keep the prototype's static values; a future task will wire real data.

## Definition of done

- [ ] `pnpm dev` runs cleanly with zero console errors or warnings.
- [ ] `pnpm build` produces a working static export in `out/`.
- [ ] Both themes look identical to the prototype at 1440, 1024, 768, 375.
- [ ] Every terminal command from the prototype still works, including Tab completion and ↑/↓ history.
- [ ] `/` focuses the terminal, `T` toggles theme, both still work.
- [ ] No flash-of-wrong-theme on reload.
- [ ] Tweaks panel appears when host sends `__activate_edit_mode` and persists choice.
- [ ] Lighthouse mobile ≥ 95 across all four categories.
- [ ] README.md at project root explains: install, dev, build, deploy-to-static-host, and where to drop real photos.

## Working style

- Start by reading `Portfolio.html` in full and summarising the design tokens and component boundaries you plan to extract. Wait for me to confirm before scaffolding.
- Commit in logical chunks (scaffold → tokens + layout → static sections → terminal → theme + tweaks → a11y + SEO → perf pass).
- If anything in the prototype is ambiguous or seems wrong, ask before diverging.
