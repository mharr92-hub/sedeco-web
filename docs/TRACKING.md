# Tracking

GTM container may be empty; production events go via direct gtag. Attribution params persisted client-side (`sedeco_attribution`: gclid, gbraid, wbraid, utm_*).

WhatsApp and office-phone clicks on Ads pages (`whatsapp_click` / `phone_click` links) also POST `/api/cta-clicks`. The handler stores a row in `public.cta_clicks` with the service role. It does not write `public.leads`. GA4 events for those clicks are `cta_whatsapp` and `cta_tel` (no AW- ids).

Apply `supabase/migrations/20260924143342_cta_clicks.sql` on the sedeco-web Supabase project before expecting rows in production. The migration `cta_clicks` (version 20260924143342) is already recorded on that project; a fresh database still needs this file.
