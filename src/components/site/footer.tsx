import Link from "next/link";
import { SERVICE_NAV } from "@/lib/data/service-pages";
import { LegalNav } from "@/components/site/legal-nav";
import { LEGAL_ENTITY, TRADE_NAME } from "@/lib/site";

const phoneDisplay =
  process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "+507 6550-8320";
const phoneOffice = process.env.NEXT_PUBLIC_PHONE_OFFICE ?? "+507 383-5176";
const email = process.env.NEXT_PUBLIC_EMAIL ?? "mark@selladodeconcreto.com";
const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "50765508320";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink-100 bg-white">
      <div className="container grid gap-12 py-16 md:grid-cols-4">
        <div>
          <p className="font-display text-xl text-navy-900">SEDECO</p>
          <p className="mt-2 text-sm text-ink-500 leading-relaxed">
            Primero diagnosticamos. Después el sistema correcto. Garantía por
            escrito según sistema y alcance contratado.
          </p>
        </div>
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-ink-400">
            Servicios
          </p>
          <ul className="space-y-2 text-sm">
            {SERVICE_NAV.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="text-ink-700 transition-colors hover:text-accent-600"
                >
                  {s.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/casos"
                className="font-medium text-ink-900 transition-colors hover:text-accent-600"
              >
                Casos →
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-ink-400">
            Oficina
          </p>
          <address className="not-italic text-sm text-ink-600 leading-relaxed">
            Paitilla, Edificio RBS
            <br />
            Planta Baja, Oficina 103A
            <br />
            Ciudad de Panamá, Panamá
          </address>
        </div>
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-ink-400">
            Contacto
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-700 hover:text-accent-600 transition-colors"
              >
                WhatsApp · {phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`tel:${phoneOffice.replace(/\s/g, "")}`}
                className="text-ink-700 hover:text-accent-600 transition-colors"
              >
                Oficina · {phoneOffice}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${email}`}
                className="text-ink-700 hover:text-accent-600 transition-colors"
              >
                {email}
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/sedecopanama"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-700 hover:text-accent-600 transition-colors"
              >
                Instagram · @sedecopanama
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-100">
        <div className="container flex flex-col gap-3 py-6 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {LEGAL_ENTITY} — {TRADE_NAME}. Damos
            resultados concretos en todo lo que hacemos.
          </p>
          <LegalNav linkClassName="transition-colors hover:text-accent-600" />
        </div>
      </div>
    </footer>
  );
}
