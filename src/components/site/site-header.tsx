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
    <header className="sticky top-0 z-40 border-b-2 border-accent-500 bg-navy-600">
      <div className="container flex h-16 items-center justify-between gap-4 md:h-[4.5rem] md:gap-8">
        <Link
          href="/"
          aria-label="SEDECO Panamá"
          className="font-display text-xl font-extrabold tracking-[0.18em] text-white md:text-2xl"
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
              className="text-sm font-medium text-white/80 transition-colors hover:text-accent-500"
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
            className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-[#25D366] text-white transition-colors hover:bg-[#1ebe5d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
          >
            <WhatsAppGlyph />
          </a>
          <Link href="/#contacto" className="btn-gold">
            <span className="text-xs sm:text-sm">{SERVICE_CTA}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
