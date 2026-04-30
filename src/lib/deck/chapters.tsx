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
  label: "The Stage",
  tagline: "Location, scale, audience",
  tone: "ink-soft",
  tile: { image: "/images/why.png", alt: "Regional reach" },
  slides: [
    {
      kind: "cinematic",
      id: "why-cinematic",
      tone: "ink",
      video: "/videos/chapter-01-stage.mp4",
      poster: "/images/why.png",
      alt: "Aerial transition from Twin Cities into Mall of America",
      eyebrow: "01 — The Stage",
      title: (
        <>
          One third of North America
          <br />
          {accent("a day's drive away.")}
        </>
      ),
    },
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
      kind: "comparison",
      id: "why-comparison",
      tone: "ink",
      eyebrow: "By the numbers",
      headline: (
        <>
          The U.S. has 1,150 malls.
          <br />
          {accent("This isn't one of them.")}
        </>
      ),
      subjectLabel: "Mall of America",
      baselineLabel: "Average U.S. mall",
      rows: [
        {
          label: "Annual visitors",
          subject: "32M",
          baseline: "8M",
          multiplier: "4× higher foot traffic",
        },
        {
          label: "Average dwell",
          subject: "3.5 hr",
          baseline: "1.1 hr",
          multiplier: "3× longer engagement",
        },
        {
          label: "Gross leasable area",
          subject: "5.6M sq ft",
          baseline: "850K sq ft",
          multiplier: "Largest in the Hemisphere",
        },
        {
          label: "Stores",
          subject: "520+",
          baseline: "120",
        },
        {
          label: "Indoor attractions",
          subject: "6 majors",
          baseline: "0",
          multiplier: "Theme park inside",
        },
      ],
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
      kind: "cinematic",
      id: "retail-cinematic",
      tone: "ink",
      poster: "/images/cinematic/chapter-02-retail.png",
      alt: "Apple Store flagship row before opening",
      eyebrow: "02 — Retail Climate",
      title: (
        <>
          Where brands {accent("debut.")}
        </>
      ),
    },
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
      kind: "hotspot",
      id: "retail-flagship-hotspot",
      tone: "ink",
      eyebrow: "Flagship anchors",
      headline: (
        <>
          Six anchors, {accent("one corridor.")}
        </>
      ),
      image: "/images/hotspot/flagship-row.png",
      alt: "Flagship retail corridor at Mall of America",
      hotspots: [
        {
          id: "apple",
          x: 12,
          y: 55,
          label: "Apple",
          stat: "$5,500 sq ft",
          detail: "The highest-grossing tenant per square foot. Apple's MOA flagship outperforms 80% of its U.S. fleet on weekend traffic.",
        },
        {
          id: "nike",
          x: 28,
          y: 60,
          label: "Nike",
          stat: "8,200 sq ft",
          detail: "Direct-to-consumer flagship anchoring the south corridor. Hosts seasonal product drops and athlete activations year-round.",
        },
        {
          id: "lego",
          x: 42,
          y: 58,
          label: "LEGO",
          stat: "9-ft brick installation",
          detail: "One of three LEGO destination stores in North America. The in-store builds are a feature, not a display.",
        },
        {
          id: "uniqlo",
          x: 58,
          y: 62,
          label: "Uniqlo",
          stat: "Mid-Atlantic anchor",
          detail: "Uniqlo's deepest U.S. footprint outside coastal flagships — with full LifeWear, KAWS collabs, and Heattech in-season.",
        },
        {
          id: "zara",
          x: 73,
          y: 60,
          label: "Zara",
          stat: "Twin-floor format",
          detail: "Largest Zara in the Upper Midwest. Drop cycles run 2× weekly with Inditex's same-day replenishment infrastructure.",
        },
        {
          id: "sephora",
          x: 88,
          y: 58,
          label: "Sephora",
          stat: "12,000 sq ft",
          detail: "Beauty's most-visited Midwestern flagship. Hosts brand-launch events with Fenty, Rare, Charlotte Tilbury throughout the year.",
        },
      ],
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
  label: "The Quiet Wing",
  tagline: "Where brand meets patron",
  tone: "ink-soft",
  tile: { image: "/images/luxury/burberry.png", alt: "Luxury wing" },
  slides: [
    {
      kind: "cinematic",
      id: "luxury-cinematic",
      tone: "ink",
      poster: "/images/cinematic/chapter-03-luxury.png",
      alt: "Hushed luxury boutique vestibule",
      eyebrow: "03 — The Quiet Wing",
      title: (
        <>
          Where brand
          <br />
          {accentItalic("meets patron.")}
        </>
      ),
    },
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
      kind: "gallery",
      id: "luxury-gallery",
      tone: "ink-soft",
      eyebrow: "Flagship brands",
      headline: (
        <>
          The wing&apos;s {accent("anchors.")}
        </>
      ),
      items: luxuryTenants.map((t) => ({
        id: t.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        image: t.image ?? "/images/luxury/burberry.png",
        alt: `${t.name} at Mall of America`,
        title: t.name,
        caption: getLuxuryCaption(t.name),
      })),
    },
  ],
};

