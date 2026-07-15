import Link from "next/link";
import Image from "next/image";
import { Star, StarHalf, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  desc,
  align = "center",
  dark = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  desc?: string;
  align?: "center" | "left";
  dark?: boolean;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "")}>
      <p className={cn("text-xs font-bold uppercase tracking-[0.3em]", dark ? "text-gold-300" : "text-olive-600 dark:text-gold-300")}>{eyebrow}</p>
      <h2 className={cn("mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]", dark ? "text-white" : "text-forest-900 dark:text-white")}>
        {title}
      </h2>
      {desc && <p className={cn("mt-5 text-base leading-relaxed sm:text-lg", dark ? "text-stone-300" : "text-stone-600 dark:text-stone-300")}>{desc}</p>}
    </div>
  );
}

export function Stars({ rating, size = 16, className }: { rating: number; size?: number; className?: string }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.4;
  return (
    <span className={cn("inline-flex items-center gap-0.5 text-gold-500", className)} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) =>
        i < full ? (
          <Star key={i} size={size} fill="currentColor" strokeWidth={0} />
        ) : i === full && half ? (
          <span key={i} className="relative inline-flex">
            <Star size={size} className="text-stone-300 dark:text-stone-600" fill="currentColor" strokeWidth={0} />
            <span className="absolute inset-0 w-1/2 overflow-hidden text-gold-500">
              <Star size={size} fill="currentColor" strokeWidth={0} />
            </span>
          </span>
        ) : (
          <Star key={i} size={size} className="text-stone-300 dark:text-stone-600" fill="currentColor" strokeWidth={0} />
        )
      )}
    </span>
  );
}

export function Badge({ children, tone = "forest" }: { children: React.ReactNode; tone?: "forest" | "gold" | "new" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider",
        tone === "forest" && "bg-forest-600 text-white",
        tone === "gold" && "bg-gold-500 text-forest-950",
        tone === "new" && "bg-olive-500 text-white"
      )}
    >
      {children}
    </span>
  );
}

export function PageHero({
  eyebrow,
  title,
  desc,
  crumb,
  image = "/images/hero-orchard.jpg",
}: {
  eyebrow: string;
  title: string;
  desc?: string;
  crumb: string;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-forest-950 pb-16 pt-32 sm:pb-20 sm:pt-40">
      <Image src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-b from-forest-950/70 via-forest-950/55 to-forest-950" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <nav className="mb-6 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-forest-200/70">
          <Link href="/" className="transition hover:text-gold-300">Home</Link>
          <ChevronRight size={12} />
          <span className="text-gold-300">{crumb}</span>
        </nav>
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-300">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white text-balance sm:text-5xl lg:text-6xl">{title}</h1>
        {desc && <p className="mt-5 max-w-2xl text-base leading-relaxed text-forest-100/85 sm:text-lg">{desc}</p>}
      </div>
      <div className="pointer-events-none absolute -bottom-1 left-0 right-0 h-8 bg-gradient-to-t from-ivory dark:from-[#060d0a] to-transparent" />
    </section>
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function EmptyState({ icon, title, text, ctaHref, ctaText }: { icon: React.ReactNode; title: string; text: string; ctaHref: string; ctaText: string }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center rounded-3xl border border-forest-100 bg-white px-8 py-16 text-center dark:border-white/10 dark:bg-white/5">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-forest-50 text-forest-600 dark:bg-white/10 dark:text-gold-300">{icon}</div>
      <h2 className="mt-6 font-display text-2xl font-semibold text-forest-900 dark:text-white">{title}</h2>
      <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">{text}</p>
      <Link
        href={ctaHref}
        className="mt-7 inline-flex items-center gap-2 rounded-full bg-forest-600 px-6 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-forest-700"
      >
        {ctaText}
      </Link>
    </div>
  );
}
