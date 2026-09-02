import Link from "next/link";
import { TrackedLink } from "@/components/ads/tracked-link";
import { LegalNav } from "@/components/site/legal-nav";
import {
  ADDRESS,
  INSPECTION_SLA,
  LEGAL_NAME,
  PHONE_OFFICE_PRIMARY,
  PHONE_OFFICE_SECONDARY,
  SITE_EMAIL,
  telHref,
  whatsappHref,
  WHATSAPP_DISPLAY,
} from "@/lib/site";
import type { LeadPageContext } from "@/lib/data/service-pages";

export function AdsFooter({ landing }: { landing: LeadPageContext }) {
  return (
    <footer className="border-t border-white/10 bg-[#070F26] text-white">
      <div className="brand-wrap grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-xl font-semibold tracking-[0.18em] text-white">
            SEDECO
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/70">
            Diagnóstico de filtraciones e impermeabilización en Ciudad de
            Panamá y Colón. {INSPECTION_SLA}
          </p>
          <p className="mt-4 text-xs leading-relaxed text-white/55">{LEGAL_NAME}</p>
        </div>
        <div>
          <p className="mb-3 font-display text-[11px] uppercase tracking-[0.18em] text-white/55">
            Oficina
          </p>
          <address className="not-italic text-sm leading-relaxed text-white/70">
            {ADDRESS.building}
            <br />
            {ADDRESS.street}
            <br />
            {ADDRESS.locality}
            <br />
            {ADDRESS.suite}
          </address>
        </div>
        <div>
          <p className="mb-3 font-display text-[11px] uppercase tracking-[0.18em] text-white/55">
            Contacto
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <TrackedLink
                event="whatsapp_click"
                landing={landing.slug}
                location="footer"
                href={whatsappHref(landing.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#F5A623]"
              >
                WhatsApp · {WHATSAPP_DISPLAY}
              </TrackedLink>
            </li>
            <li>
              <TrackedLink
                event="phone_click"
                landing={landing.slug}
                location="footer"
                href={telHref(PHONE_OFFICE_PRIMARY)}
                className="text-white hover:text-[#F5A623]"
              >
                Tel · {PHONE_OFFICE_PRIMARY}
              </TrackedLink>
            </li>
            <li>
              <TrackedLink
                event="phone_click"
                landing={landing.slug}
                location="footer"
                href={telHref(PHONE_OFFICE_SECONDARY)}
                className="text-white hover:text-[#F5A623]"
              >
                Tel · {PHONE_OFFICE_SECONDARY}
              </TrackedLink>
            </li>
            <li>
              <TrackedLink
                event="email_click"
                landing={landing.slug}
                location="footer"
                href={`mailto:${SITE_EMAIL}`}
                className="text-white hover:text-[#F5A623]"
              >
                {SITE_EMAIL}
              </TrackedLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="brand-wrap flex flex-wrap items-center justify-between gap-3 py-6 pb-24 text-xs text-white/55 md:pb-6">
          <p>
            © {new Date().getFullYear()} {LEGAL_NAME}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <LegalNav linkClassName="hover:text-[#F5A623]" />
            <Link href="/" className="hover:text-[#F5A623]">
              Sitio SEDECO
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
