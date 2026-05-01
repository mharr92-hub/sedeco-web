import type { Service } from "@/lib/data/services";

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <a
      href={`/servicios/${service.slug}`}
      className="group flex flex-col rounded-lg border border-ink-200 bg-white p-6 transition-colors hover:border-ink-300"
    >
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-700">
        {service.shortName}
      </p>
      <h3 className="mt-3 font-display text-xl text-navy-900">
        {service.name}
      </h3>
      <p className="mt-3 text-sm text-ink-500 leading-relaxed">
        {service.tagline}
      </p>
      <span className="mt-6 pt-5 border-t border-ink-200 text-sm font-medium text-accent-600 group-hover:text-accent-700">
        Ver servicio →
      </span>
    </a>
  );
}
