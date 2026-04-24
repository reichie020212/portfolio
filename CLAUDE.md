# Portfolio — Claude project notes

Static-export port of `Portfolio.html` (a single-file HTML design
prototype) to Next.js 15. The prototype is the **visual source of
truth** — pixel-parity deviations are bugs, not style choices.

Read `Portfolio.html` before any visual change. Read
`CLAUDE_CODE_HANDOFF.md` if you're extending a feature area —
it's the original porting brief and captures the design intent.

## Division of labor on this project

Per `~/.claude/CLAUDE.md`, on project work **Gemini is the architect
and you are the executor**. When Red hands you a blueprint, implement
it exactly. When you hit architectural ambiguity, a tricky decision,
or something that doesn't match existing code — **re-consult Gemini
via `/ask gemini`**. Don't improvise design changes.

## Stack

- Next.js 15 App Router + TypeScript (strict)
- Tailwind v4 via `@tailwindcss/postcss` — used as a token layer
  (`@theme` block in `globals.css`), not as utility-first JSX
- `next/font` for JetBrains Mono + Inter (no CDN at runtime)
- `output: "export"` — fully static, no server runtime
- pnpm, Node ≥ 20

## Commands

```bash
pnpm install
pnpm dev         # http://localhost:3000
pnpm build       # → out/
pnpm lint
pnpm typecheck

docker compose up -d --build           # containerized deploy
```

All four checks (`dev` boots clean with no console errors, `lint`,
`typecheck`, `build`) must be green before you commit. Performance
numbers against `pnpm dev` are not representative — Lighthouse
always runs against compressed static output (`npx serve out`).

## Core files

| File                               | What                                                |
| ---------------------------------- | --------------------------------------------------- |
| `src/lib/content.ts`               | Every piece of text/data on the page                |
| `src/lib/commands.ts`              | Terminal command map (pure fns)                     |
| `src/lib/theme.ts`                 | `rb.theme` localStorage + pre-paint script          |
| `src/lib/site.ts`                  | `NEXT_PUBLIC_SITE_URL` plumbing                     |
| `src/app/layout.tsx`               | Fonts, metadata, pre-paint theme script, JSON-LD    |
| `src/app/globals.css`              | `@theme` tokens + ported prototype CSS              |
| `src/app/opengraph-image.tsx`      | 1200×630 OG image (ImageResponse)                   |
| `src/app/icon.tsx`                 | 32×32 favicon (ImageResponse)                       |
| `src/app/{robots,sitemap}.ts`      | Metadata routes (static, `dynamic = "force-static"`)|
| `src/components/*.tsx`             | 13 section components                               |
| `src/types/content.ts`             | Shared content types                                |

## Invariants — don't break these

- **Content lives in `lib/content.ts`.** JSX files read like layout
  only — no hard-coded project names, tag lists, service names.
  Types in `src/types/content.ts`.
- **Client boundaries are tight.** Only `Terminal.tsx`,
  `ThemeToggle.tsx`, and `TweaksPanel.tsx` are `"use client"`. Don't
  leak `onClick` / state through server component props.
- **Terminal commands are sacred.** The 17 commands `help`, `about`,
  `projects`, `oss`, `stack`, `homelab`, `now`, `blog`, `contact`,
  `theme`, `clear`, `ls`, `whoami`, `pwd`, `date`, `sudo`, `exit`
  must all keep working — plus boot sequence, ↑/↓ history, Tab
  completion, `/` focus shortcut, and `T` theme toggle.
- **Theme storage key is `rb.theme`.** Cross-component sync uses the
  `rb:theme-change` `CustomEvent`. The pre-paint script lives inline
  in `<head>` via `dangerouslySetInnerHTML` — moving it to
  `next/script` defers it past first paint and causes FOUC.
- **`<html>` carries `suppressHydrationWarning`** — the pre-paint
  script sets `data-theme` before React hydrates, which would
  otherwise trip React's hydration-mismatch warning. Don't remove
  the prop; the mismatch is intentional and out-of-band.
- **Tweaks panel postMessage protocol** (`__activate_edit_mode` /
  `__deactivate_edit_mode` inbound; `__edit_mode_available` /
  `__edit_mode_set_keys` outbound) is an external contract — don't
  rename or restructure.
- **Static export only.** No server actions, no route handlers with
  runtime behavior, no `revalidate`. Metadata routes require
  `export const dynamic = "force-static"`.
- **Heading outline.** One `<h1>` (hero), nine `<h2>` (via
  `SectionHead`, one per section), inner titles are `<h3>`.
- **Reduced motion.** Any new animation must gate on
  `@media (prefers-reduced-motion: reduce)` in `globals.css`.

## Do not

- Add UI libraries, animation libraries, or icon packages — the
  prototype uses plain CSS + vanilla JS; the port mirrors that.
- Change the design to fit Tailwind. If a rule is awkward as a
  utility, write it in `globals.css`.
- Commit `next-env.d.ts` (gitignored; Next regenerates it on build).
- Commit `out/`, `.next/`, `test-artifacts/` (local Playwright
  screenshot output), or `.playwright-mcp/` (Playwright MCP's
  working dir). All four are gitignored.

## Verifying UI changes

- `pnpm build` + `npx serve out`, then compare against the prototype
  at 1440 / 1024 / 768 / 375 in both themes
  (`localStorage.setItem('rb.theme', 'light')` + reload).
- Lighthouse mobile target: **≥ 95** on Performance, Accessibility,
  Best Practices, SEO. Measure against the compressed static output,
  not `pnpm dev`.
- For browser tests, use the `browser-tester` agent with Playwright
  MCP. The Playwright tools must be allow-listed for that session.

## Deploy

`docker compose up -d --build` builds a two-stage image (Node+pnpm
build → Caddy :80 runtime) and runs the container on the `portfolio`
Docker network. **No host ports are published** — ingress comes from
a Cloudflare Tunnel (or any upstream reverse proxy) attached to that
network, routing `http://web:80`. Full deploy variants are in
`README.md`.

## Git / repo hygiene

- Worktree rule is **relaxed for this repo's greenfield phase** —
  direct commits to `main` are allowed. See memory:
  `feedback_worktree_scope.md`.
- Conventional commits (`feat:`, `fix:`, `docs:`, `chore:`,
  `refactor:`, `test:`). Signing and no-self-attribution per global
  CLAUDE.md.
- Commit in logical chunks. The port history shows the pattern:
  scaffold → tokens → content → terminal → theme+tweaks →
  a11y+SEO → docker → docs.
