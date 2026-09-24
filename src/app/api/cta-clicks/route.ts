import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { buildCtaClickInsert } from "@/lib/cta-click";
import { getSupabaseServiceClient } from "@/lib/supabase-server";

const BODY_MAX = 8_000;

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > BODY_MAX) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const hdrs = await headers();
  const row = buildCtaClickInsert({
    body,
    cookieHeader: hdrs.get("cookie"),
    userAgent: hdrs.get("user-agent"),
    referer: hdrs.get("referer"),
  });
  if (!row) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const supabase = getSupabaseServiceClient();
  if (!supabase) {
    console.error(
      "[cta-click] SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY no configurada. Clic NO persistido.",
      JSON.stringify({
        cta_type: row.cta_type,
        landing_path: row.landing_path,
        source: row.source,
        gclid: row.gclid,
      }),
    );
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  const { error } = await supabase.from("cta_clicks").insert(row);
  if (error) {
    console.error("[cta-click] Error guardando clic en Supabase:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return new NextResponse(null, { status: 204 });
}
