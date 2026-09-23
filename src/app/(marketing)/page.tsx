import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TrustBar } from "@/components/site/trust-bar";
import { SiteFooter } from "@/components/site/footer";
import { AdsLeadDock } from "@/components/ads/ads-lead-form";
import { CaseCard } from "@/components/site/case-card";
import { SectionHeading } from "@/components/site/section-heading";
import { WhatsAppGlyph } from "@/components/site/whatsapp-float";
import { AdsPhotoFill, ResponsiveHeroPhotos } from "@/components/ads/ads-photo";
import { ADS_PHOTOS } from "@/lib/data/ads-visuals";
import { getFeaturedCases } from "@/lib/data/cases";
import {
  HOME_LEAD,
  HOME_SERVICE_CARDS,
  HOME_SERVICES_FOOTNOTE,
  HOME_SERVICES_SUBTITLE,
  HOME_SERVICES_TITLE,
  SERVICE_CTA,
} from "@/lib/data/service-pages";
import {
  CANONICAL_ORIGIN,
  INSPECTION_SLA,
  localBusinessJsonLd,
  OG_IMAGE,
  SITE_EMAIL,
  whatsappHref,
  WHATSAPP_DISPLAY,
} from "@/lib/site";

const waMessage = "Hola, quiero una inspección para un problema de filtración.";
const email = SITE_EMAIL;
const SERVICE_PHOTOS = {
  "/impermeabilizacion-panama": ADS_PHOTOS.servicioImpermeabilizacion,
  "/filtraciones": ADS_PHOTOS.aguaConcreto,
  "/impermeabilizacion-fachadas": ADS_PHOTOS.servicioFachadas,
  "/pisos-industriales-panama": ADS_PHOTOS.capacidadHero,
  "/reparacion-estructural-panama": ADS_PHOTOS.obraAltura,
  "/mantenimiento-ph": ADS_PHOTOS.joyTower,
} as const;

