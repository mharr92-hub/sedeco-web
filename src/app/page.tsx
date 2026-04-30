import type { Metadata } from "next";
import { TrustBar } from "@/components/site/trust-bar";
import { SiteFooter } from "@/components/site/footer";
import { LeadForm } from "@/components/site/lead-form";
import { CaseCard } from "@/components/site/case-card";
import { getFeaturedCases } from "@/lib/data/cases";

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "50765508320";
const email = process.env.NEXT_PUBLIC_EMAIL ?? "mark@selladodeconcreto.com";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sedeco.lat";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: "SEDECO",
  legalName: "SEDECO, S.A.",
  url: siteUrl,
  email: "mark@selladodeconcreto.com",
  telephone: "+507 6550-8320",
  foundingDate: "2020",
  founder: [
    { "@type": "Person", name: "Mark Harrick", jobTitle: "Gerente Comercial" },
    { "@type": "Person", name: "Roni Litmanovich", jobTitle: "Gerente Operativo" },
  ],
  description:
    "Aplicadores autorizados de Ghostshield® en Panamá. Impermeabilización permanente de concreto con nanotecnología y garantía de hasta 100 años.",
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
        <section className="container py-20 md:py-32">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-600 mb-5">
            Aplicadores autorizados de Ghostshield® en Panamá
          </p>
          <h1 className="font-display text-display-md md:text-display-xl text-navy-900 max-w-4xl">
            Sellado de concreto permanente.
          </h1>
          <p className="mt-6 max-w-prose text-lg text-ink-500 leading-relaxed">
            En SEDECO damos resultados concretos en todo lo que hacemos.
            Impermeabilización con nanotecnología molecular y garantía de hasta
            100 años, diseñada para el clima costero y húmedo de Panamá.
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
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-5 w-5 text-[#25D366]"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
              </svg>
              WhatsApp
            </a>
          </div>
        </section>

        <TrustBar />

        <section className="container py-20 border-t border-ink-100">
          <h2 className="font-display text-3xl md:text-display-md text-navy-900 mb-3">
            Por qué SEDECO
          </h2>
          <p className="text-ink-500 max-w-prose mb-12">
            Único aplicador y distribuidor autorizado de Ghostshield® en Panamá,
            respaldado por KreteTek Industries (New Hampshire, EE. UU.).
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            <article className="rounded-lg border border-ink-100 bg-white p-6 shadow-card">
              <h3 className="font-display text-xl mb-2">
                Garantía de 100 años
              </h3>
              <p className="text-ink-500 text-sm leading-relaxed">
                Ghostshield se vuelve parte permanente de la estructura. La
                protección no se desgasta porque no es un recubrimiento — es
                químicamente parte del concreto.
              </p>
            </article>
            <article className="rounded-lg border border-ink-100 bg-white p-6 shadow-card">
              <h3 className="font-display text-xl mb-2">
                Nanotecnología molecular
              </h3>
              <p className="text-ink-500 text-sm leading-relaxed">
                Partículas activas de 0.3 a 1.5 nanómetros — 100 veces más
                pequeñas que químicos tradicionales — penetran hasta 2 cm en el
                concreto.
              </p>
            </article>
            <article className="rounded-lg border border-ink-100 bg-white p-6 shadow-card">
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
          <div className="container py-20">
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
          <div className="container grid gap-12 py-20 md:grid-cols-[5fr_7fr]">
            <div>
              <h2
                id="contacto-titulo"
                className="font-display text-3xl md:text-display-md text-navy-900"
              >
                Solicitar un diagnóstico
              </h2>
              <p className="mt-4 text-ink-500 leading-relaxed">
                Cuéntanos qué está pasando con tu estructura y Mark Harrick te
                responde dentro del próximo día hábil.
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
