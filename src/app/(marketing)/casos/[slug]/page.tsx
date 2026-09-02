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
      <main>
        <nav
          aria-label="Migas de pan"
          className="border-b border-ink-100 bg-ink-50"
        >
          <div className="container py-4 text-sm text-ink-500">
            <Link
              href="/casos"
              className="transition-colors hover:text-accent-600"
            >
              Casos
            </Link>
            <span aria-hidden="true" className="mx-2 text-ink-300">
              /
            </span>
            <span className="text-ink-900">{c.name}</span>
          </div>
        </nav>

        <section className="container py-20 md:py-24">
          {c.image ? (
            <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-md border border-accent-400 bg-navy-50">
              <Image
                src={c.image.src}
                alt={c.image.alt}
                fill
                priority
                sizes="(min-width: 1280px) 1280px, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}
          <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.22em] text-accent-600">
            {c.workType}
          </p>
          <h1 className="font-display text-4xl sm:text-display-md md:text-display-lg text-navy-900">
            {c.name}
          </h1>
          {c.location ? (
            <p className="mt-3 text-lg text-ink-500">{c.location}</p>
          ) : null}

          {c.squareMeters || c.scope ? (
            <div className="mt-12 grid gap-10 border-t border-ink-100 pt-10 md:grid-cols-[5fr_7fr]">
              {c.squareMeters ? (
                <div>
                  <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-ink-400">
                    Superficie tratada
                  </p>
                  <div className="font-display text-display-md text-navy-900 md:text-display-lg">
                    {numberFormatter.format(c.squareMeters)} m²
                  </div>
                  {c.squareMetersDetail ? (
                    <p className="mt-2 text-sm text-ink-500">
                      {c.squareMetersDetail}
                    </p>
                  ) : null}
                </div>
              ) : (
                <div />
              )}
              {c.scope ? (
                <div>
                  <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-ink-400">
                    Alcance
                  </p>
                  <p className="text-ink-700 leading-relaxed">{c.scope}</p>
                </div>
              ) : null}
            </div>
          ) : null}
        </section>

        {c.problem ? (
          <section className="border-t border-ink-100 bg-white">
            <div className="container py-20 md:py-24 grid gap-10 md:grid-cols-[5fr_7fr]">
              <div>
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-ink-400">
                  Problema
                </p>
                <h2 className="font-display text-3xl text-navy-900">
                  Qué resolvimos
                </h2>
              </div>
              <p className="text-ink-700 leading-relaxed text-lg">
                {c.problem}
              </p>
            </div>
          </section>
        ) : null}

        {c.result ? (
          <section className="border-t border-ink-100 bg-ink-50">
            <div className="container py-20 md:py-24 grid gap-10 md:grid-cols-[5fr_7fr]">
              <div>
                <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-ink-400">
                  Resultado
                </p>
                <h2 className="font-display text-3xl text-navy-900">
                  Lo que entregamos
                </h2>
              </div>
              <p className="text-ink-700 leading-relaxed text-lg">
                {c.result}
              </p>
            </div>
          </section>
        ) : null}

        {c.signedBy ? (
          <section className="border-t border-ink-100 bg-white">
            <div className="container py-20 md:py-24">
              <div className="rounded-lg border border-ink-100 p-6 md:p-8">
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-ink-400">
                  Carta de respaldo firmada
                </p>
                <p className="font-display text-2xl text-navy-900 md:text-3xl">
                  {c.signedBy.name}
                </p>
                <p className="mt-1 text-ink-500">{c.signedBy.role}</p>
              </div>
            </div>
          </section>
        ) : null}

        {relatedServices.length > 0 ? (
          <section className="border-t border-ink-100 bg-ink-50">
            <div className="container py-20 md:py-24">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-ink-400">
                Servicios aplicados
              </p>
              <h2 className="font-display text-3xl text-navy-900 mb-10">
                Lo que hicimos en este proyecto
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {relatedServices.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/servicios/${s.slug}`}
                    className="group flex items-start gap-3 rounded-lg border border-ink-100 bg-white p-5 transition-colors hover:border-accent-200"
                  >
                    <div>
                      <p className="font-display text-lg text-navy-900 group-hover:text-accent-700">
                        {s.shortName}
                      </p>
                      <p className="mt-1 text-sm text-ink-500 leading-relaxed">
                        {s.tagline}
                      </p>
                      <span className="mt-3 inline-flex text-sm font-medium text-accent-600 group-hover:text-accent-700">
                        Ver servicio →
                      </span>
                    </div>
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
