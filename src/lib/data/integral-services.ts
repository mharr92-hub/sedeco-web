import type { Metadata } from "next";
import type { ProblemaValue } from "@/lib/data/ads-landings";
import {
  PROBLEMA_OPTION_CATALOG,
  SERVICE_CTA,
  SERVICE_CTA_STICKY,
  type LeadPageContext,
  type ProblemaOption,
} from "@/lib/data/service-pages";
import type { ServiceIconName } from "@/components/site/service-icons";
import {
  whatsappServiceMessage,
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
/** Orden de las tarjetas en la home y en /servicios. */
export const INTEGRAL_SERVICE_SLUGS = [
  "impermeabilizacion",
  "fachadas",
  "inspecciones-filtraciones",
  "trabajos-en-altura",
  "guindolas",
  "pintura",
  "obras-civiles",
  "electricidad",
  "plomeria",
  "ventanas-puertas",
  "soldadura",
  "albanileria",
  "construccion",
  "diseno-interiores",
  "mantenimiento-general",
] as const;

export type IntegralServiceSlug = (typeof INTEGRAL_SERVICE_SLUGS)[number];

export const INTEGRAL_HOME_TITLE = "Servicios";

export const INTEGRAL_HOME_SUBTITLE =
  "Quince frentes de trabajo para edificios, PH y obras en Panamá. La cotización sale de la inspección y la medición en sitio.";

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
    cta: SERVICE_CTA,
    ctaSticky: SERVICE_CTA_STICKY,
    defaultProblema,
    problemaOptions: options(...problemas),
    whatsappMessage: whatsappServiceMessage(label),
    thankYouWhatsapp: `Hola, solicité una cotización de ${label} en sedeco.lat. Les envío fotos del frente de trabajo.`,
  };
}

