# Mall of America Deck — Round 2 write-up

A short note for the reviewer, covering: what changed since round 1, the design bet behind the changes, the "I need to be here" moment, and how AI shaped the workflow.

---

## What round 1 got wrong

The reviewer's note was unambiguous: *"the assignment was to build a deck (not a website)…this submission appears to be a website."* Re-reading the brief confirmed it — Sportsdigita's Digideck was the format reference, and the brief closed with "the assignment is to build a presentation deck, not a website."

Round 1 was a long-scroll narrative site. Beautiful in places, but the wrong shape. A sales rep can't screen-share a scroll page on a Zoom call without losing where they are; a prospect can't be handed a link and asked to "walk it" if the navigation is just gravity.

## The design bet

**Reshape the narrative into a Digideck — full-viewport slides, chapter/slide hierarchy, non-linear chapter rail, deep-linkable URL hash, persistent prev/next chrome — without diluting the editorial voice.**

The bet is that *format and feeling are separable*. Most slide decks read as boring because they fall back on bullet points; most editorial sites read as un-actionable because they fall back on long-form. We wanted a deck that reads like a magazine spread but operates like a Digideck:

- **One idea per slide.** Cover slide states the thesis. Next slide proves it. Next slide makes it tactile. Move on.
- **Cinematic chapter openers.** Every chapter starts with a 4–5 second Veo-generated MP4. The viewer feels the chapter shift before the data arrives — destination-marketing language, not real-estate-prospectus language.
- **A tone system per chapter.** Luxury runs on `--color-paper` (warm off-white) — the literal "quiet wing." Entertainment runs on saturated black with a video background. The chrome adapts. The same deck never feels uniform.
- **Non-linear from anywhere.** The chapter dropdown is one click from any slide. Number keys jump. URL hash deep-links. A prospect who only cares about events should be able to start there and never see the retail chapter.

Round 2 also shipped 15 reviewer-flagged polish fixes — start-page chrome cleanup, eliminating poster-frame flashes between chapters (the HTML5 `<video poster>` attribute was the culprit, in case it's useful to anyone else), comparison column alignment, and a redundant-cover dedup pass that dropped 5 slides where the cinematic and the cover slide repeated the same headline verbatim.

## The "I need to be here" moment

Brief mentions: *"the deck should make the viewer want to be here."* For a property deck that's hard, because the property is a 5.6-million-square-foot mall — the reader can't actually be there in a meaningful way. Most decks settle for evocative photography and hope the prospect projects themselves into it.

We built **the Activation Builder** instead. It's slide 7.2. The prospect:

1. Picks a path: **Lease a Flagship**, **Sponsor a Venue**, or **Book the Property.**
2. Types their brand name (or picks one of the preset chips).
3. Watches their wordmark composite onto a real venue plate — Rotunda LED screen with `mix-blend-mode: screen`, North Garden fabric banner with `mix-blend-mode: multiply`, Atrium digital signage with normal blending. Logo art is fetched from Clearbit at runtime; if Clearbit doesn't have it, the brand name typesets in Fraunces.

That's the bet: the moment a prospect sees their own brand on the wall, they stop reading a pitch and start picturing themselves there. It's tactile in a way "32M annual visitors" is not. Reach numbers, comp tier, and lead time update under the composite, and the CTA becomes `mailto:` with the path, brand, and venue pre-filled in the subject line — so the prospect's own next click writes the email that lands in MOA's leasing inbox.

Building the same idea as a real Digideck-style "Image Navigation" component — clickable property map → chapter — would have hit the same format note but skipped the visceral payoff. We picked the visceral one.

## AI workflow

Three layers, three different tools doing what they're best at:

- **Veo (video) and Gemini (image)** for asset generation. Eight chapter cinematics, thirteen stills, all prompt-engineered to a locked palette (`--color-accent` gold, `--color-ink` near-black). Veo's strict-realism mode kept the cinematics from drifting into uncanny territory. Generation cycle: prompt → 3 candidates → pick → upscale → trim. About 4–6 hours of generation time across the chapter set, run in parallel batches.
- **Claude Code** for code scaffolding. The discriminated-union slide type, the 14 slide-component files, the URL-hash + keyboard + swipe hook, the Tailwind v4 token wiring. Claude wrote first-draft components; everything was reviewed line by line before commit. The codebase is thin enough (~3k LOC) that AI assistance was a velocity multiplier, not an accountability dilution — every file ships under human review.
- **Claude (chat)** for copy. First-pass slide narratives — *"the quiet wing"*, *"we have a day"*, *"I need to be here"* — drafted by Claude, then voice-tuned by hand against the Digideck reference set the brief shipped with.

The honest version: AI doubled output without doubling decisions. The decisions — what shape the deck takes, where the emotional beats land, which chapter gets which tone, what the "I need to be here" moment actually is — are the human work. AI accelerates execution; it doesn't pick the bet.

## What's next

If round 2 lands well and there's a round 3, the upgrades that matter most:

1. **Per-prospect deck variants.** Token-gated shareable links that pre-set the Activation Builder default (lease for retail, sponsor for events agencies). Digideck-style personalization.
2. **Per-slide analytics.** View time, exit slide, hotspot interaction counts — the other half of Digideck as a product.
3. **Activation Builder → PDF.** Once Path + Brand + Venue are set, render a one-page React-PDF brief on the fly so the prospect can forward it internally. Closes the loop from "interactive moment" to "internal-buy-in artifact."

Live deck: <https://mall-of-america-deck-one.vercel.app>
Source: <https://github.com/Ananya-Bajpai/Mall-Of-America-LIAT.AI>
