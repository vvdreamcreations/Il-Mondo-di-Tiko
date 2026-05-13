# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Il Mondo di Tiko** is a marketing website for a children's illustrated book series. It is a purely static frontend — no backend API. All data is hardcoded; external services (Brevo newsletter, Google Analytics 4, Amazon affiliate links) are integrated client-side.

## Commands

```bash
npm install --legacy-peer-deps   # Install (legacy flag required due to peer dep conflicts)
npm run dev                      # Dev server on http://localhost:3000
npm run build                    # Vite build + post-build CSS inlining (inline-css.js)
npm run preview                  # Preview production build locally
```

There is no test runner or linter configured.

**CI/CD:** GitHub Actions deploys to GitHub Pages on push to `main`. The workflow runs `npm ci --legacy-peer-deps && npm run build`.

## Architecture

### File Layout

The project departs from a standard Vite `src/` layout — most source files live at the **root**:

```
/                   ← root source files (App.tsx, index.tsx, constants.ts, types.ts)
/components/        ← reusable React components
/pages/             ← route-level page components (also at root level, not src/)
/utils/             ← analytics.ts (GA4 wrappers), consent.ts (GDPR localStorage)
/hooks/             ← useScrollLock.ts
/public/            ← static assets (images, videos, fonts, favicon set)
/src/               ← only fonts.css lives here
```

The `@/*` path alias resolves to the project root (`.`), so `@/constants` maps to `/constants.ts`.

### Routing & Entry

`index.tsx` bootstraps React Router with `BrowserRouter`. All pages are lazy-loaded with `React.lazy`. `App.tsx` is the layout shell (`<Outlet>` for page content) and contains global concerns: the fixed WebGL background, `<Navbar>`, `<TikoMascot>`, `<CookieConsent>`, and analytics initialization on mount.

Routes: `/`, `/libri`, `/chi-siamo`, `/newsletter`, `/gallery`, `/la-tua-voce`, `/privacy-policy`, `/privacy`, `/cookie-policy`.

### Data

All content is hardcoded in `constants.ts` as typed arrays: `BOOKS: Book[]`, `REVIEWS: Review[]`, `VALUES: ValueItem[]`. The `Book` interface (in `types.ts`) holds Amazon ASINs for affiliate links; cover images are loaded directly from Amazon CDN URLs. There is no CMS or API.

### Animation Strategy

Two animation libraries coexist with different roles:
- **Framer Motion** — component-level enter/exit transitions, opacity fades, stagger sequences
- **GSAP + ScrollTrigger** — scroll-pinned sections (`BooksStack`), navbar glass-morphism on scroll, timeline sequences

**WebGL particles** (`MagicGL`, using Three.js/R3F) are lazy-loaded and delayed 2.5 seconds after mount to avoid blocking LCP.

### GDPR / Analytics

Analytics are opt-in. `utils/consent.ts` manages consent via `localStorage` key `cookieConsent`. `initializeAnalytics()` injects the GA4 gtag script dynamically only after consent. GA Measurement ID `G-5CZGY2LPLJ` is hardcoded in `utils/consent.ts`.

### Styling

Tailwind CSS with custom design tokens — always prefer these over arbitrary values:

| Token | Value |
|---|---|
| `tiko-forest` | `#1A1F2E` (global background) |
| `tiko-cream` | `#FFFDD0` |
| `tiko-yellow` | `#FACC15` |
| `tiko-orange` | `#FDBA74` |
| `tiko-blue` | `#7DD3FC` |
| `tiko-green` | `#10B981` |

Fonts: `font-sans` → Poppins, `font-display` → Quicksand. Both are served from `/public/fonts/` as local TTF files (loaded via `/src/fonts.css`).

### Build Pipeline

`npm run build` runs Vite then `node inline-css.js` which inlines critical CSS into `index.html` for performance. Rollup splits output into three manual chunks: `vendor` (React, Router, Framer Motion, Helmet), `ui` (Lucide), and `shared` (constants, utils).

Image optimization runs automatically via `vite-plugin-image-optimizer` during build (JPEG/PNG/WebP at 80% quality). Manual scripts `convert-images.js`, `final-optimize.js`, and `reoptimize-bg.js` exist for one-off asset processing and can be run with `node <script>.js`.

### Deployment

- **GitHub Pages** — primary deployment, via `.github/workflows/deploy.yml` on push to `main`
- **Vercel** — `vercel.json` is present with SPA rewrite rules and cache headers; usable as an alternative host
- `public/_headers` — Netlify-compatible cache-control headers (also present as fallback)
