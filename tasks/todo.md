# Slice 1 — Foundation scaffold

## Plan (acordado verbalmente: "Vamos con defaults")
- [x] `git init` en la raíz, branch `main`
- [x] Actualizar `.env.example`: `NEXT_PUBLIC_SITE_URL=https://sedeco.lat` y agregar `CLERK_JWT_ISSUER_DOMAIN`
- [x] `src/app/layout.tsx` — Inter / Fraunces / JetBrains vía `next/font`, `lang="es"`, `metadataBase` con sedeco.lat
- [x] `src/app/globals.css` — Tailwind directives + base styles
- [x] `src/app/page.tsx` — hero, TrustBar, 3 cards de diferenciadores con copy del catálogo + JSON-LD GeneralContractor
- [x] `src/app/sitemap.ts` y `src/app/robots.ts` — estructura SEO básica resolviendo a sedeco.lat
- [x] `src/lib/utils.ts` — `cn()` helper
- [x] `src/middleware.ts` — `clerkMiddleware` con matcher `/admin/:path*` (no toca rutas públicas)
- [x] `src/components/site/trust-bar.tsx` — las 4 cifras del catálogo (+50, +100,000 m², +25 años, 2020)
- [x] `src/components/site/footer.tsx` — Paitilla + WhatsApp + email + Instagram, todo del catálogo
- [x] `convex/schema.ts` (vacío) y `convex/auth.config.ts` (lee `CLERK_JWT_ISSUER_DOMAIN`)
- [x] `npm install` (400 paquetes, 1 min)
- [x] `npm run dev` y verificar boot limpio

## Review
- **Boot del dev server:** Ready en 1.99 s, sin warnings, sin errores. `GET /` 200, `/robots.txt` 200, `/sitemap.xml` 200.
- **Copy verificado en HTML rendered:** "Sellado de concreto permanente", "+100,000 m²", "+50", "Aplicadores autorizados de Ghostshield", "Paitilla", "sedecopanama", JSON-LD GeneralContractor con Mark Harrick y Roni Litmanovich.
- **SEO listo desde día 1:** `metadataBase` + canonical en home → `sedeco.lat`. `sitemap.xml` y `robots.txt` apuntan a `sedeco.lat`. JSON-LD LocalBusiness en home con dirección Paitilla, founders, areaServed (Ciudad de Panamá + Colón) y `sameAs` Instagram.
- **Lo que NO se incluyó (intencional, viene en slices siguientes):**
  - `ClerkProvider` + `ConvexProviderWithClerk` (requieren env reales para no romper boot público)
  - Tabla de `leads` en Convex y form de leads → Resend
  - Páginas de servicios, casos, equipo
  - Logo SVG y favicon en `public/`
  - `eslint.config.mjs` (necesario para `next lint`)
- **Ajuste posterior aplicado:** Mark corrigió dominio `sedeco.com` → `sedeco.lat`; se actualizó `.env.example`, fallbacks en código, sitemap, robots y JSON-LD antes del verify.
- **Vulnerabilidades:** 3 moderadas en `npm audit` — esperadas en fresh install de Next 15.1; revisar al hacer hardening.

## Pendientes que necesitan input de Mark antes del próximo slice
- [ ] Dominio FROM de Resend: `.env.example` aún tiene `noreply@sedeco.com.pa`. ¿Se verifica `sedeco.lat` en Resend o se sigue con `selladodeconcreto.com`?
- [ ] ¿Se compra/configura `sedeco.lat` ya, para poder hacer un primer deploy a Vercel y verificar SEO en vivo?


---

# Slice 2 — Lead form + Resend integration

## Plan (Mark: "A → Lead form + Resend, sin deploy todavía")
- [x] Actualizar `.env.example`: `RESEND_FROM_EMAIL=noreply@sedeco.lat`, `LEADS_NOTIFY_EMAIL=mark@selladodeconcreto.com`, eliminar `RESEND_TO_LEADS`
- [x] Agregar `convex/_generated/` al `.gitignore`
- [x] Tabla `leads` en `convex/schema.ts` con `status`, índices `by_email` y `by_status`
- [x] Mutaciones `createLead` + `markNotified` en `convex/leads.ts`
- [x] Schema zod en `src/lib/validations/lead.ts` (5 campos: nombre, email, teléfono, tipoProyecto opcional, mensaje)
- [x] Cliente Convex servidor en `src/lib/convex-server.ts`
- [x] Sender Resend en `src/lib/email/lead-notification.ts` con escape HTML
- [x] Server action `submitLead` en `src/app/actions/submit-lead.ts`
- [x] `LeadForm` client component con `useActionState` en `src/components/site/lead-form.tsx`
- [x] Integrar `<LeadForm />` en `src/app/page.tsx` con `id="contacto"`
- [x] Verificar `npm run dev` boot limpio + form renderiza

## Diseño defensivo (instrucción de Mark)
- Convex requerido: si `NEXT_PUBLIC_CONVEX_URL` falta, server action devuelve error claro al usuario y loguea el lead a stderr (no se pierde info, pero se sabe que hay setup pendiente)
- Resend opcional: solo se intenta si hay `RESEND_API_KEY`. Si falla el envío, lead ya quedó guardado y se persiste el error en `notificationError`
- HTML escape en email body (XSS preventiva)

## Boundaries (no en este slice)
- No correr `npx convex dev` (requiere auth interactiva de Mark; codegen viene cuando él esté listo)
- No deploy a Vercel
- No servicios, casos, admin
- No usar react-hook-form: validación es server-only via zod + nativos HTML; reduce duplicación, simplifica

