import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/site-header";
import { SERVICE_CTA } from "@/lib/data/service-pages";
import { whatsappHref, WHATSAPP_DISPLAY } from "@/lib/site";

const waMessage = "Hola, quiero una inspección para un problema de filtración.";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="brand-wrap py-24 text-center md:py-32">
        <p className="brand-kicker-gold">Error 404</p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#1A2E8A] md:text-5xl">
          Página no encontrada.
        </h1>
        <p className="mx-auto mt-5 max-w-prose text-base leading-relaxed text-[#5C6578]">
          La página que buscas no existe o fue movida. Volvamos a tu
          inspección.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="/#contacto" className="btn-gold-lg">
            {SERVICE_CTA}
          </a>
          <a
            href={whatsappHref(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center rounded-md border border-[#1A2E8A] px-5 text-sm font-semibold text-[#1A2E8A] hover:bg-[#EEF1FB]"
          >
            WhatsApp {WHATSAPP_DISPLAY}
          </a>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
