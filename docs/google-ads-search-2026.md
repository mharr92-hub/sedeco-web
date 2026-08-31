# Google Ads Search 2026 — SEDECO Panamá

Arquitectura de campañas de búsqueda para lead gen en Ciudad de Panamá y área metro. **Sin precios, sin descuentos, sin urgencia falsa, sin claims de años de garantía.**

**Estado:** las cinco campañas de Search documentadas abajo permanecen **pausadas** y son el núcleo. No crear campañas live desde este doc. No gastar Ads. No inventar un GTM ID.

Conversión primaria (optimizar): `lead_form_submit` + `whatsapp_click`.  
Microconversiones (observar, no optimizar la campaña a ellas): `cta_hero_click`, `cta_sticky_click`, `cta_bottom_click`, `lead_form_start`.  
**No** marcar `thank_you_view` ni pageview de `/gracias` como conversión — duplicaría el submit.

GTM/GA4 se inyectan solo si existen `NEXT_PUBLIC_GTM_ID` / `NEXT_PUBLIC_GA4_ID`. Si hay GTM, no configurar GA4 directo (el tag de GA4 vive dentro de GTM). `dataLayer.push` ocurre igual sin IDs.

A/B de headline: el H1 lleva `data-ab="headline" data-variant="default"`. Más adelante se puede leer `?v=` en cliente. **No correr 10 experimentos.** Un solo test de H1 cuando haya volumen.

Oferta principal (no rebrandear): diagnóstico + impermeabilización / fachadas / sellado de concreto. Reparación estructural e inspección de obra son **captura extra** (form + copy en las cinco LPs), no campañas propias ni un cambio de posicionamiento.

---

## Message-match (KEYWORD → AD H1 → LANDING H1 → CTA)

| Intención | Keyword ejemplo | RSA H1 (≤30) | Landing | H1 de la página | CTA |
|---|---|---|---|---|---|
| Impermeabilización genérica | impermeabilizacion panama | Impermeabilización en Panamá | `/impermeabilizacion-panama` | Impermeabilización en Panamá que empieza con un diagnóstico correcto. | Solicitar inspección |
| Filtración / gotera | filtraciones panama | ¿Filtración en su edificio? | `/filtraciones-panama` | ¿Tienes una filtración? Encontramos el origen antes de reparar. | Revisar mi filtración |
| Fachada vertical | impermeabilizar fachada | Fachadas de edificios en Panamá | `/impermeabilizacion-fachadas` | Impermeabilización de fachadas para edificios en Panamá | Solicitar evaluación de fachada |
| Azotea / losa / techo | impermeabilizar azotea | Azoteas y losas en Panamá | `/impermeabilizacion-azoteas` | Impermeabilización de azoteas y losas en Panamá | Solicitar inspección de azotea |
| Sellado / Ghostshield / concreto | sellado de concreto | Sellado de concreto en Panamá | `/sellado-concreto` | Sellado permanente de concreto en Panamá, con el sistema correcto. | Solicitar evaluación |
| Reparación estructural (extra) | reparacion estructural panama | Reparación estructural | `/sellado-concreto` | (misma LP; form: Reparación estructural) | Solicitar evaluación |
| Inspección / termografía (extra) | inspeccion de filtraciones panama | Inspección de obra | `/filtraciones-panama` | (misma LP; form: Inspección de obra) | Revisar mi filtración |
| Marca | sedeco panama | SEDECO Panamá | `/` o `/impermeabilizacion-panama` | (home o H1 de impermeabilización) | Solicitar inspección |

---

## Negativos compartidos (todas las campañas no-brand)

Agregar como negativos de campaña (frase o exacta según volumen). Aplican a **todas** las campañas, incluidas las de captura secundaria si algún día se activan.

### Intención de empleo / job-seekers (obligatorio en cada campaña)

Frase o exacta, según volumen. Objetivo: sacar a quien busca trabajo, no servicio.

