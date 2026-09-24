import type { Metadata } from "next";
import { SiteFooter } from "@/components/site/footer";
import { IntegralServiceGrid } from "@/components/site/integral-services-section";
import { LeadCtaBand } from "@/components/site/lead-cta-band";
import {
  getIntegralServices,
  INTEGRAL_HOME_SUBTITLE,
} from "@/lib/data/integral-services";
import { CANONICAL_ORIGIN, INSPECTION_SLA } from "@/lib/site";

const TITLE = "Servicios SEDECO en Panamá";
const DESCRIPTION =
  "Servicios de SEDECO en Panamá: impermeabilización, fachadas, altura, guindolas, drones, pintura, construcción, obras civiles y electricidad.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: `${CANONICAL_ORIGIN}/servicios` },
};

export default function ServiciosPage() {
  const services = getIntegralServices();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Servicios SEDECO Panamá",
    itemListElement: services.map((service, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Service",
        name: service.name,
        url: `${CANONICAL_ORIGIN}${service.path}`,
        provider: { "@type": "Organization", name: "SEDECO Panamá" },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <section className="bg-white text-[#1A2E8A]">
          <div className="brand-wrap brand-section pb-0 md:pb-0">
            <p className="brand-kicker-blue">Servicios</p>
            <h1 className="mt-3 max-w-4xl font-display text-3xl font-semibold tracking-tight md:text-5xl">
              Servicios para edificios y obras en Panamá
            </h1>
            <p className="mt-5 max-w-prose text-base leading-relaxed text-[#5C6578]">
              {INTEGRAL_HOME_SUBTITLE}
            </p>
          </div>
        </section>

        <section aria-label="Mapa de servicios" className="bg-white">
          <div className="brand-wrap pb-16 pt-10 md:pb-20">
            <IntegralServiceGrid headingLevel="h2" />
          </div>
        </section>

        <LeadCtaBand
          variant="dark"
          title="¿No está seguro qué servicio necesita?"
          subtitle={`Cuéntenos qué está pasando. ${INSPECTION_SLA}`}
          href="/#contacto"
        />
      </main>
      <SiteFooter />
    </>
  );
}
