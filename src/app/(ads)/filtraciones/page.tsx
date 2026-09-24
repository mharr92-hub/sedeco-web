import type { Metadata } from "next";
import Link from "next/link";
import { AdsFooter } from "@/components/ads/ads-footer";
import { AdsHeader } from "@/components/ads/ads-header";
import { AdsLandingPage } from "@/components/ads/ads-landing";
import { adsMetadata, getAdsLanding } from "@/lib/data/ads-landings";

const landing = getAdsLanding("filtraciones");

export const metadata: Metadata = adsMetadata(landing);

export default function FiltracionesPage() {
  return (
    <>
      <AdsHeader landing={landing} />
      <AdsLandingPage landing={landing} />
      <div className="border-t border-white/10 bg-[#070F26]">
        <div className="brand-wrap py-6">
          <Link
            href="/servicios"
            className="inline-flex min-h-11 items-center text-sm font-semibold text-white underline decoration-[#F5A623] underline-offset-4 hover:text-[#F5A623]"
          >
            Ver todos los servicios
          </Link>
        </div>
      </div>
      <AdsFooter landing={landing} />
    </>
  );
}
