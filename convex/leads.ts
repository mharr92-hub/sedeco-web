// Run `npm run convex:dev` once to generate types in convex/_generated/
// (gitignored) before this file type-checks.
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createLead = mutation({
  args: {
    nombre: v.string(),
    email: v.string(),
    telefono: v.string(),
    tipoProyecto: v.optional(v.string()),
    mensaje: v.string(),
    source: v.string(),
    userAgent: v.optional(v.string()),
    referrer: v.optional(v.string()),
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
