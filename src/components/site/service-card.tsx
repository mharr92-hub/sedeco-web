import type { Service } from "@/lib/data/services";

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <a
      href={`/servicios/${service.slug}`}
      className="brand-card group flex flex-col p-6"
    >
      <p className="brand-kicker-gold">{service.shortName}</p>
      <h3 className="mt-3 font-display text-xl font-semibold text-[#1A2E8A]">
        {service.name}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-[#5C6578]">
        {service.tagline}
      </p>
      <span className="mt-6 text-sm font-semibold text-[#1A2E8A] group-hover:text-[#F5A623]">
        Ver servicio →
      </span>
    </a>
  );
}
