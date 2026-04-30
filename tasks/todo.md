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
