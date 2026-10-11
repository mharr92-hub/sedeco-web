import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The two ways in, side by side: a free quote when the client already knows
 * the job, and a charged diagnosis when they do not know where the problem
 * comes from. This is the first decision the visitor makes, so it leads the
 * hero instead of sitting in a paragraph.
 *
 * Each side takes its action as a node, because the marketing pages link to
 * an anchor while the Ads landings open the form sheet. Never state a rate.
 */
export function OfferChoice({
  quoteAction,
  diagnosisAction,
  variant = "dark",
  primary = "quote",
  className,
}: {
  quoteAction: ReactNode;
  diagnosisAction: ReactNode;
  /** `dark` for dark backgrounds, `light` for white ones. */
  variant?: "dark" | "light";
  /**
   * Which card leads. The Ads landings for leaks put diagnosis first,
   * because most of their visitors do not know where the water comes from.
   */
  primary?: "quote" | "diagnosis";
  className?: string;
}) {
  const isDark = variant === "dark";

  const quote = (
    <OfferCard
      key="quote"
      isDark={isDark}
      highlight={primary === "quote"}
      question="¿Ya tiene definido el trabajo?"
      body="Visitamos, medimos y cotizamos sin costo."
      action={quoteAction}
    />
  );
  const diagnosis = (
    <OfferCard
      key="diagnosis"
      isDark={isDark}
      highlight={primary === "diagnosis"}
      question="¿No sabe de dónde viene el problema?"
      body="Inspección termográfica y visual con informe fotográfico. Se cobra por hora, según la ubicación, y se le descuenta si luego contrata el trabajo. La cámara boroscópica se cotiza aparte."
      action={diagnosisAction}
    />
  );

  return (
    <div className={cn("grid gap-4 sm:grid-cols-2", className)}>
      {primary === "diagnosis" ? [diagnosis, quote] : [quote, diagnosis]}
    </div>
  );
}

function OfferCard({
  isDark,
  highlight = false,
  question,
  body,
  action,
}: {
  isDark: boolean;
  highlight?: boolean;
  question: string;
  body: string;
  action: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-lg border p-5",
        isDark
          ? highlight
            ? "border-[#F5A623]/60 bg-white/10"
            : "border-white/20 bg-white/5"
          : highlight
            ? "border-[#F5A623] bg-[#FFF8EC]"
            : "border-[#D6E8FF] bg-white",
      )}
    >
      <p
        className={cn(
          "font-display text-base font-semibold leading-snug",
          isDark ? "text-white" : "text-[#1A2E8A]",
        )}
      >
        {question}
      </p>
      <p
        className={cn(
          "mt-2 text-sm leading-relaxed",
          isDark ? "text-white/75" : "text-[#5C6578]",
        )}
      >
        {body}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">{action}</div>
    </div>
  );
}
