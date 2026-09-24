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
        track({ event, landing, location });
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