const HOME_TITLE = "SEDECO Panamá | sellado de concreto";
const HOME_DESCRIPTION =
  "Sellado de concreto e impermeabilización en Panamá para edificios, PH y comercios. Diagnóstico técnico en sitio. Solicite su inspección.";

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  alternates: { canonical: `${CANONICAL_ORIGIN}/` },
  openGraph: {
    url: CANONICAL_ORIGIN,
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const jsonLd = {
  ...localBusinessJsonLd(),
  description: HOME_DESCRIPTION,
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
        <section className="relative min-h-[85svh] text-white md:min-h-[92svh]">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <ResponsiveHeroPhotos
              mobile={ADS_PHOTOS.heroTorres}
              desktop={ADS_PHOTOS.coverFull}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070F26]/90 via-[#1A2E8A]/70 to-[#070F26]/35" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070F26] via-transparent to-[#070F26]/40" />
          </div>

          <div className="brand-wrap relative flex min-h-[85svh] flex-col justify-center pb-16 pt-8 md:min-h-[92svh] md:py-20">
            <p className="font-display text-sm font-semibold tracking-[0.28em] text-[#F5A623]">
              SEDECO
            </p>
            <h1 className="mt-5 max-w-xl font-display text-[1.65rem] font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.35rem]">
              Sellado de concreto de larga duración.
            </h1>
            <p className="mt-5 max-w-3xl font-display text-xl font-semibold leading-snug text-white md:text-2xl">
              Aplicadores autorizados de Ghostshield® en Panamá
            </p>
            <p className="mt-4 font-display text-sm uppercase tracking-[0.14em] text-white/80">
              Diagnóstico · Restauración · Impermeabilización · Ciudad de Panamá · 2026
            </p>
            <p className="mt-5 max-w-prose text-sm leading-relaxed text-white/80 md:text-base">
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
                href={whatsappHref(waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa-outline"
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
          className="bg-white text-[#1A2E8A]"
        >
          <div className="brand-wrap brand-section">
            <SectionHeading
              kicker="Servicios"
              title={HOME_SERVICES_TITLE}
              titleId="servicios-titulo"
            >
              <p className="mt-5 max-w-prose text-base leading-relaxed text-[#5C6578]">
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
                      className="brand-card flex h-full flex-col overflow-hidden"
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
                        <h3 className="font-display text-xl font-semibold text-[#1A2E8A]">
                          {card.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-[#5C6578]">
                          {card.line}
                        </p>
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
            <p className="mt-8 text-sm leading-relaxed text-[#5C6578]">
              {HOME_SERVICES_FOOTNOTE}
            </p>
          </div>
        </section>

        <section
          id="inspeccion-boroscopica"
          aria-labelledby="boroscopio-titulo"
          className="border-t border-[#D6E8FF] bg-[#F5F6FA] text-[#1A2E8A]"
        >
          <div className="brand-wrap brand-section">
            <p className="brand-kicker-blue">Desagües</p>
            <h2
              id="boroscopio-titulo"
              className="mt-3 max-w-3xl font-display text-3xl font-semibold tracking-tight md:text-4xl"
            >
              Inspección con cámara boroscópica en desagües
            </h2>
            <p className="mt-5 max-w-prose text-base leading-relaxed text-[#5C6578]">
              Recorremos el desagüe con cámara. El resultado es un diagnóstico
              con informe, para ubicar el origen antes de abrir o reparar.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/inspeccion-boroscopica" className="btn-gold-lg">
                Ver la inspección
              </Link>
              <a
                href={whatsappHref(
                  "Hola, quiero una inspección con cámara boroscópica en un desagüe.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-md border border-[#1A2E8A] px-5 text-sm font-semibold text-[#1A2E8A]"
              >
                <WhatsAppGlyph className="text-[#25D366]" />
                WhatsApp {WHATSAPP_DISPLAY}
              </a>
            </div>
          </div>
        </section>

        <section className="bg-[#070F26] text-white">
          <div className="brand-wrap brand-section">
            <SectionHeading
              kicker="Por qué SEDECO"
              title="Único aplicador y distribuidor autorizado de Ghostshield® en Panamá"
              tone="dark"
            >
              <p className="mt-5 max-w-prose text-base leading-relaxed text-white/75">
                Respaldado por KreteTek Industries (New Hampshire, EE. UU.).
                Ghostshield / LITHI TEK 9500 solo sobre concreto o acero
                expuesto — nunca sobre zinc, metal de techo ni membranas.
              </p>
            </SectionHeading>
            <ul className="grid gap-4 md:grid-cols-3">
              <li className="brand-card bg-white p-6 text-[#1A2E8A]">
                <h3 className="font-display text-xl font-semibold">
                  Garantía por escrito según sistema y alcance
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5C6578]">
                  Ghostshield se vuelve parte de larga duración de la estructura. La
                  protección no se desgasta porque no es un recubrimiento — es
                  químicamente parte del concreto.
                </p>
              </li>
              <li className="brand-card bg-white p-6 text-[#1A2E8A]">
                <h3 className="font-display text-xl font-semibold">
                  Nanotecnología molecular
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5C6578]">
                  Partículas activas de 0.3 a 1.5 nanómetros — 100 veces más
                  pequeñas que químicos tradicionales — penetran hasta 2 cm en el
                  concreto.
                </p>
              </li>
              <li className="brand-card bg-white p-6 text-[#1A2E8A]">
                <h3 className="font-display text-xl font-semibold">
                  Ideal para Panamá
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5C6578]">
                  La mejor defensa en ambientes cercanos al mar o con alto
                  porcentaje de humedad. El concreto tratado resiste agua, sal,
                  aceite de motor y agentes dañinos para las estructuras.
                </p>
              </li>
            </ul>
          </div>
        </section>

        <section
          aria-labelledby="casos-destacados-titulo"
          className="bg-white text-[#1A2E8A]"
        >
          <div className="brand-wrap brand-section">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                kicker="Casos"
                title="Casos destacados"
                titleId="casos-destacados-titulo"
                className="mb-0"
              >
                <p className="mt-5 max-w-prose text-base leading-relaxed text-[#5C6578]">
                  Proyectos con foto de obra verificada. Más casos se publican
                  cuando hay fotografía real del edificio.
                </p>
              </SectionHeading>
              <Link
                href="/casos"
                className="inline-flex min-h-6 items-center text-sm font-semibold text-[#1A2E8A] transition-colors hover:text-[#7A5209]"
              >
                Ver todos los casos →
              </Link>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {featuredCases.map((c) => (
                <CaseCard key={c.slug} caseItem={c} />
              ))}
            </div>
          </div>
        </section>

        <section
          id="contacto"
          aria-labelledby="contacto-titulo"
          className="bg-[#070F26] text-white"
        >
          <div className="brand-wrap brand-section grid gap-12 md:grid-cols-[5fr_7fr]">
            <div>
              <SectionHeading
                kicker="Contacto"
                title="Solicitar inspección"
                titleId="contacto-titulo"
                className="mb-0"
                tone="dark"
              />
              <p className="mt-5 text-base leading-relaxed text-white/80">
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
              <div className="mt-8 space-y-4 border-t border-white/15 pt-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F5A623]">
                  Atención directa
                </p>
                <p className="text-sm text-white/80">
                  WhatsApp ·{" "}
                  <a
                    href={whatsappHref(waMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-white hover:text-[#F5A623]"
                  >
                    {WHATSAPP_DISPLAY}
                  </a>
                </p>
                <p className="text-sm text-white/80">
                  Email ·{" "}
                  <a
                    href={`mailto:${email}`}
                    className="font-semibold text-white hover:text-[#F5A623]"
                  >
                    {email}
                  </a>
                </p>
              </div>
            </div>
            <div className="brand-card bg-white p-6 text-[#1A2E8A] md:p-8">
              <AdsLeadDock landing={HOME_LEAD} embed />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
