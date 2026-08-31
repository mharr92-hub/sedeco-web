import type { Metadata } from "next";
import { ServiceOfferPage } from "@/components/ads/service-offer-page";
import { getServicePage, servicePageMetadata } from "@/lib/data/service-pages";

const page = getServicePage("reparacion-estructural-panama");

export const metadata: Metadata = servicePageMetadata(page);

export default function ReparacionEstructuralPanamaPage() {
  return <ServiceOfferPage page={page} />;
}
