import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  number,
  kicker,
  title,
  titleId,
  className,
  titleClassName,
  children,
}: {
  number: string;
  kicker: string;
  title: string;
  titleId?: string;
  className?: string;
  titleClassName?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cn("mb-10", className)}>
      <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-navy-600">
        <span className="inline-block h-5 w-1.5 shrink-0 bg-accent-500" aria-hidden="true" />
        <span className="text-accent-500">{number}</span>
        {kicker}
      </p>
      <h2
        id={titleId}
        className={cn(
          "mt-3 max-w-4xl font-display text-3xl font-extrabold tracking-tight text-navy-600 md:text-5xl",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
