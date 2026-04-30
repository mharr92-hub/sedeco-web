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
