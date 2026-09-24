import type { Metadata } from "next";
import type { ProblemaValue } from "@/lib/data/ads-landings";
import {
  PROBLEMA_OPTION_CATALOG,
  type LeadPageContext,
  type ProblemaOption,
} from "@/lib/data/service-pages";
import type { ServiceIconName } from "@/components/site/service-icons";
import {
  CANONICAL_ORIGIN,
  localBusinessJsonLd,
  OG_IMAGE,
  OG_IMAGE_URL,
} from "@/lib/site";

/**
 * Marketing catalog of nine integral services.
 * Distinct from `services.ts` (azoteas, tanques, etc. under /servicios/[slug])
 * and from Ads landings (`/filtraciones`, `/impermeabilizacion-panama`, …).
 * `slug` is the value stored in public.leads.servicio.
 */
export const INTEGRAL_SERVICE_SLUGS = [
  "impermeabilizacion",
  "fachadas",
  "trabajos-en-altura",
  "guindolas",
  "lavado-drones",
  "pintura",
  "construccion",
  "obras-civiles",
  "electricidad",
] as const;

export type IntegralServiceSlug = (typeof INTEGRAL_SERVICE_SLUGS)[number];

export const INTEGRAL_HOME_TITLE = "Soluciones integrales para tus proyectos";

export const INTEGRAL_HOME_SUBTITLE =
  "Nueve frentes de trabajo para edificios, PH y obras en Panamá. La cotización sale de la inspección y la medición en sitio.";

export const INTEGRAL_PILLARS = [
  {
    title: "Calidad y seguridad",
    line: "Procedimientos de trabajo, equipo de protección y control en obra para intervenir edificios con orden.",
  },
  {
    title: "Profesionales especializados",
    line: "Equipo con experiencia en altura, fachadas, impermeabilización y obras civiles en Panamá.",
  },
  {
    title: "Soluciones a tu medida",
    line: "Cada propuesta sale de la inspección y de la medición del frente real, no de un paquete genérico.",
  },
] as const;

type Step = { title: "Inspección" | "Medición" | "Propuesta"; body: string };

export type IntegralService = {
  slug: IntegralServiceSlug;
  path: `/${IntegralServiceSlug}`;
  name: string;
  line: string;
  icon: ServiceIconName;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  sub: string;
  benefits: readonly [string, string, string];
  steps: readonly [Step, Step, Step];
  lead: LeadPageContext & { servicio: IntegralServiceSlug };
};

function options(...values: ProblemaValue[]): readonly ProblemaOption[] {
  return values.map((value) => ({
    value,
    label: PROBLEMA_OPTION_CATALOG[value],
  }));
}

function steps(inspeccion: string, medicion: string, propuesta: string): readonly [Step, Step, Step] {
  return [
    { title: "Inspección", body: inspeccion },
    { title: "Medición", body: medicion },
    { title: "Propuesta", body: propuesta },
  ];
}

function leadFor(
  slug: IntegralServiceSlug,
  label: string,
  defaultProblema: ProblemaValue,
  problemas: ProblemaValue[],
): LeadPageContext & { servicio: IntegralServiceSlug } {
  return {
    slug,
    path: `/${slug}`,
    source: `web_${slug}`,
    servicio: slug,
    cta: "Cotizar",
    ctaSticky: "Cotizar",
    defaultProblema,
    problemaOptions: options(...problemas),
    whatsappMessage: `Hola, quiero cotizar ${label} en Panamá.`,
    thankYouWhatsapp: `Hola, solicité una cotización de ${label} en sedeco.lat. Les envío fotos del frente de trabajo.`,
  };
}

