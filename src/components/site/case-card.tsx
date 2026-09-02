import Image from "next/image";
import Link from "next/link";
import type { Case } from "@/lib/data/cases";

const numberFormatter = new Intl.NumberFormat("es-PA");

type CaseCardProps = {
  caseItem: Case;
  ctaHref?: string;
  priority?: boolean;
};

export function CaseCard({
  caseItem,
  ctaHref = "/#contacto",
  priority = false,
}: CaseCardProps) {
  const {
    slug,
    name,
    location,
    workType,
    scope,
    squareMeters,
    squareMetersDetail,
    problem,
    result,
    signedBy,
    image,
  } = caseItem;

  return (
    <article className="brand-card flex h-full flex-col overflow-hidden">
      {image ? (
        <div className="relative aspect-[16/10] w-full bg-[#EEF1FB]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-6">
        <p className="brand-kicker-gold">{workType}</p>
        <h3 className="mt-3 font-display text-xl font-semibold text-[#1A2E8A]">
          <Link
            href={`/casos/${slug}`}
            className="transition-colors hover:text-[#F5A623]"
          >
            {name}
          </Link>
        </h3>
        {location ? (
          <p className="mt-1 text-sm text-[#5C6578]">{location}</p>
        ) : null}

        {squareMeters ? (
          <div className="mt-6">
            <div className="font-display text-4xl font-semibold text-[#1A2E8A]">
              {numberFormatter.format(squareMeters)} m²
            </div>
            {squareMetersDetail ? (
              <p className="mt-2 text-xs text-[#5C6578]">{squareMetersDetail}</p>
            ) : null}
          </div>
        ) : null}

        {scope ? (
          <div className="mt-6">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5C6578]">
              Alcance
            </p>
            <p className="text-sm leading-relaxed text-[#5C6578]">{scope}</p>
          </div>
        ) : null}

        {problem ? (
          <div className="mt-5">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5C6578]">
              Problema
            </p>
            <p className="text-sm leading-relaxed text-[#5C6578]">{problem}</p>
          </div>
        ) : null}

        {result ? (
          <div className="mt-5">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5C6578]">
              Resultado
            </p>
            <p className="text-sm leading-relaxed text-[#5C6578]">{result}</p>
          </div>
        ) : null}

        {signedBy ? (
          <p className="mt-6 text-xs text-[#5C6578]">
            Carta de respaldo · {signedBy.name}
            {signedBy.role ? (
              <span className="block">{signedBy.role}</span>
            ) : null}
          </p>
        ) : null}

        <div className="mt-6 flex flex-1 items-end">
          <a
            href={ctaHref}
            className="inline-flex items-center text-sm font-semibold text-[#1A2E8A] transition-colors hover:text-[#F5A623]"
          >
            Solicitar inspección similar →
          </a>
        </div>
      </div>
    </article>
  );
}
