import type { Metadata } from "next";
import { TrustBar } from "@/components/site/trust-bar";
import { SiteFooter } from "@/components/site/footer";
import { LeadForm } from "@/components/site/lead-form";

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
              className="inline-flex items-center rounded-md border border-ink-200 bg-white px-6 py-3 text-ink-900 font-medium hover:border-ink-300 transition-colors"
            >
              WhatsApp directo
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
            <article className="rounded-lg bg-white p-6 shadow-card">
              <h3 className="font-display text-xl mb-2">
                Garantía de 100 años
              </h3>
              <p className="text-ink-500 text-sm leading-relaxed">
                Ghostshield se vuelve parte permanente de la estructura. La
                protección no se desgasta porque no es un recubrimiento — es
                químicamente parte del concreto.
              </p>
            </article>
            <article className="rounded-lg bg-white p-6 shadow-card">
              <h3 className="font-display text-xl mb-2">
                Nanotecnología molecular
              </h3>
              <p className="text-ink-500 text-sm leading-relaxed">
                Partículas activas de 0.3 a 1.5 nanómetros — 100 veces más
                pequeñas que químicos tradicionales — penetran hasta 2 cm en el
                concreto.
              </p>
            </article>
            <article className="rounded-lg bg-white p-6 shadow-card">
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
