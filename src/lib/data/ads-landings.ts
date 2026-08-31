import type { Metadata } from "next";
import {
  GUARANTEE_LINE,
  SITE_URL,
} from "@/lib/site";

export const ADS_LANDING_SLUGS = [
  "impermeabilizacion-panama",
  "filtraciones-panama",
  "impermeabilizacion-fachadas",
  "impermeabilizacion-azoteas",
  "sellado-concreto",
] as const;

export type AdsLandingSlug = (typeof ADS_LANDING_SLUGS)[number];

export const problemaValues = [
  "filtracion",
  "azotea",
  "fachada",
  "grietas",
  "piscina",
  "tanque",
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
    href: "/filtraciones-panama",
    title: "Filtraciones",
    when: "Cuando el agua aparece en un apartamento, PH o local y no está claro de dónde entra.",
  },
  {
    href: "/impermeabilizacion-azoteas",
    title: "Azoteas y losas",
    when: "Cuando el último piso se moja, la losa está fisurada o el techo ya no contiene la lluvia.",
  },
  {
    href: "/impermeabilizacion-fachadas",
    title: "Fachadas",
    when: "Cuando hay manchas verticales, humedad en muros o uniones de ventanas en altura.",
  },
  {
    href: "/sellado-concreto",
    title: "Sellado de concreto",
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
    a: "Ofrecemos garantía por escrito según sistema y alcance. Aplican términos y condiciones según sistema y alcance contratado.",
  },
  {
    q: "¿En cuánto tiempo responden?",
    a: "Mark le responde el próximo día hábil. Si el caso es urgente, puede escribirnos por WhatsApp al +507 6550-8320.",
  },
  {
    q: "¿Trabajan en Ciudad de Panamá y el área metro?",
    a: "Sí. Atendemos Ciudad de Panamá, el área metro y también Colón. La oficina está en RBS Tower, Punta Paitilla.",
  },
  {
    q: "¿LithiTek 9500 sirve para techos de zinc?",
    a: "No. Ghostshield / LITHI TEK 9500 es solo para concreto o acero expuesto. Nunca sobre zinc, metal de techo ni membranas. En cubiertas de zinc o metal el sistema principal es HS 3200 Series (Progressive Materials). Para juntas en zinc usamos SiliconFlex Lanco 20 Años, que es el nombre del producto.",
  },
  {
    q: "¿Puedo enviar fotos por WhatsApp?",
    a: "Sí. Después de solicitar la evaluación le dejamos un enlace para enviar fotos. Las fotos no sustituyen la inspección, pero ayudan a preparar la visita.",
  },
];

