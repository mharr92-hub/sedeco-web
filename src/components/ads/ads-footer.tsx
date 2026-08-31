import Link from "next/link";
import { TrackedLink } from "@/components/ads/tracked-link";
import { WhatsAppGlyph } from "@/components/site/whatsapp-float";
import {
  ADDRESS,
  LEGAL_NAME,
  PHONE_OFFICE_PRIMARY,
  PHONE_OFFICE_SECONDARY,
  SITE_EMAIL,
  telHref,
  whatsappHref,
  WHATSAPP_DISPLAY,
} from "@/lib/site";
import type { AdsLanding } from "@/lib/data/ads-landings";

export function AdsFooter({ landing }: { landing: AdsLanding }) {
  return (
    <footer className="border-t border-[#D6E8FF] bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3 md:px-8">
        <div>
          <p className="font-display text-xl text-[#1A2E8A]">SEDECO</p>
          <p className="mt-2 text-sm leading-relaxed text-[#5C6578]">
            Primero diagnosticamos. Después el sistema correcto.
          </p>
          <p className="mt-4 text-xs leading-relaxed text-[#8A94B0]">{LEGAL_NAME}</p>
        </div>
        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#8A94B0]">
            Oficina
          </p>
          <address className="not-italic text-sm leading-relaxed text-[#5C6578]">
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
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#8A94B0]">
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
                className="text-[#1A2E8A] hover:text-[#2B4BF2]"
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
                className="text-[#1A2E8A] hover:text-[#2B4BF2]"
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
                className="text-[#1A2E8A] hover:text-[#2B4BF2]"
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
                className="text-[#1A2E8A] hover:text-[#2B4BF2]"
              >
                {SITE_EMAIL}
              </TrackedLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#D6E8FF]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-6 text-xs text-[#8A94B0] md:px-8">
          <p>
            © {new Date().getFullYear()} {LEGAL_NAME}
          </p>
          <Link href="/" className="hover:text-[#2B4BF2]">
            Sitio SEDECO
          </Link>
        </div>
      </div>
    </footer>
  );
}
