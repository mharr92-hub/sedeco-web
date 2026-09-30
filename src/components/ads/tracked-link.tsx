"use client";

import type { ComponentPropsWithoutRef, PointerEvent } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";
import { reportCtaClick } from "@/lib/cta-click-client";
import type { CtaType } from "@/lib/cta-click";
import { cn } from "@/lib/utils";

const CTA_TYPE_BY_EVENT: Partial<Record<AnalyticsEvent, CtaType>> = {
  whatsapp_click: "whatsapp",
  phone_click: "tel",
};

/**
 * whatsapp_click already reaches GA4 through the delegated gtag listener in
 * WhatsAppClickTracker, which also carries `servicio`. Pushing it to dataLayer
 * as well would only feed the empty GTM container, so it is skipped here and
 * gtag stays the single path for this event.
 */
const GTAG_ONLY_EVENTS = new Set<AnalyticsEvent>(["whatsapp_click"]);

type TrackedLinkProps = ComponentPropsWithoutRef<"a"> & {
  event: AnalyticsEvent;
  landing?: string;
  location?: string;
  source?: string;
};

export function TrackedLink({
  event,
  landing,
  location,
  source,
  onClick,
  onPointerDown,
  className,
  href,
  ...props
}: TrackedLinkProps) {
  const hrefString = typeof href === "string" ? href : undefined;

  function report() {
    const ctaType = CTA_TYPE_BY_EVENT[event];
    if (!ctaType || !hrefString) return;
    reportCtaClick({
      ctaType,
      href: hrefString,
      source,
      location,
      landing,
    });
  }

  function handlePointerDown(pointerEvent: PointerEvent<HTMLAnchorElement>) {
    if (pointerEvent.button === 0 || pointerEvent.button === 1) report();
    onPointerDown?.(pointerEvent);
  }

  return (
    <a
      {...props}
      href={href}
      data-track={event}
      data-landing={landing}
      className={cn(className)}
      onPointerDown={handlePointerDown}
      onClick={(e) => {
        if (!GTAG_ONLY_EVENTS.has(event)) track({ event, landing, location });
        report();
        onClick?.(e);
      }}
    />
  );
}

type TrackedButtonProps = ComponentPropsWithoutRef<"button"> & {
  event: AnalyticsEvent;
  landing?: string;
  location?: string;
};

export function TrackedButton({
  event,
  landing,
  location,
  onClick,
  className,
  ...props
}: TrackedButtonProps) {
  return (
    <button
      {...props}
      type={props.type ?? "button"}
      data-track={event}
      data-landing={landing}
      className={cn(className)}
      onClick={(e) => {
        track({ event, landing, location });
        onClick?.(e);
      }}
    />
  );
}