## Review
- **Hot-reload limpio:** Tras agregar 8 archivos nuevos + editar `page.tsx` y `.env.example`, el dev server compiló de 576 → 723 módulos sin errores ni warnings. `GET /` siguió 200, 46 KB (vs 38 KB antes — el aumento es Convex/zod/Resend/RHF compilados).
- **Form verificado en HTML rendered:** los cinco campos (`nombre`, `email`, `telefono`, `tipoProyecto`, `mensaje`), `<form>`, `<select>`, `<textarea>`, ancla `id="contacto"`, CTAs "Solicitar diagnóstico" (hero → `#contacto`) y "Solicitar un diagnóstico" (sección).
- **Flujo del server action verificado por inspección de código:**
  1. `safeParse` con zod — devuelve errores por campo si falla
  2. Convex client (si falta env, error 4xx-friendly + stderr log con el lead crudo, no se pierde info)
  3. `client.mutation(createLeadRef, ...)` con `userAgent` + `referer` capturados de headers
  4. Si hay `RESEND_API_KEY`: `sendLeadNotification`; si éxito → `markNotified`; si falla → `markNotified` con `notificationError`. Lead nunca se pierde.
- **Llamadas a Convex sin codegen:** `makeFunctionReference<"mutation">("leads:createLead")` — patrón oficial pre-codegen. Cuando Mark corra `npm run convex:dev` por primera vez, reemplazar por `api.leads.createLead` desde `convex/_generated/api`.

## Pendientes que necesitan acción de Mark antes del próximo slice
- [ ] Correr `npm run convex:dev` una vez (auth interactiva por browser) para provisionar deployment + generar codegen. Esto persiste leads de verdad.
- [ ] Crear `.env.local` con `NEXT_PUBLIC_CONVEX_URL` (lo da `convex dev`) — sin esto el form devuelve error "El sistema aún no está completamente configurado".
- [ ] Cuando esté listo: agregar `RESEND_API_KEY` a `.env.local` y verificar dominio `sedeco.lat` en Resend (DKIM/SPF/DMARC).
- [ ] Decidir si `LEADS_NOTIFY_EMAIL` debe ser solo `mark@selladodeconcreto.com` o también CC a otra persona (ahora es solo uno).


---

# Slice 3 — /casos + portfolio data structure (C)

## Objetivo
Construir la página `/casos` con los 11 proyectos hito que Mark priorizó, y dejar la **data en una sola fuente de verdad** que se reutilice en Home (sección "Casos destacados") y en futuras páginas de servicios (`/servicios/<slug>` filtra por categoría).

## Principios
- **No inventar cifras.** Si un proyecto no tiene m² documentado en el catálogo, se omite el campo.
- Los campos `problema` y `resultado` se redactan **a partir de hechos del catálogo** (tipo de obra, producto aplicado, firmante de la carta), no de imaginación.
- Reuso > duplicación: data en `src/lib/data/cases.ts`, render en componentes pequeños.

## Data structure (única fuente de verdad)

`src/lib/data/cases.ts` exporta:
- `type Case`:
  - `slug` — id url-safe (`ph-torres-ebelle`)
  - `name` — "PH Torres Ebelle"
  - `location?` — "Marbella, Ciudad de Panamá"
  - `workType` — categoría legible ("Impermeabilización de fachada vertical")
  - `services: ServiceSlug[]` — etiquetas para filtrado en futuras páginas de servicios (`fachadas`, `azoteas`, `tanques`, `grietas`, `piscinas`, etc.)
  - `scope` — descripción técnica corta del alcance (productos + qué se trató)
  - `squareMeters?: number` — total numérico, solo si está documentado
  - `squareMetersDetail?: string` — desglose textual cuando aplica ("3,000 m² horizontales + 2,000 m² verticales")
  - `problem` — qué condición resolvió (clima, exposición, fuga, etc.) — derivado de hechos
  - `result` — qué se entregó + respaldo (carta firmada por X de Y)
  - `signedBy?: { name: string; role: string }` — firmante de la carta de respaldo
  - `featured?: boolean` — para selección en Home
  - `order: number` — orden estable de display
- Helpers exportados:
  - `getAllCases()` → ordenado por `order`
  - `getFeaturedCases(limit?)` → solo `featured: true`
  - `getCaseBySlug(slug)` → un caso (para futura `/casos/[slug]`)
  - `getCasesByService(serviceSlug)` → para futura `/servicios/[slug]`

## Lista de casos (con datos verificados del catálogo, en orden de prioridad de Mark)

1. **PH Torres Ebelle** — Marbella · 22,000 m² verticales (8 caras, 77 m altura) · LITHI TEK 9500 + poliuretano · firma Lennys Alcántara, SI Inmobiliaria
2. **Comunidad Hebrea Shevet Ahim** — 5,000 m² (3,000 horizontales + 2,000 verticales en sinagogas) · firma Ezra Cohen, Director Ejecutivo
3. **PH Millenium Park** — Vía Transístmica · 1,100 m² azotea · agosto 2022 · firma Johnatan Fincheltub, Promotora Millenium Group
4. **PH Mallorca** — 96 unidades, 3 torres · sin m² documentado
5. **PH Mónaco** — Obarrio · 750 m² (250 azotea + 500 fachada) · firma Nicola Pirro, Tesorero
6. **PH Quadrat** — San Francisco, Calle 73 · losa nueva con LITHI TEK 9500 · firma Lic. José González Soto · sin m² documentado
7. **Fundación Deveaux** — fachada 5 pisos + 250 m² azotea + 500 m² techo (= 750 m² horizontales) · firma Yamileth Samaniego
8. **The Towers** — listado en catálogo · sin m² ni detalle adicional documentado
9. **PH Twin Towers** — 36 pisos, fachada compleja · sin m² documentado
10. **PH Constellation** — 17 pisos, fachada + piscina azotea · sin m² documentado
11. **PH Dos Mares** — 10 pisos · sin m² documentado

