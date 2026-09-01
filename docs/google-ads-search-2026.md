# Google Ads Search 2026 — SEDECO Panamá

Arquitectura Rev. 1 (31 Aug 2026). **Una campaña por página de servicio.** Sin precios, sin descuentos, sin urgencia falsa, sin claims de años de garantía.

**Estado: spend = 0** hasta que Mark entregue GTM ID real + DNS 301 + Ads CID. No crear campañas live desde este doc. No gastar Ads. No inventar un GTM ID.

GTM/GA4 se inyectan solo si existen `NEXT_PUBLIC_GTM_ID` / `NEXT_PUBLIC_GA4_ID`. Conversiones a observar cuando exista contenedor:

| Evento | Cuándo | ¿Conversión Ads? |
|---|---|---|
| `lead_form_start` | Primer foco / abrir el form | Micro |
| `lead_form_step_2` | Continuar del paso 1 al 2 | Micro |
| `form_step1` | Alias del mismo paso (legacy) | No duplicar si ya usa `lead_form_step_2` |
| `lead_submit` | Submit OK, antes de `/gracias` | **Primaria** |
| `lead_form_submit` / `form_submit` | Alias legacy del mismo submit | No duplicar en GTM |
| `whatsapp_click` | Click WA (`location`: header, hero, sticky, footer, thank_you, bottom) | **Primaria** |
| `phone_click` | Click teléfono | Micro |
| `form_error` | Validación o fallo de servidor. Incluye `reason` | No |
| `thank_you_view` | `/gracias` | **No** (evitar doble conteo) |

`dataLayer.push` ocurre igual sin IDs. El snippet de GTM **no** se carga si `NEXT_PUBLIC_GTM_ID` está vacío. No hay GA4 inventado ni acciones de conversión Ads en este repo.

Cuando Mark pegue el GTM ID en `NEXT_PUBLIC_GTM_ID` (formato `GTM-XXXXXXX`):

1. En GTM, disparadores de Custom Event: `lead_submit`, `whatsapp_click`, `lead_form_step_2`, `form_error`.
2. Variables de capa de datos: `landing`, `location`, `problem`, `reason`.
3. Conversiones Ads: enlazar solo `lead_submit` y `whatsapp_click`. No usar `thank_you_view`.

CTA único en sitio y anuncios: **Solicitar inspección**.  
Garantía: **garantía por escrito según sistema y alcance contratado**. Nunca años ni «de por vida».  
WhatsApp: +507 6550-8320. Geo: Ciudad de Panamá + área metro; Colón opcional como ubicación, no como keyword de país.

---

## Mapa: una página, una campaña

| Página | Ads | Notas |
|---|---|---|
| `/impermeabilizacion-panama` | **Core** (pausada) | Zinc y juntas son sección dentro de esta página. `/impermeabilizacion-azoteas` → 301 aquí. |
| `/filtraciones` | **Core** (pausada) | Solo diagnóstico. No mezclar pisos / estructural / mantenimiento. |
| `/impermeabilizacion-fachadas` | **Core** (pausada) | Contenido: fachadas en altura / restauración. URL se mantiene. |
| `/pisos-industriales-panama` | **Core** (pausada) | B2B. `/sellado-concreto` → 301 aquí. |
| `/reparacion-estructural-panama` | **Later** (página live, campaña no) | Crear campaña solo cuando el núcleo esté estable. |
| `/pintura-edificios-panama` | **Later** (página live, campaña no) | Idem. |
| `/mantenimiento-ph` | **Never** | Direct sales. Página sí, campaña no. |
| Remodelación de áreas comunes | **Never** | Una línea en home, para clientes en obra. Sin página, sin campaña. |

---

## Message-match (KEYWORD → RSA H1 → LANDING H1 → CTA)

CTA en todos: **Solicitar inspección**.

| Intención | Keyword ejemplo | RSA H1 (≤30) | Landing | H1 de la página |
|---|---|---|---|---|
| Impermeabilización | impermeabilizacion panama | Impermeabilización Panamá | `/impermeabilizacion-panama` | Impermeabilización en Panamá: el sistema correcto para cada superficie. |
| Filtración / origen | filtraciones panama | ¿Filtración en su edificio? | `/filtraciones` | ¿Tienes una filtración en Panamá? Encontramos el origen antes de reparar. |
| Fachadas en altura | restauracion fachadas panama | Fachadas en altura Panamá | `/impermeabilizacion-fachadas` | Restauración de fachadas en altura con equipo propio. |
| Pisos industriales | pisos epoxicos panama | Pisos industriales Panamá | `/pisos-industriales-panama` | Pisos que aguantan la operación: epóxicos, concreto pulido y sellado industrial. |
| Reparación estructural (later) | reparacion estructural panama | Reparación estructural | `/reparacion-estructural-panama` | Reparación estructural: recuperamos la losa antes de protegerla. |
| Pintura edificios (later) | pintura edificios panama | Pintura de edificios | `/pintura-edificios-panama` | Pintura de edificios en altura, con la fachada reparada primero. |
| Marca | sedeco panama | SEDECO Panamá | `/` o `/impermeabilizacion-panama` | (home o H1 de impermeabilización) |

Azoteas / techos de zinc: keywords hacia `/impermeabilizacion-panama` (no hay LP de azoteas).

---

## Negativos compartidos (todas las campañas no-brand)

