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
    <article className="flex flex-col rounded-lg bg-white p-6 shadow-card">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-600">
        {workType}
      </p>
      <h3 className="mt-2 font-display text-xl text-navy-900">
        <Link
          href={`/casos/${slug}`}
          className="transition-colors hover:text-accent-700"
        >
          {name}
        </Link>
      </h3>
      {location ? (
        <p className="mt-1 text-sm text-ink-500">{location}</p>
      ) : null}

      {squareMeters ? (
        <div className="mt-5 border-t border-ink-100 pt-4">
          <div className="font-display text-3xl text-navy-900">
            {numberFormatter.format(squareMeters)} m²
          </div>
          {squareMetersDetail ? (
            <p className="mt-1 text-xs text-ink-400">{squareMetersDetail}</p>
          ) : null}
        </div>
      ) : null}

      {scope ? (
        <div className="mt-5">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-400 mb-1">
            Alcance
          </p>
          <p className="text-sm text-ink-600 leading-relaxed">{scope}</p>
        </div>
      ) : null}

      {problem ? (
        <div className="mt-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-400 mb-1">
            Problema
          </p>
          <p className="text-sm text-ink-600 leading-relaxed">{problem}</p>
        </div>
      ) : null}

      {result ? (
        <div className="mt-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-400 mb-1">
            Resultado
          </p>
          <p className="text-sm text-ink-600 leading-relaxed">{result}</p>
        </div>
      ) : null}

      {signedBy ? (
        <p className="mt-5 border-t border-ink-100 pt-4 text-xs text-ink-500">
          Carta de respaldo · {signedBy.name}
          <span className="block text-ink-400">{signedBy.role}</span>
        </p>
      ) : null}

      <div className="mt-6 pt-4 border-t border-ink-100 flex-1 flex items-end">
        <a
          href={ctaHref}
          className="inline-flex items-center text-sm font-medium text-accent-600 hover:text-accent-700 transition-colors"
        >
          Solicitar inspección similar →
        </a>
      </div>
    </article>
  );
}
