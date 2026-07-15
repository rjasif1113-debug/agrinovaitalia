"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { SlidersHorizontal, X, Search } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";
import { formatINR, cn } from "@/lib/utils";

const SORTS = [
  { v: "newest", label: "Newest First" },
  { v: "price-asc", label: "Price: Low to High" },
  { v: "price-desc", label: "Price: High to Low" },
  { v: "rating", label: "Top Rated" },
  { v: "name", label: "Name A–Z" },
];

function Panel() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [, startTransition] = useTransition();
  const [q, setQ] = useState(params.get("q") || "");
  const [min, setMin] = useState(params.get("min") || "");
  const [max, setMax] = useState(params.get("max") || "");

  const category = params.get("category") || "all";
  const sort = params.get("sort") || "newest";
  const badge = params.get("badge") || "";

  function update(key: string, value: string) {
    const p = new URLSearchParams(params.toString());
    if (value) p.set(key, value);
    else p.delete(key);
    if (key !== "sort") p.delete("badge");
    startTransition(() => router.replace(`${pathname}?${p.toString()}`, { scroll: false }));
  }

  function applyFilters(e: React.FormEvent) {
    e.preventDefault();
    const p = new URLSearchParams(params.toString());
    q ? p.set("q", q) : p.delete("q");
    min ? p.set("min", min) : p.delete("min");
    max ? p.set("max", max) : p.delete("max");
    startTransition(() => router.replace(`${pathname}?${p.toString()}`, { scroll: false }));
  }

  return (
    <div className="space-y-8">
      <form onSubmit={applyFilters}>
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">Search</h3>
        <div className="relative mt-3">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products…"
            className="h-11 w-full rounded-xl border border-forest-100 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-forest-400 dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
        </div>
      </form>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">Category</h3>
        <div className="mt-3 space-y-1">
          {[{ slug: "all", name: "All Products" }, ...CATEGORIES].map((c) => (
            <button
              key={c.slug}
              onClick={() => update("category", c.slug === "all" ? "" : c.slug)}
              className={cn(
                "w-full rounded-xl px-4 py-2.5 text-left text-sm font-semibold transition",
                category === c.slug || (c.slug === "all" && !params.get("category"))
                  ? "bg-forest-600 text-white"
                  : "text-stone-600 hover:bg-forest-50 dark:text-stone-300 dark:hover:bg-white/5"
              )}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={applyFilters}>
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">Price Range (₹)</h3>
        <div className="mt-3 flex items-center gap-2">
          <input value={min} onChange={(e) => setMin(e.target.value)} type="number" min={0} placeholder="Min" className="h-11 w-full rounded-xl border border-forest-100 bg-white px-3 text-sm outline-none focus:border-forest-400 dark:border-white/10 dark:bg-white/5 dark:text-white" />
          <span className="text-stone-400">–</span>
          <input value={max} onChange={(e) => setMax(e.target.value)} type="number" min={0} placeholder="Max" className="h-11 w-full rounded-xl border border-forest-100 bg-white px-3 text-sm outline-none focus:border-forest-400 dark:border-white/10 dark:bg-white/5 dark:text-white" />
        </div>
        <button className="mt-3 w-full rounded-full bg-forest-600 py-2.5 text-xs font-bold text-white transition hover:bg-forest-700">Apply Filters</button>
      </form>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">Sort By</h3>
        <div className="mt-3 space-y-1">
          {SORTS.map((s) => (
            <button
              key={s.v}
              onClick={() => update("sort", s.v === "newest" ? "" : s.v)}
              className={cn(
                "w-full rounded-xl px-4 py-2.5 text-left text-sm font-semibold transition",
                sort === s.v ? "bg-gold-500/15 text-gold-700 dark:text-gold-300" : "text-stone-600 hover:bg-forest-50 dark:text-stone-300 dark:hover:bg-white/5"
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {(params.get("q") || params.get("category") || params.get("min") || params.get("max") || badge) && (
        <button
          onClick={() => startTransition(() => router.replace(pathname, { scroll: false }))}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-forest-200 py-2.5 text-xs font-bold text-forest-700 transition hover:bg-forest-50 dark:border-white/15 dark:text-white dark:hover:bg-white/5"
        >
          <X size={13} /> Clear All Filters
        </button>
      )}
    </div>
  );
}

export default function Filters() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="lg:hidden">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-full border border-forest-200 bg-white px-5 py-2.5 text-xs font-bold text-forest-700 dark:border-white/15 dark:bg-white/5 dark:text-white"
        >
          <SlidersHorizontal size={14} /> Filters
        </button>
        {open && (
          <div className="fixed inset-0 z-[60] lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
            <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-6 animate-[hero-in_0.4s_ease_both] dark:bg-[#081009]">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold text-forest-900 dark:text-white">Filters & Sorting</h2>
                <button onClick={() => setOpen(false)} aria-label="Close filters" className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-50 dark:bg-white/10">
                  <X size={16} />
                </button>
              </div>
              <Panel />
              <button onClick={() => setOpen(false)} className="mt-6 w-full rounded-full bg-forest-600 py-3.5 text-sm font-bold text-white">
                Show Results
              </button>
            </div>
          </div>
        )}
      </div>
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-28 rounded-3xl border border-forest-100 bg-white p-6 dark:border-white/10 dark:bg-white/[0.04]">
          <Panel />
        </div>
      </aside>
    </>
  );
}

export function ResultMeta({ count, params }: { count: number; params: Record<string, string | undefined> }) {
  const bits: string[] = [];
  if (params.q) bits.push(`“${params.q}”`);
  if (params.badge) bits.push(params.badge === "new" ? "New Arrivals" : params.badge.charAt(0).toUpperCase() + params.badge.slice(1));
  if (params.min || params.max) bits.push(`${params.min ? formatINR(+params.min) : "₹0"} – ${params.max ? formatINR(+params.max) : "any"}`);
  return (
    <p className="text-sm text-stone-500 dark:text-stone-400">
      Showing <span className="font-bold text-forest-700 dark:text-gold-300">{count}</span> {count === 1 ? "product" : "products"}
      {bits.length > 0 && <span> for {bits.join(" · ")}</span>}
    </p>
  );
}
