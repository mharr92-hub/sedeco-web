import type { Metadata } from "next";
import { CaseCard } from "@/components/site/case-card";
import { SiteFooter } from "@/components/site/footer";
import { LeadCtaBand } from "@/components/site/lead-cta-band";
import { getAllCases } from "@/lib/data/cases";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sedeco.lat";

export const metadata: Metadata = {
  title: "Casos · Proyectos entregados",
  description:
    "Proyectos de impermeabilización y sellado de concreto entregados por SEDECO en Panamá: PH Torres Ebelle, Shevet Ahim, Millenium Park, Mónaco, Deveaux y más.",
  alternates: { canonical: "/casos" },
};

export default function CasosPage() {
  const cases = getAllCases();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Casos SEDECO Panamá",
    itemListElement: cases.map((c, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Project",
        name: c.name,
        ...(c.location ? { location: c.location } : {}),
        description: c.scope ?? c.workType,
        url: `${siteUrl}/casos#${c.slug}`,
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
            Portafolio SEDECO
          </p>
          <h1 className="font-display text-4xl sm:text-display-md md:text-display-lg text-navy-900 max-w-4xl">
            Proyectos entregados.
          </h1>
          <p className="mt-6 max-w-prose text-lg text-ink-500 leading-relaxed">
            Más de 100,000 m² de concreto impermeabilizados en Panamá. Estos son
            los proyectos hito en residencial, comunitario y fundaciones,
            respaldados por cartas firmadas de los clientes.
          </p>
        </section>

        <section
          aria-label="Lista de proyectos"
          className="border-t border-ink-100 bg-white"
        >
          <div className="container py-20 md:py-24">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {cases.map((c) => (
                <div key={c.slug} id={c.slug}>
                  <CaseCard caseItem={c} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <LeadCtaBand title="¿Tu edificio necesita una inspección como estas?" />
      </main>
      <SiteFooter />
    </>
  );
}
