import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site/site-header";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";

export default function MarketingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      {children}
      <WhatsAppFloat />
    </>
  );
}
