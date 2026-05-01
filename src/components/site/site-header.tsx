import Link from "next/link";

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "50765508320";

const navLinks = [
  { href: "/servicios", label: "Servicios" },
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
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="h-5 w-5"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
            </svg>
          </a>
          <Link
            href="/#contacto"
            className="inline-flex items-center rounded-md bg-accent-500 px-3 py-2 text-sm font-medium text-white shadow-card transition-colors hover:bg-accent-600 md:px-4"
          >
            <span className="hidden sm:inline">Solicitar diagnóstico</span>
            <span className="sm:hidden">Diagnóstico</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
