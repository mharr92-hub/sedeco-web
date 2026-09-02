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
        <section className="bg-white text-[#1A2E8A]">
          <div className="brand-wrap brand-section">
            <p className="brand-kicker-blue">Servicios</p>
            <h1 className="mt-3 max-w-4xl font-display text-3xl font-semibold tracking-tight md:text-5xl">
              {HOME_SERVICES_TITLE}
            </h1>
            <p className="mt-5 max-w-prose text-base leading-relaxed text-[#5C6578]">
              {HOME_SERVICES_SUBTITLE}
            </p>
          </div>
        </section>

        <section aria-label="Mapa de servicios" className="bg-white">
          <div className="brand-wrap pb-16 md:pb-20">
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {HOME_SERVICE_CARDS.map((card) => (
                <li key={card.href}>
                  <a href={card.href} className="brand-card flex h-full flex-col p-6">
                    <h2 className="font-display text-xl font-semibold text-[#1A2E8A]">
                      {card.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-[#5C6578]">
                      {card.line}
                    </p>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/pintura-edificios-panama"
                  className="brand-card flex h-full flex-col p-6"
                >
                  <h2 className="font-display text-xl font-semibold text-[#1A2E8A]">
                    Pintura de edificios
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#5C6578]">
                    Pintura de fachadas en altura, con la fachada reparada
                    primero.
                  </p>
                </a>
              </li>
            </ul>
            <p className="mt-8 text-sm leading-relaxed text-[#5C6578]">
              {HOME_SERVICES_FOOTNOTE}
            </p>
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
