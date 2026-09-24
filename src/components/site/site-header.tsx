"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/site/brand-logo";
import { WhatsAppGlyph } from "@/components/site/whatsapp-float";
import { SERVICE_CTA } from "@/lib/data/service-pages";
import {
  getIntegralServiceByPathname,
  SERVICE_MENU,
} from "@/lib/data/integral-services";
import { whatsappHref, WHATSAPP_DISPLAY } from "@/lib/site";

const DEFAULT_WA = "Hola, quiero una inspección para un problema de filtración.";

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const service = getIntegralServiceByPathname(pathname);
  const waMessage = service?.lead.whatsappMessage ?? DEFAULT_WA;
  const quoteHref = service ? `${service.path}#cotizar` : "/#contacto";
  const quoteLabel = service ? "Cotizar" : SERVICE_CTA;
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuId = useId();
  const mobileId = useId();
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setServicesOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!servicesOpen && !mobileOpen) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setMobileOpen(false);
      }
    }
    function onPointer(event: MouseEvent) {
      if (!servicesRef.current?.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [servicesOpen, mobileOpen]);

  return (
    <header className="sticky top-0 z-40 border-b-2 border-[#F5A623] bg-[#1A2E8A]">
      <div className="brand-wrap flex h-16 items-center justify-between gap-3 md:h-[4.5rem]">
        <BrandLogo />

        <nav aria-label="Principal" className="hidden items-center gap-7 md:flex">
          <div className="relative" ref={servicesRef}>
            <button
              type="button"
              className="inline-flex items-center gap-1 text-sm font-medium text-white/80 transition-colors hover:text-[#F5A623]"
              aria-expanded={servicesOpen}
              aria-controls={menuId}
              onClick={() => setServicesOpen((open) => !open)}
            >
              Servicios
              <Chevron open={servicesOpen} />
            </button>
            {servicesOpen ? (
              <ul
                id={menuId}
                className="absolute left-0 top-full z-50 min-w-[18rem] pt-3"
              >
                <li className="overflow-hidden rounded-md border border-[#D6E8FF] bg-white py-1 shadow-elevated">
                  <ul>
                    {SERVICE_MENU.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="block px-4 py-2.5 text-sm font-medium text-[#1A2E8A] hover:bg-[#F5F6FA] hover:text-[#7A5209]"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            ) : null}
          </div>
          <Link
            href="/casos"
            className="text-sm font-medium text-white/80 transition-colors hover:text-[#F5A623]"
          >
            Casos
          </Link>
          <Link
            href="/#contacto"
            className="text-sm font-medium text-white/80 transition-colors hover:text-[#F5A623]"
          >
            Contacto
          </Link>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={whatsappHref(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp ${WHATSAPP_DISPLAY}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-[#25D366] text-white transition-colors hover:bg-[#1ebe5d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
          >
            <WhatsAppGlyph />
          </a>
          <Link href={quoteHref} className="btn-gold md:px-4">
            <span className="text-xs sm:text-sm">{quoteLabel}</span>
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/30 text-white md:hidden"
            aria-expanded={mobileOpen}
            aria-controls={mobileId}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span className="sr-only">{mobileOpen ? "Cerrar" : "Menú"}</span>
            <MenuGlyph open={mobileOpen} />
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <nav
          id={mobileId}
          aria-label="Móvil"
          className="border-t border-white/15 bg-[#1A2E8A] md:hidden"
        >
          <ul className="brand-wrap space-y-1 py-3">
            <li>
              <p className="px-1 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F5A623]">
                Servicios
              </p>
              <ul>
                {SERVICE_MENU.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-md px-2 py-2.5 text-sm font-medium text-white hover:bg-white/10"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <Link
                href="/casos"
                className="block rounded-md px-2 py-2.5 text-sm font-medium text-white hover:bg-white/10"
              >
                Casos
              </Link>
            </li>
            <li>
              <Link
                href="/#contacto"
                className="block rounded-md px-2 py-2.5 text-sm font-medium text-white hover:bg-white/10"
              >
                Contacto
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      <path d="M5 7.5 10 12.5 15 7.5" />
    </svg>
  );
}

function MenuGlyph({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75">
      {open ? (
        <path d="M6 6l12 12M18 6 6 18" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  );
}
