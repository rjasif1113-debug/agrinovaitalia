import { pgTable, uuid, text, integer, real, boolean, timestamp, jsonb, uniqueIndex, index } from "drizzle-orm/pg-core";

export interface Spec {
  label: string;
  value: string;
}

export interface Download {
  name: string;
  url: string;
}

export interface OrderItem {
  slug: string;
  name: string;
  image: string;
  price: number;
  qty: number;
  unit: string;
}

export const products = pgTable(
  "products",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    category: text("category").notNull(),
    tagline: text("tagline").notNull().default(""),
    description: text("description").notNull().default(""),
    price: integer("price").notNull().default(0),
    mrp: integer("mrp"),
    unit: text("unit").notNull().default("per unit"),
    images: text("images").array().notNull().default([]),
    highlights: text("highlights").array().notNull().default([]),
    specs: jsonb("specs").$type<Spec[]>().notNull().default([]),
    applications: text("applications").array().notNull().default([]),
    benefits: text("benefits").array().notNull().default([]),
    downloads: jsonb("downloads").$type<Download[]>().notNull().default([]),
    stock: integer("stock").notNull().default(100),
    rating: real("rating").notNull().default(0),
    reviewCount: integer("review_count").notNull().default(0),
    featured: boolean("featured").notNull().default(false),
    bestseller: boolean("bestseller").notNull().default(false),
    isNew: boolean("is_new").notNull().default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [index("products_category_idx").on(t.category)]
);

export const reviews = pgTable(
  "reviews",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    rating: integer("rating").notNull().default(5),
    title: text("title").notNull().default(""),
    comment: text("comment").notNull().default(""),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [index("reviews_product_idx").on(t.productId)]
);

export const orders = pgTable(
  "orders",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    code: text("code").notNull().unique(),
    userId: uuid("user_id"),
    customerName: text("customer_name").notNull(),
    email: text("email").notNull().default(""),
    phone: text("phone").notNull(),
    address: text("address").notNull().default(""),
    city: text("city").notNull().default(""),
    state: text("state").notNull().default(""),
    pincode: text("pincode").notNull().default(""),
    items: jsonb("items").$type<OrderItem[]>().notNull().default([]),
    subtotal: integer("subtotal").notNull().default(0),
    discount: integer("discount").notNull().default(0),
    shipping: integer("shipping").notNull().default(0),
    total: integer("total").notNull().default(0),
    coupon: text("coupon"),
    paymentMethod: text("payment_method").notNull().default("cod"),
    status: text("status").notNull().default("Processing"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [index("orders_phone_idx").on(t.phone), index("orders_email_idx").on(t.email)]
);

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    phone: text("phone").notNull().default(""),
    address: text("address").notNull().default(""),
    city: text("city").notNull().default(""),
    state: text("state").notNull().default(""),
    pincode: text("pincode").notNull().default(""),
    role: text("role").notNull().default("customer"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [uniqueIndex("users_email_idx").on(t.email)]
);

export const enquiries = pgTable(
  "enquiries",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    type: text("type").notNull().default("contact"),
    businessName: text("business_name").notNull().default(""),
    name: text("name").notNull(),
    phone: text("phone").notNull().default(""),
    email: text("email").notNull().default(""),
    location: text("location").notNull().default(""),
    products: text("products").notNull().default(""),
    quantity: text("quantity").notNull().default(""),
    message: text("message").notNull().default(""),
    status: text("status").notNull().default("new"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [index("enquiries_type_idx").on(t.type)]
);

export const newsletter = pgTable("newsletter", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const posts = pgTable("posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull().default(""),
  content: text("content").notNull().default(""),
  cover: text("cover").notNull().default("/images/hero-orchard.jpg"),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const banners = pgTable("banners", {
  id: uuid("id").defaultRandom().primaryKey(),
  eyebrow: text("eyebrow").notNull().default(""),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull().default(""),
  ctaText: text("cta_text").notNull().default("Shop Now"),
  ctaHref: text("cta_href").notNull().default("/products"),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const coupons = pgTable("coupons", {
  id: uuid("id").defaultRandom().primaryKey(),
  code: text("code").notNull().unique(),
  kind: text("kind").notNull().default("percent"),
  value: integer("value").notNull().default(0),
  minSubtotal: integer("min_subtotal").notNull().default(0),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Product = typeof products.$inferSelect;
export type Review = typeof reviews.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type User = typeof users.$inferSelect;
export type Enquiry = typeof enquiries.$inferSelect;
export type Post = typeof posts.$inferSelect;
export type Banner = typeof banners.$inferSelect;
export type Coupon = typeof coupons.$inferSelect;
