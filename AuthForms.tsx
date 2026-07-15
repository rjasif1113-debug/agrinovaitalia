"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn, UserPlus, Loader2, Sprout } from "lucide-react";
import { cn } from "@/lib/utils";

const inputCls =
  "h-12 w-full rounded-xl border border-forest-100 bg-white px-4 text-sm outline-none transition focus:border-forest-400 focus:ring-2 focus:ring-forest-100 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-gold-400/60 dark:focus:ring-0";

export default function AuthForms({ admin = false }: { admin?: boolean }) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch(admin ? "/api/admin/auth" : "/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: admin ? "login" : mode,
          name: fd.get("name"),
          email: fd.get("email"),
          password: fd.get("password"),
          phone: fd.get("phone"),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Authentication failed");
      router.push(admin ? "/admin" : "/account");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <div className={cn("overflow-hidden rounded-3xl border bg-white shadow-soft dark:bg-white/[0.04]", admin ? "border-forest-200/60 dark:border-gold-500/20" : "border-forest-100 dark:border-white/10")}>
        <div className="bg-forest-950 px-8 py-8 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
            <Sprout size={22} className="text-gold-300" />
          </span>
          <h1 className="mt-4 font-display text-2xl font-semibold text-white">{admin ? "Admin Console" : mode === "login" ? "Welcome Back" : "Create Account"}</h1>
          <p className="mt-1 text-xs text-forest-100/60">
            {admin ? "AgriNova Italia management access" : mode === "login" ? "Sign in to track orders and manage your orchard supplies." : "Join AgriNova for faster checkout and order tracking."}
          </p>
        </div>

        {!admin && (
          <div className="flex border-b border-forest-100 dark:border-white/10">
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(""); }}
                className={cn(
                  "flex-1 py-3.5 text-sm font-bold capitalize transition",
                  mode === m ? "bg-forest-50 text-forest-700 dark:bg-white/10 dark:text-gold-300" : "text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                )}
              >
                {m === "login" ? "Sign In" : "Register"}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4 p-7">
          {mode === "register" && !admin && (
            <>
              <input name="name" required placeholder="Full name" className={inputCls} />
              <input name="phone" type="tel" placeholder="Phone number" className={inputCls} />
            </>
          )}
          <input name="email" type="email" required placeholder="Email address" className={inputCls} />
          <input name="password" type="password" required minLength={6} placeholder="Password (min. 6 characters)" className={inputCls} />
          {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-xs font-semibold text-red-600 dark:bg-red-500/10 dark:text-red-400">{error}</p>}
          <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-full bg-forest-600 py-3.5 text-sm font-bold text-white shadow-soft transition hover:bg-forest-700 disabled:opacity-60">
            {loading ? <Loader2 size={16} className="animate-spin" /> : mode === "login" || admin ? <LogIn size={16} /> : <UserPlus size={16} />}
            {admin ? "Sign in to Console" : mode === "login" ? "Sign In" : "Create Account"}
          </button>
          {admin && <p className="text-center text-[11px] leading-relaxed text-stone-400">Authorized personnel only. All activity is logged.</p>}
        </form>
      </div>
    </div>
  );
}
