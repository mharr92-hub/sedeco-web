import type { ReactNode } from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export default function AdsGroupLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className={`${montserrat.variable} min-h-screen bg-[#070F26]`}>
      {children}
    </div>
  );
}
