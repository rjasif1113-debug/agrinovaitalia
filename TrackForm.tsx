"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Package, CheckCircle2, Truck, ClipboardCheck, Home, Loader2 } from "lucide-react";
import { formatDate, formatINR, cn } from "@/lib/utils";

interface Tracked {
  code: string;
  status: string;
  createdAt: string;
  customerName: string;
  city: string;
  state: string;
  total: number;
  items: { name: string; qty: number }[];
}

const STEPS = [
  { label: "Processing", icon: ClipboardCheck },
  { label: "Packed", icon: Package },
  { label: "Shipped", icon: Truck },
  { label: "Delivered", icon: Home },
];

function TrackInner() {
  const params = useSearchParams();
  const [code, setCode] = useState(params.get("code") || "");
  const [phone, setPhone] = useState("");
  const [order, setOrder] = useState<Tracked | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function track(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setOrder(null);
    setLoading(true);
    try {
      const res = await fetch("/api/orders/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Not found");
      setOrder(data.order);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Order not found. Check your code and phone number.");
    } finally {
      setLoading(false);
    }
  }

  const stepIdx = order ? STEPS.findIndex((s) => s.label === order.status) : -1;
  const cancelled = order?.status === "Cancelled";

  return (
    <div className="mx-auto max-w-2xl">
      <form onSubmit={track} className="rounded-3xl border border-forest-100 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-white/[0.04] sm:p-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400" htmlFor="tr-code">Order Code</label>
            <input id="tr-code" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} required placeholder="AN-XXXXXX" className="h-12 w-full rounded-xl border border-forest-100 bg-white px-4 text-sm uppercase outline-none transition focus:border-forest-400 dark:border-white/10 dark:bg-white/5 dark:text-white" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400" htmlFor="tr-phone">Phone Number</label>
            <input id="tr-phone" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="Phone used at checkout" className="h-12 w-full rounded-xl border border-forest-100 bg-white px-4 text-sm outline-none transition focus:border-forest-400 dark:border-white/10 dark:bg-white/5 dark:text-white" />
          </div>
        </div>
        {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-xs font-semibold text-red-600 dark:bg-red-500/10 dark:text-red-400">{error}</p>}
        <button disabled={loading} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-forest-600 py-3.5 text-sm font-bold text-white transition hover:bg-forest-700 disabled:opacity-60">
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />} Track My Order
        </button>
      </form>

      {order && (
        <div className="mt-8 rounded-3xl border border-forest-100 bg-white p-6 shadow-soft animate-[hero-in_0.5s_ease_both] dark:border-white/10 dark:bg-white/[0.04] sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-stone-400">Order {order.code}</p>
              <p className="mt-1 font-display text-2xl font-semibold text-forest-900 dark:text-white">
                {cancelled ? "Order Cancelled" : order.status}
              </p>
              <p className="mt-1 text-xs text-stone-400">Placed {formatDate(order.createdAt)} · {order.city}, {order.state}</p>
            </div>
            <span className="rounded-full bg-forest-50 px-4 py-2 text-sm font-bold text-forest-700 dark:bg-white/5 dark:text-gold-300">{formatINR(order.total)}</span>
          </div>

          {!cancelled && (
            <div className="mt-8">
              <div className="relative flex justify-between">
                <div className="absolute left-6 right-6 top-6 h-1 rounded-full bg-forest-100 dark:bg-white/10" />
                <div
                  className="absolute left-6 top-6 h-1 rounded-full bg-forest-600 transition-all duration-1000 dark:bg-gold-400"
                  style={{ width: `calc(${(Math.max(stepIdx, 0) / (STEPS.length - 1)) * 100}% - ${(Math.max(stepIdx, 0) / (STEPS.length - 1)) * 48}px)` }}
                />
                {STEPS.map((s, i) => {
                  const done = i <= stepIdx;
                  const Icon = done ? (i < stepIdx ? CheckCircle2 : s.icon) : s.icon;
                  return (
                    <div key={s.label} className="relative z-10 flex flex-col items-center gap-2">
                      <span
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-700",
                          done ? "border-forest-600 bg-forest-600 text-white shadow-soft dark:border-gold-400 dark:bg-gold-400 dark:text-forest-950" : "border-forest-100 bg-white text-stone-300 dark:border-white/10 dark:bg-white/5 dark:text-stone-600"
                        )}
                      >
                        <Icon size={19} />
                      </span>
                      <span className={cn("text-[11px] font-bold", done ? "text-forest-700 dark:text-gold-300" : "text-stone-400")}>{s.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-8 border-t border-dashed border-forest-100 pt-5 dark:border-white/10">
            <p className="text-xs font-bold uppercase tracking-widest text-stone-400">Items</p>
            <ul className="mt-3 space-y-1.5 text-sm text-stone-600 dark:text-stone-300">
              {order.items.map((it, i) => (
                <li key={i} className="flex justify-between">
                  <span>{it.name}</span>
                  <span className="font-bold">× {it.qty}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TrackForm() {
  return (
    <Suspense fallback={<div className="mx-auto h-72 max-w-2xl animate-pulse rounded-3xl bg-forest-50 dark:bg-white/5" />}>
      <TrackInner />
    </Suspense>
  );
}
