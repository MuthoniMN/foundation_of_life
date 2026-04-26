/**
 * Site content layer.
 *
 * All editable content lives here so the website is easy to swap to a
 * headless CMS (e.g. Payload) later. When your Payload instance is ready,
 * replace these exports with `await fetch(payloadApi + "/...")` calls — the
 * shape of each export is the contract the components rely on.
 */

export const site = {
  name: "Chariots of Destiny Children's Center",
  tagline: "A home, a school, a future.",
  shortDescription:
    "Chariots of Destiny Children's Center is a church-founded children's home and school. We provide a loving family, daily meals, and a complete education to children who need it most.",
  founded: 2009,
  childrenServed: 84,
  graduates: 217,
  contact: {
    email: "hello@hopehouse.org",
    phone: "+254 700 000 000",
    address: "Chariots of Destiny Children's Center, Riverside Lane, Nairobi, Kenya",
  },
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
  },
};

export const programs = [
  {
    icon: "🏠",
    title: "A safe home",
    body: "Every child has a bed, three meals a day, clothing, and house parents who know them by name.",
  },
  {
    icon: "📚",
    title: "Full-time school",
    body: "Pre-primary through secondary education on-site, with qualified teachers and a library that keeps growing.",
  },
  {
    icon: "🩺",
    title: "Health & counseling",
    body: "Routine check-ups, dental care, and trauma-informed counseling so every child can heal and thrive.",
  },
  {
    icon: "⚽",
    title: "Play, art & faith",
    body: "Sports, music, art, and a Sunday gathering — the simple joys that make a childhood feel like a childhood.",
  },
];

export const stories = [
  {
    name: "Amani",
    age: 14,
    quote:
      "When I came to Chariots of Destiny Children's Center I didn't know how to read. Now I'm top of my class in science and I want to be a nurse.",
  },
  {
    name: "Joseph",
    age: 11,
    quote:
      "My favourite thing is football after class, and the rice and beans on Friday. I have brothers here now.",
  },
  {
    name: "Faith",
    age: 16,
    quote:
      "The teachers helped me believe I could finish school. Next year I'm sitting my final exams.",
  },
];

/**
 * Quarterly accountability summaries.
 * In the Payload-backed version this becomes a `funds_reports` collection.
 */
export type FundReport = {
  period: string; // e.g. "Q3 2024 (Jul – Sep)"
  totalReceived: number; // in USD
  totalSpent: number; // in USD
  categories: { label: string; amount: number; color: string }[];
  notes: string;
  reportUrl?: string; // optional PDF link
};

export const fundReports: FundReport[] = [
  {
    period: "Q3 2025 (Jul – Sep)",
    totalReceived: 42180,
    totalSpent: 38940,
    categories: [
      { label: "Food & nutrition", amount: 11200, color: "var(--coral)" },
      { label: "School fees & supplies", amount: 9800, color: "var(--sky)" },
      { label: "Housing & utilities", amount: 6700, color: "var(--mint)" },
      { label: "Medical care", amount: 4100, color: "var(--sun)" },
      { label: "Staff salaries", amount: 5640, color: "var(--grape)" },
      { label: "Repairs & admin", amount: 1500, color: "var(--muted-foreground)" },
    ],
    notes:
      "Built a new water tank to replace the leaking one (thank you to the Riverside Church youth group). Two graduates received scholarships to vocational college.",
  },
  {
    period: "Q2 2025 (Apr – Jun)",
    totalReceived: 38050,
    totalSpent: 36210,
    categories: [
      { label: "Food & nutrition", amount: 10800, color: "var(--coral)" },
      { label: "School fees & supplies", amount: 8900, color: "var(--sky)" },
      { label: "Housing & utilities", amount: 6200, color: "var(--mint)" },
      { label: "Medical care", amount: 3800, color: "var(--sun)" },
      { label: "Staff salaries", amount: 5210, color: "var(--grape)" },
      { label: "Repairs & admin", amount: 1300, color: "var(--muted-foreground)" },
    ],
    notes:
      "Replaced 24 mattresses and bedding sets. Hosted the annual sports day with three partner schools.",
  },
  {
    period: "Q1 2025 (Jan – Mar)",
    totalReceived: 35420,
    totalSpent: 33980,
    categories: [
      { label: "Food & nutrition", amount: 10100, color: "var(--coral)" },
      { label: "School fees & supplies", amount: 12200, color: "var(--sky)" },
      { label: "Housing & utilities", amount: 5400, color: "var(--mint)" },
      { label: "Medical care", amount: 2900, color: "var(--sun)" },
      { label: "Staff salaries", amount: 2280, color: "var(--grape)" },
      { label: "Repairs & admin", amount: 1100, color: "var(--muted-foreground)" },
    ],
    notes:
      "Start-of-year school fees and uniforms paid for all 84 children. Welcomed two new siblings (ages 6 and 8) into the family.",
  },
];

export const donationPresets = [
  { amount: 25, label: "A week of meals", description: "Feeds one child for seven days." },
  { amount: 60, label: "A month of school", description: "Tuition, books and uniform for one child." },
  { amount: 150, label: "A safe night", description: "Bedding, lighting and care for the whole house for a week." },
  { amount: 500, label: "A champion gift", description: "Sponsors a full term of education." },
];
