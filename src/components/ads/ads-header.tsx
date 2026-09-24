"use client";

import { TrackedLink } from "@/components/ads/tracked-link";
import { BrandLogo } from "@/components/site/brand-logo";
import { PhoneGlyph } from "@/components/site/phone-glyph";
import { WhatsAppGlyph } from "@/components/site/whatsapp-float";
import {
  PHONE_OFFICE_PRIMARY,
  telHref,
  whatsappHref,
  WHATSAPP_DISPLAY,
} from "@/lib/site";
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
        <BrandLogo />

        <nav aria-label="En esta página" className="hidden items-center gap-3 md:flex lg:gap-7">
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

        <div className="flex shrink-0 items-center gap-2">
          <TrackedLink
            event="whatsapp_click"
            landing={landing.slug}
            source={landing.source}
            location="header"
            href={whatsappHref(landing.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp ${WHATSAPP_DISPLAY}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-[#25D366] text-white transition-colors hover:bg-[#1ebe5d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A2E8A]"
          >
            <WhatsAppGlyph />
          </TrackedLink>
          <TrackedLink
            event="phone_click"
            landing={landing.slug}
            source={landing.source}
            location="header"
            href={telHref(PHONE_OFFICE_PRIMARY)}
            aria-label={`Llamar al ${PHONE_OFFICE_PRIMARY}`}
            className="hidden h-11 items-center gap-1.5 rounded-md border border-white/40 px-2.5 text-xs font-semibold text-white transition-colors hover:border-[#F5A623] hover:text-[#F5A623] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A2E8A] md:inline-flex lg:px-3 lg:text-sm"
          >
            <PhoneGlyph className="h-4 w-4" />
            Llamar
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
