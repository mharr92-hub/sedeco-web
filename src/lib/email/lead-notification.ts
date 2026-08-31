import { Resend } from "resend";
import type { TrackingFields } from "@/lib/tracking";

const fromEmail = process.env.RESEND_FROM_EMAIL ?? "noreply@sedeco.lat";
const notifyEmail =
  process.env.LEADS_NOTIFY_EMAIL ?? "mark@sedeco.lat";

export type LeadNotificationPayload = TrackingFields & {
  nombre: string;
  email?: string;
  telefono: string;
  tipoProyecto?: string;
  tipoPropiedad?: string;
  problema?: string;
  descripcion?: string;
  ubicacion?: string;
  puedeEnviarFotos?: string;
  mensaje: string;
  source: string;
  landingPath?: string;
  createdAt: Date;
};

const HTML_ESCAPE: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

function escapeHtml(input: string): string {
  return input.replace(/[&<>"']/g, (c) => HTML_ESCAPE[c] ?? c);
}

export async function sendLeadNotification(
  lead: LeadNotificationPayload,
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY no configurada");
  }

  const resend = new Resend(apiKey);
  const subjectTipo = lead.tipoPropiedad ?? lead.tipoProyecto ?? lead.problema;
  const subjectSuffix = subjectTipo ? ` · ${subjectTipo}` : "";

  const { error } = await resend.emails.send({
    from: `SEDECO Leads <${fromEmail}>`,
    to: notifyEmail,
    ...(lead.email ? { replyTo: lead.email } : {}),
    subject: `Nuevo lead: ${lead.nombre}${subjectSuffix}`,
    text: buildTextBody(lead),
    html: buildHtmlBody(lead),
  });

  if (error) {
    throw new Error(`Resend ${error.name}: ${error.message}`);
  }
}

function buildRows(lead: LeadNotificationPayload): Array<[string, string]> {
  const rows: Array<[string, string]> = [
    ["Nombre", lead.nombre],
    ["Teléfono", lead.telefono],
  ];
  if (lead.email) rows.push(["Email", lead.email]);
  if (lead.problema) rows.push(["Problema", lead.problema]);
  if (lead.tipoPropiedad) rows.push(["Tipo de propiedad", lead.tipoPropiedad]);
  if (lead.tipoProyecto) rows.push(["Tipo de proyecto", lead.tipoProyecto]);
  if (lead.ubicacion) rows.push(["Ubicación", lead.ubicacion]);
  if (lead.puedeEnviarFotos) {
    rows.push(["Puede enviar fotos", lead.puedeEnviarFotos]);
  }
  if (lead.landingPath) rows.push(["Landing", lead.landingPath]);
  rows.push(["Origen", lead.source]);
  if (lead.utmSource) rows.push(["utm_source", lead.utmSource]);
  if (lead.utmMedium) rows.push(["utm_medium", lead.utmMedium]);
  if (lead.utmCampaign) rows.push(["utm_campaign", lead.utmCampaign]);
  if (lead.utmTerm) rows.push(["utm_term", lead.utmTerm]);
  if (lead.utmContent) rows.push(["utm_content", lead.utmContent]);
  if (lead.gclid) rows.push(["gclid", lead.gclid]);
  if (lead.gbraid) rows.push(["gbraid", lead.gbraid]);
  if (lead.wbraid) rows.push(["wbraid", lead.wbraid]);
  rows.push(["Recibido", lead.createdAt.toISOString()]);
  return rows;
}

function buildTextBody(lead: LeadNotificationPayload): string {
  const lines = buildRows(lead).map(([k, v]) => `${k}: ${v}`);
  lines.push("", "Mensaje:", lead.mensaje);
  if (lead.descripcion) {
    lines.push("", "Descripción:", lead.descripcion);
  }
  return lines.join("\n");
}

function buildHtmlBody(lead: LeadNotificationPayload): string {
  const tableRows = buildRows(lead)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#4A5663;font-size:14px;vertical-align:top;"><strong>${escapeHtml(
          k,
        )}</strong></td><td style="padding:6px 0;color:#0B0F14;font-size:14px;">${escapeHtml(v)}</td></tr>`,
    )
    .join("");

  const mensajeHtml = escapeHtml(lead.mensaje).replace(/\n/g, "<br>");
  const descripcionHtml = lead.descripcion
    ? `<div style="margin-top:16px;"><div style="color:#4A5663;font-size:13px;margin-bottom:6px;"><strong>Descripción</strong></div><div style="color:#0B0F14;font-size:14px;line-height:1.5;">${escapeHtml(lead.descripcion).replace(/\n/g, "<br>")}</div></div>`
    : "";

  return `<!doctype html>
<html lang="es">
<body style="margin:0;padding:24px;background:#F7F9FC;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#0B0F14;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #E4E8EE;border-radius:8px;padding:24px;">
    <h2 style="margin:0 0 16px;color:#1E3A8A;font-size:20px;">Nuevo lead — sedeco.lat</h2>
    <table style="border-collapse:collapse;width:100%;">${tableRows}</table>
    <div style="margin-top:20px;padding-top:16px;border-top:1px solid #E4E8EE;">
      <div style="color:#4A5663;font-size:13px;margin-bottom:6px;"><strong>Mensaje</strong></div>
      <div style="color:#0B0F14;font-size:14px;line-height:1.5;">${mensajeHtml}</div>
      ${descripcionHtml}
    </div>
  </div>
</body>
</html>`;
}
