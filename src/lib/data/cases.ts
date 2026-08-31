export type ServiceSlug =
  | "fachadas"
  | "azoteas"
  | "tanques"
  | "grietas"
  | "piscinas"
  | "filtraciones"
  | "sellado-concreto"
  | "impermeabilizacion";

export type Case = {
  slug: string;
  name: string;
  location?: string;
  workType: string;
  services: ServiceSlug[];
  scope?: string;
  squareMeters?: number;
  squareMetersDetail?: string;
  problem?: string;
  result?: string;
  signedBy?: { name: string; role: string };
  featured?: boolean;
  /** When false, the case is kept internally but omitted from public marketing surfaces. */
  listed?: boolean;
  order: number;
};

const cases: Case[] = [
  {
    slug: "ph-torres-ebelle",
    name: "PH Torres Ebelle",
    location: "Marbella, Ciudad de Panamá",
    workType: "Impermeabilización de fachada vertical",
    services: ["fachadas", "sellado-concreto", "impermeabilizacion", "grietas"],
    scope:
      "22,000 m² verticales en 8 caras (77 m de altura), tratados con LITHI TEK 9500 y poliuretano para grietas.",
    squareMeters: 22000,
    squareMetersDetail: "22,000 m² verticales en 8 caras",
    problem:
      "Proteger una fachada de 8 caras y 77 m de altura expuesta al clima costero de Marbella.",
    result:
      "Sellado permanente con LITHI TEK 9500 y poliuretano. Carta de respaldo firmada por el cliente.",
    signedBy: { name: "Lennys Alcántara", role: "SI Inmobiliaria" },
    featured: false,
    listed: false,
    order: 10,
  },
  {
    slug: "shevet-ahim",
    name: "Comunidad Hebrea Shevet Ahim",
    workType: "Impermeabilización horizontal y vertical",
    services: ["fachadas", "azoteas", "impermeabilizacion"],
    scope:
      "5,000 m² en sinagogas: 3,000 m² horizontales + 2,000 m² verticales.",
    squareMeters: 5000,
    squareMetersDetail: "3,000 m² horizontales + 2,000 m² verticales",
    problem:
      "Proteger superficies horizontales y verticales de las sinagogas de la comunidad.",
    result:
      "5,000 m² entregados. Carta de respaldo firmada por el Director Ejecutivo.",
    signedBy: {
      name: "Ezra Cohen",
      role: "Director Ejecutivo, Comunidad Hebrea Shevet Ahim",
    },
    featured: true,
    order: 20,
  },
  {
    slug: "ph-millenium-park",
    name: "PH Millenium Park",
    location: "Vía Transístmica, Ciudad de Panamá",
    workType: "Impermeabilización de azotea",
    services: ["azoteas", "impermeabilizacion"],
    scope: "1,100 m² de azotea, entregado en agosto de 2022.",
    squareMeters: 1100,
    problem:
      "Impermeabilizar la azotea del edificio en Vía Transístmica.",
    result:
      "1,100 m² sellados. Carta de respaldo firmada por la promotora.",
    signedBy: {
      name: "Johnatan Fincheltub",
      role: "Promotora Millenium Group, S.A.",
    },
    featured: true,
    order: 30,
  },
  {
    slug: "ph-monaco",
    name: "PH Mónaco",
    location: "Obarrio, Ciudad de Panamá",
    workType: "Impermeabilización de azotea y fachada",
    services: ["azoteas", "fachadas", "impermeabilizacion"],
    scope: "750 m² combinados: 250 m² de azotea + 500 m² de fachada.",
    squareMeters: 750,
    squareMetersDetail: "250 m² azotea + 500 m² fachada",
    problem:
      "Proteger azotea y fachada del edificio en Obarrio.",
    result:
      "750 m² entregados. Carta de respaldo firmada por la junta del PH.",
    signedBy: { name: "Nicola Pirro", role: "Tesorero, PH Mónaco" },
    order: 40,
  },
  {
    slug: "fundacion-deveaux",
    name: "Fundación Deveaux",
    workType: "Impermeabilización de fachada y azotea",
    services: ["fachadas", "azoteas", "impermeabilizacion"],
    scope:
      "Fachada de 5 pisos + 750 m² horizontales (250 m² azotea + 500 m² techo).",
    squareMeters: 750,
    squareMetersDetail:
      "250 m² azotea + 500 m² techo + fachada de 5 pisos",
    problem:
      "Proteger fachada y superficies horizontales de la fundación.",
    result:
      "Trabajos entregados con carta de respaldo firmada por la fundación.",
    signedBy: { name: "Yamileth Samaniego", role: "Fundación Deveaux" },
    featured: true,
    order: 50,
  },
  {
    slug: "ph-quadrat",
    name: "PH Quadrat",
    location: "San Francisco, Calle 73, Ciudad de Panamá",
    workType: "Sellado de losa nueva",
    services: ["sellado-concreto", "impermeabilizacion"],
    scope: "Aplicación de LITHI TEK 9500 sobre losa nueva.",
    problem: "Sellar permanentemente una losa nueva con nanotecnología.",
    result:
      "Sellado con LITHI TEK 9500. Carta de respaldo firmada por el cliente.",
    signedBy: { name: "Lic. José González Soto", role: "PH Quadrat" },
    order: 60,
  },
  {
    slug: "ph-mallorca",
    name: "PH Mallorca",
    workType: "Proyecto residencial multi-torre",
    services: ["impermeabilizacion"],
    scope: "96 unidades en 3 torres.",
    order: 70,
  },
  {
    slug: "ph-twin-towers",
    name: "PH Twin Towers",
    workType: "Impermeabilización de fachada",
    services: ["fachadas", "impermeabilizacion"],
    scope: "Edificio de 36 pisos. Fachada compleja.",
    featured: false,
    listed: false,
    order: 80,
  },
  {
    slug: "ph-constellation",
    name: "PH Constellation",
    workType: "Impermeabilización de fachada y piscina",
    services: ["fachadas", "piscinas", "azoteas", "impermeabilizacion"],
    scope: "Edificio de 17 pisos. Fachada y piscina en azotea.",
    featured: false,
    listed: false,
    order: 90,
  },
  {
    slug: "ph-dos-mares",
    name: "PH Dos Mares",
    workType: "Proyecto del portafolio",
    services: ["impermeabilizacion"],
    scope: "Edificio de 10 pisos.",
    order: 100,
  },
  {
    slug: "the-towers",
    name: "The Towers",
    workType: "Proyecto del portafolio",
    services: [],
    order: 110,
  },
];

const sortByOrder = (a: Case, b: Case) => a.order - b.order;

function isPublicCase(c: Case): boolean {
  return c.listed !== false;
}

export function getAllCases(): Case[] {
  return cases.filter(isPublicCase).sort(sortByOrder);
}

export function getFeaturedCases(limit?: number): Case[] {
  const featured = cases
    .filter((c) => c.featured && isPublicCase(c))
    .sort(sortByOrder);
  return typeof limit === "number" ? featured.slice(0, limit) : featured;
}

export function getCaseBySlug(slug: string): Case | undefined {
  const found = cases.find((c) => c.slug === slug);
  if (!found || !isPublicCase(found)) return undefined;
  return found;
}

export function getCasesByService(service: ServiceSlug): Case[] {
  return cases
    .filter((c) => c.services.includes(service) && isPublicCase(c))
    .sort(sortByOrder);
}
