"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ShieldCheck, Truck, BadgePercent, Loader2, PartyPopper, Banknote, CreditCard, Copy } from "lucide-react";
import { useStore } from "./store";
import { formatINR, shippingFor, cn } from "@/lib/utils";
import { waLink } from "@/lib/constants";

const inputCls =
  "h-12 w-full rounded-xl border border-forest-100 bg-white px-4 text-sm outline-none transition focus:border-forest-400 focus:ring-2 focus:ring-forest-100 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-gold-400/60 dark:focus:ring-0";
const labelCls = "mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400";

export default function CheckoutForm({ preset }: { preset?: { name?: string; email?: string; phone?: string; address?: string; city?: string; state?: string; pincode?: string } | null }) {
  const { cart, subtotal, clearCart, mounted } = useStore();
  const router = useRouter();
  const [pincode, setPincode] = useState(preset?.pincode || "");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState<{ code: string; amount: number; label: string } | null>(null);
  const [couponMsg, setCouponMsg] = useState("");
  const [payment, setPayment] = useState<"cod" | "online">("cod");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [placed, setPlaced] = useState<{ code: string; total: number } | null>(null);

  const shipping = shippingFor(Math.max(0, subtotal - (discount?.amount || 0)), pincode);
  const total = Math.max(0, subtotal - (discount?.amount || 0)) + shipping;

  async function applyCoupon() {
    if (!coupon.trim()) return;
    setCouponMsg("");
    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: coupon.trim(), subtotal }),
      });
      const data = await res.json();
      if (res.ok && data.valid) {
        setDiscount({ code: data.code, amount: data.discount, label: data.label });
        setCouponMsg(data.label);
      } else {
        setDiscount(null);
        setCouponMsg(data.error || "Invalid coupon code.");
      }
    } catch {
      setCouponMsg("Could not validate coupon.");
    }
  }

  async function placeOrder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!cart.length) return setError("Your cart is empty.");
    setError("");
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      customerName: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      address: fd.get("address"),
      city: fd.get("city"),
      state: fd.get("state"),
      pincode: fd.get("pincode"),
      coupon: discount?.code || "",
      paymentMethod: payment,
      items: cart.map((c) => ({ slug: c.slug, qty: c.qty })),
    };
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order failed");
      clearCart();
      setPlaced({ code: data.code, total: data.total });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Order failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!mounted) return <div className="h-96 animate-pulse rounded-3xl bg-forest-50 dark:bg-white/5" />;

  if (placed) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-forest-100 bg-white p-8 text-center shadow-soft dark:border-white/10 dark:bg-white/[0.04] sm:p-12">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-forest-600/10 text-forest-600 dark:text-gold-300">
          <PartyPopper size={36} />
        </span>
        <h2 className="mt-6 font-display text-3xl font-semibold text-forest-900 dark:text-white">Order Placed Successfully</h2>
        <p className="mt-3 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
          Thank you for shopping with AgriNova Italia. {payment === "cod" ? "Pay when your order arrives — our team will call you to confirm dispatch." : "We will confirm your payment and dispatch details shortly."}
        </p>
        <div className="mt-6 flex items-center justify-center gap-3 rounded-2xl bg-forest-50 px-6 py-4 dark:bg-white/5">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">Order Code</span>
          <span className="font-display text-2xl font-bold text-forest-700 dark:text-gold-300">{placed.code}</span>
          <button aria-label="Copy code" onClick={() => navigator.clipboard?.writeText(placed.code)} className="text-stone-400 transition hover:text-forest-600">
            <Copy size={15} />
          </button>
        </div>
        <p className="mt-3 text-lg font-bold text-forest-900 dark:text-white">Total: {formatINR(placed.total)}</p>
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <Link href={`/track?code=${placed.code}`} className="rounded-full bg-forest-600 py-3.5 text-sm font-bold text-white transition hover:bg-forest-700">
            Track Order
          </Link>
          <a href={waLink(`Hello! I just placed order ${placed.code}. Please confirm dispatch details.`)} target="_blank" rel="noreferrer" className="rounded-full bg-[#25D366] py-3.5 text-sm font-bold text-white transition hover:brightness-95">
            Confirm on WhatsApp
          </a>
        </div>
        <Link href="/products" className="mt-4 inline-block text-xs font-bold text-forest-600 underline-offset-4 hover:underline dark:text-gold-300">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (!cart.length) {
    return (
      <div className="mx-auto max-w-md rounded-3xl border border-forest-100 bg-white p-10 text-center dark:border-white/10 dark:bg-white/[0.04]">
        <p className="font-display text-2xl font-semibold text-forest-900 dark:text-white">Your cart is empty</p>
        <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">Add premium orchard materials to your cart before checkout.</p>
        <button onClick={() => router.push("/products")} className="mt-6 rounded-full bg-forest-600 px-8 py-3 text-sm font-bold text-white transition hover:bg-forest-700">
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={placeOrder} className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
      <div className="space-y-8">
        <section className="rounded-3xl border border-forest-100 bg-white p-6 dark:border-white/10 dark:bg-white/[0.04] sm:p-8">
          <h2 className="flex items-center gap-2.5 font-display text-xl font-semibold text-forest-900 dark:text-white">
            <Truck size={19} className="text-forest-600 dark:text-gold-300" /> Shipping Details
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelCls} htmlFor="co-name">Full Name *</label>
              <input id="co-name" name="name" required defaultValue={preset?.name} className={inputCls} placeholder="Your name" />
            </div>
            <div>
              <label className={labelCls} htmlFor="co-phone">Phone Number *</label>
              <input id="co-phone" name="phone" required type="tel" defaultValue={preset?.phone} className={inputCls} placeholder="+91 …" />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls} htmlFor="co-email">Email</label>
              <input id="co-email" name="email" type="email" defaultValue={preset?.email} className={inputCls} placeholder="you@example.com" />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls} htmlFor="co-address">Address *</label>
              <input id="co-address" name="address" required defaultValue={preset?.address} className={inputCls} placeholder="House / Village / Landmark" />
            </div>
            <div>
              <label className={labelCls} htmlFor="co-city">City / Town *</label>
              <input id="co-city" name="city" required defaultValue={preset?.city} className={inputCls} placeholder="Shopian" />
            </div>
            <div>
              <label className={labelCls} htmlFor="co-state">State *</label>
              <input id="co-state" name="state" required defaultValue={preset?.state || "Jammu & Kashmir"} className={inputCls} placeholder="Jammu & Kashmir" />
            </div>
            <div>
              <label className={labelCls} htmlFor="co-pin">Pincode *</label>
              <input id="co-pin" name="pincode" required pattern="[0-9]{6}" maxLength={6} value={pincode} onChange={(e) => setPincode(e.target.value)} className={inputCls} placeholder="192303" />
              <p className="mt-1.5 text-[11px] text-stone-400">Shipping is calculated live as you type your pincode.</p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-forest-100 bg-white p-6 dark:border-white/10 dark:bg-white/[0.04] sm:p-8">
          <h2 className="flex items-center gap-2.5 font-display text-xl font-semibold text-forest-900 dark:text-white">
            <ShieldCheck size={19} className="text-forest-600 dark:text-gold-300" /> Payment Method
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              { v: "cod" as const, icon: Banknote, title: "Cash on Delivery", text: "Pay when your material arrives. Available across serviceable pincodes." },
              { v: "online" as const, icon: CreditCard, title: "Online Payment", text: "UPI / Cards / Net-banking via secure gateway (confirmed on call)." },
            ].map(({ v, icon: Icon, title, text }) => (
              <button
                type="button"
                key={v}
                onClick={() => setPayment(v)}
                className={cn(
                  "flex items-start gap-3 rounded-2xl border-2 p-5 text-left transition",
                  payment === v ? "border-forest-600 bg-forest-50/70 dark:border-gold-400 dark:bg-gold-500/10" : "border-forest-100 hover:border-forest-300 dark:border-white/10 dark:hover:border-white/25"
                )}
              >
                <Icon size={20} className={payment === v ? "text-forest-600 dark:text-gold-300" : "text-stone-400"} />
                <span>
                  <span className="block text-sm font-bold text-forest-900 dark:text-white">{title}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-stone-500 dark:text-stone-400">{text}</span>
                </span>
              </button>
            ))}
          </div>
        </section>
      </div>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-3xl border border-forest-100 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-white/[0.04] sm:p-7">
          <h2 className="font-display text-xl font-semibold text-forest-900 dark:text-white">Order Summary</h2>
          <ul className="mt-5 space-y-4">
            {cart.map((c) => (
              <li key={c.slug} className="flex items-center gap-3">
                <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-forest-50">
                  <Image src={c.image} alt="" fill sizes="56px" className="object-cover" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold text-forest-900 dark:text-white">{c.name}</span>
                  <span className="text-xs text-stone-400">Qty {c.qty} · {c.unit}</span>
                </span>
                <span className="text-sm font-bold text-forest-700 dark:text-gold-300">{formatINR(c.qty * c.price)}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex gap-2">
            <div className="relative flex-1">
              <BadgePercent size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
              <input value={coupon} onChange={(e) => setCoupon(e.target.value.toUpperCase())} placeholder="Coupon code" className={cn(inputCls, "pl-10 uppercase")} />
            </div>
            <button type="button" onClick={applyCoupon} className="shrink-0 rounded-xl bg-forest-600 px-5 text-xs font-bold text-white transition hover:bg-forest-700">
              Apply
            </button>
          </div>
          {couponMsg && <p className={cn("mt-2 text-xs font-semibold", discount ? "text-forest-600 dark:text-gold-300" : "text-red-500")}>{couponMsg}</p>}

          <dl className="mt-6 space-y-2.5 border-t border-dashed border-forest-100 pt-5 text-sm dark:border-white/10">
            <div className="flex justify-between"><dt className="text-stone-500 dark:text-stone-400">Subtotal</dt><dd className="font-bold text-forest-900 dark:text-white">{formatINR(subtotal)}</dd></div>
            {discount && <div className="flex justify-between text-olive-600 dark:text-gold-300"><dt>Discount ({discount.code})</dt><dd className="font-bold">−{formatINR(discount.amount)}</dd></div>}
            <div className="flex justify-between"><dt className="text-stone-500 dark:text-stone-400">Shipping</dt><dd className="font-bold text-forest-900 dark:text-white">{shipping === 0 ? "FREE" : formatINR(shipping)}</dd></div>
            <div className="flex justify-between border-t border-forest-100 pt-3 text-base dark:border-white/10"><dt className="font-bold text-forest-900 dark:text-white">Total</dt><dd className="font-display text-2xl font-bold text-forest-700 dark:text-gold-300">{formatINR(total)}</dd></div>
          </dl>

          {error && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-xs font-semibold text-red-600 dark:bg-red-500/10 dark:text-red-400">{error}</p>}

          <button type="submit" disabled={loading} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-forest-600 py-4 text-sm font-bold text-white shadow-soft transition hover:bg-forest-700 disabled:opacity-60">
            {loading ? <><Loader2 size={16} className="animate-spin" /> Placing Order…</> : payment === "cod" ? "Place Order — Pay on Delivery" : "Proceed to Pay Online"}
          </button>
          <p className="mt-3 text-center text-[11px] leading-relaxed text-stone-400">By placing this order you agree to our Terms & Conditions and Shipping Policy.</p>
        </div>
      </aside>
    </form>
  );
}
