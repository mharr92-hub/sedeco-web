# Auditoría sedeco.lat — 28-sep-2026

Estado de los 20 puntos. Se actualiza al cerrar cada bloque.
`NO ENCONTRADO` = el dato no está en el repo y no se inventa.

## Bloque 2 — Tracking (pendientes)

| # | Punto | Estado | Detalle |
|---|---|---|---|
| 2a | Separar etiqueta de conversión en dos variables | HECHO | `NEXT_PUBLIC_GOOGLE_ADS_LABEL_LEAD` y `NEXT_PUBLIC_GOOGLE_ADS_LABEL_WHATSAPP`. `adsConversionLead()` y `adsConversionWhatsapp()` quedan inertes por separado mientras su variable esté vacía. Ambas etiquetas: NO ENCONTRADO en el repo. |
| 2b | Unificar `whatsapp_click` por gtag con `servicio` | HECHO | El listener delegado ya enviaba `whatsapp_click` por gtag con `servicio`. `TrackedLink` además lo empujaba al dataLayer, que sólo alimenta un contenedor GTM vacío; ese envío se suprime para este evento. `reportCtaClick` (registro con gclid) se mantiene. |
| 7 | Tag de conversión dentro de GTM | NO HECHO | Por indicación expresa: no crear tags en GTM. La conversión va por gtag. Añadir además el tag en GTM duplicaría el recuento en Ads. |
| 8 | `generate_lead` tras respuesta OK | HECHO | Ya estaba, dentro del guard `state.ok` y el ref `redirected`. |

**AW-ID:** `AW-18420800964` (cuenta 421-776-6039) activo en `gtag('config')` en las 24 páginas.

## Bloque 3 — Héroe, servicios y formulario

| # | Punto | Estado | Detalle |
|---|---|---|---|
| 9 | H1, subtítulo y pilar | HECHO | H1 e introducción nuevos en la home. "Encontramos el origen antes de reparar" pasa a segunda línea. "Restauración" sale del kicker. Se aplicó a la **home**, no a /filtraciones: esa frase era el H1 de la landing, que debe quedar intacta. |
| 10 | 15 tarjetas de servicio | HECHO | Catálogo de 9 a 15. Renombrados 5, eliminado "Drones de lavado", añadidos 7 (inspecciones-filtraciones, plomeria, ventanas-puertas, soldadura, albanileria, diseno-interiores, mantenimiento-general). 7 iconos nuevos. El orden lo fija `INTEGRAL_SERVICE_SLUGS`. El mensaje de WhatsApp de cada tarjeta parte del texto base y añade el servicio. |
| 11 | Piscina/Tanque, drones y renombrados | HECHO | Piscina y Tanque salen del select de impermeabilización y quedan citados en la línea de la tarjeta. "Drones de lavado" eliminado, con 301 de `/lavado-drones` a `/servicios` para no dejar un 404. H1 y metaTitle de `/impermeabilizacion-panama` y `/impermeabilizacion-fachadas` renombrados. |
| 12 | Formulario en 1 paso, 4 campos | NO HECHO | Bloquea un conflicto no resuelto: `problema` es un enum Zod (`problemaValues`) compartido con /filtraciones y validado en el servidor. Convertir ese select en "los 15 servicios" cambia el enum y, con él, la landing que debe quedar intacta y los valores ya guardados en `public.leads`. Requiere decidir antes si el formulario nuevo escribe los servicios en `problema` (ampliando el enum) o en la columna `servicio`, que ya existe. |

## Bloques 4 a 7 y verificación final

| Bloque | Estado | Detalle |
|---|---|---|
| 4 — Confianza (XTRA) | NO HECHO | No se llegó a ejecutar en esta sesión. |
| 5 — SEO / schema | NO HECHO | No se llegó a ejecutar en esta sesión. |
| 6 — Performance | NO HECHO | No se llegó a ejecutar en esta sesión. |
| 7 — Limpieza | PARCIAL | El barrido de WhatsApp ya está: 0 apariciones de 6550-8320 en el repo y todos los enlaces a wa.me/50760388649. El resto del bloque no se ejecutó. |
| Verificación final | NO HECHO | Build y lint: build OK; `next lint` no está configurado en el repo (pide configuración interactiva), es previo a estos cambios. Leads de prueba: NO EJECUTADOS. El conector de Supabase se desconectó en esta sesión, así que no puedo leer `public.leads` para confirmar gclid/utm/servicio. |

**No desplegado.** La instrucción era desplegar sólo si todo pasa, y no todo pasó. Los cambios quedan en la rama `feat/auditoria-sep28-bloques-3-7`.
