"use server";

import { headers } from "next/headers";
import { makeFunctionReference } from "convex/server";
import { leadFormSchema } from "@/lib/validations/lead";
import { getConvexClient } from "@/lib/convex-server";
import { sendLeadNotification } from "@/lib/email/lead-notification";
import { leadSubmitErrorMessage } from "@/lib/site";

// Untyped function references — replace with `api.leads.createLead` from
// convex/_generated/api once `npm run convex:dev` has been run once.
const createLeadRef = makeFunctionReference<"mutation">("leads:createLead");
const markNotifiedRef = makeFunctionReference<"mutation">("leads:markNotified");

export type SubmitLeadResult =
  | { ok: true; emailQueued: boolean }
  | {
      ok: false;
      error: string;
      fields?: Partial<Record<"nombre" | "email" | "telefono" | "tipoProyecto" | "mensaje", string>>;
    };

export async function submitLead(
  _prev: SubmitLeadResult | undefined,
  formData: FormData,
): Promise<SubmitLeadResult> {
  const honeypot = formData.get("company");
  if (typeof honeypot === "string" && honeypot.trim().length > 0) {
    console.warn(
      "[submitLead] honeypot disparado, lead descartado silenciosamente.",
    );
    return { ok: true, emailQueued: false };
  }

  const raw = {
    nombre: formData.get("nombre"),
    email: formData.get("email"),
    telefono: formData.get("telefono"),
    tipoProyecto: formData.get("tipoProyecto") || undefined,
    mensaje: formData.get("mensaje"),
  };

  const parsed = leadFormSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      ok: false,
      error: "Revisa los campos marcados.",
      fields: {
        nombre: fieldErrors.nombre?.[0],
        email: fieldErrors.email?.[0],
        telefono: fieldErrors.telefono?.[0],
        tipoProyecto: fieldErrors.tipoProyecto?.[0],
        mensaje: fieldErrors.mensaje?.[0],
      },
    };
  }

  const client = getConvexClient();
  if (!client) {
    console.error(
      "[submitLead] NEXT_PUBLIC_CONVEX_URL no configurada. Lead NO persistido:",
      JSON.stringify(parsed.data),
    );
    return {
      ok: false,
      error: leadSubmitErrorMessage(),
    };
  }

  const hdrs = await headers();
  const userAgent = hdrs.get("user-agent") ?? undefined;
  const referrer = hdrs.get("referer") ?? undefined;

  let leadId: unknown;
  try {
    leadId = await client.mutation(createLeadRef, {
      nombre: parsed.data.nombre,
      email: parsed.data.email,
      telefono: parsed.data.telefono,
      tipoProyecto: parsed.data.tipoProyecto,
      mensaje: parsed.data.mensaje,
      source: "web_form",
      userAgent,
      referrer,
    });
  } catch (err) {
    console.error("[submitLead] Error guardando lead en Convex:", err);
    return {
      ok: false,
      error: leadSubmitErrorMessage(),
    };
  }

  if (!process.env.RESEND_API_KEY) {
    console.warn(
      "[submitLead] Lead guardado pero RESEND_API_KEY no está configurada — sin notificación por email.",
    );
    return { ok: true, emailQueued: false };
  }

  try {
    await sendLeadNotification({
      ...parsed.data,
      source: "web_form",
      createdAt: new Date(),
    });
    try {
      await client.mutation(markNotifiedRef, { id: leadId });
    } catch (patchErr) {
      console.error(
        "[submitLead] Email enviado pero no pude marcar notifiedAt:",
        patchErr,
      );
    }
    return { ok: true, emailQueued: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(
      "[submitLead] Falla en Resend (lead ya guardado en Convex):",
      message,
    );
    try {
      await client.mutation(markNotifiedRef, { id: leadId, error: message });
    } catch (patchErr) {
      console.error(
        "[submitLead] Tampoco pude registrar el error en Convex:",
        patchErr,
      );
    }
    return { ok: true, emailQueued: false };
  }
}
