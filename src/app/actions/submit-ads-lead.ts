"use server";

import { headers } from "next/headers";
import { makeFunctionReference } from "convex/server";
import {
  adsLeadFieldKeys,
  adsLeadFormSchema,
  type AdsLeadField,
} from "@/lib/validations/lead";
import { getConvexClient } from "@/lib/convex-server";
import { sendLeadNotification } from "@/lib/email/lead-notification";
import { trackingFromFormData } from "@/lib/tracking";

const createLeadRef = makeFunctionReference<"mutation">("leads:createLead");
const markNotifiedRef = makeFunctionReference<"mutation">("leads:markNotified");

const PROBLEMA_LABEL: Record<string, string> = {
  filtracion: "Filtración",
  azotea: "Azotea",
  fachada: "Fachada",
  grietas: "Grietas",
  piscina: "Piscina",
  tanque: "Tanque",
  otro: "Otro",
};

const PROPIEDAD_LABEL: Record<string, string> = {
  casa: "Casa",
  apartamento: "Apartamento",
  ph: "PH",
  comercio: "Comercio",
  industria: "Industria",
  constructora: "Constructora",
  otro: "Otro",
};

export type SubmitAdsLeadResult =
  | { ok: true; emailQueued: boolean }
  | {
      ok: false;
      error: string;
      fields?: Partial<Record<AdsLeadField, string>>;
    };

function composeMensaje(input: {
  problema: string;
  tipoPropiedad: string;
  ubicacion: string;
  puedeEnviarFotos: string;
  descripcion?: string;
  landingPath: string;
}): string {
  const lines = [
    `Problema: ${PROBLEMA_LABEL[input.problema] ?? input.problema}`,
    `Propiedad: ${PROPIEDAD_LABEL[input.tipoPropiedad] ?? input.tipoPropiedad}`,
    `Zona: ${input.ubicacion}`,
    `Fotos: ${input.puedeEnviarFotos === "si" ? "puede enviar" : "no por ahora"}`,
    `Landing: ${input.landingPath}`,
  ];
  if (input.descripcion) {
    lines.push("", input.descripcion);
  }
  return lines.join("\n");
}

export async function submitAdsLead(
  _prev: SubmitAdsLeadResult | undefined,
  formData: FormData,
): Promise<SubmitAdsLeadResult> {
  const honeypot = formData.get("company");
  if (typeof honeypot === "string" && honeypot.trim().length > 0) {
    console.warn(
      "[submitAdsLead] honeypot disparado, lead descartado silenciosamente.",
    );
    return { ok: true, emailQueued: false };
  }

  const raw = {
    nombre: formData.get("nombre"),
    telefono: formData.get("telefono"),
    problema: formData.get("problema"),
    descripcion: formData.get("descripcion") || undefined,
    tipoPropiedad: formData.get("tipoPropiedad"),
    ubicacion: formData.get("ubicacion"),
    puedeEnviarFotos: formData.get("puedeEnviarFotos"),
    landingPath: formData.get("landingPath"),
    source: formData.get("source"),
  };

  const parsed = adsLeadFormSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    const fields: Partial<Record<AdsLeadField, string>> = {};
    for (const key of adsLeadFieldKeys) {
      const message = fieldErrors[key]?.[0];
      if (message) fields[key] = message;
    }
    return {
      ok: false,
      error: "Revisa los campos marcados.",
      fields,
    };
  }

  const tracking = trackingFromFormData(formData);
  const mensaje = composeMensaje(parsed.data);

  const client = getConvexClient();
  if (!client) {
    console.error(
      "[submitAdsLead] NEXT_PUBLIC_CONVEX_URL no configurada. Lead NO persistido:",
      JSON.stringify({ ...parsed.data, ...tracking, mensaje }),
    );
    return {
      ok: false,
      error:
        "El sistema de leads aún no está completamente configurado. Por favor escríbanos por WhatsApp al +507 6550-8320 o a mark@selladodeconcreto.com.",
    };
  }

  const hdrs = await headers();
  const userAgent = hdrs.get("user-agent") ?? undefined;
  const referrer = hdrs.get("referer") ?? undefined;

  const payload = {
    nombre: parsed.data.nombre,
    telefono: parsed.data.telefono,
    problema: parsed.data.problema,
    tipoPropiedad: parsed.data.tipoPropiedad,
    ubicacion: parsed.data.ubicacion,
    puedeEnviarFotos: parsed.data.puedeEnviarFotos,
    mensaje,
    source: parsed.data.source,
    landingPath: parsed.data.landingPath,
    userAgent,
    referrer,
    ...tracking,
    ...(parsed.data.descripcion ? { descripcion: parsed.data.descripcion } : {}),
  };

  let leadId: unknown;
  try {
    leadId = await client.mutation(createLeadRef, payload);
  } catch (err) {
    console.error("[submitAdsLead] Error guardando lead en Convex:", err);
    return {
      ok: false,
      error:
        "No pudimos registrar su solicitud. Intente de nuevo o escríbanos al +507 6550-8320.",
    };
  }

  if (!process.env.RESEND_API_KEY) {
    console.warn(
      "[submitAdsLead] Lead guardado pero RESEND_API_KEY no está configurada — sin notificación por email.",
    );
    return { ok: true, emailQueued: false };
  }

  try {
    await sendLeadNotification({
      ...payload,
      createdAt: new Date(),
    });
    try {
      await client.mutation(markNotifiedRef, { id: leadId });
    } catch (patchErr) {
      console.error(
        "[submitAdsLead] Email enviado pero no pude marcar notifiedAt:",
        patchErr,
      );
    }
    return { ok: true, emailQueued: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(
      "[submitAdsLead] Falla en Resend (lead ya guardado en Convex):",
      message,
    );
    try {
      await client.mutation(markNotifiedRef, { id: leadId, error: message });
    } catch (patchErr) {
      console.error(
        "[submitAdsLead] Tampoco pude registrar el error en Convex:",
        patchErr,
      );
    }
    return { ok: true, emailQueued: false };
  }
}
