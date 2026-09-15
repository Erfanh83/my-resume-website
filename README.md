# Portfolio — Mohammad Erfan Hamzei

Bilingual (English / Persian) personal site. Next.js App Router, TypeScript, Tailwind CSS v4.

English is the default: `/` redirects to `/en`, and Persian lives at `/fa` with `dir="rtl"`
set on the document.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # static export into out/
npm run preview    # serve out/ at http://localhost:4000
npm run typecheck  # tsc --noEmit
npm run images     # re-compress assets/*.png into public/*.webp
```

Building locally produces a root-relative site. To reproduce exactly what is
deployed, set the sub-path first:

```bash
NEXT_PUBLIC_BASE_PATH=/my-resume-website npm run build
```

## Images

Three photographs, all in `public/`, all served through Next's optimizer — the source
PNGs are 1–2 MB each and go out as AVIF at roughly 25 KB.

| File | Where | Shape |
| --- | --- | --- |
| `hero.png` | Hero background, unframed and masked into the page | vertical |
| `portrait.png` | About section portrait | 2:3 vertical |
| `desk.png` | Full-bleed band between Experience and Projects | 4:3 |

To replace one, drop a file with the same name in `public/`. Keep the shape close to the
original or adjust the `object-position` on that image. All three want a dark ground with
green accent light so they sit inside the palette rather than on top of it.

## Two things to add before launch

1. **`public/resume.pdf`** — the Resume button in the header and the mobile menu link
   to `/resume.pdf`. Drop the PDF in `public/` under exactly that name.

2. **Contact form credentials** — copy `.env.example` to `.env.local` and fill in the three
   EmailJS values:

   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
   ```

   The EmailJS template must accept `from_name`, `from_email`, `subject`, and `message`.
   Until these are set the form still validates input, but tells the visitor to email
   directly instead of failing silently.

## Editing content

All text for both languages lives in two files, and nothing is hardcoded in components:

- `src/lib/content/en.ts`
- `src/lib/content/fa.ts`

Both satisfy the `Content` interface in `src/lib/content/types.ts`, so if you add a field to
one language, TypeScript will tell you the other is missing it.

### Changing a project's status

The deployment board in the hero and the Work section both read from the same `sites` array.
Move a site from `"build"` to `"qa"` to `"live"` in both content files, and add `domain` and
`url` when it goes live — the board, the card, and the link all follow.

```ts
{
  id: "casablanca",
  name: "Casablanca Café",
  domain: "casablanca.com",   // add when live
  url: "https://casablanca.com",
  kind: "Café",
  status: "live",             // "build" | "qa" | "live"
  ...
}
```

## Layout

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx     root layout — sets lang/dir, loads fonts, builds metadata
│   │   └── page.tsx       assembles every section
│   ├── globals.css        design tokens, base styles, motion
│   └── not-found.tsx      language-neutral 404
├── components/            one file per section
└── lib/
    ├── i18n.ts            locales, direction, switching
    └── content/           en.ts, fa.ts, types.ts
```

## Design notes

**Palette** carries over from the previous version of the site: `#050905` ground,
`#00ff88` signal green. Amber `#ffb627` is the one addition — the deployment board needs a
second state colour to distinguish shipped work from work still in progress.

**Type** is per-script. English uses Archivo for display and IBM Plex Sans/Mono for body and
data; Persian uses Vazirmatn across every role, since Archivo has no Arabic-script coverage.
The swap happens through `[lang="fa"]` in `globals.css`, so no component knows about it.

**Motion** is one shared scroll reveal driven by an IntersectionObserver, plus a pulse on live
status dots. Everything stops under `prefers-reduced-motion`.

## Deploying

Live at **https://erfanh83.github.io/my-resume-website/**, published by GitHub Actions
on every push to `main` (`.github/workflows/deploy.yml`). Nothing to run by hand.

**One-time setup in the repo:** Settings → Pages → Build and deployment → Source →
**GitHub Actions**. Without this the workflow builds and then fails at the deploy step.

### Why the build is a static export

GitHub Pages serves files; it runs no Node process. Three consequences are baked into
the config, and each one matters if you ever move hosts:

- **`output: "export"`** — no server, so no server rendering and no `redirects()`.
  `scripts/postexport.mjs` writes `out/index.html` by hand to forward `/` to `/en/`,
  and `out/.nojekyll` so Pages stops stripping the `_next/` directory.
- **`images.unoptimized: true`** — the image optimizer needs a server. The photographs
  are pre-compressed instead by `npm run images`, which turns the 1–2 MB source PNGs in
  `assets/` into ~35 KB WebP files in `public/`. Sources stay in `assets/`, which is
  never deployed.
- **`basePath`** — the site lives at `/my-resume-website/`, not at the domain root.
  `next/link` and metadata handle this, but a plain `<a>` and (because the optimizer is
  off) `next/image` do not, so those go through `withBase()` in `src/lib/paths.ts`.

### Moving to a host that runs Node

Vercel, Liara, a VPS — drop `output`, `trailingSlash`, `basePath` and `assetPrefix` from
`next.config.ts`, set `images` back to `{ formats: ["image/avif", "image/webp"] }`, and
point the components at `assets/` originals if you want full-quality sources. Then the
optimizer does the resizing per viewport and `npm run images` is no longer needed.

### Moving to a custom domain

Set `NEXT_PUBLIC_BASE_PATH=` (empty) and `NEXT_PUBLIC_SITE_URL=https://your-domain/` in
the workflow, and add a `CNAME` file to `public/`.

