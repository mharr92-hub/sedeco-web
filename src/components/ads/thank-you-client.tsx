"use client";

import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { TrackedLink } from "@/components/ads/tracked-link";
import { WhatsAppGlyph } from "@/components/site/whatsapp-float";
import { adsLandings, type AdsLandingSlug } from "@/lib/data/ads-landings";
import { track } from "@/lib/analytics";
import { whatsappHref, WHATSAPP_DISPLAY } from "@/lib/site";

function isLandingSlug(value: string | null): value is AdsLandingSlug {
  return Boolean(value && value in adsLandings);
}

function ThankYouInner() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const landing = isLandingSlug(from)
    ? adsLandings[from]
    : adsLandings["impermeabilizacion-panama"];

  const waHref = useMemo(
    () => whatsappHref(landing.thankYouWhatsapp),
    [landing.thankYouWhatsapp],
  );

  useEffect(() => {
    track({ event: "thank_you_view", landing: landing.slug });
  }, [landing.slug]);

  return (
    <div className="mt-8 flex flex-col gap-3">
      <TrackedLink
        event="whatsapp_click"
        landing={landing.slug}
        location="thank_you"
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#25D366] px-5 text-sm font-semibold text-white hover:bg-[#1ebe5d]"
      >
        <WhatsAppGlyph />
        Enviar fotos por WhatsApp
      </TrackedLink>
      <p className="text-sm text-[#5C6578]">
        WhatsApp · {WHATSAPP_DISPLAY}
      </p>
    </div>
  );
}

export function ThankYouClient() {
  return (
    <Suspense
      fallback={
        <p className="mt-8 text-sm text-[#5C6578]">Preparando el enlace de WhatsApp…</p>
      }
    >
      <ThankYouInner />
    </Suspense>
  );
}