> Para los casos sin metraje (4, 6, 8, 9, 10, 11) **no inventaré m²**. Mostraré "Pisos" o "Unidades" cuando exista, y los demás campos se redactan con los hechos del catálogo.

## Tareas

- [x] `src/lib/data/cases.ts` — type `Case`, type `ServiceSlug` (8 slugs incluyendo `sellado-concreto` e `impermeabilizacion`), array de 11 casos, helpers (`getAllCases`, `getFeaturedCases`, `getCaseBySlug`, `getCasesByService`)
- [x] `src/components/site/case-card.tsx` — card reutilizable; cada bloque (`squareMeters`, `scope`, `problem`, `result`, `signedBy`) renderiza condicionalmente, CTA "Solicitar inspección similar" → `/#contacto`
- [x] `src/app/casos/page.tsx` — hero + grid 3 cols + CTA final → `/#contacto`
- [x] `src/app/casos/page.tsx` — `metadata` con canonical `/casos` + JSON-LD `ItemList` de los 11 proyectos
- [x] `src/app/sitemap.ts` — agregado `/casos` con priority 0.8
- [x] `npx tsc --noEmit` limpio
- [x] `npm run dev` boot limpio (Ready in 2s) + `GET /casos` 200 + `GET /` 200 + `GET /sitemap.xml` 200 + `GET /robots.txt` 200

## Decisiones aplicadas (confirmadas por Mark)
1. **Casos sin testimonial detallado** (5 casos: Mallorca, Twin Towers, Constellation, Dos Mares, The Towers) → reducidos a `name + workType + scope` solamente. Sin `problem`/`result`/`signedBy` inventados. Verificado en HTML rendered: las cards de esos slugs no contienen los strings "Problema", "Resultado", "Carta de respaldo".
2. **CTA "Solicitar inspección similar"** → enlazado a `/#contacto` (default param de `CaseCard`, sobrescribible).
3. **Taxonomía `ServiceSlug`** → 8 slugs: `fachadas | azoteas | tanques | grietas | piscinas | diagnostico | sellado-concreto | impermeabilizacion`. Cada caso etiquetado con los servicios aplicables.
4. **The Towers** → no hay workType ni scope documentado. Marcado con `workType: "Proyecto del portafolio"` y sin scope. Mark puede expandirlo cuando llegue la carta.

## Review
- **11 casos rendereados** en `/casos`, verificado por count de slugs en HTML: las 11 ocurrencias presentes.
- **m² documentados** (5 casos): 22,000 (Torres Ebelle), 5,000 (Shevet Ahim), 1,100 (Millenium Park), 750 (Mónaco), 750 (Deveaux). Verificado en HTML.
- **m² omitidos** (6 casos): Mallorca, Quadrat, Twin Towers, Constellation, Dos Mares, The Towers. Sin números inventados.
- **Firmantes documentados** (6 casos): Lennys Alcántara, Ezra Cohen, Johnatan Fincheltub, Nicola Pirro, Lic. José González Soto, Yamileth Samaniego. Todas las cartas referenciadas con `signedBy`. Los otros 5 casos no tienen `signedBy`.
- **JSON-LD `ItemList`**: 11 proyectos con `@type: Project`, `name`, `location?`, `description`, `url` con anchor por slug. Verificado: 11 ocurrencias de `"@type":"Project"` en HTML.
- **Reuso preparado**: `getFeaturedCases()` retorna 3 casos hito (Torres Ebelle, Shevet Ahim, Millenium Park) para Home en próximo slice. `getCasesByService()` retorna casos por taxonomía para futuras `/servicios/[slug]`. Cero refactor cuando lleguen.
- **Diff impactado**: 3 archivos nuevos (data, card, page) + 1 línea agregada al sitemap. Cero cambios a código existente (Home, layout, footer, lead-form, schema, etc.).
- **Hot-reload limpio**: dev server arrancó en 2s sin warnings.

## Lo que NO se hizo (intencional, fuera del slice C)
- No `/casos/[slug]` (página de detalle individual). La data soporta `getCaseBySlug` pero la UI no se construyó.
- No se actualizó Home para consumir `<CaseCard>` con `getFeaturedCases()`. Mark no lo pidió en este slice; queda listo para el siguiente.
- No imágenes de proyectos en cards (no hay assets en `/public`). Cards son tipográficos.
- No `/servicios/[slug]` que consumiría `getCasesByService`.

## Pendientes que necesitan input de Mark
- [ ] ¿Insertar la sección "Casos destacados" en Home consumiendo `getFeaturedCases(3)`? Es el primer consumidor natural del data store nuevo.
- [ ] Para los 5 casos reducidos (Mallorca, Twin Towers, Constellation, Dos Mares, The Towers): si tienes copia de las cartas o detalles del trabajo realizado, podemos enriquecerlos sin inventar.
- [ ] ¿Construimos `/casos/[slug]` para páginas de detalle individuales con galería + carta escaneada? Eso multiplicaría el SEO de cola larga.

