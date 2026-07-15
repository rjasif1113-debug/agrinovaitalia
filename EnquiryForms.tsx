"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Send, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const inputCls =
  "h-12 w-full rounded-xl border border-forest-100 bg-white px-4 text-sm outline-none transition focus:border-forest-400 focus:ring-2 focus:ring-forest-100 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-gold-400/60 dark:focus:ring-0";
const labelCls = "mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400";

function useEnquiry(type: string) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  async function submit(data: Record<string, string>) {
    setState("loading");
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, ...data }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }
  return { state, submit };
}

function Done({ title, text }: { title: string; text: string }) {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-forest-100 bg-forest-50/60 px-8 py-14 text-center dark:border-white/10 dark:bg-white/[0.04]">
      <CheckCircle2 size={44} className="text-forest-600 dark:text-gold-300" />
      <h3 className="mt-4 font-display text-2xl font-semibold text-forest-900 dark:text-white">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-stone-500 dark:text-stone-400">{text}</p>
    </div>
  );
}

function WholesaleFormInner() {
  const { state, submit } = useEnquiry("wholesale");
  const params = useSearchParams();
  const [error, setError] = useState("");

  if (state === "done") return <Done title="Enquiry Received" text="Our wholesale team will call you within 24 hours with a formal quotation and volume pricing." />;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (!fd.get("name") || !fd.get("phone")) return setError("Name and phone number are required.");
    setError("");
    await submit(Object.fromEntries(fd.entries()) as Record<string, string>);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <div>
        <label className={labelCls} htmlFor="wf-biz">Business Name</label>
        <input id="wf-biz" name="businessName" placeholder="e.g. Himalayan Orchard Co." className={inputCls} />
      </div>
      <div>
        <label className={labelCls} htmlFor="wf-name">Your Name *</label>
        <input id="wf-name" name="name" required placeholder="Full name" className={inputCls} />
      </div>
      <div>
        <label className={labelCls} htmlFor="wf-phone">Phone Number *</label>
        <input id="wf-phone" name="phone" required type="tel" placeholder="+91 …" className={inputCls} />
      </div>
      <div>
        <label className={labelCls} htmlFor="wf-email">Email</label>
        <input id="wf-email" name="email" type="email" placeholder="you@business.com" className={inputCls} />
      </div>
      <div>
        <label className={labelCls} htmlFor="wf-loc">Location</label>
        <input id="wf-loc" name="location" placeholder="District, State" className={inputCls} />
      </div>
      <div>
        <label className={labelCls} htmlFor="wf-qty">Quantity</label>
        <input id="wf-qty" name="quantity" placeholder="e.g. 2,000 sq.m / 500 pcs" className={inputCls} />
      </div>
      <div className="sm:col-span-2">
        <label className={labelCls} htmlFor="wf-prod">Products Required</label>
        <input id="wf-prod" name="products" defaultValue={params.get("products") || ""} placeholder="Anti Hail Net, GI Pipes, High Tensile Wire…" className={inputCls} />
      </div>
      <div className="sm:col-span-2">
        <label className={labelCls} htmlFor="wf-msg">Message</label>
        <textarea id="wf-msg" name="message" rows={4} placeholder="Tell us about your project — orchard size, delivery location, timeline…" className={cn(inputCls, "h-auto py-3")} />
      </div>
      {(error || state === "error") && <p className="text-xs font-semibold text-red-500 sm:col-span-2">{error || "Something went wrong. Please try again."}</p>}
      <div className="sm:col-span-2">
        <button type="submit" disabled={state === "loading"} className="flex w-full items-center justify-center gap-2 rounded-full bg-forest-600 py-4 text-sm font-bold text-white shadow-soft transition hover:bg-forest-700 disabled:opacity-60 sm:w-auto sm:px-12">
          <Send size={15} /> {state === "loading" ? "Sending…" : "Submit Wholesale Enquiry"}
        </button>
      </div>
    </form>
  );
}

export function WholesaleForm() {
  return (
    <Suspense fallback={<div className="h-96 animate-pulse rounded-3xl bg-forest-50 dark:bg-white/5" />}>
      <WholesaleFormInner />
    </Suspense>
  );
}

