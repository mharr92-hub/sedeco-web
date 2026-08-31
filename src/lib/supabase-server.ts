import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type AdsLeadInsert = {
  nombre: string;
  telefono: string;
  email?: string | null;
  problema?: string | null;
  tipo_propiedad?: string | null;
  ubicacion?: string | null;
  puede_enviar_fotos?: string | null;
  descripcion?: string | null;
  mensaje: string;
  source: string;
  landing_path?: string | null;
  user_agent?: string | null;
  referrer?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_term?: string | null;
  utm_content?: string | null;
  gclid?: string | null;
  gbraid?: string | null;
  wbraid?: string | null;
  status?: string;
};

export type AdsLeadRow = AdsLeadInsert & {
  id: string;
  created_at: string;
  status: string;
  notified_at: string | null;
  notification_error: string | null;
};

type Database = {
  public: {
    Tables: {
      leads: {
        Row: AdsLeadRow;
        Insert: AdsLeadInsert;
        Update: Partial<AdsLeadRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

/**
 * Server-only client for `public.leads`. Uses the service role so RLS does not
 * block inserts. Never import this module from a Client Component, and never
 * expose `SUPABASE_SERVICE_ROLE_KEY` with a `NEXT_PUBLIC_` prefix.
 */
export function getSupabaseServiceClient(): SupabaseClient<Database> | null {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) return null;
  return createClient<Database>(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