## Boundaries (NO en este slice)
- No `/casos/[slug]` (página de detalle individual) — la data está lista para soportarlo, pero el slice C solo pide el index
- No reemplazar copy del Home con `<CaseCard>` aún — eso es el primer consumidor de la data, pero Mark no lo pidió en este slice. Lo dejo listo (`getFeaturedCases`) para el siguiente.
- No imágenes de proyectos — no hay assets en `/public` aún; los cards se diseñan tipográficos hasta que existan fotos
- No `/servicios/<slug>` — esa página consumirá `getCasesByService` cuando se construya (siguiente slice de servicios)

## Riesgos / decisiones a confirmar
1. **Copy de "problema" y "resultado" en casos sin testimonial detallado** (The Towers, PH Dos Mares, etc.): voy a escribir 1 oración derivada del tipo de obra ("Edificio de 10 pisos expuesto al ambiente costero panameño…"). Si prefieres dejar esos casos solo con nombre + tipo + scope hasta tener carta, dímelo y los muestro reducidos.
2. **CTA "Solicitar inspección similar"**: lo cableo a `/#contacto` (el form ya existe en Home). Si quieres una landing de inspección dedicada, lo cambio.
3. **Etiquetas `services`**: voy a usar `["fachadas", "azoteas", "tanques", "grietas", "piscinas", "diagnostico"]` como `ServiceSlug` enum para que coincida con las 8 categorías del catálogo (consolidando "sellado nano" y "techos silicona" como modos dentro de fachadas/azoteas). Si prefieres una taxonomía distinta, ajustamos antes de escribir la data.


---

# Slice 4 — WhatsApp float + UI polish quirúrgico

## Plan (aprobado por Mark — 2026-04-30)
- [x] Crear `src/components/site/whatsapp-float.tsx` — fixed bottom-right, ícono SVG WhatsApp inline (sin librerías), mensaje pre-llenado para filtración, accesible (`aria-label`), responsive
- [x] Mount `<WhatsAppFloat />` en `src/app/layout.tsx` (renderiza en home, /casos y futuras)
- [x] Hero (`src/app/page.tsx`): agregar línea de credibilidad "+100,000 m² · +50 proyectos · desde 2020" entre subhead y CTAs
- [x] Hero CTA secundario: reemplazar "WhatsApp directo" → ícono WhatsApp inline + "WhatsApp"
- [x] Cards diferenciadores (`src/app/page.tsx`): agregar `border border-ink-100` a las 3 cards
- [x] `npx tsc --noEmit` limpio (cero errores)