const services: readonly IntegralService[] = [
  {
    slug: "impermeabilizacion",
    path: "/impermeabilizacion",
    name: "Impermeabilización",
    line: "Losas, fachadas, tanques y cubiertas con el sistema que corresponde al sustrato.",
    icon: "rollo-gota",
    metaTitle: "Impermeabilización en Panamá | SEDECO",
    metaDescription:
      "Impermeabilización en Panamá para losas, fachadas, tanques y cubiertas. Inspeccionamos el sustrato, medimos el frente y entregamos propuesta. Cotice.",
    h1: "Impermeabilización en Panamá para losas, fachadas y cubiertas.",
    sub: "Primero vemos por dónde entra el agua y sobre qué superficie hay que trabajar. El sistema y el alcance se definen después, por escrito.",
    benefits: [
      "Inspección del punto de entrada del agua antes de proponer un producto.",
      "Sistema según el sustrato: concreto, junta, cubierta o pared.",
      "Ejecución coordinada con la administración del edificio o la obra.",
    ],
    steps: steps(
      "Recorremos losas, fachadas, juntas y drenajes y registramos por dónde entra el agua.",
      "Medimos el frente real — horizontal, vertical o ambos — para cotizar ese alcance.",
      "Entregamos el sistema recomendado, el alcance y las condiciones por escrito.",
    ),
    lead: leadFor("impermeabilizacion", "impermeabilización", "azotea", [
      "azotea",
      "fachada",
      "tanque",
      "piscina",
      "grietas",
      "otro",
    ]),
  },
  {
    slug: "fachadas",
    path: "/fachadas",
    name: "Reparación de fachadas",
    line: "Grietas, repellos, sellos y pintura en la envolvente del edificio.",
    icon: "edificio",
    metaTitle: "Reparación de fachadas en Panamá | SEDECO",
    metaDescription:
      "Reparación de fachadas en Panamá: grietas, repellos, sellos y pintura en altura. Inspección, medición del frente y propuesta por escrito. Cotice.",
    h1: "Reparación de fachadas en Panamá, con acceso en altura.",
    sub: "Reparamos la envolvente del edificio: grietas, repellos sueltos, sellos de ventanas y, cuando corresponde, la pintura. El acceso se define en la visita.",
    benefits: [
      "Diagnóstico de grietas, repellos desprendidos y sellos antes de intervenir.",
      "Trabajo en altura con el equipo de acceso que el frente permita.",
      "Coordinación con administración y residentes mientras dura la bajada.",
    ],
    steps: steps(
      "Revisamos la fachada: grietas, humedad, repellos y uniones de ventanas.",
      "Medimos paños, altura y puntos de anclaje para definir el acceso y el alcance.",
      "Proponemos la reparación, el sistema de acceso y el orden de los trabajos.",
    ),
    lead: leadFor("fachadas", "reparación de fachadas", "fachada", [
      "fachada",
      "grietas",
      "pintura",
      "otro",
    ]),
  },
  {
    slug: "trabajos-en-altura",
    path: "/trabajos-en-altura",
    name: "Trabajos en altura con cuerdas",
    line: "Acceso por cuerdas para inspección, reparación y mantenimiento de fachadas.",
    icon: "cuerdas",
    metaTitle: "Trabajos en altura en Panamá | SEDECO",
    metaDescription:
      "Trabajos en altura con cuerdas en Panamá para inspección, sellos y mantenimiento de fachadas. Visitamos, medimos el acceso y cotizamos el alcance.",
    h1: "Trabajos en altura con cuerdas en edificios de Panamá.",
    sub: "Cuando el frente no admite una plataforma en todo el paño, el acceso por cuerdas permite inspeccionar, sellar o reparar puntos concretos.",
    benefits: [
      "Acceso a zonas donde una guindola no se apoya o no cabe.",
      "Procedimiento de trabajo en altura y equipo de protección en el descenso.",
      "Útil para inspección puntual, sellos, resanes y mantenimiento.",
    ],
    steps: steps(
      "Vemos el edificio, los anclajes posibles y el tipo de trabajo en la fachada.",
      "Medimos la altura y el número de descensos que exige el alcance.",
      "Entregamos la propuesta de acceso, el alcance técnico y las condiciones de obra.",
    ),
    lead: leadFor("trabajos-en-altura", "trabajos en altura con cuerdas", "fachada", [
      "fachada",
      "pintura",
      "grietas",
      "otro",
    ]),
  },
  {
    slug: "guindolas",
    path: "/guindolas",
    name: "Guindolas y equipos de elevación",
    line: "Plataformas suspendidas para intervenir fachadas de torres y edificios.",
    icon: "guindola",
    metaTitle: "Guindolas y elevación en Panamá | SEDECO",
    metaDescription:
      "Guindolas y equipos de elevación en Panamá para intervenir fachadas de edificios. Inspección del frente, medición y propuesta de acceso y alcance.",
    h1: "Guindolas y equipos de elevación para fachadas en Panamá.",
    sub: "Las plataformas suspendidas cubren frentes amplios de fachada: reparación, sellado, pintura o lavado, con el montaje coordinado con el edificio.",
    benefits: [
      "Plataforma para paños continuos, con desplazamiento controlado por la fachada.",
      "Montaje acordado con administración, techo y áreas comunes.",
      "Mismo equipo para el acceso y para el trabajo de fachada que se contrate.",
    ],
    steps: steps(
      "Revisamos la cubierta, los puntos de apoyo y el frente que hay que recorrer.",
      "Medimos ancho, altura y restricciones de montaje de la plataforma.",
      "Proponemos el equipo de elevación, el plazo de montaje y el alcance en fachada.",
    ),
    lead: leadFor("guindolas", "guindolas y equipos de elevación", "fachada", [
      "fachada",
      "pintura",
      "otro",
    ]),
  },
  {
    slug: "lavado-drones",
    path: "/lavado-drones",
    name: "Drones de lavado de edificios",
    line: "Lavado de fachadas con dron donde el acceso tradicional es limitado.",
    icon: "dron",
    metaTitle: "Lavado con drones en Panamá | SEDECO",
    metaDescription:
      "Lavado de edificios con drones en Panamá, para fachadas de acceso limitado. La visita define si aplica el dron, la cuerda o la guindola. Cotice.",
    h1: "Lavado de edificios con drones en Panamá.",
    sub: "El dron lava paños de fachada de difícil acceso. En la visita confirmamos si el frente se trabaja con dron, con cuerdas o con guindola.",
    benefits: [
      "Llegada a paños altos sin montar andamio en toda la fachada.",
      "Apto para mantenimiento de vidrio, concreto y revestimientos expuestos.",
      "La inspección decide el método: dron, cuerda o plataforma.",
    ],
    steps: steps(
      "Revisamos el material de fachada, la suciedad y los obstáculos de vuelo y de caída de agua.",
      "Medimos la superficie y las restricciones del predio para el equipo.",
      "Proponemos el método de lavado, el alcance y la coordinación con el edificio.",
    ),
    lead: leadFor("lavado-drones", "lavado de edificios con drones", "fachada", [
      "fachada",
      "pintura",
      "otro",
    ]),
  },
  {
    slug: "pintura",
    path: "/pintura",
    name: "Pintura",
    line: "Pintura de fachadas y áreas del edificio, con la superficie preparada antes.",
    icon: "rodillo",
    metaTitle: "Pintura de edificios en Panamá | SEDECO",
    metaDescription:
      "Pintura de edificios y fachadas en Panamá. Preparamos grietas y sellos antes de pintar. Inspección, medición del frente y propuesta. Solicite cotización.",
    h1: "Pintura de edificios y fachadas en Panamá.",
    sub: "No pintamos sobre humedad ni sobre grietas abiertas. Primero se prepara la superficie; después se define el sistema de pintura para ese frente.",
    benefits: [
      "Preparación de grietas, sellos y zonas húmedas antes de pintar.",
      "Sistema acorde a la exposición de la fachada y al clima de Panamá.",
      "Ejecución en altura cuando el frente no se alcanza desde el piso.",
    ],
    steps: steps(
      "Revisamos adherencia, humedad, grietas y el estado de sellos y repellos.",
      "Medimos los paños a pintar y lo que hay que reparar antes.",
      "Entregamos la propuesta de preparación, pintura y acceso, por escrito.",
    ),
    lead: leadFor("pintura", "pintura", "pintura", [
      "pintura",
      "fachada",
      "otro",
    ]),
  },
  {
    slug: "construccion",
    path: "/construccion",
    name: "Construcción",
    line: "Ejecución de obras con alcance, secuencia y control definidos en la propuesta.",
    icon: "casco",
    metaTitle: "Construcción de obras en Panamá | SEDECO",
    metaDescription:
      "Construcción en Panamá para proyectos de edificio y obra. Definimos alcance, secuencia y control en sitio. Inspección, medición y propuesta por escrito.",
    h1: "Construcción para proyectos en Panamá.",
    sub: "Ejecutamos obras cuyo alcance queda escrito antes de empezar: partidas, secuencia y quién responde en sitio.",
    benefits: [
      "Alcance definido por partidas, no por una lista abierta.",
      "Coordinación en sitio con el cliente, la administración o la obra.",
      "Control de avances durante la ejecución.",
    ],
    steps: steps(
      "Visitamos el predio o el edificio y entendemos el alcance que se busca.",
      "Medimos cantidades y restricciones de acceso, horario y vecinos.",
      "Entregamos una propuesta con partidas, secuencia y condiciones de obra.",
    ),
    lead: leadFor("construccion", "construcción", "otro", [
      "otro",
      "reparacion-estructural",
      "fachada",
    ]),
  },
  {
    slug: "obras-civiles",
    path: "/obras-civiles",
    name: "Obras civiles",
    line: "Albañilería, losas, repellos y adecuaciones en edificios y predios.",
    icon: "ladrillos",
    metaTitle: "Obras civiles en Panamá | SEDECO",
    metaDescription:
      "Obras civiles en Panamá: albañilería, repellos, losas y adecuaciones. Cuantificamos por partida tras la inspección y entregamos una propuesta clara.",
    h1: "Obras civiles en Panamá para edificios y predios.",
    sub: "Albañilería, resanes, repellos, losas y adecuaciones. Sirve como obra propia o como preparación antes de impermeabilizar o pintar.",
    benefits: [
      "Partidas de albañilería, repello y resane según lo que muestra la visita.",
      "Preparación del sustrato cuando después hay que proteger o pintar.",
      "Cuantificación para que la propuesta se pueda comparar.",
    ],
    steps: steps(
      "Revisamos el elemento: losa, muro, repello o adecuación solicitada.",
      "Medimos áreas y registramos lo que hay que demoler, reponer o nivelar.",
      "Entregamos la propuesta por partida, con el orden de ejecución.",
    ),
    lead: leadFor("obras-civiles", "obras civiles", "reparacion-estructural", [
      "reparacion-estructural",
      "grietas",
      "fachada",
      "otro",
    ]),
  },
  {
    slug: "electricidad",
    path: "/electricidad",
    name: "Reparaciones eléctricas",
    line: "Reparaciones eléctricas puntuales en edificios, áreas comunes y obras.",
    icon: "rayo",
    metaTitle: "Reparaciones eléctricas en Panamá | SEDECO",
    metaDescription:
      "Reparaciones eléctricas en Panamá para edificios, áreas comunes y obras. Revisamos el punto, medimos el alcance y entregamos una propuesta. Cotice.",
    h1: "Reparaciones eléctricas en edificios de Panamá.",
    sub: "Atendemos reparaciones puntuales en áreas comunes, fachadas y obras en curso. La visita delimita el punto y lo que hace falta intervenir.",
    benefits: [
      "Revisión del punto reportado antes de abrir o reemplazar.",
      "Reparaciones en áreas comunes, fachadas y frentes de obra.",
      "Coordinación con la administración para horarios y cortes.",
    ],
    steps: steps(
      "Revisamos el punto reportado y las condiciones del tablero o del circuito cercano.",
      "Medimos el alcance de la reparación: un punto, un tramo o un frente de obra.",
      "Entregamos la propuesta con el trabajo a ejecutar y la coordinación necesaria.",
    ),
    lead: leadFor("electricidad", "reparaciones eléctricas", "otro", ["otro"]),
  },
];

