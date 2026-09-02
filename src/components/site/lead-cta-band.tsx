import { WhatsAppGlyph } from "@/components/site/whatsapp-float";
import { INSPECTION_SLA, whatsappHref, WHATSAPP_DISPLAY } from "@/lib/site";
import { SERVICE_CTA } from "@/lib/data/service-pages";
import { cn } from "@/lib/utils";

const waMessage = "Hola, quiero una inspección para un problema de filtración.";

type LeadCtaBandProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  href?: string;
  variant?: "light" | "dark";
};

export function LeadCtaBand({
  eyebrow,
  title,
  subtitle = `Cuéntenos qué está pasando. ${INSPECTION_SLA}`,
  href = "/#contacto",
  variant = "light",
}: LeadCtaBandProps) {
  const isDark = variant === "dark";
  return (
    <section className={isDark ? "bg-[#070F26] text-white" : "bg-white"}>
      <div className="brand-wrap brand-section text-center">
        {eyebrow ? (
          <p
            className={cn(
              "mb-5 text-[11px] font-semibold uppercase tracking-[0.22em]",
              isDark ? "text-[#F5A623]" : "text-[#2B4BF2]",
            )}
          >
            {eyebrow}
          </p>
        ) : null}
        <h2
          className={cn(
            "font-display text-3xl font-semibold tracking-tight md:text-5xl",
            isDark ? "text-white" : "text-[#1A2E8A]",
          )}
        >
          {title}
        </h2>
        <p
          className={cn(
            "mx-auto mt-5 max-w-prose text-base leading-relaxed",
            isDark ? "text-white/80" : "text-[#5C6578]",
          )}
        >
          {subtitle}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={href} className="btn-gold-lg">
            {SERVICE_CTA}
          </a>
          <a
            href={whatsappHref(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex min-h-12 items-center gap-2 rounded-md px-5 text-sm font-semibold transition-colors",
              isDark
                ? "border border-white/25 text-white hover:bg-white/15"
                : "border border-[#1A2E8A] text-[#1A2E8A] hover:bg-[#EEF1FB]",
            )}
          >
            <WhatsAppGlyph className="text-[#25D366]" />
            WhatsApp {WHATSAPP_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  );
}
