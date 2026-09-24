import type { Metadata } from "next";
import {
  problemaValues,
  type ProblemaValue,
} from "@/lib/data/ads-landings";
import {
  CANONICAL_ORIGIN,
  localBusinessJsonLd,
  OG_IMAGE,
  OG_IMAGE_URL,
} from "@/lib/site";

export const SERVICE_CTA = "Solicitar inspección" as const;

export const LEAD_PAGE_SLUGS = [
  "impermeabilizacion-panama",
  "filtraciones",
  "impermeabilizacion-fachadas",
  "pisos-industriales-panama",
  "reparacion-estructural-panama",
  "pintura-edificios-panama",
  "mantenimiento-ph",
  "inspeccion-boroscopica",
] as const;

export type LeadPageSlug = (typeof LEAD_PAGE_SLUGS)[number];

export type ProblemaOption = {
  value: ProblemaValue;
  label: string;
};

export const PROBLEMA_OPTION_CATALOG: Record<
  (typeof problemaValues)[number],
  string
> = {
  filtracion: "Filtración",
  azotea: "Azotea / losa",
  fachada: "Fachada",
  "reparacion-estructural": "Reparación estructural",
  grietas: "Grietas",
  piscina: "Piscina",
  tanque: "Tanque",
  pisos: "Pisos industriales",
  pintura: "Pintura de fachada",
  mantenimiento: "Mantenimiento de PH",
  desague: "Desagüe",
  otro: "Otro",
};

function options(
  ...values: ProblemaValue[]
): readonly ProblemaOption[] {
  return values.map((value) => ({
    value,
    label: PROBLEMA_OPTION_CATALOG[value],
  }));
}

export const FILTRACIONES_PROBLEMA_OPTIONS = options(
  "filtracion",
  "azotea",
  "fachada",
  "grietas",
  "piscina",
  "tanque",
  "otro",
);

export type LeadPageContext = {
  slug: string;
  path: string;
  source: string;
  cta: string;
  ctaSticky: string;
  defaultProblema: ProblemaValue;
  problemaOptions: readonly ProblemaOption[];
  whatsappMessage: string;
  thankYouWhatsapp: string;
  /** Slug stored in public.leads.servicio. Absent on older landings. */
  servicio?: string;
};

/** Home inspection form. Same fields as Ads, stored as source web_home. */
export const HOME_LEAD: LeadPageContext = {
  slug: "home",
  path: "/",
  source: "web_home",
  cta: SERVICE_CTA,
  ctaSticky: SERVICE_CTA,
  defaultProblema: "filtracion",
  problemaOptions: options(
    "filtracion",
    "azotea",
    "fachada",
    "grietas",
    "pisos",
    "otro",
  ),
  whatsappMessage:
    "Hola, quiero una inspección para un problema de filtración.",
  thankYouWhatsapp:
    "Hola, solicité una inspección desde sedeco.lat. Les envío fotos del problema.",
};

export function analyticsFormName(landing: { source: string; slug: string }): string {
  return landing.source === "web_home" ? "home" : landing.slug;
}

export const HOW_IT_WORKS_STEPS = [
  {
    title: "Inspeccionamos",
    body: "Revisamos el sustrato, los puntos húmedos y el origen del agua. No empezamos por el químico.",
  },
  {
    title: "Diagnosticamos",
    body: "Definimos el frente de trabajo y el sistema correcto para esa superficie.",
  },
  {
    title: "Ejecutamos",
    body: "Aplicamos el sistema con control de calidad documentado y, en altura, con equipo propio.",
  },
  {
    title: "Garantizamos",
    body: "Entregamos con garantía por escrito según sistema y alcance contratado.",
  },
] as const;

export const SERVICE_TRUST_BAR =
  "JTIA · aplicador autorizado GHOSTSHIELD · distribuidor Progressive Materials · aplicador SIKA · póliza RC USD 250,000 · guindolas ZLP 630 EN 1808:2015" as const;

export const HOME_SERVICES_TITLE =
  "Construcción y restauración con un enfoque: que el agua no vuelva a entrar.";

