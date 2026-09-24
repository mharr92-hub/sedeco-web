import Link from "next/link";
import { ServiceIcon } from "@/components/site/service-icons";
import { SectionHeading } from "@/components/site/section-heading";
import {
  getIntegralServices,
  INTEGRAL_HOME_SUBTITLE,
  INTEGRAL_HOME_TITLE,
  INTEGRAL_PILLARS,
} from "@/lib/data/integral-services";

export function IntegralServiceGrid({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const Title = headingLevel;
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {getIntegralServices().map((service) => (
        <li key={service.slug} className="brand-card flex h-full flex-col p-5">
          <ServiceIcon name={service.icon} className="h-10 w-10 text-[#1A2E8A]" />
          <Title className="mt-4 font-display text-xl font-semibold text-[#1A2E8A]">
            <Link href={service.path} className="hover:text-[#7A5209]">
              {service.name}
            </Link>
          </Title>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-[#5C6578]">
            {service.line}
          </p>
          <Link href={`${service.path}#cotizar`} className="btn-gold mt-5 w-fit">
            Cotizar
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function IntegralServicesHome() {
  return (
    <section
      id="servicios"
      aria-labelledby="servicios-titulo"
      className="bg-white text-[#1A2E8A]"
    >
      <div className="brand-wrap brand-section">
        <SectionHeading
          kicker="Servicios"
          title={INTEGRAL_HOME_TITLE}
          titleId="servicios-titulo"
        >
          <p className="mt-5 max-w-prose text-base leading-relaxed text-[#5C6578]">
            {INTEGRAL_HOME_SUBTITLE}
          </p>
        </SectionHeading>
        <IntegralServiceGrid />
        <ul className="mt-12 grid gap-4 border-t border-[#D6E8FF] pt-12 md:grid-cols-3">
          {INTEGRAL_PILLARS.map((pillar) => (
            <li key={pillar.title} className="brand-card p-6">
              <h3 className="font-display text-xl font-semibold text-[#1A2E8A]">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#5C6578]">
                {pillar.line}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
