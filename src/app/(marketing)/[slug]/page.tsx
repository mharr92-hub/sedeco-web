import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IntegralServicePage } from "@/components/site/integral-service-page";
import {
  getIntegralServiceBySlug,
  getIntegralServices,
  integralServiceMetadata,
} from "@/lib/data/integral-services";

export const dynamicParams = false;

export function generateStaticParams() {
  return getIntegralServices().map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getIntegralServiceBySlug(slug);
  if (!service) return {};
  return integralServiceMetadata(service);
}

export default async function IntegralServiceRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getIntegralServiceBySlug(slug);
  if (!service) notFound();
  return <IntegralServicePage service={service} />;
}
