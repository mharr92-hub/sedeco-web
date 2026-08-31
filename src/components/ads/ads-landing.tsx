import type { AdsLanding } from "@/lib/data/ads-landings";
import { ADS_POSITIONING } from "@/lib/data/ads-landings";
import {
  ADS_CAPACITY_BARS,
  ADS_HERO_KICKER,
  ADS_HERO_SUB,
  ADS_MAGNITUD,
  ADS_METODO_BODY,
  ADS_METODO_BULLETS,
  ADS_MORE_PROJECTS,
  ADS_PHOTOS,
  ADS_PORTFOLIO,
  ADS_PROBLEM_CARDS,
  ADS_REFERENCIAS,
  ADS_SERVICE_COLUMNS,
  ADS_SUCCESS_CASES,
  ADS_MILLENIUM_CASE,
  getAdsHeroPhoto,
} from "@/lib/data/ads-visuals";
import { AdsLeadDock } from "@/components/ads/ads-lead-form";
import { AdsPhotoFill } from "@/components/ads/ads-photo";
import { GuaranteeLine } from "@/components/ads/guarantee-line";
import { OpenFormButton } from "@/components/ads/open-form-button";
import { TrackedLink } from "@/components/ads/tracked-link";
import { ViewOnce } from "@/components/ads/view-once";
import { WhatsAppGlyph } from "@/components/site/whatsapp-float";
import { SITE_URL, whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utils";

export function AdsLandingPage({ landing }: { landing: AdsLanding }) {
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
      <main className="bg-[#070F26] text-white">
        <Hero landing={landing} />
        <StarCases landing={landing} />
        <Magnitud />
        <Metodo />
        <Problemas landing={landing} />
        <Servicios currentPath={landing.path} />
        <Capacidad />
        <Portfolio />
        <Referencias />
        <Faqs landing={landing} />
        <FinalCta landing={landing} />
      </main>
    </>
  );
}

