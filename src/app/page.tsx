import type { Metadata } from "next";
import { TrustBar } from "@/components/site/trust-bar";
import { SiteFooter } from "@/components/site/footer";

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
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md bg-accent-500 px-6 py-3 text-white font-medium shadow-card hover:bg-accent-600 transition-colors"
            >
              Solicitar diagnóstico por WhatsApp
            </a>
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center rounded-md border border-ink-200 bg-white px-6 py-3 text-ink-900 font-medium hover:border-ink-300 hover:bg-white transition-colors"
            >
              Escribir a Mark Harrick
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
      </main>
      <SiteFooter />
    </>
  );
}
