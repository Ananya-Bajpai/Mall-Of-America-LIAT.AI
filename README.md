# Mall of America — Interactive Sales Deck

A cinematic, browser-based sales experience for Mall of America, built for leasing, sponsorship, and event-booking conversations with decision-makers at brands, agencies, and production companies.

> This is not a website. It is a purpose-built, non-linear sales tool that tells the property's story through video, data, and narrative — polished enough to screen-share on a live sales call, self-contained enough to send as a standalone link.

## Live Demo

🔗 **Live:** https://mall-of-america-deck-one.vercel.app
🔗 **GitHub:** https://github.com/Ananya-Bajpai/Mall-Of-America-LIAT.AI

## Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) | Static-export friendly, top-tier Lighthouse scores, modern React 19 features |
| Language | TypeScript | Type safety across data → components |
| Styling | Tailwind CSS v4 | CSS-first design tokens via `@theme`, zero runtime CSS |
| Motion | Framer Motion | Component-level entrance, transitions, overlay menu |
| Icons | lucide-react | Lightweight, consistent line icons |
| Fonts | Inter (sans) + Fraunces (display serif) | Self-hosted via `next/font/google` for luxury typographic contrast |

## Architecture

```
src/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Composes the deck
│   └── globals.css         # Tailwind v4 @theme tokens, motion rules
├── components/
│   ├── deck/               # DeckNavigation, DeckSection — shell
│   ├── sections/           # One file per story beat
│   └── ui/                 # Reusable primitives (StatCounter, VideoBackground)
└── lib/
    ├── data/
    │   └── mall-of-america.ts   # Single source of truth
    ├── hooks/
    │   └── useInView.ts
    └── utils.ts
```

**Expandability by design:**

- Every section is a self-contained component consuming data from `lib/data/mall-of-america.ts`. Swapping to a different property means changing one file.
- The `sections/` directory has no cross-references — sections can be reordered, removed, or duplicated by editing `page.tsx`.
- Phase 2 sub-modules (Events Module, Sponsorship Module, Leasing Paths, Venue-Specific Modules) slot into a new `app/modules/<name>/page.tsx` route using the same `DeckSection` primitive.

## Sections (Phase 1)

1. **Hero** — Cinematic intro. Cinemagraph background, staggered-reveal headline, three anchor stats.
2. **Why This Property** — Regional reach, economic impact, audience demographics.
3. **Retail** — 520+ brand landscape, category breakdown, flagship tenant marquee.
4. **Luxury** — Elevated paper-toned section. Shopper economics + brand wall.
5. **Dining & Lifestyle** — Culinary concepts as a destination draw.
6. **Entertainment** — The differentiator: Nickelodeon Universe, SEA LIFE, FlyOver America, etc.
7. **Events & Platform** — Four broadcast-ready venues and a resume of hosted moments.
8. **Call to Action** — Three business paths: Lease · Partner · Book the Property.

## Interaction Design

- **Non-linear navigation.** Floating dot nav (desktop), overlay menu (mobile + power users).
- **Keyboard shortcuts.** `↑ ↓ j k` navigate sections, `m` toggles menu, `Esc` closes it.
- **Scroll-triggered animations** via Framer Motion `whileInView` and a custom `useInView` hook for counters.
- **Scroll progress bar** at the top edge for presentation-mode feedback.
- **Respect for `prefers-reduced-motion`** — all motion disabled for users who opt out.

## Design System

Defined in `src/app/globals.css` as Tailwind v4 `@theme` tokens:

- **Palette** — `--color-ink` (near-black), `--color-paper` (warm off-white), `--color-accent` (muted gold), `--color-signal` (deep red).
- **Typography** — Fraunces serif for display, Inter for body. Fluid `clamp()`-based display scale.
- **Motion** — Shared cubic-bezier easings (`ease-out-expo`) and duration tokens.
- **Grain overlay** — Optional filmic noise via the `.grain` utility (SVG fractal noise, ~1 KB).

## Running Locally

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # Production build
pnpm start      # Production server
```

**Prereqs:** Node 20.9+, pnpm 9+.

## AI Usage

Per the assignment brief, AI was used to accelerate both asset creation and development:

- **Google Gemini (Pro)** — Image and video asset generation (hero cinemagraph, attraction imagery, luxury renderings). Prompts tailored to match the `--color-accent` gold/ink palette.
- **Claude Code** — Architecture, component scaffolding, copy drafts for section narratives.

All AI-generated assets are supplementary to public materials from Mall of America's press kit and official channels.

## Performance

Measured via PageSpeed Insights on the production deploy:

| Category | Desktop | Mobile |
| --- | --- | --- |
| Performance | **99** | **91** |
| Accessibility | **100** | **100** |
| Best Practices | **100** | **100** |
| SEO | **100** | **100** |

Key techniques:

- Turbopack for dev and build (Next.js 16 default)
- `next/font/google` with `display: swap`
- Video lazy-loading and pause-offscreen via IntersectionObserver
- Framer Motion `whileInView` (vs. mounting all motion eagerly)
- Tailwind v4 purges unused utilities at build time

## Deployment

Configured for Vercel. To deploy:

```bash
pnpm build
# then push to a GitHub repo and connect on vercel.com
```

No environment variables required.

## What I'd Improve With More Time

- Replace placeholder video backgrounds with edited 10–15s MP4 loops per section
- Add a dedicated **Events Sub-Module** at `/modules/events` with a per-venue deep dive, past-event case studies, and a lightweight date-picker CTA
- Integrate **React View Transitions** (stable in Next.js 16) for between-section transitions
- Real map integration in "Why This Property" (Mapbox static tile + pins)
- Lightbox for the attractions grid so each card opens a focused video/story view

## License

Proprietary — interview/screening submission for liat.ai.
