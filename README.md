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

### Docker Compose

The repo ships a `Dockerfile`, `Caddyfile`, and `docker-compose.yml`
for running the site as a container. The image is a two-stage build:
stage one runs `pnpm build` with Node + pnpm, stage two is Caddy
serving `out/` on HTTP **:80** with gzip/zstd and tuned cache
headers. The compose file contains **only the web service** — it's
deliberately minimal so it slots under whatever reverse proxy or
tunnel you already run (Cloudflare Tunnel, an existing Caddy,
Traefik, nginx, …).

#### Bring-up

On the target server:

```bash
git clone <this repo> portfolio
cd portfolio

# Public origin — baked into <meta>, sitemap.xml, OG image, JSON-LD.
cat > .env <<EOF
NEXT_PUBLIC_SITE_URL=https://portfolio.your-domain.com
EOF

docker compose up -d --build
```

The container now listens on HTTP :80 inside the `portfolio` Docker
network. No host ports are published.

Rebuild after content edits:

```bash
docker compose up -d --build
```

Logs / shell:

```bash
docker compose logs -f web
docker compose exec web sh
```

#### Plugging in Cloudflare Tunnel

If your `cloudflared` runs in its own compose stack (recommended —
keeps the tunnel reusable across projects), attach it to the
`portfolio` network so it can resolve the container:

```bash
docker network connect portfolio <your-cloudflared-container>
```

Then in the Cloudflare Zero Trust dashboard, point the public-hostname
route for this site at **`http://web:80`** (or `http://portfolio:80`
— both resolve inside the network). Cloudflare terminates TLS at
the edge; the portfolio container stays HTTP-only internally.

The same pattern works for any host-side reverse proxy: connect it to
the `portfolio` network, target `http://web:80`.

#### Variant — direct HTTPS with Let's Encrypt (no tunnel)

If you'd rather have Caddy terminate TLS itself:

1. In `Caddyfile`, replace the `:80 {` site block with
   `portfolio.your-domain.com {` (your real hostname). Caddy will
   auto-issue a Let's Encrypt cert.
2. In `docker-compose.yml`, add `ports:` for 80, 443, and `443/udp`,
   plus a `caddy-data` named volume mounted at `/data` so cert state
   survives restarts.
3. Make sure DNS points at the server and ports 80/443 are open to
   the public internet (HTTP-01 challenge needs port 80).

#### Variant — local smoke test without any proxy

```bash
docker compose up -d --build
docker run --rm -p 8080:80 portfolio:latest   # temporarily publish
# browse http://localhost:8080
```

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
- **Favicon** — the build generates a 32×32 PNG at `/icon` from
  `src/app/icon.tsx` (accent-red "R" on `--bg`). Edit that file, or
  drop a `favicon.ico` / `icon.png` in `src/app/` to override it.

## Project structure

```
src/
  app/
    layout.tsx            # fonts, <html data-theme>, metadata, pre-paint script, JSON-LD
    page.tsx              # section composition
    globals.css           # @theme tokens + ported prototype CSS
    opengraph-image.tsx   # 1200×630 OG image (ImageResponse)
    icon.tsx              # 32×32 favicon (ImageResponse)
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
