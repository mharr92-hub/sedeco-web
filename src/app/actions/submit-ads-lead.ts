"use server";

import { headers } from "next/headers";
import {
  adsLeadFieldKeys,
  adsLeadFormSchema,
  type AdsLeadField,
} from "@/lib/validations/lead";
import {
  getSupabaseServiceClient,
  type AdsLeadInsert,
} from "@/lib/supabase-server";
import { sendLeadNotification } from "@/lib/email/lead-notification";
import { trackingFromFormData } from "@/lib/tracking";
import { leadSubmitErrorMessage } from "@/lib/site";

const PROBLEMA_LABEL: Record<string, string> = {
  filtracion: "Filtración",
  azotea: "Azotea / losa",
  fachada: "Fachada",
  "reparacion-estructural": "Reparación estructural",
  grietas: "Grietas",
  piscina: "Piscina",
  tanque: "Tanque",
  pisos: "Pisos industriales",
  pintura: "Pintura de fachada",
  mantenimiento: "Mantenimiento de PH",
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

async function markLeadNotified(
  supabase: NonNullable<ReturnType<typeof getSupabaseServiceClient>>,
  leadId: string,
  error?: string,
): Promise<void> {
  const { error: patchError } = await supabase
    .from("leads")
    .update({
      notified_at: new Date().toISOString(),
      notification_error: error ?? null,
    })
    .eq("id", leadId);
  if (patchError) {
    throw patchError;
  }
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

  const supabase = getSupabaseServiceClient();
  if (!supabase) {
    console.error(
      "[submitAdsLead] SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY no configurada. Lead NO persistido:",
      JSON.stringify({ ...parsed.data, ...tracking, mensaje }),
    );
    return {
      ok: false,
      error: leadSubmitErrorMessage(),
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

  const row: AdsLeadInsert = {
    nombre: parsed.data.nombre,
    telefono: parsed.data.telefono,
    problema: parsed.data.problema,
    tipo_propiedad: parsed.data.tipoPropiedad,
    ubicacion: parsed.data.ubicacion,
    puede_enviar_fotos: parsed.data.puedeEnviarFotos,
    mensaje,
    source: parsed.data.source,
    landing_path: parsed.data.landingPath,
    user_agent: userAgent ?? null,
    referrer: referrer ?? null,
    utm_source: tracking.utmSource ?? null,
    utm_medium: tracking.utmMedium ?? null,
    utm_campaign: tracking.utmCampaign ?? null,
    utm_term: tracking.utmTerm ?? null,
    utm_content: tracking.utmContent ?? null,
    gclid: tracking.gclid ?? null,
    gbraid: tracking.gbraid ?? null,
    wbraid: tracking.wbraid ?? null,
    ...(parsed.data.descripcion ? { descripcion: parsed.data.descripcion } : {}),
  };

  let leadId: string;
  try {
    const { data, error } = await supabase
      .from("leads")
      .insert(row)
      .select("id")
      .single();
    if (error || !data?.id) {
      throw error ?? new Error("insert public.leads no devolvió id");
    }
    leadId = data.id;
  } catch (err) {
    console.error("[submitAdsLead] Error guardando lead en Supabase:", err);
    return {
      ok: false,
      error: leadSubmitErrorMessage(),
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
      await markLeadNotified(supabase, leadId);
    } catch (patchErr) {
      console.error(
        "[submitAdsLead] Email enviado pero no pude marcar notified_at:",
        patchErr,
      );
    }
    return { ok: true, emailQueued: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(
      "[submitAdsLead] Falla en Resend (lead ya guardado en Supabase):",
      message,
    );
    try {
      await markLeadNotified(supabase, leadId, message);
    } catch (patchErr) {
      console.error(
        "[submitAdsLead] Tampoco pude registrar el error en Supabase:",
        patchErr,
      );
    }
    return { ok: true, emailQueued: false };
  }
}
