"use client";

import type { ReactNode } from "react";
import { TrackedButton } from "@/components/ads/tracked-link";
import { openAdsForm } from "@/components/ads/ads-form-events";
import type { AnalyticsEvent } from "@/lib/analytics";

export function OpenFormButton({
  event,
  landing,
  location,
  className,
  children,
}: {
  event: AnalyticsEvent;
  landing: string;
  location: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <TrackedButton
      event={event}
      landing={landing}
      location={location}
      className={className}
      onClick={() => openAdsForm(location)}
    >
      {children}
    </TrackedButton>
  );
}
