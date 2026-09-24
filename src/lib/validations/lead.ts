import { z } from "zod";
import { problemaValues, tipoPropiedadValues } from "@/lib/data/ads-landings";
import {
  INTEGRAL_SERVICE_SLUGS,
  isIntegralServicePath,
  isIntegralServiceSource,
} from "@/lib/data/integral-services";
import { LEAD_PAGE_SLUGS } from "@/lib/data/service-pages";

const LEAD_SERVICIO_VALUES = [...INTEGRAL_SERVICE_SLUGS, "filtraciones"] as const;

export const tipoProyectoValues = [
  "residencial",
  "comercial",
  "hospitalario",
  "industrial",
  "religioso",
  "otro",
] as const;

export type TipoProyecto = (typeof tipoProyectoValues)[number];

/** Panama mobile: 8 digits starting with 6. Accepts +507, spaces and dashes. */
export function panamaMobileMessage(value: string): string | undefined {
  const compact = value.replace(/[\s().-]/g, "");
  if (!compact) return "Indique su WhatsApp.";
  if (!/^\+?\d+$/.test(compact)) {
    return "Use solo dígitos y, si quiere, +507.";
  }
  let digits = compact.startsWith("+") ? compact.slice(1) : compact;
  if (digits.startsWith("507")) digits = digits.slice(3);
  if (!/^6\d{7}$/.test(digits)) {
    return "Ingrese un celular de Panamá: 8 dígitos y que empiece con 6. Puede incluir +507.";
  }
  return undefined;
}

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v === "" || v === undefined ? undefined : v));

export const leadFormSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "Su nombre es muy corto.")
    .max(100, "Máximo 100 caracteres."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Email inválido."),
  telefono: z
    .string()
    .trim()
    .max(20, "Teléfono muy largo.")
    .superRefine((value, ctx) => {
      const message = panamaMobileMessage(value);
      if (message) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message });
      }
    }),
  tipoProyecto: z
    .union([z.enum(tipoProyectoValues), z.literal("")])
    .optional()
    .transform((v) => (v === "" || v === undefined ? undefined : v)),
  mensaje: z
    .string()
    .trim()
    .min(10, "Cuéntenos un poco más (al menos 10 caracteres).")
    .max(2000, "Máximo 2000 caracteres."),
});

export type LeadFormInput = z.infer<typeof leadFormSchema>;

export const adsLeadFormSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "Su nombre es muy corto.")
    .max(100, "Máximo 100 caracteres."),
  telefono: z
    .string()
    .trim()
    .max(20, "WhatsApp muy largo.")
    .superRefine((value, ctx) => {
      const message = panamaMobileMessage(value);
      if (message) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message });
      }
    }),
  problema: z.enum(problemaValues, {
    errorMap: () => ({ message: "Seleccione el tipo de problema." }),
  }),
  descripcion: optionalText(2000),
  tipoPropiedad: z.enum(tipoPropiedadValues, {
    errorMap: () => ({ message: "Seleccione el tipo de propiedad." }),
  }),
  ubicacion: z
    .string()
    .trim()
    .min(2, "Indique la zona o el corregimiento.")
    .max(120, "Máximo 120 caracteres."),
  puedeEnviarFotos: z.enum(["si", "no"], {
    errorMap: () => ({ message: "Indique si puede enviar fotos." }),
  }),
  servicio: z
    .union([z.enum(LEAD_SERVICIO_VALUES), z.literal(""), z.null()])
    .optional()
    .transform((value) => (value ? value : undefined)),
  landingPath: z
    .string()
    .trim()
    .refine(
      (v) =>
        v === "/" ||
        v === "/gracias" ||
        LEAD_PAGE_SLUGS.some((slug) => v === `/${slug}`) ||
        isIntegralServicePath(v),
      "Origen de landing no válido.",
    ),
  source: z
    .string()
    .trim()
    .refine(
      (v) =>
        v === "web_home" ||
        LEAD_PAGE_SLUGS.some((slug) => v === `ads_${slug}`) ||
        isIntegralServiceSource(v),
      "Origen no válido.",
    ),
});

export type AdsLeadFormInput = z.infer<typeof adsLeadFormSchema>;

export const adsLeadFieldKeys = [
  "nombre",
  "telefono",
  "problema",
  "descripcion",
  "tipoPropiedad",
  "ubicacion",
  "puedeEnviarFotos",
] as const;

export type AdsLeadField = (typeof adsLeadFieldKeys)[number];
