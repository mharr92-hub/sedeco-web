import type { Metadata } from "next";
import { Suspense } from "react";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { AttributionCapture } from "@/components/analytics/attribution-capture";
import { DataLayerInit, GtmNoscript } from "@/components/analytics/data-layer";
import { WhatsAppClickTracker } from "@/components/analytics/whatsapp-click-tracker";
import { CANONICAL_ORIGIN, OG_IMAGE, OG_IMAGE_URL } from "@/lib/site";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

const siteUrl = CANONICAL_ORIGIN;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SEDECO Panamá | sellado e impermeabilización",
    template: "%s · SEDECO Panamá",
  },
  description:
    "SEDECO en Panamá: sellado de concreto e impermeabilización en la ciudad y en Colón. Diagnóstico previo y más de 100,000 m² aplicados.",
  openGraph: {
    type: "website",
    locale: "es_PA",
    siteName: "SEDECO Panamá",
    url: siteUrl,
    title: "SEDECO Panamá | sellado e impermeabilización",
    description:
      "SEDECO en Panamá: sellado de concreto e impermeabilización en la ciudad y en Colón. Diagnóstico previo y más de 100,000 m² aplicados.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEDECO Panamá | sellado e impermeabilización",
    description:
      "SEDECO en Panamá: sellado de concreto e impermeabilización en la ciudad y en Colón. Diagnóstico previo y más de 100,000 m² aplicados.",
    images: [OG_IMAGE_URL],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={montserrat.variable}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-white font-sans text-[#5C6578] antialiased"
        suppressHydrationWarning
      >
        <DataLayerInit />
        <GtmNoscript />
        <Suspense fallback={null}>
          <AttributionCapture />
        </Suspense>
        <WhatsAppClickTracker />
        {children}
      </body>
    </html>
  );
}
