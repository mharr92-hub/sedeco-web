import type { Metadata } from "next";
import {
  CANONICAL_ORIGIN,
  GUARANTEE_LINE,
  INSPECTION_SLA,
  OG_IMAGE,
  OG_IMAGE_URL,
} from "@/lib/site";

export const ADS_LANDING_SLUGS = [
  "filtraciones",
] as const;

export type AdsLandingSlug = (typeof ADS_LANDING_SLUGS)[number];

export const problemaValues = [
  "filtracion",
  "azotea",
  "fachada",
  "reparacion-estructural",
  "grietas",
  "piscina",
  "tanque",
  "pisos",
  "pintura",
  "mantenimiento",
  "otro",
] as const;

export type ProblemaValue = (typeof problemaValues)[number];

export const tipoPropiedadValues = [
  "casa",
  "apartamento",
  "ph",
  "comercio",
  "industria",
  "constructora",
  "otro",
] as const;

export type TipoPropiedadValue = (typeof tipoPropiedadValues)[number];

export type AdsFaq = { q: string; a: string };

export type AdsLanding = {
  slug: AdsLandingSlug;
  path: `/${AdsLandingSlug}`;
  source: `ads_${AdsLandingSlug}`;
  title: string;
  description: string;
  h1: string;
  cta: string;
  ctaSticky: string;
  defaultProblema: ProblemaValue;
  problemaOptions: ReadonlyArray<{ value: ProblemaValue; label: string }>;
  whatsappMessage: string;
  thankYouWhatsapp: string;
  problemTitle: string;
  problemBody: string;
  problemBullets: [string, string, string];
  productIntro: string;
  finalSupport: string;
  faqs: AdsFaq[];
  serviceType: string;
};

const SUBHEAD =
  "Inspeccionamos, identificamos el origen y aplicamos el sistema adecuado para tu estructura.";

export const ADS_SUBHEAD = SUBHEAD;

export const ADS_EYEBROW = "IMPERMEABILIZACIÓN Y FILTRACIONES · PANAMÁ";

export const ADS_MICROCOPY =
  "Cuéntanos qué está pasando y evaluamos tu caso.";

export const ADS_POSITIONING = "Primero diagnosticamos. Después el sistema correcto.";

export const ADS_PILLARS = [
  "DIAGNÓSTICO",
  "INGENIERÍA",
  "SISTEMA",
  "EJECUCIÓN",
] as const;

export const ADS_STEPS = [
  {
    title: "Inspeccionamos",
    body: "Revisamos la estructura, los puntos húmedos y el sustrato. No empezamos por el químico.",
  },
  {
    title: "Origen",
    body: "Una mancha en el cielo raso no siempre nace ahí. Buscamos por dónde entra el agua.",
  },
    {
      title: "Reparamos",
      body: "Grietas, juntas y fallos de sello se atienden antes de impermeabilizar encima.",
    },
  {
    title: "Impermeabilizamos",
    body: "Elegimos el sistema según el material: concreto, zinc, fachada u otro sustrato.",
  },
  {
    title: "Verificamos",
    body: "Entregamos el trabajo con respaldo escrito: garantía por escrito según sistema y alcance.",
  },
] as const;

export const SUBSTRATE_BLOCKS = [
  {
    title: "Concreto o acero expuesto",
    body: "Ghostshield® / LITHI TEK 9500. No se aplica sobre zinc, metal de techo ni membranas.",
  },
  {
    title: "Grietas",
    body: "Primero se identifica si la grieta está activa. Luego se repara y se sella el sustrato correcto.",
  },
  {
    title: "Juntas en zinc",
    body: "SiliconFlex Lanco 20 Años es el nombre del producto para juntas. No es un plazo de garantía de SEDECO.",
  },
  {
    title: "Azoteas y techos de zinc o metal",
    body: "HS 3200 Series (Progressive Materials) es el sistema principal para cubiertas de zinc o metal.",
  },
  {
    title: "Fachadas / verticales",
    body: "LANCO DRY-COAT cuando el trabajo es vertical. El concreto expuesto de fachada se evalúa aparte.",
  },
  {
    title: "Piscinas y tanques",
    body: "Trabajamos con sistemas Sika según el vaso o el tanque. El diagnóstico define el producto.",
  },
] as const;

export const SERVICE_NEED_CARDS = [
  {
    href: "/filtraciones",
    title: "Filtraciones",
    when: "Cuando el agua aparece en un apartamento, PH o local y no está claro de dónde entra.",
  },
  {
    href: "/impermeabilizacion-panama",
    title: "Azoteas y losas",
    when: "Cuando el último piso se moja, la losa está fisurada o el techo ya no contiene la lluvia.",
  },
  {
    href: "/impermeabilizacion-fachadas",
    title: "Fachadas",
    when: "Cuando hay manchas verticales, humedad en muros o uniones de ventanas en altura.",
  },
  {
    href: "/pisos-industriales-panama",
    title: "Pisos industriales",
    when: "Cuando la superficie es concreto o acero expuesto y necesita un sellado, no una pintura.",
  },
  {
    href: "/impermeabilizacion-panama",
    title: "Impermeabilización integral",
    when: "Cuando hay más de un frente: azotea, fachada, juntas o un edificio completo.",
  },
] as const;

export const PATCH_VS_METHOD = {
  patchTitle: "Parche",
  methodTitle: "Método SEDECO",
  rows: [
    {
      patch: "Pintar o recubrir donde se ve la mancha.",
      method: "Inspeccionar hasta encontrar el origen del agua.",
    },
    {
      patch: "Usar el mismo producto en concreto, zinc y fachada.",
      method: "Elegir el sistema según el sustrato y el daño real.",
    },
    {
      patch: "Tapear y esperar a que la próxima lluvia confirme si funcionó.",
      method: "Reparar, impermeabilizar y verificar antes de dar por cerrado el caso.",
    },
    {
      patch: "Promesas genéricas de duración.",
      method: `Documentar la ${GUARANTEE_LINE}.`,
    },
  ],
} as const;

