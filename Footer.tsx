"use client";

import Link from "next/link";
import { useState } from "react";
import { Sprout, MapPin, Phone, Mail, Clock, Send, Check } from "lucide-react";
import { NAV, SITE, CATEGORIES } from "@/lib/constants";

function SocialIcon({ path }: { path: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

const SOCIALS = [
  { label: "Facebook", href: "https://facebook.com", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
  { label: "Instagram", href: "https://instagram.com", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" },
  { label: "YouTube", href: "https://youtube.com", path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
];

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return setState("error");
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done")
    return (
      <p className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3.5 text-sm font-semibold text-gold-300">
        <Check size={16} /> Subscribed. Welcome to the AgriNova family.
      </p>
    );

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setState("idle");
        }}
        placeholder="Your email address"
        className="h-12 min-w-0 flex-1 rounded-full border border-white/15 bg-white/10 px-5 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-gold-400/60"
      />
      <button
        type="submit"
        disabled={state === "loading"}
        aria-label="Subscribe to newsletter"
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-500 text-forest-950 transition hover:bg-gold-400 disabled:opacity-60"
      >
        <Send size={17} />
      </button>
    </form>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-forest-950 text-forest-100">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-forest-600/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                <Sprout size={22} className="text-gold-300" />
              </span>
              <span className="leading-none">
                <span className="block font-display text-xl font-semibold tracking-tight text-white">AgriNova</span>
                <span className="block text-[10px] font-bold uppercase tracking-[0.42em] text-gold-400">Italia</span>
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-forest-100/70">
              Trusted supplier of premium high-density orchard materials and complete crop protection solutions. {SITE.tagline}
            </p>
            <div className="mt-6 flex gap-2.5">
              {SOCIALS.map(({ label, href, path }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-forest-100/80 transition hover:border-gold-400/60 hover:bg-gold-500 hover:text-forest-950"
                >
                  <SocialIcon path={path} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-gold-300">Quick Links</h3>
            <ul className="mt-5 space-y-2.5 text-sm">
              {[...NAV, { label: "Blog", href: "/blog" }, { label: "FAQs", href: "/faq" }, { label: "Track Order", href: "/track" }].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-forest-100/70 transition hover:text-gold-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-gold-300">Product Categories</h3>
            <ul className="mt-5 space-y-2.5 text-sm">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link href={`/products?category=${c.slug}`} className="text-forest-100/70 transition hover:text-gold-300">
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/installation" className="text-forest-100/70 transition hover:text-gold-300">
                  Installation Services
                </Link>
              </li>
              <li>
                <Link href="/wholesale" className="text-forest-100/70 transition hover:text-gold-300">
                  Wholesale Supply
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-gold-300">Get in Touch</h3>
            <ul className="mt-5 space-y-3 text-sm text-forest-100/70">
              <li className="flex items-start gap-2.5"><MapPin size={15} className="mt-0.5 shrink-0 text-gold-400" /> {SITE.address}</li>
              <li>
                <a href={`tel:${SITE.phone}`} className="flex items-center gap-2.5 transition hover:text-gold-300">
                  <Phone size={15} className="shrink-0 text-gold-400" /> {SITE.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5"><Mail size={15} className="shrink-0 text-gold-400" /> {SITE.email}</li>
              <li className="flex items-center gap-2.5"><Clock size={15} className="shrink-0 text-gold-400" /> {SITE.hours}</li>
            </ul>
            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold text-white">Orchard tips & seasonal offers</p>
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-xs text-forest-100/50 sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. {SITE.tagline}</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="/policies/privacy" className="transition hover:text-gold-300">Privacy Policy</Link>
            <Link href="/policies/terms" className="transition hover:text-gold-300">Terms & Conditions</Link>
            <Link href="/policies/shipping" className="transition hover:text-gold-300">Shipping Policy</Link>
            <Link href="/policies/refund" className="transition hover:text-gold-300">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
