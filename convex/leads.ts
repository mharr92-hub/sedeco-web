// Run `npm run convex:dev` once to generate types in convex/_generated/
// (gitignored) before this file type-checks.
import { mutation } from "./_generated/server";
import { v } from "convex/values";

const optionalString = v.optional(v.string());

export const createLead = mutation({
  args: {
    nombre: v.string(),
    email: optionalString,
    telefono: v.string(),
    tipoProyecto: optionalString,
    tipoPropiedad: optionalString,
    problema: optionalString,
    descripcion: optionalString,
    ubicacion: optionalString,
    puedeEnviarFotos: optionalString,
    mensaje: v.string(),
    source: v.string(),
    landingPath: optionalString,
    userAgent: optionalString,
    referrer: optionalString,
    utmSource: optionalString,
    utmMedium: optionalString,
    utmCampaign: optionalString,
    utmTerm: optionalString,
    utmContent: optionalString,
    gclid: optionalString,
    gbraid: optionalString,
    wbraid: optionalString,
  },
  returns: v.id("leads"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("leads", { ...args, status: "new" });
  },
});

export const markNotified = mutation({
  args: {
    id: v.id("leads"),
    error: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, { id, error }) => {
    await ctx.db.patch(id, {
      notifiedAt: Date.now(),
      notificationError: error,
    });
    return null;
  },
});
