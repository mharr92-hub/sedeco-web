import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseCard } from "@/components/site/case-card";
import { SiteFooter } from "@/components/site/footer";
import { LeadCtaBand } from "@/components/site/lead-cta-band";
import { WhatsAppGlyph } from "@/components/site/whatsapp-float";
import { getCasesByService } from "@/lib/data/cases";
import { getAllServices, getServiceBySlug } from "@/lib/data/services";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sedeco.lat";
const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "50765508320";

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
      <main>
        <section className="container py-20 md:py-28">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-600 mb-5">
            Servicios SEDECO · {service.shortName}
          </p>
          <h1 className="font-display text-display-md md:text-display-lg text-navy-900 max-w-4xl">
            {service.name}
          </h1>
          <p className="mt-4 max-w-prose text-lg text-accent-600 font-medium">
            {service.tagline}
          </p>
          <p className="mt-6 max-w-prose text-ink-600 leading-relaxed">
            {service.description}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/#contacto"
              className="inline-flex items-center rounded-md bg-accent-500 px-6 py-3 text-white font-medium shadow-card hover:bg-accent-600 transition-colors"
            >
              Solicitar diagnóstico
            </a>
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-ink-200 bg-white px-6 py-3 text-ink-900 font-medium hover:border-ink-300 transition-colors"
            >
              <WhatsAppGlyph className="h-5 w-5 text-[#25D366]" />
              WhatsApp directo
            </a>
          </div>
        </section>

        <section
          aria-labelledby="senales-titulo"
          className="border-t border-ink-100 bg-white"
        >
          <div className="container py-16 md:py-20 grid gap-12 md:grid-cols-[5fr_7fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-400 mb-3">
                Estás aquí porque
              </p>
              <h2
                id="senales-titulo"
                className="font-display text-3xl text-navy-900"
              >
                Señales de que necesitas este servicio
              </h2>
            </div>
            <ul className="space-y-4">
              {service.problemSignals.map((signal) => (
                <li
                  key={signal}
                  className="flex gap-3 text-ink-700 leading-relaxed"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent-500"
                  />
                  <span>{signal}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          aria-labelledby="metodo-titulo"
          className="border-t border-ink-100 bg-ink-50"
        >
          <div className="container py-16 md:py-20">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-400 mb-3">
              Cómo lo hacemos
            </p>
            <h2
              id="metodo-titulo"
              className="font-display text-3xl text-navy-900 mb-12"
            >
              Método SEDECO
            </h2>
            <div className="grid gap-12 md:grid-cols-[7fr_5fr]">
              <ol className="space-y-6">
                {service.approach.map((step, idx) => (
                  <li
                    key={step}
                    className="flex gap-4 rounded-lg border border-ink-100 bg-white p-5 shadow-card"
                  >
                    <span className="font-display text-2xl text-accent-500 leading-none">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-ink-700 leading-relaxed pt-1">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-400 mb-3">
                  Productos aplicados
                </p>
                <ul className="space-y-2 text-sm text-ink-600">
                  {service.products.map((p) => (
                    <li
                      key={p}
                      className="rounded border border-ink-100 bg-white px-3 py-2"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
                {service.warranty ? (
                  <div className="mt-6 rounded-lg border border-accent-200 bg-accent-50 p-4">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-700 mb-1">
                      Garantía
                    </p>
                    <p className="text-sm text-accent-900 leading-relaxed">
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
            className="border-t border-ink-100 bg-white"
          >
            <div className="container py-16 md:py-20">
              <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-400 mb-3">
                    Casos relacionados
                  </p>
                  <h2
                    id="casos-titulo"
                    className="font-display text-3xl text-navy-900"
                  >
                    Proyectos donde aplicamos este servicio
                  </h2>
                </div>
                <a
                  href="/casos"
                  className="inline-flex items-center text-sm font-medium text-accent-600 hover:text-accent-700 transition-colors"
                >
                  Ver todos los casos →
                </a>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
