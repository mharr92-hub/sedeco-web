import type { Metadata } from "next";
import Link from "next/link";
import { ThankYouClient } from "@/components/ads/thank-you-client";
import {
  CANONICAL_ORIGIN,
  INSPECTION_SLA,
  LEGAL_NAME,
  OG_IMAGE,
  SITE_EMAIL,
  WHATSAPP_DISPLAY,
} from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Solicitud recibida · SEDECO Panamá" },
  description: `Recibimos su solicitud de inspección. ${INSPECTION_SLA} Envíe fotos por WhatsApp ${WHATSAPP_DISPLAY}.`,
  robots: { index: false, follow: false },
  alternates: { canonical: `${CANONICAL_ORIGIN}/gracias` },
  openGraph: {
    url: `${CANONICAL_ORIGIN}/gracias`,
    title: "Solicitud recibida · SEDECO Panamá",
    description: `Recibimos su solicitud de inspección. ${INSPECTION_SLA}`,
    images: [OG_IMAGE],
  },
};

export default function GraciasPage() {
  return (
    <main className="bg-white">
      <header className="border-b-2 border-[#F5A623] bg-[#1A2E8A]">
        <div className="brand-wrap flex h-16 items-center md:h-[4.5rem]">
          <Link
            href="/"
            className="font-display text-xl font-semibold tracking-[0.18em] text-white md:text-2xl"
          >
            SEDECO
          </Link>
        </div>
      </header>
      <div className="mx-auto max-w-xl px-5 py-16 md:py-20">
        <p className="brand-kicker-blue">
          Solicitud recibida
        </p>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-[#1A2E8A] md:text-4xl">
          Recibimos su caso.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-[#5C6578]">
          {INSPECTION_SLA} Si puede, envíe fotos ahora por WhatsApp (
          {WHATSAPP_DISPLAY}) — ayudan a preparar la inspección. Las fotos no
          sustituyen la visita.
        </p>
        <ThankYouClient />
        <p className="mt-4 text-sm text-[#5C6578]">
          También puede escribir a{" "}
          <a href={`mailto:${SITE_EMAIL}`} className="underline underline-offset-2">
            {SITE_EMAIL}
          </a>
          .
        </p>
        <p className="mt-10 text-xs text-[#5C6578]">{LEGAL_NAME}</p>
      </div>
    </main>
  );
}
