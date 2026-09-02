import type { Metadata } from "next";
import Image from "next/image";
import { TrustBar } from "@/components/site/trust-bar";
import { SiteFooter } from "@/components/site/footer";
import { LeadForm } from "@/components/site/lead-form";
import { CaseCard } from "@/components/site/case-card";
import { SectionHeading } from "@/components/site/section-heading";
import { WhatsAppGlyph } from "@/components/site/whatsapp-float";
import { AdsPhotoFill } from "@/components/ads/ads-photo";
import { ADS_PHOTOS } from "@/lib/data/ads-visuals";
import { getFeaturedCases } from "@/lib/data/cases";
import {
  HOME_SERVICE_CARDS,
  HOME_SERVICES_FOOTNOTE,
  HOME_SERVICES_SUBTITLE,
  HOME_SERVICES_TITLE,
  SERVICE_CTA,
} from "@/lib/data/service-pages";
import {
  CANONICAL_ORIGIN,
  INSPECTION_SLA,
  OG_IMAGE,
  SITE_EMAIL,
  WHATSAPP_DISPLAY,
} from "@/lib/site";

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "50765508320";
const email = process.env.NEXT_PUBLIC_EMAIL ?? "mark@selladodeconcreto.com";
const siteUrl = CANONICAL_ORIGIN;

const SERVICE_PHOTOS = {
  "/impermeabilizacion-panama": ADS_PHOTOS.servicioImpermeabilizacion,
  "/filtraciones": ADS_PHOTOS.aguaConcreto,
  "/impermeabilizacion-fachadas": ADS_PHOTOS.servicioFachadas,
  "/pisos-industriales-panama": ADS_PHOTOS.capacidadHero,
  "/reparacion-estructural-panama": ADS_PHOTOS.obraAltura,
  "/mantenimiento-ph": ADS_PHOTOS.joyTower,
} as const;