### Intención de empleo / job-seekers (obligatorio en cada campaña)

- empleo, trabajo, vacante, vacantes, curriculum, cv, sueldo, salario, planilla
- contratacion, contratan, se solicita, operador, obrero, ayudante
- vacante impermeabilizacion, trabajo en altura empleo
- oficios, bolsa de trabajo, requisicion, recursos humanos, rrhh
- albañil empleo, pintor vacante, andamiero, ayudante de obra

`trabajo` y `trabajos` chocan con «trabajos en altura» (servicio). Preferir exacta/frase para job-seekers; no bloquear el positivo de servicio.

### Retail, DIY, geo y junk (mantener)

- diy, youtube, tutorial, curso
- pintura barata, impermeabilizante ferreteria, homecenter, novey
- receta, quimico para comprar, galon, cubeta
- mexico, colombia, peru, chile, spain
- 100 años, de por vida, garantia de por vida
- ph torres ebelle, ebbelle, pine hill, constellation, 4 islas, twin towers, ibiza
- mantenimiento ph, plan de mantenimiento, vacante (ya cubierto) — no pujar mantenimiento-ph

**RSA y keywords: no mencionar** PH Torres Ebelle, Twin Towers, Constellation, Pine Hill, 4 Islas ni Ibiza.

---

## Campaña 1 — Impermeabilización (core)

- **Landing:** `/impermeabilizacion-panama`
- **Ad groups:** (1) Impermeabilización Panamá (2) Azoteas / losas / zinc (3) Tanques / piscinas
- **Keywords (frase / exacta):** impermeabilizacion panama, impermeabilizar panama, impermeabilizacion azoteas panama, impermeabilizar techo zinc panama, impermeabilizacion losas panama, empresa impermeabilizacion panama
- **RSA headlines (≤30):** Impermeabilización Panamá (27) · Diagnóstico primero (21) · Sistema según sustrato (23) · Azoteas, losas y tanques (25) · Solicite inspección (22) · Garantía por escrito (21) · Ciudad de Panamá (18) · No un producto único (21)
- **Descriptions:** Primero diagnosticamos el sustrato; después el sistema correcto. Garantía por escrito según sistema y alcance contratado. (≤90) · Zinc: HS 3200 Series. Concreto: GHOSTSHIELD LITHI-TEK 9500. Nunca LithiTek sobre zinc. (≤90)
- **Sitelinks:** Inspección | Filtraciones | Fachadas en altura | Pisos industriales
- **Conversión:** form_submit + whatsapp_click

## Campaña 2 — Filtraciones (core)

- **Landing:** `/filtraciones`
- **Intención:** síntoma (mancha, gotera, origen)
- **Keywords:** filtraciones panama, filtracion apartamento panama, detectar filtracion edificio, de donde viene la filtracion, humedad cielo raso panama
- **No** keywords de pisos, estructural ni mantenimiento hacia esta LP.
- **RSA:** Encontramos el origen (22) · Antes de volver a parchar (26) · Inspección técnica (19) · Solicite inspección (22)
- **Conversión:** form_submit + whatsapp_click

## Campaña 3 — Fachadas en altura (core)

- **Landing:** `/impermeabilizacion-fachadas`
- **Keywords:** restauracion fachadas panama, impermeabilizacion fachadas panama, pintura fachadas edificios panama, trabajo en altura fachadas panama, guindolas fachada panama
- **RSA:** Fachadas en altura (20) · Equipo propio certificado (26) · Restauración de fachada (24) · Guindolas ZLP 630 (18)
- **Conversión:** form_submit + whatsapp_click

## Campaña 4 — Pisos industriales (core)

- **Landing:** `/pisos-industriales-panama`
- **B2B.** Refs públicas (no en RSA): XTRA, Hospital MAG — sin precios de puja.
- **Keywords:** pisos epoxicos panama, pisos industriales panama, concreto pulido panama, sellado de pisos panama, pisos estacionamiento panama
- **RSA:** Pisos industriales PA (22) · Epóxicos y pulido (20) · Sellado GHOSTSHIELD (21) · Bodegas y comercios (21)
- **Conversión:** form_submit + whatsapp_click

## Later (página live, campaña no ahora)

- Reparación estructural → `/reparacion-estructural-panama`
- Pintura de edificios → `/pintura-edificios-panama`

## Never

- `/mantenimiento-ph` — no campaña
- Remodelación de áreas comunes — no página, no campaña

## Brand (opcional, pausada)

- Keywords exactas: sedeco, sedeco panama
- Landing: `/` o `/impermeabilizacion-panama`

---

## Claims prohibidos

- No «100 años», «de por vida», años de fabricante como promesa SEDECO
- No PH Torres Ebelle/Ebbelle, Pine Hill, Constellation, 4 Islas, Twin Towers, Ibiza en RSA/keywords
- No testimonios inventados, estrellas, #1, precios, descuentos, urgencia
- GHOSTSHIELD LITHI-TEK 9500: solo concreto o acero expuesto. Nunca zinc, metal ni membranas
- SiliconFlex Lanco 20 Años = nombre de producto, no plazo de garantía
- Garantía pública: «garantía por escrito según sistema y alcance contratado»
- Formulario: email opcional; WhatsApp obligatorio. Opciones de `problema` alineadas a cada página (no volcar todos los servicios en `/filtraciones`)
