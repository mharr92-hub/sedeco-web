# Auditoría SEDECO

Rama `fix/auditoria-sep26`. No se tocan #1 (tags GTM/Ads), #7 (cifras de home), #8 (claims de Ghostshield), #12 ni #24. WhatsApp único: +507 6550-8320.

## Bloque A — atribución y tracking

La cookie de 90 días del PR #19 ya usa SameSite=Lax y Secure en HTTPS, no pisa un gclid con un valor vacío y da prioridad a la URL. El formulario de inicio seguía en Convex, sin esos campos ni `generate_lead`; este bloque lo pasa al mismo envío de Supabase (`web_home`) y manda los eventos de formulario por gtag.

| # | Estado | Archivos | Verificación | Pendiente |
| --- | --- | --- | --- | --- |
| 2 | HECHO | `src/lib/tracking.ts`, `src/components/analytics/attribution-capture.tsx`, `src/components/ads/ads-lead-form.tsx`, `src/app/actions/submit-ads-lead.ts` | Cookie `sedeco_attribution`: Path=/, Max-Age 90 días, SameSite=Lax, Secure si la página es HTTPS. `resolveAttribution` no se reescribió: la URL gana y un valor vacío no pisa el gclid. Extensión: el mismo JSON guarda el primer referrer externo y el POST same-site no lo reemplaza por la propia página. `scripts/verify-audit.ts`. | Insert real en `public.leads`: NO ENCONTRADO (sin credenciales). |
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
| 18 | HECHO | `src/app/(marketing)/page.tsx` | H1 «Sellado de concreto de larga duración.» El cuerpo de home ya no dice «permanente». Claims de Ghostshield y cifras no se reescribieron. El title de `/` es el de Content, en el bloque D. | — |
| 21 | HECHO | `src/app/(marketing)/privacidad/page.tsx`, `src/app/(marketing)/terminos/page.tsx` | `?text=` exacto: «Hola, consulta sobre privacidad SEDECO» y «Hola, consulta sobre términos SEDECO». | — |

## Bloque C — técnico

Las 7 fichas de casos enlazaban a `/servicios/*` y el hero marcaba `priority` en las dos fotos, así que el móvil precargaba también la de escritorio. El dorado `#F5A623` sobre blanco queda en 2.03:1 y el footer usaba 11px.

| # | Estado | Archivos | Verificación | Pendiente |
| --- | --- | --- | --- | --- |
| 11 | HECHO | `src/lib/data/cases.ts` (`SERVICE_PUBLIC_PATH`), `src/app/(marketing)/casos/[slug]/page.tsx` | Fachadas → `/impermeabilizacion-fachadas`; impermeabilización, azoteas, tanques y piscinas → `/impermeabilizacion-panama`; sellado → `/pisos-industriales-panama`; grietas → `/reparacion-estructural-panama`; filtraciones → `/filtraciones`. | — |
| 6 | HECHO en código. Meta LCP &lt;2,5 s: `/casos` y `/servicios` sí; `/` no | `src/components/ads/ads-photo.tsx`, `src/app/(marketing)/page.tsx`, `src/components/ads/ads-landing.tsx`, `src/app/(marketing)/casos/page.tsx`, `src/components/analytics/data-layer.tsx` | El hero es un `picture`: el preload apunta a `/_next/image`, no al JPEG original (~380 KB). gtag, GTM y el init del dataLayer usan `afterInteractive`. En `/casos` solo la primera tarjeta lleva `priority`. | LCP simulado de `/` sigue sobre 2,5 s (ver cierre). |
| 15 | HECHO en código. Misma meta de LCP que #6 | mismos que #6 | Se quitaron `lead-form.tsx`, `service-card.tsx` y `submit-lead.ts`. `lucide-react`, `react-hook-form`, `@hookform/resolvers` y `class-variance-authority` no tienen imports. | LCP de `/` y `/filtraciones` medido, por encima de 2,5 s. |
| 14 | HECHO | `src/app/globals.css`, `src/components/site/case-card.tsx`, `src/components/ads/ads-landing.tsx`, `src/components/ads/service-offer-page.tsx`, `src/app/(marketing)/casos/[slug]/page.tsx`, `src/app/(marketing)/servicios/[slug]/page.tsx`, `src/app/(marketing)/page.tsx` | Texto dorado sobre blanco pasa de `#F5A623` (2.03:1) a `#7A5209` (6.91:1). El dorado sobre `#070F26` se deja (9.37:1). Cuerpo `#5C6578` sobre blanco: 5.85:1. No se modificó la barra de cifras. | — |
| 20 | HECHO | `src/components/site/footer.tsx`, `src/components/ads/ads-footer.tsx` | Etiquetas del footer a `text-xs` (12px). Enlaces con `min-h-6` (24px). | — |
| 25 | HECHO | `next.config.mjs` (sin cambio: ya era un salto) | `curl -sIL https://www.sedeco.lat/servicios/{impermeabilizacion,fachadas,azoteas,filtraciones,sellado-concreto,tanques,grietas,piscinas}`: cada uno responde 308 a la URL final y el siguiente salto es 200. | — |

## Bloque D — SEO

El JSON-LD de home decía «SEDECO, S.A.» y otra dirección. Los titles de las landing pasaban de 60 caracteres o no llevaban la keyword acordada. `lastmod` era `new Date()` en cada generación. No existía `/inspeccion-boroscopica`.

