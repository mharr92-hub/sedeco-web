import Link from "next/link";
import { WhatsAppGlyph } from "@/components/site/whatsapp-float";
import { SERVICE_CTA } from "@/lib/data/service-pages";
import { whatsappHref, WHATSAPP_DISPLAY } from "@/lib/site";

const navLinks = [
  { href: "/#servicios", label: "Servicios" },
  { href: "/casos", label: "Casos" },
  { href: "/#contacto", label: "Contacto" },
];

const waMessage = "Hola, quiero una inspección para un problema de filtración.";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-[#F5A623] bg-[#1A2E8A]">
      <div className="brand-wrap flex h-16 items-center justify-between gap-3 md:h-[4.5rem]">
        <Link
          href="/"
          aria-label="SEDECO Panamá"
          className="font-display text-xl font-semibold tracking-[0.18em] text-white md:text-2xl"
        >
          SEDECO
        </Link>

        <nav
          aria-label="Principal"
          className="hidden items-center gap-7 md:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 transition-colors hover:text-[#F5A623]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappHref(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp ${WHATSAPP_DISPLAY}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-[#25D366] text-white transition-colors hover:bg-[#1ebe5d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
          >
            <WhatsAppGlyph />
          </a>
          <Link href="/#contacto" className="btn-gold md:px-4">
            <span className="text-xs sm:text-sm">{SERVICE_CTA}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
