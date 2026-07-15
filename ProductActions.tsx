"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Minus, Plus, ShoppingBag, Zap, Heart, Scale, Check, Building2 } from "lucide-react";
import { cn, formatINR } from "@/lib/utils";
import { useStore } from "./store";
import { waLink } from "@/lib/constants";
import type { CardProduct } from "./ProductCard";

export default function ProductActions({ product }: { product: CardProduct }) {
  const { addToCart, toggleWishlist, toggleCompare, wishlist, compare, mounted, cart } = useStore();
  const [qty, setQtyLocal] = useState(1);
  const [added, setAdded] = useState(false);
  const [sticky, setSticky] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 640);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const inCart = mounted && cart.some((x) => x.slug === product.slug);
  const wish = mounted && wishlist.includes(product.slug);
  const cmp = mounted && compare.includes(product.slug);
  const out = product.stock <= 0;

  function add() {
    addToCart({ slug: product.slug, name: product.name, price: product.price, image: product.images[0], unit: product.unit }, qty);
    setAdded(true);
  }

  function buyNow() {
    addToCart({ slug: product.slug, name: product.name, price: product.price, image: product.images[0], unit: product.unit }, qty);
    router.push("/checkout");
  }

  const whatsappHref = waLink(
    `Hello AgriNova Italia! I want to order:\n• ${product.name}\n• Quantity: ${qty} (${product.unit})\n• Price: ${formatINR(product.price)}\nProduct: ${typeof window !== "undefined" ? window.location.origin : ""}/products/${product.slug}`
  );

  return (
    <>
      <div className="mt-7 space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center rounded-full border border-forest-200 bg-white dark:border-white/15 dark:bg-white/5">
            <button onClick={() => setQtyLocal((q) => Math.max(1, q - 1))} disabled={out} aria-label="Decrease quantity" className="flex h-12 w-12 items-center justify-center text-forest-700 transition hover:text-forest-900 disabled:opacity-40 dark:text-white">
              <Minus size={16} />
            </button>
            <span className="w-10 text-center text-base font-bold tabular-nums text-forest-900 dark:text-white">{qty}</span>
            <button onClick={() => setQtyLocal((q) => Math.min(product.stock || 999, q + 1))} disabled={out} aria-label="Increase quantity" className="flex h-12 w-12 items-center justify-center text-forest-700 transition hover:text-forest-900 disabled:opacity-40 dark:text-white">
              <Plus size={16} />
            </button>
          </div>
          <span className={cn("text-xs font-bold uppercase tracking-wider", out ? "text-red-500" : product.stock < 50 ? "text-amber-600" : "text-forest-600 dark:text-gold-300")}>
            {out ? "Out of stock" : product.stock < 50 ? `Only ${product.stock} left` : "In stock · ships fast"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => (added || inCart ? router.push("/cart") : add())}
            disabled={out}
            className={cn(
              "flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold transition disabled:opacity-50",
              added || inCart ? "bg-olive-500 text-white" : "border-2 border-forest-600 text-forest-700 hover:bg-forest-600 hover:text-white dark:border-gold-500 dark:text-gold-300 dark:hover:bg-gold-500 dark:hover:text-forest-950"
            )}
          >
            {added || inCart ? <><Check size={16} /> In Cart — View</> : <><ShoppingBag size={16} /> Add to Cart</>}
          </button>
          <button
            onClick={buyNow}
            disabled={out}
            className="flex items-center justify-center gap-2 rounded-full bg-forest-600 py-3.5 text-sm font-bold text-white shadow-soft transition hover:bg-forest-700 disabled:opacity-50"
          >
            <Zap size={16} /> Buy Now
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 text-sm font-bold text-white transition hover:brightness-95"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
            WhatsApp Order
          </a>
          <Link
            href={`/wholesale?products=${encodeURIComponent(product.name)}`}
            className="flex items-center justify-center gap-2 rounded-full border border-gold-500/60 bg-gold-500/10 py-3.5 text-sm font-bold text-gold-700 transition hover:bg-gold-500 hover:text-forest-950 dark:text-gold-300"
          >
            <Building2 size={16} /> Wholesale Price
          </Link>
        </div>

        <div className="flex items-center gap-5 pt-1 text-xs font-semibold text-stone-500 dark:text-stone-400">
          <button onClick={() => toggleWishlist(product.slug)} className={cn("flex items-center gap-1.5 transition hover:text-red-500", wish && "text-red-500")}>
            <Heart size={15} fill={wish ? "currentColor" : "none"} /> {wish ? "Wishlisted" : "Add to Wishlist"}
          </button>
          <button onClick={() => toggleCompare(product.slug)} className={cn("flex items-center gap-1.5 transition hover:text-forest-600 dark:hover:text-gold-300", cmp && "text-forest-600 dark:text-gold-300")}>
            <Scale size={15} /> {cmp ? "Comparing" : "Compare"}
          </button>
        </div>
      </div>

      {/* Sticky add to cart (mobile / long scroll) */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 border-t border-forest-100 bg-white/92 px-4 py-3 shadow-[0_-10px_40px_-15px_rgb(7_48_32/0.4)] backdrop-blur-xl transition-transform duration-500 no-print dark:border-white/10 dark:bg-[#081009]/92 lg:hidden",
          sticky ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="flex items-center gap-3">
          <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-forest-50">
            <Image src={product.images[0]} alt="" fill sizes="44px" className="object-cover" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-bold text-forest-900 dark:text-white">{product.name}</span>
            <span className="text-sm font-bold text-forest-600 dark:text-gold-300">{formatINR(product.price)} <span className="text-[10px] font-medium text-stone-400">{product.unit}</span></span>
          </span>
          <button onClick={() => (added || inCart ? router.push("/cart") : add())} disabled={out} className="rounded-full bg-forest-600 px-5 py-2.5 text-xs font-bold text-white disabled:opacity-50">
            {added || inCart ? "View Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </>
  );
}
