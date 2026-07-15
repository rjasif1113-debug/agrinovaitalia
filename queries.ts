import { db } from "@/db";
import { products, posts, banners, reviews, type Product } from "@/db/schema";
import { and, desc, eq, ilike, or, asc, gte, lte, inArray, sql } from "drizzle-orm";

export interface ProductFilter {
  q?: string;
  category?: string;
  sort?: string;
  min?: number;
  max?: number;
  badge?: string;
}

export async function getProducts(filter: ProductFilter = {}): Promise<Product[]> {
  const conds = [];
  if (filter.q) {
    const pat = `%${filter.q}%`;
    conds.push(or(ilike(products.name, pat), ilike(products.tagline, pat), ilike(products.description, pat)));
  }
  if (filter.category && filter.category !== "all") conds.push(eq(products.category, filter.category));
  if (typeof filter.min === "number" && !Number.isNaN(filter.min)) conds.push(gte(products.price, filter.min));
  if (typeof filter.max === "number" && !Number.isNaN(filter.max)) conds.push(lte(products.price, filter.max));
  if (filter.badge === "featured") conds.push(eq(products.featured, true));
  if (filter.badge === "bestseller") conds.push(eq(products.bestseller, true));
  if (filter.badge === "new") conds.push(eq(products.isNew, true));

  const where = conds.length ? and(...conds) : undefined;
  const orderBy =
    filter.sort === "price-asc"
      ? [asc(products.price)]
      : filter.sort === "price-desc"
        ? [desc(products.price)]
        : filter.sort === "rating"
          ? [desc(products.rating)]
          : filter.sort === "name"
            ? [asc(products.name)]
            : [desc(products.createdAt)];

  return db.select().from(products).where(where).orderBy(...orderBy);
}

export async function getProductBySlug(slug: string) {
  const rows = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  return rows[0] || null;
}

export async function getProductsBySlugs(slugs: string[]) {
  if (!slugs.length) return [] as Product[];
  return db.select().from(products).where(inArray(products.slug, slugs));
}

export async function getRelatedProducts(p: Product, limit = 4) {
  const same = await db
    .select()
    .from(products)
    .where(and(eq(products.category, p.category), sql`${products.id} != ${p.id}`))
    .limit(limit);
  if (same.length >= limit) return same;
  const rest = await db
    .select()
    .from(products)
    .where(and(sql`${products.id} != ${p.id}`, sql`${products.id} NOT IN (${sql.join(same.map((s) => s.id))})`))
    .orderBy(desc(products.bestseller))
    .limit(limit - same.length);
  return [...same, ...rest];
}

export async function getFeaturedProducts() {
  return db.select().from(products).where(eq(products.featured, true)).orderBy(desc(products.createdAt)).limit(8);
}

export async function getBestsellers() {
  return db.select().from(products).where(eq(products.bestseller, true)).limit(8);
}

export async function getNewArrivals() {
  return db.select().from(products).orderBy(desc(products.createdAt)).limit(8);
}

export async function getProductReviews(productId: string) {
  return db.select().from(reviews).where(eq(reviews.productId, productId)).orderBy(desc(reviews.createdAt)).limit(20);
}

export async function getPublishedPosts() {
  return db.select().from(posts).where(eq(posts.published, true)).orderBy(desc(posts.createdAt));
}

export async function getPostBySlug(slug: string) {
  const rows = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1);
  return rows[0] || null;
}

export async function getActiveBanner() {
  const rows = await db.select().from(banners).where(eq(banners.active, true)).orderBy(desc(banners.createdAt)).limit(1);
  return rows[0] || null;
}