function Hero({ landing }: { landing: AdsLanding }) {
  const hero = getAdsHeroPhoto(landing.slug);
  const dual = hero.mobile.src !== hero.desktop.src;

  return (
    <section id="diagnostico" className="relative min-h-[85svh] text-white md:min-h-[92svh]">
      {/* Decorative full-bleed photo. pointer-events-none so it cannot steal
          clicks from the hero CTAs or the docked form. */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {dual ? (
          <>
            <AdsPhotoFill
              photo={hero.mobile}
              priority
              className="md:hidden"
              sizes="100vw"
            />
            <AdsPhotoFill
              photo={hero.desktop}
              priority
              className="hidden md:block"
              sizes="100vw"
            />
          </>
        ) : (
          <AdsPhotoFill photo={hero.mobile} priority sizes="100vw" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070F26]/90 via-[#1A2E8A]/70 to-[#070F26]/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070F26] via-transparent to-[#070F26]/40" />
      </div>

      <div className="relative mx-auto grid min-h-[85svh] max-w-6xl gap-10 px-5 pb-16 pt-8 md:min-h-[92svh] md:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] md:items-center md:px-8 md:py-20">
        <div>
          <p className="font-ads text-sm font-semibold tracking-[0.28em] text-[#F5A623]">
            SEDECO
          </p>
          <p className="mt-5 max-w-xl font-ads text-[1.65rem] font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.35rem]">
            {ADS_HERO_KICKER}
          </p>
          <h1
            data-ab="headline"
            data-variant="default"
            className="mt-5 max-w-3xl font-ads text-xl font-semibold leading-snug text-white md:text-2xl"
          >
            {landing.h1}
          </h1>
          <p className="mt-4 font-ads text-sm uppercase tracking-[0.14em] text-white/80">
            {ADS_HERO_SUB}
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
              WhatsApp +507 6550-8320
            </TrackedLink>
          </div>
          <p className="mt-5 max-w-prose text-sm leading-relaxed text-white/80">
            {ADS_POSITIONING}{" "}
            <GuaranteeLine className="text-white" />.
          </p>
        </div>
        {/* Reserves the right column so the hero stays tall enough for the
            docked form. Must not paint above the form: a previous `relative z-10`
            spacer intercepted every click on Nombre / WhatsApp / problema /
            descripción while remaining visually transparent. */}
        <div
          className="pointer-events-none hidden min-h-[22rem] md:block"
          aria-hidden="true"
        />
      </div>

      {/* No z-index on this wrapper: AdsLeadDock's mobile sheet is `fixed z-50`
          and must stay above the sticky header (`z-40`). A stacking context
          here would trap the sheet underneath the header. */}
      <div className="md:pointer-events-none">
        <div className="mx-auto max-w-6xl md:px-8">
          <div className="md:pointer-events-auto md:absolute md:bottom-16 md:right-8 md:z-20 md:w-[min(100%,26rem)] lg:right-[max(2rem,calc((100%-72rem)/2+2rem))]">
            <AdsLeadDock landing={landing} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Magnitud() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid md:grid-cols-2">
        <div className="flex flex-col justify-center bg-[#070F26] px-5 py-16 md:min-h-[70vh] md:px-12 lg:px-16">
          <p className="font-ads text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F5A623]">
            Magnitud
          </p>
          <h2 className="mt-4 font-ads text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Esta gente ejecuta proyectos grandes.
          </h2>
          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8">
            {ADS_MAGNITUD.map((item) => (
              <li key={item.label}>
                <p className="font-ads text-4xl font-semibold leading-none tracking-tight text-white md:text-6xl">
                  {item.value}
                  {item.unit ? (
                    <span className="ml-1 text-2xl text-[#F5A623] md:text-3xl">
                      {item.unit}
                    </span>
                  ) : null}
                </p>
                <p className="mt-2 text-sm uppercase tracking-[0.12em] text-white/65">
                  {item.label}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative min-h-[50vh] md:min-h-[70vh]">
          <AdsPhotoFill photo={ADS_PHOTOS.coverFull} sizes="(min-width: 768px) 50vw, 100vw" />
        </div>
      </div>
    </section>
  );
}

function StarCases({ landing }: { landing: AdsLanding }) {
  return (
    <section id="casos" className="scroll-mt-24">
      <ViewOnce event="project_view" landing={landing.slug} location="star_case" />
      {ADS_SUCCESS_CASES.map((item, idx) => (
        <article
          key={item.name}
          className="relative min-h-[70vh] text-white md:min-h-[85vh]"
        >
          <div className="absolute inset-0">
            <AdsPhotoFill photo={item.photo} sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070F26] via-[#070F26]/45 to-black/20" />
          </div>
          <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-end px-5 py-16 md:min-h-[85vh] md:px-8 md:py-20">
            <p className="font-ads text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F5A623]">
              Caso de éxito
            </p>
            <h2 className="mt-3 font-ads text-4xl font-semibold tracking-tight text-white md:text-6xl">
              {item.name}
            </h2>
            <p className="mt-3 font-ads text-lg text-white md:text-2xl">
              {item.metrics}
            </p>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85">
              {item.scope}
            </p>
            {"note" in item && item.note ? (
              <p className="mt-4 max-w-2xl text-sm font-medium text-[#F5A623]">
                {item.note}
              </p>
            ) : null}
            {idx === 0 ? (
              <OpenFormButton
                event="cta_bottom_click"
                landing={landing.slug}
                location="star_case"
                className="mt-8 inline-flex min-h-12 w-fit items-center rounded-md bg-[#F5A623] px-5 text-sm font-semibold text-[#1A2E8A]"
              >
                {landing.cta}
              </OpenFormButton>
            ) : null}
          </div>
        </article>
      ))}
      <article className="grid md:grid-cols-2">
        <div className="flex flex-col justify-center bg-[#1A2E8A] px-5 py-16 text-white md:min-h-[55vh] md:px-12">
          <p className="font-ads text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F5A623]">
            Caso de éxito
          </p>
          <h2 className="mt-3 font-ads text-3xl font-semibold tracking-tight md:text-5xl">
            {ADS_MILLENIUM_CASE.name}
          </h2>
          <p className="mt-3 font-ads text-lg md:text-xl">
            {ADS_MILLENIUM_CASE.metrics}
          </p>
          <p className="mt-5 max-w-prose text-base leading-relaxed text-white/85">
            {ADS_MILLENIUM_CASE.scope} Carta de respaldo de la promotora.
          </p>
          <blockquote className="mt-6 border-l-2 border-[#F5A623] pl-5 text-lg leading-relaxed">
            «{ADS_MILLENIUM_CASE.quote}»
          </blockquote>
        </div>
        <div className="relative min-h-[40vh] md:min-h-[55vh]">
          <AdsPhotoFill
            photo={ADS_MILLENIUM_CASE.photo}
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
      </article>
    </section>
  );
}

function Metodo() {
  return (
    <section id="metodo" className="scroll-mt-24">
      <div className="grid md:grid-cols-[55fr_45fr]">
        <div className="relative min-h-[55vh] md:min-h-[70vh]">
          <AdsPhotoFill
            photo={ADS_PHOTOS.joyTower}
            sizes="(min-width: 768px) 55vw, 100vw"
          />
        </div>
        <div className="flex flex-col justify-center bg-white px-5 py-16 text-[#1A2E8A] md:px-12 lg:px-16">
          <p className="font-ads text-[11px] font-semibold uppercase tracking-[0.22em] text-[#2B4BF2]">
            Quiénes / método
          </p>
          <h2 className="mt-4 font-ads text-3xl font-semibold tracking-tight text-[#1A2E8A] md:text-4xl">
            {ADS_POSITIONING}
          </h2>
          <p className="mt-5 max-w-prose text-base leading-relaxed text-[#5C6578]">
            {ADS_METODO_BODY}
          </p>
          <ul className="mt-8 space-y-3">
            {ADS_METODO_BULLETS.map((item) => (
              <li
                key={item}
                className="font-ads text-xl font-semibold text-[#1A2E8A]"
              >
                <span className="mr-3 text-[#F5A623]" aria-hidden="true">
                  —
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Problemas({ landing }: { landing: AdsLanding }) {
  return (
    <section className="bg-[#070F26]">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <p className="font-ads text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F5A623]">
          El problema
        </p>
        <h2 className="mt-3 max-w-3xl font-ads text-3xl font-semibold tracking-tight text-white md:text-5xl">
          {landing.problemTitle}
        </h2>
        <p className="mt-5 max-w-prose text-base leading-relaxed text-white/75">
          {landing.problemBody}
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ADS_PROBLEM_CARDS.map((card) => (
            <li key={card.title} className="relative min-h-[22rem] overflow-hidden">
              <AdsPhotoFill
                photo={card.photo}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070F26] via-[#070F26]/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-ads text-xl font-semibold text-white">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">
                  {card.line}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Servicios({ currentPath }: { currentPath: string }) {
  return (
    <section className="bg-white text-[#1A2E8A]">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <p className="font-ads text-[11px] font-semibold uppercase tracking-[0.22em] text-[#2B4BF2]">
          Servicios
        </p>
        <h2 className="mt-3 font-ads text-3xl font-semibold tracking-tight md:text-5xl">
          El diagnóstico define el frente de trabajo
        </h2>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {ADS_SERVICE_COLUMNS.map((col) => {
            const current = col.href === currentPath;
            const inner = (
              <>
                <div className="relative min-h-[22rem] md:min-h-[28rem]">
                  <AdsPhotoFill
                    photo={col.photo}
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                </div>
                <div className="bg-[#070F26] p-5 text-white">
                  <h3 className="font-ads text-2xl font-semibold">{col.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">
                    {col.line}
                  </p>
                </div>
              </>
            );
            return (
              <li key={col.href} className="overflow-hidden">
                {current ? (
                  <p aria-current="page">{inner}</p>
                ) : (
                  <a href={col.href} className="block">
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

function Capacidad() {
  return (
    <section id="capacidad" className="relative min-h-[70vh] scroll-mt-24 md:min-h-[85vh]">
      <div className="absolute inset-0">
        <AdsPhotoFill photo={ADS_PHOTOS.capacidadHero} sizes="100vw" />
        <div className="absolute inset-0 bg-[#070F26]/55" />
      </div>
      <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-end px-5 py-16 md:min-h-[85vh] md:px-8 md:py-20">
        <p className="font-ads text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F5A623]">
          Capacidad
        </p>
        <h2 className="mt-4 max-w-4xl font-ads text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-6xl">
          Capacidad para ejecutar donde otros no llegan.
        </h2>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ADS_CAPACITY_BARS.map((bar) => (
            <li
              key={bar}
              className="border border-white/25 bg-black/30 px-4 py-4 font-ads text-sm font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm"
            >
              {bar}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Portfolio() {
  return (
    <section id="proyectos" className="scroll-mt-24 bg-[#070F26]">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <p className="font-ads text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F5A623]">
          Portafolio
        </p>
        <h2 className="mt-3 font-ads text-3xl font-semibold tracking-tight text-white md:text-5xl">
          Obras que se ven grandes
        </h2>
        <ul className="mt-10 grid auto-rows-[minmax(16rem,22vw)] grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
          {ADS_PORTFOLIO.map((item) => (
            <li
              key={`${item.name}-${item.photo.src}`}
              className={cn(
                "relative overflow-hidden",
                item.large && "col-span-2 row-span-2 min-h-[20rem] md:min-h-0",
              )}
            >
              <AdsPhotoFill
                photo={item.photo}
                sizes={item.large ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <p className="absolute bottom-3 left-3 right-3 font-ads text-sm font-semibold text-white md:text-base">
                {item.name}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-prose text-sm leading-relaxed text-white/70">
          {ADS_MORE_PROJECTS}
        </p>
      </div>
    </section>
  );
}

function Referencias() {
  return (
    <section id="referencias" className="relative scroll-mt-24">
      <div className="absolute inset-0">
        <AdsPhotoFill photo={ADS_PHOTOS.obraAltura} sizes="100vw" />
        <div className="absolute inset-0 bg-[#070F26]/88" />
      </div>
      <div className="relative mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <p className="font-ads text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F5A623]">
          Referencias
        </p>
        <h2 className="mt-3 font-ads text-3xl font-semibold tracking-tight text-white md:text-5xl">
          Cartas originales disponibles a solicitud
        </h2>
        <p className="mt-4 max-w-prose text-sm leading-relaxed text-white/75">
          Proyectos ejecutados por SEDECO Panamá.
        </p>
        <ol className="mt-10 divide-y divide-white/15 border-y border-white/15">
          {ADS_REFERENCIAS.map((item) => (
            <li key={item.name} className="grid gap-3 py-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <div>
                <h3 className="font-ads text-xl font-semibold text-white md:text-2xl">
                  {item.name}
                </h3>
                <p className="mt-1 text-sm text-[#F5A623]">{item.place}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.14em] text-white/55">
                  Contacto: {item.contact}
                </p>
              </div>
              <p className="text-sm leading-relaxed text-white/80 md:text-base">
                {item.scope}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Faqs({ landing }: { landing: AdsLanding }) {
  return (
    <section id="preguntas" className="scroll-mt-24 bg-white text-[#1A2E8A]">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <p className="font-ads text-[11px] font-semibold uppercase tracking-[0.22em] text-[#2B4BF2]">
          Preguntas
        </p>
        <h2 className="mt-3 font-ads text-3xl font-semibold tracking-tight md:text-4xl">
          Antes de solicitar la inspección
        </h2>
        <div className="mt-10 divide-y divide-[#D6E8FF] border-y border-[#D6E8FF]">
          {landing.faqs.map((faq) => (
            <details key={faq.q} className="group py-4">
              <summary className="cursor-pointer list-none font-ads text-lg font-semibold text-[#1A2E8A] marker:content-none [&::-webkit-details-marker]:hidden">
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
    <section className="relative min-h-[70vh] text-white">
      <div className="absolute inset-0">
        <AdsPhotoFill photo={ADS_PHOTOS.heroTorres} sizes="100vw" />
        <div className="absolute inset-0 bg-[#070F26]/70" />
      </div>
      <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-5 py-16 md:px-8 md:py-20">
        <h2 className="max-w-3xl font-ads text-4xl font-semibold tracking-tight text-white md:text-6xl">
          Hablemos de su proyecto
        </h2>
        <p className="mt-5 max-w-prose text-base leading-relaxed text-white/80">
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
            WhatsApp +507 6550-8320
          </TrackedLink>
        </div>
        <p className="mt-8 font-ads text-sm tracking-[0.18em] text-white/60">
          SEDECO.LAT
        </p>
      </div>
    </section>
  );
}
