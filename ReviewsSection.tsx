"use client";

import { useState } from "react";
import { Star, User, Send, Check } from "lucide-react";
import { Stars } from "./ui";
import { formatDate, cn } from "@/lib/utils";
import type { Review } from "@/db/schema";

export default function ReviewsSection({ productId, reviews }: { productId: string; reviews: Review[] }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return setState("error");
    setState("loading");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, name, rating, title, comment }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
      <div>
        <h3 className="font-display text-xl font-semibold text-forest-900 dark:text-white">Customer Reviews ({reviews.length})</h3>
        <div className="mt-6 space-y-5">
          {reviews.length === 0 && <p className="rounded-2xl border border-dashed border-forest-200 px-6 py-10 text-center text-sm text-stone-500 dark:border-white/15 dark:text-stone-400">Be the first to review this product.</p>}
          {reviews.map((r) => (
            <div key={r.id} className="rounded-3xl border border-forest-100 bg-white p-6 dark:border-white/10 dark:bg-white/[0.04]">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-600/10 text-forest-700 dark:bg-gold-500/15 dark:text-gold-300">
                  <User size={17} />
                </span>
                <div>
                  <p className="text-sm font-bold text-forest-900 dark:text-white">{r.name}</p>
                  <p className="text-[11px] text-stone-400">{formatDate(r.createdAt)} · Verified Buyer</p>
                </div>
                <Stars rating={r.rating} size={13} className="ml-auto" />
              </div>
              {r.title && <p className="mt-4 text-sm font-bold text-forest-800 dark:text-gold-200">{r.title}</p>}
              <p className="mt-1.5 text-sm leading-relaxed text-stone-600 dark:text-stone-300">{r.comment}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-3xl border border-forest-100 bg-forest-50/60 p-6 dark:border-white/10 dark:bg-white/[0.04] sm:p-7">
          <h3 className="font-display text-xl font-semibold text-forest-900 dark:text-white">Write a Review</h3>
          {state === "done" ? (
            <p className="mt-5 flex items-center gap-2 rounded-2xl bg-forest-600/10 px-4 py-3.5 text-sm font-semibold text-forest-700 dark:text-gold-300">
              <Check size={16} /> Thank you! Your review has been published.
            </p>
          ) : (
            <form onSubmit={submit} className="mt-5 space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">Your Rating</label>
                <div className="mt-2 flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button type="button" key={n} onClick={() => setRating(n)} aria-label={`${n} stars`}>
                      <Star size={24} className={cn("transition", n <= rating ? "text-gold-500" : "text-stone-300 dark:text-stone-600")} fill={n <= rating ? "currentColor" : "none"} />
                    </button>
                  ))}
                </div>
              </div>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required className="h-11 w-full rounded-xl border border-forest-100 bg-white px-4 text-sm outline-none transition focus:border-forest-400 dark:border-white/10 dark:bg-white/5 dark:text-white" />
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Review title (optional)" className="h-11 w-full rounded-xl border border-forest-100 bg-white px-4 text-sm outline-none transition focus:border-forest-400 dark:border-white/10 dark:bg-white/5 dark:text-white" />
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Share your experience with this product…" required rows={4} className="w-full rounded-xl border border-forest-100 bg-white p-4 text-sm outline-none transition focus:border-forest-400 dark:border-white/10 dark:bg-white/5 dark:text-white" />
              {state === "error" && <p className="text-xs font-semibold text-red-500">Please fill all required fields.</p>}
              <button type="submit" disabled={state === "loading"} className="flex w-full items-center justify-center gap-2 rounded-full bg-forest-600 py-3 text-sm font-bold text-white transition hover:bg-forest-700 disabled:opacity-60">
                <Send size={15} /> {state === "loading" ? "Submitting…" : "Submit Review"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
