# portfolio

Personal site for Redick "Red" Butay — a Next.js 15 port of the approved
single-file design prototype (`Portfolio.html`), set up as a static export
so it can live on any static host or behind the homelab's Caddy.

## Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS v4** via `@tailwindcss/postcss`, with `@theme` tokens that
  mirror the CSS custom properties from the prototype (`--bg`, `--fg`,
  `--accent`, …)
- **next/font** for JetBrains Mono (300–700) and Inter (400–600). No CDN.
- Zero additional runtime dependencies beyond React / Next.
- Static export target — `next build` produces a fully static `out/`.

## Requirements

- Node `>= 20` (`.nvmrc` pins the major)
- pnpm `>= 10`

## Develop

```bash
pnpm install
pnpm dev
```

Local URL: http://localhost:3000

While developing:

- `pnpm lint` — ESLint (Next core-web-vitals + TypeScript rules)
- `pnpm typecheck` — strict `tsc --noEmit`
- `pnpm build` — production static export to `out/`

## Deploy

The repo is configured with `output: "export"`, so every build writes a
complete static site to `out/`. Point your web server / CDN at that
directory.

### Environment variables

Set one variable before `pnpm build` so sitemap / OG URLs resolve to the
real origin:

| Variable                | Purpose                                      | Example                       |
| ----------------------- | -------------------------------------------- | ----------------------------- |
| `NEXT_PUBLIC_SITE_URL`  | Canonical site origin (no trailing slash).    | `https://portfolio.redick.dev` |

If unset, the build falls back to `https://redick.butay.example` so the
build still succeeds but search engines and OG scrapers will see a stub
URL. Override it before shipping.

### Homelab / Caddy

Drop `out/` on the server and point a Caddy site at it:

```caddy
portfolio.your-domain {
    root * /srv/portfolio/out
    encode zstd gzip
    file_server
    try_files {path} {path}.html {path}/index.html
}
```

The `opengraph-image` metadata route is exported as an extensionless file
(`out/opengraph-image`). It is served as `image/png` because the `<meta
property="og:image:type">` declares it; most scrapers respect that. If
you host behind a server that is aggressive about mime sniffing, you can
add a content-type hint:

```caddy
@og path /opengraph-image
header @og Content-Type image/png
```

### Any static host

`out/` works as-is on:

- Vercel / Netlify / Cloudflare Pages (point at the repo; set build
  command to `pnpm build`, output dir to `out`)
- GitHub Pages (publish `out/` from a workflow)
- Plain `nginx` (`root /path/to/out; try_files $uri $uri.html $uri/ =404;`)

### Docker Compose (homelab / any server with Docker)

A `Dockerfile`, `Caddyfile`, and `docker-compose.yml` at the repo root
give you a single-command deploy. The image is a two-stage build: stage
one builds the static export with Node + pnpm, stage two is Caddy
serving `out/` with gzip/zstd, tuned cache headers, and automatic HTTPS.

```bash
# one-time: tell the image which domain to bake into the build
echo 'SITE_DOMAIN=portfolio.your-domain.com' > .env

# build + run
docker compose up -d --build
```

`SITE_DOMAIN` does two things:

1. It's passed as the `NEXT_PUBLIC_SITE_URL` build arg (`https://$SITE_DOMAIN`)
   so the sitemap, OG image, and canonical tags all reference the real
   origin.
2. Caddy uses it as the site address, which triggers automatic Let's
   Encrypt issuance (ports 80 + 443 need to be reachable from the
   public internet for the HTTP-01 challenge).

For local bring-up without a real domain, leave `SITE_DOMAIN` unset —
the default `localhost` makes Caddy serve on its internal CA cert, which
your browser will warn about but still load.

Rebuild after content changes:

```bash
docker compose up -d --build
```

Logs and shell into the container:

```bash
docker compose logs -f web
docker compose exec web sh
```

Cert storage is persisted in the named volumes `caddy-data` and
`caddy-config`, so restarts don't re-issue certs.

