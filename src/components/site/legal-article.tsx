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
        <article className="brand-wrap brand-section">
          <p className="brand-kicker-blue">Legal</p>
          <h1 className="mt-3 max-w-4xl font-display text-3xl font-semibold tracking-tight text-[#1A2E8A] md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-sm text-[#5C6578]">
            Actualizado: {LEGAL_UPDATED}
          </p>
          <div className="mt-10 max-w-prose space-y-8 leading-relaxed text-[#5C6578]">
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
      <h2 className="mb-3 font-display text-xl font-semibold text-[#1A2E8A]">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
