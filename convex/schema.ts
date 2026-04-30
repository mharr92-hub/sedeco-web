import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  leads: defineTable({
    nombre: v.string(),
    email: v.string(),
    telefono: v.string(),
    tipoProyecto: v.optional(v.string()),
    mensaje: v.string(),
    source: v.string(),
    userAgent: v.optional(v.string()),
    referrer: v.optional(v.string()),
    status: v.string(),
    notifiedAt: v.optional(v.number()),
    notificationError: v.optional(v.string()),
  })
    .index("by_email", ["email"])
    .index("by_status", ["status"]),
});
