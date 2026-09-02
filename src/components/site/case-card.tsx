import Image from "next/image";
import Link from "next/link";
import type { Case } from "@/lib/data/cases";

type CaseCardProps = {
  caseItem: Case;
  priority?: boolean;
};

/** Photo + name + service. No empty image slot, no prices, no generated art. */
export function CaseCard({ caseItem, priority = false }: CaseCardProps) {
  const { slug, name, workType, image } = caseItem;
  if (!image) return null;

  return (
    <article className="brand-card flex h-full flex-col overflow-hidden">
      <Link href={`/casos/${slug}`} className="group block">
        <div className="relative aspect-[16/10] w-full bg-[#EEF1FB]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
        <div className="p-5">
          <h3 className="font-display text-xl font-semibold text-[#1A2E8A] transition-colors group-hover:text-[#F5A623]">
            {name}
          </h3>
          <p className="brand-kicker-gold mt-2">{workType}</p>
        </div>
      </Link>
    </article>
  );
}
