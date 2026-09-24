import Link from "next/link";
import { AdsLeadDock } from "@/components/ads/ads-lead-form";
import { TrackedLink } from "@/components/ads/tracked-link";
import { CaseCard } from "@/components/site/case-card";
import { ServiceIcon } from "@/components/site/service-icons";
import { SiteFooter } from "@/components/site/footer";
import { WhatsAppGlyph } from "@/components/site/whatsapp-float";
import { getAuthorizedShowcaseCases } from "@/lib/data/cases";
import {
  integralServiceJsonLd,
  type IntegralService,
} from "@/lib/data/integral-services";
import { INSPECTION_SLA, whatsappHref, WHATSAPP_DISPLAY } from "@/lib/site";

export function IntegralServicePage({ service }: { service: IntegralService }) {
  const cases = getAuthorizedShowcaseCases();
  const jsonLd = integralServiceJsonLd(service);

  return (
    <>
      {jsonLd.map((block) => (
        <script
          key={String(block["@type"])}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
      <main>
        <section className="bg-[#070F26] text-white">
          <div className="brand-wrap brand-section">
            <p className="text-sm text-white/70">
              <Link href="/servicios" className="hover:text-[#F5A623]">
                Servicios
              </Link>
              <span aria-hidden="true"> · </span>
              <span>{service.name}</span>
            </p>
            <div className="mt-6 inline-flex h-14 w-14 items-center justify-center rounded-md bg-white">
              <ServiceIcon name={service.icon} className="h-9 w-9 text-[#1A2E8A]" />
            </div>
            <h1 className="mt-5 max-w-4xl font-display text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
              {service.h1}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
              {service.sub}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#cotizar" className="btn-gold-lg">
                Cotizar
              </a>
              <TrackedLink
                event="whatsapp_click"
                landing={service.slug}
                source={service.lead.source}
                location="hero"
                href={whatsappHref(service.lead.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa-outline"
              >
                <WhatsAppGlyph className="text-[#25D366]" />
                WhatsApp {WHATSAPP_DISPLAY}
              </TrackedLink>
            </div>
            <p className="mt-5 text-sm text-white/70">{INSPECTION_SLA}</p>
          </div>
        </section>

        <section aria-labelledby="beneficios-titulo" className="bg-white">
          <div className="brand-wrap brand-section">
            <p className="brand-kicker-blue">Beneficios</p>
            <h2
              id="beneficios-titulo"
              className="mt-3 max-w-3xl font-display text-3xl font-semibold tracking-tight text-[#1A2E8A] md:text-4xl"
            >
              Qué incluye este frente de trabajo
            </h2>
            <ul className="mt-10 grid gap-4 md:grid-cols-3">
              {service.benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="brand-card p-5 text-sm leading-relaxed text-[#5C6578]"
                >
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          aria-labelledby="proceso-titulo"
          className="border-t border-[#D6E8FF] bg-[#F5F6FA]"
        >
          <div className="brand-wrap brand-section">
            <p className="brand-kicker-blue">Proceso</p>
            <h2
              id="proceso-titulo"
              className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#1A2E8A] md:text-4xl"
            >
              Inspección, medición y propuesta
            </h2>
            <ol className="mt-10 grid gap-4 md:grid-cols-3">
              {service.steps.map((step, index) => (
                <li key={step.title} className="brand-card bg-white p-5">
                  <p className="font-display text-sm font-semibold text-[#7A5209]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-[#1A2E8A]">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#5C6578]">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="casos-titulo" className="bg-white">
          <div className="brand-wrap brand-section">
            <p className="brand-kicker-blue">Casos</p>
            <h2
              id="casos-titulo"
              className="mt-3 max-w-3xl font-display text-3xl font-semibold tracking-tight text-[#1A2E8A] md:text-4xl"
            >
              Proyectos que podemos mostrar
            </h2>
            <p className="mt-5 max-w-prose text-base leading-relaxed text-[#5C6578]">
              Obras autorizadas para publicarse. Cada ficha describe el alcance
              real de ese proyecto.
            </p>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {cases.map((item) => (
                <CaseCard key={item.slug} caseItem={item} />
              ))}
            </div>
          </div>
        </section>

        <section
          id="cotizar"
          aria-labelledby="cotizar-titulo"
          className="scroll-mt-24 bg-[#070F26] text-white"
        >
          <div className="brand-wrap brand-section grid gap-12 md:grid-cols-[5fr_7fr]">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F5A623]">
                Cotización
              </p>
              <h2
                id="cotizar-titulo"
                className="mt-3 font-display text-3xl font-semibold tracking-tight text-white md:text-4xl"
              >
                Cotizar {service.name.toLowerCase()}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/80">
                Cuéntenos el edificio o la obra. {INSPECTION_SLA}
              </p>
              <TrackedLink
                event="whatsapp_click"
                landing={service.slug}
                source={service.lead.source}
                location="form"
                href={whatsappHref(service.lead.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa-outline mt-8"
              >
                <WhatsAppGlyph className="text-[#25D366]" />
                WhatsApp {WHATSAPP_DISPLAY}
              </TrackedLink>
            </div>
            <div className="brand-card bg-white p-6 text-[#1A2E8A] md:p-8">
              <AdsLeadDock landing={service.lead} embed />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