- empleo, trabajo, vacante, vacantes, curriculum, cv, sueldo, salario, planilla
- contratacion, contratan, se solicita, operador, obrero, ayudante
- vacante impermeabilizacion, trabajo en altura empleo
- oficios, bolsa de trabajo, requisicion, recursos humanos, rrhh
- albañil empleo, pintor vacante, andamiero, ayudante de obra

`trabajo` y `trabajos` chocan con la intención de servicio «trabajos en altura». Preferir exacta/frase para `trabajo`/`empleo` y mantener `trabajo en altura empleo` + `vacante impermeabilizacion` como frase. No bloquear el positivo `trabajos en altura` (servicio).

### Retail, DIY, geo y junk (mantener)

- diy, youtube, tutorial, curso
- pintura barata, impermeabilizante ferreteria, homecenter, novey
- receta, quimico para comprar, galon, cubeta (intención de producto retail)
- mexico, colombia, peru, chile, spain (salvo que se geo-restrinja 100%)
- 100 años, de por vida, garantia de por vida
- ph torres ebelle, ebbelle, pine hill, constellation, 4 islas, twin towers, ibiza

Geo: Ciudad de Panamá + área metro; Colón opcional como ubicación adicional, no como keyword de país.

**RSA y keywords: no mencionar** PH Torres Ebelle, Twin Towers, Constellation, Pine Hill, 4 Islas ni Ibiza.

---

## Campaña 1 — Impermeabilización

- **Landing:** `/impermeabilizacion-panama`
- **Intención:** servicio genérico, PH, edificios, «quién lo hace bien»
- **Ad groups:** (1) Impermeabilización Panamá (2) Impermeabilizar edificio / PH (3) Empresa impermeabilización
- **Keywords (frase / exacta, no broad abierto):** impermeabilizacion panama, impermeabilizar panama, empresa impermeabilizacion panama, impermeabilizacion edificios panama, impermeabilizar ph panama, diagnostico filtracion panama
- **RSA headlines (≤30):**
  1. Impermeabilización Panamá (27)
  2. Diagnóstico primero (21)
  3. Sistema correcto, no parche (28)
  4. Inspección en el área metro (27)
  5. PH, residencial y comercio (27)
  6. Azoteas, fachadas y losas (26)
  7. Encontramos el origen (22)
  8. +100,000 m² en concreto (24)
  9. +50 proyectos en Panamá (25)
  10. Ghostshield autorizado (22)
  11. Garantía por escrito (21)
  12. Mark responde día hábil (24)
  13. Ciudad de Panamá y metro (25)
  14. No aplique a ciegas (20)
  15. Solicite una inspección (24)
- **Descriptions (≤90):**
  1. Inspeccionamos, identificamos el origen y aplicamos el sistema adecuado a su estructura. (88)
  2. Primero diagnosticamos. Después el sistema correcto. Evaluación en Ciudad de Panamá. (85)
  3. Azoteas, fachadas y concreto no llevan el mismo producto. Pida inspección técnica. (84)
  4. Garantía por escrito según sistema y alcance. WhatsApp +507 6550-8320. (73)
- **Sitelinks:** Inspección | Filtraciones | Fachadas | Azoteas | Sellado de concreto
- **Callouts:** Diagnóstico primero | Aplicadores Ghostshield | +100,000 m² | +50 proyectos | Desde 2020 | Área metro
- **Snippets:** Tipos de trabajo: Azoteas, Fachadas, Losas, Filtraciones, Sellado de concreto, Juntas
- **Conversión:** form submit + WhatsApp click

---

## Campaña 2 — Filtraciones

- **Landing:** `/filtraciones-panama`
- **Intención:** síntoma urgente (mancha, gotera, último piso)
- **Ad groups:** (1) Filtración apartamento/PH (2) Detectar origen (3) Reparar filtración Panamá
- **Keywords:** filtraciones panama, filtracion apartamento panama, gotera ultimo piso, humedad cielo raso panama, detectar filtracion edificio, de donde viene la filtracion
- **RSA headlines:**
  1. ¿Filtración en su vivienda? (26)
  2. Encontramos el origen (22)
  3. Antes de volver a parchar (26)
  4. Revisión de filtraciones (24)
  5. Mancha ≠ punto de entrada (27)
  6. Diagnóstico en el metro (24)
  7. PH y apartamentos (19)
  8. Inspección técnica (19)
  9. WhatsApp directo SEDECO (23)
  10. No pinte la mancha (19)
  11. Origen, luego el sistema (24)
  12. +50 proyectos en Panamá (25)
  13. Mark responde día hábil (24)
  14. Ciudad de Panamá (18)
  15. Revisar mi filtración (22)
