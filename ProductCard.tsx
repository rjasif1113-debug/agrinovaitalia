"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Heart, ShoppingBag, Scale, Check, ArrowRight } from "lucide-react";
import { formatINR, cn } from "@/lib/utils";
import { Badge, Stars } from "./ui";
import { useStore } from "./store";
import { CATEGORY_NAMES } from "@/lib/constants";

export interface CardProduct {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  price: number;
  mrp: number | null;
  unit: string;
  images: string[];
  rating: number;
  reviewCount: number;
  featured: boolean;
  bestseller: boolean;
  isNew: boolean;
  stock: number;
}

export default function ProductCard({ product, index = 0 }: { product: CardProduct; index?: number }) {
  const { addToCart, toggleWishlist, toggleCompare, wishlist, compare, mounted } = useStore();
  const [added, setAdded] = useState(false);
  const router = useRouter();

  const wish = mounted && wishlist.includes(product.slug);
  const cmp = mounted && compare.includes(product.slug);
  const off = product.mrp && product.mrp > product.price ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-forest-100/80 bg-white shadow-[0_2px_20px_-12px_rgb(7_48_32/0.15)] transition-all duration-500 hover:-translate-y-1.5 hover:border-forest-200 hover:shadow-soft dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-gold-500/30"
      style={{ transitionDelay: `${Math.min(index, 8) * 20}ms` }}
    >
      <Link href={`/products/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-forest-50" aria-label={product.name}>
        <Image
          src={product.images[0] || "/images/hero-orchard.jpg"}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.bestseller && <Badge tone="gold">Bestseller</Badge>}
          {product.isNew && <Badge tone="new">New Arrival</Badge>}
          {off > 0 && <Badge tone="forest">-{off}%</Badge>}
        </span>
      </Link>

      <div className="absolute right-3 top-3 z-10 flex flex-col gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100 max-lg:opacity-100">
        <button
          onClick={() => toggleWishlist(product.slug)}
          aria-label={wish ? "Remove from wishlist" : "Add to wishlist"}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full border bg-white/90 shadow-sm backdrop-blur transition hover:scale-110 dark:bg-black/50",
            wish ? "border-red-200 text-red-500" : "border-transparent text-stone-500 hover:text-red-500 dark:text-stone-300"
          )}
        >
          <Heart size={16} fill={wish ? "currentColor" : "none"} />
        </button>
        <button
          onClick={() => toggleCompare(product.slug)}
          aria-label={cmp ? "Remove from compare" : "Add to compare"}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full border bg-white/90 shadow-sm backdrop-blur transition hover:scale-110 dark:bg-black/50",
            cmp ? "border-forest-300 text-forest-600 dark:text-gold-300" : "border-transparent text-stone-500 hover:text-forest-600 dark:text-stone-300"
          )}
        >
          <Scale size={16} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-olive-600 dark:text-gold-300/80">{CATEGORY_NAMES[product.category] || product.category}</p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="mt-1.5 font-display text-lg font-semibold leading-snug text-forest-900 transition group-hover:text-forest-600 dark:text-white dark:group-hover:text-gold-300">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-stone-500 dark:text-stone-400">{product.tagline}</p>

        <div className="mt-2.5 flex items-center gap-2">
          <Stars rating={product.rating} size={13} />
          <span className="text-[11px] font-medium text-stone-400">({product.reviewCount})</span>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-xl font-bold text-forest-700 dark:text-gold-300">{formatINR(product.price)}</span>
          {product.mrp && product.mrp > product.price && <span className="text-xs text-stone-400 line-through">{formatINR(product.mrp)}</span>}
          <span className="text-[11px] text-stone-400">{product.unit}</span>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => {
              if (added) return router.push("/cart");
              addToCart({ slug: product.slug, name: product.name, price: product.price, image: product.images[0], unit: product.unit });
              setAdded(true);
            }}
            className={cn(
              "flex flex-1 items-center justify-center gap-1.5 rounded-full py-2.5 text-xs font-bold transition",
              added ? "bg-olive-500 text-white" : "bg-forest-600 text-white hover:bg-forest-700"
            )}
          >
            {added ? <><Check size={14} /> View Cart</> : <><ShoppingBag size={14} /> Add to Cart</>}
          </button>
          <Link
            href={`/products/${product.slug}`}
            aria-label={`View ${product.name}`}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-forest-200 text-forest-700 transition hover:border-forest-600 hover:bg-forest-600 hover:text-white dark:border-white/15 dark:text-white dark:hover:border-gold-500 dark:hover:bg-gold-500 dark:hover:text-forest-950"
          >
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}
