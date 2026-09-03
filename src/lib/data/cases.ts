import { ADS_PHOTOS, type AdsPhoto } from "@/lib/data/ads-visuals";

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
  /** Real project photo only. Never a generated stand-in of a named building. */
  image?: AdsPhoto;
  order: number;
};

/**
 * Named projects from Catálogo SEDECO 2026 that may appear publicly —
 * and only when they also have a real obra photo (`image`).
 * Twin Towers, Ebelle and Constellation are never in this set (404).
 */
const PUBLIC_CASE_SLUGS = new Set([
  "hospital-manuel-amador-guerrero",
  "ph-joy-tower",
  "ph-dos-mares",
  "shevet-ahim",
  "fundacion-deveaux",
  "ph-quadrat",
  "sinagoga-bet-max-ve-sarah",
  "ph-millenium-park",
  "ph-monaco",
]);

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
    featured: false,
    listed: false,
    order: 10,
  },
  {
    slug: "ph-twin-towers",
    name: "PH Twin Towers",
    workType: "Impermeabilización de fachada",
    services: ["fachadas", "impermeabilizacion"],
    scope: "Edificio de 36 pisos. Fachada compleja.",
    featured: false,
    listed: false,
    order: 11,
  },
  {
    slug: "ph-joy-tower",
    name: "PH Joy Tower",
    location: "Calle 50, Ciudad de Panamá",
    workType: "Reparación y pintura de fachada",
    services: ["fachadas"],
    scope:
      "2 torres residenciales de 16 pisos cada una. Reparación y pintura de fachada, reemplazo de sellos en vidrios, pintura de escaleras de emergencia y estacionamientos, y reemplazo de repellos desprendidos en las paredes de concreto de la fachada.",
    featured: true,
    image: ADS_PHOTOS.joyTower,
    order: 12,
  },
  {
    slug: "ph-dos-mares",
    name: "PH Dos Mares",
    workType: "Proyecto del portafolio",
    services: ["impermeabilizacion"],
    scope: "Edificio de 10 pisos.",
    featured: true,
    image: ADS_PHOTOS.dosMares,
    order: 13,
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
    slug: "sinagoga-bet-max-ve-sarah",
    name: "Sinagoga Bet Max Ve Sarah",
    location: "Ciudad de Panamá",
    workType: "Sellado de concreto e impermeabilización",
    services: ["azoteas", "fachadas", "impermeabilizacion", "sellado-concreto"],
    scope:
      "Losa estructural, fachada y muros perimetrales. Impermeabilización GHOSTSHIELD 9500.",
    order: 22,
  },
  {
    slug: "hospital-manuel-amador-guerrero",
    name: "Hospital Manuel Amador Guerrero",
    location: "Colón (MINSA / IMED)",
    workType: "Impermeabilización de cubiertas y muros",
    services: ["azoteas", "fachadas", "impermeabilizacion"],
    scope:
      "Impermeabilización de 16,000 m² de cubiertas (GhostShield 9500 y/o 4500 y HS 100% silicona), muros perimetrales con DRY COAT-LANCO y reparaciones de albañilería.",
    squareMeters: 16000,
    squareMetersDetail: "16,000 m² de cubiertas",
    problem:
      "Proteger 16,000 m² de azoteas, muros perimetrales y albañilería del hospital.",
    result:
      "Trabajos entregados. Carta de recomendación del Consorcio de Instalaciones Médicas de Panamá (IMED).",
    signedBy: {
      name: "Ing. Agustín García",
      role: "Gerente de proyecto, Consorcio IMED",
    },
    order: 25,
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
    featured: false,
    listed: false,
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
    listed: false,
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
    listed: false,
    order: 70,
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
    slug: "the-towers",
    name: "The Towers",
    workType: "Proyecto del portafolio",
    services: [],
    listed: false,
    order: 110,
  },
];

export function hasCasePhoto(c: Case): boolean {
  return Boolean(c.image);
}

function sortPublicCases(a: Case, b: Case): number {
  const photoDelta = Number(hasCasePhoto(b)) - Number(hasCasePhoto(a));
  if (photoDelta !== 0) return photoDelta;
  return a.order - b.order;
}

function isPublicCase(c: Case): boolean {
  return (
    c.listed !== false &&
    PUBLIC_CASE_SLUGS.has(c.slug) &&
    hasCasePhoto(c)
  );
}

export function getAllCases(): Case[] {
  return cases.filter(isPublicCase).sort(sortPublicCases);
}

export function getFeaturedCases(limit?: number): Case[] {
  const featured = cases
    .filter((c) => c.featured && isPublicCase(c))
    .sort(sortPublicCases);
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
    .sort(sortPublicCases);
}

/** Public Ads proof only. Restricted PHs are never returned. */
const ADS_PROOF_SLUGS = [
  "shevet-ahim",
  "fundacion-deveaux",
  "ph-quadrat",
  "hospital-manuel-amador-guerrero",
  "ph-joy-tower",
] as const;

export function getAdsProofCases(): Case[] {
  return ADS_PROOF_SLUGS.map((slug) => cases.find((c) => c.slug === slug)).filter(
    (c): c is Case => Boolean(c && isPublicCase(c)),
  );
}

export function getAdsStarCase(): Case | undefined {
  return getAdsProofCases().find((c) => c.slug === "shevet-ahim");
}

export function getAdsProjectCards(): Case[] {
  return getAdsProofCases().filter((c) => c.slug !== "shevet-ahim").slice(0, 3);
}
