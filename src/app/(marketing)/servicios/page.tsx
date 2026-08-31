import type { Metadata } from "next";
import { SiteFooter } from "@/components/site/footer";
import { LeadCtaBand } from "@/components/site/lead-cta-band";
import {
  HOME_SERVICE_CARDS,
  HOME_SERVICES_FOOTNOTE,
  HOME_SERVICES_SUBTITLE,
  HOME_SERVICES_TITLE,
  SERVICE_NAV,
} from "@/lib/data/service-pages";
import { CANONICAL_ORIGIN, INSPECTION_SLA } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Servicios · SEDECO Panamá" },
  description: HOME_SERVICES_SUBTITLE,
  alternates: { canonical: `${CANONICAL_ORIGIN}/servicios` },
};

export default function ServiciosPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Servicios SEDECO Panamá",
    itemListElement: SERVICE_NAV.map((s, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Service",
        name: s.label,
        url: `${CANONICAL_ORIGIN}${s.href}`,
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
        <section className="container py-20 md:py-24">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-600 mb-5">
            Servicios SEDECO
          </p>
          <h1 className="font-display text-4xl sm:text-display-md md:text-display-lg text-navy-900 max-w-4xl">
            {HOME_SERVICES_TITLE}
          </h1>
          <p className="mt-6 max-w-prose text-lg text-ink-500 leading-relaxed">
            {HOME_SERVICES_SUBTITLE}
          </p>
        </section>

        <section
          aria-label="Mapa de servicios"
          className="border-t border-ink-100 bg-ink-50"
        >
          <div className="container py-20 md:py-24">
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {HOME_SERVICE_CARDS.map((card) => (
                <li key={card.href}>
                  <a
                    href={card.href}
                    className="flex h-full flex-col rounded-lg border border-ink-200 bg-white p-6 transition-colors hover:border-accent-500"
                  >
                    <h2 className="font-display text-xl text-navy-900">
                      {card.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-ink-500">
                      {card.line}
                    </p>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/pintura-edificios-panama"
                  className="flex h-full flex-col rounded-lg border border-ink-200 bg-white p-6 transition-colors hover:border-accent-500"
                >
                  <h2 className="font-display text-xl text-navy-900">
                    Pintura de edificios
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-500">
                    Pintura de fachadas en altura, con la fachada reparada
                    primero.
                  </p>
                </a>
              </li>
            </ul>
            <p className="mt-8 text-sm leading-relaxed text-ink-500">
              {HOME_SERVICES_FOOTNOTE}
            </p>
          </div>
        </section>

        <LeadCtaBand
          title="¿No está seguro qué servicio necesita?"
          subtitle={`Cuéntenos qué está pasando. ${INSPECTION_SLA}`}
          href="/#contacto"
        />
      </main>
      <SiteFooter />
    </>
  );
}