export const metadata: Metadata = {
  alternates: { canonical: `${CANONICAL_ORIGIN}/` },
  openGraph: { url: CANONICAL_ORIGIN, images: [OG_IMAGE] },
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
        <section className="brand-hero-cut relative min-h-[85svh] text-white md:min-h-[92svh]">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <AdsPhotoFill
              photo={ADS_PHOTOS.heroTorres}
              priority
              className="md:hidden"
              sizes="100vw"
            />
            <AdsPhotoFill
              photo={ADS_PHOTOS.coverFull}
              priority
              className="hidden md:block"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A2E8A]/92 via-[#1A2E8A]/70 to-[#070F26]/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A2E8A] via-transparent to-[#1A2E8A]/40" />
          </div>

          <div className="relative mx-auto flex min-h-[85svh] max-w-6xl flex-col justify-center px-5 pb-24 pt-10 md:min-h-[92svh] md:px-8 md:pb-28 md:pt-16">
            <p className="font-display text-sm font-bold tracking-[0.28em] text-accent-500">
              SEDECO
            </p>
            <h1 className="mt-5 max-w-xl font-display text-[1.65rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.35rem]">
              Sellado de concreto permanente.
            </h1>
            <p className="mt-5 max-w-3xl font-display text-xl font-bold leading-snug text-white md:text-2xl">
              Aplicadores autorizados de Ghostshield® en Panamá
            </p>
            <p className="mt-6 max-w-prose text-base leading-relaxed text-white/80 md:text-lg">
              En SEDECO damos resultados concretos en todo lo que hacemos.
              Impermeabilización con nanotecnología molecular y garantía por
              escrito según sistema y alcance, diseñada para el clima costero y
              húmedo de Panamá.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contacto" className="btn-gold-lg">
                {SERVICE_CTA}
              </a>
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-md border border-white/25 bg-white/10 px-5 text-sm font-semibold text-white hover:bg-white/15"
              >
                <WhatsAppGlyph className="text-[#25D366]" />
                WhatsApp {WHATSAPP_DISPLAY}
              </a>
            </div>
            <div className="mt-12 max-w-5xl border-t border-white/15 pt-8">
              <TrustBar />
            </div>
          </div>
        </section>

        <section
          id="servicios"
          aria-labelledby="servicios-titulo"
          className="bg-white"
        >
          <div className="container py-16 md:py-20">
            <SectionHeading
              number="01"
              kicker="Servicios"
              title={HOME_SERVICES_TITLE}
              titleId="servicios-titulo"
            >
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-500">
                {HOME_SERVICES_SUBTITLE}
              </p>
            </SectionHeading>
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {HOME_SERVICE_CARDS.map((card) => {
                const photo =
                  SERVICE_PHOTOS[card.href as keyof typeof SERVICE_PHOTOS];
                return (
                  <li key={card.href}>
                    <a
                      href={card.href}
                      className="brand-card flex h-full flex-col overflow-hidden transition-colors hover:border-accent-500"
                    >
                      {photo ? (
                        <div className="relative min-h-[14rem]">
                          <AdsPhotoFill
                            photo={photo}
                            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          />
                        </div>
                      ) : null}
                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="font-display text-xl font-bold text-navy-600">
                          {card.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-ink-500">
                          {card.line}
                        </p>
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
            <p className="mt-8 text-sm leading-relaxed text-ink-500">
              {HOME_SERVICES_FOOTNOTE}
            </p>
          </div>
        </section>

        <section className="bg-navy-50">
          <div className="container py-16 md:py-20">
            <SectionHeading
              number="02"
              kicker="Por qué SEDECO"
              title="Único aplicador y distribuidor autorizado de Ghostshield® en Panamá"
            >
              <p className="mt-4 max-w-prose text-base leading-relaxed text-ink-500">
                Respaldado por KreteTek Industries (New Hampshire, EE. UU.).
                Ghostshield / LITHI TEK 9500 solo sobre concreto o acero
                expuesto — nunca sobre zinc, metal de techo ni membranas.
              </p>
            </SectionHeading>
            <div className="grid gap-4 md:grid-cols-3">
              <article className="brand-card p-6">
                <h3 className="font-display text-xl font-bold text-navy-600">
                  Garantía por escrito según sistema y alcance
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">
                  Ghostshield se vuelve parte permanente de la estructura. La
                  protección no se desgasta porque no es un recubrimiento — es
                  químicamente parte del concreto.
                </p>
              </article>
              <article className="brand-card p-6">
                <h3 className="font-display text-xl font-bold text-navy-600">
                  Nanotecnología molecular
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">
                  Partículas activas de 0.3 a 1.5 nanómetros — 100 veces más
                  pequeñas que químicos tradicionales — penetran hasta 2 cm en el
                  concreto.
                </p>
              </article>
              <article className="brand-card p-6">
                <h3 className="font-display text-xl font-bold text-navy-600">
                  Ideal para Panamá
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">
                  La mejor defensa en ambientes cercanos al mar o con alto
                  porcentaje de humedad. El concreto tratado resiste agua, sal,
                  aceite de motor y agentes dañinos para las estructuras.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="casos-destacados-titulo"
          className="bg-white"
        >
          <div className="container py-16 md:py-20">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                number="03"
                kicker="Casos"
                title="Casos destacados"
                titleId="casos-destacados-titulo"
                className="mb-0"
              >
                <p className="mt-4 max-w-prose text-base leading-relaxed text-ink-500">
                  Proyectos respaldados por cartas firmadas de los clientes.
                  Estos son tres de los hitos más visibles del portafolio.
                </p>
              </SectionHeading>
              <a
                href="/casos"
                className="inline-flex items-center text-sm font-semibold text-navy-600 transition-colors hover:text-accent-600"
              >
                Ver todos los casos →
              </a>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {featuredCases.map((c, index) => (
                <CaseCard key={c.slug} caseItem={c} priority={index === 0} />
              ))}
            </div>
          </div>
        </section>

        <section
          id="contacto"
          aria-labelledby="contacto-titulo"
          className="bg-navy-50"
        >
          <div className="container grid gap-12 py-16 md:grid-cols-[5fr_7fr] md:py-20">
            <div>
              <SectionHeading
                number="04"
                kicker="Contacto"
                title="Solicitar inspección"
                titleId="contacto-titulo"
                className="mb-0"
              />
              <p className="mt-4 text-base leading-relaxed text-ink-500">
                Cuéntenos qué está pasando con su estructura. {INSPECTION_SLA}
              </p>
              <div className="mt-8">
                <Image
                  src="/sedeco-logo.png"
                  alt="SEDECO — Sellado de concreto"
                  width={240}
                  height={88}
                  className="h-auto w-48"
                />
              </div>
              <div className="mt-8 space-y-4 border-t border-accent-400/40 pt-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-navy-600">
                  Atención directa
                </p>
                <p className="text-sm text-ink-600">
                  WhatsApp ·{" "}
                  <a
                    href={`https://wa.me/${whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-navy-600 hover:text-accent-600"
                  >
                    {WHATSAPP_DISPLAY}
                  </a>
                </p>
                <p className="text-sm text-ink-600">
                  Email ·{" "}
                  <a
                    href={`mailto:${email}`}
                    className="font-semibold text-navy-600 hover:text-accent-600"
                  >
                    {email}
                  </a>
                </p>
              </div>
            </div>
            <div className="brand-card bg-white p-6 md:p-8">
              <LeadForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
