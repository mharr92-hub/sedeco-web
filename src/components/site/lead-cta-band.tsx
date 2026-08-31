import { WhatsAppGlyph } from "@/components/site/whatsapp-float";
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
  subtitle = "Cuéntanos qué está pasando y Mark Harrick te responde dentro del próximo día hábil.",
  href = "/#contacto",
  variant = "light",
}: LeadCtaBandProps) {
  const isDark = variant === "dark";
  return (
    <section
      className={cn(
        "border-t",
        isDark
          ? "border-navy-800 bg-navy-900 text-white"
          : "border-ink-100 bg-white",
      )}
    >
      <div className="container py-20 text-center md:py-24">
        {eyebrow ? (
          <p
            className={cn(
              "mb-5 font-mono text-xs uppercase tracking-[0.2em]",
              isDark ? "text-accent-400" : "text-accent-600",
            )}
          >
            {eyebrow}
          </p>
        ) : null}
        <h2
          className={cn(
            "font-display text-3xl md:text-display-md",
            isDark ? "text-white" : "text-navy-900",
          )}
        >
          {title}
        </h2>
        <p
          className={cn(
            "mx-auto mt-4 max-w-prose leading-relaxed",
            isDark ? "text-navy-200" : "text-ink-500",
          )}
        >
          {subtitle}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href={href}
            className="inline-flex items-center rounded-md bg-accent-500 px-6 py-3 text-white font-medium transition-colors hover:bg-accent-600"
          >
            Solicitar inspección
          </a>
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-2 rounded-md px-6 py-3 font-medium transition-colors",
              isDark
                ? "border border-navy-700 bg-navy-800 text-white hover:bg-navy-700"
                : "border border-ink-200 bg-white text-ink-900 hover:border-ink-300",
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
