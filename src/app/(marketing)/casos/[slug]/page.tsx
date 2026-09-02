import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadCtaBand } from "@/components/site/lead-cta-band";
import { SiteFooter } from "@/components/site/footer";
import { getAllCases, getCaseBySlug } from "@/lib/data/cases";
import { getServiceBySlug } from "@/lib/data/services";
import { CANONICAL_ORIGIN } from "@/lib/site";

const siteUrl = CANONICAL_ORIGIN;
const numberFormatter = new Intl.NumberFormat("es-PA");

type CasoParams = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): CasoParams[] {
  return getAllCases().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<CasoParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseBySlug(slug);
  if (!c) return {};
  const description =
    c.scope ?? `Proyecto SEDECO en Panamá: ${c.name}.`;
  return {
    title: c.name,
    description,
    alternates: { canonical: `/casos/${c.slug}` },
    ...(c.image
      ? {
          openGraph: {
            images: [
              {
                url: c.image.src,
                width: c.image.width,
                height: c.image.height,
                alt: c.image.alt,
              },
            ],
          },
        }
      : {}),
  };
}

export default async function CasoDetailPage({
  params,
}: {
  params: Promise<CasoParams>;
}) {
  const { slug } = await params;
  const c = getCaseBySlug(slug);
  if (!c) notFound();

  const relatedServices = c.services
    .map((s) => getServiceBySlug(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "Project",
    name: c.name,
    description: c.scope ?? c.workType,
    url: `${siteUrl}/casos/${c.slug}`,
    ...(c.location ? { location: { "@type": "Place", name: c.location } } : {}),
    ...(c.image ? { image: `${siteUrl}${c.image.src}` } : {}),
    provider: {
      "@type": "Organization",
      name: "SEDECO",
      url: siteUrl,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Casos",
        item: `${siteUrl}/casos`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: c.name,
        item: `${siteUrl}/casos/${c.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="bg-white text-[#1A2E8A]">
        <nav aria-label="Migas de pan" className="border-b border-[#D6E8FF]">
          <div className="brand-wrap py-4 text-sm text-[#5C6578]">
            <Link
              href="/casos"
              className="transition-colors hover:text-[#F5A623]"
            >
              Casos
            </Link>
            <span aria-hidden="true" className="mx-2 text-[#5C6578]/50">
              /
            </span>
            <span className="text-[#1A2E8A]">{c.name}</span>
          </div>
        </nav>

        <section className="brand-wrap brand-section">
          {c.image ? (
            <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden border border-[#F5A623] bg-[#EEF1FB]">
              <Image
                src={c.image.src}
                alt={c.image.alt}
                fill
                priority
                sizes="(min-width: 1152px) 1152px, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}
          <p className="brand-kicker-gold">{c.workType}</p>
          <h1 className="mt-3 max-w-4xl font-display text-3xl font-semibold tracking-tight md:text-5xl">
            {c.name}
          </h1>
          {c.location ? (
            <p className="mt-3 text-base text-[#5C6578]">{c.location}</p>
          ) : null}

          {c.squareMeters || c.scope ? (
            <div className="mt-10 grid gap-10 border-t border-[#D6E8FF] pt-10 md:grid-cols-[5fr_7fr]">
              {c.squareMeters ? (
                <div>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5C6578]">
                    Superficie tratada
                  </p>
                  <div className="font-display text-4xl font-semibold text-[#1A2E8A] md:text-6xl">
                    {numberFormatter.format(c.squareMeters)} m²
                  </div>
                  {c.squareMetersDetail ? (
                    <p className="mt-2 text-sm text-[#5C6578]">
                      {c.squareMetersDetail}
                    </p>
                  ) : null}
                </div>
              ) : (
                <div />
              )}
              {c.scope ? (
                <div>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5C6578]">
                    Alcance
                  </p>
                  <p className="leading-relaxed text-[#5C6578]">{c.scope}</p>
                </div>
              ) : null}
            </div>
          ) : null}
        </section>

        {c.problem ? (
          <section className="border-t border-[#D6E8FF] bg-white">
            <div className="brand-wrap brand-section grid gap-10 md:grid-cols-[5fr_7fr]">
              <div>
                <p className="brand-kicker-blue">Problema</p>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
                  Qué resolvimos
                </h2>
              </div>
              <p className="text-base leading-relaxed text-[#5C6578]">
                {c.problem}
              </p>
            </div>
          </section>
        ) : null}

        {c.result ? (
          <section className="border-t border-[#D6E8FF] bg-white">
            <div className="brand-wrap brand-section grid gap-10 md:grid-cols-[5fr_7fr]">
              <div>
                <p className="brand-kicker-blue">Resultado</p>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
                  Lo que entregamos
                </h2>
              </div>
              <p className="text-base leading-relaxed text-[#5C6578]">
                {c.result}
              </p>
            </div>
          </section>
        ) : null}

        {c.signedBy ? (
          <section className="border-t border-[#D6E8FF] bg-white">
            <div className="brand-wrap brand-section">
              <article className="brand-card p-6 md:p-8">
                <p className="brand-kicker-gold">Carta de respaldo firmada</p>
                <p className="mt-3 font-display text-2xl font-semibold md:text-3xl">
                  {c.signedBy.name}
                </p>
                <p className="mt-1 text-[#5C6578]">{c.signedBy.role}</p>
              </article>
            </div>
          </section>
        ) : null}

        {relatedServices.length > 0 ? (
          <section className="border-t border-[#D6E8FF] bg-white">
            <div className="brand-wrap brand-section">
              <p className="brand-kicker-blue">Servicios aplicados</p>
              <h2 className="mt-3 mb-10 font-display text-3xl font-semibold tracking-tight">
                Lo que hicimos en este proyecto
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {relatedServices.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/servicios/${s.slug}`}
                    className="brand-card group p-5"
                  >
                    <p className="font-display text-lg font-semibold text-[#1A2E8A] group-hover:text-[#F5A623]">
                      {s.shortName}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[#5C6578]">
                      {s.tagline}
                    </p>
                    <span className="mt-3 inline-flex text-sm font-semibold text-[#1A2E8A] group-hover:text-[#F5A623]">
                      Ver servicio →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <LeadCtaBand
          variant="dark"
          title={`¿Tu edificio se parece a ${c.name}?`}
        />
      </main>
      <SiteFooter />
    </>
  );
}
