import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  leads: defineTable({
    nombre: v.string(),
    email: v.optional(v.string()),
    telefono: v.string(),
    tipoProyecto: v.optional(v.string()),
    tipoPropiedad: v.optional(v.string()),
    problema: v.optional(v.string()),
    descripcion: v.optional(v.string()),
    ubicacion: v.optional(v.string()),
    puedeEnviarFotos: v.optional(v.string()),
    mensaje: v.string(),
    source: v.string(),
    landingPath: v.optional(v.string()),
    userAgent: v.optional(v.string()),
    referrer: v.optional(v.string()),
    utmSource: v.optional(v.string()),
    utmMedium: v.optional(v.string()),
    utmCampaign: v.optional(v.string()),
    utmTerm: v.optional(v.string()),
    utmContent: v.optional(v.string()),
    gclid: v.optional(v.string()),
    gbraid: v.optional(v.string()),
    wbraid: v.optional(v.string()),
    status: v.string(),
    notifiedAt: v.optional(v.number()),
    notificationError: v.optional(v.string()),
  })
    .index("by_email", ["email"])
    .index("by_status", ["status"])
    .index("by_source", ["source"]),
});
