const stats = [
  { value: "+50", label: "Proyectos culminados" },
  { value: "+100,000 m²", label: "Concreto impermeabilizado" },
  { value: "+25 años", label: "Experiencia del equipo" },
  { value: "2020", label: "Fundada en" },
] as const;

export function TrustBar() {
  return (
    <section aria-label="Cifras de SEDECO">
      <ul className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 md:gap-x-8">
        {stats.map((stat) => (
          <li key={stat.label}>
            <p className="font-display text-3xl font-extrabold leading-none tracking-tight text-white md:text-5xl">
              {stat.value}
            </p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/65">
              {stat.label}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