## Decisiones aplicadas (confirmadas por Mark)
- **Mantener accent naranja Ghostshield (#E55A1A).** No introducir azul ni cambiar tokens de color. La coherencia con Ghostshield pesa más que una heurística genérica de "azul = trust".
- **"Trust" se refuerza con navy-900 + jerarquía tipográfica**, no con un tercer color.
- **Sin nuevas librerías.** SVG WhatsApp inline (path oficial de la marca). Duplicado entre float button y hero CTA — 3 líneas duplicadas pesan menos que un archivo de iconos compartido para solo dos usos.
- **El botón flotante usa el verde WhatsApp #25D366** (señal universal reconocida — el usuario espera ese color para esa acción específica). No es accent de marca; es affordance.

## Boundaries (NO en este slice)
- No tocar Convex, schema, lead form, server action, sitemap, robots, JSON-LD, metadata
- No tocar TrustBar, footer, /casos, lead-form
- No agregar librerías de iconos (Lucide, Heroicons, Radix, etc.)
- No refactorizar el sistema de color en `globals.css` — los tokens Tailwind existentes ya cubren todo

## Review
- **Diff total**: 1 archivo nuevo (`whatsapp-float.tsx`, 24 líneas) + 2 ediciones puntuales (`layout.tsx`: +2 líneas; `page.tsx`: +18 líneas en hero, +`border border-ink-100` en 3 cards). Cero archivos eliminados, cero refactor, cero cambios a Convex / lead form / sitemap / metadata / footer / TrustBar / /casos.
- **WhatsApp float**:
  - Fixed `bottom-5 right-5` móvil, `bottom-6 right-6` desktop. `z-50` para superponerse al footer.
  - Tamaño 14×14 móvil, 16×16 desktop (target táctil >44 px Apple HIG).
  - Verde `#25D366` oficial WhatsApp + `shadow-elevated` + `ring-1 ring-black/5` para definición sobre cualquier fondo.
  - Hover: `scale-105` + verde más oscuro. Focus visible: ring-2 con offset (accesible por teclado).
  - `aria-label="Escribir a SEDECO por WhatsApp"`. SVG con `aria-hidden="true"` (decorativo).
  - URL: `https://wa.me/50765508320?text=...` con mensaje pre-llenado URL-encoded.
  - Lee `NEXT_PUBLIC_WHATSAPP_NUMBER` con fallback al número del catálogo — consistente con footer y home.
- **Hero credibility line**: `+100,000 m² · +50 proyectos · desde 2020` en `font-mono text-xs uppercase tracking-[0.2em] text-ink-400` — mismo lenguaje visual del eyebrow superior. Separadores `·` en `text-ink-200` para que sean visibles pero no compitan con los números. Las cifras coinciden 1:1 con TrustBar (single source of truth: catálogo).
- **Hero CTA WhatsApp**: ahora ícono WhatsApp verde inline + label "WhatsApp" (más limpio que "WhatsApp directo"). El ícono usa `text-[#25D366]` por separado del color del texto del botón (`text-ink-900`) — el ícono mantiene su affordance de marca, el texto mantiene la jerarquía neutral del botón secundario.
- **Cards diferenciadores**: agregado `border border-ink-100` a las 3 — el shadow-card por sí solo era muy sutil; el border de 1 px en gris muy claro `#E4E8EE` define el contenedor sin ensuciar. Cumple PART 2 #4 al pie de la letra.
- **NO se hizo (intencional)**:
  - No se cambiaron los tokens de color (PART 3 quedó descartado por conflicto Ghostshield, confirmado por Mark).
  - No se tocó el TrustBar (ya cumplía 2x2 → 4col con números bold y subtext lighter).
  - No se tocó el lead form, footer, server action, schema, sitemap, JSON-LD ni metadata.
  - No se agregó librería de iconos. SVG inline en 2 lugares — duplicación intencional.
- **Verificación**:
  - `npx tsc --noEmit` cero errores.
  - WhatsApp float renderea en todas las páginas vía `<body>` del root layout (home + /casos automáticamente; rutas futuras también).
  - Mensaje pre-llenado URL-encoded correcto (acentos en "inspección" y "filtración" se encodean a `%C3%B3` y `%C3%B3n`).

## Pendientes que necesitan acción de Mark
- [ ] Verificar visualmente en `npm run dev` que el float button no se traslapa con el botón "Solicitar diagnóstico" del lead form en móvil (ambos viven en la zona inferior). Si choca, opciones: (a) mover float a `bottom-20` cuando el form esté en viewport, (b) ocultar float en `#contacto` con un `IntersectionObserver` (requiere `'use client'`). Por ahora queda en `bottom-5/6` — la mayoría de usuarios scrollea más allá del form, así que el conflicto es menor.
- [ ] Si el dominio `sedeco.lat` se publica antes de cerrar copy de Ghostshield, revisar que el ícono WhatsApp en CTA no compita visualmente con el ® de Ghostshield en el eyebrow del hero.


---

# Slice 4 — /servicios + /servicios/[slug] (B)

## Objetivo
Construir la sección Servicios completa para abrir 8 entradas SEO de cola larga + reforzar conversión:
- `/servicios` — overview con 8 service cards
- `/servicios/[slug]` — página de detalle por servicio con casos relacionados

## Servicios (8 slugs, alineados con `ServiceSlug` y la lista de Mark)

| slug | nombre legible (Mark dijo) |
|---|---|
| `impermeabilizacion` | Impermeabilización |
| `fachadas` | Fachadas |
| `azoteas` | Azoteas |
| `filtraciones` | Filtraciones |
| `sellado-concreto` | Sellado de concreto |
| `tanques` | Tanques |
| `grietas` | Grietas |
| `piscinas` | Piscinas |

**Ajuste a la taxonomía actual**: el `ServiceSlug` actual tiene `diagnostico` en lugar de `filtraciones`. Es lo mismo conceptualmente (NDT + detección de fugas según catálogo) pero `filtraciones` es lo que el cliente busca en Google. **Renombro `diagnostico` → `filtraciones` en `cases.ts`**. Es un type-level rename: ningún caso actual usa `diagnostico` en su array `services`, así que cero cambios downstream.

## Data structure (segunda fuente de verdad)

`src/lib/data/services.ts` exporta:
- `type Service`:
  - `slug: ServiceSlug`
  - `name` — heading, ej. "Impermeabilización de fachadas"
  - `shortName` — para nav/cards, ej. "Fachadas"
  - `tagline` — 1 oración punzante
  - `description` — 2-3 oraciones para hero
  - `problemSignals: string[]` — bullets "estás aquí porque…" (entry-point conversational)
  - `approach: string[]` — bullets de método técnico (productos + pasos del catálogo)
  - `products: string[]` — productos aplicados (Lithitek 9500, Sikalastic 1k, etc., del catálogo)
  - `warranty?: string` — solo cuando hay respaldo documentado ("Hasta 100 años con LITHI TEK 9500")
  - `seoTitle?: string` — override de title si difiere de `name`
  - `seoDescription` — meta description única por servicio
  - `order: number`
- Helpers:
  - `getAllServices()`
  - `getServiceBySlug(slug)`

## Tareas

- [x] Rename `diagnostico` → `filtraciones` en `src/lib/data/cases.ts` (1 type literal). `tsc --noEmit` cero errores tras el rename — ningún caso usaba `diagnostico` en su array `services`.
- [x] `src/lib/data/services.ts` con type `Service` + 8 servicios. Copy 100% derivado del catálogo (LITHI TEK 9500, Ghostshield 4500, Sika Monotop 107, Sikalastic 1k, Silicona Progressive Materials, uretano de inyección, NDT). Sin invenciones.
- [x] `src/components/site/service-card.tsx` — card-link reutilizable
- [x] `src/app/servicios/page.tsx` — overview: hero + grid 8 cards + CTA final
- [x] `src/app/servicios/[slug]/page.tsx`:
  - `generateStaticParams()` retorna 8 slugs (SSG)
  - `generateMetadata({ params })` con `seoTitle`/`seoDescription` + canonical por servicio
  - Hero con eyebrow + name + tagline + description + dual CTA (form + WhatsApp)
  - Sección "Estás aquí porque…" (problemSignals)
  - Sección "Método SEDECO" (approach numerada + lista de productos)
  - Bloque "Garantía" **condicional** — solo render cuando `warranty` está definido
  - Sección "Casos relacionados" **condicional** — solo render si `getCasesByService(slug)` retorna ≥ 1 caso
  - JSON-LD `Service` con `provider`, `areaServed` y `hasOfferCatalog` cuando hay garantía
  - CTA final en navy invertido (form + WhatsApp) — segundo touchpoint
- [x] `src/app/sitemap.ts` ahora itera sobre `getAllServices()` y emite `/servicios/<slug>` (priority 0.7) + `/servicios` (0.8)
- [x] `npx tsc --noEmit` cero errores
- [x] `npm run dev` Ready en 1.9 s. Probadas las 13 rutas:
  - `GET /` 200
  - `GET /casos` 200
  - `GET /servicios` 200
  - `GET /servicios/<los 8 slugs>` 200
  - `GET /servicios/inexistente` 404 (notFound disparado correctamente)
  - `GET /sitemap.xml` 200 — 11 URLs (home + servicios + 8 detalles + casos)

## Review
- **Decisiones aplicadas (confirmadas por Mark)**:
  1. Rename `diagnostico` → `filtraciones` (un solo slug, sin duplicar). Verificado downstream sin breakage.
  2. Garantía 100 años solo donde Ghostshield/LITHI TEK 9500 es producto principal: impermeabilizacion, fachadas, azoteas (junto con 20 años Progressive cuando aplica), sellado-concreto, grietas. **Sin garantía** en filtraciones, tanques, piscinas — verificado en HTML rendered: `Hasta 100 años` NO aparece en `/servicios/filtraciones`.
  3. `/servicios/impermeabilizacion` es página propia, no redirect. Enfoque "metodología SEDECO": inspección NDT → preparación → reparación → sistema impermeabilizante. Verificado: copy contiene los cuatro pasos.
- **SEO + conversión por servicio**:
  - Cada página tiene `seoDescription` única y específica (Torres Ebelle aparece en `/servicios/fachadas`, Millenium aparece en `/servicios/azoteas`, Ghostshield + 2017 en `/servicios/sellado-concreto`).
  - `seoTitle` override solo donde difiere del `name` (impermeabilizacion, filtraciones).
  - JSON-LD `Service` schema en cada página de detalle, con `provider` SEDECO + `areaServed` (Panamá + Colón).
  - Doble CTA en hero + sección final navy (form + WhatsApp). `<WhatsAppFloat>` global suma tercer touchpoint sin duplicar chrome.
- **Casos relacionados — comportamiento condicional verificado**:
  - `/servicios/fachadas` muestra Torres Ebelle, Shevet Ahim y otros (cases con `services` incluyendo `fachadas`).
  - `/servicios/filtraciones` **omite** la sección entera (cero cases hoy con tag `filtraciones`). Sin sección vacía, sin claim falso.
  - `/servicios/impermeabilizacion` muestra múltiples casos (la mayoría tienen este tag genérico).
- **Boundaries respetadas**: no admin, no Clerk, no imágenes (assets pendientes), no formulario duplicado, no sticky bar adicional.
- **Diff**: 4 archivos nuevos (services data, service-card, /servicios/page, /servicios/[slug]/page) + 2 archivos modificados (cases.ts rename de 1 literal, sitemap dinámico). Cero cambios a Home, lead-form, footer, layout, schema.

## Pendientes que necesitan input de Mark
- [ ] ¿Tag de `services` retroactivo a casos? Por ejemplo, `Fundación Deveaux` podría tener `grietas` si en la obra hubo reparación de grietas — hoy no lo tiene. Si quieres que `/servicios/grietas` tenga casos relacionados visibles, hay que revisar caso por caso. Yo no etiqueto sin confirmación tuya para no inventar alcances.
- [ ] Link en `<SiteFooter>` a `/servicios` y `/casos`. Hoy el footer no tiene navegación interna — solo contacto. ¿Lo agrego en próximo slice o queda así?
- [ ] Header / nav bar: el sitio no tiene header global. Para descubrir `/servicios` desde Home, el usuario depende de scrollar a "Casos destacados" + clickear "Ver todos los casos". ¿Necesitamos un header con nav antes de siguiente slice?

## Boundaries (NO en este slice)
- No admin, no Clerk (Mark explícito).
- No imágenes de servicios (no hay assets en `/public`). Diseño tipográfico.
- No formulario de contacto en página de servicios — re-uso `/#contacto` del Home (single source of leads). Anchor links cross-page funcionan en Next.
- No componente sticky de CTA — `<WhatsAppFloat>` ya es global, los 2 CTAs (hero + final) más el float dan suficiente cobertura sin chrome adicional.
- No `revalidate` ni ISR — contenido estático, SSG con `generateStaticParams` es suficiente.
- No traducción `/en` — sigue todo en español hasta nuevo aviso.

## Riesgos / decisiones
1. **`/servicios/impermeabilizacion` solapa con `/servicios`**: el primero será la página de "metodología SEDECO general / nuestra propuesta de valor", el segundo es índice de las 8 categorías. Distinta intención, copy distinto.
2. **`/servicios/grietas` vs `/servicios/filtraciones`**: grietas es la *causa* (defecto físico), filtraciones es el *síntoma* (lo que ve el cliente). Cada página enfocará su entrada SEO distinto.
3. **Garantía solo se afirma con respaldo documentado**: 100 años solo en servicios donde Ghostshield/Lithitek 9500 es el producto principal (impermeabilizacion, fachadas, sellado-concreto, grietas, azoteas vía Lithitek). Para piscinas, tanques, filtraciones → sin claim de garantía explícita (Sika/Progressive no tienen 100 años documentado).
4. **Renombre `diagnostico` → `filtraciones`** es destructivo a nivel de type. Si Mark prefiere mantener `diagnostico` y agregar `filtraciones` como slug separado, lo cambio antes de tocar `cases.ts`.


---

# Slice 6 — Conversión en /casos y /servicios + form UX (Mark: "mejorar conversión, sin tocar Clerk/admin")

## Objetivo
Cerrar la brecha entre tráfico de landing (`/casos`, `/servicios`, `/servicios/<slug>`) y el form de leads. Hoy todo CTA hace jump a `/#contacto` (Home) — el visitante pierde contexto. Eliminar 1 brinco entre intent y submit.

## Tareas

### 1. Form UX — `LeadForm`
- [ ] Honeypot anti-spam: campo oculto `<input name="company" tabIndex={-1} autoComplete="off">` con CSS `display:none` o `position:absolute; left:-9999px`. En `submitLead` server action, si `company` viene con valor → return `{ ok: true }` sin guardar (silencioso, no le digo al bot que falló). Cero impacto en UX humano, cero dependencia externa.
- [ ] Reset post-submit: hoy `useActionState` deja la pantalla en success view hasta reload. Agregar botón "Enviar otra solicitud" en el success state que resetea `state` (bien con `useState` local que monta una `key` distinta del form, o haciendo que `state` vuelva a `undefined` via un click handler que re-llame al action con FormData vacío y se descarte). Más simple: reset visual via `key` en el wrapper.
- [ ] Cuando server action retorna `{ ok: true }`, agregar `<input type="hidden" name="_redirected" />` no — mejor: en lugar de reset, hacer que el componente success muestre tanto el mensaje como un link "Enviar otra solicitud" que reinicie el form (key bump).

### 2. CTA inline — `<LeadCtaBand>` componente reutilizable
- [ ] Nuevo componente `src/components/site/lead-cta-band.tsx`:
  - Props: `eyebrow?`, `title`, `subtitle?`, `href` (default `/#contacto`), `variant: "light" | "dark"`.
  - Render: container con título grande + 2 CTAs (primary "Solicitar diagnóstico" → href, secundario WhatsApp directo).
  - Variant `dark` para uso entre secciones blancas, variant `light` para uso entre secciones grises.
- [ ] Insertar `<LeadCtaBand>` en:
  - `/casos` — entre el grid de casos y la sección "¿Tu edificio necesita…?" actual. O reemplazar la sección actual final por el nuevo componente para deduplicar.
  - `/servicios` — reemplazar la sección final actual por `<LeadCtaBand>` para consistencia.
  - `/servicios/[slug]` — reemplazar la sección final navy por `<LeadCtaBand variant="dark">`. Misma estética, single source of truth.

### 3. Form embebido en `/casos` y `/servicios` — inline form opcional
- [ ] Decisión: NO embebo el `<LeadForm>` completo en cada landing. Razón: duplicación de Convex/Resend touchpoints, doble form en DOM podría confundir analítica futura, y `<LeadCtaBand>` con anchor a `#contacto` resuelve la fricción sin redundancia.
- [ ] **Si Mark prefiere form duplicado**, le pregunto antes de codear. Es 30 min más pero rompe la idea de "single lead form".

### 4. WhatsApp icon consistente en `/servicios/[slug]`
- [ ] Hero del detalle de servicio dice solo "WhatsApp directo" (texto plano). Hero del Home tiene ícono SVG verde + texto. Inconsistencia visual.
- [ ] Extraer el ícono WhatsApp inline (que se duplica hoy en hero, en site-header y whatsapp-float) a un mini componente `<WhatsAppGlyph className="h-5 w-5" />` en `whatsapp-float.tsx` (export adicional, sin romper el componente flotante). Reutilizar en hero de `/servicios/[slug]`, hero de Home, header. Cero new files.

### 5. Conversion polish menor
- [ ] `/servicios` overview: la sección "¿No estás seguro qué servicio necesitas?" se reemplaza por `<LeadCtaBand>` para consistencia, manteniendo el mismo copy.
- [ ] `/casos`: la sección "¿Tu edificio necesita una inspección como estas?" idem.
- [ ] Verificar visualmente que el formulario sigue siendo el único punto de captura (single source of leads). El honeypot va en el form único.

### 6. Verificación
- [ ] `npx tsc --noEmit` cero errores
- [ ] `npm run dev` boot limpio
- [ ] HTML rendered en `/casos`, `/servicios`, `/servicios/fachadas`, Home: header sigue ok, footer sigue ok, `LeadCtaBand` aparece y enlaza a `/#contacto`
- [ ] Honeypot field presente en `<form>` con visibilidad oculta
- [ ] Reset funciona: tras success state, click en "Enviar otra" → form vuelve

## Boundaries (NO en este slice)
- **No tocar Clerk / admin / `convex/auth.config.ts`** (Mark explícito).
- No analytics (GA, Plausible, Pixel) — slice aparte.
- No tag retroactivo de `services` en cases.ts — esto requiere tu confirmación caso-por-caso (ver Slice 4 review). Lo dejo pendiente.
- No `/casos/[slug]` detalle individual — Slice 7.
- No `/admin`, no Resend domain verification, no deploy.
- No nuevas librerías (zero npm install).
- No tocar `services.ts` ni `cases.ts` salvo lo estrictamente derivado del rename ya hecho (no hay cambios necesarios).

## Riesgos / decisiones
1. **Honeypot silencioso vs error explícito**: silencioso es estándar (bot no aprende), pero quedan leads "fantasma" en sus logs sin saber que fueron bloqueados. Voy con silencioso + un `console.warn` server-side cuando se dispara, para que Mark vea volumen de spam en logs.
2. **Reset del form**: hay 2 patrones — `key` bump (re-monta el form, FormData se pierde igual) o action handler que retorna estado inicial. Voy con `key` bump por simplicidad.
3. **`<LeadCtaBand>` vs duplicar JSX**: hoy hay 3 secciones finales casi idénticas (Home no tiene una porque el form es el closer; `/casos`, `/servicios`, `/servicios/[slug]` sí). El componente las consolida y mantiene consistencia futura.


---

# Slice 7 — `/casos/[slug]` páginas de detalle individual

## Objetivo
Generar 11 páginas SSG, una por caso, para abrir SEO de cola larga ("PH Torres Ebelle impermeabilización", "Shevet Ahim Panamá", etc.) y dar al portafolio una capa de profundidad — cada caso pasa de "card resumen" a landing dedicada con backlink a los servicios aplicados.

## Tareas

- [ ] `src/app/casos/[slug]/page.tsx` con:
  - `generateStaticParams()` retornando los 11 slugs (vía `getAllCases().map(c => ({ slug: c.slug }))`)
  - `generateMetadata({ params })` con title (`{name} · Caso SEDECO`), description derivada de `scope` o tagline genérico cuando falte, canonical `/casos/<slug>`. Si el slug no existe → `notFound()`.
  - Si `getCaseBySlug(slug)` retorna `undefined` → `notFound()`.
  - Breadcrumb simple: `Casos / {name}` (link `/casos` → padre).
  - Hero: eyebrow `workType`, h1 `name`, location si existe, m² grande si existe, scope si existe.
  - Bloques condicionales (mismo patrón que CaseCard pero amplificado):
    - `Problema` (si `case.problem`)
    - `Resultado` (si `case.result`)
    - `Carta de respaldo` (si `case.signedBy`) con énfasis: nombre + rol firmados.
  - Sección "Servicios aplicados": lista los `case.services[]` como links a `/servicios/<slug>`. Si `services` está vacío (caso `the-towers`), omito la sección.
  - JSON-LD `@type: Project` con `name`, `location`, `description` (= `scope` o `workType`), `provider` SEDECO, y `@type: BreadcrumbList` separado para el breadcrumb.
  - Final: `<LeadCtaBand variant="dark" title={"¿Tu edificio se parece a ${case.name}?"} />` para mantener consistencia con detalle de servicio.
- [ ] `src/components/site/case-card.tsx`: hacer el `name` clicable a `/casos/<slug>` (hoy el card solo expone CTA "Solicitar inspección similar"). El CTA queda igual; el título se vuelve link.
- [ ] `src/app/sitemap.ts`: agregar dinámicamente los 11 `/casos/<slug>` (priority 0.6, changeFrequency monthly) iterando `getAllCases()`.
- [ ] `src/app/casos/page.tsx` (overview): mantener anchor `id={c.slug}` en cada card pero también permitir click al detalle. El comportamiento actual con anchor `#slug` se conserva como deep-link, no se rompe.
- [ ] `npx tsc --noEmit` cero errores.
- [ ] `npm run dev` boot limpio + verificación de:
  - `GET /casos/ph-torres-ebelle` 200 con todos los bloques (m², problem, result, signedBy, servicios)
  - `GET /casos/the-towers` 200 con bloques mínimos (sin problem/result/signedBy/servicios → secciones omitidas)
  - `GET /casos/inexistente` 404
  - `/sitemap.xml` incluye 11 nuevos URLs (total = 22)
  - HTML: JSON-LD `Project` y `BreadcrumbList` por página

## Boundaries (NO en este slice)
- **No tocar Clerk / admin / `convex/auth.config.ts`** (Mark explícito).
- No imágenes/galería de proyectos — `/public` aún sin assets, diseño tipográfico.
- No tagging retroactivo de `services` en `cases.ts` — pendiente de Mark, se queda como issue separado.
- No reescribo `case-card.tsx` salvo el cambio quirúrgico de hacer el name link. Estructura intacta.
- No analytics, no rate limiting, no `revalidate`.
- No nuevas librerías.

## Riesgos / decisiones
1. **Caso `the-towers`** (sin scope, sin services): la página existirá igual con bloques mínimos. Si Mark prefiere que esos casos NO tengan página de detalle (404 o exclusión de `generateStaticParams`), lo configuro vía un flag `featured`/`hasDetailPage` en el type. Por ahora todos los 11 generan página; pasa el filtro de calidad mínima porque al menos tienen `name + workType`.
2. **CaseCard heading clicable** vs CTA "Solicitar inspección similar": dejo ambos. El name → detalle, el CTA → form. No conflict.
3. **Breadcrumb JSON-LD**: aumenta cobertura de schema y rich snippets en Google. Cero costo.
4. **Servicios relacionados como links**: requiere que cada slug en `case.services[]` matchee un slug existente en `services.ts`. Verificación: el rename `diagnostico → filtraciones` ya se aplicó, taxonomía está alineada. Cero broken links esperados.