| # | Estado | Archivos | Verificación | Pendiente |
| --- | --- | --- | --- | --- |
| 9 | HECHO | `src/lib/site.ts`, footers, `privacidad`, `terminos` | `legalName` «Tanya Engineering, S.A.». Dirección única: «RBS Tower, Ave. Balboa y Ramón H. Jurado, Planta Baja, Oficina 103A, Punta Paitilla». Teléfonos: +507 383-5175, +507 383-5176, +507 6550-8320. | — |
| 10 | HECHO | `src/lib/data/service-pages.ts`, `src/lib/data/ads-landings.ts`, `src/app/(marketing)/page.tsx`, `servicios/page.tsx` | Fachadas: «restauración e impermeabilización de fachadas». Pintura: «pintura de edificios». Home: marca + sellado de concreto. `/servicios` no lleva una keyword principal. | — |
| 16 | HECHO | titles de home, LPs, casos y servicios | Copy exacto de Content. Todos ≤60. `scripts/verify-audit.ts`. | — |
| 17 | HECHO con el copy pedido | descriptions de esas mismas rutas | Texto exacto de Content. Miden 52–81 caracteres, bajo el piso de 120. No se inventó texto para llegar al rango. | Content puede alargar las metas si quiere 120–155. |
| 22 | HECHO | `src/lib/site.ts` `localBusinessJsonLd` | `image` (OG) y `geo` del pin publicado de RBS Tower (near-place.com, 8.9777693, -79.5158156). Validación estructural en `scripts/verify-audit.ts`. Rich Results de Google: NO MEDIDO (la página no está publicada en esta rama). | Rich Results en la URL pública, después del deploy. |
| 23 | HECHO | `src/app/sitemap.ts` | Se quitó `lastModified: new Date()`. No hay fecha real de cada URL. | — |

LP `/inspeccion-boroscopica` y bloque en home: HECHO. Title «Inspección boroscópica desagües | SEDECO». H1 «Inspección con cámara boroscópica en desagües». Incluye diagnóstico e informe y WhatsApp +507 6550-8320. Sin precios ni plazos de garantía.

### Titles y metas de Content (copy exacto)

Titles ≤60. Las metas se pegaron tal cual las entregó Content: todas quedan bajo 120 caracteres. No se alargaron.

| Ruta | Title | T | Meta | M |
| --- | --- | --- | --- | --- |
| `/` | SEDECO Panamá \| sellado de concreto | 35 | Sellado de concreto e impermeabilización en Panamá. Solicite inspección técnica. | 80 |
| `/filtraciones` | Filtraciones y fugas Panamá \| SEDECO | 36 | Detección e inspección de filtraciones en techos y fachadas. Solicite inspección. | 81 |
| `/impermeabilizacion-panama` | Impermeabilización Panamá \| SEDECO | 34 | Impermeabilización de techos, tanques y concreto. Diagnóstico en sitio. | 71 |
| `/impermeabilizacion-fachadas` | Restauración e impermeabilización de fachadas | 45 | Sellado y restauración de fachadas en Panamá. Solicite inspección técnica. | 74 |
| `/pintura-edificios-panama` | Pintura de edificios Panamá \| SEDECO | 36 | Pintura de edificios y mantenimiento de fachadas. Solicite inspección. | 70 |
| `/pisos-industriales-panama` | Pisos industriales Panamá \| SEDECO | 34 | Sistemas para pisos industriales en Panamá. Solicite inspección técnica. | 72 |
| `/servicios` | Servicios SEDECO Panamá | 23 | Sellado, impermeabilización y servicios técnicos. Solicite inspección. | 70 |
| `/casos` | Casos SEDECO Panamá \| Obras reales | 34 | Proyectos de sellado e impermeabilización en Panamá. | 52 |
| `/inspeccion-boroscopica` | Inspección boroscópica desagües \| SEDECO | 40 | Cámara en tuberías de desagüe. Diagnóstico e informe. Solicite inspección. | 74 |

## Bloque C en esta ronda

Sin cambio de código. Hero, contraste, enlaces de casos y redirects siguen como en `accfaaf` y `75c39a5`. El LCP simulado medido antes no se volvió a correr.

## Verificación final

`npm run build` (Next.js 15.5.15, 34 páginas) y `CI=true npx next lint --max-warnings 0` pasan. `scripts/verify-audit.ts`: atribución, teléfono de Panamá y NAP ok. No hay `.env`, `.env.local` ni `.env.production`: el insert en `public.leads` es NO ENCONTRADO. No se inventó una fila.

Lighthouse móvil de la medición anterior (simulacro Slow 4G, mediana de 3 corridas, `http://127.0.0.1:3456`, 23 sep 2026). Esta ronda solo cambia copy; no se volvió a medir:

| Ruta | LCP simulado (ms) | Performance | LCP observado en el laboratorio (ms) |
| --- | --- | --- | --- |
| `/` | 3466, 3462, 3014 → mediana 3462 | 0,91 | 88, 104, 83 |
| `/casos` | 2228, 2202, 2211 → mediana 2211 | 0,98 | 67, 58, 59 |
| `/filtraciones` | 3015, 3460, 3460 → mediana 3460 | 0,91 | 73, 82, 80 |
| `/servicios` | 2059, 1659, 2046 → mediana 2046 | 0,98 | no anotado |

`curl -sIL http://127.0.0.1:3456/servicios/fachadas`: 308 a `/impermeabilizacion-fachadas` y después 200. Un salto.

Los bloques C y D quedaron en el mismo commit (`accfaaf`): el `git add` del SEO también incluyó el hero, el contraste y los enlaces de casos. El commit posterior cierra lint (`next/link`, deps de hooks, dataLayer `afterInteractive`, `.eslintrc.json`) y el preload del hero optimizado.

No se hace merge a `main`: el LCP simulado de `/` y `/filtraciones` queda sobre 2,5 s, y el lead real no se pudo confirmar.
