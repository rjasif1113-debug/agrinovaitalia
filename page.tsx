import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, ShieldCheck, Sun, BadgeCheck, Handshake, Warehouse, Truck, Headset, Wrench,
  ChevronDown, Star, ShoppingBag, Building2, Phone, CheckCircle2, ClipboardList, Quote,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading, Stars, JsonLd } from "@/components/ui";
import ProductCard from "@/components/ProductCard";
import RecentlyViewed from "@/components/RecentlyViewed";
import { WHY_CHOOSE, TESTIMONIALS, CATEGORIES, SITE, waLink } from "@/lib/constants";
import { getFeaturedProducts, getNewArrivals, getPublishedPosts, getActiveBanner } from "@/lib/queries";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

const ICONS: Record<string, typeof ShieldCheck> = {
  BadgeCheck, Sun, ShieldCheck, Handshake, Warehouse, Truck, Headset, Wrench,
};

const HERO_STATS = [
  { value: "500+", label: "Kanals Protected" },
  { value: "1,000+", label: "Farmers Served" },
  { value: "8", label: "Product Lines" },
  { value: "5★", label: "Farmer Rated" },
];

export default async function HomePage() {
  const [featured, fresh, blogPosts, banner] = await Promise.all([
    getFeaturedProducts(),
    getNewArrivals(),
    getPublishedPosts(),
    getActiveBanner(),
  ]);
  const heroCards = featured.slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE.name,
          url: SITE.url,
          potentialAction: { "@type": "SearchAction", target: `${SITE.url}/products?q={search_term_string}`, "query-input": "required name=search_term_string" },
        }}
      />

      {/* ============ HERO ============ */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-forest-950">
        <Image src="/images/hero-orchard.jpg" alt="High-density apple orchard with anti hail net canopy in Kashmir" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950/90 via-forest-950/60 to-forest-950/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-transparent to-forest-950/40" />

        <div className="relative mx-auto grid w-full max-w-7xl gap-14 px-5 pb-24 pt-36 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:pt-40">
          <div>
            <p className="inline-flex animate-[hero-in_0.9s_ease_both] items-center gap-2 rounded-full border border-gold-400/30 bg-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.25em] text-gold-300 backdrop-blur">
              <Star size={12} fill="currentColor" /> {SITE.tagline}
            </p>
            <h1 className="mt-7 font-display text-[2.6rem] font-semibold leading-[1.04] tracking-tight text-white text-balance animate-[hero-in_1s_0.1s_ease_both] sm:text-6xl lg:text-[4.4rem]">
              Premium High-Density Orchard Materials for{" "}
              <em className="relative whitespace-nowrap not-italic text-gold-300">
                Modern
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 9" fill="none" aria-hidden="true">
                  <path d="M2 7C60 2 140 2 198 6" stroke="#C9A227" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
                </svg>
              </em>{" "}
              Apple Farming
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-forest-100/85 animate-[hero-in_1s_0.25s_ease_both] sm:text-lg">
              We supply premium orchard materials including Anti Hail Nets, Plant Ties, Bending Clips, Binding Wire, Pole Caps, GI Pipes, Wires, and complete crop protection solutions.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3.5 animate-[hero-in_1s_0.4s_ease_both]">
              <Link href="/products" className="group inline-flex items-center gap-2.5 rounded-full bg-gold-500 px-8 py-4 text-sm font-bold text-forest-950 shadow-[0_20px_50px_-15px_rgb(201_162_39/0.9)] transition hover:bg-gold-400">
                <ShoppingBag size={17} /> Shop Now
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/wholesale" className="inline-flex items-center gap-2.5 rounded-full border border-white/35 bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur transition hover:border-gold-400/60 hover:bg-white/20">
                <Building2 size={17} /> Request Wholesale Price
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2.5 rounded-full px-6 py-4 text-sm font-bold text-white/90 transition hover:text-gold-300">
                <Phone size={17} /> Contact Us
              </Link>
            </div>

            <dl className="mt-14 grid max-w-lg grid-cols-2 gap-x-8 gap-y-6 animate-[hero-in_1s_0.55s_ease_both] sm:grid-cols-4">
              {HERO_STATS.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-3xl font-semibold text-gold-300">{s.value}</dd>
                  <dd className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-forest-100/60">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Floating product cards */}
          <div className="relative hidden lg:block">
            <div className="animate-float relative ml-auto w-[24rem] overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur-xl">
              {heroCards[0] && (
                <Link href={`/products/${heroCards[0].slug}`} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.4rem]">
                    <Image src={heroCards[0].images[0]} alt={heroCards[0].name} fill sizes="24rem" className="object-cover" />
                  </div>
                  <div className="flex items-center justify-between px-2 py-3.5">
                    <div>
                      <p className="font-display text-lg font-semibold text-white">{heroCards[0].name}</p>
                      <Stars rating={heroCards[0].rating || 5} size={12} />
                    </div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500 text-forest-950"><ArrowRight size={17} /></span>
                  </div>
                </Link>
              )}
            </div>
            {heroCards[1] && (
              <Link
                href={`/products/${heroCards[1].slug}`}
                className="animate-float absolute -bottom-10 -left-6 flex w-60 items-center gap-3 rounded-2xl border border-white/20 bg-white/12 p-3 shadow-2xl backdrop-blur-xl transition hover:bg-white/20"
                style={{ animationDelay: "-2.5s" }}
              >
                <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl"><Image src={heroCards[1].images[0]} alt="" fill sizes="56px" className="object-cover" /></span>
                <span>
                  <span className="block text-sm font-bold text-white">{heroCards[1].name}</span>
                  <span className="text-xs text-gold-300">Bestseller this season</span>
                </span>
              </Link>
            )}
            {heroCards[2] && (
              <Link
                href={`/products/${heroCards[2].slug}`}
                className="animate-float absolute -right-4 -top-12 flex w-56 items-center gap-3 rounded-2xl border border-white/20 bg-white/12 p-3 shadow-2xl backdrop-blur-xl transition hover:bg-white/20"
                style={{ animationDelay: "-5s" }}
              >
                <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl"><Image src={heroCards[2].images[0]} alt="" fill sizes="56px" className="object-cover" /></span>
                <span>
                  <span className="block text-sm font-bold text-white">{heroCards[2].name}</span>
                  <span className="text-xs text-gold-300">Premium grade</span>
                </span>
              </Link>
            )}
          </div>
        </div>

        <a href="#why" aria-label="Scroll down" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-white/50 transition hover:text-gold-300 sm:flex">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Explore</span>
          <ChevronDown size={18} className="animate-bounce" />
        </a>
      </section>

      {/* ============ MARQUEE ============ */}
      <div className="overflow-hidden border-y border-forest-900/10 bg-forest-900 py-4 dark:border-white/10">
        <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, dup) => (
            <span key={dup} className="flex items-center gap-10" aria-hidden={dup === 1}>
              {["Anti Hail Nets", "Plant Ties", "Bending Clips", "Binding Wire", "Pole Caps", "GI Pipes", "High Tensile Wire", "Crop Protection", "Installation Services"].map((item) => (
                <span key={item} className="flex items-center gap-10 text-sm font-bold uppercase tracking-[0.25em] text-forest-100/70">
                  {item} <Star size={10} className="text-gold-400" fill="currentColor" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ============ WHY CHOOSE ============ */}
      <section id="why" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <Reveal>
          <SectionHeading
            eyebrow="Why Choose AgriNova Italia"
            title={<>Everything your orchard needs, <em className="text-forest-600 not-italic underline decoration-gold-400 decoration-4 underline-offset-8 dark:text-gold-300">nothing it doesn&rsquo;t</em></>}
            desc="Premium materials, honest pricing and field-proven expertise — trusted by orchardists across Jammu & Kashmir and beyond."
          />
        </Reveal>
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE.map((w, i) => {
            const Icon = ICONS[w.icon] || ShieldCheck;
            return (
              <Reveal key={w.title} delay={i * 70} variant="zoom">
                <div className="group h-full rounded-3xl border border-forest-100/80 bg-white p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-400/50 hover:shadow-soft dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-gold-500/40">
                  <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-forest-600/10 text-forest-600 transition-all duration-500 group-hover:bg-forest-600 group-hover:text-gold-300 dark:bg-gold-500/10 dark:text-gold-300">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-forest-900 dark:text-white">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-500 dark:text-stone-400">{w.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ============ CATEGORIES ============ */}
      <section className="bg-forest-50/60 py-24 dark:bg-white/[0.02] lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <SectionHeading eyebrow="Product Categories" title="Complete Orchard Infrastructure" desc="From the first pole to the final net — source your entire high-density setup from one trusted partner." />
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {CATEGORIES.map((c, i) => (
              <Reveal key={c.slug} delay={i * 120}>
                <Link href={`/products?category=${c.slug}`} className="group relative block overflow-hidden rounded-[2rem] shadow-soft">
                  <div className="relative aspect-[4/5]">
                    <Image src={c.image} alt={c.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/25 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-7">
                      <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-300">Category {String(i + 1).padStart(2, "0")}</p>
                      <h3 className="mt-2 font-display text-2xl font-semibold text-white">{c.name}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-forest-100/75">{c.blurb}</p>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-gold-300 transition-transform duration-300 group-hover:translate-x-1.5">
                        Browse Products <ArrowRight size={15} />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURED / BESTSELLERS ============ */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading align="left" eyebrow="Featured Products" title="Bestsellers & Farmer Favourites" desc="Field-tested materials that orchardists reorder every season." />
            <Link href="/products" className="group inline-flex items-center gap-2 rounded-full border border-forest-600 px-6 py-3 text-sm font-bold text-forest-700 transition hover:bg-forest-600 hover:text-white dark:border-gold-500 dark:text-gold-300 dark:hover:bg-gold-500 dark:hover:text-forest-950">
              View All Products <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.slice(0, 4).map((p, i) => (
            <Reveal key={p.slug} delay={i * 90} variant="zoom">
              <ProductCard product={p} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ PROMO BANNER ============ */}
      {banner && (
        <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
          <Reveal variant="zoom">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-forest-700 via-forest-800 to-forest-950 px-8 py-14 shadow-soft sm:px-14">
              <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold-500/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-olive-500/20 blur-3xl" />
              <div className="relative flex flex-wrap items-center justify-between gap-8">
                <div className="max-w-2xl">
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-300">{banner.eyebrow}</p>
                  <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-white text-balance sm:text-4xl">{banner.title}</h2>
                  <p className="mt-4 text-forest-100/80">{banner.subtitle}</p>
                </div>
                <Link href={banner.ctaHref} className="inline-flex items-center gap-2.5 rounded-full bg-gold-500 px-9 py-4 text-sm font-bold text-forest-950 shadow-[0_20px_50px_-15px_rgb(201_162_39/0.9)] transition hover:bg-gold-400">
                  {banner.ctaText} <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* ============ INSTALLATION CTA ============ */}
      <section className="relative overflow-hidden bg-forest-950 py-24 lg:py-32">
        <Image src="/images/installation-team.jpg" alt="Professional anti hail net installation team at work" fill sizes="100vw" className="object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-950/80 to-forest-950/40" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
          <Reveal variant="left">
            <SectionHeading
              dark
              align="left"
              eyebrow="Installation Services"
              title="Hail Net Installation by an Experienced Team"
              desc="Professional anti hail net installation with proper pole caps, ridge tensioning and edge anchoring — backed by after-sales inspections and support."
            />
            <ul className="mt-8 space-y-3.5">
              {["Trained installation crews with dedicated equipment", "Correct tensioning that survives storms and snow load", "Free post-storm inspection in the first season"].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-forest-100/85">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-gold-300" /> {t}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3.5">
              <Link href="/installation" className="inline-flex items-center gap-2.5 rounded-full bg-gold-500 px-8 py-4 text-sm font-bold text-forest-950 transition hover:bg-gold-400">
                Book Installation <ArrowRight size={16} />
              </Link>
              <Link href="/gallery" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 text-sm font-bold text-white transition hover:border-gold-400/60 hover:text-gold-300">
                View Gallery
              </Link>
            </div>
          </Reveal>
          <Reveal delay={150} variant="zoom">
            <div className="grid grid-cols-2 gap-4">
              {["/images/product-anti-hail-net.jpg", "/images/installation-team.jpg", "/images/product-pole-caps.jpg", "/images/hero-orchard.jpg"].map((src, i) => (
                <Link key={src} href="/gallery" className="group relative block overflow-hidden rounded-3xl border border-white/15">
                  <span className={`relative block ${i % 3 === 0 ? "aspect-[3/4]" : "aspect-[3/4] sm:aspect-square"}`}>
                    <Image src={src} alt="Installation work gallery" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <Reveal>
          <SectionHeading eyebrow="Farmer Testimonials" title="Trusted by the People Who Grow" desc="Five-star reviews from orchardists across the Kashmir valley." />
        </Reveal>
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 100} variant="zoom">
              <figure className="relative flex h-full flex-col rounded-3xl border border-forest-100/80 bg-white p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-soft dark:border-white/10 dark:bg-white/[0.04]">
                <Quote size={34} className="text-gold-500/25" fill="currentColor" />
                <Stars rating={t.rating} size={14} className="mt-4" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-stone-600 dark:text-stone-300">{t.text}</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-forest-50 pt-5 dark:border-white/10">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-600/10 font-display text-base font-bold text-forest-700 dark:bg-gold-500/15 dark:text-gold-300">
                    {t.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-forest-900 dark:text-white">{t.name}</span>
                    <span className="text-xs text-stone-400">{t.place} · {t.product}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ NEW ARRIVALS ============ */}
      <section className="bg-forest-50/60 py-24 dark:bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <SectionHeading eyebrow="New Arrivals" title="Fresh Stock, Just Landed" desc="The latest additions to the AgriNova orchard range." />
          </Reveal>
          <div className="no-scrollbar mt-14 flex gap-6 overflow-x-auto pb-4 lg:grid lg:grid-cols-4 lg:overflow-visible">
            {fresh.slice(0, 4).map((p, i) => (
              <div key={p.slug} className="w-72 shrink-0 lg:w-auto">
                <ProductCard product={p} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BLOG + RECENTLY VIEWED ============ */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading align="left" eyebrow="From the Journal" title="Orchard Knowledge Hub" desc="Guides on high-density planting, crop protection and trellis design." />
            <Link href="/blog" className="group inline-flex items-center gap-2 text-sm font-bold text-forest-700 transition hover:text-gold-600 dark:text-gold-300">
              All Articles <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {blogPosts.slice(0, 3).map((b, i) => (
            <Reveal key={b.slug} delay={i * 100}>
              <Link href={`/blog/${b.slug}`} className="group block overflow-hidden rounded-3xl border border-forest-100/80 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-soft dark:border-white/10 dark:bg-white/[0.04]">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={b.cover} alt={b.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-olive-600 dark:text-gold-300/80">
                    <ClipboardList size={12} /> {formatDate(b.createdAt)}
                  </p>
                  <h3 className="mt-2.5 font-display text-lg font-semibold leading-snug text-forest-900 transition group-hover:text-forest-600 dark:text-white dark:group-hover:text-gold-300">{b.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-stone-500 dark:text-stone-400">{b.excerpt}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-24">
          <Reveal>
            <SectionHeading align="left" eyebrow="Recently Viewed" title="Continue Where You Left Off" />
          </Reveal>
          <RecentlyViewed />
        </div>
      </section>

      {/* ============ WHATSAPP CTA ============ */}
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <Reveal variant="zoom">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-gold-500/30 bg-gradient-to-br from-[#0f3d28] via-forest-900 to-forest-950 px-8 py-16 text-center shadow-soft sm:px-14">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-300">Talk to an Orchard Expert</p>
            <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight text-white text-balance sm:text-4xl">Planning a high-density block? Get a free bill of quantities today.</h2>
            <p className="mx-auto mt-4 max-w-xl text-forest-100/75">Send us your orchard size and varieties — our team replies with a complete material list and quote, usually within hours.</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3.5">
              <a href={waLink("Hello AgriNova Italia! I am planning a high-density orchard. Please help me with a free bill of quantities.")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-9 py-4 text-sm font-bold text-white transition hover:brightness-95">
                Chat on WhatsApp
              </a>
              <a href={`tel:${SITE.phone}`} className="inline-flex items-center gap-2 rounded-full border border-white/30 px-9 py-4 text-sm font-bold text-white transition hover:border-gold-400/60 hover:text-gold-300">
                <Phone size={16} /> {SITE.phoneDisplay}
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
