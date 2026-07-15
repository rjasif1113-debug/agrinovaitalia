"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sprout, Menu, X, Search, Heart, ShoppingBag, User, Sun, Moon, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import { NAV, SITE } from "@/lib/constants";
import { cn, formatINR } from "@/lib/utils";
import { useStore, useTheme } from "./store";

interface SearchHit {
  slug: string;
  name: string;
  price: number;
  image: string;
  unit: string;
}

export function LiveSearch({ dark }: { dark?: boolean }) {
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!q.trim()) {
      setHits([]);
      return;
    }
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/products?q=${encodeURIComponent(q)}`);
        const data = await res.json();
        setHits(data.products || []);
        setOpen(true);
      } catch {
        setHits([]);
      }
    }, 220);
    return () => clearTimeout(t);
  }, [q]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  return (
    <div ref={box} className="relative w-full max-w-xs">
      <Search size={16} className={cn("pointer-events-none absolute left-4 top-1/2 -translate-y-1/2", dark ? "text-white/60" : "text-stone-400")} />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onFocus={() => hits.length && setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && q.trim()) {
            setOpen(false);
            router.push(`/products?q=${encodeURIComponent(q)}`);
          }
        }}
        placeholder="Search nets, clips, pipes…"
        aria-label="Search products"
        className={cn(
          "h-10 w-full rounded-full border pl-10 pr-4 text-sm outline-none transition placeholder:text-current/40",
          dark
            ? "border-white/20 bg-white/10 text-white focus:border-gold-300/60 focus:bg-white/15"
            : "border-forest-100 bg-forest-50/70 text-ink focus:border-forest-300 dark:border-white/10 dark:bg-white/5 dark:text-white"
        )}
      />
      {open && hits.length > 0 && (
        <div className="absolute left-0 right-0 top-12 z-50 overflow-hidden rounded-2xl border border-forest-100 bg-white shadow-soft dark:border-white/10 dark:bg-[#0b1611]">
          {hits.slice(0, 6).map((h) => (
            <Link
              key={h.slug}
              href={`/products/${h.slug}`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 transition hover:bg-forest-50 dark:hover:bg-white/5"
            >
              <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-forest-50">
                <Image src={h.image} alt="" fill sizes="40px" className="object-cover" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-forest-900 dark:text-white">{h.name}</span>
                <span className="text-xs text-stone-500 dark:text-stone-400">{h.unit}</span>
              </span>
              <span className="text-sm font-bold text-forest-600 dark:text-gold-300">{formatINR(h.price)}</span>
            </Link>
          ))}
          <Link
            href={`/products?q=${encodeURIComponent(q)}`}
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-1.5 border-t border-forest-50 py-2.5 text-xs font-bold uppercase tracking-wider text-forest-600 transition hover:bg-forest-50 dark:border-white/10 dark:text-gold-300 dark:hover:bg-white/5"
          >
            View all results <ArrowRight size={12} />
          </Link>
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const pathname = usePathname();
  const { cartCount, wishlist, mounted } = useStore();
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenu(false), [pathname]);

  const light = !scrolled && !menu;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Top strip */}
      <div
        className={cn(
          "hidden overflow-hidden bg-forest-950/90 text-forest-100 transition-all duration-500 lg:block",
          scrolled ? "max-h-0" : "max-h-10"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-2 text-[11px] font-semibold tracking-wide">
          <span className="flex items-center gap-5">
            <span className="flex items-center gap-1.5"><Phone size={11} className="text-gold-300" /> {SITE.phoneDisplay}</span>
            <span className="flex items-center gap-1.5"><Mail size={11} className="text-gold-300" /> {SITE.email}</span>
          </span>
          <span className="flex items-center gap-1.5"><Clock size={11} className="text-gold-300" /> {SITE.hours} · {SITE.location}</span>
        </div>
      </div>

      <div
        className={cn(
          "transition-all duration-500",
          light
            ? "bg-gradient-to-b from-black/45 to-transparent text-white"
            : "border-b border-forest-100/70 bg-white/85 text-ink shadow-[0_10px_40px_-20px_rgb(7_48_32/0.35)] backdrop-blur-xl dark:border-white/10 dark:bg-[#07110c]/85 dark:text-white"
        )}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center gap-4 px-5 sm:px-8">
          <button className="lg:hidden" onClick={() => setMenu((m) => !m)} aria-label="Toggle menu">
            {menu ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link href="/" className="group flex items-center gap-2.5">
            <span className={cn("flex h-10 w-10 items-center justify-center rounded-xl transition group-hover:rotate-6", light ? "bg-white/15 backdrop-blur" : "bg-forest-600 text-white shadow-soft")}>
              <Sprout size={20} className={light ? "text-gold-300" : "text-gold-300"} />
            </span>
            <span className="leading-none">
              <span className="block font-display text-lg font-semibold tracking-tight">AgriNova</span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.42em] text-gold-400">Italia</span>
            </span>
          </Link>

          <nav className="mx-auto hidden items-center gap-0.5 lg:flex">
            {NAV.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3 py-2 text-[13px] font-semibold transition",
                    active
                      ? light
                        ? "bg-white/15 text-gold-300"
                        : "bg-forest-600/10 text-forest-700 dark:bg-white/10 dark:text-gold-300"
                      : light
                        ? "text-white/85 hover:bg-white/10 hover:text-white"
                        : "text-stone-600 hover:bg-forest-50 hover:text-forest-700 dark:text-stone-300 dark:hover:bg-white/5 dark:hover:text-white"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            <div className="hidden xl:block">
              <LiveSearch dark={light} />
            </div>
            <span className="xl:hidden">
              <Link href="/products" aria-label="Search" className={cn("flex h-10 w-10 items-center justify-center rounded-full transition", light ? "hover:bg-white/15" : "hover:bg-forest-50 dark:hover:bg-white/10")}>
                <Search size={18} />
              </Link>
            </span>
            <button onClick={toggle} aria-label="Toggle dark mode" className={cn("flex h-10 w-10 items-center justify-center rounded-full transition", light ? "hover:bg-white/15" : "hover:bg-forest-50 dark:hover:bg-white/10")}>
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link href="/account" aria-label="Account" className={cn("hidden h-10 w-10 items-center justify-center rounded-full transition sm:flex", light ? "hover:bg-white/15" : "hover:bg-forest-50 dark:hover:bg-white/10")}>
              <User size={18} />
            </Link>
            <Link href="/wishlist" aria-label="Wishlist" className={cn("relative hidden h-10 w-10 items-center justify-center rounded-full transition sm:flex", light ? "hover:bg-white/15" : "hover:bg-forest-50 dark:hover:bg-white/10")}>
              <Heart size={18} />
              {mounted && wishlist.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-gold-500 px-1 text-[10px] font-bold text-forest-950">{wishlist.length}</span>
              )}
            </Link>
            <Link href="/cart" aria-label="Cart" className={cn("relative flex h-10 w-10 items-center justify-center rounded-full transition", light ? "hover:bg-white/15" : "hover:bg-forest-50 dark:hover:bg-white/10")}>
              <ShoppingBag size={18} />
              {mounted && cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-gold-500 px-1 text-[10px] font-bold text-forest-950">{cartCount}</span>
              )}
            </Link>
            <Link
              href="/wholesale"
              className="ml-1 hidden items-center gap-2 rounded-full bg-gold-500 px-5 py-2.5 text-[13px] font-bold text-forest-950 shadow-[0_10px_30px_-12px_rgb(201_162_39/0.8)] transition hover:bg-gold-400 md:inline-flex"
            >
              Wholesale
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={cn("fixed inset-0 z-[-1] lg:hidden", menu ? "pointer-events-auto" : "pointer-events-none")}>
        <div className={cn("absolute inset-0 bg-black/50 transition-opacity duration-300", menu ? "opacity-100" : "opacity-0")} onClick={() => setMenu(false)} />
        <div
          className={cn(
            "absolute bottom-0 left-0 top-0 flex w-[85%] max-w-sm flex-col gap-1 overflow-y-auto bg-white px-6 pb-8 pt-24 shadow-2xl transition-transform duration-500 dark:bg-[#081009]",
            menu ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              style={{ transitionDelay: `${i * 30}ms` }}
              className={cn(
                "flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-xl font-medium text-forest-900 transition-all duration-500 hover:bg-forest-50 dark:text-white dark:hover:bg-white/5",
                menu ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"
              )}
            >
              {item.label}
              <ArrowRight size={16} className="text-gold-500" />
            </Link>
          ))}
          <div className="mt-auto space-y-2 pt-8">
            <Link href="/account" className="flex items-center justify-center gap-2 rounded-full border border-forest-200 py-3 text-sm font-bold text-forest-700 dark:border-white/15 dark:text-white">
              <User size={16} /> My Account
            </Link>
            <a href={`tel:${SITE.phone}`} className="flex items-center justify-center gap-2 rounded-full bg-forest-600 py-3 text-sm font-bold text-white">
              <Phone size={16} /> Call {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
