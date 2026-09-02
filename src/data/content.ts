export const brand = {
  name: "MAISON",
  tagline: "Atelier of Transformation",
  description:
    "A contemporary atelier where hair becomes identity. Craft, precision, and expression for women and men.",
  philosophy:
    "We believe hair is not simply a service. It is identity. Style. Confidence. Expression. Every transformation begins with listening — to you, your hair, your story.",
  email: "atelier@maison.studio",
  phone: "+44 20 7946 0234",
  address: {
    line1: "14 Boundary Street",
    line2: "Shoreditch",
    city: "London",
    postcode: "E2 7DD",
    country: "United Kingdom",
  },
  hours: [
    { day: "Tuesday — Friday", time: "10:00 — 19:00" },
    { day: "Saturday", time: "09:00 — 18:00" },
    { day: "Sunday — Monday", time: "By appointment" },
  ],
  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Pinterest", href: "https://pinterest.com" },
    { label: "TikTok", href: "https://tiktok.com" },
  ],
};

export const heroNarrative = [
  { word: "IDENTITY", sub: "Who you are" },
  { word: "FORM", sub: "The shape of you" },
  { word: "TEXTURE", sub: "What makes you, you" },
  { word: "TRANSFORMATION", sub: "Becoming" },
  { word: "CONFIDENCE", sub: "The result" },
];

export const atelierDetails = [
  { label: "The Space", text: "A converted warehouse with natural light, raw concrete, and warm oak." },
  { label: "The Chairs", text: "Six styling stations, each a private stage for transformation." },
  { label: "The Light", text: "North-facing windows and calibrated mirrors for true colour." },
  { label: "The Ritual", text: "Espresso, consultation, craft. Never rushed." },
];

export type Stylist = {
  id: string;
  name: string;
  specialty: string;
  philosophy: string;
  image: string;
  work: string[];
};

export const stylists: Stylist[] = [
  {
    id: "elena",
    name: "Elena Voss",
    specialty: "Editorial Cut & Form",
    philosophy: "A cut should move with you, not against you. I sculpt for life, not for the mirror.",
    image: "/stylist-elena.webp",
    work: ["/portfolio-1.webp", "/portfolio-2.webp", "/portfolio-9.webp"],
  },
  {
    id: "marco",
    name: "Marco Reni",
    specialty: "Colour & Light",
    philosophy: "Colour is architecture for the face. I paint with light, not with trends.",
    image: "/stylist-marco.webp",
    work: ["/portfolio-2.webp", "/portfolio-8.webp", "/portfolio-4.webp"],
  },
  {
    id: "yuki",
    name: "Yuki Tanaka",
    specialty: "Texture & Treatment",
    philosophy: "Healthy hair is the foundation. Everything else is decoration on a strong canvas.",
    image: "/stylist-yuki.webp",
    work: ["/portfolio-6.webp", "/portfolio-9.webp", "/portfolio-3.webp"],
  },
  {
    id: "amara",
    name: "Amara Okafor",
    specialty: "Curl & Natural Texture",
    philosophy: "Every curl has a personality. I don't tame — I reveal what was always there.",
    image: "/stylist-amara.webp",
    work: ["/portfolio-3.webp", "/portfolio-1.webp", "/portfolio-7.webp"],
  },
];

export type ServiceCategory = {
  id: string;
  label: string;
  title: string;
  description: string;
  image: string;
  services: { name: string; description: string; duration: string; price: string }[];
};

export const hairCategories: ServiceCategory[] = [
  {
    id: "cut",
    label: "CUT",
    title: "The Architecture of Form",
    description:
      "Every cut begins with bone structure, hair texture, and the way you move through your day. We sculpt for life.",
    image: "/cat-cut.webp",
    services: [
      { name: "Signature Cut", description: "Consultation, cut, and finish", duration: "75 min", price: "£120" },
      { name: "Restyle", description: "A new direction, fully explored", duration: "90 min", price: "£150" },
      { name: "Men's Cut", description: "Tailored cut and style", duration: "45 min", price: "£75" },
      { name: "Fringe & Shape", description: "Refine and refresh between visits", duration: "30 min", price: "£45" },
    ],
  },
  {
    id: "color",
    label: "COLOR",
    title: "Painting with Light",
    description:
      "Colour is not applied. It is composed. We work with your natural depth to create dimension that feels lived-in.",
    image: "/cat-color.webp",
    services: [
      { name: "Full Colour", description: "Single-process depth and shine", duration: "120 min", price: "£140" },
      { name: "Balayage", description: "Hand-painted, sun-kissed dimension", duration: "180 min", price: "£220" },
      { name: "Foil Highlights", description: "Precision lightening for contrast", duration: "150 min", price: "£180" },
      { name: "Colour Correction", description: "A considered path to your goal", duration: "Consultation", price: "From £250" },
    ],
  },
  {
    id: "texture",
    label: "TEXTURE",
    title: "The Language of Movement",
    description:
      "Curl, wave, straight — we work with your hair's natural tendency, enhancing texture rather than fighting it.",
    image: "/cat-texture.webp",
    services: [
      { name: "Curl Definition", description: "Shape and define natural texture", duration: "90 min", price: "£130" },
      { name: "Keratin Smoothing", description: "Reduce frizz, keep movement", duration: "150 min", price: "£200" },
      { name: "Perm & Wave", description: "Permanent texture, modern technique", duration: "150 min", price: "£170" },
      { name: "Blow-Dry & Style", description: "Finish and form for any occasion", duration: "45 min", price: "£55" },
    ],
  },
  {
    id: "care",
    label: "CARE",
    title: "The Ritual of Restoration",
    description:
      "Healthy hair is the canvas. Our treatments are rituals — deep, restorative, and tailored to what your hair needs today.",
    image: "/cat-care.webp",
    services: [
      { name: "Deep Conditioning", description: "Intensive moisture and protein", duration: "45 min", price: "£65" },
      { name: "Scalp Treatment", description: "Detox and rebalance the foundation", duration: "60 min", price: "£85" },
      { name: "Olaplex Bond Repair", description: "Rebuild broken bonds, restore strength", duration: "30 min", price: "£50" },
      { name: "Gloss & Shine", description: "Lacquer-like finish and luminosity", duration: "45 min", price: "£70" },
    ],
  },
  {
    id: "transformation",
    label: "TRANSFORMATION",
    title: "The Full Atelier Experience",
    description:
      "A complete journey. Cut, colour, treatment, and finish — composed together in a single session of focused craft.",
    image: "/cat-transformation.webp",
    services: [
      { name: "The Atelier Day", description: "Full transformation, start to finish", duration: "4 hours", price: "From £450" },
      { name: "Bridal & Event", description: "Occasion styling and trial session", duration: "120 min", price: "£280" },
      { name: "Editorial Session", description: "For shoots, campaigns, and film", duration: "By project", price: "On request" },
    ],
  },
];

