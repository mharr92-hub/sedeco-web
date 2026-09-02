import Link from "next/link";
import type { Case } from "@/lib/data/cases";

const numberFormatter = new Intl.NumberFormat("es-PA");

type CaseCardProps = {
  caseItem: Case;
  ctaHref?: string;
};

export function CaseCard({ caseItem, ctaHref = "/#contacto" }: CaseCardProps) {
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
  } = caseItem;

  return (
    <article className="brand-card flex h-full flex-col bg-white p-6 transition-colors hover:border-accent-500">
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent-600">
        {workType}
      </p>
      <h3 className="mt-3 font-display text-xl font-bold text-navy-600">
        <Link
          href={`/casos/${slug}`}
          className="transition-colors hover:text-accent-600"
        >
          {name}
        </Link>
      </h3>
      {location ? (
        <p className="mt-1 text-sm text-ink-500">{location}</p>
      ) : null}

      {squareMeters ? (
        <div className="mt-6 border-t border-navy-100 pt-5">
          <div className="font-display text-4xl font-extrabold text-navy-600">
            {numberFormatter.format(squareMeters)} m²
          </div>
          {squareMetersDetail ? (
            <p className="mt-2 text-xs text-ink-400">{squareMetersDetail}</p>
          ) : null}
        </div>
      ) : null}

      {scope ? (
        <div className="mt-6">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-ink-400">
            Alcance
          </p>
          <p className="text-sm leading-relaxed text-ink-500">{scope}</p>
        </div>
      ) : null}

      {problem ? (
        <div className="mt-5">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-ink-400">
            Problema
          </p>
          <p className="text-sm leading-relaxed text-ink-500">{problem}</p>
        </div>
      ) : null}

      {result ? (
        <div className="mt-5">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-ink-400">
            Resultado
          </p>
          <p className="text-sm leading-relaxed text-ink-500">{result}</p>
        </div>
      ) : null}

      {signedBy ? (
        <p className="mt-6 border-t border-navy-100 pt-5 text-xs text-ink-500">
          Carta de respaldo · {signedBy.name}
          <span className="block text-ink-400">{signedBy.role}</span>
        </p>
      ) : null}

      <div className="mt-6 flex flex-1 items-end border-t border-navy-100 pt-5">
        <a
          href={ctaHref}
          className="inline-flex items-center text-sm font-semibold text-navy-600 transition-colors hover:text-accent-600"
        >
          Solicitar inspección similar →
        </a>
      </div>
    </article>
  );
}
