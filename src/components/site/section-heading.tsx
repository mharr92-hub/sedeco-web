import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  kicker,
  title,
  titleId,
  className,
  titleClassName,
  tone = "light",
  children,
}: {
  kicker: string;
  title: string;
  titleId?: string;
  className?: string;
  titleClassName?: string;
  tone?: "light" | "dark";
  children?: ReactNode;
}) {
  return (
    <div className={cn("mb-10", className)}>
      <p
        className={cn(
          "text-[11px] font-semibold uppercase tracking-[0.22em]",
          tone === "dark" ? "text-[#F5A623]" : "text-[#2B4BF2]",
        )}
      >
        {kicker}
      </p>
      <h2
        id={titleId}
        className={cn(
          "mt-3 max-w-4xl font-display text-3xl font-semibold tracking-tight md:text-5xl",
          tone === "dark" ? "text-white" : "text-[#1A2E8A]",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
