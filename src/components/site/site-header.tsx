import Link from "next/link";
import { WhatsAppGlyph } from "@/components/site/whatsapp-float";
import { SERVICE_CTA } from "@/lib/data/service-pages";

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "50765508320";

const navLinks = [
  { href: "/#servicios", label: "Servicios" },
  { href: "/casos", label: "Casos" },
  { href: "/#contacto", label: "Contacto" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container flex h-16 items-center justify-between gap-4 md:h-20 md:gap-8">
        <Link
          href="/"
          aria-label="SEDECO Panamá"
          className="font-display text-xl font-semibold tracking-tight text-navy-900 transition-colors hover:text-navy-700 md:text-2xl"
        >
          SEDECO
        </Link>

        <nav
          aria-label="Principal"
          className="hidden md:flex items-center gap-8"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-700 transition-colors hover:text-accent-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escribir a SEDECO por WhatsApp"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#25D366] text-white transition-colors hover:bg-[#1ebe5d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
          >
            <WhatsAppGlyph />
          </a>
          <Link
            href="/#contacto"
            className="inline-flex items-center rounded-md bg-accent-500 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-600 md:px-4"
          >
            <span className="hidden sm:inline">{SERVICE_CTA}</span>
            <span className="sm:hidden">Inspección</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
