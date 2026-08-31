import { z } from "zod";
import {
  ADS_LANDING_SLUGS,
  problemaValues,
  tipoPropiedadValues,
} from "@/lib/data/ads-landings";

export const tipoProyectoValues = [
  "residencial",
  "comercial",
  "hospitalario",
  "industrial",
  "religioso",
  "otro",
] as const;

export type TipoProyecto = (typeof tipoProyectoValues)[number];

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
    .regex(/^[+\d\s\-()]+$/, "Solo dígitos, espacios y los símbolos + - ( ).")
    .min(7, "Teléfono muy corto.")
    .max(20, "Teléfono muy largo."),
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
    .regex(/^[+\d\s\-()]+$/, "Solo dígitos, espacios y los símbolos + - ( ).")
    .min(7, "WhatsApp muy corto.")
    .max(20, "WhatsApp muy largo."),
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
  landingPath: z
    .string()
    .trim()
    .refine(
      (v) =>
        ADS_LANDING_SLUGS.some((slug) => v === `/${slug}`) || v === "/gracias",
      "Origen de landing no válido.",
    ),
  source: z
    .string()
    .trim()
    .refine(
      (v) => ADS_LANDING_SLUGS.some((slug) => v === `ads_${slug}`),
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