#### Running behind an upstream reverse proxy

If your server already terminates TLS (another Caddy, Traefik, nginx
Proxy Manager, …), the Compose file is easiest to adjust by swapping
the published ports for `expose`:

```yaml
services:
  web:
    # ports:  <-- remove this block
    expose:
      - "80"
```

Then point the upstream at `http://<container-host>:80` (or use the
Docker network name if both run on the same Docker host) and drop the
`{$SITE_DOMAIN}` block in `Caddyfile` to `:80 { ... }` so Caddy listens
on HTTP only and skips its own cert dance.

## Editing the site's content

Almost every piece of text, every card, every list on the page is driven
by a single file: **`src/lib/content.ts`**. Open it and you'll see one
named export per content block. Change the data, save, and `pnpm dev`
hot-reloads the section.

You do *not* need to touch JSX for any of the edits below.

### What lives where

| What you want to change                             | Edit this                                   |
| --------------------------------------------------- | ------------------------------------------- |
| Hero copy (`Software developer.`, bio paragraph)    | `src/components/Hero.tsx`                   |
| The key-value list in the hero (`name`, `role`, …)  | `heroFacts` in `src/lib/content.ts`         |
| The tag chips under the hero                        | `heroChips` in `src/lib/content.ts`         |
| The `Hi, I'm Red.` paragraph + the 3 "fact" tiles   | `facts` array + JSX in `src/components/About.tsx` |
| Timeline entries                                    | `timeline` in `src/lib/content.ts`          |
| Stack columns (Core / Frontend / Infra / Also)      | `stack` in `src/lib/content.ts`             |
| Project cards                                       | `projects` in `src/lib/content.ts`          |
| Open-source cards                                   | `ossRepos` in `src/lib/content.ts`          |
| Homelab host info + gauges                          | `hostInfo` in `src/lib/content.ts`          |
| Homelab services grid                               | `services` in `src/lib/content.ts`          |
| `now` bullet list + side stats                      | `nowItems` and `nowSide` in `src/lib/content.ts` |
| `now` "last updated" label                          | `nowUpdated` in `src/lib/content.ts`        |
| Blog post index                                     | `posts` in `src/lib/content.ts`             |
| Contact links                                       | `contactLinks` in `src/lib/content.ts`      |
| Top-bar nav links                                   | `navLinks` in `src/lib/content.ts`          |
| Terminal command output (help, about, projects, …)  | `src/lib/commands.ts`                       |
| Page `<title>` / description / OG copy              | `metadata` in `src/app/layout.tsx`          |
| JSON-LD Person schema (jobTitle, sameAs, …)         | `personSchema` in `src/app/layout.tsx`      |
| OG image art                                        | `src/app/opengraph-image.tsx`               |
| Colours / radii / spacing tokens                    | `:root` in `src/app/globals.css`            |
| Light-mode token overrides                          | `[data-theme="light"]` in `src/app/globals.css` |

### Recipes

**Add a new project.** Open `src/lib/content.ts`, find `projects`, and
append one more object:

```ts
{
  index: "[05]",
  slug: "my-new-thing",
  title: "My New Thing",
  description: "One-sentence pitch.",
  tags: ["next.js", "tailwind"],
  status: "live",          // or "building"
  glyph: "⚡",              // appears in the placeholder thumb
  thumbLabel: "my-new-thing.png · 16:9 placeholder",
},
```

TypeScript will flag any missing fields. Types live in
`src/types/content.ts` if you need to check the exact shape.

**Add a timeline entry.** Same file, `timeline` array. Mark `active: true`
on exactly the current entry (it controls the filled-circle marker);
remove it from the previous one.

**Add a stack item.** Pick a column in `stack` and push into its
`items`: `{ name: "Rust", years: "1y", level: 40 }`. `level` is 0-100
and drives the progress bar.

**Add a homelab service.** Push into `services`:
```ts
{ name: "Grafana", desc: "dashboards", uptime: "up 3d", port: ":3100", state: "up" }
```
`state` is `"up"` | `"warn"` | `"off"` and colours the dot.

