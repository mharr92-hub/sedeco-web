import type { Metadata } from "next";
import { FiltracionesLanding } from "@/components/ads/filtraciones-landing";
import { adsMetadata, getAdsLanding } from "@/lib/data/ads-landings";

const landing = getAdsLanding("filtraciones");

/**
 * Homepage is the filtraciones landing, not a redirect.
 * Search ads stay on `/filtraciones`. Canonical stays `/`.
 */
export const metadata: Metadata = adsMetadata(landing, { canonicalPath: "/" });

export default function HomePage() {
  return <FiltracionesLanding />;
}
