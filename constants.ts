export const SITE = {
  name: "AgriNova Italia",
  tagline: "Grow Better. Grow Together.",
  phone: "+917006253289",
  phoneDisplay: "+91 70062 53289",
  whatsapp: "917006253289",
  email: "hello@agrinova.in",
  location: "Shopian, Jammu & Kashmir, India",
  address: "Main Market, Shopian, Jammu & Kashmir 192303",
  owners: ["Asif Manzoor", "Sahil Manzoor"],
  hours: "Mon – Sat · 9:00 AM – 7:00 PM",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://agrinovaitalia.in",
};

export function waLink(text: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const NAV = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Crop Protection", href: "/crop-protection" },
  { label: "Installation", href: "/installation" },
  { label: "Wholesale", href: "/wholesale" },
  { label: "About Us", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export const CATEGORIES = [
  {
    slug: "nets-crop-protection",
    name: "Nets & Crop Protection",
    blurb: "Anti hail nets, bird nets and complete orchard protection systems.",
    image: "/images/product-anti-hail-net.jpg",
  },
  {
    slug: "plant-training",
    name: "Plant Training",
    blurb: "Plant ties, bending clips and branch training essentials.",
    image: "/images/product-plant-tie.jpg",
  },
  {
    slug: "trellis-infrastructure",
    name: "Trellis & Infrastructure",
    blurb: "GI pipes, high tensile wire, pole caps and binding wire.",
    image: "/images/product-gi-pipes.jpg",
  },
];

export const CATEGORY_LABELS: Record<string, string> = {
  "nets-crop-protection": "Nets & Crop Protection",
  "plant-training": "Plant Training",
  "trellis-infrastructure": "Trellis & Infrastructure",
};

export const CATEGORY_NAMES: Record<string, string> = CATEGORY_LABELS;

export const WHY_CHOOSE = [
  { icon: "BadgeCheck", title: "Premium Quality", text: "Every product is sourced and tested to meet international orchard standards." },
  { icon: "Sun", title: "UV Resistant Products", text: "UV-stabilized materials engineered for harsh sun, snow and hail seasons." },
  { icon: "ShieldCheck", title: "Long Lasting Performance", text: "Durable materials that deliver season after season of reliable service." },
  { icon: "Handshake", title: "Trusted by Farmers", text: "Hundreds of orchardists across Kashmir rely on AgriNova every season." },
  { icon: "Warehouse", title: "Wholesale & Retail", text: "Flexible pricing for single orchards, dealer networks and large projects." },
  { icon: "Truck", title: "Fast Delivery", text: "Quick dispatch across J&K and pan-India shipping on all material." },
  { icon: "Headset", title: "Expert Support", text: "Orchard specialists help you plan trellis layout and protection coverage." },
  { icon: "Wrench", title: "Installation Available", text: "Professional hail net and trellis installation by our experienced team." },
];

export const TESTIMONIALS = [
  {
    name: "Ghulam Rasool Bhat",
    place: "Shopian, J&K",
    rating: 5,
    text: "AgriNova's anti hail net saved my entire orchard last season when a severe hailstorm hit our village. The quality of the net and installation was outstanding. Worth every rupee.",
    product: "Anti Hail Net",
  },
  {
    name: "Bilal Ahmad Wani",
    place: "Pulwama, J&K",
    rating: 5,
    text: "I converted 8 kanals to high-density with their GI pipes, high tensile wire and pole caps. Material quality is far better than what I found locally. Delivery was on time.",
    product: "Complete Trellis Setup",
  },
  {
    name: "Farooq Ahmad Dar",
    place: "Anantnag, J&K",
    rating: 5,
    text: "The bending clips and plant ties from AgriNova have transformed my branch training. Better light penetration and my fruit set improved visibly in one season.",
    product: "Bending Clips & Plant Ties",
  },
  {
    name: "Mushtaq Ahmad Lone",
    place: "Kulgam, J&K",
    rating: 5,
    text: "Ordered wholesale quantity for our FPO. Transparent pricing, proper invoicing and expert guidance throughout. AgriNova is now our permanent supplier.",
    product: "Wholesale Order",
  },
  {
    name: "Javaid Ahmad Shah",
    place: "Baramulla, J&K",
    rating: 5,
    text: "Their installation team completed hail netting on 12 kanals in four days. Clean workmanship, proper tensioning, and they came back for a free inspection after the first storm.",
    product: "Net Installation Service",
  },
  {
    name: "Rayees Ahmad Malik",
    place: "Sopore, J&K",
    rating: 5,
    text: "Binding wire and clips are genuinely UV resistant. Two seasons done, no brittleness. The team even guided me on wire tension over WhatsApp. Highly recommended.",
    product: "Binding Wire",
  },
];

export const FAQS = [
  {
    q: "What GSM anti hail net is right for my orchard?",
    a: "For most Kashmir apple orchards we recommend 50–70 GSM knitted HDPE net for balanced light transmission and hail protection, and 90+ GSM for hail-prone belts. Share your location and orchard size and our team will suggest the ideal GSM, mesh size and colour.",
  },
  {
    q: "Do you provide installation services outside Shopian?",
    a: "Yes. Our installation teams cover all major apple-growing districts of Jammu & Kashmir including Shopian, Pulwama, Anantnag, Kulgam, Baramulla, Sopore and Ganderbal. For large projects outside J&K, contact us for a custom quote.",
  },
  {
    q: "What is the minimum order quantity for wholesale pricing?",
    a: "Wholesale slabs typically start at 10+ units per SKU or orders above ₹50,000. Submit the wholesale enquiry form with your quantities and we will share a formal quotation within 24 hours.",
  },
  {
    q: "How long does delivery take?",
    a: "Within Kashmir valley: 2–4 working days. Jammu region: 3–5 days. Rest of India: 5–9 days depending on location. Orders above ₹5,000 ship free.",
  },
  {
    q: "Are the plant ties and clips really reusable?",
    a: "Yes. Our ties and bending clips are made from UV-stabilized, flexible polymers designed to be opened, repositioned and reused across 3–5 seasons without cracking or losing grip.",
  },
  {
    q: "Do you offer Cash on Delivery?",
    a: "Yes, COD is available on retail orders across serviceable pincodes. For wholesale and installation projects we work with advance + milestone based payment.",
  },
  {
    q: "Can you help design my high-density orchard layout?",
    a: "Absolutely. Share your land dimensions and variety plan and our experts will prepare a trellis layout with pole spacing, wire schedule and a complete bill of quantities — free of charge.",
  },
  {
    q: "What warranty do products carry?",
    a: "Anti hail nets carry up to 5 years UV warranty, GI pipes and high tensile wire are galvanized for 15+ years of outdoor life, and all hardware is covered against manufacturing defects.",
  },
];

export const WHY_POINTS_SHORT = ["Premium Quality", "UV Resistant", "Long Lasting", "Trusted by Farmers"];
