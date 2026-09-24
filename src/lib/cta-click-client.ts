import { gtagEvent } from "@/lib/analytics";
import type { CtaType } from "@/lib/cta-click";

const ENDPOINT = "/api/cta-clicks";
const DEDUPE_MS = 1500;

let lastKey = "";
let lastAt = 0;

export type CtaClickReport = {
  ctaType: CtaType;
  href: string;
  source?: string;
  location?: string;
  landing?: string;
};

/**
 * Logs a WhatsApp or tel click before navigation. sendBeacon survives the
 * page unload; fetch keepalive is the fallback. A second event from the same
 * gesture (pointerdown + click) does not insert twice.
 */
export function reportCtaClick(input: CtaClickReport): void {
  if (typeof window === "undefined") return;
  const key = `${input.ctaType}|${input.location ?? ""}|${input.href}`;
  const now = Date.now();
  if (key === lastKey && now - lastAt < DEDUPE_MS) return;
  lastKey = key;
  lastAt = now;

  gtagEvent(input.ctaType === "whatsapp" ? "cta_whatsapp" : "cta_tel", {
    page_path: window.location.pathname,
    link_location: input.location,
    landing: input.landing,
  });

  const body = JSON.stringify({
    ctaType: input.ctaType,
    href: input.href,
    landingPath: window.location.pathname,
    source: input.source,
    search: window.location.search,
  });

  try {
    if (typeof navigator.sendBeacon === "function") {
      const blob = new Blob([body], { type: "application/json" });
      if (navigator.sendBeacon(ENDPOINT, blob)) return;
    }
  } catch {
    // fetch keepalive below
  }

  void fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
    credentials: "same-origin",
  }).catch(() => {
    // Navigation can abort the request. keepalive is best-effort.
  });
}
