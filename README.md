# Mall of America — Interactive Sales Deck

A browser-based, Digideck-format sales deck for Mall of America — purpose-built for leasing, sponsorship, and event-booking conversations with decision-makers at brands, agencies, and production companies.

> Not a website. A **presentation deck**: one-idea-per-slide, full-viewport stage, chapter/slide hierarchy, non-linear navigation. Screen-share it on a live call, or drop the shareable link in an email and let a prospect walk it at their own pace.

## Live Demo

- **Live:** https://mall-of-america-deck-one.vercel.app
- **GitHub:** https://github.com/Ananya-Bajpai/Mall-Of-America-LIAT.AI

## Format

Modeled on Sportsdigita's Digideck — the presentation format the assignment brief referenced:

- **Main Menu** is the landing view: hero video + seven chapter tiles. The viewer picks any chapter to start.
- **Chapter / Slide hierarchy** — 7 content chapters, 22 slides, each slide a single full-viewport idea.
- **Persistent chrome** — top-bar chapter dropdown and bottom-bar prev/next are one click away from any slide.
- **Non-linear** — jump to any chapter instantly from the dropdown or a number key; no forced linear progression.
- **Deep-linkable** — every slide has a URL hash (`#/retail/2`) so refresh lands you on the same slide and browser back/forward cycles through history.
- **Shareable standalone link** — the Vercel URL opens into the deck viewport, no login, works live or async.

## Keyboard Shortcuts

| Key | Action |
| --- | --- |
| `→` / `Space` / `PageDown` | Next slide |
| `←` / `PageUp` | Previous slide |
| `↓` | Next chapter |
| `↑` | Previous chapter |
| `1`–`7` | Jump to chapter N |
| `H` / `Home` | Return to main menu |
| `F` | Toggle fullscreen |
| `?` | Show keyboard help |

**Touch:** swipe left/right to advance. Chapter dropdown works on tap.

## Deck Content

```
00 · Main Menu                  hero.mp4 + seven chapter tiles

01 · Why MOA
     1.1  "One third of North America…"      cover + reach stats
     1.2  Regional reach banner              full-bleed map + caption
     1.3  Audience demographics              6-stat wall

02 · Retail
     2.1  "520+ brands"                      cover headline
     2.2  Flagship anchors                   banner + caption
     2.3  Category breakdown                 4-card grid
     2.4  Featured tenants                   chip wall

03 · Luxury                                  (paper tone — the "quiet wing")
     3.1  "The quiet wing"                   cover + luxury metrics
     3.2  Flagship brands                    4-tile luxury grid

04 · Dining
     4.1  "Food is the reason"               cover over dining-hero
     4.2  Signature restaurants              6-card highlight grid

05 · Entertainment                           (entertainment.mp4 background)
     5.1  "Other malls have shops…"          cover
     5.2–5.7  Six attractions                Nickelodeon · SEA LIFE · FlyOver ·
                                             Crayola · Escape Game · Mirror Maze

06 · Events                                  (events.mp4 background)
     6.1  "A stage for cultural moments"     cover
     6.2  Four broadcast venues              2×2 grid
     6.3  Recent highlights                  chip wall

07 · Partner
     7.1  "Three ways to partner"            cover
     7.2  Lease · Sponsor · Book             3-card CTA grid with mailto links
```

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (`@theme` tokens) |
| Motion | Framer Motion (respects `prefers-reduced-motion`) |
| Icons | lucide-react |
| Fonts | Inter (sans) + Fraunces (display serif) via `next/font/google` |

## Architecture

