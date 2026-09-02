import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/site-header";

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "50765508320";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="container py-32 text-center md:py-40">
        <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.22em] text-accent-600">
          Error 404
        </p>
        <h1 className="font-display text-display-md font-extrabold text-navy-600 md:text-display-lg">
          Página no encontrada.
        </h1>
        <p className="mx-auto mt-6 max-w-prose text-lg leading-relaxed text-ink-500">
          La página que buscas no existe o fue movida. Volvamos a tu
          diagnóstico.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href="/#contacto" className="btn-gold-lg">
            Solicitar diagnóstico
          </a>
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center rounded-md border border-navy-600 px-5 text-sm font-semibold text-navy-600 transition-colors hover:bg-navy-50"
          >
            WhatsApp directo
          </a>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
