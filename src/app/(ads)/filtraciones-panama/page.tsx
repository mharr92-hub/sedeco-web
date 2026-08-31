import type { Metadata } from "next";
import { AdsFooter } from "@/components/ads/ads-footer";
import { AdsHeader } from "@/components/ads/ads-header";
import { AdsLandingPage } from "@/components/ads/ads-landing";
import { adsMetadata, getAdsLanding } from "@/lib/data/ads-landings";

const landing = getAdsLanding("filtraciones-panama");

export const metadata: Metadata = adsMetadata(landing);

export default function FiltracionesPanamaPage() {
  return (
    <>
      <AdsHeader landing={landing} />
      <AdsLandingPage landing={landing} />
      <AdsFooter landing={landing} />
    </>
  );
}
