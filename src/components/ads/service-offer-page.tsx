import { AdsLeadDock } from "@/components/ads/ads-lead-form";
import { AdsFooter } from "@/components/ads/ads-footer";
import { AdsHeader } from "@/components/ads/ads-header";
import { OpenFormButton } from "@/components/ads/open-form-button";
import { TrackedLink } from "@/components/ads/tracked-link";
import { WhatsAppGlyph } from "@/components/site/whatsapp-float";
import {
  HOW_IT_WORKS_STEPS,
  SERVICE_TRUST_BAR,
  serviceJsonLd,
  type ServicePage,
} from "@/lib/data/service-pages";
import { whatsappHref, WHATSAPP_DISPLAY, INSPECTION_SLA } from "@/lib/site";

const SERVICE_NAV = [
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#formulario", label: "Solicitar inspección" },
] as const;

export function ServiceOfferPage({ page }: { page: ServicePage }) {
  const jsonLd = serviceJsonLd(page);

  return (
    <>
      {jsonLd.map((block) => (
        <script
          key={block["@type"]}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
      <AdsHeader landing={page} nav={SERVICE_NAV} />
      <main className="bg-[#070F26] text-white">
        <Hero page={page} />
        {page.zincSection ? <ZincSection section={page.zincSection} /> : null}
        {page.refs ? <Refs refs={page.refs} /> : null}
        <Close page={page} />
      </main>
      <AdsFooter landing={page} />
    </>
  );
}

function Hero({ page }: { page: ServicePage }) {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-20">
        {page.kicker ? (
          <p className="font-ads text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F5A623]">
            {page.kicker}
          </p>
        ) : (
          <p className="font-ads text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F5A623]">
            {page.serviceType}
          </p>
        )}
        <h1
          data-ab="headline"
          data-variant="default"
          className="mt-4 max-w-4xl font-ads text-[1.75rem] font-semibold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl"
        >
          {page.h1}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
          {page.sub}
        </p>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {page.bullets.map((item) => (
            <li
              key={item}
              className="border border-white/15 bg-white/5 p-5 text-sm leading-relaxed text-white/90"
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap gap-3">
          <OpenFormButton
            event="cta_hero_click"
            landing={page.slug}
            location="hero"
            className="btn-gold-lg"
          >
            {page.cta}
          </OpenFormButton>
          <TrackedLink
            event="whatsapp_click"
            landing={page.slug}
            location="hero"
            href={whatsappHref(page.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center gap-2 rounded-md border border-white/25 bg-white/10 px-5 text-sm font-semibold text-white hover:bg-white/15"
          >
            <WhatsAppGlyph className="text-[#25D366]" />
            WhatsApp {WHATSAPP_DISPLAY}
          </TrackedLink>
        </div>
        <p className="mt-5 text-sm text-white/70">
          Primero diagnosticamos. Después el sistema correcto. Garantía por
          escrito según sistema y alcance contratado.
        </p>
      </div>
    </section>
  );
}

function ZincSection({
  section,
}: {
  section: NonNullable<ServicePage["zincSection"]>;
}) {
  return (
    <section className="bg-white text-[#1A2E8A]">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <p className="font-ads text-[11px] font-semibold uppercase tracking-[0.22em] text-[#2B4BF2]">
          Dentro de este servicio
        </p>
        <h2 className="mt-3 max-w-3xl font-ads text-3xl font-semibold tracking-tight md:text-4xl">
          {section.title}
        </h2>
        <p className="mt-5 max-w-prose text-base leading-relaxed text-[#5C6578]">
          {section.body}
        </p>
        <p className="mt-4 max-w-prose text-sm font-medium leading-relaxed text-[#1A2E8A]">
          {section.note}
        </p>
      </div>
    </section>
  );
}

function Refs({ refs }: { refs: NonNullable<ServicePage["refs"]> }) {
  return (
    <section className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <p className="font-ads text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F5A623]">
          Referencias
        </p>
        <h2 className="mt-3 font-ads text-3xl font-semibold tracking-tight md:text-4xl">
          Trabajos con respaldo
        </h2>
        <ul className="mt-10 divide-y divide-white/15 border-y border-white/15">
          {refs.map((item) => (
            <li key={item.name} className="grid gap-2 py-6 md:grid-cols-2">
              <div>
                <p className="font-ads text-xl font-semibold">{item.name}</p>
                <p className="mt-1 text-sm text-[#F5A623]">{item.place}</p>
              </div>
              <p className="text-sm leading-relaxed text-white/80">{item.scope}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Close({ page }: { page: ServicePage }) {
  return (
    <section className="bg-[#F5F6FA] text-[#1A2E8A]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[minmax(0,1fr)_minmax(20rem,26rem)] md:items-start md:px-8 md:py-20">
        <div>
          <p className="font-ads text-[11px] font-semibold uppercase tracking-[0.22em] text-[#2B4BF2]">
            Solicitar inspección
          </p>
          <h2 className="mt-3 font-ads text-3xl font-semibold tracking-tight md:text-4xl">
            Cuéntenos el caso. {INSPECTION_SLA}
          </h2>
          <TrackedLink
            event="whatsapp_click"
            landing={page.slug}
            location="bottom"
            href={whatsappHref(page.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-md bg-[#25D366] px-5 text-sm font-semibold text-white hover:bg-[#1ebe5d]"
          >
            <WhatsAppGlyph />
            WhatsApp {WHATSAPP_DISPLAY}
          </TrackedLink>

          <div id="como-funciona" className="mt-12 scroll-mt-24">
            <h3 className="font-ads text-2xl font-semibold">Cómo funciona</h3>
            <ol className="mt-6 grid gap-4 sm:grid-cols-2">
              {HOW_IT_WORKS_STEPS.map((step, idx) => (
                <li
                  key={step.title}
                  className="rounded-lg border border-[#D6E8FF] bg-white p-5"
                >
                  <p className="font-ads text-3xl text-[#F5A623]">{idx + 1}</p>
                  <p className="mt-2 font-ads text-lg font-semibold">{step.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#5C6578]">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="md:sticky md:top-24">
          <AdsLeadDock landing={page} inline />
        </div>
      </div>
      <ServiceTrustBar />
    </section>
  );
}

export function ServiceTrustBar() {
  return (
    <aside
      aria-label="Respaldo técnico"
      className="border-t border-[#D6E8FF] bg-[#1A2E8A] px-5 py-6 text-center md:px-8"
    >
      <p className="mx-auto max-w-5xl font-ads text-[11px] font-semibold uppercase leading-relaxed tracking-[0.12em] text-white md:text-xs md:tracking-[0.16em]">
        {SERVICE_TRUST_BAR}
      </p>
    </aside>
  );
}
