import type { Metadata } from "next";
import { TrustBar } from "@/components/site/trust-bar";
import { SiteFooter } from "@/components/site/footer";
import { LeadForm } from "@/components/site/lead-form";
import { CaseCard } from "@/components/site/case-card";
import { WhatsAppGlyph } from "@/components/site/whatsapp-float";
import { getFeaturedCases } from "@/lib/data/cases";
import {
  HOME_SERVICE_CARDS,
  HOME_SERVICES_FOOTNOTE,
  HOME_SERVICES_SUBTITLE,
  HOME_SERVICES_TITLE,
  SERVICE_CTA,
} from "@/lib/data/service-pages";
import { CANONICAL_ORIGIN, INSPECTION_SLA, SITE_EMAIL } from "@/lib/site";

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "50765508320";
const email = process.env.NEXT_PUBLIC_EMAIL ?? "mark@selladodeconcreto.com";
const siteUrl = CANONICAL_ORIGIN;

export const metadata: Metadata = {
  alternates: { canonical: `${CANONICAL_ORIGIN}/` },
  openGraph: { url: CANONICAL_ORIGIN },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: "SEDECO",
  legalName: "SEDECO, S.A.",
  url: siteUrl,
  email: SITE_EMAIL,
  telephone: "+507 6550-8320",
  foundingDate: "2020",
  founder: [
    { "@type": "Person", name: "Mark Harrick", jobTitle: "Gerente Comercial" },
    { "@type": "Person", name: "Roni Litmanovich", jobTitle: "Gerente Operativo" },
  ],
  description:
    "Aplicadores autorizados de Ghostshield® en Panamá. Impermeabilización permanente de concreto con nanotecnología y garantía por escrito según sistema y alcance.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Edificio RBS, Planta Baja, Oficina 103A, Paitilla",
    addressLocality: "Ciudad de Panamá",
    addressCountry: "PA",
  },
  areaServed: [
    { "@type": "City", name: "Ciudad de Panamá" },
    { "@type": "City", name: "Colón" },
  ],
  sameAs: ["https://instagram.com/sedecopanama"],
};