export function ContactForm() {
  const { state, submit } = useEnquiry("contact");
  const [error, setError] = useState("");

  if (state === "done") return <Done title="Message Sent" text="Thank you for reaching out. We usually reply within a few hours during business time." />;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (!fd.get("name") || (!fd.get("phone") && !fd.get("email"))) return setError("Please provide your name and a phone number or email.");
    setError("");
    await submit(Object.fromEntries(fd.entries()) as Record<string, string>);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="cf-name">Name *</label>
          <input id="cf-name" name="name" required placeholder="Your name" className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="cf-phone">Phone</label>
          <input id="cf-phone" name="phone" type="tel" placeholder="+91 …" className={inputCls} />
        </div>
      </div>
      <div>
        <label className={labelCls} htmlFor="cf-email">Email</label>
        <input id="cf-email" name="email" type="email" placeholder="you@example.com" className={inputCls} />
      </div>
      <div>
        <label className={labelCls} htmlFor="cf-sub">Subject</label>
        <input id="cf-sub" name="products" placeholder="What is this about?" className={inputCls} />
      </div>
      <div>
        <label className={labelCls} htmlFor="cf-msg">Message *</label>
        <textarea id="cf-msg" name="message" required rows={5} placeholder="How can we help your orchard?" className={cn(inputCls, "h-auto py-3")} />
      </div>
      {(error || state === "error") && <p className="text-xs font-semibold text-red-500">{error || "Something went wrong. Please try again."}</p>}
      <button type="submit" disabled={state === "loading"} className="flex w-full items-center justify-center gap-2 rounded-full bg-forest-600 py-4 text-sm font-bold text-white shadow-soft transition hover:bg-forest-700 disabled:opacity-60 sm:w-auto sm:px-12">
        <Send size={15} /> {state === "loading" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

export function BookingForm() {
  const { state, submit } = useEnquiry("installation");
  const [error, setError] = useState("");

  if (state === "done") return <Done title="Installation Booked" text="Our installation coordinator will call you to schedule a site survey and confirm your dates." />;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (!fd.get("name") || !fd.get("phone")) return setError("Name and phone number are required.");
    setError("");
    await submit(Object.fromEntries(fd.entries()) as Record<string, string>);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <div>
        <label className={labelCls} htmlFor="bf-name">Name *</label>
        <input id="bf-name" name="name" required placeholder="Your name" className={inputCls} />
      </div>
      <div>
        <label className={labelCls} htmlFor="bf-phone">Phone Number *</label>
        <input id="bf-phone" name="phone" required type="tel" placeholder="+91 …" className={inputCls} />
      </div>
      <div>
        <label className={labelCls} htmlFor="bf-loc">Orchard Location</label>
        <input id="bf-loc" name="location" placeholder="Village, District" className={inputCls} />
      </div>
      <div>
        <label className={labelCls} htmlFor="bf-area">Area (Kanal / Acre)</label>
        <input id="bf-area" name="quantity" placeholder="e.g. 8 kanal" className={inputCls} />
      </div>
      <div className="sm:col-span-2">
        <label className={labelCls} htmlFor="bf-msg">Requirements</label>
        <textarea id="bf-msg" name="message" rows={4} placeholder="Net only or full structure? Existing poles? Target completion date…" className={cn(inputCls, "h-auto py-3")} />
      </div>
      {(error || state === "error") && <p className="text-xs font-semibold text-red-500 sm:col-span-2">{error || "Something went wrong. Please try again."}</p>}
      <div className="sm:col-span-2">
        <button type="submit" disabled={state === "loading"} className="flex w-full items-center justify-center gap-2 rounded-full bg-gold-500 py-4 text-sm font-bold text-forest-950 shadow-soft transition hover:bg-gold-400 disabled:opacity-60 sm:w-auto sm:px-12">
          <Send size={15} /> {state === "loading" ? "Booking…" : "Book Installation"}
        </button>
      </div>
    </form>
  );
}
