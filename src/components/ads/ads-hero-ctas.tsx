import { TrackedWhatsAppContacts } from "@/components/site/whatsapp-contacts";
import { OfferChoice } from "@/components/site/offer-choice";
import { SERVICE_CTA } from "@/lib/data/service-pages";
import { OpenFormButton } from "@/components/ads/open-form-button";
import { TrackedLink } from "@/components/ads/tracked-link";
import { PhoneGlyph } from "@/components/site/phone-glyph";
import { WhatsAppGlyph } from "@/components/site/whatsapp-float";
import {
  PHONE_MAIN,
  PHONE_MAIN_DISPLAY,
  telHref,
  whatsappHref,
  WHATSAPP_DISPLAY,
} from "@/lib/site";

type HeroCtaLanding = {
  slug: string;
  source: string;
  cta: string;
  whatsappMessage: string;
  /** Diagnosis landing: the hero leads with the two ways in. */
  diagnosis?: boolean;
};

/** Form, WhatsApp and office phone in one row. Shared by Ads heroes. */
export function AdsHeroCtas({ landing }: { landing: HeroCtaLanding }) {
  return (
    <div className="flex flex-col gap-4">
      {landing.diagnosis ? (
        <OfferChoice
          primary="diagnosis"
          className="max-w-3xl"
          diagnosisAction={
            <OpenFormButton
              event="cta_hero_click"
              landing={landing.slug}
              location="hero_diagnostico"
              className="btn-gold-lg"
            >
              {landing.cta}
            </OpenFormButton>
          }
          quoteAction={
            <OpenFormButton
              event="cta_hero_click"
              landing={landing.slug}
              location="hero_cotizacion"
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-white/40 px-5 text-sm font-semibold text-white transition-colors hover:border-[#F5A623] hover:text-[#F5A623]"
            >
              {SERVICE_CTA}
            </OpenFormButton>
          }
        />
      ) : null}
      <div className="flex flex-wrap gap-3">
        {landing.diagnosis ? null : (
          <OpenFormButton
            event="cta_hero_click"
            landing={landing.slug}
            location="hero"
            className="btn-gold-lg"
          >
            {landing.cta}
          </OpenFormButton>
        )}
      <TrackedWhatsAppContacts
        landing={landing.slug}
        source={landing.source}
        location="hero"
        message={landing.whatsappMessage}
        className="btn-wa-outline"
      />
      <TrackedLink
        event="phone_click"
        landing={landing.slug}
        source={landing.source}
        location="hero"
        href={telHref(PHONE_MAIN)}
        data-track="phone_click"
        className="btn-tel-outline"
      >
          <PhoneGlyph />
          Llamar {PHONE_MAIN_DISPLAY}
        </TrackedLink>
      </div>
    </div>
  );
}