export const adsLandings: Record<AdsLandingSlug, AdsLanding> = {
  "impermeabilizacion-panama": {
    slug: "impermeabilizacion-panama",
    path: "/impermeabilizacion-panama",
    source: "ads_impermeabilizacion-panama",
    title: "Impermeabilización en Panamá con diagnóstico primero",
    description:
      "Impermeabilización en Ciudad de Panamá y área metro. Primero diagnosticamos el origen del agua; después el sistema correcto. Solicite una inspección.",
    h1: "Impermeabilización en Panamá que empieza con un diagnóstico correcto.",
    cta: "Solicitar inspección",
    ctaSticky: "Solicitar inspección",
    defaultProblema: "filtracion",
    whatsappMessage:
      "Hola, quiero una inspección de impermeabilización en Ciudad de Panamá.",
    thankYouWhatsapp:
      "Hola, solicité una inspección de impermeabilización. Les envío fotos del problema.",
    problemTitle: "Una filtración no siempre entra por donde aparece",
    problemBody:
      "Si el cielo raso de su apartamento se mancha, el agua puede venir de la azotea, de una junta, de una fachada o de una tubería. Pintar la mancha no cierra el camino del agua.",
    problemBullets: [
      "La humedad baja por el concreto y aparece metros más abajo.",
      "Un recubrimiento vencido en la losa moja el último piso después de cada lluvia.",
      "El mismo síntoma en fachada, azotea o junta pide un sistema distinto.",
    ],
    productIntro:
      "No todos los problemas de agua se resuelven con el mismo producto. El diagnóstico dice si hace falta sellado de concreto, un sistema de azotea, trabajo en fachada o reparación de juntas.",
    finalSupport:
      "Cuéntenos qué está pasando en su edificio o vivienda. Inspeccionamos y le proponemos el sistema adecuado.",
    serviceType: "Impermeabilización",
    faqs: [
      {
        q: "¿Qué incluye una inspección de impermeabilización?",
        a: "Revisamos el síntoma, el sustrato y los puntos de entrada. Con eso definimos si el trabajo es de azotea, fachada, sellado de concreto, juntas u otro sistema.",
      },
      {
        q: "¿Impermeabilizan cualquier superficie con Ghostshield?",
        a: "No. Ghostshield / LITHI TEK 9500 es solo para concreto o acero expuesto. El resto de sustratos lleva otro sistema.",
      },
      {
        q: "¿Atienden PH, casas y locales comerciales?",
        a: "Sí. Trabajamos con juntas de PH, administradores, casas, comercio e industria en Ciudad de Panamá y el área metro.",
      },
      {
        q: "¿Cuál es el primer paso si no sé de dónde viene el agua?",
        a: "Solicitar la inspección. El método SEDECO empieza por el origen, no por aplicar impermeabilizante a ciegas.",
      },
      ...SHARED_FAQS,
    ],
  },
  "filtraciones-panama": {
    slug: "filtraciones-panama",
    path: "/filtraciones-panama",
    source: "ads_filtraciones-panama",
    title: "Filtraciones en Panamá: encontramos el origen antes de reparar",
    description:
      "¿Filtración en su apartamento o PH en Panamá? Encontramos el origen del agua antes de reparar. Diagnóstico en Ciudad de Panamá y área metro.",
    h1: "¿Tienes una filtración? Encontramos el origen antes de reparar.",
    cta: "Revisar mi filtración",
    ctaSticky: "Revisar filtración",
    defaultProblema: "filtracion",
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
        a: "Sí. Atendemos filtraciones en Ciudad de Panamá, área metro y Colón, en viviendas, PH y locales.",
      },
      ...SHARED_FAQS,
    ],
  },
  "impermeabilizacion-fachadas": {
    slug: "impermeabilizacion-fachadas",
    path: "/impermeabilizacion-fachadas",
    source: "ads_impermeabilizacion-fachadas",
    title: "Impermeabilización de fachadas para edificios en Panamá",
    description:
      "Impermeabilización de fachadas en Ciudad de Panamá. Evaluación en altura, origen de la humedad y sistema según el sustrato. Solicite evaluación de fachada.",
    h1: "Impermeabilización de fachadas para edificios en Panamá",
    cta: "Solicitar evaluación de fachada",
    ctaSticky: "Evaluar fachada",
    defaultProblema: "fachada",
    whatsappMessage:
      "Hola, quiero una evaluación de impermeabilización de fachada en Panamá.",
    thankYouWhatsapp:
      "Hola, solicité evaluación de fachada. Les envío fotos de las manchas o uniones.",
    problemTitle: "Una filtración no siempre entra por donde aparece",
    problemBody:
      "En fachada el agua entra por juntas, ventanas, grietas o un recubrimiento vencido y puede aparecer dentro de un apartamento que no da al mismo punto.",
    problemBullets: [
      "Manchas verticales, eflorescencia o humedad que baja por el muro.",
      "Filtraciones junto a ventanas o uniones constructivas.",
      "Trabajos en altura que se pintaron y volvieron a fallar con la lluvia y el sol.",
    ],
    productIntro:
      "No todos los problemas de agua se resuelven con el mismo producto. En verticales usamos LANCO DRY-COAT cuando corresponde. El concreto o acero expuesto de fachada se evalúa con Ghostshield / LITHI TEK 9500 — nunca sobre zinc, metal ni membranas.",
    finalSupport:
      "Antes de volver a pintar la fachada, conviene saber por dónde entra el agua y qué sistema admite ese muro.",
    serviceType: "Impermeabilización de fachadas",
    faqs: [
      {
        q: "¿Hacen trabajo de fachada en altura?",
        a: "Sí. Evaluamos fachadas de edificios en Ciudad de Panamá y el área metro. El método de acceso se define después de la inspección.",
      },
      {
        q: "¿Qué producto usan en fachadas?",
        a: "Depende del sustrato. LANCO DRY-COAT para verticales cuando aplica. Ghostshield / LITHI TEK 9500 solo si hay concreto o acero expuesto. No se usa LithiTek sobre zinc, metal ni membranas.",
      },
      {
        q: "¿Una fachada costera se trata igual que una interior?",
        a: "El clima de Panamá — humedad y, en muchos casos, sal — entra en el diagnóstico. El sistema se elige después de ver el muro, no antes.",
      },
      {
        q: "¿Sirve impermeabilizar solo el apartamento que se moja?",
        a: "A veces el origen está en un tramo de fachada común. Por eso inspeccionamos el muro, no solo el interior de la unidad.",
      },
      ...SHARED_FAQS,
    ],
  },
  "impermeabilizacion-azoteas": {
    slug: "impermeabilizacion-azoteas",
    path: "/impermeabilizacion-azoteas",
    source: "ads_impermeabilizacion-azoteas",
    title: "Impermeabilización de azoteas y losas en Panamá",
    description:
      "Impermeabilización de azoteas y losas en Ciudad de Panamá. Diagnóstico del origen, sistema según concreto o zinc, e inspección técnica. Solicite inspección de azotea.",
    h1: "Impermeabilización de azoteas y losas en Panamá",
    cta: "Solicitar inspección de azotea",
    ctaSticky: "Inspeccionar azotea",
    defaultProblema: "azotea",
    whatsappMessage:
      "Hola, quiero una inspección de impermeabilización de azotea o losa en Panamá.",
    thankYouWhatsapp:
      "Hola, solicité inspección de azotea o losa. Les envío fotos de la cubierta y de las filtraciones.",
    problemTitle: "Una filtración no siempre entra por donde aparece",
    problemBody:
      "El último piso se moja y se piensa en el techo. A veces es la losa, un drenaje, una junta o un sistema ya vencido. El material de la cubierta cambia el producto.",
    problemBullets: [
      "Filtraciones en el último piso después de cada lluvia.",
      "Membrana o pintura impermeabilizante agrietada que hay que reaplicar.",
      "Cubierta de zinc o metal tratada como si fuera concreto — o al revés.",
    ],
    productIntro:
      "No todos los problemas de agua se resuelven con el mismo producto. En losas de concreto puede aplicar sellado con Ghostshield / LITHI TEK 9500. En techos de zinc o metal el sistema principal es HS 3200 Series (Progressive Materials). LithiTek no se aplica sobre zinc, metal ni membranas.",
    finalSupport:
      "Si la azotea o la losa está mojando el interior, el siguiente paso es inspeccionar el sustrato y elegir el sistema correcto.",
    serviceType: "Impermeabilización de azoteas y losas",
    faqs: [
      {
        q: "¿Impermeabilizan azoteas de PH y de casas?",
        a: "Sí. Inspeccionamos losas, azoteas y cubiertas en PH, casas y edificios comerciales en Ciudad de Panamá y el área metro.",
      },
      {
        q: "¿Qué sistema usan si el techo es de zinc?",
        a: "HS 3200 Series (Progressive Materials) es el sistema principal para cubiertas de zinc o metal. Ghostshield / LITHI TEK 9500 no se usa sobre zinc, metal ni membranas.",
      },
      {
        q: "¿Y si la losa es de concreto?",
        a: "Se evalúa si corresponde un sellado de concreto (Ghostshield / LITHI TEK 9500 sobre concreto o acero expuesto) u otro sistema horizontal según el estado de la losa.",
      },
      {
        q: "¿La inspección incluye drenajes y juntas?",
        a: "Sí. El agua a menudo entra por encuentros, desagües y juntas, no por el centro de la losa. Eso se revisa en la visita.",
      },
      ...SHARED_FAQS,
    ],
  },
  "sellado-concreto": {
    slug: "sellado-concreto",
    path: "/sellado-concreto",
    source: "ads_sellado-concreto",
    title: "Sellado de concreto permanente en Panamá | SEDECO",
    description:
      "Sellado de concreto en Panamá con Ghostshield / LITHI TEK 9500 solo sobre concreto o acero expuesto. Diagnóstico primero. Solicite evaluación.",
    h1: "Sellado permanente de concreto en Panamá, con el sistema correcto.",
    cta: "Solicitar evaluación",
    ctaSticky: "Solicitar evaluación",
    defaultProblema: "otro",
    whatsappMessage:
      "Hola, quiero una evaluación de sellado de concreto en Panamá.",
    thankYouWhatsapp:
      "Hola, solicité evaluación de sellado de concreto. Les envío fotos de la losa o superficie.",
    problemTitle: "Una filtración no siempre entra por donde aparece",
    problemBody:
      "El concreto poroso deja pasar agua y sales. Un recubrimiento que se descama no es lo mismo que un sellado del concreto. Primero confirmamos que el sustrato sea concreto o acero expuesto.",
    problemBullets: [
      "Losa o muro de concreto que absorbe agua y la suelta hacia el interior.",
      "Pinturas impermeabilizantes que se desprenden y hay que rehacer.",
      "Confusión entre concreto, zinc y membranas: cada uno pide un sistema distinto.",
    ],
    productIntro:
      "Ghostshield / LITHI TEK 9500 es para concreto o acero expuesto. Nunca zinc, metal de techo ni membranas. Si su cubierta es de zinc, el camino es HS 3200 Series u otro sistema — no sellado nano sobre metal.",
    finalSupport:
      "Si lo que necesita es sellar concreto de verdad, empiece por una evaluación del sustrato. No aplicamos LithiTek donde no corresponde.",
    serviceType: "Sellado permanente de concreto",
    faqs: [
      {
        q: "¿Qué es el sellado de concreto que ustedes hacen?",
        a: "Es un tratamiento sobre concreto o acero expuesto con Ghostshield / LITHI TEK 9500, cuando el diagnóstico confirma que ese es el sustrato y el sistema correcto. No es pintar el concreto.",
      },
      {
        q: "¿Sirve para techos de zinc o membranas?",
        a: "No. LITHI TEK 9500 no se aplica sobre zinc, metal ni membranas. Para zinc o metal el sistema principal es HS 3200 Series (Progressive Materials).",
      },
      {
        q: "¿Son aplicadores autorizados de Ghostshield?",
        a: "Sí. SEDECO es aplicador autorizado de Ghostshield® (KreteTek Industries) en Panamá. Trabajamos también con sistemas Sika y Progressive Materials según el caso.",
      },
      {
        q: "¿Tienen un caso de losa nueva sellada?",
        a: "PH Quadrat, en San Francisco, es un sellado de losa nueva con LITHI TEK 9500, con carta de respaldo firmada por el cliente.",
      },
      ...SHARED_FAQS,
    ],
  },
};

export function getAdsLanding(slug: AdsLandingSlug): AdsLanding {
  return adsLandings[slug];
}

export function adsMetadata(landing: AdsLanding): Metadata {
  const url = `${SITE_URL}${landing.path}`;
  return {
    title: { absolute: `${landing.title} · SEDECO Panamá` },
    description: landing.description,
    alternates: { canonical: landing.path },
    openGraph: {
      title: landing.title,
      description: landing.description,
      url,
      locale: "es_PA",
      type: "website",
      siteName: "SEDECO Panamá",
    },
    twitter: {
      card: "summary_large_image",
      title: landing.title,
      description: landing.description,
    },
    robots: { index: true, follow: true },
  };
}
