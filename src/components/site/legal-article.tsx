import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site/footer";
import { LEGAL_UPDATED } from "@/lib/site";

export function LegalArticle({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <>
      <main>
        <article className="container py-16 md:py-24">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-accent-600">
            Legal
          </p>
          <h1 className="max-w-4xl font-display text-4xl text-navy-900 sm:text-display-md">
            {title}
          </h1>
          <p className="mt-4 text-sm text-ink-400">
            Actualizado: {LEGAL_UPDATED}
          </p>
          <div className="mt-10 max-w-prose space-y-8 text-ink-700 leading-relaxed">
            {children}
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-3 font-display text-xl text-navy-900">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
