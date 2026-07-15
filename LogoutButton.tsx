"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut, Loader2 } from "lucide-react";

export function LogoutButton({ admin = false }: { admin?: boolean }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function logout() {
    setLoading(true);
    try {
      await fetch(admin ? "/api/admin/auth" : "/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "logout" }),
      });
    } finally {
      router.push(admin ? "/admin/login" : "/");
      router.refresh();
    }
  }

  return (
    <button
      onClick={logout}
      disabled={loading}
      className="flex items-center gap-2 rounded-full border border-forest-200 px-5 py-2.5 text-xs font-bold text-forest-700 transition hover:bg-red-50 hover:text-red-600 dark:border-white/15 dark:text-white dark:hover:bg-red-500/10"
    >
      {loading ? <Loader2 size={14} className="animate-spin" /> : <LogOut size={14} />} Sign Out
    </button>
  );
}

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="no-print inline-flex items-center gap-2 rounded-full bg-forest-600 px-7 py-3 text-sm font-bold text-white transition hover:bg-forest-700"
    >
      Download / Print Invoice
    </button>
  );
}
