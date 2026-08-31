import type { ReactNode } from "react";

export default function AdsGroupLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="min-h-screen bg-[#F5F6FA]">{children}</div>;
}
