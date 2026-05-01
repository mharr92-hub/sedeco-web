import type { Metadata } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site/site-header";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sedeco.lat";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SEDECO Panamá — Sellado de concreto permanente",
    template: "%s · SEDECO Panamá",
  },
  description:
    "Aplicadores autorizados de Ghostshield® en Panamá. Impermeabilización permanente de concreto con nanotecnología y garantía de hasta 100 años. Más de 100,000 m² impermeabilizados.",
  openGraph: {
    type: "website",
    locale: "es_PA",
    siteName: "SEDECO Panamá",
    url: siteUrl,
    title: "SEDECO Panamá — Sellado de concreto permanente",
    description:
      "Damos resultados concretos en todo lo que hacemos. Impermeabilización con nanotecnología molecular y garantía de hasta 100 años.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "SEDECO Panamá — Sellado de concreto permanente",
      },
    ],
  },
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${fraunces.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-screen bg-ink-50 text-ink-900 font-sans antialiased">
        <SiteHeader />
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