function getLuxuryCaption(brand: string): string {
  switch (brand) {
    case "Louis Vuitton":
      return "Heritage Maison · appointment-ready · Vuitton's deepest U.S. footprint outside Manhattan.";
    case "Burberry":
      return "Trench heritage meets contemporary collaboration drops. Limited-release events 4× yearly.";
    case "Tiffany & Co.":
      return "Engagement-grade clientele. Private salons. The largest Tiffany in the Upper Midwest.";
    case "Coach":
      return "Coachtopia line and customization atelier. Generation Z's gateway luxury anchor.";
    default:
      return "An anchor of the appointment-ready luxury wing.";
  }
}

const diningChapter: Chapter = {
  id: "dining",
  index: 4,
  label: "The Table",
  tagline: "60+ restaurants",
  tone: "ink-soft",
  tile: { image: "/images/dining-hero.png", alt: "Dining at MOA" },
  slides: [
    {
      kind: "cinematic",
      id: "dining-cinematic",
      tone: "ink",
      poster: "/images/cinematic/chapter-04-dining.png",
      alt: "Chef plating at a candle-lit MOA dining table",
      eyebrow: "04 — The Table",
      title: (
        <>
          Food isn&apos;t the amenity.
          <br />
          {accentItalic("It's the reason.")}
        </>
      ),
    },
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
  label: "The Theme Park Inside",
  tagline: "The differentiator",
  tone: "ink",
  tile: {
    image: "/images/attractions/nickelodeon.png",
    alt: "Entertainment at MOA",
  },
  slides: [
    {
      kind: "cinematic",
      id: "entertainment-cinematic",
      tone: "ink",
      video: "/videos/chapter-05-themepark.mp4",
      poster: "/images/attractions/nickelodeon.png",
      alt: "Roller coaster cresting under MOA's atrium skylights",
      eyebrow: "05 — The Theme Park Inside",
      title: (
        <>
          Other malls have shops.
          <br />
          {accentItalic("We have a day.")}
        </>
      ),
    },
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
    {
      kind: "videoLightbox",
      id: "entertainment-attractions",
      tone: "ink",
      eyebrow: "Six attractions",
      headline: (
        <>
          Tap any attraction to {accent("step inside.")}
        </>
      ),
      items: mall.attractions.map((a, i) => {
        const slug = a.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        const videoMap: Record<number, string> = {
          0: "/videos/attractions/nick-universe.mp4",
          1: "/videos/attractions/sealife.mp4",
          2: "/videos/attractions/flyover.mp4",
        };
        return {
          id: slug,
          poster: a.image ?? "/images/attractions/nickelodeon.png",
          video: videoMap[i],
          title: a.name,
          stat: a.stat,
          description: a.description,
        };
      }),
    },
  ],
};

const eventsChapter: Chapter = {
  id: "events",
  index: 6,
  label: "Cultural Moments",
  tagline: "A global platform",
  tone: "ink",
  tile: { image: "/images/attractions/flyover.png", alt: "Events platform" },
  slides: [
    {
      kind: "cinematic",
      id: "events-cinematic",
      tone: "ink",
      video: "/videos/chapter-06-cultural.mp4",
      poster: "/images/attractions/flyover.png",
      alt: "The Rotunda packed mid-event, broadcast lights and crowd phone glow",
      eyebrow: "06 — Cultural Moments",
      title: (
        <>
          Not a mall.
          <br />
          A stage for {accentItalic("cultural moments.")}
        </>
      ),
    },
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
      kind: "timeline",
      id: "events-timeline",
      tone: "ink",
      eyebrow: "Recent highlights",
      headline: (
        <>
          The property
          <br />
          {accent("already on the calendar.")}
        </>
      ),
      moments: [
        {
          id: "superbowl",
          date: "Feb 2018",
          title: "Super Bowl LII Host Programming",
          description:
            "MOA served as official host venue for Super Bowl LII media activations and broadcast operations — proof that the property functions at NFL-grade event scale.",
          image: "/images/cultural/superbowl.png",
        },
        {
          id: "vikings",
          date: "Jan 2018",
          title: "Vikings Championship Rally",
          description:
            "Sea of purple and gold packed the Rotunda for the championship celebration — the first major rally to confirm MOA's draw for civic moments.",
          image: "/images/cultural/vikings.png",
        },
        {
          id: "kca",
          date: "Mar 2022",
          title: "Kids' Choice Awards Red Carpet",
          description:
            "Nickelodeon's family-broadcast moment lived inside the property's atrium — a built-in match for MOA's family-skewing audience.",
          image: "/images/cultural/kca.png",
        },
        {
          id: "swift",
          date: "Aug 2023",
          title: "Taylor Swift Eras Activation",
          description:
            "Three weekends of fan-bracelet trades, photo walls, and tour-merch drops. Foot traffic spiked to weekend records.",
          image: "/images/cultural/swift.png",
        },
        {
          id: "rally",
          date: "Oct 2024",
          title: "Presidential Campaign Rally",
          description:
            "The Rotunda configured for a town-hall format, with broadcast-grade staging and crowd capacity in the thousands.",
          image: "/images/cultural/rally.png",
        },
        {
          id: "draft",
          date: "Apr 2025",
          title: "NFL Draft Experience",
          description:
            "MOA hosted multi-day NFL Draft fan experiences — jersey reveals, athlete meet-and-greets, and live-draft watch parties.",
          image: "/images/cultural/nfl-draft.png",
        },
      ],
    },
  ],
};

