import type { Metadata } from "next";
import Link from "next/link";
import { LegalArticle, LegalSection } from "@/components/site/legal-article";
import {
  ADDRESS,
  GUARANTEE_LINE,
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
  title: "Términos",
  description:
    "Términos de uso del sitio SEDECO Panamá. Una inspección o cotización no es un contrato. La garantía es por escrito según sistema y alcance.",
  alternates: { canonical: "/terminos" },
};

export default function TerminosPage() {
  return (
    <LegalArticle title="Términos de uso">
      <LegalSection title="Quién opera este sitio">
        <p>
          Este sitio lo opera {LEGAL_ENTITY}, nombre comercial {TRADE_NAME}, RUC{" "}
          {RUC}, con oficina en {ADDRESS.building}, {ADDRESS.street},{" "}
          {ADDRESS.locality}. Al usarlo, usted acepta estos términos.
        </p>
      </LegalSection>

      <LegalSection title="Inspección y cotización no son un contrato">
        <p>
          Pedir una inspección, enviar un formulario o recibir una cotización no
          crea un contrato de obra ni nos obliga a ejecutar un trabajo. El
          contrato, si lo hay, nace solo cuando ambas partes acuerdan por
          escrito el sistema, el alcance, el precio y las condiciones.
        </p>
        <p>
          Una visita técnica sirve para ver el origen del problema. Las fotos
          por WhatsApp ayudan a prepararla; no sustituyen la inspección ni
          cierran un alcance.
        </p>
      </LegalSection>

      <LegalSection title="Garantía">
        <p>
          La garantía pública de este sitio es {GUARANTEE_LINE}. Eso significa
          que, si hay garantía, queda en el documento que se firme o se acepte
          para ese trabajo concreto: producto, superficie, metros y
          exclusiones.
        </p>
        <p>
          No ofrecemos garantía de 100 años, ni de por vida, ni un plazo único
          para todos los sistemas. Los nombres comerciales o plazos de ficha
          técnica de un fabricante no son, por sí solos, la garantía de{" "}
          {TRADE_NAME}.
        </p>
      </LegalSection>

      <LegalSection title="Contenido del sitio">
        <p>
          Textos, fotos y descripciones de proyectos son informativos. Cada
          estructura es distinta; el sistema adecuado se define en campo. No
          usamos este sitio para prometer resultados que no estén en un alcance
          escrito.
        </p>
      </LegalSection>

      <LegalSection title="Uso aceptable">
        <p>
          No utilice los formularios para spam, datos falsos o contenido ilícito.
          Podemos ignorar o borrar envíos que no correspondan a una solicitud
          real de inspección o información.
        </p>
      </LegalSection>

      <LegalSection title="Ley aplicable">
        <p>
          Estos términos se rigen por las leyes de la República de Panamá. Para
          controversias relacionadas con este sitio, las partes se someten a los
          tribunales de la Ciudad de Panamá, sin perjuicio de normas de
          protección al consumidor que sí le correspondan.
        </p>
      </LegalSection>

      <LegalSection title="Privacidad y contacto">
        <p>
          El tratamiento de datos personales se describe en el{" "}
          <Link
            href="/privacidad"
            className="text-navy-700 underline underline-offset-2 hover:text-accent-600"
          >
            aviso de privacidad
          </Link>
          .
        </p>
        <p>
          {LEGAL_ENTITY} ({TRADE_NAME})
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
