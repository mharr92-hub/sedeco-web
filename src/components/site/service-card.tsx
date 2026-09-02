import type { Service } from "@/lib/data/services";

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <a
      href={`/servicios/${service.slug}`}
      className="brand-card group flex flex-col bg-white p-6 transition-colors hover:border-accent-500"
    >
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent-600">
        {service.shortName}
      </p>
      <h3 className="mt-3 font-display text-xl font-bold text-navy-600">
        {service.name}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-ink-500">
        {service.tagline}
      </p>
      <span className="mt-6 border-t border-navy-100 pt-5 text-sm font-semibold text-navy-600 group-hover:text-accent-600">
        Ver servicio →
      </span>
    </a>
  );
}
