import { mall } from "@/lib/data/mall-of-america";
import type { Chapter, Slide, SlideStat } from "./types";

const accent = (s: string) => (
  <span className="text-[var(--color-accent)]">{s}</span>
);
const italic = (s: string) => <span className="italic">{s}</span>;
const accentItalic = (s: string) => (
  <span className="italic text-[var(--color-accent)]">{s}</span>
);

const luxuryTenants = mall.flagshipTenants.filter((t) => t.category === "luxury");

const demographicLabels: Record<keyof typeof mall.demographics, string> = {
  averageHouseholdIncome: "Avg household income",
  averageDwellTime: "Avg dwell time",
  tourists: "Tourists",
  locals: "Locals",
  femaleVisitors: "Female visitors",
  ageMedian: "Median age",
};

const demoStats: SlideStat[] = (
  Object.entries(mall.demographics) as [keyof typeof mall.demographics, string][]
).map(([k, v]) => ({ value: v, label: demographicLabels[k] }));

const coverChapter: Chapter = {
  id: "cover",
  index: 0,
  label: "Overview",
  tagline: "The main menu",
  tone: "ink",
  tile: { image: "/videos/hero.mp4", alt: "Mall of America", isVideo: true },
  slides: [
    {
      kind: "cover",
      id: "cover-intro",
      tone: "ink",
      eyebrow: mall.location,
      headline: <>{mall.name}</>,
      body: mall.positioning,
      stats: mall.heroStats,
      bg: {
        kind: "video",
        src: "/videos/hero.mp4",
        overlay:
          "bg-gradient-to-b from-[var(--color-ink)]/10 via-[var(--color-ink)]/40 to-[var(--color-ink)]/95",
      },
    },
  ],
};

const whyChapter: Chapter = {
  id: "why",
  index: 1,
  label: "Why MOA",
  tagline: "Location, scale, audience",
  tone: "ink-soft",
  tile: { image: "/images/why.png", alt: "Regional reach" },
  slides: [
    {
      kind: "cover",
      id: "why-headline",
      tone: "ink-soft",
      eyebrow: "The opportunity",
      headline: (
        <>
          One third of North America <br />
          is a day&apos;s drive away.
        </>
      ),
      body: "Mall of America doesn't just attract locals. It attracts a continent. Fifteen minutes from a top-16 international airport. Direct light-rail access. Zero weather risk, 365 days a year.",
      stats: mall.reachStats,
    },
    {
      kind: "banner",
      id: "why-regional",
      tone: "ink",
      eyebrow: "Regional reach",
      image: "/images/why.png",
      alt: "Upper Midwest regional map — Mall of America at the center",
      captionTitle: (
        <>
          The Upper Midwest&apos;s <br />
          center of gravity.
        </>
      ),
      captionBody:
        "Bloomington, MN · 44° 51′ N · 15 minutes from MSP International · Direct light-rail to downtown.",
    },
    {
      kind: "dataWall",
      id: "why-demographics",
      tone: "ink-soft",
      eyebrow: "Audience",
      headline: (
        <>
          40 million visitors.
          <br />
          <span className="text-[var(--color-accent)]">One intentional audience.</span>
        </>
      ),
      stats: demoStats,
    },
  ],
};