export default function HomePage() {
  const featuredCases = getFeaturedCases(3);
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <section className="container pt-24 md:pt-32 pb-20 md:pb-24">
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-accent-600 mb-6">
            Aplicadores autorizados de Ghostshield® en Panamá
          </p>
          <h1 className="font-display text-4xl sm:text-display-md md:text-display-xl text-navy-900 max-w-4xl">
            Sellado de concreto permanente.
          </h1>
          <p className="mt-6 max-w-prose text-lg text-ink-500 leading-relaxed">
            En SEDECO damos resultados concretos en todo lo que hacemos.
            Impermeabilización con nanotecnología molecular y garantía por
            escrito según sistema y alcance, diseñada para el clima costero y
            húmedo de Panamá.
          </p>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-ink-400">
            +100,000 m²
            <span className="mx-2 text-ink-200">·</span>
            +50 proyectos
            <span className="mx-2 text-ink-200">·</span>
            desde 2020
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#contacto"
              className="inline-flex items-center rounded-md bg-accent-500 px-6 py-3 text-white font-medium hover:bg-accent-600 transition-colors"
            >
              {SERVICE_CTA}
            </a>
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-ink-900 bg-white px-6 py-3 text-ink-900 font-medium transition-colors hover:bg-ink-900 hover:text-white"
            >
              <WhatsAppGlyph className="text-[#25D366]" />
              WhatsApp
            </a>
          </div>
        </section>

        <TrustBar />

        <section
          id="servicios"
          aria-labelledby="servicios-titulo"
          className="border-t border-ink-100 bg-white"
        >
          <div className="container py-20 md:py-24">
            <h2
              id="servicios-titulo"
              className="font-display text-3xl md:text-display-md text-navy-900 max-w-4xl"
            >
              {HOME_SERVICES_TITLE}
            </h2>
            <p className="mt-4 max-w-3xl text-ink-500 leading-relaxed">
              {HOME_SERVICES_SUBTITLE}
            </p>
            <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {HOME_SERVICE_CARDS.map((card) => (
                <li key={card.href}>
                  <a
                    href={card.href}
                    className="flex h-full flex-col rounded-lg border border-ink-200 bg-ink-50 p-6 transition-colors hover:border-accent-500"
                  >
                    <h3 className="font-display text-xl text-navy-900">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-500">
                      {card.line}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm leading-relaxed text-ink-500">
              {HOME_SERVICES_FOOTNOTE}
            </p>
          </div>
        </section>

        <section className="container py-20 md:py-24 border-t border-ink-100">
          <h2 className="font-display text-3xl md:text-display-md text-navy-900 mb-3">
            Por qué SEDECO
          </h2>
          <p className="text-ink-500 max-w-prose mb-12">
            Único aplicador y distribuidor autorizado de Ghostshield® en Panamá,
            respaldado por KreteTek Industries (New Hampshire, EE. UU.).
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            <article className="rounded-lg border border-ink-200 bg-white p-6">
              <h3 className="font-display text-xl mb-2">
                Garantía por escrito según sistema y alcance
              </h3>
              <p className="text-ink-500 text-sm leading-relaxed">
                Ghostshield se vuelve parte permanente de la estructura. La
                protección no se desgasta porque no es un recubrimiento — es
                químicamente parte del concreto.
              </p>
            </article>
            <article className="rounded-lg border border-ink-200 bg-white p-6">
              <h3 className="font-display text-xl mb-2">
                Nanotecnología molecular
              </h3>
              <p className="text-ink-500 text-sm leading-relaxed">
                Partículas activas de 0.3 a 1.5 nanómetros — 100 veces más
                pequeñas que químicos tradicionales — penetran hasta 2 cm en el
                concreto.
              </p>
            </article>
            <article className="rounded-lg border border-ink-200 bg-white p-6">
              <h3 className="font-display text-xl mb-2">
                Ideal para Panamá
              </h3>
              <p className="text-ink-500 text-sm leading-relaxed">
                La mejor defensa en ambientes cercanos al mar o con alto
                porcentaje de humedad. El concreto tratado resiste agua, sal,
                aceite de motor y agentes dañinos para las estructuras.
              </p>
            </article>
          </div>
        </section>

        <section
          aria-labelledby="casos-destacados-titulo"
          className="border-t border-ink-100 bg-ink-50"
        >
          <div className="container py-20 md:py-24">
            <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
              <div>
                <h2
                  id="casos-destacados-titulo"
                  className="font-display text-3xl md:text-display-md text-navy-900 mb-3"
                >
                  Casos destacados
                </h2>
                <p className="text-ink-500 max-w-prose">
                  Proyectos respaldados por cartas firmadas de los clientes.
                  Estos son tres de los hitos más visibles del portafolio.
                </p>
              </div>
              <a
                href="/casos"
                className="inline-flex items-center text-sm font-medium text-accent-600 hover:text-accent-700 transition-colors"
              >
                Ver todos los casos →
              </a>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredCases.map((c) => (
                <CaseCard key={c.slug} caseItem={c} />
              ))}
            </div>
          </div>
        </section>

        <section
          id="contacto"
          aria-labelledby="contacto-titulo"
          className="border-t border-ink-100 bg-white"
        >
          <div className="container grid gap-12 py-20 md:py-24 md:grid-cols-[5fr_7fr]">
            <div>
              <h2
                id="contacto-titulo"
                className="font-display text-3xl md:text-display-md text-navy-900"
              >
                Solicitar inspección
              </h2>
              <p className="mt-4 text-ink-500 leading-relaxed">
                Cuéntenos qué está pasando con su estructura. {INSPECTION_SLA}
              </p>
              <div className="mt-8 space-y-4 border-t border-ink-100 pt-6">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-ink-400">
                  Atención directa
                </p>
                <p className="text-sm text-ink-600">
                  WhatsApp ·{" "}
                  <a
                    href={`https://wa.me/${whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-900 hover:text-accent-600"
                  >
                    +507 6550-8320
                  </a>
                </p>
                <p className="text-sm text-ink-600">
                  Email ·{" "}
                  <a
                    href={`mailto:${email}`}
                    className="text-ink-900 hover:text-accent-600"
                  >
                    {email}
                  </a>
                </p>
              </div>
            </div>
            <div>
              <LeadForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
