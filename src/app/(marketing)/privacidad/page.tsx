import type { Metadata } from "next";
import { LegalArticle, LegalSection } from "@/components/site/legal-article";
import {
  LEGAL_ENTITY,
  NAP_STREET_ADDRESS,
  PHONE_OFFICE_PRIMARY,
  PHONE_OFFICE_SECONDARY,
  RUC,
  SITE_EMAIL,
  TRADE_NAME,
  WHATSAPP_DISPLAY,
  whatsappHref,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacidad",
  description:
    "Aviso de privacidad de Tanya Engineering, S.A. (SEDECO): datos de formularios y WhatsApp, medición con Google Analytics 4 y cómo pedir acceso o supresión.",
  alternates: { canonical: "/privacidad" },
};

export default function PrivacidadPage() {
  return (
    <LegalArticle title="Aviso de privacidad">
      <LegalSection title="Quién es responsable">
        <p>
          El responsable del tratamiento de sus datos es {LEGAL_ENTITY}, nombre
          comercial {TRADE_NAME}, RUC {RUC}. Oficina: {NAP_STREET_ADDRESS}.
          Sitio: sedeco.lat.
        </p>
        <p>
          Este aviso es breve y factual, según la Ley 81 de 2019 de la República
          de Panamá (protección de datos personales) y lo que realmente hacemos
          en este sitio. No vendemos listas de contactos.
        </p>
      </LegalSection>

      <LegalSection title="Qué datos recibimos">
        <p>Según cómo nos contacte, podemos recibir:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Formularios de inspección o diagnóstico: nombre, WhatsApp o
            teléfono, tipo de problema, ubicación o zona, tipo de propiedad,
            descripción y si puede enviar fotos.
          </li>
          <li>
            Formulario del sitio principal: nombre, WhatsApp, tipo de problema,
            descripción si la escribe, tipo de propiedad y zona.
          </li>
          <li>
            Parámetros de campaña si llega desde un anuncio (UTM, y en su caso
            gclid / gbraid / wbraid), más datos técnicos básicos del envío
            (referrer y user agent).
          </li>
          <li>
            Conversaciones de WhatsApp, llamadas o correo que usted inicie o
            acepte: lo que nos escriba, incluidas fotos que envíe para preparar
            una visita.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Para qué los usamos">
        <p>
          Los usamos para responderle, evaluar si podemos inspeccionar su caso,
          coordinar una visita o cotización, y dar seguimiento comercial
          razonable. No usamos sus datos para venderle a terceros.
        </p>
      </LegalSection>

      <LegalSection title="Cookies y medición">
        <p>
          El sitio siempre registra eventos en un dataLayer interno (por
          ejemplo, envío de formulario o clic en WhatsApp). Eso no carga Google
          por sí solo.
        </p>
        <p>
          Usamos Google Analytics 4. Google puede detectar y enviar de forma
          hasheada datos que usted proporcione en formularios (p. ej. correo o
          teléfono) para medición. No usamos esos datos para vender ni compartir
          listas.
        </p>
        <p>
          Esa medición usa gtag en el sitio. Usted puede bloquear cookies en su
          navegador; el sitio y WhatsApp siguen funcionando.
        </p>
      </LegalSection>

      <LegalSection title="WhatsApp y terceros">
        <p>
          Si nos escribe por WhatsApp, Meta procesa esa conversación según sus
          propias condiciones. Nosotros vemos el número y el contenido que
          usted nos envía para atenderlo. El hosting (Vercel), el backend de
          leads y el correo transaccional, cuando están configurados, procesan
          el envío para poder guardarlo y notificarnos.
        </p>
      </LegalSection>

      <LegalSection title="Conservación">
        <p>
          Guardamos la solicitud el tiempo necesario para responderle y para un
          seguimiento comercial razonable. Después la eliminamos o la dejamos
          sin datos que lo identifiquen, salvo que un documento contractual o
          una obligación legal pida conservarla.
        </p>
      </LegalSection>

      <LegalSection title="Sus derechos">
        <p>
          Puede pedir acceso, corrección, supresión u oposición al uso de sus
          datos, y retirar el consentimiento para el seguimiento comercial.
          Escríbanos a {SITE_EMAIL} o por WhatsApp al {WHATSAPP_DISPLAY} e
          indíquenos qué desea. Responderemos en un plazo razonable.
        </p>
      </LegalSection>

      <LegalSection title="Contacto">
        <p>
          {LEGAL_ENTITY} ({TRADE_NAME})
          <br />
          {NAP_STREET_ADDRESS}
          <br />
          Tel. {PHONE_OFFICE_PRIMARY} / {PHONE_OFFICE_SECONDARY}
          <br />
          WhatsApp:{" "}
          <a
            href={whatsappHref(
              "Hola, escribo desde el aviso de privacidad de SEDECO.",
            )}
            className="text-navy-700 underline underline-offset-2 hover:text-accent-600"
          >
            {WHATSAPP_DISPLAY}
          </a>
          <br />
          Correo:{" "}
          <a
            href={`mailto:${SITE_EMAIL}`}
            className="text-navy-700 underline underline-offset-2 hover:text-accent-600"
          >
            {SITE_EMAIL}
          </a>
        </p>
      </LegalSection>
    </LegalArticle>
  );
}
