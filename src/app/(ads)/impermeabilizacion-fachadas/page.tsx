import type { Metadata } from "next";
import { ServiceOfferPage } from "@/components/ads/service-offer-page";
import { getServicePage, servicePageMetadata } from "@/lib/data/service-pages";

const page = getServicePage("impermeabilizacion-fachadas");

export const metadata: Metadata = servicePageMetadata(page);

export default function ImpermeabilizacionFachadasPage() {
  return <ServiceOfferPage page={page} />;
}
