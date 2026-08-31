import type { Metadata } from "next";
import Link from "next/link";
import { ThankYouClient } from "@/components/ads/thank-you-client";
import { LEGAL_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Solicitud recibida · SEDECO Panamá" },
  description:
    "Recibimos su solicitud de evaluación. Mark le responde el próximo día hábil.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/gracias" },
};

export default function GraciasPage() {
  return (
    <main className="bg-[#F5F6FA]">
      <header className="border-b border-[#D6E8FF] bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-5 md:px-8">
          <Link
            href="/"
            className="font-display text-xl font-semibold text-[#1A2E8A]"
          >
            SEDECO
          </Link>
        </div>
      </header>
      <div className="mx-auto max-w-xl px-5 py-16 md:py-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#2B4BF2]">
          Solicitud recibida
        </p>
        <h1 className="mt-4 font-display text-3xl text-[#1A2E8A] md:text-4xl">
          Recibimos su caso.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-[#5C6578]">
          Mark le responde el próximo día hábil. Si puede, envíe fotos ahora por
          WhatsApp — ayudan a preparar la inspección. Las fotos no sustituyen la
          visita.
        </p>
        <ThankYouClient />
        <p className="mt-10 text-xs text-[#5C6578]">{LEGAL_NAME}</p>
      </div>
    </main>
  );
}