const retailChapter: Chapter = {
  id: "retail",
  index: 2,
  label: "Retail",
  tagline: "520+ brands, one roof",
  tone: "ink",
  tile: { image: "/images/retail-flagship.png", alt: "Retail flagships" },
  slides: [
    {
      kind: "cover",
      id: "retail-headline",
      tone: "ink",
      eyebrow: "520+ brands",
      headline: (
        <>
          The brands that define culture. <br />
          {italic("Under one roof.")}
        </>
      ),
      body: "From Apple's flagship to emerging direct-to-consumer pop-ups, Mall of America is where discovery happens. Tenants aren't renting square footage — they're buying into the Upper Midwest's largest, most engaged shopping audience.",
    },
    {
      kind: "banner",
      id: "retail-flagships",
      tone: "ink",
      eyebrow: "Flagship anchors",
      image: "/images/retail-flagship.png",
      alt: "Flagship retail at Mall of America",
      captionTitle: <>Apple. Nike. LEGO.</>,
      captionBody: "The brands tenants benchmark against — under one roof.",
    },
    {
      kind: "grid",
      id: "retail-categories",
      tone: "ink",
      eyebrow: "Category breakdown",
      headline: (
        <>
          Four tiers. <br />
          {accent("One curated mix.")}
        </>
      ),
      columns: 4,
      cards: mall.retailCategories.map((c) => ({
        id: c.name.toLowerCase(),
        eyebrow: c.count,
        title: c.name,
        body: c.note,
      })),
    },
    {
      kind: "tenantWall",
      id: "retail-tenants",
      tone: "ink",
      eyebrow: "Featured tenants",
      headline: (
        <>
          A sample of who&apos;s
          <br />
          {accent("already here.")}
        </>
      ),
      variant: "logos",
      items: mall.flagshipTenants
        .filter((t) => t.category !== "luxury")
        .map((t) => t.name),
    },
  ],
};

const luxuryChapter: Chapter = {
  id: "luxury",
  index: 3,
  label: "Luxury",
  tagline: "The quiet wing",
  tone: "ink-soft",
  tile: { image: "/images/luxury/burberry.png", alt: "Luxury wing" },
  slides: [
    {
      kind: "cover",
      id: "luxury-headline",
      tone: "ink-soft",
      eyebrow: "Elevated",
      headline: (
        <>
          The quiet wing.
          <br />
          {accentItalic("Where brand meets patron.")}
        </>
      ),
      body: "Luxury at Mall of America isn't an afterthought — it's a curated, appointment-ready wing designed for high-intent shoppers who fly in specifically to visit.",
      metrics: [
        { label: "Avg. luxury basket", value: "$1,240" },
        { label: "International shopper share", value: "38%" },
        { label: "Private appointment requests YoY", value: "+41%" },
      ],
    },
    {
      kind: "grid",
      id: "luxury-brands",
      tone: "ink-soft",
      eyebrow: "Flagship brands",
      headline: (
        <>
          The wing&apos;s {accent("anchors.")}
        </>
      ),
      columns: 4,
      cards: luxuryTenants.map((t) => ({
        id: t.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        title: t.name,
        image: t.image,
      })),
    },
  ],
};

const diningChapter: Chapter = {
  id: "dining",
  index: 4,
  label: "Dining",
  tagline: "60+ restaurants",
  tone: "ink-soft",
  tile: { image: "/images/dining-hero.png", alt: "Dining at MOA" },
  slides: [
    {
      kind: "cover",
      id: "dining-headline",
      tone: "ink-soft",
      eyebrow: "Culinary",
      headline: (
        <>
          Food isn&apos;t the amenity. <br />
          {accentItalic("It's the reason.")}
        </>
      ),
      body: `${mall.dining.totalRestaurants} restaurants — chef-driven concepts, local Twin Cities favorites, fine dining, and global flavors. Average dwell time extends by 90 minutes when visitors dine on-site.`,
      bg: {
        kind: "image",
        src: "/images/dining-hero.png",
        alt: "Dining at Mall of America",
        overlay:
          "bg-gradient-to-b from-[var(--color-ink)]/75 via-[var(--color-ink)]/70 to-[var(--color-ink)]/92",
      },
    },
    {
      kind: "grid",
      id: "dining-highlights",
      tone: "ink-soft",
      eyebrow: "Signature restaurants",
      headline: (
        <>
          Six picks {accent("tenants cite most often.")}
        </>
      ),
      columns: 3,
      cards: mall.dining.highlights.map((h, i) => {
        const [name, ...rest] = h.split(" — ");
        return {
          id: `dining-${i}`,
          eyebrow: String(i + 1).padStart(2, "0"),
          title: name,
          body: rest.join(" — "),
        };
      }),
    },
  ],
};