- **Descriptions:**
  1. La mancha es el síntoma. Buscamos por dónde entra el agua antes de reparar. (78)
  2. Filtraciones en apartamentos y PH. Diagnóstico en Ciudad de Panamá y área metro. (83)
  3. Cuéntenos qué está pasando. Mark le responde el próximo día hábil. (71)
  4. Garantía por escrito según sistema y alcance. Envíe fotos por WhatsApp. (75)
- **Sitelinks:** Revisar filtración | Azoteas | Fachadas | Método SEDECO
- **Callouts:** Origen primero | No parche a ciegas | Área metro | WhatsApp
- **Snippets:** Síntomas: Cielo raso, Último piso, Fachada, Azotea, Juntas, Ventanas
- **Conversión:** form submit + WhatsApp click

---

## Campaña 3 — Fachadas

- **Landing:** `/impermeabilizacion-fachadas`
- **Intención:** vertical / altura / manchas en muro
- **Ad groups:** (1) Impermeabilizar fachada (2) Humedad muro / ventanas (3) Fachada edificio Panamá
- **Keywords:** impermeabilizacion fachadas panama, impermeabilizar fachada edificio, humedad fachada panama, filtracion ventanas edificio, recubrimiento fachada panama
- **RSA headlines:**
  1. Fachadas en Panamá (18)
  2. Evaluación de fachada (21)
  3. Humedad en el muro (19)
  4. Trabajo vertical técnico (24)
  5. Uniones y ventanas (19)
  6. No vuelva a solo pintar (24)
  7. Edificios del área metro (25)
  8. LANCO DRY-COAT (15)
  9. Diagnóstico en altura (21)
  10. Sistema según el muro (22)
  11. Garantía por escrito (21)
  12. +100,000 m² (12)
  13. SEDECO Panamá (13)
  14. Pida evaluación (16)
  15. Ciudad de Panamá (18)
- **Descriptions:**
  1. Impermeabilización de fachadas para edificios en Panamá. Evaluamos el origen en vertical. (89)
  2. Manchas, juntas y ventanas. El sistema depende del sustrato, no de la pintura. (81)
  3. Concreto expuesto y recubrimiento vertical no se tratan igual. Pida evaluación. (82)
  4. Garantía por escrito según sistema y alcance. Atención en el área metro. (75)
- **Sitelinks:** Evaluación de fachada | Filtraciones | Azoteas | Método
- **Callouts:** Verticales | Diagnóstico primero | Área metro | Ghostshield en concreto
- **Snippets:** Problemas: Manchas, Eflorescencia, Ventanas, Juntas, Humedad interior, Altura
- **Conversión:** form submit + WhatsApp click

---

## Campaña 4 — Azoteas

- **Landing:** `/impermeabilizacion-azoteas`
- **Intención:** cubiertas, losas, último piso, zinc vs concreto
- **Ad groups:** (1) Impermeabilizar azotea (2) Losa / techo (3) Zinc vs concreto
- **Keywords:** impermeabilizacion azoteas panama, impermeabilizar losa panama, impermeabilizar techo panama, azotea ph filtracion, techo zinc impermeabilizar panama
- **RSA headlines:**
  1. Azoteas y losas en Panamá (25)
  2. Inspección de azotea (21)
  3. El último piso se moja (23)
  4. Concreto o zinc: distinto (26)
  5. HS 3200 en cubiertas (22)
  6. Losa de concreto (17)
  7. No LithiTek en zinc (21)
  8. Diagnóstico de cubierta (23)
  9. PH y casas (11)
  10. Drenajes y juntas (18)
  11. Sistema según sustrato (23)
  12. Garantía por escrito (21)
  13. Área metro de Panamá (21)
  14. Solicite inspección (20)
  15. SEDECO Panamá (13)
