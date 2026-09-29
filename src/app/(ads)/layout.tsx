import type { ReactNode } from "react";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";

export default function AdsGroupLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#070F26]">
      {children}
      <WhatsAppFloat aboveStickyBar />
    </div>
  );
}