```
src/
├── app/
│   ├── layout.tsx          # Fonts + site metadata
│   ├── page.tsx            # <DeckShell />
│   └── globals.css         # Tokens, no-scroll body
├── components/
│   ├── deck/
│   │   ├── DeckShell.tsx           # Root: state + chrome + stage
│   │   ├── SlideStage.tsx          # AnimatePresence slide switcher
│   │   ├── MainMenu.tsx            # Chapter-tile landing view
│   │   ├── DeckTopBar.tsx          # Home · Chapters · Fullscreen · Help
│   │   ├── DeckBottomBar.tsx       # Chapter label · counter · prev/next
│   │   ├── ChapterDropdown.tsx     # Non-linear jump menu
│   │   ├── FullscreenToggle.tsx    # F key + API toggle
│   │   ├── KeyboardHintOverlay.tsx # ? shortcut help modal
│   │   └── slides/
│   │       ├── SlideRoot.tsx       # Tone + bg frame, chrome-aware padding
│   │       ├── CoverSlide.tsx      # Chapter openers
│   │       ├── DataWallSlide.tsx   # Stat walls
│   │       ├── BannerSlide.tsx     # Full-bleed image + caption
│   │       ├── GridSlide.tsx       # N-up card grids (2/3/4 cols)
│   │       ├── AttractionSlide.tsx # Image + name + stat + detail
│   │       └── TenantWallSlide.tsx # Chip wall
│   └── ui/                         # VideoBackground, StatCounter (reused)
└── lib/
    ├── data/mall-of-america.ts     # Content source of truth
    ├── deck/
    │   ├── types.ts                # Chapter / Slide types
    │   └── chapters.tsx            # Deck structure (23 slides / 8 chapters)
    └── hooks/
        ├── useDeckState.ts         # Position + URL hash + keyboard
        ├── useSwipe.ts             # Mobile swipe gestures
        └── useInView.ts
```

**Expandability:** every slide is a typed variant (`cover | dataWall | banner | grid | attraction | tenantWall`) driven from `chapters.tsx`. Add a chapter or reorder slides by editing one file. Add a new slide kind by adding a `SlideData` variant + a component + a `switch` case in `SlideStage`.

## Interaction Design

- **Auto-hide chrome** on desktop after 3.5s of inactivity (mouse/keyboard bump re-reveals). Always visible on touch.
- **Slide transitions** — 550ms fade + 20px upward parallax, `easeOutExpo`. Reduced-motion users get cuts.
- **Tone system** — each chapter has a tone (`ink` / `ink-soft` / `paper`). Chrome text color adapts so the luxury `paper` chapter reads correctly on light background.
- **Main Menu** is visually distinct — grid layout + hero video, not stacked content — so the viewer always knows they're "outside" a chapter.
- **Deep-link flash** is minimized: `useDeckState` applies the URL hash in a mount effect before first slide paint.

## Design System

Defined in `src/app/globals.css` as Tailwind v4 `@theme` tokens:

- **Palette** — `--color-ink` (near-black), `--color-ink-soft`, `--color-paper` (warm off-white), `--color-accent` (muted gold), `--color-signal` (deep red).
- **Typography** — Fraunces serif for display, Inter for body. Fluid `clamp()` display scale (`--text-display-xl/lg/md`).
- **Motion** — shared cubic-bezier easings and duration tokens.
- **Layout** — `--max-content` and `--gutter` for consistent horizontal rhythm across slides.

## Running Locally

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # Production build
pnpm start      # Production server
```

Prereqs: Node 20.9+, pnpm 9+.

## AI Usage

Per the assignment brief, AI was used to accelerate both asset creation and development:

- **Google Gemini** — image and video asset generation (hero cinemagraph, attraction imagery, luxury renderings). Prompts tailored to match the `--color-accent` gold/ink palette.
- **Claude Code** — architecture, component scaffolding, copy drafts for slide narratives.

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
- `AnimatePresence mode="wait"` — only one slide tree mounted at a time
- Images via `next/image` with explicit `sizes` + `fill` for optimized delivery
- Tailwind v4 purges unused utilities at build time

## Deployment

Auto-deploys on every push to `main` via Vercel. No environment variables required.

## What I'd Improve With More Time

- Sportsdigita-style clickable SVG maps (e.g. floor-by-floor Image Navigation on a property plan slide).
- Per-slide analytics hooks (view time, exit slide) — Digideck's analytics model.
- Password-gated shareable link variants per prospect (Leasing vs. Sponsorship vs. Events).
- Events Sub-Module at `/modules/events` with per-venue deep dive + lightweight date-picker CTA.
- Real Mapbox integration in the regional-reach slide.

## License

Proprietary — interview/screening submission for liat.ai.
