import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/components/store";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { JsonLd } from "@/components/ui";
import { SITE } from "@/lib/constants";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "AgriNova Italia — Premium High-Density Orchard Materials & Crop Protection",
    template: "%s | AgriNova Italia",
  },
  description:
    "AgriNova Italia supplies premium high-density apple orchard materials — Anti Hail Nets, Plant Ties, Bending Clips, Binding Wire, Pole Caps, GI Pipes, High Tensile Wire and complete crop protection solutions across Kashmir & India.",
  keywords: [
    "High Density Orchard Materials",
    "Apple Orchard Supplies",
    "Anti Hail Net",
    "Plant Tie",
    "Bending Clip",
    "Pole Caps",
    "Binding Wire",
    "GI Pipes",
    "Crop Protection",
    "Apple Farming",
    "Orchard Infrastructure",
    "Agricultural Supplies",
    "Kashmir Orchard Materials",
    "High Tensile Wire",
  ],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: "AgriNova Italia — Grow Better. Grow Together.",
    description: "Premium high-density orchard materials and complete crop protection solutions for modern apple farming.",
    images: [{ url: "/images/hero-orchard.jpg", width: 1200, height: 630, alt: "High-density apple orchard by AgriNova Italia" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0B5D3B",
  width: "device-width",
  initialScale: 1,
};

const themeScript = `(function(){try{if(localStorage.getItem('an_theme')==='dark')document.documentElement.classList.add('dark');}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: SITE.name,
            slogan: SITE.tagline,
            url: SITE.url,
            telephone: SITE.phone,
            email: SITE.email,
            address: { "@type": "PostalAddress", addressLocality: "Shopian", addressRegion: "Jammu & Kashmir", addressCountry: "IN" },
            founder: SITE.owners.map((name) => ({ "@type": "Person", name })),
          }}
        />
        <StoreProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <FloatingButtons />
        </StoreProvider>
      </body>
    </html>
  );
}
