import type { AdsLanding } from "@/lib/data/ads-landings";
import {
  ADS_EYEBROW,
  ADS_MICROCOPY,
  ADS_PILLARS,
  ADS_POSITIONING,
  ADS_STEPS,
  ADS_SUBHEAD,
  PATCH_VS_METHOD,
  SERVICE_NEED_CARDS,
  SUBSTRATE_BLOCKS,
} from "@/lib/data/ads-landings";
import { AdsLeadDock } from "@/components/ads/ads-lead-form";
import { GuaranteeLine } from "@/components/ads/guarantee-line";
import { OpenFormButton } from "@/components/ads/open-form-button";
import { TrackedLink } from "@/components/ads/tracked-link";
import { ViewOnce } from "@/components/ads/view-once";
import { WhatsAppGlyph } from "@/components/site/whatsapp-float";
import { getAdsProjectCards, getAdsStarCase } from "@/lib/data/cases";
import { SITE_URL, whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utils";

export function AdsLandingPage({ landing }: { landing: AdsLanding }) {
  const star = getAdsStarCase();
  const cards = getAdsProjectCards();
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: landing.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: landing.serviceType,
    description: landing.description,
    url: `${SITE_URL}${landing.path}`,
    areaServed: [
      { "@type": "City", name: "Ciudad de Panamá" },
      { "@type": "AdministrativeArea", name: "Área metro de Panamá" },
      { "@type": "City", name: "Colón" },
    ],
    provider: {
      "@type": "GeneralContractor",
      name: "SEDECO Panamá",
      legalName: "TANYA ENGINEERING, S.A.",
      url: SITE_URL,
      telephone: "+507 383-5175",
      email: "mark@selladodeconcreto.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "RBS Tower, Ave. Balboa y Ramón H. Jurado, Oficina 103A",
        addressLocality: "Punta Paitilla, Ciudad de Panamá",
        addressCountry: "PA",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <main className="bg-[#F5F6FA] text-[#1A2E8A]">
        <Hero landing={landing} />
        <Authority />
        <Problem landing={landing} />
        <Metodo />
        <StarCase landing={landing} star={star} />
        <Projects landing={landing} cards={cards} />
        <Substrates intro={landing.productIntro} />
        <ServiceNeeds currentPath={landing.path} />
        <PatchVsMethod />
        <Faqs landing={landing} />
        <FinalCta landing={landing} />
      </main>
    </>
  );
}

function Hero({ landing }: { landing: AdsLanding }) {
  return (
    <section className="relative overflow-hidden bg-[#1A2E8A] text-white">
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-[#2B4BF2] md:block"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)] md:items-start md:px-8 md:py-16 lg:py-20">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#F5A623]">
            {ADS_EYEBROW}
          </p>
          <h1
            data-ab="headline"
            data-variant="default"
            className="mt-5 max-w-3xl font-display text-[2rem] leading-[1.12] tracking-tight sm:text-4xl md:text-5xl"
          >
            {landing.h1}
          </h1>
          <p className="mt-5 max-w-prose text-base leading-relaxed text-[#D6E8FF] md:text-lg">
            {ADS_SUBHEAD}
          </p>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
            +100,000 m²
            <span className="mx-2 text-white/30">·</span>
            +50 proyectos
            <span className="mx-2 text-white/30">·</span>
            residencial, comercial y PH
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <OpenFormButton
              event="cta_hero_click"
              landing={landing.slug}
              location="hero"
              className="inline-flex min-h-12 items-center rounded-md bg-[#F5A623] px-5 text-sm font-semibold text-[#1A2E8A] hover:bg-[#e0981c]"
            >
              {landing.cta}
            </OpenFormButton>
            <TrackedLink
              event="whatsapp_click"
              landing={landing.slug}
              location="hero"
              href={whatsappHref(landing.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-white/25 bg-white/10 px-5 text-sm font-semibold text-white hover:bg-white/15"
            >
              <WhatsAppGlyph className="text-[#25D366]" />
              WhatsApp
            </TrackedLink>
          </div>
          <p className="mt-4 text-sm text-[#D6E8FF]">{ADS_MICROCOPY}</p>
        </div>
        <div className="relative z-10 hidden min-h-[22rem] md:block" />
      </div>
      <div className="md:pointer-events-none">
        <div className="mx-auto max-w-6xl md:px-8">
          <div className="md:pointer-events-auto md:absolute md:right-8 md:top-16 md:w-[min(100%,26rem)] lg:right-[max(2rem,calc((100%-72rem)/2+2rem))]">
            <AdsLeadDock landing={landing} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Authority() {
  return (
    <section aria-label="Sistemas con los que trabajamos" className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#8A94B0]">
          Autoridad técnica
        </p>
        <p className="mt-3 max-w-prose text-sm text-[#5C6578]">
          Más de 25 años de experiencia acumulada del equipo técnico. Empresa
          fundada en 2020.
        </p>
        <ul className="mt-5 grid gap-4 sm:grid-cols-3">
          <li className="rounded-lg border border-[#D6E8FF] bg-[#F5F6FA] px-5 py-4">
            <p className="font-display text-lg text-[#1A2E8A]">Ghostshield®</p>
            <p className="mt-1 text-sm text-[#5C6578]">
              Aplicadores autorizados · KreteTek Industries
            </p>
          </li>
          <li className="rounded-lg border border-[#D6E8FF] bg-[#F5F6FA] px-5 py-4">
            <p className="font-display text-lg text-[#1A2E8A]">Sika</p>
            <p className="mt-1 text-sm text-[#5C6578]">
              Trabajamos con sistemas Sika según el diagnóstico
            </p>
          </li>
          <li className="rounded-lg border border-[#D6E8FF] bg-[#F5F6FA] px-5 py-4">
            <p className="font-display text-lg text-[#1A2E8A]">Progressive Materials</p>
            <p className="mt-1 text-sm text-[#5C6578]">
              Distribuidores de Progressive Materials · HS 3200 Series
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}

function Problem({ landing }: { landing: AdsLanding }) {
  return (
    <section className="border-t border-[#D6E8FF]">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#2B4BF2]">
          El problema
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-3xl text-[#1A2E8A] md:text-4xl">
          {landing.problemTitle}
        </h2>
        <p className="mt-5 max-w-prose text-base leading-relaxed text-[#5C6578]">
          {landing.problemBody}
        </p>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {landing.problemBullets.map((item) => (
            <li
              key={item}
              className="rounded-lg border border-[#D6E8FF] bg-white p-5 text-sm leading-relaxed text-[#1A2E8A]"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Metodo() {
  return (
    <section id="metodo" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#2B4BF2]">
          Método SEDECO
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-3xl text-[#1A2E8A] md:text-4xl">
          {ADS_POSITIONING}
        </h2>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-[#8A94B0]">
          {ADS_PILLARS.join(" + ")}
        </p>
        <ol className="mt-10 grid gap-4 md:grid-cols-5">
          {ADS_STEPS.map((step, idx) => (
            <li key={step.title} className="rounded-lg border border-[#D6E8FF] bg-[#F5F6FA] p-5">
              <p className="font-display text-3xl text-[#F5A623]">{idx + 1}</p>
              <h3 className="mt-2 font-display text-lg text-[#1A2E8A]">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5C6578]">{step.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-sm text-[#5C6578]">
          No «aplicamos impermeabilizante». Diagnosticamos, ingenieramos el sistema y
          ejecutamos. La{" "}
          <GuaranteeLine className="text-[#1A2E8A]" />.
        </p>
      </div>
    </section>
  );
}

function StarCase({
  landing,
  star,
}: {
  landing: AdsLanding;
  star?: ReturnType<typeof getAdsStarCase>;
}) {
  if (!star) return null;
  return (
    <section className="border-t border-[#D6E8FF]">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#2B4BF2]">
          Caso de referencia
        </p>
        <h2 className="mt-3 font-display text-3xl text-[#1A2E8A] md:text-4xl">
          {star.name}
        </h2>
        <div className="mt-8 overflow-hidden rounded-xl bg-[#1A2E8A]">
          <div className="grid md:grid-cols-2">
            <div
              className="relative min-h-[14rem] bg-[#2B4BF2]"
              aria-hidden="true"
            >
              <div className="absolute inset-6 border border-white/20" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-display text-5xl text-white">
                  {star.squareMeters?.toLocaleString("es-PA")} m²
                </p>
                <p className="mt-2 text-sm text-[#D6E8FF]">
                  {star.squareMetersDetail}
                </p>
              </div>
            </div>
            <div className="p-8 text-white md:p-10">
              <p className="text-sm uppercase tracking-[0.16em] text-[#F5A623]">
                {star.workType}
              </p>
              <p className="mt-4 text-base leading-relaxed text-[#D6E8FF]">
                {star.scope}
              </p>
              {star.signedBy ? (
                <p className="mt-6 text-sm text-white">
                  Carta de respaldo · {star.signedBy.name}
                  <span className="mt-1 block text-[#D6E8FF]">
                    {star.signedBy.role}
                  </span>
                </p>
              ) : null}
              <OpenFormButton
                event="cta_bottom_click"
                landing={landing.slug}
                location="star_case"
                className="mt-8 inline-flex min-h-12 items-center rounded-md bg-[#F5A623] px-5 text-sm font-semibold text-[#1A2E8A]"
              >
                {landing.cta}
              </OpenFormButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects({
  landing,
  cards,
}: {
  landing: AdsLanding;
  cards: ReturnType<typeof getAdsProjectCards>;
}) {
  return (
    <section id="proyectos" className="scroll-mt-24 bg-white">
      <ViewOnce event="project_view" landing={landing.slug} location="projects" />
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#2B4BF2]">
          Proyectos públicos
        </p>
        <h2 className="mt-3 font-display text-3xl text-[#1A2E8A] md:text-4xl">
          Trabajos con carta de respaldo
        </h2>
        <p className="mt-4 max-w-prose text-sm leading-relaxed text-[#5C6578]">
          Metraje, alcance y cartas firmadas del portafolio público. Sin
          testimonios inventados ni casos restringidos.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {cards.map((item, idx) => (
            <article
              key={item.slug}
              className="overflow-hidden rounded-xl border border-[#D6E8FF] bg-[#F5F6FA]"
            >
              <div
                className={cn(
                  "flex min-h-[9rem] flex-col justify-end p-5 text-white",
                  idx === 0 && "bg-[#1A2E8A]",
                  idx === 1 && "bg-[#2B4BF2]",
                  idx === 2 && "bg-[#1A2E8A]",
                )}
                aria-hidden="true"
              >
                {item.squareMeters ? (
                  <p className="font-display text-4xl">
                    {item.squareMeters.toLocaleString("es-PA")} m²
                  </p>
                ) : (
                  <p className="font-display text-2xl">Losa nueva</p>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl text-[#1A2E8A]">{item.name}</h3>
                <p className="mt-1 text-sm text-[#5C6578]">{item.workType}</p>
                {item.location ? (
                  <p className="mt-1 text-sm text-[#8A94B0]">{item.location}</p>
                ) : null}
                {item.scope ? (
                  <p className="mt-3 text-sm leading-relaxed text-[#5C6578]">
                    {item.scope}
                  </p>
                ) : null}
                {item.signedBy ? (
                  <p className="mt-4 text-xs text-[#5C6578]">
                    Carta · {item.signedBy.name}
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Substrates({ intro }: { intro: string }) {
  return (
    <section className="border-t border-[#D6E8FF]">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#2B4BF2]">
          El sistema correcto
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-3xl text-[#1A2E8A] md:text-4xl">
          No todos los problemas de agua se resuelven con el mismo producto
        </h2>
        <p className="mt-5 max-w-prose text-base leading-relaxed text-[#5C6578]">
          {intro}
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SUBSTRATE_BLOCKS.map((block) => (
            <li
              key={block.title}
              className="rounded-lg border border-[#D6E8FF] bg-white p-5"
            >
              <h3 className="font-display text-lg text-[#1A2E8A]">{block.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5C6578]">{block.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ServiceNeeds({ currentPath }: { currentPath: string }) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#2B4BF2]">
          ¿Cuándo necesita esto?
        </p>
        <h2 className="mt-3 font-display text-3xl text-[#1A2E8A] md:text-4xl">
          El síntoma indica el frente de trabajo
        </h2>
        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SERVICE_NEED_CARDS.map((card) => {
            const current = card.href === currentPath;
            const className =
              "block rounded-lg border border-[#D6E8FF] bg-[#F5F6FA] p-5 transition-colors hover:border-[#2B4BF2]";
            const inner = (
              <>
                <h3 className="font-display text-lg text-[#1A2E8A]">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5C6578]">{card.when}</p>
              </>
            );
            return (
              <li key={card.href}>
                {current ? (
                  <p className={className} aria-current="page">
                    {inner}
                  </p>
                ) : (
                  <a href={card.href} className={className}>
                    {inner}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function PatchVsMethod() {
  return (
    <section className="border-t border-[#D6E8FF]">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#2B4BF2]">
          Por qué no basta un parche
        </p>
        <h2 className="mt-3 font-display text-3xl text-[#1A2E8A] md:text-4xl">
          Parche vs. método SEDECO
        </h2>
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[#D6E8FF]">
                <th className="py-3 pr-4 font-display text-lg font-normal text-[#8A94B0]">
                  {PATCH_VS_METHOD.patchTitle}
                </th>
                <th className="py-3 font-display text-lg font-normal text-[#1A2E8A]">
                  {PATCH_VS_METHOD.methodTitle}
                </th>
              </tr>
            </thead>
            <tbody>
              {PATCH_VS_METHOD.rows.map((row) => (
                <tr key={row.patch} className="border-b border-[#D6E8FF]">
                  <td className="py-4 pr-4 align-top text-[#8A94B0]">{row.patch}</td>
                  <td className="py-4 align-top text-[#1A2E8A]">{row.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Faqs({ landing }: { landing: AdsLanding }) {
  return (
    <section id="preguntas" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#2B4BF2]">
          Preguntas
        </p>
        <h2 className="mt-3 font-display text-3xl text-[#1A2E8A] md:text-4xl">
          Antes de solicitar la inspección
        </h2>
        <div className="mt-10 divide-y divide-[#D6E8FF] border-y border-[#D6E8FF]">
          {landing.faqs.map((faq) => (
            <details key={faq.q} className="group py-4">
              <summary className="cursor-pointer list-none font-display text-lg text-[#1A2E8A] marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-4">
                  {faq.q}
                  <span className="text-[#F5A623] group-open:hidden" aria-hidden="true">
                    +
                  </span>
                  <span className="hidden text-[#F5A623] group-open:inline" aria-hidden="true">
                    −
                  </span>
                </span>
              </summary>
              <p className="mt-3 max-w-prose text-sm leading-relaxed text-[#5C6578]">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta({ landing }: { landing: AdsLanding }) {
  return (
    <section className="bg-[#1A2E8A] text-white">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <h2 className="max-w-3xl font-display text-3xl md:text-4xl">
          Antes de volver a reparar la filtración, encuentra de dónde viene.
        </h2>
        <p className="mt-4 max-w-prose text-base leading-relaxed text-[#D6E8FF]">
          {landing.finalSupport}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <OpenFormButton
            event="cta_bottom_click"
            landing={landing.slug}
            location="bottom"
            className="inline-flex min-h-12 items-center rounded-md bg-[#F5A623] px-5 text-sm font-semibold text-[#1A2E8A]"
          >
            {landing.cta}
          </OpenFormButton>
          <TrackedLink
            event="whatsapp_click"
            landing={landing.slug}
            location="bottom"
            href={whatsappHref(landing.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center gap-2 rounded-md border border-white/25 px-5 text-sm font-semibold text-white"
          >
            <WhatsAppGlyph className="text-[#25D366]" />
            WhatsApp
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
