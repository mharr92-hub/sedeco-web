import { ADS_MAGNITUD } from "@/lib/data/ads-visuals";

export function TrustBar() {
  return (
    <section aria-label="Cifras de SEDECO">
      <ul className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
        {ADS_MAGNITUD.map((item) => (
          <li key={item.label}>
            <p className="font-display text-4xl font-semibold leading-none tracking-tight text-white md:text-5xl">
              {item.value}
              {item.unit ? (
                <span className="ml-1 text-2xl text-[#F5A623] md:text-3xl">
                  {item.unit}
                </span>
              ) : null}
            </p>
            <p className="mt-2 text-sm uppercase tracking-[0.12em] text-white/65">
              {item.label}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
