import type { Metadata } from "next";
import { LegalArticle, LegalSection } from "@/components/site/legal-article";
import {
  ADDRESS,
  LEGAL_ENTITY,
  PHONE_OFFICE_PRIMARY,
  PHONE_OFFICE_SECONDARY,
  RUC,
  SITE_EMAIL,
  TRADE_NAME,
  WHATSAPP_DISPLAY,
  WHATSAPP_NUMBER,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacidad",
  description:
    "Aviso de privacidad de TANYA ENGINEERING, S.A. (SEDECO Panamá): qué datos recibimos en formularios, WhatsApp y medición, y cómo puede ejercer sus derechos.",
  alternates: { canonical: "/privacidad" },
};

export default function PrivacidadPage() {
  return (
    <LegalArticle title="Aviso de privacidad">
      <LegalSection title="Quién es responsable">
        <p>
          El responsable del tratamiento de sus datos es {LEGAL_ENTITY}, nombre
          comercial {TRADE_NAME}, RUC {RUC}. Oficina: {ADDRESS.building},{" "}
          {ADDRESS.street}, {ADDRESS.locality}. Sitio: sedeco.lat.
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
            Formulario del sitio principal: nombre, correo, teléfono, tipo de
            proyecto y mensaje.
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
          Google Tag Manager, Google Analytics 4 o cookies de Google Ads solo se
          cargan si están configurados en el entorno de publicación. Si GTM está
          activo, GA4 no se inyecta además por gtag, para no contar dos veces.
          Si esas variables no están definidas, no insertamos contenedor ni
          píxel de Google.
        </p>
        <p>
          Esas herramientas, cuando existen, pueden usar cookies o
          identificadores para medir visitas y el rendimiento de anuncios. Usted
          puede bloquear cookies en su navegador; el sitio y WhatsApp siguen
          funcionando.
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
          {ADDRESS.building}, {ADDRESS.street}
          <br />
          {ADDRESS.locality}
          <br />
          Tel. {PHONE_OFFICE_PRIMARY} / {PHONE_OFFICE_SECONDARY}
          <br />
          WhatsApp:{" "}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
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
