import Link from "next/link";
import { getAllServices } from "@/lib/data/services";

const phoneDisplay =
  process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "+507 6550-8320";
const phoneOffice = process.env.NEXT_PUBLIC_PHONE_OFFICE ?? "+507 383-5176";
const email = process.env.NEXT_PUBLIC_EMAIL ?? "mark@selladodeconcreto.com";
const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "50765508320";

export function SiteFooter() {
  const services = getAllServices();
  return (
    <footer className="border-t border-ink-100 bg-white">
      <div className="container grid gap-12 py-16 md:grid-cols-4">
        <div>
          <p className="font-display text-xl text-navy-900">SEDECO</p>
          <p className="mt-2 text-sm text-ink-500 leading-relaxed">
            Sellado de concreto permanente en Panamá. Aplicadores autorizados
            de Ghostshield® y distribuidores de Progressive Materials.
          </p>
        </div>
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-ink-400">
            Servicios
          </p>
          <ul className="space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/servicios/${s.slug}`}
                  className="text-ink-700 transition-colors hover:text-accent-600"
                >
                  {s.shortName}
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
        <div className="container py-6 text-xs text-ink-400">
          © {new Date().getFullYear()} SEDECO, S.A. — Damos resultados concretos
          en todo lo que hacemos.
        </div>
      </div>
    </footer>
  );
}