export const HOME_SERVICES_SUBTITLE =
  "Diagnóstico, impermeabilización, fachadas en altura, pisos y reparación estructural. Un solo responsable de toda la cadena, con garantía por escrito.";

export const HOME_SERVICES_FOOTNOTE =
  "Remodelación de áreas comunes y azoteas sociales disponible para clientes en obra — consúltenos.";

export const HOME_SERVICE_CARDS = [
  {
    href: "/impermeabilizacion-panama",
    title: "Impermeabilización",
    line: "Azoteas, losas, fachadas, tanques y piscinas. Sistema según el sustrato, no un producto único.",
  },
  {
    href: "/filtraciones",
    title: "Diagnóstico de filtraciones",
    line: "Encontramos el origen del agua antes de reparar y lo entregamos en un informe técnico.",
  },
  {
    href: "/impermeabilizacion-fachadas",
    title: "Fachadas en altura",
    line: "Restauración, sellos y pintura con guindolas eléctricas propias certificadas. Llegamos donde otros no llegan.",
  },
  {
    href: "/pisos-industriales-panama",
    title: "Pisos industriales y comerciales",
    line: "Epóxicos, concreto pulido y sellado GHOSTSHIELD para bodegas, comercios y estacionamientos.",
  },
  {
    href: "/reparacion-estructural-panama",
    title: "Reparación estructural",
    line: "Losas, grietas, repellos y acero expuesto. Recuperamos la estructura antes de protegerla.",
  },
  {
    href: "/mantenimiento-ph",
    title: "Mantenimiento anual de PH",
    line: "Plan preventivo de azotea, fachada, juntas y drenajes para que la Junta no vuelva a pagar emergencias.",
  },
] as const;

/** IA / nav order: keep three core, then new pages with pisos first. */
export const SERVICE_NAV = [
  { href: "/impermeabilizacion-panama", label: "Impermeabilización" },
  { href: "/filtraciones", label: "Diagnóstico" },
  { href: "/impermeabilizacion-fachadas", label: "Fachadas en altura" },
  { href: "/pisos-industriales-panama", label: "Pisos industriales" },
  { href: "/reparacion-estructural-panama", label: "Reparación estructural" },
  { href: "/pintura-edificios-panama", label: "Pintura de edificios" },
  { href: "/mantenimiento-ph", label: "Mantenimiento PH" },
  { href: "/inspeccion-boroscopica", label: "Inspección boroscópica" },
] as const;

export type ServicePageRef = {
  name: string;
  place: string;
  scope: string;
};

export type ServicePage = LeadPageContext & {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  sub: string;
  bullets: [string, string, string];
  serviceType: string;
  kicker?: string;
  zincSection?: { title: string; body: string; note: string };
  refs?: readonly ServicePageRef[];
  adsCampaign: "core" | "later" | "never";
  /** When false, the offer page does not print a guarantee line. */
  showGuaranteeNote?: boolean;
  steps?: readonly { title: string; body: string }[];
};

export const servicePages: Record<
  Exclude<LeadPageSlug, "filtraciones">,
  ServicePage
