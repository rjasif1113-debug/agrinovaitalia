"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function PageHeroSpacer({ title, crumb, desc }: { title: string; crumb: string; desc?: string }) {
  return (
    <section className="relative overflow-hidden bg-forest-950 pb-12 pt-32 sm:pt-36">
      <div className="pointer-events-none absolute -top-24 left-1/3 h-72 w-72 rounded-full bg-forest-600/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-10 h-72 w-72 rounded-full bg-gold-500/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <nav className="mb-5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-forest-200/70">
          <Link href="/" className="transition hover:text-gold-300">Home</Link>
          <ChevronRight size={12} />
          <span className="text-gold-300">{crumb}</span>
        </nav>
        <h1 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">{title}</h1>
        {desc && <p className="mt-3 text-sm text-forest-100/70">{desc}</p>}
      </div>
      <div className="pointer-events-none absolute -bottom-1 left-0 right-0 h-8 bg-gradient-to-t from-ivory dark:from-[#060d0a] to-transparent" />
    </section>
  );
}
