export type AdsPhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const PORTRAIT = { width: 1024, height: 1536 } as const;
const LANDSCAPE = { width: 1536, height: 1024 } as const;

export const ADS_PHOTOS = {
  heroTorres: {
    src: "/obras/hero-torres.jpg",
    alt: "Torres de gran altura con balcones ondulados en Ciudad de Panamá, vista en contrapicado",
    ...PORTRAIT,
  },
  coverFull: {
    src: "/obras/cover-full.jpg",
    alt: "Dos torres residenciales con fachada ondulada contra el cielo de Ciudad de Panamá",
    ...LANDSCAPE,
  },
  joyTower: {
    src: "/obras/ph-joy-tower.jpg",
    alt: "PH Joy Tower, torre blanca curva de gran altura en Ciudad de Panamá",
    ...PORTRAIT,
  },
  dosMares: {
    src: "/obras/ph-dos-mares.jpg",
    alt: "PH Dos Mares, fachada blanca con ventanales en Ciudad de Panamá",
    ...PORTRAIT,
  },
  capacidadHero: {
    src: "/obras/capacidad-hero.jpg",
    alt: "Estructura de concreto de un edificio en altura en fase de ejecución en Ciudad de Panamá",
    ...LANDSCAPE,
  },
  obraAltura: {
    src: "/obras/obra-altura.jpg",
    alt: "Obra de gran altura en concreto visto, ejecución en Ciudad de Panamá",
    ...LANDSCAPE,
  },
  servicioFachadas: {
    src: "/obras/servicio-fachadas.jpg",
    alt: "Fachada curva de un edificio alto, superficie exterior en Ciudad de Panamá",
    ...PORTRAIT,
  },
  servicioImpermeabilizacion: {
    src: "/obras/servicio-impermeabilizacion.jpg",
    alt: "Estructura de concreto en construcción, losas y pilares a la vista",
    ...PORTRAIT,
  },
  aguaConcreto: {
    src: "/obras/agua-concreto.jpg",
    alt: "Gotas de agua sobre concreto sellado, superficie que no absorbe el líquido",
    ...LANDSCAPE,
  },
} as const satisfies Record<string, AdsPhoto>;

export const ADS_HERO_KICKER = "INGENIERÍA QUE PROTEGE ESTRUCTURAS.";
export const ADS_HERO_SUB =
  "Diagnóstico · Restauración · Impermeabilización · Ciudad de Panamá · 2026";

export const ADS_METODO_BODY =
  "Inspeccionamos la estructura, localizamos el origen del agua y elegimos el sistema según el sustrato. Ghostshield / LITHI TEK 9500 solo sobre concreto o acero expuesto — nunca sobre zinc, metal de techo ni membranas. Entregamos con garantía por escrito según sistema y alcance contratado.";

export const ADS_METODO_BULLETS = [
  "Diagnóstico",
  "Restauración",
  "Impermeabilización",
] as const;

export const ADS_MAGNITUD = [
  { value: "+100.000", unit: "m²", label: "impermeabilizados" },
  { value: "+50", unit: "", label: "proyectos" },
  { value: "+25", unit: "años", label: "experiencia del equipo" },
  { value: "2020", unit: "", label: "empresa fundada" },
] as const;

export const ADS_CAPACITY_BARS = [
  "Edificios altos",
  "Acceso y andamiaje",
  "Seguridad",
  "Supervisión",
] as const;

export const ADS_PROBLEM_CARDS: Array<{
  title: string;
  line: string;
  photo: AdsPhoto;
}> = [
  {
    title: "El origen no está donde se ve",
    line: "La mancha en el cielo raso puede nacer en la losa, la junta o la fachada.",
    photo: ADS_PHOTOS.dosMares,
  },
  {
    title: "Fachada en altura",
    line: "Juntas, ventanas y recubrimientos vencidos dejan pasar agua en vertical.",
    photo: ADS_PHOTOS.servicioFachadas,
  },
  {
    title: "Azotea y losa",
    line: "El último piso se moja cuando la cubierta o el drenaje ya no contienen la lluvia.",
    photo: ADS_PHOTOS.obraAltura,
  },
  {
    title: "Concreto poroso",
    line: "El agua entra al sustrato. Un recubrimiento que se descama no es un sellado.",
    photo: ADS_PHOTOS.aguaConcreto,
  },
  {
    title: "El parche vuelve",
    line: "Pintar la mancha no cierra el camino del agua. Hay que encontrar el origen.",
    photo: ADS_PHOTOS.servicioImpermeabilizacion,
  },
  {
    title: "Edificio completo",
    line: "Azotea, fachada y juntas no llevan el mismo sistema. El diagnóstico lo define.",
    photo: ADS_PHOTOS.joyTower,
  },
];

