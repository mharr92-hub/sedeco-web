import { OpenFormButton } from "@/components/ads/open-form-button";
import { TrackedLink } from "@/components/ads/tracked-link";
import { PhoneGlyph } from "@/components/site/phone-glyph";
import { WhatsAppGlyph } from "@/components/site/whatsapp-float";
import {
  PHONE_OFFICE_PRIMARY,
  telHref,
  whatsappHref,
  WHATSAPP_DISPLAY,
} from "@/lib/site";

type HeroCtaLanding = {
  slug: string;
  source: string;
  cta: string;
  whatsappMessage: string;
};

/** Form, WhatsApp and office phone in one row. Shared by Ads heroes. */
export function AdsHeroCtas({ landing }: { landing: HeroCtaLanding }) {
  return (
    <div className="flex flex-wrap gap-3">
      <OpenFormButton
        event="cta_hero_click"
        landing={landing.slug}
        location="hero"
        className="btn-gold-lg"
      >
        {landing.cta}
      </OpenFormButton>
      <TrackedLink
        event="whatsapp_click"
        landing={landing.slug}
        source={landing.source}
        location="hero"
        href={whatsappHref(landing.whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-wa-outline"
      >
        <WhatsAppGlyph className="text-[#25D366]" />
        WhatsApp {WHATSAPP_DISPLAY}
      </TrackedLink>
      <TrackedLink
        event="phone_click"
        landing={landing.slug}
        source={landing.source}
        location="hero"
        href={telHref(PHONE_OFFICE_PRIMARY)}
        className="btn-tel-outline"
      >
        <PhoneGlyph />
        Llamar {PHONE_OFFICE_PRIMARY}
      </TrackedLink>
    </div>
  );
}
