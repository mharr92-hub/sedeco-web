import type { Metadata } from "next";
import { CaseCard } from "@/components/site/case-card";
import { SiteFooter } from "@/components/site/footer";
import { LeadCtaBand } from "@/components/site/lead-cta-band";
import { getAllCases } from "@/lib/data/cases";
import { CANONICAL_ORIGIN } from "@/lib/site";

const siteUrl = CANONICAL_ORIGIN;

export const metadata: Metadata = {
  title: "Casos · Proyectos entregados",
  description:
    "Proyectos de impermeabilización y sellado de concreto entregados por SEDECO en Panamá: Hospital Manuel Amador Guerrero, PH Joy Tower, Shevet Ahim, Fundación Deveaux y más.",
  alternates: { canonical: `${CANONICAL_ORIGIN}/casos` },
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
        ...(c.image ? { image: `${siteUrl}${c.image.src}` } : {}),
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
            <p className="brand-kicker-blue">Casos</p>
            <h1 className="mt-3 max-w-4xl font-display text-3xl font-semibold tracking-tight md:text-5xl">
              Proyectos entregados.
            </h1>
            <p className="mt-5 max-w-prose text-base leading-relaxed text-[#5C6578]">
              Más de 100,000 m² de concreto impermeabilizados en Panamá. Estos son
              los proyectos hito en residencial, comunitario y fundaciones,
              respaldados por cartas firmadas de los clientes.
            </p>
          </div>
        </section>

        <section aria-label="Lista de proyectos" className="bg-white">
          <div className="brand-wrap pb-16 md:pb-20">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {cases.map((c, index) => (
                <div key={c.slug} id={c.slug}>
                  <CaseCard caseItem={c} priority={index < 3} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <LeadCtaBand
          variant="dark"
          title="¿Tu edificio necesita una inspección como estas?"
        />
      </main>
      <SiteFooter />
    </>
  );
}