- **Descriptions:**
  1. Impermeabilización de azoteas y losas en Panamá. Primero el origen, luego el sistema. (86)
  2. Zinc o metal: HS 3200 Series. Concreto: otro sistema. LithiTek no va sobre zinc. (84)
  3. Filtraciones de último piso. Inspeccionamos drenajes, juntas y el sustrato real. (83)
  4. Garantía por escrito según sistema y alcance. WhatsApp +507 6550-8320. (73)
- **Sitelinks:** Inspección de azotea | Filtraciones | Sellado de concreto | Fachadas
- **Callouts:** HS 3200 en zinc | Concreto aparte | Diagnóstico primero | Área metro
- **Snippets:** Cubiertas: Azotea, Losa, Zinc, Metal, Juntas, Drenajes
- **Conversión:** form submit + WhatsApp click  
- **Negativo extra:** lithitek zinc, ghostshield zinc, sellador zinc nano

---

## Campaña 5 — Brand SEDECO

- **Landing:** `/` (home) o `/impermeabilizacion-panama` si el anuncio habla de inspección
- **Intención:** navegacional / marca
- **Ad groups:** (1) SEDECO (2) Sellado de concreto marca (3) Ghostshield Panamá marca
- **Keywords (exacta):** sedeco, sedeco panama, sellado de concreto panama, tanya engineering, ghostshield panama
- **RSA headlines:**
  1. SEDECO Panamá (13)
  2. Sellado de concreto (20)
  3. Aplicadores Ghostshield (23)
  4. Punta Paitilla — RBS Tower (26)
  5. WhatsApp 6550-8320 (20)
  6. Diagnóstico primero (21)
  7. +100,000 m² (12)
  8. +50 proyectos (14)
  9. Desde 2020 (10)
  10. Garantía por escrito (21)
  11. Mark Harrick (12)
  12. Ciudad de Panamá (18)
  13. Solicitar inspección (22)
  14. TANYA ENGINEERING (18)
  15. Área metro y Colón (20)
- **Descriptions:**
  1. SEDECO Panamá. Primero diagnosticamos. Después el sistema correcto. (68)
  2. Aplicadores autorizados de Ghostshield®. Oficina en RBS Tower, Paitilla. (74)
  3. Más de 100,000 m² de concreto impermeabilizado. +50 proyectos desde 2020. (76)
  4. Garantía por escrito según sistema y alcance. mark@selladodeconcreto.com (74)
- **Sitelinks:** Inspección | Filtraciones | Fachadas | Azoteas | Casos
- **Callouts:** Ghostshield autorizado | Paitilla | WhatsApp | Día hábil
- **Snippets:** Marca: SEDECO, Ghostshield, Diagnóstico, Inspección, Panamá, Colón
- **Conversión:** igual; no pelear con no-brand (ordenar brand a ROAS/CPA más agresivo)

---

## Keyword themes adicionales (captura secundaria — no live)

No crear campañas live. No gastar. Estos temas pueden vivir más adelante como ad groups pausados bajo las cinco campañas existentes, o como drafts. **No son un rebrand:** la oferta principal sigue siendo diagnóstico + impermeabilización / fachadas / sellado de concreto.

Geo para ambos temas: Ciudad de Panamá + área metro (mismo que el núcleo). Colón opcional como ubicación, no como keyword.

RSA: mismos claims permitidos que el núcleo (diagnóstico primero, garantía por escrito según sistema y alcance, WhatsApp +507 6550-8320). Sin años, sin «de por vida», sin precios. **Sin nombres de PH restringidos** (Ebelle, Twin Towers, Constellation, Pine Hill, 4 Islas, Ibiza) en headlines, descriptions o keywords.

Los mismos negativos de empleo y junk de arriba aplican a estos temas.

### Reparación estructural

