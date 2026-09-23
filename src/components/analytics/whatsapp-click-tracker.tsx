"use client";

import { useEffect } from "react";
import { gtagEvent } from "@/lib/analytics";

/**
 * Sends whatsapp_click to GA4 for every wa.me link on the site.
 *
 * Delegated on the document so it covers the float button, the footer and
 * legal pages, and any TrackedLink — all of which render a plain anchor.
 * Keeping it in one place means a click reports exactly once.
 */
export function WhatsAppClickTracker() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as Element | null;
      const link = target?.closest?.('a[href*="wa.me"]');
      if (!link) return;
      gtagEvent("whatsapp_click", { page_path: window.location.pathname });
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
