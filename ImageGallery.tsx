"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ImageGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const [lightbox, setLightbox] = useState(false);
  const frame = useRef<HTMLDivElement>(null);

  const list = images.length ? images : ["/images/hero-orchard.jpg"];

  function onMove(e: React.MouseEvent) {
    if (!frame.current) return;
    const r = frame.current.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setOrigin(`${x}% ${y}%`);
  }

  const prev = () => setActive((a) => (a - 1 + list.length) % list.length);
  const next = () => setActive((a) => (a + 1) % list.length);

  return (
    <div>
      <div
        ref={frame}
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={onMove}
        onClick={() => setLightbox(true)}
        className="group relative aspect-square cursor-zoom-in overflow-hidden rounded-3xl border border-forest-100 bg-forest-50 shadow-soft dark:border-white/10"
      >
        <Image
          src={list[active]}
          alt={`${name} — image ${active + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          style={{ transform: zoom ? "scale(1.9)" : "scale(1)", transformOrigin: origin }}
          className="object-cover transition-transform duration-200 ease-out"
        />
        <span className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-black/55 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur transition group-hover:bg-forest-600">
          <ZoomIn size={14} /> Hover to zoom · click to expand
        </span>
      </div>

      {list.length > 1 && (
        <div className="mt-4 flex gap-3">
          {list.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={cn(
                "relative h-20 w-20 overflow-hidden rounded-2xl border-2 transition-all",
                i === active ? "border-forest-600 shadow-md dark:border-gold-400" : "border-transparent opacity-60 hover:opacity-100"
              )}
            >
              <Image src={img} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {lightbox && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 backdrop-blur-sm" onClick={() => setLightbox(false)}>
          <button aria-label="Close" className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25">
            <X size={20} />
          </button>
          {list.length > 1 && (
            <>
              <button
                aria-label="Previous image"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                aria-label="Next image"
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}
          <div className="relative h-[82vh] w-[92vw] max-w-4xl animate-[hero-in_0.5s_ease_both]" onClick={(e) => e.stopPropagation()}>
            <Image src={list[active]} alt={name} fill sizes="90vw" className="object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}
