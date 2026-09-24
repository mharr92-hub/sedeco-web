-- Clicks de WhatsApp y teléfono. No es un lead: public.leads no cambia.
--
-- Aplicado en el proyecto sedeco-web (ref snedzexipeccwkwfnafw) como migración
-- cta_clicks, versión 20260924143342. Una base nueva (otro entorno o un reset)
-- tiene que correr este archivo: Supabase MCP apply_migration o el SQL editor.
-- No volver a ejecutarlo si la tabla ya existe.
--
-- La app inserta solo con la service role (mismo patrón que el formulario de
-- Ads). RLS queda activo y anon/authenticated no tienen GRANT ni política.

create table public.cta_clicks (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  cta_type text not null,
  landing_path text,
  source text,
  gclid text,
  gbraid text,
  wbraid text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  user_agent text,
  referrer text,
  href text,
  constraint cta_clicks_cta_type_check check (cta_type in ('whatsapp', 'tel'))
);

comment on table public.cta_clicks is
  'Clic en WhatsApp o teléfono, con atribución. No sustituye a public.leads.';

create index cta_clicks_created_at_idx
  on public.cta_clicks (created_at desc);

create index cta_clicks_gclid_idx
  on public.cta_clicks (gclid)
  where gclid is not null;

alter table public.cta_clicks enable row level security;

revoke all on table public.cta_clicks from public;
revoke all on table public.cta_clicks from anon, authenticated;
grant select, insert, update, delete on table public.cta_clicks to service_role;
