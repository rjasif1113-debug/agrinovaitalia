import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { products, reviews, posts, banners, coupons, users, orders, enquiries, newsletter } from "../src/db/schema";
import { hashPassword } from "../src/lib/auth";

const db = drizzle(process.env.DATABASE_URL!);

const P = [
  {
    slug: "anti-hail-net",
    name: "Anti Hail Net",
    category: "nets-crop-protection",
    tagline: "UV-stabilized knitted HDPE canopy for maximum crop protection.",
    description:
      "Our premium anti hail net is a UV-stabilized, knitted HDPE canopy engineered for apple orchards in hail-prone belts. Available in multiple GSM options and widths, it disperses hail impact, diffuses harsh sunlight and protects blossom, fruitlets and ripening fruit — season after season.",
    price: 42,
    mrp: 55,
    unit: "per sq. metre",
    images: ["/images/product-anti-hail-net.jpg", "/images/hero-orchard.jpg", "/images/installation-team.jpg"],
    highlights: ["UV Stabilized", "Different GSM Options", "Different Sizes", "Maximum Crop Protection"],
    specs: [
      { label: "Material", value: "100% Virgin HDPE, knitted mono-filament" },
      { label: "GSM Options", value: "50 / 70 / 90 / 110 GSM" },
      { label: "Mesh Size", value: "7 mm × 3 mm (hail-proof weave)" },
      { label: "Width Options", value: "3 m, 4.5 m, 6 m, 9 m (custom on request)" },
      { label: "UV Warranty", value: "Up to 5 years" },
      { label: "Colours", value: "Crystal White / Olive Green" },
    ],
    applications: ["High-density apple orchards", "Hail-prone orchard belts", "Fruit crop protection", "Nursery shading"],
    benefits: ["Prevents hail, bird and sun-scald damage", "Improves fruit colour and finish", "Reduces fruit drop", "Quick roll-back for pollination windows"],
    downloads: [{ name: "Anti Hail Net Datasheet (PDF)", url: "#" }, { name: "Coverage Calculator Guide", url: "#" }],
    stock: 500,
    featured: true,
    bestseller: true,
  },
  {
    slug: "plant-tie",
    name: "Plant Tie",
    category: "plant-training",
    tagline: "Strong grip, gentle on bark, reusable season after season.",
    description:
      "Flexible UV-resistant plant ties designed for nursery plants and high-density apple orchards. The soft polymer band grips firmly without cutting into bark, stretches as the tree grows and reopens easily for repositioning — making it the professional choice for branch and leader training.",
    price: 299,
    mrp: 399,
    unit: "bundle of 250 pcs",
    images: ["/images/product-plant-tie.jpg", "/images/hero-orchard.jpg"],
    highlights: ["Strong Grip", "UV Resistant", "Reusable", "Ideal for nursery plants and apple orchards"],
    specs: [
      { label: "Material", value: "UV-stabilized flexible polymer (TPE)" },
      { label: "Length Options", value: "15 cm / 20 cm / 25 cm" },
      { label: "Width", value: "12 mm soft-band" },
      { label: "Pack Size", value: "250 pcs per bundle" },
      { label: "Reusability", value: "3–5 seasons" },
    ],
    applications: ["Leader and branch tying", "Nursery graft support", "Trellis training of young trees", "Bamboo and stake support"],
    benefits: ["No bark girdling", "Quick one-hand application", "Stretches with tree growth", "Withstands snow and sun"],
    downloads: [{ name: "Plant Tie Size Guide", url: "#" }],
    stock: 800,
    featured: true,
    bestseller: true,
  },
  {
    slug: "bending-clip",
    name: "Bending Clip",
    category: "plant-training",
    tagline: "Premium branch training clips for light penetration and yield.",
    description:
      "Precision-moulded bending clips that train young apple branches to the ideal 55–70° fruiting angle. Better branch positioning improves light penetration, balances vegetative growth and maximizes flowering and yield — without the labour of traditional string-tying.",
    price: 249,
    mrp: 349,
    unit: "pack of 100 pcs",
    images: ["/images/product-bending-clip.jpg", "/images/product-plant-tie.jpg"],
    highlights: ["Premium Quality", "Better Branch Training", "Improves Light Penetration", "Maximizes Yield"],
    specs: [
      { label: "Material", value: "UV-stabilized polypropylene" },
      { label: "Sizes", value: "Small (3–5 mm), Medium (5–8 mm), Large (8–12 mm shoots)" },
      { label: "Pack Size", value: "100 pcs per pack" },
      { label: "Application Window", value: "Green shoot stage, May–August" },
      { label: "Reusability", value: "Multi-season" },
    ],
    applications: ["Branch angle training", "High-density canopy management", "Feather positioning on new trees", "Replacing string tying labour"],
    benefits: ["Doubles training speed vs string", "Uniform fruiting angles", "Earlier fruiting in young orchards", "No shoot damage"],
    downloads: [{ name: "Branch Angle Training Guide", url: "#" }],
    stock: 900,
    featured: true,
    isNew: true,
  },
  {
    slug: "binding-wire",
    name: "Binding Wire",
    category: "trellis-infrastructure",
    tagline: "Galvanized binding wire in 1.2 / 1.5 / 2.0 mm for orchard work.",
    description:
      "Hot-dip galvanized binding wire suitable for high-density apple orchards and general trellis work. Consistent diameter, smooth zinc coating and easy bendability make it ideal for securing anchors, net edges, clips and hardware across the orchard.",
    price: 68,
    mrp: 85,
    unit: "per kg",
    images: ["/images/product-binding-wire.jpg", "/images/product-hightensile-wire.jpg"],
    highlights: ["Sizes: 1.2 mm · 1.5 mm · 2.0 mm", "Hot-Dip Galvanized", "Rust Resistant", "Suitable for high-density apple orchards"],
    specs: [
      { label: "Available Sizes", value: "1.2 mm / 1.5 mm / 2.0 mm" },
      { label: "Coating", value: "Hot-dip galvanized zinc" },
      { label: "Tensile Grade", value: "Soft-annealed, easy twist" },
      { label: "Pack", value: "25 kg coils" },
    ],
    applications: ["Net edge binding", "Anchor and peg fixing", "Hardware fastening", "General orchard repairs"],
    benefits: ["No rust bleeding on net", "Bends without snapping", "Uniform gauge throughout coil"],
    downloads: [{ name: "Wire Gauge Selection Chart", url: "#" }],
    stock: 1200,
    bestseller: true,
  },
  {
    slug: "pole-caps",
    name: "Pole Caps",
    category: "trellis-infrastructure",
    tagline: "Premium HDPE caps that protect your hail net from pole damage.",
    description:
      "Premium HDPE pole caps that sit on trellis pole tops to prevent net abrasion and tearing. UV resistant and long lasting, they extend the life of your entire hail net canopy and keep the structure safe through wind and snow movement.",
    price: 14,
    mrp: 22,
    unit: "per piece",
    images: ["/images/product-pole-caps.jpg", "/images/product-gi-pipes.jpg"],
    highlights: ["Premium HDPE", "UV Resistant", "Long Lasting", "Different Sizes"],
    specs: [
      { label: "Material", value: "Virgin HDPE, UV-stabilized" },
      { label: "Sizes", value: "Fits 2 inch / 2.5 inch / 3 inch poles" },
      { label: "Design", value: "Dome top with locking ribs" },
      { label: "Life", value: "8+ years outdoor" },
    ],
    applications: ["GI pipe pole tops", "Concrete pole tops", "Net canopy protection", "Trellis end posts"],
    benefits: ["Stops net tearing at pole tips", "Tool-free push fit", "Survives hail impacts"],
    downloads: [{ name: "Pole Cap Size Guide", url: "#" }],
    stock: 5000,
    isNew: true,
  },
  {
    slug: "gi-pipes",
    name: "GI Pipes",
    category: "trellis-infrastructure",
    tagline: "High strength, rust resistant galvanized pipes for trellis poles.",
    description:
      "High strength galvanized iron pipes with a premium uniform zinc finish, purpose-cut for high-density orchard trellis poles. Rust resistant and dimensionally accurate, they form the backbone of hail-net and trellis structures that stand straight for decades.",
    price: 3850,
    mrp: 4400,
    unit: "per 6 m pipe",
    images: ["/images/product-gi-pipes.jpg", "/images/product-pole-caps.jpg"],
    highlights: ["High Strength", "Rust Resistant", "Different Diameters", "Premium Finish"],
    specs: [
      { label: "Diameters", value: '1.5" / 2" / 2.5" / 3" NB' },
      { label: "Length", value: "6 m standard (custom cutting available)" },
      { label: "Wall Thickness", value: "2.0 mm – 3.2 mm (medium class)" },
      { label: "Coating", value: "Hot-dip galvanized, 275 GSM zinc" },
      { label: "Standard", value: "IS 1239 equivalent" },
    ],
    applications: ["Trellis line poles", "Hail net support structure", "End assemblies and anchors", "Orchard fencing"],
    benefits: ["Decades of rust-free life", "Straight, true poles", "Wind and snow load rated"],
    downloads: [{ name: "Pole Spacing Layout Sheet", url: "#" }],
    stock: 300,
    featured: true,
  },
  {
    slug: "high-tensile-wire",
    name: "High Tensile Wire",
    category: "trellis-infrastructure",
    tagline: "Galvanized high tensile wire with long life for trellis lines.",
    description:
      "High tensile galvanized wire engineered for orchard trellis systems. It holds tension for years without stretching, resists rust in snow and rain, and provides the rigid support lines that carry fruiting wood, hail nets and crop loads in high-density blocks.",
    price: 92,
    mrp: 115,
    unit: "per kg",
    images: ["/images/product-hightensile-wire.jpg", "/images/product-binding-wire.jpg"],
    highlights: ["Galvanized", "Rust Resistant", "Long Life", "Different Sizes"],
    specs: [
      { label: "Sizes", value: "2.0 mm / 2.5 mm / 3.15 mm / 4 mm" },
      { label: "Tensile Strength", value: "1000–1400 MPa (high tensile)" },
      { label: "Coating", value: "Heavy zinc galvanized" },
      { label: "Pack", value: "50 kg coils" },
      { label: "Life", value: "15+ years" },
    ],
    applications: ["Trellis support lines", "Hail net ridge and edge lines", "Fruit wall training", "Anchor stays"],
    benefits: ["No re-tensioning every season", "Carries heavy crop loads", "Clean rust-free finish"],
    downloads: [{ name: "Trellis Wire Schedule", url: "#" }],
    stock: 900,
    bestseller: true,
  },
  {
    slug: "bird-protection-net",
    name: "Bird Protection Net",
    category: "nets-crop-protection",
    tagline: "Knotted HDPE bird net that keeps peck damage off premium fruit.",
    description:
      "Tough knotted HDPE bird net that shields ripening apples from peck damage without harming birds. Lightweight, UV stabilized and easy to drape or side-mount, it protects colour and grade of your premium fruit in the critical weeks before harvest.",
    price: 36,
    mrp: 48,
    unit: "per sq. metre",
    images: ["/images/product-bird-net.jpg", "/images/product-anti-hail-net.jpg"],
    highlights: ["UV Stabilized", "Lightweight", "Bird Friendly Mesh", "Easy Drape & Side Mount"],
    specs: [
      { label: "Material", value: "Knotted HDPE twine" },
      { label: "Mesh", value: "15 mm / 20 mm options" },
      { label: "GSM", value: "30 / 40 GSM" },
      { label: "Widths", value: "3 m – 12 m panels" },
    ],
    applications: ["Pre-harvest bird protection", "Cherry and apple blocks", "Net-house sides", "Nursery covers"],
    benefits: ["Stops peck damage and downgrading", "Ventilated, no heat build-up", "Reusable across seasons"],
    downloads: [{ name: "Bird Net Fixing Guide", url: "#" }],
    stock: 400,
    isNew: true,
  },
];