> = {
  "impermeabilizacion-panama": {
    slug: "impermeabilizacion-panama",
    path: "/impermeabilizacion-panama",
    source: "ads_impermeabilizacion-panama",
    cta: SERVICE_CTA,
    ctaSticky: SERVICE_CTA,
    defaultProblema: "azotea",
    problemaOptions: options(
      "azotea",
      "fachada",
      "tanque",
      "piscina",
      "otro",
    ),
    whatsappMessage:
      "Hola, quiero solicitar una inspección de impermeabilización en Panamá.",
    thankYouWhatsapp:
      "Hola, solicité una inspección de impermeabilización. Les envío fotos del problema.",
    metaTitle: "Impermeabilización Panamá | SEDECO",
    metaDescription:
      "Impermeabilización de techos, azoteas, tanques y losas de concreto en Panamá. Diagnóstico en sitio y sistema según cada caso. Solicite inspección.",
    h1: "Impermeabilización en Panamá: el sistema correcto para cada superficie.",
    sub: "Azoteas, losas, fachadas, tanques y piscinas. Primero diagnosticamos el sustrato; después aplicamos el sistema y lo garantizamos por escrito.",
    bullets: [
      "Concreto: sellado penetrante GHOSTSHIELD LITHI-TEK 9500 (solo sobre concreto o acero expuesto).",
      "Techos de zinc y metal: silicona líquida HS 3200 Series (Progressive Materials) o su homólogo Silicona 1000 de Lanco; juntas con SiliconFlex Lanco 20 Años.",
      "Superficies verticales: LANCO DRY-COAT y sistemas según diagnóstico.",
    ],
    serviceType: "Impermeabilización",
    zincSection: {
      title: "Techos de zinc y sellado de juntas",
      body: "Techos de zinc y metal: silicona líquida HS 3200 Series (Progressive Materials) o su homólogo Silicona 1000 de Lanco; juntas con SiliconFlex Lanco 20 Años. SiliconFlex Lanco 20 Años es el nombre del producto, no un plazo de garantía de SEDECO.",
      note: "GHOSTSHIELD LITHI-TEK 9500 no se aplica sobre zinc, metal de techo ni membranas — solo sobre concreto o acero expuesto.",
    },
    adsCampaign: "core",
  },
  "impermeabilizacion-fachadas": {
    slug: "impermeabilizacion-fachadas",
    path: "/impermeabilizacion-fachadas",
    source: "ads_impermeabilizacion-fachadas",
    cta: SERVICE_CTA,
    ctaSticky: SERVICE_CTA,
    defaultProblema: "fachada",
    problemaOptions: options("fachada", "pintura", "otro"),
    whatsappMessage:
      "Hola, quiero solicitar una inspección de fachada en altura en Panamá.",
    thankYouWhatsapp:
      "Hola, solicité una inspección de fachada en altura. Les envío fotos de las manchas o uniones.",
    metaTitle: "Restauración e impermeabilización de fachadas",
    metaDescription:
      "Restauración e impermeabilización de fachadas en altura en Panamá: sellado de grietas, juntas y ventanas. Solicite su inspección técnica.",
    h1: "Restauración e impermeabilización de fachadas en altura.",
    sub: "Reparación de grietas y repellos, sellos de ventanas y juntas, impermeabilización y pintura. Guindolas eléctricas ZLP 630 certificadas: no dependemos de terceros para llegar a su fachada.",
    bullets: [
      "+100,000 m² intervenidos en torres de Ciudad de Panamá.",
      "Personal certificado en trabajo en altura, con seguro de vida y póliza de responsabilidad civil.",
      "Informe fotográfico por bajada y control de calidad documentado.",
    ],
    serviceType: "Restauración de fachadas en altura",
    adsCampaign: "core",
  },
  "pisos-industriales-panama": {
    slug: "pisos-industriales-panama",
    path: "/pisos-industriales-panama",
    source: "ads_pisos-industriales-panama",
    cta: SERVICE_CTA,
    ctaSticky: SERVICE_CTA,
    defaultProblema: "pisos",
    problemaOptions: options("pisos", "otro"),
    whatsappMessage:
      "Hola, quiero solicitar una inspección de pisos industriales en Panamá.",
    thankYouWhatsapp:
      "Hola, solicité una inspección de pisos industriales. Les envío fotos del sustrato.",
    metaTitle: "Pisos industriales Panamá | SEDECO",
    metaDescription:
      "Sellado y sistemas para pisos industriales de concreto en Panamá: bodegas, plantas y estacionamientos. Solicite su inspección técnica.",
    h1: "Pisos que aguantan la operación: epóxicos, concreto pulido y sellado industrial.",
    sub: "Para bodegas, plantas, supermercados, estacionamientos y comercios. Preparación mecánica del sustrato, sistema según el uso y garantía por escrito.",
    bullets: [
      "Sellado penetrante GHOSTSHIELD para tráfico pesado, derrames y humedad por losa.",
      "Epóxicos y recubrimientos de alto tránsito con señalización incluida.",
      "Ejecución por fases o en horario nocturno para no detener su operación.",
    ],
    serviceType: "Pisos industriales y comerciales",
    kicker: "100% B2B",
    refs: [
      {
        name: "Supermercados XTRA",
        place: "Panamá",
        scope: "Ejecución de sistemas de impermeabilización integrales.",
      },
      {
        name: "Hospital Manuel Amador Guerrero",
        place: "Colón (MINSA / IMED)",
        scope:
          "Impermeabilización de cubiertas y muros perimetrales en recinto hospitalario.",
      },
    ],
    adsCampaign: "core",
  },
  "reparacion-estructural-panama": {
    slug: "reparacion-estructural-panama",
    path: "/reparacion-estructural-panama",
    source: "ads_reparacion-estructural-panama",
    cta: SERVICE_CTA,
    ctaSticky: SERVICE_CTA,
    defaultProblema: "reparacion-estructural",
    problemaOptions: options("reparacion-estructural", "grietas", "otro"),
    whatsappMessage:
      "Hola, quiero solicitar una inspección de reparación estructural en Panamá.",
    thankYouWhatsapp:
      "Hola, solicité una inspección de reparación estructural. Les envío fotos de la losa o el acero expuesto.",
    metaTitle: "Reparación estructural Panamá | SEDECO",
    metaDescription:
      "Reparación estructural de concreto en Panamá: grietas, acero expuesto y elementos dañados. Diagnóstico técnico en sitio. Solicite inspección.",
    h1: "Reparación estructural: recuperamos la losa antes de protegerla.",
    sub: "Losas, grietas, repellos desprendidos y acero expuesto. Evaluación documentada, reparación con morteros estructurales y protección final del concreto.",
    bullets: [
      "Diagnóstico con registro fotográfico y cuantificación por rubro.",
      "Reparación de acero expuesto y pasivación antes del resane.",
      "Cierre con sellado penetrante para que el daño no regrese.",
    ],
    serviceType: "Reparación estructural",
    adsCampaign: "later",
  },
  "pintura-edificios-panama": {
    slug: "pintura-edificios-panama",
    path: "/pintura-edificios-panama",
    source: "ads_pintura-edificios-panama",
    cta: SERVICE_CTA,
    ctaSticky: SERVICE_CTA,
    defaultProblema: "pintura",
    problemaOptions: options("pintura", "fachada", "otro"),
    whatsappMessage:
      "Hola, quiero solicitar una inspección de pintura de edificios en Panamá.",
    thankYouWhatsapp:
      "Hola, solicité una inspección de pintura de edificios. Les envío fotos de la fachada.",
    metaTitle: "Pintura de edificios Panamá | SEDECO",
    metaDescription:
      "Pintura de edificios y torres en Panamá con trabajo en altura. Reparamos grietas y sellos de la fachada antes de pintar. Solicite su inspección.",
    h1: "Pintura de edificios en altura, con la fachada reparada primero.",
    sub: "No pintamos sobre grietas ni humedad: reparamos, sellamos y después pintamos. Por eso la pintura dura.",
    bullets: [
      "Guindolas propias certificadas y personal asegurado.",
      "Sellos de ventanas y juntas incluidos en el alcance cuando el diagnóstico lo indica.",
      "Coordinación completa con administración y residentes.",
    ],
    serviceType: "Pintura de edificios en altura",
    adsCampaign: "later",
  },
  "mantenimiento-ph": {
    slug: "mantenimiento-ph",
    path: "/mantenimiento-ph",
    source: "ads_mantenimiento-ph",
    cta: SERVICE_CTA,
    ctaSticky: SERVICE_CTA,
    defaultProblema: "mantenimiento",
    problemaOptions: options("mantenimiento", "azotea", "fachada", "otro"),
    whatsappMessage:
      "Hola, quiero consultar el plan de mantenimiento anual para un PH en Panamá.",
    thankYouWhatsapp:
      "Hola, solicité información del plan de mantenimiento anual para PH. Les cuento el tamaño del edificio.",
    metaTitle: "Mantenimiento de PH Panamá | SEDECO",
    metaDescription:
      "Mantenimiento de PH y edificios en Panamá: filtraciones, fachadas, azoteas y concreto. Plan preventivo para administradores. Solicite inspección.",
    h1: "Mantenimiento anual para su PH: prevenir cuesta menos que la emergencia.",
    sub: "Inspección programada de azotea, fachada, juntas, sellos y drenajes, con informe anual para la Junta Directiva y prioridad de atención.",
    bullets: [
      "Calendario de inspecciones y limpieza de drenajes antes de la temporada de lluvia.",
      "Informe fotográfico anual con presupuesto preventivo para la asamblea.",
      "Tarifa fija mensual según tamaño del edificio (consultar).",
    ],
    serviceType: "Mantenimiento anual de PH",
    adsCampaign: "never",
  },
  "inspeccion-boroscopica": {
    slug: "inspeccion-boroscopica",
    path: "/inspeccion-boroscopica",
    source: "ads_inspeccion-boroscopica",
    cta: SERVICE_CTA,
    ctaSticky: SERVICE_CTA,
    defaultProblema: "desague",
    problemaOptions: options("desague", "filtracion", "otro"),
    whatsappMessage:
      "Hola, quiero una inspección con cámara boroscópica en un desagüe.",
    thankYouWhatsapp:
      "Hola, solicité una inspección con cámara boroscópica. Les cuento en qué desagüe está el problema.",
    metaTitle: "Inspección boroscópica desagües | SEDECO",
    metaDescription:
      "Inspección boroscópica con cámara en tuberías de desagüe en Panamá. Ubicamos obstrucciones y fallas y entregamos informe. Solicite inspección.",
    h1: "Inspección con cámara boroscópica en desagües",
    sub: "Recorremos el desagüe con cámara para ver dónde entra o se detiene el agua. El resultado es un diagnóstico con informe, antes de abrir o reparar.",
    bullets: [
      "Cámara por el ducto, sin adivinar el origen solo desde el interior.",
      "Informe de lo observado para decidir el siguiente paso.",
      "Coordinamos la visita por WhatsApp al +507 6550-8320.",
    ],
    serviceType: "Inspección boroscópica de desagües",
    adsCampaign: "later",
    showGuaranteeNote: false,
    steps: [
      {
        title: "Acceso",
        body: "Coordinamos la bajada al desagüe o al punto donde se puede introducir la cámara.",
      },
      {
        title: "Cámara",
        body: "Recorremos el ducto con la cámara boroscópica y registramos lo que se ve.",
      },
      {
        title: "Informe",
        body: "Entregamos el diagnóstico en un informe para decidir si hace falta abrir o reparar.",
      },
    ],
  },
};

export function getServicePage(
  slug: Exclude<LeadPageSlug, "filtraciones">,
): ServicePage {
  return servicePages[slug];
}

export function getAllServicePages(): ServicePage[] {
  return SERVICE_NAV.filter((item) => item.href !== "/filtraciones").map(
    (item) => servicePages[item.href.slice(1) as Exclude<LeadPageSlug, "filtraciones">],
  );
}

export function isLeadPageSlug(value: string | null): value is LeadPageSlug {
  return Boolean(value && (LEAD_PAGE_SLUGS as readonly string[]).includes(value));
}

export function servicePageMetadata(page: ServicePage): Metadata {
  const url = `${CANONICAL_ORIGIN}${page.path}`;
  return {
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url,
      locale: "es_PA",
      type: "website",
      siteName: "SEDECO Panamá",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
      images: [OG_IMAGE_URL],
    },
    robots: { index: true, follow: true },
  };
}

export function serviceJsonLd(page: ServicePage) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.serviceType,
      description: page.metaDescription,
      url: `${CANONICAL_ORIGIN}${page.path}`,
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
