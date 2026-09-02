import { AdsFooter } from "@/components/ads/ads-footer";
import { AdsHeader } from "@/components/ads/ads-header";
import { AdsLandingPage } from "@/components/ads/ads-landing";
import { getAdsLanding } from "@/lib/data/ads-landings";

const landing = getAdsLanding("filtraciones");

/** Pixel-identical filtraciones landing. Used by both `/` and `/filtraciones`. */
export function FiltracionesLanding() {
  return (
    <>
      <AdsHeader landing={landing} />
      <AdsLandingPage landing={landing} />
      <AdsFooter landing={landing} />
    </>
  );
}