async function main() {
  console.log("Seeding AgriNova Italia database…");

  // Clear existing
  await db.delete(reviews);
  await db.delete(orders);
  await db.delete(enquiries);
  await db.delete(newsletter);
  await db.delete(products);
  await db.delete(posts);
  await db.delete(banners);
  await db.delete(coupons);
  await db.delete(users);

  const inserted = await db
    .insert(products)
    .values(P.map((p) => ({ ...p, rating: 0, reviewCount: 0 })))
    .returning({ id: products.id, slug: products.slug });

  console.log(`Inserted ${inserted.length} products`);

  // Reviews
  const bySlug = Object.fromEntries(inserted.map((r) => [r.slug, r.id]));
  const reviewRows = [
    { slug: "anti-hail-net", name: "Ghulam Rasool Bhat", rating: 5, title: "Saved my orchard", comment: "Survived two hailstorms without a single fruit damaged. Stitching and GSM quality is excellent." },
    { slug: "anti-hail-net", name: "Bilal Ahmad Wani", rating: 5, title: "Worth the investment", comment: "Good light transmission, apples coloured perfectly under the net. Recommended for Shopian belt." },
    { slug: "plant-tie", name: "Farooq Dar", rating: 5, title: "Strong and reusable", comment: "Used them for two seasons in the nursery. They reopen easily and never cut the bark." },
    { slug: "bending-clip", name: "Mushtaq Lone", rating: 4, title: "Fast branch training", comment: "Trained 400 trees in two days. Wish I had ordered the mixed size pack earlier." },
    { slug: "gi-pipes", name: "Javaid Shah", rating: 5, title: "Straight and solid", comment: "True diameter, heavy zinc coat. Our trellis rows look like factory lines now." },
    { slug: "high-tensile-wire", name: "Rayees Malik", rating: 5, title: "Holds tension perfectly", comment: "Ten months in snow and rain, zero slack and zero rust. Quality wire." },
    { slug: "binding-wire", name: "Aaqib Bhat", rating: 5, title: "Clean gauge, no rust", comment: "The 1.5 mm gauge is perfect for net edge binding. Bends smoothly, never snaps." },
    { slug: "pole-caps", name: "Tariq Ahmad", rating: 5, title: "Net lasts longer now", comment: "No more torn net at pole tops. Push fit is tight even in wind." },
  ];

  for (const r of reviewRows) {
    const pid = bySlug[r.slug];
    if (!pid) continue;
    await db.insert(reviews).values({ productId: pid, name: r.name, rating: r.rating, title: r.title, comment: r.comment });
  }

  // Update product rating aggregates
  for (const slug of Object.keys(bySlug)) {
    const pid = bySlug[slug];
    const list = reviewRows.filter((r) => r.slug === slug);
    if (!list.length) continue;
    const avg = list.reduce((s, r) => s + r.rating, 0) / list.length;
    const { eq } = await import("drizzle-orm");
    await db.update(products).set({ rating: avg, reviewCount: list.length }).where(eq(products.id, pid));
  }

  // Blog posts
  await db.insert(posts).values([
    {
      slug: "high-density-apple-orchard-guide",
      title: "The Complete Guide to High-Density Apple Orchards in Kashmir",
      excerpt: "Spacing, rootstocks, trellis design and protection systems — everything you need to convert traditional blocks into profitable high-density orchards.",
      cover: "/images/hero-orchard.jpg",
      content: `High-density planting is transforming apple farming across Kashmir. Instead of 100–150 trees per kanal, modern blocks carry 400–1,000 trees on dwarfing rootstocks like M9 and MM106, producing marketable fruit from the second or third year.\n\n**Spacing and layout.** The most successful layouts use 3–3.5 m between rows and 1–1.25 m between trees, creating a fruiting wall that is easy to prune, spray and harvest. Rows should run north–south where possible for even light distribution.\n\n**Trellis is non-negotiable.** Dwarf trees cannot stand alone. A proper trellis uses GI pipe poles every 8–10 m, high tensile wire at 60 cm intervals, and pole caps at every pole top so your hail net never tears. Budget roughly 40–45% of your infrastructure cost for the trellis and net structure — it is what protects everything else.\n\n**Protection from day one.** In hail-prone belts like Shopian and Pulwama, an anti hail net pays for itself the first time a storm passes through. Choose 50–70 GSM knitted HDPE for balanced light and protection.\n\n**Training the canopy.** Use bending clips in the green-shoot stage to set 55–70° fruiting angles and plant ties to secure leaders. Correct early training doubles light penetration and brings the block into bearing years earlier.\n\nAgriNova Italia supplies the complete bill of quantities for high-density conversions — poles, wire, caps, clips, ties and nets — with free layout consultation for every order.`,
    },
    {
      slug: "anti-hail-net-benefits",
      title: "5 Ways an Anti Hail Net Pays for Itself",
      excerpt: "Beyond hail protection: fruit finish, sun-scald control and insurance-like peace of mind. Here is the real math behind orchard netting.",
      cover: "/images/product-anti-hail-net.jpg",
      content: `Most orchardists buy hail net for one reason — the storm that almost destroyed their crop. But a quality net earns its cost in five different ways, every single season.\n\n**1. Direct hail protection.** A 70 GSM knitted net disperses hailstone impact completely. One protected harvest typically repays 60–100% of the netting cost in a hail-prone belt.\n\n**2. Better fruit finish.** Diffused light under net reduces sun-scald and gives more even colour development. Packers pay premium grades for net-grown fruit.\n\n**3. Less fruit drop.** Wind buffering under canopy measurably reduces pre-harvest drop in October varieties.\n\n**4. Spray and water efficiency.** Canopy microclimate reduces evaporation; many growers report 15–20% irrigation savings.\n\n**5. Insurance without premiums.** Loan officers and buyers treat netted blocks as lower risk — several growers have used netting to negotiate better working-capital terms.\n\nThe key is correct installation: ridge tension, edge anchoring and pole caps at every pole top. Our installation team completes 10–12 kanals in under a week with a post-storm inspection guarantee.`,
    },
    {
      slug: "trellis-system-basics",
      title: "Trellis System Basics: Poles, Wire and the Details That Matter",
      excerpt: "A trellis carries your trees, your crop and your hail net. Get the pole spacing, wire schedule and hardware right the first time.",
      cover: "/images/product-hightensile-wire.jpg",
      content: `A high-density trellis is a structural engineering job disguised as farm work. Here are the fundamentals we recommend after equipping hundreds of Kashmir orchards.\n\n**Poles.** GI pipes of 2–2.5 inch diameter, 6 m length with 1–1.2 m below ground. In-line poles every 8–10 m; end poles heavier, with proper anchors. Concrete poles work but check for hairline cracks before loading them.\n\n**Wire schedule.** High tensile galvanized wire (2.5–3.15 mm) at 60 cm vertical spacing — typically 5–6 lines for a 3.5 m fruiting wall. Use proper strainers; hand-tight wire sags within one season.\n\n**The detail everyone forgets: pole caps.** An uncapped pole top is a knife edge waiting for wind to move your net. A ₹14 HDPE cap protects a canopy worth thousands per square metre. Cap every pole, every time.\n\n**Anchors fail, not poles.** 90% of trellis failures we inspect are anchor failures. Use 1.2 m auger anchors or deep concrete deadmen on every end assembly.\n\nOrder poles, wire, caps, clips and strainers as one matched bill of quantities — mismatched hardware is the most expensive mistake in orchard infrastructure.`,
    },
  ]);

  await db.insert(banners).values([
    {
      eyebrow: "Winter Stock-Up Offer",
      title: "Up to 24% off Anti Hail Nets & Trellis Hardware",
      subtitle: "Secure your orchard before the season. Free delivery on orders above ₹5,000 across J&K.",
      ctaText: "Shop the Offer",
      ctaHref: "/products?badge=bestseller",
      active: true,
    },
  ]);

  await db.insert(coupons).values([
    { code: "WELCOME10", kind: "percent", value: 10, minSubtotal: 999, active: true },
    { code: "FARMER500", kind: "fixed", value: 500, minSubtotal: 10000, active: true },
  ]);

  // Admin user
  const adminEmail = process.env.ADMIN_EMAIL || "admin@agrinova.in";
  const adminPass = process.env.ADMIN_PASSWORD || "Admin@123";
  await db.insert(users).values([
    { name: "AgriNova Admin", email: adminEmail, passwordHash: hashPassword(adminPass), role: "admin", phone: "7006253289" },
    { name: "Demo Customer", email: "farmer@demo.in", passwordHash: hashPassword("Farmer@123"), role: "customer", phone: "9906000001" },
  ]);

  console.log("Seed complete.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
