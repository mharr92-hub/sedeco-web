import type { Metadata } from "next";
import { ServiceCard } from "@/components/site/service-card";
import { SiteFooter } from "@/components/site/footer";
import { getAllServices } from "@/lib/data/services";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sedeco.lat";

export const metadata: Metadata = {
  title: "Servicios · impermeabilización y sellado de concreto en Panamá",
  description:
    "Servicios de SEDECO en Panamá: impermeabilización integral, fachadas, azoteas, filtraciones, sellado de concreto, tanques, grietas y piscinas. Aplicadores autorizados de Ghostshield.",
  alternates: { canonical: "/servicios" },
};

export default function ServiciosPage() {
  const services = getAllServices();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Servicios SEDECO Panamá",
    itemListElement: services.map((s, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Service",
        name: s.name,
        description: s.tagline,
        url: `${siteUrl}/servicios/${s.slug}`,
        provider: { "@type": "Organization", name: "SEDECO" },
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
        <section className="container py-20 md:py-28">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-600 mb-5">
            Servicios SEDECO
          </p>
          <h1 className="font-display text-display-md md:text-display-lg text-navy-900 max-w-4xl">
            Impermeabilización y sellado de concreto en Panamá.
          </h1>
          <p className="mt-6 max-w-prose text-lg text-ink-500 leading-relaxed">
            Ocho líneas de servicio respaldadas por productos certificados
            (Ghostshield, Sika, Progressive Materials) y por la metodología
            SEDECO: diagnóstico antes que parche.
          </p>
        </section>

        <section
          aria-label="Lista de servicios"
          className="border-t border-ink-100 bg-ink-50"
        >
          <div className="container py-16 md:py-20">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-ink-100 bg-white">
          <div className="container py-20 text-center">
            <h2 className="font-display text-3xl md:text-display-md text-navy-900">
              ¿No estás seguro qué servicio necesitas?
            </h2>
            <p className="mt-4 max-w-prose mx-auto text-ink-500 leading-relaxed">
              Cuéntanos qué está pasando y Mark Harrick te responde dentro del
              próximo día hábil con el diagnóstico correcto.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="/#contacto"
                className="inline-flex items-center rounded-md bg-accent-500 px-6 py-3 text-white font-medium shadow-card hover:bg-accent-600 transition-colors"
              >
                Solicitar diagnóstico
              </a>
              <a
                href="/casos"
                className="inline-flex items-center rounded-md border border-ink-200 bg-white px-6 py-3 text-ink-900 font-medium hover:border-ink-300 transition-colors"
              >
                Ver casos entregados
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
