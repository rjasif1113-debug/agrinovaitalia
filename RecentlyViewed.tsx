"use client";

import { useEffect, useState } from "react";
import ProductCard, { type CardProduct } from "./ProductCard";
import { useStore } from "./store";

export default function RecentlyViewed({ exclude }: { exclude?: string }) {
  const { recent, mounted } = useStore();
  const [items, setItems] = useState<CardProduct[]>([]);

  const slugs = mounted ? recent.filter((s) => s !== exclude).slice(0, 4) : [];

  useEffect(() => {
    if (!slugs.length) {
      setItems([]);
      return;
    }
    fetch(`/api/products?slugs=${slugs.join(",")}`)
      .then((r) => r.json())
      .then((d) => setItems(d.products || []))
      .catch(() => setItems([]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slugs.join(","), mounted]);

  if (!mounted || items.length === 0) return null;

  return (
    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((p, i) => (
        <ProductCard key={p.slug} product={p} index={i} />
      ))}
    </div>
  );
}
