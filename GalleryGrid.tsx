"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GalleryItem {
  src: string;
  title: string;
  tag: string;
  tall?: boolean;
}

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState("All");
  const [light, setLight] = useState<number | null>(null);

  const tags = ["All", ...Array.from(new Set(items.map((i) => i.tag)))];
  const shown = filter === "All" ? items : items.filter((i) => i.tag === filter);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (light === null) return;
      if (e.key === "Escape") setLight(null);
      if (e.key === "ArrowRight") setLight((l) => (l === null ? null : (l + 1) % shown.length));
      if (e.key === "ArrowLeft") setLight((l) => (l === null ? null : (l - 1 + shown.length) % shown.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [light, shown.length]);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={cn(
              "rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition",
              filter === t
                ? "bg-forest-600 text-white shadow-soft"
                : "border border-forest-200 text-forest-700 hover:border-forest-600 dark:border-white/15 dark:text-white dark:hover:border-gold-400"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="masonry mt-10 columns-2 md:columns-3 lg:columns-4">
        {shown.map((item, i) => (
          <button
            key={item.src + item.title + i}
            onClick={() => setLight(i)}
            className="group relative block w-full overflow-hidden rounded-3xl border border-forest-100/60 bg-forest-50 dark:border-white/10"
          >
            <span className={cn("relative block w-full", item.tall ? "aspect-[3/4]" : "aspect-square")}>
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-forest-950/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute inset-x-0 bottom-0 translate-y-3 p-4 text-left opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-300">{item.tag}</span>
                <span className="mt-0.5 block font-display text-base font-semibold text-white">{item.title}</span>
              </span>
              <span className="absolute right-3 top-3 flex h-9 w-9 scale-50 items-center justify-center rounded-full bg-white/90 text-forest-700 opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
                <ZoomIn size={16} />
              </span>
            </span>
          </button>
        ))}
      </div>

      {light !== null && shown[light] && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/92 backdrop-blur-md" onClick={() => setLight(null)}>
          <button aria-label="Close" className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25">
            <X size={20} />
          </button>
          <button
            aria-label="Previous"
            onClick={(e) => { e.stopPropagation(); setLight((light - 1 + shown.length) % shown.length); }}
            className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            aria-label="Next"
            onClick={(e) => { e.stopPropagation(); setLight((light + 1) % shown.length); }}
            className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25"
          >
            <ChevronRight size={22} />
          </button>
          <figure className="relative max-h-[84vh] w-[92vw] max-w-4xl animate-[hero-in_0.45s_ease_both]" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-[74vh]">
              <Image src={shown[light].src} alt={shown[light].title} fill sizes="90vw" className="object-contain" />
            </div>
            <figcaption className="mt-4 text-center">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold-300">{shown[light].tag}</span>
              <p className="font-display text-xl font-semibold text-white">{shown[light].title}</p>
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