const services: readonly IntegralService[] = [
  {
    slug: "impermeabilizacion",
    path: "/impermeabilizacion",
    name: "Impermeabilización de techos",
    line: "Losas, fachadas y cubiertas con el sistema que corresponde al sustrato. Incluye piscinas y tanques.",
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
    lead: leadFor("impermeabilizacion", "impermeabilización de techos", "azotea", [
      "azotea",
      "fachada",
      "grietas",
      "otro",
    ]),
  },
  {
    slug: "fachadas",
    path: "/fachadas",
    name: "Reparación de fachadas (sellado, protección y mantenimiento)",
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
    name: "Alquiler, transporte e instalación de guindolas y andamios",
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
    slug: "pintura",
    path: "/pintura",
    name: "Pintura residencial, comercial e industrial",
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
    name: "Renovación de viviendas y oficinas",
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
  {
    slug: "inspecciones-filtraciones",
    path: "/inspecciones-filtraciones",
    name: "Inspecciones de filtraciones con termografía y boroscopía",
    line: "Ubicamos por dónde entra el agua con cámara termográfica y boroscopio antes de picar.",
    icon: "lupa",
    metaTitle: "Inspección de filtraciones en Panamá | SEDECO",
    metaDescription:
      "Inspección de filtraciones en Panamá con cámara termográfica y boroscopio. Ubicamos el origen del agua y entregamos informe fotográfico antes de reparar.",
    h1: "Inspección de filtraciones con termografía y boroscopía en Panamá.",
    sub: "Buscamos el punto de entrada del agua antes de abrir nada. El informe dice qué se encontró y qué conviene intervenir.",
    benefits: [
      "Cámara termográfica para ver humedad detrás del acabado sin romperlo.",
      "Boroscopio en ductos y cavidades para revisar lo que no queda a la vista.",
      "Informe fotográfico de lo observado antes de proponer una reparación.",
    ],
    steps: steps(
      "Recorremos el área afectada y las plantas superiores para acotar el origen.",
      "Registramos los puntos con termografía y boroscopio donde hace falta.",
      "Entregamos el informe con lo observado y el alcance recomendado.",
    ),
    lead: leadFor(
      "inspecciones-filtraciones",
      "inspección de filtraciones",
      "filtracion",
      ["filtracion", "azotea", "fachada", "desague", "otro"],
    ),
  },
  {
    slug: "plomeria",
    path: "/plomeria",
    name: "Plomería general",
    line: "Reparación de fugas, desagües y redes sanitarias en edificios, PH y viviendas.",
    icon: "tuberia",
    metaTitle: "Plomería en Panamá para edificios y PH | SEDECO",
    metaDescription:
      "Plomería general en Panamá: fugas, desagües y redes sanitarias en edificios, PH y viviendas. Revisamos el punto real de la falla y cotizamos ese alcance.",
    h1: "Plomería general en Panamá para edificios, PH y viviendas.",
    sub: "Revisamos dónde está la fuga o la obstrucción real antes de intervenir, para no picar de más.",
    benefits: [
      "Revisión del punto de falla antes de abrir pared o piso.",
      "Trabajo coordinado con la administración cuando afecta áreas comunes.",
      "Alcance y materiales definidos por escrito antes de empezar.",
    ],
    steps: steps(
      "Revisamos el recorrido de la red y ubicamos el punto de la falla.",
      "Medimos el tramo a intervenir y los puntos de acceso necesarios.",
      "Entregamos el alcance, los materiales y las condiciones por escrito.",
    ),
    lead: leadFor("plomeria", "plomería general", "desague", [
      "desague",
      "filtracion",
      "otro",
    ]),
  },
  {
    slug: "ventanas-puertas",
    path: "/ventanas-puertas",
    name: "Ventanas y puertas",
    line: "Sellado, ajuste y reemplazo de ventanas y puertas en edificios y viviendas.",
    icon: "ventana",
    metaTitle: "Ventanas y puertas en Panamá | SEDECO",
    metaDescription:
      "Instalación, sellado y ajuste de ventanas y puertas en Panamá. Revisamos juntas y perfiles donde entra agua o aire y cotizamos el frente medido en sitio.",
    h1: "Ventanas y puertas en Panamá: sellado, ajuste y reemplazo.",
    sub: "Muchas filtraciones de fachada entran por la junta de la ventana. Revisamos el perfil y el sello antes de decidir.",
    benefits: [
      "Revisión de juntas y perfiles donde entra agua o aire.",
      "Sellado con el material que corresponde al perfil y al clima costero.",
      "Reemplazo cuando el perfil ya no admite reparación.",
    ],
    steps: steps(
      "Revisamos juntas, perfiles y drenajes de cada ventana o puerta afectada.",
      "Contamos y medimos las unidades a intervenir para cotizar ese frente.",
      "Entregamos la solución recomendada por unidad y las condiciones.",
    ),
    lead: leadFor("ventanas-puertas", "ventanas y puertas", "fachada", [
      "fachada",
      "filtracion",
      "otro",
    ]),
  },
  {
    slug: "soldadura",
    path: "/soldadura",
    name: "Soldadura y estructuras metálicas",
    line: "Barandas, escaleras, soportes y estructuras metálicas en obra y en altura.",
    icon: "soldadura",
    metaTitle: "Soldadura y estructuras metálicas en Panamá | SEDECO",
    metaDescription:
      "Soldadura y estructuras metálicas en Panamá: barandas, escaleras y soportes. Revisamos el estado del metal y cotizamos el alcance medido en sitio.",
    h1: "Soldadura y estructuras metálicas en Panamá.",
    sub: "Revisamos el estado real del metal, incluida la corrosión que no se ve desde abajo, antes de proponer.",
    benefits: [
      "Revisión de corrosión y anclajes antes de intervenir.",
      "Trabajo en altura con el equipo de acceso que corresponda.",
      "Protección del metal una vez terminada la intervención.",
    ],
    steps: steps(
      "Revisamos la estructura, sus anclajes y el grado de corrosión.",
      "Medimos los metros o las unidades a intervenir.",
      "Entregamos el alcance, el acabado propuesto y las condiciones.",
    ),
    lead: leadFor(
      "soldadura",
      "soldadura y estructuras metálicas",
      "reparacion-estructural",
      ["reparacion-estructural", "otro"],
    ),
  },
  {
    slug: "albanileria",
    path: "/albanileria",
    name: "Albañilería",
    line: "Repellos, resanes, mampostería y reparación de elementos de concreto.",
    icon: "ladrillos",
    metaTitle: "Albañilería en Panamá para edificios y PH | SEDECO",
    metaDescription:
      "Albañilería en Panamá: repellos, resanes, mampostería y reparación de concreto en edificios, PH y viviendas. Cotizamos sobre el frente medido en sitio.",
    h1: "Albañilería en Panamá para edificios, PH y viviendas.",
    sub: "El resane sostiene lo que viene después. Revisamos el sustrato antes de repellar o impermeabilizar encima.",
    benefits: [
      "Revisión del sustrato antes de resanar o repellar.",
      "Reparación de elementos de concreto y mampostería.",
      "Base preparada para el acabado o la impermeabilización posterior.",
    ],
    steps: steps(
      "Revisamos el estado del repello, la mampostería y el concreto a la vista.",
      "Medimos el área real a intervenir para cotizar ese alcance.",
      "Entregamos el procedimiento, el alcance y las condiciones por escrito.",
    ),
    lead: leadFor("albanileria", "albañilería", "grietas", [
      "grietas",
      "reparacion-estructural",
      "otro",
    ]),
  },
  {
    slug: "diseno-interiores",
    path: "/diseno-interiores",
    name: "Diseño de interiores",
    line: "Distribución, acabados y detalle de interiores para vivienda y oficina.",
    icon: "regla",
    metaTitle: "Diseño de interiores en Panamá | SEDECO",
    metaDescription:
      "Diseño de interiores en Panamá para vivienda y oficina: distribución, acabados y detalle. Partimos del levantamiento del espacio real, no de un paquete.",
    h1: "Diseño de interiores en Panamá para vivienda y oficina.",
    sub: "Partimos del levantamiento del espacio real y de cómo se usa, no de un paquete cerrado.",
    benefits: [
      "Levantamiento del espacio antes de proponer distribución.",
      "Selección de acabados coordinada con la obra que los instala.",
      "Alcance y entregables definidos por escrito.",
    ],
    steps: steps(
      "Visitamos el espacio y levantamos medidas, instalaciones y condicionantes.",
      "Definimos el alcance del diseño y los entregables con el cliente.",
      "Entregamos la propuesta de diseño, los acabados y las condiciones.",
    ),
    lead: leadFor("diseno-interiores", "diseño de interiores", "otro", ["otro"]),
  },
  {
    slug: "mantenimiento-general",
    path: "/mantenimiento-general",
    name: "Mantenimiento general",
    line: "Programas de mantenimiento para PH, oficinas y edificios, con frentes coordinados.",
    icon: "llave",
    metaTitle: "Mantenimiento general de edificios en Panamá | SEDECO",
    metaDescription:
      "Mantenimiento general para PH, oficinas y edificios en Panamá. Un solo interlocutor para los distintos frentes, con alcance y periodicidad por escrito.",
    h1: "Mantenimiento general de edificios y PH en Panamá.",
    sub: "Un solo interlocutor para los frentes que el edificio necesita, con el alcance y la periodicidad por escrito.",
    benefits: [
      "Un interlocutor para los distintos frentes del edificio.",
      "Alcance y periodicidad acordados por escrito.",
      "Coordinación con la administración y con los residentes.",
    ],
    steps: steps(
      "Recorremos el edificio y levantamos los frentes que requieren atención.",
      "Definimos alcance y periodicidad según lo observado.",
      "Entregamos el programa de mantenimiento y las condiciones.",
    ),
    lead: leadFor("mantenimiento-general", "mantenimiento general", "mantenimiento", [
      "mantenimiento",
      "otro",
    ]),
  },
];

const bySlug = new Map(services.map((service) => [service.slug, service]));

/** Ordered by INTEGRAL_SERVICE_SLUGS, which is what the cards follow. */
const orderedServices: readonly IntegralService[] = INTEGRAL_SERVICE_SLUGS.map(
  (slug) => {
    const service = services.find((item) => item.slug === slug);
    if (!service) throw new Error(`Servicio sin definir: ${slug}`);
    return service;
  },
);

export function getIntegralServices(): readonly IntegralService[] {
  return orderedServices;
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
