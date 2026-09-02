import { WhatsAppGlyph } from "@/components/site/whatsapp-float";
import { INSPECTION_SLA } from "@/lib/site";
import { cn } from "@/lib/utils";

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "50765508320";

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
    <section className={isDark ? "bg-navy-600 text-white" : "bg-navy-50"}>
      <div className="container py-16 text-center md:py-20">
        {eyebrow ? (
          <p
            className={cn(
              "mb-5 text-[11px] font-bold uppercase tracking-[0.22em]",
              isDark ? "text-accent-500" : "text-navy-600",
            )}
          >
            {eyebrow}
          </p>
        ) : null}
        <h2
          className={cn(
            "font-display text-3xl font-extrabold md:text-display-md",
            isDark ? "text-white" : "text-navy-600",
          )}
        >
          {title}
        </h2>
        <p
          className={cn(
            "mx-auto mt-4 max-w-prose leading-relaxed",
            isDark ? "text-white/75" : "text-ink-500",
          )}
        >
          {subtitle}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={href} className="btn-gold-lg">
            Solicitar inspección
          </a>
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex min-h-12 items-center gap-2 rounded-md px-5 text-sm font-semibold transition-colors",
              isDark
                ? "border border-white/25 bg-white/10 text-white hover:bg-white/15"
                : "border border-navy-600 text-navy-600 hover:bg-navy-50",
            )}
          >
            <WhatsAppGlyph className="text-[#25D366]" />
            WhatsApp directo
          </a>
        </div>
      </div>
    </section>
  );
}
