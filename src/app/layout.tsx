import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { DataLayerInit, GtmNoscript } from "@/components/analytics/data-layer";
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
    default: "SEDECO Panamá — Sellado de concreto permanente",
    template: "%s · SEDECO Panamá",
  },
  description:
    "Aplicadores autorizados de Ghostshield® en Panamá. Impermeabilización permanente de concreto con nanotecnología y garantía por escrito según sistema y alcance. Más de 100,000 m² impermeabilizados.",
  openGraph: {
    type: "website",
    locale: "es_PA",
    siteName: "SEDECO Panamá",
    url: siteUrl,
    title: "SEDECO Panamá — Sellado de concreto permanente",
    description:
      "Damos resultados concretos en todo lo que hacemos. Impermeabilización con nanotecnología molecular y garantía por escrito según sistema y alcance.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEDECO Panamá — Sellado de concreto permanente",
    description:
      "Damos resultados concretos en todo lo que hacemos. Impermeabilización con nanotecnología molecular y garantía por escrito según sistema y alcance.",
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
        {children}
      </body>
    </html>
  );
}