const SHARED_FAQS: AdsFaq[] = [
  {
    q: "¿Ustedes cotizan sin ver el sitio?",
    a: "No. Una filtración o una azotea no se cotiza de oído. Primero inspeccionamos, identificamos el origen y le proponemos el sistema correcto.",
  },
  {
    q: "¿Qué garantía ofrecen?",
    a: `Ofrecemos ${GUARANTEE_LINE}. Aplican términos y condiciones según sistema y alcance contratado.`,
  },
  {
    q: "¿En cuánto tiempo responden?",
    a: `${INSPECTION_SLA} Si el caso es urgente, puede escribirnos por WhatsApp al +507 6550-8320.`,
  },
  {
    q: "¿LithiTek 9500 sirve para techos de zinc?",
    a: "No. Ghostshield / LITHI TEK 9500 es solo para concreto o acero expuesto. Nunca sobre zinc, metal de techo ni membranas. En cubiertas de zinc o metal el sistema principal es HS 3200 Series (Progressive Materials). Para juntas en zinc usamos SiliconFlex Lanco 20 Años, que es el nombre del producto.",
  },
  {
    q: "¿Puedo enviar fotos por WhatsApp?",
    a: "Sí. Al enviar el formulario lo llevamos a una página de confirmación con un enlace de WhatsApp (+507 6550-8320) para enviar fotos. Las fotos no sustituyen la inspección, pero ayudan a preparar la visita.",
  },
];

export const adsLandings: Record<AdsLandingSlug, AdsLanding> = {
  filtraciones: {
    slug: "filtraciones",
    path: "/filtraciones",
    source: "ads_filtraciones",
    title: "Filtraciones en Panamá: encontramos el origen antes de reparar",
    description:
      "¿Filtración en su apartamento o PH en Panamá? Encontramos el origen del agua antes de reparar. Diagnóstico en Ciudad de Panamá y área metro.",
    h1: "¿Tienes una filtración en Panamá? Encontramos el origen antes de reparar.",
    cta: "Solicitar inspección",
    ctaSticky: "Solicitar inspección",
    defaultProblema: "filtracion",
    problemaOptions: [
      { value: "filtracion", label: "Filtración" },
      { value: "azotea", label: "Azotea" },
      { value: "fachada", label: "Fachada" },
      { value: "grietas", label: "Grietas" },
      { value: "piscina", label: "Piscina" },
      { value: "tanque", label: "Tanque" },
      { value: "otro", label: "Otro" },
    ],
    whatsappMessage:
      "Hola, tengo una filtración y quiero que encuentren el origen antes de reparar.",
    thankYouWhatsapp:
      "Hola, solicité revisión de una filtración. Les envío fotos de las manchas y del área afectada.",
    problemTitle: "Una filtración no siempre entra por donde aparece",
    problemBody:
      "La mancha en su sala o recámara es el síntoma. El origen puede estar en la losa, en una junta de fachada, en un sello de ventana o en un punto que no se ve desde el interior.",
    problemBullets: [
      "Ya se pintó o se tapó y la humedad volvió con la lluvia.",
      "No está claro si el agua viene de arriba, de un lado o de una instalación.",
      "El vecino de arriba o la azotea común pueden ser parte del camino del agua.",
    ],
    productIntro:
      "No todos los problemas de agua se resuelven con el mismo producto. Una filtración puede pedir reparación de grietas, sellado de concreto, un sistema de azotea o trabajo en fachada.",
    finalSupport:
      "Si su apartamento se está mojando, el siguiente paso es encontrar de dónde viene el agua — no volver a parchar la mancha.",
    serviceType: "Detección y reparación de filtraciones",
    faqs: [
      {
        q: "¿Van a mi apartamento aunque el origen esté en áreas comunes?",
        a: "Sí. Revisamos el síntoma en su unidad y, cuando aplica, las áreas que pueden estar alimentando la humedad: losa, fachada, juntas o azotea.",
      },
      {
        q: "¿Qué debo tener listo para la visita?",
        a: "Acceso al área manchada y, si puede, fotos de cómo se ve después de llover. Si es un PH, la administración puede facilitar azotea o fachada.",
      },
      {
        q: "¿Reparar la mancha interior resuelve la filtración?",
        a: "Casi nunca. El interior se seca cuando se cierra el origen. Por eso inspeccionamos primero y después elegimos el sistema.",
      },
      {
        q: "¿Trabajan filtraciones en PH del área metro?",
        a: "Sí. Atendemos filtraciones en Ciudad de Panamá, el área metro y Colón, en viviendas, PH y locales. La oficina está en RBS Tower, Punta Paitilla.",
      },
      ...SHARED_FAQS,
    ],
  },
};

export function getAdsLanding(slug: AdsLandingSlug): AdsLanding {
  return adsLandings[slug];
}

export function adsMetadata(landing: AdsLanding): Metadata {
  const url = `${CANONICAL_ORIGIN}${landing.path}`;
  return {
    title: { absolute: `${landing.title} · SEDECO Panamá` },
    description: landing.description,
    alternates: { canonical: url },
    openGraph: {
      title: landing.title,
      description: landing.description,
      url,
      locale: "es_PA",
      type: "website",
      siteName: "SEDECO Panamá",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: landing.title,
      description: landing.description,
      images: [OG_IMAGE_URL],
    },
    robots: { index: true, follow: true },
  };
}
