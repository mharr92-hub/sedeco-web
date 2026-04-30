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
      <div className="container grid grid-cols-2 gap-8 py-14 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className="font-display text-3xl text-white md:text-4xl">
              {stat.value}
            </div>
            <div className="mt-1 text-sm text-navy-200">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
