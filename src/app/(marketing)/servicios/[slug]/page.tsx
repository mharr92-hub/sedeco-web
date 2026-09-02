import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseCard } from "@/components/site/case-card";
import { SiteFooter } from "@/components/site/footer";
import { LeadCtaBand } from "@/components/site/lead-cta-band";
import { WhatsAppGlyph } from "@/components/site/whatsapp-float";
import { getCasesByService } from "@/lib/data/cases";
import { getAllServices, getServiceBySlug } from "@/lib/data/services";
import { SERVICE_CTA } from "@/lib/data/service-pages";
import {
  CANONICAL_ORIGIN,
  whatsappHref,
  WHATSAPP_DISPLAY,
} from "@/lib/site";

const siteUrl = CANONICAL_ORIGIN;
const waMessage = "Hola, quiero una inspección para un problema de filtración.";

type ServicioParams = { slug: string };

export function generateStaticParams(): ServicioParams[] {
  return getAllServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ServicioParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.seoTitle ?? service.name,
    description: service.seoDescription,
    alternates: { canonical: `/servicios/${service.slug}` },
  };
}

export default async function ServicioDetailPage({
  params,
}: {
  params: Promise<ServicioParams>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const relatedCases = getCasesByService(service.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.seoDescription,
    url: `${siteUrl}/servicios/${service.slug}`,
    serviceType: service.shortName,
    provider: {
      "@type": "Organization",
      name: "SEDECO",
      url: siteUrl,
      areaServed: [
        { "@type": "City", name: "Ciudad de Panamá" },
        { "@type": "City", name: "Colón" },
      ],
    },
    ...(service.warranty
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Garantía",
            itemListElement: [{ "@type": "Offer", description: service.warranty }],
          },
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="bg-white text-[#1A2E8A]">
        <section className="brand-wrap brand-section">
          <p className="brand-kicker-blue">
            Servicios · {service.shortName}
          </p>
          <h1 className="mt-3 max-w-4xl font-display text-3xl font-semibold tracking-tight md:text-5xl">
            {service.name}
          </h1>
          <p className="mt-5 max-w-prose text-base leading-relaxed text-[#5C6578]">
            {service.tagline}
          </p>
          <p className="mt-4 max-w-prose leading-relaxed text-[#5C6578]">
            {service.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/#contacto" className="btn-gold-lg">
              {SERVICE_CTA}
            </a>
            <a
              href={whatsappHref(waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-[#1A2E8A] px-5 text-sm font-semibold text-[#1A2E8A] hover:bg-[#EEF1FB]"
            >
              <WhatsAppGlyph className="text-[#25D366]" />
              WhatsApp {WHATSAPP_DISPLAY}
            </a>
          </div>
        </section>

        <section
          aria-labelledby="senales-titulo"
          className="border-t border-[#D6E8FF] bg-white"
        >
          <div className="brand-wrap brand-section grid gap-10 md:grid-cols-[5fr_7fr]">
            <div>
              <p className="brand-kicker-blue">Estás aquí porque</p>
              <h2
                id="senales-titulo"
                className="mt-3 font-display text-3xl font-semibold tracking-tight"
              >
                Señales de que necesitas este servicio
              </h2>
            </div>
            <ul className="space-y-3">
              {service.problemSignals.map((signal) => (
                <li
                  key={signal}
                  className="font-display text-xl font-semibold text-[#1A2E8A]"
                >
                  <span className="mr-3 text-[#F5A623]" aria-hidden="true">
                    —
                  </span>
                  <span className="text-base font-normal leading-relaxed text-[#5C6578]">
                    {signal}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          aria-labelledby="metodo-titulo"
          className="border-t border-[#D6E8FF] bg-white"
        >
          <div className="brand-wrap brand-section">
            <p className="brand-kicker-blue">Cómo lo hacemos</p>
            <h2
              id="metodo-titulo"
              className="mt-3 mb-10 font-display text-3xl font-semibold tracking-tight"
            >
              Método SEDECO
            </h2>
            <div className="grid gap-10 md:grid-cols-[7fr_5fr]">
              <ol className="space-y-3">
                {service.approach.map((step, idx) => (
                  <li key={step} className="brand-card p-5">
                    <p className="brand-kicker-gold">
                      {String(idx + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-3 leading-relaxed text-[#5C6578]">{step}</p>
                  </li>
                ))}
              </ol>
              <div>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5C6578]">
                  Productos aplicados
                </p>
                <ul className="space-y-2 text-sm text-[#5C6578]">
                  {service.products.map((p) => (
                    <li key={p} className="brand-card px-3 py-2">
                      {p}
                    </li>
                  ))}
                </ul>
                {service.warranty ? (
                  <div className="mt-6 border-l-2 border-[#F5A623] py-2 pl-5">
                    <p className="brand-kicker-gold mb-1">Garantía</p>
                    <p className="text-sm leading-relaxed text-[#5C6578]">
                      {service.warranty}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        {relatedCases.length > 0 ? (
          <section
            aria-labelledby="casos-titulo"
            className="border-t border-[#D6E8FF] bg-white"
          >
            <div className="brand-wrap brand-section">
              <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
                <div>
                  <p className="brand-kicker-blue">Casos relacionados</p>
                  <h2
                    id="casos-titulo"
                    className="mt-3 font-display text-3xl font-semibold tracking-tight"
                  >
                    Proyectos donde aplicamos este servicio
                  </h2>
                </div>
                <a
                  href="/casos"
                  className="inline-flex items-center text-sm font-semibold text-[#1A2E8A] hover:text-[#F5A623]"
                >
                  Ver todos los casos →
                </a>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {relatedCases.slice(0, 6).map((c) => (
                  <CaseCard key={c.slug} caseItem={c} />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <LeadCtaBand
          variant="dark"
          title={`¿Tu estructura necesita ${service.shortName.toLowerCase()}?`}
        />
      </main>
      <SiteFooter />
    </>
  );
}
