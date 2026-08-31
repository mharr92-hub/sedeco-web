import type { ServiceSlug } from "./cases";

export type Service = {
  slug: ServiceSlug;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  problemSignals: string[];
  approach: string[];
  products: string[];
  warranty?: string;
  seoTitle?: string;
  seoDescription: string;
  order: number;
};

const services: Service[] = [
  {
    slug: "impermeabilizacion",
    name: "Impermeabilización integral",
    shortName: "Impermeabilización",
    tagline:
      "Metodología SEDECO: inspección, preparación, reparación y sistema impermeabilizante.",
    description:
      "Tratamos cada estructura de extremo a extremo. Inspeccionamos para entender la patología real, preparamos la superficie, reparamos defectos y aplicamos el sistema impermeabilizante adecuado al sustrato — Ghostshield para sellado permanente, Sika o Progressive Materials cuando aplica.",
    problemSignals: [
      "Tienes filtraciones recurrentes que ya intentaste tapar y vuelven.",
      "Tu edificio tiene azoteas, fachadas o tanques que necesitan protección permanente.",
      "Buscas un proveedor único que diagnostique y resuelva, no que aplique químico a ciegas.",
    ],
    approach: [
      "Inspección NDT y detección de fugas — entendemos el problema antes de proponer.",
      "Preparación de superficie — limpieza, repellos y sellos donde haga falta.",
      "Reparación de defectos — sellado de grietas con uretano de inyección y LITHI TEK 9500.",
      "Sistema impermeabilizante — Ghostshield nano para sellado permanente, Sika o Progressive según el sustrato.",
    ],
    products: [
      "LITHI TEK 9500",
      "Ghostshield 4500",
      "Sikafloor",
      "Sikalastic 1k",
      "Sika Monotop 107",
      "Silicona Progressive Materials",
      "Uretano de inyección",
    ],
    warranty: "garantía por escrito según sistema y alcance",
    seoTitle: "Impermeabilización en Panamá — metodología integral SEDECO",
    seoDescription:
      "Metodología completa de impermeabilización en Panamá: inspección NDT, preparación de superficie, reparación de defectos y sistema impermeabilizante con Ghostshield, Sika y Progressive Materials.",
    order: 10,
  },
  {
    slug: "fachadas",
    name: "Impermeabilización de fachadas",
    shortName: "Fachadas",
    tagline:
      "Protección vertical permanente para edificios costeros panameños.",
    description:
      "Sellamos fachadas con LITHI TEK 9500 — nanotecnología que penetra hasta 2 cm en el concreto y se vuelve químicamente parte de la estructura. La defensa se mantiene sin descamarse, ideal para edificios expuestos al ambiente costero, sal y humedad.",
    problemSignals: [
      "Manchas verticales o eflorescencia salina en la fachada.",
      "Filtraciones por ventanas o uniones constructivas.",
      "Repellos sueltos o desprendimiento en altura.",
      "Edificio cerca al mar con deterioro acelerado.",
    ],
    approach: [
      "Diagnóstico vertical — identificamos puntos de entrada de agua, grietas y fallos de sello.",
      "Sello de ventanas y uniones con productos Sika.",
      "Reparación de grietas con uretano de inyección y LITHI TEK 9500.",
      "Aplicación de LITHI TEK 9500 sobre toda la superficie — penetración nano de 0.3 a 1.5 nanómetros.",
    ],
    products: [
      "LITHI TEK 9500",
      "Sika Monotop 107",
      "Sikalastic 1k",
      "Uretano de inyección",
    ],
    warranty: "garantía por escrito según sistema y alcance",
    seoDescription:
      "Impermeabilización de fachadas en Panamá con LITHI TEK 9500. Protección vertical permanente para edificios costeros, sal y humedad.",
    order: 20,
  },
  {
    slug: "azoteas",
    name: "Impermeabilización de azoteas y losas",
    shortName: "Azoteas",
    tagline:
      "Sellado horizontal contra el sol, lluvia y filtraciones de Panamá.",
    description:
      "Tratamos azoteas y losas con LITHI TEK 9500 cuando se necesita sellado permanente, o con silicona Progressive Materials cuando aplica recubrimiento elástico. Cada sustrato dicta el sistema correcto.",
    problemSignals: [
      "Filtraciones que aparecen en el último piso después de cada lluvia.",
      "Membrana asfáltica vencida y agrietada.",
      "Pintura impermeabilizante que se descama cada 2 o 3 años.",
      "Losa nueva que quieres proteger desde el día uno.",
    ],
    approach: [
      "Inspección de la losa: drenajes, juntas, integridad estructural.",
      "Reparación de grietas y fisuras con uretano de inyección y LITHI TEK 9500.",
      "Sistema permanente: LITHI TEK 9500 que se vuelve parte del concreto, o silicona Progressive cuando se requiere recubrimiento elástico.",
    ],
    products: [
      "LITHI TEK 9500",
      "Silicona Progressive Materials",
      "Sikalastic 1k",
      "Uretano de inyección",
    ],
    warranty: "garantía por escrito según sistema y alcance",
    seoDescription:
      "Impermeabilización de azoteas y losas en Panamá. LITHI TEK 9500 o silicona Progressive según sustrato. Casos: Millenium Park 1,100 m², PH Mónaco, Fundación Deveaux.",
    order: 30,
  },
  {
    slug: "filtraciones",
    name: "Detección y reparación de filtraciones",
    shortName: "Filtraciones",
    tagline:
      "NDT y detección de fugas: diagnóstico antes que parche.",
    description:
      "Antes de aplicar químico, encontramos la fuente. Inspección no destructiva (NDT) para detectar el camino del agua, evaluar la patología real del concreto y proponer la reparación que sí va a sostenerse.",
    problemSignals: [
      "Manchas de humedad que aparecen en lugares donde no debería filtrar.",
      "Ya pagaste por trabajos de impermeabilización que no resolvieron.",
      "Necesitas saber dónde está la fuga antes de invertir en una solución.",
      "Daño estructural o eflorescencia que no sabes a qué atribuir.",
    ],
    approach: [
      "Inspección NDT con +20 años de experiencia en diagnóstico de patógenos en edificios.",
      "Detección del recorrido del agua y mapeo de patología.",
      "Reparación dirigida con productos correctos — no parches al voleo.",
    ],
    products: [
      "Inspección NDT",
      "Uretano de inyección",
      "LITHI TEK 9500",
      "Productos Sika según diagnóstico",
    ],
    seoTitle: "Detección de filtraciones en Panamá — inspección NDT SEDECO",
    seoDescription:
      "Detección y reparación de filtraciones en Panamá. Inspección NDT con +20 años de experiencia para identificar el origen del agua y proponer la reparación correcta.",
    order: 40,
  },
  {
    slug: "sellado-concreto",
    name: "Sellado permanente de concreto",
    shortName: "Sellado de concreto",
    tagline:
      "Ghostshield: nanotecnología que se vuelve parte del concreto.",
    description:
      "LITHI TEK 9500 y Ghostshield 4500 penetran hasta 2 cm en el concreto con partículas activas de 0.3 a 1.5 nanómetros — 100 veces más pequeñas que químicos tradicionales. La protección no se desgasta porque es químicamente parte de la estructura.",
    problemSignals: [
      "Quieres protección que no se descame ni se vuelva a aplicar.",
      "Tienes una losa o estructura nueva que quieres sellar desde el día uno.",
      "Buscas tecnología certificada (KreteTek Industries, EE. UU.) con respaldo internacional.",
    ],
    approach: [
      "Limpieza y preparación de la superficie de concreto.",
      "Aplicación de LITHI TEK 9500 — penetración molecular hasta 2 cm.",
      "Reacción química: el producto se vuelve parte permanente de la estructura.",
    ],
    products: ["LITHI TEK 9500", "Ghostshield 4500"],
    warranty: "garantía por escrito según sistema y alcance",
    seoDescription:
      "Sellado permanente de concreto en Panamá con Ghostshield (LITHI TEK 9500). Nanotecnología molecular y garantía por escrito según sistema y alcance. Aplicador autorizado en Panamá desde 2017.",
    order: 50,
  },
  {
    slug: "tanques",
    name: "Impermeabilización de tanques de agua potable",
    shortName: "Tanques",
    tagline: "Sellado interior compatible con agua potable.",
    description:
      "Impermeabilización de tanques de almacenamiento de agua potable con productos compatibles con uso humano. Aplicación cuidadosa al detalle de juntas y uniones constructivas.",
    problemSignals: [
      "Tu tanque pierde nivel y no encuentras la fuga.",
      "Necesitas certeza sanitaria: producto compatible con agua potable.",
      "Tanque nuevo que quieres sellar desde construcción.",
    ],
    approach: [
      "Vaciado, limpieza y diagnóstico interior del tanque.",
      "Reparación de grietas y juntas constructivas.",
      "Aplicación de producto compatible con agua potable según el sustrato.",
    ],
    products: [
      "Productos Sika compatibles con agua potable",
      "Sika Monotop 107",
    ],
    seoDescription:
      "Impermeabilización de tanques de agua potable en Panamá. Productos compatibles con uso humano, sellado de grietas y juntas constructivas.",
    order: 60,
  },
  {
    slug: "grietas",
    name: "Reparación de grietas en concreto",
    shortName: "Grietas",
    tagline:
      "Uretano de inyección + LITHI TEK 9500: reparación que no vuelve.",
    description:
      "Reparamos grietas activas en concreto con uretano de inyección y sellamos el resultado con LITHI TEK 9500. La combinación detiene la entrada de agua y vuelve permanente la reparación.",
    problemSignals: [
      "Grietas verticales u horizontales que filtran agua después de la lluvia.",
      "Grietas que ya fueron reparadas antes y volvieron a filtrar.",
      "Grietas estructurales en losas, muros o columnas.",
    ],
    approach: [
      "Identificación del tipo de grieta — activa, pasiva o estructural.",
      "Inyección con uretano expansivo que sella desde el interior.",
      "Sello superficial con LITHI TEK 9500 — el concreto curado queda impermeable.",
    ],
    products: [
      "Uretano de inyección",
      "LITHI TEK 9500",
      "Sika Monotop 107",
    ],
    warranty: "garantía por escrito según sistema y alcance",
    seoDescription:
      "Reparación de grietas en concreto en Panamá. Uretano de inyección + LITHI TEK 9500 para sellado permanente de fisuras estructurales y filtraciones.",
    order: 70,
  },
  {
    slug: "piscinas",
    name: "Impermeabilización de piscinas",
    shortName: "Piscinas",
    tagline: "Sellado interior de piscinas con sistema Sika.",
    description:
      "Impermeabilización de vasos de piscina y áreas de borde con sistema Sika (Sikafloor, Sikalastic 1k). Aplicación cuidadosa a juntas, esquinas y zonas de mayor estrés hidráulico.",
    problemSignals: [
      "Tu piscina pierde nivel y sospechas de filtración interior.",
      "Vas a renovar o construir una piscina y quieres sello permanente.",
      "Borde de piscina con manchas o deterioro por agua estancada.",
    ],
    approach: [
      "Diagnóstico del vaso — juntas, dilataciones, sustrato.",
      "Preparación con Sika Monotop 107 donde haga falta.",
      "Aplicación de Sikalastic 1k — recubrimiento elástico para zonas con movimiento.",
    ],
    products: ["Sikafloor", "Sikalastic 1k", "Sika Monotop 107"],
    seoDescription:
      "Impermeabilización de piscinas en Panamá con sistema Sika. Sellado interior de vasos, juntas y bordes para piscinas residenciales y comerciales.",
    order: 80,
  },
];

const sortByOrder = (a: Service, b: Service) => a.order - b.order;

export function getAllServices(): Service[] {
  return [...services].sort(sortByOrder);
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
