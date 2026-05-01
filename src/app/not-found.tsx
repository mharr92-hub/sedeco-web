import { SiteFooter } from "@/components/site/footer";

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "50765508320";

export default function NotFound() {
  return (
    <>
      <main className="container py-32 text-center md:py-40">
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-accent-600">
          Error 404
        </p>
        <h1 className="font-display text-display-md text-navy-900 md:text-display-lg">
          Página no encontrada.
        </h1>
        <p className="mx-auto mt-6 max-w-prose text-lg text-ink-500 leading-relaxed">
          La página que buscas no existe o fue movida. Volvamos a tu
          diagnóstico.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="/#contacto"
            className="inline-flex items-center rounded-md bg-accent-500 px-6 py-3 text-white font-medium transition-colors hover:bg-accent-600"
          >
            Solicitar diagnóstico
          </a>
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-md border border-ink-200 bg-white px-6 py-3 text-ink-900 font-medium transition-colors hover:border-ink-300"
          >
            WhatsApp directo
          </a>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