export const ADS_SERVICE_COLUMNS: Array<{
  href: string;
  title: string;
  line: string;
  photo: AdsPhoto;
}> = [
  {
    href: "#diagnostico",
    title: "Diagnóstico",
    line: "Encontrar el origen antes de reparar.",
    photo: ADS_PHOTOS.aguaConcreto,
  },
  {
    href: "/impermeabilizacion-panama",
    title: "Impermeabilización",
    line: "Azotea, losa, tanque o piscina: sistema según el sustrato.",
    photo: ADS_PHOTOS.servicioImpermeabilizacion,
  },
  {
    href: "/impermeabilizacion-fachadas",
    title: "Fachadas en altura",
    line: "Juntas, sellos de ventanas y recubrimientos con equipo propio.",
    photo: ADS_PHOTOS.servicioFachadas,
  },
];

export const ADS_SUCCESS_CASES: Array<{
  name: string;
  metrics: string;
  scope: string;
  note?: string;
  quote?: string;
  photo: AdsPhoto;
  unlabeledPhoto?: boolean;
}> = [
  {
    name: "Comunidad Hebrea Shevet Ahim",
    metrics: "5.000 m² · losas y fachadas · Ciudad de Panamá",
    scope:
      "Impermeabilización horizontal y vertical en recinto comunitario. Cartas originales disponibles a solicitud.",
    photo: ADS_PHOTOS.servicioImpermeabilizacion,
  },
  {
    name: "Fundación Deveaux",
    metrics: "Fachada y azotea · Ciudad de Colón",
    scope:
      "Reparación de fachada, sellado de grietas y trabajo en altura sobre cubiertas.",
    photo: ADS_PHOTOS.obraAltura,
  },
  {
    name: "PH Quadrat",
    metrics: "Losa estructural · San Francisco",
    scope:
      "Reparación de losa, impermeabilización LITHI TEK 9500 y drenaje pluvial.",
    photo: ADS_PHOTOS.capacidadHero,
  },
] as const;

export const ADS_PORTFOLIO: Array<{
  name: string;
  photo: AdsPhoto;
  large?: boolean;
  unnamed?: boolean;
}> = [
  { name: "PH Joy Tower", photo: ADS_PHOTOS.joyTower },
  { name: "PH Dos Mares", photo: ADS_PHOTOS.dosMares },
  { name: "Obra en altura", photo: ADS_PHOTOS.obraAltura, large: true },
  { name: "Ciudad de Panamá", photo: ADS_PHOTOS.heroTorres, unnamed: true },
  { name: "Ejecución en concreto", photo: ADS_PHOTOS.capacidadHero },
  {
    name: "Cubierta",
    photo: ADS_PHOTOS.servicioImpermeabilizacion,
    unnamed: true,
  },
];

export const ADS_MORE_PROJECTS =
  "Y más de 50 proyectos, entre ellos Comunidad Hebrea Shevet Ahim, Fundación Deveaux y PH Quadrat.";

export const ADS_REFERENCIAS: Array<{
  name: string;
  place: string;
  scope: string;
  contact: string;
}> = [
  {
    name: "PH Quadrat",
    place: "San Francisco, Calle 73",
    scope:
      "Reparación y reposición de losa estructural, impermeabilización LITHI TEK 9500 y drenaje pluvial.",
    contact: "Administrador",
  },
  {
    name: "Hospital Manuel Amador Guerrero",
    place: "Colón (MINSA / IMED)",
    scope:
      "Impermeabilización de 16.000 m² de cubiertas (GhostShield 9500 y HS 100% silicona) y muros perimetrales DRY COAT-LANCO.",
    contact: "Gerente de proyecto",
  },
  {
    name: "Edificio 9136 / Fundación Deveaux",
    place: "Ciudad de Colón",
    scope: "Reparación de fachada, sellado de grietas y trabajo en altura.",
    contact: "Administrador",
  },
  {
    name: "Comunidad Hebrea Shevet Ahim",
    place: "Ciudad de Panamá",
    scope: "Losas (>3.000 m²) y fachadas en altura (>2.000 m²).",
    contact: "Administrador",
  },
  {
    name: "Sinagoga Bet Max Ve Sarah",
    place: "Ciudad de Panamá",
    scope:
      "Losa estructural, fachada y muros perimetrales. Impermeabilización GHOSTSHIELD 9500.",
    contact: "Administrador",
  },
  {
    name: "Supermercados XTRA",
    place: "Panamá",
    scope: "Ejecución de sistemas de impermeabilización integrales.",
    contact: "Gerente de proyecto",
  },
];

export function getAdsHeroPhoto(slug: string): {
  mobile: AdsPhoto;
  desktop: AdsPhoto;
} {
  if (slug === "impermeabilizacion-fachadas") {
    return { mobile: ADS_PHOTOS.joyTower, desktop: ADS_PHOTOS.joyTower };
  }
  return { mobile: ADS_PHOTOS.heroTorres, desktop: ADS_PHOTOS.coverFull };
}
