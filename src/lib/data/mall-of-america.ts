export type SectionId =
  | "hero"
  | "why"
  | "retail"
  | "luxury"
  | "dining"
  | "entertainment"
  | "events"
  | "cta";

export type Section = {
  id: SectionId;
  label: string;
  eyebrow: string;
};

export type Stat = {
  value: string;
  label: string;
  detail?: string;
};

export type Tenant = {
  name: string;
  category: "flagship" | "luxury" | "lifestyle" | "experiential" | "dining";
  image?: string;
};

export type Attraction = {
  name: string;
  description: string;
  stat?: string;
  image?: string;
};

export type Venue = {
  name: string;
  capacity: string;
  useCase: string;
};

export const mall = {
  name: "Mall of America",
  shortName: "MOA",
  location: "Bloomington, Minnesota",
  tagline: "A Destination Unlike Any Other",
  positioning:
    "Where retail, entertainment, dining, and live events converge into a single, unmissable platform — the most visited destination in the Upper Midwest.",

  sections: [
    { id: "hero", label: "Overview", eyebrow: "Welcome" },
    { id: "why", label: "Why MOA", eyebrow: "The Opportunity" },
    { id: "retail", label: "Retail", eyebrow: "520+ Brands" },
    { id: "luxury", label: "Luxury", eyebrow: "Elevated" },
    { id: "dining", label: "Dining", eyebrow: "Culinary" },
    { id: "entertainment", label: "Entertainment", eyebrow: "The Differentiator" },
    { id: "events", label: "Events", eyebrow: "Global Platform" },
    { id: "cta", label: "Partner", eyebrow: "Next Steps" },
  ] satisfies Section[],

  heroStats: [
    { value: "40M+", label: "Annual Visitors", detail: "Top 3 tourist destination in the U.S." },
    { value: "5.6M", label: "Sq Ft", detail: "Seven Yankee Stadiums could fit inside" },
    { value: "520+", label: "Stores", detail: "From flagships to emerging brands" },
  ] satisfies Stat[],

  reachStats: [
    { value: "1 in 3", label: "U.S. & Canada residents within a day's drive" },
    { value: "15 min", label: "From MSP International Airport" },
    { value: "$2B+", label: "Annual economic impact" },
    { value: "60+", label: "Countries represented among visitors" },
  ] satisfies Stat[],

  demographics: {
    averageHouseholdIncome: "$87,400",
    averageDwellTime: "3.5 hours",
    tourists: "40%",
    locals: "60%",
    femaleVisitors: "58%",
    ageMedian: "34",
  },

  retailCategories: [
    { name: "Flagship", count: "30+", note: "Apple, Nike, LEGO, Uniqlo" },
    { name: "Specialty", count: "320+", note: "Curated across fashion, beauty, tech" },
    { name: "Lifestyle", count: "90+", note: "Athleisure, wellness, home" },
    { name: "Pop-Up & Emerging", count: "40+", note: "Rotating experiential retail" },
  ],

  flagshipTenants: [
    { name: "Apple", category: "flagship" },
    { name: "Nike", category: "flagship" },
    { name: "LEGO", category: "flagship" },
    { name: "Uniqlo", category: "flagship" },
    { name: "Zara", category: "flagship" },
    { name: "Sephora", category: "flagship" },
    { name: "Louis Vuitton", category: "luxury", image: "/images/luxury/louis-vuitton.png" },
    { name: "Burberry", category: "luxury", image: "/images/luxury/burberry.png" },
    { name: "Tiffany & Co.", category: "luxury", image: "/images/luxury/tiffany.png" },
    { name: "Coach", category: "luxury", image: "/images/luxury/coach.png" },
    { name: "lululemon", category: "lifestyle" },
    { name: "Aritzia", category: "lifestyle" },
  ] satisfies Tenant[],

  attractions: [
    {
      name: "Nickelodeon Universe",
      description:
        "The nation's largest indoor theme park — 27 rides, 7 acres, all under one roof.",
      stat: "27 rides · 7 acres",
      image: "/images/attractions/nickelodeon.png",
    },
    {
      name: "SEA LIFE Minnesota Aquarium",
      description:
        "A 1.2-million-gallon underwater journey with 10,000+ marine creatures.",
      stat: "10,000+ species",
      image: "/images/attractions/sealife.png",
    },
    {
      name: "FlyOver America",
      description:
        "Cinematic flight-ride experience across America's most iconic landscapes.",
      stat: "6-story screen",
      image: "/images/attractions/flyover.png",
    },
    {
      name: "Crayola Experience",
      description:
        "A 60,000 sq ft creative playground — the only one in the Upper Midwest.",
      stat: "60,000 sq ft",
      image: "/images/attractions/crayola-cinematic.png",
    },
    {
      name: "The Escape Game",
      description:
        "Immersive, story-driven group adventures drawing both locals and tourists.",
      image: "/images/attractions/escape-game-cinematic.png",
    },
    {
      name: "Mirror Maze & Smash Dance",
      description:
        "High-energy interactive venues built for content, groups, and dwell time.",
      image: "/images/attractions/mirror-maze-cinematic.png",
    },
  ] satisfies Attraction[],

  dining: {
    totalRestaurants: "60+",
    highlights: [
      "Crave — Upscale contemporary American",
      "Cantina Laredo — Modern Mexican",
      "Tucci Benucch — Italian fine dining",
      "Twin City Grill — Local favorite, award-winning",
      "FireLake Grill House — Regional farm-to-table",
      "Hard Rock Cafe — Live music + American classics",
    ],
  },

  venues: [
    {
      name: "Huntington Bank Rotunda",
      capacity: "7,000 standing",
      useCase:
        "Concerts, celebrity appearances, brand launches, political rallies. Broadcast-ready.",
    },
    {
      name: "North Atrium",
      capacity: "3,500",
      useCase: "Fashion shows, product reveals, press events, VIP receptions.",
    },
    {
      name: "Executive Center",
      capacity: "800",
      useCase: "Corporate conferences, private dinners, investor days.",
    },
    {
      name: "FlyOver Theater",
      capacity: "Immersive",
      useCase: "Brand-funded custom flight experiences and activations.",
    },
  ] satisfies Venue[],

  eventsHighlights: [
    "Taylor Swift fan activations",
    "NFL Draft Experience (2025)",
    "Minnesota Vikings Championship Rallies",
    "Super Bowl LII Host Programming",
    "Nickelodeon Kids' Choice Awards red carpet",
    "Presidential campaign rallies",
  ],

  ctaPaths: [
    {
      id: "leasing",
      title: "Lease Space",
      kicker: "Retail · Pop-Up · F&B",
      description:
        "Launch your flagship, debut a concept, or activate a pop-up inside North America's most-visited destination.",
      href: "mailto:leasing@mallofamerica.com?subject=Leasing%20Inquiry",
      cta: "Start a leasing conversation",
    },
    {
      id: "sponsorship",
      title: "Become a Partner",
      kicker: "Sponsorship · Brand Integration",
      description:
        "Anchor a venue, name an attraction, or integrate your brand into 40M annual visitor journeys.",
      href: "mailto:partnerships@mallofamerica.com?subject=Partnership%20Inquiry",
      cta: "Explore partnership tiers",
    },
    {
      id: "events",
      title: "Book the Property",
      kicker: "Concerts · Activations · Corporate",
      description:
        "Four broadcast-ready venues. Turnkey production. A built-in audience.",
      href: "mailto:events@mallofamerica.com?subject=Event%20Booking",
      cta: "Plan your event",
    },
  ],
} as const;

export type MallData = typeof mall;
