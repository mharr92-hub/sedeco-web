import type { Metadata } from "next";
import { ServiceCard } from "@/components/site/service-card";
import { SiteFooter } from "@/components/site/footer";
import { LeadCtaBand } from "@/components/site/lead-cta-band";
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
        <section className="container py-20 md:py-24">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-600 mb-5">
            Servicios SEDECO
          </p>
          <h1 className="font-display text-4xl sm:text-display-md md:text-display-lg text-navy-900 max-w-4xl">
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
          <div className="container py-20 md:py-24">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
          </div>
        </section>

        <LeadCtaBand
          title="¿No estás seguro qué servicio necesitas?"
          subtitle="Cuéntanos qué está pasando y Mark Harrick te responde dentro del próximo día hábil con el diagnóstico correcto."
        />
      </main>
      <SiteFooter />
    </>
  );
}
