# Mall of America — Interactive Sales Deck

A browser-based, Digideck-format sales deck for Mall of America — purpose-built for leasing, sponsorship, and event-booking conversations with decision-makers at brands, agencies, and production companies.

> Not a website. A **presentation deck**: one-idea-per-slide, full-viewport stage, chapter/slide hierarchy, non-linear navigation. Screen-share it on a live call, or drop the shareable link in an email and let a prospect walk it at their own pace.

## Live demo

- **Live:** https://mall-of-america-deck-one.vercel.app
- **GitHub:** https://github.com/Ananya-Bajpai/Mall-Of-America-LIAT.AI
- **Round-2 write-up:** [`WRITEUP.md`](./WRITEUP.md)

## Format

Modeled on Sportsdigita's Digideck — the presentation format the assignment brief referenced:

- **Main Menu** is the landing view: hero video + chapter rail. The viewer picks any chapter to start.
- **Chapter / Slide hierarchy** — 8 content chapters, 23 slides, each slide a single full-viewport idea.
- **Persistent chrome** — top-bar chapter dropdown and bottom-bar prev/next are one click away from any slide.
- **Non-linear** — jump to any chapter instantly from the dropdown or a number key; no forced linear progression.
- **Deep-linkable** — every slide has a URL hash (`#/retail/2`) so refresh lands you on the same slide and browser back/forward cycles through history.
- **Shareable standalone link** — the Vercel URL opens into the deck viewport, no login, works live or async.

## Keyboard shortcuts

| Key | Action |
| --- | --- |
| `→` / `Space` / `PageDown` | Next slide |
| `←` / `PageUp` | Previous slide |
| `↓` | Next chapter |
| `↑` | Previous chapter |
| `1`–`8` | Jump to chapter N |
| `H` / `Home` | Return to main menu |
| `F` | Toggle fullscreen |
| `?` | Show keyboard help |

**Touch:** swipe left/right to advance. Chapter dropdown works on tap.

## Deck content

Every chapter opens with a full-bleed cinematic — a Veo-generated MP4 (or Ken-Burns poster fallback) that sets the mood before the data lands. The cinematic doubles as the chapter's thesis statement, so the slides that follow can carry weight without preamble.

```
00 · Main Menu                      hero video + chapter rail

01 · The Stage                      Location, scale, audience
     1.1  Cinematic intro
     1.2  "One third of North America…"      cover + reach stats
     1.3  By the numbers                     comparison vs. avg US mall
     1.4  Regional reach                     full-bleed map + caption
     1.5  Audience demographics              6-stat wall

02 · Retail                         520+ brands, one roof
     2.1  Cinematic intro
     2.2  "520+ brands"                      cover headline
     2.3  Flagship anchors                   hotspot map (interactive pins)
     2.4  Category breakdown                 4-card grid
     2.5  Featured tenants                   chip wall

03 · The Quiet Wing                 Where brand meets patron
     3.1  Cinematic intro
     3.2  Luxury flagships                   gallery (LV, Burberry, Tiffany, Coach)

04 · The Table                      60+ restaurants
     4.1  Cinematic intro
     4.2  Signature restaurants              6-card grid

05 · The Theme Park Inside          The differentiator
     5.1  Cinematic intro
     5.2  Six attractions                    video-lightbox grid (tap to play)

06 · Cultural Moments               A global platform
     6.1  Cinematic intro
     6.2  Four broadcast venues              2×2 grid
     6.3  Recent highlights                  timeline

07 · Build Your Activation          "I need to be here"
     7.1  Cinematic intro
     7.2  Activation builder                 interactive: pick path → drop brand → see it live

08 · Partner                        Next steps
     8.1  Cinematic intro
     8.2  Lease · Sponsor · Book             3-card CTA grid with mailto links
```

The **Activation Builder** (slide 7.2) is the deck's pivot point — instead of telling a prospect what their activation could look like, it lets them pick a path (Lease / Sponsor / Book), type their brand name, and watch a logo composite onto a real venue plate in real time. See [`WRITEUP.md`](./WRITEUP.md) for why we built it this way.

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
│   ├── layout.tsx                   # Fonts + site metadata
│   ├── page.tsx                     # <DeckShell />
│   └── globals.css                  # Tokens, no-scroll body
├── components/
│   ├── deck/
│   │   ├── DeckShell.tsx            # Root: state + chrome + stage
│   │   ├── SlideStage.tsx           # AnimatePresence slide switcher
│   │   ├── MainMenu.tsx             # Chapter-rail landing view
│   │   ├── DeckTopBar.tsx           # Home · Chapters · Fullscreen · Help
│   │   ├── DeckBottomBar.tsx        # Chapter label · counter · prev/next
│   │   ├── ChapterDropdown.tsx      # Non-linear jump menu
│   │   ├── FullscreenToggle.tsx     # F key + API toggle
│   │   ├── KeyboardHintOverlay.tsx  # ? shortcut help modal
│   │   ├── Lightbox.tsx             # Video lightbox shared by 5.2
│   │   └── slides/
│   │       ├── SlideRoot.tsx              # Tone + bg frame, chrome-aware padding
│   │       ├── CinematicSlide.tsx         # Full-bleed MP4 (Ken-Burns fallback)
│   │       ├── CoverSlide.tsx             # Chapter openers
│   │       ├── DataWallSlide.tsx          # Stat walls
│   │       ├── BannerSlide.tsx            # Full-bleed image + caption
│   │       ├── GridSlide.tsx              # N-up card grids (2/3/4 cols)
│   │       ├── AttractionSlide.tsx        # Image + name + stat + detail
│   │       ├── TenantWallSlide.tsx        # Chip wall
│   │       ├── HotspotSlide.tsx           # Image + clickable hotspot pins
│   │       ├── GallerySlide.tsx           # Hero image + thumb rail
│   │       ├── ComparisonSlide.tsx        # Subject vs. baseline data table
│   │       ├── VideoLightboxSlide.tsx     # Poster grid → video lightbox
│   │       ├── TimelineSlide.tsx          # Horizontal moment timeline
│   │       └── ActivationBuilderSlide.tsx # Interactive brand-on-venue composite
│   └── ui/                          # VideoBackground, StatCounter (reused)
└── lib/
    ├── data/mall-of-america.ts      # Content source of truth
    ├── deck/
    │   ├── types.ts                 # Chapter / Slide types
    │   └── chapters.tsx             # Deck structure (23 slides / 9 chapters)
    └── hooks/
        ├── useDeckState.ts          # Position + URL hash + keyboard
        ├── useSwipe.ts              # Mobile swipe gestures
        └── useInView.ts
