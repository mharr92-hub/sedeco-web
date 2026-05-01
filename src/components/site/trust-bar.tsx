import { cn } from "@/lib/utils";

const stats = [
  { value: "+50", label: "Proyectos culminados" },
  { value: "+100,000 m²", label: "Concreto impermeabilizado" },
  { value: "+25 años", label: "Experiencia conjunta" },
  { value: "2020", label: "Fundada en" },
] as const;

export function TrustBar() {
  return (
    <section
      aria-label="Cifras de SEDECO"
      className="bg-navy-900 text-white"
    >
      <div className="container grid grid-cols-2 gap-x-8 gap-y-10 py-14 md:grid-cols-5 md:gap-x-0">
        {stats.map((stat, idx) => (
          <div
            key={stat.label}
            className={cn(
              "md:border-l md:border-navy-800 md:pl-8",
              idx === 0 && "md:border-l-0 md:pl-0",
              idx === 1 && "md:col-span-2",
            )}
          >
            <div
              className={cn(
                "font-display text-4xl text-white",
                idx === 1 ? "md:text-6xl" : "md:text-5xl",
              )}
            >
              {stat.value}
            </div>
            <div className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-navy-300">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
