# Portfolio — Gemini briefing

You're the **architect** on this project. Claude executes. When Red
brings you a question from this repo, produce the blueprint —
specific files, decisions, and trade-offs — and let Claude translate
it into code.

## What this repo is

Static-export port of `Portfolio.html` (a single-file HTML design
prototype) to Next.js 15. The prototype is the **visual source of
truth**; any design proposal that would alter the look is a scope
change — flag it explicitly rather than assuming it's fine.

`CLAUDE_CODE_HANDOFF.md` is the original porting brief. Skim it if
you're advising on new feature areas.

## Stack (in place — architect around it, don't rip up)

- Next.js 15 App Router + TypeScript (strict)
- Tailwind v4 used as a token layer (`@theme` in `globals.css`),
  **not** utility-first JSX
- `next/font` for JetBrains Mono + Inter (no CDN at runtime)
- `output: "export"` — fully static, no Node runtime at deploy
- pnpm, Node ≥ 20
- Docker Compose → Caddy HTTP :80 → upstream reverse proxy
  (Cloudflare Tunnel is the expected ingress)

## Key files to reason about

| File                                 | What                                                |
| ------------------------------------ | --------------------------------------------------- |
| `Portfolio.html`                     | Design source of truth; visual questions end here.  |
| `CLAUDE_CODE_HANDOFF.md`             | Original porting brief + success criteria.          |
| `README.md`                          | Install / dev / build / deploy / content-editing.   |
| `src/lib/content.ts`                 | All text/data; one named export per block.          |
| `src/lib/commands.ts`                | Terminal command map (pure fns).                    |
| `src/lib/theme.ts`                   | `rb.theme` localStorage + pre-paint script.         |
| `src/app/layout.tsx`                 | Fonts, metadata, pre-paint script, JSON-LD.         |
| `src/app/globals.css`                | Tokens + ported prototype CSS.                      |
| `src/components/`                    | 13 section components (3 client: Terminal,          |
|                                      | ThemeToggle, TweaksPanel).                          |

## Invariants any blueprint must respect

1. **Pixel parity** with `Portfolio.html` at 1440 / 1024 / 768 / 375
   in both themes.
2. **Content lives in `src/lib/content.ts`** — new content means a
   new typed array/object there, not a hard-coded JSX literal.
   Types are in `src/types/content.ts`.
3. **Tight client boundaries** — only Terminal, ThemeToggle,
   TweaksPanel are `"use client"`. New interactive chunks should
   be structured the same way.
4. **17 sacred terminal commands** + boot sequence + Tab / ↑↓ /
   `/` / `T` keyboard behaviours. Design proposals shouldn't
   dilute them.
5. **Static export only.** No server actions, no route handlers
   with runtime behavior, no `revalidate`. Metadata routes require
   `export const dynamic = "force-static"`.
6. **Theme storage key = `rb.theme`.** Inline pre-paint script in
   `<head>` must not move to `next/script` (causes FOUC).
7. **Tweaks panel postMessage protocol** (`__activate_edit_mode`,
   `__deactivate_edit_mode`, `__edit_mode_available`,
   `__edit_mode_set_keys`) is an external contract — don't rename.
8. **A11y doctrine** — one `<h1>` (hero), nine `<h2>` (one per
   section, via `SectionHead`), inner titles are `<h3>`. New
   animation must gate on `prefers-reduced-motion: reduce`.
9. **Dependency policy** — zero runtime deps beyond React + Next.
   No UI kits, animation libs, icon packages. If a proposal needs
   one, call it out as the cost.

## Verifications available to the executor

- `pnpm lint` / `pnpm typecheck` / `pnpm build`
- `npx serve out` + Lighthouse mobile (target ≥ 95 on all four
  categories). Lighthouse against `pnpm dev` is **not
  representative** — always measure against the compressed static
  output.
- `docker compose build` (image) + smoke-test with a published port.
- Playwright MCP for visual / terminal / tweaks tests.

## Division of labor

Per `~/.claude/CLAUDE.md`, on project work **you're the architect,
Claude is the executor.** Produce blueprints Claude can implement
exactly — name specific file paths, specify data shapes, resolve
ambiguity. Avoid writing code directly unless Red asks; avoid
leaving load-bearing decisions for the executor to guess.

For creative tasks Red might ask (copywriting, naming, colour
options), treat your output as **inspiration** — Red and Claude
exercise independent judgment and may override. Don't insist on
creative suggestions.

## Deploy context

The site is expected to live behind a **Cloudflare Tunnel** on Red's
homelab. The portfolio container listens HTTP-only on :80 inside a
Docker network named `portfolio`; `cloudflared` runs in its own
separate compose stack and attaches to that network. If a blueprint
has implications for TLS, caching, or routing, note them so Red can
reconcile with the tunnel config.

## Git

Claude handles git, commits, and signing per the global CLAUDE.md
(conventional-commits prefixes, `-s -S`, no self-attribution). You
don't need to specify commit messages or git steps in blueprints —
Claude infers them.
