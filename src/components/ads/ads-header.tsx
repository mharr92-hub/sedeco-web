"use client";

import Link from "next/link";
import { TrackedLink } from "@/components/ads/tracked-link";
import { WhatsAppGlyph } from "@/components/site/whatsapp-float";
import { whatsappHref, WHATSAPP_DISPLAY } from "@/lib/site";
import type { LeadPageContext } from "@/lib/data/service-pages";
import { openAdsForm } from "@/components/ads/ads-form-events";

export function AdsHeader({
  landing,
  nav = [
    { href: "#casos", label: "Casos" },
    { href: "#capacidad", label: "Capacidad" },
    { href: "#referencias", label: "Referencias" },
    { href: "#preguntas", label: "Preguntas" },
  ],
}: {
  landing: LeadPageContext;
  nav?: ReadonlyArray<{ href: string; label: string }>;
}) {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-[#F5A623] bg-[#1A2E8A]">
      <div className="brand-wrap flex h-16 items-center justify-between gap-3 md:h-[4.5rem]">
        <Link
          href={landing.path}
          className="font-display text-xl font-semibold tracking-[0.18em] text-white md:text-2xl"
        >
          SEDECO
        </Link>

        <nav aria-label="En esta página" className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/80 transition-colors hover:text-[#F5A623]"
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
            className="btn-gold md:px-4"
          >
            <span className="text-xs sm:text-sm">{landing.cta}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
