"use client";

import {
  startTransition,
  useActionState,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import {
  submitAdsLead,
  type SubmitAdsLeadResult,
} from "@/app/actions/submit-ads-lead";
import {
  analyticsFormName,
  type LeadPageContext,
} from "@/lib/data/service-pages";
import { tipoPropiedadValues } from "@/lib/data/ads-landings";
import {
  rememberAttribution,
  TRACKING_PARAM_KEYS,
  type AttributionParams,
} from "@/lib/tracking";
import { gtagEvent, track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { panamaMobileMessage } from "@/lib/validations/lead";

function reportFormError(form: string, fields: string[]): void {
  const names = fields.length > 0 ? fields : ["envio"];
  for (const field of names) {
    gtagEvent("form_error", { form, field });
  }
}
import { ADS_OPEN_FORM_EVENT } from "@/components/ads/ads-form-events";
import { PhoneGlyph } from "@/components/site/phone-glyph";
import { WhatsAppGlyph } from "@/components/site/whatsapp-float";
import {
  INSPECTION_SLA,
  PHONE_OFFICE_PRIMARY,
  telHref,
  whatsappHref,
  WHATSAPP_DISPLAY,
} from "@/lib/site";
import { TrackedLink } from "@/components/ads/tracked-link";

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

export function AdsLeadDock({
  landing,
  inline = false,
  embed = false,
}: {
  landing: LeadPageContext;
  inline?: boolean;
  /** Form only. The marketing home already has its own WhatsApp button. */
  embed?: boolean;
}) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const started = useRef(false);

  const markFormStart = useCallback(() => {
    if (started.current) return;
    started.current = true;
    gtagEvent("lead_form_start", { form: analyticsFormName(landing) });
  }, [landing]);

  useEffect(() => {
    const onOpen = (event: Event) => {
      const detail = (event as CustomEvent<{ sheet?: boolean; location?: string }>)
        .detail;
      if (detail?.sheet) {
        setSheetOpen(true);
        markFormStart();
      }
    };
    window.addEventListener(ADS_OPEN_FORM_EVENT, onOpen);
    return () => window.removeEventListener(ADS_OPEN_FORM_EVENT, onOpen);
  }, [markFormStart]);

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

  if (embed) {
    return (
      <AdsLeadForm landing={landing} onStart={markFormStart} />
    );
  }

  return (
    <>
      <div
        id="formulario"
        className={cn(
          sheetOpen
            ? "fixed inset-0 z-50 flex items-end justify-center bg-[#1A2E8A]/40 p-0 md:static md:bg-transparent md:p-0"
            : inline
              ? "block"
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
            "relative w-full bg-white shadow-[0_12px_40px_rgba(26,46,138,0.12)]",
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
            Sin compromiso. {INSPECTION_SLA}
          </p>
          <AdsLeadForm landing={landing} onStart={markFormStart} />
        </div>
      </div>

      <div className="h-20 md:hidden" aria-hidden="true" />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#D6E8FF] bg-white/95 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2">
          <TrackedLink
            event="whatsapp_click"
            landing={landing.slug}
            source={landing.source}
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
              markFormStart();
            }}
            className="inline-flex h-12 items-center justify-center rounded-md bg-[#2B4BF2] px-3 text-sm font-semibold text-white"
          >
            {landing.ctaSticky}
          </button>
          <TrackedLink
            event="phone_click"
            landing={landing.slug}
            source={landing.source}
            location="sticky"
            href={telHref(PHONE_OFFICE_PRIMARY)}
            aria-label={`Llamar al ${PHONE_OFFICE_PRIMARY}`}
            className="inline-flex h-12 items-center justify-center gap-1 rounded-md border border-[#D6E8FF] px-2.5 text-xs font-semibold text-[#1A2E8A]"
          >
            <PhoneGlyph className="h-4 w-4" />
            Llamar
          </TrackedLink>
        </div>
      </div>
    </>
  );
}

function AdsLeadForm({
  landing,
  onStart,
}: {
  landing: LeadPageContext;
  onStart: () => void;
}) {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [clientErrors, setClientErrors] = useState<
    Partial<Record<"nombre" | "telefono" | "problema", string>>
  >({});
  const [values, setValues] = useState({
    nombre: "",
    telefono: "",
    problema: landing.defaultProblema,
    descripcion: "",
    tipoPropiedad: "",
    ubicacion: "",
    puedeEnviarFotos: "si" as "si" | "no",
  });
  const [state, formAction, isPending] = useActionState<
    SubmitAdsLeadResult | undefined,
    FormData
  >(submitAdsLead, undefined);
  const formId = useId();
  const redirected = useRef(false);

  useEffect(() => {
    if (!state?.ok || redirected.current) return;
    redirected.current = true;
    gtagEvent("generate_lead", {
      form: analyticsFormName(landing),
      ...(landing.servicio ? { servicio: landing.servicio } : {}),
    });
    const params = new URLSearchParams(window.location.search);
    params.set("from", landing.slug);
    router.replace(`/gracias?${params.toString()}`);
  }, [state, landing, router]);

  useEffect(() => {
    if (state && !state.ok) {
      const fields = state.fields ? Object.keys(state.fields) : [];
      reportFormError(analyticsFormName(landing), fields);
    }
  }, [state, landing]);

  const fieldErrors = !state?.ok ? state?.fields : undefined;
  const generalError =
    state && !state.ok && !state.fields ? state.error : undefined;

  function handleContinue(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step === 1) {
      const nextErrors: Partial<Record<"nombre" | "telefono" | "problema", string>> = {};
      if (values.nombre.trim().length < 2) {
        nextErrors.nombre = "Su nombre es muy corto.";
      }
      const phoneError = panamaMobileMessage(values.telefono);
      if (phoneError) nextErrors.telefono = phoneError;
      if (!values.problema) {
        nextErrors.problema = "Seleccione el tipo de problema.";
      }
      const errors = Object.keys(nextErrors);
      setClientErrors(nextErrors);
      if (errors.length > 0) {
        reportFormError(analyticsFormName(landing), errors);
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
      gtagEvent("lead_form_step_2", { form: analyticsFormName(landing) });
      setStep(2);
      requestAnimationFrame(() => {
        document.getElementById("ads-tipoPropiedad")?.focus();
      });
      return;
    }
    const formData = new FormData(e.currentTarget);
    startTransition(() => {
      formAction(formData);
    });
  }

  return (
    <form
      id={formId}
      action={formAction}
      onSubmit={handleContinue}
      onFocusCapture={onStart}
      className="relative grid gap-4"
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
      {landing.servicio ? (
        <input type="hidden" name="servicio" value={landing.servicio} />
      ) : null}
      <TrackingHiddenFields />

      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5C6578]">
        Paso {step} de 2
      </p>

      <div className={cn("grid gap-4", step !== 1 && "hidden")}>
        <Field
          id="ads-nombre"
          label="Nombre"
          name="nombre"
          autoComplete="name"
          required
          value={values.nombre}
          onChange={(nombre) => {
            setClientErrors((prev) => ({ ...prev, nombre: undefined }));
            setValues((v) => ({ ...v, nombre }));
          }}
          error={clientErrors.nombre || fieldErrors?.nombre}
        />
        <Field
          id="ads-telefono"
          label="WhatsApp"
          name="telefono"
          type="tel"
          autoComplete="tel"
          placeholder="+507 6000-0000"
          required
          value={values.telefono}
          onChange={(telefono) => {
            setClientErrors((prev) => ({ ...prev, telefono: undefined }));
            setValues((v) => ({ ...v, telefono }));
          }}
          error={clientErrors.telefono || fieldErrors?.telefono}
        />
        <SelectField
          id="ads-problema"
          label="¿Cuál es el problema?"
          name="problema"
          options={landing.problemaOptions}
          value={values.problema}
          onChange={(problema) => {
            setClientErrors((prev) => ({ ...prev, problema: undefined }));
            setValues((v) => ({ ...v, problema: problema as typeof v.problema }));
          }}
          required
          error={clientErrors.problema || fieldErrors?.problema}
        />
        <TextareaField
          id="ads-descripcion"
          label="Descripción breve (opcional)"
          name="descripcion"
          rows={3}
          placeholder="Ej.: se moja el cielo raso del último piso después de llover."
          value={values.descripcion}
          onChange={(descripcion) => setValues((v) => ({ ...v, descripcion }))}
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
          value={values.tipoPropiedad}
          onChange={(tipoPropiedad) => setValues((v) => ({ ...v, tipoPropiedad }))}
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
          value={values.ubicacion}
          onChange={(ubicacion) => setValues((v) => ({ ...v, ubicacion }))}
          error={fieldErrors?.ubicacion}
        />
        <fieldset
          className={cn(
            "rounded-md",
            fieldErrors?.puedeEnviarFotos && "border border-danger p-3",
          )}
        >
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
                checked={values.puedeEnviarFotos === "si"}
                onChange={() =>
                  setValues((v) => ({ ...v, puedeEnviarFotos: "si" }))
                }
                className="accent-[#2B4BF2]"
              />
              Sí
            </label>
            <label className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-md border border-[#D6E8FF] bg-[#F5F6FA] px-3 text-sm text-[#1A2E8A] has-[:checked]:border-[#2B4BF2] has-[:checked]:bg-[#D6E8FF]">
              <input
                type="radio"
                name="puedeEnviarFotos"
                value="no"
                checked={values.puedeEnviarFotos === "no"}
                onChange={() =>
                  setValues((v) => ({ ...v, puedeEnviarFotos: "no" }))
                }
                className="accent-[#2B4BF2]"
              />
              Ahora no
            </label>
          </div>
          <p
            role="alert"
            aria-live="polite"
            className={cn(
              "mt-1 text-sm text-danger",
              !fieldErrors?.puedeEnviarFotos && "sr-only",
            )}
          >
            {fieldErrors?.puedeEnviarFotos ?? ""}
          </p>
        </fieldset>
        {generalError ? (
          <p
            role="alert"
            aria-live="polite"
            className="rounded-md border border-danger bg-danger/5 px-4 py-3 text-sm text-danger"
          >
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
            {isPending ? "Enviando..." : "Solicitar inspección"}
          </button>
        </div>
      </div>
    </form>
  );
}

function TrackingHiddenFields() {
  const [values, setValues] = useState<AttributionParams>({});
  useEffect(() => {
    // Current URL wins; cookie/sessionStorage fill keys dropped by navigation.
    setValues(rememberAttribution(window.location.search));
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
  value,
  onChange,
  error,
}: {
  id: string;
  label: string;
  name: string;
  type?: "text" | "tel";
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "min-h-12 w-full rounded-md border bg-white px-4 text-[#1A2E8A] placeholder:text-[#5C6578] focus:outline-none focus:ring-2 focus:ring-[#2B4BF2]/30",
          error ? "border-danger" : "border-[#D6E8FF] focus:border-[#2B4BF2]",
        )}
      />
      <p
        id={`${id}-error`}
        role="alert"
        aria-live="polite"
        className={cn("mt-1 text-sm text-danger", !error && "sr-only")}
      >
        {error ?? ""}
      </p>
    </div>
  );
}

function SelectField({
  id,
  label,
  name,
  options,
  value,
  onChange,
  required,
  error,
}: {
  id: string;
  label: string;
  name: string;
  options: ReadonlyArray<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
      <p
        id={`${id}-error`}
        role="alert"
        aria-live="polite"
        className={cn("mt-1 text-sm text-danger", !error && "sr-only")}
      >
        {error ?? ""}
      </p>
    </div>
  );
}

function TextareaField({
  id,
  label,
  name,
  rows = 3,
  placeholder,
  value,
  onChange,
  error,
}: {
  id: string;
  label: string;
  name: string;
  rows?: number;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "w-full resize-y rounded-md border bg-white px-4 py-3 text-[#1A2E8A] placeholder:text-[#5C6578] focus:outline-none focus:ring-2 focus:ring-[#2B4BF2]/30",
          error ? "border-danger" : "border-[#D6E8FF] focus:border-[#2B4BF2]",
        )}
      />
      <p
        id={`${id}-error`}
        role="alert"
        aria-live="polite"
        className={cn("mt-1 text-sm text-danger", !error && "sr-only")}
      >
        {error ?? ""}
      </p>
    </div>
  );
}
