"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  submitAdsLead,
  type SubmitAdsLeadResult,
} from "@/app/actions/submit-ads-lead";
import type { AdsLanding } from "@/lib/data/ads-landings";
import {
  problemaValues,
  tipoPropiedadValues,
} from "@/lib/data/ads-landings";
import { TRACKING_PARAM_KEYS } from "@/lib/tracking";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { ADS_OPEN_FORM_EVENT } from "@/components/ads/ads-form-events";
import { WhatsAppGlyph } from "@/components/site/whatsapp-float";
import {
  PHONE_OFFICE_PRIMARY,
  telHref,
  whatsappHref,
  WHATSAPP_DISPLAY,
} from "@/lib/site";
import { TrackedLink } from "@/components/ads/tracked-link";

const PROBLEMA_OPTIONS: Array<{ value: (typeof problemaValues)[number]; label: string }> = [
  { value: "filtracion", label: "Filtración" },
  { value: "azotea", label: "Azotea" },
  { value: "fachada", label: "Fachada" },
  { value: "grietas", label: "Grietas" },
  { value: "piscina", label: "Piscina" },
  { value: "tanque", label: "Tanque" },
  { value: "otro", label: "Otro" },
];

const PROPIEDAD_OPTIONS: Array<{
  value: (typeof tipoPropiedadValues)[number];
  label: string;
}> = [
  { value: "casa", label: "Casa" },
  { value: "apartamento", label: "Apartamento" },
  { value: "ph", label: "PH" },
  { value: "comercio", label: "Comercio" },
  { value: "industria", label: "Industria" },
  { value: "constructora", label: "Constructora" },
  { value: "otro", label: "Otro" },
];

