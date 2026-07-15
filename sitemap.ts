import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/products", "/crop-protection", "/installation", "/wholesale", "/about", "/gallery", "/contact", "/blog", "/faq", "/cart", "/track"].map(
    (p) => ({ url: `${SITE.url}${p}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })
  );

  try {
    const { db } = await import("@/db");
    const { products, posts } = await import("@/db/schema");
    const prods = await db.select({ slug: products.slug }).from(products);
    const blogs = await db.select({ slug: posts.slug }).from(posts);
    return [
      ...staticRoutes,
      ...prods.map((p) => ({ url: `${SITE.url}/products/${p.slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 })),
      ...blogs.map((b) => ({ url: `${SITE.url}/blog/${b.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 })),
    ];
  } catch {
    return staticRoutes;
  }
}