- **Landing (existente, sin ruta nueva):** `/sellado-concreto` o `/impermeabilizacion-panama`. El form incluye la opción «Reparación estructural».
- **Intención:** grietas / losa / concreto dañado que pide reparación antes de impermeabilizar.
- **Keywords (frase / exacta, no broad abierto):** reparacion estructural panama, reparacion estructural edificio panama, reparacion de concreto estructural panama, grietas estructurales edificio panama, reparar losa estructural panama, reparacion de columna concreto panama
- **RSA headlines (≤30, borrador):**
  1. Reparación estructural (23)
  2. Concreto en Panamá (18)
  3. Diagnóstico primero (21)
  4. Antes de impermeabilizar (24)
  5. Grietas y losas (16)
  6. Sistema según el daño (22)
  7. Área metro de Panamá (21)
  8. Garantía por escrito (21)
  9. Inspección técnica (19)
  10. SEDECO Panamá (13)
- **Descriptions (≤90, borrador):**
  1. Reparación estructural de concreto en Panamá. Primero el diagnóstico, después el sistema. (86)
  2. Grietas y losas se atienden antes de impermeabilizar. Evaluación en el área metro. (83)
- **Sitelinks / callouts:** reutilizar los del núcleo (Inspección, Filtraciones, Fachadas, Azoteas, Sellado). No sitelink a una LP que no existe.

### Inspección de obra / inspección de filtraciones / termografía

- **Landing (existente, sin ruta nueva):** `/filtraciones-panama`. El form incluye la opción «Inspección de obra».
- **Intención:** inspección técnica, termografía de edificio, localizar el origen del agua.
- **Keywords (frase / exacta):** inspeccion de obra panama, inspeccion tecnica edificio panama, inspeccion de filtraciones panama, termografia edificio panama, termografia filtraciones panama, inspeccion termografica panama, diagnostico filtracion termografia
- **RSA headlines (≤30, borrador):**
  1. Inspección de obra (20)
  2. Inspección técnica (19)
  3. Termografía de edificio (24)
  4. Origen de la filtración (23)
  5. Diagnóstico en el metro (24)
  6. Antes de reparar (17)
  7. Filtraciones en Panamá (23)
  8. Garantía por escrito (21)
  9. WhatsApp SEDECO (16)
  10. Ciudad de Panamá (18)
- **Descriptions (≤90, borrador):**
  1. Inspección técnica y termografía de edificio en Panamá para encontrar el origen del agua. (89)
  2. Inspección de filtraciones en el área metro. Primero diagnosticamos. Después el sistema. (87)

---

## Eventos dataLayer (implementados)

| Evento | Cuándo | ¿Conversión Ads? |
|---|---|---|
| `lead_form_start` | Primer foco o abrir sheet | Micro |
| `lead_form_submit` | Submit OK, antes de `/gracias` | **Primaria** |
| `whatsapp_click` | Click WA (hero, sticky, footer, thank-you) | **Primaria** |
| `phone_click` | Click tel | Micro / call extension aparte |
| `email_click` | Click mailto | Micro |
| `project_view` | Sección proyectos en viewport | Observación |
| `cta_hero_click` | CTA hero | Micro |
| `cta_sticky_click` | CTA sticky móvil | Micro |
| `cta_bottom_click` | CTA final / caso estrella | Micro |
| `form_error` | Validación fallida | Diagnóstico |
| `thank_you_view` | `/gracias` | **No** (evitar doble conteo) |
| `dl_init` | Carga | No |

Payload: `{ event, landing, location, problem, source }`.

---

## Claims prohibidos en anuncios (alineado a landings)

- No «100 años», «de por vida», años de fabricante como promesa SEDECO
- No PH Torres Ebelle/Ebbelle, Pine Hill, Constellation, 4 Islas, Twin Towers, Ibiza
- No testimonios, estrellas, #1, precios, descuentos, urgencia
- LithiTek / Ghostshield: solo concreto o acero expuesto
- SiliconFlex Lanco 20 Años = nombre de producto, no plazo de garantía
- Garantía pública: «garantía por escrito según sistema y alcance»
