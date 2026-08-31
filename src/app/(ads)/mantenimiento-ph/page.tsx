import type { Metadata } from "next";
import { ServiceOfferPage } from "@/components/ads/service-offer-page";
import { getServicePage, servicePageMetadata } from "@/lib/data/service-pages";

const page = getServicePage("mantenimiento-ph");

export const metadata: Metadata = servicePageMetadata(page);

export default function MantenimientoPhPage() {
  return <ServiceOfferPage page={page} />;
}
