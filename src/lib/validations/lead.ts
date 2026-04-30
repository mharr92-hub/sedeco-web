import { z } from "zod";

export const tipoProyectoValues = [
  "residencial",
  "comercial",
  "hospitalario",
  "industrial",
  "religioso",
  "otro",
] as const;

export type TipoProyecto = (typeof tipoProyectoValues)[number];

export const leadFormSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "Tu nombre es muy corto.")
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
    .min(10, "Cuéntanos un poco más (al menos 10 caracteres).")
    .max(2000, "Máximo 2000 caracteres."),
});

export type LeadFormInput = z.infer<typeof leadFormSchema>;
