"use client";

import Link from "next/link";
import { TrackedLink } from "@/components/ads/tracked-link";
import { WhatsAppGlyph } from "@/components/site/whatsapp-float";
import { whatsappHref, WHATSAPP_DISPLAY } from "@/lib/site";
import type { AdsLanding } from "@/lib/data/ads-landings";
import { openAdsForm } from "@/components/ads/ads-form-events";

const nav = [
  { href: "#metodo", label: "Método" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#preguntas", label: "Preguntas" },
] as const;

export function AdsHeader({ landing }: { landing: AdsLanding }) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#D6E8FF] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-5 md:h-[4.5rem] md:px-8">
        <Link
          href={landing.path}
          className="font-display text-xl font-semibold tracking-tight text-[#1A2E8A] md:text-2xl"
        >
          SEDECO
        </Link>

        <nav aria-label="En esta página" className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[#1A2E8A]/80 transition-colors hover:text-[#2B4BF2]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <TrackedLink
            event="whatsapp_click"
            landing={landing.slug}
            location="header"
            href={whatsappHref(landing.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp ${WHATSAPP_DISPLAY}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-[#25D366] text-white transition-colors hover:bg-[#1ebe5d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
          >
            <WhatsAppGlyph />
          </TrackedLink>
          <button
            type="button"
            onClick={() => openAdsForm("header")}
            className="inline-flex min-h-11 items-center rounded-md bg-[#2B4BF2] px-3 text-sm font-semibold text-white transition-colors hover:bg-[#1A2E8A] md:px-4"
          >
            <span className="hidden sm:inline">{landing.cta}</span>
            <span className="sm:hidden">Inspección</span>
          </button>
        </div>
      </div>
    </header>
  );
}
