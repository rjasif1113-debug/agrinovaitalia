export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatINR(n: number) {
  return "₹" + new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);
}

export function formatDate(d: Date | string) {
  return new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function shippingFor(subtotal: number, pincode: string) {
  if (subtotal >= 5000) return 0;
  if (/^19/.test(pincode || "")) return 99;
  return 149;
}

export function orderCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `AN-${s}`;
}

export const ORDER_STATUSES = ["Processing", "Packed", "Shipped", "Delivered", "Cancelled"] as const;
