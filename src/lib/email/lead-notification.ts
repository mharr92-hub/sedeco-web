import { Resend } from "resend";
import type { LeadFormInput } from "@/lib/validations/lead";

const fromEmail = process.env.RESEND_FROM_EMAIL ?? "noreply@sedeco.lat";
const notifyEmail =
  process.env.LEADS_NOTIFY_EMAIL ?? "mark@selladodeconcreto.com";

type LeadPayload = LeadFormInput & {
  source: string;
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

export async function sendLeadNotification(lead: LeadPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY no configurada");
  }

  const resend = new Resend(apiKey);
  const subjectTipo = lead.tipoProyecto ? ` · ${lead.tipoProyecto}` : "";

  const { error } = await resend.emails.send({
    from: `SEDECO Leads <${fromEmail}>`,
    to: notifyEmail,
    replyTo: lead.email,
    subject: `Nuevo lead: ${lead.nombre}${subjectTipo}`,
    text: buildTextBody(lead),
    html: buildHtmlBody(lead),
  });

  if (error) {
    throw new Error(`Resend ${error.name}: ${error.message}`);
  }
}

function buildTextBody(lead: LeadPayload): string {
  const lines = [
    `Nombre: ${lead.nombre}`,
    `Email: ${lead.email}`,
    `Teléfono: ${lead.telefono}`,
  ];
  if (lead.tipoProyecto) {
    lines.push(`Tipo de proyecto: ${lead.tipoProyecto}`);
  }
  lines.push(
    `Origen: ${lead.source}`,
    `Recibido: ${lead.createdAt.toISOString()}`,
    "",
    "Mensaje:",
    lead.mensaje,
  );
  return lines.join("\n");
}

function buildHtmlBody(lead: LeadPayload): string {
  const rows: Array<[string, string]> = [
    ["Nombre", lead.nombre],
    ["Email", lead.email],
    ["Teléfono", lead.telefono],
  ];
  if (lead.tipoProyecto) {
    rows.push(["Tipo de proyecto", lead.tipoProyecto]);
  }
  rows.push(["Origen", lead.source]);
  rows.push(["Recibido", lead.createdAt.toISOString()]);

  const tableRows = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#4A5663;font-size:14px;vertical-align:top;"><strong>${escapeHtml(
          k,
        )}</strong></td><td style="padding:6px 0;color:#0B0F14;font-size:14px;">${escapeHtml(v)}</td></tr>`,
    )
    .join("");

  const mensajeHtml = escapeHtml(lead.mensaje).replace(/\n/g, "<br>");

  return `<!doctype html>
<html lang="es">
<body style="margin:0;padding:24px;background:#F7F9FC;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#0B0F14;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #E4E8EE;border-radius:8px;padding:24px;">
    <h2 style="margin:0 0 16px;color:#1E3A8A;font-size:20px;">Nuevo lead — sedeco.lat</h2>
    <table style="border-collapse:collapse;width:100%;">${tableRows}</table>
    <div style="margin-top:20px;padding-top:16px;border-top:1px solid #E4E8EE;">
      <div style="color:#4A5663;font-size:13px;margin-bottom:6px;"><strong>Mensaje</strong></div>
      <div style="color:#0B0F14;font-size:14px;line-height:1.5;">${mensajeHtml}</div>
    </div>
  </div>
</body>
</html>`;
}