export function AdsLeadDock({ landing }: { landing: AdsLanding }) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    const onOpen = (event: Event) => {
      const detail = (event as CustomEvent<{ sheet?: boolean; location?: string }>)
        .detail;
      if (detail?.sheet) {
        setSheetOpen(true);
        markFormStart(landing.slug);
      }
    };
    window.addEventListener(ADS_OPEN_FORM_EVENT, onOpen);
    return () => window.removeEventListener(ADS_OPEN_FORM_EVENT, onOpen);
  }, [landing.slug]);

  useEffect(() => {
    if (!sheetOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSheetOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.getElementById("ads-nombre")?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [sheetOpen]);

  function markFormStart(slug: string) {
    if (started.current) return;
    started.current = true;
    track({ event: "lead_form_start", landing: slug });
  }

  return (
    <>
      <div
        id="formulario"
        className={cn(
          "md:block",
          sheetOpen
            ? "fixed inset-0 z-50 flex items-end justify-center bg-[#1A2E8A]/40 p-0 md:static md:bg-transparent md:p-0"
            : "hidden md:block",
        )}
        role={sheetOpen ? "dialog" : undefined}
        aria-modal={sheetOpen ? true : undefined}
        aria-labelledby={sheetOpen ? "ads-form-title" : undefined}
        onClick={(e) => {
          if (e.target === e.currentTarget && sheetOpen) setSheetOpen(false);
        }}
      >
        <div
          className={cn(
            "w-full bg-white shadow-[0_12px_40px_rgba(26,46,138,0.12)]",
            sheetOpen
              ? "max-h-[92vh] overflow-y-auto rounded-t-2xl p-5 pb-8 md:max-h-none md:rounded-xl md:p-6"
              : "rounded-xl p-6",
          )}
        >
          {sheetOpen ? (
            <div className="mb-4 flex items-center justify-between md:hidden">
              <p id="ads-form-title" className="font-display text-lg text-[#1A2E8A]">
                {landing.cta}
              </p>
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-md text-[#1A2E8A] hover:bg-[#F5F6FA]"
                aria-label="Cerrar formulario"
              >
                ×
              </button>
            </div>
          ) : (
            <p className="mb-1 font-display text-xl text-[#1A2E8A]">
              {landing.cta}
            </p>
          )}
          <p className="mb-5 text-sm leading-relaxed text-[#5C6578]">
            Sin compromiso. Mark le responde el próximo día hábil.
          </p>
          <AdsLeadForm
            landing={landing}
            onStart={() => markFormStart(landing.slug)}
          />
        </div>
      </div>

      <div className="h-20 md:hidden" aria-hidden="true" />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#D6E8FF] bg-white/95 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2">
          <TrackedLink
            event="whatsapp_click"
            landing={landing.slug}
            location="sticky"
            href={whatsappHref(landing.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp ${WHATSAPP_DISPLAY}`}
            className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-[#25D366] text-white"
          >
            <WhatsAppGlyph />
          </TrackedLink>
          <button
            type="button"
            data-track="cta_sticky_click"
            onClick={() => {
              track({
                event: "cta_sticky_click",
                landing: landing.slug,
                location: "sticky",
              });
              setSheetOpen(true);
              markFormStart(landing.slug);
            }}
            className="inline-flex h-12 items-center justify-center rounded-md bg-[#2B4BF2] px-3 text-sm font-semibold text-white"
          >
            {landing.ctaSticky}
          </button>
          <TrackedLink
            event="phone_click"
            landing={landing.slug}
            location="sticky"
            href={telHref(PHONE_OFFICE_PRIMARY)}
            aria-label={`Llamar a ${PHONE_OFFICE_PRIMARY}`}
            className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-[#D6E8FF] text-[#1A2E8A]"
          >
            <PhoneGlyph />
          </TrackedLink>
        </div>
      </div>
    </>
  );
}

function PhoneGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
      width="20"
      height="20"
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.5 5.5c0-1 .8-1.8 1.8-1.8h2.2c.7 0 1.3.4 1.6 1.1l1 2.2c.3.6.1 1.3-.4 1.7L8.4 10c.8 1.6 2 2.8 3.6 3.6l1.3-1.3c.4-.5 1.1-.7 1.7-.4l2.2 1c.7.3 1.1.9 1.1 1.6v2.2c0 1-.8 1.8-1.8 1.8C9.6 18.5 5.5 14.4 5.5 8.3c0-.9 0-1.9 0-2.8z"
      />
    </svg>
  );
}

function AdsLeadForm({
  landing,
  onStart,
}: {
  landing: AdsLanding;
  onStart: () => void;
}) {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [state, formAction, isPending] = useActionState<
    SubmitAdsLeadResult | undefined,
    FormData
  >(submitAdsLead, undefined);
  const formId = useId();
  const redirected = useRef(false);

  useEffect(() => {
    if (!state?.ok || redirected.current) return;
    redirected.current = true;
    track({
      event: "lead_form_submit",
      landing: landing.slug,
      problem: landing.defaultProblema,
    });
    const params = new URLSearchParams(window.location.search);
    params.set("from", landing.slug);
    router.replace(`/gracias?${params.toString()}`);
  }, [state, landing.slug, landing.defaultProblema, router]);

  useEffect(() => {
    if (state && !state.ok) {
      track({ event: "form_error", landing: landing.slug });
      if (state.fields?.nombre || state.fields?.telefono || state.fields?.problema) {
        setStep(1);
      }
    }
  }, [state, landing.slug]);

  const fieldErrors = !state?.ok ? state?.fields : undefined;
  const generalError =
    state && !state.ok && !state.fields ? state.error : undefined;

  function handleContinue(e: React.FormEvent<HTMLFormElement>) {
    if (step === 1) {
      const data = new FormData(e.currentTarget);
      const nombre = String(data.get("nombre") ?? "").trim();
      const telefono = String(data.get("telefono") ?? "").trim();
      const problema = String(data.get("problema") ?? "").trim();
      const errors: string[] = [];
      if (nombre.length < 2) errors.push("nombre");
      if (telefono.length < 7) errors.push("telefono");
      if (!problema) errors.push("problema");
      if (errors.length > 0) {
        e.preventDefault();
        track({ event: "form_error", landing: landing.slug });
        const first = document.getElementById(
          errors[0] === "nombre"
            ? "ads-nombre"
            : errors[0] === "telefono"
              ? "ads-telefono"
              : "ads-problema",
        );
        first?.focus();
        return;
      }
      e.preventDefault();
      setStep(2);
      requestAnimationFrame(() => {
        document.getElementById("ads-tipoPropiedad")?.focus();
      });
    }
  }

  return (
    <form
      id={formId}
      action={formAction}
      onSubmit={handleContinue}
      onFocusCapture={onStart}
      className="grid gap-4"
      noValidate
    >
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Empresa
          <input type="text" name="company" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      <input type="hidden" name="source" value={landing.source} />
      <input type="hidden" name="landingPath" value={landing.path} />
      <TrackingHiddenFields />

      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5C6578]">
        Paso {step} de 2
      </p>

      <div className={cn("grid gap-4", step !== 1 && "hidden")}>
        <Field
          id="ads-nombre"
          label="Nombre"
          name="nombre"
          autoComplete="name"
          required
          error={fieldErrors?.nombre}
        />
        <Field
          id="ads-telefono"
          label="WhatsApp"
          name="telefono"
          type="tel"
          autoComplete="tel"
          placeholder="+507 6000-0000"
          required
          error={fieldErrors?.telefono}
        />
        <SelectField
          id="ads-problema"
          label="¿Cuál es el problema?"
          name="problema"
          options={PROBLEMA_OPTIONS}
          defaultValue={landing.defaultProblema}
          required
          error={fieldErrors?.problema}
        />
        <TextareaField
          id="ads-descripcion"
          label="Descripción breve (opcional)"
          name="descripcion"
          rows={3}
          placeholder="Ej.: se moja el cielo raso del último piso después de llover."
          error={fieldErrors?.descripcion}
        />
        <button
          type="submit"
          className="inline-flex min-h-12 items-center justify-center rounded-md bg-[#2B4BF2] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#1A2E8A]"
        >
          Continuar
        </button>
      </div>

      <div className={cn("grid gap-4", step !== 2 && "hidden")}>
        <SelectField
          id="ads-tipoPropiedad"
          label="Tipo de propiedad"
          name="tipoPropiedad"
          options={PROPIEDAD_OPTIONS}
          required
          error={fieldErrors?.tipoPropiedad}
        />
        <Field
          id="ads-ubicacion"
          label="Ubicación / zona"
          name="ubicacion"
          autoComplete="address-level2"
          placeholder="Ej.: San Francisco, Punta Pacífica, Costa del Este"
          required
          error={fieldErrors?.ubicacion}
        />
        <fieldset>
          <legend className="mb-1.5 block text-sm font-medium text-[#1A2E8A]">
            ¿Puede enviar fotos?
            <span className="ml-0.5 text-[#2B4BF2]">*</span>
          </legend>
          <div className="flex gap-3">
            <label className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-md border border-[#D6E8FF] bg-[#F5F6FA] px-3 text-sm text-[#1A2E8A] has-[:checked]:border-[#2B4BF2] has-[:checked]:bg-[#D6E8FF]">
              <input
                type="radio"
                name="puedeEnviarFotos"
                value="si"
                required
                className="accent-[#2B4BF2]"
                defaultChecked
              />
              Sí
            </label>
            <label className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-md border border-[#D6E8FF] bg-[#F5F6FA] px-3 text-sm text-[#1A2E8A] has-[:checked]:border-[#2B4BF2] has-[:checked]:bg-[#D6E8FF]">
              <input
                type="radio"
                name="puedeEnviarFotos"
                value="no"
                className="accent-[#2B4BF2]"
              />
              Ahora no
            </label>
          </div>
          {fieldErrors?.puedeEnviarFotos ? (
            <p className="mt-1 text-sm text-danger">{fieldErrors.puedeEnviarFotos}</p>
          ) : null}
        </fieldset>
        {generalError ? (
          <p className="rounded-md border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
            {generalError}
          </p>
        ) : null}
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-[#D6E8FF] px-5 text-sm font-semibold text-[#1A2E8A]"
          >
            Atrás
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex min-h-12 flex-1 items-center justify-center rounded-md bg-[#2B4BF2] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#1A2E8A] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Enviando..." : "Solicitar evaluación"}
          </button>
        </div>
      </div>
    </form>
  );
}

function TrackingHiddenFields() {
  const [values, setValues] = useState<Record<string, string>>({});
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const next: Record<string, string> = {};
    for (const key of TRACKING_PARAM_KEYS) {
      const value = params.get(key)?.trim();
      if (value) next[key] = value.slice(0, 200);
    }
    setValues(next);
  }, []);
  return (
    <>
      {TRACKING_PARAM_KEYS.map((key) =>
        values[key] ? (
          <input key={key} type="hidden" name={key} value={values[key]} />
        ) : null,
      )}
    </>
  );
}

function Field({
  id,
  label,
  name,
  type = "text",
  required,
  autoComplete,
  placeholder,
  error,
}: {
  id: string;
  label: string;
  name: string;
  type?: "text" | "tel";
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-[#1A2E8A]">
        {label}
        {required ? <span className="ml-0.5 text-[#2B4BF2]">*</span> : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "min-h-12 w-full rounded-md border bg-white px-4 text-[#1A2E8A] placeholder:text-[#5C6578] focus:outline-none focus:ring-2 focus:ring-[#2B4BF2]/30",
          error ? "border-danger" : "border-[#D6E8FF] focus:border-[#2B4BF2]",
        )}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SelectField({
  id,
  label,
  name,
  options,
  defaultValue,
  required,
  error,
}: {
  id: string;
  label: string;
  name: string;
  options: ReadonlyArray<{ value: string; label: string }>;
  defaultValue?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-[#1A2E8A]">
        {label}
        {required ? <span className="ml-0.5 text-[#2B4BF2]">*</span> : null}
      </label>
      <select
        id={id}
        name={name}
        required={required}
        defaultValue={defaultValue ?? ""}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "min-h-12 w-full rounded-md border bg-white px-4 text-[#1A2E8A] focus:outline-none focus:ring-2 focus:ring-[#2B4BF2]/30",
          error ? "border-danger" : "border-[#D6E8FF] focus:border-[#2B4BF2]",
        )}
      >
        <option value="" disabled>
          Seleccionar
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function TextareaField({
  id,
  label,
  name,
  rows = 3,
  placeholder,
  error,
}: {
  id: string;
  label: string;
  name: string;
  rows?: number;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-[#1A2E8A]">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "w-full resize-y rounded-md border bg-white px-4 py-3 text-[#1A2E8A] placeholder:text-[#5C6578] focus:outline-none focus:ring-2 focus:ring-[#2B4BF2]/30",
          error ? "border-danger" : "border-[#D6E8FF] focus:border-[#2B4BF2]",
        )}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