const bySlug = new Map(services.map((service) => [service.slug, service]));

export function getIntegralServices(): readonly IntegralService[] {
  return services;
}

export function getIntegralServiceBySlug(
  slug: string,
): IntegralService | undefined {
  return bySlug.get(slug as IntegralServiceSlug);
}

export function isIntegralServiceSlug(
  value: string,
): value is IntegralServiceSlug {
  return bySlug.has(value as IntegralServiceSlug);
}

export function isIntegralServicePath(value: string): boolean {
  return services.some((service) => service.path === value);
}

export function isIntegralServiceSource(value: string): boolean {
  return services.some((service) => service.lead.source === value);
}

/** One path segment, for example `/pintura`. Ignores nested routes. */
export function getIntegralServiceByPathname(
  pathname: string,
): IntegralService | undefined {
  const path = pathname.split("?")[0]?.split("#")[0] ?? "";
  const parts = path.split("/").filter(Boolean);
  if (parts.length !== 1) return undefined;
  return getIntegralServiceBySlug(parts[0] ?? "");
}

export const SERVICE_MENU = [
  ...services.map((service) => ({
    href: service.path,
    label: service.name,
  })),
  { href: "/filtraciones", label: "Filtraciones" },
] as const;

export function integralServiceMetadata(service: IntegralService): Metadata {
  const url = `${CANONICAL_ORIGIN}${service.path}`;
  return {
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url,
      locale: "es_PA",
      type: "website",
      siteName: "SEDECO Panamá",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
      images: [OG_IMAGE_URL],
    },
    robots: { index: true, follow: true },
  };
}

export function integralServiceJsonLd(service: IntegralService) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.name,
      serviceType: service.name,
      description: service.metaDescription,
      url: `${CANONICAL_ORIGIN}${service.path}`,
      areaServed: [
        { "@type": "City", name: "Ciudad de Panamá" },
        { "@type": "AdministrativeArea", name: "Área metro de Panamá" },
        { "@type": "City", name: "Colón" },
      ],
      provider: { "@id": `${CANONICAL_ORIGIN}/#localbusiness` },
    },
    localBusinessJsonLd(),
  ];
}