**Add a blog post.** Push into `posts`:
```ts
{ date: "2026 · 05 · 01", tag: "[odoo]", title: "…", readTime: "5 min", href: "#" }
```
Keep `href: "#"` until you actually have somewhere to link to.

**Update the `now` list.** Change `nowItems`, and bump `nowUpdated` to
the current month (e.g. `"May 2026"`). The 4 side stats (focus, listening,
last commit, coffee) are in `nowSide`.

**Change the accent colour.** In `src/app/globals.css`, the `--accent`
variable lives in both `:root` (dark) and `[data-theme="light"]`. Pick
new `oklch()` values for each. If you want to change the whole palette,
see the comment blocks — every token has dark + light pairs right next
to each other.

**Change / add a terminal command.** `src/lib/commands.ts` holds a
`COMMANDS` record where each key is the command name and the value is
a function returning `{ lines, effect? }`. `lines` is an array of HTML
strings; `effect` can be `{ kind: "clear" }`, `{ kind: "scroll",
selector }`, or `{ kind: "toggleTheme" }`. Add your new key and it
shows up in Tab completion automatically. Remember to add it to the
`help` command's output too.

**Edit a hint button below the terminal.** Edit the `HINT_COMMANDS`
tuple at the top of `src/components/Terminal.tsx`.

## Dropping real assets

The prototype ships with placeholder visuals. When you have real files,
drop them under `public/` and wire them in:

- **Avatar** — put a square photo at `public/avatar.jpg` (or similar)
  and replace the striped placeholder in `src/components/About.tsx`
  with a `next/image` `<Image>` (remember `images.unoptimized` is on,
  so you can point it at any path).
- **Project thumbnails** — drop 16:9 PNGs at `public/projects/<slug>.png`
  and replace the diagonal-stripe placeholder in
  `src/components/Projects.tsx` the same way.
- **OG image** — the build generates one at `/opengraph-image` from
  `src/app/opengraph-image.tsx`. Edit that file to change the art.

## Project structure

```
src/
  app/
    layout.tsx            # fonts, <html data-theme>, metadata, pre-paint script, JSON-LD
    page.tsx              # section composition
    globals.css           # @theme tokens + ported prototype CSS
    opengraph-image.tsx   # 1200×630 OG image (ImageResponse)
    robots.ts             # /robots.txt
    sitemap.ts            # /sitemap.xml
  components/             # TopBar, Hero, Terminal, About, Timeline, …
  lib/
    commands.ts           # terminal command map (pure fns)
    content.ts            # typed content arrays (projects, stack, services, …)
    site.ts               # SITE_URL / SITE_NAME
    theme.ts              # applyTheme / readTheme + pre-paint script
  types/
    content.ts            # shared content types
```

## Notable behaviours

- **Theme** is persisted at `localStorage["rb.theme"]` and applied before
  first paint by an inline script in `<head>`, so there is no
  flash-of-wrong-theme. It can be toggled by the top-bar button, the `T`
  key, the terminal's `theme` command, or the Tweaks panel.
- **Terminal** supports `help`, `about`, `projects`, `oss`, `stack`,
  `homelab`, `now`, `blog`, `contact`, `theme`, `clear`, `ls`, `whoami`,
  `pwd`, `date`, `sudo`, `exit` — plus ↑/↓ history and Tab completion.
  The global `/` shortcut focuses the input.
- **Tweaks panel** listens on `window.message` for `__activate_edit_mode`
  / `__deactivate_edit_mode` and posts `__edit_mode_available` on mount
  and `__edit_mode_set_keys` on change — unchanged from the prototype so
  any host iframe wiring keeps working.
- **Reduced motion** disables the hero cursor blink and the project
  "building" status pulse.

## Reference

- `Portfolio.html` — the approved design prototype. Kept in-repo as the
  source of truth for any visual question.
- `CLAUDE_CODE_HANDOFF.md` — the porting brief that produced this build.