const entertainmentChapter: Chapter = {
  id: "entertainment",
  index: 5,
  label: "Entertainment",
  tagline: "The differentiator",
  tone: "ink",
  tile: {
    image: "/images/attractions/nickelodeon.png",
    alt: "Entertainment at MOA",
  },
  slides: [
    {
      kind: "cover",
      id: "entertainment-headline",
      tone: "ink",
      eyebrow: "The differentiator",
      headline: (
        <>
          Other malls have shops. <br />
          {accentItalic("We have a day.")}
        </>
      ),
      body: "The reason average dwell is 3.5 hours — triple the U.S. mall average — is entertainment built at destination scale. Every attraction ahead is a reason to choose Mall of America over every other option in the region.",
      bg: {
        kind: "video",
        src: "/videos/entertainment.mp4",
        overlay:
          "bg-gradient-to-b from-[var(--color-ink)]/75 via-[var(--color-ink)]/70 to-[var(--color-ink)]/95",
      },
    },
    ...mall.attractions.map<Slide>((a, i) => ({
      kind: "attraction",
      id: `attraction-${i}`,
      tone: "ink",
      eyebrow: `Attraction 0${i + 1} of 0${mall.attractions.length}`,
      name: a.name,
      stat: a.stat,
      description: a.description,
      image: a.image ?? "/images/attractions/nickelodeon.png",
    })),
  ],
};

const eventsChapter: Chapter = {
  id: "events",
  index: 6,
  label: "Events",
  tagline: "A global platform",
  tone: "ink",
  tile: { image: "/images/attractions/flyover.png", alt: "Events platform" },
  slides: [
    {
      kind: "cover",
      id: "events-headline",
      tone: "ink",
      eyebrow: "Global platform",
      headline: (
        <>
          Not a mall.
          <br />
          A stage for <br />
          {accentItalic("cultural moments.")}
        </>
      ),
      body: "When a brand, artist, or team wants to reach the Midwest with scale, they come here. Four broadcast-ready venues. Turnkey production. A permanent audience.",
      bg: {
        kind: "video",
        src: "/videos/events.mp4",
        overlay:
          "bg-gradient-to-b from-[var(--color-ink)]/80 via-[var(--color-ink)]/70 to-[var(--color-ink)]/95",
      },
    },
    {
      kind: "grid",
      id: "events-venues",
      tone: "ink",
      eyebrow: "Broadcast-ready venues",
      headline: (
        <>
          Four venues.
          <br />
          {accent("Zero production friction.")}
        </>
      ),
      columns: 2,
      cards: mall.venues.map((v) => ({
        id: v.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        eyebrow: v.capacity,
        title: v.name,
        body: v.useCase,
      })),
    },
    {
      kind: "tenantWall",
      id: "events-highlights",
      tone: "ink",
      eyebrow: "Recent highlights",
      headline: (
        <>
          The property
          <br />
          {accent("already on the calendar.")}
        </>
      ),
      items: [...mall.eventsHighlights],
    },
  ],
};

const partnerChapter: Chapter = {
  id: "partner",
  index: 7,
  label: "Partner",
  tagline: "Next steps",
  tone: "ink",
  tile: { image: "/images/retail-flagship.png", alt: "Partner with MOA" },
  slides: [
    {
      kind: "cover",
      id: "partner-headline",
      tone: "ink",
      eyebrow: "Next steps",
      headline: (
        <>
          Three ways
          <br />
          {accentItalic("to partner.")}
        </>
      ),
      body: "Every slide before this is the pitch. This one is the ask. Pick the path that fits and the right team will be on the call within 48 hours.",
    },
    {
      kind: "grid",
      id: "partner-paths",
      tone: "ink",
      eyebrow: "Start a conversation",
      headline: <>Pick your path.</>,
      columns: 3,
      cards: mall.ctaPaths.map((p) => ({
        id: p.id,
        eyebrow: p.kicker,
        title: p.title,
        body: p.description,
        href: p.href,
        cta: p.cta,
      })),
    },
  ],
};

export const deck = {
  chapters: [
    coverChapter,
    whyChapter,
    retailChapter,
    luxuryChapter,
    diningChapter,
    entertainmentChapter,
    eventsChapter,
    partnerChapter,
  ] satisfies Chapter[],
};

export type Deck = typeof deck;

export const totalSlides = deck.chapters.reduce(
  (sum, ch) => sum + ch.slides.length,
  0,
);