const activationChapter: Chapter = {
  id: "build",
  index: 7,
  label: "Build Your Activation",
  tagline: "I need to be here",
  tone: "ink",
  tile: { image: "/images/venues/rotunda.png", alt: "Build your activation" },
  slides: [
    {
      kind: "cinematic",
      id: "activation-cinematic",
      tone: "ink",
      video: "/videos/chapter-07-build.mp4",
      poster: "/images/venues/rotunda.png",
      alt: "The Rotunda, dark — about to ignite with a custom logo",
      eyebrow: "07 — Build Your Activation",
      title: (
        <>
          Drop your brand
          <br />
          {accentItalic("on the Rotunda.")}
        </>
      ),
      fallbackDurationMs: 3500,
    },
    {
      kind: "activationBuilder",
      id: "activation-builder",
      tone: "ink",
      eyebrow: "I need to be here",
      headline: (
        <>
          Pick a path. Drop your brand.
          <br />
          {accent("See it on the property.")}
        </>
      ),
      venues: [
        {
          id: "atrium",
          pathFor: "lease",
          plate: "/images/venues/atrium.png",
          alt: "Atrium runway banner with logo placeholder",
          name: "North Atrium · Runway Banner",
          zone: { x: 35, y: 18, width: 30, height: 22 },
          blendMode: "multiply",
          reach: "~3.2M annual eyeballs",
          comp: "Flagship · 8,200 sqft",
          leadTime: "60–90 days",
          ctaSubject: "Leasing inquiry — flagship",
        },
        {
          id: "rotunda",
          pathFor: "sponsor",
          plate: "/images/venues/rotunda.png",
          alt: "Rotunda LED ring with logo placeholder",
          name: "Huntington Bank Rotunda · LED Ring",
          zone: { x: 26, y: 22, width: 48, height: 14 },
          blendMode: "screen",
          reach: "~6.4M annual eyeballs",
          comp: "Concert/launch · 7,000 cap · broadcast",
          leadTime: "30 days",
          ctaSubject: "Sponsorship inquiry — Rotunda LED",
        },
        {
          id: "flyover",
          pathFor: "event",
          plate: "/images/venues/flyover.png",
          alt: "FlyOver Theater pre-show screen with logo placeholder",
          name: "FlyOver Theater · Pre-Show Screen",
          zone: { x: 28, y: 28, width: 44, height: 32 },
          blendMode: "screen",
          reach: "~1.1M annual eyeballs",
          comp: "Custom flight · IMAX-grade screen",
          leadTime: "45 days",
          ctaSubject: "Event booking — FlyOver Theater",
        },
      ],
    },
  ],
};

const partnerChapter: Chapter = {
  id: "partner",
  index: 8,
  label: "Partner",
  tagline: "Next steps",
  tone: "ink",
  tile: { image: "/images/partner-hero.png", alt: "Partner with MOA" },
  slides: [
    {
      kind: "cinematic",
      id: "partner-cinematic",
      tone: "ink",
      poster: "/images/cinematic/chapter-08-partner.png",
      alt: "Two hands meeting across a walnut conference table at golden hour",
      eyebrow: "08 — Partner",
      title: (
        <>
          Three ways
          <br />
          {accentItalic("to partner.")}
        </>
      ),
      fallbackDurationMs: 3500,
    },
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
      bg: {
        kind: "image",
        src: "/images/partner-hero.png",
        alt: "Partnership at Mall of America",
        overlay:
          "bg-gradient-to-b from-[var(--color-ink)]/70 via-[var(--color-ink)]/65 to-[var(--color-ink)]/92",
      },
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
    activationChapter,
    partnerChapter,
  ] satisfies Chapter[],
};

export type Deck = typeof deck;

export const totalSlides = deck.chapters.reduce(
  (sum, ch) => sum + ch.slides.length,
  0,
);

// Used when narrowing in components that work with slide-typed unions.
export type DeckSlide = Slide;
