import {
  WHATSAPP_CONTACTS,
  whatsappHrefFor,
  type WhatsAppContact,
} from "@/lib/site";
import { TrackedLink } from "@/components/ads/tracked-link";
import { WhatsAppGlyph } from "@/components/site/whatsapp-float";
import { cn } from "@/lib/utils";

/**
 * The public WhatsApp contacts (today only the commercial line), each with
 * its name.
 *
 * Use wherever the site shows WhatsApp as text or link. The single-button
 * spots — header, sticky bar and floating button — keep one contact and do
 * not use this.
 *
 * The links are plain anchors, so the delegated listener reports
 * whatsapp_click for each one, with `destino` telling them apart.
 */
export function WhatsAppContacts({
  message,
  variant = "light",
  className,
}: {
  /** Prefilled text. Defaults to the site-wide message. */
  message?: string;
  /** `light` for dark backgrounds, `dark` for light ones. */
  variant?: "light" | "dark";
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-col gap-2", className)}>
      {WHATSAPP_CONTACTS.map((contact) => (
        <li key={contact.key}>
          <WhatsAppContactLink
            contact={contact}
            message={message}
            variant={variant}
          />
        </li>
      ))}
    </ul>
  );
}

export function WhatsAppContactLink({
  contact,
  message,
  variant = "light",
}: {
  contact: WhatsAppContact;
  message?: string;
  variant?: "light" | "dark";
}) {
  return (
    <a
      href={whatsappHrefFor(contact, message)}
      target="_blank"
      rel="noopener noreferrer"
      data-track="whatsapp_click"
      data-destino={contact.key}
      className={cn(
        "inline-flex min-h-6 items-center gap-2 transition-colors",
        variant === "light"
          ? "text-white hover:text-[#F5A623]"
          : "text-[#1A2E8A] hover:text-[#2B4BF2]",
      )}
    >
      <WhatsAppGlyph className="h-4 w-4 shrink-0 text-[#25D366]" />
      <span>
        {contact.name} · {contact.display}
      </span>
    </a>
  );
}

/**
 * The contacts as buttons, for heroes and closing sections where the
 * single WhatsApp button used to be. Keeps the caller's button class.
 */
export function WhatsAppContactButtons({
  message,
  className,
}: {
  message?: string;
  className?: string;
}) {
  return (
    <>
      {WHATSAPP_CONTACTS.map((contact) => (
        <a
          key={contact.key}
          href={whatsappHrefFor(contact, message)}
          target="_blank"
          rel="noopener noreferrer"
          data-track="whatsapp_click"
          data-destino={contact.key}
          className={className}
        >
          <WhatsAppGlyph className="text-[#25D366]" />
          {contact.name.split(" ")[0]} · {contact.display}
        </a>
      ))}
    </>
  );
}

/**
 * The contacts as tracked buttons. Uses TrackedLink, so the click also
 * reaches /api/cta-clicks with its gclid attribution, exactly like the Ads
 * footer. Prefer this over WhatsAppContactButtons anywhere a landing context
 * is available.
 */
export function TrackedWhatsAppContacts({
  landing,
  source,
  location,
  message,
  className,
}: {
  landing?: string;
  source?: string;
  location?: string;
  message?: string;
  className?: string;
}) {
  return (
    <>
      {WHATSAPP_CONTACTS.map((contact) => (
        <TrackedLink
          key={contact.key}
          event="whatsapp_click"
          landing={landing}
          source={source}
          location={location}
          href={whatsappHrefFor(contact, message)}
          target="_blank"
          rel="noopener noreferrer"
          data-destino={contact.key}
          className={className}
        >
          <WhatsAppGlyph className="text-[#25D366]" />
          {contact.name.split(" ")[0]} · {contact.display}
        </TrackedLink>
      ))}
    </>
  );
}
