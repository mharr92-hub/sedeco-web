# Auditoría SEDECO

Rama `fix/auditoria-sep26`. No se tocan #1 (tags GTM/Ads), #7 (cifras de home), #8 (claims de Ghostshield), #12 ni #24. WhatsApp único: +507 6550-8320.

## Bloque A — atribución y tracking

La cookie de 90 días del PR #19 ya usa SameSite=Lax y Secure en HTTPS, no pisa un gclid con un valor vacío y da prioridad a la URL. El formulario de inicio seguía en Convex, sin esos campos ni `generate_lead`; este bloque lo pasa al mismo envío de Supabase (`web_home`) y manda los eventos de formulario por gtag.

| # | Estado | Archivos | Verificación | Pendiente |
| --- | --- | --- | --- | --- |
| 2 | HECHO | `src/lib/tracking.ts`, `src/components/analytics/attribution-capture.tsx`, `src/components/ads/ads-lead-form.tsx`, `src/app/actions/submit-ads-lead.ts` | Cookie `sedeco_attribution`: Path=/, Max-Age 90 días, SameSite=Lax, Secure si la página es HTTPS. `resolveAttribution` deja ganar a la URL y conserva el gclid guardado si la URL nueva no lo trae. El formulario (home y Ads) escribe los hidden fields con `rememberAttribution` (URL y luego cookie/sessionStorage). El servidor rellena con la cookie solo las claves que el form no envió. `scripts/verify-audit.ts`. | Insert real en `public.leads` al cierre, si hay credenciales. |
| 3 | HECHO | `src/app/(marketing)/page.tsx`, `src/lib/data/service-pages.ts` (`HOME_LEAD`), `src/components/ads/ads-lead-form.tsx`, `src/lib/validations/lead.ts`, `src/components/ads/thank-you-client.tsx` | Home usa `AdsLeadDock` embebido y `submitAdsLead`. Source `web_home`, path `/`, atribución en el mismo insert. `gtag generate_lead {form:'home'}` solo en el efecto que corre cuando `state.ok`. | Confirmar fila en Supabase si hay service role. |
| 4 | HECHO | `src/components/ads/ads-lead-form.tsx`, `src/lib/analytics.ts` | `lead_form_start`, `lead_form_step_2` y `form_error` salen por `gtagEvent` con `{form}` y, en el error, `{field}`. No se envían nombre, teléfono, correo ni texto libre. No dependen de GTM. | — |
| 19 | HECHO | `src/app/(marketing)/privacidad/page.tsx` | Párrafo de GA4 y datos hasheados, con el texto pedido. Se quitó la frase que decía que gtag no se carga si hay GTM: el sitio sí carga GA4 por gtag. | — |

Fuera de este bloque: no se añadió ningún tag `AW-` ni se editó el contenedor GTM.

## Bloque B — conversión

El teléfono aceptaba cualquier cadena de 7 dígitos y el paso 1 no mostraba el error bajo el campo. En home, título y H1 seguía la palabra «permanente», y WhatsApp en privacidad y términos no llevaba `?text=`.

| # | Estado | Archivos | Verificación | Pendiente |
| --- | --- | --- | --- | --- |
| 5 | HECHO | `src/lib/validations/lead.ts`, `src/components/ads/ads-lead-form.tsx` | Celular de Panamá: 8 dígitos que empiezan en 6; acepta `+507`, espacios y guiones. El mensaje queda bajo el campo, con `aria-live="polite"` y borde `border-danger`. `scripts/verify-audit.ts` cubre `+507 6550-8320`, `65508320` y rechaza `3835175` y `12345678`. | — |
| 13 | HECHO | `src/components/ads/ads-lead-form.tsx`, `src/app/(marketing)/page.tsx` | Home usa el formulario de 2 pasos. El correo no se pide. La descripción es opcional. | — |
| 18 | HECHO | `src/app/layout.tsx`, `src/app/(marketing)/page.tsx`, `src/lib/site.ts` | Title por defecto, H1 y los textos de home que decían «permanente» pasan a «de larga duración». No se reescribieron claims de Ghostshield ni cifras. El title SEO final de `/` se ajusta en el bloque D al texto acordado. | — |
| 21 | HECHO | `src/app/(marketing)/privacidad/page.tsx`, `src/app/(marketing)/terminos/page.tsx` | Los enlaces usan `whatsappHref`, que arma `https://wa.me/50765508320?text=`. | — |