export const beautyCategories: ServiceCategory[] = [
  {
    id: "brows",
    label: "BROWS",
    title: "Framing the Face",
    description: "Brows are architecture. We shape, tint, and define to balance your features.",
    image: "/cat-brows.webp",
    services: [
      { name: "Brow Shape & Wax", description: "Architectural shaping", duration: "30 min", price: "£35" },
      { name: "Brow Lamination", description: "Full, brushed-up finish", duration: "45 min", price: "£55" },
      { name: "Brow Tint", description: "Depth and definition", duration: "20 min", price: "£25" },
    ],
  },
  {
    id: "lashes",
    label: "LASHES",
    title: "The Quiet Drama",
    description: "Lift, tint, or extend. Subtle enhancement that changes the whole face.",
    image: "/cat-lashes.webp",
    services: [
      { name: "Lash Lift & Tint", description: "Natural curl and depth", duration: "60 min", price: "£65" },
      { name: "Lash Extensions", description: "Classic to volume", duration: "90 min", price: "£95" },
      { name: "Lash Infill", description: "Maintain the look", duration: "60 min", price: "£55" },
    ],
  },
  {
    id: "makeup",
    label: "MAKEUP",
    title: "The Final Composition",
    description: "Editorial makeup for events, photography, or simply feeling like the most refined version of yourself.",
    image: "/cat-makeup.webp",
    services: [
      { name: "Event Makeup", description: "Full application, lasting wear", duration: "60 min", price: "£85" },
      { name: "Natural Makeup", description: "Effortless, skin-focused", duration: "45 min", price: "£65" },
      { name: "Editorial Makeup", description: "For photography and film", duration: "90 min", price: "£120" },
    ],
  },
];

export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  image: string;
  aspect: "portrait" | "landscape" | "square";
};

export const portfolio: PortfolioItem[] = [
  { id: "p1", title: "Sculpted Bob", category: "Cut", image: "/portfolio-1.webp", aspect: "portrait" },
  { id: "p2", title: "Sunlit Balayage", category: "Color", image: "/portfolio-2.webp", aspect: "landscape" },
  { id: "p3", title: "Natural Curl Definition", category: "Texture", image: "/portfolio-3.webp", aspect: "portrait" },
  { id: "p4", title: "Editorial Silver", category: "Color", image: "/portfolio-4.webp", aspect: "square" },
  { id: "p5", title: "Men's Textured Crop", category: "Cut", image: "/portfolio-5.webp", aspect: "portrait" },
  { id: "p6", title: "Gloss Treatment", category: "Care", image: "/portfolio-6.webp", aspect: "landscape" },
  { id: "p7", title: "Bridal Updo", category: "Transformation", image: "/portfolio-7.webp", aspect: "portrait" },
  { id: "p8", title: "Copper Transformation", category: "Color", image: "/portfolio-8.webp", aspect: "square" },
  { id: "p9", title: "Soft Waves", category: "Texture", image: "/portfolio-9.webp", aspect: "landscape" },
];

export const transformationImages = {
  before: "/transform-before.webp",
  after: "/transform-after.webp",
  label: "From natural to sculpted copper",
};

export type TimeSlot = { time: string; available: boolean };

export const availableSlots: TimeSlot[] = [
  { time: "10:00", available: true },
  { time: "11:30", available: true },
  { time: "13:00", available: false },
  { time: "14:30", available: true },
  { time: "16:00", available: true },
  { time: "17:30", available: false },
];
