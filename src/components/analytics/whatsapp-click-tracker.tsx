"use client";

import { useEffect } from "react";
import { gtagEvent } from "@/lib/analytics";
import { getIntegralServiceByPathname } from "@/lib/data/integral-services";

/**
 * Sends whatsapp_click to GA4 with gtag for every wa.me link on the site.
 *
 * Delegated on the document so it covers the float button, the footer,
 * /servicios and any TrackedLink — all of which render a plain anchor.
 * On the nine service pages the hit includes servicio = slug.
 * The GTM container is empty, so this does not push click_whatsapp to dataLayer.
 * TrackedLink still logs the click to /api/cta-clicks.
 */
export function WhatsAppClickTracker() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as Element | null;
      const link = target?.closest?.('a[href*="wa.me"]');
      if (!link) return;
      const servicio = getIntegralServiceByPathname(
        window.location.pathname,
      )?.slug;
      gtagEvent("whatsapp_click", {
        page_path: window.location.pathname,
        ...(servicio ? { servicio } : {}),
      });
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