```

**Expandability.** Every slide is a typed variant on a discriminated union (`cover | dataWall | banner | grid | attraction | tenantWall | cinematic | hotspot | gallery | comparison | videoLightbox | timeline | activationBuilder`) driven from `chapters.tsx`. Add a chapter or reorder slides by editing one file. Add a new slide kind by adding a `SlideData` variant + a component + a `switch` case in `SlideStage` — TypeScript catches the missing case at compile time.

## Interaction design

- **Cinematic chapter openers** — each chapter starts with a Veo-generated 4–5 second cinematic that auto-advances on `ended`, falls back to a Ken-Burns poster if the MP4 fails to load, and skips on click / `→` / `Space`. Eliminates the "where am I" gap between chapters and gives the deck destination-grade emotional pull.
- **Auto-hide chrome** on desktop after 3.5s of inactivity (mouse/keyboard bump re-reveals). Always visible on touch.
- **Slide transitions** — 550ms fade + 20px upward parallax, `easeOutExpo`. Reduced-motion users get cuts.
- **Tone system** — each chapter has a tone (`ink` / `ink-soft` / `paper`). Chrome text color adapts so the luxury `paper` chapter reads correctly on light background.
- **Main Menu** is visually distinct — full-bleed hero video + chapter rail, not stacked content — so the viewer always knows they're "outside" a chapter.
- **Deep-link flash** is minimized: `useDeckState` applies the URL hash in a mount effect before first slide paint, and `AnimatePresence initial={false}` skips the first-mount fade.
- **Activation Builder logo composite** — uses Clearbit's logo CDN to fetch any brand's wordmark, then composites it onto a venue plate with a per-venue `mix-blend-mode` (screen for LED, multiply for fabric, normal for digital plates). Falls back to typeset wordmark if Clearbit returns 404.

## Design system

Defined in `src/app/globals.css` as Tailwind v4 `@theme` tokens:

- **Palette** — `--color-ink` (near-black), `--color-ink-soft`, `--color-paper` (warm off-white), `--color-accent` (muted gold), `--color-signal` (deep red).
- **Typography** — Fraunces serif for display, Inter for body. Fluid `clamp()` display scale (`--text-display-xl/lg/md`).
- **Motion** — shared cubic-bezier easings and duration tokens.
- **Layout** — `--max-content` and `--gutter` for consistent horizontal rhythm across slides.

## AI usage

The brief asked us to lean on AI; we did, in three distinct roles:

1. **Asset generation — Google Gemini (image) + Veo (video).**
   - 8 chapter cinematics (4–5 s MP4s; Veo 3 with palette-locked prompts so every clip lands on `--color-accent` gold and `--color-ink` blacks). Saved to `/public/videos/cinematic/`.
   - 13 still images for Hotspot, Gallery, Cover, and venue plates. Generated with prompts engineered for editorial / sales-collateral aesthetic, not stock-photo realism.
   - Brand logos at runtime via Clearbit's logo CDN (not generated, but the activation-builder composite is the moment AI-feeling polish meets a real prospect's brand).

2. **Code scaffolding — Claude Code.** Architecture plan, slide-component scaffolds, type discriminated unions, hook design (URL hash sync, keyboard, swipe), and Tailwind v4 token wiring. Every component was reviewed and edited before commit; AI didn't ship anything unread.

3. **Copy drafts — Claude.** First-pass slide narratives ("the quiet wing", "we have a day", "I need to be here"). Final voice tuned by hand against the Digideck reference set the brief shipped with.

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
- Cinematic videos lazy-load per slide via `<video preload="auto">`; only the active slide is mounted (`AnimatePresence mode="wait"`)
- Images via `next/image` with explicit `sizes` + `fill` for optimized delivery
- Tailwind v4 purges unused utilities at build time
- Reduced-motion users skip every transition (cuts only)

## Running locally

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # Production build
pnpm start      # Production server
```

Prereqs: Node 20.9+, pnpm 9+.

## Deployment

Auto-deploys on every push to `main` via Vercel. No environment variables required.

## What I'd improve with more time

- **Per-prospect deck variants.** Token-gated shareable links that swap the Activation Builder default to match the prospect's vertical (lease for retail, sponsor for events agencies, book for production companies), the way Digideck handles per-recipient personalization.
- **Per-slide analytics.** View time, exit slide, hotspot interaction counts — the second half of Digideck's product. The slide-state hook is the natural injection point.
- **Real Mapbox** in slide 1.4. The current banner is editorial; a live map with drive-time isochrones from major Twin Cities zip codes would be more persuasive on a leasing call.
- **Activation Builder PDF export.** Once a prospect picks Path + Brand + Venue, generate a one-page PDF brief on the fly (server-rendered React → `@react-pdf/renderer`) so they can forward it internally.

## License

Proprietary — interview/screening submission for liat.ai.
